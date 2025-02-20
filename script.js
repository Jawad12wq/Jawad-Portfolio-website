// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Trigger fade-in animations and progress bars when sections are in view
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            // Animate progress bars
            if (entry.target.id === 'skills') {
                document.querySelectorAll('.progress').forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0'; // Reset to 0
                    setTimeout(() => bar.style.width = width, 10); // Animate to original width
                });
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Add subtle parallax effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});