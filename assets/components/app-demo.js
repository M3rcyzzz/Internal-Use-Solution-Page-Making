// A real local interface model. All views derive from one in-memory dataset.
(() => {
  function init() {
    document.querySelectorAll('[data-t0-demo="app"]').forEach(root => {
      if (root.dataset.ready) return;
      const one = selector => root.querySelector(selector);
      const all = selector => [...root.querySelectorAll(selector)];
      const { data: original, labels: l } = JSON.parse(one('[data-app-config]').textContent);
      let records = structuredClone(original.records), selected, view = 'overview', ascending = true;
      const drawer = one('[data-app-drawer]'), search = one('[data-app-search]');
      const location = one('[data-app-location]'), statusFilter = one('[data-app-status]');
      const element = (tag, text, className) => {
        const el = document.createElement(tag); if (text !== undefined) el.textContent = text;
        if (className) el.className = className; return el;
      };
      const button = (text, key, value, className) => {
        const b = element('button', text, className); b.type = 'button'; b.dataset[key] = value; return b;
      };
      const badge = value => { const b = element('span', l[value], 't0-badge'); b.dataset.tone = value; return b; };
      const scope = () => records.filter(r => !location.value || r.location === location.value);
      const feedback = message => { one('[data-app-feedback]').textContent = message; };
      drawer.addEventListener('close', () => {
        const trigger = all('[data-app-record]').find(b => b.dataset.appRecord === selected?.id && b.getClientRects().length);
        (trigger || one(`[data-app-nav="${view}"]`)).focus();
      });
      function navigate(next) {
        view = next; all('[data-app-view]').forEach(p => { p.hidden = p.dataset.appView !== view; });
        all('[data-app-nav]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.appNav === view)));
        one('[data-app-heading]').textContent = l[view];
      }
      function render() {
        const scoped = scope(), opened = scoped.filter(r => r.status !== 'completed');
        const values = { total: scoped.length, open: opened.length, urgent: opened.filter(r => r.priority === 'urgent').length,
          rate: (scoped.length ? Math.round((scoped.length-opened.length)/scoped.length*100) : 0)+'%' };
        for (const [key,value] of Object.entries(values)) one(`[data-app-metric="${key}"]`).textContent = value;
        const query = search.value.trim().toLocaleLowerCase();
        const matching = scoped.filter(r => (!statusFilter.value || r.status === statusFilter.value) &&
          [r.id,r.title,r.asset,r.asset_name,r.owner].join(' ').toLocaleLowerCase().includes(query))
          .sort((a,b) => (ascending ? 1 : -1)*a.due.localeCompare(b.due));
        one('[data-app-rows]').replaceChildren(...matching.map(r => {
          const tr = element('tr'); tr.dataset.rowId = r.id;
          const th = element('th'); th.scope = 'row'; const name = button('', 'appRecord', r.id);
          name.append(element('span',r.id,'t0-record-id'),element('strong',r.title)); th.append(name);
          const state = element('td'); state.append(badge(r.status));
          tr.append(th,element('td',r.asset),state,element('td',r.owner || l.unassigned),element('td',r.due.slice(5))); return tr;
        }));
        one('[data-app-empty]').hidden = matching.length > 0;
        one('[data-app-count]').textContent = `${matching.length} / ${scoped.length} · ${l.records_label}`;
        one('[data-app-attention]').replaceChildren(...opened.sort((a,b) => Number(a.priority!=='urgent')-Number(b.priority!=='urgent') || a.due.localeCompare(b.due)).slice(0,4).map(r => {
          const b = button('', 'appRecord', r.id, 't0-attention-row'), title = element('span');
          title.append(element('strong',r.title),element('small',`${r.id} · ${r.asset}`)); b.append(badge(r.priority),title,element('span',r.due.slice(5)+' ↗')); return b;
        }));
        if (!opened.length) one('[data-app-attention]').append(element('p', l.ready, 't0-app-empty'));
        const dates = Array.from({length:7},(_,i) => {
          const d = new Date(original.as_of+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()-6+i); return d.toISOString().slice(0,10);
        });
        const counts = dates.map(d => scoped.filter(r => r.completed_on === d).length);
        one('[data-app-trend]').replaceChildren(...dates.map((d,i) => {
          const column = element('div',undefined,'t0-week-column'), bar = element('span');
          bar.style.height = counts[i]/Math.max(1,...counts)*100+'px';
          column.append(element('strong',counts[i]),bar,element('small',d.slice(5).replace('-','/'))); return column;
        }));
        one('[data-app-distribution]').replaceChildren(...['pending','in_progress','completed'].map(state => {
          const n = scoped.filter(r => r.status === state).length, b = button('', 'appFilter', state), track = element('span',undefined,'t0-bar-track'), bar = element('i');
          bar.style.width = (scoped.length ? n/scoped.length*100 : 0)+'%'; track.append(bar);
          b.append(element('span',l[state]),track,element('strong',n)); return b;
        }));
        const assets = [...new Map(scoped.map(r => [r.asset,r])).values()];
        one('[data-app-view="assets"]').replaceChildren(...assets.map(r => {
          const card = element('article',undefined,'t0-app-card'), n = opened.filter(o => o.asset === r.asset).length;
          card.append(element('span',r.asset,'t0-record-id'),element('h4',r.asset_name),element('p',r.location),
            element('p',n ? `${n} · ${l.asset_attention}` : l.ready, 't0-asset-state'),button(l.related+' →','appAsset',r.asset)); return card;
        }));
      }
      function renderHistory(record) {
        one('[data-detail-history]').replaceChildren(...record.history.map(value => element('li',value)));
      }
      function detail(record) {
        selected = record; one('[data-detail-id]').textContent = record.id; one('[data-detail-title]').textContent = record.title;
        one('[data-detail-tags]').replaceChildren(badge(record.status),badge(record.priority));
        one('[data-detail-meta]').replaceChildren(...[[l.asset_label,record.asset+' · '+record.asset_name],[l.location,record.location],[l.sort,record.due]].flatMap(([k,v]) => [element('dt',k),element('dd',v)]));
        one('[data-detail-owner]').value = record.owner; one('[data-detail-owner]').disabled = record.status === 'completed';
        one('[data-detail-assign]').disabled = record.status === 'completed';
        one('[data-detail-checks]').replaceChildren(...record.checks.map((check,index) => {
          const label = element('label',undefined,'t0-check-row'), input = element('input'); input.type = 'checkbox';
          input.checked = check.checked; input.disabled = record.status === 'completed'; input.dataset.checkIndex = index;
          label.append(input,element('span',check.label)); return label;
        }));
        one('[data-detail-note]').value = record.note; one('[data-detail-note]').disabled = record.status === 'completed';
        one('[data-detail-complete]').disabled = record.status === 'completed';
        one('[data-detail-complete]').textContent = record.status === 'completed' ? l.completed : l.complete;
        one('[data-detail-error]').textContent = ''; renderHistory(record);
      }
      root.addEventListener('click', event => {
        const b = event.target.closest('button'); if (!b || b.disabled || !root.contains(b)) return;
        if (b.hasAttribute('data-app-nav')) navigate(b.dataset.appNav);
        if (b.hasAttribute('data-app-open-orders')) { search.value=''; statusFilter.value=''; render(); navigate('orders'); }
        if (b.hasAttribute('data-app-filter')) { statusFilter.value=b.dataset.appFilter; search.value=''; render(); navigate('orders'); }
        if (b.hasAttribute('data-app-asset')) { search.value=b.dataset.appAsset; statusFilter.value=''; render(); navigate('orders'); }
        if (b.hasAttribute('data-app-sort')) { ascending=!ascending; b.textContent=l.sort+(ascending?' ↓':' ↑'); render(); }
        if (b.hasAttribute('data-app-record')) { detail(records.find(r => r.id === b.dataset.appRecord)); drawer.showModal(); }
        if (b.hasAttribute('data-app-close')) drawer.close();
        if (b.hasAttribute('data-detail-assign')) {
          const owner=one('[data-detail-owner]').value;
          if (!owner) { one('[data-detail-error]').textContent=l.owner_error; return; }
          if (selected.owner !== owner) {
            selected.owner=owner; if (selected.status==='pending') selected.status='in_progress';
            selected.history.unshift(`${original.as_of} · ${l.owner_saved}: ${owner}`); detail(selected); render();
          }
          one('[data-detail-error]').textContent=''; feedback(`${selected.id} · ${l.owner_saved}`);
        }
        if (b.hasAttribute('data-app-reset')) {
          records=structuredClone(original.records); selected=undefined; location.value=''; search.value=''; statusFilter.value=''; ascending=true;
          one('[data-app-sort]').textContent=l.sort+' ↓'; drawer.close(); render(); navigate('overview'); feedback(l.reset_done);
        }
      });
      // Partial work stays with its record while the visitor explores other views.
      one('[data-detail-checks]').addEventListener('change', event => { selected.checks[Number(event.target.dataset.checkIndex)].checked=event.target.checked; });
      one('[data-detail-note]').addEventListener('input', event => { selected.note=event.target.value; });
      one('[data-detail-form]').addEventListener('submit', event => {
        event.preventDefault(); if (selected.status==='completed') return;
        const error=one('[data-detail-error]');
        if (!selected.owner) { error.textContent=l.owner_error; return; }
        if (!selected.checks.every(c => c.checked) || !selected.note.trim()) { error.textContent=l.check_error; return; }
        selected.status='completed'; selected.completed_on=original.as_of;
        selected.history.unshift(`${original.as_of} · ${l.complete_saved}: ${selected.note.trim()}`);
        detail(selected); render(); feedback(`${selected.id} · ${l.complete_saved}`);
      });
      search.addEventListener('input',render); statusFilter.addEventListener('change',render); location.addEventListener('change',render);
      render(); all('[data-demo-control]').forEach(control => { control.disabled=false; }); root.dataset.ready='true';
    });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
