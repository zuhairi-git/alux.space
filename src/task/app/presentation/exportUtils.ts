import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import pptxgen from 'pptxgenjs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Export to Word Document
export const exportToWord = () => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Page
          new Paragraph({
            text: 'Buddy Healthcare',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Product Owner Assignment',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Prioritization & Conflict Resolution',
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: 'Healthcare SaaS Excellence',
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Agenda
          new Paragraph({
            text: 'Agenda',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: '1. Backlog Prioritization - Strategic approach to healthcare SaaS priorities',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: '2. QA vs. CTO Conflict - Facilitating release readiness alignment',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: '3. Reflection - Key insights and learnings',
            spacing: { after: 400 },
          }),

          // Backlog Prioritization
          new Paragraph({
            text: 'Backlog Prioritization',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: 'Context',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: 'Buddy Healthcare is a healthcare SaaS platform supporting nurses and doctors with digital care pathways.',
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Key Prioritization Factors',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: '• Patient Safety (Critical)',
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: '• Data Reliability (High)',
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: '• Usability (High)',
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: '• Scalability (Medium)',
            spacing: { after: 400 },
          }),

          // Prioritized Backlog
          new Paragraph({
            text: 'Prioritized Backlog Items',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Internal Bug: Failed API Sync for 2% of Appointments', bold: true }),
              new TextRun({ text: '\nImpact: Directly affects patient care and appointment reliability\nReasoning: Data-loss/sync failures directly cause missed appointments and operational/customer harm. High risk to safety, SLAs and churn. Fix now (hotfix + root-cause) with immediate rollback/monitoring, and revert to green before new features.' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Customer Request: Automated Urgent Message to Patients Based on Form Answers', bold: true }),
              new TextRun({ text: '\nImpact: Patient safety and legal compliance\nReasoning: Safety-critical behavior with legal/regulatory implications. High user impact but requires careful spec, triage criteria, guardrails (clinical review, opt-in, audit trail). Prioritize design and safety review now; implement only if risk mitigated this sprint.' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. Nurse Feedback: Alert Visibility Is Too Subtle', bold: true }),
              new TextRun({ text: '\nImpact: User experience and workflow efficiency\nReasoning: UX issue affecting clinical situational awareness. Likely quick wins (visual/priority change, A/B test) that improve safety and satisfaction. Plan small iteration this sprint (mock → dev → test).' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '4. New Hospital Requests: HL7/FHIR Export', bold: true }),
              new TextRun({ text: '\nImpact: Interoperability and future growth\nReasoning: Strategic for sales and integrations but usually larger scope (auth, mapping, QA). Include as sprint focus only if you have dedicated engineering capacity—otherwise break into discovery/epic tasks (spec, security, pilot).' }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '5. Marketing Wants Push Notification Analytics', bold: true }),
              new TextRun({ text: '\nImpact: Business intelligence\nReasoning: Valuable for growth/measurement but non-critical to safety or core ops. Defer or schedule as a low-priority sprint item or handle as a small parallel task if capacity allows.' }),
            ],
            spacing: { after: 400 },
          }),

          // Conflict Resolution
          new Paragraph({
            text: 'QA vs. CTO Conflict Resolution',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            text: 'Scenario',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: 'QA Lead: "We found 15 open bugs, release should be delayed until all are resolved."\nCTO: "We\'re already behind schedule. Ship it now, we can patch later."',
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Resolution Approach',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: 'As Product Owner, I facilitated a structured conversation to balance quality and timeline pressures:',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: '1. Acknowledge Both Concerns\n   • Validated QA\'s commitment to quality\n   • Recognized CTO\'s schedule pressure\n   • Emphasized shared goal: delivering value safely',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: '2. Categorize and Prioritize Bugs\n   • Critical: Patient safety/data integrity bugs\n   • High: Major functionality broken\n   • Medium: Significant but non-blocking issues\n   • Low: Minor cosmetic or edge cases',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: '3. Establish Release Criteria\n   • Must-fix: All critical bugs (patient safety)\n   • Should-fix: High-priority bugs affecting core workflows\n   • Can-defer: Medium/low bugs documented for next sprint',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: '4. Define Risk Mitigation\n   • Monitoring plan for known issues\n   • Rollback strategy if problems arise\n   • Communication plan to stakeholders',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: 'To Avoid Such Conflicts',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: 'A mini-team meeting first allows QA, Dev, and Product to identify risks, blockers, and documentation gaps early. Then, an advance alignment meeting with leadership ensures everyone sees the same information before a formal release decision.',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: 'Benefits:',
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: '• Surfaces potential conflicts early, not at the last minute\n• Gives leadership context for informed decisions\n• Reduces last-minute pressure and emotional debate\n• Keeps accountability clear across teams',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: 'Essentially, it\'s proactive coordination—a small time investment that prevents bigger delays or tension later.',
            spacing: { after: 400 },
          }),

          // Reflection
          new Paragraph({
            text: 'Reflection & Key Insights',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Patient Safety First: ', bold: true }),
              new TextRun({ text: 'In healthcare, patient safety always trumps feature velocity or business pressure.' }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Data-Driven Decisions: ', bold: true }),
              new TextRun({ text: 'Use frameworks (RICE, MoSCoW, WSJF) to remove emotion from prioritization.' }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Transparent Communication: ', bold: true }),
              new TextRun({ text: 'Clear, honest dialogue with stakeholders builds trust and aligns expectations.' }),
            ],
            spacing: { after: 100 },
          }),
        ],
      },
    ],
  });

  // Generate and download
  import('docx').then(({ Packer }) => {
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'Buddy Healthcare_PO_Assignment.docx');
    });
  });
};

