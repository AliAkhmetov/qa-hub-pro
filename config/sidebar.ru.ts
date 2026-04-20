export interface SidebarLeafNode {
  title: string
  href: string
}

export interface SidebarGroupNode {
  title: string
  items: SidebarNode[]
}

export type SidebarNode = SidebarLeafNode | SidebarGroupNode

export interface SidebarConfig {
  locale: string
  site: string
  version: number
  sidebar: SidebarGroupNode[]
}

export const sidebarConfigRu = {
  locale: 'ru',
  site: 'qa-knowledge-vert',
  version: 2,
  sidebar: [
    {
      title: 'Старт',
      items: [
        { title: 'Как пользоваться базой знаний', href: '/ru/start/how-to-use' },
        { title: 'Я новичок в QA', href: '/ru/start/junior-path' },
        { title: 'Я уже QA / Middle', href: '/ru/start/middle-path' },
        { title: 'Я хочу в Lead / Senior', href: '/ru/start/lead-path' },
        { title: 'Я хочу в Automation', href: '/ru/start/automation-path' },
        { title: 'Я хочу в AI QA', href: '/ru/start/ai-qa-path' },
      ],
    },
    {
      title: 'Основы',
      items: [
        { title: 'Что такое тестирование', href: '/ru/fundamentals/what-is-testing' },
        { title: 'QA vs QC vs Testing', href: '/ru/fundamentals/qa-vs-qc-vs-testing' },
        { title: 'Цели и принципы тестирования', href: '/ru/fundamentals/testing-principles' },
        { title: 'Верификация и валидация', href: '/ru/fundamentals/verification-vs-validation' },
        { title: 'SDLC и STLC', href: '/ru/fundamentals/sdlc-and-stlc' },
        { title: 'Роль QA в Agile и Scrum', href: '/ru/fundamentals/qa-in-agile' },
        { title: 'Уровни тестирования', href: '/ru/fundamentals/testing-levels' },
        { title: 'Виды тестирования', href: '/ru/fundamentals/testing-types' },
        { title: 'Smoke, Sanity, Regression, Retest', href: '/ru/fundamentals/smoke-sanity-regression-retest' },
        { title: 'Black, White, Gray Box', href: '/ru/fundamentals/black-white-gray-box' },
        { title: 'Shift-left и Shift-right', href: '/ru/fundamentals/shift-left-shift-right' },
      ],
    },
    {
      title: 'Тест-дизайн',
      items: [
        { title: 'Обзор техник тест-дизайна', href: '/ru/test-design/overview' },
        { title: 'Эквивалентное разбиение', href: '/ru/test-design/equivalence-partitioning' },
        { title: 'Граничные значения', href: '/ru/test-design/boundary-value-analysis' },
        { title: 'Таблицы решений', href: '/ru/test-design/decision-tables' },
        { title: 'Переходы состояний', href: '/ru/test-design/state-transition-testing' },
        { title: 'Use Case testing', href: '/ru/test-design/use-case-testing' },
        { title: 'Pairwise testing', href: '/ru/test-design/pairwise-testing' },
        { title: 'Cause-Effect Graphing', href: '/ru/test-design/cause-effect-graphing' },
        { title: 'Error Guessing', href: '/ru/test-design/error-guessing' },
        { title: 'Checklist-based testing', href: '/ru/test-design/checklist-based-testing' },
        { title: 'Exploratory testing', href: '/ru/test-design/exploratory-testing' },
        { title: 'Risk-based testing', href: '/ru/test-design/risk-based-testing' },
      ],
    },
    {
      title: 'Документация',
      items: [
        { title: 'Test Plan', href: '/ru/documentation/test-plan' },
        { title: 'Test Strategy', href: '/ru/documentation/test-strategy' },
        { title: 'Test Scenario vs Test Case', href: '/ru/documentation/test-scenario-vs-test-case' },
        { title: 'Test Case', href: '/ru/documentation/test-case' },
        { title: 'Checklist', href: '/ru/documentation/checklist' },
        { title: 'Bug Report', href: '/ru/documentation/bug-report' },
        { title: 'Severity vs Priority', href: '/ru/documentation/severity-vs-priority' },
        { title: 'Traceability Matrix', href: '/ru/documentation/traceability-matrix' },
        { title: 'Test Summary Report', href: '/ru/documentation/test-summary-report' },
        { title: 'Метрики QA', href: '/ru/documentation/qa-metrics' },
      ],
    },
    {
      title: 'Backend / API',
      items: [
        { title: 'Что такое API', href: '/ru/backend-api/what-is-api' },
        { title: 'Клиент-серверная архитектура', href: '/ru/backend-api/client-server-architecture' },
        { title: 'HTTP и HTTPS', href: '/ru/backend-api/http-https' },
        { title: 'REST, SOAP, GraphQL, gRPC, WebSocket', href: '/ru/backend-api/api-protocols' },
        { title: 'Методы, статус-коды, заголовки', href: '/ru/backend-api/http-methods-status-codes-headers' },
        { title: 'JSON и XML', href: '/ru/backend-api/json-xml' },
        { title: 'Аутентификация и авторизация', href: '/ru/backend-api/authentication-authorization' },
        { title: 'JWT, OAuth 2.0, API Keys', href: '/ru/backend-api/jwt-oauth-api-keys' },
        { title: 'Negative API testing', href: '/ru/backend-api/negative-api-testing' },
        { title: 'Pagination, Filtering, Sorting', href: '/ru/backend-api/pagination-filtering-sorting' },
        { title: 'Contract testing', href: '/ru/backend-api/contract-testing' },
        { title: 'Mock servers', href: '/ru/backend-api/mock-servers' },
        { title: 'Database testing', href: '/ru/backend-api/database-testing' },
        { title: 'SQL для QA', href: '/ru/backend-api/sql-for-qa' },
        { title: 'NoSQL basics', href: '/ru/backend-api/nosql-basics' },
        { title: 'Kafka и RabbitMQ basics', href: '/ru/backend-api/messaging-basics' },
        { title: 'Тестирование микросервисов', href: '/ru/backend-api/microservices-testing' },
        { title: 'API performance basics', href: '/ru/backend-api/api-performance-basics' },
        { title: 'API security basics', href: '/ru/backend-api/api-security-basics' },
      ],
    },
    {
      title: 'Web',
      items: [
        { title: 'Особенности веб-приложений', href: '/ru/web/web-app-basics' },
        { title: 'HTML, CSS, JavaScript для QA', href: '/ru/web/html-css-js-for-qa' },
        { title: 'DevTools для тестировщика', href: '/ru/web/devtools-for-qa' },
        { title: 'Cookies, SessionStorage, LocalStorage', href: '/ru/web/browser-storage' },
        { title: 'Cross-browser testing', href: '/ru/web/cross-browser-testing' },
        { title: 'Responsive testing', href: '/ru/web/responsive-testing' },
        { title: 'Тестирование форм и валидации', href: '/ru/web/forms-and-validation' },
        { title: 'SEO и meta tags basics', href: '/ru/web/seo-meta-tags-basics' },
        { title: 'Accessibility testing', href: '/ru/web/accessibility-testing' },
        { title: 'Visual regression testing', href: '/ru/web/visual-regression-testing' },
        { title: 'Чек-лист тестирования сайта', href: '/ru/web/website-testing-checklist' },
      ],
    },
    {
      title: 'Mobile',
      items: [
        { title: 'Специфика мобильного тестирования', href: '/ru/mobile/mobile-testing-basics' },
        { title: 'iOS vs Android', href: '/ru/mobile/ios-vs-android' },
        { title: 'Native, Hybrid, Mobile Web, PWA', href: '/ru/mobile/native-hybrid-mobile-web-pwa' },
        { title: 'Installation, Update, Uninstall', href: '/ru/mobile/install-update-uninstall' },
        { title: 'Permissions, Interruptions, Notifications', href: '/ru/mobile/permissions-interruptions-notifications' },
        { title: 'Deeplinks и App Links', href: '/ru/mobile/deeplinks-and-app-links' },
        { title: 'Сети и offline testing', href: '/ru/mobile/network-and-offline-testing' },
        { title: 'Device matrix', href: '/ru/mobile/device-matrix' },
        { title: 'ADB basics', href: '/ru/mobile/adb-basics' },
        { title: 'Xcode и Android Studio basics', href: '/ru/mobile/xcode-android-studio-basics' },
        { title: 'Charles / mitmproxy для mobile QA', href: '/ru/mobile/proxy-tools-for-mobile' },
        { title: 'Push notifications', href: '/ru/mobile/push-notifications-testing' },
        { title: 'Mobile performance testing', href: '/ru/mobile/mobile-performance-testing' },
        { title: 'Mobile accessibility testing', href: '/ru/mobile/mobile-accessibility-testing' },
        { title: 'Чек-лист мобильного тестирования', href: '/ru/mobile/mobile-testing-checklist' },
      ],
    },
    {
      title: 'Non-functional',
      items: [
        { title: 'Что такое non-functional testing', href: '/ru/non-functional/overview' },
        { title: 'Performance testing overview', href: '/ru/non-functional/performance-testing-overview' },
        { title: 'Load, Stress, Spike, Endurance, Volume', href: '/ru/non-functional/performance-testing-types' },
        { title: 'RPS, Throughput, Latency, Percentiles', href: '/ru/non-functional/performance-metrics' },
        { title: 'SLA, SLO, SLI', href: '/ru/non-functional/sla-slo-sli' },
        { title: 'Security testing overview', href: '/ru/non-functional/security-testing-overview' },
        { title: 'OWASP Top 10', href: '/ru/non-functional/owasp-top-10' },
        { title: 'SQL Injection, XSS, CSRF', href: '/ru/non-functional/sql-injection-xss-csrf' },
        { title: 'Compatibility testing', href: '/ru/non-functional/compatibility-testing' },
        { title: 'Localization и Internationalization', href: '/ru/non-functional/localization-internationalization' },
        { title: 'Reliability, Recovery, Failover', href: '/ru/non-functional/reliability-recovery-failover' },
        { title: 'Usability testing', href: '/ru/non-functional/usability-testing' },
      ],
    },
    {
      title: 'Automation',
      items: [
        { title: 'Когда автоматизировать', href: '/ru/automation/when-to-automate' },
        { title: 'ROI автоматизации', href: '/ru/automation/automation-roi' },
        { title: 'Пирамида тестирования', href: '/ru/automation/testing-pyramid' },
        { title: 'Unit, Service, UI, E2E', href: '/ru/automation/unit-service-ui-e2e' },
        { title: 'Page Object Model', href: '/ru/automation/page-object-model' },
        { title: 'Screenplay Pattern', href: '/ru/automation/screenplay-pattern' },
        { title: 'Data-driven, Keyword-driven, Hybrid', href: '/ru/automation/test-framework-patterns' },
        { title: 'BDD, Cucumber, Gherkin', href: '/ru/automation/bdd-cucumber-gherkin' },
        { title: 'Selenium WebDriver', href: '/ru/automation/selenium-webdriver' },
        { title: 'Cypress', href: '/ru/automation/cypress' },
        { title: 'Playwright', href: '/ru/automation/playwright' },
        { title: 'Appium', href: '/ru/automation/appium' },
        { title: 'Pytest + Requests', href: '/ru/automation/pytest-requests' },
        { title: 'REST Assured', href: '/ru/automation/rest-assured' },
        { title: 'Allure reports', href: '/ru/automation/allure-reports' },
        { title: 'Flaky tests', href: '/ru/automation/flaky-tests' },
        { title: 'CI integration for autotests', href: '/ru/automation/ci-integration' },
      ],
    },
    {
      title: 'Инструменты',
      items: [
        {
          title: 'API tools',
          items: [
            { title: 'Postman', href: '/ru/tools/api/postman' },
            { title: 'Insomnia', href: '/ru/tools/api/insomnia' },
            { title: 'SoapUI', href: '/ru/tools/api/soapui' },
            { title: 'Swagger / OpenAPI', href: '/ru/tools/api/swagger-openapi' },
            { title: 'Newman', href: '/ru/tools/api/newman' },
          ],
        },
        {
          title: 'Test management',
          items: [
            { title: 'TestRail', href: '/ru/tools/test-management/testrail' },
            { title: 'Zephyr', href: '/ru/tools/test-management/zephyr' },
            { title: 'Xray', href: '/ru/tools/test-management/xray' },
            { title: 'Qase', href: '/ru/tools/test-management/qase' },
            { title: 'Allure TestOps', href: '/ru/tools/test-management/allure-testops' },
          ],
        },
        {
          title: 'Bug tracking',
          items: [
            { title: 'Jira', href: '/ru/tools/bug-tracking/jira' },
            { title: 'YouTrack', href: '/ru/tools/bug-tracking/youtrack' },
            { title: 'Redmine', href: '/ru/tools/bug-tracking/redmine' },
            { title: 'Linear', href: '/ru/tools/bug-tracking/linear' },
            { title: 'Trello', href: '/ru/tools/bug-tracking/trello' },
          ],
        },
        {
          title: 'Performance tools',
          items: [
            { title: 'JMeter', href: '/ru/tools/performance/jmeter' },
            { title: 'k6', href: '/ru/tools/performance/k6' },
            { title: 'Gatling', href: '/ru/tools/performance/gatling' },
            { title: 'Locust', href: '/ru/tools/performance/locust' },
            { title: 'LoadRunner', href: '/ru/tools/performance/loadrunner' },
          ],
        },
        {
          title: 'Proxy and sniffing',
          items: [
            { title: 'Charles Proxy', href: '/ru/tools/proxy/charles-proxy' },
            { title: 'Fiddler', href: '/ru/tools/proxy/fiddler' },
            { title: 'mitmproxy', href: '/ru/tools/proxy/mitmproxy' },
            { title: 'Wireshark', href: '/ru/tools/proxy/wireshark' },
          ],
        },
        {
          title: 'Dev tools',
          items: [
            { title: 'Git basics', href: '/ru/tools/dev/git-basics' },
            { title: 'GitHub / GitLab basics', href: '/ru/tools/dev/github-gitlab-basics' },
            { title: 'Command line for QA', href: '/ru/tools/dev/command-line-for-qa' },
            { title: 'curl basics', href: '/ru/tools/dev/curl-basics' },
            { title: 'Docker basics', href: '/ru/tools/dev/docker-basics' },
            { title: 'DBeaver', href: '/ru/tools/dev/dbeaver' },
            { title: 'DataGrip', href: '/ru/tools/dev/datagrip' },
            { title: 'VS Code / IntelliJ / PyCharm', href: '/ru/tools/dev/ide-tools' },
          ],
        },
        {
          title: 'Device clouds',
          items: [
            { title: 'BrowserStack', href: '/ru/tools/device-clouds/browserstack' },
            { title: 'Sauce Labs', href: '/ru/tools/device-clouds/sauce-labs' },
            { title: 'LambdaTest', href: '/ru/tools/device-clouds/lambdatest' },
          ],
        },
      ],
    },
    {
      title: 'QA Engineering',
      items: [
        { title: 'Release testing', href: '/ru/qa-engineering/release-testing' },
        { title: 'Regression strategy', href: '/ru/qa-engineering/regression-strategy' },
        { title: 'Test environments', href: '/ru/qa-engineering/test-environments' },
        { title: 'CI/CD для QA', href: '/ru/qa-engineering/ci-cd-for-qa' },
        { title: 'GitHub Actions, GitLab CI, Jenkins', href: '/ru/qa-engineering/ci-tools-overview' },
        { title: 'Feature flags и A/B tests', href: '/ru/qa-engineering/feature-flags-and-ab-tests' },
        { title: 'Canary и Blue-Green deployment', href: '/ru/qa-engineering/canary-blue-green' },
        { title: 'Observability для QA', href: '/ru/qa-engineering/observability-for-qa' },
        { title: 'Логи, метрики, трейсы', href: '/ru/qa-engineering/logs-metrics-traces' },
        { title: 'Test reporting и analytics', href: '/ru/qa-engineering/test-reporting-and-analytics' },
        { title: 'Incident, Hotfix, Postmortem', href: '/ru/qa-engineering/incident-hotfix-postmortem' },
        { title: 'Quality gates', href: '/ru/qa-engineering/quality-gates' },
      ],
    },
    {
      title: 'AI Quality',
      items: [
        { title: 'Что такое AI Quality', href: '/ru/ai-quality/what-is-ai-quality' },
        { title: 'LLM testing basics', href: '/ru/ai-quality/llm-testing-basics' },
        { title: 'Prompt testing', href: '/ru/ai-quality/prompt-testing' },
        { title: 'LLM evals', href: '/ru/ai-quality/llm-evals' },
        { title: 'Agentic AI testing', href: '/ru/ai-quality/agentic-ai-testing' },
        { title: 'RAG testing', href: '/ru/ai-quality/rag-testing' },
        { title: 'Hallucinations и factuality', href: '/ru/ai-quality/hallucinations-and-factuality' },
        { title: 'Bias, fairness, safety', href: '/ru/ai-quality/bias-fairness-safety' },
        { title: 'Human-in-the-loop QA', href: '/ru/ai-quality/human-in-the-loop-qa' },
        { title: 'Observability for AI systems', href: '/ru/ai-quality/ai-observability' },
        { title: 'Testing AI features in product', href: '/ru/ai-quality/testing-ai-features' },
      ],
    },
    {
      title: 'Практика и карьера',
      items: [
        {
          title: 'Practice',
          items: [
            { title: 'DemoQA', href: '/ru/practice/demos/demoqa' },
            { title: 'SauceDemo', href: '/ru/practice/demos/saucedemo' },
            { title: 'OrangeHRM', href: '/ru/practice/demos/orangehrm' },
            { title: 'Restful Booker', href: '/ru/practice/demos/restful-booker' },
            { title: 'ReqRes', href: '/ru/practice/demos/reqres' },
            { title: 'JSONPlaceholder', href: '/ru/practice/demos/jsonplaceholder' },
            { title: 'QA Practice', href: '/ru/practice/demos/qa-practice' },
            { title: 'Найди 10 багов', href: '/ru/practice/challenges/find-10-bugs' },
          ],
        },
        {
          title: 'Career',
          items: [
            { title: 'Roadmap для начинающего QA', href: '/ru/career/roadmap-junior-qa' },
            { title: 'Junior / Middle / Senior / Lead', href: '/ru/career/grade-matrix' },
            { title: 'Как составить резюме', href: '/ru/career/resume-for-qa' },
            { title: 'Портфолио для джуна', href: '/ru/career/portfolio-for-junior' },
            { title: 'Soft skills для QA', href: '/ru/career/soft-skills-for-qa' },
            { title: 'Английский для тестировщика', href: '/ru/career/english-for-qa' },
            { title: 'ISTQB Foundation', href: '/ru/career/istqb-foundation' },
            { title: 'Другие сертификации', href: '/ru/career/other-certifications' },
          ],
        },
        {
          title: 'Interview Prep',
          items: [
            { title: 'Топ-100 вопросов по теории', href: '/ru/interview/theory-questions' },
            { title: 'Вопросы по SQL', href: '/ru/interview/sql-questions' },
            { title: 'Вопросы по API', href: '/ru/interview/api-questions' },
            { title: 'Вопросы по automation', href: '/ru/interview/automation-questions' },
            { title: 'Вопросы по mobile', href: '/ru/interview/mobile-questions' },
            { title: 'Тестовые задания', href: '/ru/interview/test-assignments' },
            { title: 'Поведенческие вопросы (STAR)', href: '/ru/interview/star-method' },
            { title: 'Mock interview', href: '/ru/interview/mock-interview' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { title: 'Книги для QA', href: '/ru/resources/books-for-qa' },
            { title: 'Блоги и сообщества', href: '/ru/resources/blogs-and-communities' },
            { title: 'YouTube и подкасты', href: '/ru/resources/youtube-and-podcasts' },
            { title: 'Конференции', href: '/ru/resources/conferences' },
          ],
        },
      ],
    },
    {
      title: 'Глоссарий',
      items: [
        { title: 'Все термины', href: '/ru/glossary' },
        { title: 'Аббревиатуры', href: '/ru/glossary/abbreviations' },
        { title: 'Термины A–Z', href: '/ru/glossary/a-z' },
        { title: 'EN ↔ RU словарь', href: '/ru/glossary/en-ru' },
      ],
    },
  ],
} satisfies SidebarConfig
