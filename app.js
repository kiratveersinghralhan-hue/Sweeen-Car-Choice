/*
  Sween Car Choice Static Ecommerce Website
  - No Node.js and no npm required.
  - Works by opening index.html or uploading to GitHub Pages.
  - Supabase stores products, orders and inquiries when configured.
  - Payments can use a Razorpay Payment Link/Page pasted below, or WhatsApp follow-up.
*/

const CONFIG = {
  SUPABASE_URL: 'https://cbhgurjvteykadaichog.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaGd1cmp2dGV5a2FkYWljaG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzg3ODgsImV4cCI6MjA5MzgxNDc4OH0.ORDzwjoDef11pFYbWyD4twIGa7PqxJzrmKAuNEsURmA',
  RAZORPAY_PAYMENT_LINK: '', // Optional: paste a Razorpay Payment Link/Page URL. No backend needed.
  FORMSPREE_ENDPOINT: '', // Optional: paste your Formspree endpoint to receive order/inquiry emails
  SHOP_NAME: 'Sween Car Choice',
  SHOP_PHONE: '+919814951999',
  SHOP_ADDRESS: 'Near Yashodha Motor, above Union Bank, Lower Mall, Patiala, Punjab 147001',
  DEMO_ADMIN_EMAIL: 'demo@sweencarchoice.in',
  DEMO_ADMIN_PASSWORD: 'admin123'
};

const FALLBACK_PRODUCTS = [
  {
    id: 'demo-android-creta',
    name: '9 inch Android Stereo with Wireless CarPlay',
    brand: 'Sween Premium',
    category: 'Audio',
    price: 14999,
    compare_price: 18999,
    qty: 6,
    make: 'Hyundai',
    model: 'Creta',
    year_from: 2018,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=Android+Stereo',
    description: 'A premium Android infotainment upgrade with wireless CarPlay, Android Auto, steering controls and HD display support.',
    specs: { Warranty: '1 year', Installation: 'Available in Patiala', Display: '9 inch HD', Connectivity: 'Wireless CarPlay / Android Auto' },
    featured: true
  },
  {
    id: 'demo-bass-tube',
    name: 'High Bass Active Subwoofer Tube',
    brand: 'BassX',
    category: 'Audio',
    price: 7999,
    compare_price: 9999,
    qty: 4,
    make: 'Any',
    model: 'Universal',
    year_from: 2010,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=Active+Subwoofer',
    description: 'Compact bass tube with built-in amplifier for deep punchy sound without taking over the boot space.',
    specs: { Power: '600W peak', Fitment: 'Universal', Warranty: '6 months' },
    featured: true
  },
  {
    id: 'demo-gps-tracker',
    name: 'GPS Vehicle Tracker with Mobile App',
    brand: 'TrackPro',
    category: 'GPS',
    price: 3499,
    compare_price: 4999,
    qty: 9,
    make: 'Any',
    model: 'Universal',
    year_from: 2008,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=GPS+Tracker',
    description: 'Live vehicle tracking, trip history and geo-fence alerts for personal and commercial vehicles.',
    specs: { App: 'Android / iOS', Alerts: 'Ignition, geo-fence', Fitment: 'Universal' },
    featured: true
  },
  {
    id: 'demo-seat-cover-thar',
    name: 'Luxury Leatherette Seat Cover Set',
    brand: 'AutoFit',
    category: 'Seat Covers',
    price: 11999,
    compare_price: 15499,
    qty: 3,
    make: 'Mahindra',
    model: 'Thar',
    year_from: 2020,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=Seat+Covers',
    description: 'Custom-fit leatherette seat covers with premium stitch pattern, foam padding and showroom finish.',
    specs: { Material: 'Leatherette', Fitment: 'Custom Thar 2020+', Cleaning: 'Easy wipe' },
    featured: false
  },
  {
    id: 'demo-led-fog',
    name: 'Projector LED Fog Lamp Kit',
    brand: 'LumaDrive',
    category: 'Lighting',
    price: 5999,
    compare_price: 7499,
    qty: 7,
    make: 'Maruti Suzuki',
    model: 'Swift',
    year_from: 2017,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=LED+Fog+Lamp',
    description: 'Bright projector fog lamp setup for improved night visibility and a premium front profile.',
    specs: { Beam: 'Projector', Color: 'White / Yellow', Installation: 'Bumper fitment' },
    featured: false
  },
  {
    id: 'demo-4x4-lightbar',
    name: '4x4 Off-road LED Light Bar',
    brand: 'TrailMax',
    category: '4x4',
    price: 8999,
    compare_price: 11999,
    qty: 2,
    make: 'Mahindra',
    model: 'Thar',
    year_from: 2015,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=4x4+Light+Bar',
    description: 'Heavy-duty LED light bar for adventure builds, highway presence and off-road visibility.',
    specs: { Length: '20 inch', Housing: 'Weather-resistant', Fitment: 'Roof / bumper mount' },
    featured: true
  },
  {
    id: 'demo-camera',
    name: 'HD Reverse Camera with Night Vision',
    brand: 'ParkSafe',
    category: 'Accessories',
    price: 2299,
    compare_price: 2999,
    qty: 12,
    make: 'Any',
    model: 'Universal',
    year_from: 2008,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=Reverse+Camera',
    description: 'Water-resistant HD reverse camera with guide lines and night visibility support.',
    specs: { Resolution: 'HD', NightVision: 'Yes', Fitment: 'Universal' },
    featured: false
  },
  {
    id: 'demo-creta-ambient',
    name: 'RGB Ambient Light Kit',
    brand: 'GlowRide',
    category: 'Lighting',
    price: 6499,
    compare_price: 8499,
    qty: 5,
    make: 'Hyundai',
    model: 'Creta',
    year_from: 2020,
    year_to: 2026,
    image_url: 'https://placehold.co/900x650/f3f4f6/111827?text=Ambient+Light',
    description: 'App-controlled interior ambient lighting kit with smooth colour modes and clean wire hiding.',
    specs: { Control: 'Mobile app', Modes: 'Music sync', Installation: 'Dashboard + doors' },
    featured: false
  }
];

