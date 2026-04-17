document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Countdown Timer
    let countDownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000) + (59 * 60 * 1000) + (53 * 1000);
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) { clearInterval(x); document.querySelector(".countdown").innerHTML = "OFFER EXPIRED"; }
    }, 1000);

    // 2. FAQ Accordion
    document.querySelectorAll('.faq-item h3').forEach(item => {
        item.addEventListener('click', () => {
            item.parentElement.classList.toggle('active');
        });
    });

    // 3. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        } else {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // 4. Mobile Menu - FIXED: শুধু # লিংক ধরবে, WhatsApp না
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#pricing">Order Now</a>
        <a href="https://wa.me/8801639366783?text=Boss%20Landing%20Page%20সম্পর্কে%20জানতে%20চাই" target="_blank">Contact WhatsApp</a>
    `;
    document.body.appendChild(mobileMenu);

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // 5. FIX: শুধু # দিয়ে শুরু লিংক prevent করবে। WhatsApp লিংক না
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                mobileMenu.classList.remove('active');
            } else {
                // WhatsApp লিংক হলে মেনু বন্ধ করে দাও
                mobileMenu.classList.remove('active');
            }
        });
    });

    // 6. Page Load এ Theme চেক
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
});

// 7. Global Scroll Function
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) mobileMenu.classList.remove('active');
}