/**
 * Eldo Carmo Barber Shop
 * Cart + Navigation + Contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Elements ----------
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const bookingForm = document.getElementById('booking-form');

  // ---------- State ----------
  let cart = JSON.parse(localStorage.getItem('eldocarmo_cart') || '[]');

  // ---------- Hamburger ----------
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  nav?.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---------- Cart Drawer ----------
  function openCart() {
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // ---------- Cart Logic ----------
  function saveCart() {
    localStorage.setItem('eldocarmo_cart', JSON.stringify(cart));
    renderCart();
  }

  function addToCart(id, name, price) {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price: Number(price), qty: 1 });
    }
    saveCart();
    openCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function formatPrice(value) {
    return value.toLocaleString('pt-AO') + ' Kz';
  }

  function renderCart() {
    const total = getTotal();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    cartCountEl.textContent = count;
    cartTotalEl.textContent = formatPrice(total);
    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p class="cart-empty">O carrinho está vazio.</p>';
      return;
    }

    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <p>${item.qty} × ${formatPrice(item.price)}</p>
        </div>
        <button class="cart-item__remove" data-id="${item.id}">Remover</button>
      </div>
    `
      )
      .join('');

    // Bind remove buttons
    cartItemsEl.querySelectorAll('.cart-item__remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
      });
    });
  }

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      addToCart(card.dataset.id, card.dataset.name, card.dataset.price);
    });
  });

  // Checkout → WhatsApp
  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;

    const lines = cart.map(
      (item) => `• ${item.name} × ${item.qty} — ${formatPrice(item.price * item.qty)}`
    );
    const total = formatPrice(getTotal());
    const message = encodeURIComponent(
      `Olá! Gostaria de encomendar os seguintes produtos da Eldo Carmo:\n\n${lines.join('\n')}\n\nTotal: ${total}\n\nObrigado!`
    );

    window.open(`https://wa.me/244923929074?text=${message}`, '_blank');
  });

  // Initial render
  renderCart();

  // ---------- Service card → pre-fill booking ----------
  document.querySelectorAll('.agendar-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      const service = card?.dataset.service;
      const select = document.getElementById('bk-service');
      if (service && select) {
        select.value = service;
      }
    });
  });

  // ---------- Booking Form → WhatsApp ----------
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bk-name').value.trim();
    const phone = document.getElementById('bk-phone').value.trim();
    const people = document.getElementById('bk-people').value.trim();
    const service = document.getElementById('bk-service').value;
    const date = document.getElementById('bk-date').value;
    const time = document.getElementById('bk-time').value;
    const message = document.getElementById('bk-message').value.trim();

    if (!name || !service || !date || !time) return;

    // Format date for display (YYYY-MM-DD → DD/MM/YYYY)
    const [y, m, d] = date.split('-');
    const dateFormatted = `${d}/${m}/${y}`;

    let text = `Olá! Gostaria de agendar uma sessão na Eldo Carmo Barber Shop.\n\n`;
    text += `Nome: ${name}\n`;
    if (phone) text += `Telefone: ${phone}\n`;
    if (people) text += `Nº de pessoas: ${people}\n`;
    text += `Serviço: ${service}\n`;
    text += `Data: ${dateFormatted}\n`;
    text += `Hora: ${time}\n`;
    if (message) text += `\nNota: ${message}\n`;
    text += `\nObrigado!`;

    window.open(`https://wa.me/244923929074?text=${encodeURIComponent(text)}`, '_blank');
  });

  // ---------- Experience videos ----------
  document.querySelectorAll('.experience-card').forEach((card) => {
    const video = card.querySelector('.experience-card__video');
    const playBtn = card.querySelector('.experience-card__play');
    if (!video || !playBtn) return;

    const toggle = () => {
      if (video.paused) {
        // Pause others
        document.querySelectorAll('.experience-card__video').forEach((v) => {
          if (v !== video) {
            v.pause();
            v.closest('.experience-card')?.classList.remove('is-playing');
          }
        });
        video.play();
        card.classList.add('is-playing');
      } else {
        video.pause();
        card.classList.remove('is-playing');
      }
    };

    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });

    card.addEventListener('click', () => toggle());

    video.addEventListener('ended', () => {
      card.classList.remove('is-playing');
    });
  });

  // Experience carousel arrows
  const expTrack = document.getElementById('experience-track');
  const expPrev = document.getElementById('experience-prev');
  const expNext = document.getElementById('experience-next');

  if (expTrack && expPrev && expNext) {
    const scrollByCard = (dir) => {
      const card = expTrack.querySelector('.experience-card');
      if (!card) return;
      const step = card.offsetWidth + 16; // card + gap
      expTrack.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    const updateNav = () => {
      const maxScroll = expTrack.scrollWidth - expTrack.clientWidth - 2;
      expPrev.disabled = expTrack.scrollLeft <= 2;
      expNext.disabled = expTrack.scrollLeft >= maxScroll;
    };

    expPrev.addEventListener('click', () => scrollByCard(-1));
    expNext.addEventListener('click', () => scrollByCard(1));
    expTrack.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    updateNav();
  }

  // ---------- Header scroll effect ----------
  let lastScroll = 0;
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) {
      header.style.boxShadow = '0 1px 0 rgba(0,0,0,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = current;
  });
});