// Export to PowerPoint
export const exportToPowerPoint = () => {
  const pres = new pptxgen();

  // Set presentation properties
  pres.author = 'Buddy Healthcare PO';
  pres.company = 'Buddy Healthcare';
  pres.title = 'Product Owner Assignment';
  pres.subject = 'Prioritization & Conflict Resolution';

  // Slide 1: Title
  const slide1 = pres.addSlide();
  slide1.background = { color: '2563EB' };
  slide1.addText('Buddy Healthcare', {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 1,
    fontSize: 54,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
  });
  slide1.addText('Product Owner Assignment', {
    x: 0.5,
    y: 2.7,
    w: 9,
    h: 0.8,
    fontSize: 36,
    color: 'FFFFFF',
    align: 'center',
  });
  slide1.addText('Prioritization & Conflict Resolution', {
    x: 0.5,
    y: 3.8,
    w: 9,
    h: 0.5,
    fontSize: 20,
    color: 'E0E7FF',
    align: 'center',
  });
  slide1.addText('Healthcare SaaS Excellence', {
    x: 0.5,
    y: 4.4,
    w: 9,
    h: 0.4,
    fontSize: 16,
    color: 'C7D2FE',
    align: 'center',
  });

  // Slide 2: Agenda
  const slide2 = pres.addSlide();
  slide2.addText('Agenda', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: '1F2937',
  });
  slide2.addText([
    { text: '01  ', options: { fontSize: 24, bold: true, color: 'CBD5E1' } },
    { text: 'Backlog Prioritization\n', options: { fontSize: 20, bold: true, color: '1F2937' } },
    { text: '      Strategic approach to healthcare SaaS priorities\n\n', options: { fontSize: 14, color: '6B7280' } },
    { text: '02  ', options: { fontSize: 24, bold: true, color: 'CBD5E1' } },
    { text: 'QA vs. CTO Conflict\n', options: { fontSize: 20, bold: true, color: '1F2937' } },
    { text: '      Facilitating release readiness alignment\n\n', options: { fontSize: 14, color: '6B7280' } },
    { text: '03  ', options: { fontSize: 24, bold: true, color: 'CBD5E1' } },
    { text: 'Reflection\n', options: { fontSize: 20, bold: true, color: '1F2937' } },
    { text: '      Key insights and learnings', options: { fontSize: 14, color: '6B7280' } },
  ], {
    x: 1,
    y: 1.5,
    w: 8,
    h: 4,
  });

  // Slide 3: Backlog Context
  const slide3 = pres.addSlide();
  slide3.addText('Backlog Prioritization', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: '1F2937',
  });
  slide3.addText('Context', {
    x: 0.5,
    y: 1.3,
    w: 9,
    h: 0.4,
    fontSize: 24,
    bold: true,
    color: '3B82F6',
  });
  slide3.addText('Buddy Healthcare is a healthcare SaaS platform supporting nurses and doctors with digital care pathways.', {
    x: 0.5,
    y: 1.9,
    w: 9,
    h: 0.6,
    fontSize: 16,
    color: '374151',
  });
  slide3.addText('Key Prioritization Factors', {
    x: 0.5,
    y: 2.8,
    w: 9,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: '1F2937',
  });
  slide3.addText([
    { text: '• ', options: { color: 'EF4444' } },
    { text: 'Patient Safety', options: { bold: true, color: 'EF4444' } },
    { text: ' (Critical)\n', options: { color: '6B7280' } },
    { text: '• ', options: { color: 'F97316' } },
    { text: 'Data Reliability', options: { bold: true, color: 'F97316' } },
    { text: ' (High)\n', options: { color: '6B7280' } },
    { text: '• ', options: { color: '3B82F6' } },
    { text: 'Usability', options: { bold: true, color: '3B82F6' } },
    { text: ' (High)\n', options: { color: '6B7280' } },
    { text: '• ', options: { color: '10B981' } },
    { text: 'Scalability', options: { bold: true, color: '10B981' } },
    { text: ' (Medium)', options: { color: '6B7280' } },
  ], {
    x: 1,
    y: 3.4,
    w: 8,
    h: 1.5,
    fontSize: 16,
  });

  // Slide 4: Prioritized Items
  const slide4 = pres.addSlide();
  slide4.addText('Prioritized Backlog Items', {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.5,
    fontSize: 32,
    bold: true,
    color: '1F2937',
  });
  
  const items = [
    { num: '1', title: 'Internal Bug: Failed API Sync for 2% of Appointments', impact: 'Appointment reliability' },
    { num: '2', title: 'Customer Request: Automated Urgent Message to Patients', impact: 'Patient safety & compliance' },
    { num: '3', title: 'Nurse Feedback: Alert Visibility Is Too Subtle', impact: 'Clinical awareness' },
    { num: '4', title: 'New Hospital Requests: HL7/FHIR Export', impact: 'Interoperability' },
    { num: '5', title: 'Marketing Wants Push Notification Analytics', impact: 'Business intelligence' },
  ];

  let yPos = 1.2;
  items.forEach((item) => {
    slide4.addText([
      { text: `${item.num}. `, options: { fontSize: 16, bold: true, color: '3B82F6' } },
      { text: item.title, options: { fontSize: 14, bold: true, color: '1F2937' } },
    ], {
      x: 0.7,
      y: yPos,
      w: 8.5,
      h: 0.3,
    });
    slide4.addText(`Impact: ${item.impact}`, {
      x: 1,
      y: yPos + 0.3,
      w: 8.5,
      h: 0.25,
      fontSize: 11,
      color: '6B7280',
    });
    yPos += 0.75;
  });

  // Slide 5: Conflict Scenario
  const slide5 = pres.addSlide();
  slide5.addText('QA vs. CTO Conflict', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: '1F2937',
  });
  slide5.addText('Scenario', {
    x: 0.5,
    y: 1.3,
    w: 9,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: '8B5CF6',
  });
  
  slide5.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 2,
    w: 4,
    h: 1.2,
    fill: { color: 'FEF3C7' },
  });
  slide5.addText([
    { text: 'QA Lead:\n', options: { fontSize: 14, bold: true, color: 'D97706' } },
    { text: '"We found 15 open bugs, release should be delayed until all are resolved."', options: { fontSize: 12, color: '78350F' } },
  ], {
    x: 0.9,
    y: 2.1,
    w: 3.6,
    h: 1,
  });

  slide5.addShape(pres.ShapeType.rect, {
    x: 5.3,
    y: 2,
    w: 4,
    h: 1.2,
    fill: { color: 'DBEAFE' },
  });
  slide5.addText([
    { text: 'CTO:\n', options: { fontSize: 14, bold: true, color: '2563EB' } },
    { text: '"We\'re already behind schedule. Ship it now, we can patch later."', options: { fontSize: 12, color: '1E3A8A' } },
  ], {
    x: 5.5,
    y: 2.1,
    w: 3.6,
    h: 1,
  });

  slide5.addText('Resolution: Facilitate structured conversation to balance quality and timeline', {
    x: 0.7,
    y: 3.7,
    w: 8.6,
    h: 0.8,
    fontSize: 14,
    italic: true,
    color: '059669',
    align: 'center',
  });

  // Slide 6: Resolution Approach
  const slide6 = pres.addSlide();
  slide6.addText('Resolution Approach', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: '1F2937',
  });

  slide6.addText([
    { text: '1. Acknowledge Both Concerns\n', options: { fontSize: 16, bold: true, color: '10B981' } },
    { text: '   Validate both perspectives and emphasize shared goals\n\n', options: { fontSize: 12, color: '6B7280' } },
    { text: '2. Categorize and Prioritize Bugs\n', options: { fontSize: 16, bold: true, color: '10B981' } },
    { text: '   Critical → High → Medium → Low\n\n', options: { fontSize: 12, color: '6B7280' } },
    { text: '3. Establish Release Criteria\n', options: { fontSize: 16, bold: true, color: '10B981' } },
    { text: '   Must-fix, Should-fix, Can-defer categories\n\n', options: { fontSize: 12, color: '6B7280' } },
    { text: '4. Define Risk Mitigation\n', options: { fontSize: 16, bold: true, color: '10B981' } },
    { text: '   Monitoring, rollback strategy, communication plan\n\n', options: { fontSize: 12, color: '6B7280' } },
    { text: 'To Avoid Such Conflicts:\n', options: { fontSize: 14, bold: true, color: '2563EB' } },
    { text: 'Mini-team meetings + advance alignment with leadership\n', options: { fontSize: 11, color: '6B7280' } },
    { text: '✓ Surfaces conflicts early  ✓ Informed decisions\n', options: { fontSize: 10, color: '059669' } },
    { text: '✓ Reduces pressure  ✓ Clear accountability', options: { fontSize: 10, color: '059669' } },
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.2,
  });

  // Slide 7: Reflection
  const slide7 = pres.addSlide();
  slide7.addText('Reflection & Key Insights', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: '1F2937',
  });

  slide7.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 1.5,
    w: 8.6,
    h: 0.8,
    fill: { color: 'DBEAFE' },
  });
  slide7.addText([
    { text: 'Patient Safety First\n', options: { fontSize: 16, bold: true, color: '1E40AF' } },
    { text: 'In healthcare, patient safety always trumps feature velocity', options: { fontSize: 12, color: '1E3A8A' } },
  ], {
    x: 1,
    y: 1.6,
    w: 8,
    h: 0.7,
  });

  slide7.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 2.5,
    w: 8.6,
    h: 0.8,
    fill: { color: 'FEF3C7' },
  });
  slide7.addText([
    { text: 'Data-Driven Decisions\n', options: { fontSize: 16, bold: true, color: 'B45309' } },
    { text: 'Use frameworks to remove emotion from prioritization', options: { fontSize: 12, color: '78350F' } },
  ], {
    x: 1,
    y: 2.6,
    w: 8,
    h: 0.7,
  });

  slide7.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 3.5,
    w: 8.6,
    h: 0.8,
    fill: { color: 'E0E7FF' },
  });
  slide7.addText([
    { text: 'Transparent Communication\n', options: { fontSize: 16, bold: true, color: '4338CA' } },
    { text: 'Clear dialogue builds trust and aligns expectations', options: { fontSize: 12, color: '312E81' } },
  ], {
    x: 1,
    y: 3.6,
    w: 8,
    h: 0.7,
  });

  // Slide 8: Thank You
  const slide8 = pres.addSlide();
  slide8.background = { color: '4F46E5' };
  slide8.addText('Thank You', {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 1,
    fontSize: 48,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
  });
  slide8.addText('Questions & Discussion', {
    x: 0.5,
    y: 3.5,
    w: 9,
    h: 0.5,
    fontSize: 24,
    color: 'C7D2FE',
    align: 'center',
  });

  // Save presentation
  pres.writeFile({ fileName: 'Buddy Healthcare_PO_Assignment.pptx' });
};

