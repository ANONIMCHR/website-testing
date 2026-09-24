/* ============================================================
   APP.JS — render logic. Reads everything from CONFIG (config.js).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('brand-name').textContent = CONFIG.brand.name;
  document.getElementById('brand-tagline').textContent = CONFIG.brand.tagline;
  document.title = CONFIG.brand.name;
  setFavicon(CONFIG.brand.faviconEmoji);

  initTypewriter();
  initPhotoBox();
  renderProjects();
  renderSocials();
  initLeaderboard();
});

function setFavicon(emoji) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <text y=".9em" font-size="90">${emoji}</text></svg>`;
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  document.head.appendChild(link);
}

/* ---------- Typewriter intro ---------- */

function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  const { lines, typingSpeedMs, pauseBetweenLinesMs, loop } = CONFIG.intro;
  if (!lines || !lines.length) return;

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function step() {
    const currentLine = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentLine.slice(0, charIndex);
      if (charIndex === currentLine.length) {
        const isLast = lineIndex === lines.length - 1;
        if (isLast && !loop) return; // stop, leave last line on screen
        setTimeout(() => { deleting = true; step(); }, pauseBetweenLinesMs);
        return;
      }
    } else {
      charIndex--;
      el.textContent = currentLine.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }
    setTimeout(step, deleting ? typingSpeedMs / 2 : typingSpeedMs);
  }

  step();
}

/* ---------- Photo box ---------- */

function initPhotoBox() {
  const { images, intervalMs, title } = CONFIG.photoBox;
  const widget = document.getElementById('photo-widget');
  const stack = document.getElementById('photo-stack');
  const dots = document.getElementById('photo-dots');

  const valid = (images || []).filter(src => src && !src.includes('REPLACE'));
  if (!valid.length) {
    widget.style.display = 'none';
    return;
  }

  document.getElementById('photo-heart').textContent = title || '❤';

  valid.slice(0, 5).forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'photo';
    if (i === 0) img.classList.add('active');
    stack.appendChild(img);

    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dots.appendChild(dot);
  });

  if (valid.length <= 1) return;

  let current = 0;
  const imgs = stack.querySelectorAll('img');
  const dotEls = dots.querySelectorAll('span');

  setInterval(() => {
    imgs[current].classList.remove('active');
    dotEls[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
    dotEls[current].classList.add('active');
  }, intervalMs || 5000);
}

/* ---------- Projects ---------- */

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const projects = CONFIG.projects || [];

  if (!projects.length) {
    grid.innerHTML = '<p style="color:var(--text-dim)">Belum ada project ditambahin.</p>';
    return;
  }

  grid.innerHTML = projects.map(p => `
    <a class="project-card" href="${escapeAttr(p.link || '#')}" ${p.link && p.link !== '#' ? 'target="_blank" rel="noopener"' : ''}>
      ${p.tag ? `<span class="project-tag">${escapeHtml(p.tag)}</span>` : ''}
      <h3>${escapeHtml(p.name || 'Untitled')}</h3>
      <p>${escapeHtml(p.description || '')}</p>
    </a>
  `).join('');
}

/* ---------- Socials ---------- */

function renderSocials() {
  const row = document.getElementById('social-row');
  const s = CONFIG.socials || {};
  const items = [];

  if (s.instagram) items.push(`<a class="social-pill ig" href="${escapeAttr(s.instagram)}" target="_blank" rel="noopener"><span class="dot"></span>Instagram</a>`);
  if (s.whatsapp) items.push(`<a class="social-pill wa" href="${escapeAttr(s.whatsapp)}" target="_blank" rel="noopener"><span class="dot"></span>WhatsApp</a>`);
  if (s.email) items.push(`<a class="social-pill mail" href="mailto:${escapeAttr(s.email)}"><span class="dot"></span>${escapeHtml(s.email)}</a>`);

  row.innerHTML = items.join('') || '<p style="color:var(--text-dim)">Belum ada kontak ditambahin.</p>';
}

/* ---------- Leaderboard ---------- */

async function initLeaderboard() {
  await loadLeaderboard();
  const { refreshMs } = CONFIG.leaderboard;
  if (refreshMs && refreshMs > 0) {
    setInterval(loadLeaderboard, refreshMs);
  }
}

async function loadLeaderboard() {
  const body = document.getElementById('lb-body');
  const { sources, roleColors, roleLabels } = CONFIG.leaderboard;

  document.getElementById('lb-title').textContent = CONFIG.leaderboard.title;
  document.getElementById('lb-sub').textContent = CONFIG.leaderboard.subtitle;

  const results = await Promise.allSettled(
    (sources || [])
      .filter(url => url && !url.includes('USERNAME/REPO'))
      .map(fetchSource)
  );

  let entries = [];
  results.forEach(r => {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) {
      entries = entries.concat(r.value);
    }
  });

  if (!entries.length) {
    body.innerHTML = `<div class="lb-empty">Belum ada data leaderboard. Tempel link raw JSON lo di js/config.js → leaderboard.sources</div>`;
    return;
  }

  body.innerHTML = entries.map(e => {
    const role = (e.role || 'member').toLowerCase();
    const color = roleColors[role] || roleColors.member;
    const roleLabel = (roleLabels && roleLabels[role]) || capitalize(role);

    const displayName = e.name || e.username || '—';
    const showUsernameLine = e.username && e.name && e.username !== e.name;

    const status = computeStatus(e);

    return `
      <div class="lb-row">
        <div class="lb-user">
          ${escapeHtml(displayName)}
          ${showUsernameLine ? `<span class="lb-user-sub">@${escapeHtml(e.username)}</span>` : ''}
        </div>
        <div class="lb-role role-glow" style="color:${color}">${escapeHtml(roleLabel)}</div>
        <div class="lb-status">
          <span class="status-badge status-${status.kind}">${escapeHtml(status.label)}</span>
        </div>
        <div class="lb-time">${escapeHtml(status.remaining)}</div>
      </div>
    `;
  }).join('');
}

/**
 * Turns { active, expiresAt } into a status badge + a human "sisa waktu" string.
 * kind: "active" | "inactive" | "expired"
 */
function computeStatus(e) {
  const now = new Date();
  const expiry = e.expiresAt ? new Date(e.expiresAt) : null;
  const expiryValid = expiry && !isNaN(expiry.getTime());

  if (e.active === false) {
    return {
      kind: 'inactive',
      label: 'Nonaktif',
      remaining: expiryValid ? formatRemaining(expiry, now) : '—'
    };
  }

  if (expiryValid && expiry.getTime() < now.getTime()) {
    return {
      kind: 'expired',
      label: 'Expired',
      remaining: formatRemaining(expiry, now)
    };
  }

  return {
    kind: 'active',
    label: 'Aktif',
    remaining: expiryValid ? formatRemaining(expiry, now) : '—'
  };
}

function formatRemaining(expiry, now) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / msPerDay);

  if (diffDays > 1) return `${diffDays} hari lagi`;
  if (diffDays === 1) return 'Besok habis';
  if (diffDays === 0) return 'Habis hari ini';
  if (diffDays === -1) return 'Kemarin habis';
  return `Habis ${Math.abs(diffDays)} hari lalu`;
}

async function fetchSource(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
    // Never carry password fields into the rendered page.
    return list.map(({ password, ...rest }) => rest);
  } catch (err) {
    console.warn('Gagal ambil leaderboard dari', url, err);
    return [];
  }
}

/* ---------- utils ---------- */

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}
