// =====================================
// E-COMMERCE WIREFRAME JAVASCRIPT
// Main functionality untuk toko online
// Features: Navigation, Cart, Payment (GoPay & DANA)
// =====================================

// ===== GLOBAL VARIABLES =====
// State management untuk aplikasi
let currentPage = 'homepage';
let cartItems = [];
let selectedPayment = null;

// Sample products data
const products = [
  { id: 1, name: 'Product 1', price: 49.99, image: 'img/product-1.jpg' },
  { id: 2, name: 'Product 2', price: 79.99, image: 'img/product-2.jpg' },
  { id: 3, name: 'Product 3', price: 29.99, image: 'img/product-3.jpg' },
  { id: 4, name: 'Product 4', price: 99.99, image: 'img/product-4.jpg' },
  { id: 5, name: 'Product 5', price: 59.99, image: 'img/product-5.jpg' },
  { id: 6, name: 'Product 6', price: 89.99, image: 'img/product-6.jpg' },
  { id: 7, name: 'Product 7', price: 39.99, image: 'img/product-7.jpg' },
  { id: 8, name: 'Product 8', price: 69.99, image: 'img/product-8.jpg' },
];

// ===== PAGE NAVIGATION =====
/**
 * Fungsi untuk berpindah halaman
 * @param {string} pageId - ID halaman tujuan
 */
function showPage(pageId) {
  // Sembunyikan semua halaman
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // Tampilkan halaman yang dipilih
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update active state pada navigation tabs
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  // Set active tab berdasarkan pageId
  const activeTab = Array.from(tabs).find(tab => 
    tab.textContent.toLowerCase().includes(pageId.replace('page', '')) ||
    (pageId === 'homepage' && tab.textContent === 'Homepage') ||
    (pageId === 'listing' && tab.textContent === 'Product Listing') ||
    (pageId === 'detail' && tab.textContent === 'Product Detail') ||
    (pageId === 'cart' && tab.textContent === 'Cart & Checkout')
  );
  
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update current page state
  currentPage = pageId;
  
  // Update cart badge jika ada
  updateCartBadge();
}

// ===== SHOPPING CART FUNCTIONS =====
/**
 * Tambah produk ke cart
 * @param {number} productId - ID produk yang ditambahkan
 */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    console.error('Product not found');
    return;
  }

  // Cek apakah produk sudah ada di cart
  const existingItem = cartItems.find(item => item.id === productId);
  
  if (existingItem) {
    // Jika sudah ada, tambah quantity
    existingItem.quantity += 1;
    showNotification('Product quantity updated in cart!', 'success');
  } else {
    // Jika belum ada, tambah item baru
    cartItems.push({
      ...product,
      quantity: 1
    });
    showNotification('Product added to cart!', 'success');
  }

  // Update tampilan cart
  updateCartDisplay();
  updateCartBadge();
  
  // Simpan ke localStorage
  saveCartToStorage();
}

/**
 * Hapus produk dari cart
 * @param {number} productId - ID produk yang dihapus
 */
function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  
  showNotification('Product removed from cart', 'info');
  updateCartDisplay();
  updateCartBadge();
  saveCartToStorage();
}

/**
 * Update quantity produk di cart
 * @param {number} productId - ID produk
 * @param {number} newQuantity - Quantity baru
 */
function updateQuantity(productId, newQuantity) {
  const item = cartItems.find(item => item.id === productId);
  
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    updateCartDisplay();
    saveCartToStorage();
  } else if (newQuantity <= 0) {
    removeFromCart(productId);
  }
}

/**
 * Update tampilan cart di halaman
 */
