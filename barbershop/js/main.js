/**
 * Eldo Carmo Barber Shop
 * Cart + Navigation + Contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Elements ----------
  const hamburger = document.getElementById('hamburger');
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartClearBtn = document.getElementById('cart-clear');
  const bookingForm = document.getElementById('booking-form');

  // ---------- State ----------
  let cart = JSON.parse(localStorage.getItem('eldocarmo_cart') || '[]');

  // ---------- Hero: still 5s → video 1 full → video 2 full (loop) ----------
  const heroStill = document.getElementById('hero-still');
  const heroVideo1 = document.getElementById('hero-video-1');
  const heroVideo2 = document.getElementById('hero-video-2');
  const heroDots = document.querySelectorAll('.hero__dot');
  let heroTimer = null;

  const setHeroDot = (i) => {
    heroDots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  };

  const hideAllHeroMedia = () => {
    heroStill?.classList.add('is-hidden');
    [heroVideo1, heroVideo2].forEach((v) => {
      if (!v) return;
      v.classList.remove('is-visible');
      v.pause();
      v.currentTime = 0;
    });
  };

  const showHeroSlide = (i) => {
    clearTimeout(heroTimer);
    hideAllHeroMedia();
    setHeroDot(i);

    if (i === 0) {
      heroStill?.classList.remove('is-hidden');
      heroTimer = setTimeout(() => showHeroSlide(1), 5000);
    } else if (i === 1 && heroVideo1) {
      heroVideo1.classList.add('is-visible');
      heroVideo1.play().catch(() => {});
    } else if (i === 2 && heroVideo2) {
      heroVideo2.classList.add('is-visible');
      heroVideo2.play().catch(() => {});
    }
  };

  if (heroStill && heroVideo1 && heroVideo2) {
    heroVideo1.addEventListener('ended', () => showHeroSlide(2));
    heroVideo2.addEventListener('ended', () => showHeroSlide(0));

    heroDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const go = parseInt(dot.dataset.heroGo, 10);
        if (!Number.isNaN(go)) showHeroSlide(go);
      });
    });

    heroStill.classList.remove('is-hidden');
    setHeroDot(0);
    heroTimer = setTimeout(() => showHeroSlide(1), 5000);
  }

  // ---------- Left menu drawer ----------
  const menuDrawer = document.getElementById('menu-drawer');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuClose = document.getElementById('menu-close');

  const openMenu = () => {
    if (!menuDrawer) return;
    menuDrawer.classList.add('is-open');
    menuDrawer.setAttribute('aria-hidden', 'false');
    if (hamburger) {
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    if (!menuDrawer) return;
    menuDrawer.classList.remove('is-open');
    menuDrawer.setAttribute('aria-hidden', 'true');
    if (hamburger) {
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('menu-open');
  };

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (menuDrawer && menuDrawer.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
  }
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);

  if (menuDrawer) {
    menuDrawer.querySelectorAll('.menu-drawer__link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
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
    const panel = cartDrawer.querySelector('.cart-drawer__panel');
    if (panel) {
      panel.style.transform = '';
      panel.style.transition = '';
    }
  }

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Swipe right to close cart panel (mobile)
  if (cartDrawer) {
    const panel = cartDrawer.querySelector('.cart-drawer__panel');
    let touchStartX = 0;
    let touchCurrentX = 0;
    let isDragging = false;

    panel?.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      isDragging = true;
      panel.style.transition = 'none';
    }, { passive: true });

    panel?.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartX;
      if (deltaX > 0) {
        panel.style.transform = `translateX(${deltaX}px)`;
      }
    }, { passive: true });

    panel?.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      panel.style.transition = '';
      const deltaX = touchCurrentX - touchStartX;
      if (deltaX > 80) {
        closeCart();
      } else {
        panel.style.transform = '';
      }
    });
  }

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

  function changeQty(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }
    saveCart();
  }

  function clearCart() {
    cart = [];
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
    const empty = cart.length === 0;

    cartCountEl.textContent = count;
    cartTotalEl.textContent = formatPrice(total);
    checkoutBtn.disabled = empty;
    if (cartClearBtn) cartClearBtn.disabled = empty;

    if (empty) {
      cartItemsEl.innerHTML = '<p class="cart-empty">O carrinho está vazio.</p>';
      return;
    }

    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price * item.qty)}</p>
        </div>
        <div class="cart-item__qty">
          <button type="button" class="cart-item__qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Diminuir">−</button>
          <span class="cart-item__qty-val">${item.qty}</span>
          <button type="button" class="cart-item__qty-btn" data-id="${item.id}" data-delta="1" aria-label="Aumentar">+</button>
        </div>
      </div>
    `
      )
      .join('');

    cartItemsEl.querySelectorAll('.cart-item__qty-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        changeQty(btn.dataset.id, Number(btn.dataset.delta));
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

  // Clear cart
  cartClearBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;
    clearCart();
  });

  // Checkout → WhatsApp
  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;

    const lines = cart.map(
      (item) => `• ${item.name} × ${item.qty} — ${formatPrice(item.price * item.qty)}`
    );
    const total = formatPrice(getTotal());
    const message = encodeURIComponent(
      `Olá! Gostaria de encomendar os seguintes produtos da Eldo Carmo Barber Shop:\n\n${lines.join('\n')}\n\nTotal: ${total}\n\nObrigado!`
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
        video.muted = false;
        video.play().catch(() => {});
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

  // ---------- Header scroll: transparent → solid; announce bar only at top ----------
  const header = document.getElementById('header');
  const announceBar = document.querySelector('.announce-bar');
  const onScrollHeader = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
      header.classList.toggle('announce-hidden', y > 20);
    }
    if (announceBar) {
      announceBar.classList.toggle('is-hidden', y > 20);
    }
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();
});
