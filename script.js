// Synthetic Panels - Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initHeroDemo();
    initStepNavigation();
    initUploadDemo();
    initCounters();
    initScrollReveal();
    initSmoothScroll();
});

// ============================================
// HERO DEMO - Typing Animation & Persona Cards
// ============================================

const personas = [
    { 
        name: 'Sarah Chen', 
        type: 'High-Value Customer',
        avatar: '👩‍💼',
        response: "Price isn't my main concern — it's the integration headaches. If a competitor offered seamless Shopify sync, I'd seriously consider switching."
    },
    { 
        name: 'Marcus Thompson', 
        type: 'Price-Sensitive',
        avatar: '👨‍🔧',
        response: "Honestly? A 15% discount would do it. I like your product, but margins are tight right now."
    },
    { 
        name: 'Emma Rodriguez', 
        type: 'Power User',
        avatar: '👩‍💻',
        response: "Better API documentation and webhook support. I've hit limitations that shouldn't exist in 2026."
    },
    { 
        name: 'James Wilson', 
        type: 'New Customer',
        avatar: '👨‍💼',
        response: "I'm still learning the platform. Honestly, better onboarding would make me more committed long-term."
    }
];

const demoQuestion = "What would make you consider switching to a competitor?";

function initHeroDemo() {
    const questionEl = document.getElementById('typing-question');
    const cursorEl = document.getElementById('cursor');
    const containerEl = document.getElementById('persona-container');
    
    if (!questionEl || !containerEl) return;
    
    let charIndex = 0;
    
    // Type out the question
    function typeQuestion() {
        if (charIndex < demoQuestion.length) {
            questionEl.textContent = demoQuestion.slice(0, charIndex + 1);
            charIndex++;
            setTimeout(typeQuestion, 50 + Math.random() * 30);
        } else {
            // Hide cursor, show personas
            if (cursorEl) cursorEl.style.display = 'none';
            setTimeout(showPersonas, 500);
        }
    }
    
    // Show persona cards one by one
    function showPersonas() {
        personas.forEach((persona, index) => {
            setTimeout(() => {
                const card = createPersonaCard(persona, index);
                containerEl.appendChild(card);
                
                // Trigger animation
                requestAnimationFrame(() => {
                    card.classList.add('visible');
                });
                
                // Start typing response after card appears
                setTimeout(() => {
                    typeResponse(card.querySelector('.response-text'), persona.response);
                }, 300);
                
            }, index * 400);
        });
    }
    
    // Create persona card element
    function createPersonaCard(persona, index) {
        const card = document.createElement('div');
        card.className = 'persona-card bg-dark border border-white/10 rounded-lg p-4 flex gap-3';
        card.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-lg">
                ${persona.avatar}
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-white text-sm font-medium">${persona.name}</span>
                    <span class="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">${persona.type}</span>
                </div>
                <p class="text-gray-400 text-sm response-text"></p>
            </div>
        `;
        return card;
    }
    
    // Type out response text
    function typeResponse(element, text) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent = text.slice(0, i + 1);
                i++;
                setTimeout(type, 15 + Math.random() * 10);
            }
        }
        type();
    }
    
    // Start after a short delay
    setTimeout(typeQuestion, 1000);
    
    // Restart demo periodically
    setInterval(() => {
        charIndex = 0;
        questionEl.textContent = '';
        if (cursorEl) cursorEl.style.display = 'inline-block';
        containerEl.innerHTML = '';
        setTimeout(typeQuestion, 1000);
    }, 20000);
}

// ============================================
// STEP NAVIGATION
// ============================================

function initStepNavigation() {
    const stepBtns = document.querySelectorAll('.step-btn');
    const stepContents = document.querySelectorAll('.step-content');
    const progressBars = document.querySelectorAll('.step-progress');
    
    let currentStep = 1;
    let autoAdvance;
    
    function goToStep(step) {
        currentStep = step;
        
        // Update buttons
        stepBtns.forEach((btn, index) => {
            const btnStep = parseInt(btn.dataset.step);
            btn.classList.toggle('active', btnStep === step);
            if (btnStep < step) {
                btn.classList.add('bg-primary', 'text-dark');
                btn.classList.remove('bg-white/10', 'text-gray-400');
            } else if (btnStep > step) {
                btn.classList.remove('bg-primary', 'text-dark');
                btn.classList.add('bg-white/10', 'text-gray-400');
            }
        });
        
        // Update progress bars
        progressBars.forEach((bar, index) => {
            bar.style.width = index < step - 1 ? '100%' : '0%';
        });
        
        // Update content
        stepContents.forEach(content => {
            const contentStep = parseInt(content.dataset.step);
            content.classList.toggle('active', contentStep === step);
            content.classList.toggle('hidden', contentStep !== step);
        });
        
        // Trigger step-specific animations
        if (step === 2) {
            setTimeout(animatePersonaGeneration, 300);
        } else if (step === 3) {
            setTimeout(animateChatResponse, 300);
        }
    }
    
    // Click handlers
    stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const step = parseInt(btn.dataset.step);
            goToStep(step);
            resetAutoAdvance();
        });
    });
    
    // Auto-advance
    function resetAutoAdvance() {
        clearInterval(autoAdvance);
        autoAdvance = setInterval(() => {
            const nextStep = currentStep >= 3 ? 1 : currentStep + 1;
            goToStep(nextStep);
        }, 8000);
    }
    
    resetAutoAdvance();
}

// ============================================
// STEP 2: PERSONA GENERATION ANIMATION
// ============================================

const samplePersonas = [
    { avatar: '👩‍💼', name: 'High-Value', count: '234' },
    { avatar: '👨‍🔧', name: 'Price-Sensitive', count: '445' },
    { avatar: '👩‍💻', name: 'Power Users', count: '189' },
    { avatar: '👨‍💼', name: 'New Users', count: '312' },
    { avatar: '👩‍🎨', name: 'Churned', count: '156' },
    { avatar: '👨‍🔬', name: 'Enterprise', count: '78' },
];

function animatePersonaGeneration() {
    const grid = document.getElementById('persona-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    samplePersonas.forEach((persona, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'persona-card bg-dark border border-white/10 rounded-lg p-4 text-center';
            card.innerHTML = `
                <div class="text-3xl mb-2">${persona.avatar}</div>
                <div class="text-white text-sm font-medium mb-1">${persona.name}</div>
                <div class="text-primary text-xs">${persona.count} personas</div>
            `;
            grid.appendChild(card);
            
            requestAnimationFrame(() => {
                card.classList.add('visible');
            });
        }, index * 150);
    });
}

// ============================================
// STEP 3: CHAT RESPONSE ANIMATION
// ============================================

const chatResponse = "Based on 847 persona responses: 42% cite integration issues as primary switch trigger. 28% are price-sensitive (would switch for 15%+ discount). 18% want better API/developer tools. 12% mention onboarding friction. Recommendation: Prioritize Shopify integration and improve documentation.";

function animateChatResponse() {
    const responseEl = document.getElementById('chat-response');
    if (!responseEl) return;
    
    responseEl.textContent = '';
    let i = 0;
    
    function type() {
        if (i < chatResponse.length) {
            responseEl.textContent = chatResponse.slice(0, i + 1);
            i++;
            setTimeout(type, 10 + Math.random() * 5);
        }
    }
    
    type();
}

// ============================================
// UPLOAD DEMO
// ============================================

function initUploadDemo() {
    const uploadZone = document.getElementById('upload-zone');
    const uploadedFile = document.getElementById('uploaded-file');
    
    if (!uploadZone || !uploadedFile) return;
    
    uploadZone.addEventListener('click', () => {
        // Simulate file upload
        uploadZone.classList.add('dragging');
        setTimeout(() => {
            uploadZone.classList.remove('dragging');
            uploadedFile.classList.remove('hidden');
        }, 500);
    });
    
    // Drag and drop visual feedback
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragging');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragging');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragging');
        uploadedFile.classList.remove('hidden');
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = prefix + current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// SCROLL REVEAL
// ============================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('section > div');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});
