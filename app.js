const DB_NAME = "productionCrewDatabase";
const DB_VERSION = 4;
const STORES = [
  "workers",
  "venues",
  "promoters",
  "profileNotes",
  "events",
  "timecards",
  "runnerStops",
  "runnerCategories",
  "vehicleLogs",
  "accidentReports"
];

const ACCESS_PROFILES = {
  owner: {
    label: "Client / Owner",
    views: ["dashboard", "workers", "promoters", "venues", "events", "clock", "timecards", "vehicles", "reports", "payroll", "directory", "runner"],
    canAdminEdit: true,
    canOwnerEdit: true,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: true,
    canSeed: true
  },
  production: {
    label: "Promoter / Production Office",
    views: ["dashboard", "workers", "promoters", "venues", "events", "vehicles", "reports", "directory"],
    canAdminEdit: true,
    canOwnerEdit: false,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: false,
    canSeed: false
  },
  crew: {
    label: "Crew / Runner",
    views: ["workers", "clock", "events", "timecards", "vehicles", "reports", "payroll", "directory", "runner"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: true,
    canImportExport: false,
    canSeed: false
  }
};

let db;
let state = {
  workers: [],
  venues: [],
  promoters: [],
  profileNotes: [],
  events: [],
  timecards: [],
  runnerStops: [],
  runnerCategories: [],
  vehicleLogs: [],
  accidentReports: [],
  search: "",
  activeView: "dashboard",
  accessRole: localStorage.getItem("productionCrewAccessRole") || "owner",
  activeWorkerId: localStorage.getItem("productionCrewActiveWorker") || "",
  activePromoterId: localStorage.getItem("productionCrewActivePromoter") || "",
  runnerCategory: "All",
  directoryTab: "crew",
  payrollView: localStorage.getItem("productionCrewPayrollView") || "worker"
};

const NAV_GROUPS = {
  owner: [
    { items: [["dashboard", "Dashboard"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["clock", "TimeClock"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PAYROLL", items: [["payroll", "Payroll"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["runner", "Gig Directory"]] }
  ],
  production: [
    { items: [["dashboard", "Dashboard"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"]] }
  ],
  crew: [
    { items: [["workers", "My Profile"], ["clock", "Time Clock"]] },
    { label: "EVENTS", items: [["events", "Events"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PAYROLL", items: [["payroll", "Payroll"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["runner", "Gig Directory"]] }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      STORES.forEach((storeName) => {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transaction(storeName, mode = "readonly") {
  return db.transaction(storeName, mode).objectStore(storeName);
}

function getAll(storeName) {
  return new Promise((resolve, reject) => {
    const request = transaction(storeName).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function put(storeName, record) {
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString();
    const request = transaction(storeName, "readwrite").put({
      ...record,
      id: record.id || crypto.randomUUID(),
      updatedAt: now,
      createdAt: record.createdAt || now
    });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function remove(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = transaction(storeName, "readwrite").delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function loadState() {
  const [workers, venues, promoters, profileNotes, events, timecards, runnerStops, runnerCategories, vehicleLogs, accidentReports] = await Promise.all(STORES.map(getAll));
  state = {
    ...state,
    workers: sortByName(workers),
    venues: sortByName(venues),
    promoters: sortByName(promoters),
    profileNotes,
    events: events.sort((a, b) => new Date(b.startDate || b.createdAt || 0) - new Date(a.startDate || a.createdAt || 0)),
    timecards: timecards.sort((a, b) => new Date(b.clockIn || b.createdAt || 0) - new Date(a.clockIn || a.createdAt || 0)),
    runnerStops: sortByName(runnerStops),
    runnerCategories: sortByName(runnerCategories),
    vehicleLogs: vehicleLogs.sort((a, b) => new Date(b.scheduledDate || b.createdAt || 0) - new Date(a.scheduledDate || a.createdAt || 0)),
    accidentReports: accidentReports.sort((a, b) => new Date(b.reportedAt || b.createdAt || 0) - new Date(a.reportedAt || a.createdAt || 0))
  };
  if (!state.activeWorkerId && state.workers[0]) state.activeWorkerId = state.workers[0].id;
  if (!state.activePromoterId && state.promoters[0]) state.activePromoterId = state.promoters[0].id;
  render();
}

function sortByName(records) {
  return records.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

async function formRecord(form) {
  const record = {};
  for (const element of Array.from(form.elements)) {
    if (!element.name || element.type === "file") continue;
    if (element.closest("[hidden]")) continue;
    if (element.type === "checkbox") {
      record[element.name] = element.checked ? element.value : "";
    } else if (element.multiple) {
      record[element.name] = Array.from(element.selectedOptions).map((option) => option.value).filter(Boolean);
    } else {
      record[element.name] = element.value;
    }
  }

  const photoInputs = Array.from(form.querySelectorAll("input[type='file'][data-photo-key]"));
  for (const input of photoInputs) {
    if (!input.files.length) continue;
    const images = await Promise.all(Array.from(input.files).map(readFileAsDataUrl));
    if (form.id === "vehicleForm") {
      record.vehiclePhotos = { ...(record.vehiclePhotos || {}) };
      record.vehiclePhotos[input.dataset.photoKey] = input.multiple ? images : images[0];
    } else if (form.id === "reportForm") {
      record.photos = images;
    } else if (input.dataset.photoKey === "headshot") {
      record.headshotData = images[0];
    }
  }
  return record;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function fillForm(formId, record) {
  const form = document.getElementById(formId);
  Object.entries(record).forEach(([key, value]) => {
    if (!form.elements[key] || form.elements[key].type === "file") return;
    if (form.elements[key].type === "checkbox") {
      form.elements[key].checked = value === "yes" || value === true;
    } else if (form.elements[key].multiple && Array.isArray(value)) {
      Array.from(form.elements[key].options).forEach((option) => {
        option.selected = value.includes(option.value);
      });
    } else {
      form.elements[key].value = value || "";
    }
  });
  openForm(formId);
}

function clearForm(formId) {
  const form = document.getElementById(formId);
  form.reset();
  if (form.elements.id) form.elements.id.value = "";
  if (formId === "timecardForm") {
    form.elements.breakMinutes.value = "0";
    form.elements.clockIn.value = toLocalInputValue(new Date());
  }
  if (formId === "reportForm") form.elements.reportedAt.value = toLocalInputValue(new Date());
  if ((formId === "vehicleForm" || formId === "reportForm") && state.activeWorkerId) {
    form.elements.workerId.value = state.activeWorkerId;
  }
}

function openForm(formId) {
  const form = document.getElementById(formId);
  if (!form || form.hidden) {
    toast("This access view cannot open that form.");
    return;
  }
  applyAccessProfile();
  $$(".form-panel.modal-form").forEach((item) => item.classList.remove("modal-form"));
  form.classList.add("modal-form");
  $("#modalBackdrop").classList.add("show");
  document.body.classList.add("modal-open");
}

function closeForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    clearForm(formId);
  }
  $$(".form-panel.modal-form").forEach((item) => item.classList.remove("modal-form"));
  $("#modalBackdrop").classList.remove("show");
  document.body.classList.remove("modal-open");
}

function closeActiveForm() {
  const active = document.querySelector(".form-panel.modal-form");
  if (active) closeForm(active.id);
}

function matchesSearch(record, extra = "") {
  const haystack = `${Object.values(record).flat().join(" ")} ${extra}`.toLowerCase();
  return haystack.includes(state.search);
}

function currentProfile() {
  return ACCESS_PROFILES[state.accessRole] || ACCESS_PROFILES.owner;
}

function assignedAccessForRole(role) {
  if (role === "owner") return ["owner", "production", "crew"];
  if (role === "crew") {
    const worker = getWorker(state.activeWorkerId);
    return normalizeAccessLevels(worker?.accessLevels, "crew");
  }
  if (role === "production") {
    const promoter = getPromoter(state.activePromoterId);
    return normalizeAccessLevels(promoter?.accessLevels, "production");
  }
  return [role];
}

function normalizeAccessLevels(levels, fallback) {
  const values = Array.isArray(levels) ? levels : String(levels || "").split(",");
  const clean = values.map((level) => level.trim()).filter(Boolean);
  return clean.length ? Array.from(new Set(clean)) : [fallback];
}

function canAdminEdit() {
  return currentProfile().canAdminEdit;
}

function canOwnerEdit() {
  return currentProfile().canOwnerEdit;
}

function canVenueEdit() {
  return currentProfile().canVenueEdit;
}

function canScopedEdit() {
  return currentProfile().canScopedEdit;
}

function getWorker(id) {
  return state.workers.find((worker) => worker.id === id);
}

function getVenue(id) {
  return state.venues.find((venue) => venue.id === id);
}

function getPromoter(id) {
  return state.promoters.find((promoter) => promoter.id === id);
}

function promoterLabel(promoter) {
  if (!promoter) return "";
  const company = promoter.companyName || "Independent";
  const rep = promoter.name || promoter.contactName || "Rep";
  return `${company} - ${rep}`;
}

function getEvent(id) {
  return state.events.find((event) => event.id === id);
}

function eventWorkerIds(event) {
  return Array.isArray(event.workerIds) ? event.workerIds : [];
}

function visibleEvents() {
  if (state.accessRole === "production") {
    return state.events.filter((event) => !state.activePromoterId || event.promoterId === state.activePromoterId);
  }
  if (state.accessRole !== "crew") return state.events;
  return state.events.filter((event) => eventWorkerIds(event).includes(state.activeWorkerId));
}

function isEventVisible(eventId) {
  if (state.accessRole === "production") {
    const event = getEvent(eventId);
    return !!event && (!state.activePromoterId || event.promoterId === state.activePromoterId);
  }
  if (state.accessRole !== "crew") return true;
  const event = getEvent(eventId);
  return !!event && eventWorkerIds(event).includes(state.activeWorkerId);
}

function visibleRecords(records) {
  if (state.accessRole === "production") {
    return records.filter((record) => {
      if (record.promoterId && state.activePromoterId && record.promoterId !== state.activePromoterId) return false;
      return !record.eventId || isEventVisible(record.eventId);
    });
  }
  if (state.accessRole !== "crew") return records;
  return records.filter((record) => {
    if (record.workerId !== state.activeWorkerId) return false;
    return !!record.eventId && isEventVisible(record.eventId);
  });
}

function assignedWorkerIdsForVisibleEvents() {
  return new Set(visibleEvents().flatMap((event) => eventWorkerIds(event)));
}

function visibleWorkers() {
  if (state.accessRole === "owner") return state.workers;
  if (state.accessRole === "crew") return state.workers;
  const ids = assignedWorkerIdsForVisibleEvents();
  return state.workers.filter((worker) => ids.has(worker.id));
}

function visiblePromoters() {
  if (state.accessRole === "owner") return state.promoters;
  if (state.accessRole !== "production") return [];
  const active = getPromoter(state.activePromoterId);
  return state.promoters.filter((promoter) => {
    if (!active?.companyName) return promoter.id === state.activePromoterId;
    return promoter.companyName === active.companyName;
  });
}

function visibleVenues() {
  if (state.accessRole === "owner" || state.accessRole === "production") return state.venues;
  const venueIds = new Set(visibleEvents().map((event) => event.venueId).filter(Boolean));
  return state.venues.filter((venue) => venueIds.has(venue.id));
}

function canEditWorker(worker) {
  if (state.accessRole === "owner") return true;
  return state.accessRole === "crew" && worker.id === state.activeWorkerId;
}

function canEditPromoter(promoter) {
  if (state.accessRole === "owner") return true;
  return state.accessRole === "production" && promoter.id === state.activePromoterId;
}

function promoterNoteFor(workerId) {
  return state.profileNotes.find((note) => note.workerId === workerId && note.promoterId === state.activePromoterId);
}

function publicWorkerValue(worker, key) {
  if (worker.id === state.activeWorkerId || state.accessRole !== "crew") return worker[key] || "";
  if (key === "phone" && worker.hidePhone) return "";
  if (key === "email" && worker.hideEmail) return "";
  return worker[key] || "";
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function toLocalInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function currency(value) {
  return Number(value || 0).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function timecardBreakHours(card) {
  if (card.lunchOut && card.lunchIn) return Math.max(0, (new Date(card.lunchIn) - new Date(card.lunchOut)) / 36e5);
  return Number(card.breakMinutes || 0) / 60;
}

function timecardHours(card) {
  if (!card.clockIn) return 0;
  const end = card.clockOut ? new Date(card.clockOut) : new Date();
  const start = new Date(card.clockIn);
  const hours = Math.max(0, (end - start) / 36e5 - timecardBreakHours(card));
  return Number(hours.toFixed(2));
}

function dayRateFor(card) {
  const worker = getWorker(card.workerId);
  return Number(card.dayRate || card.payRate || worker?.defaultDayRate || worker?.defaultRate || 0);
}

function includedHoursFor(card) {
  const worker = getWorker(card.workerId);
  return Number(card.includedHours || worker?.defaultIncludedHours || 10);
}

function additionalRateFor(card) {
  const worker = getWorker(card.workerId);
  const fallback = includedHoursFor(card) ? dayRateFor(card) / includedHoursFor(card) : 0;
  return Number(card.additionalRate || worker?.defaultAdditionalRate || fallback || 0);
}

function vehicleRateFor(card) {
  const worker = getWorker(card.workerId);
  if (card.vehicleRate) return Number(card.vehicleRate);
  if (card.vehicleUse === "Rented Vehicle") return Number(worker?.defaultRentedVehicleRate || 0);
  if (card.vehicleUse === "Personal Vehicle") return Number(worker?.defaultPersonalVehicleRate || 0);
  return 0;
}

function estimatedPay(card) {
  const hours = timecardHours(card);
  const extraHours = Math.max(0, hours - includedHoursFor(card));
  return dayRateFor(card) + extraHours * additionalRateFor(card) + vehicleRateFor(card);
}

function payBasis(card) {
  const vehicle = card.vehicleUse ? ` + ${escapeHtml(card.vehicleUse)} ${currency(vehicleRateFor(card))}` : "";
  return `${currency(dayRateFor(card))}/${includedHoursFor(card)} hrs, +${currency(additionalRateFor(card))}/hr${vehicle}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  applyAccessProfile();
  renderSelects();
  renderDashboard();
  renderEvents();
  renderClock();
  renderWorkers();
  renderTimecards();
  renderPayroll();
  renderDirectory();
  renderVehicles();
  renderReports();
  renderVenues();
  renderPromoters();
  renderRunnerStops();
}

function renderSelects() {
  const workers = state.workers;
  const events = visibleEvents();
  const workerOptions = `<option value="">Select worker</option>${workers.map((worker) => `<option value="${worker.id}">${escapeHtml(worker.name)}</option>`).join("")}`;
  const venueOptions = `<option value="">No venue selected</option>${state.venues.map((venue) => `<option value="${venue.id}">${escapeHtml(venue.name)}</option>`).join("")}`;
  const promoterOptions = `<option value="">No promoter rep selected</option>${state.promoters.map((promoter) => `<option value="${promoter.id}">${escapeHtml(promoterLabel(promoter))}</option>`).join("")}`;
  const eventOptions = `<option value="">Select event</option>${events.map((event) => `<option value="${event.id}">${escapeHtml(event.name)}</option>`).join("")}`;

  $("#activeWorker").innerHTML = workers.length ? workers.map((worker) => `<option value="${worker.id}">${escapeHtml(worker.name)}</option>`).join("") : `<option value="">No workers yet</option>`;
  $("#activeWorker").value = state.activeWorkerId;
  $("#activePromoter").innerHTML = state.promoters.length ? state.promoters.map((promoter) => `<option value="${promoter.id}">${escapeHtml(promoterLabel(promoter))}</option>`).join("") : `<option value="">No promoter reps yet</option>`;
  $("#activePromoter").value = state.activePromoterId;

  $("#eventForm select[name='venueId']").innerHTML = venueOptions;
  $("#eventForm select[name='promoterId']").innerHTML = promoterOptions;
  $("#eventForm select[name='workerIds']").innerHTML = workers.map((worker) => `<option value="${worker.id}">${escapeHtml(worker.name)} - ${escapeHtml(worker.role)}</option>`).join("");

  $("#timecardForm select[name='eventId']").innerHTML = eventOptions;
  $("#timecardForm select[name='workerId']").innerHTML = workerOptions;
  $("#timecardForm select[name='venueId']").innerHTML = venueOptions;
  $("#timecardForm select[name='promoterId']").innerHTML = promoterOptions;

  $("#vehicleForm select[name='eventId']").innerHTML = eventOptions;
  $("#vehicleForm select[name='workerId']").innerHTML = workerOptions;
  $("#reportForm select[name='eventId']").innerHTML = eventOptions;
  $("#reportForm select[name='workerId']").innerHTML = workerOptions;
  $("#runnerForm select[name='category']").innerHTML = runnerCategories().filter((category) => category !== "All").map((category) => `<option>${escapeHtml(category)}</option>`).join("");
}

function renderDashboard() {
  const cards = visibleRecords(state.timecards);
  const liveCards = cards.filter((card) => !card.clockOut);
  $("#eventCount").textContent = visibleEvents().length;
  $("#activeTimecards").textContent = liveCards.length;
  $("#venueCount").textContent = visibleVenues().length;
  $("#payrollCount").textContent = currency(cards.reduce((sum, card) => sum + estimatedPay(card), 0));

  $("#liveCrewList").innerHTML = liveCards.length
    ? liveCards.slice(0, 8).map((card) => {
        const worker = getWorker(card.workerId);
        const event = getEvent(card.eventId);
        return `<div class="compact-item"><strong>${escapeHtml(worker?.name || "Unknown worker")}</strong><span>${escapeHtml(event?.name || card.eventName)} - ${timecardHours(card).toFixed(2)} hrs</span></div>`;
      }).join("")
    : `<div class="compact-item empty">No one is clocked in right now.</div>`;

  const noteItems = [
    ...visibleEvents().map((item) => ({ type: "Event", name: item.name, text: item.notes, updatedAt: item.updatedAt })),
    ...((state.accessRole === "owner" || state.accessRole === "production") ? state.venues.map((item) => ({ type: "Venue", name: item.name, text: item.notes || item.parking, updatedAt: item.updatedAt })) : []),
    ...(state.accessRole === "crew" ? [] : state.promoters.map((item) => ({ type: "Promoter", name: promoterLabel(item), text: item.notes, updatedAt: item.updatedAt }))),
    ...(state.accessRole === "crew" ? [] : state.runnerStops.map((item) => ({ type: "Runner", name: item.name, text: item.notes || item.bestUse, updatedAt: item.updatedAt })))
  ].filter((item) => item.text).sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

  $("#recentNotes").innerHTML = noteItems.length
    ? noteItems.slice(0, 8).map((item) => `<div class="compact-item"><strong>${escapeHtml(item.type)}: ${escapeHtml(item.name)}</strong><span>${escapeHtml(item.text)}</span></div>`).join("")
    : `<div class="compact-item empty">Notes will appear here as you add them.</div>`;
}

function renderEvents() {
  const rows = visibleEvents().filter((event) => {
    const venue = getVenue(event.venueId);
    const promoter = getPromoter(event.promoterId);
    const crewNames = eventWorkerIds(event).map((id) => getWorker(id)?.name).join(" ");
    return matchesSearch(event, `${venue?.name || ""} ${promoter?.name || ""} ${crewNames}`);
  });
  $("#eventTableCount").textContent = `${rows.length} shown`;
  $("#eventCards").innerHTML = rows.length
    ? rows.map((event) => eventCard(event)).join("")
    : `<div class="compact-item empty">No events match this search.</div>`;
}

function eventCard(event) {
  const venue = getVenue(event.venueId);
  const promoter = getPromoter(event.promoterId);
  const crew = eventWorkerIds(event).map((id) => getWorker(id)?.name).filter(Boolean);
  const crewLine = state.accessRole === "crew" ? "Assigned to you" : (crew.join(", ") || "No crew assigned");
  return `<article class="record-card">
    <div class="record-card-main">
      <strong>${escapeHtml(event.name)}</strong>
      <span>${escapeHtml(event.type)} ${event.startDate ? "- " + formatDate(event.startDate) : ""}</span>
      <p>${escapeHtml(venue?.name || "No venue")} | ${escapeHtml(promoterLabel(promoter) || "No promoter rep")}</p>
      <p>${escapeHtml(event.productionContact)}</p>
      <p>${escapeHtml(crewLine)}</p>
    </div>
    ${actionButtons("events", event.id, "eventForm", "", canAdminEdit())}
  </article>`;
}

function renderClock() {
  const events = visibleEvents().filter((event) => matchesSearch(event, `${getVenue(event.venueId)?.name || ""} ${getPromoter(event.promoterId)?.name || ""}`));
  $("#clockEventCount").textContent = `${events.length} assigned`;
  $("#clockCards").innerHTML = events.length
    ? events.map((event) => clockCard(event)).join("")
    : `<div class="compact-item empty">No assigned events are available for this worker.</div>`;
}

function clockCard(event) {
  const venue = getVenue(event.venueId);
  const card = state.timecards.find((item) => item.eventId === event.id && item.workerId === state.activeWorkerId && !item.clockOut)
    || state.timecards.find((item) => item.eventId === event.id && item.workerId === state.activeWorkerId);
  return `<article class="record-card clock-card">
    <div class="record-card-main">
      <strong>${escapeHtml(event.name)}</strong>
      <span>${escapeHtml(venue?.name || "No venue")} ${event.startDate ? "- " + formatDate(event.startDate) : ""}</span>
      <p>Call: ${formatDate(card?.clockIn) || "Not set"} | Lunch out: ${formatDate(card?.lunchOut) || "Not set"} | Lunch in: ${formatDate(card?.lunchIn) || "Not set"} | Wrap: ${formatDate(card?.clockOut) || "Not set"}</p>
    </div>
    <div class="clock-actions">
      <button class="primary-action" data-time-punch="clockIn" data-event-id="${event.id}" type="button">Call Time</button>
      <button class="primary-action" data-time-punch="lunchOut" data-event-id="${event.id}" type="button">Lunch Out</button>
      <button class="primary-action" data-time-punch="lunchIn" data-event-id="${event.id}" type="button">Lunch In</button>
      <button class="primary-action" data-time-punch="clockOut" data-event-id="${event.id}" type="button">Wrap</button>
    </div>
  </article>`;
}

function actionButtons(store, id, formId, extra = "", allowed = canAdminEdit()) {
  if (!allowed) return extra || "";
  return `<div class="row-actions">${extra}<button class="tiny-button" data-edit="${store}" data-id="${id}" data-form="${formId}" type="button">Edit</button><button class="tiny-button danger" data-delete="${store}" data-id="${id}" type="button">Delete</button></div>`;
}

function renderWorkers() {
  const heading = document.querySelector("#workers .panel-heading h3");
  const nav = document.querySelector('.nav-item[data-view="workers"]');
  if (heading) heading.textContent = state.accessRole === "crew" ? "My Profile" : "Crew / Runner Profiles";
  if (nav) nav.textContent = state.accessRole === "crew" ? "My Profile" : "Crew Profiles";

  if (state.accessRole === "crew") {
    renderMyProfile();
    return;
  }

  $("#myProfileCard").innerHTML = "";
  document.querySelector("#workers .table-wrap").hidden = false;
  const rows = visibleWorkers().filter((worker) => matchesSearch(worker));
  $("#workerTableCount").textContent = `${rows.length} shown`;
  $("#workerTable").innerHTML = rows.length
    ? rows.map((worker) => workerProfileRow(worker)).join("")
    : `<tr><td colspan="6" class="empty">No crew profiles match this search.</td></tr>`;
}

function renderMyProfile() {
  const worker = getWorker(state.activeWorkerId);
  fillOwnProfileQuietly();
  document.querySelector("#workers .table-wrap").hidden = true;
  $("#workerTableCount").textContent = worker ? "Your profile" : "No profile selected";
  if (!worker) {
    $("#myProfileCard").innerHTML = `<div class="compact-item empty">No crew profile selected.</div>`;
    return;
  }
  const phone = publicWorkerValue(worker, "phone") || "Hidden in public directory";
  const email = publicWorkerValue(worker, "email") || "Hidden in public directory";
  $("#myProfileCard").innerHTML = `<article class="profile-page-card">
    <div class="profile-page-header">
      ${profileAvatarLarge(worker, worker.hideHeadshot)}
      <div>
        <h3>${escapeHtml(worker.name)}</h3>
        <p>${escapeHtml(worker.role || "Crew / Runner")}</p>
      </div>
      <button class="tiny-button" data-edit="workers" data-id="${worker.id}" data-form="workerForm" type="button">Edit My Profile</button>
    </div>
    <div class="profile-detail-grid">
      <div><span>Phone</span><strong>${escapeHtml(phone)}</strong></div>
      <div><span>Email</span><strong>${escapeHtml(email)}</strong></div>
      <div><span>Status</span><strong>${escapeHtml(worker.status || "")}</strong></div>
      <div><span>Mailing Address</span><strong>${escapeHtml(worker.mailingAddress || "")}</strong></div>
    </div>
    <div class="profile-section"><span>Skills</span><p>${escapeHtml(worker.skills || "")}</p></div>
    <div class="profile-section"><span>Notes</span><p>${escapeHtml(worker.notes || "")}</p></div>
  </article>`;
}

function profileAvatarLarge(worker, hideHeadshot = false) {
  const initials = String(worker.name || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return worker.headshotData && !hideHeadshot
    ? `<img class="profile-avatar-large" src="${worker.headshotData}" alt="${escapeHtml(worker.name)} headshot">`
    : `<div class="profile-avatar-large placeholder">${escapeHtml(initials)}</div>`;
}

function fillOwnProfileQuietly() {
  const form = $("#workerForm");
  const active = getWorker(state.activeWorkerId);
  if (!form || !active || form.elements.id.value === active.id) return;
  Object.entries(active).forEach(([key, value]) => {
    if (!form.elements[key] || form.elements[key].type === "file") return;
    if (form.elements[key].type === "checkbox") form.elements[key].checked = value === "yes" || value === true;
    else if (form.elements[key].multiple && Array.isArray(value)) {
      Array.from(form.elements[key].options).forEach((option) => {
        option.selected = value.includes(option.value);
      });
    }
    else form.elements[key].value = value || "";
  });
}

function workerProfileRow(worker) {
  const publicPhone = publicWorkerValue(worker, "phone");
  const publicEmail = publicWorkerValue(worker, "email");
  const showLimited = state.accessRole === "crew";
  const info = showLimited
    ? `${publicEmail ? `<p>${escapeHtml(publicEmail)}</p>` : ""}`
    : `${escapeHtml(worker.skills)}<p>${currency(worker.defaultDayRate || worker.defaultRate || 0)}/${worker.defaultIncludedHours || 10} hrs</p><p>${accessBadges(worker.accessLevels, "crew")}</p>`;
  const note = state.accessRole === "production" ? promoterNoteBox(worker.id) : "";
  return `<tr>
    <td>${profileSelect("workers", worker.id)}${profileCell(worker, showLimited && worker.hideHeadshot && worker.id !== state.activeWorkerId, publicEmail)}</td>
    <td>${escapeHtml(showLimited ? "" : worker.role)}</td>
    <td>${showLimited ? "" : `<span class="status-pill ${worker.status === "Booked" ? "warn" : ""}">${escapeHtml(worker.status)}</span>`}</td>
    <td>${escapeHtml(publicPhone)}</td>
    <td>${info}${note}</td>
    <td>${actionButtons("workers", worker.id, "workerForm", "", canEditWorker(worker))}</td>
  </tr>`;
}

function profileCell(profile, hideHeadshot = false, subtitle = profile.email) {
  const initials = String(profile.name || profile.contactName || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const image = profile.headshotData && !hideHeadshot
    ? `<img class="profile-headshot" src="${profile.headshotData}" alt="${escapeHtml(profile.name || profile.contactName)} headshot">`
    : `<div class="profile-headshot placeholder">${escapeHtml(initials)}</div>`;
  return `<div class="profile-cell">${image}<div><strong>${escapeHtml(profile.name)}</strong><p>${escapeHtml(subtitle)}</p></div></div>`;
}

function profileSelect(store, id) {
  if (state.accessRole !== "owner") return "";
  return `<label class="profile-select"><input type="checkbox" data-profile-select="${store}" value="${id}"> Select</label>`;
}

function accessBadges(levels, fallback) {
  return normalizeAccessLevels(levels, fallback)
    .map((level) => level === "production" ? "Production Office" : level === "crew" ? "Crew / Runner" : "Client / Owner")
    .map((label) => `<span class="status-pill">${escapeHtml(label)}</span>`)
    .join(" ");
}

function promoterNoteBox(workerId) {
  const note = promoterNoteFor(workerId);
  return `<div class="note-box">
    <textarea data-profile-note="${workerId}" placeholder="Promoter note for this crew profile">${escapeHtml(note?.note || "")}</textarea>
    <button class="tiny-button" data-save-profile-note="${workerId}" type="button">Save Note</button>
  </div>`;
}

function renderTimecards() {
  const rows = visibleRecords(state.timecards).filter((card) => {
    const worker = getWorker(card.workerId);
    const venue = getVenue(card.venueId);
    const promoter = getPromoter(card.promoterId);
    const event = getEvent(card.eventId);
    return matchesSearch(card, `${worker?.name || ""} ${venue?.name || ""} ${promoter?.name || ""} ${event?.name || ""}`);
  });
  $("#timecardTableCount").textContent = `${rows.length} shown`;
  $("#timecardTable").innerHTML = rows.length
    ? rows.map((card) => {
        const worker = getWorker(card.workerId);
        const venue = getVenue(card.venueId);
        const event = getEvent(card.eventId);
        const liveAction = card.clockOut || !canAdminEdit() ? "" : `<button class="tiny-button" data-clock-out="${card.id}" type="button">Clock Out</button>`;
        return `<tr><td><strong>${escapeHtml(worker?.name || "Unknown worker")}</strong></td><td>${escapeHtml(event?.name || card.eventName)}<p>${escapeHtml(card.notes)}</p></td><td>${escapeHtml(venue?.name || "")}</td><td>${formatDate(card.clockIn)}</td><td>${formatDate(card.lunchOut)}${card.lunchIn ? `<p>In: ${formatDate(card.lunchIn)}</p>` : ""}</td><td>${formatDate(card.clockOut) || "Live"}</td><td>${timecardHours(card).toFixed(2)}</td><td>${payBasis(card)}</td><td>${currency(estimatedPay(card))}</td><td>${actionButtons("timecards", card.id, "timecardForm", liveAction, canAdminEdit())}</td></tr>`;
      }).join("")
    : `<tr><td colspan="10" class="empty">No timecards match this search.</td></tr>`;
}

function renderPayroll() {
  const cards = visibleRecords(state.timecards).filter((card) => matchesSearch(card, `${getWorker(card.workerId)?.name || ""} ${getEvent(card.eventId)?.name || ""}`));
  const views = {
    worker: { label: "Individual", title: "By Individual", rows: groupPayroll(cards, (card) => getWorker(card.workerId)?.name || "Unknown worker") },
    event: { label: "Event", title: "By Event", rows: groupPayroll(cards, (card) => getEvent(card.eventId)?.name || card.eventName || "No event") },
    biweekly: { label: "Bi-weekly", title: "Bi-weekly", rows: groupPayroll(cards, (card) => biweeklyLabel(card.clockIn || card.createdAt)) },
    monthly: { label: "Monthly", title: "Monthly", rows: groupPayroll(cards, (card) => monthLabel(card.clockIn || card.createdAt)) }
  };
  if (!views[state.payrollView]) state.payrollView = "worker";
  const active = views[state.payrollView];
  $("#payrollTableCount").textContent = `${cards.length} timecards`;
  $("#payrollTabs").innerHTML = Object.entries(views).map(([key, view]) => `<button class="tab-button ${key === state.payrollView ? "active" : ""}" data-payroll-view="${key}" type="button">${view.label}</button>`).join("");
  $("#payrollSummaryTitle").textContent = active.title;
  renderSummary("#payrollSummary", active.rows);
}

function renderDirectory() {
  const tabs = state.accessRole === "crew"
    ? [["crew", "Crew"]]
    : [
        ["crew", "Crew"],
        ["promoter", "Promoter"],
        ["venue", "Venue"]
      ];
  if (!tabs.some(([key]) => key === state.directoryTab)) state.directoryTab = "crew";
  $("#directoryTabs").innerHTML = tabs.map(([key, label]) => `<button class="tab-button ${state.directoryTab === key ? "active" : ""}" data-directory-tab="${key}" type="button">${label}</button>`).join("");

  if (state.directoryTab === "crew") renderCrewDirectory();
  if (state.directoryTab === "promoter") renderPromoterDirectory();
  if (state.directoryTab === "venue") renderVenueDirectory();
}

function renderCrewDirectory() {
  const rows = visibleWorkers().filter((worker) => matchesSearch(worker));
  $("#directoryTableCount").textContent = `${rows.length} crew`;
  $("#directoryHead").innerHTML = `<tr><th>Name</th><th>Phone</th><th>Email</th></tr>`;
  $("#directoryTable").innerHTML = rows.length
    ? rows.map((worker) => `<tr><td>${profileCell(worker, worker.hideHeadshot, publicWorkerValue(worker, "email"))}</td><td>${escapeHtml(publicWorkerValue(worker, "phone"))}</td><td>${escapeHtml(publicWorkerValue(worker, "email"))}</td></tr>`).join("")
    : `<tr><td colspan="3" class="empty">No crew directory entries match this search.</td></tr>`;
}

function renderPromoterDirectory() {
  const rows = visiblePromoters().filter((promoter) => matchesSearch(promoter));
  $("#directoryTableCount").textContent = `${rows.length} promoter reps`;
  $("#directoryHead").innerHTML = `<tr><th>Rep</th><th>Company</th><th>Phone</th><th>Email</th></tr>`;
  $("#directoryTable").innerHTML = rows.length
    ? rows.map((promoter) => `<tr><td>${profileCell(promoter, false, promoter.contactName)}</td><td>${escapeHtml(promoter.companyName || "Independent")}</td><td>${escapeHtml(promoter.phone)}</td><td>${escapeHtml(promoter.email)}</td></tr>`).join("")
    : `<tr><td colspan="4" class="empty">No promoter directory entries match this search.</td></tr>`;
}

function renderVenueDirectory() {
  const rows = visibleVenues().filter((venue) => matchesSearch(venue));
  $("#directoryTableCount").textContent = `${rows.length} venues`;
  $("#directoryHead").innerHTML = `<tr><th>Venue</th><th>Address</th><th>Contact</th><th>Parking</th></tr>`;
  $("#directoryTable").innerHTML = rows.length
    ? rows.map((venue) => `<tr><td><strong>${escapeHtml(venue.name)}</strong></td><td>${escapeHtml(venue.address)}</td><td>${escapeHtml(venue.contactName)}<p>${escapeHtml(venue.phone)} ${escapeHtml(venue.email)}</p></td><td>${escapeHtml(venue.parking)}</td></tr>`).join("")
    : `<tr><td colspan="4" class="empty">No venue directory entries match this search.</td></tr>`;
}

function groupPayroll(cards, labelFn) {
  const totals = new Map();
  cards.forEach((card) => {
    const label = labelFn(card);
    const existing = totals.get(label) || { label, hours: 0, pay: 0 };
    existing.hours += timecardHours(card);
    existing.pay += estimatedPay(card);
    totals.set(label, existing);
  });
  return Array.from(totals.values()).sort((a, b) => b.pay - a.pay);
}

function renderSummary(selector, rows) {
  $(selector).innerHTML = rows.length
    ? rows.map((row) => `<div class="summary-item"><strong>${escapeHtml(row.label)}</strong><span>${row.hours.toFixed(2)} hrs</span><b>${currency(row.pay)}</b></div>`).join("")
    : `<div class="summary-item empty">No payroll yet.</div>`;
}

function biweeklyLabel(value) {
  if (!value) return "Unscheduled";
  const date = new Date(value);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const day = Math.floor((date - startOfYear) / 86400000);
  const period = Math.floor(day / 14) + 1;
  return `${date.getFullYear()} period ${period}`;
}

function monthLabel(value) {
  if (!value) return "Unscheduled";
  return new Date(value).toLocaleString([], { month: "long", year: "numeric" });
}

function renderVehicles() {
  const rows = visibleRecords(state.vehicleLogs).filter((log) => matchesSearch(log, `${getEvent(log.eventId)?.name || ""} ${getWorker(log.workerId)?.name || ""}`));
  $("#vehicleTableCount").textContent = `${rows.length} shown`;
  $("#vehicleTable").innerHTML = rows.length
    ? rows.map((log) => `<tr><td>${escapeHtml(getEvent(log.eventId)?.name || "")}</td><td>${escapeHtml(getWorker(log.workerId)?.name || "")}</td><td><strong>${escapeHtml(log.vehicleType)}</strong><p>${escapeHtml(log.plateNumber)}</p></td><td>${escapeHtml(log.gasGauge)}</td><td>${escapeHtml(log.phase)}<p>${formatDate(log.scheduledDate)}</p></td><td>${vehiclePhotoGallery(log)}</td><td>${actionButtons("vehicleLogs", log.id, "vehicleForm", "", canScopedEdit())}</td></tr>`).join("")
    : `<tr><td colspan="7" class="empty">No vehicle checks match this search.</td></tr>`;
}

function renderReports() {
  const rows = visibleRecords(state.accidentReports).filter((report) => matchesSearch(report, `${getEvent(report.eventId)?.name || ""} ${getWorker(report.workerId)?.name || ""}`));
  $("#reportTableCount").textContent = `${rows.length} shown`;
  $("#reportTable").innerHTML = rows.length
    ? rows.map((report) => `<tr><td>${escapeHtml(report.type)}</td><td>${escapeHtml(getEvent(report.eventId)?.name || "")}</td><td>${escapeHtml(getWorker(report.workerId)?.name || "")}</td><td><strong>${escapeHtml(report.title)}</strong><p>${escapeHtml(report.details)}</p></td><td>${formatDate(report.reportedAt)}</td><td>${photoGallery(report.photos || (report.photoData ? [report.photoData] : []))}</td><td>${actionButtons("accidentReports", report.id, "reportForm", "", canScopedEdit())}</td></tr>`).join("")
    : `<tr><td colspan="7" class="empty">No accident reports match this search.</td></tr>`;
}

function vehiclePhotoGallery(log) {
  const photos = log.vehiclePhotos || {};
  const items = [
    ["Front", photos.front],
    ["Back", photos.back],
    ["Driver", photos.driverSide],
    ["Passenger", photos.passengerSide],
    ["Gas", photos.gasGauge],
    ...[].concat(photos.priorDamages || []).map((photo, index) => [`Damage ${index + 1}`, photo])
  ];
  if (log.photoData) items.push(["Legacy", log.photoData]);
  return photoGallery(items.filter(([, photo]) => photo));
}

function photoGallery(items) {
  const normalized = items.map((item, index) => Array.isArray(item) ? item : [`Photo ${index + 1}`, item]).filter(([, photo]) => photo);
  if (!normalized.length) return "";
  return `<div class="photo-gallery">${normalized.map(([label, photo]) => `<figure><img class="photo-thumb" src="${photo}" alt="${escapeHtml(label)}"><figcaption>${escapeHtml(label)}</figcaption></figure>`).join("")}</div>`;
}

function renderVenues() {
  const rows = visibleVenues().filter((venue) => matchesSearch(venue));
  $("#venueTableCount").textContent = `${rows.length} shown`;
  $("#venueTable").innerHTML = rows.length
    ? rows.map((venue) => `<tr><td><strong>${escapeHtml(venue.name)}</strong><p>${escapeHtml(venue.notes)}</p></td><td>${escapeHtml(venue.address)}</td><td>${escapeHtml(venue.contactName)}<p>${escapeHtml(venue.phone)} ${escapeHtml(venue.email)}</p></td><td>${escapeHtml(venue.parking)}</td><td>${actionButtons("venues", venue.id, "venueForm", "", canVenueEdit())}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">No venues match this search.</td></tr>`;
}

function renderPromoters() {
  const rows = visiblePromoters().filter((promoter) => matchesSearch(promoter));
  $("#promoterTableCount").textContent = `${rows.length} shown`;
  $("#promoterTable").innerHTML = rows.length
    ? rows.map((promoter) => `<tr><td>${profileSelect("promoters", promoter.id)}${profileCell(promoter, false, promoter.contactName)}</td><td><strong>${escapeHtml(promoter.companyName || "Independent")}</strong><p>${escapeHtml(promoter.contactName)}</p></td><td>${escapeHtml(promoter.phone)}</td><td>${escapeHtml(promoter.email)}</td><td>${escapeHtml(promoter.notes || promoter.billing)}<p>${accessBadges(promoter.accessLevels, "production")}</p></td><td>${actionButtons("promoters", promoter.id, "promoterForm", "", canEditPromoter(promoter))}</td></tr>`).join("")
    : `<tr><td colspan="6" class="empty">No promoter profiles match this search.</td></tr>`;
}

function renderRunnerStops() {
  const categories = runnerCategories();
  if (!categories.includes(state.runnerCategory)) state.runnerCategory = "All";
  renderRunnerCategoryCreator();
  $("#runnerTabs").innerHTML = categories.map((category) => `<button class="tab-button ${category === state.runnerCategory ? "active" : ""}" data-runner-category="${escapeHtml(category)}" type="button">${escapeHtml(category)}</button>`).join("");
  const rows = state.runnerStops
    .filter((stop) => state.runnerCategory === "All" || (stop.category || "Other") === state.runnerCategory)
    .filter((stop) => matchesSearch(stop));
  $("#runnerTableCount").textContent = `${rows.length} shown`;
  $("#runnerTable").innerHTML = rows.length
    ? rows.map((stop) => `<tr><td><strong>${escapeHtml(stop.name)}</strong><p>${escapeHtml(stop.phone)}</p></td><td>${escapeHtml(stop.category)}</td><td>${escapeHtml(stop.address)}</td><td>${escapeHtml(stop.hours)}</td><td>${escapeHtml(stop.bestUse)}</td><td>${actionButtons("runnerStops", stop.id, "runnerForm")}</td></tr>`).join("")
    : `<tr><td colspan="6" class="empty">No runner stops match this search.</td></tr>`;
}

function runnerCategories() {
  const builtIns = ["Hardware", "Food", "Printing", "Medical", "Rental", "Transportation", "Other"];
  const fromStops = state.runnerStops.map((stop) => stop.category || "Other");
  const custom = state.runnerCategories.map((category) => category.name);
  return ["All", ...Array.from(new Set([...builtIns, ...fromStops, ...custom].filter(Boolean))).sort()];
}

function runnerCategoriesAddedThisYear(workerId = state.activeWorkerId) {
  const year = new Date().getFullYear();
  return state.runnerCategories.filter((category) => category.createdByWorkerId === workerId && Number(category.createdYear) === year).length;
}

function renderRunnerCategoryCreator() {
  const form = $("#runnerCategoryForm");
  const limit = $("#runnerCategoryLimit");
  const visible = state.accessRole === "crew";
  form.hidden = !visible;
  if (!visible) return;
  const used = runnerCategoriesAddedThisYear();
  const remaining = Math.max(0, 3 - used);
  limit.textContent = `${remaining} of 3 left this year`;
  form.querySelector("button").disabled = remaining <= 0;
}

function applyWorkerPayDefaultsToTimecard(workerId) {
  const worker = getWorker(workerId);
  const form = $("#timecardForm");
  if (!worker || !form) return;
  form.elements.dayRate.value = form.elements.dayRate.value || worker.defaultDayRate || worker.defaultRate || "";
  form.elements.includedHours.value = form.elements.includedHours.value || worker.defaultIncludedHours || "10";
  form.elements.additionalRate.value = form.elements.additionalRate.value || worker.defaultAdditionalRate || "";
  const vehicleUse = form.elements.vehicleUse.value;
  if (vehicleUse === "Rented Vehicle") form.elements.vehicleRate.value = worker.defaultRentedVehicleRate || "";
  if (vehicleUse === "Personal Vehicle") form.elements.vehicleRate.value = worker.defaultPersonalVehicleRate || "";
}

function setView(viewId) {
  const profile = currentProfile();
  if (!profile.views.includes(viewId)) viewId = profile.views[0];
  state.activeView = viewId;
  $$(".view").forEach((view) => view.classList.toggle("active-view", view.id === viewId));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  const label = (NAV_GROUPS[state.accessRole] || []).flatMap((group) => group.items).find(([view]) => view === viewId)?.[1];
  $("#viewTitle").textContent = label || $(`.nav-item[data-view="${viewId}"]`)?.textContent || "Dashboard";
}

function renderNavigation() {
  const groups = NAV_GROUPS[state.accessRole] || NAV_GROUPS.owner;
  $(".nav-list").innerHTML = groups.map((group) => {
    const heading = group.label ? `<div class="nav-group-label">${group.label}</div>` : "";
    const items = group.items
      .filter(([view]) => currentProfile().views.includes(view))
      .map(([view, label]) => `<button class="nav-item ${state.activeView === view ? "active" : ""}" data-view="${view}" type="button">${label}</button>`)
      .join("");
    return `${heading}${items}`;
  }).join("");
}

function applyAccessProfile() {
  const profile = currentProfile();
  document.body.classList.toggle("crew-mode", state.accessRole === "crew");
  $("#accessRole").value = state.accessRole;
  renderAccessRoleOptions();
  renderNavigation();
  $("#crewScopeControl").hidden = state.accessRole !== "crew";
  $("#promoterScopeControl").hidden = state.accessRole !== "production";
  $("#exportData").hidden = !profile.canImportExport;
  $("#importData").closest(".file-action").hidden = !profile.canImportExport;
  $("#seedData").hidden = !profile.canSeed;
  $$(".admin-form").forEach((form) => { form.hidden = !profile.canAdminEdit; });
  $$(".owner-form").forEach((form) => { form.hidden = !profile.canOwnerEdit; });
  $$(".venue-form").forEach((form) => { form.hidden = !profile.canVenueEdit; });
  $$(".scoped-form").forEach((form) => { form.hidden = !profile.canScopedEdit; });
  $$(".admin-action").forEach((button) => { button.hidden = !profile.canAdminEdit; });
  $$(".owner-action").forEach((button) => { button.hidden = !profile.canOwnerEdit; });
  $$(".venue-action").forEach((button) => { button.hidden = !profile.canVenueEdit; });
  $$(".scoped-action").forEach((button) => { button.hidden = !profile.canScopedEdit; });
  $$(".worker-action").forEach((button) => { button.hidden = !(state.accessRole === "owner" || state.accessRole === "crew"); });
  if (!profile.views.includes(state.activeView)) setView(profile.views[0]);
}

function renderAccessRoleOptions() {
  const select = $("#accessRole");
  Array.from(select.options).forEach((option) => {
    option.hidden = false;
  });
  select.value = state.accessRole;
}

function setAccessRole(role) {
  state.accessRole = ACCESS_PROFILES[role] ? role : "owner";
  localStorage.setItem("productionCrewAccessRole", state.accessRole);
  render();
  toast(`${currentProfile().label} view active.`);
}

async function saveForm(event, storeName) {
  event.preventDefault();
  const form = event.currentTarget;
  const formId = form.id;
  if (storeName === "venues" && !canVenueEdit()) {
    toast("This access view cannot save venues.");
    return;
  }
  if (storeName === "workers" && state.accessRole === "crew" && form.elements.id.value && form.elements.id.value !== state.activeWorkerId) {
    toast("Crew can only save their own profile.");
    return;
  }
  if (storeName === "workers" && !canAdminEdit() && state.accessRole !== "crew") {
    toast("This access view cannot save crew profiles.");
    return;
  }
  if (storeName === "promoters" && state.accessRole === "production") {
    const id = form.elements.id.value;
    if (id && id !== state.activePromoterId) {
      toast("Promoters can only edit their own profile.");
      return;
    }
  }
  if (storeName === "promoters" && !canAdminEdit() && state.accessRole !== "production") {
    toast("This access view cannot save promoter profiles.");
    return;
  }
  if (["events", "runnerStops", "timecards"].includes(storeName) && !canAdminEdit()) {
    toast("Switch to Client / Owner or Promoter / Production Office to save this.");
    return;
  }
  if (["vehicleLogs", "accidentReports"].includes(storeName) && !canScopedEdit()) {
    toast("This access view cannot save this record.");
    return;
  }

  const record = await formRecord(form);
  const existing = record.id ? state[storeName].find((item) => item.id === record.id) : null;
  let merged = { ...(existing || {}), ...record };
  if (storeName === "workers" && state.accessRole === "crew") {
    const current = getWorker(state.activeWorkerId) || {};
    merged = {
      ...current,
      id: state.activeWorkerId,
      headshotData: record.headshotData || current.headshotData,
      name: record.name,
      phone: record.phone,
      email: record.email,
      mailingAddress: record.mailingAddress,
      hidePhone: record.hidePhone,
      hideEmail: record.hideEmail,
      hideHeadshot: record.hideHeadshot
    };
  }
  if (storeName === "promoters" && state.accessRole === "production") {
    const active = getPromoter(state.activePromoterId);
    merged.companyName = active?.companyName || merged.companyName;
  }
  if (storeName === "timecards" && merged.eventId) {
    const relatedEvent = getEvent(merged.eventId);
    const worker = getWorker(merged.workerId);
    merged.eventName = merged.eventName || relatedEvent?.name || "";
    merged.venueId = merged.venueId || relatedEvent?.venueId || "";
    merged.promoterId = merged.promoterId || relatedEvent?.promoterId || "";
    merged.dayRate = merged.dayRate || worker?.defaultDayRate || worker?.defaultRate || "";
    merged.includedHours = merged.includedHours || worker?.defaultIncludedHours || "10";
    merged.additionalRate = merged.additionalRate || worker?.defaultAdditionalRate || "";
    if (merged.vehicleUse === "Rented Vehicle") merged.vehicleRate = merged.vehicleRate || worker?.defaultRentedVehicleRate || "";
    if (merged.vehicleUse === "Personal Vehicle") merged.vehicleRate = merged.vehicleRate || worker?.defaultPersonalVehicleRate || "";
  }
  if (state.accessRole === "crew") merged.workerId = state.activeWorkerId;
  if (state.accessRole === "production") {
    if (storeName === "events" || storeName === "timecards") merged.promoterId = state.activePromoterId || merged.promoterId;
    if (["vehicleLogs", "accidentReports"].includes(storeName) && merged.eventId && !isEventVisible(merged.eventId)) {
      toast("Promoters can only save records for their events.");
      return;
    }
  }

  await put(storeName, merged);
  closeForm(formId);
  await loadState();
  setView(state.activeView);
  closeForm(formId);
  toast("Saved and closed.");
  window.setTimeout(() => closeForm(formId), 0);
}

async function deleteRecord(storeName, id) {
  if (storeName === "venues" && !canVenueEdit()) return;
  const adminStores = ["events", "workers", "promoters", "runnerStops", "timecards"];
  if (adminStores.includes(storeName) && !canAdminEdit()) return;
  if (["vehicleLogs", "accidentReports"].includes(storeName) && !canScopedEdit()) return;
  const confirmed = confirm("Delete this record?");
  if (!confirmed) return;
  await remove(storeName, id);
  await loadState();
  setView(state.activeView);
  toast("Deleted.");
}

function selectedProfileIds(storeName) {
  return $$(`[data-profile-select="${storeName}"]:checked`).map((input) => input.value);
}

function setVisibleProfileSelection(storeName, checked) {
  $$(`[data-profile-select="${storeName}"]`).forEach((input) => {
    input.checked = checked;
  });
}

async function bulkDeleteProfiles(storeName) {
  if (state.accessRole !== "owner") {
    toast("Only Client / Owner can bulk delete profiles.");
    return;
  }
  const ids = selectedProfileIds(storeName);
  if (!ids.length) {
    toast("Select profiles first.");
    return;
  }
  const label = storeName === "workers" ? "crew profiles" : "promoter profiles";
  const confirmed = confirm(`Delete ${ids.length} selected ${label}?`);
  if (!confirmed) return;

  for (const id of ids) {
    await remove(storeName, id);
    if (storeName === "workers") {
      for (const event of state.events.filter((item) => eventWorkerIds(item).includes(id))) {
        await put("events", { ...event, workerIds: eventWorkerIds(event).filter((workerId) => workerId !== id) });
      }
      for (const note of state.profileNotes.filter((item) => item.workerId === id)) await remove("profileNotes", note.id);
    }
    if (storeName === "promoters") {
      for (const event of state.events.filter((item) => item.promoterId === id)) {
        await put("events", { ...event, promoterId: "" });
      }
      for (const note of state.profileNotes.filter((item) => item.promoterId === id)) await remove("profileNotes", note.id);
    }
  }
  await loadState();
  setView(state.activeView);
  toast("Selected profiles deleted.");
}

async function saveProfileNote(workerId) {
  if (state.accessRole !== "production" || !assignedWorkerIdsForVisibleEvents().has(workerId)) return;
  const textarea = document.querySelector(`[data-profile-note="${workerId}"]`);
  const existing = promoterNoteFor(workerId);
  await put("profileNotes", {
    ...(existing || {}),
    workerId,
    promoterId: state.activePromoterId,
    note: textarea?.value || ""
  });
  await loadState();
  setView(state.activeView);
  toast("Profile note saved.");
}

async function addRunnerCategory(event) {
  event.preventDefault();
  if (state.accessRole !== "crew" || !state.activeWorkerId) return;
  const input = event.currentTarget.elements.name;
  const name = normalizeCategoryName(input.value);
  if (!name) {
    toast("Enter a category name.");
    return;
  }
  if (runnerCategories().some((category) => category.toLowerCase() === name.toLowerCase())) {
    state.runnerCategory = runnerCategories().find((category) => category.toLowerCase() === name.toLowerCase()) || name;
    input.value = "";
    renderRunnerStops();
    toast("That category already exists.");
    return;
  }
  if (runnerCategoriesAddedThisYear() >= 3) {
    toast("This worker has used all 3 category adds for this year.");
    return;
  }
  const year = new Date().getFullYear();
  await put("runnerCategories", {
    name,
    createdByWorkerId: state.activeWorkerId,
    createdYear: year
  });
  state.runnerCategory = name;
  input.value = "";
  await loadState();
  setView(state.activeView);
  toast("Runner category added.");
}

function normalizeCategoryName(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 40)
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function clockOutNow(id) {
  const card = state.timecards.find((item) => item.id === id);
  if (!card || !canAdminEdit()) return;
  await put("timecards", { ...card, clockOut: toLocalInputValue(new Date()) });
  await loadState();
  setView(state.activeView);
  toast("Clocked out.");
}

async function crewPunch(eventId, field) {
  if (!state.activeWorkerId || !isEventVisible(eventId)) return;
  const event = getEvent(eventId);
  const now = toLocalInputValue(new Date());
  let card = state.timecards.find((item) => item.eventId === eventId && item.workerId === state.activeWorkerId && !item.clockOut);
  if (!card && field === "clockIn") {
    card = state.timecards.find((item) => item.eventId === eventId && item.workerId === state.activeWorkerId);
  }
  if (!card) {
    const worker = getWorker(state.activeWorkerId);
    card = {
      workerId: state.activeWorkerId,
      eventId,
      eventName: event?.name || "",
      venueId: event?.venueId || "",
      promoterId: event?.promoterId || "",
      breakMinutes: "0",
      dayRate: worker?.defaultDayRate || worker?.defaultRate || "",
      includedHours: worker?.defaultIncludedHours || "10",
      additionalRate: worker?.defaultAdditionalRate || ""
    };
  }
  card[field] = now;
  if (field === "clockIn" && !card.eventName) card.eventName = event?.name || "";
  await put("timecards", card);
  await loadState();
  setView(state.activeView);
  toast("Time updated.");
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.setTimeout(() => element.classList.remove("show"), 2200);
}

async function seedData() {
  if (state.workers.length || state.venues.length || state.promoters.length || state.runnerStops.length || state.events.length) {
    const confirmed = confirm("Sample data will be added to your existing database. Continue?");
    if (!confirmed) return;
  }

  const venueId = crypto.randomUUID();
  const promoterId = crypto.randomUUID();
  const workerId = crypto.randomUUID();
  const workerTwoId = crypto.randomUUID();
  const eventId = crypto.randomUUID();

  await Promise.all([
    put("workers", { id: workerId, name: "Maya Torres", role: "Audio A2", phone: "(555) 212-0199", email: "maya@example.com", status: "Available", accessLevels: ["crew"], defaultDayRate: "380", defaultIncludedHours: "10", defaultAdditionalRate: "48", defaultRentedVehicleRate: "25", defaultPersonalVehicleRate: "80", skills: "RF coordination, patching, stage comms", emergency: "Luis Torres (555) 212-0101", mailingAddress: "100 Crew Lane, Long Beach, CA", hidePhone: "", hideEmail: "", hideHeadshot: "", notes: "Strong on fast festival changeovers." }),
    put("workers", { id: workerTwoId, name: "Andre Bell", role: "Lighting tech", phone: "(555) 718-3320", email: "andre@example.com", status: "Booked", accessLevels: ["crew", "production"], defaultDayRate: "420", defaultIncludedHours: "10", defaultAdditionalRate: "55", defaultRentedVehicleRate: "25", defaultPersonalVehicleRate: "90", skills: "Moving lights, dimmers, console prep", emergency: "Renee Bell (555) 718-0022", mailingAddress: "200 Stage Road, Los Angeles, CA", hidePhone: "", hideEmail: "", hideHeadshot: "", notes: "Prefers overnight strike calls with advance notice." }),
    put("venues", { id: venueId, name: "Harbor Pavilion", address: "100 Pier Road, Long Beach, CA", contactName: "Nina Patel", phone: "(555) 410-9088", email: "nina@harbor.example", parking: "Crew lot B. Enter from Pier Road and show call sheet.", notes: "Dock is stage left. Freight elevator requires venue security key." }),
    put("promoters", { id: promoterId, companyName: "LiveNation", name: "Cal Reed", contactName: "Local promoter rep", phone: "(555) 300-8001", email: "cal@livenation.example", accessLevels: ["production"], billing: "Invoices need event code and signed timecard export.", notes: "Usually adds two runners on show day." }),
    put("events", { id: eventId, name: "Harbor Pavilion Summer Show", type: "Concert", productionContact: "Dana Lee (555) 550-1212", venueId, promoterId, workerIds: [workerId, workerTwoId], startDate: toLocalInputValue(new Date(Date.now() + 86400000)), endDate: toLocalInputValue(new Date(Date.now() + 129600000)), notes: "Two runners, one van, overnight strike likely." }),
    put("runnerStops", { name: "Ace Pro Hardware", category: "Hardware", address: "44 Market Street, Long Beach, CA", phone: "(555) 444-1515", hours: "6 AM - 9 PM", bestUse: "Gaff tape, batteries, hand tools, last-minute fasteners", notes: "Account at contractor desk under production company name." }),
    put("timecards", { workerId, eventId, eventName: "Harbor Pavilion Summer Show", venueId, promoterId, clockIn: toLocalInputValue(new Date(Date.now() - 2 * 36e5)), clockOut: "", lunchOut: "", lunchIn: "", breakMinutes: "0", dayRate: "380", includedHours: "10", additionalRate: "48", vehicleUse: "Personal Vehicle", vehicleRate: "80", notes: "Patch support and RF check." })
  ]);

  state.activeWorkerId = workerId;
  state.activePromoterId = promoterId;
  localStorage.setItem("productionCrewActiveWorker", workerId);
  localStorage.setItem("productionCrewActivePromoter", promoterId);
  await loadState();
  setView(state.activeView);
  toast("Sample data loaded.");
}

async function exportData() {
  const payload = {};
  STORES.forEach((store) => {
    payload[store] = state[store];
  });
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `production-crew-database-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const text = await file.text();
  const payload = JSON.parse(text);
  for (const store of STORES) {
    if (Array.isArray(payload[store])) {
      for (const record of payload[store]) await put(store, record);
    }
  }
  event.target.value = "";
  await loadState();
  setView(state.activeView);
  toast("Import complete.");
}

function bindEvents() {
  $(".nav-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (button) setView(button.dataset.view);
  });
  $("#accessRole").addEventListener("change", (event) => setAccessRole(event.target.value));
  $("#activeWorker").addEventListener("change", (event) => {
    state.activeWorkerId = event.target.value;
    localStorage.setItem("productionCrewActiveWorker", state.activeWorkerId);
    render();
  });
  $("#activePromoter").addEventListener("change", (event) => {
    state.activePromoterId = event.target.value;
    localStorage.setItem("productionCrewActivePromoter", state.activePromoterId);
    render();
  });
  $("#globalSearch").addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });
  $("#timecardForm select[name='eventId']").addEventListener("change", (event) => {
    const selectedEvent = getEvent(event.target.value);
    if (!selectedEvent) return;
    $("#timecardForm").elements.eventName.value = selectedEvent.name || "";
    $("#timecardForm").elements.venueId.value = selectedEvent.venueId || "";
    $("#timecardForm").elements.promoterId.value = selectedEvent.promoterId || "";
  });
  $("#timecardForm select[name='workerId']").addEventListener("change", (event) => applyWorkerPayDefaultsToTimecard(event.target.value));
  $("#timecardForm select[name='vehicleUse']").addEventListener("change", () => applyWorkerPayDefaultsToTimecard($("#timecardForm").elements.workerId.value));

  $("#eventForm").addEventListener("submit", (event) => saveForm(event, "events"));
  $("#workerForm").addEventListener("submit", (event) => saveForm(event, "workers"));
  $("#venueForm").addEventListener("submit", (event) => saveForm(event, "venues"));
  $("#promoterForm").addEventListener("submit", (event) => saveForm(event, "promoters"));
  $("#runnerForm").addEventListener("submit", (event) => saveForm(event, "runnerStops"));
  $("#runnerCategoryForm").addEventListener("submit", addRunnerCategory);
  $("#timecardForm").addEventListener("submit", (event) => saveForm(event, "timecards"));
  $("#vehicleForm").addEventListener("submit", (event) => saveForm(event, "vehicleLogs"));
  $("#reportForm").addEventListener("submit", (event) => saveForm(event, "accidentReports"));

  $$(".clear-form").forEach((button) => button.addEventListener("click", () => closeForm(button.dataset.form)));
  $("#clockInNow").addEventListener("click", () => {
    $("#timecardForm").elements.clockIn.value = toLocalInputValue(new Date());
    $("#timecardForm").elements.clockOut.value = "";
  });
  $("#seedData").addEventListener("click", seedData);
  $("#exportData").addEventListener("click", exportData);
  $("#importData").addEventListener("change", importData);

  document.body.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-edit]");
    const openButton = event.target.closest("[data-open-form]");
    const deleteButton = event.target.closest("[data-delete]");
    const clockButton = event.target.closest("[data-clock-out]");
    const punchButton = event.target.closest("[data-time-punch]");
    const runnerTab = event.target.closest("[data-runner-category]");
    const directoryTab = event.target.closest("[data-directory-tab]");
    const payrollTab = event.target.closest("[data-payroll-view]");
    const profileNoteButton = event.target.closest("[data-save-profile-note]");
    const selectVisibleButton = event.target.closest("[data-select-visible]");
    const clearSelectedButton = event.target.closest("[data-clear-selected]");
    const bulkDeleteButton = event.target.closest("[data-bulk-delete]");

    if (openButton) {
      clearForm(openButton.dataset.openForm);
      if (openButton.dataset.openForm === "workerForm" && state.accessRole === "crew") {
        const active = getWorker(state.activeWorkerId);
        if (active) fillForm("workerForm", active);
        else openForm("workerForm");
      } else {
        openForm(openButton.dataset.openForm);
      }
    }

    if (editButton) {
      const collection = state[editButton.dataset.edit];
      const record = collection.find((item) => item.id === editButton.dataset.id);
      if (record) fillForm(editButton.dataset.form, record);
    }

    if (deleteButton) await deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);
    if (clockButton) await clockOutNow(clockButton.dataset.clockOut);
    if (punchButton) await crewPunch(punchButton.dataset.eventId, punchButton.dataset.timePunch);
    if (profileNoteButton) await saveProfileNote(profileNoteButton.dataset.saveProfileNote);
    if (selectVisibleButton) setVisibleProfileSelection(selectVisibleButton.dataset.selectVisible, true);
    if (clearSelectedButton) setVisibleProfileSelection(clearSelectedButton.dataset.clearSelected, false);
    if (bulkDeleteButton) await bulkDeleteProfiles(bulkDeleteButton.dataset.bulkDelete);
    if (payrollTab) {
      state.payrollView = payrollTab.dataset.payrollView;
      localStorage.setItem("productionCrewPayrollView", state.payrollView);
      renderPayroll();
    }
    if (runnerTab) {
      state.runnerCategory = runnerTab.dataset.runnerCategory;
      renderRunnerStops();
    }
    if (directoryTab) {
      state.directoryTab = directoryTab.dataset.directoryTab;
      renderDirectory();
    }
  });

  $("#modalBackdrop").addEventListener("click", closeActiveForm);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeActiveForm();
  });
}

async function init() {
  bindEvents();
  clearForm("timecardForm");
  clearForm("reportForm");
  db = await openDatabase();
  await loadState();
}

init().catch((error) => {
  console.error(error);
  toast("Something went wrong opening the database.");
});
