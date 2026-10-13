/**
 * RideX Motors - Main Global Scripts
 * WhatsApp ordering & inquiry engine, Mobile drawer, Quick Search Modal, Scroll behaviors.
 */

const RIDEX_CONFIG = {
  phone1: "01868-546518",
  phone2: "01681-103565",
  whatsappNumber: "8801868546518",
  email: "ridexmotors0405@gmail.com",
  address: "Kachua Road, Sakhipur, Tangail, 1950",
  fbPage: "https://www.facebook.com/profile.php?id=61566059999995"
};

// Global helper for opening WhatsApp with pre-filled message
window.openRideXWhatsApp = function (message = "") {
  const defaultMsg = window.ridexI18n && window.ridexI18n.currentLang === "bn"
    ? "হ্যালো রাইডেক্স মোটরস! আমি একটি মোটরসাইকেল ক্রয়/এক্সচেঞ্জ সম্পর্কে জানতে আগ্রহী।"
    : "Hello RideX Motors! I would like to inquire about buying/exchanging a motorcycle.";
  
  const textToSend = message.trim() || defaultMsg;
  const url = `https://wa.me/${RIDEX_CONFIG.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
  window.open(url, "_blank");
};

// Global helper to create bike WhatsApp inquiry link
window.createBikeWhatsAppUrl = function (bike) {
  const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";
  const text = isBn
    ? `হ্যালো রাইডেক্স মোটরস! আমি এই বাইকটি সম্পর্কে জানতে চাই:\n\n🏍️ বাইক: ${bike.name}\n💰 প্রাইস: ৳ ${bike.price.toLocaleString('en-IN')}\n📍 শোরুম: সখিপুর, টাঙ্গাইল\n\nবাইকটি কি বর্তমানে শোরুমে স্টকে রয়েছে? বিস্তারিত জানাবেন।`
    : `Hello RideX Motors! I am interested in this motorcycle:\n\n🏍️ Bike: ${bike.name}\n💰 Price: ৳ ${bike.price.toLocaleString('en-IN')}\n📍 Location: Sakhipur, Tangail\n\nIs this bike currently available at your showroom? Please provide details.`;
  
  return `https://wa.me/${RIDEX_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        if (mobileMenu.classList.contains("hidden")) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        } else {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        }
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // 2. Global Quick Search Modal Setup
  const openSearchBtns = document.querySelectorAll("[data-open-search]");
  const searchModal = document.getElementById("search-modal");
  const closeSearchBtn = document.getElementById("close-search-btn");
  const searchInput = document.getElementById("global-search-input");
  const searchResults = document.getElementById("global-search-results");

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.remove("hidden");
    searchModal.classList.add("flex");
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.add("hidden");
    searchModal.classList.remove("flex");
    if (searchInput) searchInput.value = "";
    if (searchResults) searchResults.innerHTML = "";
  }

  openSearchBtns.forEach((btn) => btn.addEventListener("click", openSearch));
  if (closeSearchBtn) closeSearchBtn.addEventListener("click", closeSearch);

  // Close search on backdrop click
  if (searchModal) {
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Keyboard shortcut Ctrl+K or / to search
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearch();
    }
    if (e.key === "Escape" && searchModal && !searchModal.classList.contains("hidden")) {
      closeSearch();
    }
  });

  // Global live search debounce
  let searchDebounce;
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchDebounce);
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        searchResults.innerHTML = "";
        return;
      }

      searchDebounce = setTimeout(async () => {
        const bikes = await window.ridexDB.getBikes();
        const matches = bikes.filter((b) =>
          b.name.toLowerCase().includes(query) ||
          b.brand.toLowerCase().includes(query) ||
          (b.engineCc && b.engineCc.toLowerCase().includes(query)) ||
          (b.category && b.category.toLowerCase().includes(query))
        );

        if (matches.length === 0) {
          searchResults.innerHTML = `
            <div class="py-8 text-center text-gray-400">
              <i class="fa-solid fa-motorcycle text-3xl mb-2 opacity-50"></i>
              <p class="text-sm">No bikes found matching "${e.target.value}".</p>
            </div>
          `;
          return;
        }

        const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";
        searchResults.innerHTML = matches
          .map((bike) => {
            const formattedPrice = window.ridexI18n ? window.ridexI18n.formatPrice(bike.price) : bike.price.toLocaleString();
            return `
            <a href="bike-details.html?id=${bike.id}" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-colors group">
              <img src="${bike.image}" alt="${bike.name}" class="w-16 h-12 object-cover rounded-lg bg-slate-900 border border-slate-700" />
              <div class="flex-1 min-w-0">
                <h4 class="text-white text-sm font-bold truncate group-hover:text-red-500 transition-colors">${bike.name}</h4>
                <div class="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <span>${bike.engineCc || ''}</span>
                  <span>•</span>
                  <span>${bike.year || ''}</span>
                  <span>•</span>
                  <span class="text-red-400 font-semibold">৳ ${formattedPrice}</span>
                </div>
              </div>
              <i class="fa-solid fa-arrow-right text-gray-500 group-hover:text-white transition-colors text-xs"></i>
            </a>
          `;
          })
          .join("");
      }, 200);
    });
  }

  // 3. Header sticky scroll effect
  const mainHeader = document.querySelector("header");
  if (mainHeader) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        mainHeader.classList.add("shadow-lg", "bg-dark-950/95");
      } else {
        mainHeader.classList.remove("shadow-lg");
      }
    });
  }

  // 4. Testimonials Slider / Carousel Controller
  const testimonialsTrack = document.getElementById("testimonials-track");
  const prevBtn = document.getElementById("review-prev-btn");
  const nextBtn = document.getElementById("review-next-btn");
  const dotsContainer = document.getElementById("testimonial-dots");

  if (testimonialsTrack) {
    const slides = testimonialsTrack.querySelectorAll(".testimonial-slide");
    const totalSlides = slides.length;
    let activeIndex = 0;
    let autoPlayTimer = null;

    // Create pagination dots
    if (dotsContainer && totalSlides > 0) {
      dotsContainer.innerHTML = Array.from({ length: totalSlides })
        .map((_, i) => `<button type="button" class="carousel-dot h-2 rounded-full transition-all duration-300 ${i === 0 ? 'w-6 bg-red-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`)
        .join("");

      dotsContainer.querySelectorAll(".carousel-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
          const idx = parseInt(dot.getAttribute("data-slide"), 10);
          scrollToSlide(idx);
          resetAutoPlay();
        });
      });
    }

    function updateDots(idx) {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll(".carousel-dot").forEach((d, i) => {
        if (i === idx) {
          d.className = "carousel-dot h-2 rounded-full transition-all duration-300 w-6 bg-red-600";
        } else {
          d.className = "carousel-dot h-2 rounded-full transition-all duration-300 w-2 bg-gray-300 hover:bg-gray-400";
        }
      });
    }

    function scrollToSlide(idx) {
      if (idx < 0) idx = totalSlides - 1;
      if (idx >= totalSlides) idx = 0;
      activeIndex = idx;
      const targetSlide = slides[activeIndex];
      if (targetSlide) {
        testimonialsTrack.scrollTo({
          left: targetSlide.offsetLeft - testimonialsTrack.offsetLeft,
          behavior: "smooth"
        });
        updateDots(activeIndex);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        scrollToSlide(activeIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        scrollToSlide(activeIndex + 1);
        resetAutoPlay();
      });
    }

    // Update active dot on scroll
    let isScrolling = null;
    testimonialsTrack.addEventListener("scroll", () => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const scrollLeft = testimonialsTrack.scrollLeft;
        let closestIdx = 0;
        let minDiff = Infinity;
        slides.forEach((slide, i) => {
          const diff = Math.abs(slide.offsetLeft - testimonialsTrack.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });
        activeIndex = closestIdx;
        updateDots(activeIndex);
      }, 60);
    }, { passive: true });

    // Autoplay
    function startAutoPlay() {
      autoPlayTimer = setInterval(() => {
        scrollToSlide(activeIndex + 1);
      }, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    testimonialsTrack.addEventListener("mouseenter", stopAutoPlay);
    testimonialsTrack.addEventListener("mouseleave", startAutoPlay);
    testimonialsTrack.addEventListener("touchstart", stopAutoPlay, { passive: true });
    testimonialsTrack.addEventListener("touchend", startAutoPlay, { passive: true });

    startAutoPlay();
  }
});

