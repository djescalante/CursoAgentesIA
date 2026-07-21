/**
 * Main Application — Agentes IA Course Interactive Platform
 */
(function () {
  'use strict';

  // ════════════════════════════════════════
  // STATE
  // ════════════════════════════════════════
  const STATE = {
    currentPage: 'home',
    currentModuleId: null,
    currentLessonId: null,
    progress: {},       // { lessonId: true }
    exercises: {},      // { lessonId: true }
    theme: 'dark',
    expandedModules: new Set()
  };

  const TOTAL_LESSONS = COURSE_DATA.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  // ════════════════════════════════════════
  // PERSISTENCE
  // ════════════════════════════════════════
  function saveProgress() {
    localStorage.setItem('agentescourse_progress', JSON.stringify(STATE.progress));
    localStorage.setItem('agentescourse_exercises', JSON.stringify(STATE.exercises));
    localStorage.setItem('agentescourse_theme', STATE.theme);
  }

  function loadProgress() {
    try {
      const p = localStorage.getItem('agentescourse_progress');
      if (p) STATE.progress = JSON.parse(p);
      const e = localStorage.getItem('agentescourse_exercises');
      if (e) STATE.exercises = JSON.parse(e);
      const t = localStorage.getItem('agentescourse_theme');
      if (t) STATE.theme = t;
    } catch (_) {}
  }

  // ════════════════════════════════════════
  // PROGRESS HELPERS
  // ════════════════════════════════════════
  function getCompletedCount() {
    return Object.values(STATE.progress).filter(Boolean).length;
  }

  function getModuleProgress(moduleId) {
    const module = COURSE_DATA.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completed = module.lessons.filter(l => STATE.progress[l.id]).length;
    return Math.round((completed / module.lessons.length) * 100);
  }

  function getGlobalProgress() {
    return Math.round((getCompletedCount() / TOTAL_LESSONS) * 100);
  }

  function isModuleComplete(moduleId) {
    const module = COURSE_DATA.modules.find(m => m.id === moduleId);
    if (!module) return false;
    return module.lessons.every(l => STATE.progress[l.id]);
  }

  // ════════════════════════════════════════
  // DOM UTILITIES
  // ════════════════════════════════════════
  function $(selector) { return document.querySelector(selector); }
  function $$(selector) { return document.querySelectorAll(selector); }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function showPage(pageId) {
    $$('.page').forEach(p => p.classList.remove('active'));
    const target = $(`#page-${pageId}`);
    if (target) {
      target.classList.add('active');
      STATE.currentPage = pageId;
    }
    // Update sidebar active states
    $$('.sidebar-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === pageId);
    });
    // Close sidebar on mobile
    if (window.innerWidth < 768) closeSidebar();
  }

  function showToast(message, type = 'info') {
    const toast = $('#toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ════════════════════════════════════════
  // SIDEBAR RENDERING
  // ════════════════════════════════════════
  function renderSidebar() {
    const list = $('#moduleList');
    list.innerHTML = '';

    COURSE_DATA.modules.forEach(module => {
      const pct = getModuleProgress(module.id);
      const isExpanded = STATE.expandedModules.has(module.id);
      const isComplete = isModuleComplete(module.id);

      const li = el('li', 'module-item');

      // Module button
      const btn = el('button', `module-btn${STATE.currentModuleId === module.id ? ' active' : ''}`);
      btn.id = `sidebar-module-${module.id}`;
      btn.innerHTML = `
        <span class="module-icon">${module.icon}</span>
        <span class="module-name">M${module.number}: ${module.title}</span>
        <span class="module-progress-mini">${pct}%</span>
        ${isComplete ? '<span class="module-check">✓</span>' : ''}
      `;
      btn.addEventListener('click', () => toggleModuleExpand(module.id, btn));

      // Lessons sub-list
      const subList = el('ul', `lesson-list${isExpanded ? ' expanded' : ''}`);
      subList.id = `lessons-${module.id}`;

      module.lessons.forEach(lesson => {
        const isActive = STATE.currentLessonId === lesson.id;
        const isDone = STATE.progress[lesson.id];

        const subLi = el('li', '');
        const subBtn = el('button', `lesson-sub-btn${isActive ? ' active' : ''}${isDone ? ' completed' : ''}`);
        subBtn.id = `sidebar-lesson-${lesson.id}`;
        subBtn.innerHTML = `
          <span class="lesson-check">${isDone ? '✓' : '○'}</span>
          <span>${lesson.title}</span>
        `;
        subBtn.addEventListener('click', () => navigateToLesson(module.id, lesson.id));
        subLi.appendChild(subBtn);
        subList.appendChild(subLi);
      });

      li.appendChild(btn);
      li.appendChild(subList);
      list.appendChild(li);
    });
  }

  function toggleModuleExpand(moduleId, btn) {
    if (STATE.expandedModules.has(moduleId)) {
      STATE.expandedModules.delete(moduleId);
    } else {
      STATE.expandedModules.add(moduleId);
    }
    const subList = $(`#lessons-${moduleId}`);
    if (subList) subList.classList.toggle('expanded');
  }

  // ════════════════════════════════════════
  // PROGRESS BAR UPDATES
  // ════════════════════════════════════════
  function updateProgressUI() {
    const pct = getGlobalProgress();
    const count = getCompletedCount();

    // Global progress bar
    const fill = $('#globalProgressFill');
    const pctText = $('#globalProgressPct');
    if (fill) fill.style.width = `${pct}%`;
    if (pctText) pctText.textContent = `${pct}%`;

    // Badge
    const badge = $('#progressText');
    if (badge) badge.textContent = `${count}/${TOTAL_LESSONS}`;

    // Module cards on home
    COURSE_DATA.modules.forEach(module => {
      const modulePct = getModuleProgress(module.id);
      const fill = $(`#mc-fill-${module.id}`);
      const pctEl = $(`#mc-pct-${module.id}`);
      if (fill) fill.style.width = `${modulePct}%`;
      if (pctEl) pctEl.textContent = `${modulePct}%`;
    });

    // Module nav button progress
    COURSE_DATA.modules.forEach(module => {
      const navBtn = $(`#sidebar-module-${module.id}`);
      if (navBtn) {
        const mp = getModuleProgress(module.id);
        const miniEl = navBtn.querySelector('.module-progress-mini');
        if (miniEl) miniEl.textContent = `${mp}%`;
        const checkEl = navBtn.querySelector('.module-check');
        if (isModuleComplete(module.id) && !checkEl) {
          const span = el('span', 'module-check', '✓');
          navBtn.appendChild(span);
        }
      }
    });
  }

  // ════════════════════════════════════════
  // HOME PAGE
  // ════════════════════════════════════════
  function renderHome() {
    const grid = $('#modulesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    COURSE_DATA.modules.forEach(module => {
      const pct = getModuleProgress(module.id);
      const card = el('div', 'module-card');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Módulo ${module.number}: ${module.title}`);

      const lessonTags = module.lessons.slice(0, 4).map(l =>
        `<span class="mc-lesson-tag">${l.title.split(' ').slice(0, 4).join(' ')}...</span>`
      ).join('');

      card.innerHTML = `
        <div class="mc-top">
          <span class="mc-icon">${module.icon}</span>
          <span class="mc-badge ${module.difficulty}">${
            module.difficulty === 'beginner' ? 'Principiante' :
            module.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'
          }</span>
        </div>
        <div class="mc-num">Módulo ${module.number}</div>
        <div class="mc-title">${module.title}</div>
        <div class="mc-desc">${module.description}</div>
        <div class="mc-lessons">${lessonTags}</div>
        <div class="mc-progress-row">
          <div class="mc-progress-bar">
            <div class="mc-progress-fill" id="mc-fill-${module.id}" style="width:${pct}%"></div>
          </div>
          <span class="mc-progress-pct" id="mc-pct-${module.id}">${pct}%</span>
        </div>
      `;

      card.addEventListener('click', () => {
        navigateToModule(module.id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') navigateToModule(module.id);
      });

      grid.appendChild(card);
    });
  }

  // ════════════════════════════════════════
  // NAVIGATION
  // ════════════════════════════════════════
  function navigateToModule(moduleId) {
    const module = COURSE_DATA.modules.find(m => m.id === moduleId);
    if (!module) return;

    // Navigate to first lesson
    navigateToLesson(moduleId, module.lessons[0].id);
  }

  function navigateToLesson(moduleId, lessonId) {
    const module = COURSE_DATA.modules.find(m => m.id === moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    if (!module || !lesson) return;

    STATE.currentModuleId = moduleId;
    STATE.currentLessonId = lessonId;

    // Expand module in sidebar
    STATE.expandedModules.add(moduleId);

    // Render lesson
    renderLesson(module, lesson);
    showPage('lesson');

    // Update breadcrumb
    const breadcrumb = $('#breadcrumb');
    if (breadcrumb) breadcrumb.innerHTML = `
      <span style="cursor:pointer;color:var(--brand-from)" onclick="App.goHome()">Inicio</span>
      <span>${module.title}</span>
      <span>${lesson.title}</span>
    `;

    // Update sidebar
    renderSidebar();
    updateProgressUI();

    // Scroll to top
    $('.content-area').scrollTo({ top: 0, behavior: 'smooth' });

    // Update hash for shareable links
    window.location.hash = `#${lessonId}`;
  }

  function renderLesson(module, lesson) {
    // Meta
    const meta = $('#lessonMeta');
    if (meta) meta.textContent = `${module.icon} Módulo ${module.number} · ${module.title}`;

    // Title
    const title = $('#lessonTitle');
    if (title) title.textContent = lesson.title;

    // Info bar
    const diff = $('#lessonDifficulty');
    const time = $('#lessonTime');
    if (diff) diff.innerHTML = `⭐ ${lesson.difficulty}`;
    if (time) time.innerHTML = `⏱ ${lesson.time}`;

    // Content
    const contentEl = $('#lessonContent');
    if (contentEl) {
      contentEl.innerHTML = MarkdownParser.parse(lesson.content);
      // Add interactive checklist behavior
      addChecklistBehavior(contentEl);
    }

    // TOC
    renderTOC(contentEl);

    // Exercise
    const exerciseBox = $('#lessonExerciseBox');
    const exerciseEl = $('#lessonExercise');
    if (lesson.exercise) {
      exerciseBox.style.display = 'block';
      const isDone = STATE.exercises[lesson.id];
      exerciseEl.innerHTML = `
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">${lesson.exercise.prompt.slice(0, 120)}...</p>
        <button class="btn-primary" style="width:100%;justify-content:center" id="openExerciseBtn">
          ${isDone ? '✓ Ejercicio Completado' : '🎯 Comenzar Ejercicio'}
        </button>
      `;
      if (isDone) {
        $('#openExerciseBtn').style.background = 'var(--success)';
      }
      $('#openExerciseBtn').addEventListener('click', () => openExercise(lesson));
    } else {
      exerciseBox.style.display = 'none';
    }

    // Lesson resources
    renderLessonResources(module);

    // Navigation buttons
    setupLessonNav(module, lesson);

    // Mark as complete button
    const markBtn = $('#markComplete');
    if (markBtn) {
      const isDone = STATE.progress[lesson.id];
      markBtn.textContent = isDone ? '✓ Completada' : '✓ Marcar como Completada';
      markBtn.style.background = isDone
        ? 'linear-gradient(135deg, var(--success), #3cb88f)'
        : '';
    }
  }

  function renderTOC(contentEl) {
    const toc = $('#lessonTOC');
    if (!toc || !contentEl) return;

    const headers = contentEl.querySelectorAll('h2, h3');
    toc.innerHTML = '';

    if (headers.length === 0) {
      toc.innerHTML = '<span style="font-size:12px;color:var(--text-muted)">No hay secciones en esta lección</span>';
      return;
    }

    headers.forEach((h, idx) => {
      const id = `toc-${idx}`;
      h.id = id;

      const item = el('div', `toc-item${h.tagName === 'H3' ? ' toc-h3' : ''}`);
      item.textContent = h.textContent.replace(/^#+\s/, '');
      item.setAttribute('role', 'link');
      item.setAttribute('tabindex', '0');
      item.addEventListener('click', () => {
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      toc.appendChild(item);
    });

    // Active TOC highlight on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeIdx = Array.from(headers).indexOf(entry.target);
          toc.querySelectorAll('.toc-item').forEach((item, idx) => {
            item.classList.toggle('active', idx === activeIdx);
          });
        }
      });
    }, { threshold: 0.5 });

    headers.forEach(h => observer.observe(h));
  }

  function renderLessonResources(module) {
    const resourcesEl = $('#lessonResources');
    if (!resourcesEl) return;
    resourcesEl.innerHTML = '';

    const quickResources = [
      { icon: '📋', label: 'Template de Agente', action: () => navigateToSection('templates') },
      { icon: '⚡', label: 'Cheatsheet', action: () => navigateToSection('recursos') },
      { icon: '💡', label: 'Ver Ejemplos', action: () => navigateToSection('ejemplos') }
    ];

    quickResources.forEach(r => {
      const link = el('div', 'lesson-resource-link');
      link.innerHTML = `<span>${r.icon}</span><span>${r.label}</span>`;
      link.setAttribute('role', 'link');
      link.setAttribute('tabindex', '0');
      link.addEventListener('click', r.action);
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          r.action();
        }
      });
      resourcesEl.appendChild(link);
    });
  }

  function setupLessonNav(module, lesson) {
    const lessons = module.lessons;
    const currentIdx = lessons.findIndex(l => l.id === lesson.id);

    const prevBtn = $('#prevLesson');
    const nextBtn = $('#nextLesson');
    const markBtn = $('#markComplete');

    // Previous button
    if (prevBtn) {
      if (currentIdx === 0) {
        prevBtn.disabled = true;
        prevBtn.title = 'Primera lección del módulo';
      } else {
        prevBtn.disabled = false;
        prevBtn.onclick = () => navigateToLesson(module.id, lessons[currentIdx - 1].id);
      }
    }

    // Next button
    if (nextBtn) {
      const nextLesson = lessons[currentIdx + 1];
      if (nextLesson) {
        nextBtn.disabled = false;
        nextBtn.onclick = () => navigateToLesson(module.id, nextLesson.id);
      } else {
        // Check if there's a next module
        const moduleIdx = COURSE_DATA.modules.findIndex(m => m.id === module.id);
        const nextModule = COURSE_DATA.modules[moduleIdx + 1];
        if (nextModule) {
          nextBtn.disabled = false;
          nextBtn.textContent = `${nextModule.icon} Siguiente Módulo →`;
          nextBtn.onclick = () => navigateToLesson(nextModule.id, nextModule.lessons[0].id);
        } else {
          nextBtn.disabled = true;
          nextBtn.textContent = '🏆 Curso Completado';
        }
      }
    }

    // Mark complete
    if (markBtn) {
      markBtn.onclick = () => {
        if (STATE.progress[lesson.id]) {
          // Unmark
          delete STATE.progress[lesson.id];
          markBtn.textContent = '✓ Marcar como Completada';
          markBtn.style.background = '';
          showToast('Lección desmarcada', 'info');
        } else {
          // Mark
          STATE.progress[lesson.id] = true;
          markBtn.textContent = '✓ Completada';
          markBtn.style.background = 'linear-gradient(135deg, var(--success), #3cb88f)';
          showToast('¡Lección completada! 🎉', 'success');
          checkAchievements();
        }
        saveProgress();
        updateProgressUI();
        renderSidebar();

        // Update lesson sub-btn
        const subBtn = $(`#sidebar-lesson-${lesson.id}`);
        if (subBtn) {
          const isDone = STATE.progress[lesson.id];
          subBtn.classList.toggle('completed', isDone);
          const checkEl = subBtn.querySelector('.lesson-check');
          if (checkEl) checkEl.textContent = isDone ? '✓' : '○';
        }
      };
    }
  }

  function addChecklistBehavior(container) {
    const items = container.querySelectorAll('.checklist-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
        const box = item.querySelector('.ci-box');
        const isChecked = item.classList.contains('checked');
        if (box) box.textContent = isChecked ? '✓' : '';
        item.setAttribute('aria-checked', isChecked.toString());
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  }

  // ════════════════════════════════════════
  // EXERCISES
  // ════════════════════════════════════════
  function openExercise(lesson) {
    const modal = $('#exerciseModal');
    const title = $('#exerciseModalTitle');
    const body = $('#exerciseModalBody');

    if (title) title.textContent = lesson.exercise.title;
    if (body) {
      body.innerHTML = `
        <div class="lesson-content exercise-prompt-md">${MarkdownParser.parse(lesson.exercise.prompt)}</div>
        <textarea
          class="exercise-textarea"
          id="exerciseInput"
          placeholder="Escribe tu respuesta aquí..."
          spellcheck="true"
        >${STATE.exercises[lesson.id + '_answer'] || ''}</textarea>
      `;
    }

    modal.classList.add('active');

    // Submit
    const submitBtn = $('#submitExercise');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const answer = $('#exerciseInput').value.trim();
        if (answer.length < 10) {
          showToast('Por favor escribe una respuesta más completa', 'error');
          return;
        }
        STATE.exercises[lesson.id] = true;
        STATE.exercises[lesson.id + '_answer'] = answer;
        saveProgress();

        // Update button
        const openBtn = $('#openExerciseBtn');
        if (openBtn) {
          openBtn.textContent = '✓ Ejercicio Completado';
          openBtn.style.background = 'var(--success)';
        }

        closeExerciseModal();
        showToast('¡Ejercicio completado! 🏆', 'success');
        checkAchievements();
      };
    }
  }

  function closeExerciseModal() {
    $('#exerciseModal').classList.remove('active');
  }

  // ════════════════════════════════════════
  // RESOURCES PAGE
  // ════════════════════════════════════════
  function renderRecursos() {
    const container = $('#recursosContent');
    if (!container) return;

    const grid = el('div', 'resource-grid');

    COURSE_DATA.resources.forEach(resource => {
      const card = el('div', 'resource-card');
      card.innerHTML = `
        <div class="rc-icon">${resource.icon}</div>
        <div class="rc-title">${resource.title}</div>
        <div class="rc-desc">${resource.description}</div>
        <span class="rc-tag">${resource.tag}</span>
      `;
      card.addEventListener('click', () => openResourceModal(resource));
      grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
  }

  // ════════════════════════════════════════
  // TEMPLATES PAGE
  // ════════════════════════════════════════
  function renderTemplates() {
    const container = $('#templatesContent');
    if (!container) return;

    const grid = el('div', 'template-grid');

    COURSE_DATA.templates.forEach(tmpl => {
      const card = el('div', 'template-card');
      card.innerHTML = `
        <div class="rc-icon">${tmpl.icon}</div>
        <div class="rc-title">${tmpl.title}</div>
        <div class="rc-desc">${tmpl.description}</div>
        <span class="rc-tag">${tmpl.tag}</span>
      `;
      card.addEventListener('click', () => openResourceModal(tmpl));
      grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
  }

  // ════════════════════════════════════════
  // EXAMPLES PAGE
  // ════════════════════════════════════════
  function renderEjemplos() {
    const container = $('#ejemplosContent');
    if (!container) return;

    const grid = el('div', 'template-grid');

    COURSE_DATA.examples.forEach(ex => {
      const card = el('div', 'resource-card');
      card.innerHTML = `
        <div class="rc-icon">${ex.icon}</div>
        <div class="rc-title">${ex.title}</div>
        <div class="rc-desc">${ex.description}</div>
        <span class="rc-tag">${ex.tag}</span>
      `;
      card.addEventListener('click', () => openResourceModal(ex));
      grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
  }

  // ════════════════════════════════════════
  // RESOURCE/TEMPLATE MODAL (reuse exercise modal)
  // ════════════════════════════════════════
  function openResourceModal(resource) {
    const modal = $('#exerciseModal');
    const title = $('#exerciseModalTitle');
    const body = $('#exerciseModalBody');
    const footer = modal.querySelector('.modal-footer');

    if (title) title.textContent = `${resource.icon} ${resource.title}`;
    if (body) {
      body.innerHTML = `<div class="lesson-content">${MarkdownParser.parse(resource.content)}</div>`;
    }
    if (footer) footer.style.display = 'none';

    modal.classList.add('active');

    const submitBtn = $('#submitExercise');
    if (submitBtn) submitBtn.onclick = closeExerciseModal;
  }

  // ════════════════════════════════════════
  // PROGRESS PAGE
  // ════════════════════════════════════════
  function renderProgreso() {
    const container = $('#progresoContent');
    if (!container) return;

    const totalCompleted = getCompletedCount();
    const globalPct = getGlobalProgress();
    const exercisesCompleted = Object.keys(STATE.exercises).filter(k => !k.includes('_answer')).length;

    container.innerHTML = '';

    // Overview cards
    const overview = el('div', 'progress-overview');
    const overviewData = [
      { value: `${globalPct}%`, label: 'Progreso Total' },
      { value: `${totalCompleted}/${TOTAL_LESSONS}`, label: 'Lecciones' },
      { value: exercisesCompleted, label: 'Ejercicios' },
      { value: COURSE_DATA.modules.filter(m => isModuleComplete(m.id)).length, label: 'Módulos ✓' }
    ];

    overviewData.forEach(item => {
      const card = el('div', 'po-card');
      card.innerHTML = `<span class="po-value">${item.value}</span><span class="po-label">${item.label}</span>`;
      overview.appendChild(card);
    });
    container.appendChild(overview);

    // Modules progress
    const moduleTitle = el('h2', 'section-title', '📊 Progreso por Módulo');
    moduleTitle.style.marginBottom = '16px';
    container.appendChild(moduleTitle);

    const modulesList = el('div', 'progress-modules');
    COURSE_DATA.modules.forEach(module => {
      const pct = getModuleProgress(module.id);
      const item = el('div', 'pm-item');
      item.addEventListener('click', () => navigateToModule(module.id));
      item.innerHTML = `
        <span class="pm-icon">${module.icon}</span>
        <div class="pm-info">
          <div class="pm-name">Módulo ${module.number}: ${module.title}</div>
          <div class="pm-bar">
            <div class="pm-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <span class="pm-pct">${pct}%</span>
      `;
      modulesList.appendChild(item);
    });
    container.appendChild(modulesList);

    // Achievements
    const achTitle = el('h2', 'section-title', '🏆 Logros');
    achTitle.style.margin = '40px 0 16px';
    container.appendChild(achTitle);

    const achGrid = el('div', 'achievements-grid');
    COURSE_DATA.achievements.forEach(ach => {
      const earned = checkAchievementEarned(ach);
      const card = el('div', `achievement-card${earned ? ' earned' : ''}`);
      card.innerHTML = `
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-name">${ach.name}</div>
        <div class="ach-desc">${ach.description}</div>
      `;
      achGrid.appendChild(card);
    });
    container.appendChild(achGrid);

    // Reset button
    const resetSection = el('div', '', '');
    resetSection.style.cssText = 'margin-top:48px;text-align:center;';
    resetSection.innerHTML = `
      <button class="btn-ghost" id="resetProgressBtn" style="color:var(--error);border-color:var(--error)">
        ⚠️ Reiniciar Progreso
      </button>
    `;
    container.appendChild(resetSection);

    $('#resetProgressBtn').addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
        STATE.progress = {};
        STATE.exercises = {};
        saveProgress();
        updateProgressUI();
        renderProgreso();
        showToast('Progreso reiniciado', 'info');
      }
    });
  }

  function checkAchievementEarned(achievement) {
    const count = getCompletedCount();
    const exercisesCount = Object.keys(STATE.exercises).filter(k => !k.includes('_answer')).length;

    if (achievement.threshold !== undefined) {
      if (achievement.threshold <= TOTAL_LESSONS) {
        return count >= achievement.threshold;
      }
      return false;
    }
    if (achievement.module) {
      return isModuleComplete(achievement.module);
    }
    if (achievement.id === 'all-exercises') {
      return exercisesCount >= 5;
    }
    return false;
  }

  function checkAchievements() {
    COURSE_DATA.achievements.forEach(ach => {
      const earnedKey = `achievement_${ach.id}`;
      if (!localStorage.getItem(earnedKey) && checkAchievementEarned(ach)) {
        localStorage.setItem(earnedKey, '1');
        setTimeout(() => {
          showToast(`🏆 Logro desbloqueado: ${ach.name}!`, 'success');
        }, 500);
      }
    });
  }

  // ════════════════════════════════════════
  // NAVIGATION SECTION
  // ════════════════════════════════════════
  function navigateToSection(sectionId) {
    showPage(sectionId);

    // Render section content
    switch (sectionId) {
      case 'recursos': renderRecursos(); break;
      case 'templates': renderTemplates(); break;
      case 'ejemplos': renderEjemplos(); break;
      case 'progreso': renderProgreso(); break;
    }

    // Update breadcrumb
    const sectionNames = {
      recursos: 'Recursos', templates: 'Templates',
      ejemplos: 'Ejemplos', progreso: 'Mi Progreso'
    };
    const breadcrumb = $('#breadcrumb');
    if (breadcrumb) breadcrumb.innerHTML = `
      <span style="cursor:pointer;color:var(--brand-from)" onclick="App.goHome()">Inicio</span>
      <span>${sectionNames[sectionId] || sectionId}</span>
    `;
  }

  // ════════════════════════════════════════
  // THEME
  // ════════════════════════════════════════
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', STATE.theme === 'light' ? 'light' : '');
    const btn = $('#themeToggle');
    if (btn) btn.textContent = STATE.theme === 'light' ? '🌙' : '☀️';
  }

  function toggleTheme() {
    STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveProgress();
  }

  // ════════════════════════════════════════
  // SIDEBAR MOBILE
  // ════════════════════════════════════════
  function openSidebar() {
    $('#sidebar').classList.add('open');
    let overlay = $('#sidebarOverlay');
    if (!overlay) {
      overlay = el('div', 'sidebar-overlay');
      overlay.id = 'sidebarOverlay';
      document.body.appendChild(overlay);
    }
    overlay.classList.add('active');
    overlay.addEventListener('click', closeSidebar, { once: true });
  }

  function closeSidebar() {
    $('#sidebar').classList.remove('open');
    const overlay = $('#sidebarOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ════════════════════════════════════════
  // HASH ROUTING
  // ════════════════════════════════════════
  function handleHash() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    // Secciones estáticas (#recursos, #templates, #ejemplos, #progreso)
    const SECTIONS = ['recursos', 'templates', 'ejemplos', 'progreso'];
    if (SECTIONS.includes(hash)) {
      navigateToSection(hash);
      return;
    }

    // Check if it's a lesson ID
    for (const module of COURSE_DATA.modules) {
      const lesson = module.lessons.find(l => l.id === hash);
      if (lesson) {
        navigateToLesson(module.id, lesson.id);
        return;
      }
    }
  }

  // ════════════════════════════════════════
  // SEARCH (basic)
  // ════════════════════════════════════════
  function findFirstIncompleteLesson() {
    for (const module of COURSE_DATA.modules) {
      for (const lesson of module.lessons) {
        if (!STATE.progress[lesson.id]) {
          return { module, lesson };
        }
      }
    }
    return null;
  }

  // ════════════════════════════════════════
  // INIT
  // ════════════════════════════════════════
  function init() {
    // Load persisted data
    loadProgress();

    // Apply theme
    applyTheme();

    // Render sidebar
    renderSidebar();

    // Render home
    renderHome();

    // Update progress
    updateProgressUI();

    // Sidebar nav footer links
    $$('.sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        navigateToSection(section);
      });
    });

    // Start course button
    const startBtn = $('#startCourseBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const next = findFirstIncompleteLesson();
        if (next) {
          navigateToLesson(next.module.id, next.lesson.id);
        } else {
          navigateToLesson(COURSE_DATA.modules[0].id, COURSE_DATA.modules[0].lessons[0].id);
        }
      });
    }

    // View progress button
    const progressBtn = $('#viewProgressBtn');
    if (progressBtn) {
      progressBtn.addEventListener('click', () => navigateToSection('progreso'));
    }

    // Progress badge → progress page
    const badge = $('#progressBadge');
    if (badge) {
      badge.style.cursor = 'pointer';
      badge.addEventListener('click', () => navigateToSection('progreso'));
    }

    // Theme toggle
    const themeBtn = $('#themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Hamburger / sidebar toggle
    const hamburger = $('#sidebarOpen');
    if (hamburger) hamburger.addEventListener('click', openSidebar);

    const sidebarClose = $('#sidebarClose');
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);

    // Exercise modal close
    const closeModal = $('#closeExerciseModal');
    if (closeModal) closeModal.addEventListener('click', () => {
      closeExerciseModal();
      // Restore footer display
      const footer = $('#exerciseModal').querySelector('.modal-footer');
      if (footer) footer.style.display = '';
    });

    const cancelExercise = $('#cancelExercise');
    if (cancelExercise) cancelExercise.addEventListener('click', closeExerciseModal);

    // Close modal on overlay click
    const modalOverlay = $('#exerciseModal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          closeExerciseModal();
          const footer = modalOverlay.querySelector('.modal-footer');
          if (footer) footer.style.display = '';
        }
      });
    }

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeExerciseModal();
        const footer = $('#exerciseModal').querySelector('.modal-footer');
        if (footer) footer.style.display = '';
        closeSidebar();
      }
    });

    // Handle hash routing
    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Check achievements on load
    checkAchievements();
  }

  // ════════════════════════════════════════
  // PUBLIC API
  // ════════════════════════════════════════
  window.App = {
    goHome: () => {
      STATE.currentModuleId = null;
      STATE.currentLessonId = null;
      showPage('home');
      window.location.hash = '';
      const breadcrumb = $('#breadcrumb');
      if (breadcrumb) breadcrumb.innerHTML = '<span>Inicio</span>';
      // Reset sidebar active states
      $$('.module-btn').forEach(b => b.classList.remove('active'));
      $$('.lesson-sub-btn').forEach(b => b.classList.remove('active'));
    },
    navigateToLesson,
    navigateToSection,
    getProgress: () => ({ completed: getCompletedCount(), total: TOTAL_LESSONS, pct: getGlobalProgress() })
  };

  // Start app
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
