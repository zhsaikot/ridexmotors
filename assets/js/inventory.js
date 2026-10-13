/**
 * RideX Motors - Inventory / Bikes Catalog Logic
 * Multi-filter by brand, condition, price range, engine specs, search, and sorting.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const bikesGrid = document.getElementById("bikes-grid");
  const filterTabsContainer = document.getElementById("inventory-filter-tabs");
  const brandFilter = document.getElementById("brand-filter");
  const priceFilter = document.getElementById("price-filter");
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("inventory-search-input");
  const resultsCount = document.getElementById("results-count");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");

  let allBikes = [];
  let allCategories = [];
  let currentTab = "all";
  let currentBrand = "all";
  let currentPriceRange = "all";
  let currentSort = "featured";
  let searchQuery = "";

  // Parse URL query params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("brand")) {
    currentBrand = urlParams.get("brand").toLowerCase();
  }
  if (urlParams.has("tab")) {
    currentTab = urlParams.get("tab").toLowerCase();
  }
  if (urlParams.has("q")) {
    searchQuery = urlParams.get("q").toLowerCase();
    if (searchInput) searchInput.value = searchQuery;
  }
  if (urlParams.has("price")) {
    currentPriceRange = urlParams.get("price");
    if (priceFilter) priceFilter.value = currentPriceRange;
  }

  // Load bikes and brands
  try {
    const [bikes, cats] = await Promise.all([
      window.ridexDB.getBikes(),
      window.ridexDB.getCategories()
    ]);
    allBikes = bikes;
    allCategories = cats;

    populateBrandDropdown();
    applyFiltersAndRender();
  } catch (err) {
    console.error("Failed to load inventory:", err);
    if (bikesGrid) {
      bikesGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-gray-400">
          <i class="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-3"></i>
          <p class="text-base font-semibold">Unable to load motorcycles right now.</p>
          <button onclick="location.reload()" class="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors">Try Again</button>
        </div>
      `;
    }
  }

  function populateBrandDropdown() {
    if (!brandFilter) return;
    const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";
    let html = `<option value="all">${isBn ? "সব ব্র্যান্ড (All Brands)" : "All Brands"}</option>`;
    allCategories.forEach((cat) => {
      const selected = currentBrand === cat.id ? "selected" : "";
      html += `<option value="${cat.id}" ${selected}>${cat.name}</option>`;
    });
    brandFilter.innerHTML = html;
  }

  function applyFiltersAndRender() {
    let filtered = [...allBikes];

    // Filter by Tab
    if (currentTab === "used") {
      filtered = filtered.filter((b) => (b.condition || "").toLowerCase() === "used");
    } else if (currentTab === "new") {
      filtered = filtered.filter((b) => (b.condition || "").toLowerCase() === "new");
    } else if (currentTab === "sports") {
      filtered = filtered.filter((b) => {
        const txt = (b.name + " " + (b.badge || "")).toLowerCase();
        return txt.includes("r15") || txt.includes("gixxer") || txt.includes("mt-15") || txt.includes("ninja") || txt.includes("rtr");
      });
    } else if (currentTab === "commuter") {
      filtered = filtered.filter((b) => {
        const txt = (b.name + " " + (b.badge || "")).toLowerCase();
        return txt.includes("splendor") || txt.includes("shine") || txt.includes("discover") || txt.includes("mileage");
      });
    }

    // Filter by Brand
    if (currentBrand !== "all") {
      filtered = filtered.filter((b) => (b.category || "").toLowerCase() === currentBrand || (b.brand || "").toLowerCase() === currentBrand);
    }

    // Filter by Price
    if (currentPriceRange === "under_100k") {
      filtered = filtered.filter((b) => b.price < 100000);
    } else if (currentPriceRange === "100k_200k") {
      filtered = filtered.filter((b) => b.price >= 100000 && b.price <= 200000);
    } else if (currentPriceRange === "200k_300k") {
      filtered = filtered.filter((b) => b.price > 200000 && b.price <= 300000);
    } else if (currentPriceRange === "above_300k") {
      filtered = filtered.filter((b) => b.price > 300000);
    }

    // Filter by Search
    if (searchQuery) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(searchQuery) ||
        (b.brand && b.brand.toLowerCase().includes(searchQuery)) ||
        (b.engineCc && b.engineCc.toLowerCase().includes(searchQuery)) ||
        (b.description && b.description.toLowerCase().includes(searchQuery))
      );
    }

    // Sort
    if (currentSort === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "year_desc") {
      filtered.sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
    }

    renderBikes(filtered);

    // Update Result count
    if (resultsCount) {
      const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";
      const countStr = window.ridexI18n ? window.ridexI18n.formatPrice(filtered.length) : filtered.length;
      resultsCount.textContent = isBn ? `${countStr} টি বাইক পাওয়া গেছে` : `Showing ${countStr} motorcycles`;
    }
  }

  function renderBikes(bikes) {
    if (!bikesGrid) return;

    if (bikes.length === 0) {
      const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";
      bikesGrid.innerHTML = `
        <div class="col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div class="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600 text-3xl mb-4">
            <i class="fa-solid fa-motorcycle"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">${isBn ? "কোনো বাইক পাওয়া যায়নি" : "No Motorcycles Found"}</h3>
          <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">${isBn ? "আপনার ফিল্টারের সাথে মিলে এমন কোনো মোটরসাইকেল বর্তমানে স্টকে নেই। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।" : "We couldn't find any bikes matching your selected criteria. Try adjusting your filters."}</p>
          <button id="empty-reset-btn" class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold transition-all shadow-md">
            ${isBn ? "সকল বাইক দেখুন" : "View All Bikes"}
          </button>
        </div>
      `;
      const emptyReset = document.getElementById("empty-reset-btn");
      if (emptyReset) {
        emptyReset.addEventListener("click", resetAllFilters);
      }
      return;
    }

    const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";

    bikesGrid.innerHTML = bikes
      .map((bike) => {
        const formattedPrice = window.ridexI18n ? window.ridexI18n.formatPrice(bike.price) : bike.price.toLocaleString("en-IN");
        const waUrl = window.createBikeWhatsAppUrl(bike);
        const conditionBadge = bike.condition === "New"
          ? `<span class="bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">${isBn ? "নতুন" : "New"}</span>`
          : `<span class="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">${isBn ? "ব্যবহৃত" : "Used"}</span>`;

        return `
          <div class="bike-card bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
            <!-- Image & Badges Container -->
            <div class="relative bg-slate-50 aspect-[16/11] overflow-hidden flex items-center justify-center p-4">
              <img 
                src="${bike.image}" 
                alt="${bike.name}" 
                class="bike-img-zoom w-full h-full object-cover rounded-xl"
                loading="lazy"
                onerror="this.src='assets/images/logo.png'; this.classList.add('object-contain', 'p-8');"
              />
              
              <!-- Top Condition Badge -->
              <div class="absolute top-4 left-4 z-10 flex gap-2">
                ${conditionBadge}
                ${bike.badge ? `<span class="bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-gray-200">${bike.badge}</span>` : ''}
              </div>

              <!-- Papers Verified Pill -->
              <div class="absolute bottom-3 left-4 z-10">
                <span class="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  <i class="fa-solid fa-circle-check text-[10px]"></i> ${isBn ? "কাগজ ভেরিফায়েড" : "Verified Papers"}
                </span>
              </div>
            </div>

            <!-- Card Body Content -->
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <!-- Brand & Year -->
                <div class="flex items-center justify-between text-xs text-gray-400 font-semibold mb-1.5">
                  <span class="text-red-600 font-bold uppercase tracking-wider">${bike.brand}</span>
                  <span>${bike.year || ''}</span>
                </div>

                <!-- Bike Name -->
                <h3 class="font-heading font-extrabold text-gray-900 text-lg sm:text-xl line-clamp-1 group-hover:text-red-600 transition-colors">
                  <a href="bike-details.html?id=${bike.id}">${bike.name}</a>
                </h3>

                <!-- Price -->
                <div class="mt-2.5 mb-4 flex items-baseline gap-2">
                  <span class="text-2xl font-black text-gray-900 tracking-tight font-heading">
                    ৳ ${formattedPrice}
                  </span>
                  <span class="text-xs text-gray-400 font-medium">(${isBn ? "আলোচনা সাপেক্ষে" : "Fixed/Negotiable"})</span>
                </div>

                <!-- Spec Pill Highlights (Matching Mockup) -->
                <div class="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-xs text-gray-600 font-medium text-center">
                  <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-400 font-semibold uppercase">${isBn ? "ইঞ্জিন" : "Engine"}</span>
                    <span class="font-bold text-gray-800">${bike.engineCc || 'N/A'}</span>
                  </div>
                  <div class="flex flex-col items-center border-x border-gray-100">
                    <span class="text-[10px] text-gray-400 font-semibold uppercase">${isBn ? "মাইলেজ" : "Mileage"}</span>
                    <span class="font-bold text-gray-800">${bike.mileage ? bike.mileage.split(' ')[0] : 'N/A'}</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-400 font-semibold uppercase">${isBn ? "ব্রেকিং" : "Brakes"}</span>
                    <span class="font-bold text-gray-800 truncate max-w-full px-1">${bike.braking ? (bike.braking.includes('ABS') ? 'ABS' : 'Disc') : 'Disc'}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-5 grid grid-cols-2 gap-2">
                <a 
                  href="${waUrl}" 
                  target="_blank" 
                  rel="noopener"
                  class="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20"
                  title="Inquire directly on WhatsApp"
                >
                  <i class="fa-brands fa-whatsapp text-sm"></i>
                  <span>${isBn ? "হোয়াটসঅ্যাপ" : "WhatsApp"}</span>
                </a>

                <a 
                  href="bike-details.html?id=${bike.id}" 
                  class="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-900 hover:bg-red-600 active:scale-95 text-white rounded-xl text-xs font-bold transition-all"
                >
                  <span>${isBn ? "বিস্তারিত" : "Details"}</span>
                  <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function resetAllFilters() {
    currentTab = "all";
    currentBrand = "all";
    currentPriceRange = "all";
    searchQuery = "";
    if (brandFilter) brandFilter.value = "all";
    if (priceFilter) priceFilter.value = "all";
    if (searchInput) searchInput.value = "";
    
    // Update tab pills styling
    if (filterTabsContainer) {
      filterTabsContainer.querySelectorAll("button").forEach((btn) => {
        if (btn.getAttribute("data-tab") === "all") {
          btn.classList.add("bg-red-600", "text-white");
          btn.classList.remove("bg-white", "text-gray-700");
        } else {
          btn.classList.remove("bg-red-600", "text-white");
          btn.classList.add("bg-white", "text-gray-700");
        }
      });
    }

    applyFiltersAndRender();
  }

  // Bind Event Listeners
  if (filterTabsContainer) {
    filterTabsContainer.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTab = btn.getAttribute("data-tab");
        filterTabsContainer.querySelectorAll("button").forEach((b) => {
          b.classList.remove("bg-red-600", "text-white");
          b.classList.add("bg-white", "text-gray-700");
        });
        btn.classList.add("bg-red-600", "text-white");
        btn.classList.remove("bg-white", "text-gray-700");
        applyFiltersAndRender();
      });
    });
  }

  if (brandFilter) {
    brandFilter.addEventListener("change", (e) => {
      currentBrand = e.target.value.toLowerCase();
      applyFiltersAndRender();
    });
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", (e) => {
      currentPriceRange = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetAllFilters);
  }

  // Re-render when language changes
  window.addEventListener("languageChanged", () => {
    populateBrandDropdown();
    applyFiltersAndRender();
  });
});
