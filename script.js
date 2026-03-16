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


// Contact form (prevent refresh)
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Message sent! (This is a demo form)");
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