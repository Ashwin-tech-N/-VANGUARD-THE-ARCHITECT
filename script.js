(function() {
    emailjs.init("uDunuTGlSk2qTKW3p");
})();

function sendRaven(event) {
    event.preventDefault();
    
    const btn = document.querySelector('#ravenForm button');
    const originalText = btn.innerText;
    btn.innerText = "SENDING...";

    emailjs.sendForm(
        "service_6db2ef6",
        "template_5w9hw24",
        "#ravenForm"
    ).then(
        function () {
            alert("🕊️ Raven sent successfully");
            document.getElementById("ravenForm").reset();
            btn.innerText = originalText;
        },
        function (error) {
            alert("❌ Raven failed\n" + JSON.stringify(error));
            btn.innerText = originalText;
        }
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('loader-strike');
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            triggerArrival();
        }, 800);
    }, 2800);
    
    const emberContainer = document.getElementById('ember-container');
    const emberCount = 50;

    for(let i=0; i<emberCount; i++){
        const ember = document.createElement('div');
        ember.classList.add('ember');
        ember.style.left = Math.random() * 100 + 'vw';
        ember.style.animationDuration = (Math.random() * 3 + 4) + 's';
        ember.style.animationDelay = (Math.random() * 5) + 's';
        const drift = (Math.random() * 100 - 50) + 'px';
        ember.style.setProperty('--drift', drift);
        const size = Math.random() * 3 + 2 + 'px';
        ember.style.width = size;
        ember.style.height = size;
        emberContainer.appendChild(ember);
    }

    initCarousels();
    
    initMobileTouchSupport();
    
    scrollToFirstCardOnMobile();
});

function triggerArrival() {
    const nav = document.getElementById('main-nav');
    if(nav) nav.classList.add('entered');

    document.querySelectorAll('.ice-text').forEach((el, index) => {
        setTimeout(() => { el.classList.add('thawed'); }, index * 300);
    });

    setTimeout(() => {
        document.querySelectorAll('.blade-swipe').forEach(el => {
            el.classList.add('slashed');
        });
    }, 600);

    const heroElements = document.querySelectorAll('.hero-element');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('entered');
        }, 1000 + (index * 200));
    });

    setupObserver();
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            if(entry.target.classList.contains('stone-border-box')) {
                entry.target.classList.add('cracked');
            }
            if(entry.target.classList.contains('rune-reveal')) {
                entry.target.classList.add('active');
            }
            const swipes = entry.target.querySelectorAll('.blade-swipe');
            swipes.forEach(s => s.classList.add('slashed'));

            if(entry.target.classList.contains('scroll-card')) {
                const delay = parseFloat(getComputedStyle(entry.target).transitionDelay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('active-reveal');
                }, delay * 1000); 
            }
        }
    });
}, observerOptions);

function setupObserver() {
    document.querySelectorAll('.reveal-up, .stone-border-box, .scroll-card, .rune-reveal').forEach(el => {
        observer.observe(el);
    });
}


let ticking = false;

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleMessengerSword();
            handleScrollWaves();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });


function initMobileTouchSupport() {
    const scrollContainers = document.querySelectorAll('.horizontal-scroll');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        container.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        }, { passive: true });
        
        container.addEventListener('touchend', () => {
            isDown = false;
        });
        
        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    });
}


function scrollToFirstCardOnMobile() {
    if (window.innerWidth > 767) return; 
    
    const armoryScroll = document.getElementById('armory-scroll');
    const credentialsScroll = document.getElementById('credentials-scroll');
    
    setTimeout(() => {
        if (armoryScroll) {
            armoryScroll.scrollLeft = 0;
        }
        if (credentialsScroll) {
            credentialsScroll.scrollLeft = 0;
        }
    }, 100);
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 767) {
        setTimeout(scrollToFirstCardOnMobile, 300);
    }
});

function handleMessengerSword() {
    const alchemy = document.getElementById('alchemy-segment');
    const target = document.getElementById('sword-impact-area');
    const swordContainer = document.body;
    
    if (!alchemy || !target) return;

    const alchemyRect = alchemy.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const centerPoint = viewportHeight / 2;

    const alchemyPassed = alchemyRect.bottom < centerPoint;
    const targetNotReached = targetRect.top > centerPoint;
    
    if (alchemyPassed && targetNotReached) {
        document.body.classList.add('flying-active');
        target.parentElement.classList.remove('impact-active'); 
    } 
    else if (alchemyPassed && !targetNotReached) {
        document.body.classList.remove('flying-active');
        target.parentElement.classList.add('impact-active');
    } 
    else {
        document.body.classList.remove('flying-active');
        target.parentElement.classList.remove('impact-active');
    }
}

function handleScrollWaves() {
    const scrollY = window.scrollY;
    const waves = document.querySelectorAll('.parallax-waves use');
    
    waves.forEach((wave, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const speed = 0.5 + (index * 0.2);
        const xOffset = scrollY * speed * direction;
        wave.style.transform = `translateX(${xOffset}px)`;
    });
}

function initCarousels() {
    const containers = document.querySelectorAll('.horizontal-scroll');
    
    if(containers.length === 0) return;

    setTimeout(() => {
        
        containers.forEach(container => {
            const cards = container.querySelectorAll('.scroll-card');
            
            if(cards.length === 0) return;

            cards.forEach(card => {
                card.style.transition = 'opacity 0.2s ease';
            });

            function updateContainer() {
                const scrollCenter = container.scrollLeft + (container.offsetWidth / 2);
                const viewportCenter = container.offsetWidth / 2;
                
                cards.forEach(card => {
                    const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                    const dist = Math.abs(scrollCenter - cardCenter);
                    
                    const maxDist = viewportCenter * 1.2; 
                    
                    let scale = 1 - (dist / maxDist) * 0.35;
                    scale = Math.max(0.85, Math.min(1.05, scale)); 
                    
                    let opacity = 1 - (dist / maxDist) * 1.2;
                    opacity = Math.max(0.3, Math.min(1, opacity)); 

                    card.style.transform = `scale(${scale})`;
                    card.style.opacity = opacity;

                    if (dist < 100) {
                        card.classList.add('is-center');
                        card.style.zIndex = 10;
                    } else {
                        card.classList.remove('is-center');
                        card.style.zIndex = 1;
                    }
                });
            }

            container.addEventListener('scroll', () => window.requestAnimationFrame(updateContainer), { passive: true });
            window.addEventListener('resize', () => window.requestAnimationFrame(updateContainer));
            
            updateContainer();
        });

    }, 2000); 
}
