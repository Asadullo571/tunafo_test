// ===== NAVBAR SCROLL =====
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => observer.observe(el));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    document.getElementById('sendModal').classList.remove('active');
  }
});

// ===== COUNT UP ANIMATION =====
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const step = target / (1800 / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCount);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.about-right').forEach(el => countObserver.observe(el));

// ===== CONTACT FORM — 2 ta tanlov modal =====
let _formData = {};

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  _formData = {
    name:    document.getElementById('fname').value.trim(),
    phone:   document.getElementById('fphone').value.trim(),
    service: document.getElementById('fservice').value || '-',
    message: document.getElementById('fmessage').value.trim() || '-'
  };
  document.getElementById('sendModal').classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Modal yopish
document.getElementById('sendModalClose').addEventListener('click', closeModal);
document.getElementById('sendModal').addEventListener('click', e => {
  if (e.target === document.getElementById('sendModal')) closeModal();
});

function closeModal() {
  document.getElementById('sendModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== TELEGRAM =====
document.getElementById('sendViaTg').addEventListener('click', () => {
  const { name, phone, service, message } = _formData;

  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const date =
    pad(now.getDate()) + '.' +
    pad(now.getMonth() + 1) + '.' +
    now.getFullYear() + ', ' +
    pad(now.getHours()) + ':' +
    pad(now.getMinutes()) + ':' +
    pad(now.getSeconds());

  const text = encodeURIComponent(
    "\uD83D\uDD14 Yangi Murojaat!\n\n" +
    "\uD83D\uDC64 Ism: " + name + "\n" +
    "\uD83D\uDCDE Telefon: " + phone + "\n" +
    "\uD83D\uDD27 Xizmat: " + service + "\n" +
    "\uD83D\uDCAC Xabar: " + message + "\n\n" +
    "\u23F0 " + date
  );
  window.open("https://t.me/Akmaljon771?text=" + text, '_blank');
  closeModalSuccess();
});

// ===== EMAIL =====
document.getElementById('sendViaEmail').addEventListener('click', () => {
  const { name, phone, service, message } = _formData;
  const subject = encodeURIComponent("Tunkafo Potolok - Yangi so'rov");
  const body = encodeURIComponent(
    "Yangi so'rov keldi!\n\n" +
    "Ism: " + name + "\n" +
    "Telefon: " + phone + "\n" +
    "Xizmat: " + service + "\n" +
    "Izoh: " + message + "\n\n" +
    "- Tunkafo Potolok sayti orqali yuborildi"
  );
  window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=tunkafo771@gmail.com&su=" + subject + "&body=" + body,
    '_blank'
  );
  closeModalSuccess();
});

function closeModalSuccess() {
  closeModal();
  const btn = document.querySelector('.btn-submit');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Yuborildi!';
  btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
  btn.style.color = 'white';
  document.getElementById('contactForm').reset();
  setTimeout(() => {
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Buyurtma Yuborish';
    btn.style.background = '';
    btn.style.color = '';
  }, 3500);
}