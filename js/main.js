/* ========================================
   ylearner – Learn to Code | Main JS
   ======================================== */

(function () {
  'use strict';

  // ========================
  // Base URL — file:// compat
  // ========================
  // On a real server (https/http) absolute /paths work fine.
  // With file:// protocol, /path resolves to filesystem root — wrong.
  // Detect project root so all links work both locally and on GitHub Pages.
  const BASE = (function () {
    if (location.protocol !== 'file:') return '';
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);
    parts.pop(); // remove filename
    const depth2Folders = ['beginner','control-flow','functions','data-structures',
      'intermediate','oop','advanced','real-world','frameworks','data-science','interview','projects','dom',
      'getting-started','core','lifecycle','templates','odoo',
      'core-elements','forms','semantic','selectors','layout','responsive','effects'];
    const isDepth2 = depth2Folders.some(f => path.includes('/' + f + '/'));
    const isDepth1 = !isDepth2 && ['/python/','/javascript/','/c/','/cpp/','/java/','/sql/','/owljs/','/html/','/csslessons/'].some(s => path.includes(s));
    if (isDepth2) parts.splice(-2);
    else if (isDepth1) parts.splice(-1);
    return 'file:///' + parts.join('/');
  }());

  // Intercept absolute link clicks when running via file://
  if (BASE) {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        location.href = BASE + href;
      }
    }, true);
  }

  // ========================
  // Navigation Data
  // ========================
  const NAV_DATA = [
    {
      title: '🐍 Introduction',
      items: [
        { title: 'What is Python?', url: '/python/what-is-python.html' },
        { title: 'History of Python', url: '/python/history-of-python.html' },
        { title: 'Why Learn Python?', url: '/python/why-learn-python.html' },
        { title: 'Python Applications', url: '/python/python-applications.html' },
        { title: 'Python Career Paths', url: '/python/python-career-paths.html' },
      ]
    },
    {
      title: '🌱 Beginner',
      items: [
        { title: 'Installing Python', url: '/python/beginner/installing-python.html' },
        { title: 'Python Setup & IDE', url: '/python/beginner/python-setup.html' },
        { title: 'Hello, World!', url: '/python/beginner/hello-world.html' },
        { title: 'Variables', url: '/python/beginner/variables.html' },
        { title: 'Data Types', url: '/python/beginner/data-types.html' },
        { title: 'User Input', url: '/python/beginner/user-input.html' },
        { title: 'Operators', url: '/python/beginner/operators.html' },
        { title: 'Strings', url: '/python/beginner/strings.html' },
        { title: 'Numbers', url: '/python/beginner/numbers.html' },
        { title: 'Comments', url: '/python/beginner/comments.html' },
        { title: 'Type Conversion', url: '/python/beginner/type-conversion.html' },
      ]
    },
    {
      title: '🔀 Control Flow',
      items: [
        { title: 'If Statements', url: '/python/control-flow/if-statements.html' },
        { title: 'Nested If', url: '/python/control-flow/nested-if.html' },
        { title: 'Match Case', url: '/python/control-flow/match-case.html' },
        { title: 'For Loop', url: '/python/control-flow/for-loop.html' },
        { title: 'While Loop', url: '/python/control-flow/while-loop.html' },
        { title: 'Break & Continue', url: '/python/control-flow/break-continue-pass.html' },
      ]
    },
    {
      title: '⚙️ Functions',
      items: [
        { title: 'Function Basics', url: '/python/functions/function-basics.html' },
        { title: 'Parameters & Arguments', url: '/python/functions/parameters.html' },
        { title: 'Return Values', url: '/python/functions/return-values.html' },
        { title: 'Lambda Functions', url: '/python/functions/lambda.html' },
        { title: 'Scope', url: '/python/functions/scope.html' },
        { title: 'Recursion', url: '/python/functions/recursion.html' },
      ]
    },
    {
      title: '📦 Data Structures',
      items: [
        { title: 'Lists', url: '/python/data-structures/lists.html' },
        { title: 'Tuples', url: '/python/data-structures/tuples.html' },
        { title: 'Sets', url: '/python/data-structures/sets.html' },
        { title: 'Dictionaries', url: '/python/data-structures/dictionaries.html' },
        { title: 'List Comprehensions', url: '/python/data-structures/list-comprehensions.html' },
        { title: 'Dict Comprehensions', url: '/python/data-structures/dict-comprehensions.html' },
      ]
    },
    {
      title: '🔧 Intermediate Python',
      items: [
        { title: 'Modules', url: '/python/intermediate/modules.html' },
        { title: 'Packages', url: '/python/intermediate/packages.html' },
        { title: 'File Handling', url: '/python/intermediate/file-handling.html' },
        { title: 'Exception Handling', url: '/python/intermediate/exception-handling.html' },
        { title: 'Date & Time', url: '/python/intermediate/datetime.html' },
        { title: 'JSON', url: '/python/intermediate/json.html' },
        { title: 'CSV Files', url: '/python/intermediate/csv.html' },
        { title: 'Virtual Environments', url: '/python/intermediate/virtual-environments.html' },
      ]
    },
    {
      title: '🏗️ OOP',
      items: [
        { title: 'Classes & Objects', url: '/python/oop/classes.html' },
        { title: 'Constructors', url: '/python/oop/constructors.html' },
        { title: 'Inheritance', url: '/python/oop/inheritance.html' },
        { title: 'Encapsulation', url: '/python/oop/encapsulation.html' },
        { title: 'Polymorphism', url: '/python/oop/polymorphism.html' },
        { title: 'Abstraction', url: '/python/oop/abstraction.html' },
        { title: 'Magic Methods', url: '/python/oop/magic-methods.html' },
      ]
    },
    {
      title: '🚀 Advanced Python',
      items: [
        { title: 'Decorators', url: '/python/advanced/decorators.html' },
        { title: 'Generators', url: '/python/advanced/generators.html' },
        { title: 'Iterators', url: '/python/advanced/iterators.html' },
        { title: 'Context Managers', url: '/python/advanced/context-managers.html' },
        { title: 'Multithreading', url: '/python/advanced/multithreading.html' },
        { title: 'Multiprocessing', url: '/python/advanced/multiprocessing.html' },
        { title: 'Async Programming', url: '/python/advanced/async.html' },
        { title: 'Type Hinting', url: '/python/advanced/type-hinting.html' },
        { title: 'Dataclasses', url: '/python/advanced/dataclasses.html' },
      ]
    },
    {
      title: '🌐 Real World Dev',
      items: [
        { title: 'API Development', url: '/python/real-world/api-development.html' },
        { title: 'Web Scraping', url: '/python/real-world/web-scraping.html' },
        { title: 'Automation', url: '/python/real-world/automation.html' },
        { title: 'Database Programming', url: '/python/real-world/database.html' },
        { title: 'REST APIs', url: '/python/real-world/rest-api.html' },
        { title: 'Logging', url: '/python/real-world/logging.html' },
        { title: 'Testing', url: '/python/real-world/testing.html' },
        { title: 'Debugging', url: '/python/real-world/debugging.html' },
      ]
    },
    {
      title: '⚡ Frameworks',
      items: [
        { title: 'Flask', url: '/python/frameworks/flask.html', badge: 'hot' },
        { title: 'Django', url: '/python/frameworks/django.html' },
        { title: 'FastAPI', url: '/python/frameworks/fastapi.html', badge: 'new' },
      ]
    },
    {
      title: '📊 Data Science',
      items: [
        { title: 'NumPy', url: '/python/data-science/numpy.html' },
        { title: 'Pandas', url: '/python/data-science/pandas.html' },
        { title: 'Matplotlib', url: '/python/data-science/matplotlib.html' },
        { title: 'Seaborn', url: '/python/data-science/seaborn.html' },
        { title: 'Machine Learning Intro', url: '/python/data-science/machine-learning.html' },
      ]
    },
    {
      title: '🎯 Interview Prep',
      items: [
        { title: 'Interview Questions', url: '/python/interview/questions.html', badge: 'hot' },
        { title: 'Coding Challenges', url: '/python/interview/coding-challenges.html' },
        { title: 'Practical Exercises', url: '/python/interview/exercises.html' },
      ]
    },
    {
      title: '🛠️ Projects',
      items: [
        { title: 'Calculator', url: '/python/projects/calculator.html' },
        { title: 'Todo App', url: '/python/projects/todo-app.html' },
        { title: 'Expense Tracker', url: '/python/projects/expense-tracker.html' },
        { title: 'Weather App', url: '/python/projects/weather-app.html' },
        { title: 'File Organizer', url: '/python/projects/file-organizer.html' },
        { title: 'Web Scraper', url: '/python/projects/web-scraper.html' },
        { title: 'API Project', url: '/python/projects/api-project.html' },
        { title: 'Full Stack Project', url: '/python/projects/full-stack.html' },
      ]
    },
  ];

  // ========================
  // JavaScript Navigation Data
  // ========================
  const JS_NAV_DATA = [
    {
      title: '⚡ Introduction',
      items: [
        { title: 'What is JavaScript?', url: '/javascript/what-is-javascript.html' },
        { title: 'History of JavaScript', url: '/javascript/history-of-javascript.html' },
        { title: 'Why Learn JavaScript?', url: '/javascript/why-learn-javascript.html' },
        { title: 'JavaScript Applications', url: '/javascript/javascript-applications.html' },
        { title: 'JavaScript Career Paths', url: '/javascript/javascript-career-paths.html' },
      ]
    },
    {
      title: '🌱 Beginner',
      items: [
        { title: 'Setting Up JavaScript', url: '/javascript/beginner/setting-up.html' },
        { title: 'Hello, World!', url: '/javascript/beginner/hello-world.html' },
        { title: 'Variables (let, const, var)', url: '/javascript/beginner/variables.html' },
        { title: 'Data Types', url: '/javascript/beginner/data-types.html' },
        { title: 'Operators', url: '/javascript/beginner/operators.html' },
        { title: 'Strings', url: '/javascript/beginner/strings.html' },
        { title: 'Numbers & Math', url: '/javascript/beginner/numbers.html' },
        { title: 'Type Conversion', url: '/javascript/beginner/type-conversion.html' },
        { title: 'User Input', url: '/javascript/beginner/user-input.html' },
        { title: 'Comments', url: '/javascript/beginner/comments.html' },
      ]
    },
    {
      title: '🔀 Control Flow',
      items: [
        { title: 'If Statements', url: '/javascript/control-flow/if-statements.html' },
        { title: 'Nested If', url: '/javascript/control-flow/nested-if.html' },
        { title: 'Switch Statement', url: '/javascript/control-flow/switch.html' },
        { title: 'For Loop', url: '/javascript/control-flow/for-loop.html' },
        { title: 'While Loop', url: '/javascript/control-flow/while-loop.html' },
        { title: 'Break & Continue', url: '/javascript/control-flow/break-continue.html' },
      ]
    },
    {
      title: '⚙️ Functions',
      items: [
        { title: 'Function Basics', url: '/javascript/functions/function-basics.html' },
        { title: 'Parameters & Arguments', url: '/javascript/functions/parameters.html' },
        { title: 'Return Values', url: '/javascript/functions/return-values.html' },
        { title: 'Arrow Functions', url: '/javascript/functions/arrow-functions.html' },
        { title: 'Scope', url: '/javascript/functions/scope.html' },
        { title: 'Closures', url: '/javascript/functions/closures.html' },
        { title: 'Higher-Order Functions', url: '/javascript/functions/higher-order-functions.html' },
      ]
    },
    {
      title: '📦 Data Structures',
      items: [
        { title: 'Arrays', url: '/javascript/data-structures/arrays.html' },
        { title: 'Objects', url: '/javascript/data-structures/objects.html' },
        { title: 'Maps & Sets', url: '/javascript/data-structures/maps-sets.html' },
        { title: 'Destructuring', url: '/javascript/data-structures/destructuring.html' },
        { title: 'Spread & Rest', url: '/javascript/data-structures/spread-rest.html' },
        { title: 'Array Methods', url: '/javascript/data-structures/array-methods.html' },
      ]
    },
    {
      title: '🔧 Intermediate JS',
      items: [
        { title: 'ES6+ Features', url: '/javascript/intermediate/es6-features.html' },
        { title: 'Modules (import/export)', url: '/javascript/intermediate/modules.html' },
        { title: 'Error Handling', url: '/javascript/intermediate/error-handling.html' },
        { title: 'JSON', url: '/javascript/intermediate/json.html' },
        { title: 'Date & Time', url: '/javascript/intermediate/date-time.html' },
        { title: 'Regular Expressions', url: '/javascript/intermediate/regex.html' },
        { title: 'Local Storage', url: '/javascript/intermediate/local-storage.html' },
      ]
    },
    {
      title: '🏗️ OOP',
      items: [
        { title: 'Classes & Objects', url: '/javascript/oop/classes.html' },
        { title: 'Constructors', url: '/javascript/oop/constructors.html' },
        { title: 'Inheritance', url: '/javascript/oop/inheritance.html' },
        { title: 'Encapsulation', url: '/javascript/oop/encapsulation.html' },
        { title: 'Polymorphism', url: '/javascript/oop/polymorphism.html' },
        { title: 'Prototypes', url: '/javascript/oop/prototypes.html' },
      ]
    },
    {
      title: '🚀 Advanced JS',
      items: [
        { title: 'Callbacks', url: '/javascript/advanced/callbacks.html' },
        { title: 'Promises', url: '/javascript/advanced/promises.html' },
        { title: 'Async / Await', url: '/javascript/advanced/async-await.html' },
        { title: 'Event Loop', url: '/javascript/advanced/event-loop.html' },
        { title: 'Generators & Iterators', url: '/javascript/advanced/generators.html' },
        { title: 'Proxy & Reflect', url: '/javascript/advanced/proxy-reflect.html' },
        { title: 'Symbols', url: '/javascript/advanced/symbols.html' },
      ]
    },
    {
      title: '🌐 DOM & Browser',
      items: [
        { title: 'DOM Manipulation', url: '/javascript/dom/dom-manipulation.html' },
        { title: 'Events', url: '/javascript/dom/events.html' },
        { title: 'Event Delegation', url: '/javascript/dom/event-delegation.html' },
        { title: 'Forms & Validation', url: '/javascript/dom/forms.html' },
        { title: 'Fetch API', url: '/javascript/dom/fetch-api.html' },
        { title: 'AJAX', url: '/javascript/dom/ajax.html' },
        { title: 'Web Storage', url: '/javascript/dom/web-storage.html' },
      ]
    },
    {
      title: '⚡ Frameworks',
      items: [
        { title: 'React', url: '/javascript/frameworks/react.html', badge: 'hot' },
        { title: 'Vue.js', url: '/javascript/frameworks/vue.html' },
        { title: 'Node.js', url: '/javascript/frameworks/nodejs.html', badge: 'hot' },
      ]
    },
    {
      title: '🎯 Interview Prep',
      items: [
        { title: 'Interview Questions', url: '/javascript/interview/questions.html', badge: 'hot' },
        { title: 'Coding Challenges', url: '/javascript/interview/coding-challenges.html' },
        { title: 'Practical Exercises', url: '/javascript/interview/exercises.html' },
      ]
    },
    {
      title: '🛠️ Projects',
      items: [
        { title: 'Calculator', url: '/javascript/projects/calculator.html' },
        { title: 'Todo App', url: '/javascript/projects/todo-app.html' },
        { title: 'Weather App', url: '/javascript/projects/weather-app.html' },
        { title: 'Quiz App', url: '/javascript/projects/quiz-app.html' },
        { title: 'Expense Tracker', url: '/javascript/projects/expense-tracker.html' },
        { title: 'Memory Game', url: '/javascript/projects/memory-game.html' },
      ]
    },
  ];

  // ========================
  // OWL JS Navigation Data
  // ========================
  const OWL_NAV_DATA = [
    {
      title: '🦉 Introduction',
      items: [
        { title: 'What is OWL JS?', url: '/owljs/what-is-owl.html' },
        { title: 'Why Learn OWL JS?', url: '/owljs/why-learn-owl.html' },
        { title: 'Prerequisites', url: '/owljs/owl-prerequisites.html' },
        { title: 'OWL vs React vs Vue', url: '/owljs/owl-vs-frameworks.html' },
        { title: 'OWL Career Paths', url: '/owljs/owl-career-paths.html' },
      ]
    },
    {
      title: '🚀 Getting Started',
      items: [
        { title: 'Setting Up OWL JS', url: '/owljs/getting-started/setup.html' },
        { title: 'Your First OWL App', url: '/owljs/getting-started/first-app.html' },
        { title: 'OWL Project Structure', url: '/owljs/getting-started/project-structure.html' },
      ]
    },
    {
      title: '🧩 Core Concepts',
      items: [
        { title: 'Components & Classes', url: '/owljs/core/components.html' },
        { title: 'Template Syntax (QWeb)', url: '/owljs/core/templates.html' },
        { title: 'Props', url: '/owljs/core/props.html' },
        { title: 'State & useState', url: '/owljs/core/state.html' },
        { title: 'Event Handling', url: '/owljs/core/events.html' },
      ]
    },
    {
      title: '🔄 Lifecycle Hooks',
      items: [
        { title: 'Lifecycle Overview', url: '/owljs/lifecycle/overview.html' },
        { title: 'setup & onMounted', url: '/owljs/lifecycle/setup-mounted.html' },
        { title: 'willStart & Async Init', url: '/owljs/lifecycle/will-start.html' },
        { title: 'willPatch & patched', url: '/owljs/lifecycle/patch-hooks.html' },
        { title: 'willUnmount & Cleanup', url: '/owljs/lifecycle/unmount.html' },
      ]
    },
    {
      title: '📋 Dynamic Templates',
      items: [
        { title: 'Conditional Rendering (t-if)', url: '/owljs/templates/conditional.html' },
        { title: 'List Rendering (t-foreach)', url: '/owljs/templates/list-rendering.html' },
        { title: 'Input Binding (t-model)', url: '/owljs/templates/input-binding.html' },
        { title: 'Dynamic Attributes (t-att)', url: '/owljs/templates/dynamic-attrs.html' },
        { title: 'Refs (t-ref)', url: '/owljs/templates/refs.html' },
      ]
    },
    {
      title: '⚙️ Advanced OWL',
      items: [
        { title: 'Sub-components', url: '/owljs/advanced/sub-components.html' },
        { title: 'Slots', url: '/owljs/advanced/slots.html' },
        { title: 'Custom Hooks', url: '/owljs/advanced/hooks.html' },
        { title: 'Environment & Services', url: '/owljs/advanced/environment.html' },
        { title: 'Error Handling', url: '/owljs/advanced/error-handling.html' },
        { title: 'Concurrency Model', url: '/owljs/advanced/concurrency.html' },
      ]
    },
    {
      title: '🏢 Odoo Integration',
      items: [
        { title: 'OWL in Odoo Backend', url: '/owljs/odoo/owl-in-odoo.html' },
        { title: 'Odoo Services', url: '/owljs/odoo/services.html' },
        { title: 'RPC – Calling Python', url: '/owljs/odoo/rpc-calls.html' },
      ]
    },
    {
      title: '🎯 Interview Prep',
      items: [
        { title: 'OWL Interview Questions', url: '/owljs/interview/questions.html', badge: 'hot' },
        { title: 'Practical Exercises', url: '/owljs/interview/exercises.html' },
      ]
    },
    {
      title: '🛠️ Projects',
      items: [
        { title: 'Todo App with OWL', url: '/owljs/projects/todo-app.html' },
        { title: 'Counter Widget', url: '/owljs/projects/counter.html' },
        { title: 'Form with Validation', url: '/owljs/projects/form-validation.html' },
        { title: 'Dashboard Component', url: '/owljs/projects/dashboard.html' },
      ]
    },
  ];

  // ========================
  // HTML Navigation Data
  // ========================
  const HTML_NAV_DATA = [
    {
      title: '🌐 Introduction',
      items: [
        { title: 'What is HTML?', url: '/html/what-is-html.html' },
        { title: 'History of HTML', url: '/html/history-of-html.html' },
        { title: 'Why Learn HTML?', url: '/html/why-learn-html.html' },
        { title: 'HTML Applications', url: '/html/html-applications.html' },
        { title: 'HTML Career Paths', url: '/html/html-career-paths.html' },
      ]
    },
    {
      title: '🌱 Beginner',
      items: [
        { title: 'Setting Up HTML', url: '/html/beginner/setting-up.html' },
        { title: 'Your First HTML Page', url: '/html/beginner/first-page.html' },
        { title: 'HTML Syntax & Structure', url: '/html/beginner/html-syntax.html' },
        { title: 'HTML Headings', url: '/html/beginner/headings.html' },
        { title: 'Paragraphs & Text', url: '/html/beginner/paragraphs.html' },
        { title: 'Links & Anchors', url: '/html/beginner/links.html' },
        { title: 'Images', url: '/html/beginner/images.html' },
        { title: 'HTML Comments', url: '/html/beginner/comments.html' },
        { title: 'HTML Entities', url: '/html/beginner/entities.html' },
      ]
    },
    {
      title: '📦 Core Elements',
      items: [
        { title: 'Block vs Inline Elements', url: '/html/core-elements/block-inline.html' },
        { title: 'Div & Span', url: '/html/core-elements/div-span.html' },
        { title: 'HTML Lists', url: '/html/core-elements/lists.html' },
        { title: 'HTML Tables', url: '/html/core-elements/tables.html' },
        { title: 'HTML Attributes', url: '/html/core-elements/attributes.html' },
        { title: 'HTML Classes & IDs', url: '/html/core-elements/classes-ids.html' },
      ]
    },
    {
      title: '📋 Forms',
      items: [
        { title: 'Form Basics', url: '/html/forms/form-basics.html' },
        { title: 'Input Types', url: '/html/forms/input-types.html' },
        { title: 'Form Validation', url: '/html/forms/validation.html' },
        { title: 'Buttons', url: '/html/forms/buttons.html' },
        { title: 'Select & Textarea', url: '/html/forms/select-textarea.html' },
        { title: 'Fieldset & Legend', url: '/html/forms/fieldset-legend.html' },
      ]
    },
    {
      title: '🏗️ Semantic HTML',
      items: [
        { title: 'What is Semantic HTML?', url: '/html/semantic/what-is-semantic.html' },
        { title: 'Header, Footer, Nav', url: '/html/semantic/header-footer-nav.html' },
        { title: 'Main, Article, Section', url: '/html/semantic/main-article-section.html' },
        { title: 'Aside & Figure', url: '/html/semantic/aside-figure.html' },
        { title: 'HTML5 New Elements', url: '/html/semantic/html5-elements.html' },
      ]
    },
    {
      title: '🚀 Advanced HTML',
      items: [
        { title: 'Meta Tags & SEO', url: '/html/advanced/meta-seo.html' },
        { title: 'HTML Accessibility (ARIA)', url: '/html/advanced/accessibility.html' },
        { title: 'HTML Canvas', url: '/html/advanced/canvas.html' },
        { title: 'HTML Video & Audio', url: '/html/advanced/video-audio.html' },
        { title: 'Iframe', url: '/html/advanced/iframe.html' },
      ]
    },
    {
      title: '🎯 Interview Prep',
      items: [
        { title: 'HTML Interview Questions', url: '/html/interview/questions.html', badge: 'hot' },
        { title: 'HTML Exercises', url: '/html/interview/exercises.html' },
      ]
    },
    {
      title: '🛠️ Projects',
      items: [
        { title: 'Personal Portfolio Page', url: '/html/projects/portfolio.html' },
        { title: 'Landing Page', url: '/html/projects/landing-page.html' },
        { title: 'Registration Form', url: '/html/projects/registration-form.html' },
        { title: 'HTML Email Template', url: '/html/projects/email-template.html' },
      ]
    },
  ];

  // ========================
  // CSS Navigation Data
  // ========================
  const CSS_NAV_DATA = [
    {
      title: '🎨 Introduction',
      items: [
        { title: 'What is CSS?', url: '/csslessons/what-is-css.html' },
        { title: 'How CSS Works', url: '/csslessons/how-css-works.html' },
        { title: 'CSS Syntax', url: '/csslessons/css-syntax.html' },
        { title: 'Adding CSS to HTML', url: '/csslessons/adding-css.html' },
      ]
    },
    {
      title: '🌱 CSS Basics',
      items: [
        { title: 'CSS Selectors', url: '/csslessons/selectors/selectors-basics.html' },
        { title: 'CSS Colors', url: '/csslessons/selectors/colors.html' },
        { title: 'CSS Text & Fonts', url: '/csslessons/selectors/text-fonts.html' },
        { title: 'CSS Backgrounds', url: '/csslessons/selectors/backgrounds.html' },
        { title: 'CSS Box Model', url: '/csslessons/selectors/box-model.html' },
        { title: 'CSS Margin & Padding', url: '/csslessons/selectors/margin-padding.html' },
        { title: 'CSS Borders', url: '/csslessons/selectors/borders.html' },
      ]
    },
    {
      title: '📐 CSS Layout',
      items: [
        { title: 'CSS Display', url: '/csslessons/layout/display.html' },
        { title: 'CSS Position', url: '/csslessons/layout/position.html' },
        { title: 'CSS Flexbox', url: '/csslessons/layout/flexbox.html', badge: 'hot' },
        { title: 'CSS Grid', url: '/csslessons/layout/grid.html', badge: 'hot' },
        { title: 'CSS Float (Legacy)', url: '/csslessons/layout/float.html' },
        { title: 'CSS Z-index', url: '/csslessons/layout/z-index.html' },
      ]
    },
    {
      title: '📱 Responsive Design',
      items: [
        { title: 'Media Queries', url: '/csslessons/responsive/media-queries.html' },
        { title: 'Responsive Images', url: '/csslessons/responsive/responsive-images.html' },
        { title: 'Mobile-First Design', url: '/csslessons/responsive/mobile-first.html' },
        { title: 'CSS Viewport Units', url: '/csslessons/responsive/viewport-units.html' },
      ]
    },
    {
      title: '✨ CSS Effects',
      items: [
        { title: 'CSS Transitions', url: '/csslessons/effects/transitions.html' },
        { title: 'CSS Animations', url: '/csslessons/effects/animations.html' },
        { title: 'CSS Transforms', url: '/csslessons/effects/transforms.html' },
        { title: 'CSS Filters', url: '/csslessons/effects/filters.html' },
      ]
    },
    {
      title: '🔧 Advanced CSS',
      items: [
        { title: 'CSS Variables', url: '/csslessons/advanced/variables.html' },
        { title: 'CSS Pseudo-classes', url: '/csslessons/advanced/pseudo-classes.html' },
        { title: 'CSS Pseudo-elements', url: '/csslessons/advanced/pseudo-elements.html' },
        { title: 'CSS Specificity', url: '/csslessons/advanced/specificity.html' },
        { title: 'CSS Best Practices', url: '/csslessons/advanced/best-practices.html' },
      ]
    },
    {
      title: '🎯 Interview Prep',
      items: [
        { title: 'CSS Interview Questions', url: '/csslessons/interview/questions.html', badge: 'hot' },
        { title: 'CSS Exercises', url: '/csslessons/interview/exercises.html' },
      ]
    },
    {
      title: '🛠️ Projects',
      items: [
        { title: 'Button Styles Collection', url: '/csslessons/projects/buttons.html' },
        { title: 'CSS Card Components', url: '/csslessons/projects/cards.html' },
        { title: 'Responsive Navigation', url: '/csslessons/projects/navigation.html' },
        { title: 'Full Landing Page Style', url: '/csslessons/projects/landing-page.html' },
      ]
    },
  ];

  // ========================
  // Git Navigation Data
  // ========================
  const GIT_NAV_DATA = [
    {
      title: '📖 Introduction',
      items: [
        { title: 'What is Git?', url: '/git/what-is-git.html' },
        { title: 'Why Learn Git?', url: '/git/why-learn-git.html' },
        { title: 'Git vs GitHub vs GitLab', url: '/git/git-vs-github.html' },
        { title: 'Installing & Configuring Git', url: '/git/git-installation.html' },
        { title: 'How Git Thinks (Mental Model)', url: '/git/git-mental-model.html' },
      ]
    },
    {
      title: '🚀 Getting Started',
      items: [
        { title: 'git init & git clone', url: '/git/basics/init-clone.html' },
        { title: 'Staging & Committing', url: '/git/basics/staging-committing.html' },
        { title: 'git status & git log', url: '/git/basics/status-log.html' },
        { title: 'Undoing Changes', url: '/git/basics/undoing-changes.html' },
        { title: 'Viewing Diffs (git diff)', url: '/git/basics/viewing-diffs.html' },
      ]
    },
    {
      title: '🌿 Branching & Merging',
      items: [
        { title: 'Branches Overview', url: '/git/branching/branches-overview.html' },
        { title: 'Creating & Switching Branches', url: '/git/branching/creating-switching.html' },
        { title: 'Merging Branches', url: '/git/branching/merging.html' },
        { title: 'Resolving Merge Conflicts', url: '/git/branching/merge-conflicts.html' },
        { title: 'Rebasing (git rebase)', url: '/git/branching/rebase.html' },
      ]
    },
    {
      title: '🌐 Remote Repositories',
      items: [
        { title: 'Remotes Overview', url: '/git/remotes/remotes-overview.html' },
        { title: 'Push, Pull & Fetch', url: '/git/remotes/push-pull-fetch.html' },
        { title: 'GitHub PR Workflow', url: '/git/remotes/github-workflow.html' },
        { title: 'SSH Keys & Auth', url: '/git/remotes/ssh-keys.html' },
      ]
    },
    {
      title: '⚙️ Advanced Git',
      items: [
        { title: 'Stashing Changes', url: '/git/advanced/stashing.html' },
        { title: 'Tags & Releases', url: '/git/advanced/tags-releases.html' },
        { title: 'Cherry-pick', url: '/git/advanced/cherry-pick.html' },
        { title: 'Bisect & Blame', url: '/git/advanced/git-bisect.html' },
        { title: 'Git Hooks', url: '/git/advanced/git-hooks.html' },
      ]
    },
    {
      title: '🔀 Workflows',
      items: [
        { title: 'Git Flow Strategy', url: '/git/workflows/gitflow.html' },
        { title: 'Feature Branch Workflow', url: '/git/workflows/feature-branch-workflow.html' },
        { title: 'Conventional Commits', url: '/git/workflows/conventional-commits.html' },
        { title: '.gitignore & .gitattributes', url: '/git/workflows/gitignore.html' },
      ]
    },
    {
      title: '🎯 Interview Prep',
      items: [
        { title: 'Git Interview Questions', url: '/git/interview/questions.html', badge: 'hot' },
        { title: 'Practical Exercises', url: '/git/interview/exercises.html' },
      ]
    },
    {
      title: '🛠️ Projects',
      items: [
        { title: 'Version Your First Project', url: '/git/projects/version-your-project.html' },
        { title: 'Simulate Team Collaboration', url: '/git/projects/team-workflow.html' },
        { title: 'Open Source Contribution', url: '/git/projects/open-source-contribution.html' },
      ]
    },
  ];

  // ========================
  // SQL Navigation Data
  // ========================
  const SQL_NAV_DATA = [
    {
      title: '🗄️ Introduction',
      items: [
        { title: 'What is SQL?', url: '/sql/what-is-sql.html' },
        { title: 'Why Learn SQL?', url: '/sql/why-learn-sql.html' },
        { title: 'SQL vs NoSQL', url: '/sql/sql-vs-nosql.html' },
        { title: 'Database Concepts', url: '/sql/database-concepts.html' },
        { title: 'SQL Installation & Setup', url: '/sql/sql-installation.html' },
      ]
    },
    {
      title: '🚀 SQL Basics',
      items: [
        { title: 'SELECT Statement', url: '/sql/basics/select-statement.html' },
        { title: 'WHERE Clause', url: '/sql/basics/where-clause.html' },
        { title: 'ORDER BY', url: '/sql/basics/order-by.html' },
        { title: 'LIMIT & OFFSET', url: '/sql/basics/limit-offset.html' },
        { title: 'DISTINCT', url: '/sql/basics/distinct.html' },
        { title: 'Aliases (AS)', url: '/sql/basics/aliases.html' },
      ]
    },
    {
      title: '🏗️ Tables & Schema',
      items: [
        { title: 'SQL Data Types', url: '/sql/tables/data-types.html' },
        { title: 'CREATE TABLE', url: '/sql/tables/create-table.html' },
        { title: 'ALTER TABLE', url: '/sql/tables/alter-table.html' },
        { title: 'DROP TABLE', url: '/sql/tables/drop-table.html' },
        { title: 'Constraints', url: '/sql/tables/constraints.html' },
      ]
    },
    {
      title: '🔍 Filtering',
      items: [
        { title: 'Comparison Operators', url: '/sql/filtering/comparison-operators.html' },
        { title: 'Logical Operators (AND, OR, NOT)', url: '/sql/filtering/logical-operators.html' },
        { title: 'LIKE & Pattern Matching', url: '/sql/filtering/like-pattern.html' },
        { title: 'BETWEEN & IN', url: '/sql/filtering/between-in.html' },
      ]
    },
    {
      title: '⚙️ SQL Functions',
      items: [
        { title: 'String Functions', url: '/sql/functions/string-functions.html' },
        { title: 'Numeric Functions', url: '/sql/functions/numeric-functions.html' },
        { title: 'Date & Time Functions', url: '/sql/functions/date-functions.html' },
        { title: 'Aggregate Functions', url: '/sql/functions/aggregate-functions.html' },
        { title: 'NULL Handling', url: '/sql/functions/null-functions.html' },
        { title: 'CASE Expression', url: '/sql/functions/case-expression.html' },
      ]
    },
    {
      title: '🔗 Joins',
      items: [
        { title: 'Joins Overview', url: '/sql/joins/joins-overview.html' },
        { title: 'INNER JOIN', url: '/sql/joins/inner-join.html' },
        { title: 'LEFT & RIGHT JOIN', url: '/sql/joins/left-right-join.html' },
        { title: 'FULL OUTER JOIN', url: '/sql/joins/full-outer-join.html' },
        { title: 'Self Join', url: '/sql/joins/self-join.html' },
        { title: 'CROSS JOIN', url: '/sql/joins/cross-join.html' },
      ]
    },
    {
      title: '📊 Grouping & Aggregation',
      items: [
        { title: 'GROUP BY', url: '/sql/grouping/group-by.html' },
        { title: 'HAVING Clause', url: '/sql/grouping/having-clause.html' },
        { title: 'ROLLUP & CUBE', url: '/sql/grouping/rollup-cube.html' },
        { title: 'Window Functions', url: '/sql/grouping/window-functions.html', badge: 'hot' },
      ]
    },
    {
      title: '🪆 Subqueries',
      items: [
        { title: 'Subqueries Intro', url: '/sql/subqueries/subqueries-intro.html' },
        { title: 'Correlated Subqueries', url: '/sql/subqueries/correlated-subqueries.html' },
        { title: 'EXISTS & IN', url: '/sql/subqueries/exists-in.html' },
        { title: 'CTEs (WITH clause)', url: '/sql/subqueries/cte-with.html' },
      ]
    },
    {
      title: '✏️ Data Modification',
      items: [
        { title: 'INSERT Data', url: '/sql/dml/insert-data.html' },
        { title: 'UPDATE Data', url: '/sql/dml/update-data.html' },
        { title: 'DELETE Data', url: '/sql/dml/delete-data.html' },
        { title: 'Transactions', url: '/sql/dml/transactions.html' },
        { title: 'UPSERT (ON CONFLICT)', url: '/sql/dml/upsert.html' },
      ]
    },
    {
      title: '🔧 Advanced SQL',
      items: [
        { title: 'Indexes', url: '/sql/advanced/indexes.html' },
        { title: 'Views', url: '/sql/advanced/views.html' },
        { title: 'Stored Procedures', url: '/sql/advanced/stored-procedures.html' },
        { title: 'Triggers', url: '/sql/advanced/triggers.html' },
        { title: 'Normalization', url: '/sql/advanced/normalization.html' },
      ]
    },
    {
      title: '🎯 Interview Prep',
      items: [
        { title: 'SQL Interview Questions', url: '/sql/interview/questions.html', badge: 'hot' },
        { title: 'SQL Exercises', url: '/sql/interview/exercises.html' },
      ]
    },
    {
      title: '🛠️ Projects',
      items: [
        { title: 'Library Database', url: '/sql/projects/library-database.html' },
        { title: 'E-Commerce Schema', url: '/sql/projects/ecommerce-schema.html' },
        { title: 'Analytics Queries', url: '/sql/projects/analytics-queries.html' },
      ]
    },
  ];

  const ODOO_NAV_DATA = [
    { title: '🐍 Introduction', items: [
      { title: 'What is Odoo?', url: '/odoo/what-is-odoo.html' },
      { title: 'Why Learn Odoo Dev?', url: '/odoo/why-learn-odoo.html' },
      { title: 'Odoo Architecture', url: '/odoo/odoo-architecture.html' },
      { title: 'Odoo Prerequisites', url: '/odoo/odoo-prerequisites.html' },
      { title: 'XML Basics for Odoo', url: '/odoo/xml-basics.html' },
      { title: 'PostgreSQL for Odoo', url: '/odoo/postgresql-basics.html' },
      { title: 'Installation & Setup', url: '/odoo/odoo-installation.html' },
    ]},
    { title: '⚙️ Module Development', items: [
      { title: 'Module Structure', url: '/odoo/module/module-structure.html' },
      { title: 'The Manifest File', url: '/odoo/module/manifest-file.html' },
      { title: 'Models & Fields', url: '/odoo/module/models-fields.html' },
      { title: 'Basic Views', url: '/odoo/module/basic-views.html' },
      { title: 'Menus & Actions', url: '/odoo/module/menus-actions.html' },
      { title: 'Security & Access Rights', url: '/odoo/module/security-access.html' },
      { title: '📝 Section Quiz', url: '/odoo/module/quiz.html', badge: 'quiz' },
    ]},
    { title: '🔧 Backend Development', items: [
      { title: 'Computed Fields', url: '/odoo/backend/computed-fields.html' },
      { title: 'Onchange & Constraints', url: '/odoo/backend/onchange-constraints.html' },
      { title: 'Model Inheritance', url: '/odoo/backend/model-inheritance.html' },
      { title: 'Wizards', url: '/odoo/backend/wizards.html' },
      { title: 'QWeb PDF Reports', url: '/odoo/backend/qweb-reports.html' },
      { title: 'Scheduled Actions', url: '/odoo/backend/scheduled-actions.html' },
      { title: 'Server Actions', url: '/odoo/backend/server-actions.html' },
      { title: 'Email Templates', url: '/odoo/backend/email-templates.html' },
      { title: '📝 Section Quiz', url: '/odoo/backend/quiz.html', badge: 'quiz' },
    ]},
    { title: '🌐 Portal Development', items: [
      { title: 'Portal Overview', url: '/odoo/portal/portal-overview.html' },
      { title: 'Portal Controllers', url: '/odoo/portal/portal-controllers.html' },
      { title: 'Portal Templates', url: '/odoo/portal/portal-templates.html' },
      { title: 'Portal Forms', url: '/odoo/portal/portal-forms.html' },
      { title: 'Portal Security', url: '/odoo/portal/portal-security.html' },
      { title: '📝 Section Quiz', url: '/odoo/portal/quiz.html', badge: 'quiz' },
    ]},
    { title: '💻 Website Development', items: [
      { title: 'Website Module Overview', url: '/odoo/website/website-overview.html' },
      { title: 'Website Controllers', url: '/odoo/website/website-controllers.html' },
      { title: 'QWeb Website Templates', url: '/odoo/website/qweb-templates.html' },
      { title: 'Website Forms', url: '/odoo/website/website-forms.html' },
      { title: 'Snippets & Building Blocks', url: '/odoo/website/snippets.html' },
      { title: 'eCommerce Basics', url: '/odoo/website/ecommerce-basics.html' },
      { title: '📝 Section Quiz', url: '/odoo/website/quiz.html', badge: 'quiz' },
    ]},
    { title: '🛒 POS Development', items: [
      { title: 'POS Architecture', url: '/odoo/pos/pos-architecture.html' },
      { title: 'Extending POS Models', url: '/odoo/pos/pos-models.html' },
      { title: 'POS UI Components', url: '/odoo/pos/pos-ui-components.html' },
      { title: 'POS Payment Methods', url: '/odoo/pos/pos-payment.html' },
      { title: 'POS Receipts', url: '/odoo/pos/pos-receipts.html' },
      { title: '📝 Section Quiz', url: '/odoo/pos/quiz.html', badge: 'quiz' },
    ]},
    { title: '🦉 OWL in Odoo', items: [
      { title: 'OWL in Odoo', url: '/odoo/owl/owl-in-odoo.html' },
      { title: 'OWL Components', url: '/odoo/owl/owl-components.html' },
      { title: 'OWL Services', url: '/odoo/owl/owl-services.html' },
      { title: 'Custom Field Widgets', url: '/odoo/owl/custom-widgets.html' },
      { title: '📝 Section Quiz', url: '/odoo/owl/quiz.html', badge: 'quiz' },
    ]},
    { title: '🎨 Odoo Studio', items: [
      { title: 'What is Odoo Studio?', url: '/odoo/studio/what-is-studio.html' },
      { title: 'Customizing Views', url: '/odoo/studio/customizing-views.html' },
      { title: 'Custom Fields', url: '/odoo/studio/custom-fields.html' },
      { title: 'Custom Models & Apps', url: '/odoo/studio/custom-models.html' },
      { title: 'Automations in Studio', url: '/odoo/studio/studio-automations.html' },
      { title: 'Reports in Studio', url: '/odoo/studio/studio-reports.html' },
      { title: 'Studio vs Custom Module', url: '/odoo/studio/studio-vs-module.html' },
      { title: '📝 Section Quiz', url: '/odoo/studio/quiz.html', badge: 'quiz' },
    ]},
    { title: '📊 Advanced Topics', items: [
      { title: 'Performance & Caching', url: '/odoo/advanced/performance-caching.html' },
      { title: 'Multi-company Setup', url: '/odoo/advanced/multi-company.html' },
      { title: 'Testing Odoo Modules', url: '/odoo/advanced/testing.html' },
      { title: 'Deployment', url: '/odoo/advanced/deployment.html' },
      { title: '📝 Section Quiz', url: '/odoo/advanced/quiz.html', badge: 'quiz' },
    ]},
    { title: '🎯 Interview Prep', items: [
      { title: 'Interview Questions', url: '/odoo/interview/odoo-interview-questions.html', badge: 'hot' },
      { title: 'Advanced Interview Q&A', url: '/odoo/interview/odoo-advanced-interview.html' },
      { title: '📝 Section Quiz', url: '/odoo/interview/quiz.html', badge: 'quiz' },
    ]},
    { title: '🛠️ Projects', items: [
      { title: 'Library Module Project', url: '/odoo/projects/library-module.html' },
      { title: 'eCommerce Extension', url: '/odoo/projects/ecommerce-extension.html' },
      { title: 'POS Loyalty Module', url: '/odoo/projects/pos-loyalty.html' },
      { title: '📝 Section Quiz', url: '/odoo/projects/quiz.html', badge: 'quiz' },
    ]},
  ];

  function getNavData() {
    const path = window.location.pathname;
    if (path.includes('/javascript/')) return JS_NAV_DATA;
    if (path.includes('/owljs/')) return OWL_NAV_DATA;
    if (path.includes('/html/')) return HTML_NAV_DATA;
    if (path.includes('/csslessons/')) return CSS_NAV_DATA;
    if (path.includes('/git/')) return GIT_NAV_DATA;
    if (path.includes('/sql/')) return SQL_NAV_DATA;
    if (path.includes('/odoo/')) return ODOO_NAV_DATA;
    return NAV_DATA;
  }

  function courseFromUrl(url) {
    if (url.includes('/python/'))     return 'Python';
    if (url.includes('/javascript/')) return 'JavaScript';
    if (url.includes('/owljs/'))      return 'OWL JS';
    if (url.includes('/html/'))       return 'HTML';
    if (url.includes('/csslessons/')) return 'CSS';
    if (url.includes('/git/'))        return 'Git';
    if (url.includes('/sql/'))        return 'SQL';
    if (url.includes('/odoo/'))       return 'Odoo';
    return '';
  }

  // Search index (with BASE-prefixed URLs for file:// searches)
  const SEARCH_INDEX = [...NAV_DATA, ...JS_NAV_DATA, ...OWL_NAV_DATA, ...HTML_NAV_DATA, ...CSS_NAV_DATA, ...GIT_NAV_DATA, ...SQL_NAV_DATA, ...ODOO_NAV_DATA].flatMap(section =>
    section.items.map(item => {
      const course = courseFromUrl(item.url);
      const sectionName = section.title.replace(/^.{2}\s/, '');
      return {
        title: item.title,
        category: course ? `${sectionName} (${course})` : sectionName,
        url: BASE + item.url,
      };
    })
  );

  // ========================
  // Render Navigation
  // ========================
  function renderNav(container) {
    if (!container) return;
    const currentPath = window.location.pathname;

    const html = getNavData().map((section, i) => {
      const links = section.items.map(item => {
        const itemPath = item.url.replace('.html', '');
        const active = currentPath.replace('.html', '') === itemPath || currentPath.replace('.html', '').endsWith(itemPath);
        const badge = item.badge ? `<span class="nav-badge badge-${item.badge}">${item.badge.toUpperCase()}</span>` : '';
        const href = BASE + item.url; // BASE='' on server, BASE='file:///...' locally
        return `<li><a href="${href}" ${active ? 'class="active"' : ''}>${item.title}${badge}</a></li>`;
      }).join('');

      return `
        <div class="nav-section">
          <div class="nav-section-title" data-section="${i}">
            <span>${section.title}</span>
            <span class="arrow">▼</span>
          </div>
          <ul class="nav-links">${links}</ul>
        </div>
      `;
    }).join('');

    container.innerHTML = html;

    // Collapsible sections
    container.querySelectorAll('.nav-section-title').forEach(title => {
      title.addEventListener('click', () => {
        const section = title.closest('.nav-section');
        section.classList.toggle('collapsed');
      });
    });

    // Collapse inactive sections on mobile
    if (window.innerWidth < 768) {
      container.querySelectorAll('.nav-section').forEach(section => {
        const hasActive = section.querySelector('a.active');
        if (!hasActive) section.classList.add('collapsed');
      });
    }

    // Scroll active item into view within the sidebar
    const activeLink = container.querySelector('a.active');
    if (activeLink) {
      activeLink.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }

  // ========================
  // Dark Mode
  // ========================
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // ========================
  // Search
  // ========================
  function initSearch() {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!input || !results) return;

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => performSearch(input.value, results), 200);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) results.classList.add('active');
    });

    document.addEventListener('click', e => {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.classList.remove('active');
      }
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        results.classList.remove('active');
        input.blur();
      }
    });
  }

  function performSearch(query, resultsEl) {
    const q = query.trim().toLowerCase();
    if (!q) { resultsEl.classList.remove('active'); return; }

    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    ).slice(0, 8);

    if (!matches.length) {
      resultsEl.innerHTML = '<div style="padding:1rem;text-align:center;color:var(--text-muted);font-size:0.85rem;">No results found</div>';
    } else {
      resultsEl.innerHTML = matches.map(item => `
        <a href="${item.url}" class="search-result-item">
          <span class="result-category">${item.category}</span>
          <span class="result-title">${highlight(item.title, q)}</span>
        </a>
      `).join('');
    }
    resultsEl.classList.add('active');
  }

  function highlight(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background:rgba(255,212,59,0.4);border-radius:2px;">$1</mark>');
  }

  // ========================
  // Mobile Sidebar
  // ========================
  function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay && overlay.classList.toggle('active');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });

    overlay && overlay.addEventListener('click', closeNav);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) closeNav();
    });

    function closeNav() {
      sidebar.classList.remove('open');
      overlay && overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ========================
  // Table of Contents
  // ========================
  function buildTOC() {
    const tocContainer = document.getElementById('toc');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.lesson-body h2, .lesson-body h3');
    if (!headings.length) return;

    const list = document.createElement('ul');
    list.className = 'toc-list';

    headings.forEach(h => {
      if (!h.id) {
        h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      const li = document.createElement('li');
      li.className = h.tagName === 'H3' ? 'toc-h3' : '';
      li.innerHTML = `<a href="#${h.id}">${h.textContent}</a>`;
      list.appendChild(li);
    });

    tocContainer.appendChild(list);

    // Scroll spy
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = tocContainer.querySelector(`a[href="#${id}"]`);
        if (link) link.classList.toggle('toc-active', entry.isIntersecting);
      });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

    headings.forEach(h => observer.observe(h));
  }

  // ========================
  // Code Copy Buttons
  // ========================
  function initCodeCopy() {
    document.querySelectorAll('.code-block').forEach(block => {
      const btn = block.querySelector('.copy-btn');
      if (!btn) return;
      const pre = block.querySelector('pre');
      if (!pre) return;

      btn.addEventListener('click', () => {
        const code = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = '✓ Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  // ========================
  // Reading Progress Bar
  // ========================
  function initProgressBar() {
    const bar = document.querySelector('.reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      bar.style.width = `${Math.min(progress, 100)}%`;
    }, { passive: true });
  }

  // ========================
  // FAQ Accordion
  // ========================
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question');
      question && question.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // ========================
  // Scroll to Top
  // ========================
  function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ========================
  // Highlight.js Init
  // ========================
  function initHighlight() {
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  }

  // ========================
  // Active Nav Link
  // ========================
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPath === href || currentPath.endsWith(href))) {
        link.classList.add('active');
        const section = link.closest('.nav-section');
        if (section) section.classList.remove('collapsed');
      }
    });
  }

  // ========================
  // Algorid Footer Credit
  // ========================
  function injectAlgoridCredit() {
    document.querySelectorAll('.footer-bottom').forEach(footer => {
      if (footer.querySelector('.algorid-credit')) return;
      const credit = document.createElement('span');
      credit.className = 'algorid-credit';
      credit.innerHTML = 'Developed by <a href="https://algorid.com/" target="_blank" rel="noopener noreferrer" style="color:var(--python-blue);font-weight:600;">Algorid Limited</a>';
      footer.appendChild(credit);
    });
  }

  // ========================
  // MCQ Section Quiz Page
  // ========================
  function initQuizPage() {
    const root = document.getElementById('quiz-root');
    if (!root || !window.QUIZ_DATA) return;
    const { questions } = window.QUIZ_DATA;

    // Auto-pick count: largest multiple of 5 ≥ 10 that fits available questions
    function pickCount(total) {
      const candidates = [25, 20, 15, 10].filter(n => n <= total);
      return candidates[0] || total;
    }

    let shuffled = [], current = 0, userAnswers = [];
    const lessonNav = document.getElementById('quiz-lesson-nav');

    function showNav() { if (lessonNav) lessonNav.style.display = 'grid'; }
    function hideNav() { if (lessonNav) lessonNav.style.display = 'none'; }

    function renderIntro() {
      const n = pickCount(questions.length);
      const title = window.QUIZ_DATA.title || 'Section Quiz';
      root.innerHTML = `
        <div class="qp-intro">
          <div class="qp-intro-icon">📝</div>
          <h2 class="qp-intro-title">${title}</h2>
          <p class="qp-intro-desc">Test your knowledge with <strong>${n} multiple-choice questions</strong>. Answer all questions, then submit to see your score and a full breakdown.</p>
          <ul class="qp-intro-rules">
            <li>⏱️ No time limit</li>
            <li>✅ Select one answer per question</li>
            <li>📊 Score revealed at the end</li>
          </ul>
          <button class="qp-start-btn">Take a Quiz →</button>
        </div>`;
      showNav();
      root.querySelector('.qp-start-btn').addEventListener('click', startQuiz);
    }

    function startQuiz() {
      const n = pickCount(questions.length);
      shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, n);
      userAnswers = new Array(n).fill(null);
      current = 0;
      hideNav();
      renderQuestion();
    }

    function renderQuestion() {
      const q = shuffled[current];
      const pct = (current / shuffled.length) * 100;
      const selected = userAnswers[current];
      root.innerHTML = `
        <div class="qp-header">
          <span>Question ${current + 1} of ${shuffled.length}</span>
          <span>${shuffled.length} Questions</span>
        </div>
        <div class="qp-progress-bar"><div class="qp-progress-fill" style="width:${pct}%"></div></div>
        <div class="qp-question-card">
          <div class="qp-q-num">Q${current + 1}</div>
          <p class="qp-question-text">${q.q}</p>
          <div class="qp-options">${q.options.map((opt, i) =>
            `<button class="qp-option${selected === i ? ' selected' : ''}" data-i="${i}">
              <span class="qp-opt-label">${'ABCD'[i]}</span>
              <span class="qp-opt-text">${opt}</span>
            </button>`).join('')}
          </div>
        </div>
        <div class="qp-nav-row">
          ${current > 0 ? '<button class="qp-back-btn">← Back</button>' : '<span></span>'}
          <button class="qp-next-btn"${selected === null ? ' disabled' : ''}>
            ${current === shuffled.length - 1 ? 'Submit Quiz →' : 'Next →'}
          </button>
        </div>
        <div class="qp-cancel-row">
          <button class="qp-cancel-btn">✕ Cancel Quiz</button>
        </div>`;

      root.querySelectorAll('.qp-option').forEach(btn => btn.addEventListener('click', () => {
        userAnswers[current] = +btn.dataset.i;
        root.querySelectorAll('.qp-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        root.querySelector('.qp-next-btn').removeAttribute('disabled');
      }));

      const nextBtn = root.querySelector('.qp-next-btn');
      nextBtn.addEventListener('click', () => {
        if (userAnswers[current] === null) return;
        current++;
        if (current < shuffled.length) renderQuestion(); else renderResults();
      });

      const backBtn = root.querySelector('.qp-back-btn');
      if (backBtn) backBtn.addEventListener('click', () => { current--; renderQuestion(); });

      root.querySelector('.qp-cancel-btn').addEventListener('click', renderIntro);
    }

    function renderResults() {
      const score = shuffled.reduce((acc, q, i) => acc + (userAnswers[i] === q.answer ? 1 : 0), 0);
      const pct = Math.round((score / shuffled.length) * 100);
      const grade = pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Studying!';

      // Build per-question breakdown
      const breakdown = shuffled.map((q, i) => {
        const correct = userAnswers[i] === q.answer;
        return `<div class="qp-breakdown-item ${correct ? 'correct' : 'wrong'}">
          <span class="qp-bd-icon">${correct ? '✓' : '✗'}</span>
          <div>
            <div class="qp-bd-q">${q.q}</div>
            ${!correct ? `<div class="qp-bd-ans">Correct: <strong>${q.options[q.answer]}</strong></div>` : ''}
          </div>
        </div>`;
      }).join('');

      root.innerHTML = `<div class="qp-results">
        <div class="qp-score-circle">${pct}<span style="font-size:0.55em">/100</span></div>
        <h2>${grade}</h2>
        <p>You answered <strong>${score} of ${shuffled.length}</strong> questions correctly.</p>
        <button class="qp-retry-btn">↺ Retry Quiz</button>
        <div class="qp-breakdown">${breakdown}</div>
      </div>`;

      showNav();
      root.querySelector('.qp-retry-btn').addEventListener('click', renderIntro);
    }

    renderIntro();
  }

  // ========================
  // Quiz Flashcard
  // ========================
  function initQuiz() {
    const faqSection = document.querySelector('.faq-section');
    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    const questions = [];
    faqItems.forEach(item => {
      const qEl = item.querySelector('.faq-question');
      const aEl = item.querySelector('.faq-answer');
      if (!qEl || !aEl) return;
      // Strip the toggle span (+/-) from question text
      const qClone = qEl.cloneNode(true);
      const toggle = qClone.querySelector('.faq-toggle');
      if (toggle) toggle.remove();
      questions.push({ q: qClone.innerHTML.trim(), a: aEl.innerHTML.trim() });
    });

    if (!questions.length) return;

    // Wrap faq section so TOC anchor works
    const quizAnchor = document.createElement('div');
    quizAnchor.id = 'quiz-section';

    // Add "Take a Quiz" button after faq section
    const triggerWrap = document.createElement('div');
    triggerWrap.className = 'quiz-trigger-wrap';
    quizAnchor.appendChild(triggerWrap);

    const triggerBtn = document.createElement('button');
    triggerBtn.className = 'quiz-trigger-btn';
    triggerBtn.innerHTML = '📝 Take a Quiz';
    triggerWrap.appendChild(triggerBtn);
    faqSection.after(quizAnchor);

    // Inject into TOC
    const tocList = document.querySelector('#toc .toc-list');
    if (tocList) {
      const li = document.createElement('li');
      li.className = 'toc-quiz-entry';
      li.innerHTML = '<a href="#quiz-section">📝 Take a Quiz</a>';
      tocList.appendChild(li);
    }

    // Build modal
    const overlay = document.createElement('div');
    overlay.className = 'quiz-overlay';
    overlay.id = 'quizOverlay';
    overlay.innerHTML = `
      <div class="quiz-card" role="dialog" aria-modal="true" aria-label="Quiz flashcard">
        <div class="quiz-card-header">
          <span class="quiz-label">📝 Quiz</span>
          <span class="quiz-counter">1 / ${questions.length}</span>
          <button class="quiz-close-btn" aria-label="Close quiz">✕</button>
        </div>
        <div class="quiz-card-body">
          <div class="quiz-question-text"></div>
          <div class="quiz-answer-box"></div>
        </div>
        <div class="quiz-card-footer">
          <div class="quiz-nav">
            <button class="quiz-nav-btn" id="quizPrev" aria-label="Previous question">‹</button>
            <button class="quiz-nav-btn" id="quizNext" aria-label="Next question">›</button>
          </div>
          <button class="quiz-see-answer-btn">See Answer</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    let current = 0;
    let answerVisible = false;

    const counter    = overlay.querySelector('.quiz-counter');
    const qText      = overlay.querySelector('.quiz-question-text');
    const aBox       = overlay.querySelector('.quiz-answer-box');
    const prevBtn    = overlay.querySelector('#quizPrev');
    const nextBtn    = overlay.querySelector('#quizNext');
    const seeBtn     = overlay.querySelector('.quiz-see-answer-btn');
    const closeBtn   = overlay.querySelector('.quiz-close-btn');

    function renderCard(idx) {
      current = idx;
      answerVisible = false;
      counter.textContent = `${idx + 1} / ${questions.length}`;
      qText.innerHTML = questions[idx].q;
      aBox.innerHTML  = questions[idx].a;
      aBox.classList.remove('visible');
      seeBtn.textContent = 'See Answer';
      seeBtn.classList.remove('revealed');
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === questions.length - 1;
    }

    function openQuiz() {
      renderCard(0);
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeQuiz() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    triggerBtn.addEventListener('click', openQuiz);
    closeBtn.addEventListener('click', closeQuiz);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeQuiz(); });

    document.addEventListener('keydown', e => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeQuiz();
      if (e.key === 'ArrowLeft' && current > 0) renderCard(current - 1);
      if (e.key === 'ArrowRight' && current < questions.length - 1) renderCard(current + 1);
    });

    prevBtn.addEventListener('click', () => { if (current > 0) renderCard(current - 1); });
    nextBtn.addEventListener('click', () => { if (current < questions.length - 1) renderCard(current + 1); });

    seeBtn.addEventListener('click', () => {
      answerVisible = !answerVisible;
      aBox.classList.toggle('visible', answerVisible);
      seeBtn.textContent = answerVisible ? 'Hide Answer' : 'See Answer';
      seeBtn.classList.toggle('revealed', answerVisible);
    });
  }

  // ========================
  // Share Button
  // ========================
  function initShareButton() {
    const lessonHeader = document.querySelector('.lesson-header');
    if (!lessonHeader) return;
    const lessonTag = lessonHeader.querySelector('.lesson-tag');
    if (!lessonTag) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'lesson-header-top';
    lessonTag.parentNode.insertBefore(wrapper, lessonTag);
    wrapper.appendChild(lessonTag);

    const btn = document.createElement('button');
    btn.className = 'share-btn';
    btn.setAttribute('aria-label', 'Copy page link');
    btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Share';
    wrapper.appendChild(btn);

    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Link Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Share';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // ========================
  // Course Nav Header (Sidebar top label)
  // ========================
  function renderCourseLabel(container) {
    const path = window.location.pathname;
    let course = null;
    if (path.includes('/python/')) course = { name: 'Python Course', icon: '🐍', color: '#3776AB' };
    else if (path.includes('/javascript/')) course = { name: 'JavaScript Course', icon: '⚡', color: '#3776AB' };
    else if (path.includes('/owljs/')) course = { name: 'OWL JS Course', icon: '🦉', color: '#714B67' };
    else if (path.includes('/html/')) course = { name: 'HTML Course', icon: '🌐', color: '#E44D26' };
    else if (path.includes('/csslessons/')) course = { name: 'CSS Course', icon: '🎨', color: '#1572B6' };
    else if (path.includes('/c/') && !path.includes('/cpp/')) course = { name: 'C Course', icon: '⚙️', color: '#A8B9CC' };
    else if (path.includes('/cpp/')) course = { name: 'C++ Course', icon: '🔷', color: '#00599C' };

    if (course) {
      const label = document.createElement('div');
      label.className = 'course-sidebar-label';
      label.innerHTML = `
        <a href="/" style="display:flex;align-items:center;gap:0.5rem;padding:0.75rem 1.25rem;font-size:0.8rem;color:var(--text-muted);text-decoration:none;border-bottom:1px solid var(--border-color);margin-bottom:0.5rem;">
          ← All Courses
        </a>
        <div style="padding:0.5rem 1.25rem 0.75rem;font-size:0.8rem;font-weight:700;color:${course.color};display:flex;align-items:center;gap:0.4rem;">
          ${course.icon} ${course.name}
        </div>
      `;
      container.insertBefore(label, container.firstChild);
    }
  }

  // ========================
  // Mobile Search Toggle
  // ========================
  function initMobileSearch() {
    const header = document.querySelector('.site-header');
    const searchBox = document.querySelector('.header-search');
    if (!header || !searchBox) return;

    // Create the search icon button
    const btn = document.createElement('button');
    btn.className = 'btn-icon mobile-search-btn';
    btn.setAttribute('aria-label', 'Toggle search');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '🔍';

    // Insert it before .header-actions (or at end of header)
    const actions = header.querySelector('.header-actions');
    actions ? header.insertBefore(btn, actions) : header.appendChild(btn);

    function openSearch() {
      searchBox.classList.add('search-open');
      btn.innerHTML = '✕';
      btn.setAttribute('aria-expanded', 'true');
      const input = searchBox.querySelector('input');
      if (input) { input.focus(); input.select(); }
    }

    function closeSearch() {
      searchBox.classList.remove('search-open');
      btn.innerHTML = '🔍';
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchBox.classList.contains('search-open') ? closeSearch() : openSearch();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target) && e.target !== btn) closeSearch();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    // Close when a search result is selected
    const results = document.getElementById('searchResults');
    if (results) {
      results.addEventListener('click', () => setTimeout(closeSearch, 150));
    }
  }

  // ========================
  // Init All
  // ========================
  function init() {
    initTheme();

    const navContainer = document.getElementById('sidebarNav');
    if (navContainer) {
      renderNav(navContainer);
      setActiveNavLink();
      renderCourseLabel(navContainer);
    }

    initSearch();
    initMobileNav();
    initMobileSearch();
    buildTOC();
    initCodeCopy();
    initProgressBar();
    initFAQ();
    initScrollTop();
    initHighlight();
    injectAlgoridCredit();
    initShareButton();
    initQuiz();
    initQuizPage();

    // Theme toggle button
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
