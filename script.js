document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active navigation item
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typing effect for hero section
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Computer Science Graduate", "Java Developer", "Python Enthusiast", "AI & ML Enthusiast"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Skills progress bar animation
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkills = () => {
        skillBars.forEach(skill => {
            const percentage = skill.getAttribute('data-percentage');
            skill.style.width = percentage;
        });
    };

    // Trigger skill animation when the skills section is in view
    const skillsSection = document.querySelector('#skills');
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateSkills();
        }
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Project details toggle
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const toggleBtn = card.querySelector('.toggle-details');
        const details = card.querySelector('.project-details');
        
        toggleBtn.addEventListener('click', () => {
            details.classList.toggle('show');
            toggleBtn.textContent = details.classList.contains('show') ? 'Hide Details' : 'Show Details';
        });
    });
});