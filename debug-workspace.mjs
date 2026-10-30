import WebSocket from 'ws';

const APP = 'http://localhost:3320';
const CDP = 'http://localhost:9223';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function findTarget() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${CDP}/json/list`);
      const targets = await response.json();
      const page = targets.find(target => target.type === 'page' && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(500);
  }
  throw new Error('no target');
}

const ws = new WebSocket(await findTarget());
await new Promise((resolve, reject) => { ws.once('open', resolve); ws.once('error', reject); });

let id = 0;
const pending = new Map();
const events = [];
ws.on('message', raw => {
  const message = JSON.parse(raw.toString());
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
    return;
  }
  if (message.method === 'Runtime.exceptionThrown' || message.method === 'Runtime.consoleAPICalled') {
    events.push(message);
  }
});

function send(method, params = {}) {
  id += 1;
  const current = id;
  return new Promise((resolve, reject) => {
    pending.set(current, { resolve, reject });
    ws.send(JSON.stringify({ id: current, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  return result.result.value;
}

async function waitFor(expression, timeout = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try { if (await evaluate(expression)) return true; } catch {}
    await sleep(300);
  }
  return false;
}

try {
  await send('Runtime.enable');
  await evaluate(`location.assign('${APP}/signin')`);
  await waitFor("!!document.querySelector('#demo-email')");
  for (let i = 0; i < 20; i += 1) {
    const value = await evaluate(`(() => {
      const button = [...document.querySelectorAll('button[aria-pressed]')].find(node => node.textContent.trim().startsWith('Bureau Head'));
      if (!button) return 'no-button';
      button.click();
      return document.querySelector('#demo-email').value;
    })()`);
    if (value === 'bureau@flowguard.demo') break;
    await sleep(500);
  }
  await evaluate("document.querySelector('button[type=\"submit\"]').click()");
  await waitFor("location.pathname === '/dashboard' && document.body.innerText.includes('AICTE BUREAU')", 20000);
  await sleep(2500);

  console.log('PATH:', await evaluate('location.pathname'));
  console.log('MAIN_TEXT:', JSON.stringify(await evaluate("document.querySelector('main')?.innerText ?? 'NO_MAIN'")));
  console.log('MAIN_HTML_START:', (await evaluate("document.querySelector('main')?.innerHTML ?? 'NO_MAIN'")).slice(0, 500));
  console.log('BODY_HAS_MARKER:', await evaluate("document.body.innerText.includes('BUREAU EXECUTIVE VIEW')"));
  console.log('ERROR_EVENTS:', events.map(event => ({
    method: event.method,
    text: event.params?.exceptionDetails?.exception?.description
      ?? event.params?.args?.map(arg => arg.value ?? arg.description).join(' ')
      ?? '',
  })).slice(0, 10));
} finally {
  ws.close();
}
