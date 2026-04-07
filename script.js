// Mobile menu toggle
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});


// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("shadow-lg");
    } else {
        navbar.classList.remove("shadow-lg");
    }
});


// Skill bar animation when visible
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});


// Typewriter effect
const text = [
    "Frontend Developer",
    "JavaScript Developer",
    "HTML & CSS Specialist",
    "Go Enthusiast",
    "UI/UX Designer"
];

let count = 0;
let letter = "";
let isDeleting = false;

function type() {
    const current = count % text.length;
    const fullText = text[current];

    if (isDeleting) {
        letter = fullText.substring(0, letter.length - 1);
    } else {
        letter = fullText.substring(0, letter.length + 1);
    }

    document.getElementById("typewriter").textContent = letter;

    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && letter === fullText) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && letter === "") {
        isDeleting = false;
        count++;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

type();


// Contact form (prevent refresh and send via EmailJS)
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>';
    if (window.lucide) lucide.createIcons();
    
    submitBtn.disabled = true;

    // Send using EmailJS
    emailjs.sendForm('service_lgkchrr', 'template_fd3i2f8', this)
        .then(() => {
            submitBtn.innerHTML = 'Message Sent! <i data-lucide="check-circle" class="w-4 h-4"></i>';
            submitBtn.classList.replace('bg-primary', 'bg-green-600');
            submitBtn.classList.replace('hover:bg-primary/80', 'hover:bg-green-700');
            if (window.lucide) lucide.createIcons();
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.replace('bg-green-600', 'bg-primary');
                submitBtn.classList.replace('hover:bg-green-700', 'hover:bg-primary/80');
                if (window.lucide) lucide.createIcons();
            }, 3000);
        }, (error) => {
            console.error("EmailJS Error:", error);
            submitBtn.innerHTML = 'Failed to Send <i data-lucide="x-circle" class="w-4 h-4"></i>';
            submitBtn.classList.replace('bg-primary', 'bg-red-600');
            submitBtn.classList.replace('hover:bg-primary/80', 'hover:bg-red-700');
            if (window.lucide) lucide.createIcons();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.replace('bg-red-600', 'bg-primary');
                submitBtn.classList.replace('hover:bg-red-700', 'hover:bg-primary/80');
                if (window.lucide) lucide.createIcons();
            }, 3000);
        });
});


// Active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Project Modal Logic
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalContent = document.getElementById('project-modal-content');
const modalImage = document.getElementById('modal-image');
const modalVisitBtn = document.getElementById('modal-visit-btn');
const closeModalBtn = document.getElementById('close-modal');

if (projectModal) {
    projectCards.forEach(card => {
        card.classList.add('cursor-pointer');
        
        card.addEventListener('click', (e) => {
            // Prevent modal if clicking on links directly within the card
            if (e.target.closest('a')) return;

            const imgElement = card.querySelector('img');
            if (!imgElement) return;
            
            const imgSrc = imgElement.src;
            
            // Find the best link to use for the "Visit Project" button
            const links = card.querySelectorAll('a');
            let visitLink = '#';
            if (links.length > 1) {
                visitLink = links[1].href; // External link is usually second
            } else if (links.length === 1) {
                visitLink = links[0].href;
            }

            modalImage.src = imgSrc;
            modalVisitBtn.href = visitLink;

            // Show modal
            projectModal.classList.remove('hidden');
            projectModal.classList.add('flex');
            
            // Allow display block to apply before animating opacity
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    projectModal.classList.remove('opacity-0');
                    modalContent.classList.remove('scale-95');
                });
            });
        });
    });

    function closeProjectModal() {
        projectModal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            projectModal.classList.add('hidden');
            projectModal.classList.remove('flex');
            modalImage.src = '';
            modalVisitBtn.href = '#';
        }, 300); // Matches the duration-300 in Tailwind class
    }

    closeModalBtn.addEventListener('click', closeProjectModal);

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}