// Export to Google Slides (creates an optimized PPTX file)
export const exportToGoogleSlides = () => {
  const pres = new pptxgen();

  // Set presentation properties optimized for Google Slides
  pres.author = 'Ali Al Zuhairi';
  pres.company = 'Buddy Healthcare';
  pres.title = 'Product Owner Assignment';
  pres.subject = 'Prioritization & Conflict Resolution';
  pres.layout = 'LAYOUT_WIDE';

  // Slide 1: Title Slide
  const slide1 = pres.addSlide();
  slide1.background = { fill: '2563EB' };
  
  // Logo placeholder
  slide1.addShape(pres.ShapeType.rect, {
    x: 4.0,
    y: 0.8,
    w: 2,
    h: 2,
    fill: { color: '3B82F6' },
    line: { width: 0 },
  });
  
  slide1.addText('Buddy Healthcare', {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 1,
    fontSize: 60,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });
  
  slide1.addText('Product Owner Assignment', {
    x: 0.5,
    y: 4.3,
    w: 9,
    h: 0.6,
    fontSize: 32,
    color: 'E0E7FF',
    align: 'center',
    fontFace: 'Arial',
  });
  
  slide1.addText('Presented by Ali Al Zuhairi', {
    x: 0.5,
    y: 5.1,
    w: 9,
    h: 0.4,
    fontSize: 18,
    color: 'C7D2FE',
    align: 'center',
    fontFace: 'Arial',
  });
  
  slide1.addText('Prioritization & Conflict Resolution', {
    x: 2,
    y: 6,
    w: 6,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
    fill: { color: '1E40AF' },
  });
  
  slide1.addText('Healthcare SaaS Excellence', {
    x: 0.5,
    y: 6.6,
    w: 9,
    h: 0.4,
    fontSize: 16,
    color: 'C7D2FE',
    align: 'center',
    fontFace: 'Arial',
  });

  // Slide 2: Agenda
  const slide2 = pres.addSlide();
  slide2.background = { fill: 'F8FAFC' };
  
  slide2.addText('Agenda', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 44,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  // Agenda items
  const agendaItems = [
    { num: '01', title: 'Backlog Prioritization', desc: 'Strategic approach to healthcare SaaS priorities', color: '14B8A6' },
    { num: '02', title: 'QA vs. CTO Conflict', desc: 'Facilitating release readiness alignment', color: 'EC4899' },
    { num: '03', title: 'How to Avoid Conflicts', desc: 'Proactive prevention strategies', color: '3B82F6' },
    { num: '04', title: 'Reflection', desc: 'Key insights and learnings', color: '8B5CF6' },
  ];
  
  let yPos = 1.6;
  agendaItems.forEach((item) => {
    // Background box
    slide2.addShape(pres.ShapeType.rect, {
      x: 0.7,
      y: yPos,
      w: 8.6,
      h: 0.9,
      fill: { color: 'FFFFFF' },
      line: { color: 'E5E7EB', width: 1 },
    });
    
    // Number circle
    slide2.addShape(pres.ShapeType.ellipse, {
      x: 0.9,
      y: yPos + 0.15,
      w: 0.6,
      h: 0.6,
      fill: { color: item.color },
      line: { width: 0 },
    });
    
    slide2.addText(item.num, {
      x: 0.9,
      y: yPos + 0.15,
      w: 0.6,
      h: 0.6,
      fontSize: 20,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
      fontFace: 'Arial',
    });
    
    // Title and description
    slide2.addText(item.title, {
      x: 1.8,
      y: yPos + 0.15,
      w: 7,
      h: 0.35,
      fontSize: 20,
      bold: true,
      color: '1F2937',
      fontFace: 'Arial',
    });
    
    slide2.addText(item.desc, {
      x: 1.8,
      y: yPos + 0.5,
      w: 7,
      h: 0.3,
      fontSize: 14,
      color: '6B7280',
      fontFace: 'Arial',
    });
    
    yPos += 1.1;
  });

  // Slide 3: Backlog Prioritization - Context
  const slide3 = pres.addSlide();
  slide3.background = { fill: 'F0FDFA' };
  
  slide3.addText('Backlog Prioritization', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 44,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  slide3.addText('Strategic approach to healthcare SaaS priorities', {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 18,
    color: '6B7280',
    fontFace: 'Arial',
  });
  
  // Context box
  slide3.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 2,
    w: 4,
    h: 2,
    fill: { color: 'DBEAFE' },
    line: { color: '3B82F6', width: 2 },
  });
  
  slide3.addText('Context', {
    x: 0.9,
    y: 2.1,
    w: 3.6,
    h: 0.4,
    fontSize: 22,
    bold: true,
    color: '1E40AF',
    fontFace: 'Arial',
  });
  
  slide3.addText('Buddy Healthcare is a healthcare SaaS platform supporting nurses and doctors with digital care pathways.', {
    x: 0.9,
    y: 2.6,
    w: 3.6,
    h: 1.2,
    fontSize: 14,
    color: '1E3A8A',
    fontFace: 'Arial',
  });
  
  // Key Priorities box
  slide3.addShape(pres.ShapeType.rect, {
    x: 5,
    y: 2,
    w: 4.3,
    h: 2,
    fill: { color: 'FEF3C7' },
    line: { color: 'F59E0B', width: 2 },
  });
  
  slide3.addText('Key Priorities', {
    x: 5.2,
    y: 2.1,
    w: 3.9,
    h: 0.4,
    fontSize: 22,
    bold: true,
    color: 'B45309',
    fontFace: 'Arial',
  });
  
  const priorities = [
    { icon: '🛡️', text: 'Patient Safety', level: 'Critical' },
    { icon: '💾', text: 'Data Reliability', level: 'High' },
    { icon: '✨', text: 'Usability', level: 'High' },
    { icon: '🚀', text: 'Scalability', level: 'Medium' },
  ];
  
  let priorityY = 2.7;
  priorities.forEach((p) => {
    slide3.addText(`${p.icon} ${p.text} (${p.level})`, {
      x: 5.2,
      y: priorityY,
      w: 3.9,
      h: 0.3,
      fontSize: 12,
      color: '78350F',
      fontFace: 'Arial',
    });
    priorityY += 0.35;
  });

  // Priority Ranking Section
  slide3.addText('Priority Ranking', {
    x: 0.7,
    y: 4.3,
    w: 8.6,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });

  // Slide 4: Priority Items (1-3)
  const slide4 = pres.addSlide();
  slide4.background = { fill: 'F8FAFC' };
  
  slide4.addText('Prioritized Backlog Items', {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  const priorityItems = [
    {
      rank: '1',
      title: 'Internal bug: failed API sync for 2% of appointments',
      reasoning: 'Data-loss/sync failures cause missed appointments. High risk to safety and SLAs. Fix now with immediate rollback/monitoring.',
      color: 'EF4444',
      bgColor: 'FEE2E2',
    },
    {
      rank: '2',
      title: 'Customer request: automated urgent message to patients based on form answers',
      reasoning: 'Safety-critical with legal/regulatory implications. Requires careful spec and guardrails. Prioritize design review.',
      color: 'F97316',
      bgColor: 'FFEDD5',
    },
    {
      rank: '3',
      title: 'Nurse feedback: alert visibility is too subtle',
      reasoning: 'UX issue affecting clinical awareness. Quick wins to improve safety and satisfaction. Plan small iteration this sprint.',
      color: 'F59E0B',
      bgColor: 'FEF3C7',
    },
  ];
  
  yPos = 1.3;
  priorityItems.forEach((item) => {
    slide4.addShape(pres.ShapeType.rect, {
      x: 0.7,
      y: yPos,
      w: 8.6,
      h: 1.3,
      fill: { color: item.bgColor },
      line: { color: item.color, width: 2 },
    });
    
    // Rank badge
    slide4.addShape(pres.ShapeType.ellipse, {
      x: 0.9,
      y: yPos + 0.15,
      w: 0.5,
      h: 0.5,
      fill: { color: item.color },
      line: { width: 0 },
    });
    
    slide4.addText(item.rank, {
      x: 0.9,
      y: yPos + 0.15,
      w: 0.5,
      h: 0.5,
      fontSize: 18,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
      fontFace: 'Arial',
    });
    
    // Title
    slide4.addText(item.title, {
      x: 1.6,
      y: yPos + 0.15,
      w: 7.5,
      h: 0.4,
      fontSize: 14,
      bold: true,
      color: '1F2937',
      fontFace: 'Arial',
    });
    
    // Reasoning
    slide4.addText(item.reasoning, {
      x: 1.6,
      y: yPos + 0.6,
      w: 7.5,
      h: 0.6,
      fontSize: 11,
      color: '4B5563',
      fontFace: 'Arial',
    });
    
    yPos += 1.5;
  });

  // Slide 5: Priority Items (4-5)
  const slide5 = pres.addSlide();
  slide5.background = { fill: 'F8FAFC' };
  
  slide5.addText('Prioritized Backlog Items (continued)', {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.6,
    fontSize: 36,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  const priorityItems2 = [
    {
      rank: '4',
      title: 'New hospital requests: HL7/FHIR export',
      reasoning: 'Strategic for sales and integrations but larger scope. Include only with dedicated capacity—otherwise break into discovery tasks.',
      color: '3B82F6',
      bgColor: 'DBEAFE',
    },
    {
      rank: '5',
      title: 'Marketing wants push notification analytics',
      reasoning: 'Valuable for growth but non-critical to safety. Defer or schedule as low-priority item if capacity allows.',
      color: '8B5CF6',
      bgColor: 'EDE9FE',
    },
  ];
  
  yPos = 1.3;
  priorityItems2.forEach((item) => {
    slide5.addShape(pres.ShapeType.rect, {
      x: 0.7,
      y: yPos,
      w: 8.6,
      h: 1.3,
      fill: { color: item.bgColor },
      line: { color: item.color, width: 2 },
    });
    
    // Rank badge
    slide5.addShape(pres.ShapeType.ellipse, {
      x: 0.9,
      y: yPos + 0.15,
      w: 0.5,
      h: 0.5,
      fill: { color: item.color },
      line: { width: 0 },
    });
    
    slide5.addText(item.rank, {
      x: 0.9,
      y: yPos + 0.15,
      w: 0.5,
      h: 0.5,
      fontSize: 18,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
      fontFace: 'Arial',
    });
    
    // Title
    slide5.addText(item.title, {
      x: 1.6,
      y: yPos + 0.15,
      w: 7.5,
      h: 0.4,
      fontSize: 14,
      bold: true,
      color: '1F2937',
      fontFace: 'Arial',
    });
    
    // Reasoning
    slide5.addText(item.reasoning, {
      x: 1.6,
      y: yPos + 0.6,
      w: 7.5,
      h: 0.6,
      fontSize: 11,
      color: '4B5563',
      fontFace: 'Arial',
    });
    
    yPos += 1.5;
  });

  // Slide 6: Conflict Scenario
  const slide6 = pres.addSlide();
  slide6.background = { fill: 'FDF2F8' };
  
  slide6.addText('Conflict Scenario', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 44,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  slide6.addText('QA vs. CTO Release Decision', {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 20,
    color: '6B7280',
    fontFace: 'Arial',
  });
  
  // QA Position
  slide6.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 2,
    w: 4,
    h: 2.2,
    fill: { color: 'FEE2E2' },
    line: { color: 'EF4444', width: 3 },
  });
  
  slide6.addText('🔍 QA Team', {
    x: 0.9,
    y: 2.1,
    w: 3.6,
    h: 0.4,
    fontSize: 22,
    bold: true,
    color: 'DC2626',
    fontFace: 'Arial',
  });
  
  slide6.addText('Position:', {
    x: 0.9,
    y: 2.6,
    w: 3.6,
    h: 0.3,
    fontSize: 14,
    bold: true,
    color: '991B1B',
    fontFace: 'Arial',
  });
  
  slide6.addText('"Delay the release due to incomplete verification documentation"', {
    x: 0.9,
    y: 2.95,
    w: 3.6,
    h: 0.6,
    fontSize: 12,
    color: '7F1D1D',
    fontFace: 'Arial',
  });
  
  slide6.addText('⚠️ Compliance risk\n📋 Documentation gaps', {
    x: 0.9,
    y: 3.6,
    w: 3.6,
    h: 0.5,
    fontSize: 11,
    color: '991B1B',
    fontFace: 'Arial',
  });
  
  // VS badge
  slide6.addShape(pres.ShapeType.ellipse, {
    x: 4.25,
    y: 2.8,
    w: 1.5,
    h: 1.5,
    fill: { color: '8B5CF6' },
    line: { width: 0 },
  });
  
  slide6.addText('VS', {
    x: 4.25,
    y: 2.8,
    w: 1.5,
    h: 1.5,
    fontSize: 36,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    valign: 'middle',
    fontFace: 'Arial',
  });
  
  // CTO Position
  slide6.addShape(pres.ShapeType.rect, {
    x: 5.3,
    y: 2,
    w: 4,
    h: 2.2,
    fill: { color: 'DBEAFE' },
    line: { color: '3B82F6', width: 3 },
  });
  
  slide6.addText('🚀 CTO', {
    x: 5.5,
    y: 2.1,
    w: 3.6,
    h: 0.4,
    fontSize: 22,
    bold: true,
    color: '2563EB',
    fontFace: 'Arial',
  });
  
  slide6.addText('Position:', {
    x: 5.5,
    y: 2.6,
    w: 3.6,
    h: 0.3,
    fontSize: 14,
    bold: true,
    color: '1E40AF',
    fontFace: 'Arial',
  });
  
  slide6.addText('"Release on schedule to maintain momentum and commitments"', {
    x: 5.5,
    y: 2.95,
    w: 3.6,
    h: 0.6,
    fontSize: 12,
    color: '1E3A8A',
    fontFace: 'Arial',
  });
  
  slide6.addText('⏰ Timeline pressure\n👥 Stakeholder expectations', {
    x: 5.5,
    y: 3.6,
    w: 3.6,
    h: 0.5,
    fontSize: 11,
    color: '1E40AF',
    fontFace: 'Arial',
  });
  
  // Question
  slide6.addShape(pres.ShapeType.rect, {
    x: 2,
    y: 5,
    w: 6,
    h: 0.7,
    fill: { color: '1F2937' },
    line: { width: 0 },
  });
  
  slide6.addText('❓ How should we resolve this conflict?', {
    x: 2.2,
    y: 5.15,
    w: 5.6,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });

  // Slide 7: Resolution
  const slide7 = pres.addSlide();
  slide7.background = { fill: 'F0FDFA' };
  
  slide7.addText('Resolution', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 44,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  slide7.addText('Finding Common Ground Through Structured Facilitation', {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 18,
    color: '6B7280',
    fontFace: 'Arial',
  });
  
  // Alignment box
  slide7.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 1.9,
    w: 4.2,
    h: 1.6,
    fill: { color: 'CCFBF1' },
    line: { color: '14B8A6', width: 2 },
  });
  
  slide7.addText('🎯 Alignment Reached', {
    x: 0.9,
    y: 2,
    w: 3.8,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: '0F766E',
    fontFace: 'Arial',
  });
  
  slide7.addText('Regulatory compliance and product safety are non-negotiable priorities. We also acknowledged the critical importance of maintaining delivery predictability.', {
    x: 0.9,
    y: 2.5,
    w: 3.8,
    h: 0.9,
    fontSize: 12,
    color: '134E4A',
    fontFace: 'Arial',
  });
  
  // Key Outcome box
  slide7.addShape(pres.ShapeType.rect, {
    x: 5.1,
    y: 1.9,
    w: 4.2,
    h: 1.6,
    fill: { color: 'E0E7FF' },
    line: { color: '6366F1', width: 2 },
  });
  
  slide7.addText('💡 Key Outcome', {
    x: 5.3,
    y: 2,
    w: 3.8,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: '4338CA',
    fontFace: 'Arial',
  });
  
  slide7.addText('Maintains delivery discipline while ensuring quality standards are respected. Fosters collaboration rather than compromise.', {
    x: 5.3,
    y: 2.5,
    w: 3.8,
    h: 0.9,
    fontSize: 12,
    color: '312E81',
    fontFace: 'Arial',
  });
  
  // Agreed Actions
  slide7.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 3.8,
    w: 8.6,
    h: 2.7,
    fill: { color: 'FFFFFF' },
    line: { color: '8B5CF6', width: 2 },
  });
  
  slide7.addText('✅ Agreed Actions', {
    x: 0.9,
    y: 3.9,
    w: 8.2,
    h: 0.4,
    fontSize: 22,
    bold: true,
    color: '7C3AED',
    fontFace: 'Arial',
  });
  
  slide7.addText('1️⃣ QA will identify the minimum critical documentation required for release compliance.\n\n2️⃣ Development continues in parallel to avoid blocking non-risk areas.\n\n3️⃣ A final readiness checkpoint will occur before release for QA sign-off on key verification items.', {
    x: 0.9,
    y: 4.5,
    w: 8.2,
    h: 1.8,
    fontSize: 13,
    color: '1F2937',
    fontFace: 'Arial',
  });

  // Slide 8: How to Avoid Conflicts
  const slide8 = pres.addSlide();
  slide8.background = { fill: 'EFF6FF' };
  
  slide8.addText('How to Avoid Such Conflicts', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 44,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  slide8.addText('Proactive Conflict Prevention Strategy', {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 18,
    color: '6B7280',
    fontFace: 'Arial',
  });
  
  // Introduction box
  slide8.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 1.9,
    w: 8.6,
    h: 1.2,
    fill: { color: 'DBEAFE' },
    line: { color: '3B82F6', width: 2 },
  });
  
  slide8.addText('🛡️ Proactive Coordination Approach', {
    x: 0.9,
    y: 2,
    w: 8.2,
    h: 0.4,
    fontSize: 20,
    bold: true,
    color: '1E40AF',
    fontFace: 'Arial',
  });
  
  slide8.addText('A mini-team meeting first allows QA, Dev, and Product to identify risks, blockers, and documentation gaps early. Then, an advance alignment meeting with leadership ensures everyone sees the same information before a formal release decision.', {
    x: 0.9,
    y: 2.5,
    w: 8.2,
    h: 0.5,
    fontSize: 13,
    color: '1E3A8A',
    fontFace: 'Arial',
  });
  
  // Phase 1
  slide8.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 3.4,
    w: 4.2,
    h: 2.2,
    fill: { color: 'DBEAFE' },
    line: { color: '3B82F6', width: 2 },
  });
  
  slide8.addText('1️⃣ Mini-Team Meeting', {
    x: 0.9,
    y: 3.5,
    w: 3.8,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: '2563EB',
    fontFace: 'Arial',
  });
  
  slide8.addText('QA, Development, and Product teams collaborate to identify potential issues early.\n\n✓ Identify risks & blockers\n✓ Surface documentation gaps\n✓ Align on technical readiness', {
    x: 0.9,
    y: 4,
    w: 3.8,
    h: 1.4,
    fontSize: 12,
    color: '1E40AF',
    fontFace: 'Arial',
  });
  
  // Phase 2
  slide8.addShape(pres.ShapeType.rect, {
    x: 5.1,
    y: 3.4,
    w: 4.2,
    h: 2.2,
    fill: { color: 'EDE9FE' },
    line: { color: '8B5CF6', width: 2 },
  });
  
  slide8.addText('2️⃣ Leadership Alignment', {
    x: 5.3,
    y: 3.5,
    w: 3.8,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: '7C3AED',
    fontFace: 'Arial',
  });
  
  slide8.addText('Present unified information to leadership before formal release decisions.\n\n✓ Shared context for all stakeholders\n✓ Informed decision-making\n✓ Clear accountability', {
    x: 5.3,
    y: 4,
    w: 3.8,
    h: 1.4,
    fontSize: 12,
    color: '6D28D9',
    fontFace: 'Arial',
  });

  // Slide 9: Reflection
  const slide9 = pres.addSlide();
  slide9.background = { fill: 'FAF5FF' };
  
  slide9.addText('Key Takeaways', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.7,
    fontSize: 44,
    bold: true,
    color: '1F2937',
    fontFace: 'Arial',
  });
  
  slide9.addText('Product Owner Excellence in Action', {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 18,
    color: '6B7280',
    fontFace: 'Arial',
  });
  
  // Core Approach
  slide9.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 1.9,
    w: 8.6,
    h: 1,
    fill: { color: 'F3E8FF' },
    line: { color: '9333EA', width: 2 },
  });
  
  slide9.addText('💡 Core Approach', {
    x: 0.9,
    y: 2,
    w: 8.2,
    h: 0.3,
    fontSize: 18,
    bold: true,
    color: '7E22CE',
    fontFace: 'Arial',
  });
  
  slide9.addText('Prioritization based on impact, risk, and value while facilitating team alignment through structured reasoning and transparent communication.', {
    x: 0.9,
    y: 2.4,
    w: 8.2,
    h: 0.4,
    fontSize: 13,
    color: '6B21A8',
    fontFace: 'Arial',
  });
  
  // Three cards
  const cards = [
    { icon: '🎯', title: 'Impact-Driven', desc: 'Patient safety and data reliability first', color: '3B82F6', bgColor: 'DBEAFE' },
    { icon: '⚖️', title: 'Risk-Aware', desc: 'Balance speed with compliance', color: '8B5CF6', bgColor: 'EDE9FE' },
    { icon: '🤝', title: 'Collaborative', desc: 'Foster alignment over authority', color: '14B8A6', bgColor: 'CCFBF1' },
  ];
  
  let cardX = 0.7;
  cards.forEach((card) => {
    slide9.addShape(pres.ShapeType.rect, {
      x: cardX,
      y: 3.2,
      w: 2.7,
      h: 1.4,
      fill: { color: card.bgColor },
      line: { color: card.color, width: 2 },
    });
    
    slide9.addText(card.icon, {
      x: cardX,
      y: 3.35,
      w: 2.7,
      h: 0.4,
      fontSize: 32,
      align: 'center',
      fontFace: 'Arial',
    });
    
    slide9.addText(card.title, {
      x: cardX + 0.1,
      y: 3.85,
      w: 2.5,
      h: 0.3,
      fontSize: 16,
      bold: true,
      color: '1F2937',
      align: 'center',
      fontFace: 'Arial',
    });
    
    slide9.addText(card.desc, {
      x: cardX + 0.1,
      y: 4.2,
      w: 2.5,
      h: 0.3,
      fontSize: 11,
      color: '4B5563',
      align: 'center',
      fontFace: 'Arial',
    });
    
    cardX += 2.9;
  });
  
  // Bottom summary
  slide9.addShape(pres.ShapeType.rect, {
    x: 0.7,
    y: 5,
    w: 8.6,
    h: 1.2,
    fill: { color: '4F46E5' },
    line: { width: 0 },
  });
  
  slide9.addText('⭐ Product Owner Excellence', {
    x: 0.9,
    y: 5.15,
    w: 8.2,
    h: 0.3,
    fontSize: 18,
    bold: true,
    color: 'FFFFFF',
    fontFace: 'Arial',
  });
  
  slide9.addText('Balancing stakeholder needs, technical constraints, and business value while maintaining focus on user outcomes and team collaboration.', {
    x: 0.9,
    y: 5.5,
    w: 8.2,
    h: 0.5,
    fontSize: 13,
    color: 'E0E7FF',
    fontFace: 'Arial',
  });

  // Slide 10: Thank You
  const slide10 = pres.addSlide();
  slide10.background = { fill: '4F46E5' };
  
  slide10.addText('Thank You!', {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 1,
    fontSize: 60,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Arial',
  });
  
  slide10.addText('Questions & Discussion', {
    x: 0.5,
    y: 3.7,
    w: 9,
    h: 0.6,
    fontSize: 28,
    color: 'C7D2FE',
    align: 'center',
    fontFace: 'Arial',
  });
  
  slide10.addText('❤️', {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 0.8,
    fontSize: 48,
    align: 'center',
    fontFace: 'Arial',
  });
  
  slide10.addText('Buddy Healthcare Product Owner Assignment', {
    x: 0.5,
    y: 5,
    w: 9,
    h: 0.4,
    fontSize: 14,
    color: 'E0E7FF',
    align: 'center',
    fontFace: 'Arial',
  });

  // Save presentation optimized for Google Slides
  pres.writeFile({ fileName: 'Buddy_Healthcare_PO_Assignment_GoogleSlides.pptx' });
};

