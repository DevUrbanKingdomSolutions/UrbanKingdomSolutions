const DB_NAME = "productionCrewDatabase";
const DB_VERSION = 13;
const SUPABASE_URL = "https://nnhqrhaltkmymnwxydwr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uaHFyaGFsdGtteW1ud3h5ZHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjMxNDgsImV4cCI6MjA5MzU5OTE0OH0.X9iGhE61WehM57133LKCWMfXXDHmcb2rhw-ZPCKAJos";
const LOGIN_SETUP_FUNCTION = "send-login-setup";
const SMTP_TEST_FUNCTION = "send-smtp-test";
const SAVE_SMTP_ROUTE_FUNCTION = "save-smtp-route";
const CREATE_EVENT_ACCESS_FUNCTION = "create-event-access-link";
const PUBLIC_EVENT_ACCESS_FUNCTION = "public-event-access";
const USER_ACCESS_FUNCTION = "user-access-management";
const RENTAL_PHOTO_NOTIFICATION_FUNCTION = "send-rental-photo-notification";
const NOVU_TRIGGER_FUNCTION = "trigger-novu-notification";
const SENDBIRD_APP_ID = "2B54A2B2-CB8E-43DE-A7F8-B53059C09AB3";
const SENDBIRD_MESSAGE_REFRESH_MS = 10;
const SENDBIRD_SDK_MODULE_SOURCES = [
  {
    chat: "https://esm.sh/@sendbird/chat@4.22.0",
    groupChannel: "https://esm.sh/@sendbird/chat@4.22.0/groupChannel"
  },
  {
    chat: "https://cdn.jsdelivr.net/npm/@sendbird/chat@4.22.0/+esm",
    groupChannel: "https://cdn.jsdelivr.net/npm/@sendbird/chat@4.22.0/groupChannel/+esm"
  },
  {
    chat: "https://esm.run/@sendbird/chat@4.22.0",
    groupChannel: "https://esm.run/@sendbird/chat@4.22.0/groupChannel"
  }
];
const IDLE_SIGN_OUT_MINUTES = 10;
const IDLE_SIGN_OUT_MS = IDLE_SIGN_OUT_MINUTES * 60 * 1000;
const ACTIVE_BROWSER_SESSION_KEY = "productionCrewActiveBrowserSession";
const LAST_ACTIVE_VIEW_KEY = "productionCrewLastActiveView";
const POST_SETUP_PERMISSION_PROMPT_KEY = "productionCrewPostSetupPermissionPrompt";
const PULL_REFRESH_THRESHOLD = 92;
const NOVU_WORKFLOWS = {
  rentalPhotoReminder: "rental-photo-reminder",
  rentalPhotoUrgent: "rental-photo-urgent",
  runnerStatusChanged: "runner-status-changed",
  eventAssignmentCreated: "event-assignment-created",
  productionOfficeCall: "production-office-call",
  timecardIssue: "timecard-issue",
  reportSubmitted: "report-submitted",
  vehicleDamageReported: "vehicle-damage-reported"
};
const STORES = [
  "clients",
  "clientReps",
  "accessLevelDefs",
  "eventAccessLinks",
  "workers",
  "venues",
  "promoters",
  "profileNotes",
  "events",
  "eventAssignments",
  "eventSwaps",
  "timecards",
  "runnerStops",
  "runnerCategories",
  "runnerNotes",
  "systemProfiles",
  "venueContacts",
  "productionCompanies",
  "productionContacts",
  "vehicleLogs",
  "accidentReports",
  "messageThreadSettings",
  "appNotifications"
];
const CLOUD_SYNC_STORES = new Set([
  "workers",
  "venues",
  "promoters",
  "profileNotes",
  "events",
  "eventAssignments",
  "eventSwaps",
  "timecards",
  "runnerStops",
  "runnerCategories",
  "runnerNotes",
  "venueContacts",
  "productionCompanies",
  "productionContacts",
  "vehicleLogs",
  "accidentReports",
  "messageThreadSettings"
]);

const ROLE_ALIASES = {
  admin: "ADMIN",
  owner: "CLIENT",
  client: "CLIENT",
  client_admin: "CLIENT",
  client_rep: "CLIENT",
  client_rep_lead: "CLIENT",
  client_accounting: "CLIENT",
  production: "PRODUCTION",
  production_team_access: "PRODUCTION",
  promoter: "PROMOTER",
  promoter_admin: "PROMOTER",
  promoter_rep: "PROMOTER",
  promoter_production_office: "PROMOTER",
  crew: "CREW",
  runner: "CREW",
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  CLIENT_ADMIN: "CLIENT",
  CLIENT_REP: "CLIENT",
  CLIENT_REP_LEAD: "CLIENT",
  CLIENT_ACCOUNTING: "CLIENT",
  PROMOTER: "PROMOTER",
  PROMOTER_PRODUCTION_OFFICE: "PROMOTER",
  PROMOTER_ADMIN: "PROMOTER",
  PROMOTER_REP: "PROMOTER",
  PRODUCTION: "PRODUCTION",
  PRODUCTION_TEAM_ACCESS: "PRODUCTION",
  CREW: "CREW"
};

const ACCESS_PROFILES = {
  ADMIN: {
    label: "ADMIN",
    baseRole: "ADMIN",
    views: ["adminProfile", "admin", "messages", "mobileApp"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: false,
    canImportExport: false,
    canSystemEdit: true
  },
  CLIENT_ADMIN: {
    label: "CLIENT ADMIN",
    baseRole: "CLIENT",
    views: ["dashboard", "clientCompanyProfile", "clientProfile", "workers", "promoters", "venues", "events", "productionBoard", "timecards", "vehicles", "reports", "payroll", "directory", "runner", "messages", "dataTools"],
    canAdminEdit: true,
    canOwnerEdit: true,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: true,
    canViewRates: true,
    canSystemEdit: false
  },
  CLIENT_REP: {
    label: "CLIENT REP",
    baseRole: "CLIENT",
    views: ["dashboard", "clientProfile", "promoters", "events", "productionBoard", "vehicles", "reports", "directory", "runner", "messages", "dataTools"],
    canAdminEdit: true,
    canOwnerEdit: true,
    canVenueEdit: false,
    canScopedEdit: true,
    canImportExport: true,
    canViewRates: false,
    canSystemEdit: false
  },
  CLIENT_REP_LEAD: {
    label: "CLIENT REP LEAD",
    baseRole: "CLIENT",
    views: ["dashboard", "clientProfile", "workers", "promoters", "venues", "events", "productionBoard", "vehicles", "reports", "directory", "runner", "messages", "dataTools"],
    canAdminEdit: true,
    canOwnerEdit: true,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: true,
    canViewRates: false,
    canSystemEdit: false
  },
  CLIENT_ACCOUNTING: {
    label: "CLIENT ACCOUNTING",
    baseRole: "CLIENT",
    views: ["timecards", "payroll"],
    canAdminEdit: true,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: false,
    canImportExport: false,
    canViewRates: true,
    canSystemEdit: false
  },
  PROMOTER_ADMIN: {
    label: "PROMOTER ADMIN",
    baseRole: "PROMOTER",
    views: ["productionBoard", "events", "workers", "promoters", "venues", "vehicles", "reports", "directory", "messages", "dataTools"],
    canAdminEdit: true,
    canOwnerEdit: false,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: true,
    canViewRates: false,
    canSystemEdit: false
  },
  PROMOTER_REP: {
    label: "PROMOTER REP",
    baseRole: "PROMOTER",
    views: ["productionBoard", "events", "workers", "promoters", "venues", "vehicles", "reports", "directory", "messages"],
    canAdminEdit: true,
    canOwnerEdit: false,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: false,
    canViewRates: false,
    canSystemEdit: false
  },
  PRODUCTION: {
    label: "PRODUCTION",
    baseRole: "PRODUCTION",
    views: ["productionBoard", "events", "vehicles", "reports", "directory", "messages"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: true,
    canImportExport: false,
    canViewRates: false,
    canSystemEdit: false
  },
  PRODUCTION_TEAM_ACCESS: {
    label: "PRODUCTION TEAM ACCESS",
    baseRole: "PRODUCTION",
    views: ["productionBoard", "events", "vehicles", "reports", "directory", "messages"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: true,
    canImportExport: false,
    canViewRates: false,
    canSystemEdit: false
  },
  CREW: {
    label: "CREW / RUNNER",
    baseRole: "CREW",
    views: ["workers", "clock", "productionResponse", "events", "timecards", "vehicles", "reports", "directory", "runner", "messages"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: true,
    canImportExport: false,
    canViewRates: false,
    canSystemEdit: false
  }
};
ACCESS_PROFILES.CLIENT = ACCESS_PROFILES.CLIENT_ADMIN;
ACCESS_PROFILES.PROMOTER = ACCESS_PROFILES.PROMOTER_ADMIN;
ACCESS_PROFILES.PROMOTER_PRODUCTION_OFFICE = ACCESS_PROFILES.PROMOTER_ADMIN;

let db;
let supabaseClient;
let appHasLoaded = false;
let cloudSyncPaused = false;
let authState = {
  session: null,
  user: null,
  roleRecord: null,
  pendingSetup: false
};
const pendingRentalUrgencyIds = new Set();
let sendbirdClient = null;
let sendbirdActiveChannel = null;
let sendbirdMessages = [];
let sendbirdActiveThread = null;
let sendbirdTypingUsers = [];
let sendbirdTypingPoller = null;
let sendbirdMessageRefreshPoller = null;
let sendbirdMessageRefreshInFlight = false;
let idleSignOutTimer = null;
let signOutReloading = false;
let installPromptEvent = null;
let appInstallState = window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone ? "installed" : "checking";
let pendingActivationSession = null;
let pendingActivationType = "";
let sendbirdConnectionState = {
  status: "disconnected",
  errorCode: "",
  errorMessage: ""
};
let sendbirdAutoConnectAttempted = false;
let pullRefreshState = {
  tracking: false,
  startY: 0,
  armed: false,
  refreshing: false
};
let edgeSwipeNavState = {
  tracking: false,
  startX: 0,
  startY: 0
};

const MESSAGE_THREAD_TYPES = {
  event: {
    label: "Event Thread",
    empty: "Event message threads appear here when events are visible to this access view."
  },
  office: {
    label: "Production Office",
    empty: "Production office threads appear here for events connected to this access view."
  },
  crew: {
    label: "Crew Runner",
    empty: "Crew runner threads appear here for assigned events."
  },
  adminClient: {
    label: "Admin / Client",
    empty: "Admin and client support threads appear here."
  },
  system: {
    label: "System / Admin",
    empty: "System admin notices appear here."
  },
  direct: {
    label: "Direct Message",
    empty: "Direct message contacts appear here when profiles are visible to this access view."
  }
};

let state = {
  workers: [],
  venues: [],
  promoters: [],
  profileNotes: [],
  events: [],
  eventAssignments: [],
  eventSwaps: [],
  timecards: [],
  runnerStops: [],
  runnerCategories: [],
  runnerNotes: [],
  systemProfiles: [],
  venueContacts: [],
  productionCompanies: [],
  productionContacts: [],
  vehicleLogs: [],
  accidentReports: [],
  messageThreadSettings: [],
  appNotifications: [],
  clients: [],
  clientReps: [],
  accessLevelDefs: [],
  userAccessRows: [],
  eventAccessLinks: [],
  search: "",
  activeView: "dashboard",
  accessRole: "CLIENT",
  activeWorkerId: localStorage.getItem("productionCrewActiveWorker") || "",
  activePromoterId: localStorage.getItem("productionCrewActivePromoter") || "",
  runnerCategory: "All",
  directoryTab: "crew",
  payrollView: localStorage.getItem("productionCrewPayrollView") || "worker",
  timecardEventFilter: localStorage.getItem("productionCrewTimecardEventFilter") || "all",
  timecardFilter: localStorage.getItem("productionCrewTimecardFilter") || "all",
  timecardSort: localStorage.getItem("productionCrewTimecardSort") || "latest",
  vehicleEventFilter: localStorage.getItem("productionCrewVehicleEventFilter") || "all",
  vehicleFilter: localStorage.getItem("productionCrewVehicleFilter") || "all",
  vehicleSort: localStorage.getItem("productionCrewVehicleSort") || "latest",
  reportEventFilter: localStorage.getItem("productionCrewReportEventFilter") || "all",
  reportFilter: localStorage.getItem("productionCrewReportFilter") || "all",
  reportSort: localStorage.getItem("productionCrewReportSort") || "latest",
  messagingThreadType: localStorage.getItem("productionCrewMessagingThreadType") || "event",
  messageEventFilter: localStorage.getItem("productionCrewMessageEventFilter") || "current",
  selectedMessageEventId: localStorage.getItem("productionCrewSelectedMessageEventId") || "",
  messageEventPickerOpen: false,
  messageDirectScope: localStorage.getItem("productionCrewMessageDirectScope") || "event",
  messageDirectPickerOpen: false,
  collapsedNavGroups: JSON.parse(localStorage.getItem("productionCrewCollapsedNavGroups") || "{}")
};

const NAV_GROUPS = {
  ADMIN: [
    { items: [["adminProfile", "My Profile"]] },
    { items: [["admin", "Admin Console"]] },
    { items: [["messages", "Messages"]] },
    { label: "MOBILE APP", items: [["mobileApp", "App Dashboard"]] }
  ],
  CLIENT_ADMIN: [
    { items: [["dashboard", "Dashboard"]] },
    { items: [["clientCompanyProfile", "Client Profile"], ["clientProfile", "My Profile"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["productionBoard", "Production Board"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PAYROLL", items: [["payroll", "Payroll"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["runner", "Gig Directory"], ["messages", "Messages"]] },
    { label: "TOOLS", items: [["dataTools", "Import / Export"]] }
  ],
  CLIENT_REP: [
    { items: [["dashboard", "Dashboard"]] },
    { items: [["clientProfile", "My Profile"]] },
    { label: "PROFILES", items: [["promoters", "Promoter Profiles"]] },
    { label: "EVENTS", items: [["events", "Events"], ["productionBoard", "Production Board"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["runner", "Gig Directory"], ["messages", "Messages"]] },
    { label: "TOOLS", items: [["dataTools", "Import / Export"]] }
  ],
  CLIENT_REP_LEAD: [
    { items: [["dashboard", "Dashboard"]] },
    { items: [["clientProfile", "My Profile"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["productionBoard", "Production Board"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["runner", "Gig Directory"], ["messages", "Messages"]] },
    { label: "TOOLS", items: [["dataTools", "Import / Export"]] }
  ],
  CLIENT_ACCOUNTING: [
    { label: "PAYROLL", items: [["timecards", "Timecards"], ["payroll", "Payroll"]] }
  ],
  PROMOTER_ADMIN: [
    { items: [["productionBoard", "Production Board"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["messages", "Messages"]] },
    { label: "TOOLS", items: [["dataTools", "Import / Export"]] }
  ],
  PROMOTER_REP: [
    { items: [["productionBoard", "Production Board"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "EVENTS", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["messages", "Messages"]] }
  ],
  PRODUCTION_TEAM_ACCESS: [
    { items: [["productionBoard", "Production Board"]] },
    { label: "EVENTS", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["messages", "Messages"]] }
  ],
  CREW: [
    { items: [["workers", "My Profile"], ["clock", "Time Clock"]] },
    { label: "EVENTS", items: [["productionResponse", "Crew Response"], ["events", "Events"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "DIRECTORIES", items: [["directory", "Crew Directory"], ["runner", "Gig Directory"], ["messages", "Messages"]] }
  ]
};
NAV_GROUPS.CLIENT = NAV_GROUPS.CLIENT_ADMIN;
NAV_GROUPS.PROMOTER = NAV_GROUPS.PROMOTER_ADMIN;
NAV_GROUPS.PROMOTER_PRODUCTION_OFFICE = NAV_GROUPS.PROMOTER_ADMIN;
NAV_GROUPS.PRODUCTION = NAV_GROUPS.PRODUCTION_TEAM_ACCESS;
NAV_GROUPS.PRODUCTION_TEAM_ACCESS = NAV_GROUPS.PRODUCTION;

const ROLE_HOME_VIEWS = {
  ADMIN: "adminProfile",
  CLIENT: "dashboard",
  CLIENT_ADMIN: "dashboard",
  CLIENT_REP: "dashboard",
  CLIENT_REP_LEAD: "dashboard",
  CLIENT_ACCOUNTING: "timecards",
  PROMOTER: "productionBoard",
  PROMOTER_PRODUCTION_OFFICE: "productionBoard",
  PROMOTER_ADMIN: "productionBoard",
  PROMOTER_REP: "productionBoard",
  PRODUCTION: "productionBoard",
  PRODUCTION_TEAM_ACCESS: "productionBoard",
  CREW: "workers"
};

const ACCESS_LEVEL_LABELS = {
  ADMIN: "Admin",
  CLIENT: "Client Admin",
  CLIENT_ADMIN: "Client Admin",
  CLIENT_REP: "Client Rep",
  CLIENT_REP_LEAD: "Client Rep Lead",
  CLIENT_ACCOUNTING: "Client Accounting",
  PROMOTER: "Promoter Admin",
  PROMOTER_PRODUCTION_OFFICE: "Promoter Admin",
  PROMOTER_ADMIN: "Promoter Admin",
  PROMOTER_REP: "Promoter Rep",
  PRODUCTION: "Production",
  PRODUCTION_TEAM_ACCESS: "Production Team Access",
  CREW: "Crew / Runner"
};
const ACCESS_ROLE_PRIORITY = {
  ADMIN: 100,
  CLIENT_ADMIN: 90,
  CLIENT: 90,
  CLIENT_REP_LEAD: 80,
  CLIENT_REP: 70,
  CLIENT_ACCOUNTING: 65,
  PROMOTER_ADMIN: 60,
  PROMOTER: 60,
  PROMOTER_PRODUCTION_OFFICE: 60,
  PROMOTER_REP: 50,
  PRODUCTION_TEAM_ACCESS: 40,
  PRODUCTION: 40,
  CREW: 10
};

const CLIENT_PACKAGE_DEFINITIONS = [
  {
    id: "LOCAL_PRODUCTION_SERVICES",
    name: "Local Production Services",
    status: "Active",
    description: "Crew, runners, events, venues, timecards, vehicles, reports, payroll, messaging, and local gig resources."
  },
  {
    id: "TOUR_DATA_SERVICES",
    name: "Tour Data Services",
    status: "Planned",
    description: "Tour cities, travel, HR, production documents, and city-by-city resource sharing."
  },
  {
    id: "AWARDS_SHOWS",
    name: "Awards Shows",
    status: "Planned",
    description: "Awards production teams, show departments, credentials, documents, runs, and event-day operations."
  },
  {
    id: "LIVE_TV_SPECIALS",
    name: "Live TV Specials",
    status: "Planned",
    description: "Broadcast-oriented event data, production teams, show timing, contacts, and venue operations."
  },
  {
    id: "CORPORATE_LIVE_EVENTS",
    name: "Corporate Live Events",
    status: "Planned",
    description: "Corporate event crews, venues, production offices, schedules, vendors, and client-facing operations."
  }
];

const SMTP_PROVIDER_SETTINGS = {
  google: {
    host: "smtp.gmail.com",
    port: "587",
    secure: "tls",
    passwordLabel: "Google App Password",
    passwordPlaceholder: "16-character Google app password",
    helper: "Google/Gmail: turn on 2-Step Verification, then create an App Password in your Google Account. Use the 16-character password here, not your normal Google password."
  },
  apple: {
    host: "smtp.mail.me.com",
    port: "587",
    secure: "tls",
    passwordLabel: "Apple App-Specific Password",
    passwordPlaceholder: "Apple app-specific password",
    helper: "Apple/iCloud Mail: sign in at account.apple.com, open Sign-In and Security, choose App-Specific Passwords, then generate one for this app."
  },
  microsoft: {
    host: "smtp.office365.com",
    port: "587",
    secure: "tls",
    passwordLabel: "Microsoft App Password",
    passwordPlaceholder: "Microsoft app password",
    helper: "Microsoft/Outlook: create an app password from Advanced security options after two-step verification is enabled. Some work accounts may need their admin to allow app passwords or SMTP AUTH."
  },
  other: {
    host: "",
    port: "587",
    secure: "tls",
    passwordLabel: "SMTP Password or App Key",
    passwordPlaceholder: "SMTP password, app password, or API key",
    helper: "Other SMTP: use the SMTP host, port, username, and app password/API key from your email provider. If they offer TLS/STARTTLS, keep port 587 and TLS selected."
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
let pushRegistrationListenersReady = false;

function capacitorBridge() {
  return window.Capacitor || null;
}

function mobileRuntimeInfo() {
  const capacitor = capacitorBridge();
  const platform = capacitor?.getPlatform?.() || "web";
  const native = !!capacitor?.isNativePlatform?.();
  const plugins = capacitor?.Plugins || {};
  const pushToken = localStorage.getItem("productionCrewPushToken") || "";
  return {
    native,
    platform,
    online: navigator.onLine !== false,
    pushReady: !!plugins.PushNotifications,
    pushTokenReady: !!pushToken,
    cameraReady: !!plugins.Camera,
    geolocationReady: !!plugins.Geolocation
  };
}

function mobilePermissionStorageKey() {
  return `productionCrewMobilePermissions:${authState.user?.id || authState.user?.email || "local"}`;
}

async function checkMobilePermissions() {
  const plugins = capacitorBridge()?.Plugins || {};
  const result = {
    location: "unavailable",
    push: "unavailable"
  };
  try {
    if (plugins.Geolocation?.checkPermissions) {
      const permissions = await plugins.Geolocation.checkPermissions();
      result.location = permissions.location || permissions.coarseLocation || "prompt";
    } else if (navigator.geolocation) {
      result.location = "prompt";
    }
  } catch (error) {
    result.location = "prompt";
  }
  try {
    if (plugins.PushNotifications?.checkPermissions) {
      const permissions = await plugins.PushNotifications.checkPermissions();
      result.push = permissions.receive || "prompt";
    } else if ("Notification" in window) {
      result.push = Notification.permission || "default";
    }
  } catch (error) {
    result.push = "prompt";
  }
  return result;
}

function mobilePermissionsNeedSetup(permissions) {
  return !["granted", "prompt-with-rationale"].includes(permissions.location)
    || !["granted"].includes(permissions.push);
}

function shouldCheckPhonePermissions() {
  const info = mobileRuntimeInfo();
  const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches || navigator.standalone;
  return info.native || standalone;
}

function markActiveBrowserSession() {
  sessionStorage.setItem(ACTIVE_BROWSER_SESSION_KEY, "active");
}

async function clearPersistedLoginForFreshOpen() {
  if (isPublicEventRoute() || setupTypeFromUrl()) {
    markActiveBrowserSession();
    return;
  }
  if (sessionStorage.getItem(ACTIVE_BROWSER_SESSION_KEY)) return;
  markActiveBrowserSession();
  if (!initializeSupabaseClient()) return;
  try {
    await supabaseClient.auth.signOut({ scope: "local" });
  } catch (error) {
    console.warn("Fresh-open login reset failed", error);
  }
}

function initPushRegistrationListeners() {
  const push = capacitorBridge()?.Plugins?.PushNotifications;
  if (!push?.addListener || pushRegistrationListenersReady) return;
  pushRegistrationListenersReady = true;
  push.addListener("registration", (token) => {
    const value = token?.value || "";
    if (value) localStorage.setItem("productionCrewPushToken", value);
    refreshMobileRuntimePanels();
    toast("Push device token saved for beta testing.");
  });
  push.addListener("registrationError", (error) => {
    localStorage.removeItem("productionCrewPushToken");
    refreshMobileRuntimePanels();
    toast(error?.error || "Push registration failed.");
  });
}

async function capturePunchLocation() {
  const plugin = capacitorBridge()?.Plugins?.Geolocation;
  try {
    const position = plugin?.getCurrentPosition
      ? await plugin.getCurrentPosition({ enableHighAccuracy: true, timeout: 8000 })
      : await browserCurrentPosition();
    const coords = position?.coords;
    if (!coords) return null;
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy || null,
      capturedAt: new Date().toISOString(),
      source: plugin?.getCurrentPosition ? "capacitor" : "browser"
    };
  } catch (error) {
    console.warn("Punch location not captured", error);
    return null;
  }
}

function browserCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not available."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 8000
    });
  });
}

function initMobileAppLifecycle() {
  const appPlugin = capacitorBridge()?.Plugins?.App;
  if (!appPlugin?.addListener) return;
  appPlugin.addListener("appStateChange", ({ isActive }) => {
    document.body.classList.toggle("app-paused", !isActive);
    if (isActive) refreshMobileRuntimePanels();
  });
  appPlugin.addListener("resume", () => {
    refreshMobileRuntimePanels();
    loadState().then(render).catch((error) => console.warn("Resume refresh failed", error));
  });
  appPlugin.addListener("pause", () => {
    document.body.classList.add("app-paused");
  });
  appPlugin.addListener("backButton", () => {
    if (document.body.classList.contains("modal-open")) {
      closeActiveForm();
      return;
    }
    if (document.body.classList.contains("mobile-nav-open")) {
      closeMobileNavigation();
      return;
    }
    const homeView = roleHomeView(assignedAccessForCurrentUser()[0] || state.accessRole);
    if (state.activeView && state.activeView !== homeView) {
      setView(homeView);
      return;
    }
    appPlugin.exitApp?.();
  });
}

function updatePullRefreshIndicator(distance = 0) {
  const indicator = $("#pullRefreshIndicator");
  if (!indicator) return;
  const active = distance > 16 || pullRefreshState.refreshing;
  const ready = distance >= PULL_REFRESH_THRESHOLD || pullRefreshState.refreshing;
  indicator.classList.toggle("show", active);
  indicator.classList.toggle("ready", ready);
  indicator.textContent = pullRefreshState.refreshing ? "Refreshing" : ready ? "Release to refresh" : "Pull to refresh";
}

function initPullToRefresh() {
  if (!("ontouchstart" in window)) return;
  window.addEventListener("touchstart", (event) => {
    if (pullRefreshState.refreshing || document.body.classList.contains("modal-open")) return;
    if (window.scrollY > 0) return;
    pullRefreshState = {
      tracking: true,
      startY: event.touches[0]?.clientY || 0,
      armed: false,
      refreshing: false
    };
  }, { passive: true });
  window.addEventListener("touchmove", (event) => {
    if (!pullRefreshState.tracking || pullRefreshState.refreshing) return;
    const distance = Math.max(0, (event.touches[0]?.clientY || 0) - pullRefreshState.startY);
    pullRefreshState.armed = distance >= PULL_REFRESH_THRESHOLD;
    updatePullRefreshIndicator(distance);
  }, { passive: true });
  window.addEventListener("touchend", () => {
    if (!pullRefreshState.tracking) return;
    const shouldRefresh = pullRefreshState.armed;
    pullRefreshState.tracking = false;
    if (!shouldRefresh) {
      updatePullRefreshIndicator(0);
      return;
    }
    pullRefreshState.refreshing = true;
    markActiveBrowserSession();
    updatePullRefreshIndicator(PULL_REFRESH_THRESHOLD);
    window.setTimeout(() => window.location.reload(), 120);
  }, { passive: true });
  window.addEventListener("touchcancel", () => {
    pullRefreshState = { tracking: false, startY: 0, armed: false, refreshing: false };
    updatePullRefreshIndicator(0);
  }, { passive: true });
}

function initEdgeSwipeNavigation() {
  if (!("ontouchstart" in window)) return;
  window.addEventListener("touchstart", (event) => {
    if (document.body.classList.contains("modal-open") || document.body.classList.contains("mobile-nav-open")) return;
    const touch = event.touches[0];
    if (!touch || touch.clientX > 28) return;
    edgeSwipeNavState = {
      tracking: true,
      startX: touch.clientX,
      startY: touch.clientY
    };
  }, { passive: true });
  window.addEventListener("touchmove", (event) => {
    if (!edgeSwipeNavState.tracking) return;
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - edgeSwipeNavState.startX;
    const deltaY = Math.abs(touch.clientY - edgeSwipeNavState.startY);
    if (deltaX < -12 || deltaY > 64) edgeSwipeNavState.tracking = false;
  }, { passive: true });
  window.addEventListener("touchend", (event) => {
    if (!edgeSwipeNavState.tracking) return;
    const touch = event.changedTouches[0];
    const deltaX = (touch?.clientX || 0) - edgeSwipeNavState.startX;
    const deltaY = Math.abs((touch?.clientY || 0) - edgeSwipeNavState.startY);
    edgeSwipeNavState.tracking = false;
    if (deltaX >= 72 && deltaX > deltaY * 1.4) {
      document.body.classList.add("mobile-nav-open");
      $("#mobileMenuButton")?.setAttribute("aria-expanded", "true");
    }
  }, { passive: true });
  window.addEventListener("touchcancel", () => {
    edgeSwipeNavState = { tracking: false, startX: 0, startY: 0 };
  }, { passive: true });
}

function refreshMobileRuntimePanels() {
  renderConnectionBanner();
  renderMobileDeviceStatus();
  renderMobileQaPanel();
  renderMobileLaunchPanel();
  renderMobileInstallPanel();
}

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
    const savedRecord = {
      ...record,
      id: record.id || crypto.randomUUID(),
      updatedAt: now,
      createdAt: record.createdAt || now
    };
    const request = store.put(savedRecord);
    request.onsuccess = () => {
      syncRecordToSupabase(storeName, savedRecord).catch((error) => console.warn("Cloud record sync failed", error));
      resolve(request.result);
    };
    request.onerror = () => reject(request.error);
  });
}

async function remove(storeName, id) {
  const store = await storeTransaction(storeName, "readwrite");
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => {
      deleteCloudRecord(storeName, id).catch((error) => console.warn("Cloud record delete failed", error));
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

function cloudClientId() {
  return authState.roleRecord?.client_id || activeClientRecord()?.id || "";
}

function canSyncCloudRecords(storeName) {
  return !cloudSyncPaused
    && CLOUD_SYNC_STORES.has(storeName)
    && !!supabaseClient
    && !!authState.session
    && !!authState.roleRecord
    && !isAdminRole()
    && !!cloudClientId();
}

async function syncRecordToSupabase(storeName, record) {
  if (!canSyncCloudRecords(storeName) || !record?.id) return;
  const { error } = await supabaseClient
    .from("app_records")
    .upsert({
      client_id: cloudClientId(),
      store_name: storeName,
      record_id: String(record.id),
      data: record,
      updated_by: authState.user?.id || null
    }, { onConflict: "client_id,store_name,record_id" });
  if (error) throw error;
}

async function deleteCloudRecord(storeName, id) {
  if (!canSyncCloudRecords(storeName) || !id) return;
  const { error } = await supabaseClient
    .from("app_records")
    .delete()
    .eq("client_id", cloudClientId())
    .eq("store_name", storeName)
    .eq("record_id", String(id));
  if (error) throw error;
}

async function hydrateAppRecordsFromSupabase() {
  if (!supabaseClient || !authState.session || !authState.roleRecord || isAdminRole() || !cloudClientId()) return;
  const { data, error } = await supabaseClient
    .from("app_records")
    .select("store_name, data, updated_at")
    .eq("client_id", cloudClientId());
  if (error) {
    console.warn("Could not load shared app records.", error);
    return;
  }
  cloudSyncPaused = true;
  try {
    for (const row of data || []) {
      if (!CLOUD_SYNC_STORES.has(row.store_name) || !row.data?.id) continue;
      await put(row.store_name, row.data);
    }
  } finally {
    cloudSyncPaused = false;
  }
}

async function syncLocalRecordsToSupabase() {
  if (!supabaseClient || !authState.session || !authState.roleRecord || isAdminRole() || !cloudClientId()) return;
  const records = [];
  for (const storeName of CLOUD_SYNC_STORES) {
    for (const record of state[storeName] || []) records.push([storeName, record]);
  }
  for (const [storeName, record] of records) {
    try {
      await syncRecordToSupabase(storeName, record);
    } catch (error) {
      console.warn("Could not publish local record to Supabase.", error);
      break;
    }
  }
}

async function cloudRecordCount() {
  if (!supabaseClient || !authState.session || !authState.roleRecord || isAdminRole() || !cloudClientId()) return 0;
  const { count, error } = await supabaseClient
    .from("app_records")
    .select("id", { count: "exact", head: true })
    .eq("client_id", cloudClientId());
  if (error) throw error;
  return count || 0;
}

async function loadState() {
  const [clients, clientReps, accessLevelDefs, eventAccessLinks, workers, venues, promoters, profileNotes, events, eventAssignments, eventSwaps, timecards, runnerStops, runnerCategories, runnerNotes, systemProfiles, venueContacts, productionCompanies, productionContacts, vehicleLogs, accidentReports, messageThreadSettings, appNotifications] = await Promise.all(STORES.map(getAll));
  state = {
    ...state,
    clients: sortByName(clients),
    clientReps: sortByName(clientReps),
    accessLevelDefs: sortByName(accessLevelDefs),
    eventAccessLinks: eventAccessLinks.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    workers: sortByName(workers),
    venues: sortByName(venues),
    promoters: sortByName(promoters),
    profileNotes,
    events: events.sort((a, b) => new Date(b.startDate || b.createdAt || 0) - new Date(a.startDate || a.createdAt || 0)),
    eventAssignments: eventAssignments.sort((a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0)),
    eventSwaps: eventSwaps.sort((a, b) => new Date(b.swapDate || b.createdAt || 0) - new Date(a.swapDate || a.createdAt || 0)),
    timecards: timecards.sort((a, b) => new Date(b.clockIn || b.createdAt || 0) - new Date(a.clockIn || a.createdAt || 0)),
    runnerStops: sortByName(runnerStops),
    runnerCategories: sortByName(runnerCategories),
    runnerNotes: runnerNotes.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    systemProfiles: sortByName(systemProfiles),
    venueContacts: sortByName(venueContacts),
    productionCompanies: sortByName(productionCompanies),
    productionContacts: sortByName(productionContacts),
    vehicleLogs: vehicleLogs.sort((a, b) => new Date(b.scheduledDate || b.createdAt || 0) - new Date(a.scheduledDate || a.createdAt || 0)),
    accidentReports: accidentReports.sort((a, b) => new Date(b.reportedAt || b.createdAt || 0) - new Date(a.reportedAt || a.createdAt || 0)),
    messageThreadSettings,
    appNotifications: appNotifications.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
  };
  if (!state.activeWorkerId && state.workers[0]) state.activeWorkerId = state.workers[0].id;
  if (!state.activePromoterId && state.promoters[0]) state.activePromoterId = state.promoters[0].id;
  render();
}

function sortByName(records) {
  return records.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

function clientPackageDefinitions() {
  return CLIENT_PACKAGE_DEFINITIONS;
}

function normalizeClientPackages(value) {
  const values = Array.isArray(value) ? value : String(value || "").split(",");
  const allowed = new Set(clientPackageDefinitions().map((pkg) => pkg.id));
  const packages = values.map((item) => String(item || "").trim()).filter((item) => allowed.has(item));
  return packages.length ? Array.from(new Set(packages)) : ["LOCAL_PRODUCTION_SERVICES"];
}

function clientPackageLabels(value) {
  const selected = normalizeClientPackages(value);
  return selected.map((id) => clientPackageDefinitions().find((pkg) => pkg.id === id)?.name || id);
}

function clientPackageBadges(value) {
  return clientPackageLabels(value).map((label) => `<span class="status-pill">${escapeHtml(label)}</span>`).join(" ");
}

function renderClientPackageControls(form) {
  const group = form?.querySelector("[data-package-options]");
  if (!group) return;
  group.innerHTML = clientPackageDefinitions().map((pkg) => {
    const status = pkg.status === "Active" ? "" : ` <em class="muted">(${escapeHtml(pkg.status)})</em>`;
    const disabled = pkg.status === "Active" ? "" : " disabled";
    const stateClass = pkg.status === "Active" ? "is-active" : "is-muted";
    return `<label class="checkbox-option package-option ${stateClass}"><input type="checkbox" value="${escapeHtml(pkg.id)}"${disabled}><span><strong>${escapeHtml(pkg.name)}</strong>${status}<small>${escapeHtml(pkg.description)}</small></span></label>`;
  }).join("");
}

async function formRecord(form) {
  const record = {};
  form.querySelectorAll("[data-checkbox-group]").forEach((group) => {
    const name = group.dataset.name;
    if (!name || group.closest("[hidden]")) return;
    if (name === "accessLevels" && !accessPickerAllowed(form)) return;
    record[name] = Array.from(group.querySelectorAll("input[type='checkbox']:checked")).map((input) => input.value);
  });
  for (const element of Array.from(form.elements)) {
    if (!element.name || element.type === "file") continue;
    if (element.closest("[hidden]")) continue;
    if (element.closest("[data-checkbox-group]")) continue;
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
  if (!form.querySelector("[data-package-options] input")) renderClientPackageControls(form);
  renderAccessLevelControls(form);
  renderViewOptionControls(form);
  Object.entries(record).forEach(([key, value]) => {
    const checkboxGroup = form.querySelector(`[data-checkbox-group][data-name="${key}"]`);
    if (checkboxGroup) {
      const selectedValues = key === "accessLevels"
        ? normalizeAccessLevels(value, "")
        : Array.isArray(value) ? value : String(value || "").split(",").filter(Boolean);
      checkboxGroup.querySelectorAll("input[type='checkbox']").forEach((input) => {
        input.checked = selectedValues.includes(input.value);
      });
      return;
    }
    if (!form.elements[key] || form.elements[key].type === "file") return;
    if (key === "smtpProvider") value = normalizeSmtpProvider(value);
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
  renderAccessLevelControls(form);
  renderViewOptionControls(form);
  if (formId === "eventForm") renderEventAssignmentManager(form, record.id || "");
  if (formId === "venueForm") renderVenueContactEditor(record.id || "");
  if (Array.isArray(record.views)) {
    const viewGroup = form.querySelector(`[data-checkbox-group][data-name="views"]`);
    viewGroup?.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.checked = record.views.includes(input.value);
    });
  }
  openForm(formId);
  updateSmtpForm(form);
  if (formId === "vehicleForm") applyVehicleAssignmentLock(form);
  if (formId === "reportForm") updateReportTypeFields(form);
  if (formId === "reportForm") delete form.dataset.vehicleDamageConfirmed;
  if (formId === "eventAssignmentForm") updateAssignmentVehicleFields(form);
}

function clearForm(formId) {
  const form = document.getElementById(formId);
  if (!form?.reset) return;
  form.reset();
  if (!form.querySelector("[data-package-options] input")) renderClientPackageControls(form);
  renderAccessLevelControls(form);
  renderViewOptionControls(form);
  if (form.elements.id) form.elements.id.value = "";
  if (formId === "clientForm") {
    const packageGroup = form.querySelector(`[data-checkbox-group][data-name="packageLayouts"]`);
    const defaultPackage = packageGroup?.querySelector(`input[value="LOCAL_PRODUCTION_SERVICES"]`);
    if (defaultPackage) defaultPackage.checked = true;
  }
  if (formId === "timecardForm") {
    form.elements.breakMinutes.value = "0";
    form.elements.clockIn.value = toLocalInputValue(new Date());
  }
  if (formId === "eventForm") renderEventAssignmentManager(form, "");
  if (formId === "venueForm") renderVenueContactEditor("");
  if (formId === "eventAssignmentForm") {
    form.elements.status.value = "Confirmed";
    form.elements.vehicleUse.value = "No Vehicle";
    updateAssignmentVehicleFields(form);
  }
  if (formId === "reportForm") form.elements.reportedAt.value = toLocalInputValue(new Date());
  if ((formId === "vehicleForm" || formId === "reportForm") && state.activeWorkerId) {
    form.elements.workerId.value = state.activeWorkerId;
  }
  if (formId === "reportForm") updateReportTypeFields(form);
  if (formId === "vehicleForm") applyVehicleAssignmentLock(form);
  updateSmtpForm(form);
}

function openForm(formId) {
  const form = document.getElementById(formId);
  if (!form || form.hidden) {
    toast("This access view cannot open that form.");
    return;
  }
  renderClientPackageControls(form);
  if (formId === "clientForm" && !form.elements.id?.value) {
    const defaultPackage = form.querySelector(`[data-checkbox-group][data-name="packageLayouts"] input[value="LOCAL_PRODUCTION_SERVICES"]`);
    if (defaultPackage) defaultPackage.checked = true;
  }
  applyAccessProfile();
  $$(".form-panel.modal-form").forEach((item) => item.classList.remove("modal-form"));
  $("#modalHost")?.appendChild(form);
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

function normalizeSmtpProvider(value) {
  const provider = String(value || "").toLowerCase();
  if (provider.includes("gmail") || provider.includes("google")) return "google";
  if (provider.includes("icloud") || provider.includes("apple")) return "apple";
  if (provider.includes("outlook") || provider.includes("office") || provider.includes("microsoft")) return "microsoft";
  if (provider) return provider;
  return "";
}

function updateSmtpForm(form, applyDefaults = false) {
  if (!form?.elements?.smtpProvider) return;
  const provider = normalizeSmtpProvider(form.elements.smtpProvider.value);
  const settings = SMTP_PROVIDER_SETTINGS[provider];
  if (form.elements.smtpProvider.value !== provider) form.elements.smtpProvider.value = provider;

  form.querySelectorAll(".smtp-detail-field").forEach((field) => {
    field.classList.toggle("is-hidden", !settings);
  });

  const helper = form.querySelector("[data-smtp-helper]");
  if (helper) helper.textContent = settings?.helper || "Choose an email service to see the setup fields.";

  const passwordLabel = form.querySelector("[data-smtp-password-label]");
  if (passwordLabel) passwordLabel.textContent = settings?.passwordLabel || "App Password";

  if (form.elements.smtpAppPassword) {
    form.elements.smtpAppPassword.placeholder = settings?.passwordPlaceholder || "App password";
  }

  if (!settings || !applyDefaults) return;
  if (form.elements.smtpHost) form.elements.smtpHost.value = settings.host;
  if (form.elements.smtpPort) form.elements.smtpPort.value = settings.port;
  if (form.elements.smtpSecure) form.elements.smtpSecure.value = settings.secure;
  if (form.elements.smtpUsername && form.elements.smtpFromEmail?.value) {
    form.elements.smtpUsername.value = form.elements.smtpUsername.value || form.elements.smtpFromEmail.value;
  }
}

function smtpProviderLabel(value) {
  const provider = normalizeSmtpProvider(value);
  if (provider === "google") return "Google / Gmail";
  if (provider === "apple") return "Apple / iCloud Mail";
  if (provider === "microsoft") return "Microsoft / Outlook";
  if (provider === "other") return "Other SMTP";
  return value || "Not selected";
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
  setLoadingOverlay(message || "Loading", isLoadingMessage(message));
  $("#authScreen").hidden = false;
  $("#activateScreen").hidden = true;
  $("#setupScreen").hidden = true;
  $("#publicEventScreen").hidden = true;
  $("#appShell").hidden = true;
  $("#sessionEmail").textContent = "Not signed in";
  $("#sessionRole").textContent = "ROLE";
  $("#authMessage").textContent = message;
}

function showActivateScreen(message = "") {
  setLoadingOverlay("", false);
  $("#authScreen").hidden = true;
  $("#activateScreen").hidden = false;
  $("#setupScreen").hidden = true;
  $("#publicEventScreen").hidden = true;
  $("#appShell").hidden = true;
  $("#activateMessage").textContent = message;
  const email = pendingActivationSession?.user?.email || "";
  if (email) $("#activateForm").elements.email.value = email;
}

function showSetupScreen(session, message = "Set your password to finish setup.") {
  setLoadingOverlay("", false);
  $("#authScreen").hidden = true;
  $("#activateScreen").hidden = true;
  $("#setupScreen").hidden = false;
  $("#publicEventScreen").hidden = true;
  $("#appShell").hidden = true;
  $("#setupMessage").textContent = message;
  const form = $("#setupForm");
  form.elements.name.value = session?.user?.user_metadata?.name || "";
  form.elements.phone.value = session?.user?.user_metadata?.phone || "";
  form.elements.password.value = "";
  form.elements.confirmPassword.value = "";
}

function showPublicEventScreen(message = "Loading event access...") {
  setLoadingOverlay(message, isLoadingMessage(message));
  $("#authScreen").hidden = true;
  $("#activateScreen").hidden = true;
  $("#setupScreen").hidden = true;
  $("#publicEventScreen").hidden = false;
  $("#appShell").hidden = true;
  $("#publicEventContent").innerHTML = `<p class="auth-message">${escapeHtml(message)}</p>`;
}

function showAppShell(options = {}) {
  if (!options.keepLoading) setLoadingOverlay("", false);
  $("#authScreen").hidden = true;
  $("#activateScreen").hidden = true;
  $("#setupScreen").hidden = true;
  $("#publicEventScreen").hidden = true;
  $("#appShell").hidden = false;
}

function setAuthMessage(message) {
  setLoadingOverlay(message, isLoadingMessage(message));
  $("#authMessage").textContent = message;
}

function isLoadingMessage(message = "") {
  return /checking|loading|logging|signing|syncing|restoring|starting/i.test(String(message || ""));
}

function setLoadingOverlay(message = "Loading", visible = true) {
  const overlay = $("#appLoadingOverlay");
  if (!overlay) return;
  overlay.hidden = !visible;
  const label = $("#appLoadingText");
  if (label) label.textContent = message || "Loading";
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

function publicEventTokenFromUrl() {
  const hash = location.hash.replace(/^#/, "");
  if (!hash.startsWith("public-event")) return "";
  const query = hash.includes("?") ? hash.slice(hash.indexOf("?") + 1) : "";
  return new URLSearchParams(query).get("token") || "";
}

function isPublicEventRoute() {
  return Boolean(publicEventTokenFromUrl());
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
  const fallback = storeName === "clients" ? "CLIENT" : storeName === "promoters" ? "PROMOTER" : "CREW";
  const access = record.loginRole || normalizeAccessLevels(record.accessLevels, fallback)[0] || fallback;
  return baseRoleForAccess(access);
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

function nullableNumber(value) {
  return value === "" || value === undefined || value === null ? null : Number(value);
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
    package_layouts: normalizeClientPackages(record.packageLayouts),
    default_day_rate: nullableNumber(record.defaultDayRate),
    default_included_hours: nullableNumber(record.defaultIncludedHours),
    default_additional_rate: nullableNumber(record.defaultAdditionalRate),
    default_rented_vehicle_rate: nullableNumber(record.defaultRentedVehicleRate),
    default_personal_vehicle_rate: nullableNumber(record.defaultPersonalVehicleRate),
    notes: record.notes || "",
    updated_at: new Date().toISOString()
  });
  if (error) throw error;
  return "Supabase client account connected.";
}

async function syncSupabaseClientRep(record) {
  const canSyncRep = canSystemEdit() || (isClientRole() && record.clientId === authState.roleRecord?.client_id);
  if (!canSyncRep || !record.clientId) return "";
  const { error } = await supabaseClient.from("client_reps").upsert({
    id: record.id,
    client_id: record.clientId,
    auth_user_id: record.authUserId || authState.user?.id || null,
    name: record.name,
    title: record.title || "",
    email: record.email || "",
    phone: record.phone || "",
    mailing_address: record.mailingAddress || "",
    access_levels: ensureClientRepAccessLevels(record.accessLevels),
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

function mapSupabaseClient(record) {
  return {
    id: record.id,
    name: record.name || "",
    contactName: record.contact_name || "",
    email: record.email || "",
    phone: record.phone || "",
    status: record.status || "Active",
    packageLayouts: normalizeClientPackages(record.package_layouts || record.packageLayouts),
    defaultDayRate: record.default_day_rate || "",
    defaultIncludedHours: record.default_included_hours || "",
    defaultAdditionalRate: record.default_additional_rate || "",
    defaultRentedVehicleRate: record.default_rented_vehicle_rate || "",
    defaultPersonalVehicleRate: record.default_personal_vehicle_rate || "",
    notes: record.notes || "",
    createdAt: record.created_at || record.createdAt,
    updatedAt: record.updated_at || record.updatedAt
  };
}

function mapSupabaseClientRep(record) {
  return {
    id: record.id,
    clientId: record.client_id || "",
    authUserId: record.auth_user_id || "",
    name: record.name || "",
    title: record.title || "",
    email: record.email || "",
    phone: record.phone || "",
    mailingAddress: record.mailing_address || "",
    accessLevels: ensureClientRepAccessLevels(record.access_levels),
    smtpProvider: record.smtp_provider || "",
    smtpFromName: record.smtp_from_name || "",
    smtpFromEmail: record.smtp_from_email || "",
    smtpReplyTo: record.smtp_reply_to || "",
    smtpHost: record.smtp_host || "",
    smtpPort: record.smtp_port || "",
    smtpUsername: record.smtp_username || "",
    smtpSecretRef: record.smtp_secret_ref || "",
    smtpSecure: record.smtp_secure || "",
    emailRoutingStatus: record.email_routing_status || "Not configured",
    createdAt: record.created_at || record.createdAt,
    updatedAt: record.updated_at || record.updatedAt
  };
}

function mapSupabaseAccessLevel(record) {
  return {
    id: record.id || "",
    name: record.name || "",
    baseRole: normalizeRole(record.base_role || "CREW"),
    views: Array.isArray(record.views) ? record.views : [],
    description: record.description || "",
    status: record.status || "Active",
    createdAt: record.created_at || record.createdAt,
    updatedAt: record.updated_at || record.updatedAt
  };
}

async function hydrateAccessLevelsFromSupabase() {
  if (!supabaseClient || !(isAdminRole() || isClientRole() || isProductionRole())) return;
  try {
    const { data, error } = await supabaseClient
      .from("access_levels")
      .select("id,name,base_role,views,description,status,created_at,updated_at")
      .order("name");
    if (error) throw error;
    for (const level of data || []) {
      await put("accessLevelDefs", mapSupabaseAccessLevel(level));
    }
  } catch (error) {
    console.warn("Could not hydrate access levels.", error);
  }
}

async function syncSupabaseAccessLevel(record) {
  if (!canSystemEdit()) return "";
  const { error } = await supabaseClient.from("access_levels").upsert({
    id: record.id,
    name: record.name,
    base_role: normalizeRole(record.baseRole || "CREW"),
    views: record.views || [],
    description: record.description || "",
    status: record.status || "Active",
    updated_at: new Date().toISOString()
  });
  if (error) throw error;
  return "Access level saved to Supabase.";
}

async function hydrateClientSetupData(roleRecord, user) {
  if (!supabaseClient || roleRecord.role !== "CLIENT" || !roleRecord.client_id) return { client: null, repCount: 0 };
  try {
    const { data: client, error: clientError } = await supabaseClient
      .from("clients")
      .select("id,name,contact_name,email,phone,status,package_layouts,default_day_rate,default_included_hours,default_additional_rate,default_rented_vehicle_rate,default_personal_vehicle_rate,notes,created_at,updated_at")
      .eq("id", roleRecord.client_id)
      .maybeSingle();
    if (clientError) throw clientError;
    if (client) await put("clients", mapSupabaseClient(client));

    const { data: reps, error: repsError } = await supabaseClient
      .from("client_reps")
      .select("id,client_id,auth_user_id,name,title,email,phone,mailing_address,access_levels,smtp_provider,smtp_from_name,smtp_from_email,smtp_reply_to,smtp_host,smtp_port,smtp_username,smtp_secret_ref,smtp_secure,email_routing_status,created_at,updated_at")
      .eq("client_id", roleRecord.client_id);
    if (repsError) throw repsError;
    const matchingReps = (reps || []).filter((rep) => rep.auth_user_id === user.id || rep.email === user.email);
    for (const rep of matchingReps) await put("clientReps", mapSupabaseClientRep(rep));
    return { client, repCount: (reps || []).length };
  } catch (error) {
    console.warn("Could not hydrate client setup data.", error);
    return { client: null, repCount: 0 };
  }
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
  const route = smtpRouteForInvite(storeName);
  return {
    profileType,
    profileId: record.id,
    authUserId: record.authUserId || "",
    email,
    role: profileLoginRole(storeName, record),
    clientId: storeName === "clients" ? record.id : authState.roleRecord?.client_id || null,
    workerId: storeName === "workers" ? record.id : null,
    promoterId: storeName === "promoters" ? record.id : null,
    emailRoute: route
  };
}

function smtpRouteForInvite(storeName) {
  const profile = storeName === "clients"
    ? activeAdminProfile()
    : isProductionRole()
      ? activePromoterRecord()
      : activeClientRepRecord();
  if (!profile) return null;
  return {
    fromName: profile.smtpFromName || profile.name || "Production Crew",
    fromEmail: profile.smtpFromEmail || "",
    replyTo: profile.smtpReplyTo || profile.email || authState.user?.email || "",
    host: profile.smtpHost || "",
    port: profile.smtpPort || "",
    username: profile.smtpUsername || "",
    secretRef: profile.smtpSecretRef || "",
    secure: profile.smtpSecure || ""
  };
}

function smtpRouteForEventAccess() {
  const profile = isProductionRole() ? activePromoterRecord() : activeClientRepRecord();
  if (!profile) return null;
  return {
    fromName: profile.smtpFromName || profile.name || "Production Office",
    fromEmail: profile.smtpFromEmail || "",
    replyTo: profile.smtpReplyTo || profile.email || authState.user?.email || "",
    host: profile.smtpHost || "",
    port: profile.smtpPort || "",
    username: profile.smtpUsername || "",
    secretRef: profile.smtpSecretRef || "",
    secure: profile.smtpSecure || ""
  };
}

function smtpRouteForRentalNotifications() {
  const clientId = authState.roleRecord?.client_id || activeClientRecord()?.id || "";
  const profile = activeClientRepRecord()
    || state.clientReps.find((rep) => rep.clientId === clientId && smtpRouteIsReady(rep))
    || state.clientReps.find((rep) => smtpRouteIsReady(rep));
  if (!profile) return null;
  return {
    fromName: profile.smtpFromName || profile.name || "Production Office",
    fromEmail: profile.smtpFromEmail || "",
    replyTo: profile.smtpReplyTo || profile.email || authState.user?.email || "",
    host: profile.smtpHost || "",
    port: profile.smtpPort || "",
    username: profile.smtpUsername || "",
    secretRef: profile.smtpSecretRef || "",
    secure: profile.smtpSecure || ""
  };
}

function smtpRoutePayload(storeName, record, password = "") {
  const scope = storeName === "systemProfiles" ? "admin" : storeName === "promoters" ? "promoter" : "client_rep";
  return {
    scope,
    profileId: record.id || "",
    clientId: record.clientId || authState.roleRecord?.client_id || null,
    routeId: record.smtpSecretRef || "",
    password,
    provider: record.smtpProvider || "",
    fromName: record.smtpFromName || record.name || "Production Crew",
    fromEmail: record.smtpFromEmail || "",
    replyTo: record.smtpReplyTo || record.email || authState.user?.email || "",
    host: record.smtpHost || "",
    port: record.smtpPort || "",
    username: record.smtpUsername || "",
    secure: record.smtpSecure || ""
  };
}

async function saveSupabaseSmtpRoute(storeName, record, password) {
  if (!["systemProfiles", "clientReps", "promoters"].includes(storeName)) return "";
  if (storeName === "systemProfiles" && !canSystemEdit()) return "";
  if (storeName === "clientReps" && !isClientRole()) return "";
  if (storeName === "promoters" && !(isClientRole() || (isProductionRole() && record.id === state.activePromoterId))) return "";
  const payload = smtpRoutePayload(storeName, record, password);
  if (!payload.password && !payload.routeId) return "";
  if (!payload.fromEmail || !payload.host || !payload.port || !payload.username) {
    return "Profile saved. Finish SMTP fields before saving the app password.";
  }
  const { data, error } = await supabaseClient.functions.invoke(SAVE_SMTP_ROUTE_FUNCTION, { body: payload });
  if (error) throw error;
  record.smtpSecretRef = data?.routeId || record.smtpSecretRef || "";
  record.emailRoutingStatus = "Active";
  await put(storeName, record);
  return "SMTP route saved securely.";
}

async function refreshUserAccessList(showMessage = true) {
  if (!initializeSupabaseClient() || !(isAdminRole() || isClientRole() || isProductionRole())) return;
  const { data, error } = await supabaseClient.functions.invoke(USER_ACCESS_FUNCTION, {
    body: { action: "list" }
  });
  if (error) {
    console.error(error);
    if (showMessage) toast(await loginSetupErrorMessage(error));
    return;
  }
  state.userAccessRows = data?.users || [];
  renderUserAccessTables();
  if (showMessage) toast("User accounts refreshed.");
}

async function deleteUserAccount(userId) {
  if (!isAdminRole() || !userId) return;
  const confirmed = confirm("Delete this login account? This removes their Supabase login and app role, but does not delete the client company profile.");
  if (!confirmed) return;
  const { error } = await supabaseClient.functions.invoke(USER_ACCESS_FUNCTION, {
    body: { action: "delete", userId }
  });
  if (error) {
    console.error(error);
    toast(await loginSetupErrorMessage(error));
    return;
  }
  await refreshUserAccessList(false);
  toast("User account deleted.");
}

function profileForUserAccessRow(row) {
  const email = normalizedMatchValue(row.email || "");
  if (normalizeRole(row.role) === "CLIENT" && row.profileId) {
    const profile = state.clientReps.find((item) => item.id === row.profileId)
      || state.clientReps.find((item) => item.authUserId === row.userId)
      || {
        id: row.profileId,
        authUserId: row.userId,
        clientId: row.clientId || "",
        name: row.profileName || "",
        email: row.email || "",
        accessLevels: row.accessLevels || []
      };
    return { store: "clientReps", profile, accessFallback: "CLIENT_REP" };
  }
  const clientRep = state.clientReps.find((item) => item.authUserId === row.userId)
    || state.clientReps.find((item) => row.clientId && item.clientId === row.clientId && normalizedMatchValue(item.email) === email);
  if (clientRep) return { store: "clientReps", profile: clientRep, accessFallback: "CLIENT_REP" };
  const promoter = state.promoters.find((item) => item.authUserId === row.userId)
    || state.promoters.find((item) => item.id === row.promoterId)
    || state.promoters.find((item) => normalizedMatchValue(item.email) === email);
  if (promoter) return { store: "promoters", profile: promoter, accessFallback: "PROMOTER_ADMIN" };
  const worker = state.workers.find((item) => item.authUserId === row.userId)
    || state.workers.find((item) => item.id === row.workerId)
    || state.workers.find((item) => normalizedMatchValue(item.email) === email);
  if (worker) return { store: "workers", profile: worker, accessFallback: "CREW" };
  return { store: "", profile: null, accessFallback: normalizeRole(row.role) };
}

function accessLevelsForUserAccessRow(row) {
  const matched = profileForUserAccessRow(row);
  const levels = normalizeAccessLevels(row.accessLevels || matched.profile?.accessLevels, matched.accessFallback);
  return matched.store === "clientReps" ? ensureClientRepAccessLevels(levels) : levels;
}

function supabaseRoleFromAccessLevels(levels, fallback = "CLIENT") {
  const baseRoles = normalizeAccessLevels(levels, fallback).map(baseRoleForAccess);
  if (baseRoles.includes("CLIENT")) return "CLIENT";
  if (baseRoles.includes("PROMOTER")) return "PROMOTER";
  if (baseRoles.includes("PRODUCTION")) return "PRODUCTION";
  if (baseRoles.includes("CREW")) return "CREW";
  return normalizeRole(fallback);
}

async function openAccountAccessForm(userId) {
  if (!isAdminRole() || !userId) return;
  await refreshSiteAccessLevelsForForm("accountAccessForm");
  const row = state.userAccessRows.find((item) => item.userId === userId);
  if (!row) {
    toast("Refresh user accounts first.");
    return;
  }
  const matched = profileForUserAccessRow(row);
  const accessLevels = accessLevelsForUserAccessRow(row);
  fillForm("accountAccessForm", {
    userId: row.userId,
    email: row.email || "",
    role: supabaseRoleFromAccessLevels(accessLevels, row.role),
    clientId: row.clientId || matched.profile?.clientId || authState.roleRecord?.client_id || "",
    workerId: row.workerId || (matched.store === "workers" ? matched.profile?.id : "") || "",
    promoterId: row.promoterId || (matched.store === "promoters" ? matched.profile?.id : "") || "",
    profileStore: matched.store,
    profileId: matched.profile?.id || "",
    accessLevels
  });
}

async function saveAccountAccess(event) {
  event.preventDefault();
  if (!isAdminRole()) return;
  if (!initializeSupabaseClient()) {
    toast("Supabase login is not configured.");
    return;
  }
  const form = event.currentTarget;
  const record = await formRecord(form);
  let accessLevels = normalizeAccessLevels(record.accessLevels, "");
  if (!accessLevels.length) {
    toast("Select at least one site access level.");
    return;
  }
  const role = supabaseRoleFromAccessLevels(accessLevels, record.role);
  const matched = record.profileStore && record.profileId
    ? { store: record.profileStore, profile: state[record.profileStore]?.find((item) => item.id === record.profileId) }
    : profileForUserAccessRow({ ...record, role });
  if (role === "CLIENT" || matched.store === "clientReps") accessLevels = ensureClientRepAccessLevels(accessLevels);
  if (matched.profile && matched.store) {
    await put(matched.store, { ...matched.profile, accessLevels, loginRole: role });
  }
  const { error } = await supabaseClient.functions.invoke(USER_ACCESS_FUNCTION, {
    body: {
      action: "update",
      userId: record.userId,
      role,
      clientId: record.clientId || authState.roleRecord?.client_id || null,
      workerId: role === "CREW" ? record.workerId || null : null,
      promoterId: role === "PROMOTER" ? record.promoterId || null : null,
      accessLevels,
      profileStore: matched.store || "",
      profileId: matched.profile?.id || ""
    }
  });
  if (error) {
    console.error(error);
    toast(await loginSetupErrorMessage(error));
    return;
  }
  closeForm("accountAccessForm");
  await loadState();
  await refreshUserAccessList(false);
  setView(state.activeView);
  toast("Account access updated.");
}

async function openProfileAccessForm(storeName) {
  if (!["workers", "promoters", "clientReps"].includes(storeName)) return;
  if (!(isClientRole() || isProductionRole() || isAdminRole())) {
    toast("This access view cannot manage profile access.");
    return;
  }
  await refreshSiteAccessLevelsForForm("profileAccessForm");
  const sourceForm = storeName === "workers" ? $("#workerForm") : storeName === "promoters" ? $("#promoterForm") : $("#clientProfileForm");
  const targetId = sourceForm?.elements?.id?.value || "";
  if (!targetId) {
    toast("Save the profile first, then manage access.");
    return;
  }
  const profile = state[storeName]?.find((item) => item.id === targetId);
  if (!profile) {
    toast("Profile not found yet.");
    return;
  }
  fillForm("profileAccessForm", {
    targetStore: storeName,
    targetId,
    profileName: profile.name || profile.contactName || profile.email || targetId,
    accessLevels: storeName === "clientReps"
      ? ensureClientRepAccessLevels(profile.accessLevels)
      : normalizeAccessLevels(profile.accessLevels, storeName === "promoters" ? "PROMOTER_ADMIN" : storeName === "workers" ? "CREW" : "CLIENT_REP")
  });
}

async function saveProfileAccess(event) {
  event.preventDefault();
  if (!(isClientRole() || isProductionRole() || isAdminRole())) return;
  const form = event.currentTarget;
  const record = await formRecord(form);
  const storeName = record.targetStore;
  const targetId = record.targetId;
  const profile = state[storeName]?.find((item) => item.id === targetId);
  if (!profile) {
    toast("Profile not found.");
    return;
  }
  const accessLevels = storeName === "clientReps"
    ? ensureClientRepAccessLevels(record.accessLevels)
    : normalizeAccessLevels(record.accessLevels, storeName === "promoters" ? "PROMOTER_ADMIN" : storeName === "workers" ? "CREW" : "CLIENT_REP");
  const updated = { ...profile, accessLevels, loginRole: baseRoleForAccess(accessLevels[0] || profile.loginRole) };
  await put(storeName, updated);
  try {
    if (initializeSupabaseClient()) await syncSupabaseRoleForProfile(storeName, updated);
  } catch (error) {
    console.error(error);
    toast("Access saved locally. Supabase role sync needs attention.");
    return;
  }
  closeForm("profileAccessForm");
  await loadState();
  setView(state.activeView);
  toast("Profile access updated.");
}

async function openQuickProfileForm(targetStore) {
  if (!["clients", "workers", "promoters"].includes(targetStore)) return;
  if (targetStore === "clients" && !canSystemEdit()) {
    toast("Only ADMIN can add client accounts.");
    return;
  }
  if (targetStore === "workers" && !canOwnerEdit()) {
    toast("This access view cannot add crew profiles.");
    return;
  }
  if (targetStore === "promoters" && !(canOwnerEdit() || isProductionRole())) {
    toast("This access view cannot add promoter profiles.");
    return;
  }
  await refreshSiteAccessLevelsForForm("quickProfileForm");
  const clientId = targetStore === "clients" ? "" : authState.roleRecord?.client_id || activeClientRecord()?.id || "";
  fillForm("quickProfileForm", {
    targetStore,
    clientId,
    accessLevels: quickProfileDefaultAccess(targetStore)
  });
  $("#quickProfileTitle").textContent = quickProfileTitle(targetStore);
  $("#quickProfileNote").textContent = quickProfileNote(targetStore);
  updateQuickProfileCompanyFields();
  renderAccessLevelControls($("#quickProfileForm"));
}

function updateQuickProfileCompanyFields() {
  const form = $("#quickProfileForm");
  if (!form) return;
  const targetStore = form.elements.targetStore?.value || "";
  const contractorField = form.querySelector(".quick-contractor-field");
  const companyField = form.querySelector(".quick-company-field");
  const isCrew = targetStore === "workers";
  const showCompany = !isCrew || form.elements.paidThroughCompany?.checked;
  if (contractorField) contractorField.hidden = !isCrew;
  if (companyField) companyField.hidden = !showCompany;
  if (isCrew && !showCompany && form.elements.companyName) form.elements.companyName.value = "";
}

async function saveQuickProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const record = await formRecord(form);
  const targetStore = record.targetStore;
  const firstName = String(record.firstName || "").trim();
  const lastName = String(record.lastName || "").trim();
  const fullName = `${firstName} ${lastName}`.trim();
  const email = String(record.email || "").trim().toLowerCase();
  if (!fullName || !email) {
    toast("Add a name and email first.");
    return;
  }
  const accessLevels = targetStore === "clients"
    ? ensureClientRepAccessLevels(record.accessLevels, "CLIENT_ADMIN")
    : normalizeAccessLevels(record.accessLevels, quickProfileDefaultAccess(targetStore)[0]);
  const id = crypto.randomUUID();
  let syncMessage = "";

  if (targetStore === "clients") {
    if (!canSystemEdit()) return;
    const companyName = String(record.companyName || "").trim() || `${fullName} Company`;
    const client = {
      id,
      name: companyName,
      contactName: fullName,
      email,
      loginEmail: email,
      status: "Setup Needed",
      packageLayouts: ["LOCAL_PRODUCTION_SERVICES"],
      accessLevels,
      notes: "Created from quick add."
    };
    await put("clients", client);
    try {
      syncMessage = await syncSupabaseClientAccount(client) || syncMessage;
      const rep = await upsertClientRepForClientAccount(client);
      syncMessage = await syncSupabaseClientRep(rep) || syncMessage;
    } catch (error) {
      console.error(error);
      syncMessage = "Saved locally. Supabase sync needs attention.";
    }
  } else if (targetStore === "promoters") {
    const companyName = String(record.companyName || "").trim() || "Independent";
    const promoter = {
      id,
      clientId: record.clientId || authState.roleRecord?.client_id || "",
      companyName,
      name: fullName,
      contactName: "Promoter Rep",
      email,
      loginEmail: email,
      accessLevels,
      loginRole: supabaseRoleFromAccessLevels(accessLevels, "PROMOTER"),
      notes: "Created from quick add."
    };
    await put("promoters", promoter);
  } else {
    const contractorCompany = record.paidThroughCompany === "yes" ? String(record.companyName || "").trim() : "";
    const worker = {
      id,
      clientId: record.clientId || authState.roleRecord?.client_id || "",
      name: fullName,
      role: "Crew / Runner",
      email,
      loginEmail: email,
      contractorCompany,
      companyName: contractorCompany,
      status: "Available",
      accessLevels,
      loginRole: supabaseRoleFromAccessLevels(accessLevels, "CREW"),
      notes: "Created from quick add."
    };
    await put("workers", worker);
  }

  closeForm("quickProfileForm");
  await loadState();
  setView(targetStore === "clients" ? "admin" : targetStore);
  toast(syncMessage || "Person created. Use Send Login Setup when ready.");
}

function setupStepKey(userId = authState.user?.id) {
  return `productionCrewSetupStep:${userId || "unknown"}`;
}

function setClientSetupStep(step, userId = authState.user?.id) {
  if (!userId) return;
  if (step) localStorage.setItem(setupStepKey(userId), step);
  else localStorage.removeItem(setupStepKey(userId));
}

function clientSetupStep(userId = authState.user?.id) {
  return userId ? localStorage.getItem(setupStepKey(userId)) || "" : "";
}

function clientCompanyNeedsSetup(client) {
  return !client || !client.name || client.status === "Setup Needed";
}

function clientRepNeedsSetup(rep) {
  return !rep || !rep.name || !rep.email || rep.status === "Setup Needed";
}

function clientCompanyDefaults() {
  return {
    id: authState.roleRecord?.client_id || "",
    name: "",
    contactName: authState.user?.user_metadata?.name || "",
    email: authState.user?.email || "",
    phone: authState.user?.user_metadata?.phone || "",
    defaultDayRate: "",
    defaultIncludedHours: "10",
    defaultAdditionalRate: "",
    defaultRentedVehicleRate: "",
    defaultPersonalVehicleRate: "",
    status: "Setup Needed"
  };
}

function openClientCompanySetupForm() {
  fillForm("clientCompanyProfileForm", activeClientRecord() || clientCompanyDefaults());
}

function openClientRepSetupForm() {
  fillForm("clientProfileForm", activeClientRepRecord() || clientRepDefaults());
}

function openCurrentClientSetupStep() {
  if (!isClientRole()) return;
  window.setTimeout(() => {
    const step = clientSetupStep();
    if (step === "company") {
      if (clientCompanyNeedsSetup(activeClientRecord())) openClientCompanySetupForm();
      else setClientSetupStep(clientRepNeedsSetup(activeClientRepRecord()) ? "rep" : "");
    }
    if (step === "rep") {
      if (clientRepNeedsSetup(activeClientRepRecord())) openClientRepSetupForm();
      else setClientSetupStep("");
    }
  }, 0);
}

async function applyAuthenticatedSession(session, preferredView = "") {
  if (!session) {
    stopIdleSignOutTimer();
    authState = { session: null, user: null, roleRecord: null, pendingSetup: false };
    pendingActivationSession = null;
    pendingActivationType = "";
    appHasLoaded = false;
    showAuthScreen("Log in with your Supabase account.");
    return;
  }

  setLoadingOverlay("Restoring session...", true);
  authState.session = session;
  authState.user = session.user;
  if (authState.pendingSetup) {
    stopIdleSignOutTimer();
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

  $("#sessionEmail").textContent = session.user.user_metadata?.name || session.user.email || "Signed in";
  $("#sessionRole").textContent = state.accessRole;
  await ensureDatabase();
  await hydrateAccessLevelsFromSupabase();
  await hydrateClientSetupData(roleRecord, session.user);
  await hydrateAppRecordsFromSupabase();
  await loadState();
  await ensureWelcomeNotification();
  await syncLocalRecordsToSupabase();
  await refreshUserAccessList(false);
  appHasLoaded = true;
  const hashView = location.hash && !setupTypeFromUrl() ? location.hash.replace("#", "") : "";
  const savedView = sessionStorage.getItem(LAST_ACTIVE_VIEW_KEY) || "";
  const requestedView = preferredView || hashView || savedView || state.activeView;
  const homeView = requestedView && assignedViews().includes(requestedView) ? requestedView : roleHomeView();
  if (location.hash !== `#${homeView}`) history.replaceState(null, "", `#${homeView}`);
  setView(homeView);
  showAppShell({ keepLoading: true });
  setLoadingOverlay("", false);
  openCurrentClientSetupStep();
  if (sessionStorage.getItem(POST_SETUP_PERMISSION_PROMPT_KEY)) {
    sessionStorage.removeItem(POST_SETUP_PERMISSION_PROMPT_KEY);
    await maybePromptForMobilePermissions({ force: true });
  }
  resetIdleSignOutTimer();
  autoConnectMessagingAfterLogin();
}

async function initializeAuth() {
  if (!initializeSupabaseClient()) {
    showAuthScreen("Add your Supabase URL and anon key in app.js to enable login.");
    return;
  }
  if (isPublicEventRoute()) {
    await loadPublicEventAccess();
    return;
  }

  const setupType = setupTypeFromUrl();
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    showAuthScreen(error.message);
    return;
  }
  authState.pendingSetup = Boolean(data.session && needsPasswordSetup(setupType));
  if (authState.pendingSetup && data.session) {
    pendingActivationSession = data.session;
    pendingActivationType = setupType;
    authState.session = data.session;
    authState.user = data.session.user;
    showAuthScreen("Account link verified. Choose Activate Account to finish setup.");
    return;
  }
  try {
    await applyAuthenticatedSession(data.session);
  } catch (error) {
    console.error(error);
    showAuthScreen(error.message || "Could not load your assigned role.");
  }

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    window.setTimeout(() => {
      if (authState.pendingSetup && session) {
        pendingActivationSession = session;
        authState.session = session;
        authState.user = session.user;
        showAuthScreen("Account link verified. Choose Activate Account to finish setup.");
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

async function startAccountActivation(event) {
  event.preventDefault();
  if (!initializeSupabaseClient()) {
    $("#activateMessage").textContent = "Supabase login is not configured.";
    return;
  }
  const form = event.currentTarget;
  const email = normalizedMatchValue(form.elements.email.value);
  const session = pendingActivationSession || authState.session || (await supabaseClient.auth.getSession()).data?.session;
  if (!session || !needsPasswordSetup(pendingActivationType || setupTypeFromUrl())) {
    $("#activateMessage").textContent = "Open the setup link from your email first, then activate here.";
    return;
  }
  if (email !== normalizedMatchValue(session.user?.email)) {
    $("#activateMessage").textContent = "That email does not match this setup link.";
    return;
  }
  pendingActivationSession = session;
  authState.pendingSetup = true;
  authState.session = session;
  authState.user = session.user;
  showSetupScreen(session);
}

function profileViewForRole(role) {
  const normalized = normalizeRole(role);
  if (normalized === "ADMIN") return "adminProfile";
  if (normalized === "CLIENT") return "clientProfile";
  if (normalized === "PROMOTER") return "promoters";
  if (normalized === "PRODUCTION") return "productionBoard";
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
  pendingActivationSession = null;
  pendingActivationType = "";
  const sessionResult = await supabaseClient.auth.getSession();
  const session = sessionResult.data?.session || authState.session;
  const roleRecord = await fetchUserRole(session);
  authState.roleRecord = roleRecord;
  state.accessRole = roleRecord.role;
  if (roleRecord.role === "CLIENT") {
    await ensureDatabase();
    const hydratedSetup = await hydrateClientSetupData(roleRecord, session.user);
    await loadState();
    const existingRep = state.clientReps.find((rep) => rep.authUserId === session.user.id || rep.email === session.user.email);
    await put("clientReps", {
      ...(existingRep || {}),
      id: existingRep?.id || session.user.id,
      clientId: roleRecord.client_id || "",
      authUserId: session.user.id,
      name: form.elements.name.value,
      email: session.user.email || "",
      phone: form.elements.phone.value,
      accessLevels: ensureClientRepAccessLevels(existingRep?.accessLevels, hydratedSetup.repCount === 0 ? "CLIENT_ADMIN" : "CLIENT_REP"),
      emailRoutingStatus: existingRep?.emailRoutingStatus || "Not configured"
    });
    await loadState();
    setClientSetupStep(clientCompanyNeedsSetup(activeClientRecord()) || hydratedSetup.repCount === 0 ? "company" : "rep", session.user.id);
  }
  const profileView = roleRecord.role === "CLIENT" && clientSetupStep(session.user.id) === "company"
    ? "clientCompanyProfile"
    : profileViewForRole(roleRecord.role);
  if (location.hash !== `#${profileView}`) history.replaceState(null, "", `#${profileView}`);
  sessionStorage.setItem(POST_SETUP_PERMISSION_PROMPT_KEY, "1");
  await applyAuthenticatedSession({ ...session, user: data.user || session.user }, profileView);
}

async function logout() {
  if (!supabaseClient) return;
  stopIdleSignOutTimer();
  appHasLoaded = false;
  authState = { session: null, user: null, roleRecord: null, pendingSetup: false };
  pendingActivationSession = null;
  pendingActivationType = "";
  showAuthScreen("Logging out...");
  await supabaseClient.auth.signOut();
  await refreshAppCacheAfterSignOut("Logged out. Sign in again when ready.");
}

async function clearSavedLogin() {
  stopIdleSignOutTimer();
  initializeSupabaseClient();
  appHasLoaded = false;
  authState = { session: null, user: null, roleRecord: null, pendingSetup: false };
  pendingActivationSession = null;
  pendingActivationType = "";
  if (supabaseClient) await supabaseClient.auth.signOut({ scope: "local" });
  await refreshAppCacheAfterSignOut("Saved login cleared. Sign in again.");
}

function clearLocalSessionCache() {
  sendbirdActiveChannel = null;
  sendbirdActiveThread = null;
  sendbirdMessages = [];
  sendbirdTypingUsers = [];
  sendbirdConnectionState = { status: "disconnected", errorCode: "", errorMessage: "" };
  sendbirdAutoConnectAttempted = false;
  Object.keys(localStorage)
    .filter((key) => key.startsWith("sb-") || key.startsWith("productionCrewActive") || key === "productionCrewMessagingThreadType" || key === "productionCrewPayrollView" || key === "productionCrewCollapsedNavGroups")
    .forEach((key) => localStorage.removeItem(key));
  sessionStorage.clear();
}

async function clearBrowserAppCaches() {
  if (!("caches" in window)) return;
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
}

async function refreshAppCacheAfterSignOut(message) {
  clearLocalSessionCache();
  try {
    await clearBrowserAppCaches();
  } catch (error) {
    console.warn(error);
  }
  showAuthScreen(message);
  if (signOutReloading || isPublicEventRoute()) return;
  signOutReloading = true;
  window.setTimeout(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("signedOutAt", String(Date.now()));
    url.hash = "";
    window.location.replace(url.toString());
  }, 350);
}

function stopIdleSignOutTimer() {
  window.clearTimeout(idleSignOutTimer);
  idleSignOutTimer = null;
}

function resetIdleSignOutTimer() {
  stopIdleSignOutTimer();
  if (!authState.session || authState.pendingSetup || isPublicEventRoute()) return;
  idleSignOutTimer = window.setTimeout(() => {
    toast(`Signed out after ${IDLE_SIGN_OUT_MINUTES} minutes of inactivity.`);
    logout().catch((error) => {
      console.error(error);
      showAuthScreen("Signed out after inactivity.");
    });
  }, IDLE_SIGN_OUT_MS);
}

function registerIdleSignOutListeners() {
  if (window.__productionCrewIdleListenersRegistered) return;
  window.__productionCrewIdleListenersRegistered = true;
  ["click", "keydown", "pointermove", "touchstart", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, resetIdleSignOutTimer, { passive: true });
  });
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
  if (!value) return "";
  if (accessLevelDefinition(value)) return value;
  return normalizeRole(value);
}

function isAdminRole() {
  return effectiveAccessRole() === "ADMIN";
}

function isClientRole() {
  return effectiveAccessRole() === "CLIENT";
}

function isProductionRole() {
  return effectiveAccessRole() === "PROMOTER";
}

function isProductionTeamRole() {
  return effectiveAccessRole() === "PRODUCTION";
}

function isCrewRole() {
  return effectiveAccessRole() === "CREW";
}

function currentProfile() {
  return accessProfileFor(state.accessRole);
}

function roleHomeView(role = state.accessRole) {
  const profile = accessProfileFor(role);
  const preferred = ROLE_HOME_VIEWS[role] || ROLE_HOME_VIEWS[profile.effectiveRole];
  return preferred && profile.views.includes(preferred)
    ? preferred
    : profile.views[0] || "dashboard";
}

function protectedViewFor(viewId) {
  const role = accessRoleForView(viewId);
  if (role) return viewId;
  return roleHomeView(assignedAccessForCurrentUser()[0] || state.accessRole);
}

function assignedAccessProfiles() {
  return assignedAccessForCurrentUser().map((role) => ({ role, profile: accessProfileFor(role) })).filter((item) => item.profile);
}

function hasAssignedProfilePermission(predicate) {
  return assignedAccessProfiles().some(({ role, profile }) => predicate(profile, role));
}

function assignedViews() {
  return Array.from(new Set(assignedAccessProfiles().flatMap((item) => item.profile.views)));
}

function accessRoleForView(viewId) {
  if (currentProfile().views.includes(viewId)) return state.accessRole;
  return assignedAccessProfiles().find((item) => item.profile.views.includes(viewId))?.role || "";
}

function assignedAccessForRole(role) {
  const normalized = normalizeRole(role);
  if (normalized === "CLIENT") return ["CLIENT_ADMIN", "CLIENT_REP", "CLIENT_REP_LEAD", "CLIENT_ACCOUNTING", "PROMOTER_ADMIN", "PROMOTER_REP", "CREW", "PRODUCTION_TEAM_ACCESS"];
  if (normalized === "CREW") {
    const worker = getWorker(state.activeWorkerId);
    return normalizeAccessLevels(worker?.accessLevels, "CREW");
  }
  if (normalized === "PROMOTER") {
    const promoter = getPromoter(state.activePromoterId);
    return normalizeAccessLevels(promoter?.accessLevels, "PROMOTER_ADMIN");
  }
  if (normalized === "PRODUCTION") return ["PRODUCTION_TEAM_ACCESS"];
  return [normalized];
}

function sortAccessRoles(roles = []) {
  return Array.from(new Set(roles.filter(Boolean))).sort((a, b) => {
    const priorityDelta = (ACCESS_ROLE_PRIORITY[b] || 0) - (ACCESS_ROLE_PRIORITY[a] || 0);
    return priorityDelta || accessLevelLabel(a).localeCompare(accessLevelLabel(b));
  });
}

function assignedAccessForCurrentUser() {
  const baseRole = normalizeRole(authState.roleRecord?.role || state.accessRole);
  if (baseRole === "ADMIN") return ["ADMIN"];
  if (baseRole === "CLIENT") {
    const rep = activeClientRepRecord();
    let roles = ensureClientRepAccessLevels(rep?.accessLevels, "CLIENT_ADMIN").filter((role) => accessProfileFor(role));
    if (roles.includes("CLIENT_ACCOUNTING") && roles.includes("CLIENT_REP") && !roles.includes("CLIENT_REP_LEAD") && !roles.includes("CLIENT_ADMIN")) {
      roles = roles.filter((role) => role !== "CLIENT_ACCOUNTING");
    }
    roles = sortAccessRoles(roles);
    return roles.includes("ADMIN") ? ["ADMIN"] : roles;
  }
  const roles = sortAccessRoles(assignedAccessForRole(baseRole).filter((role) => accessProfileFor(role)));
  return roles.includes("ADMIN") ? ["ADMIN"] : roles;
}

function accessLevelOptionsForForm(form) {
  let roles = accessLevelDefinitions().map((level) => level.id).filter((role) => role !== "ADMIN");
  if (form?.id === "accountAccessForm") return roles;
  if (form?.id === "quickProfileForm") return quickProfileAccessOptions(form.elements.targetStore?.value || "");
  if (form?.id === "profileAccessForm") {
    if (isClientRole()) return roles.filter((role) => baseRoleForAccess(role) !== "ADMIN");
    if (isProductionRole()) {
      const blocked = new Set(["CLIENT", "CLIENT_ADMIN", "CLIENT_REP", "CLIENT_REP_LEAD", "CLIENT_ACCOUNTING"]);
      return roles.filter((role) => !blocked.has(role) && !["ADMIN", "CLIENT"].includes(baseRoleForAccess(role)));
    }
    if (isAdminRole()) return roles;
    return [];
  }
  if (["clientProfileForm", "workerForm", "promoterForm"].includes(form?.id)) return [];
  if (form?.id !== "clientForm") roles = roles.filter((role) => !["CLIENT", "PRODUCTION"].includes(baseRoleForAccess(role)));
  return roles;
}

function accessLevelLabel(role) {
  return accessLevelDefinition(role)?.name || ACCESS_LEVEL_LABELS[role] || role.replaceAll("_", " ");
}

function quickProfileAccessOptions(targetStore) {
  const roles = accessLevelDefinitions().map((level) => level.id).filter((role) => role !== "ADMIN");
  if (isProductionRole()) {
    return roles.filter((role) => !["ADMIN", "CLIENT"].includes(baseRoleForAccess(role)));
  }
  if (isClientRole()) {
    return roles.filter((role) => baseRoleForAccess(role) !== "ADMIN");
  }
  if (targetStore === "clients" || isAdminRole()) {
    return roles.filter((role) => baseRoleForAccess(role) === "CLIENT");
  }
  return roles;
}

function quickProfileTargetsForCurrentUser() {
  const targets = [];
  if (isAdminRole()) {
    targets.push({ store: "clients", label: "Client" });
  }
  if (canOwnerEdit()) {
    targets.push({ store: "workers", label: "Crew / Runner" });
    targets.push({ store: "promoters", label: "Promoter Rep" });
  } else if (isProductionRole()) {
    targets.push({ store: "workers", label: "Crew / Runner" });
    targets.push({ store: "promoters", label: "Promoter Rep" });
  }
  return targets;
}

function renderGlobalAddMenu() {
  const menu = $("#globalAddMenu");
  const options = $("#globalAddMenuOptions");
  if (!menu || !options) return;
  const targets = quickProfileTargetsForCurrentUser();
  menu.hidden = !targets.length;
  options.innerHTML = targets.map((target) => (
    `<button class="tiny-button" data-open-quick-profile="${escapeHtml(target.store)}" type="button">Add ${escapeHtml(target.label)}</button>`
  )).join("");
}

function quickProfileDefaultAccess(targetStore) {
  if (targetStore === "clients") return ["CLIENT_ADMIN"];
  if (targetStore === "promoters") return ["PROMOTER_ADMIN"];
  return ["CREW"];
}

function quickProfileTitle(targetStore) {
  if (targetStore === "clients") return "Add Client Admin";
  if (targetStore === "promoters") return "Add Promoter Rep";
  return "Add Crew / Runner";
}

function quickProfileNote(targetStore) {
  if (targetStore === "clients") return "Creates the client company shell and first login-ready client rep. They finish the company and profile setup after activation.";
  if (targetStore === "promoters") return "Creates a lightweight promoter rep profile. Company and rep details can be expanded after activation.";
  return "Creates a lightweight crew/runner profile connected to this client. They finish phone, address, headshot, and directory privacy during setup.";
}

function renderAccessLevelControls(root = document) {
  root.querySelectorAll?.("[data-access-level-options]").forEach((group) => {
    const allowed = accessPickerAllowed(group.closest("form"));
    const wrapper = group.closest("[data-access-manager-field]");
    if (wrapper) {
      wrapper.hidden = !allowed;
      wrapper.style.display = allowed ? "" : "none";
    }
    if (!allowed) {
      group.innerHTML = "";
      return;
    }
    const selected = Array.from(group.querySelectorAll("input[type='checkbox']:checked")).map((input) => input.value);
    const options = accessLevelOptionsForForm(group.closest("form"));
    group.innerHTML = options.map((role) => `<label class="checkbox-option"><input name="${escapeHtml(group.dataset.name || "accessLevels")}" type="checkbox" value="${escapeHtml(role)}" ${selected.includes(role) ? "checked" : ""}>${escapeHtml(accessLevelLabel(role))}</label>`).join("");
  });
}

function accessPickerAllowed(form) {
  if (!form) return true;
  if (form.id === "accountAccessForm" || form.id === "accessLevelForm" || form.id === "quickProfileForm") return true;
  if (form.id === "profileAccessForm") return isClientRole() || isProductionRole() || isAdminRole();
  if (["clientProfileForm", "workerForm", "promoterForm"].includes(form.id)) return false;
  return true;
}

async function refreshSiteAccessLevelsForForm(formId) {
  if (!["clientProfileForm", "workerForm", "promoterForm", "accessLevelForm", "accountAccessForm", "profileAccessForm", "quickProfileForm"].includes(formId)) return;
  try {
    await hydrateAccessLevelsFromSupabase();
    await loadState();
  } catch (error) {
    console.warn(error);
  }
  renderAccessLevelControls(document.getElementById(formId));
  if (formId === "accessLevelForm") renderViewOptionControls($("#accessLevelForm"));
}

function viewLabel(viewId) {
  return Object.values(NAV_GROUPS)
    .flat()
    .flatMap((group) => group.items || [])
    .find(([view]) => view === viewId)?.[1] || viewId;
}

function renderViewOptionControls(root = document) {
  root.querySelectorAll?.("[data-view-options]").forEach((group) => {
    const selected = Array.from(group.querySelectorAll("input[type='checkbox']:checked")).map((input) => input.value);
    const form = group.closest("form");
    const baseRole = normalizeAccessLevel(form?.elements?.baseRole?.value || "CREW");
    const views = accessProfileFor(baseRole)?.views || [];
    group.innerHTML = views.map((view) => `<label class="checkbox-option"><input name="${escapeHtml(group.dataset.name || "views")}" type="checkbox" value="${escapeHtml(view)}" ${selected.includes(view) ? "checked" : ""}>${escapeHtml(viewLabel(view))}</label>`).join("");
  });
}

function builtInAccessLevelDefinitions() {
  const legacyAliases = new Set(["CLIENT", "PROMOTER", "PROMOTER_PRODUCTION_OFFICE", "PRODUCTION"]);
  return Object.keys(ACCESS_PROFILES).filter((id) => !legacyAliases.has(id)).map((id) => ({
    id,
    name: ACCESS_LEVEL_LABELS[id] || id,
    baseRole: ACCESS_PROFILES[id].baseRole || id,
    views: ACCESS_PROFILES[id].views,
    builtIn: true
  }));
}

function accessLevelDefinitions() {
  return [...builtInAccessLevelDefinitions(), ...state.accessLevelDefs];
}

function accessLevelDefinition(id) {
  return accessLevelDefinitions().find((level) => level.id === id) || null;
}

function baseRoleForAccess(id) {
  const definition = accessLevelDefinition(id);
  return normalizeRole(definition?.baseRole || id);
}

function effectiveAccessRole() {
  return baseRoleForAccess(state.accessRole);
}

function accessProfileFor(id) {
  const definition = accessLevelDefinition(id);
  const baseRole = baseRoleForAccess(id);
  const baseProfile = ACCESS_PROFILES[baseRole] || ACCESS_PROFILES.CLIENT;
  if (!definition || definition.builtIn) {
    return { ...(ACCESS_PROFILES[id] || baseProfile), effectiveRole: baseRole };
  }
  const allowedViews = (definition.views || []).filter((view) => baseProfile.views.includes(view));
  return {
    ...baseProfile,
    label: definition.name,
    views: allowedViews.length ? allowedViews : baseProfile.views,
    effectiveRole: baseRole
  };
}

function normalizeAccessLevels(levels, fallback) {
  const values = Array.isArray(levels) ? levels : String(levels || "").split(",");
  const clean = values.map((level) => normalizeAccessLevel(level)).filter(Boolean);
  return clean.length ? Array.from(new Set(clean)) : [normalizeAccessLevel(fallback)].filter(Boolean);
}

function ensureClientRepAccessLevels(levels, fallback = "CLIENT_REP") {
  const normalized = normalizeAccessLevels(levels, fallback);
  const hasClientAccess = normalized.some((level) => baseRoleForAccess(level) === "CLIENT");
  return hasClientAccess ? normalized : Array.from(new Set([fallback, ...normalized]));
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

function hasAssignedAccess(role) {
  return assignedAccessForCurrentUser().includes(role);
}

function dataScopeRole() {
  if (isAdminRole()) return "ADMIN";
  const baseRoles = assignedAccessForCurrentUser().map(baseRoleForAccess);
  if (baseRoles.includes("CLIENT")) return "CLIENT";
  if (baseRoles.includes("PROMOTER")) return "PROMOTER";
  if (baseRoles.includes("PRODUCTION")) return "PRODUCTION";
  if (baseRoles.includes("CREW")) return "CREW";
  return effectiveAccessRole();
}

function hasDataScope(role) {
  return dataScopeRole() === role;
}

function canEditRates() {
  return currentProfile().canViewRates || (hasAssignedAccess("CLIENT_ACCOUNTING") && hasAssignedAccess("CLIENT_REP_LEAD"));
}

function crewCanViewRates() {
  const worker = getWorker(state.activeWorkerId);
  return isCrewRole() && (worker?.allowCrewRateView === "yes" || worker?.allowCrewRateView === true);
}

function canViewRates() {
  return canEditRates() || crewCanViewRates();
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
  const assignmentIds = state.eventAssignments
    .filter((assignment) => assignment.eventId === event?.id && !["Cancelled", "Swapped"].includes(assignment.status))
    .map((assignment) => assignment.workerId)
    .filter(Boolean);
  return Array.from(new Set([...assignmentIds, ...(Array.isArray(event?.workerIds) ? event.workerIds : [])].filter(Boolean)));
}

function eventAssignments(eventId) {
  return state.eventAssignments.filter((assignment) => assignment.eventId === eventId && assignment.status !== "Cancelled");
}

function getEventAssignment(id) {
  return state.eventAssignments.find((assignment) => assignment.id === id);
}

function assignmentForEventWorker(eventId, workerId) {
  return eventAssignments(eventId).find((assignment) => assignment.workerId === workerId && !["Cancelled", "Swapped"].includes(assignment.status));
}

function eventRange(event) {
  const start = event?.startDate || event?.endDate || "";
  const end = event?.endDate || event?.startDate || "";
  return { start, end };
}

function dateRangesOverlap(first, second) {
  if (!first.start || !second.start) return false;
  const firstStart = new Date(first.start);
  const firstEnd = new Date(first.end || first.start);
  const secondStart = new Date(second.start);
  const secondEnd = new Date(second.end || second.start);
  if ([firstStart, firstEnd, secondStart, secondEnd].some((date) => Number.isNaN(date.getTime()))) return false;
  return firstStart <= secondEnd && secondStart <= firstEnd;
}

function workerBookingConflict(workerId, draftEvent) {
  const draftRange = eventRange(draftEvent);
  const assignmentConflict = state.eventAssignments.find((assignment) => {
    if (!assignment.workerId || assignment.workerId !== workerId || assignment.eventId === draftEvent.id) return false;
    if (["Cancelled", "Swapped"].includes(assignment.status)) return false;
    return dateRangesOverlap(draftRange, eventRange(assignment));
  });
  if (assignmentConflict) return getEvent(assignmentConflict.eventId) || assignmentConflict;
  return state.events.find((event) => {
    if (!event || event.id === draftEvent.id) return false;
    if (!Array.isArray(event.workerIds) || !event.workerIds.includes(workerId)) return false;
    return dateRangesOverlap(draftRange, eventRange(event));
  });
}

function renderEventAssignmentManager(form = $("#eventForm"), eventId = "") {
  if (!form) return;
  const container = form.querySelector("[data-event-assignment-summary]");
  const addButton = form.querySelector("[data-form-add-assignment]");
  if (!container) return;
  const id = eventId || form.elements.id?.value || "";
  if (addButton) addButton.dataset.formAddAssignment = id;
  if (!id) {
    container.innerHTML = `<div class="compact-item empty">Save the event first, then add runners with detailed schedules, rates, and vehicle use.</div>`;
    if (addButton) addButton.disabled = true;
    return;
  }
  if (addButton) addButton.disabled = false;
  const assignments = eventAssignments(id).filter((assignment) => !["Cancelled", "Swapped"].includes(assignment.status));
  if (!assignments.length) {
    container.innerHTML = `<div class="compact-item empty">No runners booked yet. Use Add Runner to assign crew.</div>`;
    return;
  }
  container.innerHTML = `<table class="mini-table"><thead><tr><th>Runner</th><th>Dates</th><th>Vehicle</th><th>Status</th><th></th></tr></thead><tbody>${assignments.map((assignment) => {
    const worker = getWorker(assignment.workerId);
    return `<tr><td>${escapeHtml(worker?.name || "Runner")}</td><td>${formatDate(assignment.startDate)}<p>${formatDate(assignment.endDate)}</p></td><td>${escapeHtml(assignment.vehicleUse || "No Vehicle")}<p>${escapeHtml(assignment.vehicleType || "")}</p></td><td>${escapeHtml(assignment.status || "Confirmed")}</td><td><button class="tiny-button" data-edit="eventAssignments" data-id="${assignment.id}" data-form="eventAssignmentForm" type="button">Edit</button></td></tr>`;
  }).join("")}</tbody></table>`;
}

async function syncWorkerBookingForEvent(eventRecord, previousEvent = {}) {
  const selected = new Set(eventWorkerIds(eventRecord));
  const previous = new Set(eventWorkerIds(previousEvent));
  const touched = new Set([...selected, ...previous]);
  const bookedUntil = eventRecord.endDate || eventRecord.startDate || "";
  for (const workerId of touched) {
    const worker = getWorker(workerId);
    if (!worker) continue;
    if (selected.has(workerId)) {
      await put("workers", {
        ...worker,
        status: "Booked",
        bookedEventId: eventRecord.id,
        bookedEventName: eventRecord.name || "",
        bookedUntil
      });
    } else if (worker.bookedEventId === eventRecord.id) {
      const { bookedEventId, bookedEventName, bookedUntil: previousBookedUntil, ...rest } = worker;
      await put("workers", { ...rest, status: "Available" });
    }
  }
}

async function releaseWorkerBookingsForEvent(eventId) {
  for (const worker of state.workers.filter((item) => item.bookedEventId === eventId)) {
    const { bookedEventId, bookedEventName, bookedUntil, ...rest } = worker;
    await put("workers", { ...rest, status: "Available" });
  }
}

async function afterAssignmentSaved(assignment, previous = {}) {
  const eventRecord = getEvent(assignment.eventId);
  const worker = getWorker(assignment.workerId);
  if (worker && !["Cancelled", "Swapped"].includes(assignment.status)) {
    await put("workers", {
      ...worker,
      status: "Booked",
      bookedEventId: assignment.eventId,
      bookedEventName: eventRecord?.name || "",
      bookedUntil: assignment.endDate || eventRecord?.endDate || ""
    });
  }
  if (previous.workerId && previous.workerId !== assignment.workerId) {
    const priorWorker = getWorker(previous.workerId);
    if (priorWorker?.bookedEventId === assignment.eventId) {
      const { bookedEventId, bookedEventName, bookedUntil, ...rest } = priorWorker;
      await put("workers", { ...rest, status: "Available" });
    }
  }
  if (eventRecord) {
    const workerIds = Array.from(new Set([...(Array.isArray(eventRecord.workerIds) ? eventRecord.workerIds : []), assignment.workerId].filter(Boolean)));
    await put("events", { ...eventRecord, workerIds });
  }
  if (assignment.vehicleUse === "Rented Vehicle" && assignment.status !== "Cancelled") {
    await ensureVehicleChecksForAssignment(assignment);
  }
  if (worker && eventRecord && assignment.workerId !== previous.workerId && !["Cancelled", "Swapped"].includes(assignment.status)) {
    notifyWorkerAssignment(worker, eventRecord, assignment).catch((error) => console.warn(error));
  }
}

async function notifyWorkerAssignment(worker, eventRecord, assignment) {
  return await triggerNovuNotification(NOVU_WORKFLOWS.eventAssignmentCreated, {
    workerName: worker.name || "Crew member",
    eventName: eventRecord.name || "Assigned event",
    startDate: assignment.startDate || eventRecord.startDate || "",
    endDate: assignment.endDate || eventRecord.endDate || "",
    vehicleUse: assignment.vehicleUse || "No Vehicle"
  }, notificationSubscriberForWorker(worker), {
    silent: true,
    transactionId: `assignment-${assignment.id || eventRecord.id}-${worker.id}`
  });
}

async function notifyReportSaved(report) {
  const eventRecord = getEvent(report.eventId);
  const worker = getWorker(report.workerId);
  const workflowId = String(report.type || "").toLowerCase().includes("vehicle")
    ? NOVU_WORKFLOWS.vehicleDamageReported
    : NOVU_WORKFLOWS.reportSubmitted;
  const recipients = new Map();
  eventClientReps(eventRecord || {}).forEach((rep) => {
    const subscriber = notificationSubscriberForProfile(rep, rep.authUserId || rep.id || rep.email);
    if (subscriber.subscriberId) recipients.set(subscriber.subscriberId, subscriber);
  });
  const promoter = getPromoter(eventRecord?.promoterId || report.promoterId);
  const promoterSubscriber = notificationSubscriberForProfile(promoter, promoter?.authUserId || promoter?.id || promoter?.email);
  if (promoterSubscriber.subscriberId) recipients.set(promoterSubscriber.subscriberId, promoterSubscriber);
  const payload = {
    reportType: report.type || "Report",
    reportTitle: report.title || "Report submitted",
    eventName: eventRecord?.name || report.eventName || "Related event",
    workerName: worker?.name || "Crew / Runner",
    reportedAt: report.reportedAt || report.createdAt || new Date().toISOString()
  };
  await Promise.all(Array.from(recipients.values()).map((recipient) => triggerNovuNotification(workflowId, payload, recipient, {
    silent: true,
    transactionId: `report-${report.id}-${recipient.subscriberId}`
  })));
}

async function syncEventWorkerIdsFromAssignments(eventId) {
  const eventRecord = getEvent(eventId);
  if (!eventRecord) return;
  const workerIds = Array.from(new Set(eventAssignments(eventId).filter((assignment) => !["Cancelled", "Swapped"].includes(assignment.status)).map((assignment) => assignment.workerId).filter(Boolean)));
  await put("events", { ...eventRecord, workerIds });
}

async function ensureVehicleChecksForAssignment(assignment) {
  const eventRecord = getEvent(assignment.eventId);
  const worker = getWorker(assignment.workerId);
  for (const phase of ["Start", "End"]) {
    if (rentedVehicleLogForAssignment(assignment, phase)) continue;
    await put("vehicleLogs", {
      eventId: assignment.eventId,
      workerId: assignment.workerId,
      assignmentId: assignment.id,
      phase,
      vehicleType: assignment.vehicleType || "Rented Vehicle",
      plateNumber: "",
      gasGauge: "Full",
      scheduledDate: phase === "Start" ? assignment.startDate || eventRecord?.startDate || "" : assignment.endDate || eventRecord?.endDate || "",
      notes: `Auto-created for ${worker?.name || "runner"} rental vehicle assignment.`
    });
  }
}

async function ensureDefaultAssignmentsForEvent(eventRecord) {
  for (const workerId of Array.isArray(eventRecord.workerIds) ? eventRecord.workerIds : []) {
    if (assignmentForEventWorker(eventRecord.id, workerId)) continue;
    const worker = getWorker(workerId);
    const client = activeClientRecord();
    const assignment = {
      id: crypto.randomUUID(),
      eventId: eventRecord.id,
      workerId,
      startDate: eventRecord.startDate || "",
      endDate: eventRecord.endDate || "",
      dayRate: eventRecord.dayRate || client?.defaultDayRate || worker?.defaultDayRate || worker?.defaultRate || "",
      includedHours: eventRecord.includedHours || client?.defaultIncludedHours || worker?.defaultIncludedHours || "10",
      additionalRate: eventRecord.additionalRate || client?.defaultAdditionalRate || worker?.defaultAdditionalRate || "",
      vehicleUse: "No Vehicle",
      vehicleType: "",
      status: "Confirmed",
      notes: "Auto-created from event assigned runner list."
    };
    await put("eventAssignments", assignment);
  }
}

function visibleEvents() {
  if (isAdminRole()) return [];
  if (hasDataScope("CLIENT")) return state.events;
  if (hasDataScope("PROMOTER")) {
    return state.events.filter((event) => !state.activePromoterId || event.promoterId === state.activePromoterId);
  }
  if (hasDataScope("PRODUCTION")) {
    const email = normalizedMatchValue(authState.user?.email || "");
    const eventIds = new Set(state.eventAccessLinks
      .filter((link) => {
        const primary = normalizedMatchValue(link.recipientEmail || "");
        const secondary = String(link.secondaryContactEmails || "").split(/[,\n;]/).map(normalizedMatchValue);
        return !email || primary === email || secondary.includes(email);
      })
      .map((link) => link.eventId)
      .filter(Boolean));
    return state.events.filter((event) => eventIds.has(event.id));
  }
  return state.events.filter((event) => eventWorkerIds(event).includes(state.activeWorkerId));
}

function isEventVisible(eventId) {
  if (isAdminRole()) return false;
  if (hasDataScope("CLIENT")) return true;
  if (hasDataScope("PROMOTER")) {
    const event = getEvent(eventId);
    return !!event && (!state.activePromoterId || event.promoterId === state.activePromoterId);
  }
  if (hasDataScope("PRODUCTION")) return visibleEvents().some((event) => event.id === eventId);
  const event = getEvent(eventId);
  return !!event && eventWorkerIds(event).includes(state.activeWorkerId);
}

function visibleRecords(records) {
  if (isAdminRole()) return [];
  if (hasDataScope("CLIENT")) return records;
  if (hasDataScope("PROMOTER")) {
    return records.filter((record) => {
      if (record.promoterId && state.activePromoterId && record.promoterId !== state.activePromoterId) return false;
      return !record.eventId || isEventVisible(record.eventId);
    });
  }
  if (hasDataScope("PRODUCTION")) {
    return records.filter((record) => record.eventId && isEventVisible(record.eventId));
  }
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
  if (hasDataScope("CLIENT")) return state.workers;
  if (hasDataScope("PRODUCTION")) {
    const ids = assignedWorkerIdsForVisibleEvents();
    return state.workers.filter((worker) => ids.has(worker.id));
  }
  if (hasDataScope("CREW")) return state.workers;
  const ids = assignedWorkerIdsForVisibleEvents();
  return state.workers.filter((worker) => ids.has(worker.id));
}

function visiblePromoters() {
  if (isAdminRole()) return [];
  if (hasDataScope("CLIENT")) return state.promoters;
  if (!hasDataScope("PROMOTER")) return [];
  const active = getPromoter(state.activePromoterId);
  return state.promoters.filter((promoter) => {
    if (!active?.companyName) return promoter.id === state.activePromoterId;
    return promoter.companyName === active.companyName;
  });
}

function visibleVenues() {
  if (isAdminRole()) return [];
  if (hasDataScope("CLIENT") || hasDataScope("PROMOTER")) return state.venues;
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

function localDateKey(date = new Date()) {
  return toLocalInputValue(date).slice(0, 10);
}

function timecardWorkDate(card) {
  return card?.workDate || String(card?.clockIn || card?.createdAt || "").slice(0, 10) || localDateKey();
}

function endOfWorkDateInput(workDate) {
  return `${workDate || localDateKey()}T23:59`;
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
  const event = getEvent(card.eventId);
  const assignment = assignmentForEventWorker(card.eventId, card.workerId);
  const client = activeClientRecord();
  return Number(card.dayRate || card.payRate || assignment?.dayRate || event?.dayRate || client?.defaultDayRate || worker?.defaultDayRate || worker?.defaultRate || 0);
}

function includedHoursFor(card) {
  const worker = getWorker(card.workerId);
  const event = getEvent(card.eventId);
  const assignment = assignmentForEventWorker(card.eventId, card.workerId);
  const client = activeClientRecord();
  return Number(card.includedHours || assignment?.includedHours || event?.includedHours || client?.defaultIncludedHours || worker?.defaultIncludedHours || 10);
}

function additionalRateFor(card) {
  const worker = getWorker(card.workerId);
  const event = getEvent(card.eventId);
  const assignment = assignmentForEventWorker(card.eventId, card.workerId);
  const client = activeClientRecord();
  const fallback = includedHoursFor(card) ? dayRateFor(card) / includedHoursFor(card) : 0;
  return Number(card.additionalRate || assignment?.additionalRate || event?.additionalRate || client?.defaultAdditionalRate || worker?.defaultAdditionalRate || fallback || 0);
}

function vehicleRateFor(card) {
  const worker = getWorker(card.workerId);
  const event = getEvent(card.eventId);
  const assignment = assignmentForEventWorker(card.eventId, card.workerId);
  const client = activeClientRecord();
  if (card.vehicleRate) return Number(card.vehicleRate);
  if (card.vehicleUse === "Rented Vehicle") return Number(event?.rentedVehicleRate || client?.defaultRentedVehicleRate || worker?.defaultRentedVehicleRate || 0);
  if (card.vehicleUse === "Personal Vehicle") return Number(assignment?.personalVehicleRate || event?.personalVehicleRate || client?.defaultPersonalVehicleRate || worker?.defaultPersonalVehicleRate || 0);
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
  renderConnectionBanner();
  renderSelects();
  renderAdmin();
  renderAccessLevels();
  renderUserAccessTables();
  renderDashboard();
  renderClientProfile();
  renderAdminProfile();
  renderEvents();
  renderProductionBoard();
  renderProductionResponse();
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
  renderDataTools();
  renderMessaging();
  renderNotifications();
  enhanceResponsiveTables();
  checkRentalPhotoUrgencies();
}

function renderDataTools() {
  const status = $("#cloudSyncStatus");
  if (!status) return;
  if (isAdminRole()) {
    status.textContent = "ADMIN cannot sync production data";
    return;
  }
  const localCount = Array.from(CLOUD_SYNC_STORES).reduce((sum, storeName) => sum + (state[storeName]?.length || 0), 0);
  status.textContent = `Local records ready: ${localCount}`;
}

function enhanceResponsiveTables() {
  $$(".table-wrap > table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll("thead th")).map((header) => header.textContent.trim());
    table.querySelectorAll("tbody tr").forEach((row) => {
      const cells = Array.from(row.children).filter((cell) => cell.tagName === "TD");
      cells.forEach((cell, index) => {
        if (cell.colSpan > 1) return;
        cell.dataset.label = headers[index] || "";
      });
    });
  });
  positionOpenRecordMenus();
}

function positionOpenRecordMenus() {
  $$(".table-wrap .record-options").forEach((details) => {
    const menu = details.querySelector(".record-options-menu");
    if (!menu) return;
    if (!details.open) {
      menu.style.top = "";
      menu.style.left = "";
      return;
    }
    const rect = details.getBoundingClientRect();
    const width = Math.max(170, menu.offsetWidth || 170);
    const left = Math.min(window.innerWidth - width - 12, Math.max(12, rect.right - width));
    menu.style.left = `${left}px`;
    menu.style.top = `${Math.min(window.innerHeight - 12, rect.bottom + 6)}px`;
  });
}

function renderAdmin() {
  renderUserAccessTable("adminUserTable", "adminUserTableCount", state.userAccessRows.filter((row) => normalizeRole(row.role) === "ADMIN"));
  $("#clientTableCount").textContent = `${state.clients.length} clients`;
  $("#clientTable").innerHTML = state.clients.length
    ? state.clients.map((client) => `<tr><td><button class="link-button" data-view-client-company="${client.id}" type="button"><strong>${escapeHtml(client.name)}</strong></button><p>${escapeHtml(client.email)}</p><p>${clientPackageBadges(client.packageLayouts)}</p></td><td>${escapeHtml(client.contactName)}<p>${escapeHtml(client.phone)}</p></td><td><span class="status-pill">${escapeHtml(client.status || "Active")}</span></td><td>${escapeHtml(client.notes)}${loginStatus(client)}</td><td>${actionButtons("clients", client.id, "clientForm", `<button class="tiny-button system-action" data-manage-client-packages="${client.id}" type="button">Packages</button>${loginSetupButton("clients", client)}`, canSystemEdit())}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">No client accounts yet.</td></tr>`;
}

function openClientPackageForm(clientId) {
  if (!canSystemEdit()) return;
  const client = state.clients.find((item) => item.id === clientId);
  if (!client) return;
  clearForm("clientPackageForm");
  $("#clientPackageSummary").innerHTML = `<div class="compact-item"><strong>${escapeHtml(client.name || "Client company")}</strong><span>${escapeHtml(client.email || "")}</span></div>`;
  fillForm("clientPackageForm", {
    id: client.id,
    packageLayouts: normalizeClientPackages(client.packageLayouts)
  });
}

async function saveClientPackages(event) {
  event.preventDefault();
  if (!canSystemEdit()) return;
  const form = event.currentTarget;
  const client = state.clients.find((item) => item.id === form.elements.id.value);
  if (!client) {
    toast("Select a client first.");
    return;
  }
  const selected = Array.from(form.querySelectorAll(`[data-checkbox-group][data-name="packageLayouts"] input[type="checkbox"]:checked:not(:disabled)`)).map((input) => input.value);
  const updated = {
    ...client,
    packageLayouts: normalizeClientPackages(selected)
  };
  await put("clients", updated);
  let message = "Client packages saved.";
  try {
    message = await syncSupabaseClientAccount(updated) || message;
  } catch (error) {
    console.error(error);
    message = "Saved locally. Supabase package sync needs attention.";
  }
  await loadState();
  setView("admin");
  closeForm("clientPackageForm");
  toast(message);
}

function renderAccessLevels() {
  const table = $("#accessLevelTable");
  const count = $("#accessLevelTableCount");
  if (!table || !count) return;
  const rows = accessLevelDefinitions().filter((level) => level.id !== "ADMIN");
  count.textContent = `${rows.length} levels`;
  table.innerHTML = rows.length
    ? rows.map((level) => {
        const pages = (level.views || []).map(viewLabel).join(", ");
        const actions = level.builtIn ? "" : actionButtons("accessLevelDefs", level.id, "accessLevelForm", "", canSystemEdit());
        return `<tr><td><strong>${escapeHtml(level.name)}</strong><p>Site level: ${escapeHtml(level.id)}</p><p>${escapeHtml(level.description || (level.builtIn ? "Built-in access level" : ""))}</p></td><td><strong>${escapeHtml(accessLevelLabel(level.baseRole))}</strong><p>Supabase level</p></td><td>${escapeHtml(pages)}</td><td>${actions}</td></tr>`;
      }).join("")
    : `<tr><td colspan="4" class="empty">No access levels configured.</td></tr>`;
}

function userAccessRowsForView() {
  if (isAdminRole() || isClientRole()) return state.userAccessRows;
  if (isProductionRole()) {
    return state.userAccessRows.filter((row) => normalizeRole(row.role) === "PROMOTER");
  }
  return [];
}

function renderUserAccessTables() {
  const rows = userAccessRowsForView();
  renderUserAccessTable("userAccessTable", "userAccessTableCount", rows);
}

function renderUserAccessTable(tableId, countId, rows) {
  const table = document.getElementById(tableId);
  const count = document.getElementById(countId);
  if (!table || !count) return;
  count.textContent = `${rows.length} users`;
  table.innerHTML = rows.length
    ? rows.map((row) => `<tr><td><strong>${escapeHtml(row.email || "No email")}</strong><p>${escapeHtml(row.userId || "")}</p></td><td>${userAccessRoleCell(row)}</td><td>${escapeHtml(row.clientName || row.clientId || "")}</td><td>${escapeHtml(userAccessProfileLabel(row))}</td><td>${userAccessActions(row)}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">Refresh to load user accounts.</td></tr>`;
}

function userAccessRoleCell(row) {
  const role = normalizeRole(row.role);
  const levels = accessLevelsForUserAccessRow(row);
  const roleLabel = ACCESS_LEVEL_LABELS[role] || role;
  const siteAccess = levels.length ? accessBadges(levels, "") : `<span class="status-pill muted">None</span>`;
  return `<p><strong>Server Access:</strong> <span class="status-pill">${escapeHtml(roleLabel)}</span></p><p><strong>Site Access:</strong> ${siteAccess}</p>`;
}

function userAccessProfileLabel(row) {
  if (row.role === "CLIENT") {
    const rep = state.clientReps.find((item) => item.authUserId === row.userId)
      || state.clientReps.find((item) => item.clientId === row.clientId && item.email === row.email);
    return rep?.name || "Client rep";
  }
  if (normalizeRole(row.role) === "PROMOTER") return promoterLabel(getPromoter(row.promoterId)) || row.promoterId || "Promoter rep";
  if (normalizeRole(row.role) === "PRODUCTION") return "Production team";
  if (row.role === "CREW") return getWorker(row.workerId)?.name || row.workerId || "Crew";
  return "";
}

function userAccessActions(row) {
  if (!isAdminRole() || row.role === "ADMIN" || row.userId === authState.user?.id) return "";
  return `<div class="row-actions"><button class="tiny-button" data-manage-account-access="${row.userId}" type="button">Manage Access</button><button class="tiny-button danger" data-delete-user-account="${row.userId}" type="button">Delete Account</button></div>`;
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
      <div><span>Package Layouts</span><strong>${clientPackageBadges(client.packageLayouts)}</strong></div>
    </div>
    <div class="profile-section"><span>System Notes</span><p>${escapeHtml(client.notes || "")}</p></div>
  </article>`;
  $("#editViewedClientCompany").dataset.editClientId = client.id;
  openForm("clientCompanyView");
}

function detailItem(label, value) {
  return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || "")}</strong></div>`;
}

function profileSection(label, value) {
  return value ? `<div class="profile-section"><span>${escapeHtml(label)}</span><p>${escapeHtml(value)}</p></div>` : "";
}

function readOnlyProfileCard(title, subtitle, details = [], sections = [], avatarHtml = "") {
  $("#recordViewTitle").textContent = title || "Profile";
  $("#recordViewBody").innerHTML = `<article class="profile-page-card">
    <div class="profile-page-header">
      ${avatarHtml || `<div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(title || "Profile"))}</div>`}
      <div>
        <h3>${escapeHtml(title || "Profile")}</h3>
        <p>${escapeHtml(subtitle || "")}</p>
      </div>
    </div>
    <div class="profile-detail-grid">${details.map(([label, value]) => detailItem(label, value)).join("")}</div>
    ${sections.map(([label, value]) => profileSection(label, value)).join("")}
  </article>`;
}

function openReadOnlyRecord(storeName, id) {
  const record = state[storeName]?.find((item) => item.id === id);
  if (!record) {
    toast("Record not found.");
    return;
  }
  if (storeName === "workers") {
    readOnlyProfileCard(record.name, record.role || "Crew / Runner", [
      ["Phone", publicWorkerValue(record, "phone")],
      ["Email", publicWorkerValue(record, "email")],
      ["Status", record.status],
      ["Mailing Address", record.mailingAddress]
    ], [
      ["Skills", record.skills],
      ["Emergency Contact", isCrewRole() ? "" : record.emergency],
      ["Notes", canOwnerEdit() ? record.notes : ""]
    ], profileAvatarLarge(record, record.hideHeadshot));
  } else if (storeName === "promoters") {
    readOnlyProfileCard(record.name || record.contactName, record.companyName || "Promoter", [
      ["Rep / Office", record.contactName],
      ["Phone", record.phone],
      ["Email", record.email],
      ["Login", record.authUserId ? "Connected" : "Not connected"]
    ], [
      ["Billing Notes", record.billing],
      ["Production Notes", record.notes]
    ], profileAvatarLarge(record, false));
  } else if (storeName === "venues") {
    readOnlyProfileCard(record.name, "Venue", [
      ["Address", record.address],
      ["Main Contact", record.contactName],
      ["Phone", record.phone],
      ["Email", record.email],
      ["Parking", record.parking]
    ], [
      ["Venue Contacts", venueContactsForVenue(record.id).map((contact) => `${contact.name || contact.contactName || "Contact"}${contact.title ? `, ${contact.title}` : ""} ${contact.phone || ""} ${contact.email || ""}`).join("\n")],
      ["Notes", record.notes]
    ]);
  } else if (storeName === "events") {
    const venue = getVenue(record.venueId);
    const promoter = getPromoter(record.promoterId);
    readOnlyProfileCard(record.name, record.type || "Event", [
      ["Start", formatDate(record.startDate)],
      ["End", formatDate(record.endDate)],
      ["Venue", venue?.name],
      ["Promoter", promoterLabel(promoter)],
      ["Production Contact", record.productionContact]
    ], [
      ["Assigned Crew", eventWorkerIds(record).map((workerId) => getWorker(workerId)?.name).filter(Boolean).join(", ")],
      ["Notes", record.notes]
    ]);
  } else if (storeName === "timecards") {
    const worker = getWorker(record.workerId);
    const event = getEvent(record.eventId);
    const rateDetails = canViewRates() ? [["Pay Basis", payBasis(record)], ["Estimated Pay", currency(estimatedPay(record))]] : [];
    readOnlyProfileCard(worker?.name || "Timecard", event?.name || record.eventName || "Timecard", [
      ["Call", formatDate(record.clockIn)],
      ["Lunch Out", formatDate(record.lunchOut)],
      ["Lunch In", formatDate(record.lunchIn)],
      ["Wrap", formatDate(record.clockOut)],
      ["Hours", timecardHours(record).toFixed(2)],
      ...rateDetails
    ], [["Notes", record.notes]]);
  } else if (storeName === "vehicleLogs") {
    const event = getEvent(record.eventId);
    const worker = getWorker(record.workerId);
    readOnlyProfileCard(record.vehicleType || "Vehicle Check", event?.name || "Vehicle", [
      ["Runner", worker?.name],
      ["Phase", record.phase || "Start"],
      ["Plate", record.plateNumber],
      ["Gas Gauge", record.gasGauge],
      ["Scheduled Date", formatDate(record.scheduledDate)]
    ], [
      ["Prior Damage", record.priorDamage],
      ["Notes", record.notes]
    ]);
  } else if (storeName === "accidentReports") {
    readOnlyProfileCard(record.title, record.type || "Report", [
      ["Event", getEvent(record.eventId)?.name],
      ["Worker", getWorker(record.workerId)?.name],
      ["Reported", formatDate(record.reportedAt)],
      ["Location", record.incidentLocation]
    ], [
      ["Details", record.details],
      ["Damage / Injury Notes", record.injuryDescription || record.vehicleDamageDescription]
    ]);
  } else if (storeName === "runnerStops") {
    readOnlyProfileCard(record.name, record.category || "Gig Directory", [
      ["Phone", record.phone],
      ["City", record.city],
      ["State", record.state],
      ["Address", record.address],
      ["Hours", record.hours],
      ["Best Use", record.bestUse]
    ], [["Notes", record.notes]]);
  } else {
    readOnlyProfileCard(record.name || record.title || "Record", storeName, Object.entries(record).slice(0, 8));
  }
  openForm("recordView");
}

function activeClientRecord() {
  const clientId = authState.roleRecord?.client_id || "";
  return state.clients.find((client) => client.id === clientId) || null;
}

function activeClientRepRecord() {
  const clientId = authState.roleRecord?.client_id || "";
  const userId = authState.user?.id || "";
  const email = normalizedMatchValue(authState.user?.email || "");
  return state.clientReps.find((rep) => rep.authUserId === userId)
    || state.clientReps.find((rep) => rep.clientId === clientId && normalizedMatchValue(rep.email) === email)
    || null;
}

function activePromoterRecord() {
  return getPromoter(state.activePromoterId) || null;
}

function clientRepDefaults() {
  return {
    id: authState.user?.id || crypto.randomUUID(),
    clientId: authState.roleRecord?.client_id || "",
    authUserId: authState.user?.id || "",
    name: authState.user?.user_metadata?.name || "",
    email: authState.user?.email || "",
    phone: authState.user?.user_metadata?.phone || "",
    accessLevels: ["CLIENT_REP"],
    emailRoutingStatus: "Not configured"
  };
}

function normalizedMatchValue(value) {
  return String(value || "").trim().toLowerCase();
}

function findMatchingClientAccount(record) {
  const company = normalizedMatchValue(record.name);
  const email = normalizedMatchValue(record.email);
  const loginEmail = normalizedMatchValue(record.loginEmail);
  return state.clients.find((client) => {
    if (record.id && client.id === record.id) return true;
    const sameCompany = company && normalizedMatchValue(client.name) === company;
    const sameLogin = loginEmail && normalizedMatchValue(client.loginEmail || client.email) === loginEmail;
    const sameEmail = email && normalizedMatchValue(client.email) === email;
    return sameCompany || sameLogin || sameEmail;
  }) || null;
}

function clientRepFromClientAccount(client) {
  const email = client.loginEmail || client.email || "";
  const existing = state.clientReps.find((rep) => rep.clientId === client.id && normalizedMatchValue(rep.email) === normalizedMatchValue(email))
    || state.clientReps.find((rep) => rep.clientId === client.id)
    || null;
  return {
    ...(existing || {}),
    id: existing?.id || client.authUserId || `client-rep-${client.id}`,
    clientId: client.id,
    authUserId: client.authUserId || existing?.authUserId || "",
    name: client.contactName || existing?.name || client.name || "Client Rep",
    title: existing?.title || "Client Rep",
    email,
    phone: client.phone || existing?.phone || "",
    mailingAddress: existing?.mailingAddress || "",
    accessLevels: ensureClientRepAccessLevels(existing?.accessLevels || client.accessLevels, "CLIENT_ADMIN"),
    emailRoutingStatus: existing?.emailRoutingStatus || "Not configured"
  };
}

async function upsertClientRepForClientAccount(client) {
  const rep = clientRepFromClientAccount(client);
  await put("clientReps", rep);
  return rep;
}

function clientEmailRoutingSummary(rep) {
  if (!rep) return `<div class="compact-item empty">No rep profile connected yet.</div>`;
  return `<div class="compact-item">
    <strong>${escapeHtml(rep.name || "My profile")}</strong>
    <span>${escapeHtml(smtpProviderLabel(rep.smtpProvider))} · ${escapeHtml(rep.emailRoutingStatus || "Not configured")}</span>
    <p>${escapeHtml(rep.smtpFromEmail || rep.email || "")}</p>
  </div>`;
}

function smtpRouteIsReady(profile) {
  return !!(profile?.smtpProvider && profile?.smtpFromEmail && profile?.smtpHost && profile?.smtpPort && profile?.smtpUsername && profile?.smtpSecretRef);
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
  const clientSmtpTestButton = smtpRouteIsReady(profile)
    ? `<button class="tiny-button owner-action" data-send-smtp-test="client" type="button">Test SMTP</button>`
    : "";
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
      <div><span>Email Provider</span><strong>${escapeHtml(smtpProviderLabel(profile.smtpProvider))}</strong></div>
      <div><span>Routing Status</span><strong>${escapeHtml(profile.emailRoutingStatus || "Not configured")}</strong></div>
      <div><span>From Email</span><strong>${escapeHtml(profile.smtpFromEmail || "")}</strong></div>
      <div><span>Reply-To</span><strong>${escapeHtml(profile.smtpReplyTo || "")}</strong></div>
      <div><span>SMTP Username</span><strong>${escapeHtml(profile.smtpUsername || "")}</strong></div>
      <div><span>Security</span><strong>${escapeHtml(profile.smtpSecure || "Not selected")}</strong></div>
    </div>
    <div class="profile-section"><span>SMTP Host</span><p>${escapeHtml(profile.smtpHost || "")}${profile.smtpPort ? ":" + escapeHtml(profile.smtpPort) : ""}</p></div>
    <div class="profile-section"><span>SMTP Route</span><p>${escapeHtml(profile.smtpSecretRef ? "Saved securely" : "No app password saved")}</p><div class="row-actions">${clientSmtpTestButton}</div></div>
  </article>`;
  if (companyCard) {
    const rateSummary = client ? `
      <div class="profile-section"><span>Default Pay Rates</span><p>${currency(client.defaultDayRate || 0)}/${client.defaultIncludedHours || 10} hrs, +${currency(client.defaultAdditionalRate || 0)}/hr</p><p>Rented vehicle: ${currency(client.defaultRentedVehicleRate || 0)} | Personal vehicle: ${currency(client.defaultPersonalVehicleRate || 0)}</p></div>` : "";
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
        <div><span>Package Layouts</span><strong>${clientPackageBadges(client.packageLayouts)}</strong></div>
      </div>
      ${rateSummary}
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
    </div>
    <div class="profile-detail-grid">
      <div><span>Access Role</span><strong>ADMIN</strong></div>
      <div><span>System Access</span><strong>Client setup and troubleshooting</strong></div>
      <div><span>Email Provider</span><strong>${escapeHtml(smtpProviderLabel(profile.smtpProvider))}</strong></div>
      <div><span>Routing Status</span><strong>${escapeHtml(profile.emailRoutingStatus || "Not configured")}</strong></div>
      <div><span>From Email</span><strong>${escapeHtml(profile.smtpFromEmail || "")}</strong></div>
      <div><span>Reply-To</span><strong>${escapeHtml(profile.smtpReplyTo || "")}</strong></div>
    </div>
    <div class="profile-section"><span>SMTP Host</span><p>${escapeHtml(profile.smtpHost || "")}${profile.smtpPort ? ":" + escapeHtml(profile.smtpPort) : ""}</p></div>
    <div class="profile-section"><span>SMTP Route</span><p>${escapeHtml(profile.smtpSecretRef ? "Saved securely" : "No app password saved")}</p><div class="row-actions"><button class="tiny-button system-action" data-open-form="adminProfileForm" type="button">SMTP Settings</button><button class="tiny-button system-action" data-send-smtp-test="admin" type="button">Send Test Email</button></div></div>
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
  renderEventAssignmentManager($("#eventForm"));
  $("#eventAssignmentForm select[name='workerId']").innerHTML = workerOptions;
  $("#substitutionSwapForm select[name='replacementWorkerId']").innerHTML = workerOptions;

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
  renderCrewMobileHome();
  renderMobileDeviceStatus();
  renderMobileQaPanel();
  renderMobileLaunchPanel();
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
    ...((hasDataScope("CLIENT") || hasDataScope("PROMOTER")) ? state.venues.map((item) => ({ type: "Venue", name: item.name, text: item.notes || item.parking, updatedAt: item.updatedAt })) : []),
    ...((hasDataScope("CLIENT") || hasDataScope("PROMOTER")) ? visiblePromoters().map((item) => ({ type: "Promoter", name: promoterLabel(item), text: item.notes, updatedAt: item.updatedAt })) : []),
    ...((hasDataScope("CLIENT") || hasDataScope("PROMOTER")) ? state.runnerStops.map((item) => ({ type: "Runner", name: item.name, text: item.notes || item.bestUse, updatedAt: item.updatedAt })) : [])
  ].filter((item) => item.text).sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

  $("#recentNotes").innerHTML = noteItems.length
    ? noteItems.slice(0, 8).map((item) => `<div class="compact-item"><strong>${escapeHtml(item.type)}: ${escapeHtml(item.name)}</strong><span>${escapeHtml(item.text)}</span></div>`).join("")
    : `<div class="compact-item empty">Notes will appear here as you add them.</div>`;
}

function renderMobileDeviceStatus() {
  const panel = $("#mobileDevicePanel");
  const mode = $("#mobileDeviceMode");
  const status = $("#mobileDeviceStatus");
  if (!panel || !mode || !status) return;
  panel.hidden = !isAdminRole();
  if (!isAdminRole()) {
    status.innerHTML = "";
    mode.textContent = "";
    return;
  }
  const info = mobileRuntimeInfo();
  mode.textContent = info.native ? `${info.platform} app` : "web browser";
  const pwaReady = "serviceWorker" in navigator && ["http:", "https:"].includes(window.location.protocol);
  status.innerHTML = [
    ["Runtime", info.native ? "Native wrapper" : "Web app", info.native],
    ["Network", info.online ? "Online" : "Offline", info.online],
    ["PWA Shell", pwaReady ? "Ready" : "Deploy to test", pwaReady],
    ["Push Bridge", info.pushReady ? "Available" : "Web only", info.pushReady],
    ["Push Token", info.pushTokenReady ? "Saved" : "Not registered", info.pushTokenReady],
    ["Camera Bridge", info.cameraReady ? "Available" : "Browser upload", info.cameraReady],
    ["Location Bridge", info.geolocationReady ? "Available" : "Browser location", info.geolocationReady]
  ].map(([label, value, ready]) => `<div class="mobile-device-item ${ready ? "ready" : "pending"}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
}

async function requestMobilePermissions(options = {}) {
  const plugins = capacitorBridge()?.Plugins || {};
  const results = [];
  try {
    if (plugins.Geolocation?.requestPermissions) {
      const result = await plugins.Geolocation.requestPermissions();
      results.push(`Location: ${result.location || result.coarseLocation || "requested"}`);
    } else if (navigator.geolocation) {
      await browserCurrentPosition();
      results.push("Location: requested");
    } else {
      results.push("Location: unavailable");
    }
  } catch (error) {
    results.push("Location: not granted");
  }
  try {
    if (plugins.PushNotifications?.requestPermissions) {
      const result = await plugins.PushNotifications.requestPermissions();
      results.push(`Push: ${result.receive || "requested"}`);
      if (result.receive === "granted") {
        initPushRegistrationListeners();
        await plugins.PushNotifications.register();
      }
    } else if ("Notification" in window) {
      const result = await Notification.requestPermission();
      results.push(`Push: ${result}`);
    } else {
      results.push("Push: unavailable");
    }
  } catch (error) {
    results.push("Push: not granted");
  }
  renderMobileDeviceStatus();
  localStorage.setItem(mobilePermissionStorageKey(), new Date().toISOString());
  toast(options.message || results.join(" · "));
  return results;
}

async function maybePromptForMobilePermissions({ force = false } = {}) {
  if (!authState.session) return;
  if (!shouldCheckPhonePermissions()) return;
  const alreadyPrompted = localStorage.getItem(mobilePermissionStorageKey());
  if (!force && alreadyPrompted) return;
  const permissions = await checkMobilePermissions();
  if (!mobilePermissionsNeedSetup(permissions)) {
    localStorage.setItem(mobilePermissionStorageKey(), new Date().toISOString());
    return;
  }
  const shouldRequest = window.confirm("Production Crew needs phone permissions for location and notifications. Camera access is only requested when taking or uploading a photo. Set location and notifications now?");
  if (!shouldRequest) {
    localStorage.setItem(mobilePermissionStorageKey(), new Date().toISOString());
    toast("You can set phone permissions later from Mobile Beta.");
    return;
  }
  await requestMobilePermissions({ message: "Location and notification permissions checked." });
}

function renderMobileQaPanel() {
  const panel = $("#mobileQaPanel");
  const list = $("#mobileQaList");
  const count = $("#mobileQaCount");
  if (!panel || !list || !count) return;
  panel.hidden = !isAdminRole();
  if (!isAdminRole()) {
    list.innerHTML = "";
    count.textContent = "";
    return;
  }
  const info = mobileRuntimeInfo();
  const checks = [
    ["Login", !!authState.session, "Session active"],
    ["Crew profile", !!state.activeWorkerId || !isCrewRole(), isCrewRole() ? "Crew selected" : "Not crew view"],
    ["Assigned events", visibleEvents().length > 0 || !isCrewRole(), `${visibleEvents().length} visible`],
    ["Time clock", visibleEvents().length > 0 && isCrewRole(), "Punch flow ready"],
    ["Vehicle photos", visibleRecords(state.vehicleLogs).length > 0, `${visibleRecords(state.vehicleLogs).length} checks`],
    ["Reports", visibleRecords(state.accidentReports).length > 0, `${visibleRecords(state.accidentReports).length} reports`],
    ["Messaging", !!sendbirdClient?.currentUser, sendbirdClient?.currentUser ? "Connected" : "Needs connect"],
    ["Connection", info.online, info.online ? "Online" : "Offline"],
    ["Location", info.geolocationReady || !!navigator.geolocation, info.geolocationReady ? "Native ready" : "Browser ready"],
    ["Push", info.pushTokenReady || info.pushReady, info.pushTokenReady ? "Token saved" : info.pushReady ? "Native ready" : "Native test pending"]
  ];
  const readyCount = checks.filter(([, ready]) => ready).length;
  count.textContent = `${readyCount}/${checks.length} ready`;
  list.innerHTML = checks.map(([label, ready, detail]) => `<div class="mobile-qa-item ${ready ? "ready" : "pending"}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(detail)}</strong></div>`).join("");
}

function renderMobileLaunchPanel() {
  const panel = $("#mobileLaunchPanel");
  const list = $("#mobileLaunchList");
  const count = $("#mobileLaunchCount");
  if (!panel || !list || !count) return;
  panel.hidden = !isAdminRole();
  if (!isAdminRole()) {
    list.innerHTML = "";
    count.textContent = "";
    return;
  }
  const info = mobileRuntimeInfo();
  const pwaReady = "serviceWorker" in navigator && ["http:", "https:"].includes(window.location.protocol);
  const checks = [
    ["App wrapper", true, "Capacitor iOS/Android folders installed"],
    ["App identity", true, "Manifest and placeholder icon added"],
    ["PWA app shell", pwaReady, pwaReady ? "Install/offline shell ready" : "Available after deploy"],
    ["Crew workflow", isCrewRole() ? visibleEvents().length > 0 : state.events.length > 0, "Assigned event flow available"],
    ["Photo upload", true, "Camera opens only from photo fields"],
    ["Location capture", info.geolocationReady || !!navigator.geolocation, info.geolocationReady ? "Native bridge ready" : "Browser location ready"],
    ["Push path", info.pushTokenReady || info.pushReady, info.pushTokenReady ? "Device token saved" : info.pushReady ? "Native bridge ready" : "Needs native-device test"],
    ["Messaging", !!SENDBIRD_APP_ID, "Sendbird app ID configured"],
    ["Notifications", !!NOVU_TRIGGER_FUNCTION, "Novu trigger function named"],
    ["Offline notice", true, "Connection banner active"],
    ["Store assets", false, "Final logo, screenshots, privacy copy pending"]
  ];
  const readyCount = checks.filter(([, ready]) => ready).length;
  count.textContent = `${readyCount}/${checks.length} ready`;
  list.innerHTML = checks.map(([label, ready, detail]) => `<div class="mobile-launch-item ${ready ? "ready" : "pending"}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(detail)}</strong></div>`).join("");
}

function renderMobileInstallPanel() {
  const status = $("#mobileInstallStatus");
  const button = $("#mobileInstallButton");
  if (!status || !button) return;
  if (!isAdminRole()) {
    status.textContent = "";
    button.hidden = true;
    return;
  }
  const canPrompt = !!installPromptEvent;
  const secureWeb = ["http:", "https:"].includes(window.location.protocol);
  const installed = appInstallState === "installed" || window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone;
  if (installed) {
    status.textContent = "Installed";
    button.hidden = true;
  } else if (canPrompt) {
    status.textContent = "Ready";
    button.hidden = false;
  } else if (secureWeb) {
    status.textContent = "Use browser menu";
    button.hidden = true;
  } else {
    status.textContent = "Deploy to test";
    button.hidden = true;
  }
}

async function promptMobileAppInstall() {
  if (!installPromptEvent) {
    toast("Use Safari Share or Chrome menu to add it to your phone.");
    renderMobileInstallPanel();
    return;
  }
  installPromptEvent.prompt();
  const choice = await installPromptEvent.userChoice.catch(() => null);
  appInstallState = choice?.outcome === "accepted" ? "installed" : "dismissed";
  installPromptEvent = null;
  renderMobileInstallPanel();
  toast(appInstallState === "installed" ? "App install started." : "Install skipped for now.");
}

async function registerAppShellServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!["http:", "https:"].includes(window.location.protocol)) return;
  try {
    const registration = await navigator.serviceWorker.register("./sw.js");
    if (registration.waiting) registration.waiting.postMessage({ type: "SKIP_WAITING" });
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          toast("Mobile app shell updated. Refresh when ready.");
        }
      });
    });
  } catch (error) {
    console.warn("Service worker registration failed", error);
  }
}

function renderConnectionBanner() {
  const banner = $("#connectionBanner");
  if (!banner) return;
  const online = navigator.onLine !== false;
  banner.hidden = online;
  banner.innerHTML = online ? "" : `<strong>Offline mode</strong><span>Signal is down. Local screens may still work, but cloud login, messages, email, and Supabase updates need connection.</span>`;
}

function renderCrewMobileHome() {
  const panel = $("#crewMobileHome");
  if (!panel) return;
  panel.hidden = !isCrewRole();
  if (!isCrewRole()) return;
  const events = [...visibleEvents()].sort((a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0));
  const activeCard = state.timecards.find((card) => card.workerId === state.activeWorkerId && card.clockIn && !card.clockOut);
  const activeEvent = activeCard ? getEvent(activeCard.eventId) : null;
  const focusEvent = activeEvent || events[0];
  const focusCard = focusEvent ? timecardForCrewEvent(focusEvent.id) : null;
  const venue = focusEvent ? getVenue(focusEvent.venueId) : null;
  const punch = focusEvent ? nextCrewPunch(focusCard) : null;
  $("#crewMobileStatus").textContent = events.length ? `${events.length} assigned` : "No assigned events";
  $("#crewMobileHero").innerHTML = focusEvent
    ? `<strong>${escapeHtml(focusEvent.name)}</strong>
      <span>${escapeHtml(venue?.name || "No venue")} ${focusEvent.startDate ? "- " + formatDate(focusEvent.startDate) : ""}</span>
      <p>${escapeHtml(activeCard ? "You are currently clocked in." : crewEventStatus(focusCard))}</p>`
    : `<strong>No assigned event</strong><span>When an event is assigned, it will appear here.</span><p>Use the directory and messages if you need to check in with the office.</p>`;
  $("#crewMobileActions").innerHTML = focusEvent
    ? `<button class="primary-action" data-time-punch="${escapeHtml(punch.field)}" data-event-id="${escapeHtml(focusEvent.id)}" type="button">${escapeHtml(punch.label)}</button>
      <button class="ghost-button" data-mobile-go-view="vehicles" type="button">Vehicle Photos</button>
      <button class="ghost-button" data-mobile-go-view="reports" type="button">Report</button>
      <button class="ghost-button" data-mobile-go-view="messages" type="button">Messages</button>`
    : `<button class="primary-action" data-mobile-go-view="messages" type="button">Messages</button>
      <button class="ghost-button" data-mobile-go-view="runner" type="button">Gig Directory</button>`;
  $("#crewMobileTasks").innerHTML = crewMobileTaskCards(events, activeCard).join("");
}

function timecardForCrewEvent(eventId) {
  const today = localDateKey();
  const cards = state.timecards.filter((card) => card.eventId === eventId && card.workerId === state.activeWorkerId);
  return cards.find((card) => timecardWorkDate(card) === today && !card.clockOut)
    || cards.find((card) => timecardWorkDate(card) === today)
    || cards.find((card) => !card.clockOut)
    || cards[0]
    || null;
}

function nextCrewPunch(card) {
  if (!card?.clockIn) return { field: "clockIn", label: "Call Time" };
  if (!card.lunchOut) return { field: "lunchOut", label: "Lunch Out" };
  if (!card.lunchIn) return { field: "lunchIn", label: "Lunch In" };
  if (!card.clockOut) return { field: "clockOut", label: "Wrap" };
  return { field: "clockIn", label: "New Call Time" };
}

function crewEventStatus(card) {
  if (!card?.clockIn) return "Ready for Call Time.";
  if (!card.lunchOut) return "Call Time is set. Lunch Out is next.";
  if (!card.lunchIn) return "Lunch Out is set. Lunch In is next.";
  if (!card.clockOut) return "Lunch is complete. Wrap is next.";
  return "Timecard is wrapped.";
}

function crewMobileTaskCards(events, activeCard) {
  const tasks = [];
  if (activeCard) {
    const activeEvent = getEvent(activeCard.eventId);
    tasks.push(["Live Timecard", `${activeEvent?.name || activeCard.eventName || "Current event"} is running.`, "clock"]);
  }
  const rentalTasks = events
    .map((event) => crewRentalTask(event, timecardForCrewEvent(event.id)))
    .filter(Boolean);
  tasks.push(...rentalTasks.slice(0, 2));
  events.slice(0, 3).forEach((event) => {
    const venue = getVenue(event.venueId);
    tasks.push(["Assigned Event", `${event.name}${venue?.name ? " at " + venue.name : ""}`, "events"]);
  });
  if (!tasks.length) tasks.push(["No urgent tasks", "Assigned event tasks will appear here.", "events"]);
  return tasks.slice(0, 5).map(([label, text, view]) => `<button class="crew-mobile-task" data-mobile-go-view="${escapeHtml(view)}" type="button"><b>${escapeHtml(label)}</b><span>${escapeHtml(text)}</span></button>`);
}

function crewRentalTask(event, card) {
  const assignment = assignmentForEventWorker(event.id, state.activeWorkerId);
  const needsRental = rentalVehicleRequired(event, card || assignment || {});
  if (!needsRental) return null;
  const startLog = vehicleLogForEventWorker(event.id, state.activeWorkerId, "Start");
  const endLog = vehicleLogForEventWorker(event.id, state.activeWorkerId, "End");
  if (card?.clockOut && !vehicleEndPhotosComplete(endLog)) return ["End Vehicle Photos", `${event.name} still needs end photos and plate number.`, "vehicles"];
  if (card?.clockIn && !vehicleStartCheckStarted(startLog)) return ["Start Vehicle Photos", `${event.name} needs start photos and plate number.`, "vehicles"];
  return null;
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
        const publicAccessButton = `<button class="tiny-button" data-event-access="${event.id}" type="button">Production Link</button>`;
        const gigDirectoryButton = eventGigSearchText(event, venue)
          ? `<button class="tiny-button" data-event-gig-search="${event.id}" type="button">City Resources</button>`
          : "";
        return `<article class="record-card"><div><span>${escapeHtml(event.type || "Event")}</span><strong>${escapeHtml(event.name)}</strong><p>${escapeHtml(venue?.name || "")}</p><p>${escapeHtml(promoterLabel(promoter))}</p><p>${escapeHtml(crew || "No runners assigned")}</p></div><div><span>${formatDate(event.startDate)}</span><span>${formatDate(event.endDate)}</span><div class="row-actions">${gigDirectoryButton}${publicAccessButton}</div></div></article>`;
      }).join("")
    : `<div class="compact-item empty">No production-board events match this view.</div>`;

  $("#runnerStatusTable").innerHTML = runners.length
    ? runners.map((worker) => {
        const eventsForWorker = events.filter((event) => eventWorkerIds(event).includes(worker.id)).map((event) => event.name).join(", ");
        const status = worker.runnerStatus || "Available";
        return `<tr><td>${profileCell(worker, worker.hideHeadshot, worker.email)}</td><td>${escapeHtml(eventsForWorker)}</td><td><span class="status-pill ${status === "On a Run" ? "warn" : ""}">${escapeHtml(status)}</span></td><td>${escapeHtml(worker.phone)}<p>${escapeHtml(worker.email)}</p></td><td><div class="row-actions"><button class="tiny-button" data-runner-status="${worker.id}" data-status="Available" type="button">Available</button><button class="tiny-button" data-runner-status="${worker.id}" data-status="On a Run" type="button">On a Run</button><button class="tiny-button" data-runner-status="${worker.id}" data-status="At Production Office" type="button">At Office</button><button class="tiny-button" data-notify-production-office="${worker.id}" type="button">Notify Office</button></div></td></tr>`;
      }).join("")
    : `<tr><td colspan="5" class="empty">Assigned runners will appear here.</td></tr>`;
}

function renderPublicEventAccess(data) {
  const event = data.event || {};
  const venue = data.venue || {};
  const promoter = data.promoter || {};
  const crew = data.crew || [];
  const gigResources = data.gigResources || [];
  const citySearch = data.gigResourceSearch || eventGigSearchText(event, venue);
  const resourceButton = citySearch
    ? `<button class="tiny-button" data-public-gig-resources type="button">City Resources</button>`
    : "";
  $("#publicEventContent").innerHTML = `<div class="public-event-summary">
    <span>${escapeHtml(event.type || "Event")}</span>
    <h1>${escapeHtml(event.name || "Production Event")}</h1>
    <p>${escapeHtml(formatDate(event.startDate))}${event.endDate ? " - " + escapeHtml(formatDate(event.endDate)) : ""}</p>
    <p>${escapeHtml(venue.name || "Venue not listed")}</p>
    <div class="row-actions">${resourceButton}</div>
  </div>
  <div class="public-event-grid">
    <section>
      <h3>Event Details</h3>
      <p><strong>Production contact</strong><br>${escapeHtml(event.productionContact || "")}</p>
      <p><strong>Promoter rep</strong><br>${escapeHtml(promoterLabel(promoter) || "")}</p>
      <p><strong>Notes</strong><br>${escapeHtml(event.notes || "")}</p>
    </section>
    <section>
      <h3>Venue</h3>
      <p>${escapeHtml(venue.address || "")}</p>
      <p><strong>Parking</strong><br>${escapeHtml(venue.parking || "")}</p>
      <p><strong>Contact</strong><br>${escapeHtml(venue.contactName || "")} ${escapeHtml(venue.phone || "")} ${escapeHtml(venue.email || "")}</p>
    </section>
  </div>
  <section class="public-runner-panel">
    <h3>Runner Status</h3>
    <div class="public-runner-list">
      ${crew.length ? crew.map((worker) => publicRunnerCard(worker)).join("") : `<div class="compact-item empty">No runners are assigned to this event.</div>`}
    </div>
  </section>
  <section id="publicGigResources" class="public-runner-panel">
    <h3>City Resources${citySearch ? `: ${escapeHtml(citySearch)}` : ""}</h3>
    <div class="public-runner-list">
      ${gigResources.length ? gigResources.map((stop) => publicGigResourceCard(stop)).join("") : `<div class="compact-item empty">No city resources were attached to this event link yet.</div>`}
    </div>
  </section>`;
}

function publicGigResourceCard(stop) {
  const location = [stop.city, stop.state].filter(Boolean).join(", ");
  return `<article class="compact-item">
    <strong>${escapeHtml(stop.name || "Resource")}</strong>
    <span>${escapeHtml(stop.category || "Gig Directory")}${location ? ` - ${escapeHtml(location)}` : ""}</span>
    <p>${escapeHtml(stop.address || "")}</p>
    <p>${escapeHtml(stop.phone || "")}${stop.hours ? ` | ${escapeHtml(stop.hours)}` : ""}</p>
    <p>${escapeHtml(stop.bestUse || "")}</p>
  </article>`;
}

function publicRunnerCard(worker) {
  const status = worker.runnerStatus || "Available";
  return `<article class="compact-item">
    <strong>${escapeHtml(worker.name || "Runner")}</strong>
    <span>${escapeHtml(worker.phone || "")} ${escapeHtml(worker.email || "")}</span>
    <p><span class="status-pill ${status === "On a Run" ? "warn" : ""}">${escapeHtml(status)}</span></p>
    <div class="row-actions">
      <button class="tiny-button" data-public-runner-status="${worker.id}" data-status="Available" type="button">Available</button>
      <button class="tiny-button" data-public-runner-status="${worker.id}" data-status="On a Run" type="button">On a Run</button>
      <button class="tiny-button" data-public-runner-status="${worker.id}" data-status="At Production Office" type="button">At Office</button>
    </div>
  </article>`;
}

function renderProductionResponse() {
  const container = $("#productionResponseCards");
  if (!container) return;
  const events = isCrewRole() ? visibleEvents() : [];
  $("#productionResponseCount").textContent = `${events.length} assigned`;
  container.innerHTML = events.length
    ? events.map((event) => {
        const worker = getWorker(state.activeWorkerId) || {};
        const venue = getVenue(event.venueId);
        const status = worker.runnerStatus || "Available";
        return `<article class="record-card">
          <div class="record-card-main">
            <strong>${escapeHtml(event.name)}</strong>
            <span>${escapeHtml(venue?.name || "No venue")} ${event.startDate ? "- " + formatDate(event.startDate) : ""}</span>
            <p><span class="status-pill ${status === "On a Run" ? "warn" : ""}">${escapeHtml(status)}</span></p>
          </div>
          <div class="row-actions">
            <button class="tiny-button" data-runner-status="${state.activeWorkerId}" data-status="Available" type="button">Available</button>
            <button class="tiny-button" data-runner-status="${state.activeWorkerId}" data-status="On a Run" type="button">On a Run</button>
            <button class="tiny-button" data-runner-status="${state.activeWorkerId}" data-status="At Production Office" type="button">At Office</button>
          </div>
        </article>`;
      }).join("")
    : `<div class="compact-item empty">Assigned events will appear here.</div>`;
}

async function loadPublicEventAccess() {
  if (!initializeSupabaseClient()) {
    showPublicEventScreen("Public event access is not configured.");
    return;
  }
  const token = publicEventTokenFromUrl();
  if (!token) {
    showPublicEventScreen("This event link is missing its access token.");
    return;
  }
  showPublicEventScreen();
  const { data, error } = await supabaseClient.functions.invoke(PUBLIC_EVENT_ACCESS_FUNCTION, {
    body: { action: "get", token }
  });
  if (error) {
    console.error(error);
    showPublicEventScreen(await loginSetupErrorMessage(error));
    return;
  }
  renderPublicEventAccess(data || {});
}

async function updatePublicRunnerStatus(workerId, status) {
  const token = publicEventTokenFromUrl();
  if (!token || !workerId) return;
  const { data, error } = await supabaseClient.functions.invoke(PUBLIC_EVENT_ACCESS_FUNCTION, {
    body: { action: "runnerStatus", token, workerId, status }
  });
  if (error) {
    console.error(error);
    toast(await loginSetupErrorMessage(error));
    return;
  }
  renderPublicEventAccess(data || {});
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

function assignmentPayLine(assignment, event) {
  return `${currency(assignment.dayRate || event.dayRate || activeClientRecord()?.defaultDayRate || 0)}/${assignment.includedHours || event.includedHours || activeClientRecord()?.defaultIncludedHours || 10} hrs, +${currency(assignment.additionalRate || event.additionalRate || activeClientRecord()?.defaultAdditionalRate || 0)}/hr`;
}

function assignmentTable(event) {
  const assignments = eventAssignments(event.id);
  if (!assignments.length) return `<p>No detailed runner assignments yet.</p>`;
  return `<table class="mini-table"><thead><tr><th>Runner</th><th>Dates</th><th>Vehicle</th><th>License Plate</th><th>Rate</th><th></th></tr></thead><tbody>${assignments.map((assignment) => {
    const worker = getWorker(assignment.workerId);
    const plate = assignmentLicensePlate(assignment);
    const actions = canAdminEdit()
      ? `<div class="row-actions"><button class="tiny-button" data-edit="eventAssignments" data-id="${assignment.id}" data-form="eventAssignmentForm" type="button">Edit</button><button class="tiny-button danger" data-delete="eventAssignments" data-id="${assignment.id}" type="button">Delete</button></div>`
      : "";
    return `<tr><td>${escapeHtml(worker?.name || "Unassigned")}</td><td>${formatDate(assignment.startDate)}<p>${formatDate(assignment.endDate)}</p></td><td>${escapeHtml(assignment.vehicleUse || "No Vehicle")}<p>${escapeHtml(assignment.vehicleType || "")}</p><p>Plate: ${escapeHtml(plate || "Not set")}</p></td><td>${escapeHtml(plate || "Not set")}</td><td>${canViewRates() ? assignmentPayLine(assignment, event) : ""}</td><td>${actions}</td></tr>`;
  }).join("")}</tbody></table>`;
}

function assignmentLicensePlate(assignment) {
  const logs = state.vehicleLogs.filter((log) => {
    if (assignment.id && log.assignmentId === assignment.id) return true;
    return log.eventId === assignment.eventId && log.workerId === assignment.workerId;
  });
  const startPlate = logs.find((log) => String(log.phase || "").toLowerCase() === "start")?.plateNumber;
  const endPlate = logs.find((log) => String(log.phase || "").toLowerCase() === "end")?.plateNumber;
  return startPlate || endPlate || "";
}

function eventCard(event) {
  const venue = getVenue(event.venueId);
  const promoter = getPromoter(event.promoterId);
  const crew = eventWorkerIds(event).map((id) => getWorker(id)?.name).filter(Boolean);
  const crewLine = isCrewRole() ? "Assigned to you" : (crew.join(", ") || "No crew assigned");
  const gigSearch = eventGigSearchText(event);
  const gigDirectoryButton = canOpenView("runner") && gigSearch
    ? `<button class="tiny-button" data-event-gig-search="${event.id}" type="button">City Resources</button>`
    : "";
  const publicAccessButton = (isClientRole() || isProductionRole())
    ? `<button class="tiny-button" data-event-access="${event.id}" type="button">Production Link</button>`
    : "";
  const adminEventActions = canAdminEdit()
    ? `<button class="tiny-button" data-add-assignment="${event.id}" type="button">Add Runner</button><button class="tiny-button" data-swap-crew="${event.id}" type="button">Swap Crew</button><button class="tiny-button" data-substitute-crew="${event.id}" type="button">Substitution</button>`
    : "";
  const eventActions = `${gigDirectoryButton}${publicAccessButton}${adminEventActions}${actionButtons("events", event.id, "eventForm", "", canAdminEdit())}`;
  return `<article class="record-card">
    <div class="record-card-main">
      <strong>${recordLink("events", event.id, event.name)}</strong>
      <span>${escapeHtml(event.type)} ${event.startDate ? "- " + formatDate(event.startDate) : ""}</span>
      <p>${escapeHtml(venue?.name || "No venue")} | ${escapeHtml(promoterLabel(promoter) || "No promoter rep")}</p>
      <p>${escapeHtml(event.productionContact)}</p>
      <p>${escapeHtml(crewLine)}</p>
      ${assignmentTable(event)}
    </div>
    <details class="event-options">
      <summary class="tiny-button">Options</summary>
      <div class="event-options-menu">${eventActions}</div>
    </details>
  </article>`;
}

function canOpenView(view) {
  return combinedNavGroups().some((group) => group.items.some(([itemView]) => itemView === view));
}

function eventGigSearchText(event, venueOverride = null) {
  const venue = venueOverride || getVenue(event?.venueId);
  const explicit = [event?.city, event?.state].filter(Boolean).join(" ");
  if (explicit) return explicit;
  const address = venue?.address || "";
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 3) return `${parts.at(-3)} ${parts.at(-2)}`;
  if (parts.length >= 2) return parts.at(-2);
  return venue?.city || venue?.state ? [venue.city, venue.state].filter(Boolean).join(" ") : "";
}

function gigResourcesForEvent(event, venueOverride = null) {
  const search = eventGigSearchText(event, venueOverride).toLowerCase();
  if (!search) return [];
  const terms = search.split(/\s+/).map((term) => term.trim()).filter(Boolean);
  return state.runnerStops.filter((stop) => {
    const haystack = [stop.city, stop.state, stop.address, stop.name, stop.category, stop.bestUse].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  }).slice(0, 20);
}

function openGigDirectoryForEvent(eventId) {
  const event = getEvent(eventId);
  const search = eventGigSearchText(event);
  if (!search) {
    toast("Add a city or venue address first.");
    return;
  }
  state.search = search.toLowerCase();
  state.runnerCategory = "All";
  $("#globalSearch").value = search;
  setView("runner");
  toast(`Showing gig resources for ${search}.`);
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
  const card = timecardForCrewEvent(event.id);
  const rentalWarning = rentalVehicleRequired(event, card || {}) ? rentalClockWarning(event, card) : "";
  return `<article class="record-card clock-card">
    <div class="record-card-main">
      <strong>${escapeHtml(event.name)}</strong>
      <span>${escapeHtml(venue?.name || "No venue")} ${event.startDate ? "- " + formatDate(event.startDate) : ""}</span>
      <div class="punch-summary">
        ${punchSummaryItem("Call", card?.clockIn, card?.punchLocations?.clockIn)}
        ${punchSummaryItem("Lunch Out", card?.lunchOut, card?.punchLocations?.lunchOut)}
        ${punchSummaryItem("Lunch In", card?.lunchIn, card?.punchLocations?.lunchIn)}
        ${punchSummaryItem("Wrap", card?.clockOut, card?.punchLocations?.clockOut)}
      </div>
      ${rentalWarning}
    </div>
    <div class="clock-actions">
      <button class="primary-action" data-time-punch="clockIn" data-event-id="${event.id}" type="button">Call Time</button>
      <button class="primary-action" data-time-punch="lunchOut" data-event-id="${event.id}" type="button">Lunch Out</button>
      <button class="primary-action" data-time-punch="lunchIn" data-event-id="${event.id}" type="button">Lunch In</button>
      <button class="primary-action" data-time-punch="clockOut" data-event-id="${event.id}" type="button">Wrap</button>
    </div>
  </article>`;
}

function punchSummaryItem(label, value, location) {
  const set = !!value;
  const locationText = location ? `<small>Location saved</small>` : "";
  return `<span class="punch-summary-item ${set ? "is-set" : ""}"><b>${escapeHtml(label)}</b>${set ? escapeHtml(formatDate(value)) : "Not set"}${locationText}</span>`;
}

function rentalClockWarning(event, card) {
  if (!card?.clockIn || card.clockOut) return `<p><span class="status-pill warn">Rental photos required</span></p>`;
  const startLog = vehicleLogForEventWorker(event.id, state.activeWorkerId, "Start");
  if (vehicleStartCheckStarted(startLog)) return `<p><span class="status-pill">Rental start check received</span></p>`;
  const minutes = Math.floor((new Date() - new Date(card.clockIn)) / 60000);
  if (minutes >= 15) return `<p><span class="status-pill warn">Urgent: start vehicle photos and plate are overdue</span></p>`;
  return `<p><span class="status-pill warn">Reminder: submit start vehicle photos within ${Math.max(1, 15 - minutes)} min</span></p>`;
}

function actionButtons(store, id, formId, extra = "", allowed = canAdminEdit()) {
  if (!allowed) return extra || "";
  return `<details class="record-options">
    <summary class="tiny-button">Options</summary>
    <div class="record-options-menu">
      ${extra}
      <button class="tiny-button" data-edit="${store}" data-id="${id}" data-form="${formId}" type="button">Edit</button>
      <button class="tiny-button danger" data-delete="${store}" data-id="${id}" type="button">Delete</button>
    </div>
  </details>`;
}

function recordLink(store, id, label, className = "link-button") {
  return `<button class="${escapeHtml(className)}" data-view-record="${escapeHtml(store)}:${escapeHtml(id)}" type="button">${escapeHtml(label || "View")}</button>`;
}

function loginSetupButton(store, profile) {
  if (store === "clients" && !canSystemEdit()) return "";
  if (store === "workers" && !canOwnerEdit()) return "";
  if (store === "promoters" && !(canOwnerEdit() || isProductionRole())) return "";
  if (store === "promoters" && isProductionRole() && profileLoginRole(store, profile) !== "PROMOTER") return "";
  const email = profile.loginEmail || profile.email;
  if (!email) return "";
  const label = profile.inviteStatus === "Password reset sent" || profile.loginCompletedAt ? "Reset Password" : "Send Login Setup";
  return `<button class="tiny-button" data-send-login="${store}" data-id="${profile.id}" type="button">${escapeHtml(label)}</button>`;
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
  const showRates = canEditRates();
  const info = showLimited
    ? `${publicEmail ? `<p>${escapeHtml(publicEmail)}</p>` : ""}`
    : `${escapeHtml(worker.skills)}${showRates ? `<p>${currency(worker.defaultDayRate || worker.defaultRate || 0)}/${worker.defaultIncludedHours || 10} hrs</p>` : ""}${canOwnerEdit() ? `<p>${accessBadges(worker.accessLevels, "CREW")}</p>${loginStatus(worker)}` : ""}`;
  const note = isProductionRole() ? promoterNoteBox(worker.id) : "";
  return `<tr>
    <td>${profileSelect("workers", worker.id)}${profileCell(worker, showLimited && worker.hideHeadshot && worker.id !== state.activeWorkerId, publicEmail, "workers", worker.id)}</td>
    <td>${escapeHtml(showLimited ? "" : worker.role)}</td>
    <td>${showLimited ? "" : `<span class="status-pill ${worker.status === "Booked" ? "warn" : ""}">${escapeHtml(worker.status)}</span>`}</td>
    <td>${escapeHtml(publicPhone)}</td>
    <td>${info}${note}</td>
    <td>${actionButtons("workers", worker.id, "workerForm", loginSetupButton("workers", worker), canEditWorker(worker))}</td>
  </tr>`;
}

function profileCell(profile, hideHeadshot = false, subtitle = profile.email, storeName = "", id = profile.id) {
  const initials = initialsFor(profile.name || profile.contactName || "?");
  const image = profile.headshotData && !hideHeadshot
    ? `<img class="profile-headshot" src="${profile.headshotData}" alt="${escapeHtml(profile.name || profile.contactName)} headshot">`
    : `<div class="profile-headshot placeholder">${escapeHtml(initials)}</div>`;
  const title = storeName && id ? recordLink(storeName, id, profile.name || profile.contactName || "Profile") : escapeHtml(profile.name || profile.contactName || "Profile");
  return `<div class="profile-cell">${image}<div><strong>${title}</strong><p>${escapeHtml(subtitle)}</p></div></div>`;
}

function profileSelect(store, id) {
  if (!isClientRole()) return "";
  return `<label class="profile-select"><input type="checkbox" data-profile-select="${store}" value="${id}"> Select</label>`;
}

function accessBadges(levels, fallback) {
  return normalizeAccessLevels(levels, fallback)
    .map((level) => accessLevelLabel(level))
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
  renderEventFilterOptions("#timecardEventFilter", state.timecardEventFilter);
  const eventFilter = $("#timecardEventFilter");
  const filter = $("#timecardFilter");
  const sort = $("#timecardSort");
  const showRates = canViewRates();
  if (!showRates && state.timecardSort === "pay") state.timecardSort = "latest";
  if (eventFilter) eventFilter.value = state.timecardEventFilter;
  if (filter) filter.value = state.timecardFilter;
  if (sort) sort.value = state.timecardSort;
  sort?.querySelector("option[value='pay']")?.toggleAttribute("hidden", !showRates);
  const rows = sortTimecards(filterTimecards(visibleRecords(state.timecards).filter((card) => {
    const worker = getWorker(card.workerId);
    const venue = getVenue(card.venueId);
    const promoter = getPromoter(card.promoterId);
    const event = getEvent(card.eventId);
    return recordMatchesEventFilter(card, state.timecardEventFilter) && matchesSearch(card, `${worker?.name || ""} ${venue?.name || ""} ${promoter?.name || ""} ${event?.name || ""}`);
  })));
  $("#timecardTableCount").textContent = `${rows.length} shown`;
  const rateHeaders = showRates ? `<th>Pay Basis</th><th>Est.</th>` : "";
  const emptyColspan = showRates ? 10 : 8;
  $("#timecardTable").closest("table").querySelector("thead").innerHTML = `<tr><th>Worker</th><th>Event</th><th>Venue</th><th>Call</th><th>Lunch</th><th>Wrap</th><th>Hours</th>${rateHeaders}<th></th></tr>`;
  $("#timecardTable").innerHTML = rows.length
    ? rows.map((card) => {
        const worker = getWorker(card.workerId);
        const venue = getVenue(card.venueId);
        const event = getEvent(card.eventId);
        const liveAction = card.clockOut || !canAdminEdit() ? "" : `<button class="tiny-button" data-clock-out="${card.id}" type="button">Clock Out</button>`;
        const rateCells = showRates ? `<td>${payBasis(card)}</td><td>${currency(estimatedPay(card))}</td>` : "";
        return `<tr><td><strong>${recordLink("timecards", card.id, worker?.name || "Unknown worker")}</strong></td><td>${escapeHtml(event?.name || card.eventName)}<p>${escapeHtml(card.notes)}</p></td><td>${escapeHtml(venue?.name || "")}</td><td>${formatDate(card.clockIn)}</td><td>${formatDate(card.lunchOut)}${card.lunchIn ? `<p>In: ${formatDate(card.lunchIn)}</p>` : ""}</td><td>${formatDate(card.clockOut) || "Live"}</td><td>${timecardHours(card).toFixed(2)}</td>${rateCells}<td>${actionButtons("timecards", card.id, "timecardForm", liveAction, canAdminEdit())}</td></tr>`;
      }).join("")
    : `<tr><td colspan="${emptyColspan}" class="empty">No timecards match this search.</td></tr>`;
}

function filterTimecards(cards) {
  return cards.filter((card) => {
    if (state.timecardFilter === "live") return !card.clockOut;
    if (state.timecardFilter === "complete") return !!card.clockOut;
    if (state.timecardFilter === "missing-lunch") return !card.lunchOut || !card.lunchIn;
    return true;
  });
}

function sortTimecards(cards) {
  return [...cards].sort((a, b) => {
    if (state.timecardSort === "worker") return listText(getWorker(a.workerId)?.name).localeCompare(listText(getWorker(b.workerId)?.name));
    if (state.timecardSort === "event") return listText(getEvent(a.eventId)?.name || a.eventName).localeCompare(listText(getEvent(b.eventId)?.name || b.eventName));
    if (state.timecardSort === "hours") return timecardHours(b) - timecardHours(a);
    if (state.timecardSort === "pay") return estimatedPay(b) - estimatedPay(a);
    return new Date(b.clockIn || b.createdAt || 0) - new Date(a.clockIn || a.createdAt || 0);
  });
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
    ? rows.map((worker) => `<tr><td>${profileCell(worker, worker.hideHeadshot, publicWorkerValue(worker, "email"), "workers", worker.id)}</td><td>${escapeHtml(publicWorkerValue(worker, "phone"))}</td><td>${escapeHtml(publicWorkerValue(worker, "email"))}</td></tr>`).join("")
    : `<tr><td colspan="3" class="empty">No crew directory entries match this search.</td></tr>`;
}

function renderPromoterDirectory() {
  const rows = visiblePromoters().filter((promoter) => matchesSearch(promoter));
  $("#directoryTableCount").textContent = `${rows.length} promoter reps`;
  $("#directoryHead").innerHTML = `<tr><th>Rep</th><th>Company</th><th>Phone</th><th>Email</th></tr>`;
  $("#directoryTable").innerHTML = rows.length
    ? rows.map((promoter) => `<tr><td>${profileCell(promoter, false, promoter.contactName, "promoters", promoter.id)}</td><td>${escapeHtml(promoter.companyName || "Independent")}</td><td>${escapeHtml(promoter.phone)}</td><td>${escapeHtml(promoter.email)}</td></tr>`).join("")
    : `<tr><td colspan="4" class="empty">No promoter directory entries match this search.</td></tr>`;
}

function renderVenueDirectory() {
  const rows = visibleVenues().filter((venue) => matchesSearch(venue));
  $("#directoryTableCount").textContent = `${rows.length} venues`;
  $("#directoryHead").innerHTML = `<tr><th>Venue</th><th>Address</th><th>Contact</th><th>Parking</th></tr>`;
  $("#directoryTable").innerHTML = rows.length
    ? rows.map((venue) => `<tr><td><strong>${recordLink("venues", venue.id, venue.name)}</strong></td><td>${escapeHtml(venue.address)}</td><td>${escapeHtml(venue.contactName)}<p>${escapeHtml(venue.phone)} ${escapeHtml(venue.email)}</p></td><td>${escapeHtml(venue.parking)}</td></tr>`).join("")
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

function renderEventFilterOptions(selector, selectedValue) {
  const select = $(selector);
  if (!select) return;
  const currentEvents = visibleEvents();
  select.innerHTML = `<option value="all">All events</option>${currentEvents.map((event) => `<option value="${event.id}">${escapeHtml(event.name)}</option>`).join("")}`;
  select.value = currentEvents.some((event) => event.id === selectedValue) ? selectedValue : "all";
}

function recordMatchesEventFilter(record, filterValue) {
  return !filterValue || filterValue === "all" || record.eventId === filterValue;
}

function listText(value) {
  return String(value || "").toLowerCase();
}

function renderVehicles() {
  renderEventFilterOptions("#vehicleEventFilter", state.vehicleEventFilter);
  const logs = visibleRecords(state.vehicleLogs).filter((log) => matchesSearch(log, `${getEvent(log.eventId)?.name || ""} ${getWorker(log.workerId)?.name || ""}`));
  const filter = $("#vehicleFilter");
  const sort = $("#vehicleSort");
  const eventFilter = $("#vehicleEventFilter");
  if (eventFilter) eventFilter.value = state.vehicleEventFilter;
  if (filter) filter.value = state.vehicleFilter;
  if (sort) sort.value = state.vehicleSort;
  const rows = sortVehicleRows(filterVehicleRows(groupedVehicleRows(logs).filter((group) => recordMatchesEventFilter(group, state.vehicleEventFilter))));
  $("#vehicleTableCount").textContent = `${rows.length} shown`;
  $("#vehicleTable").innerHTML = rows.length
    ? rows.map(vehicleCheckRow).join("")
    : `<tr><td colspan="7" class="empty">No vehicle checks match this search.</td></tr>`;
}

function filterVehicleRows(rows) {
  return rows.filter((group) => {
    const plate = vehicleGroupPlate(group);
    if (state.vehicleFilter === "missing-start") return !group.startLog;
    if (state.vehicleFilter === "missing-end") return !group.endLog;
    if (state.vehicleFilter === "missing-plate") return !plate;
    if (state.vehicleFilter === "complete") return !!group.startLog && !!group.endLog;
    return true;
  });
}

function sortVehicleRows(rows) {
  const sortValue = state.vehicleSort;
  return [...rows].sort((a, b) => {
    if (sortValue === "event") return listText(getEvent(a.eventId)?.name).localeCompare(listText(getEvent(b.eventId)?.name));
    if (sortValue === "worker") return listText(getWorker(a.workerId)?.name).localeCompare(listText(getWorker(b.workerId)?.name));
    if (sortValue === "plate") return listText(vehicleGroupPlate(a)).localeCompare(listText(vehicleGroupPlate(b)));
    if (sortValue === "vehicle") return listText(vehicleGroupType(a)).localeCompare(listText(vehicleGroupType(b)));
    return new Date(b.startLog?.scheduledDate || b.endLog?.scheduledDate || 0) - new Date(a.startLog?.scheduledDate || a.endLog?.scheduledDate || 0);
  });
}

function vehicleGroupType(group) {
  return group.vehicleType || group.startLog?.vehicleType || group.endLog?.vehicleType || "";
}

function vehicleGroupPlate(group) {
  return group.plateNumber || group.startLog?.plateNumber || group.endLog?.plateNumber || "";
}

function groupedVehicleRows(logs) {
  const groups = new Map();
  logs.forEach((log) => {
    const key = log.assignmentId || `${log.eventId || ""}:${log.workerId || ""}:${log.vehicleType || ""}:${log.plateNumber || ""}`;
    const group = groups.get(key) || {
      key,
      eventId: log.eventId || "",
      workerId: log.workerId || "",
      assignmentId: log.assignmentId || "",
      vehicleType: log.vehicleType || "",
      plateNumber: log.plateNumber || "",
      startLog: null,
      endLog: null,
      logs: []
    };
    group.logs.push(log);
    if (String(log.phase || "").toLowerCase() === "end") group.endLog = log;
    else group.startLog = log;
    group.eventId = group.eventId || log.eventId || "";
    group.workerId = group.workerId || log.workerId || "";
    group.assignmentId = group.assignmentId || log.assignmentId || "";
    group.vehicleType = group.vehicleType || log.vehicleType || "";
    group.plateNumber = group.plateNumber || log.plateNumber || "";
    groups.set(key, group);
  });
  return Array.from(groups.values()).sort((a, b) => new Date(b.startLog?.scheduledDate || b.endLog?.scheduledDate || 0) - new Date(a.startLog?.scheduledDate || a.endLog?.scheduledDate || 0));
}

function vehicleCheckRow(group) {
  const event = getEvent(group.eventId);
  const worker = getWorker(group.workerId);
  const vehicleType = vehicleGroupType(group);
  const plate = vehicleGroupPlate(group);
  const logId = group.startLog?.id || group.endLog?.id || "";
  const status = vehicleChecklistStatus(group);
  return `<tr>
    <td><strong>${logId ? recordLink("vehicleLogs", logId, event?.name || "Vehicle Check") : escapeHtml(event?.name || "")}</strong><p>${formatDate(event?.startDate)}${event?.endDate ? " - " + formatDate(event.endDate) : ""}</p>${vehicleStatusChips(status)}</td>
    <td>${escapeHtml(worker?.name || "")}</td>
    <td><strong>${escapeHtml(vehicleType || "Vehicle")}</strong></td>
    <td>${escapeHtml(plate || "Not set")}</td>
    <td>${vehiclePhaseCell(group, "Start")}${vehiclePhotoChecklist(status.start)}</td>
    <td>${vehiclePhaseCell(group, "End")}${vehiclePhotoChecklist(status.end)}</td>
    <td>${group.logs.map((log) => vehiclePhotoGallery(log)).join("")}</td>
  </tr>`;
}

function vehicleChecklistStatus(group) {
  return {
    start: vehiclePhaseChecklist(group.startLog, "start", ["Front", "Back", "Driver side", "Passenger side", "Gas gauge"], [
      "startFront",
      "startBack",
      "startDriverSide",
      "startPassengerSide",
      "startGasGauge"
    ]),
    end: vehiclePhaseChecklist(group.endLog, "end", ["Front", "Back", "Driver side", "Passenger side", "Gas gauge"], [
      "endFront",
      "endBack",
      "endDriverSide",
      "endPassengerSide",
      "endGasGauge"
    ])
  };
}

function vehiclePhaseChecklist(log, phase, labels, keys) {
  const photos = log?.vehiclePhotos || {};
  const items = keys.map((key, index) => ({ label: labels[index], done: !!photos[key] }));
  const plateDone = !!log?.plateNumber;
  return {
    phase,
    complete: plateDone && items.every((item) => item.done),
    plateDone,
    items
  };
}

function vehicleStatusChips(status) {
  const startClass = status.start.complete ? "" : " warn";
  const endClass = status.end.complete ? "" : " warn";
  return `<div class="vehicle-status-row"><span class="status-pill${startClass}">Start ${status.start.complete ? "complete" : "missing"}</span><span class="status-pill${endClass}">End ${status.end.complete ? "complete" : "missing"}</span></div>`;
}

function vehiclePhotoChecklist(status) {
  const plateClass = status.plateDone ? "is-done" : "is-missing";
  return `<div class="vehicle-photo-checklist">
    <span class="${plateClass}">Plate</span>
    ${status.items.map((item) => `<span class="${item.done ? "is-done" : "is-missing"}">${escapeHtml(item.label)}</span>`).join("")}
  </div>`;
}

function vehiclePhaseCell(group, phase) {
  const log = phase === "End" ? group.endLog : group.startLog;
  const disabled = canScopedEdit() ? "" : "disabled";
  const buttonLabel = log ? `View / Edit ${phase}` : `Add ${phase}`;
  const meta = log ? `${escapeHtml(log.gasGauge || "")}<p>${formatDate(log.scheduledDate)}</p>` : `<p class="muted">Not started</p>`;
  return `${meta}<button class="tiny-button" data-vehicle-phase="${phase}" data-log-id="${escapeHtml(log?.id || "")}" data-event-id="${escapeHtml(group.eventId)}" data-worker-id="${escapeHtml(group.workerId)}" data-assignment-id="${escapeHtml(group.assignmentId)}" type="button" ${disabled}>${buttonLabel}</button>`;
}

function renderReports() {
  renderEventFilterOptions("#reportEventFilter", state.reportEventFilter);
  const eventFilter = $("#reportEventFilter");
  const filter = $("#reportFilter");
  const sort = $("#reportSort");
  if (eventFilter) eventFilter.value = state.reportEventFilter;
  if (filter) filter.value = state.reportFilter;
  if (sort) sort.value = state.reportSort;
  const rows = sortReports(filterReports(visibleRecords(state.accidentReports).filter((report) => recordMatchesEventFilter(report, state.reportEventFilter) && matchesSearch(report, `${getEvent(report.eventId)?.name || ""} ${getWorker(report.workerId)?.name || ""}`))));
  $("#reportTableCount").textContent = `${rows.length} shown`;
  $("#reportTable").innerHTML = rows.length
    ? rows.map(reportTableRow).join("")
    : `<tr><td colspan="7" class="empty">No accident reports match this search.</td></tr>`;
}

function reportTableRow(report) {
  const event = getEvent(report.eventId);
  const worker = getWorker(report.workerId);
  const photos = report.photos || (report.photoData ? [report.photoData] : []);
  return `<tr>
    <td>${reportTypeBadge(report)}${reportUrgencyBadges(report)}</td>
    <td>${escapeHtml(event?.name || "")}</td>
    <td>${escapeHtml(worker?.name || "")}</td>
    <td><strong>${recordLink("accidentReports", report.id, report.title)}</strong><p>${escapeHtml(report.details)}</p>${reportSummaryChips(report)}</td>
    <td>${formatDate(report.reportedAt)}</td>
    <td>${photos.length ? `<span class="status-pill">${photos.length} photo${photos.length === 1 ? "" : "s"}</span>${photoGallery(photos)}` : `<span class="status-pill warn">No photos</span>`}</td>
    <td>${actionButtons("accidentReports", report.id, "reportForm", "", canScopedEdit())}</td>
  </tr>`;
}

function reportTypeBadge(report) {
  const isVehicle = listText(report.type).includes("vehicle");
  return `<span class="status-pill report-type ${isVehicle ? "vehicle" : "injury"}">${escapeHtml(report.type || "Report")}</span>`;
}

function reportUrgencyBadges(report) {
  const badges = [];
  if (report.medicalAssistanceNeeded === "Yes" || report.emergencyServicesCalled === "Yes") badges.push("Medical");
  if (report.policeReportNumber) badges.push("Police report");
  if (report.insuranceInfo) badges.push("Insurance");
  return badges.length ? `<div class="report-badge-row">${badges.map((label) => `<span class="status-pill warn">${escapeHtml(label)}</span>`).join("")}</div>` : "";
}

function reportSummaryChips(report) {
  const chips = [];
  if (report.injuredPersonName) chips.push(["Injured", report.injuredPersonName]);
  if (report.bodyPartInjured) chips.push(["Body part", report.bodyPartInjured]);
  if (report.incidentLocation) chips.push(["Location", report.incidentLocation]);
  if (report.driverName) chips.push(["Driver", report.driverName]);
  if (report.vehicleInfo) chips.push(["Vehicle", report.vehicleInfo]);
  return chips.length ? `<div class="report-summary-chips">${chips.slice(0, 4).map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("")}</div>` : "";
}

function filterReports(reports) {
  return reports.filter((report) => {
    const type = listText(report.type);
    if (state.reportFilter === "injury") return type.includes("injury");
    if (state.reportFilter === "vehicle") return type.includes("vehicle");
    if (state.reportFilter === "photos") return (report.photos || []).length || report.photoData;
    return true;
  });
}

function sortReports(reports) {
  return [...reports].sort((a, b) => {
    if (state.reportSort === "event") return listText(getEvent(a.eventId)?.name).localeCompare(listText(getEvent(b.eventId)?.name));
    if (state.reportSort === "worker") return listText(getWorker(a.workerId)?.name).localeCompare(listText(getWorker(b.workerId)?.name));
    if (state.reportSort === "type") return listText(a.type).localeCompare(listText(b.type));
    return new Date(b.reportedAt || b.createdAt || 0) - new Date(a.reportedAt || a.createdAt || 0);
  });
}

function vehiclePhotoGallery(log) {
  const photos = log.vehiclePhotos || {};
  const items = [
    ["Start front", photos.startFront || photos.front],
    ["Start back", photos.startBack || photos.back],
    ["Start driver", photos.startDriverSide || photos.driverSide],
    ["Start passenger", photos.startPassengerSide || photos.passengerSide],
    ["Start gas", photos.startGasGauge || photos.gasGauge],
    ...[].concat(photos.priorDamages || []).map((photo, index) => [`Damage ${index + 1}`, photo])
  ];
  items.push(
    ["End front", photos.endFront],
    ["End back", photos.endBack],
    ["End driver", photos.endDriverSide],
    ["End passenger", photos.endPassengerSide],
    ["End gas", photos.endGasGauge]
  );
  if (log.photoData) items.push(["Legacy", log.photoData]);
  return photoGallery(items.filter(([, photo]) => photo));
}

function vehicleEndPhotosComplete(log) {
  const photos = log?.vehiclePhotos || {};
  return !!(log?.plateNumber && photos.endFront && photos.endBack && photos.endDriverSide && photos.endPassengerSide && photos.endGasGauge);
}

function vehicleStartCheckStarted(log) {
  const photos = log?.vehiclePhotos || {};
  return !!(log?.plateNumber || photos.startFront || photos.startBack || photos.startDriverSide || photos.startPassengerSide || photos.startGasGauge);
}

function rentalVehicleRequired(event, card = {}) {
  return event?.requiresRentalPhotos === "yes" || event?.requiresRentalPhotos === true || card.vehicleUse === "Rented Vehicle";
}

function vehicleLogForEventWorker(eventId, workerId, phase = "") {
  return state.vehicleLogs.find((log) => {
    if (log.eventId !== eventId || log.workerId !== workerId) return false;
    return !phase || String(log.phase || "").toLowerCase() === phase.toLowerCase();
  });
}

function assignmentForForm(form) {
  const assignmentId = form?.elements?.assignmentId?.value || "";
  return getEventAssignment(assignmentId) || assignmentForEventWorker(form?.elements?.eventId?.value || "", form?.elements?.workerId?.value || state.activeWorkerId || "");
}

function appendTimecardNote(card, message) {
  const existing = String(card.notes || "").trim();
  if (existing.includes(message)) return existing;
  return [existing, message].filter(Boolean).join("\n");
}

function applyVehicleAssignmentLock(form = $("#vehicleForm")) {
  if (!form) return;
  updateVehiclePhotoSections(form);
  const log = form.elements.id?.value ? state.vehicleLogs.find((item) => item.id === form.elements.id.value) : null;
  const assignment = log?.assignmentId ? getEventAssignment(log.assignmentId) : assignmentForForm(form);
  if (assignment) {
    if (form.elements.assignmentId) form.elements.assignmentId.value = assignment.id;
    if (form.elements.eventId && !form.elements.eventId.value) form.elements.eventId.value = assignment.eventId;
    if (form.elements.workerId && !form.elements.workerId.value) form.elements.workerId.value = assignment.workerId;
    if (form.elements.vehicleType && !form.elements.vehicleType.value) form.elements.vehicleType.value = assignment.vehicleType || (assignment.vehicleUse === "Rented Vehicle" ? "Rented Vehicle" : "");
    if (form.elements.scheduledDate && !form.elements.scheduledDate.value) {
      form.elements.scheduledDate.value = form.elements.phase.value === "End" ? assignment.endDate || "" : assignment.startDate || "";
    }
  }
  const locked = isCrewRole() && !!assignment;
  ["eventId", "workerId", "assignmentLabel"].forEach((name) => {
    if (form.elements[name]) form.elements[name].disabled = locked;
  });
  form.querySelectorAll(".locked-assignment-field").forEach((field) => {
    field.hidden = !assignment;
  });
  if (assignment && form.elements.assignmentLabel) {
    const worker = getWorker(assignment?.workerId);
    form.elements.assignmentLabel.value = `${getEvent(assignment?.eventId)?.name || "Event"} - ${worker?.name || "Runner"}`;
  }
}

function updateVehiclePhotoSections(form = $("#vehicleForm")) {
  if (!form) return;
  const phase = String(form.elements.phase?.value || "").toLowerCase();
  const showStart = phase !== "end";
  const showEnd = phase !== "start";
  form.querySelectorAll("[data-vehicle-photo-section]").forEach((section) => {
    const sectionType = section.dataset.vehiclePhotoSection;
    section.hidden = sectionType === "start" ? !showStart : !showEnd;
  });
}

function openVehiclePhaseForm(button) {
  const logId = button.dataset.logId || "";
  if (logId) {
    fillForm("vehicleForm", state.vehicleLogs.find((log) => log.id === logId) || {});
    return;
  }
  clearForm("vehicleForm");
  const form = $("#vehicleForm");
  form.elements.phase.value = button.dataset.vehiclePhase || "Start";
  form.elements.eventId.value = button.dataset.eventId || "";
  form.elements.workerId.value = button.dataset.workerId || "";
  if (form.elements.assignmentId) form.elements.assignmentId.value = button.dataset.assignmentId || "";
  applyVehicleAssignmentLock(form);
  openForm("vehicleForm");
}

function updateReportTypeFields(form = $("#reportForm")) {
  if (!form) return;
  const assignment = assignmentForForm(form);
  if (assignment) {
    if (form.elements.assignmentId) form.elements.assignmentId.value = assignment.id;
    if (form.elements.eventId && !form.elements.eventId.value) form.elements.eventId.value = assignment.eventId;
    if (form.elements.workerId && !form.elements.workerId.value) form.elements.workerId.value = assignment.workerId;
  }
  const type = form.elements.type?.value || "Injury Report";
  form.querySelectorAll("[data-report-section]").forEach((section) => {
    section.hidden = section.dataset.reportSection !== type;
  });
  if (type === "Vehicle Damage") autofillVehicleReport(form);
}

function openReportFormForType(type = "Injury Report") {
  clearForm("reportForm");
  const form = $("#reportForm");
  form.elements.type.value = type;
  if (isCrewRole()) form.elements.workerId.value = state.activeWorkerId;
  updateReportTypeFields(form);
  openForm("reportForm");
}

function rentedVehicleLogForAssignment(assignment, phase = "Start") {
  return state.vehicleLogs.find((log) => log.assignmentId === assignment.id && log.phase === phase);
}

function updateAssignmentVehicleFields(form = $("#eventAssignmentForm")) {
  if (!form) return;
  const use = form.elements.vehicleUse?.value || "No Vehicle";
  form.querySelectorAll(".personal-vehicle-rate-field").forEach((field) => {
    field.hidden = use !== "Personal Vehicle";
  });
}

function autofillVehicleReport(form = $("#reportForm")) {
  const eventId = form.elements.eventId?.value || "";
  const workerId = form.elements.workerId?.value || state.activeWorkerId || "";
  if (!eventId || !workerId) return;
  const assignment = assignmentForEventWorker(eventId, workerId);
  if (!assignment || assignment.vehicleUse !== "Rented Vehicle") return;
  if (!form.dataset.vehicleDamageConfirmed && form.elements.type?.value === "Vehicle Damage") {
    const confirmed = confirm("This runner is assigned to a rented vehicle for this event. Fill that vehicle into the report?");
    form.dataset.vehicleDamageConfirmed = "yes";
    if (!confirmed) return;
  }
  if (form.elements.rentalVehicleInvolved) form.elements.rentalVehicleInvolved.value = "Yes";
  if (form.elements.vehicleInfo && !form.elements.vehicleInfo.value) {
    const log = vehicleLogForEventWorker(eventId, workerId, "Start") || vehicleLogForEventWorker(eventId, workerId, "End");
    form.elements.vehicleInfo.value = `${assignment.vehicleType || log?.vehicleType || "Rented Vehicle"}${log?.plateNumber ? " / " + log.plateNumber : ""}`;
  }
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
    ? rows.map((venue) => `<tr><td><strong>${recordLink("venues", venue.id, venue.name)}</strong><p>${escapeHtml(venue.notes)}</p></td><td>${escapeHtml(venue.address)}</td><td>${venueContactSummary(venue)}</td><td>${escapeHtml(venue.parking)}</td><td>${actionButtons("venues", venue.id, "venueForm", "", canVenueEdit())}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">No venues match this search.</td></tr>`;
}

function venueContactsForVenue(venueId) {
  return state.venueContacts.filter((contact) => contact.venueId === venueId);
}

function venueContactSummary(venue) {
  const additional = venueContactsForVenue(venue.id);
  const main = venue.contactName ? `<strong>${escapeHtml(venue.contactName)}</strong><p>${escapeHtml(venue.phone)} ${escapeHtml(venue.email)}</p>` : "";
  const extra = additional.length
    ? additional.map((contact) => `<p>${escapeHtml(contact.name || contact.contactName || "Contact")}${contact.title ? `, ${escapeHtml(contact.title)}` : ""} · ${escapeHtml(contact.phone || "")} ${escapeHtml(contact.email || "")}</p>`).join("")
    : "";
  return main || extra ? `${main}${extra}` : `<span class="muted">No contacts</span>`;
}

function renderVenueContactEditor(venueId = "") {
  const list = $("#venueContactList");
  if (!list) return;
  const contacts = venueId ? venueContactsForVenue(venueId) : [];
  list.hidden = !contacts.length;
  list.innerHTML = contacts.length
    ? contacts.map((contact) => venueContactEditorRow(contact)).join("")
    : "";
}

function venueContactEditorRow(contact = {}) {
  return `<div class="repeatable-card" data-venue-contact-row data-contact-id="${escapeHtml(contact.id || "")}">
    <label>Name<input data-contact-field="name" value="${escapeHtml(contact.name || contact.contactName || "")}" placeholder="Contact name"></label>
    <label>Title / office<input data-contact-field="title" value="${escapeHtml(contact.title || "")}" placeholder="Box office, security, dock, GM"></label>
    <label>Phone<input data-contact-field="phone" value="${escapeHtml(contact.phone || "")}" placeholder="(555) 000-0000"></label>
    <label>Email<input data-contact-field="email" type="email" value="${escapeHtml(contact.email || "")}" placeholder="contact@venue.com"></label>
    <label>Notes<textarea data-contact-field="notes" rows="2" placeholder="Best use, hours, preferences">${escapeHtml(contact.notes || "")}</textarea></label>
    <button class="tiny-button" data-submit-venue-contact type="button">Submit Contact</button>
    <button class="tiny-button danger" data-remove-venue-contact type="button">Remove</button>
  </div>`;
}

async function saveVenueContactsForVenue(venueId, form) {
  if (!venueId || !form) return;
  const rows = Array.from(form.querySelectorAll("[data-venue-contact-row]"));
  for (const contact of venueContactsForVenue(venueId)) await remove("venueContacts", contact.id);
  for (const row of rows) {
    const record = {};
    row.querySelectorAll("[data-contact-field]").forEach((field) => {
      record[field.dataset.contactField] = field.value || "";
    });
    if (!Object.values(record).some((value) => String(value || "").trim())) continue;
    await put("venueContacts", {
      id: row.dataset.contactId || crypto.randomUUID(),
      venueId,
      name: record.name,
      contactName: record.name,
      title: record.title,
      phone: record.phone,
      email: record.email,
      notes: record.notes
    });
  }
}

function renderPromoters() {
  const rows = visiblePromoters().filter((promoter) => matchesSearch(promoter));
  $("#promoterTableCount").textContent = `${rows.length} shown`;
  $("#promoterTable").innerHTML = rows.length
    ? rows.map((promoter) => {
        const smtpStatus = promoter.smtpSecretRef ? `<p><span class="status-pill">SMTP saved</span></p>` : "";
        return `<tr><td>${profileSelect("promoters", promoter.id)}${profileCell(promoter, false, promoter.contactName, "promoters", promoter.id)}</td><td><strong>${escapeHtml(promoter.companyName || "Independent")}</strong><p>${escapeHtml(promoter.contactName)}</p></td><td>${escapeHtml(promoter.phone)}</td><td>${escapeHtml(promoter.email)}</td><td>${escapeHtml(promoter.notes || promoter.billing)}<p>${accessBadges(promoter.accessLevels, "PROMOTER_ADMIN")}</p>${smtpStatus}${loginStatus(promoter)}</td><td>${actionButtons("promoters", promoter.id, "promoterForm", loginSetupButton("promoters", promoter), canEditPromoter(promoter))}</td></tr>`;
      }).join("")
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
    ? rows.map((stop) => runnerStopRow(stop)).join("")
    : `<tr><td colspan="6" class="empty">No runner stops match this search.</td></tr>`;
}

function renderMessaging() {
  const status = $("#messagingStatus");
  if (!status) return;
  const messagesView = $("#messages");
  const visibleTypes = new Set(visibleMessageThreadTypes().map(([type]) => type));
  if (!MESSAGE_THREAD_TYPES[state.messagingThreadType] || !visibleTypes.has(state.messagingThreadType)) state.messagingThreadType = "event";
  if (messagesView) messagesView.classList.toggle("message-chat-open", !!sendbirdActiveChannel);
  document.body.classList.toggle("mobile-message-chat-open", state.activeView === "messages" && !!sendbirdActiveChannel && isMobileMessageLayout());
  renderMessagingThreadTabs();
  const configured = !!SENDBIRD_APP_ID;
  const connected = !!sendbirdClient?.currentUser;
  const connectButton = $("#connectSendbirdButton");
  if (connectButton) connectButton.hidden = connected;
  if (connected) sendbirdConnectionState = { status: "connected", errorCode: "", errorMessage: "" };
  status.innerHTML = renderMessagingConnectionStatus(configured, connected);
  renderMessagingError();
  const channelList = $("#messagingChannelList");
  if (channelList) {
    channelList.innerHTML = messagingChannelCards();
  }
  renderMessageThread();
}

function visibleNotifications() {
  const currentId = currentThreadUserId();
  return state.appNotifications
    .filter((notification) => notification.type !== "system" || isAdminRole())
    .filter((notification) => !notification.readAt)
    .filter((notification) => !notification.recipientId || !currentId || notification.recipientId === currentId)
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function unreadNotificationCount() {
  return visibleNotifications().length;
}

function renderNotifications() {
  const badge = $("#notificationBadge");
  const list = $("#notificationList");
  if (!badge || !list) return;
  const notifications = visibleNotifications();
  const unread = unreadNotificationCount();
  badge.hidden = unread <= 0;
  badge.textContent = String(Math.min(unread, 99));
  list.innerHTML = notifications.length
    ? notifications.slice(0, 20).map((notification) => notificationListItem(notification)).join("")
    : `<div class="notification-empty">No notifications yet.</div>`;
}

function notificationListItem(notification) {
  const created = notification.createdAt ? formatDate(notification.createdAt) : "";
  return `<article class="notification-item ${notification.readAt ? "" : "unread"}" data-notification-id="${escapeHtml(notification.id)}">
    <div>
      <strong>${escapeHtml(notification.title || "Notification")}</strong>
      <p>${escapeHtml(notification.body || "")}</p>
      <span>${escapeHtml(created)}</span>
    </div>
    ${notification.viewId ? `<button class="tiny-button" data-open-notification="${escapeHtml(notification.id)}" type="button">Open</button>` : ""}
  </article>`;
}

async function createAppNotification({ title, body = "", type = "info", viewId = "", recordId = "", recipientId = "" }) {
  if (!title) return;
  await put("appNotifications", {
    title,
    body,
    type,
    viewId,
    recordId,
    recipientId
  });
  await loadState();
}

async function ensureWelcomeNotification() {
  if (!authState.session || !isAdminRole()) return;
  await removeLegacyWelcomeNotifications();
  const id = "system-notifications-ready";
  if (state.appNotifications.some((notification) => notification.id === id)) return;
  await put("appNotifications", {
    id,
    title: "Notifications are ready",
    body: "System notices now appear in the System / Admin thread.",
    type: "system",
    viewId: "messages",
    threadType: "system",
    threadKey: "system-admin",
    recipientId: ""
  });
  await loadState();
}

async function removeLegacyWelcomeNotifications() {
  const legacy = state.appNotifications.filter((notification) => String(notification.id || "").startsWith("welcome-"));
  for (const notification of legacy) {
    await remove("appNotifications", notification.id);
  }
}

async function markNotificationsRead() {
  const now = new Date().toISOString();
  const notifications = visibleNotifications().filter((notification) => !notification.readAt);
  for (const notification of notifications) {
    await put("appNotifications", { ...notification, readAt: now });
  }
  await loadState();
}

async function clearReadNotifications() {
  const read = state.appNotifications.filter((notification) => notification.readAt);
  for (const notification of read) {
    await remove("appNotifications", notification.id);
  }
  await loadState();
}

async function openNotification(id) {
  const notification = state.appNotifications.find((item) => item.id === id);
  if (!notification) return;
  if (!notification.readAt) await put("appNotifications", { ...notification, readAt: new Date().toISOString() });
  if (notification.viewId) setView(notification.viewId);
  if (notification.threadType && notification.threadKey) await openPermanentMessageChannel(notification.threadType, notification.threadKey);
  const center = $("#notificationCenter");
  if (center) center.open = false;
  await loadState();
}

function renderMessagingConnectionStatus(configured, connected) {
  if (connected) return `<span class="connected">Connected</span>`;
  if (sendbirdConnectionState.status === "connecting") return `<span class="connecting">Connecting</span>`;
  return `<span class="disconnected">${configured ? "Not connected" : "Not configured"}</span>`;
}

function renderMessagingError() {
  const errorBox = $("#messagingError");
  if (!errorBox) return;
  if (sendbirdConnectionState.status !== "error") {
    errorBox.innerHTML = "";
    return;
  }
  const code = sendbirdConnectionState.errorCode ? ` Error code: ${sendbirdConnectionState.errorCode}.` : "";
  errorBox.textContent = `${sendbirdConnectionState.errorMessage || "Sendbird returned an error."}${code}`;
}

function renderMessagingThreadTabs() {
  const tabs = $("#messagingThreadTabs");
  if (!tabs) return;
  tabs.innerHTML = visibleMessageThreadTypes()
    .map(([type, config]) => `<button class="tab-button ${state.messagingThreadType === type ? "active" : ""}" data-message-thread-type="${type}" type="button">${config.label}</button>`)
    .join("");
}

function visibleMessageThreadTypes() {
  return Object.entries(MESSAGE_THREAD_TYPES).filter(([type]) => {
    if (type === "adminClient") return isAdminRole() || isClientRole();
    if (type === "system") return isAdminRole();
    return true;
  });
}

function messagingChannelCards() {
  if (isMobileMessageLayout()) return mobileMessagingChatCards();
  if (state.messagingThreadType === "direct") return directMessageCards();
  if (state.messagingThreadType === "adminClient" || state.messagingThreadType === "system") return permanentMessageCards(state.messagingThreadType);
  const threadType = state.messagingThreadType;
  const events = visibleEvents()
    .filter((event) => eventWorkerIds(event).length || isClientRole() || isProductionRole() || isProductionTeamRole())
    .filter((event) => canViewMessageThread(threadType, event));
  const empty = MESSAGE_THREAD_TYPES[threadType]?.empty || MESSAGE_THREAD_TYPES.event.empty;
  return events.length
    ? events.map((event) => eventMessageCard(event, threadType)).join("")
    : `<div class="compact-item empty">${empty}</div>`;
}

function isMobileMessageLayout() {
  return window.matchMedia?.("(max-width: 860px)")?.matches || false;
}

function mobileMessagingChatCards() {
  const eventThreads = mobileEventThreadCards();
  const directProfiles = mobileDirectMessageProfiles();
  const permanentThreads = ["adminClient", "system"].flatMap((type) => visibleMessageThreadTypes().some(([visibleType]) => visibleType === type) ? permanentMessageThreadTargets(type) : []);
  return `<div class="mobile-message-sections">
    ${permanentThreads.length ? `<section class="mobile-message-section">
      <div class="mobile-message-section-heading"><h4>Permanent Threads</h4></div>
      <div class="mobile-message-list">${permanentThreads.map((thread) => permanentMessageCard(thread)).join("")}</div>
    </section>` : ""}
    <section class="mobile-message-section">
      <div class="mobile-message-section-heading">
        <h4>Event Threads</h4>
        <button class="tiny-button" data-message-event-options type="button">Options</button>
      </div>
      <div class="mobile-message-list">${state.messageEventPickerOpen ? mobileMessageEventControls() : ""}${eventThreads || `<div class="compact-item empty">No event threads are available for this schedule view.</div>`}</div>
    </section>
    <section class="mobile-message-section">
      <div class="mobile-message-section-heading">
        <h4>Direct Messages</h4>
        <button class="tiny-button" data-new-message-thread type="button">New</button>
      </div>
      <div class="mobile-message-list">${state.messageDirectPickerOpen ? mobileDirectPickerMenu() : ""}${directProfiles.length
        ? directProfiles.map((profile) => directMessageCard(profile)).join("")
        : `<div class="compact-item empty">No direct message contacts are available yet.</div>`}</div>
    </section>
  </div>`;
}

function mobileDirectPickerMenu() {
  return `<div class="mobile-message-direct-menu">
    <button class="tab-button ${state.messageDirectScope === "event" ? "active" : ""}" data-message-direct-scope="event" type="button">Event Contacts</button>
    <button class="tab-button ${state.messageDirectScope === "all" ? "active" : ""}" data-message-direct-scope="all" type="button">All Contacts</button>
  </div>`;
}

function messageEventPool() {
  return visibleEvents()
    .filter((event) => eventWorkerIds(event).length || isClientRole() || isProductionRole() || isProductionTeamRole())
    .sort((a, b) => new Date(a.startDate || a.endDate || a.createdAt || 0) - new Date(b.startDate || b.endDate || b.createdAt || 0));
}

function eventScheduleBucket(event) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(event?.startDate || event?.endDate || event?.createdAt || 0);
  const end = new Date(event?.endDate || event?.startDate || event?.createdAt || 0);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "future";
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  if (end < today) return "past";
  if (start <= today && end >= today) return "current";
  return "future";
}

function defaultMessageEventId(events = messageEventPool()) {
  const current = events.find((event) => eventScheduleBucket(event) === "current");
  if (current) return current.id;
  const future = events.find((event) => eventScheduleBucket(event) === "future");
  return future?.id || events[0]?.id || "";
}

function selectedMessageEvent(events = messageEventPool()) {
  const available = events.filter((event) => state.messageEventFilter === "all" || eventScheduleBucket(event) === state.messageEventFilter);
  const selected = available.find((event) => event.id === state.selectedMessageEventId);
  if (selected) return selected;
  const fallbackId = state.messageEventFilter === "current" ? defaultMessageEventId(events) : available[0]?.id || defaultMessageEventId(events);
  const fallback = events.find((event) => event.id === fallbackId) || available[0] || null;
  if (fallback && state.selectedMessageEventId !== fallback.id) {
    state.selectedMessageEventId = fallback.id;
    localStorage.setItem("productionCrewSelectedMessageEventId", fallback.id);
  }
  return fallback;
}

function mobileMessageEventControls() {
  const events = messageEventPool();
  const filtered = events.filter((event) => state.messageEventFilter === "all" || eventScheduleBucket(event) === state.messageEventFilter);
  const selected = selectedMessageEvent(events);
  const eventOptions = filtered.length ? filtered : events;
  return `<div class="mobile-message-event-controls">
    <select data-message-event-filter aria-label="Filter event threads">
      ${[["current", "Current"], ["future", "Future"], ["past", "Past"], ["all", "All"]].map(([value, label]) => `<option value="${value}" ${state.messageEventFilter === value ? "selected" : ""}>${label}</option>`).join("")}
    </select>
    <select data-message-event-select aria-label="Choose event">
      ${eventOptions.length
        ? eventOptions.map((event) => `<option value="${escapeHtml(event.id)}" ${selected?.id === event.id ? "selected" : ""}>${escapeHtml(event.name || "Event")}</option>`).join("")
        : `<option value="">No events</option>`}
    </select>
  </div>`;
}

function mobileEventThreadCards() {
  const event = selectedMessageEvent();
  if (!event) return "";
  return ["event", "office", "crew"]
    .filter((type) => visibleMessageThreadTypes().some(([visibleType]) => visibleType === type))
    .filter((type) => canViewMessageThread(type, event))
    .map((type) => eventMessageCard(event, type))
    .join("");
}

function mobileDirectMessageProfiles() {
  const all = directMessageProfiles().filter((profile) => canViewMessageThread("direct", null, profile.id));
  if (state.messageDirectScope === "all") return all;
  const event = selectedMessageEvent();
  if (!event) return all;
  const eventMemberIds = new Set(builtInThreadMembers("event", event).map((member) => member.id));
  const scoped = all.filter((profile) => eventMemberIds.has(profile.id));
  return scoped.length ? scoped : all;
}

function permanentMessageCards(threadType) {
  const threads = permanentMessageThreadTargets(threadType);
  const empty = MESSAGE_THREAD_TYPES[threadType]?.empty || MESSAGE_THREAD_TYPES.event.empty;
  return threads.length
    ? threads.map((thread) => permanentMessageCard(thread)).join("")
    : `<div class="compact-item empty">${empty}</div>`;
}

function permanentMessageThreadTargets(threadType) {
  if (threadType === "system") {
    return isAdminRole()
      ? [{
          type: "system",
          key: "system-admin",
          title: "System Updates",
          label: "System / Admin",
          subtitle: "Errors, installs, sync notices, and service health",
          meta: "Permanent"
        }]
      : [];
  }
  if (threadType !== "adminClient" || !(isAdminRole() || isClientRole())) return [];
  if (isClientRole()) {
    const client = activeClientRecord();
    if (!client) return [];
    return [{
      type: "adminClient",
      key: client.id,
      title: "Admin Support",
      label: "Admin / Client",
      subtitle: "Permanent support thread with system admin",
      meta: client.name || "Client"
    }];
  }
  return state.clients.map((client) => ({
    type: "adminClient",
    key: client.id,
    title: client.name || "Client Account",
    label: "Admin / Client",
    subtitle: client.contactName || client.email || "Client support thread",
    meta: "Permanent"
  }));
}

function permanentMessageCard(thread) {
  const active = sendbirdActiveThread?.type === thread.type && sendbirdActiveThread?.profileId === thread.key;
  return `<article class="record-card message-thread-card ${active ? "selected" : ""}" data-open-permanent-message="${escapeHtml(thread.type)}:${escapeHtml(thread.key)}" role="button" tabindex="0">
    <div class="message-thread-card-main">
      <div class="message-thread-card-top">
        <span>${escapeHtml(thread.label)}</span>
        ${active ? `<span class="status-pill">Open</span>` : ""}
      </div>
      <strong>${escapeHtml(thread.title)}</strong>
      <p>${escapeHtml(thread.subtitle)}</p>
      <div class="message-thread-footer"><span>${escapeHtml(thread.meta)}</span></div>
    </div>
  </article>`;
}

function directMessageCard(profile) {
  const active = sendbirdActiveThread?.type === "direct" && sendbirdActiveThread?.profileId === profile.id;
  return `<article class="record-card message-thread-card ${active ? "selected" : ""}" data-open-direct-message="${escapeHtml(profile.id)}" role="button" tabindex="0">
    <div class="message-thread-card-main direct">
      ${messageAvatar(profile.profile || profile, profile.label)}
      <div>
        <div class="message-thread-card-top">
          <span>${escapeHtml(profile.kind)}</span>
          ${active ? `<span class="status-pill">Open</span>` : ""}
        </div>
        <strong>${escapeHtml(profile.label)}</strong>
        <p>${escapeHtml(profile.email || profile.phone || "")}</p>
      </div>
    </div>
  </article>`;
}

function eventMessageCard(event, threadType) {
  const crewCount = eventWorkerIds(event).length;
  const active = sendbirdActiveThread?.type === threadType && sendbirdActiveThread?.eventId === event.id;
  const members = messageThreadPreviewMembers(threadType, event);
  const subtitles = {
    event: `${crewCount} crew / runners`,
    office: "Promoter, production team, and venue contacts",
    crew: `${crewCount} crew / runners and production office`
  };
  return `<article class="record-card message-thread-card ${active ? "selected" : ""}" data-open-message-channel="${threadType}:${event.id}" role="button" tabindex="0">
    <div class="message-thread-card-main">
      <div class="message-thread-card-top">
        <span>${escapeHtml(MESSAGE_THREAD_TYPES[threadType]?.label || "Event Thread")}</span>
        ${active ? `<span class="status-pill">Open</span>` : ""}
      </div>
      <strong>${escapeHtml(sendbirdThreadName(threadType, event))}</strong>
      <p>${escapeHtml(subtitles[threadType] || subtitles.event)}</p>
      <div class="message-thread-footer">
        <span>${formatDate(event.startDate) || "Unscheduled"}</span>
        ${messageAvatarStack(members)}
      </div>
    </div>
  </article>`;
}

function directMessageCards() {
  const profiles = directMessageProfiles().filter((profile) => canViewMessageThread("direct", null, profile.id));
  return profiles.length
    ? profiles.map((profile) => directMessageCard(profile)).join("")
    : `<div class="compact-item empty">${MESSAGE_THREAD_TYPES.direct.empty}</div>`;
}

function messageThreadPreviewMembers(threadType, event) {
  const seen = new Set();
  return sendbirdThreadUsers(threadType, event, null)
    .map((id) => profileForSendbirdUserId(id))
    .filter((member) => {
      const id = messageMemberIdentityKey(member);
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, 5);
}

function messageAvatarStack(members = []) {
  if (!members.length) return "";
  return `<div class="message-avatar-stack" aria-label="${members.length} thread members">
    ${members.slice(0, 4).map((member) => messageAvatar(member, member.name || member.contactName || member.label || "Member")).join("")}
    ${members.length > 4 ? `<span class="message-avatar more">+${members.length - 4}</span>` : ""}
  </div>`;
}

function firstVisibleMessageThreadTarget(type = state.messagingThreadType) {
  if (type === "direct") {
    const profile = directMessageProfiles().find((item) => canViewMessageThread("direct", null, item.id));
    return profile ? { type: "direct", profileId: profile.id } : null;
  }
  if (type === "adminClient" || type === "system") {
    const thread = permanentMessageThreadTargets(type)[0];
    return thread ? { type, profileId: thread.key } : null;
  }
  const eventRecord = visibleEvents()
    .filter((event) => eventWorkerIds(event).length || isClientRole() || isProductionRole() || isProductionTeamRole())
    .find((event) => canViewMessageThread(type, event));
  return eventRecord ? { type, eventId: eventRecord.id } : null;
}

async function selectMessageThreadType(type) {
  state.messagingThreadType = MESSAGE_THREAD_TYPES[type] ? type : "event";
  localStorage.setItem("productionCrewMessagingThreadType", state.messagingThreadType);
  sendbirdActiveChannel = null;
  sendbirdActiveThread = null;
  sendbirdMessages = [];
  renderMessaging();
}

function renderMessageThread() {
  const panel = $("#activeMessagePanel");
  const title = $("#activeMessagingTitle");
  const meta = $("#activeMessagingMeta");
  const members = $("#messageThreadMembers");
  const thread = $("#messageThread");
  const typing = $("#messageTypingStatus");
  const form = $("#sendbirdMessageForm");
  if (!title || !meta || !thread || !form) return;
  $("#messages")?.classList.toggle("message-chat-open", !!sendbirdActiveChannel);
  document.body.classList.toggle("mobile-message-chat-open", state.activeView === "messages" && !!sendbirdActiveChannel && isMobileMessageLayout());
  if (panel) panel.hidden = !sendbirdActiveChannel;
  if (!sendbirdActiveChannel) {
    if (members) members.innerHTML = "";
    if (typing) typing.innerHTML = "";
    form.hidden = true;
    thread.innerHTML = "";
    return;
  }
  title.textContent = activeMessageThreadTitle();
  meta.textContent = activeThreadManagementLabel();
  if (members) members.innerHTML = renderActiveThreadMembers();
  form.hidden = !sendbirdActiveChannel;
  const visibleMessages = activeThreadVisibleMessages();
  thread.innerHTML = sendbirdActiveChannel
    ? (visibleMessages.length
        ? `<div class="chat-thread">${visibleMessages.map((message) => messageBubble(message)).join("")}</div>`
        : `<div class="chat-thread-empty">No messages loaded yet.</div>`)
    : `<div class="chat-thread-empty">Choose a message thread from the list.</div>`;
  if (typing) typing.innerHTML = renderTypingStatus();
}

function activeMessageThreadTitle() {
  const type = sendbirdActiveThread?.type || state.messagingThreadType;
  if (type === "direct") {
    return directMessageProfiles().find((profile) => profile.id === sendbirdActiveThread?.profileId)?.label
      || sendbirdActiveChannel?.name
      || "Direct Message";
  }
  if (["event", "office", "crew"].includes(type)) {
    const event = getEvent(sendbirdActiveThread?.eventId);
    return sendbirdThreadName(type, event);
  }
  if (["adminClient", "system"].includes(type)) {
    return sendbirdThreadName(type, null, { id: sendbirdActiveThread?.profileId || "" });
  }
  return sendbirdActiveChannel?.name || MESSAGE_THREAD_TYPES[type]?.label || "Messages";
}

function activeThreadVisibleMessages() {
  if (sendbirdActiveThread?.type !== "system") return sendbirdMessages;
  return [
    ...systemAdminThreadMessages(),
    ...sendbirdMessages
  ].sort((a, b) => Number(a?.createdAt || 0) - Number(b?.createdAt || 0));
}

function systemAdminThreadMessages() {
  return state.appNotifications
    .filter((notification) => notification.type === "system")
    .slice(0, 20)
    .map((notification) => ({
      messageId: `notice-${notification.id}`,
      message: `${notification.title}${notification.body ? `\n${notification.body}` : ""}`,
      createdAt: new Date(notification.createdAt || Date.now()).getTime(),
      sender: {
        userId: "system_ops",
        nickname: "System"
      }
    }));
}

function scrollActiveMessageThreadToBottom() {
  const thread = $("#messageThread");
  if (!thread) return;
  window.requestAnimationFrame(() => {
    thread.scrollTop = thread.scrollHeight;
  });
}

function messageBubble(message) {
  const senderName = message.sender?.nickname || message.sender?.userId || "Message";
  const senderId = message.sender?.userId || "";
  const senderProfile = profileForSendbirdUserId(senderId);
  const displayName = senderProfile?.name || senderProfile?.contactName || senderName;
  const isOwn = !!message.isLocalOwn || !!message.deliveryStatus || (senderId && baseSendbirdUserId(senderId) === baseSendbirdUserId(sendbirdClient?.currentUser?.userId));
  const sentAt = message.createdAt ? formatDate(message.createdAt) : "";
  const deliveryStatus = isOwn ? (message.deliveryStatus === "sending" ? "Sending..." : "Delivered") : "";
  return `<article class="message-bubble-row ${isOwn ? "own" : ""}">
    ${isOwn ? "" : messageAvatar(senderProfile, displayName)}
    <div class="message-bubble">
      <div class="message-meta"><strong>${escapeHtml(isOwn ? "You" : displayName)}</strong><span>${escapeHtml(sentAt)}</span></div>
      <p>${escapeHtml(message.message || "")}</p>
      ${deliveryStatus ? `<span class="message-delivery-status">${escapeHtml(deliveryStatus)}</span>` : ""}
    </div>
  </article>`;
}

function profileForSendbirdUserId(userId) {
  const id = baseSendbirdUserId(userId).trim();
  if (!id) return null;
  if (id === "adminProfile") return activeAdminProfile();
  if (id === "system_ops") return { id: "system_ops", name: "System", contactName: "System" };
  return [
    ...state.workers,
    ...state.promoters,
    ...state.clientReps,
    ...state.systemProfiles,
    ...state.productionContacts,
    ...state.venueContacts
  ].find((profile) => [profile.authUserId, profile.id, profile.email].map((value) => baseSendbirdUserId(value).trim()).includes(id)) || null;
}

function messageAvatar(profile, fallbackName = "User") {
  const label = profile?.name || profile?.contactName || fallbackName;
  if (profile?.headshotData && !profile.hideHeadshot) {
    return `<img class="message-avatar image" src="${profile.headshotData}" alt="${escapeHtml(label)} headshot">`;
  }
  return `<div class="message-avatar">${escapeHtml(initialsFor(label))}</div>`;
}

function renderTypingStatus() {
  if (!sendbirdActiveChannel) return "";
  const users = sendbirdTypingUsers.filter((user) => user?.userId !== sendbirdClient?.currentUser?.userId);
  if (!users.length) return `<span>No one is typing</span>`;
  const names = users.map((user) => typingUserDisplayName(user)).filter(Boolean).slice(0, 3);
  return `<span>${escapeHtml(names.join(", "))} ${names.length === 1 ? "is" : "are"} typing...</span>`;
}

function typingUserDisplayName(user) {
  const profile = profileForSendbirdUserId(user?.userId || "");
  const label = profile?.name || profile?.contactName || user?.nickname || user?.userId || "";
  const first = String(label).trim().split(/\s+/)[0] || "";
  return first || label;
}

function activeThreadManagementLabel() {
  const type = sendbirdActiveThread?.type || state.messagingThreadType;
  if (!sendbirdActiveChannel) return "Open a message thread to send messages.";
  if (["event", "office"].includes(type)) return "Permanent event thread. Eligible members are kept synced from the event.";
  if (type === "crew") return "Crew runner thread. Production team manages event crew access.";
  if (type === "direct") return "Direct message. Members are controlled by the people in this conversation.";
  if (type === "adminClient") return "Permanent admin and client support thread.";
  if (type === "system") return "System notices for admins. Use this for install, error, and health updates.";
  return "Created thread. At least one thread admin must remain assigned.";
}

function renderActiveThreadMembers() {
  const members = activeThreadMemberProfiles();
  if (!sendbirdActiveChannel) return "";
  if (!members.length) return `<div class="compact-item empty"><strong>Thread Members</strong><span>No eligible members found yet.</span></div>`;
  const canManage = canManageActiveThreadMembers();
  const managerLine = canManage ? "You can manage membership for this thread." : "Membership is view only for this access view.";
  const manageButton = canManage ? `<button class="tiny-button" data-manage-message-thread type="button">Manage Users</button>` : "";
  return `<div class="compact-item thread-member-summary"><strong>Thread Members</strong><span>${members.length} member${members.length === 1 ? "" : "s"} · ${managerLine}</span>${manageButton}</div>
    ${members.map((member) => `<div class="compact-item thread-member-pill"><strong>${escapeHtml(member.label)}</strong><span>${escapeHtml(member.kind)}${member.isCurrent ? " · You" : ""}</span></div>`).join("")}`;
}

function runnerStopRow(stop) {
  const noteUi = isCrewRole() ? runnerStopNoteUi(stop) : "";
  const location = [stop.city, stop.state].filter(Boolean).join(", ");
  return `<tr><td><strong>${recordLink("runnerStops", stop.id, stop.name)}</strong><p>${escapeHtml(stop.phone)}</p>${location ? `<p>${escapeHtml(location)}</p>` : ""}</td><td>${escapeHtml(stop.category)}</td><td>${escapeHtml(stop.address)}</td><td>${escapeHtml(stop.hours)}</td><td>${escapeHtml(stop.bestUse)}${noteUi}</td><td>${actionButtons("runnerStops", stop.id, "runnerForm")}</td></tr>`;
}

function runnerStopNoteUi(stop) {
  const notes = runnerNotesForStop(stop.id);
  const remaining = Math.max(0, 5 - runnerNotesAddedThisYear(stop.id));
  const noteList = notes.length ? `<div class="mini-note-list">${notes.slice(0, 3).map((note) => `<p>${escapeHtml(note.text)}</p>`).join("")}</div>` : "";
  return `<div class="directory-note-box">
    ${noteList}
    <textarea data-runner-note-input="${stop.id}" maxlength="500" rows="2" placeholder="Add note, 500 characters max"></textarea>
    <div class="row-actions"><button class="tiny-button" data-save-runner-note="${stop.id}" type="button" ${remaining <= 0 ? "disabled" : ""}>Add Note</button><span class="muted">${remaining} notes left this year</span></div>
  </div>`;
}

function runnerNotesForStop(stopId) {
  return state.runnerNotes.filter((note) => note.stopId === stopId).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function runnerCategories() {
  const builtIns = ["Hardware", "Food", "Printing", "Medical", "Rental", "Transportation", "Other"];
  const fromStops = state.runnerStops.map((stop) => stop.category || "Other");
  const custom = state.runnerCategories.map((category) => category.name);
  return ["All", ...Array.from(new Set([...builtIns, ...fromStops, ...custom].filter(Boolean))).sort()];
}

function runnerCategoryWindow(workerId = state.activeWorkerId) {
  const entries = state.runnerCategories
    .filter((category) => category.createdByWorkerId === workerId)
    .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
  if (!entries.length) return { used: 0, resetAt: null };
  const first = new Date(entries[0].createdAt || `${entries[0].createdYear || new Date().getFullYear()}-01-01`);
  const resetAt = new Date(first);
  resetAt.setFullYear(resetAt.getFullYear() + 1);
  const now = new Date();
  if (now >= resetAt) return { used: 0, resetAt: null };
  return { used: entries.filter((entry) => new Date(entry.createdAt || 0) >= first && new Date(entry.createdAt || 0) < resetAt).length, resetAt };
}

function runnerCategoriesAddedThisYear(workerId = state.activeWorkerId) {
  return runnerCategoryWindow(workerId).used;
}

function hasUnlimitedRunnerCategoryAccess() {
  const roles = assignedAccessForCurrentUser();
  return roles.includes("CLIENT_REP") || roles.includes("CLIENT_REP_LEAD");
}

function runnerNotesAddedThisYear(stopId, workerId = state.activeWorkerId) {
  const year = new Date().getFullYear();
  return state.runnerNotes.filter((note) => note.stopId === stopId && note.workerId === workerId && Number(note.createdYear) === year).length;
}

function renderRunnerCategoryCreator() {
  const form = $("#runnerCategoryForm");
  const limit = $("#runnerCategoryLimit");
  const visible = isCrewRole() || hasUnlimitedRunnerCategoryAccess();
  form.hidden = !visible;
  if (!visible) return;
  if (hasUnlimitedRunnerCategoryAccess()) {
    limit.textContent = "";
    form.querySelector("button").disabled = false;
    return;
  }
  const windowInfo = runnerCategoryWindow();
  const used = windowInfo.used;
  const remaining = Math.max(0, 3 - used);
  const resetText = windowInfo.resetAt ? ` Reset: ${windowInfo.resetAt.toLocaleDateString()}` : " Clock starts after your first custom category.";
  limit.textContent = `${remaining} of 3 left.${resetText}`;
  form.querySelector("button").disabled = remaining <= 0;
}

function applyWorkerPayDefaultsToTimecard(workerId) {
  const worker = getWorker(workerId);
  const form = $("#timecardForm");
  if (!form) return;
  const event = getEvent(form.elements.eventId.value);
  const assignment = assignmentForEventWorker(form.elements.eventId.value, workerId);
  const client = activeClientRecord();
  form.elements.dayRate.value = form.elements.dayRate.value || assignment?.dayRate || event?.dayRate || client?.defaultDayRate || worker?.defaultDayRate || worker?.defaultRate || "";
  form.elements.includedHours.value = form.elements.includedHours.value || assignment?.includedHours || event?.includedHours || client?.defaultIncludedHours || worker?.defaultIncludedHours || "10";
  form.elements.additionalRate.value = form.elements.additionalRate.value || assignment?.additionalRate || event?.additionalRate || client?.defaultAdditionalRate || worker?.defaultAdditionalRate || "";
  if (assignment?.vehicleUse && !form.elements.vehicleUse.value) form.elements.vehicleUse.value = assignment.vehicleUse;
  const vehicleUse = form.elements.vehicleUse.value || assignment?.vehicleUse;
  if (vehicleUse === "Rented Vehicle") form.elements.vehicleRate.value = event?.rentedVehicleRate || client?.defaultRentedVehicleRate || worker?.defaultRentedVehicleRate || "";
    if (vehicleUse === "Personal Vehicle") form.elements.vehicleRate.value = assignment?.personalVehicleRate || event?.personalVehicleRate || client?.defaultPersonalVehicleRate || worker?.defaultPersonalVehicleRate || "";
}

function setView(viewId) {
  const requestedView = viewId;
  if (!authState.session) {
    showAuthScreen("Log in to continue.");
    return;
  }
  const nextRole = accessRoleForView(viewId);
  if (nextRole) state.accessRole = nextRole;
  viewId = protectedViewFor(viewId);
  state.activeView = viewId;
  sessionStorage.setItem(LAST_ACTIVE_VIEW_KEY, viewId);
  applyAccessProfile();
  $$(".view").forEach((view) => view.classList.toggle("active-view", view.id === viewId));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  const label = combinedNavGroups().flatMap((group) => group.items).find(([view]) => view === viewId)?.[1];
  $("#viewTitle").textContent = label || $(`.nav-item[data-view="${viewId}"]`)?.textContent || "Dashboard";
  if (location.hash !== `#${viewId}`) history.replaceState(null, "", `#${viewId}`);
  if (requestedView !== viewId) toast("That view is restricted for your role.");
  closeMobileNavigation();
}

function combinedNavGroups() {
  const assigned = assignedAccessProfiles();
  const groups = [];
  const seenViews = new Set();
  assigned.forEach(({ role, profile }) => {
    const roleGroups = NAV_GROUPS[role] || NAV_GROUPS[profile.effectiveRole] || [];
    roleGroups.forEach((group) => {
      const items = group.items.filter(([view]) => profile.views.includes(view) && !seenViews.has(view));
      if (!items.length) return;
      items.forEach(([view]) => seenViews.add(view));
      const label = group.label || "";
      let existing = groups.find((item) => (item.label || "") === label);
      if (!existing) {
        existing = { label, items: [] };
        groups.push(existing);
      }
      existing.items.push(...items);
    });
  });
  return groups;
}

function renderNavigation() {
  const groups = combinedNavGroups();
  $(".nav-list").innerHTML = groups.map((group, index) => {
    const items = group.items
      .map(([view, label]) => `<button class="nav-item ${state.activeView === view ? "active" : ""}" data-view="${view}" type="button">${label}</button>`)
      .join("");
    if (!items) return "";
    if (!group.label) return `<div class="nav-group nav-group-plain">${items}</div>`;
    const key = navGroupKey(group, index);
    const isCollapsed = !!state.collapsedNavGroups[key];
    return `<section class="nav-group ${isCollapsed ? "collapsed" : ""}">
      <button class="nav-group-toggle" data-nav-group="${escapeHtml(key)}" type="button" aria-expanded="${String(!isCollapsed)}">
        <span>${escapeHtml(group.label)}</span>
        <span class="nav-group-caret">${isCollapsed ? "+" : "-"}</span>
      </button>
      <div class="nav-group-items" ${isCollapsed ? "hidden" : ""}>${items}</div>
    </section>`;
  }).join("");
  renderMobileBottomNavigation(groups);
}

function renderMobileBottomNavigation(groups = combinedNavGroups()) {
  const nav = $("#mobileBottomNav");
  if (!nav) return;
  const preferred = ["dashboard", "clock", "events", "messages", "workers"];
  const allItems = groups.flatMap((group) => group.items || []);
  const byView = new Map(allItems.map(([view, label]) => [view, label]));
  const selected = [];
  preferred.forEach((view) => {
    if (byView.has(view)) selected.push([view, byView.get(view)]);
  });
  allItems.forEach((item) => {
    if (selected.length < 5 && !selected.some(([view]) => view === item[0])) selected.push(item);
  });
  nav.innerHTML = selected.slice(0, 5)
    .map(([view, label]) => `<button class="${state.activeView === view ? "active" : ""}" data-mobile-view="${escapeHtml(view)}" type="button">${escapeHtml(shortMobileLabel(label))}</button>`)
    .join("");
}

function shortMobileLabel(label = "") {
  return label
    .replace("Crew Profiles", "Crew")
    .replace("My Profile", "Profile")
    .replace("Production Board", "Board")
    .replace("Gig Directory", "Gigs")
    .replace("Promoter Profiles", "Promoters")
    .replace("Client Profile", "Client")
    .replace("Admin Console", "Admin");
}

function toggleMobileNavigation() {
  const open = !document.body.classList.contains("mobile-nav-open");
  document.body.classList.toggle("mobile-nav-open", open);
  $("#mobileMenuButton")?.setAttribute("aria-expanded", String(open));
}

function closeMobileNavigation() {
  document.body.classList.remove("mobile-nav-open");
  $("#mobileMenuButton")?.setAttribute("aria-expanded", "false");
}

function navGroupKey(group, index) {
  return `${state.accessRole}:${group.label || `group-${index}`}`;
}

function toggleNavGroup(key) {
  state.collapsedNavGroups[key] = !state.collapsedNavGroups[key];
  localStorage.setItem("productionCrewCollapsedNavGroups", JSON.stringify(state.collapsedNavGroups));
  renderNavigation();
}

function applyAccessProfile() {
  const assignedAccess = assignedAccessForCurrentUser();
  if (!assignedAccess.includes(state.accessRole)) {
    state.accessRole = assignedAccess[0] || normalizeRole(authState.roleRecord?.role);
  }
  const profile = currentProfile();
  document.body.classList.toggle("admin-mode", isAdminRole());
  document.body.classList.toggle("owner-mode", isClientRole());
  document.body.classList.toggle("production-mode", isProductionRole());
  document.body.classList.toggle("crew-mode", isCrewRole());
  renderAccessRoleOptions();
  renderAccessLevelControls();
  renderNavigation();
  renderGlobalAddMenu();
  $("#crewScopeControl").hidden = !isCrewRole();
  $("#promoterScopeControl").hidden = !isProductionRole();
  $("#exportData").hidden = !profile.canImportExport;
  $("#importData").closest(".file-action").hidden = !profile.canImportExport;
  $$(".promoter-login-field").forEach((field) => { field.hidden = !(isClientRole() || isProductionRole()); });
  $$("select[name='loginRole']").forEach((select) => {
    if (select.closest("#promoterForm") && isProductionRole()) select.value = "PROMOTER";
  });
  $$("#promoterForm select[name='loginRole'] option[value='CREW']").forEach((option) => { option.hidden = isProductionRole(); });
  $$(".admin-form").forEach((form) => { form.hidden = !profile.canAdminEdit; });
  $$(".owner-form").forEach((form) => { form.hidden = !profile.canOwnerEdit; });
  $$(".rate-field").forEach((form) => { form.hidden = !canEditRates(); });
  $$("[data-access-manager-field]").forEach((field) => {
    const allowed = accessPickerAllowed(field.closest("form"));
    field.hidden = !allowed;
    field.style.display = allowed ? "" : "none";
  });
  $$(".venue-form").forEach((form) => { form.hidden = !profile.canVenueEdit; });
  $$(".scoped-form").forEach((form) => { form.hidden = !profile.canScopedEdit; });
  $$(".system-form").forEach((form) => { form.hidden = !profile.canSystemEdit; });
  $$(".admin-action").forEach((button) => { button.hidden = !profile.canAdminEdit; });
  $$(".owner-action").forEach((button) => { button.hidden = !profile.canOwnerEdit; });
  $$(".venue-action").forEach((button) => { button.hidden = !profile.canVenueEdit; });
  $$(".scoped-action").forEach((button) => { button.hidden = !profile.canScopedEdit; });
  $$(".system-action").forEach((button) => { button.hidden = !profile.canSystemEdit; });
  $$(".worker-action").forEach((button) => { button.hidden = !(isClientRole() || isCrewRole()); });
  $$(".crew-action").forEach((button) => { button.hidden = !isCrewRole(); });
  if (!assignedViews().includes(state.activeView)) setView(roleHomeView(assignedAccess[0] || state.accessRole));
}

function renderAccessRoleOptions() {
  const assignedAccess = assignedAccessForCurrentUser();
  const control = $("#accessViewControl");
  const select = $("#accessViewSelect");
  select.innerHTML = assignedAccess.map((role) => `<option value="${escapeHtml(role)}">${escapeHtml(accessLevelLabel(role))}</option>`).join("");
  select.value = assignedAccess.includes(state.accessRole) ? state.accessRole : primaryAssignedAccessRole();
  control.hidden = true;
  $("#sessionRole").textContent = accessLevelLabel(primaryAssignedAccessRole());
  $("#sessionEmail").textContent = currentSessionDisplayName();
}

function currentSessionDisplayName() {
  if (!authState.user) return "Not signed in";
  const subscriber = notificationSubscriberForCurrentUser();
  const fullName = `${subscriber.firstName || ""} ${subscriber.lastName || ""}`.trim();
  return fullName || authState.user.user_metadata?.name || authState.user.email || "Signed in";
}

function setAccessRole(role) {
  const nextRole = normalizeAccessLevel(role);
  if (!accessProfileFor(nextRole)) return;
  if (!assignedAccessForCurrentUser().includes(nextRole)) {
    toast("That access view is not assigned to this login.");
    return;
  }
  state.accessRole = nextRole;
  render();
}

function primaryAssignedAccessRole() {
  return assignedAccessForCurrentUser()[0] || state.accessRole;
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
  if (storeName === "accessLevelDefs" && !canSystemEdit()) {
    toast("Only ADMIN can save access levels.");
    return;
  }
  if (isAdminRole() && !["clients", "systemProfiles", "accessLevelDefs"].includes(storeName)) {
    toast("ADMIN cannot access production records in this demo.");
    return;
  }
  if (storeName === "venues" && !canVenueEdit()) {
    toast("This access view cannot save venues.");
    return;
  }
  if (["vehicleLogs", "accidentReports"].includes(storeName) && isCrewRole()) {
    const eventId = form.elements.eventId?.value || "";
    if (!eventId || !isEventVisible(eventId)) {
      toast("Crew can only save rentals and reports for assigned events.");
      return;
    }
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
  if (["events", "eventAssignments", "eventSwaps", "runnerStops", "timecards"].includes(storeName) && !canAdminEdit()) {
    toast("Switch to CLIENT or PROMOTER to save this.");
    return;
  }
  if (["vehicleLogs", "accidentReports"].includes(storeName) && !canScopedEdit()) {
    toast("This access view cannot save this record.");
    return;
  }

  const record = await formRecord(form);
  if (["clientReps", "workers", "promoters"].includes(storeName) && !accessPickerAllowed(form)) delete record.accessLevels;
  const smtpAppPassword = record.smtpAppPassword || "";
  delete record.smtpAppPassword;
  let existing = record.id ? state[storeName].find((item) => item.id === record.id) : null;
  if (storeName === "clients" && canSystemEdit() && !existing) {
    existing = findMatchingClientAccount(record);
  }
  let merged = { ...(existing || {}), ...record };
  if (storeName === "clientReps") {
    merged = {
      ...activeClientRepRecord(),
      ...record,
      id: record.id || authState.user?.id || crypto.randomUUID(),
      clientId: authState.roleRecord?.client_id || record.clientId || "",
      authUserId: authState.user?.id || record.authUserId || "",
      email: record.email || authState.user?.email || "",
      accessLevels: ensureClientRepAccessLevels(record.accessLevels || activeClientRepRecord()?.accessLevels, clientSetupStep() === "rep" ? "CLIENT_ADMIN" : "CLIENT_REP"),
      emailRoutingStatus: record.emailRoutingStatus || "Not configured"
    };
  }
  if (storeName === "systemProfiles") {
    merged.id = "adminProfile";
    merged.emailRoutingStatus = merged.emailRoutingStatus || "Not configured";
  }
  if (storeName === "accessLevelDefs") {
    const idSource = merged.id || merged.name || crypto.randomUUID();
    merged.id = String(idSource).trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "") || crypto.randomUUID();
    if (ACCESS_PROFILES[merged.id]) {
      toast("Use a different name. Built-in access levels cannot be replaced.");
      return;
    }
    merged.baseRole = baseRoleForAccess(normalizeAccessLevel(merged.baseRole || "CREW"));
    merged.views = Array.isArray(merged.views) ? merged.views.filter((view) => (ACCESS_PROFILES[merged.baseRole]?.views || []).includes(view)) : [];
    if (!merged.views.length) {
      toast("Select at least one page for this access level.");
      return;
    }
  }
  if (storeName === "clients") {
    merged.packageLayouts = normalizeClientPackages(merged.packageLayouts);
  }
  if (storeName === "events") {
    merged.id = merged.id || crypto.randomUUID();
    merged.workerIds = Array.isArray(merged.workerIds) ? merged.workerIds : eventWorkerIds(merged);
    delete merged.showAllCrew;
  }
  if (storeName === "eventAssignments") {
    const eventRecord = getEvent(merged.eventId);
    const worker = getWorker(merged.workerId);
    const client = activeClientRecord();
    if (!eventRecord || !worker) {
      toast("Select an event and runner first.");
      return;
    }
    merged.id = merged.id || crypto.randomUUID();
    merged.startDate = merged.startDate || eventRecord.startDate || "";
    merged.endDate = merged.endDate || eventRecord.endDate || "";
    merged.dayRate = merged.dayRate || eventRecord.dayRate || client?.defaultDayRate || worker.defaultDayRate || worker.defaultRate || "";
    merged.includedHours = merged.includedHours || eventRecord.includedHours || client?.defaultIncludedHours || worker.defaultIncludedHours || "10";
    merged.additionalRate = merged.additionalRate || eventRecord.additionalRate || client?.defaultAdditionalRate || worker.defaultAdditionalRate || "";
    if (merged.vehicleUse === "Personal Vehicle") merged.personalVehicleRate = merged.personalVehicleRate || eventRecord.personalVehicleRate || client?.defaultPersonalVehicleRate || worker.defaultPersonalVehicleRate || "";
    merged.status = merged.status || "Confirmed";
  }
  if (storeName === "vehicleLogs") {
    const assignment = getEventAssignment(merged.assignmentId) || assignmentForEventWorker(merged.eventId, merged.workerId);
    if (assignment) {
      merged.assignmentId = assignment.id;
      merged.eventId = assignment.eventId;
      merged.workerId = assignment.workerId;
      merged.vehicleType = merged.vehicleType || assignment.vehicleType || (assignment.vehicleUse === "Rented Vehicle" ? "Rented Vehicle" : "");
      merged.scheduledDate = merged.scheduledDate || (merged.phase === "End" ? assignment.endDate : assignment.startDate) || "";
    }
    delete merged.assignmentLabel;
  }
  if (storeName === "accidentReports") {
    const assignment = getEventAssignment(merged.assignmentId) || assignmentForEventWorker(merged.eventId, merged.workerId);
    if (assignment) merged.assignmentId = assignment.id;
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
      status: clientSetupStep() === "company" ? "Active" : current.status || record.status || "Active",
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
    merged.loginRole = "PROMOTER";
    merged.accessLevels = ["PROMOTER_ADMIN"];
  }
  if (storeName === "timecards" && merged.eventId) {
    const relatedEvent = getEvent(merged.eventId);
    const worker = getWorker(merged.workerId);
    const assignment = assignmentForEventWorker(merged.eventId, merged.workerId);
    const client = activeClientRecord();
    merged.eventName = merged.eventName || relatedEvent?.name || "";
    merged.venueId = merged.venueId || relatedEvent?.venueId || "";
    merged.promoterId = merged.promoterId || relatedEvent?.promoterId || "";
    merged.workDate = merged.workDate || String(merged.clockIn || merged.createdAt || "").slice(0, 10) || localDateKey();
    merged.dayRate = merged.dayRate || assignment?.dayRate || relatedEvent?.dayRate || client?.defaultDayRate || worker?.defaultDayRate || worker?.defaultRate || "";
    merged.includedHours = merged.includedHours || assignment?.includedHours || relatedEvent?.includedHours || client?.defaultIncludedHours || worker?.defaultIncludedHours || "10";
    merged.additionalRate = merged.additionalRate || assignment?.additionalRate || relatedEvent?.additionalRate || client?.defaultAdditionalRate || worker?.defaultAdditionalRate || "";
    merged.vehicleUse = merged.vehicleUse || assignment?.vehicleUse || "";
    if (merged.vehicleUse === "Rented Vehicle") merged.vehicleRate = merged.vehicleRate || relatedEvent?.rentedVehicleRate || client?.defaultRentedVehicleRate || worker?.defaultRentedVehicleRate || "";
    if (merged.vehicleUse === "Personal Vehicle") merged.vehicleRate = merged.vehicleRate || assignment?.personalVehicleRate || relatedEvent?.personalVehicleRate || client?.defaultPersonalVehicleRate || worker?.defaultPersonalVehicleRate || "";
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
  const savedId = await put(storeName, merged);
  merged.id = merged.id || savedId;
  if (storeName === "venues") await saveVenueContactsForVenue(merged.id, form);
  if (storeName === "events") {
    await syncWorkerBookingForEvent(merged, existing || {});
    await ensureDefaultAssignmentsForEvent(merged);
  }
  if (storeName === "eventAssignments") await afterAssignmentSaved(merged, existing || {});
  if (storeName === "accidentReports" && !existing) {
    notifyReportSaved(merged).catch((error) => console.warn(error));
  }
  try {
    if (storeName === "clients") {
      loginSyncMessage = await syncSupabaseClientAccount(merged);
      if (canSystemEdit()) {
        const clientRep = await upsertClientRepForClientAccount(merged);
        loginSyncMessage = await syncSupabaseClientRep(clientRep) || loginSyncMessage;
      }
    }
    if (storeName === "clientReps") loginSyncMessage = await syncSupabaseClientRep(merged);
    const smtpMessage = await saveSupabaseSmtpRoute(storeName, merged, smtpAppPassword);
    if (smtpMessage) loginSyncMessage = smtpMessage;
    if (storeName === "accessLevelDefs") loginSyncMessage = await syncSupabaseAccessLevel(merged);
    loginSyncMessage = await syncSupabaseRoleForProfile(storeName, merged) || loginSyncMessage;
  } catch (error) {
    console.error(error);
    loginSyncMessage = "Profile saved. Supabase role sync needs attention.";
  }
  closeForm(formId);
  await loadState();
  if (isClientRole() && storeName === "clients" && clientSetupStep() === "company") {
    setClientSetupStep("rep");
    setView("clientProfile");
    toast("Company profile saved. Finish your profile next.");
    openCurrentClientSetupStep();
    return;
  }
  if (isClientRole() && storeName === "clientReps" && clientSetupStep() === "rep") {
    setClientSetupStep("");
    setView("dashboard");
    toast("Profile saved. Welcome in.");
    return;
  }
  setView(state.activeView);
  closeForm(formId);
  toast(loginSyncMessage || "Saved and closed.");
  window.setTimeout(() => closeForm(formId), 0);
}

async function deleteRecord(storeName, id) {
  if (storeName === "clients" && !canSystemEdit()) return;
  if (storeName === "accessLevelDefs" && !canSystemEdit()) return;
  if (storeName === "venues" && !canVenueEdit()) return;
  const adminStores = ["events", "eventAssignments", "eventSwaps", "workers", "promoters", "runnerStops", "timecards"];
  if (adminStores.includes(storeName) && !canAdminEdit()) return;
  if (["vehicleLogs", "accidentReports"].includes(storeName) && !canScopedEdit()) return;
  const confirmed = confirm("Delete this record?");
  if (!confirmed) return;
  try {
    await deleteSupabaseRecord(storeName, id);
  } catch (error) {
    console.error(error);
    toast("Could not delete from Supabase. Local record was not removed.");
    return;
  }
  if (storeName === "clients") {
    for (const rep of state.clientReps.filter((item) => item.clientId === id)) {
      await remove("clientReps", rep.id);
    }
  }
  if (storeName === "venues") {
    for (const contact of state.venueContacts.filter((item) => item.venueId === id)) {
      await remove("venueContacts", contact.id);
    }
  }
  if (storeName === "events") await releaseWorkerBookingsForEvent(id);
  const deletedAssignment = storeName === "eventAssignments" ? state.eventAssignments.find((item) => item.id === id) : null;
  if (deletedAssignment) {
    for (const log of state.vehicleLogs.filter((item) => item.assignmentId === id)) await remove("vehicleLogs", log.id);
  }
  await remove(storeName, id);
  if (deletedAssignment) {
    const eventRecord = getEvent(deletedAssignment.eventId);
    if (eventRecord) {
      const workerIds = eventAssignments(deletedAssignment.eventId).filter((assignment) => assignment.id !== id && !["Cancelled", "Swapped"].includes(assignment.status)).map((assignment) => assignment.workerId).filter(Boolean);
      await put("events", { ...eventRecord, workerIds: Array.from(new Set(workerIds)) });
    }
  }
  await loadState();
  setView(state.activeView);
  toast("Deleted.");
}

async function deleteSupabaseRecord(storeName, id) {
  if (!initializeSupabaseClient()) return;
  if (storeName === "clients") {
    const roleDelete = await supabaseClient.from("user_roles").delete().eq("client_id", id);
    if (roleDelete.error) throw roleDelete.error;
    const repDelete = await supabaseClient.from("client_reps").delete().eq("client_id", id);
    if (repDelete.error) throw repDelete.error;
    const clientDelete = await supabaseClient.from("clients").delete().eq("id", id);
    if (clientDelete.error) throw clientDelete.error;
  }
  if (storeName === "accessLevelDefs") {
    const deleteLevel = await supabaseClient.from("access_levels").delete().eq("id", id);
    if (deleteLevel.error) throw deleteLevel.error;
  }
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
  const canSendSetup = storeName === "clients"
    ? canSystemEdit()
    : storeName === "promoters"
      ? canOwnerEdit() || isProductionRole()
      : canOwnerEdit();
  if (!canSendSetup) {
    toast(storeName === "clients" ? "Only ADMIN can send client login setup." : "This access view cannot send that login setup.");
    return;
  }
  if (!initializeSupabaseClient()) {
    toast("Supabase login is not configured.");
    return;
  }
  const record = state[storeName]?.find((item) => item.id === id);
  if (!record) return;
  const payload = loginSetupPayload(storeName, record);
  if (isProductionRole() && payload.role !== "PROMOTER") {
    toast("Promoter can only invite other promoter users.");
    return;
  }
  if (!payload.email) {
    toast("Add a login email first.");
    return;
  }
  if (!payload.emailRoute?.fromEmail || !payload.emailRoute?.host || !payload.emailRoute?.port || !payload.emailRoute?.username || !payload.emailRoute?.secretRef) {
    toast("Finish SMTP settings before sending login setup.");
    return;
  }
  if (storeName === "clients") {
    try {
      await syncSupabaseClientAccount(record);
      const clientRep = await upsertClientRepForClientAccount(record);
      await syncSupabaseClientRep(clientRep);
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
  const updatedRecord = {
    ...record,
    loginEmail: payload.email,
    loginRole: payload.role,
    authUserId: data?.userId || data?.user_id || record.authUserId || "",
    inviteStatus: data?.action === "reset" ? "Password reset sent" : "Login setup sent",
    inviteSentAt: new Date().toISOString(),
    inviteMessageId: data?.delivery?.messageId || "",
    inviteAcceptedByServer: (data?.delivery?.accepted || []).join(", "),
    inviteServerResponse: data?.delivery?.response || ""
  };
  await put(storeName, updatedRecord);
  if (storeName === "clients") {
    const clientRep = await upsertClientRepForClientAccount(updatedRecord);
    try {
      await syncSupabaseClientRep(clientRep);
    } catch (error) {
      console.error(error);
    }
  }
  await loadState();
  setView(state.activeView);
  const accepted = (data?.delivery?.accepted || []).join(", ") || payload.email;
  toast(`${data?.action === "reset" ? "Password reset" : "Login setup"} accepted by email server for ${accepted}.`);
}

function eventAccessSnapshot(event) {
  const venue = getVenue(event.venueId) || {};
  const promoter = getPromoter(event.promoterId) || {};
  const crew = eventWorkerIds(event).map((id) => {
    const worker = getWorker(id) || {};
    return {
      id,
      name: worker.name || "",
      phone: worker.phone || "",
      email: worker.email || "",
      runnerStatus: worker.runnerStatus || "Available"
    };
  });
  const gigResourceSearch = eventGigSearchText(event, venue);
  return { event, venue, promoter, crew, gigResourceSearch, gigResources: gigResourcesForEvent(event, venue) };
}

function publicEventUrl(token) {
  return `${location.origin}${location.pathname}#public-event?token=${encodeURIComponent(token)}`;
}

async function createEventAccessLink(event) {
  clearForm("eventAccessForm");
  const form = $("#eventAccessForm");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  form.elements.eventId.value = event.id;
  form.elements.recipientName.value = "Production team";
  form.elements.expiresAt.value = expires.toISOString().slice(0, 10);
  openForm("eventAccessForm");
}

function openAssignmentForm(eventId, assignment = null) {
  const eventRecord = getEvent(eventId || assignment?.eventId);
  if (!eventRecord) return;
  const defaults = assignment || {
    id: "",
    eventId: eventRecord.id,
    workerId: "",
    startDate: eventRecord.startDate || "",
    endDate: eventRecord.endDate || "",
    dayRate: eventRecord.dayRate || activeClientRecord()?.defaultDayRate || "",
    includedHours: eventRecord.includedHours || activeClientRecord()?.defaultIncludedHours || "10",
    additionalRate: eventRecord.additionalRate || activeClientRecord()?.defaultAdditionalRate || "",
    vehicleUse: "No Vehicle",
    vehicleType: "",
    personalVehicleRate: eventRecord.personalVehicleRate || activeClientRecord()?.defaultPersonalVehicleRate || "",
    status: "Confirmed",
    notes: ""
  };
  fillForm("eventAssignmentForm", defaults);
}

function applyAssignmentDefaults(workerId) {
  const form = $("#eventAssignmentForm");
  const eventRecord = getEvent(form.elements.eventId.value);
  const worker = getWorker(workerId);
  const client = activeClientRecord();
  if (!form || !eventRecord || !worker) return;
  form.elements.startDate.value = form.elements.startDate.value || eventRecord.startDate || "";
  form.elements.endDate.value = form.elements.endDate.value || eventRecord.endDate || "";
  form.elements.dayRate.value = form.elements.dayRate.value || eventRecord.dayRate || client?.defaultDayRate || worker.defaultDayRate || worker.defaultRate || "";
  form.elements.includedHours.value = form.elements.includedHours.value || eventRecord.includedHours || client?.defaultIncludedHours || worker.defaultIncludedHours || "10";
  form.elements.additionalRate.value = form.elements.additionalRate.value || eventRecord.additionalRate || client?.defaultAdditionalRate || worker.defaultAdditionalRate || "";
  form.elements.personalVehicleRate.value = form.elements.personalVehicleRate.value || eventRecord.personalVehicleRate || client?.defaultPersonalVehicleRate || worker.defaultPersonalVehicleRate || "";
  updateAssignmentVehicleFields(form);
}

function openCrewSwapForm(eventId) {
  clearForm("crewSwapForm");
  const eventRecord = getEvent(eventId);
  const form = $("#crewSwapForm");
  if (!eventRecord || !form) return;
  form.elements.eventId.value = eventId;
  form.elements.swapDate.value = eventRecord.startDate || toLocalInputValue(new Date());
  renderSwapOptions(form, eventRecord);
  openForm("crewSwapForm");
}

function renderSwapOptions(form, eventRecord) {
  const assigned = eventAssignments(eventRecord.id).filter((assignment) => !["Cancelled", "Swapped"].includes(assignment.status));
  form.querySelector("[data-swap-leaving]").innerHTML = assigned.map((assignment) => {
    const worker = getWorker(assignment.workerId);
    return `<label class="checkbox-option"><input type="checkbox" value="${assignment.id}"><span>${escapeHtml(worker?.name || "Runner")}<small>${formatDate(assignment.startDate)} - ${formatDate(assignment.endDate)}</small></span></label>`;
  }).join("") || `<div class="compact-item empty">No confirmed runners to swap.</div>`;
  const draft = { id: eventRecord.id, startDate: eventRecord.startDate, endDate: eventRecord.endDate };
  const available = state.workers.filter((worker) => !workerBookingConflict(worker.id, draft) && !assigned.some((assignment) => assignment.workerId === worker.id));
  form.querySelector("[data-swap-replacement]").innerHTML = available.map((worker) => `<label class="checkbox-option"><input type="checkbox" value="${worker.id}"><span>${escapeHtml(worker.name)}<small>${escapeHtml(worker.role || "Crew")}</small></span></label>`).join("") || `<div class="compact-item empty">No available replacements.</div>`;
}

function openSubstitutionForm(eventId) {
  clearForm("substitutionSwapForm");
  const eventRecord = getEvent(eventId);
  const form = $("#substitutionSwapForm");
  if (!eventRecord || !form) return;
  form.elements.eventId.value = eventId;
  form.elements.startDate.value = eventRecord.startDate || "";
  form.elements.endDate.value = eventRecord.endDate || "";
  const assignments = eventAssignments(eventId).filter((assignment) => !["Cancelled", "Swapped"].includes(assignment.status));
  form.elements.assignmentId.innerHTML = assignments.map((assignment) => `<option value="${assignment.id}">${escapeHtml(getWorker(assignment.workerId)?.name || "Runner")}</option>`).join("");
  form.elements.replacementWorkerId.innerHTML = state.workers.map((worker) => `<option value="${worker.id}">${escapeHtml(worker.name)}</option>`).join("");
  openForm("substitutionSwapForm");
}

async function saveEventAccessLink(event) {
  if (!initializeSupabaseClient()) {
    toast("Supabase login is not configured.");
    return;
  }
  if (!(isClientRole() || isProductionRole())) {
    toast("Only Client or Promoter can create event links.");
    return;
  }
  if (isProductionRole() && event.promoterId !== state.activePromoterId) {
    toast("Promoter can only create links for their events.");
    return;
  }
  const form = $("#eventAccessForm");
  const record = await formRecord(form);
  const route = smtpRouteForEventAccess();
  if (record.recipientEmail && (!route?.fromEmail || !route?.host || !route?.port || !route?.username || !route?.secretRef)) {
    toast("Save SMTP settings before sending event links.");
    return;
  }
  const { data, error } = await supabaseClient.functions.invoke(CREATE_EVENT_ACCESS_FUNCTION, {
    body: {
      eventId: event.id,
      clientId: authState.roleRecord?.client_id || "",
      promoterId: event.promoterId || "",
      recipientEmail: record.recipientEmail || "",
      productionCompanyName: record.productionCompanyName || "",
      recipientName: record.recipientName || "Production team",
      secondaryContactEmails: record.secondaryContactEmails || "",
      expiresAt: record.expiresAt || "",
      notes: record.notes || "",
      snapshot: eventAccessSnapshot(event),
      emailRoute: route
    }
  });
  if (error) {
    console.error(error);
    toast(await loginSetupErrorMessage(error));
    return;
  }
  const link = publicEventUrl(data.token);
  await put("eventAccessLinks", {
    id: data.linkId,
    eventId: event.id,
    recipientEmail: record.recipientEmail || "",
    productionCompanyName: record.productionCompanyName || "",
    recipientName: record.recipientName || "Production team",
    secondaryContactEmails: record.secondaryContactEmails || "",
    expiresAt: record.expiresAt || "",
    publicUrl: link,
    status: "Active"
  });
  closeForm("eventAccessForm");
  await loadState();
  setView("events");
  navigator.clipboard?.writeText(link).catch(() => {});
  toast(record.recipientEmail ? "Production event link sent and copied." : "Production event link created and copied.");
}

async function finalizeCrewSwap(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const eventRecord = getEvent(form.elements.eventId.value);
  if (!eventRecord || !canAdminEdit()) return;
  const leaving = Array.from(form.querySelectorAll("[data-swap-leaving] input:checked")).map((input) => input.value);
  const replacements = Array.from(form.querySelectorAll("[data-swap-replacement] input:checked")).map((input) => input.value);
  if (!leaving.length || leaving.length !== replacements.length) {
    toast("Select the same number of leaving and replacement runners.");
    return;
  }
  const swapDate = form.elements.swapDate.value;
  for (let index = 0; index < leaving.length; index += 1) {
    const oldAssignment = getEventAssignment(leaving[index]);
    if (!oldAssignment) continue;
    await put("eventAssignments", { ...oldAssignment, endDate: swapDate, status: "Swapped" });
    const worker = getWorker(replacements[index]);
    const replacement = {
      ...oldAssignment,
      id: crypto.randomUUID(),
      workerId: replacements[index],
      startDate: swapDate,
      endDate: eventRecord.endDate || oldAssignment.endDate || "",
      status: "Standby",
      notes: `Swap replacement. ${form.elements.notes.value || ""}`.trim()
    };
    await put("eventAssignments", replacement);
    await afterAssignmentSaved(replacement, {});
    if (worker) await put("workers", { ...worker, status: "Booked", bookedEventId: eventRecord.id, bookedEventName: eventRecord.name, bookedUntil: replacement.endDate });
  }
  await put("eventSwaps", {
    eventId: eventRecord.id,
    mode: "swap",
    swapDate,
    leavingAssignmentIds: leaving,
    replacementWorkerIds: replacements,
    notes: form.elements.notes.value || "",
    status: "Finalized"
  });
  closeForm("crewSwapForm");
  await loadState();
  setView("events");
  toast("Crew swap finalized.");
}

async function finalizeSubstitutionSwap(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const eventRecord = getEvent(form.elements.eventId.value);
  const assignment = getEventAssignment(form.elements.assignmentId.value);
  if (!eventRecord || !assignment || !canAdminEdit()) return;
  const substitute = {
    ...assignment,
    id: crypto.randomUUID(),
    workerId: form.elements.replacementWorkerId.value,
    startDate: form.elements.startDate.value,
    endDate: form.elements.endDate.value,
    status: "Confirmed",
    notes: `Substitution coverage. Start/end rental photos required for both leaving and returning runner when vehicle use applies. ${form.elements.notes.value || ""}`.trim()
  };
  await put("eventAssignments", substitute);
  await afterAssignmentSaved(substitute, {});
  await put("eventSwaps", {
    eventId: eventRecord.id,
    mode: "substitution",
    assignmentId: assignment.id,
    replacementWorkerId: substitute.workerId,
    startDate: substitute.startDate,
    endDate: substitute.endDate,
    notes: form.elements.notes.value || "",
    status: "Finalized"
  });
  closeForm("substitutionSwapForm");
  await loadState();
  setView("events");
  toast("Substitution finalized.");
}

function smtpTestPayload(scope = "admin") {
  const normalizedScope = scope === "client" ? "client" : "admin";
  const profile = normalizedScope === "client" ? activeClientRepRecord() || clientRepDefaults() : activeAdminProfile();
  return {
    scope: normalizedScope,
    to: profile.email || authState.user?.email || "",
    name: profile.name || (normalizedScope === "client" ? "Client Rep" : "System Admin"),
    provider: profile.smtpProvider || "",
    fromName: profile.smtpFromName || profile.name || "Production Crew",
    fromEmail: profile.smtpFromEmail || "",
    replyTo: profile.smtpReplyTo || profile.email || authState.user?.email || "",
    host: profile.smtpHost || "",
    port: profile.smtpPort || "",
    username: profile.smtpUsername || "",
    secretRef: profile.smtpSecretRef || "",
    secure: profile.smtpSecure || ""
  };
}

async function sendSmtpTest(scope = "admin") {
  const normalizedScope = scope === "client" ? "client" : "admin";
  if (normalizedScope === "admin" && !canSystemEdit()) {
    toast("Only ADMIN can send an SMTP test.");
    return;
  }
  if (normalizedScope === "client" && !isClientRole()) {
    toast("Only CLIENT can test client email routing.");
    return;
  }
  if (!initializeSupabaseClient()) {
    toast("Supabase login is not configured.");
    return;
  }
  const payload = smtpTestPayload(normalizedScope);
  if (!payload.to || !payload.fromEmail || !payload.host || !payload.port || !payload.username || !payload.secretRef) {
    toast("Save SMTP settings with the app password before sending a test.");
    return;
  }
  const { data, error } = await supabaseClient.functions.invoke(SMTP_TEST_FUNCTION, { body: payload });
  if (error) {
    console.error(error);
    const message = await loginSetupErrorMessage(error);
    toast(message.includes("No SMTP route found") || message.includes("No Supabase secret found")
      ? "Save SMTP settings with the app password first."
      : message);
    return;
  }
  const profile = normalizedScope === "client" ? activeClientRepRecord() : activeAdminProfile();
  const storeName = normalizedScope === "client" ? "clientReps" : "systemProfiles";
  await put(storeName, {
    ...profile,
    id: normalizedScope === "client" ? profile.id || authState.user?.id || crypto.randomUUID() : "adminProfile",
    emailRoutingStatus: "Test sent",
    lastSmtpTestAt: new Date().toISOString(),
    lastSmtpMessageId: data?.messageId || ""
  });
  await loadState();
  setView(state.activeView);
  toast("Test email sent.");
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
  if (!(isClientRole() || isProductionRole() || (isCrewRole() && workerId === state.activeWorkerId))) return;
  const worker = getWorker(workerId);
  if (isCrewRole() && workerId !== state.activeWorkerId) {
    toast("Crew can only update their own response status.");
    return;
  }
  if (!worker || (isProductionRole() && !assignedWorkerIdsForVisibleEvents().has(workerId))) {
    toast("That runner is not assigned to this production view.");
    return;
  }
  await put("workers", { ...worker, runnerStatus: status });
  triggerNovuNotification(NOVU_WORKFLOWS.runnerStatusChanged, {
    runnerName: worker.name || "Runner",
    status,
    eventNames: visibleEvents().filter((event) => eventWorkerIds(event).includes(workerId)).map((event) => event.name).join(", ")
  }, notificationSubscriberForCurrentUser(), { silent: true, transactionId: `runner-status-${workerId}-${Date.now()}` }).catch((error) => console.warn(error));
  await loadState();
  setView(state.activeView);
  toast(`Runner marked ${status}.`);
}

async function notifyRunnerToProductionOffice(workerId) {
  if (!(isClientRole() || isProductionRole())) return;
  const worker = getWorker(workerId);
  if (!worker || (isProductionRole() && !assignedWorkerIdsForVisibleEvents().has(workerId))) {
    toast("That runner is not assigned to this production view.");
    return;
  }
  const eventNames = visibleEvents().filter((event) => eventWorkerIds(event).includes(workerId)).map((event) => event.name).join(", ");
  const result = await triggerNovuNotification(NOVU_WORKFLOWS.productionOfficeCall, {
    workerName: worker.name || "Runner",
    eventNames,
    message: "Please report to the production office."
  }, notificationSubscriberForWorker(worker), {
    transactionId: `production-office-call-${workerId}-${Date.now()}`
  });
  if (result.ok) await updateRunnerStatus(workerId, "At Production Office");
}

async function saveRunnerNote(stopId) {
  if (!isCrewRole() || !state.activeWorkerId) return;
  const textarea = document.querySelector(`[data-runner-note-input="${stopId}"]`);
  const text = String(textarea?.value || "").trim();
  if (!text) {
    toast("Enter a note first.");
    return;
  }
  if (text.length > 500) {
    toast("Directory notes are limited to 500 characters.");
    return;
  }
  if (runnerNotesAddedThisYear(stopId) >= 5) {
    toast("This worker has used all 5 notes for this directory entry this year.");
    return;
  }
  await put("runnerNotes", {
    stopId,
    workerId: state.activeWorkerId,
    text,
    createdYear: new Date().getFullYear()
  });
  textarea.value = "";
  await loadState();
  setView(state.activeView);
  toast("Directory note added.");
}

function notificationSubscriberForCurrentUser() {
  const worker = getWorker(state.activeWorkerId);
  const promoter = getPromoter(state.activePromoterId);
  const clientRep = activeClientRepRecord();
  const profile = isCrewRole() ? worker : isProductionRole() ? promoter : isClientRole() ? clientRep : activeAdminProfile();
  const fallbackId = isAdminRole()
    ? profile?.authUserId || profile?.id || authState.user?.id || authState.user?.email || ""
    : authState.user?.id || profile?.id || authState.user?.email || "";
  return notificationSubscriberForProfile(profile, fallbackId);
}

function notificationSubscriberForProfile(profile, fallbackId = "") {
  return {
    subscriberId: profile?.authUserId || fallbackId || profile?.id || profile?.email || "",
    email: profile?.email || authState.user?.email || "",
    firstName: String(profile?.name || profile?.contactName || authState.user?.email || "User").split(" ")[0] || "User",
    lastName: String(profile?.name || profile?.contactName || "").split(" ").slice(1).join(" ")
  };
}

function sendbirdRuntimeScope() {
  const info = mobileRuntimeInfo();
  const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches || navigator.standalone;
  return info.native || standalone ? "app" : "desktop";
}

function baseSendbirdUserId(value) {
  return String(value || "").replace(/__(desktop|app)$/i, "");
}

function scopedSendbirdUserId(value, scope = sendbirdRuntimeScope()) {
  const base = baseSendbirdUserId(value).trim();
  return base ? `${base}__${scope}` : "";
}

function allRuntimeSendbirdUserIds(value) {
  const base = baseSendbirdUserId(value).trim();
  return base ? ["desktop", "app"].map((scope) => `${base}__${scope}`) : [];
}

function notificationSubscriberForWorker(worker) {
  return notificationSubscriberForProfile(worker, worker?.authUserId || worker?.id || worker?.email || "");
}

async function triggerNovuNotification(workflowId, payload = {}, to = notificationSubscriberForCurrentUser(), options = {}) {
  if (!initializeSupabaseClient()) return { ok: false, message: "Supabase login is not configured." };
  if (!workflowId || !to?.subscriberId) return { ok: false, message: "Novu workflow or subscriber is missing." };
  const { data, error } = await supabaseClient.functions.invoke(NOVU_TRIGGER_FUNCTION, {
    body: {
      workflowId,
      to,
      payload,
      transactionId: options.transactionId || ""
    }
  });
  if (error) {
    console.error(error);
    const message = await loginSetupErrorMessage(error);
    if (!options.silent) toast(message);
    return { ok: false, message };
  }
  if (!options.silent) toast("Notification queued.");
  return { ok: true, data };
}

function sendbirdUserIdForProfile(profile) {
  return baseSendbirdUserId(profile?.authUserId || profile?.id || profile?.email || "");
}

function currentSendbirdUserId() {
  return scopedSendbirdUserId(notificationSubscriberForCurrentUser().subscriberId || authState.user?.id || authState.user?.email || "");
}

function messageMemberFromProfile(kind, profile, label = "") {
  const id = sendbirdUserIdForProfile(profile);
  if (!id) return null;
  return {
    id,
    kind,
    label: label || profile?.name || profile?.contactName || profile?.email || kind,
    email: profile?.email || "",
    phone: profile?.phone || "",
    isCurrent: id === sendbirdUserIdForProfile({ authUserId: notificationSubscriberForCurrentUser().subscriberId })
  };
}

function syntheticMessageMember(id, kind, label, email = "") {
  return {
    id,
    kind,
    label,
    email,
    phone: "",
    isCurrent: id === currentThreadUserId()
  };
}

function messageMemberIdentityKey(member) {
  return baseSendbirdUserId(member?.authUserId || member?.id || member?.email || "").trim();
}

function uniqueMessageMembers(members) {
  const byId = new Map();
  members.filter(Boolean).forEach((member) => {
    const key = messageMemberIdentityKey(member);
    if (key && !byId.has(key)) byId.set(key, member);
  });
  return Array.from(byId.values()).sort((a, b) => a.label.localeCompare(b.label));
}

function eventClientId(event) {
  return authState.roleRecord?.client_id || event?.clientId || activeClientRecord()?.id || "";
}

function eventClientReps(event) {
  const clientId = eventClientId(event);
  return state.clientReps.filter((rep) => !clientId || rep.clientId === clientId);
}

function eventProductionTeamContacts(event) {
  const links = state.eventAccessLinks.filter((link) => link.eventId === event?.id);
  const linkProfiles = links.flatMap((link) => {
    const secondary = String(link.secondaryContactEmails || "")
      .split(/[,\n;]/)
      .map((email) => email.trim())
      .filter(Boolean)
      .map((email, index) => ({
        id: `${link.id || event?.id}-secondary-${index}`,
        name: email,
        email,
        contactName: email,
        kind: "Production Team"
      }));
    return [
      {
        id: link.id || `${event?.id}-${link.recipientEmail || link.recipientName || "production"}`,
        name: link.recipientName || link.recipientEmail || link.productionCompanyName || "Production Team",
        contactName: link.recipientName || link.recipientEmail || "Production Team",
        email: link.recipientEmail || "",
        kind: "Production Team"
      },
      ...secondary
    ];
  });
  return [...state.productionContacts, ...linkProfiles].filter((profile) => profile.email || profile.authUserId || profile.id);
}

function eventVenueContacts(event) {
  return state.venueContacts.filter((contact) => !event?.venueId || contact.venueId === event.venueId);
}

function eventMessageMembers(event) {
  return uniqueMessageMembers([
    ...eventClientReps(event).map((rep) => messageMemberFromProfile("Client", rep)),
    messageMemberFromProfile("Promoter", getPromoter(event?.promoterId), promoterLabel(getPromoter(event?.promoterId))),
    ...eventProductionTeamContacts(event).map((contact) => messageMemberFromProfile("Production Team", contact)),
    ...eventWorkerIds(event).map((workerId) => messageMemberFromProfile("Crew / Runner", getWorker(workerId)))
  ]);
}

function productionOfficeMembers(event) {
  return uniqueMessageMembers([
    messageMemberFromProfile("Promoter", getPromoter(event?.promoterId), promoterLabel(getPromoter(event?.promoterId))),
    ...eventProductionTeamContacts(event).map((contact) => messageMemberFromProfile("Production Team", contact)),
    ...eventVenueContacts(event).map((contact) => messageMemberFromProfile("Venue", contact))
  ]);
}

function crewRunnerMembers(event) {
  return uniqueMessageMembers([
    messageMemberFromProfile("Promoter", getPromoter(event?.promoterId), promoterLabel(getPromoter(event?.promoterId))),
    ...eventProductionTeamContacts(event).map((contact) => messageMemberFromProfile("Production Team", contact)),
    ...eventWorkerIds(event).map((workerId) => messageMemberFromProfile("Crew / Runner", getWorker(workerId)))
  ]);
}

function directMessageMembers(profileId) {
  const current = notificationSubscriberForCurrentUser();
  const directProfile = directMessageProfiles().find((profile) => profile.id === profileId);
  return uniqueMessageMembers([
    {
      id: current.subscriberId,
      kind: "You",
      label: `${current.firstName || "Current"} ${current.lastName || "User"}`.trim(),
      isCurrent: true
    },
    directProfile ? { ...directProfile, isCurrent: false } : null
  ]);
}

function adminClientMembers(clientId = "") {
  const clientReps = state.clientReps.filter((rep) => !clientId || rep.clientId === clientId);
  return uniqueMessageMembers([
    syntheticMessageMember("adminProfile", "Admin", "System Admin"),
    ...clientReps.map((rep) => messageMemberFromProfile("Client", rep))
  ]);
}

function systemAdminMembers() {
  return uniqueMessageMembers([
    syntheticMessageMember("system_ops", "System", "System"),
    syntheticMessageMember("adminProfile", "Admin", "System Admin")
  ]);
}

function membersForMessageThread(type, event, directProfileId = "") {
  if (type === "office") return productionOfficeMembers(event);
  if (type === "crew") return crewRunnerMembers(event);
  if (type === "direct") return directMessageMembers(directProfileId);
  if (type === "adminClient") return adminClientMembers(directProfileId);
  if (type === "system") return systemAdminMembers();
  return eventMessageMembers(event);
}

function activeThreadMemberProfiles() {
  if (!sendbirdActiveThread) return [];
  const members = sendbirdActiveThread.type === "direct"
    ? effectiveThreadMembers("direct", null, sendbirdActiveThread.profileId)
    : ["adminClient", "system"].includes(sendbirdActiveThread.type)
      ? effectiveThreadMembers(sendbirdActiveThread.type, null, sendbirdActiveThread.profileId || "")
      : effectiveThreadMembers(sendbirdActiveThread.type, getEvent(sendbirdActiveThread.eventId));
  const current = notificationSubscriberForCurrentUser();
  const currentId = baseSendbirdUserId(current.subscriberId).trim();
  if (!currentId || members.some((member) => messageMemberIdentityKey(member) === currentId)) return members;
  return uniqueMessageMembers([
    ...members,
    {
      id: current.subscriberId,
      kind: "Current User",
      label: `${current.firstName || "Current"} ${current.lastName || "User"}`.trim(),
      isCurrent: true
    }
  ]);
}

function canManageActiveThreadMembers() {
  return ["owner", "admin"].includes(currentThreadRole());
}

function openMessageThreadManageForm() {
  if (!sendbirdActiveThread || !sendbirdActiveChannel) {
    toast("Open a thread first.");
    return;
  }
  if (!canManageActiveThreadMembers()) {
    toast("Only thread owners and admins can manage this thread.");
    return;
  }
  renderMessageThreadManageForm();
  openForm("messageThreadManageForm");
}

function renderMessageThreadManageForm() {
  const form = $("#messageThreadManageForm");
  if (!form || !sendbirdActiveThread) return;
  const event = getEvent(sendbirdActiveThread.eventId);
  const setting = currentThreadSetting() || defaultThreadSetting(sendbirdActiveThread.type, event, sendbirdActiveThread.profileId || "");
  const available = threadAvailableMembers(sendbirdActiveThread.type, event, sendbirdActiveThread.profileId || "");
  const currentRole = currentThreadRole();
  form.elements.id.value = setting.id || setting.threadKey;
  form.elements.threadKey.value = setting.threadKey;
  const adminIds = new Set(setting.adminIds || []);
  const memberIds = new Set(setting.memberIds || []);
  const removedIds = new Set(setting.removedUserIds || []);
  const activeMembers = available.filter((member) => memberIds.has(member.id) && !removedIds.has(member.id));
  const ownerOptions = activeMembers.length ? activeMembers : available;
  form.elements.ownerId.innerHTML = ownerOptions.map((member) => `<option value="${escapeHtml(member.id)}">${escapeHtml(member.label)}</option>`).join("");
  form.elements.ownerId.value = setting.ownerId || currentThreadUserId();
  form.elements.ownerId.disabled = currentRole !== "owner";
  $("#threadAdminOptions").innerHTML = available.map((member) => {
    const checked = adminIds.has(member.id) || setting.ownerId === member.id;
    const disabled = currentRole !== "owner" || setting.ownerId === member.id;
    return `<label class="checkbox-option"><input type="checkbox" name="threadAdmins" value="${escapeHtml(member.id)}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}> ${escapeHtml(member.label)} <span>${escapeHtml(member.kind)}</span></label>`;
  }).join("");
  $("#threadMemberOptions").innerHTML = available.map((member) => {
    const checked = memberIds.has(member.id) && !removedIds.has(member.id);
    return `<label class="checkbox-option"><input type="checkbox" name="threadMembers" value="${escapeHtml(member.id)}" ${checked ? "checked" : ""}> ${escapeHtml(member.label)} <span>${escapeHtml(member.kind)}</span></label>`;
  }).join("");
}

function checkedThreadValues(form, name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

async function saveMessageThreadAccess(event) {
  event.preventDefault();
  if (!sendbirdActiveThread || !canManageActiveThreadMembers()) {
    toast("Only thread owners and admins can manage this thread.");
    return;
  }
  const form = event.currentTarget;
  const setting = currentThreadSetting();
  if (!setting) {
    toast("Open the thread again before saving access.");
    return;
  }
  const role = currentThreadRole();
  const eventRecord = getEvent(sendbirdActiveThread.eventId);
  const available = threadAvailableMembers(sendbirdActiveThread.type, eventRecord, sendbirdActiveThread.profileId || "");
  const availableIds = new Set(available.map((member) => member.id));
  const priorMemberIds = new Set(setting.memberIds || []);
  const ownerId = role === "owner" ? (form.elements.ownerId.value || setting.ownerId) : setting.ownerId;
  const requestedMembers = new Set(checkedThreadValues(form, "threadMembers").filter((id) => availableIds.has(id)));
  requestedMembers.add(ownerId);
  if (role !== "owner" && setting.ownerId) requestedMembers.add(setting.ownerId);
  const adminIds = role === "owner"
    ? Array.from(new Set([...checkedThreadValues(form, "threadAdmins"), ownerId].filter((id) => availableIds.has(id) || id === ownerId)))
    : Array.from(new Set([...(setting.adminIds || []), setting.ownerId].filter(Boolean)));
  if (!adminIds.includes(ownerId)) adminIds.push(ownerId);
  const memberIds = Array.from(requestedMembers);
  const removedUserIds = Array.from(new Set([
    ...(setting.removedUserIds || []).filter((id) => !requestedMembers.has(id)),
    ...Array.from(priorMemberIds).filter((id) => !requestedMembers.has(id))
  ].filter((id) => id && id !== ownerId)));
  await put("messageThreadSettings", {
    ...setting,
    ownerId,
    adminIds,
    memberIds,
    removedUserIds
  });
  await loadState();
  if (sendbirdActiveChannel) await syncSendbirdChannelMembers(sendbirdActiveChannel, memberIds);
  renderMessaging();
  closeForm("messageThreadManageForm");
  toast("Thread access updated.");
}

function addSendbirdProfileIds(userIds, profiles) {
  profiles.forEach((profile) => {
    const id = sendbirdUserIdForProfile(profile);
    if (id) userIds.add(id);
  });
}

function sendbirdUserIdsForEvent(event) {
  return sendbirdUserIdsForMembers(effectiveThreadMembers("event", event));
}

function sendbirdUserIdsForProductionOffice(event) {
  return sendbirdUserIdsForMembers(effectiveThreadMembers("office", event));
}

function sendbirdUserIdsForCrewRunner(event) {
  return sendbirdUserIdsForMembers(effectiveThreadMembers("crew", event));
}

function sendbirdUserIdsForPermanentThread(type, key = "") {
  return sendbirdUserIdsForMembers(effectiveThreadMembers(type, null, key));
}

function sendbirdUserIdsForMembers(members) {
  return Array.from(new Set(members.flatMap((member) => allRuntimeSendbirdUserIds(member.id))));
}

function directMessageProfiles() {
  const currentId = sendbirdUserIdForProfile({ authUserId: notificationSubscriberForCurrentUser().subscriberId });
  const profiles = [];
  const addProfile = (kind, profile, label = "") => {
    const id = sendbirdUserIdForProfile(profile);
    if (!id || id === currentId || profiles.some((item) => item.id === id)) return;
    profiles.push({
      id,
      kind,
      label: label || profile?.name || profile?.contactName || profile?.email || kind,
      email: profile?.email || "",
      phone: profile?.phone || ""
    });
  };
  if (isClientRole()) {
    eventClientReps({ clientId: activeClientRecord()?.id }).forEach((rep) => addProfile("Client Rep", rep));
    visiblePromoters().forEach((promoter) => addProfile("Promoter", promoter, promoterLabel(promoter)));
    visibleWorkers().forEach((worker) => addProfile("Crew / Runner", worker));
  } else if (isProductionRole()) {
    visiblePromoters().forEach((promoter) => addProfile("Promoter", promoter, promoterLabel(promoter)));
    visibleWorkers().forEach((worker) => addProfile("Crew / Runner", worker));
  } else if (isCrewRole()) {
    const assignedPromoterIds = new Set(visibleEvents().map((event) => event.promoterId).filter(Boolean));
    state.promoters.filter((promoter) => assignedPromoterIds.has(promoter.id)).forEach((promoter) => addProfile("Promoter", promoter, promoterLabel(promoter)));
    visibleWorkers().forEach((worker) => addProfile("Crew / Runner", worker));
  } else if (isProductionTeamRole()) {
    const assignedPromoterIds = new Set(visibleEvents().map((event) => event.promoterId).filter(Boolean));
    state.promoters.filter((promoter) => assignedPromoterIds.has(promoter.id)).forEach((promoter) => addProfile("Promoter", promoter, promoterLabel(promoter)));
  }
  return profiles.sort((a, b) => a.label.localeCompare(b.label));
}

function currentThreadUserId() {
  return sendbirdUserIdForProfile({ authUserId: notificationSubscriberForCurrentUser().subscriberId || authState.user?.id || authState.user?.email || "" });
}

function directThreadKey(profileId) {
  return `direct:${[currentThreadUserId(), profileId].filter(Boolean).sort().join(":")}`;
}

function messageThreadKey(type, eventId = "", profileId = "") {
  if (type === "direct") return directThreadKey(profileId);
  if (type === "adminClient") return `adminClient:${profileId || eventId || activeClientRecord()?.id || "client"}`;
  if (type === "system") return "system:admin";
  return `${type}:${eventId}`;
}

function messageThreadSetting(key) {
  return state.messageThreadSettings.find((setting) => setting.threadKey === key) || null;
}

function builtInThreadMembers(type, event, directProfileId = "") {
  return membersForMessageThread(type, event, directProfileId);
}

function threadAvailableMembers(type, event, directProfileId = "") {
  if (type === "direct") return directMessageMembers(directProfileId);
  if (type === "adminClient" || type === "system") return builtInThreadMembers(type, event, directProfileId);
  const base = builtInThreadMembers(type, event, directProfileId);
  const extras = directMessageProfiles().filter((profile) => !base.some((member) => member.id === profile.id));
  return uniqueMessageMembers([...base, ...extras]);
}

function defaultThreadSetting(type, event, directProfileId = "") {
  const key = messageThreadKey(type, event?.id || "", directProfileId);
  const currentId = currentThreadUserId();
  const members = builtInThreadMembers(type, event, directProfileId).map((member) => member.id);
  const ownerId = currentId || members[0] || "";
  return {
    id: key,
    threadKey: key,
    type,
    eventId: event?.id || "",
    profileId: directProfileId,
    ownerId,
    adminIds: ownerId ? [ownerId] : [],
    memberIds: Array.from(new Set([ownerId, ...members].filter(Boolean))),
    removedUserIds: []
  };
}

async function ensureMessageThreadSetting(type, event, directProfileId = "") {
  const key = messageThreadKey(type, event?.id || "", directProfileId);
  const existing = messageThreadSetting(key);
  const defaults = defaultThreadSetting(type, event, directProfileId);
  if (existing) {
    const merged = {
      ...existing,
      memberIds: Array.from(new Set([...(existing.memberIds || []), ...defaults.memberIds].filter(Boolean))),
      adminIds: Array.from(new Set([...(existing.adminIds || []), existing.ownerId || defaults.ownerId].filter(Boolean))),
      ownerId: existing.ownerId || defaults.ownerId
    };
    if (JSON.stringify(merged) !== JSON.stringify(existing)) {
      await put("messageThreadSettings", merged);
      await loadState();
    }
    return messageThreadSetting(key) || merged;
  }
  await put("messageThreadSettings", defaults);
  await loadState();
  return messageThreadSetting(key) || defaults;
}

function effectiveThreadMembers(type, event, directProfileId = "") {
  const key = messageThreadKey(type, event?.id || "", directProfileId);
  const setting = messageThreadSetting(key);
  const available = threadAvailableMembers(type, event, directProfileId);
  if (!setting) return builtInThreadMembers(type, event, directProfileId);
  const allowed = new Set(setting.memberIds || []);
  const removed = new Set(setting.removedUserIds || []);
  return available.filter((member) => allowed.has(member.id) && !removed.has(member.id));
}

function canViewMessageThread(type, event, directProfileId = "") {
  const key = messageThreadKey(type, event?.id || "", directProfileId);
  const setting = messageThreadSetting(key);
  const currentId = currentThreadUserId();
  if (!setting) return true;
  if ((setting.removedUserIds || []).includes(currentId)) return false;
  return (setting.memberIds || []).includes(currentId) || builtInThreadMembers(type, event, directProfileId).some((member) => member.id === currentId);
}

function currentThreadSetting() {
  if (!sendbirdActiveThread) return null;
  const event = getEvent(sendbirdActiveThread.eventId);
  const key = messageThreadKey(sendbirdActiveThread.type, event?.id || "", sendbirdActiveThread.profileId || "");
  return messageThreadSetting(key);
}

function currentThreadRole() {
  const setting = currentThreadSetting();
  const currentId = currentThreadUserId();
  if (!setting || !currentId) return "";
  if (setting.ownerId === currentId) return "owner";
  if ((setting.adminIds || []).includes(currentId)) return "admin";
  return (setting.memberIds || []).includes(currentId) ? "member" : "";
}

function sendbirdThreadName(type, event, directProfile) {
  if (type === "office") return `${event?.name || "Event"} - Production Office`;
  if (type === "crew") return `${event?.name || "Event"} - Crew Runner`;
  if (type === "direct") return directProfile?.label || "Direct Message";
  if (type === "adminClient") return isAdminRole()
    ? `${state.clients.find((client) => client.id === directProfile?.id)?.name || "Client"} - Admin Support`
    : "Admin Support";
  if (type === "system") return "System Updates";
  return event?.name || "Event Thread";
}

function sendbirdThreadUsers(type, event, directProfile) {
  const currentId = currentSendbirdUserId();
  const ids = type === "office"
    ? sendbirdUserIdsForProductionOffice(event)
    : type === "crew"
      ? sendbirdUserIdsForCrewRunner(event)
      : type === "direct"
        ? sendbirdUserIdsForMembers(effectiveThreadMembers("direct", null, directProfile?.id))
        : ["adminClient", "system"].includes(type)
          ? sendbirdUserIdsForPermanentThread(type, directProfile?.id || "")
        : sendbirdUserIdsForEvent(event);
  return Array.from(new Set([currentId, ...ids].filter(Boolean)));
}

async function ensureSendbirdConnected() {
  if (sendbirdClient?.currentUser) return sendbirdClient;
  await connectSendbirdMessaging();
  return sendbirdClient?.currentUser ? sendbirdClient : null;
}

async function savedSendbirdChannel(client, setting) {
  if (!client?.groupChannel || !setting?.channelUrl) return null;
  try {
    return await client.groupChannel.getChannel(setting.channelUrl);
  } catch (error) {
    console.warn("Saved Sendbird channel could not be opened.", error);
    return null;
  }
}

async function saveSendbirdChannelUrl(setting, channel) {
  if (!setting?.threadKey || !channel?.url || setting.channelUrl === channel.url) return;
  await put("messageThreadSettings", { ...setting, channelUrl: channel.url });
  await loadState();
}

function sendbirdErrorDetails(error) {
  if (error?.name === "SendbirdSdkLoadError") {
    return {
      errorCode: "SDK_LOAD",
      errorMessage: error.message || "Could not load the Sendbird messaging tools."
    };
  }
  return {
    errorCode: String(error?.code || error?.errorCode || error?.status || ""),
    errorMessage: error?.message || "Could not connect Sendbird messaging."
  };
}

function sendbirdNeedsCleanReconnect(error) {
  const code = String(error?.code || error?.errorCode || error?.status || "");
  const message = String(error?.message || "").toLowerCase();
  return code === "700100" || message.includes("instance id");
}

function resetSendbirdRuntimeCache() {
  sendbirdActiveChannel = null;
  sendbirdActiveThread = null;
  sendbirdMessages = [];
  sendbirdTypingUsers = [];
  sendbirdClient = null;
  Object.keys(localStorage)
    .filter((key) => key.startsWith("sb-") || key.toLowerCase().includes("sendbird"))
    .forEach((key) => localStorage.removeItem(key));
}

async function loadSendbirdSdkModules() {
  const errors = [];
  for (const source of SENDBIRD_SDK_MODULE_SOURCES) {
    try {
      const [chatModule, groupChannelModule] = await Promise.all([
        import(source.chat),
        import(source.groupChannel)
      ]);
      return {
        SendbirdChat: chatModule.default,
        GroupChannelModule: groupChannelModule.GroupChannelModule
      };
    } catch (error) {
      errors.push(error?.message || String(error));
    }
  }
  const message = errors.find(Boolean) || "Importing a module script failed.";
  const sdkError = new Error(`Could not load Sendbird messaging tools. ${message}`);
  sdkError.name = "SendbirdSdkLoadError";
  throw sdkError;
}

function autoConnectMessagingAfterLogin() {
  if (sendbirdAutoConnectAttempted || !SENDBIRD_APP_ID || !authState.session) return;
  sendbirdAutoConnectAttempted = true;
  connectSendbirdMessaging({ quiet: true }).catch((error) => {
    console.error(error);
  });
}

async function connectSendbirdMessaging(options = {}) {
  if (!SENDBIRD_APP_ID) {
    sendbirdConnectionState = {
      status: "error",
      errorCode: "CONFIG",
      errorMessage: "Sendbird Application ID is missing."
    };
    renderMessaging();
    return;
  }
  try {
    if (options.clean) resetSendbirdRuntimeCache();
    sendbirdConnectionState = { status: "connecting", errorCode: "", errorMessage: "" };
    renderMessaging();
    const { SendbirdChat, GroupChannelModule } = await loadSendbirdSdkModules();
    if (!sendbirdClient) {
      sendbirdClient = SendbirdChat.init({
        appId: SENDBIRD_APP_ID,
        modules: [new GroupChannelModule()]
      });
    }
    const profile = notificationSubscriberForCurrentUser();
    await sendbirdClient.connect(currentSendbirdUserId());
    if (sendbirdClient.updateCurrentUserInfo && profile.firstName) {
      await sendbirdClient.updateCurrentUserInfo(`${profile.firstName} ${profile.lastName}`.trim(), "");
    }
    sendbirdConnectionState = { status: "connected", errorCode: "", errorMessage: "" };
    startSendbirdTypingPoller();
    startSendbirdMessageRefreshPoller();
    await ensureDueEventMessageChannels();
    renderMessaging();
    if (!options.quiet) toast("Messaging connected.");
  } catch (error) {
    console.error(error);
    if (!options.clean && sendbirdNeedsCleanReconnect(error)) {
      resetSendbirdRuntimeCache();
      return connectSendbirdMessaging({ ...options, clean: true });
    }
    sendbirdConnectionState = { status: "error", ...sendbirdErrorDetails(error) };
    renderMessaging();
  }
}

async function loadSendbirdMessages(channel) {
  if (!channel) return [];
  if (typeof channel.getMessagesByTimestamp === "function") {
    return await channel.getMessagesByTimestamp(Date.now(), { prevResultSize: 30, nextResultSize: 0, isInclusive: true });
  }
  if (typeof channel.createPreviousMessageListQuery === "function") {
    const query = channel.createPreviousMessageListQuery({ limit: 30, reverse: false });
    return await query.load();
  }
  return [];
}

function sendbirdMessageKey(message) {
  const key = String(message?.messageId || message?.reqId || message?.requestId || "");
  return key.startsWith("local-") ? "" : key;
}

function mergeVisibleSendbirdMessages(loadedMessages = []) {
  const merged = [...loadedMessages];
  sendbirdMessages
    .filter((message) => message?.isLocalOwn && !sendbirdMessageKey(message))
    .forEach((message) => merged.push(message));
  sendbirdMessages
    .filter((message) => message?.isLocalOwn && sendbirdMessageKey(message))
    .forEach((message) => {
      const key = sendbirdMessageKey(message);
      if (!merged.some((item) => sendbirdMessageKey(item) === key)) merged.push(message);
    });
  return merged.sort((a, b) => Number(a?.createdAt || 0) - Number(b?.createdAt || 0));
}

async function refreshActiveSendbirdMessages(options = {}) {
  if (!sendbirdActiveChannel || sendbirdMessageRefreshInFlight) return;
  sendbirdMessageRefreshInFlight = true;
  try {
    const loadedMessages = await loadSendbirdMessages(sendbirdActiveChannel);
    sendbirdMessages = options.keepLocal ? mergeVisibleSendbirdMessages(loadedMessages) : loadedMessages;
    renderMessageThread();
    if (options.scrollToBottom) scrollActiveMessageThreadToBottom();
  } catch (error) {
    console.warn(error);
  } finally {
    sendbirdMessageRefreshInFlight = false;
  }
}

function refreshSendbirdTypingUsers() {
  if (!sendbirdActiveChannel || typeof sendbirdActiveChannel.getTypingUsers !== "function") {
    sendbirdTypingUsers = [];
    renderMessageThread();
    return;
  }
  sendbirdTypingUsers = sendbirdActiveChannel.getTypingUsers() || [];
  renderMessageThread();
}

function startSendbirdTypingPoller() {
  if (sendbirdTypingPoller) return;
  sendbirdTypingPoller = window.setInterval(() => {
    if (state.activeView === "messages" && sendbirdActiveChannel) refreshSendbirdTypingUsers();
  }, 2500);
}

function startSendbirdMessageRefreshPoller() {
  if (sendbirdMessageRefreshPoller) return;
  sendbirdMessageRefreshPoller = window.setInterval(() => {
    if (state.activeView === "messages" && sendbirdActiveChannel) {
      refreshActiveSendbirdMessages({ keepLocal: true });
    }
  }, SENDBIRD_MESSAGE_REFRESH_MS);
}

async function syncSendbirdChannelMembers(channel, userIds) {
  if (!channel || !Array.isArray(userIds) || !userIds.length) return;
  const existing = new Set((channel.members || []).map((member) => member.userId).filter(Boolean));
  const missing = userIds.filter((userId) => !existing.has(userId));
  if (!missing.length) return;
  try {
    if (typeof channel.inviteWithUserIds === "function") await channel.inviteWithUserIds(missing);
    else if (typeof channel.invite === "function") await channel.invite(missing);
  } catch (error) {
    console.warn(error);
  }
}

async function ensureDueEventMessageChannels() {
  if (!sendbirdClient?.currentUser || !sendbirdClient?.groupChannel) return;
  const today = new Date();
  const dueEvents = visibleEvents().filter((event) => {
    if (!event.startDate) return false;
    const start = new Date(event.startDate);
    return Number.isFinite(start.getTime()) && start <= today;
  });
  for (const eventRecord of dueEvents.slice(0, 5)) {
    try {
      await openMessageChannel("event", eventRecord.id, { silent: true, keepCurrent: true });
    } catch (error) {
      console.warn(error);
    }
  }
}

async function openEventMessagingChannel(eventId) {
  await openMessageChannel("event", eventId);
}

async function openMessageChannel(type, eventId, options = {}) {
  const eventRecord = getEvent(eventId);
  if (!eventRecord) return;
  const client = await ensureSendbirdConnected();
  if (!client?.groupChannel) {
    toast("Messaging could not connect.");
    return;
  }
  const threadType = MESSAGE_THREAD_TYPES[type] ? type : "event";
  const setting = await ensureMessageThreadSetting(threadType, eventRecord);
  const userIds = sendbirdThreadUsers(threadType, eventRecord);
  try {
    let channel = await savedSendbirdChannel(client, setting);
    if (!channel) {
      channel = await client.groupChannel.createChannel({
        name: sendbirdThreadName(threadType, eventRecord),
        invitedUserIds: userIds,
        isDistinct: false,
        customType: threadType,
        data: JSON.stringify({ eventId: eventRecord.id, threadType, threadKey: setting.threadKey })
      });
      await saveSendbirdChannelUrl(setting, channel);
    }
    await syncSendbirdChannelMembers(channel, userIds);
    if (options.keepCurrent) return channel;
    sendbirdActiveChannel = channel;
    sendbirdActiveThread = { type: threadType, eventId: eventRecord.id };
    sendbirdMessages = await loadSendbirdMessages(sendbirdActiveChannel);
    startSendbirdMessageRefreshPoller();
    refreshSendbirdTypingUsers();
    renderMessaging();
    if (isMobileMessageLayout()) $("#messages")?.scrollIntoView({ block: "start" });
  } catch (error) {
    console.error(error);
    if (!options.silent) toast(error.message || "Could not open message thread.");
  }
}

async function openDirectMessageChannel(profileId) {
  const directProfile = directMessageProfiles().find((profile) => profile.id === profileId);
  if (!directProfile) {
    toast("That direct message contact is not available in this access view.");
    return;
  }
  const client = await ensureSendbirdConnected();
  if (!client?.groupChannel) {
    toast("Messaging could not connect.");
    return;
  }
  try {
    const setting = await ensureMessageThreadSetting("direct", null, directProfile.id);
    sendbirdActiveChannel = await savedSendbirdChannel(client, setting);
    if (!sendbirdActiveChannel) {
      sendbirdActiveChannel = await client.groupChannel.createChannel({
        name: sendbirdThreadName("direct", null, directProfile),
        invitedUserIds: sendbirdThreadUsers("direct", null, directProfile),
        isDistinct: false,
        customType: "direct",
        data: JSON.stringify({ threadType: "direct", profileId: directProfile.id, threadKey: setting.threadKey })
      });
      await saveSendbirdChannelUrl(setting, sendbirdActiveChannel);
    }
    await syncSendbirdChannelMembers(sendbirdActiveChannel, sendbirdThreadUsers("direct", null, directProfile));
    sendbirdActiveThread = { type: "direct", profileId: directProfile.id };
    sendbirdMessages = await loadSendbirdMessages(sendbirdActiveChannel);
    startSendbirdMessageRefreshPoller();
    refreshSendbirdTypingUsers();
    renderMessaging();
    if (isMobileMessageLayout()) $("#messages")?.scrollIntoView({ block: "start" });
  } catch (error) {
    console.error(error);
    toast(error.message || "Could not open direct message.");
  }
}

async function openPermanentMessageChannel(type, key) {
  const thread = permanentMessageThreadTargets(type).find((item) => item.key === key);
  if (!thread) {
    toast("That message thread is not available in this access view.");
    return;
  }
  const client = await ensureSendbirdConnected();
  if (!client?.groupChannel) {
    toast("Messaging could not connect.");
    return;
  }
  try {
    const setting = await ensureMessageThreadSetting(type, null, key);
    const threadRef = { id: key };
    sendbirdActiveChannel = await savedSendbirdChannel(client, setting);
    if (!sendbirdActiveChannel) {
      sendbirdActiveChannel = await client.groupChannel.createChannel({
        name: sendbirdThreadName(type, null, threadRef),
        invitedUserIds: sendbirdThreadUsers(type, null, threadRef),
        isDistinct: false,
        customType: type,
        data: JSON.stringify({ threadType: type, threadKey: key })
      });
      await saveSendbirdChannelUrl(setting, sendbirdActiveChannel);
    }
    await syncSendbirdChannelMembers(sendbirdActiveChannel, sendbirdThreadUsers(type, null, threadRef));
    sendbirdActiveThread = { type, profileId: key };
    sendbirdMessages = await loadSendbirdMessages(sendbirdActiveChannel);
    startSendbirdMessageRefreshPoller();
    refreshSendbirdTypingUsers();
    renderMessaging();
    if (isMobileMessageLayout()) $("#messages")?.scrollIntoView({ block: "start" });
  } catch (error) {
    console.error(error);
    toast(error.message || "Could not open message thread.");
  }
}

async function sendSendbirdMessage(event) {
  event.preventDefault();
  if (!sendbirdActiveChannel) {
    toast("Open an event thread first.");
    return;
  }
  const input = event.currentTarget.elements.message;
  const message = String(input.value || "").trim();
  if (!message) return;
  const optimisticId = `local-${Date.now()}`;
  const optimisticMessage = {
    messageId: optimisticId,
    message,
    isLocalOwn: true,
    deliveryStatus: "sending",
    createdAt: Date.now(),
    sender: {
      userId: sendbirdClient?.currentUser?.userId || currentSendbirdUserId(),
      nickname: sendbirdClient?.currentUser?.nickname || "You"
    }
  };
  input.value = "";
  sendbirdMessages = [...sendbirdMessages, optimisticMessage];
  renderMessageThread();
  scrollActiveMessageThreadToBottom();
  try {
    const sentMessage = await sendbirdActiveChannel.sendUserMessage({ message });
    if (typeof sendbirdActiveChannel.endTyping === "function") sendbirdActiveChannel.endTyping();
    const deliveredMessage = { ...(sentMessage || optimisticMessage), isLocalOwn: true, deliveryStatus: "delivered" };
    sendbirdMessages = sendbirdMessages.map((item) => item.messageId === optimisticId ? deliveredMessage : item);
    refreshSendbirdTypingUsers();
    renderMessageThread();
    scrollActiveMessageThreadToBottom();
    refreshActiveSendbirdMessages({ keepLocal: true, scrollToBottom: true });
  } catch (error) {
    console.error(error);
    sendbirdMessages = sendbirdMessages.filter((item) => item.messageId !== optimisticId);
    renderMessageThread();
    toast(error.message || "Could not send message.");
  }
}

function rentalPhotoNotificationPayload(event, worker, card, type) {
  const route = smtpRouteForRentalNotifications();
  if (!route?.fromEmail || !route?.host || !route?.port || !route?.username || !route?.secretRef) return null;
  return {
    type,
    to: worker?.email || authState.user?.email || "",
    workerName: worker?.name || "Crew member",
    eventName: event?.name || card?.eventName || "Assigned event",
    eventStart: event?.startDate || "",
    eventEnd: event?.endDate || "",
    vehiclePageUrl: `${location.origin}${location.pathname}#vehicles`,
    emailRoute: route
  };
}

async function sendRentalPhotoNotification(event, worker, card, type) {
  if (!initializeSupabaseClient()) return { ok: false, message: "Supabase login is not configured." };
  const payload = rentalPhotoNotificationPayload(event, worker, card, type);
  if (!payload?.to) return { ok: false, message: "No crew email is available for rental photo notification." };
  if (!payload.emailRoute) return { ok: false, message: "Client SMTP settings are needed for rental photo notifications." };
  const { data, error } = await supabaseClient.functions.invoke(RENTAL_PHOTO_NOTIFICATION_FUNCTION, { body: payload });
  if (error) {
    console.error(error);
    return { ok: false, message: await loginSetupErrorMessage(error) };
  }
  const workflowId = type === "urgent_start_missing" ? NOVU_WORKFLOWS.rentalPhotoUrgent : NOVU_WORKFLOWS.rentalPhotoReminder;
  triggerNovuNotification(workflowId, {
    type,
    eventName: event?.name || card?.eventName || "Assigned event",
    workerName: worker?.name || "Crew member",
    vehiclePageUrl: `${location.origin}${location.pathname}#vehicles`
  }, {
    subscriberId: worker?.authUserId || worker?.id || authState.user?.id || worker?.email || "",
    email: worker?.email || "",
    firstName: String(worker?.name || "Crew").split(" ")[0],
    lastName: String(worker?.name || "").split(" ").slice(1).join(" ")
  }, { silent: true, transactionId: `${type}-${card?.id || ""}` }).catch((novuError) => console.warn(novuError));
  return { ok: true, message: data?.messageId ? "Rental photo email sent." : "Rental photo notification sent." };
}

function scheduleRentalUrgentCheck(cardId) {
  if (!cardId || pendingRentalUrgencyIds.has(cardId)) return;
  pendingRentalUrgencyIds.add(cardId);
  window.setTimeout(() => {
    pendingRentalUrgencyIds.delete(cardId);
    checkRentalPhotoUrgencies();
  }, 15 * 60000);
}

function checkRentalPhotoUrgencies() {
  if (!isCrewRole()) return;
  state.timecards
    .filter((card) => card.workerId === state.activeWorkerId && card.clockIn && !card.clockOut && card.rentalStartReminderAt && !card.rentalUrgentNotificationSentAt)
    .forEach((card) => {
      const elapsed = Date.now() - new Date(card.rentalStartReminderAt).getTime();
      if (elapsed < 15 * 60000) {
        scheduleRentalUrgentCheck(card.id);
        return;
      }
      const event = getEvent(card.eventId);
      if (!rentalVehicleRequired(event, card)) return;
      const startLog = vehicleLogForEventWorker(card.eventId, card.workerId, "Start");
      if (vehicleStartCheckStarted(startLog)) return;
      sendRentalUrgentNotification(card).catch((error) => console.error(error));
    });
}

async function sendRentalUrgentNotification(card) {
  if (!card?.id || pendingRentalUrgencyIds.has(`send-${card.id}`)) return;
  pendingRentalUrgencyIds.add(`send-${card.id}`);
  const event = getEvent(card.eventId);
  const worker = getWorker(card.workerId);
  const result = await sendRentalPhotoNotification(event, worker, card, "urgent_start_missing");
  if (result.ok) {
    await put("timecards", {
      ...card,
      rentalUrgentNotificationSentAt: new Date().toISOString(),
      notes: appendTimecardNote(card, "Urgent rental vehicle start-photo reminder was sent because start photos and plate number were still missing after 15 minutes.")
    });
    await loadState();
    setView(state.activeView);
  }
  pendingRentalUrgencyIds.delete(`send-${card.id}`);
  if (result.message) toast(result.message);
}

async function addRunnerCategory(event) {
  event.preventDefault();
  if (!(isCrewRole() || hasUnlimitedRunnerCategoryAccess())) return;
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
  if (!hasUnlimitedRunnerCategoryAccess() && runnerCategoriesAddedThisYear() >= 3) {
    toast("This worker has used all 3 category adds for this year.");
    return;
  }
  const year = new Date().getFullYear();
  await put("runnerCategories", {
    name,
    createdByWorkerId: state.activeWorkerId || authState.user?.id || "",
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
  await put("timecards", { ...card, workDate: timecardWorkDate(card), clockOut: toLocalInputValue(new Date()) });
  await loadState();
  setView(state.activeView);
  toast("Clocked out.");
}

async function closePriorOpenCrewTimecards(eventId, workerId, todayKey) {
  const priorOpenCards = state.timecards.filter((card) => {
    return card.eventId === eventId
      && card.workerId === workerId
      && card.clockIn
      && !card.clockOut
      && timecardWorkDate(card) !== todayKey;
  });
  for (const card of priorOpenCards) {
    const workDate = timecardWorkDate(card);
    await put("timecards", {
      ...card,
      workDate,
      clockOut: endOfWorkDateInput(workDate),
      autoClosedAt: new Date().toISOString(),
      notes: appendTimecardNote(card, "Auto-closed at the end of the work date so the next day could start a new timecard.")
    });
  }
  if (priorOpenCards.length) await loadState();
}

function priorOpenCrewTimecards(eventId, workerId, todayKey) {
  return state.timecards
    .filter((card) => card.eventId === eventId
      && card.workerId === workerId
      && card.clockIn
      && !card.clockOut
      && timecardWorkDate(card) !== todayKey)
    .sort((a, b) => new Date(b.clockIn || b.createdAt || 0) - new Date(a.clockIn || a.createdAt || 0));
}

function newCrewTimecard(eventId, event, workDate) {
  const worker = getWorker(state.activeWorkerId);
  const assignment = assignmentForEventWorker(eventId, state.activeWorkerId);
  return {
    id: crypto.randomUUID(),
    workerId: state.activeWorkerId,
    eventId,
    eventName: event?.name || "",
    venueId: event?.venueId || "",
    promoterId: event?.promoterId || "",
    workDate,
    breakMinutes: "0",
    dayRate: assignment?.dayRate || worker?.defaultDayRate || worker?.defaultRate || "",
    includedHours: assignment?.includedHours || worker?.defaultIncludedHours || "10",
    additionalRate: assignment?.additionalRate || worker?.defaultAdditionalRate || "",
    vehicleUse: assignment?.vehicleUse || ""
  };
}

async function crewPunch(eventId, field) {
  if (!state.activeWorkerId || !isEventVisible(eventId)) return;
  const event = getEvent(eventId);
  const nowDate = new Date();
  const now = toLocalInputValue(nowDate);
  const todayKey = localDateKey(nowDate);
  let card = null;
  const priorOpen = priorOpenCrewTimecards(eventId, state.activeWorkerId, todayKey);
  if (field === "clockOut" && priorOpen.length) {
    card = priorOpen[0];
  } else {
    if (field === "clockIn") await closePriorOpenCrewTimecards(eventId, state.activeWorkerId, todayKey);
    card = state.timecards.find((item) => item.eventId === eventId && item.workerId === state.activeWorkerId && timecardWorkDate(item) === todayKey && !item.clockOut)
      || state.timecards.find((item) => item.eventId === eventId && item.workerId === state.activeWorkerId && timecardWorkDate(item) === todayKey);
  }
  if (card?.clockOut && field === "clockIn") card = null;
  if (card?.clockIn && !card.clockOut && field === "clockIn") {
    toast("Wrap the open timecard before starting another line.");
    return;
  }
  if (card?.clockOut && field !== "clockIn") {
    toast("Start a new Call Time before adding more punches.");
    return;
  }
  if (!card && field !== "clockIn") {
    toast("Start Call Time first.");
    return;
  }
  if (!card) {
    card = newCrewTimecard(eventId, event, todayKey);
  }
  card.id = card.id || crypto.randomUUID();
  card.workDate = field === "clockOut" && timecardWorkDate(card) !== todayKey ? timecardWorkDate(card) : todayKey;
  if (field === "clockOut" && rentalVehicleRequired(event, card)) {
    const endLog = vehicleLogForEventWorker(eventId, state.activeWorkerId, "End");
    if (!vehicleEndPhotosComplete(endLog)) {
      const nowDate = new Date();
      const bypassAt = card.rentalPhotoBypassAfter ? new Date(card.rentalPhotoBypassAfter) : null;
      const warning = "Rental vehicle end photos were required at Wrap. A wrap attempt was made before end photos and plate number were submitted.";
      if (!bypassAt || Number.isNaN(bypassAt.getTime())) {
        card.rentalPhotoBypassAfter = new Date(nowDate.getTime() + 5 * 60000).toISOString();
        card.notes = appendTimecardNote(card, warning);
        await put("timecards", card);
        await loadState();
        setView("vehicles");
        toast("End vehicle photos are required before Wrap. You can bypass after 5 minutes, and this warning is saved on the timecard.");
        return;
      }
      if (nowDate < bypassAt) {
        const minutes = Math.max(1, Math.ceil((bypassAt - nowDate) / 60000));
        toast(`End vehicle photos are still required. Bypass opens in ${minutes} minute(s).`);
        return;
      }
      card.notes = appendTimecardNote(card, `${warning} Bypassed after the 5 minute warning window.`);
      card.rentalPhotoBypassUsedAt = nowDate.toISOString();
    }
  }
  card[field] = now;
  const location = await capturePunchLocation();
  if (location) {
    card.punchLocations = { ...(card.punchLocations || {}), [field]: location };
  }
  if (field === "clockIn" && !card.eventName) card.eventName = event?.name || "";
  if (field === "clockIn" && rentalVehicleRequired(event, card)) {
    const assignment = assignmentForEventWorker(eventId, state.activeWorkerId);
    if (assignment?.vehicleUse === "Rented Vehicle") await ensureVehicleChecksForAssignment(assignment);
    const startLog = vehicleLogForEventWorker(eventId, state.activeWorkerId, "Start");
    if (!vehicleStartCheckStarted(startLog)) {
      card.rentalStartReminderAt = new Date().toISOString();
      if (!card.rentalStartNotificationSentAt) {
        const worker = getWorker(state.activeWorkerId);
        const result = await sendRentalPhotoNotification(event, worker, card, "start_reminder");
        if (result.ok) {
          card.rentalStartNotificationSentAt = new Date().toISOString();
          card.notes = appendTimecardNote(card, "Rental vehicle start-photo reminder was sent at Call Time.");
        }
        if (result.message) toast(result.message);
      } else {
        toast("Reminder: submit rental vehicle start photos and plate number within 15 minutes.");
      }
      scheduleRentalUrgentCheck(card.id);
    }
  }
  await put("timecards", card);
  await loadState();
  setView(state.activeView);
  toast(location ? "Time updated with location." : "Time updated. Location was not captured.");
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

async function publishCloudData() {
  if (isAdminRole()) {
    toast("ADMIN cannot publish production records.");
    return;
  }
  await loadState();
  const localCount = Array.from(CLOUD_SYNC_STORES).reduce((sum, storeName) => sum + (state[storeName]?.length || 0), 0);
  if (!localCount) {
    toast("No local demo records found in this browser.");
    return;
  }
  await syncLocalRecordsToSupabase();
  const count = await cloudRecordCount();
  $("#cloudSyncStatus").textContent = `Shared records: ${count}`;
  toast(`Published ${localCount} local records to cloud.`);
}

async function pullCloudData() {
  if (isAdminRole()) {
    toast("ADMIN cannot pull production records.");
    return;
  }
  await hydrateAppRecordsFromSupabase();
  await loadState();
  setView(state.activeView);
  const count = await cloudRecordCount();
  $("#cloudSyncStatus").textContent = `Shared records: ${count}`;
  toast(`Pulled ${count} shared records from cloud.`);
}

function bindEvents() {
  registerIdleSignOutListeners();
  $("#loginForm").addEventListener("submit", loginWithSupabase);
  $("#activateForm").addEventListener("submit", startAccountActivation);
  $("#activateAccountButton").addEventListener("click", () => showActivateScreen("Enter the email address that received the setup link."));
  $("#activateBackButton").addEventListener("click", () => showAuthScreen(""));
  $("#setupForm").addEventListener("submit", completeAccountSetup);
  $("#clearSessionButton").addEventListener("click", clearSavedLogin);
  $("#setupLogoutButton").addEventListener("click", clearSavedLogin);
  $("#logoutButton").addEventListener("click", logout);
  $("#markNotificationsRead").addEventListener("click", markNotificationsRead);
  $("#clearReadNotifications").addEventListener("click", clearReadNotifications);
  $("#mobileInstallButton")?.addEventListener("click", promptMobileAppInstall);
  $("#mobileMenuButton").addEventListener("click", toggleMobileNavigation);
  $("#mobileBottomNav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mobile-view]");
    if (button) setView(button.dataset.mobileView);
  });
  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("mobile-nav-open")) return;
    if (event.target.closest(".sidebar") || event.target.closest("#mobileMenuButton")) return;
    closeMobileNavigation();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMobileNavigation();
    positionOpenRecordMenus();
  });
  window.addEventListener("scroll", positionOpenRecordMenus, true);
  document.addEventListener("toggle", (event) => {
    if (event.target.matches?.(".table-wrap .record-options")) positionOpenRecordMenus();
  }, true);
  $(".nav-list").addEventListener("click", (event) => {
    const groupToggle = event.target.closest("[data-nav-group]");
    if (groupToggle) {
      event.stopPropagation();
      toggleNavGroup(groupToggle.dataset.navGroup);
      return;
    }
    const button = event.target.closest("[data-view]");
    if (button) setView(button.dataset.view);
  });
  $("#accessViewSelect").addEventListener("change", (event) => setAccessRole(event.target.value));
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
  window.addEventListener("online", () => {
    renderConnectionBanner();
    renderMobileDeviceStatus();
    toast("Connection restored.");
  });
  window.addEventListener("offline", () => {
    renderConnectionBanner();
    renderMobileDeviceStatus();
    toast("Offline. Some cloud features will pause until signal returns.");
  });
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPromptEvent = event;
    appInstallState = "ready";
    renderMobileInstallPanel();
  });
  window.addEventListener("appinstalled", () => {
    installPromptEvent = null;
    appInstallState = "installed";
    renderMobileInstallPanel();
    toast("Production Crew installed on this device.");
  });
  $("#timecardForm select[name='eventId']").addEventListener("change", (event) => {
    const selectedEvent = getEvent(event.target.value);
    if (!selectedEvent) return;
    $("#timecardForm").elements.eventName.value = selectedEvent.name || "";
    $("#timecardForm").elements.venueId.value = selectedEvent.venueId || "";
    $("#timecardForm").elements.promoterId.value = selectedEvent.promoterId || "";
    applyWorkerPayDefaultsToTimecard($("#timecardForm").elements.workerId.value);
  });
  $("#timecardForm select[name='workerId']").addEventListener("change", (event) => applyWorkerPayDefaultsToTimecard(event.target.value));
  $("#timecardForm select[name='vehicleUse']").addEventListener("change", () => applyWorkerPayDefaultsToTimecard($("#timecardForm").elements.workerId.value));

  $("#eventForm").addEventListener("submit", (event) => saveForm(event, "events"));
  $("#eventAssignmentForm").addEventListener("submit", (event) => saveForm(event, "eventAssignments"));
  $("#messageThreadManageForm").addEventListener("submit", saveMessageThreadAccess);
  $("#sendbirdMessageForm").addEventListener("submit", sendSendbirdMessage);
  $("#sendbirdMessageForm").elements.message.addEventListener("input", () => {
    if (!sendbirdActiveChannel) return;
    if (typeof sendbirdActiveChannel.startTyping === "function") sendbirdActiveChannel.startTyping();
    window.clearTimeout($("#sendbirdMessageForm").dataset.typingTimer);
    $("#sendbirdMessageForm").dataset.typingTimer = window.setTimeout(() => {
      if (typeof sendbirdActiveChannel?.endTyping === "function") sendbirdActiveChannel.endTyping();
      refreshSendbirdTypingUsers();
    }, 1600);
  });
  $("#eventAssignmentForm select[name='workerId']").addEventListener("change", (event) => applyAssignmentDefaults(event.target.value));
  $("#eventAssignmentForm select[name='vehicleUse']").addEventListener("change", () => {
    applyAssignmentDefaults($("#eventAssignmentForm").elements.workerId.value);
    updateAssignmentVehicleFields($("#eventAssignmentForm"));
  });
  $("#crewSwapForm").addEventListener("submit", finalizeCrewSwap);
  $("#substitutionSwapForm").addEventListener("submit", finalizeSubstitutionSwap);
  $("#eventForm").addEventListener("change", () => renderEventAssignmentManager($("#eventForm")));
  $("#eventAccessForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const eventId = event.currentTarget.elements.eventId.value;
    const productionEvent = getEvent(eventId);
    if (productionEvent) await saveEventAccessLink(productionEvent);
  });
  $("#adminProfileForm").addEventListener("submit", (event) => saveForm(event, "systemProfiles"));
  $("#accessLevelForm").addEventListener("submit", (event) => saveForm(event, "accessLevelDefs"));
  $("#accountAccessForm").addEventListener("submit", saveAccountAccess);
  $("#profileAccessForm").addEventListener("submit", saveProfileAccess);
  $("#quickProfileForm").addEventListener("submit", saveQuickProfile);
  $("#quickProfileForm").elements.paidThroughCompany.addEventListener("change", updateQuickProfileCompanyFields);
  $("#clientForm").addEventListener("submit", (event) => saveForm(event, "clients"));
  $("#clientPackageForm").addEventListener("submit", saveClientPackages);
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
  $("#reportForm").addEventListener("change", (event) => {
    if (event.target.matches("[data-report-type], select[name='eventId'], select[name='workerId']")) updateReportTypeFields($("#reportForm"));
  });
  $("#vehicleForm").addEventListener("change", () => applyVehicleAssignmentLock($("#vehicleForm")));
  $("#timecardEventFilter").addEventListener("change", (event) => {
    state.timecardEventFilter = event.target.value;
    localStorage.setItem("productionCrewTimecardEventFilter", state.timecardEventFilter);
    renderTimecards();
  });
  $("#timecardFilter").addEventListener("change", (event) => {
    state.timecardFilter = event.target.value;
    localStorage.setItem("productionCrewTimecardFilter", state.timecardFilter);
    renderTimecards();
  });
  $("#timecardSort").addEventListener("change", (event) => {
    state.timecardSort = event.target.value;
    localStorage.setItem("productionCrewTimecardSort", state.timecardSort);
    renderTimecards();
  });
  $("#vehicleEventFilter").addEventListener("change", (event) => {
    state.vehicleEventFilter = event.target.value;
    localStorage.setItem("productionCrewVehicleEventFilter", state.vehicleEventFilter);
    renderVehicles();
  });
  $("#vehicleFilter").addEventListener("change", (event) => {
    state.vehicleFilter = event.target.value;
    localStorage.setItem("productionCrewVehicleFilter", state.vehicleFilter);
    renderVehicles();
  });
  $("#vehicleSort").addEventListener("change", (event) => {
    state.vehicleSort = event.target.value;
    localStorage.setItem("productionCrewVehicleSort", state.vehicleSort);
    renderVehicles();
  });
  $("#reportEventFilter").addEventListener("change", (event) => {
    state.reportEventFilter = event.target.value;
    localStorage.setItem("productionCrewReportEventFilter", state.reportEventFilter);
    renderReports();
  });
  $("#reportFilter").addEventListener("change", (event) => {
    state.reportFilter = event.target.value;
    localStorage.setItem("productionCrewReportFilter", state.reportFilter);
    renderReports();
  });
  $("#reportSort").addEventListener("change", (event) => {
    state.reportSort = event.target.value;
    localStorage.setItem("productionCrewReportSort", state.reportSort);
    renderReports();
  });
  $$("[data-smtp-provider]").forEach((select) => {
    select.addEventListener("change", () => updateSmtpForm(select.form, true));
  });
  $$("input[name='smtpFromEmail']").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.form?.elements?.smtpUsername && !input.form.elements.smtpUsername.value) {
        input.form.elements.smtpUsername.value = input.value;
      }
    });
  });
  $("#accessLevelForm select[name='baseRole']").addEventListener("change", () => renderViewOptionControls($("#accessLevelForm")));

  $$(".clear-form").forEach((button) => button.addEventListener("click", () => closeForm(button.dataset.form)));
  $("#clockInNow").addEventListener("click", () => {
    $("#timecardForm").elements.clockIn.value = toLocalInputValue(new Date());
    $("#timecardForm").elements.clockOut.value = "";
  });
  $("#exportData").addEventListener("click", exportData);
  $("#importData").addEventListener("change", importData);
  $("#publishCloudData").addEventListener("click", () => publishCloudData().catch((error) => {
    console.error(error);
    toast(error.message || "Cloud publish failed.");
  }));
  $("#pullCloudData").addEventListener("click", () => pullCloudData().catch((error) => {
    console.error(error);
    toast(error.message || "Cloud pull failed.");
  }));

  document.body.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-edit]");
    const openButton = event.target.closest("[data-open-form]");
    const quickProfileButton = event.target.closest("[data-open-quick-profile]");
    const deleteButton = event.target.closest("[data-delete]");
    const clockButton = event.target.closest("[data-clock-out]");
    const punchButton = event.target.closest("[data-time-punch]");
    const runnerTab = event.target.closest("[data-runner-category]");
    const directoryTab = event.target.closest("[data-directory-tab]");
    const payrollTab = event.target.closest("[data-payroll-view]");
    const profileNoteButton = event.target.closest("[data-save-profile-note]");
    const runnerNoteButton = event.target.closest("[data-save-runner-note]");
    const runnerStatusButton = event.target.closest("[data-runner-status]");
    const selectVisibleButton = event.target.closest("[data-select-visible]");
    const clearSelectedButton = event.target.closest("[data-clear-selected]");
    const bulkDeleteButton = event.target.closest("[data-bulk-delete]");
    const loginSetupButton = event.target.closest("[data-send-login]");
    const smtpTestButton = event.target.closest("[data-send-smtp-test]");
    const viewClientCompanyButton = event.target.closest("[data-view-client-company]");
    const editViewedClientButton = event.target.closest("#editViewedClientCompany");
    const eventAccessButton = event.target.closest("[data-event-access]");
    const eventGigSearchButton = event.target.closest("[data-event-gig-search]");
    const addVenueContactButton = event.target.closest("[data-add-venue-contact]");
    const submitVenueContactButton = event.target.closest("[data-submit-venue-contact]");
    const removeVenueContactButton = event.target.closest("[data-remove-venue-contact]");
    const vehiclePhaseButton = event.target.closest("[data-vehicle-phase]");
    const addAssignmentButton = event.target.closest("[data-add-assignment]");
    const formAddAssignmentButton = event.target.closest("[data-form-add-assignment]");
    const swapCrewButton = event.target.closest("[data-swap-crew]");
    const substituteCrewButton = event.target.closest("[data-substitute-crew]");
    const publicRunnerStatusButton = event.target.closest("[data-public-runner-status]");
    const publicGigResourcesButton = event.target.closest("[data-public-gig-resources]");
    const refreshUsersButton = event.target.closest("[data-refresh-users]");
    const deleteUserButton = event.target.closest("[data-delete-user-account]");
    const manageAccountAccessButton = event.target.closest("[data-manage-account-access]");
    const manageClientPackagesButton = event.target.closest("[data-manage-client-packages]");
    const connectSendbirdButton = event.target.closest("[data-connect-sendbird]");
    const openEventChannelButton = event.target.closest("[data-open-event-channel]");
    const messageThreadTypeButton = event.target.closest("[data-message-thread-type]");
    const messageEventOptionsButton = event.target.closest("[data-message-event-options]");
    const messageEventFilter = event.target.closest("[data-message-event-filter]");
    const messageEventSelect = event.target.closest("[data-message-event-select]");
    const messageDirectScopeButton = event.target.closest("[data-message-direct-scope]");
    const openMessageChannelButton = event.target.closest("[data-open-message-channel]");
    const openDirectMessageButton = event.target.closest("[data-open-direct-message]");
    const openPermanentMessageButton = event.target.closest("[data-open-permanent-message]");
    const newMessageThreadButton = event.target.closest("[data-new-message-thread]");
    const manageMessageThreadButton = event.target.closest("[data-manage-message-thread]");
    const closeMobileMessageButton = event.target.closest("[data-close-mobile-message]");
    const notifyProductionOfficeButton = event.target.closest("[data-notify-production-office]");
    const profileAccessButton = event.target.closest("[data-open-profile-access]");
    const viewRecordButton = event.target.closest("[data-view-record]");
    const mobileGoViewButton = event.target.closest("[data-mobile-go-view]");
    const dashboardLinkButton = event.target.closest("[data-dashboard-link]");
    const openReportTypeButton = event.target.closest("[data-open-report-type]");
    const requestMobilePermissionsButton = event.target.closest("[data-request-mobile-permissions]");
    const openNotificationButton = event.target.closest("[data-open-notification]");

    if (openNotificationButton) {
      await openNotification(openNotificationButton.dataset.openNotification);
      return;
    }
    if (quickProfileButton) {
      $("#globalAddMenu")?.removeAttribute("open");
      await openQuickProfileForm(quickProfileButton.dataset.openQuickProfile);
      return;
    }
    if (requestMobilePermissionsButton) {
      await requestMobilePermissions();
      return;
    }
    if (openReportTypeButton) {
      openReportFormForType(openReportTypeButton.dataset.openReportType);
      return;
    }
    if (mobileGoViewButton) {
      setView(mobileGoViewButton.dataset.mobileGoView);
      return;
    }
    if (dashboardLinkButton) {
      setView(dashboardLinkButton.dataset.dashboardLink);
      return;
    }
    if (publicRunnerStatusButton) {
      await updatePublicRunnerStatus(publicRunnerStatusButton.dataset.publicRunnerStatus, publicRunnerStatusButton.dataset.status);
      return;
    }
    if (publicGigResourcesButton) {
      $("#publicGigResources")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (refreshUsersButton) await refreshUserAccessList();
    if (deleteUserButton) await deleteUserAccount(deleteUserButton.dataset.deleteUserAccount);
    if (manageAccountAccessButton) await openAccountAccessForm(manageAccountAccessButton.dataset.manageAccountAccess);
    if (manageClientPackagesButton) {
      openClientPackageForm(manageClientPackagesButton.dataset.manageClientPackages);
      return;
    }
    if (connectSendbirdButton) await connectSendbirdMessaging();
    if (openEventChannelButton) await openEventMessagingChannel(openEventChannelButton.dataset.openEventChannel);
    if (messageThreadTypeButton) {
      await selectMessageThreadType(messageThreadTypeButton.dataset.messageThreadType);
      return;
    }
    if (messageEventOptionsButton) {
      state.messageEventPickerOpen = !state.messageEventPickerOpen;
      renderMessaging();
      return;
    }
    if (messageEventFilter) {
      state.messageEventFilter = messageEventFilter.value || "current";
      localStorage.setItem("productionCrewMessageEventFilter", state.messageEventFilter);
      const fallback = selectedMessageEvent();
      if (fallback) localStorage.setItem("productionCrewSelectedMessageEventId", fallback.id);
      renderMessaging();
      return;
    }
    if (messageEventSelect) {
      state.selectedMessageEventId = messageEventSelect.value || "";
      localStorage.setItem("productionCrewSelectedMessageEventId", state.selectedMessageEventId);
      renderMessaging();
      return;
    }
    if (messageDirectScopeButton) {
      state.messageDirectScope = messageDirectScopeButton.dataset.messageDirectScope === "all" ? "all" : "event";
      state.messageDirectPickerOpen = false;
      localStorage.setItem("productionCrewMessageDirectScope", state.messageDirectScope);
      renderMessaging();
      return;
    }
    if (openMessageChannelButton) {
      const [type, eventId] = openMessageChannelButton.dataset.openMessageChannel.split(":");
      await openMessageChannel(type, eventId);
    }
    if (openPermanentMessageButton) {
      const [type, ...keyParts] = openPermanentMessageButton.dataset.openPermanentMessage.split(":");
      await openPermanentMessageChannel(type, keyParts.join(":"));
    }
    if (openDirectMessageButton) await openDirectMessageChannel(openDirectMessageButton.dataset.openDirectMessage);
    if (closeMobileMessageButton) {
      sendbirdActiveChannel = null;
      sendbirdActiveThread = null;
      sendbirdMessages = [];
      sendbirdTypingUsers = [];
      renderMessaging();
      $("#messages")?.scrollIntoView({ block: "start" });
      return;
    }
    if (manageMessageThreadButton) openMessageThreadManageForm();
    if (newMessageThreadButton) {
      if (isMobileMessageLayout()) {
        state.messageDirectPickerOpen = !state.messageDirectPickerOpen;
        renderMessaging();
        return;
      }
      toast("Custom event thread setup is next. Use Direct Message for new private threads right now.");
      state.messagingThreadType = "direct";
      state.messageDirectScope = "all";
      localStorage.setItem("productionCrewMessagingThreadType", state.messagingThreadType);
      localStorage.setItem("productionCrewMessageDirectScope", state.messageDirectScope);
      sendbirdActiveChannel = null;
      sendbirdActiveThread = null;
      sendbirdMessages = [];
      renderMessaging();
    }
    if (notifyProductionOfficeButton) await notifyRunnerToProductionOffice(notifyProductionOfficeButton.dataset.notifyProductionOffice);
    if (profileAccessButton) await openProfileAccessForm(profileAccessButton.dataset.openProfileAccess);
    if (viewRecordButton) {
      const [storeName, id] = viewRecordButton.dataset.viewRecord.split(":");
      openReadOnlyRecord(storeName, id);
    }

  if (openButton) {
      await refreshSiteAccessLevelsForForm(openButton.dataset.openForm);
      clearForm(openButton.dataset.openForm);
      if (openButton.dataset.openForm === "adminProfileForm" && isAdminRole()) {
        fillForm("adminProfileForm", activeAdminProfile());
      } else if (openButton.dataset.openForm === "clientProfileForm" && isClientRole()) {
        const active = activeClientRepRecord() || clientRepDefaults();
        fillForm("clientProfileForm", active);
      } else if (openButton.dataset.openForm === "clientCompanyProfileForm" && isClientRole()) {
        fillForm("clientCompanyProfileForm", activeClientRecord() || clientCompanyDefaults());
      } else if (openButton.dataset.openForm === "workerForm" && isCrewRole()) {
        const active = getWorker(state.activeWorkerId);
        if (active) fillForm("workerForm", active);
        else openForm("workerForm");
      } else {
        openForm(openButton.dataset.openForm);
      }
    }

    if (editButton) {
      await refreshSiteAccessLevelsForForm(editButton.dataset.form);
      const collection = state[editButton.dataset.edit];
      const record = collection.find((item) => item.id === editButton.dataset.id);
      if (record) fillForm(editButton.dataset.form, record);
    }

    if (deleteButton) await deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);
    if (eventAccessButton) {
      const eventRecord = getEvent(eventAccessButton.dataset.eventAccess);
      if (eventRecord) await createEventAccessLink(eventRecord);
    }
    if (eventGigSearchButton) {
      openGigDirectoryForEvent(eventGigSearchButton.dataset.eventGigSearch);
      return;
    }
    if (addVenueContactButton) {
      const list = $("#venueContactList");
      list.hidden = false;
      list.insertAdjacentHTML("beforeend", venueContactEditorRow({}));
      return;
    }
    if (submitVenueContactButton) {
      toast("Contact ready. Save Venue to keep changes.");
      return;
    }
    if (removeVenueContactButton) {
      const row = removeVenueContactButton.closest("[data-venue-contact-row]");
      row?.remove();
      if (!$("#venueContactList").querySelector("[data-venue-contact-row]")) $("#venueContactList").hidden = true;
      return;
    }
    if (vehiclePhaseButton) openVehiclePhaseForm(vehiclePhaseButton);
    if (addAssignmentButton) openAssignmentForm(addAssignmentButton.dataset.addAssignment);
    if (formAddAssignmentButton?.dataset.formAddAssignment) openAssignmentForm(formAddAssignmentButton.dataset.formAddAssignment);
    if (swapCrewButton) openCrewSwapForm(swapCrewButton.dataset.swapCrew);
    if (substituteCrewButton) openSubstitutionForm(substituteCrewButton.dataset.substituteCrew);
    if (viewClientCompanyButton) openClientCompanyView(viewClientCompanyButton.dataset.viewClientCompany);
    if (smtpTestButton) await sendSmtpTest(smtpTestButton.dataset.sendSmtpTest);
    if (editViewedClientButton?.dataset.editClientId) {
      const client = state.clients.find((item) => item.id === editViewedClientButton.dataset.editClientId);
      if (client) fillForm("clientForm", client);
    }
    if (clockButton) await clockOutNow(clockButton.dataset.clockOut);
    if (punchButton) await crewPunch(punchButton.dataset.eventId, punchButton.dataset.timePunch);
    if (profileNoteButton) await saveProfileNote(profileNoteButton.dataset.saveProfileNote);
    if (runnerNoteButton) await saveRunnerNote(runnerNoteButton.dataset.saveRunnerNote);
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

  document.body.addEventListener("change", (event) => {
    const messageEventFilter = event.target.closest("[data-message-event-filter]");
    const messageEventSelect = event.target.closest("[data-message-event-select]");
    if (messageEventFilter) {
      state.messageEventFilter = messageEventFilter.value || "current";
      localStorage.setItem("productionCrewMessageEventFilter", state.messageEventFilter);
      const fallback = selectedMessageEvent();
      if (fallback) localStorage.setItem("productionCrewSelectedMessageEventId", fallback.id);
      renderMessaging();
      return;
    }
    if (messageEventSelect) {
      state.selectedMessageEventId = messageEventSelect.value || "";
      localStorage.setItem("productionCrewSelectedMessageEventId", state.selectedMessageEventId);
      renderMessaging();
    }
  });

  $("#modalBackdrop").addEventListener("click", closeActiveForm);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeActiveForm();
  });
  window.addEventListener("hashchange", () => {
    if (isPublicEventRoute()) {
      loadPublicEventAccess().catch((error) => {
        console.error(error);
        showPublicEventScreen(error.message || "Could not load event access.");
      });
      return;
    }
    const requested = location.hash.replace("#", "");
    if (requested) setView(requested);
  });
}

async function init() {
  showAuthScreen("Checking session...");
  bindEvents();
  initMobileAppLifecycle();
  initPullToRefresh();
  initEdgeSwipeNavigation();
  initPushRegistrationListeners();
  await registerAppShellServiceWorker();
  await clearPersistedLoginForFreshOpen();
  clearForm("timecardForm");
  clearForm("reportForm");
  await initializeAuth();
}

init().catch((error) => {
  console.error(error);
  showAuthScreen(error.message || "Something went wrong starting the app.");
});
