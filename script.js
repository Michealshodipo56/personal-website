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
});UI/UX


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
let index = 0;
let currentText = "";
let letter = "";

function type() {

    if (count === text.length) {
        count = 0;
    }

    currentText = text[count];
    letter = currentText.slice(0, ++index);

    document.getElementById("typewriter").textContent = letter;

    if (letter.length === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
        }, 2000);
    }

    setTimeout(type, 100);
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