const FALLBACK_COUPONS = [
  { id: 'coupon-sween10', code: 'SWEEN10', type: 'percent', value: 10, min_cart: 5000, active: true },
  { id: 'coupon-audio500', code: 'AUDIO500', type: 'flat', value: 500, min_cart: 8000, active: true }
];

let db = null;
let currentUser = null;
let isDemoAdmin = false;
let products = [];
let coupons = [];
let orders = [];
let inquiries = [];
let cart = loadLocal('sween_pro_cart', []);
let appliedCoupon = null;
let activeFilters = { query: '', make: '', model: '', year: '', category: '' };
let editingProductId = null;

const els = {};

function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }
function money(value) { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0)); }
function slugify(value) { return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function validConfig(value, placeholder) { return value && value !== placeholder && !String(value).startsWith('PASTE_'); }
function loadLocal(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function saveLocal(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function byId(id) { return products.find(p => String(p.id) === String(id)); }
function normalizeProduct(product) {
  return {
    ...product,
    price: Number(product.price || 0),
    compare_price: Number(product.compare_price || 0),
    qty: Number(product.qty || 0),
    year_from: Number(product.year_from || 0),
    year_to: Number(product.year_to || 9999),
    specs: typeof product.specs === 'string' ? safeJson(product.specs, {}) : (product.specs || {})
  };
}
function safeJson(text, fallback) {
  try { return JSON.parse(text || '{}'); } catch { return fallback; }
}
function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.remove('show'), 2600);
}

function initSupabase() {
  if (!validConfig(CONFIG.SUPABASE_URL, 'https://cbhgurjvteykadaichog.supabase.co') || !validConfig(CONFIG.SUPABASE_ANON_KEY, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaGd1cmp2dGV5a2FkYWljaG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMzg3ODgsImV4cCI6MjA5MzgxNDc4OH0.ORDzwjoDef11pFYbWyD4twIGa7PqxJzrmKAuNEsURmA')) {
    return;
  }
  if (!window.supabase) {
    console.warn('Supabase library not loaded. Using local demo data.');
    return;
  }
  db = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
}

async function init() {
  cacheEls();
  initSupabase();
  bindEvents();
  initRevealAnimations();
  initHeaderActiveState();
  initHeroFitmentLoop();
  await loadData();
  updateCartUI();
  setTimeout(() => qs('#intro')?.classList.add('hide'), 1450);
}

function cacheEls() {
  Object.assign(els, {
    productGrid: qs('#productGrid'),
    resultCount: qs('#resultCount'),
    emptyState: qs('#emptyState'),
    searchInput: qs('#searchInput'),
    makeSelect: qs('#makeSelect'),
    modelSelect: qs('#modelSelect'),
    yearSelect: qs('#yearSelect'),
    categorySelect: qs('#categorySelect'),
    sortSelect: qs('#sortSelect'),
    resetFilters: qs('#resetFilters'),
    cartCount: qs('#cartCount'),
    cartDrawer: qs('#cartDrawer'),
    openCart: qs('#openCart'),
    closeCart: qs('#closeCart'),
    cartItems: qs('#cartItems'),
    subtotalText: qs('#subtotalText'),
    discountText: qs('#discountText'),
    shippingText: qs('#shippingText'),
    totalText: qs('#totalText'),
    couponInput: qs('#couponInput'),
    applyCoupon: qs('#applyCoupon'),
    couponMessage: qs('#couponMessage'),
    checkoutBtn: qs('#checkoutBtn'),
    checkoutResult: qs('#checkoutResult'),
    customerName: qs('#customerName'),
    customerPhone: qs('#customerPhone'),
    customerEmail: qs('#customerEmail'),
    checkoutReason: qs('#checkoutReason'),
    customerAddress: qs('#customerAddress'),
    modalBackdrop: qs('#modalBackdrop'),
    productModal: qs('#productModal'),
    modalContent: qs('#modalContent'),
    closeModal: qs('#closeModal'),
    toast: qs('#toast'),
    themeToggle: qs('#themeToggle'),
    adminLogin: qs('#adminLogin'),
    adminPanel: qs('#adminPanel'),
    adminEmail: qs('#adminEmail'),
    adminPassword: qs('#adminPassword'),
    loginBtn: qs('#loginBtn'),
    loginHint: qs('#loginHint'),
    logoutBtn: qs('#logoutBtn'),
    productForm: qs('#productForm'),
    adminProducts: qs('#adminProducts'),
    clearProductForm: qs('#clearProductForm'),
    couponForm: qs('#couponForm'),
    couponList: qs('#couponList'),
    adminOrders: qs('#adminOrders'),
    adminInquiries: qs('#adminInquiries'),
    inquiryForm: qs('#inquiryForm'),
    inquiryName: qs('#inquiryName'),
    inquiryPhone: qs('#inquiryPhone'),
    inquiryEmail: qs('#inquiryEmail'),
    inquiryReason: qs('#inquiryReason'),
    inquiryProduct: qs('#inquiryProduct'),
    inquiryCar: qs('#inquiryCar'),
    inquiryMessage: qs('#inquiryMessage'),
    inquiryHint: qs('#inquiryHint')
  });
}

function bindEvents() {
  els.searchInput.addEventListener('input', () => { activeFilters.query = els.searchInput.value.trim(); renderProducts(); });
  els.makeSelect.addEventListener('change', () => { activeFilters.make = els.makeSelect.value; activeFilters.model = ''; populateFilters(); renderProducts(); });
  els.modelSelect.addEventListener('change', () => { activeFilters.model = els.modelSelect.value; renderProducts(); });
  els.yearSelect.addEventListener('change', () => { activeFilters.year = els.yearSelect.value; renderProducts(); });
  els.categorySelect.addEventListener('change', () => { activeFilters.category = els.categorySelect.value; syncCategoryChips(); renderProducts(); });
  els.sortSelect.addEventListener('change', renderProducts);
  els.resetFilters.addEventListener('click', resetFilters);

  qsa('.quick-categories button').forEach(button => {
    button.addEventListener('click', () => {
      activeFilters.category = button.dataset.category;
      els.categorySelect.value = button.dataset.category;
      syncCategoryChips();
      renderProducts();
      location.hash = '#catalog';
    });
  });

  els.openCart.addEventListener('click', openCart);
  els.closeCart.addEventListener('click', closeCart);
  els.applyCoupon.addEventListener('click', applyCouponFromInput);
  els.checkoutBtn.addEventListener('click', checkout);
  els.closeModal.addEventListener('click', closeModal);
  els.modalBackdrop.addEventListener('click', closeModal);
  els.themeToggle.addEventListener('click', toggleTheme);

  els.loginBtn.addEventListener('click', adminLogin);
  els.logoutBtn.addEventListener('click', adminLogout);
  els.productForm.addEventListener('submit', saveProductFromForm);
  els.clearProductForm.addEventListener('click', clearProductForm);
  els.couponForm.addEventListener('submit', saveCouponFromForm);
  els.inquiryForm.addEventListener('submit', submitInquiry);

  document.addEventListener('click', handleDelegatedClicks);
}

async function loadData() {
  if (db) {
    try {
      const [{ data: productRows, error: productError }, { data: couponRows, error: couponError }] = await Promise.all([
        db.from('products').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false }),
        db.from('coupons').select('*').eq('active', true).order('created_at', { ascending: false })
      ]);
      if (productError) throw productError;
      if (couponError) throw couponError;
      products = (productRows?.length ? productRows : FALLBACK_PRODUCTS).map(normalizeProduct);
      coupons = couponRows?.length ? couponRows : FALLBACK_COUPONS;
    } catch (error) {
      console.warn('Supabase load failed, using local demo data:', error.message);
      products = loadLocal('sween_pro_products', FALLBACK_PRODUCTS).map(normalizeProduct);
      coupons = loadLocal('sween_pro_coupons', FALLBACK_COUPONS);
      toast('Using demo data. Check Supabase config/RLS if needed.');
    }
  } else {
    products = loadLocal('sween_pro_products', FALLBACK_PRODUCTS).map(normalizeProduct);
    coupons = loadLocal('sween_pro_coupons', FALLBACK_COUPONS);
  }
  saveLocal('sween_pro_products', products);
  saveLocal('sween_pro_coupons', coupons);
  populateFilters();
  renderProducts();
  renderAdminProducts();
  renderCoupons();
}

