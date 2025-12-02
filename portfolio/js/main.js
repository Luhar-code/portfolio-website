// js/main.js
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 100
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top functionality
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission handling for Formspree with enhanced UX
    const contactForm = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendBtn');

    if (contactForm && sendBtn) {
        contactForm.addEventListener('submit', function (e) {
            // Store original button state
            const originalBtnHTML = sendBtn.innerHTML;
            const originalBtnClass = sendBtn.className;

            // Show loading state
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            sendBtn.disabled = true;
            sendBtn.classList.remove('btn-primary');
            sendBtn.classList.add('btn-secondary');

            // Form will submit to Formspree normally
            // This just enhances UX with visual feedback

            // Reset button after 5 seconds (in case Formspree redirect doesn't happen)
            setTimeout(() => {
                sendBtn.innerHTML = originalBtnHTML;
                sendBtn.className = originalBtnClass;
                sendBtn.disabled = false;
            }, 5000);
        });
    }

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Skill progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));

    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage ||
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === './')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // Add transition to all internal links
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                // Add a small fade out effect before navigating
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.2s ease';

                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Initialize page with smooth animations
    setTimeout(() => {
        AOS.refresh();
    }, 100);

    // Mobile menu close on click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navLinks && navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Add loading state to all form submissions
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function () {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.hasAttribute('data-no-loading')) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
                submitBtn.disabled = true;

                // Reset after 10 seconds just in case
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 10000);
            }
        });
    });

    // Add year to footer automatically
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add copy email to clipboard functionality
    const emailElement = document.querySelector('.email-address');
    if (emailElement) {
        emailElement.addEventListener('click', function () {
            const email = this.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip or notification
                const originalText = this.textContent;
                this.textContent = 'Copied to clipboard!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
});

// Add this for better mobile experience
window.addEventListener('resize', function () {
    AOS.refresh();
});