// Export to PDF
export const exportToPDF = async () => {
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const wrappers = Array.from(document.querySelectorAll<HTMLElement>('[data-slide-wrapper]'));
  const root = document.getElementById('presentation-root') as HTMLElement | null;
  
  if (wrappers.length === 0) {
    // Fallback: create PDF from text content
    createTextBasedPDF(pdf);
    return;
  }

  // Helper: wait for images and fonts to be ready
  const waitForAssets = async (el: HTMLElement) => {
    const imgs = Array.from(el.querySelectorAll('img')) as HTMLImageElement[];
    const notLoaded = imgs.filter((img) => !img.complete || img.naturalWidth === 0);
    await Promise.all(
      notLoaded.map(
        (img) =>
          new Promise<void>((res) => {
            img.addEventListener('load', () => res(), { once: true });
            img.addEventListener('error', () => res(), { once: true });
          })
      )
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((document as any).fonts?.ready) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (document as any).fonts.ready;
      } catch {}
    }
  };

  // Capture each slide wrapper individually to avoid hidden ancestor issues
  for (let i = 0; i < wrappers.length; i++) {
    const wrapper = wrappers[i];
    try {
      const prev = {
        display: wrapper.style.display,
        position: wrapper.style.position,
        width: wrapper.style.width,
        height: wrapper.style.height,
        visibility: wrapper.style.visibility,
      };

      // Ensure only this wrapper is visible
      const viewportW = Math.max(window.innerWidth, 1280);
      const viewportH = Math.max(window.innerHeight, 720);
      const others = wrappers.filter((w) => w !== wrapper);
      const otherPrev: Array<{el: HTMLElement; display: string; visibility: string}> = [];
      others.forEach((el) => {
        otherPrev.push({ el, display: el.style.display, visibility: el.style.visibility });
        el.style.display = 'none';
        el.style.visibility = 'hidden';
      });

      wrapper.style.display = 'block';
      wrapper.style.position = 'relative';
      wrapper.style.visibility = 'visible';
      wrapper.style.width = `${viewportW}px`;
      wrapper.style.height = `${viewportH}px`;

      // Prefer the slide root inside the wrapper if present
      const target = (wrapper.querySelector('[data-slide]') as HTMLElement) || wrapper;
      const targetPrev = {
        width: target.style.width,
        height: target.style.height,
        minWidth: target.style.minWidth,
        minHeight: target.style.minHeight,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transform: (target.style as any).transform,
        opacity: target.style.opacity,
      };
      target.style.width = `${viewportW}px`;
      target.style.height = `${viewportH}px`;
      target.style.minWidth = `${viewportW}px`;
      target.style.minHeight = `${viewportH}px`;
      target.style.opacity = '1';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target.style as any).transform = 'none';

      // Wait a tick for layout
      await new Promise((r) => requestAnimationFrame(() => r(null)));

      const captureEl = root ?? target;

      // Wait for images and fonts
      await waitForAssets(captureEl);
      // Small delay to let layout settle
      await new Promise((r) => setTimeout(r, 150));

      const canvas = await html2canvas(captureEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: viewportW,
        windowHeight: viewportH,
      });
      // Restore others
      otherPrev.forEach(({ el, display, visibility }) => {
        el.style.display = display;
        el.style.visibility = visibility;
      });

      // Restore wrapper styles
      wrapper.style.display = prev.display;
      wrapper.style.position = prev.position;
      wrapper.style.width = prev.width;
      wrapper.style.height = prev.height;
      wrapper.style.visibility = prev.visibility;
      target.style.width = targetPrev.width;
      target.style.height = targetPrev.height;
      target.style.minWidth = targetPrev.minWidth;
      target.style.minHeight = targetPrev.minHeight;
      target.style.opacity = targetPrev.opacity;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target.style as any).transform = targetPrev.transform;

      if (i > 0) pdf.addPage('a4', 'landscape');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
    } catch (error) {
      console.error(`Error capturing slide ${i + 1}:`, error);
    }
  }

  pdf.save('Buddy Healthcare_PO_Assignment.pdf');
};