function populateFilters() {
  const makes = unique(products.map(p => p.make).filter(Boolean));
  const models = unique(products
    .filter(p => !activeFilters.make || p.make === activeFilters.make || p.make === 'Any')
    .map(p => p.model)
    .filter(Boolean));
  const categories = unique(products.map(p => p.category).filter(Boolean));
  const years = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => 2026 - i);

  fillSelect(els.makeSelect, makes, 'Any make', activeFilters.make);
  fillSelect(els.modelSelect, models, 'Any model', activeFilters.model);
  fillSelect(els.categorySelect, categories, 'All categories', activeFilters.category);
  fillSelect(els.yearSelect, years, 'Any year', activeFilters.year);
}

function unique(values) { return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b))); }
function fillSelect(select, values, first, selected) {
  select.innerHTML = `<option value="">${first}</option>` + values.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('');
  select.value = selected || '';
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[ch]));
}

function filteredProducts() {
  const query = activeFilters.query.toLowerCase();
  let list = products.filter(product => {
    const matchesQuery = !query || [product.name, product.brand, product.category, product.description, product.make, product.model].join(' ').toLowerCase().includes(query);
    const matchesMake = !activeFilters.make || product.make === activeFilters.make || product.make === 'Any';
    const matchesModel = !activeFilters.model || product.model === activeFilters.model || product.model === 'Universal';
    const year = Number(activeFilters.year || 0);
    const matchesYear = !year || (Number(product.year_from || 0) <= year && Number(product.year_to || 9999) >= year);
    const matchesCategory = !activeFilters.category || product.category === activeFilters.category;
    return matchesQuery && matchesMake && matchesModel && matchesYear && matchesCategory;
  });

  const sort = els.sortSelect.value;
  list = [...list].sort((a, b) => {
    if (sort === 'priceLow') return a.price - b.price;
    if (sort === 'priceHigh') return b.price - a.price;
    if (sort === 'stock') return b.qty - a.qty;
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
  return list;
}

function renderProducts() {
  const list = filteredProducts();
  els.resultCount.textContent = list.length;
  els.emptyState.classList.toggle('hidden', list.length > 0);
  els.productGrid.innerHTML = list.map(productCard).join('');
}

function productCard(product) {
  const out = product.qty <= 0;
  return `
    <article class="product-card reveal in" data-id="${escapeHtml(product.id)}">
      <img class="product-img" src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='https://placehold.co/900x650/f3f4f6/111827?text=Sween+Car+Choice'" />
      <div class="card-body">
        <div class="card-top">
          <span class="badge">${escapeHtml(product.category || 'Part')}</span>
          <span class="stock ${out ? 'out' : ''}">${out ? 'Out of stock' : `${product.qty} left`}</span>
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <div class="rating">★★★★★ <span>4.${(String(product.id).length % 5) + 4}</span></div>
        <div class="fitment">${escapeHtml(product.make || 'Any')} ${escapeHtml(product.model || 'Universal')} • ${product.year_from || 2010}-${product.year_to || 2026}</div>
        <div class="price-row"><span class="price">${money(product.price)}</span>${product.compare_price ? `<span class="compare">${money(product.compare_price)}</span>` : ''}</div>
        <div class="card-actions">
          <button class="secondary-btn view-product" data-id="${escapeHtml(product.id)}">View</button>
          <button class="primary-btn add-cart" data-id="${escapeHtml(product.id)}" ${out ? 'disabled' : ''}>Add</button>
        </div>
      </div>
    </article>`;
}

function resetFilters() {
  activeFilters = { query: '', make: '', model: '', year: '', category: '' };
  els.searchInput.value = '';
  populateFilters();
  syncCategoryChips();
  renderProducts();
}

function syncCategoryChips() {
  qsa('.quick-categories button').forEach(button => button.classList.toggle('active', button.dataset.category === activeFilters.category));
}

function handleDelegatedClicks(event) {
  const add = event.target.closest('.add-cart');
  const view = event.target.closest('.view-product');
  const remove = event.target.closest('.remove-cart');
  const qty = event.target.closest('.qty-btn');
  const edit = event.target.closest('.edit-product');
  const del = event.target.closest('.delete-product');
  const similar = event.target.closest('.similar-card');
  const delCoupon = event.target.closest('.delete-coupon');
  const inquire = event.target.closest('.inquire-product');

  if (add) addToCart(add.dataset.id);
  if (view) openProductModal(view.dataset.id);
  if (remove) removeFromCart(remove.dataset.id);
  if (qty) changeCartQty(qty.dataset.id, Number(qty.dataset.delta));
  if (edit) editProduct(edit.dataset.id);
  if (del) deleteProduct(del.dataset.id);
  if (similar) openProductModal(similar.dataset.id);
  if (delCoupon) deleteCoupon(delCoupon.dataset.id);
  if (inquire) startProductInquiry(inquire.dataset.id);
}

function addToCart(id) {
  const product = byId(id);
  if (!product || product.qty <= 0) return toast('This product is out of stock.');
  const existing = cart.find(item => String(item.id) === String(id));
  if (existing) existing.qty = Math.min(existing.qty + 1, product.qty);
  else cart.push({ id, qty: 1 });
  saveLocal('sween_pro_cart', cart);
  updateCartUI();
  toast('Added to cart');
}

function removeFromCart(id) {
  cart = cart.filter(item => String(item.id) !== String(id));
  saveLocal('sween_pro_cart', cart);
  updateCartUI();
}

function changeCartQty(id, delta) {
  const item = cart.find(i => String(i.id) === String(id));
  const product = byId(id);
  if (!item || !product) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);
  item.qty = Math.min(item.qty, product.qty);
  saveLocal('sween_pro_cart', cart);
  updateCartUI();
}

function getCartDetails() {
  const items = cart.map(item => ({ ...item, product: byId(item.id) })).filter(item => item.product);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  let discount = 0;
  if (appliedCoupon) {
    if (subtotal < Number(appliedCoupon.min_cart || 0)) {
      appliedCoupon = null;
    } else if (appliedCoupon.type === 'percent') {
      discount = Math.round(subtotal * (Number(appliedCoupon.value || 0) / 100));
    } else {
      discount = Number(appliedCoupon.value || 0);
    }
  }
  discount = Math.min(discount, subtotal);
  const shipping = subtotal - discount > 0 && subtotal - discount < 5000 ? 199 : 0;
  const total = Math.max(0, subtotal - discount + shipping);
  return { items, subtotal, discount, shipping, total };
}

function updateCartUI() {
  const details = getCartDetails();
  els.cartCount.textContent = details.items.reduce((sum, item) => sum + item.qty, 0);
  els.cartItems.innerHTML = details.items.length ? details.items.map(cartItemMarkup).join('') : '<div class="empty-state"><h3>Your cart is empty</h3><p>Add accessories from the catalog.</p></div>';
  els.subtotalText.textContent = money(details.subtotal);
  els.discountText.textContent = `-${money(details.discount)}`;
  els.shippingText.textContent = details.shipping ? money(details.shipping) : 'Free';
  els.totalText.textContent = money(details.total);
  if (appliedCoupon) els.couponMessage.textContent = `${appliedCoupon.code} applied.`;
}

function cartItemMarkup(item) {
  const product = item.product;
  return `
    <div class="cart-item">
      <img src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}" />
      <div>
        <h4>${escapeHtml(product.name)}</h4>
        <p>${money(product.price)} • ${escapeHtml(product.category)}</p>
        <div class="qty-control">
          <button class="qty-btn" data-id="${escapeHtml(product.id)}" data-delta="-1">−</button>
          <strong>${item.qty}</strong>
          <button class="qty-btn" data-id="${escapeHtml(product.id)}" data-delta="1">+</button>
        </div>
      </div>
      <button class="icon-btn remove-cart" data-id="${escapeHtml(product.id)}">×</button>
    </div>`;
}

function openCart() { els.cartDrawer.classList.add('open'); els.cartDrawer.setAttribute('aria-hidden', 'false'); }
function closeCart() { els.cartDrawer.classList.remove('open'); els.cartDrawer.setAttribute('aria-hidden', 'true'); }

function applyCouponFromInput() {
  const code = els.couponInput.value.trim().toUpperCase();
  const details = getCartDetails();
  const coupon = coupons.find(c => c.active !== false && String(c.code).toUpperCase() === code);
  if (!code) return toast('Enter coupon code.');
  if (!coupon) {
    appliedCoupon = null;
    els.couponMessage.textContent = 'Invalid coupon.';
    updateCartUI();
    return;
  }
  if (details.subtotal < Number(coupon.min_cart || 0)) {
    els.couponMessage.textContent = `Minimum cart ${money(coupon.min_cart)} required.`;
    return;
  }
  appliedCoupon = coupon;
  updateCartUI();
  toast('Coupon applied');
}

function openProductModal(id) {
  const product = byId(id);
  if (!product) return;
  const specs = Object.entries(product.specs || {}).map(([key, value]) => `<div><span>${escapeHtml(key)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
  const similar = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.make === product.make))
    .slice(0, 3);
  els.modalContent.innerHTML = `
    <div class="modal-layout">
      <img class="modal-img" src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}" />
      <div class="modal-info">
        <span class="badge">${escapeHtml(product.category)}</span>
        <h2>${escapeHtml(product.name)}</h2>
        <div class="rating">★★★★★ Verified style product</div>
        <p>${escapeHtml(product.description || 'Premium automotive upgrade available at Sween Car Choice Patiala.')}</p>
        <div class="price-row"><span class="price">${money(product.price)}</span>${product.compare_price ? `<span class="compare">${money(product.compare_price)}</span>` : ''}</div>
        <p><strong>Fitment:</strong> ${escapeHtml(product.make || 'Any')} ${escapeHtml(product.model || 'Universal')} • ${product.year_from || 2010}-${product.year_to || 2026}</p>
        <div class="spec-grid">${specs || '<div><span>Installation</span><strong>Available</strong></div><div><span>Support</span><strong>Shop support</strong></div>'}</div>
        <div class="hero-actions">
          <button class="primary-btn add-cart" data-id="${escapeHtml(product.id)}">Add to cart</button>
          <button class="secondary-btn inquire-product" data-id="${escapeHtml(product.id)}">Send inquiry</button>
          <a class="secondary-btn" href="https://wa.me/919814951999?text=${encodeURIComponent(`I want details for ${product.name}`)}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
    ${similar.length ? `<div class="similar-products"><h3>Similar products</h3><div class="similar-row">${similar.map(similarCard).join('')}</div></div>` : ''}`;
  els.modalBackdrop.classList.remove('hidden');
  els.productModal.classList.remove('hidden');
  els.productModal.setAttribute('aria-hidden', 'false');
}

function similarCard(product) {
  return `<div class="similar-card" data-id="${escapeHtml(product.id)}"><img src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}" /><strong>${escapeHtml(product.name)}</strong><span>${money(product.price)}</span></div>`;
}
function closeModal() { els.modalBackdrop.classList.add('hidden'); els.productModal.classList.add('hidden'); els.productModal.setAttribute('aria-hidden', 'true'); }