function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items-container');
  const cartSummary = document.getElementById('cart-summary');
  
  if (!cartContainer) return;

  // Jika cart kosong
  if (cartItems.length === 0) {
    cartContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: rgba(255, 255, 255, 0.5);">
        <div style="font-size: 48px; margin-bottom: 20px;">🛒</div>
        <h3 style="margin-bottom: 10px;">Your cart is empty</h3>
        <p style="font-size: 14px;">Start shopping to add items!</p>
        <button class="wf-cta-btn" style="width: 200px; margin: 30px auto 0;" onclick="showPage('listing')">
          Browse Products
        </button>
      </div>
    `;
    
    if (cartSummary) {
      cartSummary.innerHTML = '<p style="color: rgba(255, 255, 255, 0.5);">No items in cart</p>';
    }
    return;
  }

  // Render cart items
  cartContainer.innerHTML = cartItems.map(item => `
    <div class="wf-cart-item" data-id="${item.id}">
      <div class="wf-cart-img">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" onerror="this.style.display='none'">
      </div>
      <div class="wf-cart-details">
        <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px;">${item.name}</div>
        <div style="color: rgba(255, 255, 255, 0.6); font-size: 13px; margin-bottom: 10px;">
          Unit Price: $${item.price.toFixed(2)}
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="wf-filter" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" style="width: 35px; padding: 8px;">-</button>
          <span style="font-weight: 600; min-width: 30px; text-align: center;">${item.quantity}</span>
          <button class="wf-filter" onclick="updateQuantity(${item.id}, ${item.quantity + 1})" style="width: 35px; padding: 8px;">+</button>
          <button class="wf-filter" onclick="removeFromCart(${item.id})" style="background: rgba(251, 113, 133, 0.2); color: #fb7185; margin-left: 10px;">
            🗑️ Remove
          </button>
        </div>
      </div>
      <div class="wf-cart-price">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  // Update summary
  updateCartSummary();
}

/**
 * Update cart summary (subtotal, tax, total)
 */
function updateCartSummary() {
  const summaryContainer = document.getElementById('cart-summary');
  if (!summaryContainer) return;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const discount = 0; // Bisa diimplementasi dengan coupon code
  const total = subtotal + shipping + tax - discount;

  summaryContainer.innerHTML = `
    <div style="font-size: 18px; font-weight: 600; margin-bottom: 20px; color: white;">Order Summary</div>
    <div class="wf-summary-line">
      <span>Subtotal (${cartItems.length} items)</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="wf-summary-line">
      <span>Shipping</span>
      <span>$${shipping.toFixed(2)}</span>
    </div>
    <div class="wf-summary-line">
      <span>Tax (10%)</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    ${discount > 0 ? `
    <div class="wf-summary-line">
      <span style="color: #2dd4bf;">Discount</span>
      <span style="color: #2dd4bf;">-$${discount.toFixed(2)}</span>
    </div>
    ` : ''}
    <div class="wf-summary-total">
      <span>Total</span>
      <span style="color: #2dd4bf;">$${total.toFixed(2)}</span>
    </div>
    <button class="wf-cta-btn" style="margin-top: 25px; width: 100%;" onclick="openPaymentModal()">
      Proceed to Payment
    </button>
    <div style="text-align: center; margin-top: 15px;">
      <button class="wf-filter" onclick="showPage('listing')" style="background: transparent; border: 1px solid rgba(255, 255, 255, 0.2);">
        ← Continue Shopping
      </button>
    </div>
  `;
}

/**
 * Update cart badge (jumlah item di cart)
 */
function updateCartBadge() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  
  badges.forEach(badge => {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

// ===== LOCAL STORAGE FUNCTIONS =====
/**
 * Simpan cart ke localStorage
 */
function saveCartToStorage() {
  try {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

/**
 * Load cart dari localStorage
 */
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('ecommerce_cart');
    if (savedCart) {
      cartItems = JSON.parse(savedCart);
      updateCartDisplay();
      updateCartBadge();
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
}

/**
 * Clear cart
 */
function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartItems = [];
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();
    showNotification('Cart cleared', 'info');
  }
}

// ===== PAYMENT MODAL FUNCTIONS =====
/**
 * Buka modal pembayaran
 */
function openPaymentModal() {
  if (cartItems.length === 0) {
    showNotification('Your cart is empty!', 'warning');
    return;
  }

  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
    renderPaymentOptions();
  }
}

/**
 * Tutup modal pembayaran
 */
function closePaymentModal() {
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
    selectedPayment = null;
  }
}

/**
 * Render payment options di modal
 */
