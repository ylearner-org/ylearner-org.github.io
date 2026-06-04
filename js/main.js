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
      'getting-started','core','lifecycle','templates','odoo'];
    const isDepth2 = depth2Folders.some(f => path.includes('/' + f + '/'));
    const isDepth1 = !isDepth2 && ['/python/','/javascript/','/c/','/cpp/','/java/','/sql/','/owljs/'].some(s => path.includes(s));
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

  function getNavData() {
    const path = window.location.pathname;
    if (path.includes('/javascript/')) return JS_NAV_DATA;
    if (path.includes('/owljs/')) return OWL_NAV_DATA;
    return NAV_DATA;
  }

  // Search index (with BASE-prefixed URLs for file:// searches)
  const SEARCH_INDEX = [...NAV_DATA, ...JS_NAV_DATA, ...OWL_NAV_DATA].flatMap(section =>
    section.items.map(item => ({
      title: item.title,
      category: section.title.replace(/^.{2}\s/, ''),
      url: BASE + item.url,
    }))
  );

  // ========================
  // Render Navigation
  // ========================
  function renderNav(container) {
    if (!container) return;
    const currentPath = window.location.pathname;

    const html = getNavData().map((section, i) => {
      const links = section.items.map(item => {
        const slug = item.url.replace('.html', '').split('/').pop();
        const active = currentPath.includes(slug) && slug.length > 2;
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
  // Course Nav Header (Sidebar top label)
  // ========================
  function renderCourseLabel(container) {
    const path = window.location.pathname;
    let course = null;
    if (path.includes('/python/')) course = { name: 'Python Course', icon: '🐍', color: '#3776AB' };
    else if (path.includes('/javascript/')) course = { name: 'JavaScript Course', icon: '⚡', color: '#3776AB' };
    else if (path.includes('/owljs/')) course = { name: 'OWL JS Course', icon: '🦉', color: '#714B67' };
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