async function checkout() {
  const details = getCartDetails();
  if (!details.items.length) return toast('Cart is empty.');
  const customer = {
    name: els.customerName.value.trim(),
    phone: els.customerPhone.value.trim(),
    email: els.customerEmail.value.trim(),
    reason: els.checkoutReason.value.trim(),
    address: els.customerAddress.value.trim()
  };
  if (!customer.name || !customer.phone) return toast('Name and phone are required.');

  try {
    els.checkoutBtn.disabled = true;
    els.checkoutBtn.textContent = 'Saving order...';
    const order = await saveOrder({ customer, details, payment: { mode: 'static', status: 'pending_contact' } });
    showStaticCheckoutResult(order, customer, details);
    cart = [];
    appliedCoupon = null;
    saveLocal('sween_pro_cart', cart);
    updateCartUI();
    toast('Order saved. Contact/payment options are ready.');
  } catch (error) {
    console.error(error);
    toast('Order save failed. Check Supabase/Formspree settings.');
  } finally {
    els.checkoutBtn.disabled = false;
    els.checkoutBtn.textContent = 'Place order / Send inquiry';
  }
}

function showStaticCheckoutResult(order, customer, details) {
  if (!els.checkoutResult) return;
  const summary = buildOrderSummary(customer, details, order);
  const whatsappUrl = `https://wa.me/${CONFIG.SHOP_PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(summary)}`;
  const razorpayLink = validConfig(CONFIG.RAZORPAY_PAYMENT_LINK, 'PASTE_RAZORPAY_PAYMENT_LINK_HERE') ? CONFIG.RAZORPAY_PAYMENT_LINK : '';
  els.checkoutResult.classList.remove('hidden');
  els.checkoutResult.innerHTML = `
    <strong>Order saved successfully.</strong>
    <span>The shop can now contact the customer from Admin → Recent orders.</span>
    <div class="checkout-actions">
      <a class="secondary-btn" href="${whatsappUrl}" target="_blank" rel="noopener">Send on WhatsApp</a>
      ${razorpayLink ? `<a class="primary-btn" href="${escapeHtml(razorpayLink)}" target="_blank" rel="noopener">Pay with Razorpay</a>` : ''}
    </div>
    ${razorpayLink ? '<small>Payment link mode is mobile-friendly and needs no backend.</small>' : '<small>Add a Razorpay Payment Link in app.js to show a payment button here.</small>'}
  `;
}

