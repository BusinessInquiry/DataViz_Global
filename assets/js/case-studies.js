(() => {
  'use strict';

  const caseStudies = [
    {
      industry: 'Automobile',
      title: 'Market Expansion',
      summary: 'A leading automobile company needed a clearer way to evaluate new international markets for its two-wheeler business.',
      highlights: ['Real-time KPI tracking', 'Interactive market comparison', 'Faster expansion decisions'],
      problem: 'Export data was spread across regions and difficult to compare, making it hard to identify the most promising countries for growth.',
      impact: 'We created a Power BI dashboard that consolidated growth, market share, and sales performance into one interactive view. Leadership could compare opportunities in real time and focus its expansion strategy with greater confidence.'
    },
    {
      industry: 'Mining',
      title: 'Learning & Development Assessment',
      summary: 'A mining organization modernized employee learning and development reporting by moving from SAP reports to Power BI.',
      highlights: ['Modernized reporting', 'Better program visibility', 'Employee progress tracking'],
      problem: 'Legacy SAP reports were cumbersome and offered limited visual insight into training progress and program effectiveness.',
      impact: 'We rebuilt the reporting experience in Power BI with intuitive, interactive dashboards. Decision-makers gained a clearer view of training outcomes and could improve learning programs using dependable evidence.'
    },
    {
      industry: 'Building & Construction',
      title: 'Brand Analysis',
      summary: 'A construction company wanted to understand brand perception and connect advertising performance with sales growth.',
      highlights: ['Brand perception insights', 'Advertisement effectiveness', 'Marketing ROI visibility'],
      problem: 'The team could not clearly identify which advertisements influenced sales or how brand perception varied across markets.',
      impact: 'A unified Power BI dashboard connected campaign, perception, and sales data. The team could identify high-performing advertising, refine its strategy, and allocate spend more effectively.'
    },
    {
      industry: 'EdTech',
      title: 'Dashboard Migration',
      summary: 'An EdTech company migrated Tableau dashboards to Power BI while restructuring a large volume of unorganized data.',
      highlights: ['Structured data foundation', 'Improved performance', 'Smoother user experience'],
      problem: 'Large, unstructured datasets made the migration complex and prevented the existing reporting from delivering consistent insight.',
      impact: 'We reorganized the source data, streamlined the migration, and rebuilt the dashboards in Power BI. The result was faster performance, stronger visualization, and a more intuitive analytics experience.'
    },
    {
      industry: 'Global Customer Experience',
      title: 'Customer Experience Assessment',
      summary: 'A global technology company needed one view of customer satisfaction metrics and behavior patterns across regions.',
      highlights: ['Global satisfaction view', 'Real-time OSAT and DSAT', 'Behavior pattern discovery'],
      problem: 'Customer feedback was fragmented across markets, limiting the company’s ability to compare OSAT, DSAT, and other experience indicators.',
      impact: 'We consolidated regional feedback into an interactive Power BI solution. Teams could track satisfaction in real time, identify pain points, and shape more relevant retention and product strategies.'
    },
    {
      industry: 'Pharma',
      title: 'Departmental Tracking',
      summary: 'A pharma company replaced scattered presentations with connected dashboards for HR, Manufacturing, Supply Chain, Finance, and R&D.',
      highlights: ['Department-specific dashboards', 'Unified data platform', 'Real-time operational insight'],
      problem: 'Department reporting lived in disconnected PowerPoint files, creating manual work, data silos, and slow access to current performance.',
      impact: 'We created a shared Power BI platform with tailored views for each function. Leaders gained a trusted source of truth, while teams reduced manual reporting and collaborated with consistent metrics.'
    },
    {
      industry: 'Oil & Gas',
      title: 'Finance and Procurement Tracking',
      summary: 'An oil and gas company improved cost control and supplier negotiations with Power BI and Excel-based financial models.',
      highlights: ['Inflation indexation models', 'Cost management frameworks', 'Negotiation support'],
      problem: 'The organization needed a more dependable way to monitor inflation, procurement costs, daily requirements, and supplier negotiation scenarios.',
      impact: 'We delivered connected cost models, real-time reporting, and negotiation support tools. Finance and procurement teams could monitor exposure, respond to ad hoc needs, and approach suppliers with stronger evidence.'
    },
    {
      industry: 'FMCG',
      title: 'Sales Tracking and Data Transformation',
      summary: 'A major FMCG client automated sales reporting and transformed large Excel datasets into a scalable Power BI model.',
      highlights: ['Automated transformation', 'Real-time sales dashboards', 'Reduced manual errors'],
      problem: 'Large Excel files required complex manual preparation, causing recurring errors and delaying daily sales reporting.',
      impact: 'We built an efficient data model and automated the transformation workflow. The new dashboards reduced manual effort, improved reliability, and gave teams a current view of sales performance across India.'
    }
  ];

  const summary = document.querySelector('#caseStudySummary');
  const modal = document.querySelector('#caseStudyModal');
  const modalContent = document.querySelector('#caseStudyModalContent');
  const industryButtons = [...document.querySelectorAll('.industry-btn')];
  let lastFocusedElement = null;

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    lastFocusedElement?.focus();
  };

  const openModal = (index) => {
    const study = caseStudies[index];
    if (!study || !modal || !modalContent) return;
    lastFocusedElement = document.activeElement;
    modalContent.innerHTML = `
      <p class="case-kicker">${study.industry}</p>
      <h3 id="case-modal-title">${study.title}</h3>
      <p><strong>The challenge</strong><br>${study.problem}</p>
      <p><strong>The impact</strong><br>${study.impact}</p>
      <strong>Key outcomes</strong>
      <ul>${study.highlights.map((highlight) => `<li>${highlight}</li>`).join('')}</ul>
    `;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    modal.querySelector('[data-modal-close]')?.focus();
  };

  const renderStudy = (index) => {
    const study = caseStudies[index];
    if (!study || !summary) return;
    summary.innerHTML = `
      <p class="case-kicker">${study.industry}</p>
      <h3>${study.title}</h3>
      <p class="lead">${study.summary}</p>
      <ul class="case-highlights">${study.highlights.map((highlight) => `<li>${highlight}</li>`).join('')}</ul>
      <button class="read-more" type="button">Read full case study <span aria-hidden="true">→</span></button>
    `;
    summary.querySelector('.read-more')?.addEventListener('click', () => openModal(index));
  };

  const selectIndustry = (index) => {
    industryButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    renderStudy(index);
  };

  industryButtons.forEach((button, index) => button.addEventListener('click', () => selectIndustry(index)));
  modal?.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('[data-modal-close]')) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal?.classList.contains('hidden')) closeModal();
  });

  selectIndustry(0);
})();
