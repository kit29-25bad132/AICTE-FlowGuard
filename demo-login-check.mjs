import WebSocket from 'ws';

const APP = 'http://localhost:3320';
const CDP = 'http://localhost:9223';
const PASSWORD = 'FlowGuard@123';
const ROLE_CARDS = [
  { code: 'ADMIN', label: 'Administrator', email: 'admin@flowguard.demo', marker: 'BUREAU EXECUTIVE VIEW' },
  { code: 'REGIONAL_OFFICER', label: 'Regional Officer', email: 'regional@flowguard.demo', marker: 'REGIONAL OFFICER WORKSPACE' },
  { code: 'BUREAU_HEAD', label: 'Bureau Head', email: 'bureau@flowguard.demo', marker: 'BUREAU EXECUTIVE VIEW' },
  { code: 'EVC_MEMBER', label: 'EVC Member', email: 'evc@flowguard.demo', marker: 'EVC TRAVEL OPTIMIZATION & CLUSTERING' },
  { code: 'INSTITUTION', label: 'Institution', email: 'institution@flowguard.demo', marker: 'AUTHORIZED INSTITUTIONAL PORTAL' },
  { code: 'COMPETENT_AUTHORITY', label: 'Competent Authority', email: 'authority@flowguard.demo', marker: 'Applications' },
  { code: 'LEGAL_CELL', label: 'Legal Cell', email: 'legal@flowguard.demo', marker: 'SHA-256 Append-Only Audit Ledger' },
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const results = [];
function check(name, condition, detail = '') {
  results.push({ name, pass: Boolean(condition), detail });
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

async function findTarget() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${CDP}/json/list`);
      const targets = await response.json();
      const page = targets.find(target => target.type === 'page' && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* chrome is still starting */
    }
    await sleep(500);
  }
  throw new Error('Chrome DevTools target not available');
}

const ws = new WebSocket(await findTarget());
await new Promise((resolve, reject) => {
  ws.once('open', resolve);
  ws.once('error', reject);
});

let messageId = 0;
const pending = new Map();
ws.on('message', raw => {
  const message = JSON.parse(raw.toString());
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});

function send(method, params = {}) {
  messageId += 1;
  const id = messageId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  }
  return result.result.value;
}

async function waitFor(expression, timeout = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      if (await evaluate(expression)) return true;
    } catch {
      /* navigation in flight */
    }
    await sleep(250);
  }
  return false;
}

async function ensureSignIn() {
  const path = await evaluate('location.pathname');
  if (path !== '/signin') {
    await evaluate(`location.assign('${APP}/signin')`);
  }
  return waitFor("location.pathname === '/signin' && !!document.querySelector('#demo-email')");
}

async function selectRole(label) {
  return evaluate(`(() => {
    const button = [...document.querySelectorAll('button[aria-pressed]')]
      .find(node => node.textContent.trim().startsWith(${JSON.stringify(label)}));
    if (!button) return false;
    button.click();
    return true;
  })()`);
}

async function selectRoleUntilHydrated(label, email) {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    await selectRole(label);
    await sleep(400);
    try {
      const value = await evaluate("document.querySelector('#demo-email')?.value ?? ''");
      if (value === email) return true;
    } catch {
      /* navigation or re-render in flight */
    }
    await sleep(300);
  }
  return false;
}

function readFields() {
  return evaluate(`({
    email: document.querySelector('#demo-email').value,
    password: document.querySelector('#demo-password').value,
    panel: document.body.innerText.toLowerCase().includes('demo account credentials'),
    hasCopyEmail: !!document.querySelector('button[aria-label="Copy demo email"]'),
    hasCopyPassword: !!document.querySelector('button[aria-label="Copy demo password"]')
  })`);
}

async function submit() {
  await evaluate("document.querySelector('button[type=\"submit\"]').click()");
}

try {
  await send('Network.enable').catch(() => undefined);
  await send('Network.setCacheDisabled', { cacheDisabled: true }).catch(() => undefined);

  await evaluate(`location.assign('${APP}/signin?run=' + Date.now())`);
  await waitFor("location.pathname === '/signin' && !!document.querySelector('#demo-email')", 20000);
  await sleep(800);

  await send('Browser.grantPermissions', {
    origin: APP,
    permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
  }).catch(() => undefined);

  await ensureSignIn();
  const signInCopy = await evaluate('document.body.innerText');
  check('sign-in page has no side marketing panel', !signInCopy.includes('Regulatory Approvals.'));
  check('sign-in shows demo mode badge', signInCopy.toLowerCase().includes('demo mode'));
  check('sign-in shows role dropdown label', signInCopy.includes('What is your position?'));
  check('sign-in lists all seven roles', ROLE_CARDS.every(role => signInCopy.includes(role.label)));

  const only = process.env.ONLY_ROLES ? process.env.ONLY_ROLES.split(',') : null;
  const roleCards = only ? ROLE_CARDS.filter(role => only.includes(role.code)) : ROLE_CARDS;

  for (const role of roleCards) {
    const ready = await ensureSignIn();
    check(`[${role.code}] sign-in form available`, ready);

    const selected = await selectRoleUntilHydrated(role.label, role.email);
    check(`[${role.code}] role card selects and populates position`, selected);

    const fields = await readFields();
    check(`[${role.code}] credentials auto-populate`, fields.email === role.email && fields.password === PASSWORD, `${fields.email} / ${fields.password}`);
    check(`[${role.code}] credential panel renders copy actions`, fields.panel && fields.hasCopyEmail && fields.hasCopyPassword);

    if (role.code === 'ADMIN') {
      await evaluate('document.querySelector(\'button[aria-label="Copy demo email"]\').click()');
      const copied = await waitFor(
        "document.body.innerText.includes('Copied')",
        4000,
      );
      check('[ADMIN] copy email button works', copied);
    }

    await submit();
    const landed = await waitFor(
      `location.pathname === '/dashboard'
        && document.body.innerText.includes(${JSON.stringify(role.code)})
        && (document.querySelector('main')?.innerText ?? '').includes(${JSON.stringify(role.marker)})`,
      25000,
    );
    check(`[${role.code}] sign-in reaches dashboard`, landed);

    const state = await evaluate(`({
      path: location.pathname,
      body: document.body.innerText,
      mainText: document.querySelector('main')?.innerText ?? '',
      debugSession: document.querySelector('[data-debug-session]')?.dataset.debugSession ?? 'none',
      debugStore: document.querySelector('[data-debug-store]')?.dataset.debugStore ?? 'none',
      debugTab: document.querySelector('[data-debug-tab]')?.dataset.debugTab ?? 'none',
      mainCount: document.querySelectorAll('main').length,
      cookie: document.cookie,
      session: localStorage.getItem('flowguard.session.v1')
    })`);
    let session = null;
    try { session = JSON.parse(state.session ?? 'null'); } catch { session = null; }

    console.log(`DEBUG ${role.code}:`, JSON.stringify({ session: state.debugSession, store: state.debugStore, tab: state.debugTab, mains: state.mainCount, sessionRole: session?.role }));
    check(`[${role.code}] session carries the selected role`, session?.role === role.code, session?.role ?? 'none');
    check(`[${role.code}] session cookie present`, state.cookie.includes('fg_session='));
    check(`[${role.code}] role shown in workspace header`, state.body.includes(role.code));
    check(
      `[${role.code}] correct existing workspace loaded`,
      state.mainText.includes(role.marker),
      state.mainText.includes(role.marker) ? role.marker : `expected “${role.marker}” in: ${state.mainText.replace(/\s+/g, ' ').slice(0, 420)}`,
    );

    await evaluate('location.reload()');
    const refreshed = await waitFor(
      `location.pathname === '/dashboard' && document.body.innerText.includes(${JSON.stringify(role.code)})`,
      20000,
    );
    check(`[${role.code}] refresh preserves demo identity`, refreshed);

    const logoutClicked = await evaluate(`(() => {
      const button = document.querySelector('button[title="Logout"]');
      if (!button) return false;
      button.click();
      return true;
    })()`);
    const loggedOut = await waitFor("location.pathname === '/signin' && document.body.innerText.includes('Welcome to FlowGuard Demo')", 15000);
    check(`[${role.code}] logout returns to sign-in`, logoutClicked && loggedOut);

    const cleared = await evaluate(`({
      session: localStorage.getItem('flowguard.session.v1'),
      cookie: document.cookie
    })`);
    check(`[${role.code}] logout clears demo session`, cleared.session === null && !cleared.cookie.includes('fg_session='));
  }

  // Invalid credentials
  await ensureSignIn();
  await selectRoleUntilHydrated('Administrator', 'admin@flowguard.demo');
  await evaluate(`(() => {
    const input = document.querySelector('#demo-password');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, 'WrongPassword1');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  })()`);
  await submit();
  const wrongPassword = await waitFor("document.body.innerText.includes('Incorrect demonstration credentials')", 8000);
  check('incorrect password shows an error', wrongPassword);

  // Credentials for a different role
  await ensureSignIn();
  await selectRoleUntilHydrated('Administrator', 'admin@flowguard.demo');
  await evaluate(`(() => {
    const input = document.querySelector('#demo-email');
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, 'bureau@flowguard.demo');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  })()`);
  await submit();
  const mismatch = await waitFor("document.body.innerText.includes('belong to the Bureau Head demo account')", 8000);
  check('cross-role credentials are rejected', mismatch);
} finally {
  const failed = results.filter(result => !result.pass);
  console.log(`\nSUMMARY: ${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length > 0) {
    console.log('FAILED CHECKS:');
    failed.forEach(result => console.log(` - ${result.name}${result.detail ? ` (${result.detail})` : ''}`));
  }
  ws.close();
  process.exit(failed.length === 0 ? 0 : 1);
}
