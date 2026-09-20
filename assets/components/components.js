// Preview only: copying a prompt does not generate an app or execute an Agent request.
for (const module of document.querySelectorAll('[data-component="builder"]')) {
  const button=module.querySelector('[data-copy-prompt]');
  button?.addEventListener('click',async()=>{
    const text=module.querySelector('#builder-prompt');
    const status=module.querySelector('[data-copy-status]');
    const en=document.documentElement.lang.startsWith('en');
    try { await navigator.clipboard.writeText(text.textContent); status.textContent=en?'Prompt copied.':'需求已复制。'; }
    catch { const r=document.createRange();r.selectNodeContents(text);const s=window.getSelection();s.removeAllRanges();s.addRange(r);status.textContent=en?'Prompt selected. Use your copy shortcut.':'已选中需求，请使用复制快捷键。'; }
  });
}
