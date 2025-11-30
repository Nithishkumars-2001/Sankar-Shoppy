
//************************ Navbar Menu *******************//

const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');

menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active'); // toggle menu visibility
});

closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('active');
});


// Menu toggle
document.getElementById('menuBtn').onclick = () => document.getElementById('sideMenu').classList.toggle('active');
document.getElementById('closeBtn').onclick = () => document.getElementById('sideMenu').classList.remove('active');

// Cart logic
let cart = JSON.parse(localStorage.getItem('kolamavuCart') || '[]');

function saveCart() {
    localStorage.setItem('kolamavuCart', JSON.stringify(cart));
}

function updateCartUI() {
    const itemCount = cart.length;

    document.getElementById('cartBadge').textContent = itemCount;
    document.getElementById('mobileCartBadge').textContent = itemCount;
    document.getElementById('sidebarCount').textContent = itemCount;

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    document.getElementById('subtotalAmount').textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    const list = document.getElementById('cartItemsList');
    if (cart.length === 0) {
        list.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }

    list.innerHTML = cart.map((item, index) => {
        const cleanPrice = item.price; // e.g., "₹299"
        const rawPrice = parseInt(cleanPrice.replace(/[^0-9]/g, ''));
        const totalForItem = rawPrice * item.quantity;

        // Determine unit based on category
        let unitText = '';
        if (item.category === 'color-kolamavu' || item.category === 'white-kolamavu') {
            unitText = `${item.quantity} pkt`;
        } else {
            // All others: achu, roller, stickers
            unitText = `${item.quantity} pieces`;
        }

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <div style="margin-top:8px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:#8b5cf6; font-weight:700;">
                            ${cleanPrice} × ${unitText}
                        </span>
                        <span style="font-weight:600;">₹${totalForItem.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" style="border:none;background:none;color:#ef4444;cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
}

function addToCart(product, quantity) {
    const existing = cart.find(i => i.name === product.name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
}

// Products data
const products = [

    // Color Kolamavu
    { name: "Red Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Vibrant red kolam powder – 200g" },
    { name: "Yellow Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Bright sunny yellow – 200g" },
    { name: "Green Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Fresh green shade – 200g" },
    { name: "Pink Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Lovely pink shade – 200g" },
    { name: "Parrot Green Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Parrot green – 200g" },
    { name: "Marron/Wine Color", price: "₹10", category: "color-kolamavu", badge: { text: "Classic", color: "#3b82f6" }, image: "assets/img/home/header.png", description: "Deep maroon/wine shade – 200g" },
    { name: "Sky Blue Color", price: "₹10", category: "color-kolamavu", badge: { text: "Classic", color: "#3b82f6" }, image: "assets/img/home/header.png", description: "Calming sky blue – 200g" },
    { name: "Violet/Jamli Color", price: "₹10", category: "color-kolamavu", badge: { text: "Classic", color: "#3b82f6" }, image: "assets/img/home/header.png", description: "Rich violet shade – 200g" },
    { name: "Orange Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Bright orange – 200g" },
    { name: "Royal Blue Color", price: "₹10", category: "color-kolamavu", badge: { text: "Classic", color: "#3b82f6" }, image: "assets/img/home/header.png", description: "Royal blue shade – 200g" },
    { name: "Choclate Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Rich chocolate brown – 200g" },
    { name: "Black Color", price: "₹10", category: "color-kolamavu", badge: { text: "Classic", color: "#3b82f6" }, image: "assets/img/home/header.png", description: "Deep black kolam powder – 200g" },
    { name: "Rani/Hot Pink Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Hot pink / rani shade – 200g" },
    { name: "Falsa Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Beautiful falsa purple – 200g" },
    { name: "Morpankhi Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Peacock feather inspired shade – 200g" },
    { name: "Rama Green Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Traditional Rama green – 200g" },
    { name: "Golden Yellow Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Rich golden yellow – 200g" },
    { name: "Sindoor/Bhagwa Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Saffron / bhagwa shade – 200g" },
    { name: "Mehndi Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Mehndi green shade – 200g" },
    { name: "Pista Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Pista green – 200g" },
    { name: "Skin Color", price: "₹10", category: "color-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Natural skin tone shade – 200g" },
    { name: "Ram Rang Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Traditional Ram rang shade – 200g" },
    { name: "Fluroscent Yellow Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Glow fluorescent yellow – 200g" },
    { name: "Fluroscent Green Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Glow fluorescent green – 200g" },
    { name: "Fluroscent Pink Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Glow fluorescent pink – 200g" },
    { name: "Fluroscent Orange Color", price: "₹10", category: "color-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Glow fluorescent orange – 200g" },

    // White Kolamavu
    { name: "White Marble Powder", price: "₹20", category: "white-kolamavu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/header.png", description: "Soft fine pure white powder (1 kg)" },
    { name: "White Powder", price: "₹10", category: "white-kolamavu", badge: { text: "Popular", color: "#ec4899" }, image: "assets/img/home/header.png", description: "Bright smooth kolam powder (1 kg)" },

    //Kolamavu Achu
    { name: "Kolamavu Achu 1", price: "₹149", category: "kolamavu-achu", badge: { text: "Trending", color: "#9333ea" }, image: "assets/img/home/category-header-bg4.png" },
    { name: "Kolamavu Achu 2", price: "₹179", category: "kolamavu-achu", badge: { text: "New", color: "#ef4444" }, image: "assets/img/home/category-header-bg4.png" },
    { name: "Kolamavu Achu 3", price: "₹149", category: "kolamavu-achu", badge: { text: "Trending", color: "#9333ea" }, image: "assets/img/home/category-header-bg4.png" },

    //Kolamavu Roller
    { name: "Kolamavu Roller 1", price: "₹399", category: "kolamavu-roller", badge: { text: "Vintage", color: "#d97706" }, image: "assets/img/home/category-header-bg7.png" },
    { name: "Kolamavu Roller 2", price: "₹499", category: "kolamavu-roller", badge: { text: "Premium", color: "#22c55e" }, image: "assets/img/home/category-header-bg7.png" },
    { name: "Kolamavu Roller 3", price: "₹399", category: "kolamavu-roller", badge: { text: "Vintage", color: "#d97706" }, image: "assets/img/home/category-header-bg7.png" },

    //Kolamavu Stickers
    { name: "Kolamavu Stickers 1", price: "₹29", category: "kolamavu-stickers", badge: { text: "Craft", color: "#14b8a6" }, image: "assets/img/home/category-header-bg8.png" },
    { name: "Kolamavu Stickers 2", price: "₹199", category: "kolamavu-stickers", badge: { text: "Sale", color: "#f97316" }, image: "assets/img/home/category-header-bg3.png" },
    { name: "Kolamavu Stickers 3", price: "₹29", category: "kolamavu-stickers", badge: { text: "Craft", color: "#14b8a6" }, image: "assets/img/home/category-header-bg8.png" },
];

const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');

function renderProducts(list) {
    productGrid.innerHTML = '';
    if (list.length === 0) { noResults.classList.add('show'); return; }
    noResults.classList.remove('show');

    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
                <div class="product-image">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                    <span class="badge" style="background:${p.badge.color};">${p.badge.text}</span>
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="text-muted small mb-2" style="line-height:1.4;">${p.description}</p>
                    <div class="price-row ">
                        <div class="price">${p.price}</div>

                        <div class="quantity-selector pe-3">
                            <button class="quantity-btn minus"> - </button>
                            <input type="text" class="quantity-input" value="1" readonly>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <div class="btn-box add-btn mt-2">
                        <a href="#" class="default-btn"> Add to Cart <span></span></a>
                    </div>
                </div>
            `;

        const minus = card.querySelector('.minus');
        const plus = card.querySelector('.plus');
        const input = card.querySelector('.quantity-input');

        minus.onclick = () => { if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1; };
        plus.onclick = () => input.value = parseInt(input.value) + 1;

        card.querySelector('.add-btn').onclick = () => {
            const qty = parseInt(input.value);
            addToCart({
                name: p.name,
                price: p.price,
                image: p.image,
                category: p.category
            }, qty);
            input.value = 1;
        };

        productGrid.appendChild(card);
    });
}

function filterProducts() {
    const cat = categoryFilter.value;
    const term = searchInput.value.toLowerCase().trim();
    const filtered = products.filter(p =>
        (cat === 'all' || p.category === cat) &&
        p.name.toLowerCase().includes(term)
    );
    renderProducts(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
    categoryFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
});

function showCheckoutForm() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById('cartFooter').style.display = 'none';
    document.getElementById('checkoutForm').style.display = 'block';
}

function backToCart() {
    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('cartFooter').style.display = 'block';
}

function submitOrder() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !phone || !address) {
        alert("Please fill all required fields");
        return;
    }

    // Build WhatsApp message exactly as requested
    let message = `My Cart (${cart.length} items)%0A%0A`;

    cart.forEach((item, index) => {
        const cleanPrice = item.price.replace(/[^0-9]/g, '');
        const unit = (item.category === 'color-kolamavu' || item.category === 'white-kolamavu')
            ? `${item.quantity} pkt`
            : `${item.quantity} pieces`;

        message += `${index + 1}. ${item.name.padEnd(20)} ${item.price} × ${unit}%0A`;
    });

    const subtotal = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        return sum + (price * item.quantity);
    }, 0);

    message += `%0ASubtotal: ₹${subtotal.toLocaleString('en-IN')}%0A%0A`;
    message += `Name: ${name}%0A`;
    message += `Phone No: ${phone}%0A`;
    message += `Address: ${address}`;

    // WhatsApp number
    const whatsappNumber = "7010234587";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Optional: clear cart after order (remove // to enable)
    // cart = [];
    // saveCart();
    // updateCartUI();
    // toggleCart();
}