function buildOrderSummary(customer, details, order) {
  const lines = [
    `${CONFIG.SHOP_NAME} order request`,
    `Order ID: ${order.id || 'saved'}`,
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    customer.email ? `Email: ${customer.email}` : '',
    customer.reason ? `Reason: ${customer.reason}` : '',
    customer.address ? `Address/notes: ${customer.address}` : '',
    '',
    'Items:',
    ...details.items.map(item => `- ${item.qty} x ${item.product.name} (${money(item.product.price)} each)`),
    '',
    `Subtotal: ${money(details.subtotal)}`,
    `Discount: ${money(details.discount)}`,
    `Delivery: ${details.shipping ? money(details.shipping) : 'Free'}`,
    `Total: ${money(details.total)}`,
    appliedCoupon?.code ? `Coupon: ${appliedCoupon.code}` : ''
  ];
  return lines.filter(Boolean).join('\n');
}


async function saveOrder({ customer, details, payment }) {
  const order = {
    customer_name: customer.name,
    customer_phone: customer.phone,
    customer_email: customer.email,
    customer_reason: customer.reason || 'Online product order',
    customer_address: customer.address,
    items: details.items.map(item => ({ id: item.product.id, name: item.product.name, qty: item.qty, price: item.product.price })),
    subtotal: details.subtotal,
    discount: details.discount,
    shipping: details.shipping,
    total: details.total,
    coupon_code: appliedCoupon?.code || null,
    payment_status: payment.status || 'pending',
    razorpay_payment_id: payment.razorpay_payment_id || null,
    razorpay_order_id: payment.razorpay_order_id || payment.orderData?.id || null
  };
  let savedOrder = { ...order, id: cryptoRandomId(), created_at: new Date().toISOString() };
  if (db) {
    const { error } = await db.from('orders').insert(order);
    if (error) console.warn('Order insert failed:', error.message);
  }
  const localOrders = loadLocal('sween_pro_orders', []);
  localOrders.unshift(savedOrder);
  saveLocal('sween_pro_orders', localOrders);
  orders = localOrders;
  renderAdminOrders();
  await sendFormspree('New Sween Car Choice order', savedOrder);
  return savedOrder;
}