function renderPaymentOptions() {
  const container = document.getElementById('payment-options-container');
  if (!container) return;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + 10 + (subtotal * 0.1); // shipping + tax

  container.innerHTML = `
    <h2 style="margin-bottom: 10px;">Select Payment Method</h2>
    <p style="color: rgba(255, 255, 255, 0.6); margin-bottom: 25px; font-size: 14px;">
      Total Amount: <strong style="color: #2dd4bf; font-size: 20px;">$${total.toFixed(2)}</strong>
    </p>

    <div class="payment-options">
      <!-- GoPay -->
      <div class="payment-option" onclick="selectPayment('gopay')" data-payment="gopay">
        <div class="payment-logo" style="background: linear-gradient(135deg, #00AA13, #00D93E);">
          <span style="color: white; font-weight: bold;">GoPay</span>
        </div>
        <div class="payment-info">
          <div class="payment-name">GoPay</div>
          <div class="payment-desc">Bayar dengan GoPay - Cepat & Aman</div>
        </div>
        <div class="payment-check" style="font-size: 20px; color: #2dd4bf; display: none;">✓</div>
      </div>

      <!-- DANA -->
      <div class="payment-option" onclick="selectPayment('dana')" data-payment="dana">
        <div class="payment-logo" style="background: linear-gradient(135deg, #118EEA, #0063D1);">
          <span style="color: white; font-weight: bold;">DANA</span>
        </div>
        <div class="payment-info">
          <div class="payment-name">DANA</div>
          <div class="payment-desc">Bayar dengan DANA - Praktis & Mudah</div>
        </div>
        <div class="payment-check" style="font-size: 20px; color: #2dd4bf; display: none;">✓</div>
      </div>

      <!-- Credit Card (Optional) -->
      <div class="payment-option" onclick="selectPayment('card')" data-payment="card">
        <div class="payment-logo" style="background: linear-gradient(135deg, #667eea, #764ba2);">
          <span style="color: white; font-size: 24px;">💳</span>
        </div>
        <div class="payment-info">
          <div class="payment-name">Credit/Debit Card</div>
          <div class="payment-desc">Visa, Mastercard, JCB</div>
        </div>
        <div class="payment-check" style="font-size: 20px; color: #2dd4bf; display: none;">✓</div>
      </div>

      <!-- Bank Transfer (Optional) -->
      <div class="payment-option" onclick="selectPayment('bank')" data-payment="bank">
        <div class="payment-logo" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
          <span style="color: white; font-size: 24px;">🏦</span>
        </div>
        <div class="payment-info">
          <div class="payment-name">Bank Transfer</div>
          <div class="payment-desc">BCA, Mandiri, BNI, BRI</div>
        </div>
        <div class="payment-check" style="font-size: 20px; color: #2dd4bf; display: none;">✓</div>
      </div>
    </div>

    <button class="wf-cta-btn" onclick="processPayment()" id="confirm-payment-btn" disabled style="width: 100%; opacity: 0.5;">
      Confirm Payment
    </button>
    <button class="wf-filter" onclick="closePaymentModal()" style="width: 100%; margin-top: 15px; background: transparent; border: 1px solid rgba(255, 255, 255, 0.2);">
      Cancel
    </button>
  `;
}

/**
 * Select payment method
 * @param {string} method - Payment method (gopay, dana, card, bank)
 */
function selectPayment(method) {
  selectedPayment = method;

  // Update visual selection
  const options = document.querySelectorAll('.payment-option');
  options.forEach(opt => {
    opt.classList.remove('selected');
    opt.querySelector('.payment-check').style.display = 'none';
  });

  const selected = document.querySelector(`[data-payment="${method}"]`);
  if (selected) {
    selected.classList.add('selected');
    selected.querySelector('.payment-check').style.display = 'block';
  }

  // Enable confirm button
  const confirmBtn = document.getElementById('confirm-payment-btn');
  if (confirmBtn) {
    confirmBtn.disabled = false;
    confirmBtn.style.opacity = '1';
  }
}

/**
 * Process payment (simulasi)
 */
function processPayment() {
  if (!selectedPayment) {
    showNotification('Please select a payment method', 'warning');
    return;
  }

  // Show loading
  const confirmBtn = document.getElementById('confirm-payment-btn');
  if (confirmBtn) {
    confirmBtn.innerHTML = '<div class="spinner"></div>';
    confirmBtn.disabled = true;
  }

  // Simulate payment processing
  setTimeout(() => {
    // Close payment modal
    closePaymentModal();

    // Show success modal
    showSuccessModal();

    // Clear cart after successful payment
    cartItems = [];
    updateCartDisplay();
    updateCartBadge();
    saveCartToStorage();

  }, 2000);
}

/**
 * Show success modal after payment
 */
