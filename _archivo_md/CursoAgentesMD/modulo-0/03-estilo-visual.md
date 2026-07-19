# 0.3 - Guía de Estilo Visual para el Web Viewer

## 🎨 Componentes Visuales Premium

El visualizador interactivo del curso (v3) soporta la inserción de HTML enriquecido dentro de los archivos Markdown. Esto permite mostrar tarjetas, comparaciones y diagramas con una estética moderna y profesional.

A continuación, se detallan los componentes CSS listos para usar en tus lecciones:

---

## 1. Grid de Comparación (`comparison-grid`)
Se utiliza para comparar dos conceptos de manera visual (por ejemplo, *Agente vs Skill*).

**Código HTML a embeber:**
```html
<div class="chart-wrapper">
  <div class="comparison-grid">
    
    <!-- Columna 1 -->
    <div class="comparison-card">
      <div class="comp-icon">🤖</div>
      <h5>Agente</h5>
      <ul class="comp-list">
        <li><strong>Alcance:</strong> Completo</li>
        <li><strong>Autonomía:</strong> Toma decisiones</li>
      </ul>
    </div>
    
    <!-- Columna 2 -->
    <div class="comparison-card">
      <div class="comp-icon">🛠️</div>
      <h5>Skill</h5>
      <ul class="comp-list">
        <li><strong>Alcance:</strong> Específico</li>
        <li><strong>Autonomía:</strong> Pasivo</li>
      </ul>
    </div>
    
  </div>
</div>
```

---

## 2. Grid de Logros o Conceptos (`achievements-grid`)
Ideal para listar características clave o requisitos mínimos.

**Código HTML a embeber:**
```html
<div class="chart-wrapper">
  <div class="achievements-grid">
    
    <div class="achievement-card earned">
      <div class="ach-icon">👤</div>
      <div class="ach-name">1. Identity</div>
      <div class="ach-desc">Quién es el agente.</div>
    </div>
    
    <div class="achievement-card earned">
      <div class="ach-icon">🎭</div>
      <div class="ach-name">2. Personality</div>
      <div class="ach-desc">Cómo se comporta.</div>
    </div>
    
  </div>
</div>
```

---

## 3. Contenedores de Diagramas Visuales (`visual-diagram-container`)
Si deseas incrustar diagramas SVGs vectoriales nativos para estructurar arquitecturas.

**Código HTML a embeber:**
```html
<div class="visual-diagram-container">
  <div class="diagram-title">🤖 Estructura de Red</div>
  <svg viewBox="0 0 400 150" width="100%" height="auto" style="background: rgba(0,0,0,0.15); border-radius: 8px; padding: 20px;">
    <!-- Rectángulos y textos SVG -->
    <rect x="20" y="50" width="150" height="50" rx="8" fill="rgba(108, 99, 255, 0.1)" stroke="#6C63FF" stroke-width="2"/>
    <text x="95" y="80" fill="#ffffff" font-size="12" text-anchor="middle">Orquestador</text>
  </svg>
</div>
```

---

## ⚠️ Regla de Oro para el Compilador
Cuando uses estos fragmentos de HTML dentro de tus lecciones Markdown, ten cuidado de **no utilizar backticks (`) sin escapar** en las descripciones si las estás editando directamente en JavaScript. Al usar nuestro compilador automatizado, el script se encargará de realizar el escape automáticamente.

---
**Dificultad**: ⭐⭐ Intermedio
**Tiempo estimado**: 15 minutos