async function sendFormspree(subject, payload) {
  if (!CONFIG.FORMSPREE_ENDPOINT) return;
  try {
    await fetch(CONFIG.FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ subject, shop: CONFIG.SHOP_NAME, ...payload })
    });
  } catch (error) {
    console.warn('Formspree notification failed:', error.message);
  }
}

function startProductInquiry(id) {
  const product = byId(id);
  if (!product) return;
  closeModal();
  location.hash = '#inquiry';
  setTimeout(() => {
    els.inquiryProduct.value = product.name;
    els.inquiryReason.value = 'Product availability';
    els.inquiryMessage.value = `I want details for ${product.name}. Please contact me.`;
    els.inquiryName.focus();
  }, 120);
}

async function submitInquiry(event) {
  event.preventDefault();
  const inquiry = {
    customer_name: els.inquiryName.value.trim(),
    customer_phone: els.inquiryPhone.value.trim(),
    customer_email: els.inquiryEmail.value.trim(),
    reason: els.inquiryReason.value.trim(),
    product_interest: els.inquiryProduct.value.trim(),
    car_details: els.inquiryCar.value.trim(),
    message: els.inquiryMessage.value.trim(),
    status: 'new'
  };
  if (!inquiry.customer_name || !inquiry.customer_phone || !inquiry.reason) {
    return toast('Name, phone and reason are required.');
  }

  try {
    if (db) {
      const { error } = await db.from('inquiries').insert(inquiry);
      if (error) throw error;
    }
    const localInquiries = loadLocal('sween_pro_inquiries', []);
    const stored = { ...inquiry, id: cryptoRandomId(), created_at: new Date().toISOString() };
    localInquiries.unshift(stored);
    saveLocal('sween_pro_inquiries', localInquiries);
    inquiries = localInquiries;
    renderAdminInquiries();
    await sendFormspree('New Sween Car Choice inquiry', stored);
    els.inquiryForm.reset();
    els.inquiryHint.textContent = 'Inquiry saved. The shop can contact the customer from this record.';
    toast('Inquiry saved successfully');
  } catch (error) {
    console.error(error);
    els.inquiryHint.textContent = error.message || 'Inquiry save failed.';
    toast('Inquiry save failed. Check Supabase setup.');
  }
}


function cryptoRandomId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function adminLogin() {
  const email = els.adminEmail.value.trim().toLowerCase();
  const password = els.adminPassword.value;
  els.loginHint.textContent = '';

  if (!db) {
    if (email === CONFIG.DEMO_ADMIN_EMAIL && password === CONFIG.DEMO_ADMIN_PASSWORD) {
      isDemoAdmin = true;
      showAdminPanel(true);
      toast('Demo admin logged in');
    } else {
      els.loginHint.textContent = 'Demo mode: use demo@sweencarchoice.in / admin123, or configure Supabase.';
    }
    return;
  }

  try {
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    currentUser = data.user;
    const { data: adminRows, error: adminError } = await db.from('admins').select('email').eq('email', email).limit(1);
    if (adminError) throw adminError;
    if (!adminRows?.length) throw new Error('This email is not in the admins table.');
    showAdminPanel(true);
    toast('Admin logged in');
  } catch (error) {
    els.loginHint.textContent = error.message;
  }
}

