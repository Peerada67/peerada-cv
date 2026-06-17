// ===== Intersection Observer for Scroll Animations =====
document.addEventListener('DOMContentLoaded', () => {

  // Animate cards on scroll into view
  const cards = document.querySelectorAll('.card');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });

  // ===== Skill tag hover ripple effect =====
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transition = 'all 0.25s cubic-bezier(0.4,0,0.2,1)';
    });
  });

  // ===== Tilt effect on header =====
  const header = document.querySelector('.header');
  if (header && window.innerWidth > 768) {
    header.addEventListener('mousemove', (e) => {
      const rect = header.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      header.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });

    header.addEventListener('mouseleave', () => {
      header.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      header.style.transition = 'transform 0.5s ease-out';
    });

    header.addEventListener('mouseenter', () => {
      header.style.transition = 'transform 0.1s ease-out';
    });
  }

  // ===== Typing effect for tagline =====
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--accent-1)';
    let i = 0;
    const typeSpeed = 18;

    function typeWriter() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
      } else {
        // Remove cursor after typing is done
        setTimeout(() => {
          tagline.style.borderRight = 'none';
        }, 1500);
      }
    }

    // Start typing after a brief delay
    setTimeout(typeWriter, 800);
  }

  // ===== Smooth reveal for education items =====
  const eduItems = document.querySelectorAll('.edu-item');
  eduItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;

    const eduObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          eduObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    eduObserver.observe(item);
  });

  // ===== Counter animation for GPA =====
  const gpaBadges = document.querySelectorAll('.edu-gpa');
  gpaBadges.forEach(badge => {
    const target = parseFloat(badge.textContent.replace('GPA ', ''));
    badge.textContent = 'GPA 0.00';

    const gpaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateGPA(badge, target);
          gpaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    gpaObserver.observe(badge);
  });

  function animateGPA(el, target) {
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = (target * ease).toFixed(2);
      el.textContent = `GPA ${current}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ===== Certificate list stagger animation =====
  const certItems = document.querySelectorAll('.cert-list li');
  certItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(15px)';
    item.style.transition = `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`;

    const certObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          certObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    certObserver.observe(item);
  });

});
