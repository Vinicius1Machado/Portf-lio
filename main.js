/* main.js — animações suaves, sem libs */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1) Sticky nav com classe quando scrolla
const nav = document.getElementById("nav");
const onScroll = () => {
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 10);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// 2) Reveal on scroll com IntersectionObserver
const revealEls = document.querySelectorAll("[data-reveal]");
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
} else {
  // fallback: sem animação
  revealEls.forEach(el => el.classList.add("revealed"));
}

// 3) Contador animado (métricas)
function animateCount(el, target, duration = 900) {
  const start = 0;
  const startTime = performance.now();

  const tick = (now) => {
    const t = Math.min((now - startTime) / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(start + (target - start) * eased);

    // formatação simples
    el.textContent = (target >= 1000)
      ? value.toLocaleString("pt-PT")
      : String(value);

    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = (target >= 1000) ? target.toLocaleString("pt-PT") : String(target);
  };

  requestAnimationFrame(tick);
}

const countEls = document.querySelectorAll("[data-count]");
if (!prefersReducedMotion && "IntersectionObserver" in window && countEls.length) {
  const ioCount = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = Number(el.getAttribute("data-count") || "0");
        animateCount(el, target);
        ioCount.unobserve(el);
      }
    });
  }, { threshold: 0.35 });

  countEls.forEach(el => ioCount.observe(el));
} else {
  countEls.forEach(el => {
    const target = Number(el.getAttribute("data-count") || "0");
    el.textContent = (target >= 1000) ? target.toLocaleString("pt-PT") : String(target);
  });
}

// 4) Ripple effect nos botões
document.addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-ripple]");
  if (!btn || prefersReducedMotion) return;

  const rect = btn.getBoundingClientRect();
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;

  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 520);
});

// 5) Form mock (pra não parecer quebrado)
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const msg = (fd.get("message") || "").toString().trim();

    if (!name || !msg) return;

    // feedback rápido (sem backend)
    const btn = form.querySelector("button[type='submit']");
    const old = btn.textContent;
    btn.textContent = "Enviado ✅ (mock)";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = old;
      btn.disabled = false;
      form.reset();
    }, 1400);
  });
}