async function adminLogout() {
  if (db) await db.auth.signOut();
  currentUser = null;
  isDemoAdmin = false;
  showAdminPanel(false);
}

function showAdminPanel(show) {
  els.adminLogin.classList.toggle('hidden', show);
  els.adminPanel.classList.toggle('hidden', !show);
  if (show) {
    renderAdminProducts();
    renderCoupons();
    loadAdminRecords();
  }
}

function clearProductForm() {
  editingProductId = null;
  els.productForm.reset();
  qs('#productId').value = '';
  qs('#pSpecs').value = '{"Warranty":"1 year","Installation":"Available"}';
}

function readProductForm() {
  const specsText = qs('#pSpecs').value.trim();
  return {
    name: qs('#pName').value.trim(),
    slug: slugify(qs('#pName').value),
    brand: qs('#pBrand').value.trim(),
    category: qs('#pCategory').value.trim(),
    price: Number(qs('#pPrice').value),
    compare_price: Number(qs('#pCompare').value || 0),
    qty: Number(qs('#pQty').value),
    make: qs('#pMake').value.trim() || 'Any',
    model: qs('#pModel').value.trim() || 'Universal',
    year_from: Number(qs('#pYearFrom').value || 2010),
    year_to: Number(qs('#pYearTo').value || 2026),
    image_url: qs('#pImage').value.trim() || 'https://placehold.co/900x650/f3f4f6/111827?text=Sween+Car+Choice',
    description: qs('#pDesc').value.trim(),
    specs: specsText ? safeJson(specsText, {}) : {},
    featured: qs('#pFeatured').checked
  };
}

async function uploadProductImageIfAny() {
  const file = qs('#pImageFile').files?.[0];
  if (!file) return '';
  if (!db) {
    return await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }
  const fileExt = file.name.split('.').pop();
  const path = `${Date.now()}-${slugify(file.name)}.${fileExt}`;
  const { error } = await db.storage.from('product-images').upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = db.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

async function saveProductFromForm(event) {
  event.preventDefault();
  const product = readProductForm();
  if (!product.name || !product.category || product.price < 0) return toast('Fill required product fields.');
  try {
    const uploadedUrl = await uploadProductImageIfAny();
    if (uploadedUrl) product.image_url = uploadedUrl;

    if (db && currentUser) {
      if (editingProductId) {
        const { error } = await db.from('products').update(product).eq('id', editingProductId);
        if (error) throw error;
      } else {
        const { error } = await db.from('products').insert(product);
        if (error) throw error;
      }
      await loadData();
    } else {
      if (editingProductId) {
        products = products.map(p => String(p.id) === String(editingProductId) ? normalizeProduct({ ...p, ...product }) : p);
      } else {
        products.unshift(normalizeProduct({ ...product, id: cryptoRandomId() }));
      }
      saveLocal('sween_pro_products', products);
      populateFilters();
      renderProducts();
      renderAdminProducts();
    }
    clearProductForm();
    toast('Product saved');
  } catch (error) {
    console.error(error);
    toast(error.message || 'Product save failed.');
  }
}

function editProduct(id) {
  const product = byId(id);
  if (!product) return;
  editingProductId = id;
  qs('#productId').value = product.id;
  qs('#pName').value = product.name || '';
  qs('#pBrand').value = product.brand || '';
  qs('#pCategory').value = product.category || '';
  qs('#pPrice').value = product.price || 0;
  qs('#pCompare').value = product.compare_price || '';
  qs('#pQty').value = product.qty || 0;
  qs('#pMake').value = product.make || '';
  qs('#pModel').value = product.model || '';
  qs('#pYearFrom').value = product.year_from || '';
  qs('#pYearTo').value = product.year_to || '';
  qs('#pImage').value = product.image_url || '';
  qs('#pDesc').value = product.description || '';
  qs('#pSpecs').value = JSON.stringify(product.specs || {}, null, 2);
  qs('#pFeatured').checked = Boolean(product.featured);
  location.hash = '#admin';
  toast('Editing product');
}

async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  try {
    if (db && currentUser) {
      const { error } = await db.from('products').delete().eq('id', id);
      if (error) throw error;
      await loadData();
    } else {
      products = products.filter(p => String(p.id) !== String(id));
      saveLocal('sween_pro_products', products);
      populateFilters();
      renderProducts();
      renderAdminProducts();
    }
    toast('Product deleted');
  } catch (error) {
    toast(error.message || 'Delete failed');
  }
}

function renderAdminProducts() {
  if (!els.adminProducts) return;
  els.adminProducts.innerHTML = products.map(product => `
    <div class="admin-row">
      <img src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}" />
      <div><h4>${escapeHtml(product.name)}</h4><p>${money(product.price)} • Qty ${product.qty} • ${escapeHtml(product.category)}</p></div>
      <div class="row-actions">
        <button class="edit-product" data-id="${escapeHtml(product.id)}">Edit</button>
        <button class="delete-product" data-id="${escapeHtml(product.id)}">Delete</button>
      </div>
    </div>`).join('');
}