// Fallback text-based PDF if HTML capture fails
const createTextBasedPDF = (pdf: jsPDF) => {
  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 20;
  let yPos = margin;

  // Helper to add text with word wrap
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(color);
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    
    lines.forEach((line: string) => {
      if (yPos > pageHeight - margin) {
        pdf.addPage();
        yPos = margin;
      }
      pdf.text(line, margin, yPos);
      yPos += fontSize * 0.5;
    });
    yPos += 5;
  };

  // Title Page
  pdf.setFillColor(37, 99, 235);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  pdf.setTextColor('#ffffff');
  pdf.setFontSize(48);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Buddy Healthcare', pageWidth / 2, 80, { align: 'center' });
  pdf.setFontSize(32);
  pdf.text('Product Owner Assignment', pageWidth / 2, 100, { align: 'center' });
  pdf.setFontSize(18);
  pdf.text('Prioritization & Conflict Resolution', pageWidth / 2, 120, { align: 'center' });
  pdf.setFontSize(14);
  pdf.text('Healthcare SaaS Excellence', pageWidth / 2, 135, { align: 'center' });

  // Agenda
  pdf.addPage();
  yPos = margin;
  pdf.setTextColor('#000000');
  addText('Agenda', 32, true);
  addText('1. Backlog Prioritization', 16, true);
  addText('   Strategic approach to healthcare SaaS priorities', 12);
  addText('2. QA vs. CTO Conflict', 16, true);
  addText('   Facilitating release readiness alignment', 12);
  addText('3. Reflection', 16, true);
  addText('   Key insights and learnings', 12);

  // Backlog Prioritization
  pdf.addPage();
  yPos = margin;
  addText('Backlog Prioritization', 28, true);
  addText('Context', 18, true);
  addText('Buddy Healthcare is a healthcare SaaS platform supporting nurses and doctors with digital care pathways.', 12);
  
  addText('Key Prioritization Factors', 18, true);
  addText('• Patient Safety (Critical)', 12);
  addText('• Data Reliability (High)', 12);
  addText('• Usability (High)', 12);
  addText('• Scalability (Medium)', 12);

  // Prioritized Items
  pdf.addPage();
  yPos = margin;
  addText('Prioritized Backlog Items', 24, true);
  
  addText('1. Internal Bug: Failed API Sync for 2% of Appointments', 14, true);
  addText('Impact: Appointment reliability and customer trust', 11);
  addText('Reasoning: Data-loss/sync failures directly cause missed appointments and operational/customer harm. High risk to safety, SLAs and churn. Fix now (hotfix + root-cause) with immediate rollback/monitoring.', 10);
  
  addText('2. Customer Request: Automated Urgent Message to Patients Based on Form Answers', 14, true);
  addText('Impact: Patient safety and legal compliance', 11);
  addText('Reasoning: Safety-critical behavior with legal/regulatory implications. High user impact but requires careful spec, triage criteria, guardrails (clinical review, opt-in, audit trail).', 10);
  
  addText('3. Nurse Feedback: Alert Visibility Is Too Subtle', 14, true);
  addText('Impact: Clinical situational awareness', 11);
  addText('Reasoning: UX issue affecting clinical situational awareness. Likely quick wins (visual/priority change, A/B test) that improve safety and satisfaction.', 10);

  pdf.addPage();
  yPos = margin;
  
  addText('4. New Hospital Requests: HL7/FHIR Export', 14, true);
  addText('Impact: Interoperability and future growth', 11);
  addText('Reasoning: Strategic for sales and integrations but usually larger scope (auth, mapping, QA). Include as sprint focus only if you have dedicated engineering capacity.', 10);
  
  addText('5. Marketing Wants Push Notification Analytics', 14, true);
  addText('Impact: Business intelligence', 11);
  addText('Reasoning: Valuable for growth/measurement but non-critical to safety or core ops. Defer or schedule as a low-priority sprint item.', 10);

  // Conflict Resolution
  pdf.addPage();
  yPos = margin;
  addText('QA vs. CTO Conflict Resolution', 28, true);
  addText('Scenario', 18, true);
  addText('QA Lead: "We found 15 open bugs, release should be delayed until all are resolved."', 12);
  addText('CTO: "We\'re already behind schedule. Ship it now, we can patch later."', 12);
  
  addText('Resolution Approach', 18, true);
  addText('1. Acknowledge Both Concerns', 14, true);
  addText('   Validate both perspectives and emphasize shared goals', 11);
  addText('2. Categorize and Prioritize Bugs', 14, true);
  addText('   Critical → High → Medium → Low', 11);
  addText('3. Establish Release Criteria', 14, true);
  addText('   Must-fix, Should-fix, Can-defer categories', 11);
  addText('4. Define Risk Mitigation', 14, true);
  addText('   Monitoring, rollback strategy, communication plan', 11);
  
  addText('To Avoid Such Conflicts', 16, true);
  addText('A mini-team meeting first allows QA, Dev, and Product to identify risks, blockers, and documentation gaps early. Then, an advance alignment meeting with leadership ensures everyone sees the same information before a formal release decision.', 11);
  addText('Benefits:', 12, true);
  addText('• Surfaces potential conflicts early, not at the last minute', 10);
  addText('• Gives leadership context for informed decisions', 10);
  addText('• Reduces last-minute pressure and emotional debate', 10);
  addText('• Keeps accountability clear across teams', 10);
  addText('Essentially, it\'s proactive coordination—a small time investment that prevents bigger delays or tension later.', 10);

  // Reflection
  pdf.addPage();
  yPos = margin;
  addText('Reflection & Key Insights', 28, true);
  addText('Patient Safety First', 16, true);
  addText('In healthcare, patient safety always trumps feature velocity or business pressure.', 12);
  addText('Data-Driven Decisions', 16, true);
  addText('Use frameworks (RICE, MoSCoW, WSJF) to remove emotion from prioritization.', 12);
  addText('Transparent Communication', 16, true);
  addText('Clear, honest dialogue with stakeholders builds trust and aligns expectations.', 12);

  pdf.save('Buddy Healthcare_PO_Assignment.pdf');
};

