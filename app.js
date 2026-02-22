/* ═══════════════════════════════════════════════
   VĀGDĒVI SAṄGĪTA SHĀLĀ — app.js
═══════════════════════════════════════════════ */

// ── 72 Melakartta Ragas Data ─────────────────────────────────
const RAGAS = [
  [1,"Kanakaṅgi"],[2,"Ratnāṅgi"],[3,"Gānamūrti"],[4,"Vanaspati"],[5,"Mānavati"],[6,"Tānarūpi"],
  [7,"Senāvati"],[8,"Hanumaṭṭoḍi"],[9,"Dhenuka"],[10,"Nāṭakapriya"],[11,"Kokilapriya"],[12,"Rūpavati"],
  [13,"Gāyakapriya"],[14,"Vakulābharaṇam"],[15,"Māyāmāḷavagauḷa"],[16,"Chakravākam"],[17,"Sūryakāntam"],[18,"Hāṭakāmbar"],
  [19,"Jhañkāradhvani"],[20,"Naṭabhairavi"],[21,"Kīravāṇi"],[22,"Kharaharapriya"],[23,"Gaurimanohari"],[24,"Varuṇapriya"],
  [25,"Mārarañjani"],[26,"Chārukesi"],[27,"Sarasāṅgi"],[28,"Harikāmbhoji"],[29,"Dhīraśaṅkarābharaṇam"],[30,"Nāganandini"],
  [31,"Yāgapriya"],[32,"Rāgavardhini"],[33,"Gāṅgeyabhuṣaṇi"],[34,"Vāgadhīśvari"],[35,"Śūlinī"],[36,"Chalanāṭa"],
  [37,"Sālagam"],[38,"Jalārṇavam"],[39,"Jhālavarāḷi"],[40,"Navanītam"],[41,"Pāvani"],[42,"Raghupriya"],
  [43,"Gavāmbhodi"],[44,"Bhavapriya"],[45,"Śubhapantuvarāḷi"],[46,"Ṣaḍvidhamārgiṇi"],[47,"Suvarṇāṅgi"],[48,"Divyamaṇi"],
  [49,"Dhavaḷāmbari"],[50,"Nāmanārāyaṇi"],[51,"Kāmavardhini"],[52,"Rāmapriya"],[53,"Gamanasrama"],[54,"Viśvambhari"],
  [55,"Syāmalāṅgi"],[56,"Ṣaṇmukhapriya"],[57,"Simhendramadhyamam"],[58,"Hemavati"],[59,"Dharmavatī"],[60,"Nītimatī"],
  [61,"Kantāmaṇi"],[62,"Riṣabhāpriya"],[63,"Latāṅgi"],[64,"Vāchaspati"],[65,"Mechakalyāṇi"],[66,"Chitrāmbari"],
  [67,"Sucharitra"],[68,"Jyotiswarūpiṇī"],[69,"Dhātuvardhani"],[70,"Nāsikābhūṣaṇi"],[71,"Kosalam"],[72,"Rasikapriya"]
];

// Colour palette for raga cards — cycles through 6 glow colours
const RAGA_GLOW_COLORS = [
  'rgba(201,168,76,0.25)',
  'rgba(76,168,150,0.25)',
  'rgba(168,76,100,0.25)',
  'rgba(76,100,168,0.25)',
  'rgba(168,120,76,0.25)',
  'rgba(120,168,76,0.25)',
];

// Build raga grid
const ragasGrid = document.getElementById('ragasGrid');
RAGAS.forEach(([num, name]) => {
  const card = document.createElement('div');
  card.className = 'raga-card';
  const glowColor = RAGA_GLOW_COLORS[(num - 1) % RAGA_GLOW_COLORS.length];
  card.style.setProperty('--raga-glow', glowColor);
  card.innerHTML = `<span class="raga-num">${String(num).padStart(2,'0')}</span><span class="raga-name">${name}</span>`;
  ragasGrid.appendChild(card);
});


// ── Hamburger / Mobile Nav ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});


// ── Active Nav Highlight ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => { a.style.color = ''; a.style.background = ''; });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color      = 'var(--gold-light)';
        active.style.background = 'rgba(201,168,76,0.12)';
      }
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(s => sectionObs.observe(s));


// ── Navbar background on scroll ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.borderBottom = '1px solid rgba(201,168,76,0.4)';
  } else {
    navbar.style.borderBottom = '1px solid rgba(201,168,76,0.3)';
  }
}, { passive: true });


// ── Swara blocks — touch support (flip on tap for mobile) ─────
document.querySelectorAll('.swara-block').forEach(block => {
  block.addEventListener('click', () => {
    block.classList.toggle('flipped');
  });
});


// ── Scroll Reveal ─────────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.trinity-card, .pitamaha-block, .swara-block, .raga-card, .school-grid, .guru-card, .gallery-item, .contact-wrapper, .section-header'
);

const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid items
      const delay = entry.target.classList.contains('raga-card')
        ? Math.random() * 0.4
        : 0;
      entry.target.style.transitionDelay = `${delay}s`;
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  revealObs.observe(el);
});

// Hero is immediately visible
const hero = document.querySelector('.hero-section');
if (hero) { hero.style.opacity = '1'; hero.style.transform = 'none'; }


// ── Raga card grow effect enhanced ───────────────────────────
ragasGrid.addEventListener('mousemove', e => {
  const card = e.target.closest('.raga-card');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
  const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
  card.style.transform = `translateY(-4px) scale(1.04) rotateX(${-y}deg) rotateY(${x}deg)`;
});
ragasGrid.addEventListener('mouseleave', e => {
  const card = e.target.closest('.raga-card');
  if (card) card.style.transform = '';
}, true);
