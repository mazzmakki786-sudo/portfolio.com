/**
 * MUAZ MAKI — RENDERING ENGINE
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    // 1. INITIAL RENDER
    renderHero(data);
    renderAbout(data);
    renderSkills(data);
    renderProjects(data);
    renderServices(data);
    renderPricing(data);
    renderTestimonials(data);
    renderContact(data);
    updateFooter(data);

    // 2. CORE SYSTEMS
    initStarfield();
    initCursor();
    initScrollProgress();
    initRevealAnimations();
    initTheme();
    initMobileMenu();
    initTyped(data.hero.typedPhrases);
    initRotators(data);
    initContactForm(data);
    initProjectSliders(); // Added for mobile movement
});

// --- RENDER FUNCTIONS ---

function renderHero(data) {
    document.getElementById('nav-logo').textContent = data.owner.brand;
    document.getElementById('name-line1').textContent = data.owner.nameLine1;
    document.getElementById('name-line2').textContent = data.owner.nameLine2;

    const btnContainer = document.getElementById('hero-btns');
    data.hero.buttons.forEach(btn => {
        const a = document.createElement('a');
        a.href = btn.link;
        a.className = btn.class;
        if (btn.target) a.target = btn.target;

        if (btn.class === 'btn-white') {
            a.innerHTML = `${btn.label} <svg class="cta-icon" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`;
        } else {
            a.textContent = btn.label;
        }

        btnContainer.appendChild(a);
    });
}

function renderAbout(data) {
    const grid = document.getElementById('stats-grid');
    grid.innerHTML = ''; // Clear previous
    data.about.stats.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `
            <div class="stat-main">
                <span class="stat-value">${stat.value}</span>
            </div>
            <div class="stat-info">
                <span class="stat-label">${stat.label}</span>
            </div>
        `;
        grid.appendChild(div);
    });

    const frame = document.getElementById('photo-frame');
    if (frame && data.about.image) {
        // Simplified structure for the new "Plate" styling
        frame.innerHTML = `
            <img src="${data.about.image}" alt="Muaz Maki" class="about-photo" loading="lazy">
            <div class="frame-overlay"></div>
        `;
    }

    document.getElementById('location-text').textContent = data.about.location;
}

function renderSkills(data) {
    const grid = document.getElementById('skills-grid');
    data.skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.innerHTML = `
            <div class="skill-info">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-fill" data-level="${skill.level}"></div>
            </div>
        `;
        grid.appendChild(div);
    });
}

function renderProjects(data) {
    const grid = document.getElementById('projects-grid');
    const html = data.projects.map(p => `
        <div class="project-card">
            <div class="project-glow"></div>
            <div class="p-header">
                <span class="p-id">${p.id}</span>
                <h3 class="p-title">${p.name}</h3>
                <p class="p-type">${p.type}</p>
            </div>
            <div class="p-footer">
                <div class="p-tags">
                    ${p.tags.map(t => `<span class="p-tag">${t}</span>`).join('')}
                </div>
                <a href="${p.link}" target="_blank" class="p-arrow">↗</a>
            </div>
        </div>
    `).join('');

    grid.innerHTML = html + html;

    // Add glow logic back to dynamic elements (only if not on touch)
    if (!window.matchMedia('(hover: none)').matches) {
        grid.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mx', `${x}%`);
                card.style.setProperty('--my', `${y}%`);
            });
        });
    }
}

function renderServices(data) {
    const grid = document.getElementById('services-grid');
    grid.innerHTML = '';

    function createServiceCard(s) {
        const div = document.createElement('div');
        div.className = 'service-card';
        div.innerHTML = `
            <h3 class="s-name">${s.name}</h3>
            <p class="s-price">${s.price}</p>
        `;
        div.onclick = () => {
            const select = document.getElementById('form-service');
            select.value = s.name;
            document.getElementById('contact').scrollIntoView();
        };
        return div;
    }

    // Render original and duplicate for infinite scroll
    data.services.forEach(s => grid.appendChild(createServiceCard(s)));
    data.services.forEach(s => grid.appendChild(createServiceCard(s)));

    // Initialize Form Options (only once)
    const select = document.getElementById('form-service');
    if (select) {
        select.innerHTML = '<option value="">Select a service</option>';
        data.services.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.name;
            opt.textContent = s.name;
            select.appendChild(opt);
        });
    }
}


function renderPricing(data) {
    const grid = document.getElementById('pricing-grid');
    const nav = document.getElementById('pricing-nav');
    if (!grid || !nav) return;

    function draw(type) {
        grid.innerHTML = '';
        const plans = data.pricing[type];
        if (!plans) return;

        plans.forEach(p => {
            const div = document.createElement('div');
            div.className = `pricing-card ${p.popular ? 'popular' : ''}`;

            div.innerHTML = `
                ${p.popular ? '<span class="pop-badge">POPULAR</span>' : ''}
                <span class="pr-name">${p.name}</span>
                <div class="pr-price-wrap">
                    <span class="currency">Rs.</span>
                    <h3 class="pr-price">${p.price}</h3>
                    ${p.duration ? `<span class="duration">/ ${p.duration}</span>` : ''}
                </div>
                <div class="pr-setup-wrap">
                    <span class="pr-setup">SETUP FEE: Rs. ${p.setup}</span>
                </div>
                <ul class="pr-features">
                    <li><span class="check">✓</span> Required setup fee</li>
                    <li><span class="check">✓</span> Professional design</li>
                    <li><span class="check">✓</span> Mobile friendly</li>
                </ul>
                <button class="btn-p" onclick="preSelectService('${p.name}')">Get Started</button>
            `;
            grid.appendChild(div);
        });
    }

    // Initialize with onetime
    draw('onetime');

    const btns = nav.querySelectorAll('.toggle-btn');
    btns.forEach(btn => {
        btn.onclick = () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            draw(btn.dataset.type);
        };
    });
}

function renderTestimonials(data) {
    const grid = document.getElementById('testimonials-grid');
    data.testimonials.forEach(t => {
        const div = document.createElement('div');
        div.className = 'test-card';
        div.innerHTML = `
            <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
            <p class="test-text">"${t.text}"</p>
            <div class="test-author">
                <span class="t-name">${t.name}</span>
                <span class="t-role">${t.role}</span>
            </div>
        `;
        grid.appendChild(div);
    });
}

function renderContact(data) {
    document.getElementById('contact-email').textContent = data.contact.email;
    document.getElementById('contact-phone').textContent = data.contact.whatsapp;
    document.getElementById('contact-desc').textContent = data.contact.description;

    // Populate service dropdown dynamically
    const serviceSelect = document.getElementById('form-service');
    if (serviceSelect) {
        // Keep the first default disabled option
        const defaultOption = serviceSelect.options[0];
        serviceSelect.innerHTML = '';
        serviceSelect.appendChild(defaultOption);

        data.services.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.name;
            opt.textContent = s.name;
            serviceSelect.appendChild(opt);
        });
    }
}

function updateFooter(data) {
    document.getElementById('footer-logo').textContent = data.owner.brand; // Consistent with nav
    document.getElementById('footer-owner').textContent = data.owner.footerRight;
}

// Pre-select service from pricing cards
function preSelectService(serviceName) {
    const serviceSelect = document.getElementById('form-service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
        // Scroll to contact
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
}

// Hybrid WhatsApp + Email Handler
function initContactForm(data) {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // 1. Gather Data
        const name = document.getElementById('form-name').value;
        const whatsapp = document.getElementById('form-whatsapp').value;
        const service = document.getElementById('form-service').value;
        const msg = document.getElementById('form-message').value;

        // 2. Construct WhatsApp Link
        const waNumber = "923146325823";
        const waText = encodeURIComponent(
            `*New Project Inquiry*\n\n` +
            `*Name:* ${name}\n` +
            `*WhatsApp/Phone:* ${whatsapp}\n` +
            `*Interested In:* ${service}\n` +
            `*Message:* ${msg}`
        );
        const waURL = `https://wa.me/${waNumber}?text=${waText}`;

        // 3. UI Loading State
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';

        try {
            // 4. Send to Formspree (Email)
            const formData = new FormData(form);
            await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            // 5. Open WhatsApp
            window.open(waURL, '_blank');

            // 6. Success State
            submitBtn.textContent = 'MESSAGE SENT!';
            submitBtn.style.background = '#25D366';
            submitBtn.style.color = '#fff';
            form.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 5000);

        } catch (error) {
            console.error("Form Error:", error);
            submitBtn.textContent = 'ERROR - TRY AGAIN';
            submitBtn.disabled = false;
        }
    };
}

// --- CORE SYSTEMS ---

function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, stars = [];
    let animationId = null;
    let isRunning = false;

    const isMobile = () => window.innerWidth < 600;
    const getCount = () => isMobile() ? 40 : 120;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        const count = getCount();
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * (isMobile() ? 1 : 1.5),
                speed: Math.random() * (isMobile() ? 0.02 : 0.04),
                opacity: Math.random() * 0.7 + 0.3
            });
        }
    }

    function draw() {
        if (!isRunning) return;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#d2e1ff';

        stars.forEach(s => {
            ctx.globalAlpha = s.opacity;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();

            s.y -= s.speed * 15;
            if (s.y < 0) s.y = h;
        });

        animationId = requestAnimationFrame(draw);
    }

    function start() {
        if (!isRunning) {
            isRunning = true;
            draw();
        }
    }

    function stop() {
        isRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0 });

    observer.observe(canvas);
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(resize, 200);
    }, { passive: true });
    resize();
}

function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const label = document.getElementById('cursor-label');

    if (window.matchMedia('(hover: none)').matches) {
        dot.style.display = 'none';
        ring.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    document.querySelectorAll('a, button, .service-card, .pricing-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '70px';
            ring.style.height = '70px';
            if (el.classList.contains('project-card')) {
                label.textContent = 'View Project';
                label.style.opacity = 1;
            }
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '40px';
            ring.style.height = '40px';
            label.style.opacity = 0;
        });
    });
}

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    const nav = document.querySelector('nav');
    let ticking = false;

    function updateScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";

        if (winScroll > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });
}

function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Skills special
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('.skill-fill').forEach(fill => {
                        fill.style.width = fill.getAttribute('data-level') + '%';
                    });
                }
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initTheme() {
    const btn = document.getElementById('theme-toggle');
    const body = document.body;

    // Load preference
    const saved = localStorage.getItem('ptf_theme');
    if (saved) {
        body.setAttribute('data-theme', saved);
    }

    btn.onclick = () => {
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        // Prevent transition lag
        body.classList.add('no-transition');
        body.setAttribute('data-theme', next);
        localStorage.setItem('ptf_theme', next);

        setTimeout(() => {
            body.classList.remove('no-transition');
        }, 100);
    };
}

function initMobileMenu() {
    const ham = document.querySelector('.hamburger');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const body = document.body;

    function toggleMenu() {
        if (!ham || !menu || !overlay) return;
        ham.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    if (ham) ham.onclick = toggleMenu;
    if (overlay) overlay.onclick = toggleMenu;

    menu.querySelectorAll('a').forEach(link => {
        link.onclick = toggleMenu;
    });
}

function initTyped(phrases) {
    const el = document.getElementById('typed-text');
    let pIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const full = phrases[pIdx];
        if (isDeleting) {
            el.textContent = full.substring(0, charIdx--);
        } else {
            el.textContent = full.substring(0, charIdx++);
        }

        let speed = isDeleting ? 48 : 82;

        if (!isDeleting && charIdx > full.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx < 0) {
            isDeleting = false;
            pIdx = (pIdx + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }
    type();
}

function initRotators(data) {
    // Hero tags
    const tagEl = document.getElementById('rotating-tag');
    let tIdx = 0;
    setInterval(() => {
        tagEl.classList.remove('active');
        setTimeout(() => {
            tIdx = (tIdx + 1) % data.hero.rotatingTags.length;
            tagEl.textContent = data.hero.rotatingTags[tIdx];
            tagEl.classList.add('active');
        }, 400);
    }, 2500);
    tagEl.classList.add('active');

    // Bio lines
    const bioEl = document.getElementById('bio-rotator');
    let bIdx = 0;
    setInterval(() => {
        bioEl.style.opacity = 0;
        setTimeout(() => {
            bIdx = (bIdx + 1) % data.about.bioLines.length;
            bioEl.textContent = data.about.bioLines[bIdx];
            bioEl.style.opacity = 1;
        }, 500);
    }, 4000);
    bioEl.textContent = data.about.bioLines[0];

    // Contact titles
    const contactTitle = document.getElementById('contact-title');
    let cIdx = 0;
    setInterval(() => {
        contactTitle.style.opacity = 0;
        setTimeout(() => {
            cIdx = (cIdx + 1) % data.contact.titles.length;
            contactTitle.textContent = data.contact.titles[cIdx];
            contactTitle.style.opacity = 1;
        }, 500);
    }, 3500);
}


function initProjectSliders() {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    if (!isMobile) return;

    setupSlider('project-slider-wrapper', 0.5); // Slow movement
    setupSlider('service-slider-wrapper', -0.4); // Slow reverse movement

    function setupSlider(className, speed) {
        const wrapper = document.querySelector(`.${className}`);
        if (!wrapper) return;

        let isPaused = false;
        let scrollPos = wrapper.scrollLeft;
        let resumeTimer = null;

        function animate() {
            if (!isPaused) {
                scrollPos += speed;
                const max = wrapper.scrollWidth / 2;

                if (speed > 0 && scrollPos >= max) scrollPos = 0;
                if (speed < 0 && scrollPos <= 0) scrollPos = max;

                wrapper.scrollLeft = scrollPos;
            }
            requestAnimationFrame(animate);
        }

        wrapper.addEventListener('touchstart', () => {
            isPaused = true;
            if (resumeTimer) clearTimeout(resumeTimer);
        }, { passive: true });

        wrapper.addEventListener('touchend', () => {
            // Update scrollPos to current position after manual swipe
            scrollPos = wrapper.scrollLeft;
            resumeTimer = setTimeout(() => {
                isPaused = false;
            }, 2000); // Resume after 2s
        }, { passive: true });

        // Initialize scroll position if reverse
        if (speed < 0 && scrollPos === 0) {
            scrollPos = wrapper.scrollWidth / 2;
            wrapper.scrollLeft = scrollPos;
        }

        requestAnimationFrame(animate);
    }
}
