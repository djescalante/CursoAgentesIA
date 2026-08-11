/**
 * Lightweight Markdown Parser
 * Converts Markdown to HTML for the course content
 */
const MarkdownParser = {
  parse(md) {
    if (!md) return '';
    let html = md;

    const codeBlocks  = [];
    const inlineCode  = [];
    const htmlBlocks  = [];

    // 1. Extract fenced code blocks first (line-by-line, handles nested fences)
    html = this._extractCodeBlocks(html, codeBlocks);

    // 2. Extract raw HTML blocks BEFORE global escaping so <div>, <svg>, etc.
    //    in lesson content are preserved and rendered correctly.
    html = this._extractHtmlBlocks(html, htmlBlocks);

    // 3. Extract inline code
    //    - no cruza saltos de línea (un backtick desparejado no debe tragar
    //      medio documento)
    //    - no captura matches que contengan placeholders %%CODE_BLOCK/…%%
    //      (evita que se pierdan en la restauración)
    html = html.replace(/`([^`\n]+)`/g, (m, code) => {
      if (code.includes('%%')) return m;
      const idx = inlineCode.length;
      inlineCode.push(code);
      return `%%INLINE_CODE_${idx}%%`;
    });

    // 4. Escape HTML in the remaining plain text
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 5. Headers
    html = html.replace(/^#{6} (.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#{5} (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^#{4} (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm,    '<h1>$1</h1>');

    // 6. Blockquotes (líneas consecutivas se fusionan en uno solo)
    html = html.replace(/((?:^&gt; ?.*(?:\n|$))+)/gm, (block) => {
      const quote = block.trim().split('\n').map(l => l.replace(/^&gt; ?/, '')).join('<br>');
      return `<blockquote>${quote}</blockquote>`;
    });

    // 7. Horizontal rules (---, ***, ___)
    html = html.replace(/^(?:-{3,}|\*{3,}|_{3,})$/gm, '<hr>');

    // 8. Bold and italic
    // ── Safety: temporarily replace underscores IN placeholders so the italic
    //    regex (_ ... _) cannot corrupt them. Placeholders look like
    //    %%CODE_BLOCK_0%% or %%HTML_BLOCK_1%% — they contain "_BLOCK_" which
    //    the italic regex would otherwise turn into "<em>BLOCK</em>".
    html = html.replace(/%%([^%]+)%%/g, (m) => m.replace(/_/g, '\x00USCORE\x00'));

    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g,     '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g,          '<em>$1</em>');
    // Sin lookbehind (compatible con Safari <16.4): captura el carácter previo
    html = html.replace(/(^|[^\w%])__(.+?)__(?![\w%])/gm, '$1<strong>$2</strong>');
    html = html.replace(/(^|[^\w%])_([^_]+?)_(?![\w%])/gm,  '$1<em>$2</em>');

    // Restore the underscores inside placeholders
    html = html.replace(/\x00USCORE\x00/g, '_');


    // 9. Tables
    html = this._parseTables(html);

    // 10. Details/Summary (escaped because they went through step 4)
    html = html.replace(/&lt;details(.*?)&gt;/g,                     '<details$1>');
    html = html.replace(/&lt;\/details&gt;/g,                        '</details>');
    html = html.replace(/&lt;summary&gt;([\s\S]+?)&lt;\/summary&gt;/g, '<summary>$1</summary>');

    // 11. Checkboxes ([x] y [X])
    html = html.replace(/^- \[ \] (.+)$/gm,
      '<div class="checklist-item" role="checkbox" aria-checked="false" tabindex="0"><div class="ci-box"></div><span class="ci-text">$1</span></div>');
    html = html.replace(/^- \[[xX]\] (.+)$/gm,
      '<div class="checklist-item checked" role="checkbox" aria-checked="true" tabindex="0"><div class="ci-box">✓</div><span class="ci-text">$1</span></div>');

    // 12. Lists
    html = this._parseLists(html);

    // 13. Images (antes que los links para que ![alt] no se parsee como enlace)
    html = html.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, url) => {
      const safe = url.replace(/"/g, '&quot;');
      return `<img src="${safe}" alt="${alt}" loading="lazy">`;
    });

    // 13b. Links — anclas internas (#…) sin target=_blank; URLs con comillas escapadas
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, url) => {
      if (/^\s*javascript:/i.test(url)) return text;
      const safe = url.replace(/"/g, '&quot;');
      return safe.startsWith('#')
        ? `<a href="${safe}">${text}</a>`
        : `<a href="${safe}" target="_blank" rel="noopener">${text}</a>`;
    });

    // 14. Paragraphs
    html = this._parseParagraphs(html);

    // 15. Restore code blocks
    html = html.replace(/%%CODE_BLOCK_(\d+)%%/g, (_, idx) => {
      const entry = codeBlocks[parseInt(idx, 10)];
      if (!entry) return '';
      const { lang, code } = entry;
      const highlighted = this._highlight(code, lang);
      return `<pre class="language-${lang || 'text'}"><button class="copy-btn" onclick="MarkdownParser.copyCode(this)">Copiar</button><code class="language-${lang || 'text'}">${highlighted}</code></pre>`;
    });

    // 16. Restore inline code
    html = html.replace(/%%INLINE_CODE_(\d+)%%/g, (_, idx) => {
      const entry = inlineCode[parseInt(idx, 10)];
      if (!entry) return '';
      return `<code>${this._escapeHtml(entry)}</code>`;
    });

    // 17. Restore raw HTML blocks (last step — they must not be re-escaped)
    html = html.replace(/%%HTML_BLOCK_(\d+)%%/g, (_, idx) => {
      return htmlBlocks[parseInt(idx, 10)] || '';
    });

    return html;
  },

  /**
   * Extracts raw HTML blocks that start with a block-level tag at the
   * beginning of a line. Each block is replaced by a %%HTML_BLOCK_N%%
   * placeholder so it survives the global HTML-escape step.
   *
   * Supported opening tags: <div, <svg, <section, <aside, <figure, <table
   * A block ends when the tag stack depth returns to 0 (balanced tags).
   */
  _extractHtmlBlocks(text, htmlBlocks) {
    // Tags we treat as "raw HTML block" openers
    const BLOCK_TAGS = ['div', 'svg', 'section', 'aside', 'figure'];
    const openRe = new RegExp(
      '^\\s*<(' + BLOCK_TAGS.join('|') + ')[\\s>]',
      'i'
    );

    const lines  = text.split('\n');
    const out    = [];
    let   buffer = [];
    let   depth  = 0;
    let   tag    = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (depth === 0) {
        const m = line.match(openRe);
        if (m) {
          // Start of an HTML block — initialise state and fall through to count tags
          tag    = m[1].toLowerCase();
          depth  = 0;
          buffer = [];
          // Bloque autocerrado de una línea: <div ... />
          if (new RegExp('<' + tag + '[^>]*/>').test(line)) {
            const idx = htmlBlocks.length;
            htmlBlocks.push(line);
            out.push(`%%HTML_BLOCK_${idx}%%`);
            tag = '';
            continue;
          }
        } else {
          out.push(line);
          continue;
        }
      }

      // Count opening and closing tags for the root tag to handle nesting
      const openCount  = (line.match(new RegExp('<' + tag + '[\\s>/]', 'gi')) || []).length;
      const closeCount = (line.match(new RegExp('</' + tag + '>', 'gi'))       || []).length;
      depth += openCount - closeCount;
      buffer.push(line);

      if (depth <= 0) {
        // Block is complete
        const idx = htmlBlocks.length;
        htmlBlocks.push(buffer.join('\n'));
        out.push(`%%HTML_BLOCK_${idx}%%`);
        buffer = [];
        depth  = 0;
        tag    = '';
      }
    }

    // Flush unclosed block
    if (buffer.length > 0) {
      const idx = htmlBlocks.length;
      htmlBlocks.push(buffer.join('\n'));
      out.push(`%%HTML_BLOCK_${idx}%%`);
    }

    return out.join('\n');
  },

  /**
   * Line-by-line code block extractor.
   * Replaces each fenced code block (``` ... ```) with a placeholder
   * %%CODE_BLOCK_N%% and stores the block in the codeBlocks array.
   *
   * This handles edge cases correctly:
   *  - Code blocks that contain ``` strings (tutorial content)
   *  - Mixed fence lengths (``` vs ````)
   *  - Unclosed fences at EOF
   */
  _extractCodeBlocks(text, codeBlocks) {
    const lines = text.split('\n');
    const out = [];
    let inBlock  = false;
    let fenceLen = 0;
    let lang     = '';
    let blockLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (!inBlock) {
        // Detect opening fence: 0-3 spaces indent, then 3+ backticks, optional lang tag
        // (soporta c++, c#, objective-c, etc.)
        const openMatch = line.match(/^ {0,3}(`{3,})([\w+#.-]*)\s*$/);
        if (openMatch) {
          inBlock    = true;
          fenceLen   = openMatch[1].length;
          lang       = openMatch[2] || '';
          blockLines = [];
        } else {
          out.push(line);
        }
      } else {
        // Inside a block — detect closing fence of same or greater length
        const closeMatch = line.match(/^ {0,3}(`{3,})\s*$/);
        if (closeMatch && closeMatch[1].length >= fenceLen) {
          const idx = codeBlocks.length;
          codeBlocks.push({ lang, code: blockLines.join('\n') });
          out.push(`%%CODE_BLOCK_${idx}%%`);
          inBlock    = false;
          fenceLen   = 0;
          lang       = '';
          blockLines = [];
        } else {
          blockLines.push(line);
        }
      }
    }

    // Flush unclosed block at EOF
    if (inBlock && blockLines.length > 0) {
      const idx = codeBlocks.length;
      codeBlocks.push({ lang, code: blockLines.join('\n') });
      out.push(`%%CODE_BLOCK_${idx}%%`);
    }

    return out.join('\n');
  },

  _escapeHtml(text) {
    return text
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;');
  },

  _parseTables(html) {
    const tableRegex = /(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)+)/g;
    return html.replace(tableRegex, (table) => {
      const rows = table.trim().split('\n');
      if (rows.length < 3) return table;

      // primera y última celda son '' por los pipes exteriores — slice, no filter
      // (filter eliminaría celdas vacías legítimas y desalinearía columnas)
      const splitRow = (row) => row.split('|').slice(1, -1).map(c => c.trim());

      const alignOf = (cell) => {
        const c = cell.trim();
        if (/^:-+:$/.test(c)) return 'center';
        if (/^-+:$/.test(c))  return 'right';
        return '';
      };
      const aligns = rows[1].split('|').slice(1, -1).map(alignOf);
      const style  = (i) => aligns[i] ? ` style="text-align:${aligns[i]}"` : '';

      const headers  = splitRow(rows[0]).map((c, i) => `<th${style(i)}>${c}</th>`).join('');
      const dataRows = rows.slice(2).map(row => {
        const cells = splitRow(row).map((c, i) => `<td${style(i)}>${c}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');

      return `<table><thead><tr>${headers}</tr></thead><tbody>${dataRows}</tbody></table>`;
    });
  },

  _parseLists(html) {
    // Handle unordered lists
    html = html.replace(/((?:^- .+\n?)+)/gm, (block) => {
      const items = block.trim().split('\n').map(line => {
        if (line.match(/^- /)) {
          return `<li>${line.slice(2)}</li>`;
        }
        return line;
      }).join('');
      return `<ul>${items}</ul>`;
    });

    // Handle ordered lists
    html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
      const items = block.trim().split('\n').map(line => {
        const match = line.match(/^\d+\. (.+)/);
        if (match) return `<li>${match[1]}</li>`;
        return line;
      }).join('');
      return `<ol>${items}</ol>`;
    });

    return html;
  },

  _parseParagraphs(html) {
    // Split on double newlines
    const blocks = html.split(/\n\n+/);
    return blocks.map(block => {
      block = block.trim();
      if (!block) return '';
      // Don't wrap block-level HTML elements
      if (block.match(/^<(h[1-6]|ul|ol|li|table|blockquote|pre|hr|div|details)/)) {
        return block;
      }
      // Don't wrap blocks that contain or ARE code/HTML block placeholders
      if (block.includes('%%CODE_BLOCK_') || block.includes('%%INLINE_CODE_') || block.includes('%%HTML_BLOCK_')) {
        // Pure placeholder — return as-is
        if (block.match(/^%%(CODE_BLOCK|INLINE_CODE|HTML_BLOCK)_\d+%%$/)) {
          return block;
        }
        // Mixed placeholder + text — split and wrap only text parts
        return block
          .split(/(%%(?:CODE_BLOCK|INLINE_CODE|HTML_BLOCK)_\d+%%)/)
          .map(part => {
            if (part.match(/^%%(CODE_BLOCK|INLINE_CODE|HTML_BLOCK)_\d+%%$/)) return part;
            const trimmed = part.trim();
            if (!trimmed) return '';
            if (trimmed.match(/^<(h[1-6]|ul|ol|li|table|blockquote|pre|hr|div|details)/)) return trimmed;
            return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
          })
          .join('\n');
      }
      // Convert single newlines to spaces within paragraphs
      return `<p>${block.replace(/\n/g, ' ')}</p>`;
    }).join('\n');
  },

  _highlight(code, lang) {
    // Escapa solo & < > (las comillas se necesitan intactas para detectar strings)
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (!lang || lang === 'text' || lang === 'mermaid') return escaped;

    // ── Pipeline seguro ─────────────────────────────────────────────
    // 1) Strings y comentarios se extraen PRIMERO a placeholders
    //    (una sola pasada combinada: el match más a la izquierda gana,
    //    así un comentario "traga" strings y viceversa correctamente).
    // 2) Keywords / números / funciones después (los placeholders no
    //    contienen keywords, así no hay colisiones con atributos HTML).
    // 3) Restaurar placeholders al final.
    const protected_ = [];
    const protect = (m, cls) => {
      const idx = protected_.length;
      protected_.push(`<span class="token ${cls}">${m}</span>`);
      return `\x00P${idx}\x00`;
    };
    const isComment = (m) => m.startsWith('#') || m.startsWith('//') || m.startsWith('/*') || m.startsWith('--');
    const STR = '"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\'';

    if (lang === 'python' || lang === 'py') {
      escaped = escaped
        .replace(new RegExp('("""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|' + STR + '|#[^\\n]*)', 'g'),
          (m) => protect(m, isComment(m) ? 'comment' : 'string'))
        .replace(/\b(def|class|import|from|return|if|elif|else|for|while|with|try|except|finally|and|or|not|in|is|None|True|False|self|lambda|yield|pass|break|continue|raise|del|global|nonlocal|async|await)\b/g,
          '<span class="token keyword">$1</span>')
        .replace(/\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*)\b/g, '<span class="token number">$1</span>')
        .replace(/\b([a-z_][a-z0-9_]*)\s*(?=\()/g, '<span class="token function">$1</span>');
    } else if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
      escaped = escaped
        .replace(new RegExp('(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|`(?:[^`\\\\]|\\\\.)*`|' + STR + ')', 'g'),
          (m) => protect(m, isComment(m) ? 'comment' : 'string'))
        .replace(/\b(const|let|var|function|class|return|if|else|for|while|do|switch|case|break|continue|import|export|default|from|async|await|try|catch|finally|new|this|typeof|instanceof|null|undefined|true|false|void|throw|yield)\b/g,
          '<span class="token keyword">$1</span>')
        .replace(/\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*)\b/g, '<span class="token number">$1</span>')
        .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="token function">$1</span>');
    } else if (lang === 'json') {
      escaped = escaped
        // claves "key": → attr-name ; strings sueltos → string
        .replace(/("(?:[^"\\]|\\.)*")(\s*:)?/g, (m, str, colon) => colon ? protect(str, 'attr-name') + colon : protect(str, 'string'))
        .replace(/\b(true|false|null)\b/g, '<span class="token boolean">$1</span>')
        .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="token number">$1</span>');
    } else if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
      escaped = escaped
        .replace(new RegExp('(#[^\\n]*|' + STR + ')', 'g'),
          (m) => protect(m, isComment(m) ? 'comment' : 'string'))
        .replace(/(\$[A-Za-z_][A-Za-z0-9_]*)/g, '<span class="token variable">$1</span>')
        .replace(/(--[\w-]+)/g, '<span class="token attr-name">$1</span>')
        .replace(/\b(if|then|else|elif|fi|for|do|done|while|until|case|esac|function|export|local|readonly|return|break|continue|sudo|source)\b/g,
          '<span class="token keyword">$1</span>')
        .replace(/\b(echo|cd|ls|cat|grep|sed|awk|find|mkdir|rm|cp|mv|touch|chmod|chown|curl|wget|git|npm|npx|pip|pip3|python|python3|node|docker|terraform|aws|dnf|yum|apt-get|systemctl|service)\b/g,
          '<span class="token function">$1</span>')
        .replace(/\b(\d+(?:\.\d+){1,3}(?:\/\d+)?|\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
    } else if (lang === 'yaml' || lang === 'yml') {
      escaped = escaped
        .replace(new RegExp('(#[^\\n]*|' + STR + ')', 'g'),
          (m) => protect(m, isComment(m) ? 'comment' : 'string'))
        .replace(/^(\s*[\w-]+)\s*:/gm, '<span class="token attr-name">$1</span>:')
        .replace(/(!![\w-]+|![A-Za-z][\w-]*)/g, '<span class="token class-name">$1</span>')
        .replace(/\b(true|false|null|yes|no|on|off)\b/g, '<span class="token boolean">$1</span>')
        .replace(/\b(\d+(?:\.\d+){1,3}(?:\/\d+)?|\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
    } else if (lang === 'powershell' || lang === 'ps1' || lang === 'ps') {
      escaped = escaped
        .replace(new RegExp('(#[^\\n]*|' + STR + ')', 'g'),
          (m) => protect(m, isComment(m) ? 'comment' : 'string'))
        .replace(/(\$[A-Za-z_][A-Za-z0-9_]*(?::[A-Za-z_][A-Za-z0-9_]*)?(\.[A-Za-z_][A-Za-z0-9_]*)*(\[[^\]]*\])*|\$\([^)]*\)|\$\{[^}]*\})/g,
          '<span class="token variable">$1</span>')
        .replace(/(--[\w-]+)/g, '<span class="token attr-name">$1</span>')
        .replace(/\b(if|else|elseif|foreach|for|while|do|until|switch|function|param|return|try|catch|finally|throw|break|continue|begin|process|end|exit|filter|using)\b/g,
          '<span class="token keyword">$1</span>')
        .replace(/\b(Write-Host|Write-Warning|Write-Output|Write-Error|Get-Item|Get-Content|Set-Content|Get-Command|Set-Variable|Get-Variable|ForEach-Object|Where-Object|Start-Sleep|Invoke-WebRequest|Select-Object|Sort-Object|ConvertTo-Json|ConvertFrom-Json|New-Item|Start-Process|Remove-Item|Test-Path|Join-Path|Split-Path|aws|docker|curl|terraform|psql|mysql|npm|git|sleep)\b/g,
          '<span class="token function">$1</span>')
        .replace(/\b(\d+(?:\.\d+){1,3}(?:\/\d+)?|\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
    } else if (lang === 'hcl' || lang === 'tf') {
      escaped = escaped
        .replace(new RegExp('(#[^\\n]*|\\/\\/[^\\n]*|' + STR + ')', 'g'),
          (m) => protect(m, isComment(m) ? 'comment' : 'string'))
        .replace(/^(\s*)([A-Za-z_][A-Za-z0-9_-]*)(\s*[=:])/gm, '$1<span class="token attr-name">$2</span>$3')
        .replace(/\b(resource|provider|variable|output|data|locals|module|terraform|required_providers|backend|provisioner|connection|for_each|count|depends_on|lifecycle|dynamic)\b/g,
          '<span class="token keyword">$1</span>')
        .replace(/\b(true|false)\b/g, '<span class="token boolean">$1</span>')
        .replace(/\b(\d+(?:\.\d+){1,3}(?:\/\d+)?|\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
    } else if (lang === 'sql') {
      escaped = escaped
        .replace(new RegExp('(--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|' + STR + ')', 'g'),
          (m) => protect(m, isComment(m) ? 'comment' : 'string'))
        .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ON|GROUP|BY|ORDER|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|INDEX|VIEW|ALTER|DROP|TRUNCATE|AND|OR|NOT|IN|IS|NULL|LIKE|BETWEEN|AS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|LIMIT|OFFSET|UNION|ALL|CASE|WHEN|THEN|ELSE|END|PRIMARY|FOREIGN|KEY|REFERENCES|UNIQUE|DEFAULT|DESCRIBE|SHOW|USE|BEGIN|COMMIT|ROLLBACK)\b/gi,
          '<span class="token keyword">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
    } else if (lang === 'ini') {
      escaped = escaped
        .replace(new RegExp('(;[^\\n]*|#[^\\n]*|' + STR + ')', 'g'),
          (m) => protect(m, (m.startsWith(';') || m.startsWith('#')) ? 'comment' : 'string'))
        .replace(/^(\s*)\[([^\]]+)\]/gm, '$1<span class="token class-name">[$2]</span>')
        .replace(/^(\s*)([^#;=<]+?)\s*=/gm, '$1<span class="token attr-name">$2</span> =');
    }

    // Restaurar strings/comentarios protegidos
    escaped = escaped.replace(/\x00P(\d+)\x00/g, (_, i) => protected_[parseInt(i, 10)]);

    return escaped;
  },

  copyCode(btn) {
    const pre  = btn.closest('pre');
    const code = pre.querySelector('code');
    const text = code.textContent;

    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ Copiado';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copiar';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      btn.textContent = '✓ Copiado';
      setTimeout(() => btn.textContent = 'Copiar', 2000);
    });
  }
};
