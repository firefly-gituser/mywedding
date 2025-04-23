document.addEventListener('DOMContentLoaded', function() {
    // Initialize ScrollReveal with enhanced settings
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1200,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false,
        opacity: 0,
        scale: 0.9
    });

    // Apply ScrollReveal to all major sections with custom settings
    sr.reveal('.invitation .container', { 
        delay: 300,
        distance: '50px',
        origin: 'bottom',
        viewFactor: 0.2
    });
    
    sr.reveal('.families h2', { 
        delay: 200,
        distance: '30px',
        origin: 'bottom',
        viewFactor: 0.2
    });
    
    sr.reveal('.detail-card', { 
        interval: 200,
        viewFactor: 0.3,
        distance: '40px'
    });
    
    sr.reveal('.family-card', { 
        interval: 300,
        viewFactor: 0.3
    });
    
    sr.reveal('.schedule h2', { 
        delay: 200,
        distance: '30px',
        origin: 'bottom',
        viewFactor: 0.2
    });
    
    sr.reveal('.timeline-item', { 
        interval: 250,
        viewFactor: 0.2,
        distance: '50px'
    });
    
    sr.reveal('.gallery h2', { 
        delay: 200,
        distance: '30px',
        origin: 'bottom',
        viewFactor: 0.2
    });
    
    sr.reveal('.gallery-item', { 
        interval: 150, 
        viewFactor: 0.2,
        distance: '40px'
    });
    
    sr.reveal('.rsvp h2, .rsvp p', { 
        delay: 200,
        distance: '30px',
        origin: 'bottom',
        viewFactor: 0.2
    });
    
    sr.reveal('.rsvp form', { 
        delay: 400,
        viewFactor: 0.2,
        distance: '30px',
        origin: 'bottom'
    });
    
    sr.reveal('footer .container', { 
        delay: 200,
        distance: '30px',
        origin: 'bottom',
        viewFactor: 0.2
    });

    // Add scroll-triggered animation class to body
    const addScrollAnimationClass = () => {
        document.body.classList.add('animate-on-scroll');
        
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll .section-fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .animate-on-scroll .section-fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        // Add the section-fade-in class to appropriate elements
        const elementsToAnimate = document.querySelectorAll('section > .container, .timeline-item, .gallery-item, .detail-card, .family-card');
        elementsToAnimate.forEach(el => {
            el.classList.add('section-fade-in');
        });
        
        // Function to check if element is in viewport and add visible class
        const checkVisibility = () => {
            const elements = document.querySelectorAll('.section-fade-in');
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                // If element is in viewport
                if(position.top < window.innerHeight * 0.9) {
                    element.classList.add('visible');
                }
            });
        };
        
        // Run on scroll and initially
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
    };
    
    addScrollAnimationClass();

    // Add scroll-triggered animation for sections
    const handleScrollAnimations = () => {
        // Initialize elements to animate
        const sections = document.querySelectorAll('section');
        const hero = document.querySelector('.hero');
        const fadeElements = document.querySelectorAll('.detail-card, .family-card, .gallery-item, .timeline-item, h2, h3, p.date');
        
        // Add animation classes
        fadeElements.forEach(el => {
            el.classList.add('fade-in');
        });
        
        // Add staggered delay to cards
        document.querySelectorAll('.detail-card').forEach((card, index) => {
            card.classList.add(`fade-in-delay-${index % 3 + 1}`);
        });
        
        document.querySelectorAll('.family-card').forEach((card, index) => {
            card.classList.add(`fade-in-delay-${index + 1}`);
        });
        
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.classList.add(`fade-in-delay-${index % 3 + 1}`);
        });
        
        // Function to check visibility and add classes
        const checkScroll = () => {
            // Check hero visibility
            const heroRect = hero.getBoundingClientRect();
            if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                hero.classList.add('visible');
            }
            
            // Check sections visibility
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = (rect.top < window.innerHeight * 0.9) && (rect.bottom > 0);
                
                if (isVisible) {
                    section.classList.add('visible');
                    const elements = section.querySelectorAll('.fade-in');
                    elements.forEach(el => {
                        el.classList.add('visible');
                    });
                }
            });
            
            // Check individual elements
            fadeElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    el.classList.add('visible');
                }
            });
        };
        
        // Run on scroll and initially
        window.addEventListener('scroll', checkScroll);
        // Initial check
        setTimeout(checkScroll, 100);
    };
    
    handleScrollAnimations();

    // Theme variations (colors and layouts)
    const themes = [
        {
            primary: '#d4b08c',
            secondary: '#f8f5f1',
            accent: '#c19e67',
            text: '#555',
            dark: '#333',
            light: '#fff',
            backgroundImage: 'assets/HDS_5942.JPG',
            layoutClass: 'default-layout'
        },
        {
            primary: '#98a886',
            secondary: '#f4f7f2',
            accent: '#6d7f59',
            text: '#4a4a4a',
            dark: '#333',
            light: '#fff',
            backgroundImage: 'assets/HDS_5643.JPG',
            layoutClass: 'elegant-layout'
        },
        {
            primary: '#b3809f',
            secondary: '#f7f2f5',
            accent: '#9a5a80',
            text: '#494949',
            dark: '#333',
            light: '#fff',
            backgroundImage: 'assets/HDS_6116.JPG',
            layoutClass: 'romantic-layout'
        },
        {
            primary: '#8ca8bf',
            secondary: '#f2f5f7',
            accent: '#5b7c98',
            text: '#4a4a4a',
            dark: '#333',
            light: '#fff',
            backgroundImage: 'assets/HDS_5521.JPG',
            layoutClass: 'classic-layout'
        },
        {
            primary: '#b87a52',
            secondary: '#fdf8f3',
            accent: '#754c2e',
            text: '#4a3c32',
            dark: '#2a2118',
            light: '#fff',
            backgroundImage: 'assets/HDS_6073.JPG',
            layoutClass: 'vintage-layout'
        },
        {
            primary: '#292929',
            secondary: '#f9f9f9',
            accent: '#d9a566',
            text: '#444444',
            dark: '#1f1f1f',
            light: '#ffffff',
            backgroundImage: 'assets/HDS_4821.JPG',
            layoutClass: 'minimalist-layout'
        },
        {
            primary: '#003b5c',
            secondary: '#f5f7f9',
            accent: '#c8102e',
            text: '#333333',
            dark: '#00263a',
            light: '#ffffff',
            backgroundImage: 'assets/HDS_5560.JPG',
            layoutClass: 'professional-layout'
        }
    ];
    
    // Select a random theme
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    // Custom styles for each layout
    const layoutStyles = `
        /* Default Layout - No additional styles needed */
        
        /* Elegant Layout */
        .elegant-layout .hero {
            border-radius: 0;
            background-color: rgba(255, 255, 255, 0.92);
            border: 1px solid var(--primary-color);
        }
        
        .elegant-layout h1 {
            letter-spacing: 2px;
        }
        
        .elegant-layout .detail-card {
            border-radius: 0;
            border-bottom: 3px solid var(--accent-color);
        }
        
        .elegant-layout .family-card {
            border-radius: 0;
            border: 1px solid var(--primary-color);
            border-top-width: 4px;
        }
        
        .elegant-layout .timeline-content {
            border-radius: 0;
        }
        
        .elegant-layout .gallery-item {
            border-radius: 0;
        }
        
        /* Romantic Layout */
        .romantic-layout .hero {
            border-radius: 50px 0 50px 0;
        }
        
        .romantic-layout h1 {
            transform: rotate(-2deg);
        }
        
        .romantic-layout .detail-card {
            border-radius: 20px;
        }
        
        .romantic-layout .family-card {
            border-radius: 20px;
        }
        
        .romantic-layout .timeline-content {
            border-radius: 20px;
        }
        
        .romantic-layout .gallery-item {
            border-radius: 20px;
        }
        
        /* Classic Layout */
        .classic-layout .hero {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .classic-layout h1 {
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        
        .classic-layout .detail-card,
        .classic-layout .family-card,
        .classic-layout .timeline-content {
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }
        
        .classic-layout .gallery-item {
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
        }

        /* Vintage Layout */
        .vintage-layout {
            background-image: url('data:image/png;base64,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');
            
        }
        
        .vintage-layout h1, 
        .vintage-layout h2, 
        .vintage-layout h3 {
            font-family: 'Playfair Display', serif;
        }
        
        .vintage-layout h1 {
            font-family: 'Great Vibes', cursive;
            font-size: 5rem;
            letter-spacing: 1px;
            text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
        }
        
        .vintage-layout .hero {
            border: 8px double var(--primary-color);
            background-color: rgba(255, 255, 255, 0.85);
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.15);
        }
        
        .vintage-layout .detail-card {
            border-radius: 0;
            border: 1px solid var(--primary-color);
            position: relative;
            background-color: var(--secondary-color);
        }
        
        .vintage-layout .detail-card::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 1px solid var(--primary-color);
            opacity: 0.5;
            pointer-events: none;
        }
        
        .vintage-layout .family-card {
            border-radius: 0;
            border: 1px solid var(--primary-color);
            position: relative;
            background-color: var(--secondary-color);
        }
        
        .vintage-layout .family-card::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 1px solid var(--primary-color);
            opacity: 0.5;
            pointer-events: none;
        }
        
        .vintage-layout .timeline-content {
            border-radius: 0;
            border: 1px solid var(--primary-color);
        }
        
        .vintage-layout .timeline-dot {
            border: 3px solid var(--primary-color);
        }
        
        .vintage-layout .timeline::before {
            background-color: var(--primary-color);
            opacity: 0.5;
        }
        
        .vintage-layout .gallery-item {
            border-radius: 0;
            border: 1px solid var(--primary-color);
            padding: 10px;
            background-color: var(--light-color);
        }
        
        .vintage-layout .gallery-item img {
            filter: sepia(20%);
        }
        
        .vintage-layout .btn {
            border-radius: 0;
            border: 1px solid var(--accent-color);
        }
        
        .vintage-layout input, 
        .vintage-layout select, 
        .vintage-layout textarea {
            border-radius: 0;
            background-color: var(--secondary-color);
        }
        
        .vintage-layout section::before {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="none"/><path d="M20,50 Q30,30 50,50 T80,50" stroke="%23b87a5220" fill="none" stroke-width="0.5" /></svg>');
            background-size: 200px;
            background-repeat: repeat;
            height: 100%;
            opacity: 0.2;
        }
        
        /* Minimalist Layout */
        .minimalist-layout {
            font-family: 'Montserrat', sans-serif;
        }
        
        .minimalist-layout h1,
        .minimalist-layout h2,
        .minimalist-layout h3 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 4px;
        }
        
        .minimalist-layout h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 3.5rem;
            font-weight: 200;
            letter-spacing: 8px;
        }
        
        .minimalist-layout .hero {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 0;
            padding: 4rem 6rem;
        }
        
        .minimalist-layout .names {
            font-family: 'Montserrat', sans-serif;
            font-weight: 200;
            letter-spacing: 6px;
            text-transform: uppercase;
        }
        
        .minimalist-layout .date {
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 3px;
            font-style: normal;
            font-weight: 300;
        }
        
        .minimalist-layout .and {
            font-family: 'Montserrat', sans-serif;
            font-weight: 200;
        }
        
        .minimalist-layout .ornament {
            display: none;
        }
        
        .minimalist-layout section::before {
            content: none;
        }
        
        .minimalist-layout .detail-card,
        .minimalist-layout .family-card,
        .minimalist-layout .timeline-content {
            border-radius: 0;
            box-shadow: none;
            border: none;
            background-color: var(--secondary-color);
            transition: transform 0.3s ease;
        }
        
        .minimalist-layout .detail-card:hover,
        .minimalist-layout .family-card:hover {
            transform: translateY(-10px);
            box-shadow: none;
        }
        
        .minimalist-layout .detail-card i {
            font-size: 2rem;
        }
        
        .minimalist-layout .detail-card:hover i {
            transform: none;
        }
        
        .minimalist-layout .timeline::before {
            width: 1px;
            background-color: var(--accent-color);
        }
        
        .minimalist-layout .timeline-dot {
            width: 12px;
            height: 12px;
            border: none;
            background-color: var(--accent-color);
            box-shadow: none;
        }
        
        .minimalist-layout .timeline-item:hover .timeline-dot {
            transform: translateX(-50%);
            background-color: var(--primary-color);
        }
        
        .minimalist-layout .timeline-content::after {
            display: none;
        }
        
        .minimalist-layout .gallery-item {
            border-radius: 0;
            overflow: hidden;
            box-shadow: none;
        }
        
        .minimalist-layout .gallery-item:hover {
            box-shadow: none;
        }
        
        .minimalist-layout .gallery-item img {
            filter: grayscale(20%);
        }
        
        .minimalist-layout .gallery-item:hover img {
            transform: scale(1.05);
            filter: grayscale(0%);
        }
        
        .minimalist-layout input,
        .minimalist-layout select,
        .minimalist-layout textarea {
            border-radius: 0;
            border: 1px solid #ddd;
        }
        
        .minimalist-layout input:focus,
        .minimalist-layout select:focus,
        .minimalist-layout textarea:focus {
            border-color: var(--accent-color);
            box-shadow: none;
        }
        
        .minimalist-layout .btn {
            border-radius: 0;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 400;
            font-size: 0.8rem;
            padding: 1rem 2.5rem;
        }
        
        .minimalist-layout .theme-btn {
            border-radius: 0;
        }
        
        .minimalist-layout .countdown-item span:first-child {
            font-family: 'Montserrat', sans-serif;
            font-weight: 300;
        }
        
        .minimalist-layout .countdown-label {
            letter-spacing: 2px;
        }

        /* Professional Layout */
        .professional-layout {
            font-family: 'Montserrat', sans-serif;
        }
        
        .professional-layout h1,
        .professional-layout h2,
        .professional-layout h3 {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 600;
        }
        
        .professional-layout h1 {
            font-family: 'Great Vibes', cursive;
            font-size: 4rem;
            color: var(--dark-color);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .professional-layout .hero {
            background-color: rgba(255, 255, 255, 0.85);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            border-left: 5px solid var(--accent-color);
        }
        
        .professional-layout .detail-card,
        .professional-layout .family-card,
        .professional-layout .timeline-content {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border-left: 3px solid var(--primary-color);
        }
        
        .professional-layout .detail-card:hover,
        .professional-layout .family-card:hover {
            border-left-color: var(--accent-color);
        }
        
        .professional-layout .timeline::before {
            background-color: var(--primary-color);
        }
        
        .professional-layout .timeline-dot {
            border: 3px solid var(--primary-color);
            background-color: var(--light-color);
        }
        
        .professional-layout .gallery-item {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: none;
            overflow: hidden;
        }
        
        .professional-layout .gallery-item img {
            filter: saturate(1.1) contrast(1.1);
        }
        
        .professional-layout .btn {
            background-color: var(--primary-color);
            color: var(--light-color);
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            font-size: 0.9rem;
        }
        
        .professional-layout .btn:hover {
            background-color: var(--accent-color);
        }
        
        .professional-layout input,
        .professional-layout select,
        .professional-layout textarea {
            border-color: rgba(0, 0, 0, 0.1);
            background-color: var(--light-color);
        }
        
        .professional-layout input:focus,
        .professional-layout select:focus,
        .professional-layout textarea:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(0, 59, 92, 0.1);
        }
    `;
    
    // Apply the selected theme by changing CSS variables
    const applyTheme = () => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', randomTheme.primary);
        root.style.setProperty('--secondary-color', randomTheme.secondary);
        root.style.setProperty('--accent-color', randomTheme.accent);
        root.style.setProperty('--text-color', randomTheme.text);
        root.style.setProperty('--dark-color', randomTheme.dark);
        root.style.setProperty('--light-color', randomTheme.light);
        
        // Change header background image with a nice transition
        const header = document.querySelector('header');
        setTimeout(() => {
            header.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('${randomTheme.backgroundImage}')`;
        }, 100);
        
        // Add layout class to body
        document.body.classList.add(randomTheme.layoutClass);
        
        // Add layout styles
        const style = document.createElement('style');
        style.textContent = layoutStyles;
        document.head.appendChild(style);
    };
    
    applyTheme();
    
    // Manual theme selection buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Mark the current theme button as active
    const markActiveTheme = (index) => {
        themeButtons.forEach(btn => btn.classList.remove('active'));
        if (themeButtons[index]) {
            themeButtons[index].classList.add('active');
        }
    };
    
    // Mark the initial random theme as active
    const initialThemeIndex = themes.indexOf(randomTheme);
    markActiveTheme(initialThemeIndex);
    
    // Add click event to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const themeIndex = parseInt(this.getAttribute('data-theme'));
            
            // Add transition class to body for smooth transition
            document.body.classList.add('theme-transition');
            
            // Remove all layout classes from body
            themes.forEach(theme => {
                document.body.classList.remove(theme.layoutClass);
            });
            
            // Apply the selected theme
            const selectedTheme = themes[themeIndex];
            const root = document.documentElement;
            root.style.setProperty('--primary-color', selectedTheme.primary);
            root.style.setProperty('--secondary-color', selectedTheme.secondary);
            root.style.setProperty('--accent-color', selectedTheme.accent);
            root.style.setProperty('--text-color', selectedTheme.text);
            root.style.setProperty('--dark-color', selectedTheme.dark);
            root.style.setProperty('--light-color', selectedTheme.light);
            
            // Change header background image with a nice transition
            const header = document.querySelector('header');
            header.style.opacity = '0';
            setTimeout(() => {
                header.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('${selectedTheme.backgroundImage}')`;
                setTimeout(() => {
                    header.style.opacity = '1';
                }, 300);
            }, 300);
            
            // Add layout class to body
            document.body.classList.add(selectedTheme.layoutClass);
            
            // Update active button
            markActiveTheme(themeIndex);
            
            // Remove transition class after animation completes
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // RSVP form submission
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const attending = document.getElementById('attending').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!email || !attending || !guests) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Add success animation
            const formContainer = document.querySelector('.rsvp .container');
            formContainer.classList.add('form-success');
            
            // Create success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <h3>Thank You!</h3>
                <p>Your RSVP has been received. We're excited to celebrate with you!</p>
            `;
            
            // Hide form and show success message
            rsvpForm.style.opacity = '0';
            
            setTimeout(() => {
                rsvpForm.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Add success styles
                const style = document.createElement('style');
                style.textContent = `
                    .form-success {
                        text-align: center;
                    }
                    
                    .success-message {
                        opacity: 0;
                        transform: translateY(20px);
                        animation: fadeInUp 0.8s forwards;
                    }
                    
                    .success-icon {
                        font-size: 3rem;
                        color: var(--accent-color);
                        margin-bottom: 1rem;
                        animation: pulse 2s infinite;
                    }
                `;
                document.head.appendChild(style);
            }, 500);
            
            // Reset form (in background)
            rsvpForm.reset();
        });
    }
    
    // Image gallery animation on scroll
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Gallery image hover effect
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const otherItems = Array.from(galleryItems).filter(i => i !== item);
            otherItems.forEach(other => {
                other.style.opacity = '0.6';
                other.style.transform = 'scale(0.95)';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            galleryItems.forEach(other => {
                other.style.opacity = '1';
                other.style.transform = '';
            });
        });
    });
    
    // Countdown timer
    const countdownDate = new Date('July 17, 2025 00:00:00').getTime();
    
    // Create countdown container
    const createCountdown = () => {
        const header = document.querySelector('.hero');
        
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'countdown';
        countdownContainer.innerHTML = `
            <div class="countdown-item">
                <span id="days">00</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span id="hours">00</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span id="minutes">00</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span id="seconds">00</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
        
        // Create countdown styles
        const style = document.createElement('style');
        style.textContent = `
            .countdown {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                margin-top: 2rem;
            }
            
            .countdown-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                overflow: hidden;
            }
            
            .countdown-item span:first-child {
                font-size: 2.5rem;
                font-weight: 600;
                color: var(--accent-color);
                font-family: 'Cormorant Garamond', serif;
                position: relative;
                transition: transform 0.5s ease;
            }
            
            .countdown-item span.flip {
                animation: flipNumber 0.5s;
            }
            
            @keyframes flipNumber {
                0% {
                    transform: translateY(0);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                51% {
                    transform: translateY(100%);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .countdown-label {
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 0.3rem;
            }
            
            @media (max-width: 576px) {
                .countdown {
                    gap: 1rem;
                }
                
                .countdown-item span:first-child {
                    font-size: 1.8rem;
                }
                
                .countdown-label {
                    font-size: 0.7rem;
                }
            }
        `;
        
        document.head.appendChild(style);
        header.appendChild(countdownContainer);
    };
    
    createCountdown();
    
    // Store previous values for animation
    let prevDays, prevHours, prevMinutes, prevSeconds;
    
    // Update countdown every second in real time
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Days with animation
        const daysEl = document.getElementById('days');
        if (prevDays !== days) {
            daysEl.classList.add('flip');
            setTimeout(() => {
                daysEl.classList.remove('flip');
            }, 500);
        }
        daysEl.innerText = days.toString().padStart(2, '0');
        
        // Hours with animation
        const hoursEl = document.getElementById('hours');
        if (prevHours !== hours) {
            hoursEl.classList.add('flip');
            setTimeout(() => {
                hoursEl.classList.remove('flip');
            }, 500);
        }
        hoursEl.innerText = hours.toString().padStart(2, '0');
        
        // Minutes with animation
        const minutesEl = document.getElementById('minutes');
        if (prevMinutes !== minutes) {
            minutesEl.classList.add('flip');
            setTimeout(() => {
                minutesEl.classList.remove('flip');
            }, 500);
        }
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        
        // Seconds with animation
        const secondsEl = document.getElementById('seconds');
        if (prevSeconds !== seconds) {
            secondsEl.classList.add('flip');
            setTimeout(() => {
                secondsEl.classList.remove('flip');
            }, 500);
        }
        secondsEl.innerText = seconds.toString().padStart(2, '0');
        
        // Update previous values
        prevDays = days;
        prevHours = hours;
        prevMinutes = minutes;
        prevSeconds = seconds;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    };
    
    // Run countdown immediately
    updateCountdown();
    
    // Update the countdown every second (1000ms)
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Parallax effect for sections
    const parallaxSections = document.querySelectorAll('.invitation, .details, .families, .schedule, .gallery, .rsvp');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for header
        const headerElement = document.querySelector('header');
        headerElement.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        
        // Parallax for other sections
        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = sectionTop - scrollPosition;
            
            if (distance < window.innerHeight && distance > -section.offsetHeight) {
                const speed = section.classList.contains('invitation') ? 0.2 : 0.1;
                section.style.backgroundPositionY = (distance * speed) + 'px';
            }
        });
    });

    // Add floating hearts animation
    const addFloatingHearts = () => {
        const style = document.createElement('style');
        style.textContent = `
            .floating-heart {
                position: fixed;
                color: var(--primary-color);
                opacity: 0;
                z-index: -1;
                animation: floatHeart 6s ease-in forwards;
                text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            }
            
            @keyframes floatHeart {
                0% {
                    opacity: 0;
                    transform: translateY(0) rotate(0deg);
                }
                20% {
                    opacity: 0.6;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Create hearts periodically
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.animationDuration = (Math.random() * 6 + 4) + 's';
            
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                document.body.removeChild(heart);
            }, 10000);
        }, 2000);
    };
    
    addFloatingHearts();
}); 