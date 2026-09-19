const input    = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const noRes    = document.getElementById('noResults');
  const countBar = document.getElementById('countBar');
  const rows     = document.querySelectorAll('.row:not(.thead)');
  const cats     = document.querySelectorAll('.category');
  const tabs     = document.querySelectorAll('.tab');
  let activeTab  = 'all';

  function norm(s) {
    return s
      .replace(/[أإآا]/g, 'ا')
      .replace(/[ىيئ]/g, 'ي')
      .replace(/[ةه]/g, 'ه')
      .toLowerCase();
  }

  function render() {
    const q     = input.value.trim();
    const qn    = norm(q);
    const isSearch = q.length > 0;
    let visible = 0;

    document.body.classList.toggle('searching', isSearch);
    clearBtn.style.display = q ? 'block' : 'none';

    rows.forEach(row => {
      const cat    = row.dataset.cat;
      const search = norm(row.dataset.search || '');
      const matchQ = !qn || search.includes(qn);
      const matchT = activeTab === 'all' || cat === activeTab;
      const show   = matchQ && matchT;

      row.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    // Show/hide whole category blocks
    cats.forEach(cat => {
      const hasVisible = cat.querySelectorAll('.row:not(.thead):not(.hidden)').length > 0;
      cat.style.display = hasVisible ? '' : 'none';
    });

    noRes.style.display = visible === 0 ? 'block' : 'none';
    countBar.textContent = isSearch && visible > 0
      ? `${visible} نتيجة`
      : '';
  }

  input.addEventListener('input', render);

  clearBtn.addEventListener('click', () => {
    input.value = '';
    input.focus();
    render();
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.cat;
      render();
    });
  });