function showSuccessModal() {
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="text-align: center;">
      <div style="font-size: 72px; margin-bottom: 20px;">✅</div>
      <h2 style="margin-bottom: 15px;">Payment Successful!</h2>
      <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 10px;">
        Your order has been confirmed
      </p>
      <p style="color: rgba(255, 255, 255, 0.5); font-size: 14px; margin-bottom: 30px;">
        Order ID: #ORD${Date.now()}
      </p>
      <p style="color: rgba(255, 255, 255, 0.6); font-size: 13px; margin-bottom: 25px;">
        Payment Method: ${getPaymentMethodName(selectedPayment)}
      </p>
      <button class="wf-cta-btn" onclick="this.closest('.modal').remove(); showPage('homepage');" style="width: 100%;">
        Back to Home
      </button>
      <p style="margin-top: 20px; font-size: 12px; color: rgba(255, 255, 255, 0.5);">
        Receipt has been sent to your email
      </p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Auto close after 5 seconds
  setTimeout(() => {
    modal.remove();
    showPage('homepage');
  }, 5000);
}

/**
 * Get payment method display name
 */
function getPaymentMethodName(method) {
  const names = {
    'gopay': 'GoPay',
    'dana': 'DANA',
    'card': 'Credit/Debit Card',
    'bank': 'Bank Transfer'
  };
  return names[method] || method;
}

// ===== NOTIFICATION SYSTEM =====
/**
 * Show notification toast
 * @param {string} message - Pesan notifikasi
 * @param {string} type - Tipe notifikasi (success, error, warning, info)
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? 'rgba(45, 212, 191, 0.9)' : 
                 type === 'error' ? 'rgba(251, 113, 133, 0.9)' :
                 type === 'warning' ? 'rgba(251, 191, 36, 0.9)' :
                 'rgba(59, 130, 246, 0.9)'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-size: 14px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    animation: slideInRight 0.3s ease;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== FILTER & SORT FUNCTIONS =====
/**
 * Apply filter to products
 * @param {string} filterType - Tipe filter (category, price, etc)
 */
function applyFilter(filterType) {
  console.log('Filter applied:', filterType);
  showNotification(`Filter "${filterType}" applied`, 'info');
  
  // Update active filter button
  const filterButtons = document.querySelectorAll('.wf-filter');
  filterButtons.forEach(btn => {
    if (btn.textContent.includes(filterType)) {
      btn.classList.add('active');
    }
  });
}

/**
 * Sort products
 * @param {string} sortType - Tipe sorting (popular, price-low, price-high, etc)
 */
function sortProducts(sortType) {
  console.log('Sort applied:', sortType);
  showNotification(`Sorted by: ${sortType}`, 'info');
}

// ===== INITIALIZATION =====
/**
 * Initialize aplikasi saat DOM ready
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('E-Commerce Wireframe Initialized');
  
  // Load cart dari localStorage
  loadCartFromStorage();
  
  // Initialize tooltips or other UI components if needed
  initializeUI();
  
  // Set default page
  showPage('homepage');
});

/**
 * Initialize UI components
 */
function initializeUI() {
  // Add click handlers untuk navigation
  const navItems = document.querySelectorAll('.wf-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const page = this.textContent.toLowerCase();
      if (page === 'home') showPage('homepage');
      else if (page === 'shop') showPage('listing');
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      closePaymentModal();
    }
  });

  // Add keyboard shortcut (ESC to close modal)
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePaymentModal();
    }
  });
}

// ===== PRODUCT DETAIL FUNCTIONS =====
/**
 * View product detail
 * @param {number} productId - ID produk
 */
function viewProduct(productId) {
  console.log('Viewing product:', productId);
  showPage('detail');
  // Bisa diimplementasi lebih lanjut untuk load product detail
}

/**
 * Add to wishlist
 * @param {number} productId - ID produk
 */
function addToWishlist(productId) {
  showNotification('Product added to wishlist!', 'success');
  console.log('Added to wishlist:', productId);
}

/**
 * Share product
 */
function shareProduct() {
  if (navigator.share) {
    navigator.share({
      title: 'Check out this product!',
      text: 'Amazing product from our store',
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    showNotification('Sharing not supported on this device', 'info');
  }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
// Make functions available globally
window.showPage = showPage;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.selectPayment = selectPayment;
window.processPayment = processPayment;
window.applyFilter = applyFilter;
window.sortProducts = sortProducts;
window.viewProduct = viewProduct;
window.addToWishlist = addToWishlist;
window.shareProduct = shareProduct;

console.log('✅ JavaScript loaded successfully');