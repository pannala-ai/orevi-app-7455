// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navActions.style.display = navActions.style.display === 'flex' ? 'none' : 'flex';
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        
        navActions.style.flexDirection = 'column';
        navActions.style.position = 'absolute';
        navActions.style.top = 'calc(100% + 200px)';
        navActions.style.left = '0';
        navActions.style.right = '0';
        navActions.style.backgroundColor = 'white';
        navActions.style.padding = '20px';
        navActions.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
});

// Search Tab Switching
const searchTabs = document.querySelectorAll('.search-tab');
searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Wishlist Toggle
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.color = '#ef4444';
            showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.color = '';
            showNotification('Removed from wishlist');
        }
    });
});

// Book Now Buttons
const bookBtns = document.querySelectorAll('.book-btn');
bookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const hotelName = btn.closest('.hotel-card').querySelector('h3').textContent;
        showNotification(`Booking ${hotelName}...`);
        // In a real app, this would redirect to booking page
        setTimeout(() => {
            showNotification(`Successfully booked ${hotelName}!`);
        }, 1500);
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    showNotification(`Thank you for subscribing with ${email}!`);
    newsletterForm.reset();
});

// Search Form
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    
    showNotification(`Searching hotels in ${destination} for ${guests} from ${checkin} to ${checkout}...`);
    
    // In a real app, this would make an API call
    setTimeout(() => {
        showNotification(`Found 245 hotels matching your criteria!`);
    }, 2000);
});

// Notification System
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 15px 25px;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll