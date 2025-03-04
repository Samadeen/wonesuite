gsap.set('.logo', { y: '-150%' }); // Set initial position
gsap.to('.logo', {
  y: 0, // Move to its natural position (from -100% to 0)
  duration: 1.5, // Animation lasts 1.5 seconds
  ease: 'bounce.out', // Bouncy easing for that fun effect
  delay: 0.2, // Optional: slight delay before it starts
});

const logoContainer = document.getElementById('logoContainer');
const logos = document.querySelectorAll('.logo-img');

// Set initial position (slightly above their normal position)
gsap.set(logos, { y: -50, opacity: 0 });

// Create an intersection observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Trigger the animation when the section comes into view
        gsap.to(logos, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'bounce.out',
        });

        // Optionally, unobserve after first animation
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2, // Trigger when 20% of the element is visible
  }
);

// Start observing the logo container
observer.observe(logoContainer);

// Remove the mouseenter event since we're now triggering on scroll
// Keep the mouseleave event if you want the logos to hide when mouse leaves
logoContainer.addEventListener('mouseleave', () => {
  gsap.to(logos, {
    y: -50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.in',
  });
});

// script.js
// Animate the title and subtitle
gsap.to('.attributes-title', {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: 'power2.out',
  delay: 0.2,
});

gsap.to('.attributes-subtitle', {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: 'power2.out',
  delay: 0.4,
});

// Animate the feature cards with a stagger
gsap.to('.attributes-card', {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: 'power2.out',
  stagger: 0.2, // Stagger the animation by 0.2s for each card
  delay: 0.6,
});

// script.js
const rows = document.querySelectorAll('.testimonials-row');

rows.forEach((row, index) => {
  const cards = row.querySelectorAll('.testimonial-card');
  const cardWidth = cards[0].offsetWidth + 24; // Using the gap we set (24px)
  const totalWidth = cardWidth * cards.length;

  // Set initial position for odd-numbered rows (index 1) to start from the left
  if (index % 2 === 1) {
    gsap.set(row, { x: -totalWidth });
  }

  // Set up the animation with alternating directions
  gsap.to(row, {
    x: index % 2 === 0 ? -totalWidth : totalWidth, // Alternate direction based on row index
    duration: 15, // Fixed duration for all rows
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => {
        // For even rows (moving left)
        if (index % 2 === 0) {
          return parseFloat(x) % -totalWidth;
        }
        // For odd rows (moving right)
        return -totalWidth + (Math.abs(parseFloat(x)) % totalWidth);
      }),
    },
  });
});
