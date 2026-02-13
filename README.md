# 🛍️ E-Commerce Wireframe - Full Stack Project

Professional e-commerce wireframe dengan integrasi pembayaran **GoPay** dan **DANA**.

## 📋 Daftar Isi
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Struktur Folder](#struktur-folder)
- [Instalasi](#instalasi)
- [Cara Penggunaan](#cara-penggunaan)
- [Payment Integration](#payment-integration)
- [Customization](#customization)
- [Browser Support](#browser-support)

---

## 🎯 Overview

Wireframe e-commerce ini dibuat untuk presentasi ke klien/stakeholder dengan fitur lengkap:
- ✅ 4 halaman utama (Homepage, Product Listing, Product Detail, Cart & Checkout)
- ✅ Fully functional shopping cart dengan localStorage
- ✅ Payment integration: GoPay, DANA, Credit Card, Bank Transfer
- ✅ Responsive design (Desktop, Tablet, Mobile)
- ✅ Dark blue gradient theme dengan glassmorphism effect
- ✅ Animated UI dengan smooth transitions

---

## ✨ Features

### 1. **Homepage**
- Hero section dengan CTA button
- Featured categories (4 columns)
- Featured products grid
- Special offers/promo banners
- Footer dengan social media links

### 2. **Product Listing**
- Breadcrumb navigation
- Filters & sorting functionality
- Responsive product grid (4 columns)
- Pagination
- Quick add to cart

### 3. **Product Detail**
- Product gallery placeholder
- Price, rating, dan reviews
- Size/color/quantity selector
- Add to cart & wishlist
- Share functionality
- Product tabs (Description, Specs, Reviews, Shipping)
- Related products carousel

### 4. **Shopping Cart & Checkout**
- Dynamic cart items dengan quantity control
- Remove items functionality
- Coupon code input
- Order summary (Subtotal, Shipping, Tax, Total)
- Payment method selection modal
- **GoPay & DANA integration ready**
- Checkout process steps
- Trust badges

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **Vanilla JavaScript (ES6+)** - No frameworks/libraries
- **LocalStorage** - Cart persistence
- **Google Fonts** - Poppins font family

---

## 📁 Struktur Folder

```
ecommerce-project/
│
├── index.html              # Main HTML file
├── README.md              # Documentation (this file)
│
├── css/
│   └── style.css          # Main stylesheet dengan comments lengkap
│
├── js/
│   └── main.js            # Main JavaScript dengan semua functionality
│
├── img/                   # Image assets folder
│   ├── favicon.png        # (optional) Favicon website
│   ├── product-1.jpg      # Product images
│   ├── product-2.jpg
│   ├── ...                # dst
│   └── hero-banner.jpg    # Hero section background
│
└── assets/                # Additional assets
    └── icons/             # Custom icons (optional)
```

---

## 🚀 Instalasi

### Option 1: Direct Open
1. Download/clone repository ini
2. Buka `index.html` di browser
3. Done! ✅

### Option 2: Local Server (Recommended)
```bash
# Menggunakan Python
python -m http.server 8000

# Atau menggunakan Node.js
npx http-server

# Atau menggunakan Live Server (VSCode Extension)
```

Buka browser: `http://localhost:8000`

---

## 📖 Cara Penggunaan

### 1. **Navigasi Antar Halaman**
Gunakan tab di bagian atas untuk berpindah halaman:
- 🏠 Homepage
- 🛍️ Product Listing
- 📦 Product Detail
- 🛒 Cart & Checkout

### 2. **Menambah Produk ke Cart**
- Klik button "Add to Cart" pada produk manapun
- Cart badge akan update otomatis
- Data tersimpan di localStorage (persisten)

### 3. **Manage Cart**
- Ubah quantity dengan tombol +/-
- Remove item dengan tombol 🗑️ Remove
- Apply coupon code (simulasi)

### 4. **Checkout & Payment**
1. Klik "Proceed to Payment"
2. Pilih payment method (GoPay/DANA/Card/Bank)
3. Klik "Confirm Payment"
4. Payment diproses (simulasi 2 detik)
5. Success modal muncul
6. Cart otomatis clear

---

## 💳 Payment Integration

### Supported Payment Methods:

#### 1. **GoPay** 💚
```javascript
// Integration ready
selectPayment('gopay');
processPayment();
```

#### 2. **DANA** 💙
```javascript
// Integration ready
selectPayment('dana');
processPayment();
```

#### 3. **Credit/Debit Card** 💳
- Visa, Mastercard, JCB
- Form input ready untuk implementasi

#### 4. **Bank Transfer** 🏦
- BCA, Mandiri, BNI, BRI
- Virtual account ready

### Payment Flow:
```
Cart Review → Payment Selection → Processing → Success → Redirect
```

### Untuk Implementasi Real Payment Gateway:

**GoPay Integration:**
```javascript
// Di main.js, update function processPayment()
// Tambahkan API call ke GoPay
const gopayResponse = await fetch('YOUR_GOPAY_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: total,
    order_id: orderId,
    // ... other params
  })
});
```

**DANA Integration:**
```javascript
// Similar untuk DANA
const danaResponse = await fetch('YOUR_DANA_API_ENDPOINT', {
  method: 'POST',
  // ... params
});
```

---

## 🎨 Customization

### 1. **Mengubah Warna Theme**
Edit CSS variables di `css/style.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #0f172a, #1e293b);
  --accent-gradient: linear-gradient(135deg, #2dd4bf, #3b82f6);
  --glow-color: rgba(45, 212, 191, 0.35);
  /* ... */
}
```

### 2. **Mengganti Font**
Di `index.html`, ganti Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Di `css/style.css`:
```css
* {
  font-family: 'YOUR_FONT', sans-serif;
}
```

### 3. **Menambah Product Data**
Edit array `products` di `js/main.js`:
```javascript
const products = [
  { 
    id: 1, 
    name: 'Product Name', 
    price: 49.99, 
    image: 'img/product-1.jpg',
    category: 'Electronics',
    description: 'Product description'
  },
  // ... add more
];
```

### 4. **Custom Animations**
Semua animations ada di `css/style.css`:
- `fadeIn` - Fade in effect
- `slideUp` - Slide up effect
- `moveGlow` - Background glow animation
- `spin` - Loading spinner

---

## 🌐 Browser Support

✅ **Fully Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

⚠️ **Partial Support:**
- IE11 (requires polyfills)

---

## 📱 Responsive Breakpoints

```css
/* Desktop: Default styles */

/* Tablet: 768px and below */
@media (max-width: 768px) {
  /* Tablet optimizations */
}

/* Mobile: 480px and below */
@media (max-width: 480px) {
  /* Mobile optimizations */
}
```

---

## 🔧 Advanced Features

### LocalStorage Management
Cart data disimpan di localStorage:
```javascript
// Save cart
localStorage.setItem('ecommerce_cart', JSON.stringify(cartItems));

// Load cart
const savedCart = localStorage.getItem('ecommerce_cart');
```

### Event Handling
```javascript
// Global event listeners
document.addEventListener('DOMContentLoaded', function() {
  loadCartFromStorage();
  initializeUI();
});
```

### Notification System
```javascript
showNotification('Message', 'type');
// Types: success, error, warning, info
```

---

## 📝 To-Do / Future Enhancements

- [ ] User authentication system
- [ ] Real product database integration
- [ ] Product search functionality
- [ ] Advanced filters (price range slider)
- [ ] Product reviews & ratings system
- [ ] Wishlist page
- [ ] Order history
- [ ] Real-time inventory tracking
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Email notifications
- [ ] Social media integration
- [ ] Live chat support

---

## 🐛 Known Issues / Limitations

1. **Simulasi Payment** - Saat ini payment adalah simulasi, perlu integrasi real API
2. **Product Data** - Static array, perlu database
3. **Image Placeholders** - Perlu replace dengan real product images
4. **No Backend** - Semua client-side, perlu backend untuk production

---

## 🤝 Contribution

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License - Free to use untuk personal atau commercial projects

---

## 📞 Support

Untuk pertanyaan atau support:
- Email: support@yourdomain.com
- GitHub Issues: [Link]
- Documentation: [Link]

---

## 🎉 Credits

- Design: Your Team
- Development: Your Name
- Icons: Emoji (Native)
- Fonts: Google Fonts (Poppins)

---

## 📚 Additional Resources

- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Payment Gateway APIs](https://docs.gopay.com / https://docs.dana.id)

---

**🚀 Happy Coding!**

Made with ❤️ for Wireframe Presentation
