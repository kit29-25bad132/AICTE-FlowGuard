'use client';
import React, { useState, useEffect } from 'react';
import { flowStore } from '@/lib/store';
import LoginScreen from '@/components/auth/LoginScreen';
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

export default function Page() {
  const [storeState, setStoreState] = useState(flowStore.getState());
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = flowStore.subscribe(() => {
      setStoreState(flowStore.getState());
    });
    return unsub;
  }, []);

  const { currentUser } = storeState;

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    if (storeState.currentUser.role === 'INSTITUTION') {
      setCurrentTab('institution_portal');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleOpenAppDetail = (appId: string) => {
    setSelectedAppId(appId);
    setCurrentTab('app_detail');
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
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
      onLogout={() => setIsAuthenticated(false)}
      onOpenAppDetail={handleOpenAppDetail}
    >
      {renderContent()}
    </Shell>
  );
}
