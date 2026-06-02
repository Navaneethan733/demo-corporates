// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Smooth exit for preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Trigger hero text animations after preloader disappears
        initHeroTextAnimation();
    }, 600);
});

// 1. Precise Letter-by-Letter Hero Text Animation
function initHeroTextAnimation() {
    const heroHeadline = document.getElementById('hero-headline');
    if (!heroHeadline) return;
    
    // The target text: "Built for Business Designed for <span class='text-primary'>Success.</span>"
    const textParts = [
        { text: "Built for Business Designed for ", isPrimary: false },
        { text: "Success.", isPrimary: true }
    ];
    
    let charIndex = 0;
    
    textParts.forEach(part => {
        // Create a wrapper for this part of the text
        const partWrapper = document.createElement('span');
        if (part.isPrimary) partWrapper.className = 'text-primary';
        
        // Split by words and spaces
        const items = part.text.split(/(\s+)/);
        
        items.forEach(item => {
            if (!item) return; // skip empty strings
            
            if (/\s+/.test(item)) {
                // It's whitespace - append standard space text nodes
                [...item].forEach(() => {
                    const spaceNode = document.createTextNode(' ');
                    partWrapper.appendChild(spaceNode);
                    charIndex++;
                });
            } else {
                // It's a word - wrap in a container that prevents line breaking inside the word
                const wordSpan = document.createElement('span');
                wordSpan.className = 'hero-word';
                
                [...item].forEach(char => {
                    const charWrap = document.createElement('span');
                    charWrap.className = 'char-wrap';
                    
                    const charInner = document.createElement('span');
                    charInner.className = 'char-inner';
                    charInner.textContent = char;
                    
                    // Stagger transition delay
                    charInner.style.transitionDelay = `${charIndex * 0.03}s`;
                    
                    charWrap.appendChild(charInner);
                    wordSpan.appendChild(charWrap);
                    charIndex++;
                });
                
                partWrapper.appendChild(wordSpan);
            }
        });
        
        heroHeadline.appendChild(partWrapper);
    });

    // Small timeout to allow DOM to render before adding the trigger class
    setTimeout(() => {
        heroHeadline.classList.add('animate-char');
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Prepare Scroll Text Animations (Word by Word)
    const splitTextElements = document.querySelectorAll('.split-words-scroll');
    
    splitTextElements.forEach(el => {
        const text = el.getAttribute('data-text');
        if (!text) return;
        
        // Clear element
        el.innerHTML = '';
        
        const words = text.split(' ');
        
        words.forEach((word, index) => {
            const wordWrap = document.createElement('span');
            wordWrap.className = 'word-wrap';
            
            const wordInner = document.createElement('span');
            wordInner.className = 'word-inner';
            
            // Highlight specific words with primary color
            if (word.includes('Expertise.') || word.includes('Success.') || word.includes('Worldwide')) {
                wordInner.classList.add('text-primary');
            }

            wordInner.textContent = word + ' ';
            wordInner.style.transitionDelay = `${index * 0.08}s`; // Stagger words
            
            wordWrap.appendChild(wordInner);
            el.appendChild(wordWrap);
        });
        
        // Add to scroll anims so it triggers when in view
        el.classList.add('scroll-anim');
    });

    // 3. Scroll Animations using IntersectionObserver
    const scrollElements = document.querySelectorAll('.scroll-anim');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it contains a counter, trigger it
                const counter = entry.target.querySelector('.counter-anim');
                if (counter && !counter.classList.contains('counted')) {
                    runCounter(counter);
                    counter.classList.add('counted');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => {
        observer.observe(el);
    });
    
    // Extra observer for elements that are just containers for counters (like about-content)
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const counter = entry.target.querySelector('.counter-anim');
                    if (counter && !counter.classList.contains('counted')) {
                        runCounter(counter);
                        counter.classList.add('counted');
                    }
                }
            })
        }, { threshold: 0.5 });
        aboutObserver.observe(aboutContent);
    }

    // Number Counter Animation
    function runCounter(counterEl) {
        const target = parseInt(counterEl.getAttribute('data-target'));
        const duration = 1500; // ms
        const steps = 30;
        const stepTime = Math.abs(Math.floor(duration / steps));
        let current = 0;
        
        const timer = setInterval(() => {
            current += (target / steps);
            if (current >= target) {
                counterEl.textContent = target;
                clearInterval(timer);
            } else {
                counterEl.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // 4. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });
    }
});
