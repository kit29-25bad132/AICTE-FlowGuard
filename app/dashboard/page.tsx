'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { flowStore } from '@/lib/store';
import { clearSession, findSessionUser, getSession } from '@/lib/session';
import { ROLE_LANDING_TAB } from '@/lib/demo-accounts';
import type { User } from '@/types';
import Shell from '@/components/layout/Shell';
import BureauDashboard from '@/components/dashboard/BureauDashboard';
import RegionalDashboard from '@/components/dashboard/RegionalDashboard';
import InstitutionDashboard from '@/components/dashboard/InstitutionDashboard';
import ApplicationList from '@/components/applications/ApplicationList';
import ApplicationDetail from '@/components/applications/ApplicationDetail';
import EvcClusterMap from '@/components/evc/EvcClusterMap';
import EscalationCenterView from '@/components/accountability/EscalationCenterView';
import AuditLedgerView from '@/components/accountability/AuditLedgerView';
import DelayCostView from '@/components/intelligence/DelayCostView';
import PendencyMap from '@/components/intelligence/PendencyMap';
import BottleneckForecastView from '@/components/intelligence/BottleneckForecastView';
import ComplianceGenomeView from '@/components/compliance/ComplianceGenomeView';
import WorkflowStudioView from '@/components/admin/WorkflowStudioView';

export default function DashboardPage() {
  const router = useRouter();
  const [storeState, setStoreState] = useState(flowStore.getState());
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    const user = findSessionUser(session);

    if (!session || !user) {
      clearSession();
      router.replace('/signin');
      return;
    }

    flowStore.getState().restoreUser(user);
    // The verified session is the source of truth for this page's role and content,
    // so the previous demo identity can never leak into the next workspace.
    setSessionUser(user);
    setStoreState(flowStore.getState());
    // Each demo role opens the existing workspace that matches its responsibility.
    setCurrentTab(ROLE_LANDING_TAB[user.role] ?? 'dashboard');
    setReady(true);
  }, [router]);

  useEffect(() => {
    const unsubscribe = flowStore.subscribe(() => {
      setStoreState(flowStore.getState());
    });
    return unsubscribe;
  }, []);

  // Prefer the session identity over any store value persisted by an earlier demo role.
  const currentUser = sessionUser ?? storeState.currentUser;

  const handleLogout = () => {
    clearSession();
    router.replace('/signin');
  };

  const handleOpenAppDetail = (appId: string) => {
    setSelectedAppId(appId);
    setCurrentTab('app_detail');
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas">
        <Loader2 className="h-5 w-5 animate-spin text-accent" aria-hidden="true" />
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Verifying secure session…</p>
      </div>
    );
  }

  const renderContent = () => {
    if (selectedAppId && currentTab === 'app_detail') {
      return (
        <ApplicationDetail
          appId={selectedAppId}
          onBack={() => {
            setSelectedAppId(null);
            setCurrentTab('applications');
          }}
        />
      );
    }

    switch (currentTab) {
      case 'dashboard':
        if (currentUser.role === 'REGIONAL_OFFICER') {
          return <RegionalDashboard onNavigate={setCurrentTab} onOpenAppDetail={handleOpenAppDetail} />;
        }
        return <BureauDashboard onNavigate={setCurrentTab} onOpenAppDetail={handleOpenAppDetail} />;
      case 'institution_portal':
        return <InstitutionDashboard onOpenAppDetail={handleOpenAppDetail} />;
      case 'applications':
        return <ApplicationList onOpenAppDetail={handleOpenAppDetail} />;
      case 'evc_scheduling':
        return <EvcClusterMap />;
      case 'compliance_genome':
        return <ComplianceGenomeView />;
      case 'escalation_center':
        return <EscalationCenterView onOpenAppDetail={handleOpenAppDetail} />;
      case 'risk_registry':
      case 'audit_ledger':
        return <AuditLedgerView />;
      case 'delay_cost':
        return <DelayCostView />;
      case 'pendency_map':
        return <PendencyMap />;
      case 'bottleneck_forecast':
        return <BottleneckForecastView />;
      case 'workflow_config':
        return <WorkflowStudioView />;
      default:
        return <BureauDashboard onNavigate={setCurrentTab} onOpenAppDetail={handleOpenAppDetail} />;
    }
  };

  return (
    <Shell
      currentTab={currentTab}
      onSelectTab={tab => {
        setSelectedAppId(null);
        setCurrentTab(tab);
      }}
      onLogout={handleLogout}
      onOpenAppDetail={handleOpenAppDetail}
    >
      {renderContent()}
    </Shell>
  );
}
