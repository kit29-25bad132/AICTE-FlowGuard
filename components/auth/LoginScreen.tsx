'use client';
import React, { useState } from 'react';
import { flowStore, DEMO_USERS } from '@/lib/store';
import { Shield, Lock, Mail, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { Role } from '@/types';

export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>('BUREAU_HEAD');
  const [email, setEmail] = useState('bureau.head@aicte-india.org');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    const found = DEMO_USERS.find(u => u.role === role);
    if (found) {
      setEmail(found.email);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.role === selectedRole) || DEMO_USERS[0];
      flowStore.getState().setCurrentUser(user);
      setLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0b1c30] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#142b4a15_1px,transparent_1px),linear-gradient(to_bottom,#142b4a15_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="relative z-10 w-full max-w-xl bg-white rounded-lg shadow-2xl border border-[#cbd5e1] overflow-hidden">
        <div className="bg-[#142b4a] p-6 text-white flex items-center justify-between border-b border-[#0f172a]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-[#2563eb] flex items-center justify-center font-bold text-lg shadow">
              AF
            </div>
            <div>
              <h1 className="text-xl font-bold font-['Space_Grotesk'] tracking-tight">AICTE FlowGuard</h1>
              <p className="text-xs text-[#b2c7ee] font-mono">Smart India Hackathon 2026 | ID: 26262</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-[#1e3a63] px-3 py-1 rounded text-xs font-mono text-[#b2c7ee] border border-[#324768]">
            <Shield className="w-3.5 h-3.5 text-[#16a36a]" />
            <span>SECURE SOVEREIGN PORTAL</span>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#0b1c30] mb-1">Select Operational Role</h2>
            <p className="text-xs text-[#64748B]">Choose your designated bureau access level for the demonstration session.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              { role: 'BUREAU_HEAD', label: 'Bureau Head (Executive)', badge: 'Default Demo' },
              { role: 'REGIONAL_OFFICER', label: 'Regional Officer (Chennai)', badge: 'Operations' },
              { role: 'INSTITUTION', label: 'Institution Portal (SVEC)', badge: 'Applicant' },
              { role: 'EVC_MEMBER', label: 'EVC Committee Member', badge: 'Inspection' },
              { role: 'COMPETENT_AUTHORITY', label: 'Competent Authority', badge: 'Override' },
              { role: 'LEGAL_CELL', label: 'Legal Cell / Risk Registry', badge: 'Litigation' },
              { role: 'ADMIN', label: 'System Administrator', badge: 'Config' },
            ].map(item => (
              <button
                key={item.role}
                type="button"
                onClick={() => handleRoleSelect(item.role as Role)}
                className={`text-left p-3 rounded-md border text-xs transition-all flex flex-col justify-between ${
                  selectedRole === item.role
                    ? 'border-[#2563eb] bg-[#eff4ff] text-[#001632] font-semibold shadow-xs'
                    : 'border-[#cbd5e1] hover:bg-[#f8fafc] text-[#44474e]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-medium">{item.label}</span>
                  {selectedRole === item.role && <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />}
                </div>
                <span className="font-mono text-[10px] text-[#74777e]">{item.badge}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Authorized User Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#74777e]">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#cbd5e1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] font-mono text-[#0b1c30]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Secure Password / SIH Token</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#74777e]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#cbd5e1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] font-mono text-[#0b1c30]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#142b4a] hover:bg-[#0f172a] text-white py-2.5 px-4 rounded-sm font-semibold text-xs tracking-wide transition flex items-center justify-center space-x-2 shadow"
            >
              {loading ? (
                <span>Authenticating Sovereign Session...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Access FlowGuard Workspace as {selectedRole.replace('_', ' ')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-center">
            <p className="text-[11px] text-[#64748B]">
              &ldquo;Efficiency is a software feature. Accountability is a constitutional value.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
