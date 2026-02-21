// Router for Single Page Application
class Router {
    constructor() {
        this.routes = {
            'home': this.loadHomePage,
            'hotels': this.loadHotelsPage,
            'destinations': this.loadDestinationsPage,
            'deals': this.loadDealsPage,
            'about': this.loadAboutPage,
            'login': this.loadLoginPage,
            'register': this.loadRegisterPage,
            'list-property': this.loadListPropertyPage,
            'hotel-detail': this.loadHotelDetailPage,
            'booking': this.loadBookingPage,
            'profile': this.loadProfilePage,
            'my-bookings': this.loadMyBookingsPage,
            'wishlist': this.loadWishlistPage
        };
        
        this.currentPage = 'home';
        this.init();
    }
    
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigate(e.state.page, false);
            }
        });
        
        // Load initial page
        const hash = window.location.hash.substring(1) || 'home';
        this.navigate(hash, false);
    }
    
    navigate(page, updateHistory = true) {
        if (this.routes[page]) {
            this.currentPage = page;
            
            // Update URL without page reload
            if (updateHistory) {
                window.history.pushState({ page }, '', `#${page}`);
            }
            
            // Update active nav link
            this.updateActiveNav(page);
            
            // Load the page
            this.routes[page].call(this);
        } else {
            this.navigate('home');
        }
    }
    
    updateActiveNav(page) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.nav-links a[onclick*="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        } else if (page === 'home') {
            document.querySelector('.nav-links a:first-child').classList.add('active');
        }
    }
    
    async loadHomePage() {
        const response = await fetch('pages/home.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeHomePage();
    }
    
    async loadHotelsPage() {
        const response = await fetch('pages/hotels.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeHotelsPage();
    }
    
    async loadDestinationsPage() {
        const response = await fetch('pages/destinations.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeDestinationsPage();
    }
    
    async loadDealsPage() {
        const response = await fetch('pages/deals.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeDealsPage();
    }
    
    async loadAboutPage() {
        const response = await fetch('pages/about.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeAboutPage();
    }
    
    async loadLoginPage() {
        const response = await fetch('pages/login.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        document.getElementById('footer').innerHTML = '';
        this.initializeLoginPage();
    }
    
    async loadRegisterPage() {
        const response = await fetch('pages/register.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        document.getElementById('footer').innerHTML = '';
        this.initializeRegisterPage();
    }
    
    async loadListPropertyPage() {
        const response = await fetch('pages/list-property.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeListPropertyPage();
    }
    
    async loadHotelDetailPage() {
        const hotelId = window.location.hash.split('/')[1] || '1';
        const response = await fetch('pages/hotel-detail.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeHotelDetailPage(hotelId);
    }
    
    async loadBookingPage() {
        const response = await fetch('pages/booking.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeBookingPage();
    }
    
    async loadProfilePage() {
        const response = await fetch('pages/profile.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeProfilePage();
    }
    
    async loadMyBookingsPage() {
        const response = await fetch('pages/my-bookings.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeMyBookingsPage();
    }
    
    async loadWishlistPage() {
        const response = await fetch('pages/wishlist.html');
        const html = await response.text();
        document.getElementById('main-content').innerHTML = html;
        this.loadFooter();
        this.initializeWishlistPage();
    }
    
    async loadFooter() {
        const response = await fetch('pages/footer.html');
        const html = await response.text();
        document.getElementById('footer').innerHTML = html;
        this.initializeFooter();
    }
    
    // Initialize page-specific JavaScript
    initializeHomePage() {
        // Load featured hotels
        loadFeaturedHotels();
        
        // Initialize search form
        const searchForm = document.getElementById('main-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const destination = document.getElementById('destination').value;
                const checkin = document.getElementById('checkin').value;
                const checkout = document.getElementById('checkout').value;
                const guests = document.getElementById('guests').value;
                
                showNotification(`Searching hotels in ${destination} for ${guests} from ${checkin} to ${checkout}...`);
                
                // Navigate to hotels page with search parameters
                setTimeout(() => {
                    this.navigate('hotels');
                }, 1000);
            });
        }
        
        // Initialize newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input').value;
                showNotification(`Thank you for subscribing with ${email}!`);
                newsletterForm.reset();
            });
        }
    }
    
    initializeHotelsPage() {
        // Load all hotels
        loadAllHotels();
        
        // Initialize filters
        const priceSlider = document.querySelector('.price-slider');
        if (priceSlider) {
            priceSlider.addEventListener('input', (e) => {
                document.querySelector('.price-range span:nth-child(2)').textContent = `$${e.target.value}`;
            });
        }
        
        // Initialize filter buttons
        document.querySelectorAll('.star-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Initialize sort select
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                applyFilters();
            });
        }
    }
    
    initializeLoginPage() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                // Simulate login
                showNotification(`Welcome back! Logging in with ${email}...`);
                setTimeout(() => {
                    this.navigate('profile');
                }, 1500);
            });
        }
    }
    
    initializeRegisterPage() {
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                
                showNotification(`Account created for ${name}! Welcome to LuxStay.`);
                setTimeout(() => {
                    this.navigate('home');
                }, 1500);
            });
        }
    }
    
    initializeHotelDetailPage(hotelId) {
        // Load hotel details based on ID
        loadHotelDetails(hotelId);
        
        // Initialize booking widget
        const bookNowBtn = document.querySelector('.booking-widget .btn-primary');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', () => {
                openBookingModal();
            });
        }
    }
    
    initializeFooter() {
        // Make footer links work with router
        document.querySelectorAll('#footer a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('.html')) {
                const page = href.replace('.html', '');
                link.setAttribute('href', '#');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigate(page);
                });
            }
        });
    }
    
    // Other initialize methods would go here...
    initializeDestinationsPage() {}
    initializeDealsPage() {}
    initializeAboutPage() {}
    initializeListPropertyPage() {}
    initializeBookingPage() {}
    initializeProfilePage() {}
    initializeMyBookingsPage() {}
    initializeWishlistPage() {}
}

// Create router instance
const router = new Router();

// Global navigation function
function navigateTo(page) {
    router.navigate(page);
}

// Handle direct URL access
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        router.navigate(hash, false);
    }
});
