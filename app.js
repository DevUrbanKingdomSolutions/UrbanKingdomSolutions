const DB_NAME = "productionCrewDatabase";
const DB_VERSION = 7;
const SUPABASE_URL = "https://nnhqrhaltkmymnwxydwr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uaHFyaGFsdGtteW1ud3h5ZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjMxNDgsImV4cCI6MjA5MzU5OTE0OH0.X9iGhE61WehM57133LKCWMfXXDHmcb2rhw-ZPCKAJos";
const LOGIN_SETUP_FUNCTION = "send-login-setup";
const STORES = [
  "clients",
  "clientReps",
  "workers",
  "venues",
  "promoters",
  "profileNotes",
  "events",
  "timecards",
  "runnerStops",
  "runnerCategories",
  "systemProfiles",
  "vehicleLogs",
  "accidentReports"
];

const ROLE_ALIASES = {
  admin: "ADMIN",
  owner: "CLIENT",
  client: "CLIENT",
  production: "PROMOTER_PRODUCTION_OFFICE",
  promoter: "PROMOTER_PRODUCTION_OFFICE",
  promoter_production_office: "PROMOTER_PRODUCTION_OFFICE",
  crew: "CREW",
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  PROMOTER_PRODUCTION_OFFICE: "PROMOTER_PRODUCTION_OFFICE",
  CREW: "CREW"
};

