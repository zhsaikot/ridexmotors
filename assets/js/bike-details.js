/**
 * RideX Motors - Single Bike Details & Gallery Logic
 * Dynamic bike specification sheet, image gallery switcher, WhatsApp inquiry, and related bikes.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bikeId = urlParams.get("id") || "hero-splendor-plus-red";

  // Elements
  const breadcrumbBrand = document.getElementById("breadcrumb-brand");
  const breadcrumbBike = document.getElementById("breadcrumb-bike");
  const mainImage = document.getElementById("main-bike-image");
  const galleryThumbnails = document.getElementById("gallery-thumbnails");
  const bikeTitle = document.getElementById("bike-title");
  const bikeBrandBadge = document.getElementById("bike-brand-badge");
  const bikeConditionBadge = document.getElementById("bike-condition-badge");
  const bikePrice = document.getElementById("bike-price");
  const bikeDescription = document.getElementById("bike-description");
  const bikeFeaturesList = document.getElementById("bike-features-list");
  const waInquiryBtn = document.getElementById("wa-inquiry-btn");
  const directCallBtn = document.getElementById("direct-call-btn");

  // Specs Elements
  const specEngine = document.getElementById("spec-engine");
  const specMileage = document.getElementById("spec-mileage");
  const specYear = document.getElementById("spec-year");
  const specKm = document.getElementById("spec-km");
  const specBrakes = document.getElementById("spec-brakes");
  const specPapers = document.getElementById("spec-papers");

  const relatedGrid = document.getElementById("related-bikes-grid");

  let currentBike = null;

  try {
    currentBike = await window.ridexDB.getBikeById(bikeId);
    if (!currentBike) {
      const all = await window.ridexDB.getBikes();
      currentBike = all[0];
    }

    renderBikeDetails(currentBike);
    renderRelatedBikes(currentBike);
  } catch (err) {
    console.error("Failed to load bike details:", err);
  }

  function renderBikeDetails(bike) {
    const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";
    document.title = `${bike.name} - RideX Motors Sakhipur`;

    // Breadcrumbs
    if (breadcrumbBrand) {
      breadcrumbBrand.textContent = bike.brand || bike.categoryName;
      breadcrumbBrand.href = `inventory.html?brand=${bike.category || bike.brand.toLowerCase()}`;
    }
    if (breadcrumbBike) {
      breadcrumbBike.textContent = bike.name;
    }

    // Header info
    if (bikeTitle) bikeTitle.textContent = bike.name;
    if (bikeBrandBadge) bikeBrandBadge.textContent = bike.brand;
    if (bikeConditionBadge) {
      const isNew = bike.condition === "New";
      bikeConditionBadge.textContent = isNew ? (isBn ? "নতুন" : "Brand New") : (isBn ? "ব্যবহৃত" : "Used");
      bikeConditionBadge.className = isNew
        ? "bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm"
        : "bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm";
    }

    // Price
    if (bikePrice) {
      const formatted = window.ridexI18n ? window.ridexI18n.formatPrice(bike.price) : bike.price.toLocaleString("en-IN");
      bikePrice.textContent = `৳ ${formatted}`;
    }

    // Main Image
    if (mainImage) {
      mainImage.src = bike.image;
      mainImage.alt = bike.name;
    }

    // Gallery Thumbnails
    if (galleryThumbnails) {
      const images = bike.gallery && bike.gallery.length > 0 ? bike.gallery : [bike.image];
      galleryThumbnails.innerHTML = images
        .map((imgSrc, index) => `
          <button 
            type="button" 
            class="gallery-thumb-btn relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${index === 0 ? 'border-red-600 ring-2 ring-red-600/30' : 'border-gray-200 hover:border-gray-400'}"
            data-src="${imgSrc}"
          >
            <img src="${imgSrc}" alt="${bike.name} view ${index + 1}" class="w-full h-full object-cover" />
          </button>
        `)
        .join("");

      galleryThumbnails.querySelectorAll(".gallery-thumb-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetSrc = btn.getAttribute("data-src");
          if (mainImage) mainImage.src = targetSrc;
          galleryThumbnails.querySelectorAll(".gallery-thumb-btn").forEach((b) => {
            b.classList.remove("border-red-600", "ring-2", "ring-red-600/30");
            b.classList.add("border-gray-200");
          });
          btn.classList.add("border-red-600", "ring-2", "ring-red-600/30");
          btn.classList.remove("border-gray-200");
        });
      });
    }

    // Specifications Sheet
    if (specEngine) specEngine.textContent = bike.engineCc || (isBn ? "উপলব্ধ নয়" : "Not specified");
    if (specMileage) specMileage.textContent = bike.mileage || (isBn ? "উপলব্ধ নয়" : "Standard");
    if (specYear) specYear.textContent = bike.year || (isBn ? "ক্লিয়ার ফাইল" : "Available");
    if (specKm) specKm.textContent = bike.kmDriven || (isBn ? "জেনুইন রিডিং" : "Genuine");
    if (specBrakes) specBrakes.textContent = bike.braking || (isBn ? "ডিস্ক ব্রেক" : "Disc Brake");
    if (specPapers) specPapers.textContent = bike.papers || (isBn ? "১০০% ভেরিফায়েড বিআরটিএ পেপারস" : "100% Verified BRTA Papers");

    // Description & Features
    if (bikeDescription) {
      bikeDescription.textContent = bike.description || (isBn ? "রাইডেক্স মোটরস থেকে পরীক্ষিত ও ফ্রেশ কন্ডিশন মোটরসাইকেল। শোরুমে সরাসরি টেস্ট ড্রাইভ গ্রহণযোগ্য।" : "Quality checked motorcycle from RideX Motors showroom. Live test drive welcome.");
    }

    if (bikeFeaturesList) {
      const defaultFeatures = [
        isBn ? "১০০% লিগ্যাল বিআরটিএ পেপারস ও ডিজিটাল রেজিস্ট্রেশন প্লেট" : "100% Legal BRTA Documents & Digital Registration Plate",
        isBn ? "সখিপুর শোরুমে সরাসরি মেকানিক নিয়ে এসে চেক করার সুযোগ" : "Option to inspect with your trusted mechanic at Sakhipur showroom",
        isBn ? "পুরোনো যেকোনো মোটরসাইকেলের সাথে অন-স্পট এক্সচেঞ্জ সুবিধা" : "Instant exchange facility with any old motorcycle model",
        isBn ? "তাত্ক্ষণিক মালিকানা পরিবর্তন (Name Transfer) সংক্রান্ত পূর্ণ সহায়তা" : "Complete assistance for ownership name transfer"
      ];
      const list = bike.features && bike.features.length > 0 ? bike.features : defaultFeatures;
      bikeFeaturesList.innerHTML = list
        .map((feat) => `
          <li class="flex items-start gap-3 text-sm text-gray-700">
            <i class="fa-solid fa-circle-check text-emerald-600 mt-1 flex-shrink-0"></i>
            <span>${feat}</span>
          </li>
        `)
        .join("");
    }

    // WhatsApp Direct Inquiry Button
    if (waInquiryBtn) {
      const waUrl = window.createBikeWhatsAppUrl(bike);
      waInquiryBtn.href = waUrl;
    }

    // Direct Call Button
    if (directCallBtn) {
      directCallBtn.href = "tel:+8801868546518";
    }
  }

  async function renderRelatedBikes(bike) {
    if (!relatedGrid) return;
    const all = await window.ridexDB.getBikes();
    const related = all
      .filter((b) => b.id !== bike.id && ((b.category || '').toLowerCase() === (bike.category || '').toLowerCase() || b.brand === bike.brand))
      .slice(0, 3);

    const isBn = window.ridexI18n && window.ridexI18n.currentLang === "bn";

    if (related.length === 0) {
      const fallback = all.filter((b) => b.id !== bike.id).slice(0, 3);
      related.push(...fallback);
    }

    relatedGrid.innerHTML = related
      .map((relBike) => {
        const formattedPrice = window.ridexI18n ? window.ridexI18n.formatPrice(relBike.price) : relBike.price.toLocaleString("en-IN");
        return `
        <a href="bike-details.html?id=${relBike.id}" class="bike-card bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
          <div class="relative aspect-[16/10] bg-slate-50 overflow-hidden">
            <img src="${relBike.image}" alt="${relBike.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <span class="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              ${relBike.condition || 'Used'}
            </span>
          </div>
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <span class="text-[11px] font-bold text-red-600 uppercase">${relBike.brand}</span>
              <h4 class="font-heading font-bold text-gray-900 text-base line-clamp-1 group-hover:text-red-600 transition-colors">${relBike.name}</h4>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="font-black text-gray-900 text-lg font-heading">৳ ${formattedPrice}</span>
              <span class="text-xs text-red-600 font-bold flex items-center gap-1">
                ${isBn ? "দেখুন" : "View"} <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </span>
            </div>
          </div>
        </a>
      `;
      })
      .join("");
  }

  // Handle language switch updates
  window.addEventListener("languageChanged", () => {
    if (currentBike) {
      renderBikeDetails(currentBike);
      renderRelatedBikes(currentBike);
    }
  });
});
