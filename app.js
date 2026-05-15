const DB_NAME = "productionCrewDatabase";
const DB_VERSION = 16;
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
const SENDBIRD_MESSAGE_REFRESH_MS = 1200;
const GIPHY_API_KEY = window.STAGEGRID_GIPHY_API_KEY || "";
const GIPHY_SEARCH_ENDPOINT = "https://api.giphy.com/v1/gifs/search";
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
const RELEASE_NOTICE_URL = "./release-notice.json";
const RELEASE_NOTICE_POLL_MS = 30000;
const NOTIFICATION_REFRESH_MS = 5000;
const CURRENT_RELEASE_NOTICE = {
  version: "V1.06.037",
  title: "V1.06.037 update installed",
  body: "Supabase account role setup errors now explain the missing Account/Accounting database migration instead of showing the raw enum error."
};
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
  "touringStops",
  "touringCrew",
  "touringTravel",
  "touringDocuments",
  "awardsShows",
  "awardsDocuments",
  "awardsStaff",
  "awardsSchedules",
  "eventAssignments",
  "eventSwaps",
  "timecards",
  "runnerStops",
  "runnerCategories",
  "runnerNotes",
  "runnerRatings",
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
  "touringStops",
  "touringCrew",
  "touringTravel",
  "touringDocuments",
  "awardsShows",
  "awardsDocuments",
  "awardsStaff",
  "awardsSchedules",
  "eventAssignments",
  "eventSwaps",
  "timecards",
  "runnerStops",
  "runnerCategories",
  "runnerNotes",
  "runnerRatings",
  "venueContacts",
  "productionCompanies",
  "productionContacts",
  "vehicleLogs",
  "accidentReports",
  "messageThreadSettings",
  "appNotifications"
]);

const ROLE_ALIASES = {
  admin: "ADMIN",
  account: "ACCOUNT",
  account_admin: "ACCOUNT",
  account_owner: "ACCOUNT",
  accounting: "ACCOUNTING",
  accounting_admin: "ACCOUNTING",
  accounting_rep: "ACCOUNTING",
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
  ACCOUNT: "ACCOUNT",
  ACCOUNT_ADMIN: "ACCOUNT",
  ACCOUNT_OWNER: "ACCOUNT",
  ACCOUNTING: "ACCOUNTING",
  ACCOUNTING_ADMIN: "ACCOUNTING",
  ACCOUNTING_REP: "ACCOUNTING",
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
    views: ["adminProfile", "admin", "adminUsers", "adminClients", "adminUserAccounts", "adminAccessLevels", "messages", "mobileApp"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: false,
    canImportExport: false,
    canSystemEdit: true
  },
  ACCOUNT: {
    label: "ACCOUNT",
    baseRole: "ACCOUNT",
    views: ["dashboard", "clientCompanyProfile", "clientProfile", "adminUserAccounts", "events", "eventDocuments", "emailTemplates", "touringDashboard", "tourAdvancing", "tourCrewPersonnel", "tourTravel", "tourDocuments", "tourSettings", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "awardsSettings", "productionBoard", "staffingAssignments", "staffingSchedule", "timecards", "vehicles", "reports", "payroll", "directory", "runner", "messages", "dataTools", "mobileApp"],
    canAdminEdit: true,
    canOwnerEdit: true,
    canVenueEdit: true,
    canScopedEdit: true,
    canImportExport: true,
    canViewRates: true,
    canSystemEdit: false
  },
  ACCOUNTING: {
    label: "ACCOUNTING",
    baseRole: "ACCOUNTING",
    views: ["dashboard", "timecards", "payroll", "reports", "events", "messages", "mobileApp"],
    canAdminEdit: false,
    canOwnerEdit: false,
    canVenueEdit: false,
    canScopedEdit: true,
    canImportExport: false,
    canViewRates: true,
    canSystemEdit: false
  },
  CLIENT_ADMIN: {
    label: "CLIENT ADMIN",
    baseRole: "CLIENT",
    views: ["dashboard", "clientCompanyProfile", "clientProfile", "workers", "promoters", "venues", "events", "eventDocuments", "emailTemplates", "touringDashboard", "tourAdvancing", "tourCrewPersonnel", "tourTravel", "tourDocuments", "tourSettings", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "awardsSettings", "productionBoard", "staffingAssignments", "staffingSchedule", "timecards", "vehicles", "reports", "payroll", "directory", "runner", "messages", "dataTools", "mobileApp"],
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
    views: ["dashboard", "clientProfile", "promoters", "venues", "events", "touringDashboard", "tourAdvancing", "tourCrewPersonnel", "tourTravel", "tourDocuments", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "productionBoard", "staffingAssignments", "staffingSchedule", "vehicles", "reports", "directory", "runner", "messages", "dataTools", "mobileApp"],
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
    views: ["dashboard", "clientProfile", "workers", "promoters", "venues", "events", "eventDocuments", "emailTemplates", "touringDashboard", "tourAdvancing", "tourCrewPersonnel", "tourTravel", "tourDocuments", "tourSettings", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "awardsSettings", "productionBoard", "staffingAssignments", "staffingSchedule", "vehicles", "reports", "directory", "runner", "messages", "dataTools", "mobileApp"],
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
    views: ["timecards", "payroll", "mobileApp"],
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
    views: ["productionBoard", "staffingAssignments", "staffingSchedule", "events", "workers", "promoters", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "vehicles", "reports", "directory", "runner", "messages", "dataTools", "mobileApp"],
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
    views: ["productionBoard", "staffingAssignments", "staffingSchedule", "events", "workers", "promoters", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "vehicles", "reports", "directory", "runner", "messages", "mobileApp"],
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
    views: ["productionBoard", "staffingAssignments", "staffingSchedule", "events", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "vehicles", "reports", "directory", "messages", "mobileApp"],
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
    views: ["productionBoard", "staffingAssignments", "staffingSchedule", "events", "awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "vehicles", "reports", "directory", "messages", "mobileApp"],
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
    views: ["dashboard", "workers", "clock", "productionResponse", "staffingAssignments", "staffingSchedule", "events", "timecards", "vehicles", "reports", "directory", "runner", "messages", "mobileApp"],
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
let pendingMessageAttachments = [];
let pendingMessageReply = null;
let messageActionTimer = null;
let messageActionTargetKey = "";
let giphyResults = [];
let sendbirdGroupChannelHandlerClass = null;
let sendbirdInboundMessageHandlerReady = false;
let sendbirdTypingPoller = null;
let sendbirdMessageRefreshPoller = null;
let sendbirdMessageRefreshInFlight = false;
let messageThreadScrollTimer = null;
let messageThreadUserScrollingUntil = 0;
let messageThreadRenderQueued = false;
let messageThreadOpeningUntil = 0;
let messageThreadPinBottomUntil = 0;
let messageThreadProgrammaticScrollUntil = 0;
let idleSignOutTimer = null;
let signOutReloading = false;
let installPromptEvent = null;
let appInstallState = window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone ? "installed" : "checking";
let notificationRefreshPoller = null;
let notificationRealtimeChannel = null;
let releaseNoticePoller = null;
let mobileClockSecondTimer = null;
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
  startY: 0,
  opening: false
};
let middleSwipeBackState = {
  tracking: false,
  startX: 0,
  startY: 0,
  active: false
};
let viewHistoryStack = [];

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
  touringStops: [],
  touringCrew: [],
  touringTravel: [],
  touringDocuments: [],
  awardsShows: [],
  awardsDocuments: [],
  awardsStaff: [],
  awardsSchedules: [],
  eventAssignments: [],
  eventSwaps: [],
  timecards: [],
  runnerStops: [],
  runnerCategories: [],
  runnerNotes: [],
  runnerRatings: [],
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
  touringGridEdit: {},
  touringBulkSelection: {},
  awardsBulkSelection: {},
  touringAttentionNotificationSignature: "",
  awardsAttentionNotificationSignature: "",
  touringSort: JSON.parse(localStorage.getItem("productionCrewTouringSort") || "{}"),
  touringColumnFilters: JSON.parse(localStorage.getItem("productionCrewTouringColumnFilters") || "{}"),
  search: "",
  activeView: "dashboard",
  accessRole: "CLIENT",
  activeWorkerId: localStorage.getItem("productionCrewActiveWorker") || "",
  activePromoterId: localStorage.getItem("productionCrewActivePromoter") || "",
  eventScheduleFilter: localStorage.getItem("productionCrewEventScheduleFilter") || "all",
  eventTypeFilter: localStorage.getItem("productionCrewEventTypeFilter") || "all",
  eventSort: localStorage.getItem("productionCrewEventSort") || "upcoming",
  dashboardPayrollRange: localStorage.getItem("productionCrewDashboardPayrollRange") || "month",
  dashboardPayrollEventId: localStorage.getItem("productionCrewDashboardPayrollEventId") || "",
  dashboardCalendarMonth: localStorage.getItem("productionCrewDashboardCalendarMonth") || "",
  runnerCategory: "All",
  runnerSortKey: localStorage.getItem("productionCrewRunnerSortKey") || "name",
  runnerSortDirection: localStorage.getItem("productionCrewRunnerSortDirection") || "asc",
  runnerColumnFilters: JSON.parse(localStorage.getItem("productionCrewRunnerColumnFilters") || "{}"),
  workerSortKey: localStorage.getItem("productionCrewWorkerSortKey") || "profile",
  workerSortDirection: localStorage.getItem("productionCrewWorkerSortDirection") || "asc",
  workerColumnFilters: JSON.parse(localStorage.getItem("productionCrewWorkerColumnFilters") || "{}"),
  staffingSortKey: localStorage.getItem("productionCrewStaffingSortKey") || "event",
  staffingSortDirection: localStorage.getItem("productionCrewStaffingSortDirection") || "asc",
  staffingColumnFilters: JSON.parse(localStorage.getItem("productionCrewStaffingColumnFilters") || "{}"),
  directoryTab: "crew",
  payrollView: localStorage.getItem("productionCrewPayrollView") || "worker",
  timecardSortKey: localStorage.getItem("productionCrewTimecardSortKey") || "date",
  timecardSortDirection: localStorage.getItem("productionCrewTimecardSortDirection") || "desc",
  timecardColumnFilters: JSON.parse(localStorage.getItem("productionCrewTimecardColumnFilters") || "{}"),
  vehicleSortKey: localStorage.getItem("productionCrewVehicleSortKey") || "date",
  vehicleSortDirection: localStorage.getItem("productionCrewVehicleSortDirection") || "desc",
  vehicleColumnFilters: JSON.parse(localStorage.getItem("productionCrewVehicleColumnFilters") || "{}"),
  reportSortKey: localStorage.getItem("productionCrewReportSortKey") || "date",
  reportSortDirection: localStorage.getItem("productionCrewReportSortDirection") || "desc",
  reportColumnFilters: JSON.parse(localStorage.getItem("productionCrewReportColumnFilters") || "{}"),
  venueSortKey: localStorage.getItem("productionCrewVenueSortKey") || "name",
  venueSortDirection: localStorage.getItem("productionCrewVenueSortDirection") || "asc",
  venueColumnFilters: JSON.parse(localStorage.getItem("productionCrewVenueColumnFilters") || "{}"),
  promoterSortKey: localStorage.getItem("productionCrewPromoterSortKey") || "rep",
  promoterSortDirection: localStorage.getItem("productionCrewPromoterSortDirection") || "asc",
  promoterColumnFilters: JSON.parse(localStorage.getItem("productionCrewPromoterColumnFilters") || "{}"),
  runnerStatusSortKey: localStorage.getItem("productionCrewRunnerStatusSortKey") || "runner",
  runnerStatusSortDirection: localStorage.getItem("productionCrewRunnerStatusSortDirection") || "asc",
  runnerStatusColumnFilters: JSON.parse(localStorage.getItem("productionCrewRunnerStatusColumnFilters") || "{}"),
  adminUserSortKey: localStorage.getItem("productionCrewAdminUserSortKey") || "user",
  adminUserSortDirection: localStorage.getItem("productionCrewAdminUserSortDirection") || "asc",
  adminUserColumnFilters: JSON.parse(localStorage.getItem("productionCrewAdminUserColumnFilters") || "{}"),
  userAccessSortKey: localStorage.getItem("productionCrewUserAccessSortKey") || "user",
  userAccessSortDirection: localStorage.getItem("productionCrewUserAccessSortDirection") || "asc",
  userAccessColumnFilters: JSON.parse(localStorage.getItem("productionCrewUserAccessColumnFilters") || "{}"),
  clientAccountSortKey: localStorage.getItem("productionCrewClientAccountSortKey") || "client",
  clientAccountSortDirection: localStorage.getItem("productionCrewClientAccountSortDirection") || "asc",
  clientAccountColumnFilters: JSON.parse(localStorage.getItem("productionCrewClientAccountColumnFilters") || "{}"),
  messagingThreadType: localStorage.getItem("productionCrewMessagingThreadType") || "event",
  messageEventFilter: localStorage.getItem("productionCrewMessageEventFilter") || "current",
  selectedMessageEventId: localStorage.getItem("productionCrewSelectedMessageEventId") || "",
  messageEventPickerOpen: false,
  messageDirectScope: localStorage.getItem("productionCrewMessageDirectScope") || "event",
  messageDirectPickerOpen: false,
  selectedPermanentMessageClientId: localStorage.getItem("productionCrewPermanentMessageClientId") || "",
  collapsedMessageSections: JSON.parse(localStorage.getItem("productionCrewCollapsedMessageSections") || "{}"),
  collapsedNavGroups: JSON.parse(localStorage.getItem("productionCrewCollapsedNavGroups") || "{}")
};
resetNavGroupsForFreshLoad();

function resetNavGroupsForFreshLoad() {
  const navigation = performance.getEntriesByType?.("navigation")?.[0];
  const isHardRefresh = navigation?.type === "reload";
  const isFreshWindow = !sessionStorage.getItem(ACTIVE_BROWSER_SESSION_KEY);
  if (!isHardRefresh && !isFreshWindow) return;
  state.collapsedNavGroups = {};
  localStorage.removeItem("productionCrewCollapsedNavGroups");
}

const NAV_GROUPS = {
  ADMIN: [
    { items: [["admin", "Dashboard"], ["messages", "Messages"]] },
    { label: "ADMIN CONSOLE", items: [["adminUsers", "Admin Users"], ["adminClients", "Client Accounts"], ["adminUserAccounts", "User Accounts"], ["adminAccessLevels", "Access Levels"]] },
    { label: "SETTINGS", items: [["adminProfile", "My Profile"], ["mobileApp", "Mobile Settings"]] }
  ],
  CLIENT_ADMIN: [
    { items: [["dashboard", "Dashboard"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["eventDocuments", "Documents"], ["emailTemplates", "Email Templates"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"], ["payroll", "Payroll"]] },
    { label: "TOURING", items: [["tourAdvancing", "Tour Advancing"], ["tourCrewPersonnel", "Crew Personnel"], ["tourTravel", "Travel & Accommodations"], ["tourDocuments", "Documents"], ["tourSettings", "Settings"]] },
    { label: "AWARDS / BROADCAST", items: [["awardsDocuments", "Documents"], ["awardsRundown", "Rundown"], ["awardsStaffing", "Staffing"], ["awardsSettings", "Settings"]] },
    { label: "PRODUCTION OFFICE", items: [["productionBoard", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
    { label: "DIRECTORIES", items: [["directory", "Directory"], ["runner", "Gig Resources"]] },
    { items: [["messages", "Messages"]] },
    { label: "SETTINGS", items: [["clientCompanyProfile", "Client Profile"], ["clientProfile", "My Profile"], ["dataTools", "Import / Export"], ["mobileApp", "Mobile Settings"]] }
  ],
  CLIENT_REP: [
    { items: [["dashboard", "Dashboard"]] },
    { label: "PROFILES", items: [["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "TOURING", items: [["tourAdvancing", "Tour Advancing"], ["tourCrewPersonnel", "Crew Personnel"], ["tourTravel", "Travel & Accommodations"], ["tourDocuments", "Documents"]] },
    { label: "AWARDS / BROADCAST", items: [["awardsDocuments", "Documents"], ["awardsRundown", "Rundown"], ["awardsStaffing", "Staffing"]] },
    { label: "PRODUCTION OFFICE", items: [["productionBoard", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
    { label: "DIRECTORIES", items: [["directory", "Directory"], ["runner", "Gig Resources"]] },
    { items: [["messages", "Messages"]] },
    { label: "SETTINGS", items: [["clientProfile", "My Profile"], ["dataTools", "Import / Export"], ["mobileApp", "Mobile Settings"]] }
  ],
  CLIENT_REP_LEAD: [
    { items: [["dashboard", "Dashboard"]] },
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"], ["venues", "Venues"]] },
    { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["eventDocuments", "Documents"], ["emailTemplates", "Email Templates"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "TOURING", items: [["tourAdvancing", "Tour Advancing"], ["tourCrewPersonnel", "Crew Personnel"], ["tourTravel", "Travel & Accommodations"], ["tourDocuments", "Documents"], ["tourSettings", "Settings"]] },
    { label: "AWARDS / BROADCAST", items: [["awardsDocuments", "Documents"], ["awardsRundown", "Rundown"], ["awardsStaffing", "Staffing"], ["awardsSettings", "Settings"]] },
    { label: "PRODUCTION OFFICE", items: [["productionBoard", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
    { label: "DIRECTORIES", items: [["directory", "Directory"], ["runner", "Gig Resources"]] },
    { items: [["messages", "Messages"]] },
    { label: "SETTINGS", items: [["clientProfile", "My Profile"], ["dataTools", "Import / Export"], ["mobileApp", "Mobile Settings"]] }
  ],
  CLIENT_ACCOUNTING: [
    { label: "LOCAL PRODUCTION", items: [["timecards", "Timecards"], ["payroll", "Payroll"]] },
    { label: "SETTINGS", items: [["mobileApp", "Mobile Settings"]] }
  ],
  PROMOTER_ADMIN: [
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"]] },
    { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PRODUCTION OFFICE", items: [["productionBoard", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
    { label: "DIRECTORIES", items: [["directory", "Directory"], ["runner", "Gig Resources"]] },
    { items: [["messages", "Messages"]] },
    { label: "SETTINGS", items: [["dataTools", "Import / Export"], ["mobileApp", "Mobile Settings"]] }
  ],
  PROMOTER_REP: [
    { label: "PROFILES", items: [["workers", "Crew Profiles"], ["promoters", "Promoter Profiles"]] },
    { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PRODUCTION OFFICE", items: [["productionBoard", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
    { label: "DIRECTORIES", items: [["directory", "Directory"], ["runner", "Gig Resources"]] },
    { items: [["messages", "Messages"]] },
    { label: "SETTINGS", items: [["mobileApp", "Mobile Settings"]] }
  ],
  PRODUCTION_TEAM_ACCESS: [
    { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PRODUCTION OFFICE", items: [["productionBoard", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
    { label: "DIRECTORIES", items: [["directory", "Directory"]] },
    { items: [["messages", "Messages"]] },
    { label: "SETTINGS", items: [["mobileApp", "Mobile Settings"]] }
  ],
  CREW: [
    { items: [["dashboard", "Home"], ["clock", "Time Clock"]] },
    { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"]] },
    { label: "PRODUCTION OFFICE", items: [["productionResponse", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
    { label: "DIRECTORIES", items: [["directory", "Directory"], ["runner", "Gig Resources"]] },
    { items: [["messages", "Messages"]] },
    { label: "SETTINGS", items: [["workers", "My Profile"], ["mobileApp", "Mobile Settings"]] }
  ]
};
NAV_GROUPS.CLIENT = NAV_GROUPS.CLIENT_ADMIN;
NAV_GROUPS.ACCOUNT = [
  { items: [["dashboard", "Dashboard"]] },
  { label: "ACCOUNT", items: [["clientCompanyProfile", "Account Profile"], ["adminUserAccounts", "User Accounts"], ["dataTools", "Import / Export"]] },
  { label: "LOCAL PRODUCTION", items: [["events", "Events"], ["eventDocuments", "Documents"], ["emailTemplates", "Email Templates"], ["timecards", "Timecards"], ["vehicles", "Vehicles"], ["reports", "Reports"], ["payroll", "Payroll"]] },
  { label: "TOURING", items: [["tourAdvancing", "Tour Advancing"], ["tourCrewPersonnel", "Crew Personnel"], ["tourTravel", "Travel & Accommodations"], ["tourDocuments", "Documents"], ["tourSettings", "Settings"]] },
  { label: "AWARDS / BROADCAST", items: [["awardsDocuments", "Documents"], ["awardsRundown", "Rundown"], ["awardsStaffing", "Staffing"], ["awardsSettings", "Settings"]] },
  { label: "PRODUCTION OFFICE", items: [["productionBoard", "Production Office"], ["staffingAssignments", "Staffing Assignment"], ["staffingSchedule", "Staffing Schedule"]] },
  { label: "DIRECTORIES", items: [["directory", "Directory"], ["runner", "Gig Resources"]] },
  { items: [["messages", "Messages"]] },
  { label: "SETTINGS", items: [["clientProfile", "My Profile"], ["mobileApp", "Mobile Settings"]] }
];
NAV_GROUPS.ACCOUNTING = [
  { items: [["dashboard", "Dashboard"]] },
  { label: "ACCOUNTING", items: [["timecards", "Timecards"], ["payroll", "Payroll"], ["reports", "Reports"], ["events", "Events"]] },
  { items: [["messages", "Messages"]] },
  { label: "SETTINGS", items: [["mobileApp", "Mobile Settings"]] }
];
NAV_GROUPS.PROMOTER = NAV_GROUPS.PROMOTER_ADMIN;
NAV_GROUPS.PROMOTER_PRODUCTION_OFFICE = NAV_GROUPS.PROMOTER_ADMIN;
NAV_GROUPS.PRODUCTION = NAV_GROUPS.PRODUCTION_TEAM_ACCESS;
NAV_GROUPS.PRODUCTION_TEAM_ACCESS = NAV_GROUPS.PRODUCTION;

const ROLE_HOME_VIEWS = {
  ADMIN: "adminProfile",
  ACCOUNT: "dashboard",
  ACCOUNTING: "timecards",
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
  CREW: "dashboard"
};

const ACCESS_LEVEL_LABELS = {
  ADMIN: "Admin",
  ACCOUNT: "Account Owner",
  ACCOUNTING: "Accounting",
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
  ACCOUNT: 95,
  CLIENT_ADMIN: 90,
  CLIENT: 90,
  CLIENT_REP_LEAD: 80,
  ACCOUNTING: 75,
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
const SERVER_ROLE_PRIORITY = {
  ADMIN: 100,
  ACCOUNT: 95,
  CLIENT: 90,
  ACCOUNTING: 75,
  PROMOTER: 70,
  PRODUCTION: 50,
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
    name: "Touring Office Suite",
    status: "Active",
    description: "Tour stops, advance tracker, city rider workspaces, crew personnel, travel, accommodations, and generated tour documents."
  },
  {
    id: "AWARDS_SHOWS",
    name: "Awards / Live Broadcast Suite",
    status: "Active",
    description: "Awards production teams, broadcast documents, rundowns, plots, scripts, staff lists, mimeo, credentials, and event-day operations."
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
const LOCAL_PRODUCTION_SUITE_ID = "LOCAL_PRODUCTION_SERVICES";
const TOURING_SUITE_ID = "TOUR_DATA_SERVICES";
const AWARDS_SUITE_ID = "AWARDS_SHOWS";
const DEFAULT_ACTIVE_OFFICE_SUITE_IDS = [LOCAL_PRODUCTION_SUITE_ID, TOURING_SUITE_ID, AWARDS_SUITE_ID];
const LOCAL_PRODUCTION_SUITE_VIEWS = ["events", "eventDocuments", "emailTemplates", "timecards", "vehicles", "reports", "payroll"];
const TOURING_SUITE_VIEWS = ["touringDashboard", "tourAdvancing", "tourCrewPersonnel", "tourTravel", "tourDocuments", "tourSettings"];
const AWARDS_SUITE_VIEWS = ["awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "awardsSettings"];
const DASHBOARD_VIEW_IDS = ["dashboard", "touringDashboard", "awardsDashboard"];
const SUITE_NAV_COLORS = {
  LOCAL_PRODUCTION_SERVICES: "#64748b",
  TOUR_DATA_SERVICES: "#0f9ca8",
  AWARDS_SHOWS: "#9d4edd",
  LIVE_TV_SPECIALS: "#0ea5e9",
  CORPORATE_LIVE_EVENTS: "#178f62"
};
const DASHBOARD_NAV_LABELS = {
  dashboard: "Main Dashboard",
  touringDashboard: "Touring Dashboard",
  awardsDashboard: "Awards / Broadcast Dashboard"
};

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

const DEFAULT_ASSIGNMENT_DEPARTMENTS = [
  "Production Office",
  "Runner",
  "Crew",
  "Catering",
  "Security",
  "Wardrobe",
  "Transportation",
  "Other"
];
const ASSIGNMENT_DEPARTMENT_KEY = "productionCrewAssignmentDepartments";
const STAFFING_ASSIGNMENT_COLUMNS = [
  ["event", "Event"],
  ["crew", "Crew / Role"],
  ["department", "Department"],
  ["schedule", "Schedule"],
  ["contact", "Production Office Contact"],
  ["notes", "Notes"]
];
const VEHICLE_COLUMNS = [
  ["event", "Event"],
  ["worker", "Worker"],
  ["vehicle", "Vehicle"],
  ["plate", "License Plate"],
  ["start", "Start"],
  ["end", "End"],
  ["photos", "Photos"]
];
const WORKER_COLUMNS = [
  ["profile", "Profile"],
  ["role", "Role"],
  ["status", "Status"],
  ["phone", "Phone"],
  ["info", "Info"]
];
const TIMECARD_COLUMNS = [
  ["date", "Date"],
  ["event", "Event"],
  ["call", "Call"],
  ["lunchOut", "Lunch out"],
  ["lunchIn", "Lunch In"],
  ["wrap", "Wrap"],
  ["hours", "Hours"]
];
const REPORT_COLUMNS = [
  ["type", "Type"],
  ["event", "Event"],
  ["worker", "Worker"],
  ["title", "Title"],
  ["date", "Date"],
  ["photos", "Photos"]
];
const VENUE_COLUMNS = [
  ["name", "Name"],
  ["address", "Address"],
  ["contact", "Contact"],
  ["parking", "Parking"]
];
const PROMOTER_COLUMNS = [
  ["rep", "Rep"],
  ["company", "Company"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["notes", "Notes"]
];
const RUNNER_STATUS_COLUMNS = [
  ["runner", "Runner"],
  ["events", "Assigned Events"],
  ["status", "Status"],
  ["contact", "Contact"]
];
const USER_ACCESS_COLUMNS = [
  ["user", "User"],
  ["role", "Role"],
  ["client", "Client"],
  ["profile", "Profile"]
];
const CLIENT_ACCOUNT_COLUMNS = [
  ["client", "Client"],
  ["contact", "Contact"],
  ["status", "Status"],
  ["notes", "System Notes"]
];

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
  push.addListener("pushNotificationReceived", (notification) => {
    handleNativePushNotification(notification, { opened: false }).catch((error) => console.warn("Native notification handling failed", error));
  });
  push.addListener("pushNotificationActionPerformed", (action) => {
    handleNativePushNotification(action?.notification || action, { opened: true }).catch((error) => console.warn("Native notification action failed", error));
  });
}

function nativeNotificationData(notification = {}) {
  return notification.data || notification.notification?.data || {};
}

async function handleNativePushNotification(notification = {}, options = {}) {
  const data = nativeNotificationData(notification);
  const id = data.notificationId || data.id || `native-${Date.now()}`;
  if (!state.appNotifications.some((item) => item.id === id)) {
    await put("appNotifications", {
      id,
      title: notification.title || data.title || "Notification",
      body: notification.body || data.body || "",
      type: data.type || "native",
      viewId: data.viewId || "",
      recordId: data.recordId || "",
      recipientId: data.recipientId || currentThreadUserId(),
      threadType: data.threadType || "",
      threadKey: data.threadKey || "",
      threadEventId: data.threadEventId || "",
      threadProfileId: data.threadProfileId || ""
    });
    await refreshNotificationsFromStorage();
  }
  if (options.opened) await openNotification(id);
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
    if (!goBackOneLevel()) appPlugin.exitApp?.();
  });
}

function updatePullRefreshIndicator(distance = 0) {
  const indicator = $("#pullRefreshIndicator");
  const pullOffset = pullRefreshState.refreshing ? 34 : Math.min(58, Math.max(0, distance * 0.42));
  document.documentElement.style.setProperty("--pull-refresh-offset", `${pullOffset}px`);
  document.body.classList.toggle("pull-refresh-dragging", distance > 0 && !pullRefreshState.refreshing);
  document.body.classList.toggle("pull-refresh-settling", distance === 0 || pullRefreshState.refreshing);
  if (!indicator) return;
  const active = distance > 16 || pullRefreshState.refreshing;
  const ready = distance >= PULL_REFRESH_THRESHOLD || pullRefreshState.refreshing;
  indicator.classList.toggle("show", active);
  indicator.classList.toggle("ready", ready);
  indicator.textContent = pullRefreshState.refreshing ? "Refreshing" : ready ? "Release to refresh" : "Pull to refresh";
}

function startedInsideScrollableSection(target) {
  let element = target?.nodeType === Node.ELEMENT_NODE ? target : target?.parentElement;
  while (element && element !== document.body && element !== document.documentElement) {
    if (element.classList?.contains("active-view")) return false;
    const style = window.getComputedStyle(element);
    const canScrollY = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1;
    const canScrollX = /(auto|scroll)/.test(style.overflowX) && element.scrollWidth > element.clientWidth + 1;
    if (canScrollY && element.scrollTop > 0) return true;
    if (canScrollX && !canScrollY) return true;
    element = element.parentElement;
  }
  return false;
}

function startedInsideGestureControl(target) {
  return !!target?.closest?.("input, textarea, select, button, summary, details, label, [data-open-message-image], #sendbirdMessageForm, .record-options, .modal-form");
}

function activePageScrollTop() {
  const activeView = $(".active-view");
  if (activeView && window.getComputedStyle(activeView).overflowY !== "visible") {
    return activeView.scrollTop || 0;
  }
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function initPullToRefresh() {
  if (!("ontouchstart" in window)) return;
  window.addEventListener("touchstart", (event) => {
    if (pullRefreshState.refreshing || document.body.classList.contains("modal-open")) return;
    if (activePageScrollTop() > 0) return;
    if (startedInsideScrollableSection(event.target)) return;
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
      pullRefreshState.armed = false;
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

function goBackOneLevel() {
  if (document.body.classList.contains("modal-open")) {
    closeActiveForm();
    return true;
  }
  if (document.body.classList.contains("mobile-nav-open")) {
    closeMobileNavigation();
    return true;
  }
  if (state.activeView === "messages" && sendbirdActiveChannel) {
    clearActiveMessageThread();
    renderMessaging();
    return true;
  }
  while (viewHistoryStack.length) {
    const previous = viewHistoryStack.pop();
    if (previous && previous !== state.activeView && assignedViews().includes(previous)) {
      setView(previous, { skipHistory: true });
      return true;
    }
  }
  const homeView = roleHomeView(assignedAccessForCurrentUser()[0] || state.accessRole);
  if (state.activeView && state.activeView !== homeView) {
    setView(homeView, { skipHistory: true });
    return true;
  }
  return false;
}

function initEdgeSwipeNavigation() {
  if (!("ontouchstart" in window)) return;
  window.addEventListener("touchstart", (event) => {
    if (document.body.classList.contains("modal-open") || document.body.classList.contains("mobile-nav-open")) return;
    const touch = event.touches[0];
    if (!touch || touch.clientX > 36) return;
    edgeSwipeNavState = {
      tracking: true,
      startX: touch.clientX,
      startY: touch.clientY,
      opening: false
    };
  }, { passive: true });
  window.addEventListener("touchmove", (event) => {
    if (!edgeSwipeNavState.tracking) return;
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - edgeSwipeNavState.startX;
    const deltaY = Math.abs(touch.clientY - edgeSwipeNavState.startY);
    if (deltaX < -12 || deltaY > 64) edgeSwipeNavState.tracking = false;
    if (deltaX > 10 && deltaX > deltaY * 1.2) {
      edgeSwipeNavState.opening = true;
      event.preventDefault();
    }
  }, { passive: false });
  window.addEventListener("touchend", (event) => {
    if (!edgeSwipeNavState.tracking) return;
    const touch = event.changedTouches[0];
    const deltaX = (touch?.clientX || 0) - edgeSwipeNavState.startX;
    const deltaY = Math.abs((touch?.clientY || 0) - edgeSwipeNavState.startY);
    const shouldOpen = edgeSwipeNavState.opening && deltaX >= 48 && deltaX > deltaY * 1.2;
    edgeSwipeNavState = { tracking: false, startX: 0, startY: 0, opening: false };
    if (shouldOpen) {
      document.body.classList.add("mobile-nav-open");
      $("#mobileMenuButton")?.setAttribute("aria-expanded", "true");
    }
  }, { passive: true });
  window.addEventListener("touchcancel", () => {
    edgeSwipeNavState = { tracking: false, startX: 0, startY: 0, opening: false };
  }, { passive: true });
}

function initMiddleSwipeBackNavigation() {
  if (!("ontouchstart" in window)) return;
  window.addEventListener("touchstart", (event) => {
    if (document.body.classList.contains("modal-open") || document.body.classList.contains("mobile-nav-open")) return;
    if (startedInsideGestureControl(event.target)) return;
    const touch = event.touches[0];
    if (!touch) return;
    const width = window.innerWidth || document.documentElement.clientWidth || 0;
    if (touch.clientX <= 56 || touch.clientX >= width - 24) return;
    middleSwipeBackState = {
      tracking: true,
      startX: touch.clientX,
      startY: touch.clientY,
      active: false
    };
  }, { passive: true });
  window.addEventListener("touchmove", (event) => {
    if (!middleSwipeBackState.tracking) return;
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - middleSwipeBackState.startX;
    const deltaY = Math.abs(touch.clientY - middleSwipeBackState.startY);
    if (deltaX < -16 || deltaY > 72) middleSwipeBackState.tracking = false;
    if (deltaX > 24 && deltaX > deltaY * 1.35) {
      middleSwipeBackState.active = true;
      event.preventDefault();
    }
  }, { passive: false });
  window.addEventListener("touchend", (event) => {
    if (!middleSwipeBackState.tracking) return;
    const touch = event.changedTouches[0];
    const deltaX = (touch?.clientX || 0) - middleSwipeBackState.startX;
    const deltaY = Math.abs((touch?.clientY || 0) - middleSwipeBackState.startY);
    const shouldBack = middleSwipeBackState.active && deltaX >= 72 && deltaX > deltaY * 1.35;
    middleSwipeBackState = { tracking: false, startX: 0, startY: 0, active: false };
    if (shouldBack) goBackOneLevel();
  }, { passive: true });
  window.addEventListener("touchcancel", () => {
    middleSwipeBackState = { tracking: false, startX: 0, startY: 0, active: false };
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
      updatedAt: cloudSyncPaused && record.updatedAt ? record.updatedAt : now,
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

function recordSyncTime(record = {}, fallback = "") {
  const times = [record.updatedAt, record.createdAt, fallback]
    .map((value) => Date.parse(value || ""))
    .filter((value) => !Number.isNaN(value));
  return times.length ? Math.max(...times) : 0;
}

function shouldHydrateCloudRecord(localRecord, cloudRecord, cloudUpdatedAt) {
  if (!localRecord) return true;
  return recordSyncTime(cloudRecord, cloudUpdatedAt) >= recordSyncTime(localRecord);
}

async function hydrateAppRecordsFromSupabase() {
  if (!supabaseClient || !authState.session || !authState.roleRecord || isAdminRole() || !cloudClientId()) return { pulled: 0, skipped: 0 };
  const { data, error } = await supabaseClient
    .from("app_records")
    .select("store_name, data, updated_at")
    .eq("client_id", cloudClientId());
  if (error) {
    console.warn("Could not load shared app records.", error);
    return { pulled: 0, skipped: 0 };
  }
  cloudSyncPaused = true;
  const localRecordsByStore = new Map();
  const localRecordMap = async (storeName) => {
    if (!localRecordsByStore.has(storeName)) {
      localRecordsByStore.set(storeName, new Map((await getAll(storeName)).map((record) => [record.id, record])));
    }
    return localRecordsByStore.get(storeName);
  };
  let pulled = 0;
  let skipped = 0;
  try {
    for (const row of data || []) {
      if (!CLOUD_SYNC_STORES.has(row.store_name) || !row.data?.id) continue;
      const localRecords = await localRecordMap(row.store_name);
      if (!shouldHydrateCloudRecord(localRecords.get(row.data.id), row.data, row.updated_at)) {
        skipped += 1;
        continue;
      }
      await put(row.store_name, row.data);
      localRecords.set(row.data.id, row.data);
      pulled += 1;
    }
  } finally {
    cloudSyncPaused = false;
  }
  return { pulled, skipped };
}

async function hydrateNotificationsFromSupabase() {
  if (!supabaseClient || !authState.session || !authState.roleRecord) return;
  const clientIds = Array.from(new Set([
    cloudClientId(),
    authState.roleRecord?.client_id || "",
    getWorker(authState.roleRecord?.worker_id)?.clientId || "",
    loggedInWorkerRecord()?.clientId || "",
    getWorker(state.activeWorkerId)?.clientId || "",
    activeClientRecord()?.id || "",
    ...state.events.map((event) => event.clientId).filter(Boolean),
    ...visibleEvents().map((event) => event.clientId).filter(Boolean),
    ...state.clients.map((client) => client.id).filter(Boolean)
  ].filter(Boolean)));
  if (!clientIds.length) return;
  const { data, error } = await supabaseClient
    .from("app_records")
    .select("data")
    .in("client_id", clientIds)
    .eq("store_name", "appNotifications");
  if (error) {
    console.warn("Could not load shared notifications.", error);
    return;
  }
  cloudSyncPaused = true;
  try {
    for (const row of data || []) {
      if (row.data?.id) await put("appNotifications", row.data);
    }
  } finally {
    cloudSyncPaused = false;
  }
}

async function syncLocalRecordsToSupabase() {
  if (!supabaseClient || !authState.session || !authState.roleRecord || isAdminRole() || !cloudClientId()) return { published: 0, failed: 0 };
  const records = [];
  for (const storeName of CLOUD_SYNC_STORES) {
    for (const record of state[storeName] || []) records.push([storeName, record]);
  }
  let published = 0;
  let failed = 0;
  for (const [storeName, record] of records) {
    try {
      await syncRecordToSupabase(storeName, record);
      published += 1;
    } catch (error) {
      console.warn("Could not publish local record to Supabase.", error);
      failed += 1;
    }
  }
  return { published, failed };
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
  const [clients, clientReps, accessLevelDefs, eventAccessLinks, workers, venues, promoters, profileNotes, events, touringStops, touringCrew, touringTravel, touringDocuments, awardsShows, awardsDocuments, awardsStaff, awardsSchedules, eventAssignments, eventSwaps, timecards, runnerStops, runnerCategories, runnerNotes, runnerRatings, systemProfiles, venueContacts, productionCompanies, productionContacts, vehicleLogs, accidentReports, messageThreadSettings, appNotifications] = await Promise.all(STORES.map(getAll));
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
    touringStops: touringStops.sort((a, b) => new Date(a.loadInDate || a.showDate || 0) - new Date(b.loadInDate || b.showDate || 0)),
    touringCrew: sortByName(touringCrew),
    touringTravel: sortByName(touringTravel),
    touringDocuments: touringDocuments.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)),
    awardsShows: awardsShows.sort((a, b) => new Date(b.showDate || b.createdAt || 0) - new Date(a.showDate || a.createdAt || 0)),
    awardsDocuments: awardsDocuments.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)),
    awardsStaff: sortByName(awardsStaff),
    awardsSchedules: awardsSchedules.sort((a, b) => new Date(a.callDate || a.createdAt || 0) - new Date(b.callDate || b.createdAt || 0)),
    eventAssignments: eventAssignments.sort((a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0)),
    eventSwaps: eventSwaps.sort((a, b) => new Date(b.swapDate || b.createdAt || 0) - new Date(a.swapDate || a.createdAt || 0)),
    timecards: timecards.sort((a, b) => new Date(b.clockIn || b.createdAt || 0) - new Date(a.clockIn || a.createdAt || 0)),
    runnerStops: sortByName(runnerStops),
    runnerCategories: sortByName(runnerCategories),
    runnerNotes: runnerNotes.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)),
    runnerRatings,
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

function loggedInWorkerRecord() {
  const userId = authState.user?.id || "";
  const email = normalizedMatchValue(authState.user?.email || "");
  return getWorker(authState.roleRecord?.worker_id)
    || state.workers.find((worker) => worker.authUserId === userId)
    || state.workers.find((worker) => email && normalizedMatchValue(worker.email) === email)
    || null;
}

function hasCrewRunnerAccess() {
  return assignedAccessForCurrentUser().some((role) => baseRoleForAccess(role) === "CREW");
}

function activeCrewWorkerId() {
  return loggedInWorkerRecord()?.id || state.activeWorkerId || "";
}

async function ensureLoggedInWorkerProfile() {
  if (!authState.user || !hasCrewRunnerAccess()) return null;
  const existing = loggedInWorkerRecord();
  if (existing) {
    state.activeWorkerId = existing.id;
    localStorage.setItem("productionCrewActiveWorker", state.activeWorkerId);
    return existing;
  }
  const profile = loggedInProfileRecord();
  const worker = {
    id: crypto.randomUUID(),
    clientId: authState.roleRecord?.client_id || activeClientRecord()?.id || "",
    authUserId: authState.user.id,
    name: profile?.name || profile?.contactName || authState.user.user_metadata?.name || authState.user.email || "Crew Member",
    phone: profile?.phone || authState.user.user_metadata?.phone || "",
    email: authState.user.email || profile?.email || "",
    mailingAddress: profile?.mailingAddress || profile?.mailing_address || "",
    accessLevels: ["CREW"],
    runnerStatus: "Available",
    notes: "Auto-created worker profile linked to this login for Time Clock access."
  };
  await put("workers", worker);
  state.activeWorkerId = worker.id;
  localStorage.setItem("productionCrewActiveWorker", state.activeWorkerId);
  return worker;
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
  return packages.length ? Array.from(new Set(packages)) : DEFAULT_ACTIVE_OFFICE_SUITE_IDS;
}

function clientPackageLabels(value) {
  const selected = normalizeClientPackages(value);
  return selected.map((id) => clientPackageDefinitions().find((pkg) => pkg.id === id)?.name || id);
}

function clientPackageBadges(value) {
  return clientPackageLabels(value).map((label) => `<span class="status-pill">${escapeHtml(label)}</span>`).join(" ");
}

function clientOfficeSuiteDefinitions(client = activeClientRecord()) {
  const selected = normalizeClientPackages(client?.packageLayouts);
  return selected.map((id) => clientPackageDefinitions().find((pkg) => pkg.id === id)).filter(Boolean);
}

function clientHasOfficeSuite(suiteId, client = activeClientRecord()) {
  return normalizeClientPackages(client?.packageLayouts).includes(suiteId);
}

function touringSuiteEnabled(client = activeClientRecord()) {
  return clientHasOfficeSuite(TOURING_SUITE_ID, client);
}

function awardsSuiteEnabled(client = activeClientRecord()) {
  return clientHasOfficeSuite(AWARDS_SUITE_ID, client);
}

function suiteIdForView(viewId) {
  if (LOCAL_PRODUCTION_SUITE_VIEWS.includes(viewId)) return LOCAL_PRODUCTION_SUITE_ID;
  if (TOURING_SUITE_VIEWS.includes(viewId)) return TOURING_SUITE_ID;
  if (AWARDS_SUITE_VIEWS.includes(viewId)) return AWARDS_SUITE_ID;
  return "";
}

function officeSuiteEnabledForView(viewId, client = activeClientRecord()) {
  const suiteId = suiteIdForView(viewId);
  return !suiteId || clientHasOfficeSuite(suiteId, client);
}

function filterOfficeSuiteViews(views = [], client = activeClientRecord()) {
  return views.filter((view) => officeSuiteEnabledForView(view, client));
}

function officeSuiteLabel(id, client = activeClientRecord()) {
  const suite = clientOfficeSuiteDefinitions(client).find((item) => item.id === id)
    || clientPackageDefinitions().find((item) => item.id === id);
  return suite?.name || "";
}

function eventOfficeSuiteLabel(event = {}) {
  const client = state.clients.find((item) => item.id === event.clientId) || activeClientRecord();
  return officeSuiteLabel(event.officeSuiteId, client);
}

function officeSuiteColor(suiteId = "") {
  return SUITE_NAV_COLORS[suiteId] || "var(--accent)";
}

function suiteStyleVars(suiteId = "", variableName = "--suite-color") {
  if (!suiteId) return "";
  return ` style="${variableName}: ${escapeHtml(officeSuiteColor(suiteId))}"`;
}

function suiteIdForNavLabel(label = "") {
  const normalized = String(label || "").trim().toUpperCase();
  if (normalized === "LOCAL PRODUCTION") return LOCAL_PRODUCTION_SUITE_ID;
  if (normalized === "TOURING") return TOURING_SUITE_ID;
  if (normalized === "AWARDS / BROADCAST") return AWARDS_SUITE_ID;
  return "";
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
    } else if (input.dataset.photoKey === "logo") {
      record.logoData = images[0];
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
  if (formId === "eventAssignmentForm") renderAssignmentDepartmentOptions(record.department || "");
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
  if (formId === "eventForm") updateEventOfficeSuiteField(record);
  openForm(formId);
  updateSmtpForm(form);
  if (formId === "vehicleForm") applyVehicleAssignmentLock(form);
  if (formId === "reportForm") updateReportTypeFields(form);
  if (formId === "reportForm") delete form.dataset.vehicleDamageConfirmed;
  if (formId === "eventAssignmentForm") updateAssignmentVehicleFields(form);
  if (formId === "eventAssignmentForm") {
    updateAssignmentScheduleFields(form);
    updateAssignmentLocationFields(form);
  }
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
  if (formId === "eventForm") {
    renderEventAssignmentManager(form, "");
    updateEventOfficeSuiteField({});
  }
  if (formId === "venueForm") renderVenueContactEditor("");
  if (formId === "eventAssignmentForm") {
    renderAssignmentDepartmentOptions("Production Office");
    form.elements.status.value = "Confirmed";
    form.elements.vehicleUse.value = "No Vehicle";
    form.elements.department.value = "Production Office";
    form.elements.locationType.value = "Venue";
    updateAssignmentVehicleFields(form);
    updateAssignmentScheduleFields(form);
    updateAssignmentLocationFields(form);
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

function loadingOverlayText(message = "") {
  if (!isLoadingMessage(message)) return message || "Loading";
  return document.body.dataset.accessTone ? "Copy" : "Stand By";
}

function setLoadingOverlay(message = "Loading", visible = true) {
  const overlay = $("#appLoadingOverlay");
  if (!overlay) return;
  overlay.hidden = !visible;
  const label = $("#appLoadingText");
  if (label) label.textContent = loadingOverlayText(message);
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
  if (!supabaseClient || !["ACCOUNT", "CLIENT", "ACCOUNTING"].includes(roleRecord.role) || !roleRecord.client_id) return { client: null, repCount: 0 };
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
  if (!(isAdminRole() || isAccountRole()) || !userId) return;
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
  if (["ACCOUNT", "CLIENT", "ACCOUNTING"].includes(normalizeRole(row.role)) && row.profileId) {
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
  const serverLevel = serverAccessLevelForRole(row.role);
  if (serverLevel === "ADMIN" || serverLevel === "ACCOUNT") return [serverLevel];
  const matched = profileForUserAccessRow(row);
  const levels = normalizeAccessLevels(row.accessLevels || matched.profile?.accessLevels, matched.accessFallback);
  return matched.store === "clientReps" ? ensureClientRepAccessLevels(levels) : levels;
}

function supabaseRoleFromAccessLevels(levels, fallback = "CLIENT") {
  const baseRoles = sortAccessRoles(normalizeAccessLevels(levels, fallback)).map(baseRoleForAccess);
  if (baseRoles.includes("ADMIN")) return "ADMIN";
  if (baseRoles.includes("ACCOUNT")) return "ACCOUNT";
  if (baseRoles.includes("ACCOUNTING")) return "ACCOUNTING";
  if (baseRoles.includes("CLIENT")) return "CLIENT";
  if (baseRoles.includes("PROMOTER")) return "PROMOTER";
  if (baseRoles.includes("PRODUCTION")) return "PRODUCTION";
  if (baseRoles.includes("CREW")) return "CREW";
  return normalizeRole(fallback);
}

function serverAccessLevelForRole(role) {
  const normalized = normalizeRole(role);
  if (normalized === "ADMIN") return "ADMIN";
  if (normalized === "ACCOUNT") return "ACCOUNT";
  if (normalized === "ACCOUNTING") return "ACCOUNTING";
  if (normalized === "CLIENT") return "CLIENT_ADMIN";
  if (normalized === "PROMOTER") return "PROMOTER_ADMIN";
  if (normalized === "PRODUCTION") return "PRODUCTION_TEAM_ACCESS";
  if (normalized === "CREW") return "CREW";
  return "";
}

function exclusiveAccessLevels(levels = []) {
  const normalized = normalizeAccessLevels(levels, "");
  if (normalized.includes("ADMIN")) return ["ADMIN"];
  if (normalized.includes("ACCOUNT")) return ["ACCOUNT"];
  return normalized;
}

async function openAccountAccessForm(userId) {
  if (!(isAdminRole() || isAccountRole()) || !userId) return;
  await refreshSiteAccessLevelsForForm("accountAccessForm");
  const row = state.userAccessRows.find((item) => item.userId === userId);
  if (!row) {
    toast("Refresh user accounts first.");
    return;
  }
  const matched = profileForUserAccessRow(row);
  const accessLevels = exclusiveAccessLevels(accessLevelsForUserAccessRow(row));
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
  if (!(isAdminRole() || isAccountRole())) return;
  if (!initializeSupabaseClient()) {
    toast("Supabase login is not configured.");
    return;
  }
  const form = event.currentTarget;
  const record = await formRecord(form);
  const selectedSecurityRole = normalizeRole(record.role);
  let accessLevels = exclusiveAccessLevels(record.accessLevels);
  const requiredServerAccess = serverAccessLevelForRole(selectedSecurityRole);
  if (selectedSecurityRole === "ADMIN") {
    accessLevels = ["ADMIN"];
  } else if (requiredServerAccess && !accessLevels.some((level) => baseRoleForAccess(level) === selectedSecurityRole)) {
    accessLevels = [requiredServerAccess, ...accessLevels.filter((level) => baseRoleForAccess(level) !== selectedSecurityRole)];
  }
  if (!accessLevels.length) {
    toast("Select at least one site access level.");
    return;
  }
  const role = selectedSecurityRole;
  let matched = record.profileStore && record.profileId
    ? { store: record.profileStore, profile: state[record.profileStore]?.find((item) => item.id === record.profileId) }
    : profileForUserAccessRow({ ...record, role });
  if (["ACCOUNT", "ACCOUNTING", "CLIENT"].includes(role)) {
    accessLevels = ensureClientRepAccessLevels(accessLevels, serverAccessLevelForRole(role) || "CLIENT_REP");
    const repProfile = await ensureAccountAccessClientRepProfile(record, role, accessLevels, matched);
    matched = { store: "clientReps", profile: repProfile };
  } else if (matched.store === "clientReps") {
    accessLevels = ensureClientRepAccessLevels(accessLevels);
  }
  if (matched.profile && matched.store && matched.store !== "clientReps") {
    await put(matched.store, { ...matched.profile, accessLevels, loginRole: role });
  }
  try {
    if (isAdminRole()) {
      await saveAccountAccessDirectly(record, role, accessLevels, matched);
    } else {
      const { error } = await supabaseClient.functions.invoke(USER_ACCESS_FUNCTION, {
        body: accountAccessPayload(record, role, accessLevels, matched)
      });
      if (error) throw error;
    }
  } catch (error) {
    console.error(error);
    toast(await loginSetupErrorMessage(error));
    return;
  }
  closeForm("accountAccessForm");
  state.userAccessRows = state.userAccessRows.map((row) => row.userId === record.userId
    ? {
        ...row,
        role,
        clientId: role === "ADMIN" ? "" : record.clientId || authState.roleRecord?.client_id || row.clientId || "",
        workerId: role === "CREW" ? record.workerId || row.workerId || "" : "",
        promoterId: role === "PROMOTER" ? record.promoterId || row.promoterId || "" : "",
        profileId: matched.profile?.id || row.profileId || "",
        profileName: matched.profile?.name || matched.profile?.contactName || row.profileName || "",
        accessLevels
      }
    : row);
  await loadState();
  await refreshUserAccessList(false);
  state.userAccessRows = state.userAccessRows.map((row) => row.userId === record.userId
    ? { ...row, role, accessLevels }
    : row);
  setView(state.activeView);
  toast("Account access updated.");
}

async function ensureAccountAccessClientRepProfile(record, role, accessLevels, matched) {
  const email = String(record.email || matched.profile?.email || "").trim();
  const clientId = record.clientId || matched.profile?.clientId || authState.roleRecord?.client_id || "";
  const existing = state.clientReps.find((rep) => rep.authUserId === record.userId)
    || state.clientReps.find((rep) => email && normalizedMatchValue(rep.email) === normalizedMatchValue(email) && rep.clientId === clientId)
    || (matched.store === "clientReps" ? matched.profile : null);
  const source = matched.profile || {};
  const name = existing?.name || source.name || source.contactName || email || "Account user";
  const repProfile = {
    ...(existing || {}),
    id: existing?.id || (matched.store === "clientReps" ? matched.profile?.id : "") || crypto.randomUUID(),
    clientId,
    authUserId: record.userId || existing?.authUserId || "",
    name,
    title: existing?.title || source.title || accessLevelLabel(serverAccessLevelForRole(role)) || "",
    email: email || existing?.email || source.email || "",
    phone: existing?.phone || source.phone || "",
    mailingAddress: existing?.mailingAddress || source.mailingAddress || "",
    accessLevels,
    loginRole: role,
    emailRoutingStatus: existing?.emailRoutingStatus || "Not configured"
  };
  await put("clientReps", repProfile);
  return repProfile;
}

function accountAccessPayload(record, role, accessLevels, matched) {
  return {
    action: "update",
    userId: record.userId,
    role,
    clientId: role === "ADMIN" ? null : record.clientId || authState.roleRecord?.client_id || null,
    workerId: role === "CREW" ? record.workerId || null : null,
    promoterId: role === "PROMOTER" ? record.promoterId || null : null,
    accessLevels,
    profileStore: matched.store || "",
    profileId: matched.profile?.id || ""
  };
}

async function saveAccountAccessDirectly(record, role, accessLevels, matched) {
  const payload = accountAccessPayload(record, role, accessLevels, matched);
  const { error: roleError } = await supabaseClient
    .from("user_roles")
    .upsert({
      user_id: payload.userId,
      role,
      client_id: payload.clientId,
      worker_id: payload.workerId,
      promoter_id: payload.promoterId,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });
  if (roleError) throw roleError;
  if (["ACCOUNT", "ACCOUNTING", "CLIENT"].includes(role)) {
    const profile = matched.profile || {};
    const profileId = payload.profileId || profile.id || "";
    if (!profileId) return;
    const { error: repError } = await supabaseClient
      .from("client_reps")
      .upsert({
        id: profileId,
        client_id: payload.clientId,
        name: profile.name || profile.email || "Account user",
        title: profile.title || accessLevelLabel(serverAccessLevelForRole(role)) || "",
        email: profile.email || record.email || "",
        phone: profile.phone || "",
        mailing_address: profile.mailingAddress || "",
        access_levels: accessLevels,
        auth_user_id: payload.userId,
        email_routing_status: profile.emailRoutingStatus || "Not configured",
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });
    if (repError) throw repError;
  }
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
  const blockedLevels = accessLevels.filter((role) => !grantableAccessLevelsForCurrentUser().includes(role));
  if (blockedLevels.length) {
    toast("This access view cannot assign one or more selected roles.");
    return;
  }
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
  const profileMode = targetStore === "promoterCompany" || targetStore === "promoterRep" ? targetStore : targetStore;
  const normalizedStore = targetStore === "promoterCompany" || targetStore === "promoterRep" ? "promoters" : targetStore;
  if (!["clients", "workers", "promoters"].includes(normalizedStore)) return;
  if (!canOpenQuickProfileTarget(targetStore)) {
    toast("This access view cannot add that profile type.");
    return;
  }
  if (normalizedStore === "clients" && !canSystemEdit()) {
    toast("Only ADMIN can add client accounts.");
    return;
  }
  await refreshSiteAccessLevelsForForm("quickProfileForm");
  const clientId = normalizedStore === "clients" ? "" : authState.roleRecord?.client_id || activeClientRecord()?.id || "";
  fillForm("quickProfileForm", {
    targetStore: normalizedStore,
    profileMode,
    clientId,
    accessLevels: quickProfileDefaultAccess(profileMode),
    packageLayouts: normalizedStore === "clients" ? ["LOCAL_PRODUCTION_SERVICES"] : []
  });
  $("#quickProfileTitle").textContent = quickProfileTitle(profileMode);
  $("#quickProfileNote").textContent = quickProfileNote(profileMode);
  updateQuickProfileCompanyFields();
  renderAccessLevelControls($("#quickProfileForm"));
}

function updateQuickProfileCompanyFields() {
  const form = $("#quickProfileForm");
  if (!form) return;
  const targetStore = form.elements.targetStore?.value || "";
  const profileMode = form.elements.profileMode?.value || targetStore;
  const contractorField = form.querySelector(".quick-contractor-field");
  const companyField = form.querySelector(".quick-company-field");
  const existingPromoterField = form.querySelector(".quick-existing-promoter-field");
  const packageField = form.querySelector(".quick-package-field");
  const isCrew = targetStore === "workers";
  const isClient = targetStore === "clients";
  const isPromoterRep = profileMode === "promoterRep";
  const showCompany = !isCrew || form.elements.paidThroughCompany?.checked;
  if (contractorField) contractorField.hidden = !isCrew;
  if (companyField) companyField.hidden = !showCompany || isPromoterRep;
  if (existingPromoterField) existingPromoterField.hidden = !isPromoterRep;
  if (packageField) packageField.hidden = !isClient;
  if (isClient && !form.querySelector("[data-package-options] input")) renderClientPackageControls(form);
  if (isPromoterRep && form.elements.existingPromoterCompany) {
    const companies = promoterCompanyOptions();
    form.elements.existingPromoterCompany.innerHTML = companies.length
      ? companies.map((company) => `<option value="${escapeHtml(company)}">${escapeHtml(company)}</option>`).join("")
      : `<option value="">No promoter companies yet</option>`;
  }
  if (isCrew && !showCompany && form.elements.companyName) form.elements.companyName.value = "";
}

function promoterCompanyOptions() {
  return Array.from(new Set(state.promoters.map((promoter) => String(promoter.companyName || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

async function saveQuickProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const record = await formRecord(form);
  const targetStore = record.targetStore;
  const profileMode = record.profileMode || targetStore;
  if (!canOpenQuickProfileTarget(profileMode)) {
    toast("This access view cannot add that profile type.");
    return;
  }
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
  const blockedLevels = accessLevels.filter((role) => !quickProfileAccessOptions(profileMode).includes(role));
  if (blockedLevels.length) {
    toast("This access view cannot assign one or more selected roles.");
    return;
  }
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
      packageLayouts: normalizeClientPackages(record.packageLayouts),
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
    const companyName = profileMode === "promoterRep"
      ? String(record.existingPromoterCompany || "").trim()
      : String(record.companyName || "").trim();
    if (!companyName) {
      toast(profileMode === "promoterRep" ? "Select a promoter company first." : "Add the promoter company name first.");
      return;
    }
    const promoter = {
      id,
      clientId: record.clientId || authState.roleRecord?.client_id || "",
      companyName,
      name: fullName,
      contactName: profileMode === "promoterCompany" ? "Promoter Admin" : "Promoter Rep",
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
  setView(targetStore === "clients" ? "adminClients" : targetStore);
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
  await ensureLoggedInWorkerProfile();
  if (hasCrewRunnerAccess()) await loadState();
  await ensureWelcomeNotification();
  await ensureReleaseNotification();
  startNotificationAutoRefresh();
  startNotificationRealtime();
  startReleaseNoticePoller();
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
  if (normalized === "ACCOUNT") return "clientCompanyProfile";
  if (normalized === "ACCOUNTING") return "timecards";
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
  if (["ACCOUNT", "CLIENT", "ACCOUNTING"].includes(roleRecord.role)) {
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
  const profileView = ["ACCOUNT", "CLIENT"].includes(roleRecord.role) && clientSetupStep(session.user.id) === "company"
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
  window.clearInterval(notificationRefreshPoller);
  window.clearInterval(releaseNoticePoller);
  stopNotificationRealtime();
  notificationRefreshPoller = null;
  releaseNoticePoller = null;
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
  if (hasActiveSessionTimecard()) return;
  idleSignOutTimer = window.setTimeout(() => {
    toast(`Signed out after ${IDLE_SIGN_OUT_MINUTES} minutes of inactivity.`);
    logout().catch((error) => {
      console.error(error);
      showAuthScreen("Signed out after inactivity.");
    });
  }, IDLE_SIGN_OUT_MS);
}

function hasActiveSessionTimecard() {
  const workerId = activeCrewWorkerId?.() || state.activeWorkerId || "";
  if (!workerId) return false;
  return state.timecards.some((card) => card.workerId === workerId && card.clockIn && !card.clockOut);
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

function isAccountRole() {
  return effectiveAccessRole() === "ACCOUNT";
}

function isAccountingRole() {
  return effectiveAccessRole() === "ACCOUNTING";
}

function isClientRole() {
  return ["ACCOUNT", "CLIENT"].includes(effectiveAccessRole());
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
  return Array.from(new Set(assignedAccessProfiles().flatMap((item) => filterOfficeSuiteViews(item.profile.views))));
}

function accessRoleForView(viewId) {
  if (!officeSuiteEnabledForView(viewId)) return "";
  if (currentProfile().views.includes(viewId)) return state.accessRole;
  return assignedAccessProfiles().find((item) => item.profile.views.includes(viewId))?.role || "";
}

function assignedAccessForRole(role) {
  const normalized = normalizeRole(role);
  if (normalized === "ACCOUNT") return ["ACCOUNT", "CLIENT_ADMIN", "CLIENT_REP_LEAD", "CLIENT_REP", "CLIENT_ACCOUNTING", "ACCOUNTING", "PROMOTER_ADMIN", "PROMOTER_REP", "PRODUCTION_TEAM_ACCESS", "CREW"];
  if (normalized === "ACCOUNTING") return ["ACCOUNTING"];
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
    const priorityDelta = accessRolePriority(b) - accessRolePriority(a);
    return priorityDelta || accessLevelLabel(a).localeCompare(accessLevelLabel(b));
  });
}

function accessRolePriority(role) {
  const level = normalizeAccessLevel(role);
  const baseRole = baseRoleForAccess(level);
  return ACCESS_ROLE_PRIORITY[level] || SERVER_ROLE_PRIORITY[baseRole] || 0;
}

function grantableAccessLevelsForCurrentUser() {
  const allRoles = accessLevelDefinitions().map((level) => level.id).filter((role) => role !== "ADMIN");
  if (isAdminRole()) return allRoles;
  const assigned = assignedAccessForCurrentUser();
  if (assigned.includes("ACCOUNT")) return allRoles.filter((role) => baseRoleForAccess(role) !== "ADMIN");
  if (assigned.includes("ACCOUNTING")) return allRoles.filter((role) => baseRoleForAccess(role) === "ACCOUNTING");
  if (assigned.includes("CLIENT_ADMIN")) return allRoles.filter((role) => baseRoleForAccess(role) !== "ADMIN");
  if (assigned.includes("CLIENT_REP_LEAD")) {
    const blocked = new Set(["CLIENT", "CLIENT_ADMIN"]);
    return allRoles.filter((role) => !blocked.has(role) && baseRoleForAccess(role) !== "ADMIN");
  }
  if (assigned.includes("CLIENT_REP")) {
    const blocked = new Set(["CLIENT", "CLIENT_ADMIN", "CLIENT_REP_LEAD", "CLIENT_ACCOUNTING"]);
    return allRoles.filter((role) => !blocked.has(role) && !["ADMIN", "ACCOUNT", "CLIENT", "ACCOUNTING"].includes(baseRoleForAccess(role)));
  }
  if (assigned.includes("PROMOTER_ADMIN")) {
    return allRoles.filter((role) => ["PROMOTER", "PRODUCTION", "CREW"].includes(baseRoleForAccess(role)) && role !== "PROMOTER_ADMIN");
  }
  if (assigned.includes("PROMOTER_REP")) {
    return allRoles.filter((role) => ["PRODUCTION", "CREW"].includes(baseRoleForAccess(role)));
  }
  if (assigned.includes("PRODUCTION_TEAM_ACCESS")) {
    return allRoles.filter((role) => baseRoleForAccess(role) === "CREW");
  }
  return [];
}

function filterGrantableAccessLevels(roles) {
  const grantable = new Set(grantableAccessLevelsForCurrentUser());
  return roles.filter((role) => grantable.has(role));
}

function assignedAccessForCurrentUser() {
  const baseRole = normalizeRole(authState.roleRecord?.role || state.accessRole);
  if (baseRole === "ADMIN") return ["ADMIN"];
  if (baseRole === "ACCOUNT") {
    const rep = activeClientRepRecord();
    const roles = sortAccessRoles(ensureClientRepAccessLevels(rep?.accessLevels, "ACCOUNT").filter((role) => accessProfileFor(role)));
    return roles.includes("ADMIN") ? ["ADMIN"] : roles;
  }
  if (baseRole === "ACCOUNTING") return ["ACCOUNTING"];
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
  if (form?.id === "accountAccessForm") return isAdminRole() ? roles : filterGrantableAccessLevels(roles);
  if (form?.id === "quickProfileForm") return quickProfileAccessOptions(form.elements.targetStore?.value || "");
  if (form?.id === "profileAccessForm") {
    return filterGrantableAccessLevels(roles);
  }
  if (["clientProfileForm", "workerForm", "promoterForm"].includes(form?.id)) return [];
  if (form?.id === "clientForm") return filterGrantableAccessLevels(roles.filter((role) => ["ACCOUNT", "CLIENT", "ACCOUNTING"].includes(baseRoleForAccess(role))));
  if (form?.id !== "clientForm") roles = roles.filter((role) => !["ACCOUNT", "CLIENT", "ACCOUNTING", "PRODUCTION"].includes(baseRoleForAccess(role)));
  return filterGrantableAccessLevels(roles);
}

function accessLevelLabel(role) {
  return accessLevelDefinition(role)?.name || ACCESS_LEVEL_LABELS[role] || role.replaceAll("_", " ");
}

function quickProfileAccessOptions(targetStore) {
  const roles = accessLevelDefinitions().map((level) => level.id).filter((role) => role !== "ADMIN");
  if (targetStore === "clients" || isAdminRole()) {
    return roles.filter((role) => ["ACCOUNT", "CLIENT", "ACCOUNTING"].includes(baseRoleForAccess(role)));
  }
  return filterGrantableAccessLevels(roles);
}

function quickProfileTargetsForCurrentUser() {
  const targets = [];
  if (isAdminRole()) {
    targets.push({ store: "clients", label: "Client" });
  }
  if (canOwnerEdit()) {
    targets.push({ store: "workers", label: "Crew / Runner" });
    targets.push({ store: "promoterCompany", label: "Promoter Company" });
    targets.push({ store: "promoterRep", label: "Promoter Rep" });
  } else if (isProductionRole()) {
    targets.push({ store: "workers", label: "Crew / Runner" });
    targets.push({ store: "promoterRep", label: "Promoter Rep" });
  }
  return targets;
}

function canOpenQuickProfileTarget(targetStore) {
  const normalizedStore = targetStore === "promoterCompany" || targetStore === "promoterRep" ? "promoters" : targetStore;
  if (normalizedStore === "clients") return canSystemEdit();
  if (normalizedStore === "workers") return canOwnerEdit() || isProductionRole();
  if (normalizedStore === "promoters") return canOwnerEdit() || isProductionRole();
  return false;
}

function renderGlobalAddMenu() {
  const menu = $("#globalAddMenu");
  const options = $("#globalAddMenuOptions");
  if (!menu || !options) return;
  const targets = quickProfileTargetsForCurrentUser();
  menu.hidden = !targets.length || state.activeView === "runner";
  options.innerHTML = targets.map((target) => (
    `<button class="tiny-button" data-open-quick-profile="${escapeHtml(target.store)}" type="button">Add ${escapeHtml(target.label)}</button>`
  )).join("");
}

function quickProfileDefaultAccess(targetStore) {
  const preferred = targetStore === "clients"
    ? ["CLIENT_ADMIN"]
    : targetStore === "promoterRep"
      ? ["PROMOTER_REP"]
      : targetStore === "promoters" || targetStore === "promoterCompany"
        ? ["PROMOTER_ADMIN"]
        : ["CREW"];
  const allowed = quickProfileAccessOptions(targetStore);
  return preferred.filter((role) => allowed.includes(role)).length ? preferred.filter((role) => allowed.includes(role)) : allowed.slice(0, 1);
}

function quickProfileTitle(targetStore) {
  if (targetStore === "clients") return "Add Client Admin";
  if (targetStore === "promoterCompany") return "Add Promoter Company";
  if (targetStore === "promoters" || targetStore === "promoterRep") return "Add Promoter Rep";
  return "Add Crew / Runner";
}

function quickProfileNote(targetStore) {
  if (targetStore === "clients") return "Creates the client company shell and first login-ready client rep. They finish the company and profile setup after activation.";
  if (targetStore === "promoterCompany") return "Creates the promoter company and first promoter admin. They finish company profile setup and then their user profile after activation.";
  if (targetStore === "promoters" || targetStore === "promoterRep") return "Creates a promoter rep under an existing promoter company. Activation is only for their user account.";
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

function syncAccountAccessSelection(input) {
  if (!input?.checked || input.name !== "accessLevels") return;
  const form = input.closest("form");
  if (!form || form.id !== "accountAccessForm") return;
  const exclusiveLevels = new Set(["ADMIN", "ACCOUNT"]);
  if (!exclusiveLevels.has(input.value)) return;
  form.querySelectorAll("[data-access-level-options] input[name='accessLevels']").forEach((checkbox) => {
    if (checkbox !== input) checkbox.checked = false;
  });
  if (form.elements.role) form.elements.role.value = baseRoleForAccess(input.value);
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
  if (DASHBOARD_NAV_LABELS[viewId]) return DASHBOARD_NAV_LABELS[viewId];
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
  const hasClientAccess = normalized.some((level) => ["ACCOUNT", "CLIENT", "ACCOUNTING"].includes(baseRoleForAccess(level)));
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

function canEditVehicleRentalDetails() {
  return assignedAccessForCurrentUser().includes("CLIENT_ADMIN");
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
  if (baseRoles.includes("ACCOUNT")) return "CLIENT";
  if (baseRoles.includes("CLIENT")) return "CLIENT";
  if (baseRoles.includes("ACCOUNTING")) return "ACCOUNTING";
  if (baseRoles.includes("PROMOTER")) return "PROMOTER";
  if (baseRoles.includes("PRODUCTION")) return "PRODUCTION";
  if (baseRoles.includes("CREW")) return "CREW";
  return effectiveAccessRole();
}

function hasDataScope(role) {
  return dataScopeRole() === role;
}

function canEditRates() {
  return currentProfile().canViewRates || hasDataScope("ACCOUNTING") || (hasAssignedAccess("CLIENT_ACCOUNTING") && hasAssignedAccess("CLIENT_REP_LEAD"));
}

function crewCanViewRates() {
  const worker = getWorker(state.activeWorkerId);
  return isCrewRole() && (worker?.allowCrewRateView === "yes" || worker?.allowCrewRateView === true);
}

function canViewRates() {
  return canEditRates() || crewCanViewRates();
}

function isAwardsView(viewId = state.activeView) {
  return ["awardsDashboard", "awardsDocuments", "awardsRundown", "awardsStaffing", "awardsSettings"].includes(viewId);
}

function canEditAwardsRecords() {
  return canOwnerEdit() && !isAdminRole();
}

function canViewRestrictedAwardsRecords() {
  return canOwnerEdit() || hasDataScope("ACCOUNTING") || hasAssignedAccess("CLIENT_ACCOUNTING");
}

function awardsRecordVisible(record = {}) {
  if (canViewRestrictedAwardsRecords()) return true;
  const scope = record.accessScope || (record.restrictedAccess === "yes" ? "Restricted" : "Production Only");
  if (record.restrictedAccess === "yes" || scope === "Restricted") return false;
  if (hasDataScope("PROMOTER")) return ["Public / Redacted", "All Staff", "Department Heads"].includes(scope);
  if (hasDataScope("PRODUCTION")) return ["Public / Redacted", "All Staff", "Department Heads", "Production Only"].includes(scope);
  return scope === "All Staff" || scope === "Public / Redacted";
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
  const eventRecord = getEvent(id) || {};
  container.innerHTML = `<table class="mini-table"><thead><tr><th>Crew</th><th>Role</th><th>Call</th><th>Location</th><th>Status</th><th></th></tr></thead><tbody>${assignments.map((assignment) => {
    const worker = getWorker(assignment.workerId);
    return `<tr><td>${escapeHtml(worker?.name || "Crew Member")}</td><td>${escapeHtml(assignmentRoleLine(assignment))}</td><td>${escapeHtml(assignmentWorkDateLabel(assignment, eventRecord))}<p>${escapeHtml(formatTime(assignment.startDate || eventRecord.startDate) || "Call TBD")}${assignment.endDate ? ` / ${escapeHtml(formatTime(assignment.endDate))}` : " / wrap TBD"}</p></td><td>${escapeHtml(assignmentCallLocation(assignment, eventRecord) || "Venue not set")}</td><td>${escapeHtml(assignment.status || "Confirmed")}</td><td><button class="tiny-button" data-edit="eventAssignments" data-id="${assignment.id}" data-form="eventAssignmentForm" type="button">Edit</button></td></tr>`;
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

function dateKeyFromValue(value = "") {
  return String(value || "").slice(0, 10);
}

function rentalVehicleAssignmentsForWorker(eventId, workerId) {
  return eventAssignments(eventId).filter((assignment) => {
    if (assignment.workerId !== workerId) return false;
    return assignment.vehicleUse === "Rented Vehicle" || assignment.vehicleType === "Rented Vehicle";
  });
}

function assignmentEndDateKey(assignment = {}, event = {}) {
  return dateKeyFromValue(assignment.endDate || assignment.workDate || assignment.startDate || event.endDate || event.startDate);
}

function rentalVehicleFinalDateKey(event = {}, workerId = "") {
  if (!event?.id || !workerId) return "";
  const assignmentEndKeys = rentalVehicleAssignmentsForWorker(event.id, workerId)
    .map((assignment) => assignmentEndDateKey(assignment, event))
    .filter(Boolean)
    .sort();
  return assignmentEndKeys.at(-1) || dateKeyFromValue(event.endDate || event.startDate);
}

function shouldRequireRentalEndPhotos(event = {}, card = {}, dateKey = "") {
  if (!rentalVehicleRequired(event, card)) return false;
  const workerId = card.workerId || activeCrewWorkerId();
  const workDate = dateKey || timecardWorkDate(card);
  const finalDate = rentalVehicleFinalDateKey(event, workerId);
  return !!finalDate && !!workDate && workDate >= finalDate;
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
      scheduledDate: phase === "Start" ? assignment.startDate || eventRecord?.startDate || "" : assignmentEndDateKey(assignment, eventRecord),
      notes: `Auto-created for ${worker?.name || "runner"} rental vehicle assignment.`
    });
  }
}

async function syncVehicleRentalDetails(merged) {
  if (!canEditVehicleRentalDetails()) return;
  const updates = {
    rentalCompany: merged.rentalCompany || "",
    rentalPickupLocation: merged.rentalPickupLocation || "",
    rentalPickupDate: merged.rentalPickupDate || ""
  };
  const relatedLogs = state.vehicleLogs.filter((log) => {
    if (log.id === merged.id) return false;
    if (merged.assignmentId && log.assignmentId === merged.assignmentId) return true;
    return log.eventId === merged.eventId && log.workerId === merged.workerId;
  });
  for (const log of relatedLogs) {
    await put("vehicleLogs", { ...log, ...updates });
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
      department: "Production Office",
      position: "Runner",
      workDate: String(eventRecord.startDate || "").slice(0, 10),
      startDate: eventRecord.startDate || "",
      endDate: eventRecord.endDate || "",
      hasWrapTime: eventRecord.endDate ? "yes" : "",
      locationType: "Venue",
      callLocation: "",
      onSiteContactName: "",
      onSiteContactPhone: "",
      onSiteContactEmail: "",
      productionOfficeLinkReady: "",
      dayRate: eventRecord.dayRate || client?.defaultDayRate || worker?.defaultDayRate || worker?.defaultRate || "",
      includedHours: eventRecord.includedHours || client?.defaultIncludedHours || worker?.defaultIncludedHours || "10",
      additionalRate: eventRecord.additionalRate || client?.defaultAdditionalRate || worker?.defaultAdditionalRate || "",
      vehicleUse: "No Vehicle",
      vehicleType: "",
      status: "Confirmed",
      crewNotes: "",
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
  if (hasDataScope("CLIENT")) return state.venues;
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

function formatDateWithYear(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function formatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

function formatLiveClock(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  return date.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  }) + (timezone ? ` ${timezone}` : "");
}

function toLocalInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function dateTimeInputValue(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : toLocalInputValue(date);
}

function localDateKey(date = new Date()) {
  return toLocalInputValue(date).slice(0, 10);
}

function timecardWorkDate(card) {
  return card?.workDate || String(card?.clockIn || card?.createdAt || "").slice(0, 10) || localDateKey();
}

function timecardWeekStartDate(card) {
  const source = timecardWorkDate(card);
  const date = new Date(`${source}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  date.setDate(date.getDate() - date.getDay());
  date.setHours(12, 0, 0, 0);
  return date;
}

function timecardWeekKey(card) {
  const start = timecardWeekStartDate(card);
  return start ? localDateKey(start) : "unscheduled";
}

function compactFullDate(date) {
  if (!date || Number.isNaN(date.getTime())) return "Unscheduled";
  const weekday = date.toLocaleDateString([], { weekday: "short" });
  const month = date.toLocaleDateString([], { month: "short" });
  return `${weekday}. ${month} ${date.getDate()}, ${date.getFullYear()}`;
}

function timecardWeekLabel(key) {
  if (key === "unscheduled") return "Unscheduled";
  const start = new Date(`${key}T12:00:00`);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return `${compactFullDate(start)} - ${compactFullDate(end)}`;
}

function timecardDateLabel(card) {
  const date = new Date(`${timecardWorkDate(card)}T12:00:00`);
  return compactFullDate(date);
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
  renderTouringSuite();
  renderAwardsSuite();
  renderProductionBoard();
  renderStaffingAssignments();
  renderStaffingSchedule();
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
  $$(".table-wrap .record-options, #events .event-options").forEach((details) => {
    const menu = details.querySelector(".record-options-menu, .event-options-menu");
    if (!menu) return;
    if (!details.open) {
      menu.style.top = "";
      menu.style.left = "";
      menu.style.right = "";
      return;
    }
    const rect = details.getBoundingClientRect();
    const width = Math.max(170, menu.offsetWidth || 170);
    const height = menu.offsetHeight || 220;
    const left = Math.min(window.innerWidth - width - 12, Math.max(12, rect.right - width));
    let top = rect.bottom + 6;
    if (top + height > window.innerHeight - 12) top = rect.top - height - 6;
    menu.style.left = `${left}px`;
    menu.style.top = `${Math.max(12, top)}px`;
  });
}

function renderAdmin() {
  renderUserAccessTable("adminUserTable", "adminUserTableCount", state.userAccessRows.filter((row) => normalizeRole(row.role) === "ADMIN"));
  $("#adminUsersHeroCount").textContent = state.userAccessRows.filter((row) => normalizeRole(row.role) === "ADMIN").length;
  $("#adminClientsHeroCount").textContent = state.clients.length;
  $("#adminUserAccountsHeroCount").textContent = userAccessRowsForView().length;
  $("#adminAccessLevelsHeroCount").textContent = accessLevelRowsForDisplay().length;
  renderClientAccountHead();
  const clients = sortClientAccounts(filterClientAccounts(state.clients));
  $("#clientTableCount").textContent = `${clients.length} clients`;
  $("#clientTable").innerHTML = clients.length
    ? clients.map((client) => `<tr><td><button class="link-button" data-view-client-company="${client.id}" type="button"><strong>${escapeHtml(client.name)}</strong></button><p>${escapeHtml(client.email)}</p><p>${clientPackageBadges(client.packageLayouts)}</p></td><td>${escapeHtml(client.contactName)}<p>${escapeHtml(client.phone)}</p></td><td><span class="status-pill">${escapeHtml(client.status || "Active")}</span></td><td>${escapeHtml(client.notes)}${loginStatus(client)}</td><td>${actionButtons("clients", client.id, "clientForm", `<button class="tiny-button system-action" data-manage-client-packages="${client.id}" type="button">Office Suites</button>${loginSetupButton("clients", client)}`, canSystemEdit())}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">No client accounts yet.</td></tr>`;
}

function renderClientAccountHead() {
  const head = $("#clientAccountHead");
  if (!head) return;
  head.innerHTML = `<tr>${CLIENT_ACCOUNT_COLUMNS.map(([key, label]) => {
    const activeSort = state.clientAccountSortKey === key;
    const activeFilter = !!state.clientAccountColumnFilters?.[key];
    const arrow = activeSort ? (state.clientAccountSortDirection === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-client-account-sort="${escapeHtml(key)}" data-client-account-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-client-account-sort="${escapeHtml(key)}" data-client-account-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-client-account-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.clientAccountColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
}

function filterClientAccounts(clients) {
  const filters = state.clientAccountColumnFilters || {};
  return clients.filter((client) => {
    return CLIENT_ACCOUNT_COLUMNS.every(([key]) => {
      const filter = String(filters[key] || "").trim().toLowerCase();
      return !filter || clientAccountColumnValue(client, key).toLowerCase().includes(filter);
    });
  });
}

function sortClientAccounts(clients) {
  const key = state.clientAccountSortKey || "client";
  const direction = state.clientAccountSortDirection === "desc" ? -1 : 1;
  return [...clients].sort((a, b) => direction * clientAccountColumnValue(a, key).localeCompare(clientAccountColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" }));
}

function clientAccountColumnValue(client, key) {
  if (key === "client") return listText(`${client.name || ""} ${client.email || ""} ${normalizeClientPackages(client.packageLayouts).join(" ")}`);
  if (key === "contact") return listText(`${client.contactName || ""} ${client.phone || ""}`);
  if (key === "status") return listText(client.status || "Active");
  if (key === "notes") return listText(`${client.notes || ""} ${client.setupStatus || ""} ${client.authUserId ? "login connected" : ""}`);
  return "";
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
  let message = "Client office suites saved.";
  try {
    message = await syncSupabaseClientAccount(updated) || message;
  } catch (error) {
    console.error(error);
    message = "Saved locally. Supabase office suite sync needs attention.";
  }
  await loadState();
  setView("adminClients");
  closeForm("clientPackageForm");
  toast(message);
}

function renderAccessLevels() {
  if ($("#accessLevelViewModal")) renderAccessLevelsViewModal();
}

function accessLevelRowsForDisplay() {
  return accessLevelDefinitions().filter((level) => level.id !== "ADMIN");
}

function renderAccessLevelsViewModal() {
  const modal = $("#accessLevelViewModal");
  if (!modal) return;
  const rows = accessLevelRowsForDisplay();
  modal.querySelector("[data-access-level-list]").innerHTML = rows.length
    ? rows.map((level) => {
        const pages = (level.views || []).map(viewLabel).join(", ");
        const actions = level.builtIn ? `<span class="status-pill muted">Built-in</span>` : actionButtons("accessLevelDefs", level.id, "accessLevelForm", "", canSystemEdit());
        return `<article class="profile-section access-level-view-row">
          <div>
            <strong>${escapeHtml(level.name)}</strong>
            <p>Site level: ${escapeHtml(level.id)}</p>
            <p>${escapeHtml(level.description || (level.builtIn ? "Built-in access level" : ""))}</p>
          </div>
          <div>
            <span class="status-pill">${escapeHtml(accessLevelLabel(level.baseRole))}</span>
            <p>${escapeHtml(pages || "No page access selected")}</p>
          </div>
          <div class="row-actions">${actions}</div>
        </article>`;
      }).join("")
    : `<div class="compact-item empty">No access levels configured.</div>`;
}

function openAccessLevelsView() {
  $("#accessLevelViewModal")?.remove();
  const modal = document.createElement("section");
  modal.id = "accessLevelViewModal";
  modal.className = "form-panel modal-form access-level-view-modal";
  modal.innerHTML = `<div class="panel-heading">
    <div>
      <h3>Access Levels</h3>
      <p>Security role definitions and the pages they can open.</p>
    </div>
    <div class="panel-tools">
      ${canSystemEdit() ? `<button class="tiny-button system-action" data-open-form="accessLevelForm" type="button">Add Access Level</button>` : ""}
      <button class="icon-button clean-icon-button" data-close-access-levels type="button" aria-label="Close access levels">×</button>
    </div>
  </div>
  <div class="access-level-view-list" data-access-level-list></div>`;
  $("#modalHost")?.appendChild(modal);
  renderAccessLevelsViewModal();
  $("#modalBackdrop").classList.add("show");
  document.body.classList.add("modal-open");
}

function closeAccessLevelsView() {
  $("#accessLevelViewModal")?.remove();
  $("#modalBackdrop").classList.remove("show");
  document.body.classList.remove("modal-open");
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
  renderUserAccessHead(tableId);
  const visibleRows = sortUserAccessRows(filterUserAccessRows(rows, tableId), tableId);
  count.textContent = `${visibleRows.length} users`;
  table.innerHTML = visibleRows.length
    ? visibleRows.map((row) => `<tr><td><strong>${escapeHtml(row.email || "No email")}</strong><p>${escapeHtml(row.userId || "")}</p></td><td>${userAccessRoleCell(row)}</td><td>${escapeHtml(row.clientName || row.clientId || "")}</td><td>${escapeHtml(userAccessProfileLabel(row))}</td><td>${userAccessActions(row)}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">Refresh to load user accounts.</td></tr>`;
}

function userAccessTableConfig(tableId) {
  const adminTable = tableId === "adminUserTable";
  return {
    headId: adminTable ? "adminUserHead" : "userAccessHead",
    storagePrefix: adminTable ? "productionCrewAdminUser" : "productionCrewUserAccess",
    sortKey: adminTable ? "adminUserSortKey" : "userAccessSortKey",
    sortDirection: adminTable ? "adminUserSortDirection" : "userAccessSortDirection",
    filtersKey: adminTable ? "adminUserColumnFilters" : "userAccessColumnFilters"
  };
}

function renderUserAccessHead(tableId) {
  const config = userAccessTableConfig(tableId);
  const head = document.getElementById(config.headId);
  if (!head) return;
  head.innerHTML = `<tr>${USER_ACCESS_COLUMNS.map(([key, label]) => {
    const displayLabel = key === "role" ? "Security / Access" : label;
    const filters = state[config.filtersKey] || {};
    const activeSort = state[config.sortKey] === key;
    const activeFilter = !!filters[key];
    const arrow = activeSort ? (state[config.sortDirection] === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(displayLabel)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(displayLabel)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-user-access-table="${escapeHtml(tableId)}" data-user-access-sort="${escapeHtml(key)}" data-user-access-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-user-access-table="${escapeHtml(tableId)}" data-user-access-sort="${escapeHtml(key)}" data-user-access-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-user-access-table="${escapeHtml(tableId)}" data-user-access-column-filter="${escapeHtml(key)}" value="${escapeHtml(filters[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
}

function filterUserAccessRows(rows, tableId) {
  const config = userAccessTableConfig(tableId);
  const filters = state[config.filtersKey] || {};
  return rows.filter((row) => {
    return USER_ACCESS_COLUMNS.every(([key]) => {
      const filter = String(filters[key] || "").trim().toLowerCase();
      return !filter || userAccessColumnValue(row, key).toLowerCase().includes(filter);
    });
  });
}

function sortUserAccessRows(rows, tableId) {
  const config = userAccessTableConfig(tableId);
  const key = state[config.sortKey] || "user";
  const direction = state[config.sortDirection] === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => direction * userAccessColumnValue(a, key).localeCompare(userAccessColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" }));
}

function userAccessColumnValue(row, key) {
  if (key === "user") return listText(`${row.email || ""} ${row.userId || ""}`);
  if (key === "role") return listText(`${serverAccessLabelForRow(row)} ${accessLevelsForUserAccessRow(row).map(accessLevelLabel).join(" ")}`);
  if (key === "client") return listText(`${row.clientName || ""} ${row.clientId || ""}`);
  if (key === "profile") return listText(userAccessProfileLabel(row));
  return "";
}

function serverAccessLabelForRow(row) {
  const role = normalizeRole(row.role);
  return ACCESS_LEVEL_LABELS[role] || role || "Not set";
}

function userAccessRoleCell(row) {
  const levels = accessLevelsForUserAccessRow(row);
  const roleLabel = serverAccessLabelForRow(row);
  const siteAccess = levels.length ? accessBadges(levels, "") : `<span class="status-pill muted">None</span>`;
  return `<p><strong>Supabase Security Level:</strong> <span class="status-pill">${escapeHtml(roleLabel)}</span></p><p><strong>Profile / Site Access:</strong> ${siteAccess}</p>`;
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
  $("#clientCompanyViewBody").innerHTML = profileHeroCard({
    tone: "company",
    title: client.name || "Client company",
    subtitle: client.status || "Active",
    meta: "Client Account",
    imageHtml: profileLogoHtml(client, client.name || "Company"),
    actions: `<button class="tiny-button system-action" data-edit="clients" data-id="${client.id}" data-form="clientForm" type="button">Edit Information</button>`,
    groups: clientCompanyProfileGroups(client),
    sections: [
      ["System Notes", client.notes || ""]
    ]
  });
  $("#editViewedClientCompany").dataset.editClientId = client.id;
  openForm("clientCompanyView");
}

function detailItem(label, value) {
  return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || "")}</strong></div>`;
}

function profileInfoCell(cell = {}) {
  const items = Array.isArray(cell.items) ? cell.items : [];
  if (!items.some(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")) return "";
  const className = cell.className ? ` ${escapeHtml(cell.className)}` : "";
  return `<div class="profile-info-cell${className}">${cell.title ? `<span class="profile-info-cell-title">${escapeHtml(cell.title)}</span>` : ""}${items.map(([label, value]) => detailItem(label, value)).join("")}</div>`;
}

function profileInfoSectionContent(details = []) {
  const hasCells = details.some((detail) => detail && typeof detail === "object" && !Array.isArray(detail) && Array.isArray(detail.items));
  if (hasCells) {
    const cells = details.map((detail) => profileInfoCell(detail)).filter(Boolean).join("");
    return cells ? `<div class="profile-info-grid profile-info-split-grid">${cells}</div>` : "";
  }
  const visibleDetails = details.filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "");
  return visibleDetails.length ? `<div class="profile-info-grid">${visibleDetails.map(([label, value]) => detailItem(label, value)).join("")}</div>` : "";
}

function profileSection(label, value) {
  return value ? `<div class="profile-section"><span>${escapeHtml(label)}</span><p>${escapeHtml(value)}</p></div>` : "";
}

function clientCompanyProfileGroups(client = {}) {
  return [
    ["Company Details", [
      {
        className: "profile-info-cell-wide",
        items: [
          ["Main Contact", client.contactName || ""],
          ["Email", client.email || ""],
          ["Phone", client.phone || ""]
        ]
      },
      {
        className: "profile-info-cell-status",
        items: [
          ["Status", client.status || "Active"]
        ]
      }
    ]],
    ["Default Pay Rates", [
      {
        items: [
          ["Included Hours", client.defaultIncludedHours || 10],
          ["Day Rate", currency(client.defaultDayRate || 0)],
          ["Additional Hourly", currency(client.defaultAdditionalRate || 0)]
        ]
      },
      {
        items: [
          ["Personal Vehicle", currency(client.defaultPersonalVehicleRate || 0)],
          ["Rented Vehicle", currency(client.defaultRentedVehicleRate || 0)]
        ]
      }
    ]],
    ["Production Setup", [
      ["Office Suites", clientPackageLabels(client.packageLayouts).join(", ")]
    ]]
  ];
}

function noteDescription(text = "", timestamp = "") {
  const clean = String(text || "").trim();
  if (!clean) return "";
  const date = formatDateWithYear(timestamp || new Date());
  const firstLine = clean.split(/\n+/)[0] || "";
  const alreadyStamped = /^[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4},?\s+\d{1,2}:\d{2}\s*(AM|PM)?\s+-\s+/i.test(firstLine)
    || /^\d{1,2}\/\d{1,2}\/\d{2,4},?\s+\d{1,2}:\d{2}/.test(firstLine);
  return alreadyStamped ? clean : `${date} - ${clean}`;
}

function profileInfoSection(title, details = []) {
  const content = profileInfoSectionContent(details);
  if (!content) return "";
  return `<section class="profile-info-section">
    <h4>${escapeHtml(title)}</h4>
    ${content}
  </section>`;
}

function profileTextSection(title, value) {
  if (/note/i.test(title || "")) {
    const entries = noteListEntries(value).map((entry) => noteDescription(entry));
    if (!entries.length) return "";
    return `<section class="profile-info-section profile-text-section profile-note-section">
      <h4>${escapeHtml(title)}</h4>
      <ul class="profile-note-list">${entries.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
    </section>`;
  }
  return value ? `<section class="profile-info-section profile-text-section">
    <h4>${escapeHtml(title)}</h4>
    <p>${escapeHtml(value)}</p>
  </section>` : "";
}

function noteListEntries(value = "") {
  return String(value || "")
    .replace(/\s+(?=[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4},?\s+\d{1,2}:\d{2}\s*(?:AM|PM)?\s+-\s+)/g, "\n")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function noteSectionText(value = "", timestamp = "") {
  return noteListEntries(value)
    .map((entry) => noteDescription(entry, timestamp))
    .join("\n");
}

function profileLogoHtml(profile, fallback = "Profile", className = "profile-logo-frame") {
  const image = profile?.logoData || profile?.brandLogoData || profile?.headshotData || "";
  const label = profile?.name || profile?.contactName || fallback;
  return image
    ? `<img class="${className}" src="${image}" alt="${escapeHtml(label)} image">`
    : `<div class="${className} placeholder">${escapeHtml(initialsFor(label))}</div>`;
}

function profileHeroCard({ tone = "", title = "", subtitle = "", meta = "", imageHtml = "", actions = "", details = [], groups = [], sections = [] }) {
  const toneClass = tone ? ` profile-${tone}` : "";
  const metaLine = meta ? `<span>${escapeHtml(meta)}</span>` : "";
  const groupedContent = groups.length
    ? groups.map(([groupTitle, groupDetails]) => profileInfoSection(groupTitle, groupDetails)).join("")
    : details.length
      ? `<div class="profile-detail-grid premium-detail-grid">${details.map(([label, value]) => detailItem(label, value)).join("")}</div>`
      : "";
  return `<article class="profile-page-card premium-profile-card${toneClass}">
    <div class="premium-profile-hero">
      ${imageHtml || profileLogoHtml({ name: title }, title)}
      <div class="premium-profile-title">
        ${metaLine}
        <h3>${escapeHtml(title || "Profile")}</h3>
        <p>${escapeHtml(subtitle || "")}</p>
      </div>
      <div class="premium-profile-actions">${actions || ""}</div>
    </div>
    <div class="premium-profile-content">
      ${groupedContent}
      ${sections.map(([label, value]) => profileTextSection(label, value)).join("")}
    </div>
  </article>`;
}

function readOnlyProfileCard(title, subtitle, details = [], sections = [], avatarHtml = "", groups = []) {
  $("#recordViewTitle").textContent = title || "Profile";
  const groupedContent = groups.length
    ? groups.map(([groupTitle, groupDetails]) => profileInfoSection(groupTitle, groupDetails)).join("")
    : profileInfoSection("Details", details);
  $("#recordViewBody").innerHTML = `<article class="profile-page-card premium-profile-card profile-popup-card">
    <div class="premium-profile-hero">
      ${avatarHtml || `<div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(title || "Profile"))}</div>`}
      <div class="premium-profile-title">
        <span>Profile</span>
        <h3>${escapeHtml(title || "Profile")}</h3>
        <p>${escapeHtml(subtitle || "")}</p>
      </div>
      <div class="premium-profile-actions"></div>
    </div>
    <div class="premium-profile-content">
      ${groupedContent}
      ${sections.map(([label, value]) => profileTextSection(label, value)).join("")}
    </div>
  </article>`;
}

function openTouringStopProfile(record) {
  const missing = touringMissingList(record);
  const documents = touringDocumentsForStop(record);
  const riderSections = touringRiderSections(record);
  readOnlyProfileCard(record.city || "Tour Stop", record.venue || "City Rider Workspace", [], [
    ["Advance Notes", noteSectionText(record.notes || record.missingInfo, record.updatedAt || record.createdAt)],
    ...riderSections.map(([label, value]) => [label, value])
  ], "", [
    ["Schedule", [
      ["Load-In", formatDate(record.loadInDate)],
      ["Show Date", formatDate(record.showDate)],
      ["Load-Out", formatDate(record.loadOutDate)]
    ]],
    ["Advance", [
      ["Status", record.status || (missing.length ? "Needs Review" : "Ready")],
      ["Priority", record.priority || (missing.length > 2 ? "High" : "Normal")],
      ["Owner", record.owner || "Advance Team"],
      ["Missing Info", missing.length ? missing.join(", ") : "Complete"]
    ]],
    ["Generated Documents", [
      ["Document Count", documents.length],
      ["Latest", documents[0]?.name || "Not generated"],
      ["Status", documents[0]?.status || "Pending"]
    ]],
    ["City Rider Readiness", [
      ["Sections Started", `${riderSections.length}/8`],
      ["Workspace", "Labor, runner, transport, power, FX, and cart details stay tied to this city."]
    ]]
  ]);
}

function openTouringCrewProfile(record) {
  const travel = touringTravelForPerson(record);
  const oneSheet = state.touringDocuments.find((doc) => doc.type === "Team One-Sheet" && normalizedMatchValue(doc.name).includes(normalizedMatchValue(record.name)));
  readOnlyProfileCard(record.name || "Tour Team Member", record.title || record.department || "Crew Personnel", [], [
    ["Team Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
  ], profileAvatarLarge(record, record.hideHeadshot), [
    ["Team Member", [
      ["Department", record.department],
      ["Title / Role", record.title || record.role],
      ["Info Form", record.formStatus || "Needed"],
      ["Company", record.company || activeClientRecord()?.name]
    ]],
    ["Contact", [
      ["Phone", record.phone],
      ["Email", record.email]
    ]],
    ["Documents", [
      ["One-Sheet", oneSheet ? oneSheet.status || "Ready" : "Not generated"],
      ["Document", oneSheet?.name || ""]
    ]],
    ["Travel", [
      ["Overall", travel?.overall || "Not started"],
      ["Missing Info", travel?.missing?.join(", ") || ""]
    ]]
  ]);
}

function openTouringTravelProfile(record) {
  const missing = [!record.email ? "Email" : "", !record.flightConfirmation ? "Flight confirmation" : "", !record.hotelConfirmation ? "Hotel confirmation" : ""].filter(Boolean);
  readOnlyProfileCard(record.name || "Traveler", record.overall || (missing.length ? "Needs Review" : "Ready"), [], [
    ["Travel Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
  ], profileAvatarLarge(record, record.hideHeadshot), [
    ["Traveler", [
      ["Name", record.name],
      ["Email", record.email],
      ["Overall Status", missing.length ? "Needs Review" : "Ready"],
      ["Missing Info", missing.length ? missing.join(", ") : "Complete"]
    ]],
    ["Flight", [
      ["Date", formatDate(record.flightDate)],
      ["Airline", record.airline],
      ["Depart", record.depart || record.departAirport],
      ["Arrive", record.arrive || record.arriveAirport],
      ["Confirmation", record.flightConfirmation]
    ]],
    ["Hotel", [
      ["Hotel", record.hotel || record.hotelName],
      ["Check-In", formatDate(record.checkIn)],
      ["Check-Out", formatDate(record.checkOut)],
      ["Confirmation", record.hotelConfirmation]
    ]]
  ]);
}

function openTouringDocumentProfile(record) {
  readOnlyProfileCard(record.name || "Tour Document", record.type || "Documents", [], [
    ["Document Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
  ], "", [
    ["Document", [
      ["Type", record.type],
      ["Status", record.status || "Draft"],
      ["City / Stop", record.city],
      ["Link", record.link || record.url || record.pdfLink || record.docLink]
    ]],
    ["Workflow", [
      ["Created", formatDateWithYear(record.createdAt)],
      ["Updated", formatDateWithYear(record.updatedAt)]
    ]]
  ]);
}

function openReadOnlyRecord(storeName, id) {
  const record = state[storeName]?.find((item) => item.id === id);
  if (!record) {
    toast("Record not found.");
    return;
  }
  if (storeName === "touringStops") {
    openTouringStopProfile(record);
  } else if (storeName === "touringCrew") {
    openTouringCrewProfile(record);
  } else if (storeName === "touringTravel") {
    openTouringTravelProfile(record);
  } else if (storeName === "touringDocuments") {
    openTouringDocumentProfile(record);
  } else if (storeName === "awardsShows") {
    openAwardsShowProfile(record);
  } else if (storeName === "awardsDocuments") {
    openAwardsDocumentProfile(record);
  } else if (storeName === "awardsStaff") {
    openAwardsStaffProfile(record);
  } else if (storeName === "awardsSchedules") {
    openAwardsScheduleProfile(record);
  } else
  if (storeName === "workers") {
    readOnlyProfileCard(record.name, record.role || "Crew / Runner", [], [
      ["Skills", record.skills],
      ["Emergency Contact", isCrewRole() ? "" : record.emergency],
      ["Notes", canOwnerEdit() ? noteSectionText(record.notes, record.updatedAt || record.createdAt) : ""]
    ], profileAvatarLarge(record, record.hideHeadshot), [
      ["Contact", [
        ["Phone", publicWorkerValue(record, "phone")],
        ["Email", publicWorkerValue(record, "email")],
        ["Mailing Address", record.mailingAddress]
      ]],
      ["Work Profile", [
        ["Role", record.role || "Crew / Runner"],
        ["Status", record.status],
        ["Login", record.authUserId ? "Connected" : "Not connected"]
      ]]
    ]);
  } else if (storeName === "promoters") {
    readOnlyProfileCard(record.name || record.contactName, record.companyName || "Promoter", [], [
      ["Billing Notes", noteSectionText(record.billing, record.updatedAt || record.createdAt)],
      ["Production Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
    ], profileAvatarLarge(record, false), [
      ["Promoter Profile", [
        ["Company", record.companyName || "Independent"],
        ["Rep / Office", record.contactName],
        ["Login", record.authUserId ? "Connected" : "Not connected"]
      ]],
      ["Contact", [
        ["Phone", record.phone],
        ["Email", record.email]
      ]]
    ]);
  } else if (storeName === "venues") {
    readOnlyProfileCard(record.name, "Venue", [], [
      ["Venue Contacts", venueContactsForVenue(record.id).map((contact) => `${contact.name || contact.contactName || "Contact"}${contact.title ? `, ${contact.title}` : ""} ${contact.phone || ""} ${contact.email || ""}`).join("\n")],
      ["Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
    ], "", [
      ["Location", [
        ["Address", record.address],
        ["Parking", record.parking]
      ]],
      ["Main Contact", [
        ["Name", record.contactName],
        ["Phone", record.phone],
        ["Email", record.email]
      ]]
    ]);
  } else if (storeName === "events") {
    renderEventProfile(record);
  } else if (storeName === "timecards") {
    renderTimecardProfile(record.id);
  } else if (storeName === "vehicleLogs") {
    const event = getEvent(record.eventId);
    const worker = getWorker(record.workerId);
    readOnlyProfileCard(record.vehicleType || "Vehicle Check", event?.name || "Vehicle", [], [
      ["Prior Damage", record.priorDamage],
      ["Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
    ], "", [
      ["Assignment", [
        ["Event", event?.name],
        ["Runner", worker?.name],
        ["Scheduled Date", formatDate(record.scheduledDate)]
      ]],
      ["Vehicle Check", [
        ["Phase", record.phase || "Start"],
        ["Rental Company", record.rentalCompany],
        ["Pickup Location", record.rentalPickupLocation],
        ["Scheduled Pickup", formatDate(record.rentalPickupDate)],
        ["Plate", record.plateNumber],
        ["Gas Gauge", record.gasGauge]
      ]]
    ]);
  } else if (storeName === "accidentReports") {
    readOnlyProfileCard(record.title, record.type || "Report", [], [
      ["Details", record.details],
      ["Damage / Injury Notes", noteSectionText(record.injuryDescription || record.vehicleDamageDescription, record.updatedAt || record.createdAt)]
    ], "", [
      ["Report", [
        ["Type", record.type || "Report"],
        ["Reported", formatDate(record.reportedAt)]
      ]],
      ["Related Record", [
        ["Event", getEvent(record.eventId)?.name],
        ["Worker", getWorker(record.workerId)?.name],
        ["Location", record.incidentLocation]
      ]]
    ]);
  } else if (storeName === "runnerStops") {
    readOnlyProfileCard(record.name, record.category || "Gig Resources", [], [["Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]], "", [
      ["Contact", [
        ["Phone", record.phone],
        ["Hours", record.hours]
      ]],
      ["Location", [
        ["Address", record.address],
        ["City", record.city],
        ["State", record.state]
      ]],
      ["Use", [
        ["Category", record.category],
        ["Best Use", record.bestUse]
      ]]
    ]);
  } else if (storeName === "profileNotes") {
    readOnlyProfileCard(record.title || "Note", record.relatedType || "General note", [], [["Note", noteSectionText(record.note, record.createdAt || record.updatedAt)]], "", [
      ["Note Details", [
        ["Created", formatDateWithYear(record.createdAt || record.updatedAt)],
        ["Updated", formatDateWithYear(record.updatedAt || record.createdAt)],
        ["Created By", record.createdByName || ""],
        ["Related To", record.relatedType || "General"]
      ]]
    ]);
  } else {
    readOnlyProfileCard(record.name || record.title || "Record", storeName, Object.entries(record).slice(0, 8));
  }
  if (storeName !== "timecards") openForm("recordView");
}

function renderEventProfile(event) {
  const venue = getVenue(event.venueId);
  const promoter = getPromoter(event.promoterId);
  const workerId = activeCrewWorkerId();
  const assignment = workerId ? assignmentForEventWorker(event.id, workerId) : null;
  const crew = eventWorkerIds(event).map((id) => getWorker(id)?.name).filter(Boolean);
  const vehicleLine = assignment
    ? [assignment.vehicleUse || "No Vehicle", assignment.vehicleType, assignmentLicensePlate(assignment) ? `Plate: ${assignmentLicensePlate(assignment)}` : ""].filter(Boolean).join("\n")
    : (event.requiresRentalPhotos === "yes" || event.requiresRentalPhotos === true ? "Rental vehicle photos are required for assigned runners." : "");
  const rateDetails = assignment && canViewRates()
    ? [
        ["Pay Basis", assignmentPayLine(assignment, event)],
        ["Day Rate", currency(assignment.dayRate || event.dayRate || activeClientRecord()?.defaultDayRate || 0)],
        ["Included Hours", assignment.includedHours || event.includedHours || activeClientRecord()?.defaultIncludedHours || ""],
        ["Additional Rate", currency(assignment.additionalRate || event.additionalRate || activeClientRecord()?.defaultAdditionalRate || 0)]
      ]
    : [];
  readOnlyProfileCard(event.name, event.type || "Event Profile", [], [
    ["Your Assignment", assignment ? [
      `Start: ${formatDate(assignment.startDate || event.startDate) || "Event start"}`,
      `End: ${formatDate(assignment.endDate || event.endDate) || "Event end"}`,
      assignment.vehicleUse ? `Vehicle: ${assignment.vehicleUse}` : "",
      assignment.vehicleType ? `Vehicle type: ${assignment.vehicleType}` : "",
      assignment.notes ? `Notes: ${assignment.notes}` : ""
    ].filter(Boolean).join("\n") : ""],
    ["Vehicle / Rental Info", vehicleLine || (event.requiresRentalPhotos === "yes" || event.requiresRentalPhotos === true ? "Rental vehicle photos are required for assigned runners." : "")],
    ["Venue Details", [venue?.parking ? `Parking: ${venue.parking}` : "", venue?.contactName ? `Contact: ${venue.contactName}` : "", venue?.phone, venue?.email, venue?.notes].filter(Boolean).join("\n")],
    ["Assigned Crew", crew.join(", ")],
    ["Event Notes", noteSectionText(event.notes, event.updatedAt || event.createdAt)]
  ], "", [
    ["Event Details", [
      ["Start", formatDate(event.startDate)],
      ["End", formatDate(event.endDate)],
      ["Type", event.type],
      ["Office Suite", eventOfficeSuiteLabel(event)]
    ]],
    ["Production", [
      ["Promoter", promoterLabel(promoter)],
      ["Production Contact", event.productionContact],
      ["Your Status", assignment?.status || (isCrewRole() ? "Assigned" : "")]
    ]],
    ["Location", [
      ["Venue", venue?.name],
      ["Venue Address", venue?.address]
    ]],
    ...(rateDetails.length ? [["Rates", rateDetails]] : [])
  ]);
}

function timecardDetailRows(record) {
  const worker = getWorker(record.workerId);
  const event = getEvent(record.eventId);
  const venue = getVenue(record.venueId || event?.venueId);
  const promoter = getPromoter(record.promoterId || event?.promoterId);
  const rateDetails = canViewRates() ? [["Pay Basis", payBasis(record)], ["Estimated Pay", currency(estimatedPay(record))]] : [];
  const sections = [["Notes", timecardProfileNoteText(record)]];
  return {
    title: worker?.name || "Timecard",
    subtitle: event?.name || record.eventName || "Timecard",
    details: [],
    groups: [
      ["Crew / Event", [
        ["Crew Member", worker?.name],
        ["Event", event?.name || record.eventName],
        ["Venue", venue?.name],
        ["Promoter", promoterLabel(promoter)]
      ]],
      ["Timecard Line", [
        ["Date", timecardDateLabel(record)],
        ["Call", formatTime(record.clockIn)],
        ["Lunch Out", formatTime(record.lunchOut)],
        ["Lunch In", formatTime(record.lunchIn)],
        ["Wrap", formatTime(record.clockOut) || "Live"],
        ["Hours", timecardHours(record).toFixed(2)]
      ]],
      ...(rateDetails.length ? [["Pay", rateDetails]] : [])
    ],
    sections
  };
}

function timecardProfileNoteText(record) {
  if (!canViewTimecardAdminNotes()) return noteDescription(crewVisibleTimecardNotes(record), record.updatedAt || record.createdAt);
  const notes = [record.notes, record.adminNotes]
    .map((note) => String(note || "").trim())
    .filter(Boolean);
  const uniqueNotes = [...new Set(notes)];
  return uniqueNotes.map((note) => noteDescription(note, record.updatedAt || record.createdAt)).join("\n");
}

function renderTimecardProfile(timecardId, editable = false) {
  const record = state.timecards.find((card) => card.id === timecardId);
  if (!record) {
    toast("Timecard not found.");
    return;
  }
  if (editable) {
    renderEditableTimecardProfile(record);
    openForm("recordView");
    return;
  }
  const view = timecardDetailRows(record);
  readOnlyProfileCard(view.title, view.subtitle, view.details, view.sections, profileAvatarLarge(getWorker(record.workerId) || { name: view.title }, getWorker(record.workerId)?.hideHeadshot), view.groups);
  const actions = canAdminEdit()
    ? `<div class="profile-section profile-actions"><button class="primary-action" data-edit-timecard-detail="${escapeHtml(record.id)}" type="button">Edit Timecard Line</button></div>`
    : "";
  $("#recordViewBody").querySelector(".profile-page-card")?.insertAdjacentHTML("beforeend", actions);
  openForm("recordView");
}

function selectOptions(records, selectedId, emptyLabel, labeler) {
  return `<option value="">${escapeHtml(emptyLabel)}</option>${records.map((record) => `<option value="${escapeHtml(record.id)}" ${record.id === selectedId ? "selected" : ""}>${escapeHtml(labeler(record))}</option>`).join("")}`;
}

function renderEditableTimecardProfile(record) {
  const events = visibleEvents();
  const workers = isAdminRole() ? [] : state.workers;
  const venues = isAdminRole() ? [] : state.venues;
  const promoters = isAdminRole() ? [] : state.promoters;
  const showRates = canViewRates();
  $("#recordViewTitle").textContent = "Edit Timecard";
  $("#recordViewBody").innerHTML = `<form class="profile-page-card profile-edit-form" data-timecard-detail-form>
    <input type="hidden" name="id" value="${escapeHtml(record.id)}">
    <div class="profile-page-header">
      ${profileAvatarLarge(getWorker(record.workerId) || { name: "Timecard" }, getWorker(record.workerId)?.hideHeadshot)}
      <div>
        <h3>${escapeHtml(getWorker(record.workerId)?.name || "Timecard")}</h3>
        <p>${escapeHtml(getEvent(record.eventId)?.name || record.eventName || "Timecard")}</p>
      </div>
    </div>
    <div class="profile-edit-grid">
      <label>Crew Member<select name="workerId" required>${selectOptions(workers, record.workerId, "Select crew member", (worker) => worker.name)}</select></label>
      <label>Event<select name="eventId">${selectOptions(events, record.eventId, "Select event", (event) => event.name)}</select></label>
      <label>Event or shift<input name="eventName" value="${escapeHtml(record.eventName || getEvent(record.eventId)?.name || "")}" required></label>
      <label>Venue<select name="venueId">${selectOptions(venues, record.venueId, "No venue selected", (venue) => venue.name)}</select></label>
      <label>Promoter<select name="promoterId">${selectOptions(promoters, record.promoterId, "No promoter rep selected", promoterLabel)}</select></label>
      <label>Clock in<input name="clockIn" type="datetime-local" value="${escapeHtml(dateTimeInputValue(record.clockIn))}" required></label>
      <label>Clock out<input name="clockOut" type="datetime-local" value="${escapeHtml(dateTimeInputValue(record.clockOut))}"></label>
      <label>Lunch out<input name="lunchOut" type="datetime-local" value="${escapeHtml(dateTimeInputValue(record.lunchOut))}"></label>
      <label>Lunch in<input name="lunchIn" type="datetime-local" value="${escapeHtml(dateTimeInputValue(record.lunchIn))}"></label>
      <label>Break minutes<input name="breakMinutes" type="number" min="0" step="5" value="${escapeHtml(record.breakMinutes || "0")}"></label>
      ${showRates ? `<label>Day rate<input name="dayRate" type="number" min="0" step="0.01" value="${escapeHtml(record.dayRate || "")}"></label>
      <label>Included hours<input name="includedHours" type="number" min="0" step="0.25" value="${escapeHtml(record.includedHours || "")}"></label>
      <label>Additional hourly rate<input name="additionalRate" type="number" min="0" step="0.01" value="${escapeHtml(record.additionalRate || "")}"></label>
      <label>Vehicle rate<input name="vehicleRate" type="number" min="0" step="0.01" value="${escapeHtml(record.vehicleRate || "")}"></label>` : ""}
      <label>Vehicle use<select name="vehicleUse">
        <option value="" ${!record.vehicleUse ? "selected" : ""}>None</option>
        <option ${record.vehicleUse === "Rented Vehicle" ? "selected" : ""}>Rented Vehicle</option>
        <option ${record.vehicleUse === "Personal Vehicle" ? "selected" : ""}>Personal Vehicle</option>
      </select></label>
    </div>
    <label>Notes<textarea name="notes" rows="3">${escapeHtml(record.notes || "")}</textarea></label>
    <div class="profile-actions">
      <button class="primary-action" data-save-timecard-detail type="button">Save Timecard Line</button>
      <button class="secondary-action" data-cancel-timecard-detail="${escapeHtml(record.id)}" type="button">Cancel</button>
    </div>
  </form>`;
}

async function saveTimecardDetailForm(button) {
  const form = button.closest("[data-timecard-detail-form]");
  if (!form || !canAdminEdit()) {
    toast("Switch to CLIENT or PROMOTER to save this.");
    return;
  }
  const record = await formRecord(form);
  const existing = state.timecards.find((card) => card.id === record.id);
  if (!existing) {
    toast("Timecard not found.");
    return;
  }
  let merged = { ...existing, ...record };
  if (merged.eventId) {
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
  await put("timecards", merged);
  await loadState();
  setView(state.activeView);
  renderTimecardProfile(merged.id);
  toast("Timecard line saved.");
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
  const profileActions = `<button class="tiny-button owner-action" data-open-form="clientProfileForm" type="button">Edit Profile</button>${clientSmtpTestButton}`;
  card.innerHTML = profileHeroCard({
    tone: "person",
    title: profile.name || "My profile",
    subtitle: profile.title || "Client rep",
    meta: client?.name || "Client team",
    imageHtml: profileLogoHtml(profile, profile.name || authState.user?.email || "Me"),
    actions: profileActions,
    groups: [
      ["Contact", [
        ["Email", profile.email || ""],
        ["Phone", profile.phone || ""],
        ["Client Company", client?.name || ""]
      ]],
      ["Email Routing", [
        ["Provider", smtpProviderLabel(profile.smtpProvider)],
        ["Status", profile.emailRoutingStatus || "Not configured"],
        ["From Email", profile.smtpFromEmail || ""],
        ["Reply-To", profile.smtpReplyTo || ""]
      ]],
      ["Delivery Setup", [
        ["SMTP Host", `${profile.smtpHost || ""}${profile.smtpPort ? ":" + profile.smtpPort : ""}`],
        ["App Password", profile.smtpSecretRef ? "Saved securely" : "No app password saved"]
      ]]
    ],
    sections: []
  });
  if (companyCard) {
    companyCard.innerHTML = client ? profileHeroCard({
      tone: "company",
      title: client.name || "Client company",
      subtitle: client.status || "Active",
      meta: "Client Profile",
      imageHtml: profileLogoHtml(client, client.name || "Company"),
      actions: `<button class="tiny-button owner-action" data-open-form="clientCompanyProfileForm" type="button">Edit Company</button>`,
      groups: clientCompanyProfileGroups(client),
      sections: [
        ["Company Notes", client.notes || ""]
      ]
    }) : `<div class="compact-item empty">No company profile connected yet.</div>`;
  }
}

function renderAdminProfile() {
  const card = $("#adminProfileCard");
  if (!card) return;
  const profile = activeAdminProfile();
  const name = profile.name || authState.user?.user_metadata?.name || "System Admin";
  const email = profile.email || authState.user?.email || "";
  card.innerHTML = profileHeroCard({
    tone: "admin",
    title: name,
    subtitle: email,
    meta: "System Profile",
    imageHtml: `<div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(name || email || "Admin"))}</div>`,
    actions: `<button class="tiny-button system-action" data-open-form="adminProfileForm" type="button">SMTP Settings</button><button class="tiny-button system-action" data-send-smtp-test="admin" type="button">Send Test Email</button>`,
    groups: [
      ["Access", [
        ["Server Role", "ADMIN"],
        ["System Access", "Client setup and troubleshooting"],
        ["Signed-In Email", email]
      ]],
      ["Email Routing", [
        ["Provider", smtpProviderLabel(profile.smtpProvider)],
        ["Status", profile.emailRoutingStatus || "Not configured"],
        ["From Email", profile.smtpFromEmail || ""],
        ["Reply-To", profile.smtpReplyTo || ""]
      ]],
      ["Delivery Setup", [
        ["SMTP Host", `${profile.smtpHost || ""}${profile.smtpPort ? ":" + profile.smtpPort : ""}`],
        ["App Password", profile.smtpSecretRef ? "Saved securely" : "No app password saved"]
      ]]
    ],
    sections: [
      ["Security Boundary", "ADMIN can manage system setup and client accounts, but does not load sensitive production records, payroll, timecards, crew personal data, promoter records, or reports."]
    ]
  });
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
  updateEventOfficeSuiteField();
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

function updateEventOfficeSuiteField(record = null) {
  const form = $("#eventForm");
  if (!form) return;
  const field = form.querySelector(".event-office-suite-field");
  const select = form.elements.officeSuiteId;
  if (!field || !select) return;
  const client = state.clients.find((item) => item.id === record?.clientId) || activeClientRecord();
  const suites = clientOfficeSuiteDefinitions(client);
  const current = record?.officeSuiteId || select.value || suites[0]?.id || "";
  field.hidden = suites.length <= 1;
  select.required = suites.length > 1;
  select.innerHTML = suites.map((suite) => `<option value="${escapeHtml(suite.id)}">${escapeHtml(suite.name)}</option>`).join("");
  select.value = suites.some((suite) => suite.id === current) ? current : suites[0]?.id || "";
}

function renderDashboard() {
  renderCrewMobileHome();
  renderMobileDeviceStatus();
  renderMobileQaPanel();
  renderMobileLaunchPanel();
  renderDesktopDashboardHero();
  renderDashboardIdentity();
  if (isAdminRole()) {
    renderDashboardPayrollControls([]);
    renderDashboardCalendar([]);
    $("#liveCrewList").innerHTML = `<div class="compact-item empty">ADMIN does not load production timecard data.</div>`;
    $("#recentNotes").innerHTML = `<div class="compact-item empty">ADMIN does not load production intelligence signals.</div>`;
    return;
  }
  const cards = visibleRecords(state.timecards);
  const liveCards = cards.filter((card) => !card.clockOut);
  renderDashboardPayrollControls(cards);
  renderDashboardCalendar(visibleEvents());

  $("#liveCrewList").innerHTML = liveCards.length
    ? liveCards.slice(0, 8).map((card) => {
        const worker = getWorker(card.workerId);
        const event = getEvent(card.eventId);
        return `<div class="compact-item"><strong>${escapeHtml(worker?.name || "Unknown worker")}</strong><span>${escapeHtml(event?.name || card.eventName)} - ${timecardHours(card).toFixed(2)} hrs</span></div>`;
      }).join("")
    : `<div class="compact-item empty">No one is clocked in right now.</div>`;

  const noteItems = dashboardRecentNotes();

  $("#recentNotes").innerHTML = noteItems.length
    ? noteItems.slice(0, 8).map(recentNoteItemHtml).join("")
    : `<div class="compact-item empty">Stage Intelligence signals and notes will appear here as they are created.</div>`;
}

function dashboardRecentNotes() {
  const canSeeProductionNotes = hasDataScope("CLIENT") || hasDataScope("PROMOTER");
  const eventNotes = visibleEvents().flatMap((item) => dashboardNoteEntries({
    type: "Event",
    name: item.name,
    text: item.notes,
    updatedAt: item.updatedAt || item.createdAt,
    storeName: "events",
    recordId: item.id
  }));
  const venueNotes = canSeeProductionNotes ? state.venues.flatMap((item) => dashboardNoteEntries({
    type: "Venue",
    name: item.name,
    text: item.notes || item.parking,
    updatedAt: item.updatedAt || item.createdAt,
    storeName: "venues",
    recordId: item.id
  })) : [];
  const promoterNotes = canSeeProductionNotes ? visiblePromoters().flatMap((item) => dashboardNoteEntries({
    type: "Promoter",
    name: promoterLabel(item),
    text: item.notes,
    updatedAt: item.updatedAt || item.createdAt,
    storeName: "promoters",
    recordId: item.id
  })) : [];
  const runnerStopNotes = canSeeProductionNotes ? state.runnerStops.flatMap((item) => dashboardNoteEntries({
    type: "Runner",
    name: item.name,
    text: item.notes || item.bestUse,
    updatedAt: item.updatedAt || item.createdAt,
    storeName: "runnerStops",
    recordId: item.id
  })) : [];
  const timecardNotes = canViewTimecardAdminNotes() ? visibleRecords(state.timecards).flatMap((card) => {
    const worker = getWorker(card.workerId);
    const event = getEvent(card.eventId);
    return dashboardNoteEntries({
      type: "Timecard",
      name: [worker?.name, event?.name || card.eventName].filter(Boolean).join(" - ") || "Timecard",
      text: timecardProfileNoteText(card),
      updatedAt: card.updatedAt || card.createdAt,
      storeName: "timecards",
      recordId: card.id
    });
  }) : [];
  const createdNotes = canSeeProductionNotes ? state.profileNotes
    .filter((note) => note.note && dashboardProfileNoteIsVisible(note))
    .flatMap((note) => dashboardNoteEntries({
      type: note.relatedType ? `${titleCase(note.relatedType)} Note` : "Note",
      name: note.title || dashboardProfileNoteName(note) || note.createdByName || "Created note",
      text: note.note,
      updatedAt: note.updatedAt || note.createdAt,
      storeName: "profileNotes",
      recordId: note.id
    })) : [];
  return [
    ...createdNotes,
    ...eventNotes,
    ...venueNotes,
    ...promoterNotes,
    ...runnerStopNotes,
    ...timecardNotes
  ].filter((item) => item.text).sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
}

function dashboardNoteEntries(item) {
  return noteListEntries(item.text).map((text, index) => ({
    ...item,
    text,
    noteIndex: index
  }));
}

function dashboardProfileNoteIsVisible(note) {
  if (note.clientId && note.clientId !== cloudClientId() && note.clientId !== activeClientRecord()?.id) return false;
  if (note.workerId) return visibleWorkers().some((worker) => worker.id === note.workerId);
  if (note.promoterId) return visiblePromoters().some((promoter) => promoter.id === note.promoterId);
  return true;
}

function dashboardProfileNoteName(note) {
  if (note.workerId) return getWorker(note.workerId)?.name || "Crew / Runner";
  if (note.promoterId) return promoterLabel(getPromoter(note.promoterId)) || "Promoter";
  return "";
}

function titleCase(value = "") {
  return String(value || "").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function recentNoteItemHtml(item) {
  const target = item.storeName && item.recordId ? `${item.storeName}:${item.recordId}` : "";
  const viewButton = target ? `<button class="icon-button clean-icon-button recent-note-view" data-view-record="${escapeHtml(target)}" type="button" aria-label="View note" title="View note">⌕</button>` : "";
  const description = noteDescription(item.text, item.updatedAt);
  return `<div class="compact-item recent-note-item">
    <div>
      <strong>${escapeHtml(item.type)}: ${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(description)}</span>
    </div>
    ${viewButton}
  </div>`;
}

function openRecentNotesView() {
  const notes = dashboardRecentNotes().slice(0, 8);
  $("#recentNotesViewBody").innerHTML = notes.length
    ? notes.map(recentNoteItemHtml).join("")
    : `<div class="compact-item empty">Stage Intelligence signals and notes will appear here as they are created.</div>`;
  openForm("recentNotesView");
}

function renderDashboardIdentity() {
  const identity = $("#topbarIdentity");
  if (!identity) return;
  identity.textContent = authState.session ? currentSessionDisplayName() : "Not signed in";
  identity.hidden = !authState.session;
}

function dashboardPayrollCards(cards = visibleRecords(state.timecards)) {
  const range = state.dashboardPayrollRange || "month";
  if (range === "lifetime") return cards;
  if (range === "event") {
    const eventId = state.dashboardPayrollEventId || dashboardDefaultPayrollEventId();
    return eventId ? cards.filter((card) => card.eventId === eventId) : [];
  }
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  if (range === "year") {
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(11, 31);
    end.setHours(23, 59, 59, 999);
  } else if (range === "month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(end.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  } else if (range === "week") {
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  }
  return cards.filter((card) => {
    const value = card.clockIn || card.workDate || card.createdAt;
    const date = new Date(value);
    return !Number.isNaN(date.getTime()) && date >= start && date <= end;
  });
}

function dashboardDefaultPayrollEventId() {
  const events = sortEventCards(visibleEvents());
  const currentOrNext = events.find((event) => eventScheduleBucket(event) !== "past");
  return currentOrNext?.id || events[0]?.id || "";
}

function renderDashboardPayrollControls(cards = visibleRecords(state.timecards)) {
  const range = $("#dashboardPayrollRange");
  const eventControl = $("#dashboardPayrollEventControl");
  const eventSelect = $("#dashboardPayrollEvent");
  if (!range || !eventControl || !eventSelect) return;
  range.value = state.dashboardPayrollRange || "month";
  const eventsWithCards = visibleEvents().filter((event) => cards.some((card) => card.eventId === event.id));
  const eventOptions = eventsWithCards.length ? eventsWithCards : visibleEvents();
  if (!state.dashboardPayrollEventId || !eventOptions.some((event) => event.id === state.dashboardPayrollEventId)) {
    state.dashboardPayrollEventId = dashboardDefaultPayrollEventId();
  }
  eventSelect.innerHTML = eventOptions.length
    ? eventOptions.map((event) => `<option value="${escapeHtml(event.id)}">${escapeHtml(event.name)}</option>`).join("")
    : `<option value="">No events yet</option>`;
  eventSelect.value = state.dashboardPayrollEventId;
  eventControl.hidden = state.dashboardPayrollRange !== "event";
}

function dashboardCalendarMonthDate() {
  const saved = state.dashboardCalendarMonth;
  if (/^\d{4}-\d{2}$/.test(saved)) return new Date(`${saved}-01T12:00:00`);
  const nextEvent = sortEventCards(visibleEvents().filter((event) => eventScheduleBucket(event) !== "past"))[0];
  const date = nextEvent?.startDate ? new Date(nextEvent.startDate) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function setDashboardCalendarMonth(date) {
  const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  state.dashboardCalendarMonth = month;
  localStorage.setItem("productionCrewDashboardCalendarMonth", month);
}

function renderDashboardCalendar(events = visibleEvents()) {
  const calendar = $("#dashboardCalendar");
  const title = $("#dashboardCalendarTitle");
  if (!calendar || !title) return;
  const monthDate = dashboardCalendarMonthDate();
  setDashboardCalendarMonth(monthDate);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  title.textContent = monthDate.toLocaleDateString([], { month: "long", year: "numeric" });
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingDays = first.getDay();
  const cells = [];
  for (let i = 0; i < leadingDays; i += 1) cells.push("");
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(String(day));
  while (cells.length % 7 !== 0) cells.push("");
  const todayKey = localDateKey();
  const weekdayHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<div class="calendar-weekday">${day}</div>`).join("");
  const body = cells.map((day) => {
    if (!day) return `<div class="calendar-day empty"></div>`;
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = events.filter((event) => eventTouchesDate(event, dateKey));
    return `<div class="calendar-day ${dateKey === todayKey ? "today" : ""}">
      <span>${day}</span>
      <div class="calendar-events">
        ${dayEvents.slice(0, 3).map((event) => `<button class="calendar-event" style="--suite-color: ${escapeHtml(officeSuiteColor(event.officeSuiteId))}" data-view-record="events:${escapeHtml(event.id)}" type="button">${escapeHtml(event.name)}</button>`).join("")}
        ${dayEvents.length > 3 ? `<small>+${dayEvents.length - 3} more</small>` : ""}
      </div>
    </div>`;
  }).join("");
  calendar.innerHTML = `${weekdayHeader}${body}`;
}

function eventTouchesDate(event, dateKey) {
  const startKey = String(event.startDate || "").slice(0, 10);
  const endKey = String(event.endDate || event.startDate || "").slice(0, 10);
  if (!startKey) return false;
  return dateKey >= startKey && dateKey <= (endKey || startKey);
}

function workerScheduledForEventDate(event, workerId, dateKey = localDateKey()) {
  if (!event || !workerId) return false;
  const assignment = assignmentForEventWorker(event.id, workerId);
  if (assignment) return eventTouchesDate(assignment, dateKey) || eventTouchesDate(event, dateKey);
  return eventWorkerIds(event).includes(workerId) && eventTouchesDate(event, dateKey);
}

function numericCoordinate(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function venueCoordinates(venue) {
  if (!venue) return null;
  const latitude = numericCoordinate(venue.latitude ?? venue.lat ?? venue.location?.latitude ?? venue.location?.lat);
  const longitude = numericCoordinate(venue.longitude ?? venue.lng ?? venue.lon ?? venue.location?.longitude ?? venue.location?.lng ?? venue.location?.lon);
  return latitude === null || longitude === null ? null : { latitude, longitude };
}

function milesBetweenCoordinates(first, second) {
  if (!first || !second) return null;
  const toRadians = (value) => value * Math.PI / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = toRadians(second.latitude - first.latitude);
  const dLon = toRadians(second.longitude - first.longitude);
  const lat1 = toRadians(first.latitude);
  const lat2 = toRadians(second.latitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function clientAdminRecipientsForEvent(event) {
  const clientId = eventClientId(event);
  return state.clientReps.filter((rep) => {
    if (clientId && rep.clientId !== clientId) return false;
    return ensureClientRepAccessLevels(rep.accessLevels, "CLIENT_REP").includes("CLIENT_ADMIN");
  });
}

async function applyVenueDistanceRule(card, event, location, field) {
  if (field !== "clockIn" || !card?.id || !event || !location) return card;
  const venue = getVenue(card.venueId || event.venueId);
  const venueLocation = venueCoordinates(venue);
  if (!venueLocation) return card;
  const miles = milesBetweenCoordinates(location, venueLocation);
  if (miles === null || miles <= 2) return card;
  const worker = getWorker(card.workerId);
  const message = `${worker?.name || "Crew member"} clocked in ${miles.toFixed(1)} miles from ${venue?.name || "the scheduled venue"}.`;
  const updated = {
    ...card,
    adminNotes: appendTimecardAdminNote(card, message),
    distanceWarnings: [
      ...(Array.isArray(card.distanceWarnings) ? card.distanceWarnings : []),
      {
        type: "clockInVenueDistance",
        miles: Number(miles.toFixed(2)),
        thresholdMiles: 2,
        venueId: venue?.id || "",
        createdAt: new Date().toISOString()
      }
    ]
  };
  await notifyClientAdminsAboutTimecard(updated, event, message, {
    transactionId: `timecard-distance-${updated.id}-${updated.distanceWarnings.length}`
  });
  return updated;
}

function dashboardHeroConfig() {
  if (isAdminRole()) {
    return {
      eyebrow: "System workspace",
      title: "Admin setup and health",
      body: "Manage accounts, access, messaging readiness, and system notices without opening production records.",
      primaryView: "admin",
      primaryLabel: "Open Admin Console",
      secondaryView: "dataTools",
      secondaryLabel: "Data Tools",
      stats: [
        { label: "System Notices", value: systemAdminThreadMessages().length, view: "messages" },
        { label: "Client Accounts", value: state.clients.length, view: "adminClients" },
        { label: "Access Levels", value: accessLevelRowsForDisplay().length, view: "adminAccessLevels" }
      ]
    };
  }
  if (isCrewRole()) {
    const currentEvents = visibleEvents().filter((event) => eventScheduleBucket(event) === "current");
    const nextEvent = sortEventCards(visibleEvents().filter((event) => eventScheduleBucket(event) !== "past"))[0];
    const workerId = activeCrewWorkerId();
    const liveCard = state.timecards.find((card) => card.workerId === workerId && card.clockIn && !card.clockOut);
    const weekEvents = visibleEvents().filter((event) => crewWeekDays().some((day) => workerScheduledForEventDate(event, workerId, day.key)));
    return {
      eyebrow: "Crew workspace",
      title: currentSessionDisplayName(),
      body: liveCard ? "You have an active timecard running. Keep time, vehicle photos, reports, and messages moving from one place." : "Review your assigned events, messages, and timecard actions before the next call.",
      primaryView: "clock",
      primaryLabel: liveCard ? "Open Time Clock" : "Start Time Clock",
      secondaryView: "messages",
      secondaryLabel: "Messages",
      stats: [
        { label: "Current Events", value: currentEvents.length, view: "events" },
        { label: "This Week", value: weekEvents.length, view: "events" },
        { label: "Open Timecard", value: liveCard ? "Yes" : "No", view: "timecards" }
      ]
    };
  }
  if (isProductionTeamRole()) {
    const visible = visibleEvents();
    const liveCards = visibleRecords(state.timecards).filter((card) => !card.clockOut);
    return {
      eyebrow: "Production team",
      title: "Production board at a glance",
      body: "Track the live event surface: assigned crew, reports, vehicles, and office messaging.",
      primaryView: "productionBoard",
      primaryLabel: "Open Production Office",
      secondaryView: "messages",
      secondaryLabel: "Messages",
      stats: [
        { label: "Visible Events", value: visible.length, view: "events" },
        { label: "Clocked In", value: liveCards.length, view: "timecards" },
        { label: "Reports", value: visibleRecords(state.accidentReports).length, view: "reports" }
      ]
    };
  }
  if (isProductionRole()) {
    const visible = visibleEvents();
    return {
      eyebrow: "Promoter workspace",
      title: "Event operations",
      body: "Keep event details, production contacts, crew visibility, and reports close without digging through every module.",
      primaryView: "events",
      primaryLabel: "Open Events",
      secondaryView: "productionBoard",
      secondaryLabel: "Production Office",
      stats: [
        { label: "Events", value: visible.length, view: "events" },
        { label: "Clocked In", value: visibleRecords(state.timecards).filter((card) => !card.clockOut).length, view: "timecards" },
        { label: "Reports", value: visibleRecords(state.accidentReports).length, view: "reports" }
      ]
    };
  }
  const cards = visibleRecords(state.timecards);
  const liveCards = cards.filter((card) => !card.clockOut);
  return {
    eyebrow: "Command center",
    title: activeClientRecord()?.name || "Production command center",
    body: "See the whole operation first: what is live, what is next, what needs attention, and which suite needs your focus.",
    primaryView: "events",
    primaryLabel: "Open Events",
    secondaryView: "timecards",
    secondaryLabel: "Timecards",
    stats: [
      { label: "Events", value: visibleEvents().length, view: "events" },
      { label: "Clocked In", value: liveCards.length, view: "timecards" },
      { label: "Est. Payroll", value: currency(dashboardPayrollCards(cards).reduce((sum, card) => sum + estimatedPay(card), 0)), view: "payroll", payroll: true }
    ]
  };
}

function dashboardHeroStat(stat) {
  const view = assignedViews().includes(stat.view) ? stat.view : "";
  const control = stat.payroll ? `<div class="desktop-hero-payroll-controls">
    <label class="metric-control desktop-hero-payroll-range" aria-label="Payroll range">
      <span>Range</span>
      <select id="dashboardPayrollRange">
        <option value="lifetime">Lifetime</option>
        <option value="year">Yearly</option>
        <option value="month">Monthly</option>
        <option value="week">Weekly</option>
        <option value="day">Daily</option>
        <option value="event">By Event</option>
      </select>
    </label>
    <label id="dashboardPayrollEventControl" class="metric-control desktop-hero-payroll-event" hidden>
      <span>Event</span>
      <select id="dashboardPayrollEvent"></select>
    </label>
  </div>` : "";
  const attrs = view ? ` data-dashboard-link="${escapeHtml(view)}"` : "";
  const tag = view && !stat.payroll ? "button" : "div";
  const type = tag === "button" ? ` type="button"` : "";
  return `<${tag} class="desktop-hero-stat${view ? " is-clickable" : ""}"${attrs}${type}>
    <span>${escapeHtml(stat.label)}</span>
    <strong>${escapeHtml(String(stat.value))}</strong>
    ${control}
  </${tag}>`;
}

function dashboardSuiteOverviewCards() {
  if (isAdminRole() || isCrewRole()) return [];
  const views = assignedViews();
  const client = activeClientRecord();
  const cards = visibleRecords(state.timecards);
  const liveCards = cards.filter((card) => !card.clockOut);
  const notes = dashboardRecentNotes();
  const result = [];
  if (views.includes("dashboard") && clientHasOfficeSuite(LOCAL_PRODUCTION_SUITE_ID, client)) {
    result.push({
      suiteId: LOCAL_PRODUCTION_SUITE_ID,
      label: "Operations",
      title: "Main Operations",
      detail: "Events, crew, vehicles, timecards, payroll, and local resources.",
      view: "events",
      stats: [
        ["Events", visibleEvents().length],
        ["Clocked In", liveCards.length],
        ["Signals", notes.length]
      ]
    });
  }
  if (views.includes("touringDashboard") && touringSuiteEnabled(client)) {
    const stops = touringStops();
    const crew = touringCrewRows(stops);
    const travel = touringTravelRows(crew);
    const attention = touringAttentionRows(stops, crew, travel);
    result.push({
      suiteId: TOURING_SUITE_ID,
      label: "Touring",
      title: "Touring",
      detail: "Tour stops, city rider workspaces, crew personnel, travel, and generated packets.",
      view: "touringDashboard",
      stats: [
        ["Stops", stops.length],
        ["Travel Needs", travel.filter((person) => person.overall !== "Ready").length],
        ["Signals", attention.length]
      ]
    });
  }
  if (views.includes("awardsDashboard") && awardsSuiteEnabled(client)) {
    const shows = awardsShowRows();
    const documents = awardsDocumentsRows();
    const staffing = awardsStaffRows();
    const schedules = awardsScheduleRows(shows);
    const attention = awardsAttentionRows(shows, documents, staffing, schedules, awardsPacketRows(shows, documents, staffing, schedules), awardsDepartmentRows(documents, staffing, schedules), awardsDistributionRows(documents), awardsAccessRows(documents), awardsShowDayRows(shows, schedules), awardsContactRows(staffing), awardsComplianceRows(documents), awardsVersionRows(documents), awardsTechnicalRows(documents), awardsTalentRows(documents, staffing, schedules));
    result.push({
      suiteId: AWARDS_SUITE_ID,
      label: "Broadcast",
      title: "Awards / Broadcast",
      detail: "Show documents, rundowns, staff lists, distro, access, scripts, and show-day readiness.",
      view: "awardsDashboard",
      stats: [
        ["Shows", shows.length],
        ["Docs", documents.length],
        ["Signals", attention.length]
      ]
    });
  }
  return result;
}

function dashboardSuiteOverviewHtml() {
  const cards = dashboardSuiteOverviewCards();
  if (cards.length <= 1) return "";
  return `<div class="desktop-suite-overview">
    <div class="desktop-suite-heading">
      <span>Office Suites</span>
      <strong>Command Center</strong>
    </div>
    <div class="desktop-suite-grid">
      ${cards.map((card) => `<button class="desktop-suite-card"${suiteStyleVars(card.suiteId)} data-dashboard-link="${escapeHtml(card.view)}" type="button">
        <span>${escapeHtml(card.label)}</span>
        <h4>${escapeHtml(card.title)}</h4>
        <p>${escapeHtml(card.detail)}</p>
        <div class="desktop-suite-card-stats">
          ${card.stats.map(([label, value]) => `<small><b>${escapeHtml(String(value))}</b>${escapeHtml(label)}</small>`).join("")}
        </div>
      </button>`).join("")}
    </div>
  </div>`;
}

function dashboardIntelligenceStripHtml() {
  if (isAdminRole()) return "";
  const items = dashboardRecentNotes().slice(0, 3);
  const content = items.length
    ? items.map((item) => `<span>${escapeHtml(item.type)}: ${escapeHtml(noteDescription(item.text, item.updatedAt))}</span>`).join("")
    : `<span>No urgent Stage Intelligence signals right now.</span>`;
  return `<div class="desktop-intelligence-strip">
    <strong>Stage Intelligence</strong>
    <div>${content}</div>
  </div>`;
}

function renderDesktopDashboardHero() {
  const hero = $("#desktopDashboardHero");
  if (!hero) return;
  const config = dashboardHeroConfig();
  const secondary = config.secondaryView && assignedViews().includes(config.secondaryView)
    ? `<button class="secondary-action" data-dashboard-link="${escapeHtml(config.secondaryView)}" type="button">${escapeHtml(config.secondaryLabel)}</button>`
    : "";
  const primary = config.primaryView && assignedViews().includes(config.primaryView)
    ? `<button class="primary-action" data-dashboard-link="${escapeHtml(config.primaryView)}" type="button">${escapeHtml(config.primaryLabel)}</button>`
    : "";
  hero.innerHTML = `<div class="desktop-hero-copy">
    <span>${escapeHtml(config.eyebrow)}</span>
    <h3>${escapeHtml(config.title)}</h3>
    <p>${escapeHtml(config.body)}</p>
    <div class="desktop-hero-actions">${primary}${secondary}</div>
  </div>
  <div class="desktop-hero-stats">
    ${config.stats.map((stat) => dashboardHeroStat(stat)).join("")}
  </div>
  ${dashboardIntelligenceStripHtml()}
  ${dashboardSuiteOverviewHtml()}`;
}

function renderMobileDeviceStatus() {
  const panel = $("#mobileDevicePanel");
  const mode = $("#mobileDeviceMode");
  const status = $("#mobileDeviceStatus");
  if (!panel || !mode || !status) return;
  panel.hidden = false;
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
  const status = $("#crewMobileStatus");
  const hero = $("#crewMobileHero");
  const actions = $("#crewMobileActions");
  const tasks = $("#crewMobileTasks");
  if (!status || !hero || !actions || !tasks) return;
  const workerId = activeCrewWorkerId();
  const worker = getWorker(workerId) || loggedInWorkerRecord();
  const events = [...visibleEvents()].sort((a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0));
  const activeCard = state.timecards.find((card) => card.workerId === workerId && card.clockIn && !card.clockOut);
  const activeEvent = activeCard ? getEvent(activeCard.eventId) : null;
  const futureEvents = events.filter((event) => eventScheduleBucket(event) !== "past");
  const currentEvents = events.filter((event) => eventScheduleBucket(event) === "current");
  const todayEvents = events.filter((event) => workerScheduledForEventDate(event, workerId, localDateKey()));
  const weekDays = crewWeekDays();
  const weekEvents = events.filter((event) => weekDays.some((day) => workerScheduledForEventDate(event, workerId, day.key)));
  const focusEvent = activeEvent || todayEvents[0] || currentEvents[0] || futureEvents[0] || events[0];
  const focusCard = focusEvent ? timecardForCrewEvent(focusEvent.id) : null;
  const venue = focusEvent ? getVenue(focusEvent.venueId) : null;
  const punch = focusEvent ? nextCrewPunch(focusCard) : null;
  const nextLabel = futureEvents[0]?.startDate ? formatDate(futureEvents[0].startDate) : "None booked";
  status.textContent = activeCard ? "Clocked in now" : events.length ? `${events.length} booked` : "No booked events";
  hero.innerHTML = `<div class="crew-home-title">
      <span>Crew / Runner Home</span>
      <strong>${escapeHtml(worker?.name || currentSessionDisplayName())}</strong>
      <p>${escapeHtml(activeCard ? `Live on ${activeEvent?.name || activeCard.eventName || "current event"}` : focusEvent ? `Next: ${focusEvent.name}` : "Your booked events and call actions will appear here.")}</p>
    </div>
    <div class="crew-home-stats">
      <button class="crew-home-stat" data-dashboard-link="events" type="button"><span>Booked</span><strong>${events.length}</strong></button>
      <button class="crew-home-stat" data-dashboard-link="timecards" type="button"><span>This Week</span><strong>${weekEvents.length}</strong></button>
      <button class="crew-home-stat" data-dashboard-link="clock" type="button"><span>Timecard</span><strong>${activeCard ? "Live" : "Ready"}</strong></button>
    </div>`;
  const canPunchFocusEvent = !!focusEvent && workerScheduledForEventDate(focusEvent, workerId, localDateKey());
  actions.innerHTML = `<section class="crew-quick-clock">
      <div>
        <span>Quick Time Clock</span>
        <strong>${escapeHtml(focusEvent?.name || "No event selected")}</strong>
        <p>${escapeHtml(focusEvent ? `${venue?.name || "No venue"}${focusEvent.startDate ? " - " + formatDate(focusEvent.startDate) : ""}` : "You need a scheduled event before clocking in.")}</p>
      </div>
      ${focusEvent && canPunchFocusEvent
        ? `<button class="primary-action" data-time-punch="${escapeHtml(punch.field)}" data-event-id="${escapeHtml(focusEvent.id)}" type="button">${escapeHtml(punch.label)}</button>`
        : `<button class="primary-action" type="button" disabled>${escapeHtml(focusEvent ? "Not Scheduled Today" : "No Event Today")}</button>`}
    </section>
    <div class="crew-home-actions">
      <button class="ghost-button" data-mobile-go-view="events" type="button">Events</button>
      <button class="ghost-button" data-mobile-go-view="messages" type="button">Messages</button>
      <button class="ghost-button" data-mobile-go-view="vehicles" type="button">Vehicle Photos</button>
      <button class="ghost-button" data-mobile-go-view="reports" type="button">Report</button>
    </div>`;
  tasks.innerHTML = `<section class="crew-week-card">
      <div class="crew-week-heading"><span>Week Of</span><strong>${escapeHtml(crewWeekRangeLabel(weekDays))}</strong></div>
      <div class="crew-week-strip">${weekDays.map((day) => crewWeekDayCard(day, events, workerId)).join("")}</div>
    </section>
    <section class="crew-booked-list">
      <div class="crew-week-heading"><span>Booked Events</span><strong>${escapeHtml(nextLabel)}</strong></div>
      <div class="crew-booked-items">${crewBookedEventCards(events).join("")}</div>
    </section>
    <section class="crew-task-list">
      <div class="crew-week-heading"><span>Needs Attention</span><strong>${escapeHtml(activeCard ? "Live" : "Ready")}</strong></div>
      ${crewMobileTaskCards(events, activeCard)}
    </section>`;
}

function crewWeekDays(referenceDate = new Date()) {
  const start = new Date(referenceDate);
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      date,
      key: localDateKey(date),
      label: date.toLocaleDateString([], { weekday: "short" }),
      day: date.toLocaleDateString([], { day: "numeric" })
    };
  });
}

function crewWeekRangeLabel(days) {
  if (!days?.length) return "";
  const first = days[0].date;
  const last = days[days.length - 1].date;
  return `${first.toLocaleDateString([], { month: "short", day: "numeric" })} - ${last.toLocaleDateString([], { month: "short", day: "numeric" })}`;
}

function crewWeekDayCard(day, events, workerId) {
  const dayEvents = events.filter((event) => workerScheduledForEventDate(event, workerId, day.key));
  const today = day.key === localDateKey();
  return `<button class="crew-week-day ${today ? "today" : ""}" data-dashboard-link="events" type="button">
    <span>${escapeHtml(day.label)}</span>
    <strong>${escapeHtml(day.day)}</strong>
    <small>${escapeHtml(dayEvents[0]?.name || (dayEvents.length ? `${dayEvents.length} events` : "Open"))}</small>
  </button>`;
}

function crewBookedEventCards(events) {
  const upcoming = events.filter((event) => eventScheduleBucket(event) !== "past");
  const list = (upcoming.length ? upcoming : events).slice(0, 5);
  if (!list.length) return [`<div class="compact-item empty">No booked events yet.</div>`];
  return list.map((event) => {
    const venue = getVenue(event.venueId);
    return `<button class="crew-booked-item" data-view-record="events:${escapeHtml(event.id)}" type="button">
      <strong>${escapeHtml(event.name || "Event")}</strong>
      <span>${escapeHtml(`${formatDate(event.startDate) || "Date TBD"}${venue?.name ? " - " + venue.name : ""}`)}</span>
      <small>Open full event profile</small>
    </button>`;
  });
}

function timecardForCrewEvent(eventId) {
  const today = localDateKey();
  const workerId = activeCrewWorkerId();
  const cards = state.timecards.filter((card) => card.eventId === eventId && card.workerId === workerId);
  return cards.find((card) => timecardWorkDate(card) === today && !card.clockOut)
    || cards.find((card) => timecardWorkDate(card) === today)
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
    if (!activeEvent) {
      tasks.push(["Timecard Needs Event", "This live timecard is not connected to a scheduled event. Open Timecards so it can be reviewed.", "timecards"]);
    } else {
      const punch = nextCrewPunch(activeCard);
      tasks.push([`Missing ${punch.label}`, `Finish the next timecard step for ${activeEvent.name || activeCard.eventName || "your current event"}.`, "clock"]);
    }
  }
  const rentalTasks = events
    .map((event) => crewRentalTask(event, timecardForCrewEvent(event.id)))
    .filter(Boolean);
  tasks.push(...rentalTasks.slice(0, 2));
  if (!tasks.length) return `<div class="crew-mobile-task"><b>No items need attention</b><span>When something needs a punch, photo, report, or follow-up, it will appear here.</span></div>`;
  return tasks.slice(0, 5).map(([label, text, view]) => `<button class="crew-mobile-task" data-mobile-go-view="${escapeHtml(view)}" type="button"><b>${escapeHtml(label)}</b><span>${escapeHtml(text)}</span></button>`).join("");
}

function crewRentalTask(event, card) {
  const workerId = activeCrewWorkerId();
  const assignment = assignmentForEventWorker(event.id, workerId);
  const needsRental = rentalVehicleRequired(event, card || assignment || {});
  if (!needsRental) return null;
  const startLog = vehicleLogForEventWorker(event.id, workerId, "Start");
  const endLog = vehicleLogForEventWorker(event.id, workerId, "End");
  if (card?.clockOut && shouldRequireRentalEndPhotos(event, card) && !vehicleEndPhotosComplete(endLog)) return ["Missing End Vehicle Photos", `Upload the end vehicle photos and gas gauge for ${event.name}.`, "vehicles"];
  if (card?.clockIn && !vehicleStartCheckStarted(startLog)) return ["Missing Start Vehicle Photos", `Upload the start vehicle photos and plate number for ${event.name}.`, "vehicles"];
  return null;
}

function renderProductionBoard() {
  const events = visibleEvents().filter((event) => matchesSearch(event, `${getVenue(event.venueId)?.name || ""} ${getPromoter(event.promoterId)?.name || ""}`));
  const runnerIds = assignedWorkerIdsForVisibleEvents();
  const runners = sortRunnerStatusRows(filterRunnerStatusRows(state.workers.filter((worker) => runnerIds.has(worker.id)), events));
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
        return `<article class="record-card"${suiteStyleVars(event.officeSuiteId, "--card-suite-color")}><div><span>${escapeHtml(event.type || "Event")}</span><strong>${escapeHtml(event.name)}</strong><p>${escapeHtml(venue?.name || "")}</p><p>${escapeHtml(promoterLabel(promoter))}</p><p>${escapeHtml(crew || "No runners assigned")}</p></div><div><span>${formatDate(event.startDate)}</span><span>${formatDate(event.endDate)}</span><div class="row-actions">${gigDirectoryButton}${publicAccessButton}</div></div></article>`;
      }).join("")
    : `<div class="compact-item empty">No production-board events match this view.</div>`;

  renderRunnerStatusHead();
  $("#runnerStatusTable").innerHTML = runners.length
    ? runners.map((worker) => {
        const eventsForWorker = events.filter((event) => eventWorkerIds(event).includes(worker.id)).map((event) => event.name).join(", ");
        const status = worker.runnerStatus || "Available";
        return `<tr><td>${profileCell(worker, worker.hideHeadshot, worker.email)}</td><td>${escapeHtml(eventsForWorker)}</td><td><span class="status-pill ${status === "On a Run" ? "warn" : ""}">${escapeHtml(status)}</span></td><td>${escapeHtml(worker.phone)}<p>${escapeHtml(worker.email)}</p></td><td><div class="row-actions"><button class="tiny-button" data-runner-status="${worker.id}" data-status="Available" type="button">Available</button><button class="tiny-button" data-runner-status="${worker.id}" data-status="On a Run" type="button">On a Run</button><button class="tiny-button" data-runner-status="${worker.id}" data-status="At Production Office" type="button">At Office</button><button class="tiny-button" data-notify-production-office="${worker.id}" type="button">Notify Office</button></div></td></tr>`;
      }).join("")
    : `<tr><td colspan="5" class="empty">Assigned runners will appear here.</td></tr>`;
}

function renderRunnerStatusHead() {
  const head = $("#runnerStatusHead");
  if (!head) return;
  head.innerHTML = `<tr>${RUNNER_STATUS_COLUMNS.map(([key, label]) => {
    const activeSort = state.runnerStatusSortKey === key;
    const activeFilter = !!state.runnerStatusColumnFilters?.[key];
    const arrow = activeSort ? (state.runnerStatusSortDirection === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-runner-status-sort="${escapeHtml(key)}" data-runner-status-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-runner-status-sort="${escapeHtml(key)}" data-runner-status-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-runner-status-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.runnerStatusColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
}

function filterRunnerStatusRows(runners, events) {
  const filters = state.runnerStatusColumnFilters || {};
  return runners.filter((worker) => {
    return RUNNER_STATUS_COLUMNS.every(([key]) => {
      const filter = String(filters[key] || "").trim().toLowerCase();
      return !filter || runnerStatusColumnValue(worker, key, events).toLowerCase().includes(filter);
    });
  });
}

function sortRunnerStatusRows(runners, events) {
  const key = state.runnerStatusSortKey || "runner";
  const direction = state.runnerStatusSortDirection === "desc" ? -1 : 1;
  return [...runners].sort((a, b) => direction * runnerStatusColumnValue(a, key, events).localeCompare(runnerStatusColumnValue(b, key, events), undefined, { numeric: true, sensitivity: "base" }));
}

function runnerStatusColumnValue(worker, key, events) {
  if (key === "runner") return listText(`${worker.name || ""} ${worker.email || ""}`);
  if (key === "events") return events.filter((event) => eventWorkerIds(event).includes(worker.id)).map((event) => event.name).join(" ");
  if (key === "status") return listText(worker.runnerStatus || "Available");
  if (key === "contact") return listText(`${worker.phone || ""} ${worker.email || ""}`);
  return "";
}

function visibleStaffingAssignments() {
  const events = visibleEvents();
  const eventIds = new Set(events.map((event) => event.id));
  let assignments = state.eventAssignments.filter((assignment) => eventIds.has(assignment.eventId) && !["Cancelled", "Swapped"].includes(assignment.status));
  if (isCrewRole()) assignments = assignments.filter((assignment) => assignment.workerId === activeCrewWorkerId());
  return sortStaffingAssignments(filterStaffingAssignments(assignments));
}

function staffingColumnValue(assignment, key) {
  const event = getEvent(assignment.eventId);
  const worker = getWorker(assignment.workerId);
  if (key === "event") return `${event?.name || ""} ${getVenue(event?.venueId)?.name || ""}`;
  if (key === "crew") return `${worker?.name || ""} ${worker?.phone || ""} ${worker?.email || ""} ${assignment.position || ""}`;
  if (key === "department") return assignment.department || "";
  if (key === "schedule") return `${assignmentWorkDateLabel(assignment, event || {})} ${formatTime(assignment.startDate || event?.startDate)} ${assignment.endDate ? formatTime(assignment.endDate) : ""}`;
  if (key === "contact") return `${assignment.onSiteContactName || ""} ${assignment.onSiteContactPhone || ""} ${assignment.onSiteContactEmail || ""}`;
  if (key === "notes") return `${assignment.crewNotes || ""} ${assignment.notes || ""}`;
  return "";
}

function filterStaffingAssignments(assignments) {
  const filters = state.staffingColumnFilters || {};
  return assignments.filter((assignment) => STAFFING_ASSIGNMENT_COLUMNS.every(([key]) => {
    const filter = String(filters[key] || "").trim().toLowerCase();
    return !filter || staffingColumnValue(assignment, key).toLowerCase().includes(filter);
  }));
}

function sortStaffingAssignments(assignments) {
  const key = state.staffingSortKey || "event";
  const direction = state.staffingSortDirection === "desc" ? -1 : 1;
  return [...assignments].sort((a, b) => direction * staffingColumnValue(a, key).localeCompare(staffingColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" }));
}

function renderStaffingAssignmentHead() {
  const head = $("#staffingAssignmentHead");
  if (!head) return;
  head.innerHTML = `<tr>${STAFFING_ASSIGNMENT_COLUMNS.map(([key, label]) => {
    const activeSort = state.staffingSortKey === key;
    const activeFilter = !!state.staffingColumnFilters?.[key];
    const arrow = activeSort ? (state.staffingSortDirection === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-staffing-sort="${escapeHtml(key)}" data-staffing-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-staffing-sort="${escapeHtml(key)}" data-staffing-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-staffing-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.staffingColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
}

function renderStaffingAssignments() {
  const table = $("#staffingAssignmentTable");
  const count = $("#staffingAssignmentCount");
  if (!table || !count) return;
  renderStaffingAssignmentHead();
  const assignments = visibleStaffingAssignments();
  count.textContent = `${assignments.length} assignment${assignments.length === 1 ? "" : "s"}`;
  table.innerHTML = assignments.length
    ? assignments.map((assignment) => {
        const event = getEvent(assignment.eventId);
        const worker = getWorker(assignment.workerId);
        const venue = getVenue(event?.venueId);
        const contact = [assignment.onSiteContactName, assignment.onSiteContactPhone, assignment.onSiteContactEmail].filter(Boolean).map(escapeHtml).join("<br>");
        const noteText = isCrewRole() ? assignment.crewNotes : [assignment.crewNotes, assignment.notes].filter(Boolean).join("\n");
        const actions = `<div class="row-actions">
          <button class="tiny-button" data-view-event-assignment="${escapeHtml(assignment.id)}" type="button">View</button>
          ${canAdminEdit() ? `<button class="tiny-button" data-edit="eventAssignments" data-id="${escapeHtml(assignment.id)}" data-form="eventAssignmentForm" type="button">Edit</button>` : ""}
        </div>`;
        return `<tr>
          <td><strong>${escapeHtml(event?.name || "Event")}</strong><p>${escapeHtml(venue?.name || "No venue")}</p></td>
          <td>${profileCell(worker || { name: "Open Position" }, worker?.hideHeadshot, worker?.phone || "No crew assigned")}<p>${escapeHtml(worker?.email || "Email not set")}</p><p>${escapeHtml(assignment.position || "Staffing assignment")}</p></td>
          <td><strong>${escapeHtml(assignment.department || "Production Office")}</strong><p>${escapeHtml(assignment.locationType || "")}</p></td>
          <td><strong>${escapeHtml(assignmentWorkDateLabel(assignment, event || {}))}</strong><p>Call: ${escapeHtml(formatTime(assignment.startDate || event?.startDate) || "TBD")}</p><p>Wrap: ${escapeHtml(assignment.endDate ? formatTime(assignment.endDate) : "TBD")}</p></td>
          <td>${contact || "Not set"}<p>${assignment.productionOfficeLinkReady === "yes" ? "Production Office link ready" : ""}</p></td>
          <td>${escapeHtml(noteText || "")}</td>
          <td>${actions}</td>
        </tr>`;
      }).join("")
    : `<tr><td colspan="7" class="empty">Staffing assignments will appear here after runners are added to events.</td></tr>`;
}

function renderStaffingSchedule() {
  const container = $("#staffingScheduleCards");
  const count = $("#staffingScheduleCount");
  if (!container || !count) return;
  const events = visibleEvents().filter((event) => !isCrewRole() || eventWorkerIds(event).includes(activeCrewWorkerId()));
  const assignments = state.eventAssignments.filter((assignment) => events.some((event) => event.id === assignment.eventId) && !["Cancelled", "Swapped"].includes(assignment.status));
  count.textContent = `${events.length} event${events.length === 1 ? "" : "s"} / ${assignments.length} position${assignments.length === 1 ? "" : "s"}`;
  container.innerHTML = events.length
    ? events.map((event) => staffingScheduleCard(event)).join("")
    : `<div class="compact-item empty">Staffing schedules will appear when events are visible to this access view.</div>`;
}

function staffingScheduleCard(event) {
  const venue = getVenue(event.venueId);
  const assignments = eventAssignments(event.id)
    .filter((assignment) => !["Cancelled", "Swapped"].includes(assignment.status))
    .filter((assignment) => !isCrewRole() || assignment.workerId === activeCrewWorkerId());
  const departments = new Map();
  assignments.forEach((assignment) => {
    const department = assignment.department || "Production Office";
    if (!departments.has(department)) departments.set(department, []);
    departments.get(department).push(assignment);
  });
  const departmentRows = Array.from(departments.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([department, rows]) => {
    const filled = rows.filter((assignment) => assignment.workerId).length;
    const lineItems = rows.map((assignment) => {
      const worker = getWorker(assignment.workerId);
      return `<div class="compact-item staffing-schedule-line">
        <strong>${escapeHtml(worker?.name || "Open Position")}</strong>
        <span>${escapeHtml(assignment.position || "Runner")} - Call ${escapeHtml(formatTime(assignment.startDate || event.startDate) || "TBD")}${assignment.endDate ? ` / Wrap ${escapeHtml(formatTime(assignment.endDate))}` : ""}</span>
        <p>${escapeHtml(assignment.locationType || "Venue")}${assignment.callLocation ? `: ${escapeHtml(assignment.callLocation)}` : ""}</p>
        <div class="row-actions">
          <button class="tiny-button" data-view-event-assignment="${escapeHtml(assignment.id)}" type="button">View</button>
          ${canAdminEdit() ? `<button class="tiny-button" data-edit="eventAssignments" data-id="${escapeHtml(assignment.id)}" data-form="eventAssignmentForm" type="button">Edit</button>` : ""}
        </div>
      </div>`;
    }).join("");
    return `<section class="staffing-schedule-department">
      <div class="panel-heading compact-heading">
        <h4>${escapeHtml(department)}</h4>
        <span class="muted">${filled}/${rows.length} filled</span>
      </div>
      <div class="compact-list">${lineItems}</div>
    </section>`;
  }).join("");
  const addButton = canAdminEdit()
    ? `<button class="tiny-button" data-add-staffing-position="${escapeHtml(event.id)}" type="button">Add Position</button>`
    : "";
  return `<article class="record-card staffing-schedule-card">
    <div class="record-card-main">
      <span>${escapeHtml(venue?.name || "No venue")}</span>
      <strong>${escapeHtml(event.name || "Event")}</strong>
      <p>${escapeHtml(formatDate(event.startDate))}</p>
    </div>
    <div class="row-actions">${addButton}</div>
    <div class="staffing-schedule-departments">${departmentRows || `<div class="compact-item empty">No positions yet. Add positions for each department as the schedule takes shape.</div>`}</div>
  </article>`;
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
    <span>${escapeHtml(stop.category || "Gig Resources")}${location ? ` - ${escapeHtml(location)}` : ""}</span>
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
  const visible = visibleEvents();
  renderEventCardControls(visible);
  const rows = sortEventCards(visible.filter((event) => {
    const venue = getVenue(event.venueId);
    const promoter = getPromoter(event.promoterId);
    const crewNames = eventWorkerIds(event).map((id) => getWorker(id)?.name).join(" ");
    const scheduleMatch = state.eventScheduleFilter === "all" || eventScheduleBucket(event) === state.eventScheduleFilter;
    const typeMatch = state.eventTypeFilter === "all" || normalizedMatchValue(event.type) === state.eventTypeFilter;
    return scheduleMatch && typeMatch && matchesSearch(event, `${venue?.name || ""} ${promoter?.name || ""} ${crewNames}`);
  }));
  $("#eventTableCount").textContent = `${rows.length} shown`;
  $("#eventCards").innerHTML = rows.length
    ? rows.map((event) => eventCard(event)).join("")
    : `<div class="compact-item empty">No events match this search.</div>`;
}

function renderEventCardControls(events = visibleEvents()) {
  const schedule = $("#eventScheduleFilter");
  const type = $("#eventTypeFilter");
  const sort = $("#eventSort");
  if (schedule) schedule.value = state.eventScheduleFilter;
  if (sort) sort.value = state.eventSort;
  if (!type) return;
  const types = Array.from(new Set(events.map((event) => event.type).filter(Boolean))).sort((a, b) => a.localeCompare(b));
  type.innerHTML = `<option value="all">All types</option>${types.map((eventType) => `<option value="${escapeHtml(normalizedMatchValue(eventType))}">${escapeHtml(eventType)}</option>`).join("")}`;
  type.value = [...types.map((eventType) => normalizedMatchValue(eventType)), "all"].includes(state.eventTypeFilter) ? state.eventTypeFilter : "all";
  if (type.value !== state.eventTypeFilter) state.eventTypeFilter = type.value;
}

function sortEventCards(events) {
  return [...events].sort((a, b) => {
    if (state.eventSort === "name") return listText(a.name).localeCompare(listText(b.name));
    if (state.eventSort === "crew") return eventWorkerIds(b).length - eventWorkerIds(a).length;
    const aDate = new Date(a.startDate || a.endDate || a.createdAt || 0).getTime() || 0;
    const bDate = new Date(b.startDate || b.endDate || b.createdAt || 0).getTime() || 0;
    return state.eventSort === "latest" ? bDate - aDate : aDate - bDate;
  });
}

function renderTouringSuite() {
  if (!$("#touringHeroStats")) return;
  renderTouringSuiteAccessNotice();
  const stops = touringStops();
  const crew = touringCrewRows(stops);
  const travel = touringTravelRows(crew);
  const attention = touringAttentionRows(stops, crew, travel);
  const riderReadiness = touringRiderReadinessRows(stops);
  const crewReadiness = touringCrewReadinessRows(crew);
  const travelReadiness = touringTravelReadinessRows(travel);
  const documentReadiness = touringDocumentReadinessRows(stops, crew, travel);
  ensureTouringAttentionNotifications(attention).catch((error) => console.warn("Touring notification sync failed", error));
  renderTouringDashboard(stops, crew, travel, attention, riderReadiness, crewReadiness, travelReadiness, documentReadiness);
  renderTourAdvancing(stops);
  renderTourCrewPersonnel(crew);
  renderTourTravel(travel);
  renderTourDocuments(stops, crew, travel);
  renderTourSettings();
}

function renderTouringSuiteAccessNotice() {
  const notice = $("#touringSuiteAccessNotice");
  if (!notice) return;
  const client = activeClientRecord();
  const enabled = touringSuiteEnabled(client);
  notice.hidden = false;
  notice.classList.toggle("enabled", enabled);
  notice.innerHTML = enabled
    ? `<div><strong>Touring Office Suite enabled</strong><p>${escapeHtml(client?.name || "This client")} can now organize tour stops, city riders, crew personnel, travel, and generated tour documents.</p></div><span class="status-pill">Active</span>`
    : `<div><strong>Preview mode</strong><p>Enable Touring Office Suite under this client account's Office Suites to use this as a live production workspace.</p></div>${canSystemEdit() ? `<button class="tiny-button system-action" data-dashboard-link="adminClients" type="button">Open Client Accounts</button>` : `<span class="status-pill warn">Not enabled</span>`}`;
}

function touringEvents() {
  return visibleEvents().filter((event) => event.officeSuiteId === TOURING_SUITE_ID);
}

function touringStops() {
  if (state.touringStops.length) {
    return state.touringStops.map((stop) => ({
      id: stop.id,
      city: stop.city || "Tour Stop",
      venue: stop.venue || "Venue TBD",
      loadIn: stop.loadInDate || "",
      showDate: stop.showDate || "",
      loadOut: stop.loadOutDate || "",
      status: stop.status || "Not Sent",
      priority: stop.priority || (touringMissingList(stop).length > 2 ? "High" : "Normal"),
      owner: stop.owner || "Advance Team",
      missing: touringMissingList(stop),
      documents: touringDocumentsForStop(stop).length ? "Generated" : "Not Generated",
      source: stop
    }));
  }
  const events = touringEvents();
  if (!events.length) return touringDemoStops();
  return events.map((event, index) => {
    const venue = getVenue(event.venueId);
    const promoter = getPromoter(event.promoterId);
    const assignments = eventAssignments(event.id);
    const missing = [
      !promoter?.email ? "Promoter email" : "",
      !venue?.address ? "Venue address" : "",
      !event.productionContact ? "Production contact" : "",
      !assignments.length ? "Runner plan" : ""
    ].filter(Boolean);
    return {
      id: event.id,
      city: event.city || eventGigSearchText(event, venue) || venue?.city || `Tour Stop ${index + 1}`,
      venue: venue?.name || event.name || "Venue TBD",
      loadIn: event.startDate || "",
      showDate: event.startDate || "",
      loadOut: event.endDate || "",
      status: missing.length ? "Needs Review" : "Ready",
      priority: missing.length > 2 ? "High" : "Normal",
      owner: event.productionContact || activeClientRepRecord()?.name || "Advance Team",
      missing,
      documents: event.docLink || event.pdfLink ? "Generated" : "Not Generated",
      event
    };
  });
}

function touringMissingList(record = {}) {
  if (Array.isArray(record.missing)) return record.missing.filter(Boolean);
  return String(record.missingInfo || "")
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function touringRiderSections(record = {}) {
  return [
    ["Location / Parking", record.locationParking],
    ["Labor Calls", record.laborCalls],
    ["Runner Plan", record.runnerPlan],
    ["Trucks / Buses", record.trucksBuses],
    ["Heavy Equipment", record.heavyEquipment],
    ["Power", record.power],
    ["Fire / Gases / FX", record.fireGasesFx],
    ["Golf Carts", record.golfCarts]
  ].filter(([, value]) => String(value || "").trim());
}

function touringRiderSectionStatus(record = {}, field) {
  return String(record[field] || "").trim() ? "Ready" : "Pending";
}

function touringRiderMissingSections(record = {}) {
  return [
    ["Location / parking", "locationParking"],
    ["Labor calls", "laborCalls"],
    ["Runner plan", "runnerPlan"],
    ["Trucks / buses", "trucksBuses"],
    ["Heavy equipment", "heavyEquipment"],
    ["Power", "power"],
    ["Fire / gases / FX", "fireGasesFx"],
    ["Golf carts", "golfCarts"]
  ].filter(([, field]) => touringRiderSectionStatus(record, field) !== "Ready").map(([label]) => label);
}

function touringDocumentsForStop(stop = {}) {
  const city = normalizedMatchValue(stop.city || "");
  if (!city) return [];
  return state.touringDocuments.filter((doc) => normalizedMatchValue(`${doc.city || ""} ${doc.name || ""} ${doc.notes || ""}`).includes(city));
}

function touringDemoStops() {
  return [
    {
      id: "tour-demo-denver",
      city: "Denver, CO",
      venue: "Mile High Stadium",
      loadIn: "2026-06-17",
      showDate: "2026-06-26",
      loadOut: "2026-06-28",
      status: "Needs Review",
      priority: "High",
      owner: "Advance Team",
      missing: ["Parking notes", "Runner plan"],
      documents: "Not Generated"
    },
    {
      id: "tour-demo-minneapolis",
      city: "Minneapolis, MN",
      venue: "US Bank Stadium",
      loadIn: "2026-06-25",
      showDate: "2026-06-30",
      loadOut: "2026-07-01",
      status: "Partial",
      priority: "Normal",
      owner: "Advance Lead",
      missing: ["Promoter email"],
      documents: "Draft Ready"
    },
    {
      id: "tour-demo-cleveland",
      city: "Cleveland, OH",
      venue: "Huntington Bank Stadium",
      loadIn: "2026-07-03",
      showDate: "2026-07-07",
      loadOut: "2026-07-09",
      status: "Ready",
      priority: "Normal",
      owner: "Advance Team",
      missing: [],
      documents: "Generated"
    }
  ];
}

function touringCrewRows(stops = touringStops()) {
  if (state.touringCrew.length) {
    return state.touringCrew.map((person) => ({
      id: person.id,
      name: person.name || "Tour Team Member",
      department: person.department || person.title || "Tour Team",
      phone: person.phone || "Missing",
      email: person.email || "Missing",
      formStatus: person.formStatus || "Needed",
      travelStatus: touringTravelForPerson(person)?.overall || "Not Started",
      oneSheet: state.touringDocuments.some((doc) => doc.type === "Team One-Sheet" && normalizedMatchValue(doc.name).includes(normalizedMatchValue(person.name))) ? "Ready" : "Not Generated",
      assignedStops: [],
      source: person
    }));
  }
  const workers = visibleRecords(state.workers).slice(0, 12);
  if (!workers.length) {
    return [
      { id: "tour-crew-demo-1", name: "Tour Coordinator", department: "Production", phone: "Pending", email: "Pending", formStatus: "Needed", travelStatus: "Needs Review", oneSheet: "Not Generated" },
      { id: "tour-crew-demo-2", name: "Runner Lead", department: "Runners", phone: "Pending", email: "Pending", formStatus: "Submitted", travelStatus: "Partial", oneSheet: "Draft Ready" }
    ];
  }
  return workers.map((worker, index) => {
    const assignedStops = stops.filter((stop) => stop.event && eventWorkerIds(stop.event).includes(worker.id));
    return {
      id: worker.id,
      name: worker.name || `Crew Member ${index + 1}`,
      department: worker.role || "Crew / Runner",
      phone: worker.phone || "Missing",
      email: worker.email || "Missing",
      formStatus: worker.phone && worker.email ? "Submitted" : "Needed",
      travelStatus: assignedStops.length ? "Needs Review" : "Not Started",
      oneSheet: worker.headshotData ? "Ready" : "Needs Headshot",
      assignedStops
    };
  });
}

function touringTravelRows(crew = touringCrewRows()) {
  if (state.touringTravel.length) {
    return state.touringTravel.map((record) => {
      const missing = [
        !record.email ? "Email" : "",
        !record.flightConfirmation ? "Flight confirmation" : "",
        !record.hotelConfirmation ? "Hotel confirmation" : ""
      ].filter(Boolean);
      return {
        ...record,
        overall: missing.length ? "Needs Review" : "Ready",
        missing: missing.length ? missing : ["None"]
      };
    });
  }
  return crew.map((person, index) => {
    const missing = [person.email === "Missing" ? "Email" : "", index % 3 === 0 ? "Flight confirmation" : "", index % 2 === 0 ? "Hotel confirmation" : ""].filter(Boolean);
    return {
      ...person,
      flightDate: "",
      depart: "",
      arrive: "",
      airline: "",
      hotel: "",
      checkIn: "",
      checkOut: "",
      overall: missing.length ? "Needs Review" : "Ready",
      missing: missing.length ? missing : ["None"]
    };
  });
}

function touringTravelForPerson(person = {}) {
  const name = normalizedMatchValue(person.name || "");
  const email = normalizedMatchValue(person.email || "");
  const record = state.touringTravel.find((item) => (name && normalizedMatchValue(item.name) === name) || (email && normalizedMatchValue(item.email) === email));
  if (!record) return null;
  const missing = [!record.email ? "Email" : "", !record.flightConfirmation ? "Flight confirmation" : "", !record.hotelConfirmation ? "Hotel confirmation" : ""].filter(Boolean);
  return { ...record, overall: missing.length ? "Needs Review" : "Ready", missing };
}

function touringAttentionRows(stops, crew, travel) {
  return [
    ...stops.filter((stop) => stop.missing.length).map((stop) => ({
      title: `${stop.city} advance needs review`,
      detail: stop.missing.join(", "),
      recordTarget: touringStopRecordTarget(stop),
      view: "tourAdvancing"
    })),
    ...stops.map((stop) => {
      const missing = touringRiderMissingSections(stop.source || stop);
      return {
        title: `${stop.city} city rider sections needed`,
        detail: missing.slice(0, 4).join(", ") + (missing.length > 4 ? ` +${missing.length - 4} more` : ""),
        recordTarget: touringStopRecordTarget(stop),
        view: "tourAdvancing",
        count: missing.length
      };
    }).filter((item) => item.count),
    ...crew.filter((person) => person.formStatus !== "Submitted").slice(0, 3).map((person) => ({
      title: `${person.name} team info needed`,
      detail: "Team info form has not been completed.",
      recordTarget: touringCrewRecordTarget(person),
      view: "tourCrewPersonnel"
    })),
    ...travel.filter((person) => person.overall !== "Ready").slice(0, 3).map((person) => ({
      title: `${person.name} travel packet not ready`,
      detail: person.missing.join(", "),
      recordTarget: touringTravelRecordTarget(person),
      view: "tourTravel"
    }))
  ].slice(0, 8);
}

function suiteAttentionNotificationId(type, item = {}) {
  const key = `${item.title || ""}|${item.detail || ""}|${item.view || `${type}Dashboard`}`;
  return `${type}-attention-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "item"}`;
}

function suiteAttentionNotificationRecipients() {
  const clientId = cloudClientId() || activeClientRecord()?.id || "";
  const reps = state.clientReps.filter((rep) => {
    if (clientId && rep.clientId !== clientId) return false;
    const levels = ensureClientRepAccessLevels(rep.accessLevels, "CLIENT_REP");
    return levels.includes("CLIENT_ADMIN") || levels.includes("CLIENT_REP_LEAD");
  });
  const recipients = reps
    .map((rep) => sendbirdUserIdForProfile({ authUserId: rep.authUserId || rep.id || rep.email }))
    .filter(Boolean);
  const current = sendbirdUserIdForProfile({ authUserId: authState.user?.id || activeClientRepRecord()?.id || authState.user?.email });
  return Array.from(new Set(recipients.length ? recipients : [current].filter(Boolean)));
}

async function ensureSuiteAttentionNotifications(type, attention = [], fallbackView, fallbackBody) {
  if (!authState.session || !canOwnerEdit() || isAdminRole()) return;
  const actionable = attention.slice(0, 6);
  const signature = actionable.map((item) => `${item.title}|${item.detail}|${item.view}`).join("::");
  const signatureKey = `${type}AttentionNotificationSignature`;
  const hasUnreadNotices = state.appNotifications.some((notification) => notification.type === type && !notification.readAt);
  if (state[signatureKey] === signature && !hasUnreadNotices) return;
  state[signatureKey] = signature;
  const recipientIds = suiteAttentionNotificationRecipients();
  if (!recipientIds.length) return;
  const activeIds = new Set(actionable.map((item) => suiteAttentionNotificationId(type, item)));
  const clientId = cloudClientId() || activeClientRecord()?.id || "";
  let changed = false;
  for (const item of actionable) {
    const id = suiteAttentionNotificationId(type, item);
    const existing = state.appNotifications.find((notification) => notification.id === id);
    const next = {
      ...(existing || {}),
      id,
      title: item.title,
      body: item.detail || fallbackBody,
      type,
      viewId: item.view || fallbackView,
      recordId: item.recordId || "",
      recipientIds,
      clientId
    };
    if (existing && existing.title === next.title && existing.body === next.body && existing.viewId === next.viewId) continue;
    await put("appNotifications", next);
    syncAppNotificationToSupabase(next).catch((error) => console.warn(`${type} notification cloud sync failed`, error));
    state.appNotifications = [next, ...state.appNotifications.filter((notification) => notification.id !== id)]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    changed = true;
  }
  const now = new Date().toISOString();
  for (const notification of state.appNotifications.filter((item) => item.type === type && !activeIds.has(item.id) && !item.readAt)) {
    const updated = { ...notification, readAt: now };
    await put("appNotifications", updated);
    syncAppNotificationToSupabase(updated).catch((error) => console.warn(`${type} notification cleanup sync failed`, error));
    state.appNotifications = state.appNotifications.map((item) => item.id === updated.id ? updated : item);
    changed = true;
  }
  if (changed) renderNotificationSurfaces();
}

function ensureTouringAttentionNotifications(attention = []) {
  return ensureSuiteAttentionNotifications("touring", attention, "touringDashboard", "Touring item needs review.");
}

function touringRiderReadinessRows(stops = []) {
  return stops.map((stop) => {
    const record = stop.source || stop;
    const sections = [
      ["Location", "locationParking"],
      ["Labor", "laborCalls"],
      ["Runners", "runnerPlan"],
      ["Trucks", "trucksBuses"],
      ["Equipment", "heavyEquipment"],
      ["Power", "power"],
      ["FX", "fireGasesFx"],
      ["Carts", "golfCarts"]
    ];
    const readySections = sections.filter(([, field]) => touringRiderSectionStatus(record, field) === "Ready");
    const missingSections = sections.filter(([, field]) => touringRiderSectionStatus(record, field) !== "Ready").map(([label]) => label);
    const advanceReady = !stop.missing.length && ["Confirmed", "Finalized", "Ready"].includes(stop.status);
    const riderReady = !missingSections.length;
    return {
      name: stop.city || "Tour Stop",
      detail: stop.venue || "Venue TBD",
      status: advanceReady && riderReady ? "Ready" : readySections.length >= 5 ? "Close" : "Needs Work",
      readyCount: readySections.length,
      totalCount: sections.length,
      sections,
      readySections,
      missingSections,
      advanceReady,
      riderReady,
      recordTarget: touringStopRecordTarget(stop),
      view: "tourAdvancing"
    };
  });
}

function touringCrewReadinessRows(crew = []) {
  return crew.map((person) => {
    const contactReady = Boolean(person.phone && !["Missing", "Pending"].includes(person.phone) && person.email && !["Missing", "Pending"].includes(person.email));
    const formReady = person.formStatus === "Submitted";
    const travelReady = person.travelStatus === "Ready";
    const oneSheetReady = person.oneSheet === "Ready";
    const assignedReady = !person.assignedStops || person.assignedStops.length > 0 || state.touringStops.length > 0;
    const checks = [
      ["Contact", contactReady],
      ["Info Form", formReady],
      ["Travel", travelReady],
      ["One-Sheet", oneSheetReady],
      ["Assignment", assignedReady]
    ];
    const readyCount = checks.filter(([, ready]) => ready).length;
    return {
      name: person.name || "Tour Team Member",
      detail: person.department || "Tour Team",
      status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      checks,
      recordTarget: touringCrewRecordTarget(person),
      view: "tourCrewPersonnel"
    };
  });
}

function touringTravelReadinessRows(travel = []) {
  return travel.map((person) => {
    const flightReady = Boolean(person.flightConfirmation || person.flightStatus === "Booked");
    const hotelReady = Boolean(person.hotelConfirmation || person.hotelStatus === "Confirmed");
    const emailReady = Boolean(person.email && person.email !== "Missing");
    const packetReady = person.overall === "Ready";
    const checks = [
      ["Email", emailReady],
      ["Flight", flightReady],
      ["Hotel", hotelReady],
      ["Packet", packetReady]
    ];
    const readyCount = checks.filter(([, ready]) => ready).length;
    return {
      name: person.name || "Traveler",
      detail: person.missing?.length ? `Missing: ${person.missing.join(", ")}` : "Travel packet ready",
      status: readyCount === checks.length ? "Ready" : readyCount >= 2 ? "Needs Review" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      checks,
      recordTarget: touringTravelRecordTarget(person),
      view: "tourTravel"
    };
  });
}

function touringDocumentReadinessRows(stops = [], crew = [], travel = []) {
  const docs = state.touringDocuments;
  const docTypeCount = (type) => docs.filter((doc) => normalizedMatchValue(doc.type || doc.name).includes(normalizedMatchValue(type))).length;
  const advanceGenerated = stops.filter((stop) => stop.documents === "Generated").length;
  const oneSheetsReady = crew.filter((person) => person.oneSheet === "Ready").length;
  const travelReady = travel.filter((person) => person.overall === "Ready").length;
  return [
    {
      name: "Advance Riders",
      detail: `${advanceGenerated}/${stops.length} stop riders generated`,
      status: stops.length && advanceGenerated === stops.length ? "Ready" : advanceGenerated ? "Close" : "Needs Work",
      readyCount: advanceGenerated,
      totalCount: Math.max(stops.length, 1),
      checks: stops.slice(0, 5).map((stop) => [stop.city || "Stop", stop.documents === "Generated"]),
      view: "tourDocuments"
    },
    {
      name: "Team One-Sheets",
      detail: `${oneSheetsReady}/${crew.length} one-sheets ready`,
      status: crew.length && oneSheetsReady === crew.length ? "Ready" : oneSheetsReady ? "Close" : "Needs Work",
      readyCount: oneSheetsReady,
      totalCount: Math.max(crew.length, 1),
      checks: crew.slice(0, 5).map((person) => [person.name || "Crew", person.oneSheet === "Ready"]),
      view: "tourDocuments"
    },
    {
      name: "Travel Itineraries",
      detail: `${travelReady}/${travel.length} ready to generate`,
      status: travel.length && travelReady === travel.length ? "Ready" : travelReady ? "Close" : "Needs Work",
      readyCount: travelReady,
      totalCount: Math.max(travel.length, 1),
      checks: travel.slice(0, 5).map((person) => [person.name || "Traveler", person.overall === "Ready"]),
      view: "tourTravel"
    },
    {
      name: "Tour Book",
      detail: docTypeCount("Tour Book") ? "Tour book record started" : "Future export lane",
      status: docTypeCount("Tour Book") ? "Close" : "Planned",
      readyCount: docTypeCount("Tour Book") ? 1 : 0,
      totalCount: 1,
      checks: [["Tour Book", docTypeCount("Tour Book") > 0]],
      view: "tourDocuments"
    }
  ];
}

function touringReadinessCard(item = {}) {
  const checks = item.checks || item.sections?.map(([label, field]) => [label, item.readySections?.some((ready) => ready[1] === field)]) || [];
  const statusClass = item.status === "Ready" ? "" : "warn";
  return `<button class="touring-card touring-readiness-card" ${recordTargetAttrs(item.recordTarget, item.view || "touringDashboard")} type="button">
    <span class="suite-kicker">${escapeHtml(item.status || "Needs Review")}</span>
    <h4>${escapeHtml(item.name || "Readiness Item")}</h4>
    <p>${escapeHtml(item.detail || `${item.readyCount || 0}/${item.totalCount || 0} ready`)}</p>
    <div class="touring-card-sections">
      ${checks.map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
    </div>
    <p><span class="status-pill ${statusClass}">${escapeHtml(`${item.readyCount || 0}/${item.totalCount || 0} ready`)}</span></p>
  </button>`;
}

function renderTouringReadinessSection(countSelector, listSelector, rows = [], emptyTitle, emptyDetail) {
  const ready = rows.filter((row) => row.status === "Ready").length;
  const count = $(countSelector);
  const list = $(listSelector);
  if (count) count.textContent = `${ready}/${rows.length} ready`;
  if (!list) return;
  list.innerHTML = rows.length
    ? rows.map(touringReadinessCard).join("")
    : `<div class="compact-item empty"><strong>${escapeHtml(emptyTitle)}</strong><p>${escapeHtml(emptyDetail)}</p></div>`;
}

function renderTouringDashboard(stops, crew, travel, attention, riderReadiness = [], crewReadiness = [], travelReadiness = [], documentReadiness = []) {
  const client = activeClientRecord();
  const enabled = touringSuiteEnabled(client);
  $("#touringHeroTitle").textContent = client?.name ? `${client.name} Touring` : "Tour Operations";
  $("#touringHeroCopy").textContent = enabled
    ? "Touring is active for this client. Manage tour stops, advance tracker, city riders, crew personnel, travel, and generated documents here."
    : "Touring is ready to enable. Preview the suite structure here, then turn it on from the client's Office Suites when this account is ready.";
  $("#touringHeroStats").innerHTML = [
    ["Tour Stops", stops.length, "tourAdvancing"],
    ["Crew Personnel", crew.length, "tourCrewPersonnel"],
    ["Ready Travel", travel.filter((row) => row.overall === "Ready").length, "tourTravel"]
  ].map(([label, value, view]) => `<button class="touring-stat" data-dashboard-link="${escapeHtml(view)}" type="button"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></button>`).join("");
  $("#touringAttentionCount").textContent = `${attention.length} open`;
  $("#touringAttentionList").innerHTML = attention.length
    ? attention.map((item) => `<button class="compact-item touring-attention-item" ${recordTargetAttrs(item.recordTarget, item.view)} type="button"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></button>`).join("")
    : `<div class="compact-item empty"><strong>No urgent touring items</strong><p>Stage Intelligence checks will surface missing advance, crew, and travel items here.</p></div>`;
  $("#touringFlowList").innerHTML = [
    ["Tour Advancing", "Tour stops, advance tracker, city rider sub-databases."],
    ["Crew Personnel", "Team members, team info forms, one-sheets."],
    ["Travel & Accommodations", "Flights, hotels, master itinerary, travel packets."],
    ["Documents", "Advance riders, manifests, one-sheets, and tour book exports."]
  ].map(([title, detail], index) => `<div class="touring-flow-step"><span>${index + 1}</span><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></div>`).join("");
  renderTouringReadinessSection("#tourRiderReadinessCount", "#tourRiderReadinessList", riderReadiness, "No tour stops yet", "Add tour stops to start city rider readiness.");
  renderTouringReadinessSection("#tourCrewReadinessCount", "#tourCrewReadinessList", crewReadiness, "No crew personnel yet", "Add team members to track forms, one-sheets, and travel.");
  renderTouringReadinessSection("#tourTravelReadinessCount", "#tourTravelReadinessList", travelReadiness, "No travel records yet", "Add travelers to track flight, hotel, and itinerary readiness.");
  renderTouringReadinessSection("#tourDocumentReadinessCount", "#tourDocumentReadinessList", documentReadiness, "No document lanes yet", "Add touring documents to track rider, one-sheet, itinerary, and tour book readiness.");
}

function touringGridEditing(viewId) {
  const allowed = viewId?.startsWith("awards") ? canEditAwardsRecords() : canAdminEdit();
  return !!state.touringGridEdit?.[viewId] && allowed;
}

function touringGridToolbar(viewId) {
  const editing = touringGridEditing(viewId);
  const toggle = document.querySelector(`[data-tour-grid="${viewId}"]`);
  const save = document.querySelector(`[data-tour-grid-save="${viewId}"]`);
  if (toggle) toggle.textContent = editing ? "Done" : "Grid Edit";
  if (save) save.hidden = !editing;
}

function touringGridInput(storeName, id, field, value = "", type = "text", className = "") {
  return `<input class="touring-grid-input ${escapeHtml(className)}" data-tour-grid-input data-store="${escapeHtml(storeName)}" data-id="${escapeHtml(id)}" data-field="${escapeHtml(field)}" type="${escapeHtml(type)}" value="${escapeHtml(value || "")}">`;
}

function touringGridTextarea(storeName, id, field, value = "") {
  return `<textarea class="touring-grid-input touring-grid-textarea" data-tour-grid-input data-store="${escapeHtml(storeName)}" data-id="${escapeHtml(id)}" data-field="${escapeHtml(field)}" rows="2">${escapeHtml(value || "")}</textarea>`;
}

function touringGridSelect(storeName, id, field, value = "", options = []) {
  return `<select class="touring-grid-input" data-tour-grid-input data-store="${escapeHtml(storeName)}" data-id="${escapeHtml(id)}" data-field="${escapeHtml(field)}">
    ${options.map((option) => `<option value="${escapeHtml(option)}"${option === value ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}
  </select>`;
}

function touringBulkOptions(viewId) {
  const options = {
    tourAdvancing: [
      ["status:Sent", "Advance sent"],
      ["status:Awaiting Response", "Awaiting response"],
      ["status:Follow Up Required", "Follow-up required"],
      ["status:Confirmed", "Advance confirmed"],
      ["status:Finalized", "Advance finalized"],
      ["priority:High", "Priority high"],
      ["priority:Normal", "Priority normal"],
      ["priority:Low", "Priority low"]
    ],
    tourCrewPersonnel: [
      ["formStatus:Sent", "Info form sent"],
      ["formStatus:Submitted", "Info form submitted"],
      ["formStatus:Needs Review", "Info form needs review"],
      ["travelStatus:Needs Review", "Travel needs review"],
      ["travelStatus:Ready", "Travel ready"],
      ["oneSheet:Ready", "One-sheet ready"]
    ],
    tourTravel: [
      ["flightStatus:Booked", "Flight booked"],
      ["flightStatus:Missing Info", "Flight missing info"],
      ["hotelStatus:Confirmed", "Hotel confirmed"],
      ["hotelStatus:Missing Info", "Hotel missing info"],
      ["overall:Ready", "Travel ready"],
      ["overall:Needs Review", "Needs review"]
    ],
    tourDocuments: [
      ["status:Draft", "Mark draft"],
      ["status:Ready", "Mark ready"],
      ["status:Generated", "Mark generated"],
      ["status:Sent", "Mark sent"],
      ["type:Advance Rider", "Type: advance rider"],
      ["type:Team One-Sheet", "Type: team one-sheet"],
      ["type:Travel Itinerary", "Type: travel itinerary"],
      ["type:Tour Book", "Type: tour book"]
    ]
  };
  return options[viewId] || [];
}

function touringBulkStoreName(viewId, row = {}) {
  if (viewId === "tourAdvancing") return row.source ? "touringStops" : "";
  if (viewId === "tourCrewPersonnel") return row.source ? "touringCrew" : "";
  if (viewId === "tourTravel") return state.touringTravel.some((record) => record.id === row.id) ? "touringTravel" : "";
  if (viewId === "tourDocuments") return row.id ? "touringDocuments" : "";
  return "";
}

function touringBulkKey(viewId, row = {}) {
  const storeName = touringBulkStoreName(viewId, row);
  return storeName && row.id ? `${viewId}:${storeName}:${row.id}` : "";
}

function touringBulkSelectedKeys(viewId) {
  return state.touringBulkSelection?.[viewId] || [];
}

function touringBulkSelectionSet(viewId) {
  return new Set(touringBulkSelectedKeys(viewId));
}

function touringBulkSelectableRows(viewId, rows = []) {
  return rows.filter((row) => touringBulkStoreName(viewId, row));
}

function touringBulkToolbar(viewId, rows = []) {
  if (!canAdminEdit()) return "";
  const selectable = touringBulkSelectableRows(viewId, rows);
  const selected = touringBulkSelectedKeys(viewId).filter((key) => selectable.some((row) => touringBulkKey(viewId, row) === key));
  const options = touringBulkOptions(viewId);
  return `<div class="suite-bulk-bar" data-suite-bulk-view="${escapeHtml(viewId)}">
    <div>
      <strong>Bulk Operations</strong>
      <p>${escapeHtml(selected.length ? `${selected.length} selected` : "Select rows to update multiple touring records at once.")}</p>
    </div>
    <div class="suite-bulk-actions">
      <button class="icon-text-button" data-tour-bulk-select="${escapeHtml(viewId)}" type="button">Select Visible</button>
      <button class="icon-text-button" data-tour-bulk-clear="${escapeHtml(viewId)}" type="button">Clear</button>
      <select class="touring-grid-input suite-bulk-select" data-tour-bulk-action="${escapeHtml(viewId)}" aria-label="Bulk action">
        <option value="">Choose action</option>
        ${options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("")}
      </select>
      <button class="tiny-button" data-tour-bulk-apply="${escapeHtml(viewId)}" type="button">Apply</button>
    </div>
  </div>`;
}

function touringBulkCell(viewId, row = {}) {
  const key = touringBulkKey(viewId, row);
  if (!canAdminEdit()) return "";
  if (!key) return `<td class="suite-bulk-cell"></td>`;
  const checked = touringBulkSelectionSet(viewId).has(key) ? " checked" : "";
  return `<td class="suite-bulk-cell"><input data-tour-bulk-row="${escapeHtml(viewId)}" data-tour-bulk-key="${escapeHtml(key)}" type="checkbox" aria-label="Select ${escapeHtml(row.city || row.name || "record")}"${checked}></td>`;
}

function touringBulkHead(viewId, columns) {
  return `${canAdminEdit() ? `<th class="suite-bulk-cell"></th>` : ""}${columns.map(([key, label]) => touringColumnHead(viewId, key, label)).join("")}`;
}

function setTouringBulkSelection(viewId, keys = []) {
  state.touringBulkSelection = {
    ...(state.touringBulkSelection || {}),
    [viewId]: [...new Set(keys)]
  };
}

async function applyTouringBulkAction(viewId) {
  if (!canAdminEdit()) return;
  const select = document.querySelector(`[data-tour-bulk-action="${viewId}"]`);
  const action = select?.value || "";
  const selected = touringBulkSelectedKeys(viewId);
  if (!selected.length) {
    toast("Select at least one row first.");
    return;
  }
  if (!action) {
    toast("Choose a bulk action first.");
    return;
  }
  const [field, ...valueParts] = action.split(":");
  const value = valueParts.join(":");
  let updated = 0;
  for (const key of selected) {
    const [, storeName, id] = key.split(":");
    const existing = state[storeName]?.find((item) => item.id === id);
    if (!existing) continue;
    await put(storeName, { ...existing, [field]: value, updatedAt: new Date().toISOString() });
    updated++;
  }
  setTouringBulkSelection(viewId, []);
  await loadState();
  setView(viewId);
  toast(updated ? `Updated ${updated} touring records.` : "No matching records could use that action.");
}

function awardsBulkOptions(viewId) {
  const options = {
    awardsDocuments: [
      ["status:Ready", "Mark version ready"],
      ["status:Distributed", "Mark version distributed"],
      ["status:Final", "Mark version final"],
      ["deliveryStatus:Ready to Send", "Delivery ready to send"],
      ["deliveryStatus:Distributed", "Delivery distributed"],
      ["currentVersion:yes", "Set as current version"],
      ["currentVersion:no", "Set as superseded"],
      ["accessScope:Production Only", "Access: production only"],
      ["accessScope:Department Heads", "Access: department heads"],
      ["accessScope:All Staff", "Access: all staff"],
      ["accessScope:Public / Redacted", "Access: public / redacted"],
      ["accessScope:Restricted", "Access: restricted"]
    ],
    awardsRundown: [
      ["status:Ready", "Mark ready"],
      ["status:Final", "Mark final"],
      ["lockStatus:Locked", "Lock selected"],
      ["lockStatus:Final Locked", "Final lock selected"],
      ["currentVersion:yes", "Set docs as current version"],
      ["deliveryStatus:Distributed", "Mark docs distributed"]
    ],
    awardsStaffing: [
      ["status:Invited", "Mark invited"],
      ["status:Confirmed", "Mark confirmed"],
      ["status:Ready", "Mark ready"],
      ["credentialStatus:Requested", "Credential requested"],
      ["credentialStatus:Approved", "Credential approved"],
      ["credentialStatus:Issued", "Credential issued"]
    ]
  };
  return options[viewId] || [];
}

function awardsBulkStoreName(viewId, row = {}) {
  if (viewId === "awardsDocuments") return row.kind === "Document" ? "awardsDocuments" : "";
  if (viewId === "awardsRundown") return row.kind === "Schedule" ? "awardsSchedules" : "awardsDocuments";
  if (viewId === "awardsStaffing") return "awardsStaff";
  return "";
}

function awardsBulkKey(viewId, row = {}) {
  const storeName = awardsBulkStoreName(viewId, row);
  return storeName && row.id ? `${viewId}:${storeName}:${row.id}` : "";
}

function awardsBulkSelectedKeys(viewId) {
  return state.awardsBulkSelection?.[viewId] || [];
}

function awardsBulkSelectionSet(viewId) {
  return new Set(awardsBulkSelectedKeys(viewId));
}

function awardsBulkSelectableRows(viewId, rows = []) {
  return rows.filter((row) => row.source && awardsBulkStoreName(viewId, row));
}

function awardsBulkToolbar(viewId, rows = []) {
  if (!canEditAwardsRecords()) return "";
  const selectable = awardsBulkSelectableRows(viewId, rows);
  const selected = awardsBulkSelectedKeys(viewId).filter((key) => selectable.some((row) => awardsBulkKey(viewId, row) === key));
  const options = awardsBulkOptions(viewId);
  return `<div class="awards-bulk-bar">
    <div>
      <strong>Bulk Operations</strong>
      <p>${escapeHtml(selected.length ? `${selected.length} selected` : "Select rows to update multiple records at once.")}</p>
    </div>
    <div class="awards-bulk-actions">
      <button class="icon-text-button" data-awards-bulk-select="${escapeHtml(viewId)}" type="button">Select Visible</button>
      <button class="icon-text-button" data-awards-bulk-clear="${escapeHtml(viewId)}" type="button">Clear</button>
      <select class="touring-grid-input awards-bulk-select" data-awards-bulk-action="${escapeHtml(viewId)}" aria-label="Bulk action">
        <option value="">Choose action</option>
        ${options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("")}
      </select>
      <button class="tiny-button" data-awards-bulk-apply="${escapeHtml(viewId)}" type="button">Apply</button>
    </div>
  </div>`;
}

function awardsBulkCell(viewId, row = {}) {
  const key = awardsBulkKey(viewId, row);
  if (!canEditAwardsRecords()) return "";
  if (!key) return `<td class="awards-bulk-cell"></td>`;
  const checked = awardsBulkSelectionSet(viewId).has(key) ? " checked" : "";
  return `<td class="awards-bulk-cell"><input data-awards-bulk-row="${escapeHtml(viewId)}" data-awards-bulk-key="${escapeHtml(key)}" type="checkbox" aria-label="Select ${escapeHtml(row.name || "record")}"${checked}></td>`;
}

function awardsBulkHead(viewId, columns) {
  return `${canEditAwardsRecords() ? `<th class="awards-bulk-cell"></th>` : ""}${columns.map(([key, label]) => touringColumnHead(viewId, key, label)).join("")}`;
}

function setAwardsBulkSelection(viewId, keys = []) {
  state.awardsBulkSelection = {
    ...(state.awardsBulkSelection || {}),
    [viewId]: [...new Set(keys)]
  };
}

async function applyAwardsBulkAction(viewId) {
  if (!canEditAwardsRecords()) return;
  const select = document.querySelector(`[data-awards-bulk-action="${viewId}"]`);
  const action = select?.value || "";
  const selected = awardsBulkSelectedKeys(viewId);
  if (!selected.length) {
    toast("Select at least one row first.");
    return;
  }
  if (!action) {
    toast("Choose a bulk action first.");
    return;
  }
  const [field, ...valueParts] = action.split(":");
  const value = valueParts.join(":");
  let updated = 0;
  for (const key of selected) {
    const [, storeName, id] = key.split(":");
    const existing = state[storeName]?.find((item) => item.id === id);
    if (!existing) continue;
    if (field === "lockStatus" && storeName !== "awardsSchedules") continue;
    if (["currentVersion", "deliveryStatus", "accessScope"].includes(field) && storeName !== "awardsDocuments") continue;
    await put(storeName, { ...existing, [field]: value, updatedAt: new Date().toISOString() });
    updated++;
  }
  setAwardsBulkSelection(viewId, []);
  await loadState();
  setView(viewId);
  toast(updated ? `Updated ${updated} awards records.` : "No matching records could use that action.");
}

function toggleTouringGrid(viewId) {
  const allowed = viewId?.startsWith("awards") ? canEditAwardsRecords() : canAdminEdit();
  if (!allowed) {
    toast(viewId?.startsWith("awards") ? "This access view cannot edit Awards grids." : "This access view cannot edit Touring grids.");
    return;
  }
  state.touringGridEdit = { [viewId]: !touringGridEditing(viewId) };
  render();
}

async function saveTouringGrid(viewId) {
  if (!canAdminEdit()) return;
  const inputs = $$(`[data-tour-grid-input]`).filter((input) => input.closest(`#${viewId}`));
  if (!inputs.length) {
    toast("No saved rows to update yet.");
    return;
  }
  const updates = new Map();
  inputs.forEach((input) => {
    const storeName = input.dataset.store;
    const id = input.dataset.id;
    const field = input.dataset.field;
    const key = `${storeName}:${id}`;
    if (!updates.has(key)) updates.set(key, { storeName, id, values: {} });
    updates.get(key).values[field] = input.value;
  });
  for (const update of updates.values()) {
    const existing = state[update.storeName]?.find((item) => item.id === update.id);
    if (existing) await put(update.storeName, { ...existing, ...update.values });
  }
  state.touringGridEdit = { ...state.touringGridEdit, [viewId]: false };
  await loadState();
  setView(viewId);
  toast("Touring grid saved.");
}

const TOURING_COLUMNS = {
  tourAdvancing: [["city", "City / Venue"], ["dates", "Dates"], ["status", "Advance Status"], ["missing", "Missing Info"], ["owner", "Owner"], ["documents", "Rider"]],
  tourCrewPersonnel: [["name", "Name"], ["department", "Department"], ["contact", "Contact"], ["formStatus", "Info Form"], ["travelStatus", "Travel"], ["oneSheet", "One-Sheet"]],
  tourTravel: [["name", "Traveler"], ["flight", "Flight"], ["hotel", "Hotel"], ["overall", "Overall"], ["missing", "Missing Info"], ["packet", "Packet"]],
  tourDocuments: [["name", "Document"], ["type", "Type / Status"], ["link", "Link"], ["notes", "Notes"], ["actions", ""]],
  awardsDocuments: [["record", "Show / Record"], ["type", "Type"], ["status", "Version / Status"], ["owner", "Department / Lead"], ["distro", "Distro"], ["delivery", "Delivery"], ["notes", "Notes"], ["actions", ""]],
  awardsRundown: [["item", "Item"], ["date", "Date / Time"], ["status", "Status"], ["department", "Department / Owner"], ["location", "Location"], ["notes", "Notes"], ["actions", ""]],
  awardsStaffing: [["name", "Name"], ["department", "Department"], ["contact", "Contact"], ["status", "Status"], ["credential", "Credential"], ["notes", "Notes"], ["actions", ""]]
};

function touringColumnValue(row = {}, key, viewId) {
  if (viewId === "tourAdvancing") {
    if (key === "city") return `${row.city || ""} ${row.venue || ""}`;
    if (key === "dates") return `${row.loadIn || row.loadInDate || ""} ${row.showDate || ""} ${row.loadOut || row.loadOutDate || ""}`;
    if (key === "status") return `${row.status || ""} ${row.priority || ""}`;
    if (key === "missing") return (row.missing || touringMissingList(row)).join(" ");
    if (key === "owner") return row.owner || "";
    if (key === "documents") return row.documents || "";
  }
  if (viewId === "tourCrewPersonnel") {
    if (key === "name") return row.name || "";
    if (key === "department") return `${row.department || ""} ${row.title || ""}`;
    if (key === "contact") return `${row.phone || ""} ${row.email || ""}`;
    if (key === "formStatus") return row.formStatus || "";
    if (key === "travelStatus") return row.travelStatus || "";
    if (key === "oneSheet") return row.oneSheet || "";
  }
  if (viewId === "tourTravel") {
    if (key === "name") return `${row.name || ""} ${row.email || ""}`;
    if (key === "flight") return `${row.flightDate || ""} ${row.airline || ""} ${row.depart || ""} ${row.arrive || ""} ${row.flightConfirmation || ""}`;
    if (key === "hotel") return `${row.hotel || ""} ${row.checkIn || ""} ${row.checkOut || ""} ${row.hotelConfirmation || ""}`;
    if (key === "overall") return row.overall || "";
    if (key === "missing") return (row.missing || []).join(" ");
    if (key === "packet") return row.overall === "Ready" ? "Ready to generate" : "Waiting on info";
  }
  if (viewId === "tourDocuments") {
    if (key === "name") return row.name || "";
    if (key === "type") return `${row.type || ""} ${row.status || ""}`;
    if (key === "link") return row.link || row.url || row.pdfLink || row.docLink || "";
    if (key === "notes") return row.notes || "";
  }
  if (viewId === "awardsDocuments") {
    if (key === "record") return `${row.name || ""} ${row.showName || ""} ${row.venue || ""}`;
    if (key === "type") return `${row.kind || ""} ${row.type || ""}`;
    if (key === "status") return `${row.status || ""} ${row.versionLabel || ""} ${row.currentVersion || ""} ${row.restrictedAccess || ""}`;
    if (key === "owner") return `${row.department || ""} ${row.productionLead || ""}`;
    if (key === "distro") return row.distributionGroup || "";
    if (key === "delivery") return `${row.deliveryStatus || ""} ${row.distributionDate || ""} ${row.accessScope || ""}`;
    if (key === "notes") return row.notes || "";
  }
  if (viewId === "awardsRundown") {
    if (key === "item") return `${row.name || ""} ${row.showName || ""} ${row.type || ""} ${row.callType || ""}`;
    if (key === "date") return `${row.callDate || ""} ${row.callTime || ""}`;
    if (key === "status") return `${row.status || ""} ${row.lockStatus || ""}`;
    if (key === "department") return `${row.department || ""} ${row.owner || ""}`;
    if (key === "location") return row.location || "";
    if (key === "notes") return row.notes || "";
  }
  if (viewId === "awardsStaffing") {
    if (key === "name") return `${row.name || ""} ${row.title || ""}`;
    if (key === "department") return row.department || "";
    if (key === "contact") return `${row.phone || ""} ${row.email || ""}`;
    if (key === "status") return row.status || "";
    if (key === "credential") return `${row.credentialStatus || ""} ${row.credentialZone || ""} ${row.checkInLocation || ""}`;
    if (key === "notes") return row.notes || "";
  }
  return "";
}

function touringColumnFilters(viewId) {
  return state.touringColumnFilters?.[viewId] || {};
}

function filterTouringRows(viewId, rows) {
  const filters = touringColumnFilters(viewId);
  return rows.filter((row) => Object.entries(filters).every(([key, value]) => {
    const term = String(value || "").trim().toLowerCase();
    return !term || touringColumnValue(row, key, viewId).toLowerCase().includes(term);
  }));
}

function sortTouringRows(viewId, rows) {
  const sort = state.touringSort?.[viewId] || {};
  const key = sort.key || TOURING_COLUMNS[viewId]?.[0]?.[0] || "name";
  const direction = sort.direction === "desc" ? -1 : 1;
  return rows.sort((a, b) => direction * touringColumnValue(a, key, viewId).localeCompare(touringColumnValue(b, key, viewId), undefined, { numeric: true, sensitivity: "base" }));
}

function touringColumnHead(viewId, key, label) {
  if (key === "actions") return "<th></th>";
  const sort = state.touringSort?.[viewId] || {};
  const filters = touringColumnFilters(viewId);
  const activeSort = sort.key === key;
  const activeFilter = !!filters[key];
  const arrow = activeSort ? (sort.direction === "desc" ? "▾" : "▴") : "▾";
  return `<th><div class="column-filter-heading">
    <span>${escapeHtml(label)}</span>
    <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
      <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
      <div class="record-options-menu">
        <button class="tiny-button" data-tour-sort="${escapeHtml(viewId)}" data-tour-sort-key="${escapeHtml(key)}" data-tour-sort-direction="asc" type="button">Sort A-Z</button>
        <button class="tiny-button" data-tour-sort="${escapeHtml(viewId)}" data-tour-sort-key="${escapeHtml(key)}" data-tour-sort-direction="desc" type="button">Sort Z-A</button>
        <label>Filter<input data-tour-column-filter="${escapeHtml(viewId)}" data-tour-column-key="${escapeHtml(key)}" value="${escapeHtml(filters[key] || "")}" placeholder="Type to filter"></label>
      </div>
    </details>
  </div></th>`;
}

function renderTouringHead(viewId, selector) {
  $(selector).innerHTML = `<tr>${touringBulkHead(viewId, TOURING_COLUMNS[viewId] || [])}</tr>`;
}

function renderTouringBulkToolbarBefore(tableSelector, viewId, rows = []) {
  const wrap = $(tableSelector)?.closest(".table-wrap");
  if (!wrap) return;
  wrap.parentElement?.querySelector(`.suite-bulk-bar[data-suite-bulk-view="${viewId}"]`)?.remove();
  wrap.insertAdjacentHTML("beforebegin", touringBulkToolbar(viewId, rows));
}

function renderTourAdvancing(stops) {
  const editing = touringGridEditing("tourAdvancing");
  touringGridToolbar("tourAdvancing");
  const rows = sortTouringRows("tourAdvancing", filterTouringRows("tourAdvancing", [...stops]));
  $("#tourAdvancingCount").textContent = `${rows.length}/${stops.length} stops`;
  renderTouringHead("tourAdvancing", "#tourAdvancingHead");
  renderTouringBulkToolbarBefore("#tourAdvancingTable", "tourAdvancing", rows);
  $("#tourAdvancingTable").innerHTML = rows.map((stop) => `<tr>
    ${touringBulkCell("tourAdvancing", stop)}
    <td>${editing && stop.source ? `${touringGridInput("touringStops", stop.id, "city", stop.source.city || stop.city)}${touringGridInput("touringStops", stop.id, "venue", stop.source.venue || stop.venue)}` : `<strong>${stop.source ? recordLink("touringStops", stop.id, stop.city) : escapeHtml(stop.city)}</strong><p>${escapeHtml(stop.venue)}</p>`}</td>
    <td>${editing && stop.source ? `${touringGridInput("touringStops", stop.id, "loadInDate", stop.source.loadInDate || "", "date")}${touringGridInput("touringStops", stop.id, "showDate", stop.source.showDate || "", "date")}${touringGridInput("touringStops", stop.id, "loadOutDate", stop.source.loadOutDate || "", "date")}` : `${escapeHtml(formatDate(stop.loadIn) || "Load-in TBD")}<p>${escapeHtml(formatDate(stop.showDate) || "Show TBD")} - ${escapeHtml(formatDate(stop.loadOut) || "Load-out TBD")}</p>`}</td>
    <td>${editing && stop.source ? `${touringGridSelect("touringStops", stop.id, "status", stop.source.status || stop.status, ["Not Sent", "Sent", "Awaiting Response", "Partial Response", "Follow Up Required", "Confirmed", "Finalized"])}${touringGridInput("touringStops", stop.id, "priority", stop.source.priority || stop.priority)}` : `<span class="status-pill ${stop.status === "Ready" ? "" : "warn"}">${escapeHtml(stop.status)}</span><p>${escapeHtml(stop.priority)} priority</p>`}</td>
    <td>${editing && stop.source ? touringGridTextarea("touringStops", stop.id, "missingInfo", stop.source.missingInfo || stop.missing.join(", ")) : (stop.missing.length ? stop.missing.map((item) => `<span class="touring-chip">${escapeHtml(item)}</span>`).join("") : `<span class="status-pill">Complete</span>`)}</td>
    <td>${editing && stop.source ? touringGridInput("touringStops", stop.id, "owner", stop.source.owner || stop.owner) : escapeHtml(stop.owner)}</td>
    <td><strong>${escapeHtml(stop.documents)}</strong><p>City rider workspace</p>${stop.source ? actionButtons("touringStops", stop.id, "touringStopForm", "", canAdminEdit()) : ""}</td>
  </tr>`).join("");
  $("#cityRiderWorkspace").innerHTML = rows.slice(0, 4).map((stop) => `<button class="touring-card touring-readiness-card" ${recordTargetAttrs(touringStopRecordTarget(stop), "tourAdvancing")} type="button">
    <span class="suite-kicker">${escapeHtml(stop.city)}</span>
    <h4>${escapeHtml(stop.venue)}</h4>
    <div class="touring-card-sections">
      ${[
        ["Location", "locationParking"],
        ["Labor Calls", "laborCalls"],
        ["Runner Plan", "runnerPlan"],
        ["Trucks / Buses", "trucksBuses"],
        ["Power", "power"],
        ["Heavy Equipment", "heavyEquipment"],
        ["Fire / FX", "fireGasesFx"],
        ["Golf Carts", "golfCarts"]
      ].map(([label, field]) => `<span class="${touringRiderSectionStatus(stop.source || stop, field) === "Ready" ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
    </div>
    <p>${stop.missing.length ? `Needs: ${escapeHtml(stop.missing.join(", "))}` : "Ready to generate rider when approved."}</p>
  </button>`).join("");
}

function renderTourCrewPersonnel(crew) {
  const editing = touringGridEditing("tourCrewPersonnel");
  touringGridToolbar("tourCrewPersonnel");
  const rows = sortTouringRows("tourCrewPersonnel", filterTouringRows("tourCrewPersonnel", [...crew]));
  $("#tourCrewCount").textContent = `${rows.length}/${crew.length} people`;
  renderTouringHead("tourCrewPersonnel", "#tourCrewHead");
  renderTouringBulkToolbarBefore("#tourCrewTable", "tourCrewPersonnel", rows);
  $("#tourCrewTable").innerHTML = rows.map((person) => `<tr>
    ${touringBulkCell("tourCrewPersonnel", person)}
    <td>${editing && person.source ? touringGridInput("touringCrew", person.id, "name", person.source.name || person.name) : `<strong>${person.source ? recordLink("touringCrew", person.id, person.name) : escapeHtml(person.name)}</strong><p>${escapeHtml(person.assignedStops?.map((stop) => stop.city).join(", ") || "Tour team")}</p>`}${person.source && !editing ? actionButtons("touringCrew", person.id, "touringCrewForm", "", canAdminEdit()) : ""}</td>
    <td>${editing && person.source ? `${touringGridInput("touringCrew", person.id, "department", person.source.department || person.department)}${touringGridInput("touringCrew", person.id, "title", person.source.title || person.title || "")}` : escapeHtml(person.department)}</td>
    <td>${editing && person.source ? `${touringGridInput("touringCrew", person.id, "phone", person.source.phone || "", "tel")}${touringGridInput("touringCrew", person.id, "email", person.source.email || "", "email")}` : `${escapeHtml(person.phone)}<p>${escapeHtml(person.email)}</p>`}</td>
    <td>${editing && person.source ? touringGridSelect("touringCrew", person.id, "formStatus", person.source.formStatus || person.formStatus, ["Needed", "Sent", "Submitted", "Needs Review"]) : `<span class="status-pill ${person.formStatus === "Submitted" ? "" : "warn"}">${escapeHtml(person.formStatus)}</span>`}</td>
    <td>${escapeHtml(person.travelStatus)}</td>
    <td>${escapeHtml(person.oneSheet)}</td>
  </tr>`).join("");
}

function renderTourTravel(travel) {
  const editing = touringGridEditing("tourTravel");
  touringGridToolbar("tourTravel");
  const rows = sortTouringRows("tourTravel", filterTouringRows("tourTravel", [...travel]));
  $("#tourTravelCount").textContent = `${rows.length}/${travel.length} travelers`;
  renderTouringHead("tourTravel", "#tourTravelHead");
  renderTouringBulkToolbarBefore("#tourTravelTable", "tourTravel", rows);
  $("#tourTravelTable").innerHTML = rows.map((person) => `<tr>
    ${touringBulkCell("tourTravel", person)}
    <td>${editing && state.touringTravel.some((record) => record.id === person.id) ? `${touringGridInput("touringTravel", person.id, "name", person.name)}${touringGridInput("touringTravel", person.id, "email", person.email, "email")}` : `<strong>${state.touringTravel.some((record) => record.id === person.id) ? recordLink("touringTravel", person.id, person.name) : escapeHtml(person.name)}</strong><p>${escapeHtml(person.email)}</p>`}${state.touringTravel.some((record) => record.id === person.id) && !editing ? actionButtons("touringTravel", person.id, "touringTravelForm", "", canAdminEdit()) : ""}</td>
    <td>${editing && state.touringTravel.some((record) => record.id === person.id) ? `${touringGridInput("touringTravel", person.id, "flightDate", person.flightDate || "", "date")}${touringGridInput("touringTravel", person.id, "airline", person.airline || "")}${touringGridInput("touringTravel", person.id, "depart", person.depart || "")}${touringGridInput("touringTravel", person.id, "arrive", person.arrive || "")}${touringGridInput("touringTravel", person.id, "flightConfirmation", person.flightConfirmation || "")}` : `${escapeHtml(person.airline || "Not booked")}<p>${escapeHtml([person.depart, person.arrive].filter(Boolean).join(" to ") || "Route TBD")}</p>`}</td>
    <td>${editing && state.touringTravel.some((record) => record.id === person.id) ? `${touringGridInput("touringTravel", person.id, "hotel", person.hotel || "")}${touringGridInput("touringTravel", person.id, "checkIn", person.checkIn || "", "date")}${touringGridInput("touringTravel", person.id, "checkOut", person.checkOut || "", "date")}${touringGridInput("touringTravel", person.id, "hotelConfirmation", person.hotelConfirmation || "")}` : `${escapeHtml(person.hotel || "Not booked")}<p>${escapeHtml([person.checkIn, person.checkOut].filter(Boolean).join(" - ") || "Dates TBD")}</p>`}</td>
    <td><span class="status-pill ${person.overall === "Ready" ? "" : "warn"}">${escapeHtml(person.overall)}</span></td>
    <td>${person.missing.map((item) => `<span class="touring-chip">${escapeHtml(item)}</span>`).join("")}</td>
    <td>${person.overall === "Ready" ? "Ready to generate" : "Waiting on info"}</td>
  </tr>`).join("");
}

function renderTourDocuments(stops, crew, travel) {
  const editing = touringGridEditing("tourDocuments");
  touringGridToolbar("tourDocuments");
  const fallbackDocs = [
    ["Advance Riders", `${stops.filter((stop) => stop.documents === "Generated").length}/${stops.length} generated`, "City rider PDFs and version history."],
    ["Team One-Sheets", `${crew.filter((person) => person.oneSheet === "Ready").length}/${crew.length} ready`, "Individual tour team one-sheet packets."],
    ["Hotel Manifest", "Template ready", "Hotel accommodations manifest from travel records."],
    ["Flight Manifest", "Template ready", "Flight accommodations manifest from travel records."],
    ["Travel Itineraries", `${travel.filter((person) => person.overall === "Ready").length} ready`, "Person-by-person travel itinerary packets."],
    ["Tour Book", "Future module", "Polished book output with internal and redacted versions."]
  ];
  const docs = state.touringDocuments.length ? sortTouringRows("tourDocuments", filterTouringRows("tourDocuments", [...state.touringDocuments])) : fallbackDocs;
  $("#tourDocumentsCount").textContent = `${docs.length} document lanes`;
  $("#tourDocumentsList").innerHTML = state.touringDocuments.length
    ? `${touringBulkToolbar("tourDocuments", docs)}<div class="table-wrap premium-grid-wrap touring-document-grid"><table><thead><tr>${touringBulkHead("tourDocuments", TOURING_COLUMNS.tourDocuments)}</tr></thead><tbody>${docs.map((doc) => `<tr>
      ${touringBulkCell("tourDocuments", doc)}
      <td>${editing ? touringGridInput("touringDocuments", doc.id, "name", doc.name || "Tour Document") : recordLink("touringDocuments", doc.id, doc.name || "Tour Document")}</td>
      <td>${editing ? `${touringGridSelect("touringDocuments", doc.id, "type", doc.type || "Advance Rider", ["Advance Rider", "Team One-Sheet", "Hotel Manifest", "Flight Manifest", "Travel Itinerary", "Tour Book"])}${touringGridSelect("touringDocuments", doc.id, "status", doc.status || "Draft", ["Draft", "Ready", "Generated", "Sent"])}` : `<span class="suite-kicker">${escapeHtml(doc.type || "Document")}</span><p>${escapeHtml(doc.status || "Draft")}</p>`}</td>
      <td>${editing ? touringGridInput("touringDocuments", doc.id, "link", doc.link || "", "url") : (doc.link ? `<a href="${escapeHtml(doc.link)}" target="_blank" rel="noopener">Open</a>` : "No link")}</td>
      <td>${editing ? touringGridTextarea("touringDocuments", doc.id, "notes", doc.notes || "") : escapeHtml(doc.notes || "Saved touring document.")}</td>
      <td>${!editing ? actionButtons("touringDocuments", doc.id, "touringDocumentForm", "", canAdminEdit()) : ""}</td>
    </tr>`).join("")}</tbody></table></div>`
    : docs.map(([title, status, detail]) => `<article class="touring-card"><span class="suite-kicker">${escapeHtml(status)}</span><h4>${escapeHtml(title)}</h4><p>${escapeHtml(detail)}</p></article>`).join("");
}

function renderTourSettings() {
  $("#tourSettingsList").innerHTML = [
    ["Tour Defaults", "Reusable labor calls, runner plans, trucks, power, and rider language that flow into each city."],
    ["Public Forms", "Team info forms and city advance links will use token access like Production Office links."],
    ["Bulk Grid Mode", "Tour stops, city rider sections, crew personnel, flights, and hotels need spreadsheet-fast editing."],
    ["Sensitive Access", "Passport, DOB, medical, emergency contact, travel, and hotel details require restricted permissions."],
    ["Stage Intelligence", "Quiet checks for missing promoter emails, parking notes, travel confirmations, and ready-to-generate packets."]
  ].map(([title, detail]) => `<article class="touring-card"><h4>${escapeHtml(title)}</h4><p>${escapeHtml(detail)}</p></article>`).join("");
}

function renderAwardsSuite() {
  if (!$("#awardsHeroStats")) return;
  renderAwardsSuiteAccessNotice();
  const shows = awardsShowRows();
  const documents = awardsDocumentsRows();
  const staffing = awardsStaffRows();
  const schedules = awardsScheduleRows(shows);
  const departments = awardsDepartmentRows(documents, staffing, schedules);
  const distribution = awardsDistributionRows(documents);
  const access = awardsAccessRows(documents);
  const showDay = awardsShowDayRows(shows, schedules);
  const contacts = awardsContactRows(staffing);
  const compliance = awardsComplianceRows(documents);
  const versions = awardsVersionRows(documents);
  const technical = awardsTechnicalRows(documents);
  const talent = awardsTalentRows(documents, staffing, schedules);
  const packets = awardsPacketRows(shows, documents, staffing, schedules);
  const attention = awardsAttentionRows(shows, documents, staffing, schedules, packets, departments, distribution, access, showDay, contacts, compliance, versions, technical, talent);
  ensureAwardsAttentionNotifications(attention).catch((error) => console.warn("Awards notification sync failed", error));
  renderAwardsDashboard(shows, documents, staffing, schedules, attention, packets, departments, distribution, access, showDay, contacts, compliance, versions, technical, talent);
  renderAwardsDocuments(shows, documents);
  renderAwardsRundown(documents, schedules);
  renderAwardsStaffing(staffing);
  renderAwardsSettings();
}

function renderAwardsSuiteAccessNotice() {
  const notice = $("#awardsSuiteAccessNotice");
  if (!notice) return;
  const client = activeClientRecord();
  const enabled = awardsSuiteEnabled(client);
  notice.hidden = false;
  notice.classList.toggle("enabled", enabled);
  const accessText = canEditAwardsRecords()
    ? "Full client-side controls are available for broadcast records, restricted files, and readiness updates."
    : "Scoped view is active. Restricted broadcast files remain hidden unless they are marked for broader access.";
  notice.innerHTML = enabled
    ? `<div><strong>Awards / Live Broadcast Suite enabled</strong><p>${escapeHtml(client?.name || "This client")} can now organize broadcast documents, rundowns, staff lists, plots, scripts, and show-day readiness. ${escapeHtml(accessText)}</p></div><span class="status-pill">Active</span>`
    : `<div><strong>Preview mode</strong><p>Enable Awards / Live Broadcast Suite under this client account's Office Suites to use this as a live production workspace.</p></div>${canSystemEdit() ? `<button class="tiny-button system-action" data-dashboard-link="adminClients" type="button">Open Client Accounts</button>` : `<span class="status-pill warn">Not enabled</span>`}`;
}

function awardsShowRows() {
  if (state.awardsShows.length) {
    return state.awardsShows.map((show) => ({
      id: show.id,
      name: show.name || "Broadcast Show",
      showDate: show.showDate || "",
      venue: show.venue || "Venue TBD",
      status: show.status || "Pre-Production",
      productionLead: show.productionLead || "",
      notes: show.notes || "",
      source: show
    }));
  }
  const events = visibleEvents().filter((event) => event.officeSuiteId === AWARDS_SUITE_ID);
  if (events.length) {
    return events.slice(0, 6).map((event) => {
      const venue = getVenue(event.venueId);
      return {
        id: event.id,
        name: event.name || "Broadcast Show",
        showDate: event.startDate || "",
        venue: venue?.name || event.location || "Venue TBD",
        status: event.status || "Pre-Production",
        productionLead: event.productionContact || "",
        notes: event.notes || "",
        event
      };
    });
  }
  return [
    { id: "awards-show-demo-1", name: "Awards Broadcast", showDate: "", venue: "Venue TBD", status: "Pre-Production", productionLead: "Production Office", notes: "Starter show record for rundowns, plots, scripts, staff lists, and distro.", source: null }
  ];
}

function awardsDocumentsRows() {
  if (state.awardsDocuments.length) {
    return state.awardsDocuments.filter(awardsRecordVisible).map((doc) => ({
      id: doc.id,
      name: doc.name || "Broadcast Document",
      showName: doc.showName || "Show TBD",
      type: doc.type || "Document",
      status: doc.status || "Draft",
      department: doc.department || "Production",
      versionLabel: doc.versionLabel || "",
      distributionGroup: doc.distributionGroup || "Production",
      currentVersion: doc.currentVersion || "",
      restrictedAccess: doc.restrictedAccess || "",
      deliveryStatus: doc.deliveryStatus || "Not Sent",
      distributionDate: doc.distributionDate || "",
      accessScope: doc.accessScope || (doc.restrictedAccess === "yes" ? "Restricted" : "Production Only"),
      link: doc.link || "",
      notes: doc.notes || "",
      source: doc
    }));
  }
  return [
    ["Rundown", "Final-ready show rundown, daily rundown, and long rundown versions."],
    ["Schedule", "Show schedule, rehearsal schedule, and daily production schedule."],
    ["Staff List", "Production staff list, department contacts, and distro notes."],
    ["Plots", "Stage plots, distro plots, venue plots, and technical drawing packets."],
    ["Script", "Show script, revisions, presenter notes, and live broadcast copy."],
    ["Quickie / Pre-Mimeo", "Fast distro versions and pre-mimeo working packets."],
    ["Health & Safety", "Safety plan, site notices, and crew-facing production requirements."],
    ["Start Paperwork", "Crew start packets, compliance documents, and onboarding forms."]
  ].map(([type, notes], index) => ({
    id: `awards-demo-doc-${index}`,
    name: type,
    showName: "Awards / Live Broadcast",
    type,
    status: index < 3 ? "Template Ready" : "Planned",
    department: index === 2 ? "Production Office" : "Production",
    versionLabel: "",
    distributionGroup: index === 2 ? "Production Office" : "Mimeo",
    currentVersion: index < 3 ? "yes" : "",
    restrictedAccess: ["Script", "Start Paperwork"].includes(type) ? "yes" : "",
    deliveryStatus: index < 3 ? "Ready to Send" : "Not Sent",
    distributionDate: "",
    accessScope: ["Script", "Start Paperwork"].includes(type) ? "Restricted" : "Production Only",
    link: "",
    notes,
    source: null
  })).filter(awardsRecordVisible);
}

function awardsStaffRows() {
  if (state.awardsStaff.length) {
    return state.awardsStaff.map((person) => ({
      id: person.id,
      name: person.name || "Staff Member",
      department: person.department || person.title || "Production",
      title: person.title || "",
      phone: person.phone || "Missing",
      email: person.email || "Missing",
      status: person.status || "Needs Contact",
      credentialStatus: person.credentialStatus || "Not Started",
      credentialZone: person.credentialZone || "",
      checkInLocation: person.checkInLocation || "",
      notes: person.notes || "",
      source: person
    }));
  }
  const workers = visibleRecords(state.workers).slice(0, 8);
  if (workers.length) {
    return workers.map((worker) => ({
      id: worker.id,
      name: worker.name,
      department: worker.role || "Crew / Runner",
      phone: worker.phone || "Missing",
      email: worker.email || "Missing",
      status: worker.phone && worker.email ? "Ready" : "Needs Contact",
      credentialStatus: "Not Started",
      credentialZone: "",
      checkInLocation: "",
      source: null
    }));
  }
  return [
    { id: "awards-staff-demo-1", name: "Executive Producer", department: "Production", phone: "Pending", email: "Pending", status: "Needs Contact", credentialStatus: "Not Started", credentialZone: "All Access", checkInLocation: "Production Office" },
    { id: "awards-staff-demo-2", name: "Stage Manager", department: "Stage Management", phone: "Pending", email: "Pending", status: "Needs Contact", credentialStatus: "Not Started", credentialZone: "Backstage", checkInLocation: "Credential Desk" },
    { id: "awards-staff-demo-3", name: "Mimeo Lead", department: "Production Office", phone: "Pending", email: "Pending", status: "Needs Contact", credentialStatus: "Not Started", credentialZone: "Production Office", checkInLocation: "Production Office" }
  ];
}

function awardsScheduleRows(shows = awardsShowRows()) {
  if (state.awardsSchedules.length) {
    return state.awardsSchedules.map((item) => ({
      id: item.id,
      name: item.name || "Schedule Item",
      showName: item.showName || shows[0]?.name || "Show TBD",
      callDate: item.callDate || "",
      callTime: item.callTime || "",
      callType: item.callType || "Production",
      location: item.location || "",
      department: item.department || "Production",
      owner: item.owner || "",
      status: item.status || "Draft",
      lockStatus: item.lockStatus || "Open",
      notes: item.notes || "",
      source: item
    }));
  }
  return [
    { id: "awards-schedule-demo-1", name: "Production load-in", showName: shows[0]?.name || "Awards Broadcast", callDate: shows[0]?.showDate || "", callTime: "", callType: "Production", location: "Venue", department: "Production", owner: "Production Office", status: "Draft", lockStatus: "Open", notes: "Build from schedule PDFs and daily rundown timing.", source: null },
    { id: "awards-schedule-demo-2", name: "Rehearsals", showName: shows[0]?.name || "Awards Broadcast", callDate: shows[0]?.showDate || "", callTime: "", callType: "Rehearsal", location: "Stage", department: "Stage Management", owner: "Stage Manager", status: "Needs Review", lockStatus: "Open", notes: "Connect rehearsal timing to talent, stage, and broadcast notes.", source: null },
    { id: "awards-schedule-demo-3", name: "Live show", showName: shows[0]?.name || "Awards Broadcast", callDate: shows[0]?.showDate || "", callTime: "", callType: "Show", location: "Control Room / Stage", department: "Broadcast", owner: "Show Caller", status: "Draft", lockStatus: "Open", notes: "Show-day schedule item for final rundown and script alignment.", source: null }
  ];
}

function awardsDepartmentRows(documents, staffing, schedules) {
  const departmentNames = new Set([
    ...documents.map((doc) => doc.department || "Production"),
    ...staffing.map((person) => person.department || "Production"),
    ...schedules.map((item) => item.department || "Production")
  ].filter(Boolean));
  if (!departmentNames.size) {
    ["Production", "Stage Management", "Broadcast", "Production Office"].forEach((name) => departmentNames.add(name));
  }
  return [...departmentNames].sort((a, b) => a.localeCompare(b)).map((name) => {
    const departmentDocs = documents.filter((doc) => (doc.department || "Production") === name);
    const departmentStaff = staffing.filter((person) => (person.department || "Production") === name);
    const departmentSchedule = schedules.filter((item) => (item.department || "Production") === name);
    const docsReady = !departmentDocs.length || departmentDocs.some((doc) => ["Distributed", "Final", "Ready", "Template Ready"].includes(doc.status) || doc.currentVersion === "yes");
    const distroReady = !departmentDocs.length || departmentDocs.every((doc) => ["Distributed", "Ready to Send"].includes(doc.deliveryStatus) || ["Distributed", "Final", "Template Ready"].includes(doc.status));
    const staffReady = !departmentStaff.length || departmentStaff.every((person) => ["Confirmed", "Ready"].includes(person.status));
    const credentialsReady = !departmentStaff.length || departmentStaff.every((person) => ["Approved", "Issued"].includes(person.credentialStatus) || !person.source);
    const scheduleReady = !departmentSchedule.length || departmentSchedule.every((item) => ["Ready", "Final"].includes(item.status) && item.location);
    const checks = [docsReady, distroReady, staffReady, credentialsReady, scheduleReady];
    const readyCount = checks.filter(Boolean).length;
    return {
      name,
      status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      docCount: departmentDocs.length,
      staffCount: departmentStaff.length,
      scheduleCount: departmentSchedule.length,
      docsReady,
      distroReady,
      staffReady,
      credentialsReady,
      scheduleReady
    };
  });
}

function awardsDistributionRows(documents) {
  const groupNames = new Set(documents.map((doc) => doc.distributionGroup || "Production").filter(Boolean));
  if (!groupNames.size) {
    ["Production", "Production Office", "Mimeo", "Department Heads"].forEach((name) => groupNames.add(name));
  }
  return [...groupNames].sort((a, b) => a.localeCompare(b)).map((name) => {
    const groupDocs = documents.filter((doc) => (doc.distributionGroup || "Production") === name);
    const sentDocs = groupDocs.filter((doc) => ["Distributed", "Ready to Send"].includes(doc.deliveryStatus) || ["Distributed", "Final", "Template Ready"].includes(doc.status));
    const restrictedDocs = groupDocs.filter((doc) => doc.restrictedAccess === "yes");
    const restrictedReady = !restrictedDocs.length || restrictedDocs.every((doc) => ["Restricted", "Public / Redacted"].includes(doc.accessScope));
    const datesReady = sentDocs.every((doc) => doc.deliveryStatus !== "Distributed" || doc.distributionDate || !doc.source);
    const deliveryReady = groupDocs.length > 0 && sentDocs.length === groupDocs.length;
    const checks = [deliveryReady, restrictedReady, datesReady];
    const readyCount = checks.filter(Boolean).length;
    return {
      name,
      status: readyCount === checks.length ? "Ready" : readyCount >= 2 ? "Pending" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      docCount: groupDocs.length,
      sentCount: sentDocs.length,
      restrictedCount: restrictedDocs.length,
      deliveryReady,
      restrictedReady,
      datesReady,
      pendingDocs: groupDocs.filter((doc) => !sentDocs.includes(doc)).map((doc) => doc.name || doc.type).slice(0, 3)
    };
  });
}

function awardsAccessRows(documents) {
  const scopes = ["Restricted", "Public / Redacted", "Department Heads", "All Staff", "Production Only"];
  return scopes.map((scope) => {
    const scopeDocs = documents.filter((doc) => (doc.accessScope || (doc.restrictedAccess === "yes" ? "Restricted" : "Production Only")) === scope);
    const restrictedDocs = scopeDocs.filter((doc) => doc.restrictedAccess === "yes");
    const hasSensitivePublicDocs = scope === "All Staff" && scopeDocs.some((doc) => ["Script", "Start Paperwork"].includes(doc.type));
    const redactedReady = scope !== "Public / Redacted" || scopeDocs.every((doc) => doc.restrictedAccess !== "yes" || doc.accessScope === "Public / Redacted");
    const restrictedReady = scope !== "Restricted" || restrictedDocs.every((doc) => doc.restrictedAccess === "yes");
    const deliveryReady = !scopeDocs.length || scopeDocs.every((doc) => ["Ready to Send", "Distributed"].includes(doc.deliveryStatus) || ["Ready", "Distributed", "Final", "Template Ready"].includes(doc.status));
    const accessClean = !hasSensitivePublicDocs && redactedReady && restrictedReady;
    const checks = [deliveryReady, accessClean];
    const readyCount = checks.filter(Boolean).length;
    return {
      scope,
      status: !scopeDocs.length ? "No Docs" : readyCount === checks.length ? "Ready" : "Needs Review",
      readyCount,
      totalCount: checks.length,
      docCount: scopeDocs.length,
      restrictedCount: restrictedDocs.length,
      deliveryReady,
      accessClean,
      examples: scopeDocs.map((doc) => doc.name || doc.type).slice(0, 3)
    };
  });
}

function awardsShowDayRows(shows, schedules) {
  return shows.map((show) => {
    const showName = normalizedMatchValue(show.name || "");
    const showSchedules = schedules.filter((item) => {
      const itemShow = normalizedMatchValue(item.showName || "");
      return !itemShow || !showName || itemShow.includes(showName) || showName.includes(itemShow) || itemShow.includes("broadcast");
    });
    const liveItems = showSchedules.filter((item) => ["Show", "Camera / Broadcast", "Talent", "Rehearsal"].includes(item.callType));
    const timingReady = showSchedules.length > 0 && showSchedules.every((item) => item.callDate && item.callTime);
    const locationReady = showSchedules.length > 0 && showSchedules.every((item) => item.location);
    const ownerReady = showSchedules.length > 0 && showSchedules.every((item) => item.owner);
    const finalReady = showSchedules.length > 0 && showSchedules.every((item) => ["Ready", "Final"].includes(item.status));
    const lockedReady = showSchedules.length > 0 && showSchedules.every((item) => ["Locked", "Final Locked"].includes(item.lockStatus) || item.status !== "Final");
    const checks = [timingReady, locationReady, ownerReady, finalReady, lockedReady];
    const readyCount = checks.filter(Boolean).length;
    return {
      id: show.id,
      name: show.name || "Broadcast Show",
      status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      scheduleCount: showSchedules.length,
      liveCount: liveItems.length,
      timingReady,
      locationReady,
      ownerReady,
      finalReady,
      lockedReady,
      nextItems: showSchedules.slice(0, 3).map((item) => item.name || item.callType)
    };
  });
}

function awardsContactRows(staffing) {
  const productionContacts = staffing.filter((person) => {
    const text = normalizedMatchValue(`${person.department || ""} ${person.title || ""} ${person.name || ""}`);
    return text.includes("production") || text.includes("stage") || text.includes("broadcast") || text.includes("mimeo") || text.includes("producer");
  });
  const rows = productionContacts.length ? productionContacts : staffing.slice(0, 6);
  return rows.map((person) => {
    const phoneReady = Boolean(person.phone && person.phone !== "Missing" && person.phone !== "Pending");
    const emailReady = Boolean(person.email && person.email !== "Missing" && person.email !== "Pending");
    const credentialReady = Boolean(person.credentialZone && ["Approved", "Issued"].includes(person.credentialStatus));
    const checkInReady = Boolean(person.checkInLocation);
    const statusReady = ["Confirmed", "Ready"].includes(person.status);
    const checks = [phoneReady, emailReady, credentialReady, checkInReady, statusReady];
    const readyCount = checks.filter(Boolean).length;
    return {
      id: person.id,
      name: person.name || "Production Contact",
      department: person.department || "Production",
      title: person.title || "",
      status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      phoneReady,
      emailReady,
      credentialReady,
      checkInReady,
      statusReady,
      credentialZone: person.credentialZone || "Zone TBD",
      checkInLocation: person.checkInLocation || "Check-in TBD"
    };
  });
}

function awardsComplianceRows(documents) {
  const lanes = [
    {
      name: "Start Paperwork",
      match: (doc) => normalizedMatchValue(`${doc.type || ""} ${doc.name || ""}`).includes("start")
    },
    {
      name: "Health & Safety",
      match: (doc) => normalizedMatchValue(`${doc.type || ""} ${doc.name || ""}`).includes("safety")
    },
    {
      name: "Restricted Onboarding",
      match: (doc) => doc.restrictedAccess === "yes" && ["Start Paperwork", "Health & Safety"].includes(doc.type)
    }
  ];
  return lanes.map((lane) => {
    const laneDocs = documents.filter(lane.match);
    const readyDocs = laneDocs.filter((doc) => ["Ready", "Distributed", "Final", "Template Ready"].includes(doc.status));
    const deliveryReady = laneDocs.length > 0 && laneDocs.every((doc) => ["Ready to Send", "Distributed"].includes(doc.deliveryStatus) || ["Distributed", "Final", "Template Ready"].includes(doc.status));
    const accessReady = laneDocs.every((doc) => doc.restrictedAccess !== "yes" || ["Restricted", "Public / Redacted"].includes(doc.accessScope));
    const currentReady = laneDocs.length > 0 && laneDocs.every((doc) => doc.currentVersion === "yes" || ["Final", "Template Ready"].includes(doc.status) || !doc.source);
    const checks = [laneDocs.length > 0, readyDocs.length === laneDocs.length && laneDocs.length > 0, deliveryReady, accessReady, currentReady];
    const readyCount = checks.filter(Boolean).length;
    return {
      name: lane.name,
      status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      docCount: laneDocs.length,
      readyDocCount: readyDocs.length,
      hasDocs: laneDocs.length > 0,
      docsReady: readyDocs.length === laneDocs.length && laneDocs.length > 0,
      deliveryReady,
      accessReady,
      currentReady,
      examples: laneDocs.map((doc) => doc.name || doc.type).slice(0, 3)
    };
  });
}

function awardsVersionRows(documents) {
  const versionTypes = ["Rundown", "Script", "Quickie", "Schedule", "Plot"];
  return versionTypes.map((type) => {
    const typeDocs = documents.filter((doc) => normalizedMatchValue(doc.type || doc.name || "").includes(normalizedMatchValue(type)));
    const currentDocs = typeDocs.filter((doc) => doc.currentVersion === "yes" || ["Final", "Template Ready"].includes(doc.status));
    const approvalReady = typeDocs.length > 0 && typeDocs.every((doc) => ["Ready", "Distributed", "Final", "Template Ready"].includes(doc.status));
    const distroReady = typeDocs.length > 0 && typeDocs.every((doc) => ["Ready to Send", "Distributed"].includes(doc.deliveryStatus) || ["Distributed", "Final", "Template Ready"].includes(doc.status));
    const accessReady = typeDocs.every((doc) => doc.restrictedAccess !== "yes" || ["Restricted", "Public / Redacted"].includes(doc.accessScope));
    const currentReady = typeDocs.length > 0 && currentDocs.length > 0;
    const checks = [typeDocs.length > 0, currentReady, approvalReady, distroReady, accessReady];
    const readyCount = checks.filter(Boolean).length;
    return {
      type,
      status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      docCount: typeDocs.length,
      currentCount: currentDocs.length,
      hasDocs: typeDocs.length > 0,
      currentReady,
      approvalReady,
      distroReady,
      accessReady,
      examples: typeDocs.map((doc) => [doc.name || doc.type, doc.versionLabel].filter(Boolean).join(" ")).slice(0, 3)
    };
  });
}

function awardsTechnicalRows(documents) {
  const lanes = [
    { name: "Stage Plots", terms: ["stage", "plot"] },
    { name: "Venue Plots", terms: ["venue", "plot"] },
    { name: "Broadcast / Camera", terms: ["broadcast", "camera"] },
    { name: "Power / Technical", terms: ["power", "technical"] }
  ];
  return lanes.map((lane) => {
    const laneDocs = documents.filter((doc) => {
      const text = normalizedMatchValue(`${doc.type || ""} ${doc.name || ""} ${doc.department || ""} ${doc.notes || ""}`);
      return lane.terms.some((term) => text.includes(term)) || (lane.name.includes("Stage") && text.includes("plot"));
    });
    const currentDocs = laneDocs.filter((doc) => doc.currentVersion === "yes" || ["Final", "Template Ready"].includes(doc.status));
    const docsReady = laneDocs.length > 0 && laneDocs.every((doc) => ["Ready", "Distributed", "Final", "Template Ready"].includes(doc.status));
    const distroReady = laneDocs.length > 0 && laneDocs.every((doc) => ["Ready to Send", "Distributed"].includes(doc.deliveryStatus) || ["Distributed", "Final", "Template Ready"].includes(doc.status));
    const accessReady = laneDocs.every((doc) => doc.restrictedAccess !== "yes" || ["Restricted", "Public / Redacted"].includes(doc.accessScope));
    const currentReady = laneDocs.length > 0 && currentDocs.length > 0;
    const checks = [laneDocs.length > 0, currentReady, docsReady, distroReady, accessReady];
    const readyCount = checks.filter(Boolean).length;
    return {
      name: lane.name,
      status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
      readyCount,
      totalCount: checks.length,
      docCount: laneDocs.length,
      currentCount: currentDocs.length,
      hasDocs: laneDocs.length > 0,
      currentReady,
      docsReady,
      distroReady,
      accessReady,
      examples: laneDocs.map((doc) => doc.name || doc.type).slice(0, 3)
    };
  });
}

function awardsTalentRows(documents, staffing, schedules) {
  const talentDocs = documents.filter((doc) => {
    const text = normalizedMatchValue(`${doc.type || ""} ${doc.name || ""} ${doc.department || ""} ${doc.notes || ""}`);
    return text.includes("script") || text.includes("talent") || text.includes("presenter") || text.includes("vip") || text.includes("redacted");
  });
  const talentStaff = staffing.filter((person) => {
    const text = normalizedMatchValue(`${person.department || ""} ${person.title || ""} ${person.name || ""}`);
    return text.includes("talent") || text.includes("vip") || text.includes("presenter") || text.includes("producer") || text.includes("stage");
  });
  const talentSchedule = schedules.filter((item) => {
    const text = normalizedMatchValue(`${item.name || ""} ${item.callType || ""} ${item.department || ""} ${item.notes || ""}`);
    return text.includes("talent") || text.includes("vip") || text.includes("presenter") || text.includes("rehearsal");
  });
  const scriptReady = talentDocs.some((doc) => ["Script", "Rundown"].includes(doc.type) && ["Ready", "Distributed", "Final", "Template Ready"].includes(doc.status));
  const publicReady = talentDocs.every((doc) => doc.restrictedAccess !== "yes" || ["Restricted", "Public / Redacted"].includes(doc.accessScope));
  const contactReady = talentStaff.length > 0 && talentStaff.every((person) => person.phone && person.phone !== "Missing" && person.email && person.email !== "Missing");
  const credentialReady = talentStaff.length > 0 && talentStaff.every((person) => ["Approved", "Issued"].includes(person.credentialStatus) || !person.source);
  const scheduleReady = talentSchedule.length > 0 && talentSchedule.every((item) => item.callDate && item.callTime && item.location);
  const checks = [scriptReady, publicReady, contactReady, credentialReady, scheduleReady];
  const readyCount = checks.filter(Boolean).length;
  return [{
    name: "Talent / VIP",
    status: readyCount === checks.length ? "Ready" : readyCount >= 3 ? "Close" : "Needs Work",
    readyCount,
    totalCount: checks.length,
    docCount: talentDocs.length,
    staffCount: talentStaff.length,
    scheduleCount: talentSchedule.length,
    scriptReady,
    publicReady,
    contactReady,
    credentialReady,
    scheduleReady,
    examples: [
      ...talentDocs.map((doc) => doc.name || doc.type),
      ...talentSchedule.map((item) => item.name || item.callType)
    ].slice(0, 3)
  }];
}

function awardsPacketRows(shows, documents, staffing, schedules) {
  return shows.map((show) => {
    const showName = normalizedMatchValue(show.name || "");
    const showDocs = documents.filter((doc) => {
      const docShow = normalizedMatchValue(doc.showName || "");
      return !docShow || !showName || docShow.includes(showName) || showName.includes(docShow) || docShow.includes("broadcast");
    });
    const requiredTypes = ["Rundown", "Schedule", "Staff List", "Plot", "Script"];
    const missingDocs = requiredTypes.filter((type) => !showDocs.some((doc) => normalizedMatchValue(doc.type).includes(normalizedMatchValue(type))));
    const currentDocs = showDocs.filter((doc) => doc.currentVersion === "yes" || ["Final", "Distributed", "Template Ready"].includes(doc.status));
    const deliveredDocs = showDocs.filter((doc) => ["Distributed", "Ready to Send"].includes(doc.deliveryStatus) || ["Distributed", "Final", "Template Ready"].includes(doc.status));
    const restrictedDocs = showDocs.filter((doc) => doc.restrictedAccess === "yes");
    const redactedReady = restrictedDocs.length === 0 || restrictedDocs.every((doc) => ["Restricted", "Public / Redacted"].includes(doc.accessScope));
    const staffReady = staffing.length > 0 && staffing.every((person) => ["Confirmed", "Ready"].includes(person.status));
    const credentialsReady = staffing.length > 0 && staffing.every((person) => ["Approved", "Issued"].includes(person.credentialStatus) || !person.source);
    const scheduleReady = schedules.length > 0 && schedules.every((item) => ["Ready", "Final"].includes(item.status) && item.location);
    const lockedItems = schedules.filter((item) => ["Locked", "Final Locked"].includes(item.lockStatus)).length;
    const checks = [
      missingDocs.length === 0,
      currentDocs.length >= Math.min(requiredTypes.length, showDocs.length || requiredTypes.length),
      deliveredDocs.length >= Math.min(3, showDocs.length || 3),
      staffReady,
      credentialsReady,
      scheduleReady,
      redactedReady
    ];
    const readyCount = checks.filter(Boolean).length;
    const status = readyCount === checks.length ? "Ready" : readyCount >= 5 ? "Close" : "Needs Work";
    return {
      id: show.id,
      name: show.name,
      status,
      readyCount,
      totalCount: checks.length,
      missingDocs,
      docsReady: `${currentDocs.length}/${requiredTypes.length}`,
      distroReady: `${deliveredDocs.length}/${Math.max(showDocs.length, requiredTypes.length)}`,
      staffing: staffReady ? "Confirmed" : "Needs Review",
      credentials: credentialsReady ? "Ready" : "Needs Review",
      schedule: scheduleReady ? "Ready" : "Needs Review",
      lockedItems,
      redacted: redactedReady ? "Ready" : "Needs Review"
    };
  });
}

function awardsAttentionRows(shows, documents, staffing, schedules, packets = [], departments = [], distribution = [], access = [], showDay = [], contacts = [], compliance = [], versions = [], technical = [], talent = []) {
  return [
    ...shows.filter((show) => !show.showDate || !show.venue || show.venue === "Venue TBD").map((show) => ({
      title: `${show.name} show details needed`,
      detail: [!show.showDate ? "Show date" : "", !show.venue || show.venue === "Venue TBD" ? "Venue" : ""].filter(Boolean).join(", "),
      view: "awardsDocuments"
    })),
    ...documents.filter((doc) => !["Distributed", "Final", "Template Ready"].includes(doc.status)).map((doc) => ({
      title: `${doc.type} needs review`,
      detail: `${doc.showName || "Show"} - ${doc.status || "Draft"}`,
      view: "awardsDocuments"
    })),
    ...documents.filter((doc) => doc.source && !doc.currentVersion && ["Ready", "Distributed", "Final"].includes(doc.status)).map((doc) => ({
      title: `${doc.name} version status needed`,
      detail: "Mark whether this is the current or superseded version.",
      view: "awardsDocuments"
    })),
    ...documents.filter((doc) => doc.source && doc.deliveryStatus === "Distributed" && !doc.distributionDate).map((doc) => ({
      title: `${doc.name} distro date needed`,
      detail: "Distributed documents need the distribution date.",
      view: "awardsDocuments"
    })),
    ...documents.filter((doc) => doc.source && doc.restrictedAccess === "yes" && doc.accessScope !== "Restricted").map((doc) => ({
      title: `${doc.name} access scope needs review`,
      detail: "Restricted documents should use the restricted access scope or a redacted path.",
      view: "awardsDocuments"
    })),
    ...schedules.filter((item) => !["Ready", "Final"].includes(item.status)).slice(0, 4).map((item) => ({
      title: `${item.name} schedule needs review`,
      detail: `${item.showName || "Show"} - ${item.status || "Draft"}`,
      view: "awardsRundown"
    })),
    ...schedules.filter((item) => item.source && !item.location).slice(0, 4).map((item) => ({
      title: `${item.name} location needed`,
      detail: `${item.callType || "Schedule"} needs a show-day location.`,
      view: "awardsRundown"
    })),
    ...schedules.filter((item) => item.source && item.status === "Final" && item.lockStatus !== "Final Locked").slice(0, 4).map((item) => ({
      title: `${item.name} lock status needed`,
      detail: "Final schedule items should be final locked.",
      view: "awardsRundown"
    })),
    ...packets.filter((packet) => packet.status !== "Ready").slice(0, 4).map((packet) => ({
      title: `${packet.name} packet not ready`,
      detail: `${packet.readyCount}/${packet.totalCount} readiness checks complete.`,
      view: "awardsDocuments"
    })),
    ...departments.filter((department) => department.status !== "Ready").slice(0, 4).map((department) => ({
      title: `${department.name} department readiness`,
      detail: `${department.readyCount}/${department.totalCount} checks complete across docs, distro, staffing, credentials, and schedule.`,
      view: "awardsStaffing"
    })),
    ...distribution.filter((group) => group.status !== "Ready").slice(0, 4).map((group) => ({
      title: `${group.name} distro needs review`,
      detail: `${group.sentCount}/${group.docCount} documents ready to send or distributed.`,
      view: "awardsDocuments"
    })),
    ...access.filter((scope) => scope.status === "Needs Review").slice(0, 3).map((scope) => ({
      title: `${scope.scope} access needs review`,
      detail: `${scope.docCount} documents in this access lane.`,
      view: "awardsDocuments"
    })),
    ...showDay.filter((show) => show.status !== "Ready").slice(0, 3).map((show) => ({
      title: `${show.name} show-day readiness`,
      detail: `${show.readyCount}/${show.totalCount} show-day checks complete.`,
      view: "awardsRundown"
    })),
    ...contacts.filter((person) => person.status !== "Ready").slice(0, 3).map((person) => ({
      title: `${person.name} contact readiness`,
      detail: `${person.readyCount}/${person.totalCount} contact checks complete.`,
      view: "awardsStaffing"
    })),
    ...compliance.filter((lane) => lane.status !== "Ready").slice(0, 3).map((lane) => ({
      title: `${lane.name} readiness`,
      detail: `${lane.readyCount}/${lane.totalCount} compliance checks complete.`,
      view: "awardsDocuments"
    })),
    ...versions.filter((lane) => lane.status !== "Ready").slice(0, 3).map((lane) => ({
      title: `${lane.type} version control`,
      detail: `${lane.readyCount}/${lane.totalCount} version checks complete.`,
      view: "awardsDocuments"
    })),
    ...technical.filter((lane) => lane.status !== "Ready").slice(0, 3).map((lane) => ({
      title: `${lane.name} technical packet`,
      detail: `${lane.readyCount}/${lane.totalCount} technical checks complete.`,
      view: "awardsDocuments"
    })),
    ...talent.filter((lane) => lane.status !== "Ready").slice(0, 2).map((lane) => ({
      title: `${lane.name} readiness`,
      detail: `${lane.readyCount}/${lane.totalCount} talent/VIP checks complete.`,
      view: "awardsDocuments"
    })),
    ...staffing.filter((person) => person.status !== "Ready").slice(0, 4).map((person) => ({
      title: `${person.name} contact info needed`,
      detail: `${person.department || "Production"} - ${person.status || "Needs Review"}`,
      view: "awardsStaffing"
    })),
    ...staffing.filter((person) => person.source && ["Confirmed", "Ready"].includes(person.status) && !["Approved", "Issued"].includes(person.credentialStatus)).slice(0, 4).map((person) => ({
      title: `${person.name} credential needs review`,
      detail: `${person.credentialStatus || "Not Started"} - ${person.credentialZone || "Zone TBD"}`,
      view: "awardsStaffing"
    }))
  ].slice(0, 8);
}

function awardsAttentionNotificationId(item = {}) {
  const key = `${item.title || ""}|${item.detail || ""}|${item.view || "awardsDashboard"}`;
  return `awards-attention-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 96) || "item"}`;
}

function awardsAttentionNotificationRecipients() {
  const clientId = cloudClientId() || activeClientRecord()?.id || "";
  const reps = state.clientReps.filter((rep) => {
    if (clientId && rep.clientId !== clientId) return false;
    const levels = ensureClientRepAccessLevels(rep.accessLevels, "CLIENT_REP");
    return levels.includes("CLIENT_ADMIN") || levels.includes("CLIENT_REP_LEAD");
  });
  const recipients = reps
    .map((rep) => sendbirdUserIdForProfile({ authUserId: rep.authUserId || rep.id || rep.email }))
    .filter(Boolean);
  const current = sendbirdUserIdForProfile({ authUserId: authState.user?.id || activeClientRepRecord()?.id || authState.user?.email });
  return Array.from(new Set(recipients.length ? recipients : [current].filter(Boolean)));
}

async function ensureAwardsAttentionNotifications(attention = []) {
  if (!authState.session || !canEditAwardsRecords()) return;
  const actionable = attention.slice(0, 6);
  const signature = actionable.map((item) => `${item.title}|${item.detail}|${item.view}`).join("::");
  const hasUnreadAwardsNotices = state.appNotifications.some((notification) => notification.type === "awards" && !notification.readAt);
  if (state.awardsAttentionNotificationSignature === signature && !hasUnreadAwardsNotices) return;
  state.awardsAttentionNotificationSignature = signature;
  const recipientIds = awardsAttentionNotificationRecipients();
  if (!recipientIds.length) return;
  const activeIds = new Set(actionable.map(awardsAttentionNotificationId));
  const clientId = cloudClientId() || activeClientRecord()?.id || "";
  let changed = false;
  for (const item of actionable) {
    const id = awardsAttentionNotificationId(item);
    const existing = state.appNotifications.find((notification) => notification.id === id);
    const next = {
      ...(existing || {}),
      id,
      title: item.title,
      body: item.detail || "Awards / Live Broadcast item needs review.",
      type: "awards",
      viewId: item.view || "awardsDashboard",
      recordId: item.recordId || "",
      recipientIds,
      clientId
    };
    if (existing && existing.title === next.title && existing.body === next.body && existing.viewId === next.viewId) continue;
    await put("appNotifications", next);
    syncAppNotificationToSupabase(next).catch((error) => console.warn("Awards notification cloud sync failed", error));
    state.appNotifications = [next, ...state.appNotifications.filter((notification) => notification.id !== id)]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    changed = true;
  }
  const now = new Date().toISOString();
  for (const notification of state.appNotifications.filter((item) => item.type === "awards" && !activeIds.has(item.id) && !item.readAt)) {
    const updated = { ...notification, readAt: now };
    await put("appNotifications", updated);
    syncAppNotificationToSupabase(updated).catch((error) => console.warn("Awards notification cleanup sync failed", error));
    state.appNotifications = state.appNotifications.map((item) => item.id === updated.id ? updated : item);
    changed = true;
  }
  if (changed) renderNotificationSurfaces();
}

function renderAwardsDashboard(shows, documents, staffing, schedules, attention, packets = [], departments = [], distribution = [], access = [], showDay = [], contacts = [], compliance = [], versions = [], technical = [], talent = []) {
  const client = activeClientRecord();
  const enabled = awardsSuiteEnabled(client);
  $("#awardsHeroTitle").textContent = client?.name ? `${client.name} Broadcast` : "Broadcast Operations";
  $("#awardsHeroCopy").textContent = enabled
    ? "Awards / Broadcast is active for this client. Manage show documents, rundowns, staff lists, plots, scripts, and production readiness here."
    : "Awards / Broadcast is ready to enable. Preview the suite structure here, then turn it on from the client's Office Suites when this account is ready.";
  $("#awardsHeroStats").innerHTML = [
    ["Shows", shows.length, "awardsDocuments"],
    ["Documents", documents.length, "awardsDocuments"],
    ["Schedule", schedules.length, "awardsRundown"],
    ["Staffing", staffing.length, "awardsStaffing"],
    ["Ready Packets", packets.filter((packet) => packet.status === "Ready").length, "awardsDashboard"]
  ].map(([label, value, view]) => `<button class="touring-stat" data-dashboard-link="${escapeHtml(view)}" type="button"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></button>`).join("");
  $("#awardsAttentionCount").textContent = `${attention.length} open`;
  $("#awardsAttentionList").innerHTML = attention.length
    ? attention.map((item) => `<button class="compact-item touring-attention-item" data-dashboard-link="${escapeHtml(item.view)}" type="button"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></button>`).join("")
    : `<div class="compact-item empty"><strong>No urgent broadcast items</strong><p>Stage Intelligence checks will surface missing rundowns, plots, scripts, and staff details here.</p></div>`;
  $("#awardsFlowList").innerHTML = [
    ["Documents", "Rundowns, schedules, staff lists, plots, scripts, quickies, and safety packets."],
    ["Rundown", "Current versions and show-control docs that need clear status."],
    ["Staffing", "Staff lists, departments, contact readiness, credentials, and production office contacts."],
    ["Settings", "Broadcast defaults, distro rules, restricted files, and notification rules."]
  ].map(([title, detail], index) => `<div class="touring-flow-step"><span>${index + 1}</span><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></div>`).join("");
  $("#awardsPacketCount").textContent = `${packets.filter((packet) => packet.status === "Ready").length}/${packets.length} ready`;
  $("#awardsPacketList").innerHTML = packets.length
    ? packets.map((packet) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsDocuments" type="button">
      <span class="suite-kicker">${escapeHtml(packet.status)}</span>
      <h4>${escapeHtml(packet.name || "Broadcast Show")}</h4>
      <p>${escapeHtml(`${packet.readyCount}/${packet.totalCount} readiness checks complete`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Core Docs", !packet.missingDocs.length],
          ["Current", packet.docsReady.split("/")[0] === packet.docsReady.split("/")[1]],
          ["Distro", packet.distroReady.split("/")[0] === packet.distroReady.split("/")[1]],
          ["Staff", packet.staffing === "Confirmed"],
          ["Credentials", packet.credentials === "Ready"],
          ["Schedule", packet.schedule === "Ready"],
          ["Restricted", packet.redacted === "Ready"]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${packet.missingDocs.length ? `Missing docs: ${escapeHtml(packet.missingDocs.join(", "))}` : `Locked schedule items: ${escapeHtml(packet.lockedItems)}`}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No show packet yet</strong><p>Add a broadcast show to track packet readiness.</p></div>`;
  const readyDepartments = departments.filter((department) => department.status === "Ready").length;
  $("#awardsDepartmentCount").textContent = `${readyDepartments}/${departments.length} ready`;
  $("#awardsDepartmentList").innerHTML = departments.length
    ? departments.map((department) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsStaffing" type="button">
      <span class="suite-kicker">${escapeHtml(department.status)}</span>
      <h4>${escapeHtml(department.name)}</h4>
      <p>${escapeHtml(`${department.readyCount}/${department.totalCount} readiness checks complete`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Docs", department.docsReady],
          ["Distro", department.distroReady],
          ["Staff", department.staffReady],
          ["Credentials", department.credentialsReady],
          ["Schedule", department.scheduleReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${escapeHtml(`${department.docCount} docs / ${department.staffCount} staff / ${department.scheduleCount} schedule items`)}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No departments yet</strong><p>Add documents, staff, or schedule items to build department readiness.</p></div>`;
  const readyDistribution = distribution.filter((group) => group.status === "Ready").length;
  $("#awardsDistributionCount").textContent = `${readyDistribution}/${distribution.length} ready`;
  $("#awardsDistributionList").innerHTML = distribution.length
    ? distribution.map((group) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsDocuments" type="button">
      <span class="suite-kicker">${escapeHtml(group.status)}</span>
      <h4>${escapeHtml(group.name)}</h4>
      <p>${escapeHtml(`${group.sentCount}/${group.docCount} documents ready or distributed`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Delivery", group.deliveryReady],
          ["Restricted", group.restrictedReady],
          ["Distro Date", group.datesReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${group.pendingDocs.length ? `Pending: ${escapeHtml(group.pendingDocs.join(", "))}` : `Restricted docs: ${escapeHtml(group.restrictedCount)}`}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No distro groups yet</strong><p>Add broadcast documents to track distribution readiness.</p></div>`;
  const activeAccess = access.filter((scope) => scope.docCount > 0);
  const readyAccess = activeAccess.filter((scope) => scope.status === "Ready").length;
  $("#awardsAccessCount").textContent = `${readyAccess}/${activeAccess.length} active ready`;
  $("#awardsAccessList").innerHTML = access.length
    ? access.map((scope) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsDocuments" type="button">
      <span class="suite-kicker">${escapeHtml(scope.status)}</span>
      <h4>${escapeHtml(scope.scope)}</h4>
      <p>${escapeHtml(`${scope.docCount} documents / ${scope.restrictedCount} restricted`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Delivery", scope.deliveryReady],
          ["Access", scope.accessClean]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${scope.examples.length ? `Examples: ${escapeHtml(scope.examples.join(", "))}` : "No documents in this lane yet."}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No access lanes yet</strong><p>Add broadcast documents to track sensitive and public access readiness.</p></div>`;
  const readyShowDays = showDay.filter((show) => show.status === "Ready").length;
  $("#awardsShowDayCount").textContent = `${readyShowDays}/${showDay.length} ready`;
  $("#awardsShowDayList").innerHTML = showDay.length
    ? showDay.map((show) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsRundown" type="button">
      <span class="suite-kicker">${escapeHtml(show.status)}</span>
      <h4>${escapeHtml(show.name)}</h4>
      <p>${escapeHtml(`${show.readyCount}/${show.totalCount} show-day checks complete`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Timing", show.timingReady],
          ["Location", show.locationReady],
          ["Owner", show.ownerReady],
          ["Final", show.finalReady],
          ["Locked", show.lockedReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${show.nextItems.length ? `Schedule: ${escapeHtml(show.nextItems.join(", "))}` : "No show-day schedule items yet."}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No show-day records yet</strong><p>Add schedule items to track live-day readiness.</p></div>`;
  const readyContacts = contacts.filter((person) => person.status === "Ready").length;
  $("#awardsContactCount").textContent = `${readyContacts}/${contacts.length} ready`;
  $("#awardsContactList").innerHTML = contacts.length
    ? contacts.map((person) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsStaffing" type="button">
      <span class="suite-kicker">${escapeHtml(person.status)}</span>
      <h4>${escapeHtml(person.name)}</h4>
      <p>${escapeHtml([person.department, person.title].filter(Boolean).join(" / ") || "Production Office")}</p>
      <div class="touring-card-sections">
        ${[
          ["Phone", person.phoneReady],
          ["Email", person.emailReady],
          ["Credential", person.credentialReady],
          ["Check-In", person.checkInReady],
          ["Confirmed", person.statusReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${escapeHtml(`${person.credentialZone} / ${person.checkInLocation}`)}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No production contacts yet</strong><p>Add broadcast staffing records to track production office contact readiness.</p></div>`;
  const readyCompliance = compliance.filter((lane) => lane.status === "Ready").length;
  $("#awardsComplianceCount").textContent = `${readyCompliance}/${compliance.length} ready`;
  $("#awardsComplianceList").innerHTML = compliance.length
    ? compliance.map((lane) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsDocuments" type="button">
      <span class="suite-kicker">${escapeHtml(lane.status)}</span>
      <h4>${escapeHtml(lane.name)}</h4>
      <p>${escapeHtml(`${lane.readyDocCount}/${lane.docCount} documents ready`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Docs", lane.hasDocs],
          ["Ready", lane.docsReady],
          ["Delivery", lane.deliveryReady],
          ["Access", lane.accessReady],
          ["Current", lane.currentReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${lane.examples.length ? `Documents: ${escapeHtml(lane.examples.join(", "))}` : "No documents in this lane yet."}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No compliance lanes yet</strong><p>Add start paperwork and safety documents to track readiness.</p></div>`;
  const readyVersions = versions.filter((lane) => lane.status === "Ready").length;
  $("#awardsVersionCount").textContent = `${readyVersions}/${versions.length} ready`;
  $("#awardsVersionList").innerHTML = versions.length
    ? versions.map((lane) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsDocuments" type="button">
      <span class="suite-kicker">${escapeHtml(lane.status)}</span>
      <h4>${escapeHtml(lane.type)}</h4>
      <p>${escapeHtml(`${lane.currentCount}/${lane.docCount} current documents`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Docs", lane.hasDocs],
          ["Current", lane.currentReady],
          ["Approved", lane.approvalReady],
          ["Distro", lane.distroReady],
          ["Access", lane.accessReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${lane.examples.length ? `Versions: ${escapeHtml(lane.examples.join(", "))}` : "No documents in this lane yet."}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No version lanes yet</strong><p>Add rundowns, scripts, schedules, quickies, and plots to track versions.</p></div>`;
  const readyTechnical = technical.filter((lane) => lane.status === "Ready").length;
  $("#awardsTechnicalCount").textContent = `${readyTechnical}/${technical.length} ready`;
  $("#awardsTechnicalList").innerHTML = technical.length
    ? technical.map((lane) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsDocuments" type="button">
      <span class="suite-kicker">${escapeHtml(lane.status)}</span>
      <h4>${escapeHtml(lane.name)}</h4>
      <p>${escapeHtml(`${lane.currentCount}/${lane.docCount} current documents`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Docs", lane.hasDocs],
          ["Current", lane.currentReady],
          ["Ready", lane.docsReady],
          ["Distro", lane.distroReady],
          ["Access", lane.accessReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${lane.examples.length ? `Packets: ${escapeHtml(lane.examples.join(", "))}` : "No technical documents in this lane yet."}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No technical lanes yet</strong><p>Add stage, venue, broadcast, camera, and power docs to track technical readiness.</p></div>`;
  const readyTalent = talent.filter((lane) => lane.status === "Ready").length;
  $("#awardsTalentCount").textContent = `${readyTalent}/${talent.length} ready`;
  $("#awardsTalentList").innerHTML = talent.length
    ? talent.map((lane) => `<button class="touring-card touring-readiness-card" data-dashboard-link="awardsDocuments" type="button">
      <span class="suite-kicker">${escapeHtml(lane.status)}</span>
      <h4>${escapeHtml(lane.name)}</h4>
      <p>${escapeHtml(`${lane.docCount} docs / ${lane.staffCount} contacts / ${lane.scheduleCount} calls`)}</p>
      <div class="touring-card-sections">
        ${[
          ["Script", lane.scriptReady],
          ["Public Copy", lane.publicReady],
          ["Contacts", lane.contactReady],
          ["Credentials", lane.credentialReady],
          ["Calls", lane.scheduleReady]
        ].map(([label, ready]) => `<span class="${ready ? "is-ready" : ""}">${escapeHtml(label)}</span>`).join("")}
      </div>
      <p>${lane.examples.length ? `Items: ${escapeHtml(lane.examples.join(", "))}` : "No talent or VIP records detected yet."}</p>
    </button>`).join("")
    : `<div class="compact-item empty"><strong>No talent lanes yet</strong><p>Add talent, presenter, VIP, or script records to track readiness.</p></div>`;
}

function renderAwardsDocuments(shows, documents) {
  const editing = touringGridEditing("awardsDocuments");
  touringGridToolbar("awardsDocuments");
  const rows = sortTouringRows("awardsDocuments", filterTouringRows("awardsDocuments", [
    ...shows.map((show) => ({ ...show, kind: "Show" })),
    ...documents.map((doc) => ({ ...doc, kind: "Document" }))
  ]));
  $("#awardsDocumentsCount").textContent = `${shows.length} shows / ${documents.length} docs`;
  $("#awardsDocumentsList").innerHTML = `${awardsBulkToolbar("awardsDocuments", rows)}<div class="table-wrap premium-grid-wrap touring-document-grid"><table>
    <thead><tr>${awardsBulkHead("awardsDocuments", TOURING_COLUMNS.awardsDocuments)}</tr></thead>
    <tbody>${rows.map((row) => {
      const isShow = row.kind === "Show";
      const storeName = isShow ? "awardsShows" : "awardsDocuments";
      const formId = isShow ? "awardsShowForm" : "awardsDocumentForm";
      return `<tr>
        ${awardsBulkCell("awardsDocuments", row)}
        <td>${editing && row.source ? touringGridInput(storeName, row.id, "name", row.source.name || row.name) : `<strong>${row.source ? recordLink(storeName, row.id, row.name) : escapeHtml(row.name)}</strong><p>${escapeHtml(isShow ? ([formatDate(row.showDate), row.venue].filter(Boolean).join(" - ") || "Show details pending.") : (row.showName || "Show TBD"))}</p>`}</td>
        <td>${editing && row.source ? (isShow ? touringGridSelect(storeName, row.id, "status", row.status, ["Pre-Production", "Rehearsal", "Show Day", "Wrapped"]) : touringGridSelect(storeName, row.id, "type", row.type, ["Rundown", "Quickie", "Schedule", "Staff List", "Plot", "Script", "Health & Safety", "Start Paperwork", "Other"])) : `<span class="suite-kicker">${escapeHtml(isShow ? "Show" : row.type)}</span>`}</td>
        <td>${editing && row.source ? (isShow ? touringGridInput(storeName, row.id, "showDate", row.showDate || "", "date") : `${touringGridInput(storeName, row.id, "versionLabel", row.versionLabel || "")}${touringGridSelect(storeName, row.id, "status", row.status, ["Draft", "Received", "In Review", "Ready", "Distributed", "Final"])}${touringGridSelect(storeName, row.id, "currentVersion", row.currentVersion || "", ["", "yes", "no"])}`) : `<span class="status-pill ${["Final", "Distributed", "Ready", "Template Ready"].includes(row.status) ? "" : "warn"}">${escapeHtml([row.versionLabel, row.status].filter(Boolean).join(" / ") || row.status)}</span><p>${escapeHtml(row.currentVersion === "yes" ? "Current" : row.currentVersion === "no" ? "Superseded" : "")}</p>`}</td>
        <td>${editing && row.source ? (isShow ? touringGridInput(storeName, row.id, "productionLead", row.productionLead || "") : touringGridInput(storeName, row.id, "department", row.department || "")) : escapeHtml(row.productionLead || row.department || "Production")}</td>
        <td>${editing && row.source && !isShow ? `${touringGridInput(storeName, row.id, "distributionGroup", row.distributionGroup || "")}${touringGridSelect(storeName, row.id, "restrictedAccess", row.restrictedAccess || "", ["", "yes", "no"])}` : escapeHtml(isShow ? "Show record" : [row.distributionGroup, row.restrictedAccess === "yes" ? "Restricted" : ""].filter(Boolean).join(" / ") || "Production")}</td>
        <td>${editing && row.source && !isShow ? `${touringGridSelect(storeName, row.id, "deliveryStatus", row.deliveryStatus || "Not Sent", ["Not Sent", "Ready to Send", "Distributed", "Redacted Copy Needed"])}${touringGridInput(storeName, row.id, "distributionDate", row.distributionDate || "", "date")}${touringGridSelect(storeName, row.id, "accessScope", row.accessScope || "Production Only", ["Production Only", "Department Heads", "All Staff", "Public / Redacted", "Restricted"])}` : escapeHtml(isShow ? "Show record" : [row.deliveryStatus, formatDate(row.distributionDate), row.accessScope].filter(Boolean).join(" / ") || "Not Sent")}</td>
        <td>${editing && row.source ? touringGridTextarea(storeName, row.id, "notes", row.notes || "") : escapeHtml(row.notes || (isShow ? "Show record." : "Broadcast document lane."))}</td>
        <td>${row.source && !editing ? actionButtons(storeName, row.id, formId, "", canEditAwardsRecords()) : ""}</td>
      </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function renderAwardsRundown(documents, schedules) {
  const editing = touringGridEditing("awardsRundown");
  touringGridToolbar("awardsRundown");
  const rows = documents.filter((doc) => ["Rundown", "Quickie", "Schedule", "Script", "Plot", "Plots"].includes(doc.type));
  $("#awardsRundownCount").textContent = `${rows.length} docs / ${schedules.length} schedule`;
  const displayRows = sortTouringRows("awardsRundown", filterTouringRows("awardsRundown", [
    ...schedules.map((item) => ({ ...item, kind: "Schedule" })),
    ...rows.map((doc) => ({ ...doc, kind: "Document" }))
  ]));
  $("#awardsRundownList").innerHTML = `${awardsBulkToolbar("awardsRundown", displayRows)}<div class="table-wrap premium-grid-wrap touring-document-grid"><table>
    <thead><tr>${awardsBulkHead("awardsRundown", TOURING_COLUMNS.awardsRundown)}</tr></thead>
    <tbody>${displayRows.map((row) => {
      const isSchedule = row.kind === "Schedule";
      const storeName = isSchedule ? "awardsSchedules" : "awardsDocuments";
      const formId = isSchedule ? "awardsScheduleForm" : "awardsDocumentForm";
      return `<tr>
        ${awardsBulkCell("awardsRundown", row)}
        <td>${editing && row.source ? `${touringGridInput(storeName, row.id, "name", row.name || "")}${isSchedule ? touringGridSelect(storeName, row.id, "callType", row.callType || "Production", ["Production", "Rehearsal", "Talent", "Camera / Broadcast", "Show", "Wrap"]) : ""}` : `<strong>${row.source ? recordLink(storeName, row.id, row.name) : escapeHtml(row.name)}</strong><p>${escapeHtml(isSchedule ? `${row.callType || "Schedule"} - ${row.showName || "Broadcast"}` : (row.showName || row.type || "Broadcast"))}</p>`}</td>
        <td>${editing && row.source && isSchedule ? `${touringGridInput(storeName, row.id, "callDate", row.callDate || "", "date")}${touringGridInput(storeName, row.id, "callTime", row.callTime || "", "time")}` : escapeHtml(isSchedule ? ([formatDate(row.callDate), row.callTime].filter(Boolean).join(" at ") || "Timing TBD") : row.type)}</td>
        <td>${editing && row.source ? (isSchedule ? `${touringGridSelect(storeName, row.id, "status", row.status, ["Draft", "Needs Review", "Ready", "Final"])}${touringGridSelect(storeName, row.id, "lockStatus", row.lockStatus || "Open", ["Open", "Locked", "Final Locked"])}` : `${touringGridInput(storeName, row.id, "versionLabel", row.versionLabel || "")}${touringGridSelect(storeName, row.id, "status", row.status, ["Draft", "Received", "In Review", "Ready", "Distributed", "Final"])}${touringGridSelect(storeName, row.id, "currentVersion", row.currentVersion || "", ["", "yes", "no"])}`) : `<span class="status-pill ${["Final", "Ready", "Distributed"].includes(row.status) ? "" : "warn"}">${escapeHtml(isSchedule ? [row.status, row.lockStatus].filter(Boolean).join(" / ") : ([row.versionLabel, row.status].filter(Boolean).join(" / ") || row.status))}</span>`}</td>
        <td>${editing && row.source ? `${touringGridInput(storeName, row.id, "department", row.department || "")}${isSchedule ? touringGridInput(storeName, row.id, "owner", row.owner || "") : ""}` : escapeHtml(isSchedule ? [row.department, row.owner].filter(Boolean).join(" / ") || "Production" : row.department || "Production")}</td>
        <td>${editing && row.source && isSchedule ? touringGridInput(storeName, row.id, "location", row.location || "") : escapeHtml(isSchedule ? row.location || "Location TBD" : "")}</td>
        <td>${editing && row.source ? touringGridTextarea(storeName, row.id, "notes", row.notes || "") : escapeHtml(row.notes || "Track version, distro, and approval state here.")}</td>
        <td>${row.source && !editing ? actionButtons(storeName, row.id, formId, "", canEditAwardsRecords()) : ""}</td>
      </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function renderAwardsStaffing(staffing) {
  const editing = touringGridEditing("awardsStaffing");
  touringGridToolbar("awardsStaffing");
  const rows = sortTouringRows("awardsStaffing", filterTouringRows("awardsStaffing", [...staffing]));
  $("#awardsStaffingCount").textContent = `${staffing.length} people`;
  $("#awardsStaffingList").innerHTML = `${awardsBulkToolbar("awardsStaffing", rows)}<div class="table-wrap premium-grid-wrap touring-document-grid"><table>
    <thead><tr>${awardsBulkHead("awardsStaffing", TOURING_COLUMNS.awardsStaffing)}</tr></thead>
    <tbody>${rows.map((person) => `<tr>
      ${awardsBulkCell("awardsStaffing", person)}
      <td>${editing && person.source ? touringGridInput("awardsStaff", person.id, "name", person.name || "") : `<strong>${person.source ? recordLink("awardsStaff", person.id, person.name) : escapeHtml(person.name || "Staff Member")}</strong><p>${escapeHtml(person.title || "Broadcast staff")}</p>`}</td>
      <td>${editing && person.source ? `${touringGridInput("awardsStaff", person.id, "department", person.department || "")}${touringGridInput("awardsStaff", person.id, "title", person.title || "")}` : escapeHtml(person.department || "Production")}</td>
      <td>${editing && person.source ? `${touringGridInput("awardsStaff", person.id, "phone", person.phone || "", "tel")}${touringGridInput("awardsStaff", person.id, "email", person.email || "", "email")}` : `${escapeHtml(person.phone || "Phone missing")}<p>${escapeHtml(person.email || "Email missing")}</p>`}</td>
      <td>${editing && person.source ? touringGridSelect("awardsStaff", person.id, "status", person.status || "Needs Contact", ["Needs Contact", "Invited", "Confirmed", "Ready"]) : `<span class="status-pill ${person.status === "Ready" ? "" : "warn"}">${escapeHtml(person.status || "Needs Review")}</span>`}</td>
      <td>${editing && person.source ? `${touringGridSelect("awardsStaff", person.id, "credentialStatus", person.credentialStatus || "Not Started", ["Not Started", "Requested", "Approved", "Issued"])}${touringGridInput("awardsStaff", person.id, "credentialZone", person.credentialZone || "")}${touringGridInput("awardsStaff", person.id, "checkInLocation", person.checkInLocation || "")}` : `${escapeHtml(person.credentialStatus || "Not Started")}<p>${escapeHtml([person.credentialZone, person.checkInLocation].filter(Boolean).join(" / ") || "Credential details TBD")}</p>`}</td>
      <td>${editing && person.source ? touringGridTextarea("awardsStaff", person.id, "notes", person.notes || "") : escapeHtml(person.notes || "Staff readiness record.")}</td>
      <td>${person.source && !editing ? actionButtons("awardsStaff", person.id, "awardsStaffForm", "", canEditAwardsRecords()) : ""}</td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function renderAwardsSettings() {
  $("#awardsSettingsList").innerHTML = [
    ["Document Types", "Rundown, quickie, schedule, staff list, plots, script, health and safety, and start paperwork."],
    ["Version Control", "Stage Intelligence should identify current, draft, final, distributed, and superseded files."],
    ["Distro Rules", "Future rules can decide who receives mimeo, staff lists, plots, scripts, or redacted views."],
    ["Sensitive Access", "Credentials, start paperwork, payroll details, and restricted broadcast documents need tight access controls."],
    ["Department Readiness", "Stage Intelligence checks each department across documents, distro, staffing, credentials, and schedule."],
    ["Distribution Readiness", "Distro groups can be checked for delivery status, sent dates, and restricted/redacted access paths."],
    ["Access Readiness", "Restricted, redacted, department, all-staff, and production-only documents are checked as separate access lanes."],
    ["Show-Day Readiness", "Live-day checks track timing, locations, owners, final schedule status, and locked show calls."],
    ["Production Office Contacts", "Key contacts are checked for phone, email, credential zone, check-in location, and confirmed status."],
    ["Start Paperwork Readiness", "Start paperwork, safety, and restricted onboarding documents are checked for readiness and delivery."],
    ["Rundown Version Control", "Rundowns, scripts, quickies, schedules, and plots are checked for current, approved, distributed, and access-ready versions."],
    ["Technical Packet Readiness", "Stage plots, venue plots, broadcast/camera notes, and power or technical packets are checked as live production lanes."],
    ["Talent / VIP Readiness", "Talent calls, presenter scripts, VIP-facing access, credentials, and contact paths are checked as show-critical lanes."],
    ["Bulk Operations", "Awards teams can select visible rows and update document delivery, current versions, schedule locks, staff status, and credentials in groups."],
    ["Access Boundaries", "Client-side roles manage restricted broadcast records; promoter and production views see scoped, non-restricted show records."],
    ["Notification Routing", "Open Awards readiness items create stable client-side notifications and clear themselves when the item is resolved."]
  ].map(([title, detail]) => `<article class="touring-card"><h4>${escapeHtml(title)}</h4><p>${escapeHtml(detail)}</p></article>`).join("");
}

function openAwardsDocumentProfile(record) {
  readOnlyProfileCard(record.name || "Broadcast Document", record.type || "Document", [], [
    ["Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
  ], "", [
    ["Document", [
      ["Show / Event", record.showName],
      ["Type", record.type],
      ["Status", record.status],
      ["Version", record.versionLabel],
      ["Current", record.currentVersion === "yes" ? "Current" : record.currentVersion === "no" ? "Superseded" : "Needs review"],
      ["Department", record.department],
      ["Distro Group", record.distributionGroup],
      ["Access", record.restrictedAccess === "yes" ? "Restricted" : "Standard"]
    ]],
    ["Distribution", [
      ["Delivery Status", record.deliveryStatus],
      ["Distribution Date", formatDate(record.distributionDate)],
      ["Access Scope", record.accessScope]
    ]],
    ["Delivery", [
      ["Link", record.link],
      ["Created", formatDateWithYear(record.createdAt)],
      ["Updated", formatDateWithYear(record.updatedAt)]
    ]]
  ]);
}

function openAwardsShowProfile(record) {
  readOnlyProfileCard(record.name || "Broadcast Show", record.status || "Show", [], [
    ["Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
  ], "", [
    ["Show", [
      ["Show Date", formatDate(record.showDate)],
      ["Venue", record.venue],
      ["Status", record.status]
    ]],
    ["Production", [
      ["Production Lead", record.productionLead],
      ["Created", formatDateWithYear(record.createdAt)],
      ["Updated", formatDateWithYear(record.updatedAt)]
    ]]
  ]);
}

function openAwardsStaffProfile(record) {
  readOnlyProfileCard(record.name || "Broadcast Staff", record.title || record.department || "Production", [], [
    ["Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
  ], "", [
    ["Staff", [
      ["Department", record.department],
      ["Title / Role", record.title],
      ["Status", record.status]
    ]],
    ["Credentials", [
      ["Credential Status", record.credentialStatus],
      ["Access Zone", record.credentialZone],
      ["Check-in Location", record.checkInLocation]
    ]],
    ["Contact", [
      ["Phone", record.phone],
      ["Email", record.email]
    ]]
  ]);
}

function openAwardsScheduleProfile(record) {
  readOnlyProfileCard(record.name || "Schedule Item", record.showName || "Broadcast Schedule", [], [
    ["Notes", noteSectionText(record.notes, record.updatedAt || record.createdAt)]
  ], "", [
    ["Schedule", [
      ["Show / Event", record.showName],
      ["Date", formatDate(record.callDate)],
      ["Call Time", record.callTime],
      ["Call Type", record.callType],
      ["Location", record.location],
      ["Department", record.department],
      ["Owner", record.owner],
      ["Status", record.status],
      ["Lock Status", record.lockStatus]
    ]]
  ]);
}

function assignmentPayLine(assignment, event) {
  return `${currency(assignment.dayRate || event.dayRate || activeClientRecord()?.defaultDayRate || 0)}/${assignment.includedHours || event.includedHours || activeClientRecord()?.defaultIncludedHours || 10} hrs, +${currency(assignment.additionalRate || event.additionalRate || activeClientRecord()?.defaultAdditionalRate || 0)}/hr`;
}

function assignmentRoleLine(assignment = {}) {
  return [assignment.department, assignment.position].filter(Boolean).join(" / ") || "Staffing assignment";
}

function assignmentWorkDateLabel(assignment = {}, event = {}) {
  const value = assignment.workDate || String(assignment.startDate || event.startDate || "").slice(0, 10);
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

function assignmentCallLocation(assignment = {}, event = {}) {
  const venue = getVenue(event?.venueId);
  return assignment.callLocation || venue?.address || "";
}

function assignmentParkingDetails(event = {}) {
  const venue = getVenue(event?.venueId);
  return venue?.parking || "";
}

function assignmentDepartments() {
  const saved = JSON.parse(localStorage.getItem(ASSIGNMENT_DEPARTMENT_KEY) || "[]");
  const fromAssignments = state.eventAssignments.map((assignment) => assignment.department).filter(Boolean);
  return Array.from(new Set([...DEFAULT_ASSIGNMENT_DEPARTMENTS, ...saved, ...fromAssignments].map((item) => String(item || "").trim()).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b));
}

function saveAssignmentDepartment(name) {
  const clean = String(name || "").trim();
  if (!clean) return "";
  const saved = JSON.parse(localStorage.getItem(ASSIGNMENT_DEPARTMENT_KEY) || "[]");
  localStorage.setItem(ASSIGNMENT_DEPARTMENT_KEY, JSON.stringify(Array.from(new Set([...saved, clean])).sort((a, b) => a.localeCompare(b))));
  return clean;
}

function saveAssignmentDepartmentForm(event) {
  event.preventDefault();
  const name = event.currentTarget.elements.departmentName.value;
  const department = saveAssignmentDepartment(name);
  if (!department) {
    toast("Enter a department name.");
    return;
  }
  closeForm("assignmentDepartmentForm");
  openForm("eventAssignmentForm");
  renderAssignmentDepartmentOptions(department);
  const select = $("#eventAssignmentForm select[name='department']");
  if (select) {
    select.value = department;
    select.focus();
  }
  toast("Department added.");
}

function renderAssignmentDepartmentOptions(selected = "") {
  const select = $("#eventAssignmentForm select[name='department']");
  if (!select) return;
  const departments = assignmentDepartments();
  const cleanSelected = selected || select.value || "Production Office";
  if (cleanSelected && !departments.includes(cleanSelected)) departments.push(cleanSelected);
  select.innerHTML = departments
    .sort((a, b) => a.localeCompare(b))
    .map((department) => `<option value="${escapeHtml(department)}">${escapeHtml(department)}</option>`)
    .join("") + `<option value="__add_department__">+ Add department...</option>`;
  select.value = departments.includes(cleanSelected) ? cleanSelected : "Production Office";
}

function updateAssignmentScheduleFields(form = $("#eventAssignmentForm")) {
  if (!form) return;
  const hasWrap = form.elements.hasWrapTime?.checked || !!form.elements.endDate?.value;
  if (form.elements.hasWrapTime) form.elements.hasWrapTime.checked = hasWrap;
  form.querySelectorAll(".wrap-time-field").forEach((field) => {
    field.hidden = !hasWrap;
  });
  if (!hasWrap && form.elements.endDate) form.elements.endDate.value = "";
}

function updateAssignmentLocationFields(form = $("#eventAssignmentForm")) {
  if (!form) return;
  const eventRecord = getEvent(form.elements.eventId?.value || "");
  const venue = getVenue(eventRecord?.venueId);
  if (form.elements.locationType?.value === "Venue" && venue && !form.elements.callLocation.value) {
    form.elements.callLocation.value = [venue.name, venue.address, venue.parking ? `Parking: ${venue.parking}` : ""].filter(Boolean).join("\n");
  }
}

function assignmentTable(event) {
  const assignments = eventAssignments(event.id);
  if (!assignments.length) return `<p>No detailed runner assignments yet.</p>`;
  return `<div class="event-assignment-list">${assignments.map((assignment) => {
    const worker = getWorker(assignment.workerId);
    const actions = canAdminEdit()
      ? `<div class="row-actions"><button class="tiny-button" data-edit="eventAssignments" data-id="${assignment.id}" data-form="eventAssignmentForm" type="button">Edit</button><button class="tiny-button danger" data-delete="eventAssignments" data-id="${assignment.id}" type="button">Delete</button></div>`
      : "";
    return `<div class="event-assignment-row">
      <div class="event-assignment-main">
        <button class="link-button" data-view-event-assignment="${escapeHtml(assignment.id)}" type="button"><strong>${escapeHtml(worker?.name || "Unassigned")}</strong></button>
        <span>${escapeHtml(assignmentRoleLine(assignment))}</span>
        <span>${escapeHtml([assignmentWorkDateLabel(assignment, event), formatTime(assignment.startDate || event.startDate), assignment.endDate ? `wrap ${formatTime(assignment.endDate)}` : "wrap TBD"].filter(Boolean).join(" - "))}</span>
        <span>${escapeHtml(assignmentCallLocation(assignment, event) || "Venue location not set")}</span>
      </div>
      ${actions}
    </div>`;
  }).join("")}</div>`;
}

function openEventAssignmentDetail(assignmentId) {
  const assignment = getEventAssignment(assignmentId);
  if (!assignment) {
    toast("Assignment not found.");
    return;
  }
  const event = getEvent(assignment.eventId);
  const worker = getWorker(assignment.workerId);
  const venue = getVenue(event?.venueId);
  const promoter = getPromoter(event?.promoterId);
  const plate = assignmentLicensePlate(assignment);
  const contactLine = [assignment.onSiteContactName, assignment.onSiteContactPhone, assignment.onSiteContactEmail].filter(Boolean).join("\n");
  const notePanels = [
    ["Crew-visible Notes", noteSectionText(assignment.crewNotes, assignment.updatedAt || assignment.createdAt)]
  ];
  if (!isCrewRole()) {
    notePanels.push(["Internal Notes", noteSectionText(assignment.notes, assignment.updatedAt || assignment.createdAt)]);
  }
  const rateDetails = canViewRates()
    ? [
        ["Pay Basis", assignmentPayLine(assignment, event || {})],
        ["Day Rate", currency(assignment.dayRate || event?.dayRate || activeClientRecord()?.defaultDayRate || 0)],
        ["Included Hours", assignment.includedHours || event?.includedHours || activeClientRecord()?.defaultIncludedHours || 10],
        ["Additional Rate", currency(assignment.additionalRate || event?.additionalRate || activeClientRecord()?.defaultAdditionalRate || 0)]
      ]
    : [];
  readOnlyProfileCard(worker?.name || "Assignment", event?.name || "Event Assignment", [], [
    ["Rental / Vehicle Info", [assignment.vehicleUse, assignment.vehicleType, plate ? `Plate: ${plate}` : ""].filter(Boolean).join("\n")],
    ...notePanels
  ], profileAvatarLarge(worker || { name: "Assignment" }, worker?.hideHeadshot), [
    ["Assignment", [
      ["Event", event?.name],
      ["Department", assignment.department],
      ["Position", assignment.position],
      ["Status", assignment.status || "Assigned"],
      ["Work Date", assignmentWorkDateLabel(assignment, event || {})],
      ["Call", formatTime(assignment.startDate || event?.startDate) || "TBD"],
      ["Scheduled Wrap", assignment.endDate ? formatTime(assignment.endDate) : "TBD"]
    ]],
    ["Location / Partner", [
      ["Venue", venue?.name],
      ["Venue Address", venue?.address],
      ["Venue Parking", assignmentParkingDetails(event || {})],
      ["Call Location Override", assignment.callLocation],
      ["Promoter", promoterLabel(promoter)]
    ]],
    ["Production Office Contact", [
      ["On-site Contact", contactLine || "Not set"],
      ["Public Link Status", assignment.productionOfficeLinkReady === "yes" ? "Ready to prepare" : "Not requested"]
    ]],
    ["Vehicle", [
      ["Vehicle Use", assignment.vehicleUse || "No Vehicle"],
      ["Vehicle Type", assignment.vehicleType],
      ["License Plate", plate || "Not set"]
    ]],
    ...(rateDetails.length ? [["Rates", rateDetails]] : [])
  ]);
  openForm("recordView");
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
  const suiteLabel = eventOfficeSuiteLabel(event);
  const crew = eventWorkerIds(event).map((id) => getWorker(id)?.name).filter(Boolean);
  const crewLine = isCrewRole() ? "Assigned to you" : (crew.join(", ") || "No crew assigned");
  const bucket = eventScheduleBucket(event);
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
  return `<article class="record-card event-card-view"${suiteStyleVars(event.officeSuiteId, "--card-suite-color")}>
    <div class="record-card-main">
      <div class="event-card-section event-card-title-section">
        <div class="event-card-kicker">
          <span class="status-pill">${escapeHtml(bucket === "current" ? "Current" : bucket === "past" ? "Past" : "Future")}</span>
          <span>${escapeHtml(event.type || "Event")}</span>
          ${suiteLabel ? `<span>${escapeHtml(suiteLabel)}</span>` : ""}
        </div>
        <strong>${recordLink("events", event.id, event.name)}</strong>
      </div>
      <div class="event-card-section event-card-facts">
        <div><span>Schedule</span><strong>${event.startDate ? escapeHtml(formatDate(event.startDate)) : "Date not set"}</strong></div>
        <div><span>Venue</span><strong>${escapeHtml(venue?.name || "No venue")}</strong></div>
      </div>
      <div class="event-card-section event-card-facts">
        <div><span>Promoter</span><strong>${escapeHtml(promoterLabel(promoter) || "No promoter rep")}</strong></div>
        <div><span>Production Contact</span><strong>${escapeHtml(event.productionContact || "Not set")}</strong></div>
      </div>
      <div class="event-card-section">
        <span class="event-card-label">Crew / Runners</span>
        <p>${escapeHtml(crewLine)}</p>
        ${assignmentTable(event)}
      </div>
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
  const workerId = activeCrewWorkerId();
  const events = visibleEvents().filter((event) => {
    return workerId
      && eventWorkerIds(event).includes(workerId)
      && workerScheduledForEventDate(event, workerId)
      && matchesSearch(event, `${getVenue(event.venueId)?.name || ""} ${getPromoter(event.promoterId)?.name || ""}`);
  });
  const card = currentDayCrewTimecard();
  const event = card?.eventId ? getEvent(card.eventId) : events[0] || null;
  $("#clockEventCount").textContent = event ? "Scheduled today" : "No scheduled event today";
  $("#clockCards").innerHTML = todayClockTimelineCard(event, card);
  updateMobileClockNow();
}

function updateMobileClockNow() {
  $$("[data-live-clock-now]").forEach((element) => {
    element.textContent = formatLiveClock(new Date());
  });
}

function startMobileClockSecondTimer() {
  if (mobileClockSecondTimer) return;
  updateMobileClockNow();
  mobileClockSecondTimer = window.setInterval(() => {
    if (state.activeView === "clock" || state.activeView === "dashboard") updateMobileClockNow();
  }, 1000);
}

function todayClockTimelineCard(event = null, card = currentDayCrewTimecard()) {
  const today = localDateKey();
  const workerId = activeCrewWorkerId();
  const scheduledToday = event && workerScheduledForEventDate(event, workerId, today);
  const punchActions = scheduledToday
    ? `<div class="clock-actions">
        <button class="primary-action" data-time-punch="clockIn" data-event-id="${escapeHtml(event.id)}" type="button">Call Time</button>
        <button class="primary-action" data-time-punch="lunchOut" data-event-id="${escapeHtml(event.id)}" type="button">Lunch Out</button>
        <button class="primary-action" data-time-punch="lunchIn" data-event-id="${escapeHtml(event.id)}" type="button">Lunch In</button>
        <button class="primary-action" data-time-punch="clockOut" data-event-id="${escapeHtml(event.id)}" type="button">Wrap</button>
      </div>`
    : `<div class="clock-actions"><button class="primary-action" type="button" disabled>No scheduled event today</button></div>`;
  const rentalWarning = scheduledToday && event ? rentalClockWarning(event, card) : "";
  const line = event
    ? `${event.name}${scheduledToday ? "" : " - not scheduled today"}`
      : "No assigned event is available for this worker today.";
  return `<article class="record-card clock-card clock-day-card">
    <div class="record-card-main">
      <strong data-live-clock-now>${escapeHtml(formatLiveClock(new Date()))}</strong>
      <span>${escapeHtml(formatDate(`${today}T12:00`) || today)}</span>
      <p>${escapeHtml(line)}</p>
      <div class="punch-summary">
        ${punchSummaryItem("Call", card?.clockIn, card?.punchLocations?.clockIn)}
        ${punchSummaryItem("Lunch Out", card?.lunchOut, card?.punchLocations?.lunchOut)}
        ${punchSummaryItem("Lunch In", card?.lunchIn, card?.punchLocations?.lunchIn)}
        ${punchSummaryItem("Wrap", card?.clockOut, card?.punchLocations?.clockOut)}
      </div>
      ${rentalWarning}
    </div>
    ${punchActions}
  </article>`;
}

function currentDayCrewTimecard() {
  const today = localDateKey();
  const workerId = activeCrewWorkerId();
  return state.timecards
    .filter((card) => card.workerId === workerId && timecardWorkDate(card) === today)
    .sort((a, b) => new Date(b.clockIn || b.createdAt || 0) - new Date(a.clockIn || a.createdAt || 0))[0] || null;
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
  return `<span class="punch-summary-item ${set ? "is-set" : ""}"><b>${escapeHtml(label)}</b><span class="punch-summary-time">${set ? escapeHtml(formatTime(value)) : "Not set"}</span></span>`;
}

function rentalClockWarning(event, card) {
  if (!card?.clockIn || card.clockOut) return `<p><span class="status-pill warn">Rental photos required</span></p>`;
  const startLog = vehicleLogForEventWorker(event.id, activeCrewWorkerId(), "Start");
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

function recordTargetAttrs(target = "", fallbackView = "") {
  if (target) return `data-view-record="${escapeHtml(target)}"`;
  return fallbackView ? `data-dashboard-link="${escapeHtml(fallbackView)}"` : "";
}

function touringStopRecordTarget(stop = {}) {
  if (stop.source?.id) return `touringStops:${stop.source.id}`;
  if (stop.event?.id) return `events:${stop.event.id}`;
  return "";
}

function touringCrewRecordTarget(person = {}) {
  if (person.source?.id) return `touringCrew:${person.source.id}`;
  if (state.workers.some((worker) => worker.id === person.id)) return `workers:${person.id}`;
  return "";
}

function touringTravelRecordTarget(person = {}) {
  if (state.touringTravel.some((record) => record.id === person.id)) return `touringTravel:${person.id}`;
  if (person.source?.id) return `touringCrew:${person.source.id}`;
  if (state.workers.some((worker) => worker.id === person.id)) return `workers:${person.id}`;
  return "";
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
  renderWorkerTableHead();
  const rows = sortWorkerRows(filterWorkerRows(visibleWorkers().filter((worker) => matchesSearch(worker))));
  $("#workerTableCount").textContent = `${rows.length} shown`;
  $("#workerTable").innerHTML = rows.length
    ? rows.map((worker) => workerProfileRow(worker)).join("")
    : `<tr><td colspan="6" class="empty">No crew profiles match this search.</td></tr>`;
}

function renderWorkerTableHead() {
  const head = $("#workerHead");
  if (!head) return;
  head.innerHTML = `<tr>${WORKER_COLUMNS.map(([key, label]) => {
    const activeSort = state.workerSortKey === key;
    const activeFilter = !!state.workerColumnFilters?.[key];
    const arrow = activeSort ? (state.workerSortDirection === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-worker-sort="${escapeHtml(key)}" data-worker-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-worker-sort="${escapeHtml(key)}" data-worker-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-worker-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.workerColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
}

function filterWorkerRows(rows) {
  const filters = state.workerColumnFilters || {};
  return rows.filter((worker) => WORKER_COLUMNS.every(([key]) => {
    const filter = String(filters[key] || "").trim().toLowerCase();
    return !filter || workerColumnValue(worker, key).toLowerCase().includes(filter);
  }));
}

function sortWorkerRows(rows) {
  const key = state.workerSortKey || "profile";
  const direction = state.workerSortDirection === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => direction * workerColumnValue(a, key).localeCompare(workerColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" }));
}

function workerColumnValue(worker, key) {
  if (key === "profile") return listText(`${worker.name || ""} ${publicWorkerValue(worker, "email") || worker.email || ""}`);
  if (key === "role") return listText(worker.role);
  if (key === "status") return listText(worker.status);
  if (key === "phone") return listText(publicWorkerValue(worker, "phone") || worker.phone);
  if (key === "info") {
    return listText(`${worker.skills || ""} ${worker.defaultDayRate || worker.defaultRate || ""} ${worker.defaultIncludedHours || ""} ${accessBadges(worker.accessLevels, "CREW").replace(/<[^>]+>/g, " ")} ${loginStatus(worker).replace(/<[^>]+>/g, " ")}`);
  }
  return "";
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
  $("#myProfileCard").innerHTML = profileHeroCard({
    tone: "person",
    title: worker.name || "My profile",
    subtitle: worker.role || "Crew / Runner",
    meta: worker.status || "Available",
    imageHtml: profileAvatarLarge(worker, worker.hideHeadshot),
    actions: `<button class="tiny-button" data-edit="workers" data-id="${worker.id}" data-form="workerForm" type="button">Edit My Profile</button>`,
    groups: [
      ["Contact", [
        ["Phone", phone],
        ["Email", email],
        ["Mailing Address", worker.mailingAddress || ""]
      ]],
      ["Work Profile", [
        ["Role", worker.role || "Crew / Runner"],
        ["Status", worker.status || ""],
        ["Login", worker.authUserId ? "Connected" : "Not connected"]
      ]]
    ],
    sections: [
      ["Skills", worker.skills || ""],
      ["Notes", worker.notes || ""]
    ]
  });
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
    <td>${profileSelect("workers", worker.id)}${profileCell(worker, showLimited && worker.hideHeadshot && worker.id !== state.activeWorkerId, publicEmail, "workers", worker.id)}${profileSuiteBadges(profileSuiteUsageForWorker(worker))}</td>
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

function profileSuiteBadges(suiteIds = []) {
  if (!suiteIds.length || isCrewRole()) return "";
  return `<div class="profile-suite-badges">${suiteIds.map((suiteId) => {
    const label = officeSuiteLabel(suiteId) || suiteId;
    const color = SUITE_NAV_COLORS[suiteId] || "var(--accent)";
    return `<span style="--suite-color: ${escapeHtml(color)}">${escapeHtml(label.replace(" Office Suite", "").replace(" Services", ""))}</span>`;
  }).join("")}</div>`;
}

function profileSuiteUsageForWorker(worker = {}) {
  const ids = new Set();
  visibleEvents().forEach((event) => {
    if (eventWorkerIds(event).includes(worker.id) && event.officeSuiteId) ids.add(event.officeSuiteId);
  });
  const match = normalizedMatchValue(`${worker.name || ""} ${worker.email || ""}`);
  if (match) {
    state.touringCrew.forEach((person) => {
      if (normalizedMatchValue(`${person.name || ""} ${person.email || ""}`) === match) ids.add(TOURING_SUITE_ID);
    });
    state.awardsStaff.forEach((person) => {
      if (normalizedMatchValue(`${person.name || ""} ${person.email || ""}`) === match) ids.add(AWARDS_SUITE_ID);
    });
  }
  return Array.from(ids);
}

function profileSuiteUsageForPromoter(promoter = {}) {
  const ids = new Set();
  visibleEvents().forEach((event) => {
    if (event.promoterId === promoter.id && event.officeSuiteId) ids.add(event.officeSuiteId);
  });
  return Array.from(ids);
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
  const showRates = canViewRates();
  renderTimecardTableHead();
  const rows = sortTimecards(filterTimecards(visibleRecords(state.timecards).filter((card) => {
    const worker = getWorker(card.workerId);
    const venue = getVenue(card.venueId);
    const promoter = getPromoter(card.promoterId);
    const event = getEvent(card.eventId);
    return matchesSearch(card, `${worker?.name || ""} ${venue?.name || ""} ${promoter?.name || ""} ${event?.name || ""}`);
  })));
  $("#timecardTableCount").textContent = `${rows.length} shown`;
  $("#timecardTable").closest("table").classList.add("timecard-week-table");
  const showAdminNotes = canViewTimecardAdminNotes();
  $("#timecardTable").closest("table").classList.toggle("timecard-admin-notes-table", showAdminNotes);
  renderTimecardTableHead(showAdminNotes);
  $("#timecardTable").innerHTML = rows.length
    ? renderTimecardWeekRows(rows, showAdminNotes)
    : `<tr><td colspan="${showAdminNotes ? 8 : 7}" class="empty">No timecards match this search.</td></tr>`;
}

function renderTimecardTableHead(showAdminNotes = canViewTimecardAdminNotes()) {
  const head = $("#timecardHead");
  if (!head) return;
  const columns = showAdminNotes ? [...TIMECARD_COLUMNS, ["notes", "Notes"]] : TIMECARD_COLUMNS;
  head.innerHTML = `<tr>${columns.map(([key, label]) => {
    const activeSort = state.timecardSortKey === key;
    const activeFilter = !!state.timecardColumnFilters?.[key];
    const arrow = activeSort ? (state.timecardSortDirection === "desc" ? "▼" : "▲") : "▾";
    const numeric = ["hours"].includes(key);
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-timecard-sort="${escapeHtml(key)}" data-timecard-sort-direction="asc" type="button">${numeric ? "Sort low-high" : "Sort A-Z"}</button>
          <button class="tiny-button" data-timecard-sort="${escapeHtml(key)}" data-timecard-sort-direction="desc" type="button">${numeric ? "Sort high-low" : "Sort Z-A"}</button>
          <label>Filter<input data-timecard-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.timecardColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}</tr>`;
}

function renderTimecardWeekRows(rows, showAdminNotes = false) {
  const groups = new Map();
  rows.forEach((card) => {
    const key = timecardWeekKey(card);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(card);
  });
  const columnCount = showAdminNotes ? 8 : 7;
  return Array.from(groups.entries()).map(([key, cards]) => `
    <tr class="timecard-week-heading"><td colspan="${columnCount}">${escapeHtml(timecardWeekLabel(key))}</td></tr>
    ${cards.map((card) => timecardWeekRow(card, showAdminNotes)).join("")}
  `).join("");
}

function timecardWeekRow(card, showAdminNotes = false) {
  const worker = getWorker(card.workerId);
  const event = getEvent(card.eventId);
  const eventName = event?.name || card.eventName || "No event";
  const workerLine = !isCrewRole() && worker?.name ? `<p>${escapeHtml(worker.name)}</p>` : "";
  const adminNotes = showAdminNotes ? timecardAdminNoteList(card) : "";
  return `<tr class="timecard-list-row" data-timecard-row="${escapeHtml(card.id)}" tabindex="0">
    <td data-label="Date">${escapeHtml(timecardDateLabel(card))}</td>
    <td data-label="Event"><strong>${escapeHtml(eventName)}</strong>${workerLine}</td>
    <td data-label="Call">${formatTime(card.clockIn) || "Not set"}</td>
    <td data-label="Lunch out">${formatTime(card.lunchOut) || "Not set"}</td>
    <td data-label="Lunch In">${formatTime(card.lunchIn) || "Not set"}</td>
    <td data-label="Wrap">${formatTime(card.clockOut) || "Live"}</td>
    <td data-label="Hours">${timecardHours(card).toFixed(2)}</td>
    ${showAdminNotes ? `<td data-label="Notes">${adminNotes || `<span class="muted">No notes</span>`}</td>` : ""}
  </tr>`;
}

function filterTimecards(cards) {
  const filters = state.timecardColumnFilters || {};
  return cards.filter((card) => {
    return Object.entries(filters).every(([key, value]) => {
      const filter = String(value || "").trim().toLowerCase();
      return !filter || timecardColumnValue(card, key).toLowerCase().includes(filter);
    });
  });
}

function sortTimecards(cards) {
  const key = state.timecardSortKey || "date";
  const direction = state.timecardSortDirection === "asc" ? 1 : -1;
  return [...cards].sort((a, b) => {
    if (key === "hours") return direction * (timecardHours(a) - timecardHours(b));
    if (key === "date" || key === "call" || key === "lunchOut" || key === "lunchIn" || key === "wrap") {
      return direction * (new Date(timecardSortDate(a, key) || 0) - new Date(timecardSortDate(b, key) || 0));
    }
    return direction * timecardColumnValue(a, key).localeCompare(timecardColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" });
  });
}

function timecardSortDate(card, key) {
  if (key === "date") return timecardWorkDate(card) || card.clockIn || card.createdAt;
  if (key === "call") return card.clockIn;
  if (key === "lunchOut") return card.lunchOut;
  if (key === "lunchIn") return card.lunchIn;
  if (key === "wrap") return card.clockOut;
  return "";
}

function timecardColumnValue(card, key) {
  const worker = getWorker(card.workerId);
  const event = getEvent(card.eventId);
  if (key === "date") return listText(timecardDateLabel(card));
  if (key === "event") return listText(`${event?.name || card.eventName || ""} ${worker?.name || ""}`);
  if (key === "call") return listText(formatTime(card.clockIn) || "not set");
  if (key === "lunchOut") return listText(formatTime(card.lunchOut) || "not set missing lunch");
  if (key === "lunchIn") return listText(formatTime(card.lunchIn) || "not set missing lunch");
  if (key === "wrap") return listText(formatTime(card.clockOut) || "live");
  if (key === "hours") return listText(timecardHours(card).toFixed(2));
  if (key === "notes") return listText(timecardTableNotes(card) || "no notes");
  return "";
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
  renderVehicleTableHead();
  const logs = visibleRecords(state.vehicleLogs).filter((log) => matchesSearch(log, `${getEvent(log.eventId)?.name || ""} ${getWorker(log.workerId)?.name || ""}`));
  const rows = sortVehicleRows(filterVehicleRows(groupedVehicleRows(logs)));
  $("#vehicleTableCount").textContent = `${rows.length} shown`;
  $("#vehicleTable").innerHTML = rows.length
    ? rows.map(vehicleCheckRow).join("")
    : `<tr><td colspan="7" class="empty">No vehicle checks match this search.</td></tr>`;
}

function filterVehicleRows(rows) {
  const filters = state.vehicleColumnFilters || {};
  return rows.filter((group) => {
    return VEHICLE_COLUMNS.every(([key]) => {
      const filter = String(filters[key] || "").trim().toLowerCase();
      return !filter || vehicleColumnValue(group, key).toLowerCase().includes(filter);
    });
  });
}

function sortVehicleRows(rows) {
  const sortValue = state.vehicleSortKey || "date";
  const direction = state.vehicleSortDirection === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    if (sortValue === "date") return direction * (new Date(a.startLog?.scheduledDate || a.endLog?.scheduledDate || 0) - new Date(b.startLog?.scheduledDate || b.endLog?.scheduledDate || 0));
    return direction * vehicleColumnValue(a, sortValue).localeCompare(vehicleColumnValue(b, sortValue), undefined, { numeric: true, sensitivity: "base" });
  });
}

function renderVehicleTableHead() {
  const head = $("#vehicleHead");
  if (!head) return;
  head.innerHTML = `<tr>${VEHICLE_COLUMNS.map(([key, label]) => {
    const activeSort = state.vehicleSortKey === key || (key === "event" && state.vehicleSortKey === "date");
    const activeFilter = !!state.vehicleColumnFilters?.[key];
    const arrow = activeSort ? (state.vehicleSortDirection === "desc" ? "▼" : "▲") : "▾";
    const sortAscLabel = key === "event" ? "Sort oldest" : "Sort A-Z";
    const sortDescLabel = key === "event" ? "Sort newest" : "Sort Z-A";
    const sortKey = key === "event" ? "date" : key;
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-vehicle-sort="${escapeHtml(sortKey)}" data-vehicle-sort-direction="asc" type="button">${sortAscLabel}</button>
          <button class="tiny-button" data-vehicle-sort="${escapeHtml(sortKey)}" data-vehicle-sort-direction="desc" type="button">${sortDescLabel}</button>
          <label>Filter<input data-vehicle-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.vehicleColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}</tr>`;
}

function vehicleColumnValue(group, key) {
  const status = vehicleChecklistStatus(group);
  const startMissing = status.start.items.filter((item) => !item.done).map((item) => item.label).join(" ");
  const endMissing = status.end.items.filter((item) => !item.done).map((item) => item.label).join(" ");
  if (key === "event") {
    const event = getEvent(group.eventId);
    return listText(`${event?.name || ""} ${formatDate(event?.startDate)} ${formatDate(event?.endDate)}`);
  }
  if (key === "worker") return listText(getWorker(group.workerId)?.name);
  if (key === "vehicle") return listText(vehicleGroupType(group));
  if (key === "plate") return listText(vehicleGroupPlate(group));
  if (key === "start") return listText(`${group.startLog?.gasGauge || ""} ${formatDate(group.startLog?.scheduledDate)} ${status.start.complete ? "complete" : `missing ${startMissing}`}`);
  if (key === "end") return listText(`${group.endLog?.gasGauge || ""} ${formatDate(group.endLog?.scheduledDate)} ${status.end.complete ? "complete" : `missing ${endMissing}`}`);
  if (key === "photos") return listText(group.logs.map((log) => vehiclePhotoGallery(log)).join("") ? "photos uploaded" : "no photos");
  return "";
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
    <td><strong>${logId ? recordLink("vehicleLogs", logId, event?.name || "Vehicle Check") : escapeHtml(event?.name || "")}</strong><p>${formatDate(event?.startDate)}${event?.endDate ? " - " + formatDate(event.endDate) : ""}</p></td>
    <td>${escapeHtml(worker?.name || "")}</td>
    <td><strong>${escapeHtml(vehicleType || "Vehicle")}</strong></td>
    <td>${escapeHtml(plate || "Not set")}</td>
    <td><div class="vehicle-phase-shell">${vehiclePhaseCell(group, "Start")}${vehiclePhotoChecklist(status.start)}</div></td>
    <td><div class="vehicle-phase-shell">${vehiclePhaseCell(group, "End")}${vehiclePhotoChecklist(status.end)}</div></td>
    <td>${group.logs.map((log) => vehiclePhotoGallery(log)).join("")}</td>
  </tr>`;
}

function vehicleChecklistStatus(group) {
  return {
    start: vehiclePhaseChecklist(group.startLog, "start", [
      { label: "Gas gauge", done: !!group.startLog?.gasGauge },
      ["Front", "startFront"],
      ["Back", "startBack"],
      ["Driver side", "startDriverSide"],
      ["Passenger side", "startPassengerSide"]
    ]),
    end: vehiclePhaseChecklist(group.endLog, "end", [
      { label: "Gas gauge", done: !!group.endLog?.gasGauge },
      ["Front", "endFront"],
      ["Back", "endBack"],
      ["Driver side", "endDriverSide"],
      ["Passenger side", "endPassengerSide"]
    ])
  };
}

function vehiclePhaseChecklist(log, phase, checks) {
  const photos = log?.vehiclePhotos || {};
  const items = checks.map((check) => Array.isArray(check)
    ? { label: check[0], done: !!photos[check[1]] }
    : check);
  const plateRequired = phase === "start";
  const plateDone = !plateRequired || !!log?.plateNumber;
  return {
    phase,
    complete: !!log && plateDone && items.every((item) => item.done),
    plateRequired,
    plateDone,
    items
  };
}

function vehiclePhotoChecklist(status) {
  const plateClass = status.plateDone ? "is-done" : "is-missing";
  return `<div class="vehicle-photo-checklist">
    ${status.plateRequired ? `<span class="${plateClass}">Plate</span>` : ""}
    ${status.items.map((item) => `<span class="${item.done ? "is-done" : "is-missing"}">${escapeHtml(item.label)}</span>`).join("")}
  </div>`;
}

function vehiclePhaseCell(group, phase) {
  const log = phase === "End" ? group.endLog : group.startLog;
  const disabled = canScopedEdit() ? "" : "disabled";
  const buttonLabel = log ? `View / Edit ${phase}` : `Add ${phase}`;
  const meta = log ? `<strong>${escapeHtml(log.gasGauge || "Gas not set")}</strong><p>${formatDate(log.scheduledDate)}</p>` : `<p class="muted">Not started</p>`;
  return `<div class="vehicle-phase-detail">
    <div>${meta}</div>
    <div class="vehicle-phase-actions">
      <button class="tiny-button" data-vehicle-phase="${phase}" data-log-id="${escapeHtml(log?.id || "")}" data-event-id="${escapeHtml(group.eventId)}" data-worker-id="${escapeHtml(group.workerId)}" data-assignment-id="${escapeHtml(group.assignmentId)}" type="button" ${disabled}>${buttonLabel}</button>
      <button class="tiny-button" data-vehicle-photos="${phase}" data-log-id="${escapeHtml(log?.id || "")}" data-event-id="${escapeHtml(group.eventId)}" data-worker-id="${escapeHtml(group.workerId)}" data-assignment-id="${escapeHtml(group.assignmentId)}" type="button">Photos</button>
    </div>
  </div>`;
}

function renderReports() {
  renderReportTableHead();
  const rows = sortReports(filterReports(visibleRecords(state.accidentReports).filter((report) => matchesSearch(report, `${getEvent(report.eventId)?.name || ""} ${getWorker(report.workerId)?.name || ""}`))));
  $("#reportTableCount").textContent = `${rows.length} shown`;
  $("#reportTable").innerHTML = rows.length
    ? rows.map(reportTableRow).join("")
    : `<tr><td colspan="7" class="empty">No accident reports match this search.</td></tr>`;
}

function renderReportTableHead() {
  const head = $("#reportHead");
  if (!head) return;
  head.innerHTML = `<tr>${REPORT_COLUMNS.map(([key, label]) => {
    const activeSort = state.reportSortKey === key;
    const activeFilter = !!state.reportColumnFilters?.[key];
    const arrow = activeSort ? (state.reportSortDirection === "desc" ? "▼" : "▲") : "▾";
    const numeric = key === "photos";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-report-sort="${escapeHtml(key)}" data-report-sort-direction="asc" type="button">${numeric ? "Sort low-high" : "Sort A-Z"}</button>
          <button class="tiny-button" data-report-sort="${escapeHtml(key)}" data-report-sort-direction="desc" type="button">${numeric ? "Sort high-low" : "Sort Z-A"}</button>
          <label>Filter<input data-report-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.reportColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
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
  const filters = state.reportColumnFilters || {};
  return reports.filter((report) => {
    return REPORT_COLUMNS.every(([key]) => {
      const filter = String(filters[key] || "").trim().toLowerCase();
      return !filter || reportColumnValue(report, key).toLowerCase().includes(filter);
    });
  });
}

function sortReports(reports) {
  const key = state.reportSortKey || "date";
  const direction = state.reportSortDirection === "asc" ? 1 : -1;
  return [...reports].sort((a, b) => {
    if (key === "date") return direction * (new Date(a.reportedAt || a.createdAt || 0) - new Date(b.reportedAt || b.createdAt || 0));
    if (key === "photos") return direction * (reportPhotoCount(a) - reportPhotoCount(b));
    return direction * reportColumnValue(a, key).localeCompare(reportColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" });
  });
}

function reportPhotoCount(report) {
  const photos = Array.isArray(report.photos) ? report.photos : report.photos ? [report.photos] : report.photoData ? [report.photoData] : [];
  return photos.length;
}

function reportColumnValue(report, key) {
  if (key === "type") return listText(report.type);
  if (key === "event") return listText(getEvent(report.eventId)?.name);
  if (key === "worker") return listText(getWorker(report.workerId)?.name);
  if (key === "title") return listText(`${report.title || ""} ${report.details || ""} ${reportSummaryChips(report).replace(/<[^>]+>/g, " ")}`);
  if (key === "date") return listText(formatDate(report.reportedAt || report.createdAt));
  if (key === "photos") return listText(reportPhotoCount(report) ? `${reportPhotoCount(report)} photos has photos` : "no photos");
  return "";
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

function vehiclePhasePhotoItems(log, phase) {
  const photos = log?.vehiclePhotos || {};
  const isEnd = String(phase || "").toLowerCase() === "end";
  if (isEnd) {
    return [
      ["End front", photos.endFront],
      ["End back", photos.endBack],
      ["End driver side", photos.endDriverSide],
      ["End passenger side", photos.endPassengerSide],
      ["End gas gauge", photos.endGasGauge]
    ];
  }
  return [
    ["Start front", photos.startFront || photos.front],
    ["Start back", photos.startBack || photos.back],
    ["Start driver side", photos.startDriverSide || photos.driverSide],
    ["Start passenger side", photos.startPassengerSide || photos.passengerSide],
    ["Start gas gauge", photos.startGasGauge || photos.gasGauge],
    ...[].concat(photos.priorDamages || []).map((photo, index) => [`Damage ${index + 1}`, photo])
  ];
}

function vehicleEndPhotosComplete(log) {
  const photos = log?.vehiclePhotos || {};
  return !!(log?.gasGauge && photos.endFront && photos.endBack && photos.endDriverSide && photos.endPassengerSide && photos.endGasGauge);
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

function appendTimecardAdminNote(card, message) {
  const existing = String(card.adminNotes || "").trim();
  if (existing.includes(message)) return existing;
  return [existing, `${formatDateWithYear(new Date())} - ${message}`].filter(Boolean).join("\n");
}

function canViewTimecardAdminNotes() {
  const roles = assignedAccessForCurrentUser();
  return roles.includes("CLIENT_ADMIN") || roles.includes("ACCOUNTING") || roles.includes("CLIENT_ACCOUNTING");
}

function timecardTableNotes(card) {
  const notes = [crewVisibleTimecardNotes(card)];
  if (canViewTimecardAdminNotes()) notes.push(card.adminNotes);
  return notes.filter(Boolean).join("\n");
}

function timecardAdminNoteList(card) {
  const lines = String(card.adminNotes || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return "";
  return `<ul class="timecard-note-list">${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
}

function crewVisibleTimecardNotes(card) {
  if (canViewTimecardAdminNotes()) return card.notes || "";
  const adminOnlyFragments = [
    "Rental vehicle start-photo reminder was sent",
    "Urgent rental vehicle start-photo reminder was sent",
    "Rental vehicle end photos were required at Wrap",
    "A wrap attempt was made before end photos",
    "Rental vehicle end photos and gas gauge were required at Wrap",
    "A wrap attempt was made before end photos and gas gauge",
    "Bypassed after the 5 minute warning window"
  ];
  return String(card.notes || "")
    .split(/\n+/)
    .filter((line) => !adminOnlyFragments.some((fragment) => line.includes(fragment)))
    .join("\n")
    .trim();
}

function applyVehicleAssignmentLock(form = $("#vehicleForm")) {
  if (!form) return;
  updateVehiclePhotoSections(form);
  updateVehicleRentalAccess(form);
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

function updateVehicleRentalAccess(form = $("#vehicleForm")) {
  if (!form) return;
  const canEdit = canEditVehicleRentalDetails();
  form.querySelectorAll("[data-client-admin-rental-field]").forEach((field) => {
    field.readOnly = !canEdit;
    field.classList.toggle("readonly-field", !canEdit);
  });
  const details = form.querySelector("[data-vehicle-rental-details]");
  details?.classList.toggle("is-readonly", !canEdit);
}

function vehicleRentalDetailsFor(log = {}) {
  const relatedLogs = state.vehicleLogs.filter((item) => {
    if (log.assignmentId && item.assignmentId === log.assignmentId) return true;
    return item.eventId === log.eventId && item.workerId === log.workerId;
  });
  const source = [log, ...relatedLogs].find((item) => item?.rentalCompany || item?.rentalPickupLocation || item?.rentalPickupDate) || {};
  return {
    rentalCompany: source.rentalCompany || "",
    rentalPickupLocation: source.rentalPickupLocation || "",
    rentalPickupDate: source.rentalPickupDate || ""
  };
}

function updateVehiclePhotoSections(form = $("#vehicleForm")) {
  if (!form) return;
  const phase = String(form.elements.phase?.value || "").toLowerCase();
  const showStart = phase === "start";
  const showEnd = phase === "end";
  form.querySelectorAll("[data-vehicle-photo-section]").forEach((section) => {
    const sectionType = section.dataset.vehiclePhotoSection;
    section.hidden = sectionType === "start" ? !showStart : !showEnd;
  });
}

function openVehiclePhaseForm(button) {
  const logId = button.dataset.logId || "";
  if (logId) {
    const log = state.vehicleLogs.find((item) => item.id === logId) || {};
    fillForm("vehicleForm", { ...vehicleRentalDetailsFor(log), ...log });
    return;
  }
  clearForm("vehicleForm");
  const form = $("#vehicleForm");
  form.elements.phase.value = button.dataset.vehiclePhase || "Start";
  form.elements.eventId.value = button.dataset.eventId || "";
  form.elements.workerId.value = button.dataset.workerId || "";
  if (form.elements.assignmentId) form.elements.assignmentId.value = button.dataset.assignmentId || "";
  const rentalDetails = vehicleRentalDetailsFor({
    assignmentId: button.dataset.assignmentId || "",
    eventId: button.dataset.eventId || "",
    workerId: button.dataset.workerId || ""
  });
  Object.entries(rentalDetails).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value || "";
  });
  applyVehicleAssignmentLock(form);
  openForm("vehicleForm");
}

function vehiclePhotoLogFromButton(button) {
  const logId = button.dataset.logId || "";
  const phase = button.dataset.vehiclePhotos || "";
  if (logId) return state.vehicleLogs.find((log) => log.id === logId) || null;
  const eventId = button.dataset.eventId || "";
  const workerId = button.dataset.workerId || "";
  const assignmentId = button.dataset.assignmentId || "";
  return state.vehicleLogs.find((log) => {
    if (assignmentId && log.assignmentId === assignmentId && String(log.phase || "").toLowerCase() === phase.toLowerCase()) return true;
    return log.eventId === eventId && log.workerId === workerId && String(log.phase || "").toLowerCase() === phase.toLowerCase();
  }) || null;
}

function openVehiclePhotoViewer(button) {
  const phase = button.dataset.vehiclePhotos || "Start";
  const log = vehiclePhotoLogFromButton(button);
  const event = getEvent(log?.eventId || button.dataset.eventId || "");
  const worker = getWorker(log?.workerId || button.dataset.workerId || "");
  const gallery = photoGallery(vehiclePhasePhotoItems(log, phase));
  const empty = `<div class="empty">No ${escapeHtml(phase.toLowerCase())} photos have been uploaded yet.</div>`;
  $("#recordViewTitle").textContent = `${phase} Photos`;
  $("#recordViewBody").innerHTML = `<article class="profile-page-card premium-profile-card profile-popup-card">
    <div class="premium-profile-hero">
      <div class="profile-avatar-large placeholder">${escapeHtml(initialsFor(phase))}</div>
      <div class="premium-profile-title">
        <span>Vehicle Check</span>
        <h3>${escapeHtml(`${phase} Vehicle Photos`)}</h3>
        <p>${escapeHtml(event?.name || "Vehicle check")}${worker?.name ? ` - ${escapeHtml(worker.name)}` : ""}</p>
      </div>
      <div class="premium-profile-actions"></div>
    </div>
    <div class="premium-profile-content">
      ${profileInfoSection("Vehicle Check", [
        ["Phase", phase],
        ["Vehicle", log?.vehicleType || "Vehicle"],
        ["Plate", log?.plateNumber || "Not set"],
        ["Gas Gauge", log?.gasGauge || "Not set"],
        ["Scheduled Date", formatDate(log?.scheduledDate)]
      ])}
      <section class="profile-text-section">
        <h4>${escapeHtml(phase)} Photos</h4>
        ${gallery || empty}
      </section>
    </div>
  </article>`;
  openForm("recordView");
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
  renderVenueTableHead();
  const rows = sortVenues(filterVenues(visibleVenues().filter((venue) => matchesSearch(venue))));
  $("#venueTableCount").textContent = `${rows.length} shown`;
  $("#venueTable").innerHTML = rows.length
    ? rows.map((venue) => `<tr><td><strong>${recordLink("venues", venue.id, venue.name)}</strong><p>${escapeHtml(venue.notes)}</p></td><td>${escapeHtml(venue.address)}</td><td>${venueContactSummary(venue)}</td><td>${escapeHtml(venue.parking)}</td><td>${actionButtons("venues", venue.id, "venueForm", "", canVenueEdit())}</td></tr>`).join("")
    : `<tr><td colspan="5" class="empty">No venues match this search.</td></tr>`;
}

function renderVenueTableHead() {
  const head = $("#venueHead");
  if (!head) return;
  head.innerHTML = `<tr>${VENUE_COLUMNS.map(([key, label]) => {
    const activeSort = state.venueSortKey === key;
    const activeFilter = !!state.venueColumnFilters?.[key];
    const arrow = activeSort ? (state.venueSortDirection === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-venue-sort="${escapeHtml(key)}" data-venue-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-venue-sort="${escapeHtml(key)}" data-venue-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-venue-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.venueColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
}

function filterVenues(venues) {
  const filters = state.venueColumnFilters || {};
  return venues.filter((venue) => {
    return VENUE_COLUMNS.every(([key]) => {
      const filter = String(filters[key] || "").trim().toLowerCase();
      return !filter || venueColumnValue(venue, key).toLowerCase().includes(filter);
    });
  });
}

function sortVenues(venues) {
  const key = state.venueSortKey || "name";
  const direction = state.venueSortDirection === "desc" ? -1 : 1;
  return [...venues].sort((a, b) => direction * venueColumnValue(a, key).localeCompare(venueColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" }));
}

function venueColumnValue(venue, key) {
  if (key === "name") return listText(`${venue.name || ""} ${venue.notes || ""}`);
  if (key === "address") return listText(venue.address);
  if (key === "contact") {
    const contacts = venueContactsForVenue(venue.id).map((contact) => `${contact.name || contact.contactName || ""} ${contact.title || ""} ${contact.phone || ""} ${contact.email || ""}`).join(" ");
    return listText(`${venue.contactName || ""} ${venue.phone || ""} ${venue.email || ""} ${contacts}`);
  }
  if (key === "parking") return listText(venue.parking);
  return "";
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
  renderPromoterTableHead();
  const rows = sortPromoters(filterPromoters(visiblePromoters().filter((promoter) => matchesSearch(promoter))));
  $("#promoterTableCount").textContent = `${rows.length} shown`;
  $("#promoterTable").innerHTML = rows.length
    ? rows.map((promoter) => {
        const smtpStatus = promoter.smtpSecretRef ? `<p><span class="status-pill">SMTP saved</span></p>` : "";
        return `<tr><td>${profileSelect("promoters", promoter.id)}${profileCell(promoter, false, promoter.contactName, "promoters", promoter.id)}${profileSuiteBadges(profileSuiteUsageForPromoter(promoter))}</td><td><strong>${escapeHtml(promoter.companyName || "Independent")}</strong><p>${escapeHtml(promoter.contactName)}</p></td><td>${escapeHtml(promoter.phone)}</td><td>${escapeHtml(promoter.email)}</td><td>${escapeHtml(promoter.notes || promoter.billing)}<p>${accessBadges(promoter.accessLevels, "PROMOTER_ADMIN")}</p>${smtpStatus}${loginStatus(promoter)}</td><td>${actionButtons("promoters", promoter.id, "promoterForm", loginSetupButton("promoters", promoter), canEditPromoter(promoter))}</td></tr>`;
      }).join("")
    : `<tr><td colspan="6" class="empty">No promoter profiles match this search.</td></tr>`;
}

function renderPromoterTableHead() {
  const head = $("#promoterHead");
  if (!head) return;
  head.innerHTML = `<tr>${PROMOTER_COLUMNS.map(([key, label]) => {
    const activeSort = state.promoterSortKey === key;
    const activeFilter = !!state.promoterColumnFilters?.[key];
    const arrow = activeSort ? (state.promoterSortDirection === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-promoter-sort="${escapeHtml(key)}" data-promoter-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-promoter-sort="${escapeHtml(key)}" data-promoter-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-promoter-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.promoterColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
}

function filterPromoters(promoters) {
  const filters = state.promoterColumnFilters || {};
  return promoters.filter((promoter) => {
    return PROMOTER_COLUMNS.every(([key]) => {
      const filter = String(filters[key] || "").trim().toLowerCase();
      return !filter || promoterColumnValue(promoter, key).toLowerCase().includes(filter);
    });
  });
}

function sortPromoters(promoters) {
  const key = state.promoterSortKey || "rep";
  const direction = state.promoterSortDirection === "desc" ? -1 : 1;
  return [...promoters].sort((a, b) => direction * promoterColumnValue(a, key).localeCompare(promoterColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" }));
}

function promoterColumnValue(promoter, key) {
  if (key === "rep") return listText(`${promoter.contactName || ""} ${promoter.name || ""} ${promoter.title || ""}`);
  if (key === "company") return listText(promoter.companyName || "Independent");
  if (key === "phone") return listText(promoter.phone);
  if (key === "email") return listText(promoter.email);
  if (key === "notes") return listText(`${promoter.notes || ""} ${promoter.billing || ""} ${(promoter.accessLevels || []).join(" ")} ${promoter.smtpSecretRef ? "smtp saved" : ""} ${promoter.setupStatus || ""}`);
  return "";
}

function renderRunnerStops() {
  renderRunnerTableHead();
  if (isAdminRole()) {
    $("#runnerTableCount").textContent = "0 shown";
    renderRunnerCategoryControls(["All"]);
    $("#runnerTable").innerHTML = `<tr><td colspan="7" class="empty">ADMIN does not load gig directory data.</td></tr>`;
    return;
  }
  const categories = runnerCategories();
  if (!categories.includes(state.runnerCategory)) state.runnerCategory = "All";
  renderRunnerCategoryCreator();
  renderRunnerCategoryControls(categories);
  const rows = sortRunnerStops(state.runnerStops
    .filter((stop) => state.runnerCategory === "All" || (stop.category || "Other") === state.runnerCategory)
    .filter((stop) => matchesSearch(stop))
    .filter((stop) => matchesRunnerColumnFilters(stop)));
  $("#runnerTableCount").textContent = `${rows.length} shown`;
  $("#runnerTable").innerHTML = rows.length
    ? rows.map((stop) => runnerStopRow(stop)).join("")
    : `<tr><td colspan="7" class="empty">No resources match this search.</td></tr>`;
}

function renderRunnerCategoryControls(categories = runnerCategories()) {
  const allButton = $("#runnerCategoryAll");
  const select = $("#runnerCategorySelect");
  if (!allButton || !select) return;
  const categoryOptions = categories.filter((category) => category !== "All");
  allButton.classList.toggle("active", state.runnerCategory === "All");
  select.value = categoryOptions.includes(state.runnerCategory) ? state.runnerCategory : "";
  select.innerHTML = `<option value="">Select category</option>${categoryOptions.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
  select.value = categoryOptions.includes(state.runnerCategory) ? state.runnerCategory : "";
}

const RUNNER_COLUMNS = [
  ["name", "Name"],
  ["category", "Category"],
  ["address", "Address"],
  ["hours", "Hours"],
  ["bestUse", "Best use"],
  ["rating", "Rating"]
];

function runnerColumnValue(stop, key) {
  if (key === "name") return `${stop.name || ""} ${stop.phone || ""} ${[stop.city, stop.state].filter(Boolean).join(" ")}`;
  if (key === "rating") return String(runnerRatingSummary(stop.id).average || 0);
  return String(stop[key] || "");
}

function matchesRunnerColumnFilters(stop) {
  return Object.entries(state.runnerColumnFilters || {}).every(([key, value]) => {
    const term = String(value || "").trim().toLowerCase();
    if (!term) return true;
    return runnerColumnValue(stop, key).toLowerCase().includes(term);
  });
}

function sortRunnerStops(rows) {
  const key = state.runnerSortKey || "name";
  const direction = state.runnerSortDirection === "desc" ? -1 : 1;
  return rows.sort((a, b) => direction * runnerColumnValue(a, key).localeCompare(runnerColumnValue(b, key), undefined, { numeric: true, sensitivity: "base" }));
}

function renderRunnerTableHead() {
  const head = $("#runnerHead");
  if (!head) return;
  head.innerHTML = `<tr>${RUNNER_COLUMNS.map(([key, label]) => {
    const activeSort = state.runnerSortKey === key;
    const activeFilter = !!state.runnerColumnFilters?.[key];
    const arrow = activeSort ? (state.runnerSortDirection === "desc" ? "▼" : "▲") : "▾";
    return `<th><div class="column-filter-heading">
      <span>${escapeHtml(label)}</span>
      <details class="column-filter-menu ${activeSort || activeFilter ? "active" : ""}">
        <summary aria-label="${escapeHtml(label)} sort and filter">${arrow}</summary>
        <div class="record-options-menu">
          <button class="tiny-button" data-runner-sort="${escapeHtml(key)}" data-runner-sort-direction="asc" type="button">Sort A-Z</button>
          <button class="tiny-button" data-runner-sort="${escapeHtml(key)}" data-runner-sort-direction="desc" type="button">Sort Z-A</button>
          <label>Filter<input data-runner-column-filter="${escapeHtml(key)}" value="${escapeHtml(state.runnerColumnFilters?.[key] || "")}" placeholder="Type to filter"></label>
        </div>
      </details>
    </div></th>`;
  }).join("")}<th></th></tr>`;
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
  const currentIds = notificationRecipientIdsForCurrentUser();
  return dedupeVisibleNotifications(state.appNotifications
    .filter((notification) => notification.type !== "system" || isAdminRole())
    .filter((notification) => !notification.readAt)
    .filter((notification) => notificationMatchesCurrentRecipient(notification, currentIds))
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)));
}

function dedupeVisibleNotifications(notifications = []) {
  const seen = new Set();
  return notifications.filter((notification) => {
    const key = notificationDedupeKey(notification);
    if (!key || !seen.has(key)) {
      if (key) seen.add(key);
      return true;
    }
    return false;
  });
}

function notificationDedupeKey(notification = {}) {
  if (notification.type !== "message") return notification.id || "";
  return [
    "message",
    notification.threadKey || "",
    notification.messageId || "",
    notification.body || ""
  ].join("|");
}

function notificationCleanupKey(notification = {}) {
  if (notification.type !== "message") return "";
  const recipient = baseSendbirdUserId(notification.recipientId || (notification.recipientIds || [])[0] || "").trim();
  const messageKey = notification.messageId || notification.body || "";
  return [
    "message",
    notification.threadKey || "",
    messageKey,
    recipient
  ].join("|");
}

function preferredNotificationRecord(a = {}, b = {}) {
  if (!a) return b;
  if (!b) return a;
  if (!a.readAt && b.readAt) return a;
  if (a.readAt && !b.readAt) return b;
  return new Date(a.createdAt || a.updatedAt || 0) >= new Date(b.createdAt || b.updatedAt || 0) ? a : b;
}

function notificationRecipientIdsForCurrentUser() {
  const values = [
    currentThreadUserId(),
    currentSendbirdUserId(),
    authState.user?.id,
    authState.user?.email,
    authState.roleRecord?.worker_id,
    authState.roleRecord?.promoter_id,
    authState.roleRecord?.client_id,
    activeClientRepRecord()?.id,
    activeClientRepRecord()?.authUserId,
    activeClientRepRecord()?.email,
    getWorker(state.activeWorkerId)?.id,
    getWorker(state.activeWorkerId)?.authUserId,
    getWorker(state.activeWorkerId)?.email,
    getPromoter(state.activePromoterId)?.id,
    getPromoter(state.activePromoterId)?.authUserId,
    getPromoter(state.activePromoterId)?.email,
    activeAdminProfile()?.id,
    activeAdminProfile()?.authUserId,
    activeAdminProfile()?.email
  ];
  return new Set(values.map((value) => baseSendbirdUserId(value).trim()).filter(Boolean));
}

function notificationMatchesCurrentRecipient(notification, currentIds = notificationRecipientIdsForCurrentUser()) {
  const recipients = [
    notification.recipientId,
    ...(Array.isArray(notification.recipientIds) ? notification.recipientIds : [])
  ].map((value) => baseSendbirdUserId(value).trim()).filter(Boolean);
  if (!recipients.length) return true;
  return recipients.some((id) => currentIds.has(id));
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

function renderNotificationSurfaces() {
  renderNotifications();
  if (state.activeView === "messages" && sendbirdActiveThread?.type === "system") {
    renderMessageThread();
  }
}

function notificationSnapshot(notifications = state.appNotifications) {
  return notifications
    .map((notification) => [
      notification.id,
      notification.updatedAt,
      notification.readAt,
      notification.title,
      notification.body
    ].join("|"))
    .sort()
    .join("::");
}

async function refreshNotificationsFromStorage() {
  if (!authState.session) return;
  const existing = notificationSnapshot();
  await hydrateNotificationsFromSupabase();
  await cleanupDuplicateMessageNotifications();
  let notifications = (await getAll("appNotifications")).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const activeThreadType = sendbirdActiveThread?.type || "";
  const activeThreadKey = activeMessageThreadKey();
  const activeThreadNotices = activeThreadType && activeThreadKey
    ? notifications.filter((notification) =>
        !notification.readAt
        && notification.type === "message"
        && notification.threadType === activeThreadType
        && notification.threadKey === activeThreadKey
        && notificationMatchesCurrentRecipient(notification))
    : [];
  if (activeThreadNotices.length) {
    const now = new Date().toISOString();
    for (const notification of activeThreadNotices) {
      const updated = { ...notification, readAt: now };
      await put("appNotifications", updated);
      await syncAppNotificationToSupabase(updated);
    }
    notifications = (await getAll("appNotifications")).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }
  const next = notificationSnapshot(notifications);
  if (existing === next) return;
  state.appNotifications = notifications;
  renderNotificationSurfaces();
}

async function cleanupDuplicateMessageNotifications() {
  const notifications = (await getAll("appNotifications")).filter((notification) => notification.type === "message");
  const groups = new Map();
  notifications.forEach((notification) => {
    const key = notificationCleanupKey(notification);
    if (!key) return;
    const group = groups.get(key) || [];
    group.push(notification);
    groups.set(key, group);
  });
  const removeIds = [];
  groups.forEach((group) => {
    if (group.length <= 1) return;
    const keep = group.reduce((best, item) => preferredNotificationRecord(best, item), null);
    group.forEach((item) => {
      if (item.id !== keep?.id) removeIds.push(item.id);
    });
  });
  if (!removeIds.length) return;
  for (const id of removeIds) {
    const notification = notifications.find((item) => item.id === id);
    await remove("appNotifications", id);
    if (notification) await deleteAppNotificationFromSupabase(notification);
  }
  state.appNotifications = state.appNotifications.filter((notification) => !removeIds.includes(notification.id));
}

function startNotificationAutoRefresh() {
  if (notificationRefreshPoller) return;
  refreshNotificationsFromStorage().catch((error) => console.warn("Notification refresh failed", error));
  notificationRefreshPoller = window.setInterval(() => {
    refreshNotificationsFromStorage().catch((error) => console.warn("Notification refresh failed", error));
  }, NOTIFICATION_REFRESH_MS);
}

function stopNotificationRealtime() {
  if (!notificationRealtimeChannel || !supabaseClient) {
    notificationRealtimeChannel = null;
    return;
  }
  supabaseClient.removeChannel?.(notificationRealtimeChannel);
  notificationRealtimeChannel = null;
}

function startNotificationRealtime() {
  if (!supabaseClient || !authState.session || notificationRealtimeChannel) return;
  notificationRealtimeChannel = supabaseClient
    .channel(`app-notifications-${authState.user?.id || Date.now()}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "app_records",
        filter: "store_name=eq.appNotifications"
      },
      (payload) => {
        applyRealtimeNotificationRecord(payload.new).catch((error) => console.warn("Realtime notification update failed", error));
      }
    )
    .subscribe();
}

async function applyRealtimeNotificationRecord(row = {}) {
  const notification = row.data;
  if (!notification?.id || !notificationMatchesCurrentRecipient(notification)) return;
  const activeThreadType = sendbirdActiveThread?.type || "";
  const activeThreadKey = activeMessageThreadKey();
  const isOpenMessageThread = notification.type === "message"
    && activeThreadType
    && activeThreadKey
    && notification.threadType === activeThreadType
    && notification.threadKey === activeThreadKey;
  if (isOpenMessageThread) {
    const saved = { ...notification, readAt: notification.readAt || new Date().toISOString() };
    await put("appNotifications", saved);
    state.appNotifications = [saved, ...state.appNotifications.filter((item) => item.id !== saved.id)]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    renderNotifications();
    return;
  }
  await put("appNotifications", notification);
  await loadState();
  renderNotificationSurfaces();
}

function releaseNotificationId(version) {
  return `release-${String(version || "").toLowerCase().replaceAll(".", "-")}`;
}

async function createAppNotification({ title, body = "", type = "info", viewId = "", recordId = "", recipientId = "", skipCloudSync = false, ...extra }) {
  if (!title) return;
  const notification = {
    ...extra,
    title,
    body,
    type,
    viewId,
    recordId,
    recipientId
  };
  const id = await put("appNotifications", notification);
  const saved = { ...notification, id: notification.id || id };
  state.appNotifications = [saved, ...state.appNotifications.filter((item) => item.id !== saved.id)]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  renderNotificationSurfaces();
  if (!skipCloudSync) syncAppNotificationToSupabase(saved).catch((error) => console.warn("Notification sync failed", error));
  refreshNotificationsFromStorage().catch((error) => console.warn("Notification refresh failed", error));
  return saved;
}

function notificationCloudClientId(notification = {}) {
  if (notification.clientId) return notification.clientId;
  if (notification.threadType === "adminClient" && notification.threadProfileId) return notification.threadProfileId;
  if (notification.threadEventId) return getEvent(notification.threadEventId)?.clientId || eventClientId(getEvent(notification.threadEventId));
  if (authState.roleRecord?.worker_id) return getWorker(authState.roleRecord.worker_id)?.clientId || "";
  if (state.activeWorkerId) return getWorker(state.activeWorkerId)?.clientId || "";
  return cloudClientId();
}

async function syncAppNotificationToSupabase(notification) {
  if (!supabaseClient || !authState.session || !notification?.id) return;
  const clientId = notificationCloudClientId(notification);
  if (!clientId) return;
  const { error } = await supabaseClient
    .from("app_records")
    .upsert({
      client_id: clientId,
      store_name: "appNotifications",
      record_id: String(notification.id),
      data: { ...notification, clientId },
      updated_by: authState.user?.id || null
    }, { onConflict: "client_id,store_name,record_id" });
  if (error) throw error;
}

async function deleteAppNotificationFromSupabase(notification) {
  if (!supabaseClient || !authState.session || !notification?.id) return;
  const clientId = notificationCloudClientId(notification);
  if (!clientId) return;
  const { error } = await supabaseClient
    .from("app_records")
    .delete()
    .eq("client_id", clientId)
    .eq("store_name", "appNotifications")
    .eq("record_id", String(notification.id));
  if (error) throw error;
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
  await refreshNotificationsFromStorage();
}

async function ensureReleaseNotification(notice = CURRENT_RELEASE_NOTICE) {
  if (!authState.session || !isAdminRole()) return;
  const id = releaseNotificationId(notice.version);
  const existing = state.appNotifications.find((notification) => notification.id === id);
  if (existing?.title === notice.title && existing?.body === notice.body) return;
  await put("appNotifications", {
    ...(existing || {}),
    id,
    title: notice.title || `${notice.version} update installed`,
    body: notice.body || "A new app update is ready.",
    type: "system",
    viewId: "messages",
    threadType: "system",
    threadKey: "system-admin",
    recipientId: ""
  });
  await refreshNotificationsFromStorage();
}

async function checkReleaseNotice() {
  if (!authState.session || !isAdminRole()) return;
  try {
    const response = await fetch(`${RELEASE_NOTICE_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const notice = await response.json();
    if (!notice?.version) return;
    await ensureReleaseNotification(notice);
    const registration = await navigator.serviceWorker?.getRegistration?.();
    await registration?.update?.();
  } catch (error) {
    console.warn("Release notice check failed", error);
  }
}

function startReleaseNoticePoller() {
  if (releaseNoticePoller || !isAdminRole()) return;
  checkReleaseNotice();
  releaseNoticePoller = window.setInterval(() => {
    checkReleaseNotice();
  }, RELEASE_NOTICE_POLL_MS);
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
    const updated = { ...notification, readAt: now };
    await put("appNotifications", updated);
    await syncAppNotificationToSupabase(updated);
  }
  await loadState();
}

async function clearReadNotifications() {
  const read = state.appNotifications.filter((notification) => notification.readAt);
  for (const notification of read) {
    await remove("appNotifications", notification.id);
    await deleteAppNotificationFromSupabase(notification);
  }
  await loadState();
}

async function openNotification(id) {
  const notification = state.appNotifications.find((item) => item.id === id);
  if (!notification) return;
  if (!notification.readAt) {
    const updated = { ...notification, readAt: new Date().toISOString() };
    await put("appNotifications", updated);
    await syncAppNotificationToSupabase(updated);
  }
  await loadState();
  if (notification.viewId) setView(notification.viewId);
  if (notification.threadType && notification.threadKey) await openNotificationMessageThread(notification);
  if (notification.viewId === "timecards" && notification.recordId) openReadOnlyRecord("timecards", notification.recordId);
  const center = $("#notificationCenter");
  if (center) center.open = false;
  renderNotificationSurfaces();
}

async function openNotificationMessageThread(notification) {
  if (notification.threadType === "direct") {
    await openDirectMessageChannel(directProfileIdFromThreadKey(notification.threadKey) || notification.threadProfileId);
    return;
  }
  if (["event", "office", "crew"].includes(notification.threadType)) {
    await openMessageChannel(notification.threadType, notification.threadEventId || threadEventIdFromThreadKey(notification.threadKey));
    return;
  }
  await openPermanentMessageChannel(notification.threadType, notification.threadProfileId || notification.threadKey);
}

function threadEventIdFromThreadKey(threadKey = "") {
  const [type, ...parts] = String(threadKey || "").split(":");
  return ["event", "office", "crew"].includes(type) ? parts.join(":") : "";
}

function directProfileIdFromThreadKey(threadKey = "") {
  const parts = String(threadKey || "").split(":").slice(1);
  const currentId = currentThreadUserId();
  return parts.find((part) => part && part !== currentId) || "";
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
  return mobileMessagingChatCards();
}

function isMobileMessageLayout() {
  return window.matchMedia?.("(max-width: 860px)")?.matches || false;
}

function mobileMessagingChatCards() {
  const eventThreads = mobileEventThreadCards();
  const directProfiles = mobileDirectMessageProfiles();
  const permanentThreads = ["adminClient", "system"].flatMap((type) => visibleMessageThreadTypes().some(([visibleType]) => visibleType === type) ? permanentMessageThreadTargets(type) : []);
  const showEventControls = messageEventControlsPinnedOpen() || state.messageEventPickerOpen;
  const permanentCollapsed = messageSectionCollapsed("permanent");
  const eventCollapsed = messageSectionCollapsed("event");
  return `<div class="mobile-message-sections">
    ${permanentThreads.length ? `<section class="mobile-message-section ${permanentCollapsed ? "is-collapsed" : "is-open"}">
      <div class="mobile-message-section-heading">
        <button class="message-section-toggle" data-message-section-toggle="permanent" type="button" aria-expanded="${String(!permanentCollapsed)}">
          <span>${permanentCollapsed ? ">" : "v"}</span>
          <h4>Permanent Threads</h4>
        </button>
        ${permanentCollapsed ? "" : adminPermanentThreadClientSelect()}
      </div>
      <div class="mobile-message-list" ${permanentCollapsed ? "hidden" : ""}>${permanentThreads.map((thread) => permanentMessageCard(thread)).join("")}</div>
    </section>` : ""}
    <section class="mobile-message-section ${eventCollapsed ? "is-collapsed" : "is-open"}">
      <div class="mobile-message-section-heading">
        <button class="message-section-toggle" data-message-section-toggle="event" type="button" aria-expanded="${String(!eventCollapsed)}">
          <span>${eventCollapsed ? ">" : "v"}</span>
          <h4>Event Threads</h4>
        </button>
        ${messageEventControlsPinnedOpen() || eventCollapsed ? "" : `<button class="tiny-button" data-message-event-options type="button">Events</button>`}
      </div>
      <div class="mobile-message-list" ${eventCollapsed ? "hidden" : ""}>${showEventControls ? mobileMessageEventControls() : ""}${eventThreads || `<div class="compact-item empty">No event threads are available for this schedule view.</div>`}</div>
    </section>
    <section class="mobile-message-section mobile-message-direct-section is-open">
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

function messageSectionCollapsed(section) {
  if (["permanent", "event"].includes(section) && !(section in (state.collapsedMessageSections || {}))) return true;
  return !!state.collapsedMessageSections?.[section];
}

function setMessageSectionCollapsed(section, collapsed) {
  state.collapsedMessageSections = {
    ...state.collapsedMessageSections,
    [section]: !!collapsed
  };
  if (!collapsed && section === "permanent") state.collapsedMessageSections.event = true;
  if (!collapsed && section === "event") state.collapsedMessageSections.permanent = true;
  if (collapsed && section === "event") state.messageEventPickerOpen = false;
  localStorage.setItem("productionCrewCollapsedMessageSections", JSON.stringify(state.collapsedMessageSections));
}

function selectedPermanentMessageClient() {
  if (!state.clients.length) return null;
  const selected = state.clients.find((client) => client.id === state.selectedPermanentMessageClientId);
  const fallback = selected || state.clients[0];
  if (fallback && state.selectedPermanentMessageClientId !== fallback.id) {
    state.selectedPermanentMessageClientId = fallback.id;
    localStorage.setItem("productionCrewPermanentMessageClientId", fallback.id);
  }
  return fallback;
}

function adminPermanentThreadClientSelect() {
  if (!isAdminRole() || state.clients.length <= 1) return "";
  const selected = selectedPermanentMessageClient();
  return `<select class="message-section-select" data-permanent-message-client aria-label="Choose client support thread">
    ${state.clients.map((client) => `<option value="${escapeHtml(client.id)}" ${selected?.id === client.id ? "selected" : ""}>${escapeHtml(client.name || "Client")}</option>`).join("")}
  </select>`;
}

function messageEventControlsPinnedOpen() {
  return ["CLIENT_ADMIN", "PROMOTER_ADMIN"].includes(normalizeAccessLevel(state.accessRole));
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
  const selectedClient = selectedPermanentMessageClient();
  return (selectedClient ? [selectedClient] : state.clients).map((client) => ({
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
  clearActiveMessageThread();
  renderMessaging();
}

function clearActiveMessageThread() {
  sendbirdActiveChannel = null;
  sendbirdActiveThread = null;
  sendbirdMessages = [];
  sendbirdTypingUsers = [];
  messageThreadRenderQueued = false;
  messageThreadOpeningUntil = 0;
  window.clearTimeout(messageThreadScrollTimer);
  $("#messages")?.classList.remove("message-chat-open");
  document.body.classList.remove("mobile-message-chat-open");
  const panel = $("#activeMessagePanel");
  if (panel && isMobileMessageLayout()) panel.hidden = true;
  $("#sendbirdMessageForm")?.setAttribute("hidden", "");
}

function renderMessageThread(options = {}) {
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
  if (panel) panel.hidden = state.activeView !== "messages" || (!sendbirdActiveChannel && isMobileMessageLayout());
  if (!sendbirdActiveChannel) {
    if (title) title.textContent = "Select a chat";
    if (meta) meta.textContent = "Choose a thread or direct message from the list.";
    if (members) members.innerHTML = "";
    if (typing) {
      typing.innerHTML = "";
      typing.hidden = true;
    }
    form.hidden = true;
    clearPendingMessageAttachments();
    thread.innerHTML = `<div class="chat-thread-empty">Choose a message thread from the list.</div>`;
    return;
  }
  const shouldPinBottom = options.pinToBottom || Date.now() < messageThreadPinBottomUntil;
  const scrollState = shouldPinBottom ? null : captureActiveMessageScrollState();
  title.textContent = activeMessageThreadTitle();
  meta.textContent = activeThreadManagementLabel();
  if (members) members.innerHTML = renderActiveThreadMembers();
  form.hidden = !sendbirdActiveChannel;
  const visibleMessages = activeThreadVisibleMessages();
  renderMessageThreadBubbles(thread, visibleMessages);
  if (typing) {
    const typingHtml = renderTypingStatus();
    typing.innerHTML = typingHtml;
    typing.hidden = !typingHtml;
  }
  renderMessageComposerTools();
  if (shouldPinBottom) {
    pinActiveMessageThreadToBottom();
    window.requestAnimationFrame(() => {
      pinActiveMessageThreadToBottom({ repeat: false });
    });
  } else {
    if (Date.now() < messageThreadOpeningUntil) scrollActiveMessageThreadToBottomWhenReady();
    else restoreActiveMessageScrollState(scrollState);
  }
}

function renderMessageThreadBubbles(thread, visibleMessages = []) {
  if (!visibleMessages.length) {
    if (!thread.querySelector(".chat-thread-empty")) {
      thread.innerHTML = `<div class="chat-thread-empty">No messages loaded yet.</div>`;
    }
    return;
  }
  thread.querySelector(".chat-thread-empty")?.remove();
  let list = thread.querySelector(".chat-thread");
  if (!list) {
    thread.innerHTML = `<div class="chat-thread"></div>`;
    list = thread.querySelector(".chat-thread");
  }
  const currentNodes = Array.from(list.querySelectorAll("[data-message-action-key]"));
  let needsRebuild = currentNodes.length > visibleMessages.length;
  visibleMessages.forEach((message) => {
    const key = messageActionKey(message);
    const current = currentNodes[visibleMessages.indexOf(message)];
    if (current && current.dataset.messageActionKey !== key) needsRebuild = true;
  });
  if (needsRebuild) {
    list.innerHTML = visibleMessages.map((message) => messageBubble(message)).join("");
    Array.from(list.querySelectorAll("[data-message-action-key]")).forEach((node) => {
      node.dataset.messageHtml = node.outerHTML;
    });
    return;
  }
  visibleMessages.forEach((message, index) => {
    const html = messageBubble(message);
    const current = currentNodes[index];
    if (current && current.dataset.messageHtml === html) return;
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const node = template.content.firstElementChild;
    if (!node) return;
    node.dataset.messageHtml = html;
    if (current) current.replaceWith(node);
    else list.appendChild(node);
  });
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

function scrollActiveMessageThreadToBottom(options = {}) {
  window.requestAnimationFrame(() => {
    const thread = $("#messageThread");
    if (!thread) return;
    messageThreadProgrammaticScrollUntil = Date.now() + 180;
    thread.scrollTop = thread.scrollHeight;
  });
  if (options.repeat) {
    [45, 140, 320, 650].forEach((delay) => {
      window.setTimeout(() => scrollActiveMessageThreadToBottom(), delay);
    });
  }
}

function pinActiveMessageThreadToBottom(options = {}) {
  const thread = $("#messageThread");
  if (!thread) return;
  messageThreadUserScrollingUntil = 0;
  messageThreadProgrammaticScrollUntil = Date.now() + 180;
  thread.scrollTop = thread.scrollHeight;
  scrollActiveMessageThreadToBottom({ repeat: options.repeat !== false });
}

function pinMessageThreadAfterSend() {
  messageThreadPinBottomUntil = Date.now() + 900;
  messageThreadUserScrollingUntil = 0;
  messageThreadRenderQueued = false;
  window.clearTimeout(messageThreadScrollTimer);
  pinActiveMessageThreadToBottom();
}

function scrollActiveMessageThreadToBottomWhenReady(attempt = 0) {
  const thread = $("#messageThread");
  const panel = $("#activeMessagePanel");
  const ready = !!thread
    && !!panel
    && !panel.hidden
    && thread.clientHeight > 0
    && thread.scrollHeight >= thread.clientHeight;
  if (ready || attempt >= 12) {
    scrollActiveMessageThreadToBottom({ repeat: true });
    return;
  }
  window.setTimeout(() => scrollActiveMessageThreadToBottomWhenReady(attempt + 1), 50);
}

function markMessageThreadUserScrolling() {
  if (!sendbirdActiveChannel) return;
  if (Date.now() < messageThreadProgrammaticScrollUntil) return;
  messageThreadUserScrollingUntil = Date.now() + 1200;
}

function userIsActivelyScrollingMessageThread() {
  return Date.now() < messageThreadUserScrollingUntil;
}

function queueMessageThreadRenderAfterScroll(options = {}) {
  const waitMs = Math.max(180, messageThreadUserScrollingUntil - Date.now() + 90);
  messageThreadRenderQueued = true;
  window.clearTimeout(messageThreadScrollTimer);
  messageThreadScrollTimer = window.setTimeout(() => {
    if (userIsActivelyScrollingMessageThread()) {
      queueMessageThreadRenderAfterScroll(options);
      return;
    }
    messageThreadRenderQueued = false;
    if (!sendbirdActiveChannel) return;
    renderMessageThread({ pinToBottom: !!options.scrollToBottom });
  }, waitMs);
}

function renderOpenMessageThreadAtBottom() {
  messageThreadUserScrollingUntil = 0;
  messageThreadOpeningUntil = Date.now() + 900;
  messageThreadRenderQueued = false;
  window.clearTimeout(messageThreadScrollTimer);
  renderMessaging();
  markMessageThreadNotificationsRead(sendbirdActiveThread?.type || "", activeMessageThreadKey()).catch((error) => console.warn("Message notification cleanup failed", error));
  scrollActiveMessageThreadToBottomWhenReady();
}

function activeMessageScrollTarget() {
  const thread = $("#messageThread");
  if (!thread) return null;
  if (isMobileMessageLayout()) return thread;
  const threadCanScroll = thread.scrollHeight > thread.clientHeight + 2 && getComputedStyle(thread).overflowY !== "visible";
  if (threadCanScroll) return thread;
  return thread;
}

function activeMessageScrollTop(target) {
  return target === document.scrollingElement || target === document.documentElement
    ? window.scrollY || target.scrollTop || 0
    : target.scrollTop;
}

function setActiveMessageScrollTop(target, top) {
  messageThreadProgrammaticScrollUntil = Date.now() + 180;
  if (target === document.scrollingElement || target === document.documentElement) {
    window.scrollTo({ top, left: 0, behavior: "auto" });
    return;
  }
  target.scrollTop = top;
}

function isActiveMessageScrolledToBottom() {
  const target = activeMessageScrollTarget();
  if (!target) return true;
  const gap = target.scrollHeight - target.clientHeight - activeMessageScrollTop(target);
  return gap <= 96;
}

function captureActiveMessageScrollState() {
  const target = activeMessageScrollTarget();
  if (!target) return { target: null, top: 0 };
  return {
    target,
    top: activeMessageScrollTop(target)
  };
}

function restoreActiveMessageScrollState(scrollState) {
  if (!scrollState?.target) return;
  window.requestAnimationFrame(() => {
    const target = activeMessageScrollTarget();
    if (!target) return;
    setActiveMessageScrollTop(target, Math.min(scrollState.top, target.scrollHeight));
  });
}

function messageBubble(message) {
  const senderName = message.sender?.nickname || message.sender?.userId || "Message";
  const senderId = message.sender?.userId || "";
  const senderProfile = profileForSendbirdUserId(senderId, message.sender);
  const displayName = senderProfile?.name || senderProfile?.contactName || senderName;
  const isOwn = !!message.isLocalOwn || !!message.deliveryStatus || (senderId && baseSendbirdUserId(senderId) === baseSendbirdUserId(sendbirdClient?.currentUser?.userId));
  const sentAt = message.createdAt ? formatDate(message.createdAt) : "";
  const deliveryStatus = isOwn ? (message.deliveryStatus === "sending" ? "Sending..." : "Delivered") : "";
  const actionKey = messageActionKey(message);
  const reply = messageReplyData(message);
  const tone = messageSenderTone(message, senderProfile);
  return `<article class="message-bubble-row ${isOwn ? "own" : ""} tone-${escapeHtml(tone)}" data-message-action-key="${escapeHtml(actionKey)}">
    ${isOwn ? "" : messageAvatar(senderProfile, displayName, tone)}
    <div class="message-bubble">
      <div class="message-meta"><strong>${escapeHtml(isOwn ? "You" : displayName)}</strong><span>${escapeHtml(sentAt)}</span></div>
      ${reply ? `<div class="message-reply-quote"><span>${escapeHtml(reply.senderName || "Message")}</span><strong>${escapeHtml(reply.text || "Message")}</strong></div>` : ""}
      ${messageMediaHtml(message)}
      ${message.message ? `<p>${escapeHtml(message.message || "")}</p>` : ""}
      ${deliveryStatus ? `<span class="message-delivery-status">${escapeHtml(deliveryStatus)}</span>` : ""}
    </div>
  </article>`;
}

function messageActionKey(message) {
  return String(message?.messageId || message?.reqId || message?.requestId || `local-${message?.createdAt || Date.now()}`);
}

function messageByActionKey(key) {
  return activeThreadVisibleMessages().find((message) => messageActionKey(message) === key) || null;
}

function messageReplyData(message) {
  if (message?.replyTo) return message.replyTo;
  try {
    return JSON.parse(message?.data || "{}")?.replyTo || null;
  } catch {
    return null;
  }
}

function messageReplySummary(message) {
  const senderName = message.sender?.nickname || message.sender?.userId || "Message";
  const senderProfile = profileForSendbirdUserId(message.sender?.userId || "");
  const displayName = senderProfile?.name || senderProfile?.contactName || senderName;
  const text = String(message.message || message.name || message.fileName || "Photo").replace(/\s+/g, " ").trim();
  return {
    messageId: sendbirdMessageKey(message) || messageActionKey(message),
    senderName: displayName,
    text: text.slice(0, 120)
  };
}

function messageMediaHtml(message) {
  const url = message.url || message.plainUrl || message.fileUrl || message.previewUrl || "";
  const type = message.type || message.mimeType || message.fileType || "";
  const text = String(message.message || "");
  const gifUrl = imageUrlFromText(text);
  const imageUrl = url || gifUrl;
  if (!imageUrl || !(type.startsWith("image/") || /\.(gif|png|jpe?g|webp)(\?.*)?$/i.test(imageUrl))) return "";
  const label = message.name || message.fileName || "Message image";
  return `<button class="message-media-link" type="button" data-open-message-image="${escapeHtml(imageUrl)}" data-message-image-label="${escapeHtml(label)}"><img class="message-media-image" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(label)}"></button>`;
}

function openMessageImagePreview(url, label = "Message image") {
  if (!url) return;
  $("#messageImagePreviewModal")?.remove();
  const modal = document.createElement("section");
  modal.id = "messageImagePreviewModal";
  modal.className = "form-panel modal-form message-image-preview-modal";
  modal.innerHTML = `<div class="panel-heading">
    <div>
      <h3>${escapeHtml(label || "Message image")}</h3>
      <p>Image preview</p>
    </div>
    <button class="icon-button clean-icon-button message-image-preview-close" type="button" data-close-message-image-preview aria-label="Close image preview">×</button>
  </div>
  <div class="message-image-preview-stage"><img src="${escapeHtml(url)}" alt="${escapeHtml(label || "Message image")}"></div>`;
  $("#modalHost")?.appendChild(modal);
  $("#modalBackdrop").classList.add("show");
  document.body.classList.add("modal-open");
}

function closeMessageImagePreview() {
  $("#messageImagePreviewModal")?.remove();
  $("#modalBackdrop").classList.remove("show");
  document.body.classList.remove("modal-open");
}

function giphyApiReady() {
  return !!GIPHY_API_KEY && !GIPHY_API_KEY.includes("YOUR_GIPHY_API_KEY");
}

function giphyImageUrl(gif = {}, preview = false) {
  const images = gif.images || {};
  return (preview
    ? images.fixed_height_small?.url || images.fixed_width_small?.url || images.preview_gif?.url
    : images.downsized_medium?.url || images.downsized?.url || images.original?.url || images.fixed_height?.url) || "";
}

function renderGiphyResults(items = giphyResults, message = "") {
  const status = $("#giphyStatus");
  const results = $("#giphyResults");
  if (!status || !results) return;
  status.textContent = message || (giphyApiReady() ? "Search GIPHY for a reaction." : "Add a GIPHY API key to enable search, or paste a GIF link below.");
  results.innerHTML = items.length
    ? items.map((gif, index) => {
        const previewUrl = giphyImageUrl(gif, true);
        const title = gif.title || "GIPHY result";
        return `<button class="giphy-result" data-giphy-result="${index}" type="button" aria-label="${escapeHtml(title)}"><img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(title)}"><span>${escapeHtml(title)}</span></button>`;
      }).join("")
    : "";
}

async function searchGiphy(query) {
  if (!giphyApiReady()) {
    renderGiphyResults([], "GIPHY search needs an API key. You can still paste a GIF link below.");
    return;
  }
  const clean = String(query || "").trim().slice(0, 50);
  if (!clean) {
    renderGiphyResults([], "Type a word or phrase to search GIPHY.");
    return;
  }
  renderGiphyResults([], "Searching GIPHY...");
  const url = new URL(GIPHY_SEARCH_ENDPOINT);
  url.searchParams.set("api_key", GIPHY_API_KEY);
  url.searchParams.set("q", clean);
  url.searchParams.set("limit", "18");
  url.searchParams.set("rating", "pg");
  url.searchParams.set("lang", "en");
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`GIPHY search failed: ${response.status}`);
  const payload = await response.json();
  giphyResults = Array.isArray(payload.data) ? payload.data : [];
  renderGiphyResults(giphyResults, giphyResults.length ? `${giphyResults.length} GIFs found.` : "No GIFs found. Try another search.");
}

function registerGiphyAction(gif = {}, action = "onclick") {
  const url = gif.analytics?.[action]?.url;
  if (!url) return;
  try {
    const ping = new URL(url);
    ping.searchParams.set("ts", Date.now().toString());
    ping.searchParams.set("random_id", crypto.randomUUID());
    fetch(ping.toString(), { mode: "no-cors" }).catch(() => {});
  } catch (error) {
    console.warn("GIPHY analytics skipped.", error);
  }
}

function addGifUrlToMessage(url = "") {
  const clean = String(url || "").trim();
  if (!clean) {
    toast("Choose a GIF or paste a GIF link first.");
    return false;
  }
  insertIntoMessageInput(`${clean} `);
  closeForm("messageGifForm");
  return true;
}

function addManualMessageGifLink() {
  const input = $("#messageGifForm")?.elements.gifUrl;
  const url = String(input?.value || "").trim();
  if (!url) {
    toast("Paste a GIF link first.");
    return false;
  }
  return addGifUrlToMessage(url);
}

function selectGiphyResult(index) {
  const gif = giphyResults[Number(index)];
  const url = giphyImageUrl(gif, false);
  if (!gif || !url) {
    toast("Could not add that GIF.");
    return;
  }
  registerGiphyAction(gif, "onclick");
  addGifUrlToMessage(url);
}

async function saveMessageGifLink(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.giphySearch?.value || "";
  try {
    await searchGiphy(query);
  } catch (error) {
    console.error(error);
    renderGiphyResults([], "GIPHY search could not load. Paste a GIF link below, or try again.");
  }
}

function imageUrlFromText(text = "") {
  return String(text).split(/\s+/).find((part) => /^https?:\/\/\S+\.(gif|png|jpe?g|webp)(\?\S*)?$/i.test(part)) || "";
}

function profileForSendbirdUserId(userId, identity = {}) {
  const id = baseSendbirdUserId(userId).trim();
  if (!id) return null;
  if (id === "adminProfile") return activeAdminProfile();
  if (id === "system_ops") return { id: "system_ops", name: "System", contactName: "System" };
  const matches = [
    ...state.workers,
    ...state.promoters,
    ...state.clientReps,
    ...state.systemProfiles,
    ...state.productionContacts,
    ...state.venueContacts
  ].filter((profile) => [profile.authUserId, profile.id, profile.email].map((value) => baseSendbirdUserId(value).trim()).includes(id));
  if (matches.length <= 1) return matches[0] || null;
  const displayName = normalizedMatchValue(identity?.nickname || identity?.name || "");
  if (!displayName) return matches[0] || null;
  return matches.find((profile) => normalizedMatchValue(profile.name || profile.contactName || "") === displayName)
    || matches.find((profile) => normalizedMatchValue(profile.name || profile.contactName || "").includes(displayName))
    || matches[0]
    || null;
}

function messageData(message) {
  try {
    return JSON.parse(message?.data || "{}") || {};
  } catch {
    return {};
  }
}

function messageSenderTone(message, profile) {
  const tone = String(messageData(message).senderTone || "").trim();
  return ["admin", "account", "client", "accounting", "promoter", "production", "crew"].includes(tone) ? tone : messageAvatarTone(profile);
}

function messageAvatarTone(profile) {
  if (!profile) return "client";
  if (profile.id === "adminProfile" || profile.id === "system_ops" || state.systemProfiles.some((item) => item.id === profile.id)) return "admin";
  const accessLevels = normalizeAccessLevels(profile.accessLevels, profile.loginRole || profile.role || "");
  const baseRoles = accessLevels.map(baseRoleForAccess);
  if (baseRoles.includes("ADMIN")) return "admin";
  if (baseRoles.includes("ACCOUNT")) return "account";
  if (baseRoles.includes("ACCOUNTING")) return "accounting";
  if (baseRoles.includes("CLIENT")) return "client";
  if (baseRoles.includes("PROMOTER")) return "promoter";
  if (baseRoles.includes("PRODUCTION")) return "production";
  if (baseRoles.includes("CREW")) return "crew";
  if (state.clientReps.some((item) => item.id === profile.id)) return "client";
  if (state.promoters.some((item) => item.id === profile.id)) return "promoter";
  if (state.productionContacts.some((item) => item.id === profile.id)) return "production";
  if (state.workers.some((item) => item.id === profile.id)) return "crew";
  return "client";
}

function messageAvatar(profile, fallbackName = "User", toneOverride = "") {
  const label = profile?.name || profile?.contactName || fallbackName;
  const tone = toneOverride || messageAvatarTone(profile);
  if (profile?.headshotData && !profile.hideHeadshot) {
    return `<img class="message-avatar image tone-${escapeHtml(tone)}" src="${profile.headshotData}" alt="${escapeHtml(label)} headshot">`;
  }
  return `<div class="message-avatar tone-${escapeHtml(tone)}">${escapeHtml(initialsFor(label))}</div>`;
}

function renderTypingStatus() {
  if (!sendbirdActiveChannel) return "";
  const users = sendbirdTypingUsers.filter((user) => user?.userId !== sendbirdClient?.currentUser?.userId);
  if (!users.length) return "";
  const names = users.map((user) => typingUserDisplayName(user)).filter(Boolean).slice(0, 3);
  return `<span>${escapeHtml(names.join(", "))} ${names.length === 1 ? "is" : "are"} typing...</span>`;
}

function renderMessageComposerTools() {
  renderMessageAttachmentPreview();
  renderMessageReplyPreview();
}

function renderMessageAttachmentPreview() {
  const preview = $("#messageAttachmentPreview");
  if (!preview) return;
  preview.innerHTML = pendingMessageAttachments.length
    ? pendingMessageAttachments.map((item, index) => {
        const isImage = String(item.type || "").startsWith("image/") || item.previewUrl;
        return `<span class="message-attachment-chip ${isImage ? "image-preview" : ""}">
          ${isImage ? `<img src="${escapeHtml(item.previewUrl)}" alt="Selected image preview">` : `<span>${escapeHtml(item.name)}</span>`}
          <button type="button" data-remove-message-attachment="${index}" aria-label="Remove attachment">×</button>
        </span>`;
      }).join("")
    : "";
  preview.hidden = !pendingMessageAttachments.length;
}

function renderMessageReplyPreview() {
  const preview = $("#messageReplyPreview");
  if (!preview) return;
  if (!pendingMessageReply) {
    preview.hidden = true;
    preview.innerHTML = "";
    return;
  }
  preview.hidden = false;
  preview.innerHTML = `<div><span>Replying to ${escapeHtml(pendingMessageReply.senderName || "Message")}</span><strong>${escapeHtml(pendingMessageReply.text || "Message")}</strong></div><button type="button" data-clear-message-reply aria-label="Clear reply">×</button>`;
}

function clearPendingMessageAttachments() {
  pendingMessageAttachments = [];
  const input = $("#messagePhotoInput");
  if (input) input.value = "";
  renderMessageAttachmentPreview();
}

function clearPendingMessageReply() {
  pendingMessageReply = null;
  renderMessageReplyPreview();
}

async function addMessagePhotoAttachments(files = []) {
  const next = await Promise.all(Array.from(files).map(async (file) => ({
    file,
    name: file.name || "Photo",
    type: file.type || "image/jpeg",
    previewUrl: await readFileAsDataUrl(file)
  })));
  pendingMessageAttachments = [...pendingMessageAttachments, ...next].slice(0, 6);
  renderMessageAttachmentPreview();
}

function insertIntoMessageInput(text) {
  const input = $("#sendbirdMessageForm")?.elements?.message;
  if (!input) return;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  input.value = `${input.value.slice(0, start)}${text}${input.value.slice(end)}`;
  input.focus();
  input.selectionStart = input.selectionEnd = start + text.length;
}

function openMessageActionMenu(key, anchor) {
  const message = messageByActionKey(key);
  if (!message || !anchor) return;
  closeMessageActionMenu();
  const menu = document.createElement("div");
  menu.id = "messageActionMenu";
  menu.className = "message-action-menu";
  menu.dataset.messageActionKey = key;
  menu.innerHTML = `<button type="button" data-message-reply>Reply</button>
    <button type="button" data-message-emoji="👍" aria-label="Send thumbs up">👍</button>
    <button type="button" data-message-emoji="❤️" aria-label="Send heart">❤️</button>
    <button type="button" data-message-emoji="😂" aria-label="Send laughing emoji">😂</button>`;
  document.body.append(menu);
  const rect = anchor.getBoundingClientRect();
  const top = Math.max(12, rect.top + window.scrollY - menu.offsetHeight - 8);
  const left = Math.min(window.innerWidth - menu.offsetWidth - 12, Math.max(12, rect.left + window.scrollX));
  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
}

function closeMessageActionMenu() {
  $("#messageActionMenu")?.remove();
}

function replyToMessageKey(key) {
  const message = messageByActionKey(key);
  if (!message) return;
  pendingMessageReply = messageReplySummary(message);
  renderMessageReplyPreview();
  closeMessageActionMenu();
  $("#sendbirdMessageForm")?.elements?.message?.focus();
}

async function sendQuickMessageEmoji(key, emoji) {
  const message = messageByActionKey(key);
  if (!message || !sendbirdActiveChannel) return;
  await sendSendbirdPayload({ message: emoji, attachments: [], reply: messageReplySummary(message) });
  closeMessageActionMenu();
}

function messagePushPolicy() {
  return sendbirdActiveThread?.type === "direct"
    ? "direct_always"
    : "group_clocked_in_only";
}

function messageDataPayload(extra = {}) {
  return JSON.stringify({
    threadType: sendbirdActiveThread?.type || state.messagingThreadType || "",
    threadKey: sendbirdActiveThread
      ? messageThreadKey(sendbirdActiveThread.type, sendbirdActiveThread.eventId || "", sendbirdActiveThread.profileId || "")
      : "",
    senderTone: messageAvatarTone(currentMessagingProfile()),
    phonePushPolicy: messagePushPolicy(),
    ...extra
  });
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
  const noteUi = runnerStopNoteUi(stop);
  const location = [stop.city, stop.state].filter(Boolean).join(", ");
  return `<tr><td><strong>${recordLink("runnerStops", stop.id, stop.name)}</strong><p>${escapeHtml(stop.phone)}</p>${location ? `<p>${escapeHtml(location)}</p>` : ""}</td><td>${escapeHtml(stop.category)}</td><td>${escapeHtml(stop.address)}</td><td>${escapeHtml(stop.hours)}</td><td>${escapeHtml(stop.bestUse)}${noteUi}</td><td>${runnerRatingUi(stop)}</td><td>${actionButtons("runnerStops", stop.id, "runnerForm")}</td></tr>`;
}

function currentRunnerFeedbackUserId() {
  const profile = loggedInProfileRecord();
  return authState.user?.id || profile?.authUserId || profile?.id || activeCrewWorkerId() || authState.user?.email || "";
}

function currentRunnerFeedbackUserLabel() {
  const profile = loggedInProfileRecord();
  return profile?.name || profile?.contactName || authState.user?.user_metadata?.name || authState.user?.email || "User";
}

function runnerRatingForCurrentUser(stopId) {
  const userId = currentRunnerFeedbackUserId();
  return state.runnerRatings.find((rating) => rating.stopId === stopId && rating.userId === userId);
}

function runnerRatingsForStop(stopId) {
  return state.runnerRatings.filter((rating) => rating.stopId === stopId && Number(rating.rating) > 0);
}

function runnerRatingSummary(stopId) {
  const ratings = runnerRatingsForStop(stopId);
  if (!ratings.length) return { average: 0, count: 0 };
  const average = ratings.reduce((sum, rating) => sum + Number(rating.rating || 0), 0) / ratings.length;
  return { average, count: ratings.length };
}

function runnerRatingUi(stop) {
  if (isAdminRole()) return "";
  const current = runnerRatingForCurrentUser(stop.id);
  const summary = runnerRatingSummary(stop.id);
  const stars = [1, 2, 3, 4, 5].map((value) => {
    const filled = current ? value <= Number(current.rating || 0) : value <= Math.round(summary.average || 0);
    return `<button class="runner-star ${filled ? "filled" : ""}" data-open-runner-rating="${escapeHtml(stop.id)}" data-rating="${value}" type="button" ${current ? "disabled" : ""} aria-label="Rate ${value} star${value === 1 ? "" : "s"}">★</button>`;
  }).join("");
  const summaryText = summary.count ? `${summary.average.toFixed(1)} from ${summary.count}` : "No ratings yet";
  const ownText = current ? `Your rating: ${current.rating}` : "Rate once";
  return `<div class="runner-rating-box"><div class="runner-stars">${stars}</div><span>${escapeHtml(summaryText)} · ${escapeHtml(ownText)}</span></div>`;
}

function runnerStopNoteUi(stop) {
  if (isAdminRole()) return "";
  const notes = runnerNotesForStop(stop.id);
  const ownNotes = runnerNotesForCurrentUser(stop.id);
  const remaining = Math.max(0, 2 - ownNotes.length);
  const noteList = notes.length ? `<div class="mini-note-list">${notes.slice(0, 6).map((note) => runnerNoteLine(note, stop.id)).join("")}</div>` : "";
  return `<div class="directory-note-box">
    ${noteList}
    <textarea data-runner-note-input="${stop.id}" maxlength="500" rows="2" placeholder="${remaining > 0 ? "Add review note, 500 characters max" : "Two-note max reached"}" ${remaining <= 0 ? "disabled" : ""}></textarea>
    <div class="row-actions"><button class="tiny-button" data-save-runner-note="${stop.id}" type="button" ${remaining <= 0 ? "disabled" : ""}>Add Note</button><span class="muted">${remaining} of 2 notes left</span></div>
  </div>`;
}

function runnerNotesForStop(stopId) {
  return state.runnerNotes.filter((note) => note.stopId === stopId).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function runnerNotesForCurrentUser(stopId) {
  const userId = currentRunnerFeedbackUserId();
  const workerId = activeCrewWorkerId();
  return state.runnerNotes.filter((note) => note.stopId === stopId && (note.userId === userId || (!note.userId && workerId && note.workerId === workerId)));
}

function runnerNoteEditable(note) {
  const userId = currentRunnerFeedbackUserId();
  const workerId = activeCrewWorkerId();
  const isOwner = note.userId === userId || (!note.userId && workerId && note.workerId === workerId);
  if (!isOwner) return false;
  const created = new Date(note.createdAt || note.updatedAt || 0);
  if (!Number.isFinite(created.getTime())) return false;
  const expires = new Date(created);
  expires.setMonth(expires.getMonth() + 6);
  return new Date() <= expires;
}

function runnerNoteLine(note, stopId) {
  const editable = runnerNoteEditable(note);
  const label = note.userLabel || getWorker(note.workerId)?.name || "User";
  const meta = `${label}${note.createdAt ? ` · ${new Date(note.createdAt).toLocaleDateString()}` : ""}`;
  const body = editable
    ? `<textarea data-runner-note-input="${escapeHtml(stopId)}" data-runner-note-id="${escapeHtml(note.id)}" maxlength="500" rows="2">${escapeHtml(note.text || "")}</textarea><button class="tiny-button" data-save-runner-note="${escapeHtml(stopId)}" data-note-id="${escapeHtml(note.id)}" type="button">Save Note</button>`
    : `<p>${escapeHtml(note.text || "")}</p>`;
  return `<div class="runner-note-item"><span>${escapeHtml(meta)}</span>${body}</div>`;
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
  return ["CLIENT_ADMIN", "CLIENT_REP", "CLIENT_REP_LEAD", "PROMOTER_ADMIN", "PROMOTER_REP"].some((role) => roles.includes(role));
}

function renderRunnerCategoryCreator() {
  renderRunnerResourceActions();
  prepareRunnerCategoryForm();
}

function canCreateRunnerCategory() {
  return isCrewRole() || hasUnlimitedRunnerCategoryAccess();
}

function renderRunnerResourceActions() {
  const menu = $("#runnerResourceMenu");
  if (!menu) return;
  const canCreateResource = currentProfile().canAdminEdit;
  menu.hidden = !(canCreateRunnerCategory() || canCreateResource);
  const categoryButton = menu.querySelector("[data-runner-resource-action='category']");
  const resourceButton = menu.querySelector("[data-runner-resource-action='resource']");
  if (categoryButton) categoryButton.hidden = !canCreateRunnerCategory();
  if (resourceButton) resourceButton.hidden = !canCreateResource;
}

function runnerCategoryLimitStatus() {
  if (hasUnlimitedRunnerCategoryAccess()) {
    return {
      allowed: true,
      remaining: null,
      title: "Unlimited categories",
      body: "This access level can add as many Gig Resources categories as needed."
    };
  }
  const windowInfo = runnerCategoryWindow();
  const used = windowInfo.used;
  const remaining = Math.max(0, 3 - used);
  if (!used) {
    return {
      allowed: true,
      remaining,
      title: "3 category adds available",
      body: "Your one-year countdown starts after your first custom category is submitted."
    };
  }
  return {
    allowed: remaining > 0,
    remaining,
    title: `${remaining} of 3 category adds left`,
    body: windowInfo.resetAt
      ? `This category window resets on ${windowInfo.resetAt.toLocaleDateString()}.`
      : "This category window resets one year after your first custom category."
  };
}

function prepareRunnerCategoryForm() {
  const form = $("#runnerCategoryForm");
  if (!form) return;
  const notice = $("#runnerCategoryNotice");
  const input = form.elements.name;
  const submit = form.querySelector("button[type='submit']");
  const visible = canCreateRunnerCategory();
  form.hidden = !visible;
  if (!visible) return;
  const status = runnerCategoryLimitStatus();
  if (notice) {
    notice.innerHTML = `<span>${escapeHtml(status.title)}</span><p>${escapeHtml(status.body)}</p>`;
  }
  if (input) input.disabled = !status.allowed;
  if (submit) {
    submit.disabled = !status.allowed;
    submit.textContent = status.allowed ? "Add Category" : "Category Limit Reached";
  }
}

function openRunnerCategoryCreator() {
  if (!canCreateRunnerCategory()) {
    toast("This access view cannot add categories.");
    return;
  }
  clearForm("runnerCategoryForm");
  prepareRunnerCategoryForm();
  openForm("runnerCategoryForm");
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

function setView(viewId, options = {}) {
  const requestedView = viewId;
  if (!authState.session) {
    showAuthScreen("Log in to continue.");
    return;
  }
  if (viewId === "adminAccessLevels") {
    if (accessRoleForView("adminAccessLevels")) openAccessLevelsView();
    else toast("That view is restricted for your role.");
    closeMobileNavigation();
    return;
  }
  const previousView = state.activeView;
  viewId = protectedViewFor(viewId);
  const changedView = previousView !== viewId;
  if (changedView) resetViewScrollPosition(previousView);
  const resetMessagesSelector = viewId === "messages";
  if (resetMessagesSelector) clearActiveMessageThread();
  state.activeView = viewId;
  if (!options.skipHistory && previousView && changedView) {
    viewHistoryStack = [...viewHistoryStack.filter((item) => item !== previousView), previousView].slice(-8);
  }
  sessionStorage.setItem(LAST_ACTIVE_VIEW_KEY, viewId);
  applyAccessProfile();
  applyActiveSuiteTone(viewId);
  document.body.classList.toggle("messages-desktop-view", viewId === "messages");
  document.body.classList.toggle("mobile-message-chat-open", viewId === "messages" && !!sendbirdActiveChannel && isMobileMessageLayout());
  if (viewId !== "messages") {
    $("#messages")?.classList.remove("message-chat-open");
    $("#activeMessagePanel")?.setAttribute("hidden", "");
  }
  $$(".view").forEach((view) => view.classList.toggle("active-view", view.id === viewId));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  const label = combinedNavGroups().flatMap((group) => group.items).find(([view]) => view === viewId)?.[1];
  $("#viewTitle").textContent = label || viewLabel(viewId) || $(`.nav-item[data-view="${viewId}"]`)?.textContent || "Dashboard";
  if (location.hash !== `#${viewId}`) history.replaceState(null, "", `#${viewId}`);
  if (requestedView !== viewId) toast("That view is restricted for your role.");
  closeMobileNavigation();
  if (resetMessagesSelector) renderMessaging();
  if (changedView) resetViewScrollPosition(viewId);
}

function applyActiveSuiteTone(viewId = state.activeView) {
  const suiteId = suiteIdForView(viewId);
  if (!suiteId) {
    document.body.removeAttribute("data-active-suite");
    document.body.style.removeProperty("--active-suite-color");
    return;
  }
  document.body.dataset.activeSuite = suiteId;
  document.body.style.setProperty("--active-suite-color", officeSuiteColor(suiteId));
}

function resetViewScrollPosition(viewId = state.activeView) {
  const view = viewId ? document.getElementById(viewId) : $(".active-view");
  resetScrollNode(view);
  resetScrollNode($(".content"));
  resetScrollNode(document.scrollingElement || document.documentElement);
  if (window.scrollX || window.scrollY) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  requestAnimationFrame(() => {
    resetScrollNode(view);
    resetScrollNode($(".content"));
    resetScrollNode(document.scrollingElement || document.documentElement);
    if (window.scrollX || window.scrollY) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
}

function resetScrollNode(node) {
  if (!node || node === $("#messageThread")) return;
  if (typeof node.scrollTo === "function") {
    node.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }
  node.scrollTop = 0;
  node.scrollLeft = 0;
}

function combinedNavGroups() {
  const assigned = assignedAccessProfiles();
  const groups = [];
  const seenViews = new Set();
  assigned.forEach(({ role, profile }) => {
    const roleGroups = NAV_GROUPS[role] || NAV_GROUPS[profile.effectiveRole] || [];
    roleGroups.forEach((group) => {
      const items = group.items.filter(([view]) => profile.views.includes(view) && officeSuiteEnabledForView(view) && !seenViews.has(view));
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

function dashboardNavItems(groups = combinedNavGroups()) {
  const allItems = groups.flatMap((group) => group.items || []);
  return DASHBOARD_VIEW_IDS
    .filter((view) => allItems.some(([itemView]) => itemView === view))
    .filter((view) => accessRoleForView(view))
    .map((view) => [view, DASHBOARD_NAV_LABELS[view] || viewLabel(view)]);
}

function dashboardSwitcherHtml(items = dashboardNavItems()) {
  if (!items.length) return "";
  if (items.length === 1) {
    const [view, label] = items[0];
    return `<div class="nav-dashboard-top"><button class="nav-item ${state.activeView === view ? "active" : ""}" data-view="${escapeHtml(view)}" type="button">${escapeHtml(label)}</button></div>`;
  }
  return `<section class="nav-dashboard-switcher" aria-label="Available dashboards">
    <div class="nav-dashboard-title">Dashboards</div>
    <div class="nav-dashboard-options">
      ${items.map(([view, label]) => `<button class="nav-item ${state.activeView === view ? "active" : ""}" data-view="${escapeHtml(view)}" type="button">${escapeHtml(label)}</button>`).join("")}
    </div>
  </section>`;
}

function renderNavigation() {
  const groups = combinedNavGroups();
  const dashboardItems = dashboardNavItems(groups);
  $(".nav-list").innerHTML = `${dashboardSwitcherHtml(dashboardItems)}${groups.map((group, index) => {
    const items = group.items
      .filter(([view]) => !DASHBOARD_VIEW_IDS.includes(view))
      .map(([view, label]) => `<button class="nav-item ${state.activeView === view ? "active" : ""}"${suiteStyleVars(suiteIdForView(view), "--nav-suite-color")} data-view="${view}" type="button">${label}</button>`)
      .join("");
    if (!items) return "";
    if (!group.label) return `<div class="nav-group nav-group-plain">${items}</div>`;
    const key = navGroupKey(group, index);
    const isCollapsed = navGroupIsCollapsed(key);
    return `<section class="nav-group ${isCollapsed ? "collapsed" : ""}"${suiteStyleVars(suiteIdForNavLabel(group.label), "--nav-suite-color")}>
      <button class="nav-group-toggle" data-nav-group="${escapeHtml(key)}" type="button" aria-expanded="${String(!isCollapsed)}">
        <span>${escapeHtml(group.label)}</span>
        <span class="nav-group-caret">${isCollapsed ? "+" : "-"}</span>
      </button>
      <div class="nav-group-items" ${isCollapsed ? "hidden" : ""}>${items}</div>
    </section>`;
  }).join("")}`;
  renderMobileBottomNavigation(groups, dashboardItems);
}

function renderMobileBottomNavigation(groups = combinedNavGroups(), dashboardItems = dashboardNavItems(groups)) {
  const nav = $("#mobileBottomNav");
  if (!nav) return;
  const preferred = ["dashboard", "clock", "events", "messages", "workers"];
  const allItems = groups.flatMap((group) => group.items || []).filter(([view]) => !DASHBOARD_VIEW_IDS.includes(view));
  const byView = new Map(allItems.map(([view, label]) => [view, label]));
  const selected = [];
  const activeDashboard = dashboardItems.find(([view]) => view === state.activeView) || dashboardItems[0];
  if (activeDashboard) selected.push([activeDashboard[0], "Dashboard"]);
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
    .replace("Production Office", "Office")
    .replace("Gig Resources", "Gigs")
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

function navGroupIsCollapsed(key) {
  return state.collapsedNavGroups[key] !== false;
}

function toggleNavGroup(key) {
  const shouldOpen = navGroupIsCollapsed(key);
  if (shouldOpen) collapseSiblingNavGroups(key);
  state.collapsedNavGroups[key] = !shouldOpen;
  localStorage.setItem("productionCrewCollapsedNavGroups", JSON.stringify(state.collapsedNavGroups));
  renderNavigation();
}

function collapseSiblingNavGroups(key) {
  const accessPrefix = key.split(":")[0];
  Object.keys(state.collapsedNavGroups).forEach((groupKey) => {
    if (groupKey.startsWith(`${accessPrefix}:`)) state.collapsedNavGroups[groupKey] = true;
  });
  combinedNavGroups().forEach((group, index) => {
    if (group.label) state.collapsedNavGroups[navGroupKey(group, index)] = true;
  });
}

function applyAccessProfile() {
  const assignedAccess = assignedAccessForCurrentUser();
  const primaryAccess = assignedAccess[0] || normalizeRole(authState.roleRecord?.role);
  if (state.accessRole !== primaryAccess) state.accessRole = primaryAccess;
  const profile = currentProfile();
  document.body.classList.toggle("admin-mode", isAdminRole());
  document.body.classList.toggle("owner-mode", isClientRole());
  document.body.classList.toggle("production-mode", isProductionRole());
  document.body.classList.toggle("production-team-mode", isProductionTeamRole());
  document.body.classList.toggle("crew-mode", isCrewRole());
  document.body.dataset.accessTone = effectiveAccessRole().toLowerCase();
  if (!$("#appLoadingOverlay")?.hidden) setLoadingOverlay("Loading", true);
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
  if (!assignedViews().includes(state.activeView)) setView(roleHomeView(primaryAccess || state.accessRole));
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
  const profile = loggedInProfileRecord();
  const profileName = profile?.name || profile?.contactName || "";
  return profileName || authState.user.user_metadata?.name || authState.user.email || "Signed in";
}

function loggedInProfileRecord() {
  const baseRole = normalizeRole(authState.roleRecord?.role || "");
  const userId = authState.user?.id || "";
  const email = normalizedMatchValue(authState.user?.email || "");
  if (baseRole === "ACCOUNT" || baseRole === "ACCOUNTING" || baseRole === "CLIENT") {
    return activeClientRepRecord() || clientRepDefaults();
  }
  if (baseRole === "CREW") {
    return getWorker(authState.roleRecord?.worker_id)
      || state.workers.find((worker) => worker.authUserId === userId)
      || state.workers.find((worker) => normalizedMatchValue(worker.email) === email)
      || null;
  }
  if (baseRole === "PROMOTER" || baseRole === "PRODUCTION") {
    return getPromoter(authState.roleRecord?.promoter_id)
      || state.promoters.find((promoter) => promoter.authUserId === userId)
      || state.promoters.find((promoter) => normalizedMatchValue(promoter.email) === email)
      || null;
  }
  return activeAdminProfile();
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
  if (["events", "eventAssignments", "eventSwaps", "runnerStops", "timecards", "touringStops", "touringCrew", "touringTravel", "touringDocuments", "awardsShows", "awardsDocuments", "awardsStaff", "awardsSchedules"].includes(storeName) && !canAdminEdit()) {
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
    const client = activeClientRecord() || state.clients.find((item) => item.id === merged.clientId);
    const suites = clientOfficeSuiteDefinitions(client);
    merged.id = merged.id || crypto.randomUUID();
    merged.clientId = merged.clientId || client?.id || authState.roleRecord?.client_id || "";
    merged.officeSuiteId = suites.some((suite) => suite.id === merged.officeSuiteId) ? merged.officeSuiteId : suites[0]?.id || "";
    if (suites.length > 1 && !merged.officeSuiteId) {
      toast("Select the Office Suite for this event.");
      return;
    }
    merged.workerIds = Array.isArray(merged.workerIds) ? merged.workerIds : eventWorkerIds(merged);
    delete merged.showAllCrew;
  }
  if (["touringStops", "touringCrew", "touringTravel", "touringDocuments", "awardsShows", "awardsDocuments", "awardsStaff", "awardsSchedules"].includes(storeName)) {
    merged.id = merged.id || crypto.randomUUID();
    merged.clientId = merged.clientId || authState.roleRecord?.client_id || activeClientRecord()?.id || "";
  }
  if (storeName === "eventAssignments") {
    const eventRecord = getEvent(merged.eventId);
    const worker = getWorker(merged.workerId);
    const client = activeClientRecord();
    if (!eventRecord || (merged.workerId && !worker)) {
      toast("Select an event first.");
      return;
    }
    merged.id = merged.id || crypto.randomUUID();
    merged.startDate = merged.startDate || eventRecord.startDate || "";
    if (merged.hasWrapTime !== "yes") merged.endDate = "";
    merged.workDate = merged.workDate || String(merged.startDate || eventRecord.startDate || "").slice(0, 10);
    merged.department = merged.department || "Production Office";
    merged.position = merged.position || "Runner";
    merged.locationType = merged.locationType || "Venue";
    merged.dayRate = merged.dayRate || eventRecord.dayRate || client?.defaultDayRate || worker?.defaultDayRate || worker?.defaultRate || "";
    merged.includedHours = merged.includedHours || eventRecord.includedHours || client?.defaultIncludedHours || worker?.defaultIncludedHours || "10";
    merged.additionalRate = merged.additionalRate || eventRecord.additionalRate || client?.defaultAdditionalRate || worker?.defaultAdditionalRate || "";
    if (merged.vehicleUse === "Personal Vehicle") merged.personalVehicleRate = merged.personalVehicleRate || eventRecord.personalVehicleRate || client?.defaultPersonalVehicleRate || worker?.defaultPersonalVehicleRate || "";
    if (!merged.workerId && (!merged.status || merged.status === "Confirmed")) merged.status = "Open";
    else merged.status = merged.status || "Confirmed";
  }
  if (storeName === "vehicleLogs") {
    const assignment = getEventAssignment(merged.assignmentId) || assignmentForEventWorker(merged.eventId, merged.workerId);
    if (!canEditVehicleRentalDetails()) {
      const rentalDetails = vehicleRentalDetailsFor(existing || {
        assignmentId: merged.assignmentId,
        eventId: merged.eventId,
        workerId: merged.workerId
      });
      merged.rentalCompany = rentalDetails.rentalCompany;
      merged.rentalPickupLocation = rentalDetails.rentalPickupLocation;
      merged.rentalPickupDate = rentalDetails.rentalPickupDate;
    }
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
  if (storeName === "vehicleLogs") await syncVehicleRentalDetails(merged);
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
  const adminStores = ["events", "eventAssignments", "eventSwaps", "workers", "promoters", "runnerStops", "timecards", "touringStops", "touringCrew", "touringTravel", "touringDocuments", "awardsShows", "awardsDocuments", "awardsStaff", "awardsSchedules"];
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
    department: "Production Office",
    position: "Runner",
    workDate: String(eventRecord.startDate || "").slice(0, 10),
    startDate: eventRecord.startDate || "",
    endDate: eventRecord.endDate || "",
    hasWrapTime: eventRecord.endDate ? "yes" : "",
    locationType: "Venue",
    callLocation: "",
    onSiteContactName: "",
    onSiteContactPhone: "",
    onSiteContactEmail: "",
    productionOfficeLinkReady: "",
    dayRate: eventRecord.dayRate || activeClientRecord()?.defaultDayRate || "",
    includedHours: eventRecord.includedHours || activeClientRecord()?.defaultIncludedHours || "10",
    additionalRate: eventRecord.additionalRate || activeClientRecord()?.defaultAdditionalRate || "",
    vehicleUse: "No Vehicle",
    vehicleType: "",
    personalVehicleRate: eventRecord.personalVehicleRate || activeClientRecord()?.defaultPersonalVehicleRate || "",
    status: "Confirmed",
    crewNotes: "",
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
  if (form.elements.workDate) form.elements.workDate.value = form.elements.workDate.value || String(form.elements.startDate.value || eventRecord.startDate || "").slice(0, 10);
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
  if (fallback.includes("enum") && (fallback.includes("ACCOUNT") || fallback.includes("ACCOUNTING") || fallback.includes("app_role"))) {
    return "Supabase role setup is missing Account/Accounting. Run supabase-account-accounting-role-migration.sql in Supabase SQL Editor, then try again.";
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

async function saveDashboardNote(event) {
  event.preventDefault();
  if (!canOwnerEdit()) {
    toast("Only Client Admin can add dashboard notes.");
    return;
  }
  const form = event.currentTarget;
  const note = form.elements.note.value.trim();
  if (!note) {
    toast("Add a note first.");
    return;
  }
  const now = new Date().toISOString();
  await put("profileNotes", {
    id: form.elements.id.value || crypto.randomUUID(),
    clientId: cloudClientId() || activeClientRecord()?.id || "",
    title: form.elements.title.value.trim() || "Dashboard note",
    relatedType: form.elements.relatedType.value || "general",
    note,
    createdByUserId: authState.user?.id || "",
    createdByName: currentSessionDisplayName(),
    createdAt: now,
    updatedAt: now
  });
  closeForm("dashboardNoteForm");
  await loadState();
  render();
  toast("Note added.");
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

async function saveRunnerNote(stopId, noteId = "") {
  if (isAdminRole() || !currentRunnerFeedbackUserId()) return;
  const selector = noteId
    ? `[data-runner-note-input="${stopId}"][data-runner-note-id="${noteId}"]`
    : `[data-runner-note-input="${stopId}"]:not([data-runner-note-id])`;
  const textarea = document.querySelector(selector);
  const text = String(textarea?.value || "").trim();
  if (!text) {
    toast("Enter a note first.");
    return;
  }
  if (text.length > 500) {
    toast("Directory notes are limited to 500 characters.");
    return;
  }
  const existing = noteId ? state.runnerNotes.find((note) => note.id === noteId && note.stopId === stopId) : null;
  if (existing && !runnerNoteEditable(existing)) {
    toast("This note is past the six-month edit window.");
    return;
  }
  if (!existing && runnerNotesForCurrentUser(stopId).length >= 2) {
    toast("This resource already has your two notes.");
    return;
  }
  await put("runnerNotes", {
    ...(existing || {}),
    stopId,
    userId: currentRunnerFeedbackUserId(),
    userLabel: currentRunnerFeedbackUserLabel(),
    workerId: activeCrewWorkerId(),
    text,
    createdYear: new Date().getFullYear()
  });
  textarea.value = "";
  await loadState();
  setView(state.activeView);
  toast(existing ? "Directory note updated." : "Directory note added.");
}

async function rateRunnerStop(stopId, rating) {
  if (isAdminRole() || !currentRunnerFeedbackUserId()) return;
  const value = Math.max(1, Math.min(5, Number(rating || 0)));
  if (!value) return;
  if (runnerRatingForCurrentUser(stopId)) {
    toast("You already rated this resource.");
    return;
  }
  await put("runnerRatings", {
    stopId,
    userId: currentRunnerFeedbackUserId(),
    userLabel: currentRunnerFeedbackUserLabel(),
    workerId: activeCrewWorkerId(),
    rating: value
  });
  await loadState();
  setView(state.activeView);
  toast("Rating saved.");
}

function renderRunnerRatingModalStars(selected = 0) {
  const container = $("#runnerRatingModalStars");
  if (!container) return;
  container.innerHTML = [1, 2, 3, 4, 5].map((value) => (
    `<button class="runner-star ${value <= Number(selected || 0) ? "filled" : ""}" data-select-runner-rating="${value}" type="button" aria-label="Select ${value} star${value === 1 ? "" : "s"}">★</button>`
  )).join("");
}

function openRunnerRatingForm(stopId, rating = 0) {
  const stop = state.runnerStops.find((item) => item.id === stopId);
  if (!stop) return;
  if (runnerRatingForCurrentUser(stopId)) {
    toast("You already rated this resource.");
    return;
  }
  clearForm("runnerRatingForm");
  const form = $("#runnerRatingForm");
  form.elements.stopId.value = stopId;
  form.elements.rating.value = rating || "";
  $("#runnerRatingResourceName").textContent = stop.name || "Resource";
  renderRunnerRatingModalStars(rating);
  openForm("runnerRatingForm");
}

async function saveRunnerRatingForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const stopId = form.elements.stopId.value;
  const rating = Number(form.elements.rating.value || 0);
  const review = String(form.elements.review.value || "").trim();
  if (!rating) {
    toast("Choose a star rating first.");
    return;
  }
  if (runnerRatingForCurrentUser(stopId)) {
    toast("You already rated this resource.");
    closeForm("runnerRatingForm");
    return;
  }
  if (review && runnerNotesForCurrentUser(stopId).length >= 2) {
    toast("This resource already has your two notes.");
    return;
  }
  await put("runnerRatings", {
    stopId,
    userId: currentRunnerFeedbackUserId(),
    userLabel: currentRunnerFeedbackUserLabel(),
    workerId: activeCrewWorkerId(),
    rating
  });
  if (review) {
    await put("runnerNotes", {
      stopId,
      userId: currentRunnerFeedbackUserId(),
      userLabel: currentRunnerFeedbackUserLabel(),
      workerId: activeCrewWorkerId(),
      text: review,
      createdYear: new Date().getFullYear()
    });
  }
  closeForm("runnerRatingForm");
  await loadState();
  setView(state.activeView);
  toast("Rating saved.");
}

function notificationSubscriberForCurrentUser() {
  const profile = currentMessagingProfile();
  const fallbackId = isAdminRole()
    ? profile?.authUserId || profile?.id || authState.user?.id || authState.user?.email || ""
    : authState.user?.id || profile?.id || authState.user?.email || "";
  return notificationSubscriberForProfile(profile, fallbackId);
}

function currentMessagingProfile() {
  const worker = loggedInWorkerRecord() || getWorker(state.activeWorkerId);
  const promoter = activePromoterRecord() || getPromoter(state.activePromoterId);
  const clientRep = activeClientRepRecord();
  if (isAdminRole()) return activeAdminProfile();
  if (isClientRole()) return clientRep;
  if (isProductionTeamRole()) return state.productionContacts.find((profile) => profile.authUserId === authState.user?.id) || activeAdminProfile();
  if (isProductionRole()) return promoter;
  if (isCrewRole()) return worker;
  return clientRep || worker || promoter || activeAdminProfile();
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

function inAppNotificationCopy(workflowId, payload = {}) {
  const copies = {
    [NOVU_WORKFLOWS.rentalPhotoReminder]: {
      title: "Rental photos reminder",
      body: `${payload.eventName || "Event"} needs start vehicle photos.`
    },
    [NOVU_WORKFLOWS.rentalPhotoUrgent]: {
      title: "Urgent rental photos reminder",
      body: `${payload.eventName || "Event"} still needs start vehicle photos.`
    },
    [NOVU_WORKFLOWS.runnerStatusChanged]: {
      title: "Runner status updated",
      body: `${payload.runnerName || "Runner"} marked ${payload.status || "updated"}.`
    },
    [NOVU_WORKFLOWS.eventAssignmentCreated]: {
      title: "Event assignment",
      body: `${payload.eventName || "Assigned event"} has been added to your schedule.`
    },
    [NOVU_WORKFLOWS.productionOfficeCall]: {
      title: "Production office request",
      body: payload.message || "Please report to the production office."
    },
    [NOVU_WORKFLOWS.timecardIssue]: {
      title: "Timecard issue",
      body: payload.message || "A timecard needs attention."
    },
    [NOVU_WORKFLOWS.reportSubmitted]: {
      title: "Report submitted",
      body: `${payload.reportTitle || payload.reportType || "Report"} was submitted.`
    },
    [NOVU_WORKFLOWS.vehicleDamageReported]: {
      title: "Vehicle report submitted",
      body: `${payload.reportTitle || "Vehicle damage report"} was submitted.`
    }
  };
  return copies[workflowId] || {
    title: "Notification",
    body: payload.message || payload.eventName || "A new notification is available."
  };
}

async function createWorkflowAppNotification(workflowId, payload = {}, to = {}, options = {}) {
  if (!to?.subscriberId) return;
  const copy = inAppNotificationCopy(workflowId, payload);
  await createAppNotification({
    title: copy.title,
    body: copy.body,
    type: options.type || "info",
    viewId: options.viewId || "",
    recordId: options.recordId || options.transactionId || "",
    recipientId: sendbirdUserIdForProfile({ authUserId: to.subscriberId })
  });
}

async function notifyClientAdminsAboutTimecard(card, event, message, options = {}) {
  if (!card?.id || !message) return;
  const recipients = clientAdminRecipientsForEvent(event);
  const payload = {
    message,
    eventName: event?.name || card.eventName || "Assigned event",
    workerName: getWorker(card.workerId)?.name || "Crew member",
    timecardId: card.id,
    timecardPageUrl: `${location.origin}${location.pathname}#timecards`
  };
  for (const rep of recipients) {
    const subscriber = notificationSubscriberForProfile(rep, rep.authUserId || rep.id || rep.email || "");
    if (!subscriber.subscriberId) continue;
    await createWorkflowAppNotification(NOVU_WORKFLOWS.timecardIssue, payload, subscriber, {
      type: "timecard",
      viewId: "timecards",
      recordId: card.id,
      transactionId: options.transactionId || `timecard-${card.id}-${Date.now()}`
    });
    triggerNovuNotification(NOVU_WORKFLOWS.timecardIssue, payload, subscriber, {
      silent: true,
      skipInApp: true,
      viewId: "timecards",
      recordId: card.id,
      transactionId: options.transactionId || `timecard-${card.id}-${rep.id || subscriber.subscriberId}`
    }).catch((error) => console.warn(error));
  }
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
  if (!options.skipInApp) createWorkflowAppNotification(workflowId, payload, to, options).catch((noticeError) => console.warn("In-app notification save failed", noticeError));
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

function activeMessageThreadKey() {
  if (!sendbirdActiveThread) return "";
  return messageThreadKey(sendbirdActiveThread.type, sendbirdActiveThread.eventId || "", sendbirdActiveThread.profileId || "");
}

function activeMessageNotificationMeta() {
  if (!sendbirdActiveThread) return {};
  const threadKey = activeMessageThreadKey();
  const event = getEvent(sendbirdActiveThread.eventId);
  return {
    viewId: "messages",
    threadType: sendbirdActiveThread.type,
    threadKey,
    threadEventId: sendbirdActiveThread.eventId || "",
    threadProfileId: sendbirdActiveThread.profileId || "",
    clientId: sendbirdActiveThread.type === "adminClient"
      ? sendbirdActiveThread.profileId || cloudClientId()
      : event?.clientId || eventClientId(event) || cloudClientId()
  };
}

function messageThreadMetaFromChannel(channel = {}) {
  let data = {};
  try {
    data = JSON.parse(channel.data || "{}") || {};
  } catch {
    data = {};
  }
  const threadType = data.threadType || channel.customType || "event";
  const threadKey = data.threadKey || messageThreadKey(threadType, data.eventId || "", data.profileId || "");
  const eventId = data.eventId || threadEventIdFromThreadKey(threadKey);
  const event = getEvent(eventId);
  return {
    viewId: "messages",
    threadType,
    threadKey,
    threadEventId: eventId,
    threadProfileId: threadType === "direct" ? "" : data.profileId || "",
    clientId: data.clientId || (threadType === "adminClient" ? data.profileId : "") || event?.clientId || eventClientId(event) || cloudClientId(),
    title: channel.name || sendbirdThreadName(threadType, event, { id: data.profileId || "" })
  };
}

async function markMessageThreadNotificationsRead(threadType, threadKey) {
  if (!threadType || !threadKey) return;
  const now = new Date().toISOString();
  const matches = state.appNotifications.filter((notification) =>
    !notification.readAt
    && notification.type === "message"
    && notification.threadType === threadType
    && notification.threadKey === threadKey
    && notificationMatchesCurrentRecipient(notification)
  );
  for (const notification of matches) {
    const updated = { ...notification, readAt: now };
    await put("appNotifications", updated);
    await syncAppNotificationToSupabase(updated);
  }
  if (matches.length) {
    state.appNotifications = state.appNotifications.map((notification) =>
      matches.some((match) => match.id === notification.id)
        ? { ...notification, readAt: now }
        : notification
    );
    renderNotifications();
  }
}

function messageBelongsToActiveThread(channel = {}) {
  if (!sendbirdActiveChannel || !channel) return false;
  return channel.url && sendbirdActiveChannel.url && channel.url === sendbirdActiveChannel.url;
}

function messageNotificationRecipients() {
  const ids = new Set();
  const currentIds = notificationRecipientIdsForCurrentUser();
  const addId = (value) => {
    const baseId = baseSendbirdUserId(value).trim();
    if (baseId && !currentIds.has(baseId) && baseId !== "system_ops") ids.add(baseId);
  };
  activeThreadMemberProfiles().forEach((member) => {
    addId(messageMemberIdentityKey(member));
  });
  currentThreadSetting()?.memberIds?.forEach((id) => {
    addId(id);
  });
  sendbirdActiveChannel?.members?.forEach((member) => {
    addId(member?.userId);
  });
  sendbirdThreadUsers(sendbirdActiveThread?.type || "", getEvent(sendbirdActiveThread?.eventId), { id: sendbirdActiveThread?.profileId || "" }).forEach((id) => {
    addId(id);
  });
  return Array.from(ids);
}

async function createMessageNotifications(message, deliveredMessage = {}) {
  if (!sendbirdActiveThread) return;
  const recipients = messageNotificationRecipients();
  if (!recipients.length) return;
  const meta = activeMessageNotificationMeta();
  const sender = notificationSubscriberForCurrentUser();
  const senderName = `${sender.firstName || ""} ${sender.lastName || ""}`.trim() || "Someone";
  const preview = String(message || deliveredMessage.message || deliveredMessage.name || deliveredMessage.fileName || "Photo").replace(/\s+/g, " ").trim();
  const messageId = sendbirdMessageKey(deliveredMessage) || String(deliveredMessage.reqId || deliveredMessage.requestId || Date.now());
  for (const recipientId of recipients) {
    const title = sendbirdActiveThread.type === "direct" ? senderName : activeMessageThreadTitle();
    const baseRecipientId = baseSendbirdUserId(recipientId).trim();
    await createAppNotification({
      id: `message-${meta.threadKey}-${messageId}-${baseRecipientId}`.replace(/[^a-zA-Z0-9:_-]/g, "-"),
      title,
      body: `${senderName}: ${preview || "New message"}`,
      type: "message",
      messageId,
      recipientId: baseRecipientId,
      ...meta
    });
  }
}

async function createReceivedMessageNotification(channel, message) {
  return;
}

async function handleIncomingSendbirdMessage(channel, message) {
  if (!message) return;
  if (messageBelongsToActiveThread(channel)) {
    const wasAtBottom = isActiveMessageScrolledToBottom();
    const key = sendbirdMessageKey(message);
    if (!key || !sendbirdMessages.some((item) => sendbirdMessageKey(item) === key)) {
      sendbirdMessages = mergeVisibleSendbirdMessages([message]);
      if (userIsActivelyScrollingMessageThread() && !wasAtBottom) {
        queueMessageThreadRenderAfterScroll();
      } else {
        renderMessageThread({ pinToBottom: wasAtBottom });
      }
    }
    await markMessageThreadNotificationsRead(sendbirdActiveThread?.type || "", activeMessageThreadKey());
    return;
  }
  await createReceivedMessageNotification(channel, message);
}

function startSendbirdInboundMessageHandler() {
  if (!sendbirdClient?.groupChannel || sendbirdInboundMessageHandlerReady) return;
  sendbirdInboundMessageHandlerReady = true;
  const handler = sendbirdGroupChannelHandlerClass
    ? new sendbirdGroupChannelHandlerClass({
        onMessageReceived: (channel, message) => {
          handleIncomingSendbirdMessage(channel, message).catch((error) => console.warn("Incoming message notification failed", error));
        }
      })
    : {
        onMessageReceived: (channel, message) => {
          handleIncomingSendbirdMessage(channel, message).catch((error) => console.warn("Incoming message notification failed", error));
        }
      };
  sendbirdClient.groupChannel.addGroupChannelHandler?.("productionCrewMessageNotifications", handler);
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
  sendbirdInboundMessageHandlerReady = false;
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
        GroupChannelModule: groupChannelModule.GroupChannelModule,
        GroupChannelHandler: groupChannelModule.GroupChannelHandler
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
    const { SendbirdChat, GroupChannelModule, GroupChannelHandler } = await loadSendbirdSdkModules();
    sendbirdGroupChannelHandlerClass = GroupChannelHandler || sendbirdGroupChannelHandlerClass;
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
    startSendbirdInboundMessageHandler();
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

function messageListSignature(messages = sendbirdMessages) {
  return messages.map((message) => [
    messageActionKey(message),
    sendbirdMessageKey(message),
    message.deliveryStatus || "",
    message.createdAt || "",
    message.message || "",
    message.url || message.plainUrl || message.fileUrl || message.previewUrl || ""
  ].join("|")).join("::");
}

async function refreshActiveSendbirdMessages(options = {}) {
  if (!sendbirdActiveChannel || sendbirdMessageRefreshInFlight) return;
  const wasAtBottom = isActiveMessageScrolledToBottom();
  sendbirdMessageRefreshInFlight = true;
  try {
    const loadedMessages = await loadSendbirdMessages(sendbirdActiveChannel);
    const previousSignature = messageListSignature();
    const nextMessages = options.keepLocal ? mergeVisibleSendbirdMessages(loadedMessages) : loadedMessages;
    const nextSignature = messageListSignature(nextMessages);
    sendbirdMessages = nextMessages;
    if (previousSignature === nextSignature && !options.scrollToBottom) return;
    if (userIsActivelyScrollingMessageThread() && !options.scrollToBottom && !wasAtBottom) {
      queueMessageThreadRenderAfterScroll();
      return;
    }
    renderMessageThread({ pinToBottom: !!options.scrollToBottom || wasAtBottom });
  } catch (error) {
    console.warn(error);
  } finally {
    sendbirdMessageRefreshInFlight = false;
  }
}

function refreshSendbirdTypingUsers() {
  if (!sendbirdActiveChannel || typeof sendbirdActiveChannel.getTypingUsers !== "function") {
    sendbirdTypingUsers = [];
    if (userIsActivelyScrollingMessageThread()) {
      queueMessageThreadRenderAfterScroll();
      return;
    }
    renderMessageThread({ pinToBottom: isActiveMessageScrolledToBottom() });
    return;
  }
  sendbirdTypingUsers = sendbirdActiveChannel.getTypingUsers() || [];
  if (userIsActivelyScrollingMessageThread()) {
    queueMessageThreadRenderAfterScroll();
    return;
  }
  renderMessageThread({ pinToBottom: isActiveMessageScrolledToBottom() });
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
    renderOpenMessageThreadAtBottom();
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
    renderOpenMessageThreadAtBottom();
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
    renderOpenMessageThreadAtBottom();
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
  const attachments = [...pendingMessageAttachments];
  const reply = pendingMessageReply;
  if (!message && !attachments.length) return;
  input.value = "";
  clearPendingMessageReply();
  await sendSendbirdPayload({ message, attachments, reply });
  clearPendingMessageAttachments();
}

async function sendSendbirdPayload({ message = "", attachments = [], reply = null } = {}) {
  if (!sendbirdActiveChannel || (!message && !attachments.length)) return;
  const optimisticId = `local-${Date.now()}`;
  const optimisticMessage = {
    messageId: optimisticId,
    message,
    previewUrl: attachments[0]?.previewUrl || "",
    type: attachments[0]?.type || "",
    name: attachments[0]?.name || "",
    replyTo: reply,
    isLocalOwn: true,
    deliveryStatus: "sending",
    createdAt: Date.now(),
    sender: {
      userId: sendbirdClient?.currentUser?.userId || currentSendbirdUserId(),
      nickname: sendbirdClient?.currentUser?.nickname || "You"
    }
  };
  sendbirdMessages = [...sendbirdMessages, optimisticMessage];
  pinMessageThreadAfterSend();
  renderMessageThread({ pinToBottom: true });
  pinActiveMessageThreadToBottom();
  try {
    const sentMessage = message
      ? await sendbirdActiveChannel.sendUserMessage({ message, data: messageDataPayload({ hasAttachments: attachments.length > 0, replyTo: reply }) })
      : null;
    const sentFiles = [];
    for (const attachment of attachments) {
      sentFiles.push(await sendSendbirdFileAttachment(attachment, reply));
    }
    if (typeof sendbirdActiveChannel.endTyping === "function") sendbirdActiveChannel.endTyping();
    const deliveredSource = sentMessage || sentFiles[0] || optimisticMessage;
    const deliveredMessage = {
      ...deliveredSource,
      previewUrl: deliveredSource.previewUrl || deliveredSource.url || sentFiles[0]?.url || sentFiles[0]?.plainUrl || optimisticMessage.previewUrl,
      type: deliveredSource.type || deliveredSource.mimeType || deliveredSource.fileType || sentFiles[0]?.type || sentFiles[0]?.mimeType || sentFiles[0]?.fileType || optimisticMessage.type,
      name: deliveredSource.name || deliveredSource.fileName || sentFiles[0]?.name || sentFiles[0]?.fileName || optimisticMessage.name,
      isLocalOwn: true,
      replyTo: reply,
      deliveryStatus: "delivered"
    };
    sendbirdMessages = sendbirdMessages.map((item) => item.messageId === optimisticId ? deliveredMessage : item);
    await createMessageNotifications(message, deliveredMessage);
    refreshSendbirdTypingUsers();
    renderMessageThread({ pinToBottom: true });
    pinActiveMessageThreadToBottom();
    refreshActiveSendbirdMessages({ keepLocal: true, scrollToBottom: true });
  } catch (error) {
    console.error(error);
    sendbirdMessages = sendbirdMessages.filter((item) => item.messageId !== optimisticId);
    renderMessageThread();
    toast(error.message || "Could not send message.");
  }
}

async function sendSendbirdFileAttachment(attachment, reply = null) {
  if (typeof sendbirdActiveChannel.sendFileMessage !== "function") {
    throw new Error("Photo messages need Sendbird file-message support.");
  }
  return await sendbirdActiveChannel.sendFileMessage({
    file: attachment.file,
    fileName: attachment.name,
    fileSize: attachment.file?.size || 0,
    mimeType: attachment.type,
    data: messageDataPayload({ attachmentType: "photo", replyTo: reply })
  });
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
    const message = "Urgent rental vehicle start-photo reminder was sent because start photos and plate number were still missing after 15 minutes.";
    const updatedCard = {
      ...card,
      rentalUrgentNotificationSentAt: new Date().toISOString(),
      adminNotes: appendTimecardAdminNote(card, message)
    };
    await put("timecards", updatedCard);
    await notifyClientAdminsAboutTimecard(updatedCard, event, `${worker?.name || "Crew member"} still has not submitted rental vehicle start photos after 15 minutes.`, {
      transactionId: `timecard-photo-urgent-${updatedCard.id}`
    });
    await loadState();
    setView(state.activeView);
  }
  pendingRentalUrgencyIds.delete(`send-${card.id}`);
  if (result.message) toast(result.message);
}

async function addRunnerCategory(event) {
  event.preventDefault();
  if (!canCreateRunnerCategory()) return;
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
  const createdByWorkerId = hasUnlimitedRunnerCategoryAccess()
    ? authState.user?.id || state.activeWorkerId || ""
    : state.activeWorkerId || authState.user?.id || "";
  await put("runnerCategories", {
    name,
    createdByWorkerId,
    createdYear: year
  });
  state.runnerCategory = name;
  input.value = "";
  await loadState();
  closeForm("runnerCategoryForm");
  setView(state.activeView);
  toast("Gig Resources category added.");
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
  const workerId = activeCrewWorkerId();
  const worker = getWorker(workerId);
  const assignment = assignmentForEventWorker(eventId, workerId);
  return {
    id: crypto.randomUUID(),
    workerId,
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
  const workerId = activeCrewWorkerId();
  if (!workerId || !isEventVisible(eventId) || !eventWorkerIds(getEvent(eventId)).includes(workerId)) return;
  const event = getEvent(eventId);
  const nowDate = new Date();
  const now = toLocalInputValue(nowDate);
  const todayKey = localDateKey(nowDate);
  if (field === "clockIn" && !workerScheduledForEventDate(event, workerId, todayKey)) {
    toast("You are not scheduled for this event today.");
    return;
  }
  let card = null;
  const priorOpen = priorOpenCrewTimecards(eventId, workerId, todayKey);
  if (field === "clockOut" && priorOpen.length) {
    card = priorOpen[0];
  } else {
    if (field === "clockIn") await closePriorOpenCrewTimecards(eventId, workerId, todayKey);
    card = state.timecards.find((item) => item.eventId === eventId && item.workerId === workerId && timecardWorkDate(item) === todayKey && !item.clockOut)
      || state.timecards.find((item) => item.eventId === eventId && item.workerId === workerId && timecardWorkDate(item) === todayKey);
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
  if (field === "clockOut" && shouldRequireRentalEndPhotos(event, card, timecardWorkDate(card))) {
    const endLog = vehicleLogForEventWorker(eventId, workerId, "End");
    if (!vehicleEndPhotosComplete(endLog)) {
      const nowDate = new Date();
      const bypassAt = card.rentalPhotoBypassAfter ? new Date(card.rentalPhotoBypassAfter) : null;
      const warning = "Rental vehicle end photos and gas gauge were required at Wrap. A wrap attempt was made before end photos and gas gauge were submitted.";
      if (!bypassAt || Number.isNaN(bypassAt.getTime())) {
        card.rentalPhotoBypassAfter = new Date(nowDate.getTime() + 5 * 60000).toISOString();
        card.adminNotes = appendTimecardAdminNote(card, warning);
        await put("timecards", card);
        await loadState();
        setView("vehicles");
        toast("End vehicle photos and gas gauge are required before Wrap. You can bypass after 5 minutes, and this warning is saved on the timecard.");
        return;
      }
      if (nowDate < bypassAt) {
        const minutes = Math.max(1, Math.ceil((bypassAt - nowDate) / 60000));
        toast(`End vehicle photos and gas gauge are still required. Bypass opens in ${minutes} minute(s).`);
        return;
      }
      card.adminNotes = appendTimecardAdminNote(card, `${warning} Bypassed after the 5 minute warning window.`);
      card.rentalPhotoBypassUsedAt = nowDate.toISOString();
    }
  }
  card[field] = now;
  const location = await capturePunchLocation();
  if (location) {
    card.punchLocations = { ...(card.punchLocations || {}), [field]: location };
  }
  card = await applyVenueDistanceRule(card, event, location, field);
  if (field === "clockIn" && !card.eventName) card.eventName = event?.name || "";
  if (field === "clockIn" && rentalVehicleRequired(event, card)) {
    const assignment = assignmentForEventWorker(eventId, workerId);
    if (assignment?.vehicleUse === "Rented Vehicle") await ensureVehicleChecksForAssignment(assignment);
    const startLog = vehicleLogForEventWorker(eventId, workerId, "Start");
    if (!vehicleStartCheckStarted(startLog)) {
      card.rentalStartReminderAt = new Date().toISOString();
      if (!card.rentalStartNotificationSentAt) {
        const worker = getWorker(workerId);
        const result = await sendRentalPhotoNotification(event, worker, card, "start_reminder");
        if (result.ok) {
          card.rentalStartNotificationSentAt = new Date().toISOString();
          card.adminNotes = appendTimecardAdminNote(card, "Rental vehicle start-photo reminder was sent at Call Time.");
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
  if (field === "clockIn" || field === "clockOut") resetIdleSignOutTimer();
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
  const result = await syncLocalRecordsToSupabase();
  const count = await cloudRecordCount();
  $("#cloudSyncStatus").textContent = `Shared records: ${count}`;
  toast(result.failed
    ? `Published ${result.published} records. ${result.failed} need attention.`
    : `Published ${result.published || localCount} local records to cloud.`);
}

async function pullCloudData() {
  if (isAdminRole()) {
    toast("ADMIN cannot pull production records.");
    return;
  }
  const result = await hydrateAppRecordsFromSupabase();
  await loadState();
  setView(state.activeView);
  const count = await cloudRecordCount();
  $("#cloudSyncStatus").textContent = `Shared records: ${count}`;
  toast(result?.skipped
    ? `Pulled ${result.pulled} shared records. Kept ${result.skipped} newer local records.`
    : `Pulled ${result?.pulled ?? count} shared records from cloud.`);
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
  $("#logoutButton")?.addEventListener("click", logout);
  $("#mobileSidebarLogoutButton")?.addEventListener("click", logout);
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
  $("#messageThread")?.addEventListener("touchstart", markMessageThreadUserScrolling, { passive: true });
  $("#messageThread")?.addEventListener("scroll", markMessageThreadUserScrolling, { passive: true });
  $("#messageThread")?.addEventListener("touchmove", markMessageThreadUserScrolling, { passive: true });
  $("#messageThread")?.addEventListener("touchend", markMessageThreadUserScrolling, { passive: true });
  $("#messageThread")?.addEventListener("wheel", markMessageThreadUserScrolling, { passive: true });
  document.addEventListener("toggle", (event) => {
    if (event.target.matches?.(".table-wrap .record-options, #events .event-options")) positionOpenRecordMenus();
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
  $("#eventScheduleFilter").addEventListener("change", (event) => {
    state.eventScheduleFilter = event.target.value;
    localStorage.setItem("productionCrewEventScheduleFilter", state.eventScheduleFilter);
    renderEvents();
  });
  $("#eventTypeFilter").addEventListener("change", (event) => {
    state.eventTypeFilter = event.target.value;
    localStorage.setItem("productionCrewEventTypeFilter", state.eventTypeFilter);
    renderEvents();
  });
  $("#eventSort").addEventListener("change", (event) => {
    state.eventSort = event.target.value;
    localStorage.setItem("productionCrewEventSort", state.eventSort);
    renderEvents();
  });
  document.body.addEventListener("change", (event) => {
    if (event.target?.id === "dashboardPayrollRange") {
      state.dashboardPayrollRange = event.target.value;
      localStorage.setItem("productionCrewDashboardPayrollRange", state.dashboardPayrollRange);
      renderDashboard();
    }
    if (event.target?.id === "dashboardPayrollEvent") {
      state.dashboardPayrollEventId = event.target.value;
      localStorage.setItem("productionCrewDashboardPayrollEventId", state.dashboardPayrollEventId);
      renderDashboard();
    }
    if (event.target?.id === "runnerCategorySelect") {
      state.runnerCategory = event.target.value || "All";
      renderRunnerStops();
    }
    if (event.target?.matches?.("[data-runner-column-filter]")) {
      const key = event.target.dataset.runnerColumnFilter;
      state.runnerColumnFilters = { ...(state.runnerColumnFilters || {}), [key]: event.target.value };
      if (!state.runnerColumnFilters[key]) delete state.runnerColumnFilters[key];
      localStorage.setItem("productionCrewRunnerColumnFilters", JSON.stringify(state.runnerColumnFilters));
      renderRunnerStops();
    }
    if (event.target?.matches?.("[data-worker-column-filter]")) {
      const key = event.target.dataset.workerColumnFilter;
      state.workerColumnFilters = { ...(state.workerColumnFilters || {}), [key]: event.target.value };
      if (!state.workerColumnFilters[key]) delete state.workerColumnFilters[key];
      localStorage.setItem("productionCrewWorkerColumnFilters", JSON.stringify(state.workerColumnFilters));
      renderWorkers();
    }
    if (event.target?.matches?.("[data-timecard-column-filter]")) {
      const key = event.target.dataset.timecardColumnFilter;
      state.timecardColumnFilters = { ...(state.timecardColumnFilters || {}), [key]: event.target.value };
      if (!state.timecardColumnFilters[key]) delete state.timecardColumnFilters[key];
      localStorage.setItem("productionCrewTimecardColumnFilters", JSON.stringify(state.timecardColumnFilters));
      renderTimecards();
    }
    if (event.target?.matches?.("[data-staffing-column-filter]")) {
      const key = event.target.dataset.staffingColumnFilter;
      state.staffingColumnFilters = { ...(state.staffingColumnFilters || {}), [key]: event.target.value };
      if (!state.staffingColumnFilters[key]) delete state.staffingColumnFilters[key];
      localStorage.setItem("productionCrewStaffingColumnFilters", JSON.stringify(state.staffingColumnFilters));
      renderStaffingAssignments();
    }
    if (event.target?.matches?.("[data-vehicle-column-filter]")) {
      const key = event.target.dataset.vehicleColumnFilter;
      state.vehicleColumnFilters = { ...(state.vehicleColumnFilters || {}), [key]: event.target.value };
      if (!state.vehicleColumnFilters[key]) delete state.vehicleColumnFilters[key];
      localStorage.setItem("productionCrewVehicleColumnFilters", JSON.stringify(state.vehicleColumnFilters));
      renderVehicles();
    }
    if (event.target?.matches?.("[data-report-column-filter]")) {
      const key = event.target.dataset.reportColumnFilter;
      state.reportColumnFilters = { ...(state.reportColumnFilters || {}), [key]: event.target.value };
      if (!state.reportColumnFilters[key]) delete state.reportColumnFilters[key];
      localStorage.setItem("productionCrewReportColumnFilters", JSON.stringify(state.reportColumnFilters));
      renderReports();
    }
    if (event.target?.matches?.("[data-venue-column-filter]")) {
      const key = event.target.dataset.venueColumnFilter;
      state.venueColumnFilters = { ...(state.venueColumnFilters || {}), [key]: event.target.value };
      if (!state.venueColumnFilters[key]) delete state.venueColumnFilters[key];
      localStorage.setItem("productionCrewVenueColumnFilters", JSON.stringify(state.venueColumnFilters));
      renderVenues();
    }
    if (event.target?.matches?.("[data-promoter-column-filter]")) {
      const key = event.target.dataset.promoterColumnFilter;
      state.promoterColumnFilters = { ...(state.promoterColumnFilters || {}), [key]: event.target.value };
      if (!state.promoterColumnFilters[key]) delete state.promoterColumnFilters[key];
      localStorage.setItem("productionCrewPromoterColumnFilters", JSON.stringify(state.promoterColumnFilters));
      renderPromoters();
    }
    if (event.target?.matches?.("[data-runner-status-column-filter]")) {
      const key = event.target.dataset.runnerStatusColumnFilter;
      state.runnerStatusColumnFilters = { ...(state.runnerStatusColumnFilters || {}), [key]: event.target.value };
      if (!state.runnerStatusColumnFilters[key]) delete state.runnerStatusColumnFilters[key];
      localStorage.setItem("productionCrewRunnerStatusColumnFilters", JSON.stringify(state.runnerStatusColumnFilters));
      renderProductionBoard();
    }
    if (event.target?.matches?.("[data-user-access-column-filter]")) {
      const tableId = event.target.dataset.userAccessTable || "userAccessTable";
      const config = userAccessTableConfig(tableId);
      const key = event.target.dataset.userAccessColumnFilter;
      state[config.filtersKey] = { ...(state[config.filtersKey] || {}), [key]: event.target.value };
      if (!state[config.filtersKey][key]) delete state[config.filtersKey][key];
      localStorage.setItem(`${config.storagePrefix}ColumnFilters`, JSON.stringify(state[config.filtersKey]));
      if (tableId === "adminUserTable") renderAdmin();
      else renderUserAccessTables();
    }
    if (event.target?.matches?.("[data-client-account-column-filter]")) {
      const key = event.target.dataset.clientAccountColumnFilter;
      state.clientAccountColumnFilters = { ...(state.clientAccountColumnFilters || {}), [key]: event.target.value };
      if (!state.clientAccountColumnFilters[key]) delete state.clientAccountColumnFilters[key];
      localStorage.setItem("productionCrewClientAccountColumnFilters", JSON.stringify(state.clientAccountColumnFilters));
      renderAdmin();
    }
    if (event.target?.matches?.("[data-tour-column-filter]")) {
      const viewId = event.target.dataset.tourColumnFilter;
      const key = event.target.dataset.tourColumnKey;
      state.touringColumnFilters = {
        ...(state.touringColumnFilters || {}),
        [viewId]: { ...(state.touringColumnFilters?.[viewId] || {}), [key]: event.target.value }
      };
      if (!state.touringColumnFilters[viewId][key]) delete state.touringColumnFilters[viewId][key];
      localStorage.setItem("productionCrewTouringColumnFilters", JSON.stringify(state.touringColumnFilters));
      if (viewId.startsWith("awards")) renderAwardsSuite();
      else renderTouringSuite();
    }
  });
  $("#dashboardCalendarPrev")?.addEventListener("click", () => {
    const month = dashboardCalendarMonthDate();
    month.setMonth(month.getMonth() - 1);
    setDashboardCalendarMonth(month);
    renderDashboardCalendar();
  });
  $("#dashboardCalendarNext")?.addEventListener("click", () => {
    const month = dashboardCalendarMonthDate();
    month.setMonth(month.getMonth() + 1);
    setDashboardCalendarMonth(month);
    renderDashboardCalendar();
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
  $("#touringStopForm").addEventListener("submit", (event) => saveForm(event, "touringStops"));
  $("#touringCrewForm").addEventListener("submit", (event) => saveForm(event, "touringCrew"));
  $("#touringTravelForm").addEventListener("submit", (event) => saveForm(event, "touringTravel"));
  $("#touringDocumentForm").addEventListener("submit", (event) => saveForm(event, "touringDocuments"));
  $("#awardsShowForm").addEventListener("submit", (event) => saveForm(event, "awardsShows"));
  $("#awardsDocumentForm").addEventListener("submit", (event) => saveForm(event, "awardsDocuments"));
  $("#awardsStaffForm").addEventListener("submit", (event) => saveForm(event, "awardsStaff"));
  $("#awardsScheduleForm").addEventListener("submit", (event) => saveForm(event, "awardsSchedules"));
  $("#dashboardNoteForm").addEventListener("submit", saveDashboardNote);
  $("#eventAssignmentForm").addEventListener("submit", (event) => saveForm(event, "eventAssignments"));
  $("#assignmentDepartmentForm").addEventListener("submit", saveAssignmentDepartmentForm);
  $("#messageThreadManageForm").addEventListener("submit", saveMessageThreadAccess);
  $("#messageGifForm").addEventListener("submit", saveMessageGifLink);
  $("#sendbirdMessageForm").addEventListener("submit", sendSendbirdMessage);
  $("#messagePhotoInput").addEventListener("change", (event) => addMessagePhotoAttachments(event.target.files).catch((error) => {
    console.error(error);
    toast("Could not add that photo.");
  }));
  $("#sendbirdMessageForm").addEventListener("click", (event) => {
    const tool = event.target.closest("[data-message-tool]");
    const removeAttachment = event.target.closest("[data-remove-message-attachment]");
    const clearReply = event.target.closest("[data-clear-message-reply]");
    if (tool?.dataset.messageTool === "photo") {
      $("#messagePhotoInput")?.click();
      return;
    }
    if (tool?.dataset.messageTool === "gif") {
      clearForm("messageGifForm");
      giphyResults = [];
      renderGiphyResults();
      openForm("messageGifForm");
      return;
    }
    if (removeAttachment) {
      pendingMessageAttachments.splice(Number(removeAttachment.dataset.removeMessageAttachment), 1);
      renderMessageAttachmentPreview();
    }
    if (clearReply) clearPendingMessageReply();
  });
  $("#messageGifForm").addEventListener("click", (event) => {
    const result = event.target.closest("[data-giphy-result]");
    const manual = event.target.closest("[data-add-gif-url]");
    if (result) selectGiphyResult(result.dataset.giphyResult);
    if (manual) addManualMessageGifLink();
  });
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
  $("#eventAssignmentForm select[name='department']").addEventListener("change", (event) => {
    if (event.target.value !== "__add_department__") return;
    event.target.value = assignmentDepartments()[0] || "Production Office";
    clearForm("assignmentDepartmentForm");
    openForm("assignmentDepartmentForm");
  });
  $("#eventAssignmentForm input[name='hasWrapTime']").addEventListener("change", () => updateAssignmentScheduleFields($("#eventAssignmentForm")));
  $("#eventAssignmentForm select[name='locationType']").addEventListener("change", () => {
    const form = $("#eventAssignmentForm");
    if (form.elements.locationType.value !== "Venue") form.elements.callLocation.value = "";
    updateAssignmentLocationFields(form);
  });
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
  $("#runnerRatingForm").addEventListener("submit", saveRunnerRatingForm);
  $("#timecardForm").addEventListener("submit", (event) => saveForm(event, "timecards"));
  $("#vehicleForm").addEventListener("submit", (event) => saveForm(event, "vehicleLogs"));
  $("#reportForm").addEventListener("submit", (event) => saveForm(event, "accidentReports"));
  $("#reportForm").addEventListener("change", (event) => {
    if (event.target.matches("[data-report-type], select[name='eventId'], select[name='workerId']")) updateReportTypeFields($("#reportForm"));
  });
  $("#vehicleForm").addEventListener("change", () => applyVehicleAssignmentLock($("#vehicleForm")));
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
  $("#accountAccessForm").addEventListener("change", (event) => {
    if (event.target?.matches?.("input[name='accessLevels']")) syncAccountAccessSelection(event.target);
  });

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
    const runnerResourceButton = event.target.closest("[data-runner-resource-action]");
    const runnerSortButton = event.target.closest("[data-runner-sort]");
    const workerSortButton = event.target.closest("[data-worker-sort]");
    const timecardSortButton = event.target.closest("[data-timecard-sort]");
    const staffingSortButton = event.target.closest("[data-staffing-sort]");
    const vehicleSortButton = event.target.closest("[data-vehicle-sort]");
    const reportSortButton = event.target.closest("[data-report-sort]");
    const venueSortButton = event.target.closest("[data-venue-sort]");
    const promoterSortButton = event.target.closest("[data-promoter-sort]");
    const runnerStatusSortButton = event.target.closest("[data-runner-status-sort]");
    const userAccessSortButton = event.target.closest("[data-user-access-sort]");
    const clientAccountSortButton = event.target.closest("[data-client-account-sort]");
    const quickProfileButton = event.target.closest("[data-open-quick-profile]");
    const deleteButton = event.target.closest("[data-delete]");
    const clockButton = event.target.closest("[data-clock-out]");
    const punchButton = event.target.closest("[data-time-punch]");
    const runnerTab = event.target.closest("[data-runner-category]");
    const runnerCategoryAll = event.target.closest("[data-runner-category-all]");
    const directoryTab = event.target.closest("[data-directory-tab]");
    const payrollTab = event.target.closest("[data-payroll-view]");
    const profileNoteButton = event.target.closest("[data-save-profile-note]");
    const runnerNoteButton = event.target.closest("[data-save-runner-note]");
    const openRunnerRatingButton = event.target.closest("[data-open-runner-rating]");
    const selectRunnerRatingButton = event.target.closest("[data-select-runner-rating]");
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
    const vehiclePhotosButton = event.target.closest("[data-vehicle-photos]");
    const vehiclePhaseButton = event.target.closest("[data-vehicle-phase]");
    const addAssignmentButton = event.target.closest("[data-add-assignment]");
    const addStaffingPositionButton = event.target.closest("[data-add-staffing-position]");
    const formAddAssignmentButton = event.target.closest("[data-form-add-assignment]");
    const swapCrewButton = event.target.closest("[data-swap-crew]");
    const substituteCrewButton = event.target.closest("[data-substitute-crew]");
    const publicRunnerStatusButton = event.target.closest("[data-public-runner-status]");
    const publicGigResourcesButton = event.target.closest("[data-public-gig-resources]");
    const refreshUsersButton = event.target.closest("[data-refresh-users]");
    const deleteUserButton = event.target.closest("[data-delete-user-account]");
    const manageAccountAccessButton = event.target.closest("[data-manage-account-access]");
    const manageClientPackagesButton = event.target.closest("[data-manage-client-packages]");
    const viewAccessLevelsButton = event.target.closest("[data-view-access-levels]");
    const closeAccessLevelsButton = event.target.closest("[data-close-access-levels]");
    const touringGridButton = event.target.closest("[data-tour-grid]");
    const touringGridSaveButton = event.target.closest("[data-tour-grid-save]");
    const touringSortButton = event.target.closest("[data-tour-sort]");
    const touringBulkSelectButton = event.target.closest("[data-tour-bulk-select]");
    const touringBulkClearButton = event.target.closest("[data-tour-bulk-clear]");
    const touringBulkApplyButton = event.target.closest("[data-tour-bulk-apply]");
    const awardsBulkSelectButton = event.target.closest("[data-awards-bulk-select]");
    const awardsBulkClearButton = event.target.closest("[data-awards-bulk-clear]");
    const awardsBulkApplyButton = event.target.closest("[data-awards-bulk-apply]");
    const connectSendbirdButton = event.target.closest("[data-connect-sendbird]");
    const openEventChannelButton = event.target.closest("[data-open-event-channel]");
    const messageThreadTypeButton = event.target.closest("[data-message-thread-type]");
    const messageEventOptionsButton = event.target.closest("[data-message-event-options]");
    const messageSectionToggleButton = event.target.closest("[data-message-section-toggle]");
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
    const timecardRow = event.target.closest("[data-timecard-row]");
    const mobileGoViewButton = event.target.closest("[data-mobile-go-view]");
    const dashboardLinkButton = event.target.closest("[data-dashboard-link]");
    const openReportTypeButton = event.target.closest("[data-open-report-type]");
    const requestMobilePermissionsButton = event.target.closest("[data-request-mobile-permissions]");
    const openNotificationButton = event.target.closest("[data-open-notification]");
    const viewEventAssignmentButton = event.target.closest("[data-view-event-assignment]");
    const editTimecardDetailButton = event.target.closest("[data-edit-timecard-detail]");
    const saveTimecardDetailButton = event.target.closest("[data-save-timecard-detail]");
    const openRecentNotesButton = event.target.closest("[data-open-recent-notes]");
    const cancelTimecardDetailButton = event.target.closest("[data-cancel-timecard-detail]");
    const messageReplyButton = event.target.closest("[data-message-reply]");
    const messageEmojiButton = event.target.closest("[data-message-emoji]");
    const openMessageImageButton = event.target.closest("[data-open-message-image]");
    const closeMessageImageButton = event.target.closest("[data-close-message-image-preview]");

    if (openMessageImageButton) {
      openMessageImagePreview(openMessageImageButton.dataset.openMessageImage, openMessageImageButton.dataset.messageImageLabel);
      return;
    }
    if (closeMessageImageButton) {
      closeMessageImagePreview();
      return;
    }
    if (messageReplyButton) {
      replyToMessageKey($("#messageActionMenu")?.dataset.messageActionKey || "");
      return;
    }
    if (messageEmojiButton) {
      await sendQuickMessageEmoji($("#messageActionMenu")?.dataset.messageActionKey || "", messageEmojiButton.dataset.messageEmoji || "");
      return;
    }
    if (!event.target.closest("#messageActionMenu") && !event.target.closest("[data-message-action-key]")) closeMessageActionMenu();

    if (openNotificationButton) {
      await openNotification(openNotificationButton.dataset.openNotification);
      return;
    }
    if (openRecentNotesButton) {
      openRecentNotesView();
      return;
    }
    if (quickProfileButton) {
      $("#globalAddMenu")?.removeAttribute("open");
      await openQuickProfileForm(quickProfileButton.dataset.openQuickProfile);
      return;
    }
    if (viewAccessLevelsButton) {
      openAccessLevelsView();
      return;
    }
    if (closeAccessLevelsButton) {
      closeAccessLevelsView();
      return;
    }
    if (touringGridButton) {
      toggleTouringGrid(touringGridButton.dataset.tourGrid);
      return;
    }
    if (touringGridSaveButton) {
      await saveTouringGrid(touringGridSaveButton.dataset.tourGridSave);
      return;
    }
    if (touringBulkSelectButton) {
      const viewId = touringBulkSelectButton.dataset.tourBulkSelect;
      const keys = $$(`[data-tour-bulk-row="${viewId}"]`).map((input) => input.dataset.tourBulkKey).filter(Boolean);
      setTouringBulkSelection(viewId, keys);
      renderTouringSuite();
      return;
    }
    if (touringBulkClearButton) {
      setTouringBulkSelection(touringBulkClearButton.dataset.tourBulkClear, []);
      renderTouringSuite();
      return;
    }
    if (touringBulkApplyButton) {
      await applyTouringBulkAction(touringBulkApplyButton.dataset.tourBulkApply);
      return;
    }
    if (awardsBulkSelectButton) {
      const viewId = awardsBulkSelectButton.dataset.awardsBulkSelect;
      const keys = $$(`[data-awards-bulk-row="${viewId}"]`).map((input) => input.dataset.awardsBulkKey).filter(Boolean);
      setAwardsBulkSelection(viewId, keys);
      renderAwardsSuite();
      return;
    }
    if (awardsBulkClearButton) {
      setAwardsBulkSelection(awardsBulkClearButton.dataset.awardsBulkClear, []);
      renderAwardsSuite();
      return;
    }
    if (awardsBulkApplyButton) {
      await applyAwardsBulkAction(awardsBulkApplyButton.dataset.awardsBulkApply);
      return;
    }
    if (touringSortButton) {
      const viewId = touringSortButton.dataset.tourSort;
      state.touringSort = {
        ...(state.touringSort || {}),
        [viewId]: {
          key: touringSortButton.dataset.tourSortKey,
          direction: touringSortButton.dataset.tourSortDirection || "asc"
        }
      };
      localStorage.setItem("productionCrewTouringSort", JSON.stringify(state.touringSort));
      touringSortButton.closest("details")?.removeAttribute("open");
      if (viewId.startsWith("awards")) renderAwardsSuite();
      else renderTouringSuite();
      return;
    }
    if (runnerResourceButton) {
      $("#runnerResourceMenu")?.removeAttribute("open");
      if (runnerResourceButton.dataset.runnerResourceAction === "category") {
        openRunnerCategoryCreator();
      } else {
        await refreshSiteAccessLevelsForForm("runnerForm");
        clearForm("runnerForm");
        openForm("runnerForm");
      }
      return;
    }
    if (runnerSortButton) {
      state.runnerSortKey = runnerSortButton.dataset.runnerSort || "name";
      state.runnerSortDirection = runnerSortButton.dataset.runnerSortDirection || "asc";
      localStorage.setItem("productionCrewRunnerSortKey", state.runnerSortKey);
      localStorage.setItem("productionCrewRunnerSortDirection", state.runnerSortDirection);
      runnerSortButton.closest("details")?.removeAttribute("open");
      renderRunnerStops();
      return;
    }
    if (workerSortButton) {
      state.workerSortKey = workerSortButton.dataset.workerSort || "profile";
      state.workerSortDirection = workerSortButton.dataset.workerSortDirection || "asc";
      localStorage.setItem("productionCrewWorkerSortKey", state.workerSortKey);
      localStorage.setItem("productionCrewWorkerSortDirection", state.workerSortDirection);
      workerSortButton.closest("details")?.removeAttribute("open");
      renderWorkers();
      return;
    }
    if (timecardSortButton) {
      state.timecardSortKey = timecardSortButton.dataset.timecardSort || "date";
      state.timecardSortDirection = timecardSortButton.dataset.timecardSortDirection || "desc";
      localStorage.setItem("productionCrewTimecardSortKey", state.timecardSortKey);
      localStorage.setItem("productionCrewTimecardSortDirection", state.timecardSortDirection);
      timecardSortButton.closest("details")?.removeAttribute("open");
      renderTimecards();
      return;
    }
    if (vehicleSortButton) {
      state.vehicleSortKey = vehicleSortButton.dataset.vehicleSort || "date";
      state.vehicleSortDirection = vehicleSortButton.dataset.vehicleSortDirection || "desc";
      localStorage.setItem("productionCrewVehicleSortKey", state.vehicleSortKey);
      localStorage.setItem("productionCrewVehicleSortDirection", state.vehicleSortDirection);
      vehicleSortButton.closest("details")?.removeAttribute("open");
      renderVehicles();
      return;
    }
    if (reportSortButton) {
      state.reportSortKey = reportSortButton.dataset.reportSort || "date";
      state.reportSortDirection = reportSortButton.dataset.reportSortDirection || "desc";
      localStorage.setItem("productionCrewReportSortKey", state.reportSortKey);
      localStorage.setItem("productionCrewReportSortDirection", state.reportSortDirection);
      reportSortButton.closest("details")?.removeAttribute("open");
      renderReports();
      return;
    }
    if (venueSortButton) {
      state.venueSortKey = venueSortButton.dataset.venueSort || "name";
      state.venueSortDirection = venueSortButton.dataset.venueSortDirection || "asc";
      localStorage.setItem("productionCrewVenueSortKey", state.venueSortKey);
      localStorage.setItem("productionCrewVenueSortDirection", state.venueSortDirection);
      venueSortButton.closest("details")?.removeAttribute("open");
      renderVenues();
      return;
    }
    if (promoterSortButton) {
      state.promoterSortKey = promoterSortButton.dataset.promoterSort || "rep";
      state.promoterSortDirection = promoterSortButton.dataset.promoterSortDirection || "asc";
      localStorage.setItem("productionCrewPromoterSortKey", state.promoterSortKey);
      localStorage.setItem("productionCrewPromoterSortDirection", state.promoterSortDirection);
      promoterSortButton.closest("details")?.removeAttribute("open");
      renderPromoters();
      return;
    }
    if (runnerStatusSortButton) {
      state.runnerStatusSortKey = runnerStatusSortButton.dataset.runnerStatusSort || "runner";
      state.runnerStatusSortDirection = runnerStatusSortButton.dataset.runnerStatusSortDirection || "asc";
      localStorage.setItem("productionCrewRunnerStatusSortKey", state.runnerStatusSortKey);
      localStorage.setItem("productionCrewRunnerStatusSortDirection", state.runnerStatusSortDirection);
      runnerStatusSortButton.closest("details")?.removeAttribute("open");
      renderProductionBoard();
      return;
    }
    if (userAccessSortButton) {
      const tableId = userAccessSortButton.dataset.userAccessTable || "userAccessTable";
      const config = userAccessTableConfig(tableId);
      state[config.sortKey] = userAccessSortButton.dataset.userAccessSort || "user";
      state[config.sortDirection] = userAccessSortButton.dataset.userAccessSortDirection || "asc";
      localStorage.setItem(`${config.storagePrefix}SortKey`, state[config.sortKey]);
      localStorage.setItem(`${config.storagePrefix}SortDirection`, state[config.sortDirection]);
      userAccessSortButton.closest("details")?.removeAttribute("open");
      if (tableId === "adminUserTable") renderAdmin();
      else renderUserAccessTables();
      return;
    }
    if (clientAccountSortButton) {
      state.clientAccountSortKey = clientAccountSortButton.dataset.clientAccountSort || "client";
      state.clientAccountSortDirection = clientAccountSortButton.dataset.clientAccountSortDirection || "asc";
      localStorage.setItem("productionCrewClientAccountSortKey", state.clientAccountSortKey);
      localStorage.setItem("productionCrewClientAccountSortDirection", state.clientAccountSortDirection);
      clientAccountSortButton.closest("details")?.removeAttribute("open");
      renderAdmin();
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
    if (dashboardLinkButton && !event.target.closest("select, input, textarea, label")) {
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
    if (messageSectionToggleButton) {
      const section = messageSectionToggleButton.dataset.messageSectionToggle;
      setMessageSectionCollapsed(section, !messageSectionCollapsed(section));
      renderMessaging();
      return;
    }
    if (messageEventFilter || messageEventSelect) return;
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
      return;
    }
    if (openPermanentMessageButton) {
      const [type, ...keyParts] = openPermanentMessageButton.dataset.openPermanentMessage.split(":");
      await openPermanentMessageChannel(type, keyParts.join(":"));
      return;
    }
    if (openDirectMessageButton) {
      await openDirectMessageChannel(openDirectMessageButton.dataset.openDirectMessage);
      return;
    }
    if (closeMobileMessageButton) {
      clearActiveMessageThread();
      renderMessaging();
      resetViewScrollPosition();
      return;
    }
    if (manageMessageThreadButton) openMessageThreadManageForm();
    if (newMessageThreadButton) {
      if (state.activeView === "messages") {
        state.messageDirectPickerOpen = !state.messageDirectPickerOpen;
        renderMessaging();
        return;
      }
      toast("Custom event thread setup is next. Use Direct Message for new private threads right now.");
      state.messagingThreadType = "direct";
      state.messageDirectScope = "all";
      localStorage.setItem("productionCrewMessagingThreadType", state.messagingThreadType);
      localStorage.setItem("productionCrewMessageDirectScope", state.messageDirectScope);
      clearActiveMessageThread();
      renderMessaging();
    }
    if (notifyProductionOfficeButton) await notifyRunnerToProductionOffice(notifyProductionOfficeButton.dataset.notifyProductionOffice);
    if (profileAccessButton) await openProfileAccessForm(profileAccessButton.dataset.openProfileAccess);
    if (editTimecardDetailButton) {
      renderTimecardProfile(editTimecardDetailButton.dataset.editTimecardDetail, true);
      return;
    }
    if (saveTimecardDetailButton) {
      await saveTimecardDetailForm(saveTimecardDetailButton);
      return;
    }
    if (cancelTimecardDetailButton) {
      renderTimecardProfile(cancelTimecardDetailButton.dataset.cancelTimecardDetail);
      return;
    }
    if (viewEventAssignmentButton) {
      openEventAssignmentDetail(viewEventAssignmentButton.dataset.viewEventAssignment);
      return;
    }
    if (timecardRow && !event.target.closest("button, a, input, select, textarea, details, summary")) {
      openReadOnlyRecord("timecards", timecardRow.dataset.timecardRow);
      return;
    }
    if (viewRecordButton) {
      const [storeName, id] = viewRecordButton.dataset.viewRecord.split(":");
      openReadOnlyRecord(storeName, id);
      return;
    }

    if (openButton) {
      if ($("#accessLevelViewModal")) closeAccessLevelsView();
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
      if ($("#accessLevelViewModal")) closeAccessLevelsView();
      if (record) fillForm(editButton.dataset.form, record);
    }

    if (deleteButton) await deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);
    if (staffingSortButton) {
      state.staffingSortKey = staffingSortButton.dataset.staffingSort;
      state.staffingSortDirection = staffingSortButton.dataset.staffingSortDirection || "asc";
      localStorage.setItem("productionCrewStaffingSortKey", state.staffingSortKey);
      localStorage.setItem("productionCrewStaffingSortDirection", state.staffingSortDirection);
      renderStaffingAssignments();
    }
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
    if (vehiclePhotosButton) openVehiclePhotoViewer(vehiclePhotosButton);
    if (vehiclePhaseButton) openVehiclePhaseForm(vehiclePhaseButton);
    if (addAssignmentButton) openAssignmentForm(addAssignmentButton.dataset.addAssignment);
    if (addStaffingPositionButton) openAssignmentForm(addStaffingPositionButton.dataset.addStaffingPosition);
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
    if (openRunnerRatingButton) {
      openRunnerRatingForm(openRunnerRatingButton.dataset.openRunnerRating, openRunnerRatingButton.dataset.rating);
      return;
    }
    if (selectRunnerRatingButton) {
      const form = $("#runnerRatingForm");
      form.elements.rating.value = selectRunnerRatingButton.dataset.selectRunnerRating;
      renderRunnerRatingModalStars(form.elements.rating.value);
      return;
    }
    if (runnerNoteButton) await saveRunnerNote(runnerNoteButton.dataset.saveRunnerNote, runnerNoteButton.dataset.noteId || "");
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
    if (runnerCategoryAll) {
      state.runnerCategory = "All";
      renderRunnerStops();
    }
    if (directoryTab) {
      state.directoryTab = directoryTab.dataset.directoryTab;
      renderDirectory();
    }
  });

  document.body.addEventListener("contextmenu", (event) => {
    const bubble = event.target.closest("[data-message-action-key]");
    if (!bubble) return;
    event.preventDefault();
    openMessageActionMenu(bubble.dataset.messageActionKey, bubble);
  });
  document.body.addEventListener("pointerdown", (event) => {
    const bubble = event.target.closest("[data-message-action-key]");
    if (!bubble) return;
    messageActionTargetKey = bubble.dataset.messageActionKey || "";
    window.clearTimeout(messageActionTimer);
    messageActionTimer = window.setTimeout(() => {
      openMessageActionMenu(messageActionTargetKey, bubble);
    }, 520);
  });
  ["pointerup", "pointercancel", "pointerleave", "scroll"].forEach((eventName) => {
    document.body.addEventListener(eventName, () => {
      window.clearTimeout(messageActionTimer);
    }, true);
  });

  document.body.addEventListener("change", (event) => {
    const messageEventFilter = event.target.closest("[data-message-event-filter]");
    const messageEventSelect = event.target.closest("[data-message-event-select]");
    const permanentMessageClientSelect = event.target.closest("[data-permanent-message-client]");
    const touringBulkRow = event.target.closest("[data-tour-bulk-row]");
    if (touringBulkRow) {
      const viewId = touringBulkRow.dataset.tourBulkRow;
      const keys = touringBulkSelectionSet(viewId);
      if (touringBulkRow.checked) keys.add(touringBulkRow.dataset.tourBulkKey);
      else keys.delete(touringBulkRow.dataset.tourBulkKey);
      setTouringBulkSelection(viewId, [...keys].filter(Boolean));
      const toolbarText = touringBulkRow.closest(".touring-suite, .touring-card-grid")?.querySelector(`.suite-bulk-bar[data-suite-bulk-view="${viewId}"] p`);
      if (toolbarText) {
        const selectedCount = touringBulkSelectedKeys(viewId).length;
        toolbarText.textContent = selectedCount ? `${selectedCount} selected` : "Select rows to update multiple touring records at once.";
      }
      return;
    }
    const awardsBulkRow = event.target.closest("[data-awards-bulk-row]");
    if (awardsBulkRow) {
      const viewId = awardsBulkRow.dataset.awardsBulkRow;
      const keys = awardsBulkSelectionSet(viewId);
      if (awardsBulkRow.checked) keys.add(awardsBulkRow.dataset.awardsBulkKey);
      else keys.delete(awardsBulkRow.dataset.awardsBulkKey);
      setAwardsBulkSelection(viewId, [...keys].filter(Boolean));
      const toolbarText = awardsBulkRow.closest(".touring-card-grid")?.querySelector(".awards-bulk-bar p");
      if (toolbarText) {
        const selectedCount = awardsBulkSelectedKeys(viewId).length;
        toolbarText.textContent = selectedCount ? `${selectedCount} selected` : "Select rows to update multiple records at once.";
      }
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
    if (permanentMessageClientSelect) {
      state.selectedPermanentMessageClientId = permanentMessageClientSelect.value || "";
      localStorage.setItem("productionCrewPermanentMessageClientId", state.selectedPermanentMessageClientId);
      renderMessaging();
    }
  });

  $("#modalBackdrop").addEventListener("click", () => {
    if ($("#messageImagePreviewModal")) closeMessageImagePreview();
    else if ($("#accessLevelViewModal")) closeAccessLevelsView();
    else closeActiveForm();
  });
  document.addEventListener("keydown", (event) => {
    const timecardRow = event.target.closest?.("[data-timecard-row]");
    if (timecardRow && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openReadOnlyRecord("timecards", timecardRow.dataset.timecardRow);
      return;
    }
    if (event.key === "Escape") {
      if ($("#messageImagePreviewModal")) closeMessageImagePreview();
      else if ($("#accessLevelViewModal")) closeAccessLevelsView();
      else closeActiveForm();
    }
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
  setLoadingOverlay("Checking session...", true);
  bindEvents();
  initMobileAppLifecycle();
  initPullToRefresh();
  initEdgeSwipeNavigation();
  initMiddleSwipeBackNavigation();
  initPushRegistrationListeners();
  startMobileClockSecondTimer();
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