async function saveCouponFromForm(event) {
  event.preventDefault();
  const coupon = {
    code: qs('#cCode').value.trim().toUpperCase(),
    type: qs('#cType').value,
    value: Number(qs('#cValue').value),
    min_cart: Number(qs('#cMin').value || 0),
    active: true
  };
  try {
    if (db && currentUser) {
      const { error } = await db.from('coupons').insert(coupon);
      if (error) throw error;
      await loadData();
    } else {
      coupons.unshift({ ...coupon, id: cryptoRandomId() });
      saveLocal('sween_pro_coupons', coupons);
      renderCoupons();
    }
    els.couponForm.reset();
    toast('Coupon saved');
  } catch (error) {
    toast(error.message || 'Coupon save failed');
  }
}

function renderCoupons() {
  if (!els.couponList) return;
  els.couponList.innerHTML = coupons.map(coupon => `
    <div class="coupon-item">
      <div><strong>${escapeHtml(coupon.code)}</strong><span>${coupon.type === 'percent' ? `${coupon.value}% off` : `${money(coupon.value)} off`} • Min ${money(coupon.min_cart || 0)}</span></div>
      <button class="icon-btn delete-coupon" data-id="${escapeHtml(coupon.id)}">×</button>
    </div>`).join('');
}

async function deleteCoupon(id) {
  try {
    if (db && currentUser) {
      const { error } = await db.from('coupons').delete().eq('id', id);
      if (error) throw error;
      await loadData();
    } else {
      coupons = coupons.filter(c => String(c.id) !== String(id));
      saveLocal('sween_pro_coupons', coupons);
      renderCoupons();
    }
    toast('Coupon removed');
  } catch (error) {
    toast(error.message || 'Coupon delete failed');
  }
}


async function loadAdminRecords() {
  if (db && currentUser) {
    try {
      const [{ data: orderRows, error: orderError }, { data: inquiryRows, error: inquiryError }] = await Promise.all([
        db.from('orders').select('*').order('created_at', { ascending: false }).limit(25),
        db.from('inquiries').select('*').order('created_at', { ascending: false }).limit(25)
      ]);
      if (orderError) throw orderError;
      if (inquiryError) throw inquiryError;
      orders = orderRows || [];
      inquiries = inquiryRows || [];
    } catch (error) {
      console.warn('Admin records load failed:', error.message);
      orders = loadLocal('sween_pro_orders', []);
      inquiries = loadLocal('sween_pro_inquiries', []);
    }
  } else {
    orders = loadLocal('sween_pro_orders', []);
    inquiries = loadLocal('sween_pro_inquiries', []);
  }
  renderAdminOrders();
  renderAdminInquiries();
}

function renderAdminOrders() {
  if (!els.adminOrders) return;
  if (!orders.length) {
    els.adminOrders.innerHTML = '<div class="empty-state"><h3>No orders yet</h3><p>Orders will appear after checkout.</p></div>';
    return;
  }
  els.adminOrders.innerHTML = orders.map(order => {
    const itemText = Array.isArray(order.items) ? order.items.map(item => `${item.qty}× ${item.name}`).join(', ') : 'Items saved';
    return `<div class="record-card">
      <div class="record-meta"><span class="record-chip">${escapeHtml(order.payment_status || 'pending')}</span><span>${escapeHtml(formatDate(order.created_at))}</span></div>
      <h4>${escapeHtml(order.customer_name || 'Customer')} • ${money(order.total || 0)}</h4>
      <p>${escapeHtml(order.customer_phone || '')}${order.customer_email ? ` • ${escapeHtml(order.customer_email)}` : ''}</p>
      <p><strong>Reason:</strong> ${escapeHtml(order.customer_reason || 'Online product order')}</p>
      <p>${escapeHtml(itemText)}</p>
    </div>`;
  }).join('');
}

function renderAdminInquiries() {
  if (!els.adminInquiries) return;
  if (!inquiries.length) {
    els.adminInquiries.innerHTML = '<div class="empty-state"><h3>No inquiries yet</h3><p>Customer messages will appear here.</p></div>';
    return;
  }
  els.adminInquiries.innerHTML = inquiries.map(inquiry => `<div class="record-card">
    <div class="record-meta"><span class="record-chip">${escapeHtml(inquiry.reason || 'Inquiry')}</span><span>${escapeHtml(formatDate(inquiry.created_at))}</span></div>
    <h4>${escapeHtml(inquiry.customer_name || 'Customer')}</h4>
    <p>${escapeHtml(inquiry.customer_phone || '')}${inquiry.customer_email ? ` • ${escapeHtml(inquiry.customer_email)}` : ''}</p>
    <p><strong>Product:</strong> ${escapeHtml(inquiry.product_interest || 'Not specified')}</p>
    <p><strong>Car:</strong> ${escapeHtml(inquiry.car_details || 'Not specified')}</p>
    <p>${escapeHtml(inquiry.message || '')}</p>
  </div>`).join('');
}

function formatDate(value) {
  if (!value) return 'Just now';
  try { return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }
  catch { return String(value); }
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.12 });
  qsa('.reveal').forEach(el => observer.observe(el));
}

function initHeaderActiveState() {
  const links = qsa('.nav a');
  const sections = links.map(link => qs(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}

function initHeroFitmentLoop() {
  const fitments = ['Hyundai Creta 2023', 'Mahindra Thar 2024', 'Maruti Swift 2022', 'Toyota Fortuner 2021'];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % fitments.length;
    const el = qs('#heroFitment');
    if (el) el.textContent = fitments[index];
  }, 1800);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  saveLocal('sween_pro_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

if (loadLocal('sween_pro_theme', 'light') === 'dark') document.body.classList.add('dark');
document.addEventListener('DOMContentLoaded', init);
