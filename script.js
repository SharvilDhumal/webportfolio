// Initialize Three.js only for the home section
const homeSection = document.getElementById('home');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(homeSection.clientWidth, homeSection.clientHeight);
document.getElementById('bg-animation').appendChild(renderer.domElement);

// Update renderer size when window resizes
window.addEventListener('resize', () => {
    camera.aspect = homeSection.clientWidth / homeSection.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(homeSection.clientWidth, homeSection.clientHeight);
});

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.008,
    color: '#64ffda'
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0001;
    particlesMesh.rotation.y += 0.0001;
    renderer.render(scene, camera);
}
animate();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




// Add parallax effect to cards
document.querySelectorAll('.skill-card, .project-card, .hobby-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add this JavaScript for modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('certificate-image');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    // Get all certificate view buttons
    document.querySelectorAll('.cert-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            modal.style.display = "block";
            // Get the image from the card
            const certCard = this.closest('.certificate-card');
            const certImg = certCard.querySelector('img').src;
            modalImg.src = certImg;
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        const modal = document.getElementById('certificate-modal');
        const modalImg = document.getElementById('certificate-image');

        document.querySelectorAll('.cert-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                modal.style.display = "flex";
                const certCard = this.closest('.certificate-card');
                modalImg.src = certCard.querySelector('img').src;
            });
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.style.display === "flex") {
                modal.style.display = "none";
            }
        });
    });




    // Close modal when clicking outside
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });
});

// Animate skill progress bars when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-progress');
        }
    });
}, observerOptions);

document.querySelectorAll('.progress').forEach(progress => {
    observer.observe(progress);
});


document.getElementById("nav-toggle").addEventListener("click", function () {
    document.getElementById("navbar").classList.toggle("nav-active");
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add active class to the clicked link
            this.classList.add("active");
        });
    });
});

