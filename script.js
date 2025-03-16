// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Section ${this.getAttribute('href')} not found`);
        }
    });
});

// Trigger animations when sections are in view
const sections = document.querySelectorAll('.animated-section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`Section ${entry.target.id} is intersecting`); // Debug log
            entry.target.classList.add('visible');

            // Handle staggered animations for items within sections
            const items = entry.target.querySelectorAll('.animated-item');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.2}s`; // Stagger by 0.2s
                item.classList.add('visible');
                console.log(`Item in ${entry.target.id} activated with delay ${index * 0.2}s`);
            });

            // Animate progress bars in skills section
            if (entry.target.id === 'skills') {
                document.querySelectorAll('.progress').forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => bar.style.width = width, 10);
                });
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    if (section) {
        observer.observe(section);
        console.log(`Observing section: ${section.id}`);
    } else {
        console.error(`Section not found for observation: ${section}`);
    }
});

// Add subtle parallax effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        const scrollPosition = window.scrollY;
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Add Back-to-Top Button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    backToTop.style.opacity = window.scrollY > 300 ? '1' : '0';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});