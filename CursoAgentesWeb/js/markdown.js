/**
 * Lightweight Markdown Parser
 * Converts Markdown to HTML for the course content
 */
const MarkdownParser = {
  parse(md) {
    if (!md) return '';
    let html = md;

    const codeBlocks = [];
    const inlineCode = [];

    // Extract fenced code blocks — line-by-line parser to correctly handle
    // cases where a code block CONTAINS lines that look like fence delimiters.
    // (Common in Markdown tutorial content.)
    html = this._extractCodeBlocks(html, codeBlocks);

    // Extract inline code
    html = html.replace(/`([^`]+)`/g, (_, code) => {
      const idx = inlineCode.length;
      inlineCode.push(code);
      return `%%INLINE_CODE_${idx}%%`;
    });

    // Escape HTML in remaining text
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Headers
    html = html.replace(/^#{6} (.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#{5} (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^#{4} (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Blockquotes
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr>');

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Tables
    html = this._parseTables(html);

    // Details/Summary
    html = html.replace(/&lt;details&gt;/g, '<details>');
    html = html.replace(/&lt;\/details&gt;/g, '</details>');
    html = html.replace(/&lt;summary&gt;(.+?)&lt;\/summary&gt;/g, '<summary>$1</summary>');

    // Checkboxes
    html = html.replace(/^- \[ \] (.+)$/gm, '<div class="checklist-item" role="checkbox" aria-checked="false" tabindex="0"><div class="ci-box"></div><span class="ci-text">$1</span></div>');
    html = html.replace(/^- \[x\] (.+)$/gm, '<div class="checklist-item checked" role="checkbox" aria-checked="true" tabindex="0"><div class="ci-box">✓</div><span class="ci-text">$1</span></div>');

    // Lists
    html = this._parseLists(html);

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Paragraphs
    html = this._parseParagraphs(html);

    // Restore code blocks
    html = html.replace(/%%CODE_BLOCK_(\d+)%%/g, (_, idx) => {
      const entry = codeBlocks[parseInt(idx, 10)];
      if (!entry) return ''; // safety guard
      const { lang, code } = entry;
      const highlighted = this._highlight(code, lang);
      return `<pre class="language-${lang || 'text'}"><button class="copy-btn" onclick="MarkdownParser.copyCode(this)">Copiar</button><code class="language-${lang || 'text'}">${highlighted}</code></pre>`;
    });

    // Restore inline code
    html = html.replace(/%%INLINE_CODE_(\d+)%%/g, (_, idx) => {
      const entry = inlineCode[parseInt(idx, 10)];
      if (!entry) return '';
      return `<code>${this._escapeHtml(entry)}</code>`;
    });

    return html;
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
    let inBlock = false;
    let fenceLen = 0;
    let lang = '';
    let blockLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (!inBlock) {
        // Detect opening fence: 3+ backticks at start of line, optional lang tag
        const openMatch = line.match(/^(`{3,})(\w*)\s*$/);
        if (openMatch) {
          inBlock = true;
          fenceLen = openMatch[1].length;
          lang = openMatch[2] || '';
          blockLines = [];
        } else {
          out.push(line);
        }
      } else {
        // Inside a block — detect closing fence of same or greater length
        const closeMatch = line.match(/^(`{3,})\s*$/);
        if (closeMatch && closeMatch[1].length >= fenceLen) {
          const idx = codeBlocks.length;
          codeBlocks.push({ lang, code: blockLines.join('\n') });
          out.push(`%%CODE_BLOCK_${idx}%%`);
          inBlock = false;
          fenceLen = 0;
          lang = '';
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
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  _parseTables(html) {
    const tableRegex = /(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)+)/g;
    return html.replace(tableRegex, (table) => {
      const rows = table.trim().split('\n');
      if (rows.length < 3) return table;

      const headers = rows[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
      const dataRows = rows.slice(2).map(row => {
        const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
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
      // Don't wrap blocks that contain or ARE code block placeholders
      if (block.includes('%%CODE_BLOCK_') || block.includes('%%INLINE_CODE_')) {
        // Pure placeholder — return as-is
        if (block.match(/^%%CODE_BLOCK_\d+%%$/) || block.match(/^%%INLINE_CODE_\d+%%$/)) {
          return block;
        }
        // Mixed placeholder + text — split and wrap only text parts
        return block
          .split(/(%%CODE_BLOCK_\d+%%|%%INLINE_CODE_\d+%%)/)
          .map(part => {
            if (part.match(/^%%(CODE_BLOCK|INLINE_CODE)_\d+%%$/)) return part;
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
    // Escape HTML first
    let escaped = this._escapeHtml(code);

    if (!lang || lang === 'text') return escaped;

    // Simple syntax highlighting
    if (lang === 'python' || lang === 'py') {
      escaped = escaped
        .replace(/\b(def|class|import|from|return|if|elif|else|for|while|with|try|except|finally|and|or|not|in|is|None|True|False|self|lambda|yield|pass|break|continue|raise|del|global|nonlocal|async|await)\b/g, '<span class="token keyword">$1</span>')
        .replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/g, '<span class="token string">$1</span>')
        .replace(/(#[^\n]*)/g, '<span class="token comment">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>')
        .replace(/\b([a-z_][a-z0-9_]*)\s*(?=\()/g, '<span class="token function">$1</span>');
    } else if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
      escaped = escaped
        .replace(/\b(const|let|var|function|class|return|if|else|for|while|do|switch|case|break|continue|import|export|default|from|async|await|try|catch|finally|new|this|typeof|instanceof|null|undefined|true|false|void|throw|yield)\b/g, '<span class="token keyword">$1</span>')
        .replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')
        .replace(/(`[^`]*`|"[^"]*"|'[^']*')/g, '<span class="token string">$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>')
        .replace(/\b([a-z_][a-z0-9_]*)\s*(?=\()/g, '<span class="token function">$1</span>');
    } else if (lang === 'json') {
      escaped = escaped
        .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="token attr-name">$1</span>:')
        .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="token string">$1</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="token boolean">$1</span>')
        .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="token number">$1</span>');
    } else if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
      escaped = escaped
        .replace(/(#[^\n]*)/g, '<span class="token comment">$1</span>')
        .replace(/\b(if|then|else|fi|for|do|done|while|case|esac|echo|cd|ls|git|npm|pip|python|export|mkdir|rm|cp|mv)\b/g, '<span class="token keyword">$1</span>')
        .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="token string">$1</span>');
    } else if (lang === 'yaml' || lang === 'yml') {
      escaped = escaped
        .replace(/(#[^\n]*)/g, '<span class="token comment">$1</span>')
        .replace(/^(\s*[\w-]+)\s*:/gm, '<span class="token attr-name">$1</span>:')
        .replace(/:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, ': <span class="token string">$1</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="token boolean">$1</span>');
    }

    return escaped;
  },

  copyCode(btn) {
    const pre = btn.closest('pre');
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
