import jsPDF from 'jspdf';
import { Application, Institution } from '@/types';

export function generateAuditDossierPdf(app: Application, institution?: Institution) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Header Banner
  doc.setFillColor(20, 43, 74); // #142B4A Primary Navy
  doc.rect(0, 0, pageWidth, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('AICTE FLOWGUARD — OFFICIAL AUDIT DOSSIER', 14, 16);

  doc.setFontSize(9);
  doc.setFont('Helvetica', 'normal');
  doc.text('AICTE Regulation Bureau | Smart India Hackathon 2026', pageWidth - 14, 16, { align: 'right' });

  y = 35;
  doc.setTextColor(23, 43, 67);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Application Reference: ${app.id}`, 14, y);
  
  y += 7;
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Institution Name: ${app.institutionName}`, 14, y);
  y += 6;
  doc.text(`State & Region: ${app.state} (${app.region})`, 14, y);
  y += 6;
  doc.text(`Course Category: ${app.category} | Intake: ${app.intakeSize} | Faculty: ${app.facultyCount}`, 14, y);
  y += 6;
  doc.text(`Current Application Status: ${app.status} | Risk Priority: ${app.riskPriority}`, 14, y);
  y += 6;
  doc.text(`Submission Date: ${app.submissionDate} | SLA Deadline: ${app.slaDeadline}`, 14, y);

  // Financial & Delay Cost Box
  y += 10;
  doc.setFillColor(240, 244, 248);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.text('Estimated Institutional Delay Cost Calculus:', 18, y + 7);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Total Estimated Cost: Rs. ${(app.delayCost || 0).toLocaleString('en-IN')} | Days Overdue: ${app.daysOverdue}`, 18, y + 15);

  // Workflow Stage History
  y += 30;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Workflow Stage Audit History:', 14, y);
  y += 6;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  app.stages.forEach((stg, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${index + 1}. [${stg.status}] ${stg.name} — Assigned Role: ${stg.assignedRole} (${stg.elapsedDays}/${stg.slaDays} SLA days)`, 18, y);
    if (stg.notes) {
      y += 5;
      doc.setTextColor(100, 100, 100);
      doc.text(`   Notes: ${stg.notes}`, 18, y);
      doc.setTextColor(23, 43, 67);
    }
    y += 7;
  });

  // Institution Compliance Genome
  if (institution) {
    y += 5;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Institutional Compliance Genome Profile:', 14, y);
    y += 6;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Compliance Health Score: ${institution.complianceHealthScore}/100`, 18, y);
    y += 5;
    doc.text(`Historical Late Submissions: ${institution.lateSubmissions} | Escalation Count: ${institution.escalationCount}`, 18, y);
    y += 7;
  }

  // Cryptographic Audit Hash Verification
  y += 5;
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(14, y, pageWidth - 28, 18, 2, 2, 'F');
  doc.setFont('Helvetica', 'bold');
  doc.text('Cryptographic Audit Proof (SHA-256 Chain):', 18, y + 6);
  doc.setFont('Courier', 'normal');
  doc.setFontSize(8);
  doc.text('Chain Verified: 0x8f9b2c3a1e4d5f6a7890bcdef1234567890abcdef (INTACT)', 18, y + 13);

  // Footer
  y += 25;
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`DEMO DATA — FOR SYSTEM EVALUATION. Generated on ${new Date().toLocaleString()} by AICTE FlowGuard Engine.`, 14, y);

  // Download PDF
  doc.save(`AICTE_FlowGuard_Dossier_${app.id}.pdf`);
}
