/* ========================================
   SREE AARADHYA CLICKS - Premium Website JS
   Interactive Features & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2200);
  });
  // Fallback: hide preloader after 4 seconds
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 4000);

  // ---- Create Floating Particles in Hero ----
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      particle.style.width = (2 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ---- Sticky Navigation ----
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // ---- Mobile Menu Toggle ----
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + sectionId) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ---- Animated Counter ----
  const counters = document.querySelectorAll('.highlight-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    
    const highlightsSection = document.getElementById('highlights');
    if (!highlightsSection) return;
    
    const rect = highlightsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true;
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString() + '+';
          }
        };
        
        updateCounter();
      });
    }
  }

  window.addEventListener('scroll', animateCounters);

  // ---- Portfolio Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  }

  // ---- Testimonials Slider ----
  const testimonialTrack = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.testimonial-card').length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-index')));
    });
  });

  // Auto-advance testimonials
  let testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  
  const sliderEl = document.querySelector('.testimonials-slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    sliderEl.addEventListener('mouseleave', () => {
      testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  }

  // ---- Scroll Reveal Animation ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  function scrollReveal() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', scrollReveal);
  scrollReveal(); // Run on load

  // ---- Hero Background Slideshow (subtle cross-fade) ----
  const heroImages = [
    'assets/hero-wedding.png',
    'assets/wedding-ceremony.png',
    'assets/prewedding.png',
    'assets/candid-moment.jpg'
  ];
  let currentHeroImage = 0;
  const heroBg = document.getElementById('heroBg');

  function cycleHeroImage() {
    currentHeroImage = (currentHeroImage + 1) % heroImages.length;
    
    // Create a new image for crossfade
    const newImg = document.createElement('img');
    newImg.src = heroImages[currentHeroImage];
    newImg.alt = 'Wedding Photography';
    newImg.style.cssText = `
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      filter: brightness(0.4);
      opacity: 0;
      transition: opacity 2s ease;
      animation: heroZoom 20s ease-in-out infinite alternate;
    `;
    
    heroBg.parentElement.appendChild(newImg);
    
    // Fade in new image
    requestAnimationFrame(() => {
      newImg.style.opacity = '1';
    });
    
    // Remove old image after transition
    setTimeout(() => {
      if (heroBg.parentElement.children.length > 2) {
        heroBg.parentElement.removeChild(heroBg.parentElement.children[0]);
      }
    }, 2500);
  }

  setInterval(cycleHeroImage, 6000);

  // ---- Form Submission ----
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(enquiryForm);
      const data = {};
      formData.forEach((value, key) => data[key] = value);
      
      // Show success animation
      const submitBtn = enquiryForm.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Enquiry Sent!';
      submitBtn.style.background = '#25D366';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        enquiryForm.reset();
      }, 3000);
      
      // Build WhatsApp message
      const phone = '919100689100';
      const message = encodeURIComponent(
        `Hello Sree Aaradhya Clicks! 🎬\n\n` +
        `*Name:* ${data.name}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Email:* ${data.email}\n` +
        `*Event:* ${data.eventType}\n` +
        `*Date:* ${data.eventDate}\n` +
        `*Message:* ${data.message || 'N/A'}\n\n` +
        `I'd like to enquire about your services.`
      );
      
      // Open WhatsApp with the details
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
  }

  // ---- Smooth Scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---- Parallax Effect on Hero (subtle) ----
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
  });

  // ---- WhatsApp Button Tooltip ----
  const whatsappFloat = document.getElementById('whatsappFloat');
  if (whatsappFloat) {
    // Show tooltip on first visit
    setTimeout(() => {
      const tooltip = document.createElement('div');
      tooltip.textContent = 'Chat with us!';
      tooltip.style.cssText = `
        position: absolute;
        right: 70px;
        bottom: 50%;
        transform: translateY(50%);
        background: #fff;
        color: #333;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 500;
        white-space: nowrap;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: fadeInUp 0.5s ease forwards;
      `;
      whatsappFloat.style.position = 'fixed';
      whatsappFloat.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease';
        setTimeout(() => tooltip.remove(), 300);
      }, 4000);
    }, 5000);
  }

  // ---- Intersection Observer for performance ----
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  }

  console.log('✨ Sree Aaradhya Clicks Website Loaded Successfully');
});
