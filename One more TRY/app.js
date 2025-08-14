// Retro Game Menu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing retro game menu...');
    
    // Get all menu buttons
    const menuButtons = document.querySelectorAll('.menu-btn');
    console.log('Found buttons:', menuButtons.length);
    
    // Add event listeners to each button
    menuButtons.forEach((button, index) => {
        console.log(`Setting up button ${index}:`, button.getAttribute('data-action'));
        
        // Mouse click event
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log('Button clicked:', this.getAttribute('data-action'));
            handleButtonClick(this);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
        
        // Add focus styles
        button.addEventListener('focus', function() {
            this.style.boxShadow = `
                0 0 20px rgba(138, 43, 226, 0.8),
                0 0 30px rgba(138, 43, 226, 0.4),
                inset 0 2px 0 rgba(255, 255, 255, 0.2)
            `;
        });
        
        button.addEventListener('blur', function() {
            this.style.boxShadow = `
                0 0 10px rgba(138, 43, 226, 0.3),
                inset 0 2px 0 rgba(255, 255, 255, 0.1),
                inset 0 -2px 0 rgba(0, 0, 0, 0.3)
            `;
        });
    });
    
    // Handle button activation
    function handleButtonClick(button) {
        const action = button.getAttribute('data-action');
        console.log('Handling action:', action);
        
        // Add click animation
        button.style.transform = 'translateY(1px) scale(0.98)';
        button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 100);
        
        // Show unique alerts for each button
        let title, message;
        
        switch(action) {
            case 'play':
                title = '🚀 Starting Game';
                message = 'Initializing new adventure...\nPrepare for an epic journey through the stars!';
                break;
            case 'options':
                title = '⚙️ Game Settings';
                message = 'Configure audio, video, and controls.\nCustomize your gaming experience to perfection!';
                break;
            case 'menu':
                title = '📋 Main Menu';
                message = 'Access save files, achievements, and extras.\nExplore all available game features!';
                break;
            default:
                title = '🎮 Game Interface';
                message = 'Welcome to the retro game menu!';
        }
        
        showGameAlert(title, message);
    }
    
    // Custom alert modal
    function showGameAlert(title, message) {
        console.log('Showing alert:', title);
        
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert-overlay');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        
        // Create alert box
        const alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
        
        // Format message with proper line breaks
        const formattedMessage = message.replace(/\\n/g, '<br>');
        
        // Set up the modal content
        alertBox.innerHTML = `
            <div class="alert-content">
                <h3 class="alert-title">${title}</h3>
                <div class="alert-message">${formattedMessage}</div>
                <button class="alert-close-btn">Continue</button>
            </div>
        `;
        
        // Style the overlay
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000',
            animation: 'fadeIn 0.3s ease-out'
        });
        
        // Style the alert box
        Object.assign(alertBox.style, {
            background: 'linear-gradient(145deg, #4B0082, #301934)',
            border: '3px solid #8A2BE2',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '450px',
            width: '90%',
            textAlign: 'center',
            color: '#E6E6FA',
            fontFamily: "'Orbitron', sans-serif",
            boxShadow: `
                0 0 30px rgba(138, 43, 226, 0.8),
                0 0 60px rgba(138, 43, 226, 0.4),
                inset 0 2px 0 rgba(255, 255, 255, 0.1)
            `,
            animation: 'slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            position: 'relative'
        });
        
        // Style the title
        const titleElement = alertBox.querySelector('.alert-title');
        Object.assign(titleElement.style, {
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#FFD700',
            textShadow: '0 0 10px #FFD700, 0 0 20px #FFD700',
            fontWeight: '700',
            letterSpacing: '0.1em'
        });
        
        // Style the message
        const messageElement = alertBox.querySelector('.alert-message');
        Object.assign(messageElement.style, {
            fontSize: '1.1rem',
            marginBottom: '24px',
            lineHeight: '1.6',
            color: '#E6E6FA',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)'
        });
        
        // Style the close button
        const closeBtn = alertBox.querySelector('.alert-close-btn');
        Object.assign(closeBtn.style, {
            background: 'linear-gradient(145deg, #8A2BE2, #4B0082)',
            border: '2px solid #DA70D6',
            color: '#FFFFFF',
            padding: '12px 24px',
            fontSize: '1rem',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        });
        
        // Close button functionality
        function closeAlert() {
            overlay.style.animation = 'fadeOut 0.3s ease-in';
            alertBox.style.animation = 'slideOut 0.3s ease-in';
            
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                document.removeEventListener('keydown', escapeHandler);
            }, 300);
        }
        
        // Event handlers
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAlert();
        });
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-1px)';
            this.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.8), 0 6px 12px rgba(0,0,0,0.4)';
            this.style.background = 'linear-gradient(145deg, #9A32CD, #5D2A8B)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            this.style.background = 'linear-gradient(145deg, #8A2BE2, #4B0082)';
        });
        
        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeAlert();
            }
        });
        
        // Close on Escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                closeAlert();
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Add to DOM
        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);
        
        // Focus the close button
        setTimeout(() => {
            closeBtn.focus();
        }, 100);
    }
    
    // Add required CSS animations
    addAnimationStyles();
    
    // Initialize additional features
    addParticleEffects();
    addKeyboardNavigation();
});

// Add CSS animation styles
function addAnimationStyles() {
    if (document.getElementById('modal-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-animations';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(-50px) scale(0.8);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes slideOut {
            from { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to { 
                opacity: 0;
                transform: translateY(-30px) scale(0.9);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add floating particle effects
function addParticleEffects() {
    const container = document.querySelector('.game-container');
    if (!container) return;
    
    // Create floating particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            background: `rgba(255, 215, 0, ${0.4 + Math.random() * 0.4})`,
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: `float-up ${10 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            left: `${Math.random() * 100}%`,
            opacity: '0',
            zIndex: '1'
        });
        
        container.appendChild(particle);
    }
    
    // Add particle animation styles
    if (!document.getElementById('particle-styles')) {
        const particleStyle = document.createElement('style');
        particleStyle.id = 'particle-styles';
        particleStyle.textContent = `
            @keyframes float-up {
                0% {
                    opacity: 0;
                    transform: translateY(100vh) scale(0) rotate(0deg);
                }
                10% {
                    opacity: 1;
                    transform: translateY(90vh) scale(1) rotate(45deg);
                }
                90% {
                    opacity: 1;
                    transform: translateY(-10vh) scale(1) rotate(315deg);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-20vh) scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
}

// Add keyboard navigation
function addKeyboardNavigation() {
    const buttons = document.querySelectorAll('.menu-btn');
    let currentIndex = 0;
    
    // Set initial focus
    buttons[0].focus();
    
    document.addEventListener('keydown', function(e) {
        // Skip if modal is open
        if (document.querySelector('.alert-overlay')) {
            return;
        }
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                buttons[currentIndex].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = (currentIndex + 1) % buttons.length;
                buttons[currentIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                buttons[currentIndex].click();
                break;
        }
    });
}