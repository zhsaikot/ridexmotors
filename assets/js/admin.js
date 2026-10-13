/**
 * RideX Motors - Admin Dashboard Logic
 * Full CRUD for Motorcycle Inventory and Brands with Firebase Auth + Demo Mode,
 * Firestore/LocalStorage synchronization, and Gallery Image Management.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Sections & Auth Elements
  const authSection = document.getElementById("auth-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const loginForm = document.getElementById("login-form");
  const loginEmailInput = document.getElementById("login-email");
  const loginPasswordInput = document.getElementById("login-password");
  const loginError = document.getElementById("login-error");
  const demoLoginBtn = document.getElementById("demo-login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const currentUserDisplay = document.getElementById("current-user-email");
  const firebaseStatusBadge = document.getElementById("firebase-status-badge");

  // Tabs & Views
  const tabBtnBikes = document.getElementById("tab-btn-bikes");
  const tabBtnCategories = document.getElementById("tab-btn-categories");
  const viewBikesSection = document.getElementById("view-bikes-section");
  const viewCategoriesSection = document.getElementById("view-categories-section");

  // Counter Badges
  const totalBikesCount = document.getElementById("total-bikes-count");
  const totalBrandsCount = document.getElementById("total-brands-count");
  const tabBikesBadge = document.getElementById("tab-bikes-badge");
  const tabCatsBadge = document.getElementById("tab-cats-badge");

  // Bikes UI Elements
  const adminBikesTable = document.getElementById("admin-bikes-table");
  const adminSearchInput = document.getElementById("admin-search-input");
  const adminBrandFilter = document.getElementById("admin-brand-filter");
  const seedSyncBtn = document.getElementById("seed-sync-btn");

  // Bike Modal Elements
  const bikeModal = document.getElementById("bike-modal");
  const bikeModalTitle = document.getElementById("modal-title");
  const bikeForm = document.getElementById("bike-form");
  const openAddModalBtn = document.getElementById("open-add-modal-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");

  // Form Fields
  const formBikeId = document.getElementById("form-bike-id");
  const formTitle = document.getElementById("form-title");
  const formBrand = document.getElementById("form-brand");
  const formCondition = document.getElementById("form-condition");
  const formPrice = document.getElementById("form-price");
  const formYear = document.getElementById("form-year");
  const formEngine = document.getElementById("form-engine");
  const formMileage = document.getElementById("form-mileage");
  const formKm = document.getElementById("form-km");
  const formBrakes = document.getElementById("form-brakes");
  const formPapers = document.getElementById("form-papers");
  const formBadge = document.getElementById("form-badge");
  const formFeatured = document.getElementById("form-featured");
  const formDescription = document.getElementById("form-description");
  const formImageUrl = document.getElementById("form-image-url");
  const imagePreview = document.getElementById("image-preview");
  const imagePreviewWrapper = document.getElementById("image-preview-wrapper");
  const formGalleryUrlInput = document.getElementById("form-gallery-url-input");
  const formAddGalleryUrlBtn = document.getElementById("form-add-gallery-url-btn");
  const galleryPreviewContainer = document.getElementById("gallery-preview-container");

  // Category Modal Elements
  const catModal = document.getElementById("category-modal");
  const catForm = document.getElementById("category-form");
  const openAddCatModalBtn = document.getElementById("open-add-cat-modal-btn");
  const closeCatModalBtn = document.getElementById("close-cat-modal-btn");
  const cancelCatModalBtn = document.getElementById("cancel-cat-modal-btn");
  const adminCatsTable = document.getElementById("admin-cats-table");
  const formCatId = document.getElementById("form-cat-id");
  const formCatName = document.getElementById("form-cat-name");
  const formCatSubtitle = document.getElementById("form-cat-subtitle");
  const formCatBadge = document.getElementById("form-cat-badge");

  let allBikes = [];
  let allCategories = [];
  let currentGallery = [];
  let isDemoUser = false;

  // 1. Check Authentication Status
  function checkAuthState() {
    // Check if live Firebase Auth is ready
    if (window.RIDEX_FIREBASE && window.RIDEX_FIREBASE.isConfigured() && window.RIDEX_FIREBASE.auth) {
      window.RIDEX_FIREBASE.auth.onAuthStateChanged((user) => {
        if (user) {
          showDashboard(user.email, false);
        } else if (sessionStorage.getItem("ridex_demo_session") === "active") {
          showDashboard("demo-admin@ridexmotors.com", true);
        } else {
          showLogin();
        }
      });
    } else {
      // Local / Demo Mode Check
      if (sessionStorage.getItem("ridex_demo_session") === "active") {
        showDashboard("demo-admin@ridexmotors.com", true);
      } else {
        showLogin();
      }
    }
  }

  function showDashboard(email, isDemo = false) {
    isDemoUser = isDemo;
    if (authSection) authSection.classList.add("hidden");
    if (dashboardSection) dashboardSection.classList.remove("hidden");
    if (currentUserDisplay) currentUserDisplay.textContent = email;

    if (firebaseStatusBadge) {
      if (window.RIDEX_FIREBASE && window.RIDEX_FIREBASE.isConfigured()) {
        firebaseStatusBadge.innerHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Firebase Cloud Connected</span>`;
      } else {
        firebaseStatusBadge.innerHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/40 text-amber-400 border border-amber-500/30"><span class="w-2 h-2 rounded-full bg-amber-500"></span> LocalStorage Mode (Demo)</span>`;
      }
    }

    loadDashboardData();
  }

  function showLogin() {
    if (authSection) authSection.classList.remove("hidden");
    if (dashboardSection) dashboardSection.classList.add("hidden");
  }

  // Handle Login Form
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginEmailInput.value.trim();
      const password = loginPasswordInput.value;

      if (loginError) loginError.classList.add("hidden");

      if (window.RIDEX_FIREBASE && window.RIDEX_FIREBASE.isConfigured() && window.RIDEX_FIREBASE.auth) {
        try {
          await window.RIDEX_FIREBASE.auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
          if (loginError) {
            loginError.textContent = err.message || "Failed to login. Please check credentials.";
            loginError.classList.remove("hidden");
          }
        }
      } else {
        // Fallback demo authentication
        if (email && password.length >= 6) {
          sessionStorage.setItem("ridex_demo_session", "active");
          showDashboard(email, true);
        } else {
          if (loginError) {
            loginError.textContent = "Please enter valid email and password (minimum 6 characters).";
            loginError.classList.remove("hidden");
          }
        }
      }
    });
  }

  // Demo Login Click
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener("click", () => {
      sessionStorage.setItem("ridex_demo_session", "active");
      showDashboard("demo-admin@ridexmotors.com", true);
    });
  }

  // Logout Click
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      sessionStorage.removeItem("ridex_demo_session");
      if (window.RIDEX_FIREBASE && window.RIDEX_FIREBASE.auth) {
        await window.RIDEX_FIREBASE.auth.signOut();
      }
      showLogin();
    });
  }

  // 2. Load Dashboard Data
  async function loadDashboardData() {
    try {
      const [bikes, cats] = await Promise.all([
        window.ridexDB.getBikes(),
        window.ridexDB.getCategories()
      ]);
      allBikes = bikes;
      allCategories = cats;

      updateStats();
      populateBrandFilter();
      populateBrandSelectModal();
      renderBikesTable(allBikes);
      renderCategoriesTable(allCategories);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    }
  }

  function updateStats() {
    if (totalBikesCount) totalBikesCount.textContent = allBikes.length;
    if (totalBrandsCount) totalBrandsCount.textContent = allCategories.length;
    if (tabBikesBadge) tabBikesBadge.textContent = allBikes.length;
    if (tabCatsBadge) tabCatsBadge.textContent = allCategories.length;
  }

  function populateBrandFilter() {
    if (!adminBrandFilter) return;
    let html = `<option value="all">All Brands (${allBikes.length})</option>`;
    allCategories.forEach((c) => {
      const count = allBikes.filter((b) => (b.category || '').toLowerCase() === c.id.toLowerCase() || b.brand.toLowerCase() === c.name.toLowerCase()).length;
      html += `<option value="${c.id}">${c.name} (${count})</option>`;
    });
    adminBrandFilter.innerHTML = html;
  }

  function populateBrandSelectModal() {
    if (!formBrand) return;
    let html = "";
    allCategories.forEach((c) => {
      html += `<option value="${c.id}">${c.name}</option>`;
    });
    formBrand.innerHTML = html;
  }

  // 3. Render Bikes Table
  function renderBikesTable(bikes) {
    if (!adminBikesTable) return;

    if (bikes.length === 0) {
      adminBikesTable.innerHTML = `
        <tr>
          <td colspan="7" class="py-12 text-center text-gray-400">
            <i class="fa-solid fa-motorcycle text-3xl mb-2 opacity-40"></i>
            <p class="text-sm">No motorcycles found in inventory.</p>
          </td>
        </tr>
      `;
      return;
    }

    adminBikesTable.innerHTML = bikes
      .map((bike) => {
        const formattedPrice = Number(bike.price).toLocaleString("en-IN");
        return `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <img src="${bike.image}" alt="${bike.name}" class="w-12 h-10 object-cover rounded-lg bg-slate-900 border border-slate-700" onerror="this.src='assets/images/logo.png'" />
              <div>
                <h4 class="text-sm font-bold text-white">${bike.name}</h4>
                <span class="text-xs text-red-500 font-semibold uppercase">${bike.brand}</span>
              </div>
            </div>
          </td>
          <td class="py-3 px-4">
            <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${bike.condition === 'New' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-800 text-gray-300'}">
              ${bike.condition || 'Used'}
            </span>
          </td>
          <td class="py-3 px-4 text-sm font-bold text-white font-heading">
            ৳ ${formattedPrice}
          </td>
          <td class="py-3 px-4 text-xs text-gray-400">
            ${bike.engineCc || 'N/A'} • ${bike.year || ''}
          </td>
          <td class="py-3 px-4">
            <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/50">
              <i class="fa-solid fa-circle-check text-[10px]"></i> Verified
            </span>
          </td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <button class="edit-bike-btn p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white transition-colors" data-id="${bike.id}" title="Edit Bike">
                <i class="fa-solid fa-pen-to-square text-xs"></i>
              </button>
              <button class="delete-bike-btn p-2 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-400 hover:text-red-200 transition-colors" data-id="${bike.id}" title="Delete Bike">
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
      })
      .join("");

    // Bind Edit and Delete
    adminBikesTable.querySelectorAll(".edit-bike-btn").forEach((btn) => {
      btn.addEventListener("click", () => openEditBikeModal(btn.getAttribute("data-id")));
    });

    adminBikesTable.querySelectorAll(".delete-bike-btn").forEach((btn) => {
      btn.addEventListener("click", () => handleDeleteBike(btn.getAttribute("data-id")));
    });
  }

  // 4. Render Categories Table
  function renderCategoriesTable(cats) {
    if (!adminCatsTable) return;
    adminCatsTable.innerHTML = cats
      .map((cat) => {
        const count = allBikes.filter((b) => (b.category || '').toLowerCase() === cat.id.toLowerCase() || b.brand.toLowerCase() === cat.name.toLowerCase()).length;
        return `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-bold text-white text-sm">
            <div class="flex items-center gap-2">
              <i class="fa-solid ${cat.icon || 'fa-motorcycle'} text-red-500"></i>
              <span>${cat.name}</span>
            </div>
          </td>
          <td class="py-3 px-4 text-xs text-gray-400">${cat.subtitle || '—'}</td>
          <td class="py-3 px-4 text-xs font-bold text-gray-300">${count} Bikes</td>
          <td class="py-3 px-4 text-right">
            <button class="delete-cat-btn p-2 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-400 hover:text-red-200 transition-colors" data-id="${cat.id}" title="Delete Brand">
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
          </td>
        </tr>
      `;
      })
      .join("");

    adminCatsTable.querySelectorAll(".delete-cat-btn").forEach((btn) => {
      btn.addEventListener("click", () => handleDeleteCategory(btn.getAttribute("data-id")));
    });
  }

  // 5. Bike Modal Operations
  function openAddBikeModal() {
    bikeModalTitle.textContent = "Add New Motorcycle to Showroom";
    bikeForm.reset();
    formBikeId.value = "";
    currentGallery = [];
    renderGalleryPreviews();
    if (imagePreview) imagePreview.src = "";
    if (imagePreviewWrapper) imagePreviewWrapper.classList.add("hidden");
    bikeModal.classList.remove("hidden");
    bikeModal.classList.add("flex");
  }

  function openEditBikeModal(id) {
    const bike = allBikes.find((b) => String(b.id) === String(id));
    if (!bike) return;

    bikeModalTitle.textContent = "Edit Motorcycle Details";
    formBikeId.value = bike.id;
    formTitle.value = bike.name;
    formBrand.value = bike.category || (bike.brand ? bike.brand.toLowerCase() : "yamaha");
    formCondition.value = bike.condition || "Used";
    formPrice.value = bike.price;
    formYear.value = bike.year || "";
    formEngine.value = bike.engineCc || "";
    formMileage.value = bike.mileage || "";
    formKm.value = bike.kmDriven || "";
    formBrakes.value = bike.braking || "";
    formPapers.value = bike.papers || "";
    formBadge.value = bike.badge || "";
    formFeatured.checked = !!bike.featured;
    formDescription.value = bike.description || "";
    formImageUrl.value = bike.image || "";

    if (imagePreview && bike.image) {
      imagePreview.src = bike.image;
      if (imagePreviewWrapper) imagePreviewWrapper.classList.remove("hidden");
    }

    currentGallery = bike.gallery ? [...bike.gallery] : [bike.image];
    renderGalleryPreviews();

    bikeModal.classList.remove("hidden");
    bikeModal.classList.add("flex");
  }

  function closeBikeModal() {
    bikeModal.classList.add("hidden");
    bikeModal.classList.remove("flex");
  }

  if (openAddModalBtn) openAddModalBtn.addEventListener("click", openAddBikeModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeBikeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeBikeModal);

  // Gallery URL add
  if (formAddGalleryUrlBtn && formGalleryUrlInput) {
    formAddGalleryUrlBtn.addEventListener("click", () => {
      const url = formGalleryUrlInput.value.trim();
      if (url) {
        currentGallery.push(url);
        formGalleryUrlInput.value = "";
        renderGalleryPreviews();
      }
    });
  }

  function renderGalleryPreviews() {
    if (!galleryPreviewContainer) return;
    galleryPreviewContainer.innerHTML = currentGallery
      .map((url, index) => `
        <div class="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700 group">
          <img src="${url}" class="w-full h-full object-cover" />
          <button type="button" class="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity remove-thumb-btn" data-index="${index}">
            <i class="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      `)
      .join("");

    galleryPreviewContainer.querySelectorAll(".remove-thumb-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"));
        currentGallery.splice(idx, 1);
        renderGalleryPreviews();
      });
    });
  }

  // Preview Main Image URL input
  if (formImageUrl) {
    formImageUrl.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val && imagePreview && imagePreviewWrapper) {
        imagePreview.src = val;
        imagePreviewWrapper.classList.remove("hidden");
      }
    });
  }

  // Save Bike Form Submission
  if (bikeForm) {
    bikeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = formBikeId.value;
      const selectedCat = allCategories.find((c) => c.id === formBrand.value);

      const bikeData = {
        name: formTitle.value.trim(),
        brand: selectedCat ? selectedCat.name : formBrand.value,
        category: formBrand.value,
        categoryName: selectedCat ? selectedCat.name : formBrand.value,
        condition: formCondition.value,
        price: parseFloat(formPrice.value) || 0,
        year: formYear.value.trim(),
        engineCc: formEngine.value.trim(),
        mileage: formMileage.value.trim(),
        kmDriven: formKm.value.trim(),
        braking: formBrakes.value.trim(),
        papers: formPapers.value.trim(),
        badge: formBadge.value.trim(),
        featured: formFeatured.checked,
        description: formDescription.value.trim(),
        image: formImageUrl.value.trim() || "assets/images/logo.png",
        gallery: currentGallery.length > 0 ? currentGallery : [formImageUrl.value.trim() || "assets/images/logo.png"]
      };

      if (id) {
        await window.ridexDB.updateBike(id, bikeData);
      } else {
        await window.ridexDB.addBike(bikeData);
      }

      closeBikeModal();
      await loadDashboardData();
    });
  }

  // Handle Delete Bike
  async function handleDeleteBike(id) {
    if (confirm("Are you sure you want to remove this bike from inventory?")) {
      await window.ridexDB.deleteBike(id);
      await loadDashboardData();
    }
  }

  // 6. Category / Brand Modal Operations
  function openAddCatModal() {
    catForm.reset();
    formCatId.value = "";
    catModal.classList.remove("hidden");
    catModal.classList.add("flex");
  }

  function closeCatModal() {
    catModal.classList.add("hidden");
    catModal.classList.remove("flex");
  }

  if (openAddCatModalBtn) openAddCatModalBtn.addEventListener("click", openAddCatModal);
  if (closeCatModalBtn) closeCatModalBtn.addEventListener("click", closeCatModal);
  if (cancelCatModalBtn) cancelCatModalBtn.addEventListener("click", closeCatModal);

  if (catForm) {
    catForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const catData = {
        id: formCatName.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: formCatName.value.trim(),
        subtitle: formCatSubtitle.value.trim(),
        badge: formCatBadge.value.trim()
      };
      await window.ridexDB.addCategory(catData);
      closeCatModal();
      await loadDashboardData();
    });
  }

  async function handleDeleteCategory(id) {
    if (confirm("Are you sure you want to delete this brand/category?")) {
      await window.ridexDB.deleteCategory(id);
      await loadDashboardData();
    }
  }

  // Tab Switching (Bikes vs Brands)
  if (tabBtnBikes && tabBtnCategories && viewBikesSection && viewCategoriesSection) {
    tabBtnBikes.addEventListener("click", () => {
      tabBtnBikes.classList.add("bg-red-600", "text-white");
      tabBtnBikes.classList.remove("bg-slate-800", "text-gray-300");
      tabBtnCategories.classList.remove("bg-red-600", "text-white");
      tabBtnCategories.classList.add("bg-slate-800", "text-gray-300");

      viewBikesSection.classList.remove("hidden");
      viewCategoriesSection.classList.add("hidden");
    });

    tabBtnCategories.addEventListener("click", () => {
      tabBtnCategories.classList.add("bg-red-600", "text-white");
      tabBtnCategories.classList.remove("bg-slate-800", "text-gray-300");
      tabBtnBikes.classList.remove("bg-red-600", "text-white");
      tabBtnBikes.classList.add("bg-slate-800", "text-gray-300");

      viewCategoriesSection.classList.remove("hidden");
      viewBikesSection.classList.add("hidden");
    });
  }

  // Search in Admin Table
  if (adminSearchInput) {
    adminSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = allBikes.filter((b) =>
        b.name.toLowerCase().includes(q) ||
        b.brand.toLowerCase().includes(q) ||
        (b.year && b.year.includes(q))
      );
      renderBikesTable(filtered);
    });
  }

  // Filter in Admin Table by Brand
  if (adminBrandFilter) {
    adminBrandFilter.addEventListener("change", (e) => {
      const brand = e.target.value;
      if (brand === "all") {
        renderBikesTable(allBikes);
      } else {
        const filtered = allBikes.filter((b) => (b.category || '').toLowerCase() === brand.toLowerCase() || b.brand.toLowerCase() === brand.toLowerCase());
        renderBikesTable(filtered);
      }
    });
  }

  // Seed / Restore Data Button
  if (seedSyncBtn) {
    seedSyncBtn.addEventListener("click", async () => {
      if (confirm("Restore default motorcycle inventory and brands from seed data? This will add any missing default bikes.")) {
        await window.ridexDB.restoreAllSeedData();
        await loadDashboardData();
        alert("✅ Default motorcycle catalog successfully restored!");
      }
    });
  }

  // Start Auth Check
  checkAuthState();
});