const ACCESS_PROFILES = {
  ADMIN: {
    label: "ADMIN",
    views: ["adminProfile", "admin"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: false,
    canImportExport: false,
    canSystemEdit: true
  },
  CLIENT: {
    label: "CLIENT",
    views: ["dashboard", "clientProfile", "workers", "promoters", "venues", "events", "productionBoard", "clock", "timecards", "vehicles", "reports", "payroll", "directory", "runner"],
    canAdminEdit: true,
    canOwnerEdit: true,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: true,
    canSystemEdit: false
  },
  PROMOTER_PRODUCTION_OFFICE: {
    label: "PROMOTER_PRODUCTION_OFFICE",
    views: ["productionBoard", "events", "workers", "promoters", "venues", "vehicles", "reports", "directory"],
    canAdminEdit: true,
    canOwnerEdit: false,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: false,
    canSystemEdit: false
  },
  CREW: {
    label: "CREW",
    views: ["workers", "clock", "events", "timecards"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: true,
    canImportExport: false,
    canSystemEdit: false
  }
};

let db;
let supabaseClient;
let appHasLoaded = false;
let authState = {
  session: null,
  user: null,
  roleRecord: null,
  pendingSetup: false
};

let state = {
  workers: [],
  venues: [],
  promoters: [],
  profileNotes: [],
  events: [],
  timecards: [],
  runnerStops: [],
  runnerCategories: [],
  systemProfiles: [],
  vehicleLogs: [],
  accidentReports: [],
  clients: [],
  clientReps: [],
  search: "",
  activeView: "dashboard",
  accessRole: "CLIENT",
  activeWorkerId: localStorage.getItem("productionCrewActiveWorker") || "",
  activePromoterId: localStorage.getItem("productionCrewActivePromoter") || "",
  runnerCategory: "All",
  directoryTab: "crew",
  payrollView: localStorage.getItem("productionCrewPayrollView") || "worker"
};

const NAV_GROUPS = {
  ADMIN: [
    { items: [["adminProfile", "My Profile"]] },
    { items: [["admin", "Admin Console"]] }
  ],
  CLIENT: [
    { items: [["dashboard", "Dashboard"]] },
    { items: [["clientProfile", "My Profile"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["productionBoard", "Production Board"], ["clock", "TimeClock"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PAYROLL", items: [["payroll", "Payroll"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["runner", "Gig Directory"]] }
  ],
  PROMOTER_PRODUCTION_OFFICE: [
    { items: [["productionBoard", "Production Board"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"]] }
  ],
  CREW: [
    { items: [["workers", "My Profile"], ["clock", "Time Clock"]] },
    { label: "EVENTS", items: [["events", "Events"], ["timecards", "Timecards"]] }
  ]
};

const ROLE_HOME_VIEWS = {
  ADMIN: "adminProfile",
  CLIENT: "dashboard",
  PROMOTER_PRODUCTION_OFFICE: "productionBoard",
  CREW: "workers"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("This browser does not allow local database storage here."));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      STORES.forEach((storeName) => {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };

    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => {
        database.close();
        if (db === database) db = null;
      };
      database.onclose = () => {
        if (db === database) db = null;
      };
      resolve(database);
    };
    request.onerror = () => reject(request.error);
  });
}

async function ensureDatabase() {
  if (!db) db = await openDatabase();
  return db;
}

async function storeTransaction(storeName, mode = "readonly") {
  await ensureDatabase();
  try {
    return db.transaction(storeName, mode).objectStore(storeName);
  } catch (error) {
    if (String(error?.message || "").includes("connection is closing")) {
      db = null;
      await ensureDatabase();
      return db.transaction(storeName, mode).objectStore(storeName);
    }
    throw error;
  }
}

async function getAll(storeName) {
  const store = await storeTransaction(storeName);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function put(storeName, record) {
  const store = await storeTransaction(storeName, "readwrite");
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString();
    const request = store.put({
      ...record,
      id: record.id || crypto.randomUUID(),
      updatedAt: now,
      createdAt: record.createdAt || now
    });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function remove(storeName, id) {
  const store = await storeTransaction(storeName, "readwrite");
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function loadState() {
  const [clients, clientReps, workers, venues, promoters, profileNotes, events, timecards, runnerStops, runnerCategories, systemProfiles, vehicleLogs, accidentReports] = await Promise.all(STORES.map(getAll));
  state = {
    ...state,
    clients: sortByName(clients),
    clientReps: sortByName(clientReps),
    workers: sortByName(workers),
    venues: sortByName(venues),
    promoters: sortByName(promoters),
    profileNotes,
    events: events.sort((a, b) => new Date(b.startDate || b.createdAt || 0) - new Date(a.startDate || a.createdAt || 0)),
    timecards: timecards.sort((a, b) => new Date(b.clockIn || b.createdAt || 0) - new Date(a.clockIn || a.createdAt || 0)),
    runnerStops: sortByName(runnerStops),
    runnerCategories: sortByName(runnerCategories),
    systemProfiles: sortByName(systemProfiles),
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
      const selectedValues = key === "accessLevels" ? normalizeAccessLevels(value, "") : value;
      Array.from(form.elements[key].options).forEach((option) => {
        option.selected = selectedValues.includes(option.value);
      });
    } else {
      form.elements[key].value = value || "";
    }
  });
  openForm(formId);
}

function clearForm(formId) {
  const form = document.getElementById(formId);
  if (!form?.reset) return;
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

function isSupabaseConfigured() {
  return Boolean(
    window.supabase
    && SUPABASE_URL.startsWith("https://")
    && !SUPABASE_URL.includes("YOUR_PROJECT_REF")
    && SUPABASE_ANON_KEY
    && !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")
  );
}

function showAuthScreen(message = "") {
  $("#authScreen").hidden = false;
  $("#setupScreen").hidden = true;
  $("#appShell").hidden = true;
  $("#sessionEmail").textContent = "Not signed in";
  $("#sessionRole").textContent = "ROLE";
  $("#authMessage").textContent = message;
}

function showSetupScreen(session, message = "Set your password to finish setup.") {
  $("#authScreen").hidden = true;
  $("#setupScreen").hidden = false;
  $("#appShell").hidden = true;
  $("#setupMessage").textContent = message;
  const form = $("#setupForm");
  form.elements.name.value = session?.user?.user_metadata?.name || "";
  form.elements.phone.value = session?.user?.user_metadata?.phone || "";
  form.elements.password.value = "";
  form.elements.confirmPassword.value = "";
}

function showAppShell() {
  $("#authScreen").hidden = true;
  $("#setupScreen").hidden = true;
  $("#appShell").hidden = false;
}

function setAuthMessage(message) {
  $("#authMessage").textContent = message;
}

function initializeSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  if (!supabaseClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseClient;
}

function setupTypeFromUrl() {
  const values = new URLSearchParams(location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(location.search);
  return values.get("type") || query.get("type") || "";
}

function needsPasswordSetup(type) {
  return ["invite", "recovery"].includes(String(type || "").toLowerCase());
}

async function fetchUserRole(session) {
  const email = session.user?.email || "unknown email";
  const userId = session.user?.id || "unknown user id";
  const { data, error } = await supabaseClient
    .from("user_roles")
    .select("role, worker_id, promoter_id, client_id")
    .eq("user_id", session.user.id)
    .maybeSingle();
  if (error) throw error;
  if (data?.role) {
    return {
      ...data,
      role: normalizeRole(data.role)
    };
  }

  const fallback = await fetchUserRoleFromHelpers();
  if (fallback?.role) return fallback;

  throw new Error(`No role is assigned to ${email}. Supabase user ID: ${userId}`);
}

async function fetchUserRoleFromHelpers() {
  const [{ data: role }, { data: clientId }, { data: workerId }, { data: promoterId }] = await Promise.all([
    supabaseClient.rpc("current_app_role"),
    supabaseClient.rpc("current_client_id"),
    supabaseClient.rpc("current_worker_id"),
    supabaseClient.rpc("current_promoter_id")
  ]);
  if (!role) return null;
  return {
    role: normalizeRole(role),
    client_id: clientId || null,
    worker_id: workerId || null,
    promoter_id: promoterId || null
  };
}

function profileLoginRole(storeName, record) {
  const fallback = storeName === "clients" ? "CLIENT" : storeName === "promoters" ? "PROMOTER_PRODUCTION_OFFICE" : "CREW";
  return normalizeRole(record.loginRole || normalizeAccessLevels(record.accessLevels, fallback)[0] || fallback);
}

function profileRolePayload(storeName, record) {
  const role = profileLoginRole(storeName, record);
  return {
    user_id: record.authUserId,
    role,
    client_id: storeName === "clients" ? record.id : authState.roleRecord?.client_id || null,
    worker_id: storeName === "workers" ? record.id : null,
    promoter_id: storeName === "promoters" ? record.id : null,
    updated_at: new Date().toISOString()
  };
}

async function syncSupabaseClientAccount(record) {
  const canSyncClient = canSystemEdit() || (isClientRole() && record.id === authState.roleRecord?.client_id);
  if (!canSyncClient) return "";
  const { error } = await supabaseClient.from("clients").upsert({
    id: record.id,
    name: record.name,
    contact_name: record.contactName || "",
    email: record.email || "",
    phone: record.phone || "",
    status: record.status || "Active",
    notes: record.notes || "",
    updated_at: new Date().toISOString()
  });
  if (error) throw error;
  return "Supabase client account connected.";
}

async function syncSupabaseClientRep(record) {
  if (!isClientRole() || record.clientId !== authState.roleRecord?.client_id) return "";
  const { error } = await supabaseClient.from("client_reps").upsert({
    id: record.id,
    client_id: record.clientId,
    auth_user_id: record.authUserId || authState.user?.id || null,
    name: record.name,
    title: record.title || "",
    email: record.email || "",
    phone: record.phone || "",
    mailing_address: record.mailingAddress || "",
    smtp_provider: record.smtpProvider || "",
    smtp_from_name: record.smtpFromName || "",
    smtp_from_email: record.smtpFromEmail || "",
    smtp_reply_to: record.smtpReplyTo || "",
    smtp_host: record.smtpHost || "",
    smtp_port: record.smtpPort || "",
    smtp_username: record.smtpUsername || "",
    smtp_secret_ref: record.smtpSecretRef || "",
    smtp_secure: record.smtpSecure || "",
    email_routing_status: record.emailRoutingStatus || "Not configured",
    updated_at: new Date().toISOString()
  });
  if (error) throw error;
  return "Client rep profile connected.";
}

async function syncSupabaseRoleForProfile(storeName, record) {
  if (!["clients", "workers", "promoters"].includes(storeName) || !record.authUserId) return "";
  if (storeName === "clients" && !canSystemEdit()) return "";
  if (storeName !== "clients" && !canOwnerEdit()) return "";
  const { error } = await supabaseClient
    .from("user_roles")
    .upsert(profileRolePayload(storeName, record), { onConflict: "user_id" });
  if (error) throw error;
  return "Supabase login role connected.";
}

function loginSetupPayload(storeName, record) {
  const email = (record.loginEmail || record.email || "").trim();
  const profileType = storeName === "clients" ? "client" : storeName === "workers" ? "worker" : "promoter";
  return {
    profileType,
    profileId: record.id,
    email,
    role: profileLoginRole(storeName, record),
    clientId: storeName === "clients" ? record.id : authState.roleRecord?.client_id || null,
    workerId: storeName === "workers" ? record.id : null,
    promoterId: storeName === "promoters" ? record.id : null
  };
}

async function applyAuthenticatedSession(session, preferredView = "") {
  if (!session) {
    authState = { session: null, user: null, roleRecord: null, pendingSetup: false };
    appHasLoaded = false;
    showAuthScreen("Log in with your Supabase account.");
    return;
  }

  authState.session = session;
  authState.user = session.user;
  if (authState.pendingSetup) {
    showSetupScreen(session);
    return;
  }
  const roleRecord = await fetchUserRole(session);
  authState.roleRecord = roleRecord;
  state.accessRole = roleRecord.role;
  state.activeView = preferredView && ACCESS_PROFILES[roleRecord.role]?.views.includes(preferredView)
    ? preferredView
    : roleHomeView();
  if (roleRecord.worker_id) state.activeWorkerId = roleRecord.worker_id;
  if (roleRecord.promoter_id) state.activePromoterId = roleRecord.promoter_id;

  $("#sessionEmail").textContent = session.user.email || "Signed in";
  $("#sessionRole").textContent = state.accessRole;
  showAppShell();
  await ensureDatabase();
  await loadState();
  appHasLoaded = true;
  const homeView = state.activeView && currentProfile().views.includes(state.activeView) ? state.activeView : roleHomeView();
  if (location.hash !== `#${homeView}`) history.replaceState(null, "", `#${homeView}`);
  setView(homeView);
}

async function initializeAuth() {
  if (!initializeSupabaseClient()) {
    showAuthScreen("Add your Supabase URL and anon key in app.js to enable login.");
    return;
  }

  const setupType = setupTypeFromUrl();
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    showAuthScreen(error.message);
    return;
  }
  authState.pendingSetup = Boolean(data.session && needsPasswordSetup(setupType));
  try {
    await applyAuthenticatedSession(data.session);
  } catch (error) {
    console.error(error);
    showAuthScreen(error.message || "Could not load your assigned role.");
  }

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    window.setTimeout(() => {
      if (authState.pendingSetup && session) {
        authState.session = session;
        authState.user = session.user;
        showSetupScreen(session);
        return;
      }
      applyAuthenticatedSession(session).catch((error) => {
        console.error(error);
        showAuthScreen(error.message || "Could not load your assigned role.");
      });
    }, 0);
  });
}

async function loginWithSupabase(event) {
  event.preventDefault();
  if (!initializeSupabaseClient()) {
    setAuthMessage("Add your Supabase URL and anon key in app.js first.");
    return;
  }
  const form = event.currentTarget;
  setAuthMessage("Signing in...");
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: form.elements.email.value,
    password: form.elements.password.value
  });
  if (error) {
    setAuthMessage(error.message);
    return;
  }
  form.reset();
  try {
    await applyAuthenticatedSession(data.session);
  } catch (error) {
    console.error(error);
    setAuthMessage(error.message || "Could not load your assigned role.");
  }
}

function profileViewForRole(role) {
  const normalized = normalizeRole(role);
  if (normalized === "ADMIN") return "adminProfile";
  if (normalized === "CLIENT") return "clientProfile";
  if (normalized === "PROMOTER_PRODUCTION_OFFICE") return "promoters";
  if (normalized === "CREW") return "workers";
  return roleHomeView(normalized);
}

async function completeAccountSetup(event) {
  event.preventDefault();
  if (!initializeSupabaseClient()) return;
  const form = event.currentTarget;
  const password = form.elements.password.value;
  const confirmPassword = form.elements.confirmPassword.value;
  if (password !== confirmPassword) {
    $("#setupMessage").textContent = "Passwords do not match.";
    return;
  }
  $("#setupMessage").textContent = "Saving setup...";
  const { data, error } = await supabaseClient.auth.updateUser({
    password,
    data: {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      setupCompletedAt: new Date().toISOString()
    }
  });
  if (error) {
    $("#setupMessage").textContent = error.message;
    return;
  }
  authState.pendingSetup = false;
  const sessionResult = await supabaseClient.auth.getSession();
  const session = sessionResult.data?.session || authState.session;
  const roleRecord = await fetchUserRole(session);
  authState.roleRecord = roleRecord;
  state.accessRole = roleRecord.role;
  if (roleRecord.role === "CLIENT") {
    await ensureDatabase();
    const existingRep = state.clientReps.find((rep) => rep.authUserId === session.user.id || rep.email === session.user.email);
    await put("clientReps", {
      ...(existingRep || {}),
      id: existingRep?.id || session.user.id,
      clientId: roleRecord.client_id || "",
      authUserId: session.user.id,
      name: form.elements.name.value,
      email: session.user.email || "",
      phone: form.elements.phone.value,
      emailRoutingStatus: existingRep?.emailRoutingStatus || "Not configured"
    });
  }
  const profileView = profileViewForRole(roleRecord.role);
  if (location.hash !== `#${profileView}`) history.replaceState(null, "", `#${profileView}`);
  await applyAuthenticatedSession({ ...session, user: data.user || session.user }, profileView);
}

async function logout() {
  if (!supabaseClient) return;
  appHasLoaded = false;
  authState = { session: null, user: null, roleRecord: null, pendingSetup: false };
  showAuthScreen("Logging out...");
  await supabaseClient.auth.signOut();
  showAuthScreen("Logged out. Sign in again when ready.");
}

async function clearSavedLogin() {
  initializeSupabaseClient();
  appHasLoaded = false;
  authState = { session: null, user: null, roleRecord: null, pendingSetup: false };
  if (supabaseClient) await supabaseClient.auth.signOut({ scope: "local" });
  Object.keys(localStorage)
    .filter((key) => key.startsWith("sb-"))
    .forEach((key) => localStorage.removeItem(key));
  showAuthScreen("Saved login cleared. Sign in again.");
}

function matchesSearch(record, extra = "") {
  const haystack = `${Object.values(record).flat().join(" ")} ${extra}`.toLowerCase();
  return haystack.includes(state.search);
}

function normalizeRole(role) {
  const value = String(role || "").trim();
  return ROLE_ALIASES[value] || ROLE_ALIASES[value.toLowerCase()] || "CLIENT";
}

function normalizeAccessLevel(level) {
  const value = String(level || "").trim();
  return value ? normalizeRole(value) : "";
}

function isAdminRole() {
  return state.accessRole === "ADMIN";
}

function isClientRole() {
  return state.accessRole === "CLIENT";
}

function isProductionRole() {
  return state.accessRole === "PROMOTER_PRODUCTION_OFFICE";
}

function isCrewRole() {
  return state.accessRole === "CREW";
}

function currentProfile() {
  return ACCESS_PROFILES[state.accessRole] || ACCESS_PROFILES.CLIENT;
}

function roleHomeView(role = state.accessRole) {
  const normalized = normalizeRole(role);
  return ROLE_HOME_VIEWS[normalized] || ACCESS_PROFILES[normalized]?.views?.[0] || "dashboard";
}

function protectedViewFor(viewId) {
  const profile = currentProfile();
  return profile.views.includes(viewId) ? viewId : roleHomeView();
}

function assignedAccessForRole(role) {
  const normalized = normalizeRole(role);
  if (normalized === "CLIENT") return ["CLIENT", "PROMOTER_PRODUCTION_OFFICE", "CREW"];
  if (normalized === "CREW") {
    const worker = getWorker(state.activeWorkerId);
    return normalizeAccessLevels(worker?.accessLevels, "CREW");
  }
  if (normalized === "PROMOTER_PRODUCTION_OFFICE") {
    const promoter = getPromoter(state.activePromoterId);
    return normalizeAccessLevels(promoter?.accessLevels, "PROMOTER_PRODUCTION_OFFICE");
  }
  return [normalized];
}

function normalizeAccessLevels(levels, fallback) {
  const values = Array.isArray(levels) ? levels : String(levels || "").split(",");
  const clean = values.map((level) => normalizeAccessLevel(level)).filter(Boolean);
  return clean.length ? Array.from(new Set(clean)) : [normalizeAccessLevel(fallback)].filter(Boolean);
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

function canSystemEdit() {
  return currentProfile().canSystemEdit;
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
  if (isAdminRole()) return [];
  if (isProductionRole()) {
    return state.events.filter((event) => !state.activePromoterId || event.promoterId === state.activePromoterId);
  }
  if (!isCrewRole()) return state.events;
  return state.events.filter((event) => eventWorkerIds(event).includes(state.activeWorkerId));
}

function isEventVisible(eventId) {
  if (isAdminRole()) return false;
  if (isProductionRole()) {
    const event = getEvent(eventId);
    return !!event && (!state.activePromoterId || event.promoterId === state.activePromoterId);
  }
  if (!isCrewRole()) return true;
  const event = getEvent(eventId);
  return !!event && eventWorkerIds(event).includes(state.activeWorkerId);
}

function visibleRecords(records) {
  if (isAdminRole()) return [];
  if (isProductionRole()) {
    return records.filter((record) => {
      if (record.promoterId && state.activePromoterId && record.promoterId !== state.activePromoterId) return false;
      return !record.eventId || isEventVisible(record.eventId);
    });
  }
  if (!isCrewRole()) return records;
  return records.filter((record) => {
    if (record.workerId !== state.activeWorkerId) return false;
    return !!record.eventId && isEventVisible(record.eventId);
  });
}

function assignedWorkerIdsForVisibleEvents() {
  return new Set(visibleEvents().flatMap((event) => eventWorkerIds(event)));
}

function visibleWorkers() {
  if (isAdminRole()) return [];
  if (isClientRole()) return state.workers;
  if (isCrewRole()) return state.workers;
  const ids = assignedWorkerIdsForVisibleEvents();
  return state.workers.filter((worker) => ids.has(worker.id));
}

function visiblePromoters() {
  if (isAdminRole()) return [];
  if (isClientRole()) return state.promoters;
  if (!isProductionRole()) return [];
  const active = getPromoter(state.activePromoterId);
  return state.promoters.filter((promoter) => {
    if (!active?.companyName) return promoter.id === state.activePromoterId;
    return promoter.companyName === active.companyName;
  });
}

function visibleVenues() {
  if (isAdminRole()) return [];
  if (isClientRole() || isProductionRole()) return state.venues;
  const venueIds = new Set(visibleEvents().map((event) => event.venueId).filter(Boolean));
  return state.venues.filter((venue) => venueIds.has(venue.id));
}

function canEditWorker(worker) {
  if (isClientRole()) return true;
  return isCrewRole() && worker.id === state.activeWorkerId;
}

function canEditPromoter(promoter) {
  if (isClientRole()) return true;
  return isProductionRole() && promoter.id === state.activePromoterId;
}

function promoterNoteFor(workerId) {
  return state.profileNotes.find((note) => note.workerId === workerId && note.promoterId === state.activePromoterId);
}

function publicWorkerValue(worker, key) {
  if (worker.id === state.activeWorkerId || !isCrewRole()) return worker[key] || "";
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
  renderAdmin();
  renderDashboard();
  renderClientProfile();
  renderAdminProfile();
  renderEvents();
  renderProductionBoard();
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

function renderAdmin() {
  $("#clientTableCount").textContent = `${state.clients.length} clients`;
  $("#clientTable").innerHTML = state.clients.length
    ? state.clients.map((client) => `<tr><td><button class="link-button" data-view-client-company="${client.id}" type="button"><strong>${escapeHtml(client.name)}</strong></button><p>${escapeHtml(client.email)}</p></td><td>${escapeHtml(client.contactName)}<p>${escapeHtml(client.phone)}</p></td><td><span class="status-pill">${escapeHtml(client.status || "Active")}</span></td><td>${escapeHtml(client.notes)}${loginStatus(client)}</td><td>${actionButtons("clients", client.id, "clientForm", loginSetupButton("clients", client), canSystemEdit())}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">No client accounts yet.</td></tr>`;
}

function openClientCompanyView(clientId) {
  const client = state.clients.find((item) => item.id === clientId);
  if (!client || !canSystemEdit()) return;
  $("#clientCompanyViewBody").innerHTML = `<article class="profile-page-card">
    <div class="profile-page-header">
      <div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(client.name || "Company"))}</div>
      <div>
        <h3>${escapeHtml(client.name || "Client company")}</h3>
        <p>${escapeHtml(client.status || "Active")}</p>
      </div>
      <button class="tiny-button system-action" data-edit="clients" data-id="${client.id}" data-form="clientForm" type="button">Edit Information</button>
    </div>
    <div class="profile-detail-grid">
      <div><span>Main Contact</span><strong>${escapeHtml(client.contactName || "")}</strong></div>
      <div><span>Email</span><strong>${escapeHtml(client.email || "")}</strong></div>
      <div><span>Phone</span><strong>${escapeHtml(client.phone || "")}</strong></div>
    </div>
    <div class="profile-section"><span>System Notes</span><p>${escapeHtml(client.notes || "")}</p></div>
  </article>`;
  $("#editViewedClientCompany").dataset.editClientId = client.id;
  openForm("clientCompanyView");
}

function activeClientRecord() {
  const clientId = authState.roleRecord?.client_id || "";
  return state.clients.find((client) => client.id === clientId) || null;
}

function activeClientRepRecord() {
  const clientId = authState.roleRecord?.client_id || "";
  const userId = authState.user?.id || "";
  const email = authState.user?.email || "";
  return state.clientReps.find((rep) => rep.authUserId === userId)
    || state.clientReps.find((rep) => rep.clientId === clientId && rep.email === email)
    || null;
}

function clientRepDefaults() {
  return {
    id: authState.user?.id || crypto.randomUUID(),
    clientId: authState.roleRecord?.client_id || "",
    authUserId: authState.user?.id || "",
    name: authState.user?.user_metadata?.name || "",
    email: authState.user?.email || "",
    phone: authState.user?.user_metadata?.phone || "",
    emailRoutingStatus: "Not configured"
  };
}

function clientEmailRoutingSummary(rep) {
  if (!rep) return `<div class="compact-item empty">No rep profile connected yet.</div>`;
  return `<div class="compact-item">
    <strong>${escapeHtml(rep.name || "My profile")}</strong>
    <span>${escapeHtml(rep.smtpProvider || "No SMTP provider selected")} · ${escapeHtml(rep.emailRoutingStatus || "Not configured")}</span>
    <p>${escapeHtml(rep.smtpFromEmail || rep.email || "")}</p>
  </div>`;
}

function renderClientProfile() {
  const summary = $("#clientProfileSummary");
  const card = $("#clientProfileCard");
  const companyCard = $("#clientCompanyCard");
  const client = activeClientRecord();
  const rep = activeClientRepRecord();
  if (summary) summary.innerHTML = clientEmailRoutingSummary(rep);
  if (!card) return;
  const profile = rep || clientRepDefaults();
  card.innerHTML = `<article class="profile-page-card">
    <div class="profile-page-header">
      <div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(profile.name || authState.user?.email || "Me"))}</div>
      <div>
        <h3>${escapeHtml(profile.name || "My profile")}</h3>
        <p>${escapeHtml(profile.title || "Client rep")}</p>
      </div>
      <button class="tiny-button owner-action" data-open-form="clientProfileForm" type="button">Edit Profile</button>
    </div>
    <div class="profile-detail-grid">
      <div><span>Email</span><strong>${escapeHtml(profile.email || "")}</strong></div>
      <div><span>Phone</span><strong>${escapeHtml(profile.phone || "")}</strong></div>
      <div><span>Email Provider</span><strong>${escapeHtml(profile.smtpProvider || "Not selected")}</strong></div>
      <div><span>Routing Status</span><strong>${escapeHtml(profile.emailRoutingStatus || "Not configured")}</strong></div>
      <div><span>From Email</span><strong>${escapeHtml(profile.smtpFromEmail || "")}</strong></div>
      <div><span>Reply-To</span><strong>${escapeHtml(profile.smtpReplyTo || "")}</strong></div>
      <div><span>SMTP Username</span><strong>${escapeHtml(profile.smtpUsername || "")}</strong></div>
      <div><span>Security</span><strong>${escapeHtml(profile.smtpSecure || "Not selected")}</strong></div>
    </div>
    <div class="profile-section"><span>SMTP Host</span><p>${escapeHtml(profile.smtpHost || "")}${profile.smtpPort ? ":" + escapeHtml(profile.smtpPort) : ""}</p></div>
    <div class="profile-section"><span>Secret Reference</span><p>${escapeHtml(profile.smtpSecretRef || "No secret reference saved")}</p></div>
  </article>`;
  if (companyCard) {
    companyCard.innerHTML = client ? `<article class="profile-page-card">
      <div class="profile-page-header">
        <div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(client.name || "Company"))}</div>
        <div>
          <h3>${escapeHtml(client.name || "Client company")}</h3>
          <p>${escapeHtml(client.status || "Active")}</p>
        </div>
        <button class="tiny-button owner-action" data-open-form="clientCompanyProfileForm" type="button">Edit Company</button>
      </div>
      <div class="profile-detail-grid">
        <div><span>Main Contact</span><strong>${escapeHtml(client.contactName || "")}</strong></div>
        <div><span>Email</span><strong>${escapeHtml(client.email || "")}</strong></div>
        <div><span>Phone</span><strong>${escapeHtml(client.phone || "")}</strong></div>
      </div>
      <div class="profile-section"><span>Company Notes</span><p>${escapeHtml(client.notes || "")}</p></div>
    </article>` : `<div class="compact-item empty">No company profile connected yet.</div>`;
  }
}

function renderAdminProfile() {
  const card = $("#adminProfileCard");
  if (!card) return;
  const profile = activeAdminProfile();
  const name = profile.name || authState.user?.user_metadata?.name || "System Admin";
  const email = profile.email || authState.user?.email || "";
  card.innerHTML = `<article class="profile-page-card">
    <div class="profile-page-header">
      <div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(name || email || "Admin"))}</div>
      <div>
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(email)}</p>
      </div>
      <button class="tiny-button system-action" data-open-form="adminProfileForm" type="button">SMTP Settings</button>
    </div>
    <div class="profile-detail-grid">
      <div><span>Access Role</span><strong>ADMIN</strong></div>
      <div><span>System Access</span><strong>Client setup and troubleshooting</strong></div>
      <div><span>Email Provider</span><strong>${escapeHtml(profile.smtpProvider || "Not selected")}</strong></div>
      <div><span>Routing Status</span><strong>${escapeHtml(profile.emailRoutingStatus || "Not configured")}</strong></div>
      <div><span>From Email</span><strong>${escapeHtml(profile.smtpFromEmail || "")}</strong></div>
      <div><span>Reply-To</span><strong>${escapeHtml(profile.smtpReplyTo || "")}</strong></div>
    </div>
    <div class="profile-section"><span>SMTP Host</span><p>${escapeHtml(profile.smtpHost || "")}${profile.smtpPort ? ":" + escapeHtml(profile.smtpPort) : ""}</p></div>
    <div class="profile-section"><span>Secret Reference</span><p>${escapeHtml(profile.smtpSecretRef || "No secret reference saved")}</p></div>
    <div class="profile-section"><span>Security Boundary</span><p>ADMIN can manage system setup and client accounts, but does not load sensitive production records, payroll, timecards, crew personal data, promoter records, or reports.</p></div>
  </article>`;
}

function activeAdminProfile() {
  return state.systemProfiles.find((profile) => profile.id === "adminProfile") || {
    id: "adminProfile",
    name: authState.user?.user_metadata?.name || "System Admin",
    email: authState.user?.email || "",
    emailRoutingStatus: "Not configured"
  };
}

function initialsFor(value) {
  return String(value || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function renderSelects() {
  const workers = isAdminRole() ? [] : state.workers;
  const events = visibleEvents();
  const venues = isAdminRole() ? [] : state.venues;
  const promoters = isAdminRole() ? [] : state.promoters;
  const workerOptions = `<option value="">Select worker</option>${workers.map((worker) => `<option value="${worker.id}">${escapeHtml(worker.name)}</option>`).join("")}`;
  const venueOptions = `<option value="">No venue selected</option>${venues.map((venue) => `<option value="${venue.id}">${escapeHtml(venue.name)}</option>`).join("")}`;
  const promoterOptions = `<option value="">No promoter rep selected</option>${promoters.map((promoter) => `<option value="${promoter.id}">${escapeHtml(promoterLabel(promoter))}</option>`).join("")}`;
  const eventOptions = `<option value="">Select event</option>${events.map((event) => `<option value="${event.id}">${escapeHtml(event.name)}</option>`).join("")}`;

  $("#activeWorker").innerHTML = workers.length ? workers.map((worker) => `<option value="${worker.id}">${escapeHtml(worker.name)}</option>`).join("") : `<option value="">No workers yet</option>`;
  $("#activeWorker").value = state.activeWorkerId;
  $("#activePromoter").innerHTML = promoters.length ? promoters.map((promoter) => `<option value="${promoter.id}">${escapeHtml(promoterLabel(promoter))}</option>`).join("") : `<option value="">No promoter reps yet</option>`;
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
  if (isAdminRole()) {
    $("#eventCount").textContent = "0";
    $("#activeTimecards").textContent = "0";
    $("#venueCount").textContent = "0";
    $("#payrollCount").textContent = "$0";
    $("#liveCrewList").innerHTML = `<div class="compact-item empty">ADMIN does not load production timecard data.</div>`;
    $("#recentNotes").innerHTML = `<div class="compact-item empty">ADMIN does not load production notes.</div>`;
    return;
  }
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
    ...((isClientRole() || isProductionRole()) ? state.venues.map((item) => ({ type: "Venue", name: item.name, text: item.notes || item.parking, updatedAt: item.updatedAt })) : []),
    ...((isClientRole() || isProductionRole()) ? visiblePromoters().map((item) => ({ type: "Promoter", name: promoterLabel(item), text: item.notes, updatedAt: item.updatedAt })) : []),
    ...((isClientRole() || isProductionRole()) ? state.runnerStops.map((item) => ({ type: "Runner", name: item.name, text: item.notes || item.bestUse, updatedAt: item.updatedAt })) : [])
  ].filter((item) => item.text).sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

  $("#recentNotes").innerHTML = noteItems.length
    ? noteItems.slice(0, 8).map((item) => `<div class="compact-item"><strong>${escapeHtml(item.type)}: ${escapeHtml(item.name)}</strong><span>${escapeHtml(item.text)}</span></div>`).join("")
    : `<div class="compact-item empty">Notes will appear here as you add them.</div>`;
}

function renderProductionBoard() {
  const events = visibleEvents().filter((event) => matchesSearch(event, `${getVenue(event.venueId)?.name || ""} ${getPromoter(event.promoterId)?.name || ""}`));
  const runnerIds = assignedWorkerIdsForVisibleEvents();
  const runners = state.workers.filter((worker) => runnerIds.has(worker.id));
  $("#productionBoardCount").textContent = `${events.length} events / ${runners.length} runners`;
  $("#productionBoardCards").innerHTML = events.length
    ? events.map((event) => {
        const venue = getVenue(event.venueId);
        const promoter = getPromoter(event.promoterId);
        const crew = eventWorkerIds(event).map((id) => getWorker(id)?.name).filter(Boolean).join(", ");
        return `<article class="record-card"><div><span>${escapeHtml(event.type || "Event")}</span><strong>${escapeHtml(event.name)}</strong><p>${escapeHtml(venue?.name || "")}</p><p>${escapeHtml(promoterLabel(promoter))}</p><p>${escapeHtml(crew || "No runners assigned")}</p></div><div><span>${formatDate(event.startDate)}</span><span>${formatDate(event.endDate)}</span></div></article>`;
      }).join("")
    : `<div class="compact-item empty">No production-board events match this view.</div>`;

  $("#runnerStatusTable").innerHTML = runners.length
    ? runners.map((worker) => {
        const eventsForWorker = events.filter((event) => eventWorkerIds(event).includes(worker.id)).map((event) => event.name).join(", ");
        const status = worker.runnerStatus || "Available";
        return `<tr><td>${profileCell(worker, worker.hideHeadshot, worker.email)}</td><td>${escapeHtml(eventsForWorker)}</td><td><span class="status-pill ${status === "On a Run" ? "warn" : ""}">${escapeHtml(status)}</span></td><td>${escapeHtml(worker.phone)}<p>${escapeHtml(worker.email)}</p></td><td><div class="row-actions"><button class="tiny-button" data-runner-status="${worker.id}" data-status="Available" type="button">Available</button><button class="tiny-button" data-runner-status="${worker.id}" data-status="On a Run" type="button">On a Run</button><button class="tiny-button" data-runner-status="${worker.id}" data-status="At Production Office" type="button">At Office</button></div></td></tr>`;
      }).join("")
    : `<tr><td colspan="5" class="empty">Assigned runners will appear here.</td></tr>`;
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
  const crewLine = isCrewRole() ? "Assigned to you" : (crew.join(", ") || "No crew assigned");
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

function loginSetupButton(store, profile) {
  if (store === "clients" ? !canSystemEdit() : !canOwnerEdit()) return "";
  const email = profile.loginEmail || profile.email;
  if (!email) return "";
  return `<button class="tiny-button" data-send-login="${store}" data-id="${profile.id}" type="button">Send Login Setup</button>`;
}

function loginStatus(profile) {
  if (!(canOwnerEdit() || canSystemEdit())) return "";
  if (profile.inviteStatus) return `<p>${escapeHtml(profile.inviteStatus)}</p>`;
  if (profile.authUserId) return `<p>Login connected</p>`;
  return `<p>Login not connected</p>`;
}

function renderWorkers() {
  const heading = document.querySelector("#workers .panel-heading h3");
  const nav = document.querySelector('.nav-item[data-view="workers"]');
  if (heading) heading.textContent = isCrewRole() ? "My Profile" : "Crew / Runner Profiles";
  if (nav) nav.textContent = isCrewRole() ? "My Profile" : "Crew Profiles";

  if (isCrewRole()) {
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
  const initials = initialsFor(worker.name || "?");
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
  const showLimited = isCrewRole();
  const canViewRates = isClientRole();
  const info = showLimited
    ? `${publicEmail ? `<p>${escapeHtml(publicEmail)}</p>` : ""}`
    : `${escapeHtml(worker.skills)}${canViewRates ? `<p>${currency(worker.defaultDayRate || worker.defaultRate || 0)}/${worker.defaultIncludedHours || 10} hrs</p><p>${accessBadges(worker.accessLevels, "CREW")}</p>${loginStatus(worker)}` : ""}`;
  const note = isProductionRole() ? promoterNoteBox(worker.id) : "";
  return `<tr>
    <td>${profileSelect("workers", worker.id)}${profileCell(worker, showLimited && worker.hideHeadshot && worker.id !== state.activeWorkerId, publicEmail)}</td>
    <td>${escapeHtml(showLimited ? "" : worker.role)}</td>
    <td>${showLimited ? "" : `<span class="status-pill ${worker.status === "Booked" ? "warn" : ""}">${escapeHtml(worker.status)}</span>`}</td>
    <td>${escapeHtml(publicPhone)}</td>
    <td>${info}${note}</td>
    <td>${actionButtons("workers", worker.id, "workerForm", loginSetupButton("workers", worker), canEditWorker(worker))}</td>
  </tr>`;
}

function profileCell(profile, hideHeadshot = false, subtitle = profile.email) {
  const initials = initialsFor(profile.name || profile.contactName || "?");
  const image = profile.headshotData && !hideHeadshot
    ? `<img class="profile-headshot" src="${profile.headshotData}" alt="${escapeHtml(profile.name || profile.contactName)} headshot">`
    : `<div class="profile-headshot placeholder">${escapeHtml(initials)}</div>`;
  return `<div class="profile-cell">${image}<div><strong>${escapeHtml(profile.name)}</strong><p>${escapeHtml(subtitle)}</p></div></div>`;
}

function profileSelect(store, id) {
  if (!isClientRole()) return "";
  return `<label class="profile-select"><input type="checkbox" data-profile-select="${store}" value="${id}"> Select</label>`;
}

function accessBadges(levels, fallback) {
  return normalizeAccessLevels(levels, fallback)
    .map((level) => level === "PROMOTER_PRODUCTION_OFFICE" ? "Production Office" : level === "CREW" ? "Crew / Runner" : level === "CLIENT" ? "Client" : "Admin")
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
  const tabs = isCrewRole()
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
    ? rows.map((promoter) => `<tr><td>${profileSelect("promoters", promoter.id)}${profileCell(promoter, false, promoter.contactName)}</td><td><strong>${escapeHtml(promoter.companyName || "Independent")}</strong><p>${escapeHtml(promoter.contactName)}</p></td><td>${escapeHtml(promoter.phone)}</td><td>${escapeHtml(promoter.email)}</td><td>${escapeHtml(promoter.notes || promoter.billing)}<p>${accessBadges(promoter.accessLevels, "PROMOTER_PRODUCTION_OFFICE")}</p>${loginStatus(promoter)}</td><td>${actionButtons("promoters", promoter.id, "promoterForm", loginSetupButton("promoters", promoter), canEditPromoter(promoter))}</td></tr>`).join("")
    : `<tr><td colspan="6" class="empty">No promoter profiles match this search.</td></tr>`;
}

function renderRunnerStops() {
  if (isAdminRole()) {
    $("#runnerTableCount").textContent = "0 shown";
    $("#runnerTabs").innerHTML = "";
    $("#runnerTable").innerHTML = `<tr><td colspan="6" class="empty">ADMIN does not load gig directory data.</td></tr>`;
    return;
  }
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
  const visible = isCrewRole();
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
  const requestedView = viewId;
  if (!authState.session) {
    showAuthScreen("Log in to continue.");
    return;
  }
  viewId = protectedViewFor(viewId);
  state.activeView = viewId;
  $$(".view").forEach((view) => view.classList.toggle("active-view", view.id === viewId));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  const label = (NAV_GROUPS[state.accessRole] || []).flatMap((group) => group.items).find(([view]) => view === viewId)?.[1];
  $("#viewTitle").textContent = label || $(`.nav-item[data-view="${viewId}"]`)?.textContent || "Dashboard";
  if (location.hash !== `#${viewId}`) history.replaceState(null, "", `#${viewId}`);
  if (requestedView !== viewId) toast("That view is restricted for your role.");
}

function renderNavigation() {
  const groups = NAV_GROUPS[state.accessRole] || NAV_GROUPS.CLIENT;
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
  document.body.classList.toggle("admin-mode", isAdminRole());
  document.body.classList.toggle("owner-mode", isClientRole());
  document.body.classList.toggle("production-mode", isProductionRole());
  document.body.classList.toggle("crew-mode", isCrewRole());
  renderAccessRoleOptions();
  renderNavigation();
  $("#crewScopeControl").hidden = !isCrewRole();
  $("#promoterScopeControl").hidden = !isProductionRole();
  $("#exportData").hidden = !profile.canImportExport;
  $("#importData").closest(".file-action").hidden = !profile.canImportExport;
  $$(".admin-form").forEach((form) => { form.hidden = !profile.canAdminEdit; });
  $$(".owner-form").forEach((form) => { form.hidden = !profile.canOwnerEdit; });
  $$(".rate-field").forEach((form) => { form.hidden = !isClientRole(); });
  $$(".venue-form").forEach((form) => { form.hidden = !profile.canVenueEdit; });
  $$(".scoped-form").forEach((form) => { form.hidden = !profile.canScopedEdit; });
  $$(".system-form").forEach((form) => { form.hidden = !profile.canSystemEdit; });
  $$(".admin-action").forEach((button) => { button.hidden = !profile.canAdminEdit; });
  $$(".owner-action").forEach((button) => { button.hidden = !profile.canOwnerEdit; });
  $$(".venue-action").forEach((button) => { button.hidden = !profile.canVenueEdit; });
  $$(".scoped-action").forEach((button) => { button.hidden = !profile.canScopedEdit; });
  $$(".system-action").forEach((button) => { button.hidden = !profile.canSystemEdit; });
  $$(".worker-action").forEach((button) => { button.hidden = !(isClientRole() || isCrewRole()); });
  if (!profile.views.includes(state.activeView)) setView(profile.views[0]);
}

function renderAccessRoleOptions() {
  $("#sessionRole").textContent = state.accessRole;
  $("#sessionEmail").textContent = authState.user?.email || "Signed in";
}

function setAccessRole(role) {
  const nextRole = normalizeRole(role);
  if (!ACCESS_PROFILES[nextRole]) return;
  state.accessRole = nextRole;
  render();
}

async function saveForm(event, storeName) {
  event.preventDefault();
  const form = event.currentTarget;
  const formId = form.id;
  if (storeName === "clients" && !(canSystemEdit() || isClientRole())) {
    toast("Only ADMIN or CLIENT can save client accounts.");
    return;
  }
  if (storeName === "clientReps" && !isClientRole()) {
    toast("Only CLIENT can save client rep profiles.");
    return;
  }
  if (storeName === "systemProfiles" && !canSystemEdit()) {
    toast("Only ADMIN can save system profile settings.");
    return;
  }
  if (isAdminRole() && !["clients", "systemProfiles"].includes(storeName)) {
    toast("ADMIN cannot access production records in this demo.");
    return;
  }
  if (storeName === "venues" && !canVenueEdit()) {
    toast("This access view cannot save venues.");
    return;
  }
  if (storeName === "workers" && isCrewRole() && form.elements.id.value && form.elements.id.value !== state.activeWorkerId) {
    toast("Crew can only save their own profile.");
    return;
  }
  if (storeName === "workers" && !canAdminEdit() && !isCrewRole()) {
    toast("This access view cannot save crew profiles.");
    return;
  }
  if (storeName === "promoters" && isProductionRole()) {
    const id = form.elements.id.value;
    if (id && id !== state.activePromoterId) {
      toast("Promoters can only edit their own profile.");
      return;
    }
  }
  if (storeName === "promoters" && !canAdminEdit() && !isProductionRole()) {
    toast("This access view cannot save promoter profiles.");
    return;
  }
  if (["events", "runnerStops", "timecards"].includes(storeName) && !canAdminEdit()) {
    toast("Switch to CLIENT or PROMOTER_PRODUCTION_OFFICE to save this.");
    return;
  }
  if (["vehicleLogs", "accidentReports"].includes(storeName) && !canScopedEdit()) {
    toast("This access view cannot save this record.");
    return;
  }

  const record = await formRecord(form);
  const existing = record.id ? state[storeName].find((item) => item.id === record.id) : null;
  let merged = { ...(existing || {}), ...record };
  if (storeName === "clientReps") {
    merged = {
      ...activeClientRepRecord(),
      ...record,
      id: record.id || authState.user?.id || crypto.randomUUID(),
      clientId: authState.roleRecord?.client_id || record.clientId || "",
      authUserId: authState.user?.id || record.authUserId || "",
      email: record.email || authState.user?.email || "",
      emailRoutingStatus: record.emailRoutingStatus || "Not configured"
    };
  }
  if (storeName === "systemProfiles") {
    merged.id = "adminProfile";
    merged.emailRoutingStatus = merged.emailRoutingStatus || "Not configured";
  }
  if (storeName === "clients" && isClientRole()) {
    const clientId = authState.roleRecord?.client_id || "";
    if (!clientId || (record.id && record.id !== clientId)) {
      toast("Client can only save their own profile.");
      return;
    }
    const current = activeClientRecord() || {};
    merged = {
      ...current,
      ...record,
      id: clientId,
      status: current.status || record.status || "Active",
      notes: record.notes || current.notes || ""
    };
  }
  if (storeName === "workers" && isCrewRole()) {
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
  if (storeName === "promoters" && isProductionRole()) {
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
  if (isCrewRole()) merged.workerId = state.activeWorkerId;
  if (isProductionRole()) {
    if (storeName === "events" || storeName === "timecards") merged.promoterId = state.activePromoterId || merged.promoterId;
    if (["vehicleLogs", "accidentReports"].includes(storeName) && merged.eventId && !isEventVisible(merged.eventId)) {
      toast("Promoters can only save records for their events.");
      return;
    }
  }

  if (["clients", "workers", "promoters"].includes(storeName)) {
    merged.id = merged.id || crypto.randomUUID();
    merged.loginEmail = merged.loginEmail || merged.email || "";
    merged.loginRole = merged.loginRole || profileLoginRole(storeName, merged);
  }

  let loginSyncMessage = "";
  await put(storeName, merged);
  try {
    if (storeName === "clients") loginSyncMessage = await syncSupabaseClientAccount(merged);
    if (storeName === "clientReps") loginSyncMessage = await syncSupabaseClientRep(merged);
    loginSyncMessage = await syncSupabaseRoleForProfile(storeName, merged) || loginSyncMessage;
  } catch (error) {
    console.error(error);
    loginSyncMessage = "Profile saved. Supabase role sync needs attention.";
  }
  closeForm(formId);
  await loadState();
  setView(state.activeView);
  closeForm(formId);
  toast(loginSyncMessage || "Saved and closed.");
  window.setTimeout(() => closeForm(formId), 0);
}

async function deleteRecord(storeName, id) {
  if (storeName === "clients" && !canSystemEdit()) return;
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
  if (!isClientRole()) {
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

async function sendLoginSetup(storeName, id) {
  const canSendSetup = storeName === "clients" ? canSystemEdit() : canOwnerEdit();
  if (!canSendSetup) {
    toast(storeName === "clients" ? "Only ADMIN can send client login setup." : "Only Client can send login setup.");
    return;
  }
  if (!initializeSupabaseClient()) {
    toast("Supabase login is not configured.");
    return;
  }
  const record = state[storeName]?.find((item) => item.id === id);
  if (!record) return;
  const payload = loginSetupPayload(storeName, record);
  if (!payload.email) {
    toast("Add a login email first.");
    return;
  }
  if (storeName === "clients") {
    try {
      await syncSupabaseClientAccount(record);
    } catch (error) {
      console.error(error);
      toast("Client account needs to sync with Supabase first.");
      return;
    }
  }
  const { data, error } = await supabaseClient.functions.invoke(LOGIN_SETUP_FUNCTION, { body: payload });
  if (error) {
    console.error(error);
    toast(await loginSetupErrorMessage(error));
    return;
  }
  await put(storeName, {
    ...record,
    loginEmail: payload.email,
    loginRole: payload.role,
    authUserId: data?.userId || data?.user_id || record.authUserId || "",
    inviteStatus: "Login setup sent",
    inviteSentAt: new Date().toISOString()
  });
  await loadState();
  setView(state.activeView);
  toast("Login setup sent.");
}

async function loginSetupErrorMessage(error) {
  const fallback = error?.message || "Login setup failed.";
  try {
    if (error?.context && typeof error.context.clone === "function") {
      const response = error.context.clone();
      const details = await response.json();
      if (details?.error) return details.error;
    }
  } catch {
    // Keep the original Supabase error when the response body is not JSON.
  }
  if (fallback.includes("FunctionsFetchError")) return "Could not reach the Supabase login setup function.";
  if (fallback.includes("FunctionsRelayError") || fallback.includes("FunctionsHttpError")) return "Supabase login setup returned an error. Check the function logs.";
  return fallback;
}

async function saveProfileNote(workerId) {
  if (!isProductionRole() || !assignedWorkerIdsForVisibleEvents().has(workerId)) return;
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

async function updateRunnerStatus(workerId, status) {
  if (!(isClientRole() || isProductionRole())) return;
  const worker = getWorker(workerId);
  if (!worker || (isProductionRole() && !assignedWorkerIdsForVisibleEvents().has(workerId))) {
    toast("That runner is not assigned to this production view.");
    return;
  }
  await put("workers", { ...worker, runnerStatus: status });
  await loadState();
  setView(state.activeView);
  toast(`Runner marked ${status}.`);
}

async function addRunnerCategory(event) {
  event.preventDefault();
  if (!isCrewRole() || !state.activeWorkerId) return;
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
  $("#loginForm").addEventListener("submit", loginWithSupabase);
  $("#setupForm").addEventListener("submit", completeAccountSetup);
  $("#clearSessionButton").addEventListener("click", clearSavedLogin);
  $("#setupLogoutButton").addEventListener("click", clearSavedLogin);
  $("#logoutButton").addEventListener("click", logout);
  $(".nav-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (button) setView(button.dataset.view);
  });
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
  $("#adminProfileForm").addEventListener("submit", (event) => saveForm(event, "systemProfiles"));
  $("#clientForm").addEventListener("submit", (event) => saveForm(event, "clients"));
  $("#clientCompanyProfileForm").addEventListener("submit", (event) => saveForm(event, "clients"));
  $("#clientProfileForm").addEventListener("submit", (event) => saveForm(event, "clientReps"));
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
    const runnerStatusButton = event.target.closest("[data-runner-status]");
    const selectVisibleButton = event.target.closest("[data-select-visible]");
    const clearSelectedButton = event.target.closest("[data-clear-selected]");
    const bulkDeleteButton = event.target.closest("[data-bulk-delete]");
    const loginSetupButton = event.target.closest("[data-send-login]");
    const viewClientCompanyButton = event.target.closest("[data-view-client-company]");
    const editViewedClientButton = event.target.closest("#editViewedClientCompany");

  if (openButton) {
      clearForm(openButton.dataset.openForm);
      if (openButton.dataset.openForm === "adminProfileForm" && isAdminRole()) {
        fillForm("adminProfileForm", activeAdminProfile());
      } else if (openButton.dataset.openForm === "clientProfileForm" && isClientRole()) {
        const active = activeClientRepRecord() || clientRepDefaults();
        fillForm("clientProfileForm", active);
      } else if (openButton.dataset.openForm === "clientCompanyProfileForm" && isClientRole()) {
        const active = activeClientRecord() || {
          id: authState.roleRecord?.client_id || "",
          name: "",
          contactName: authState.user?.user_metadata?.name || "",
          email: authState.user?.email || "",
          status: "Setup Needed"
        };
        fillForm("clientCompanyProfileForm", active);
      } else if (openButton.dataset.openForm === "workerForm" && isCrewRole()) {
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
    if (viewClientCompanyButton) openClientCompanyView(viewClientCompanyButton.dataset.viewClientCompany);
    if (editViewedClientButton?.dataset.editClientId) {
      const client = state.clients.find((item) => item.id === editViewedClientButton.dataset.editClientId);
      if (client) fillForm("clientForm", client);
    }
    if (clockButton) await clockOutNow(clockButton.dataset.clockOut);
    if (punchButton) await crewPunch(punchButton.dataset.eventId, punchButton.dataset.timePunch);
    if (profileNoteButton) await saveProfileNote(profileNoteButton.dataset.saveProfileNote);
    if (runnerStatusButton) await updateRunnerStatus(runnerStatusButton.dataset.runnerStatus, runnerStatusButton.dataset.status);
    if (selectVisibleButton) setVisibleProfileSelection(selectVisibleButton.dataset.selectVisible, true);
    if (clearSelectedButton) setVisibleProfileSelection(clearSelectedButton.dataset.clearSelected, false);
    if (bulkDeleteButton) await bulkDeleteProfiles(bulkDeleteButton.dataset.bulkDelete);
    if (loginSetupButton) await sendLoginSetup(loginSetupButton.dataset.sendLogin, loginSetupButton.dataset.id);
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
  window.addEventListener("hashchange", () => {
    const requested = location.hash.replace("#", "");
    if (requested) setView(requested);
  });
}

async function init() {
  showAuthScreen("Checking session...");
  bindEvents();
  clearForm("timecardForm");
  clearForm("reportForm");
  await initializeAuth();
}

init().catch((error) => {
  console.error(error);
  showAuthScreen(error.message || "Something went wrong starting the app.");
});
