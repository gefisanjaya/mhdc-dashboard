// Mock data for the MHDC Group admin dashboard. Replace with API calls later.

export type Branch = {
  id: string;
  name: string;
  brand: "Medikids" | "MHDC Clinic";
  city: string;
  address: string;
  phone: string;
  chairs: number;
  status: "Open" | "Renovation";
  monthlyRevenue: number;
  patientsThisMonth: number;
  rating: number;
};

export const branches: Branch[] = [
  { id: "b1", name: "MHDC Clinic Kalibata City", brand: "MHDC Clinic", city: "Jakarta Selatan", address: "Kalibata City Square Lt. GF, Jakarta Selatan", phone: "0812-1000-0101", chairs: 4, status: "Open", monthlyRevenue: 412_000_000, patientsThisMonth: 486, rating: 4.8 },
  { id: "b2", name: "MHDC Clinic Wisma BNI 46", brand: "MHDC Clinic", city: "Jakarta Pusat", address: "Wisma BNI 46 Lt. 3, Jl. Jend. Sudirman, Jakarta Pusat", phone: "0812-1000-0102", chairs: 3, status: "Open", monthlyRevenue: 368_000_000, patientsThisMonth: 402, rating: 4.7 },
  { id: "b3", name: "Medikids Kemang", brand: "Medikids", city: "Jakarta Selatan", address: "Jl. Kemang Raya No. 12, Jakarta Selatan", phone: "0812-1000-0103", chairs: 5, status: "Open", monthlyRevenue: 455_000_000, patientsThisMonth: 538, rating: 4.9 },
  { id: "b4", name: "Medikids Pondok Indah", brand: "Medikids", city: "Jakarta Selatan", address: "Jl. Metro Pondok Indah Blok TA, Jakarta Selatan", phone: "0812-1000-0104", chairs: 5, status: "Open", monthlyRevenue: 498_000_000, patientsThisMonth: 571, rating: 4.8 },
  { id: "b5", name: "Medikids Bekasi", brand: "Medikids", city: "Bekasi", address: "Jl. Ahmad Yani No. 8, Bekasi", phone: "0812-1000-0105", chairs: 4, status: "Open", monthlyRevenue: 336_000_000, patientsThisMonth: 420, rating: 4.7 },
  { id: "b6", name: "Medikids BSD", brand: "Medikids", city: "Tangerang Selatan", address: "Ruko BSD Sektor VII, Tangerang Selatan", phone: "0812-1000-0106", chairs: 4, status: "Open", monthlyRevenue: 389_000_000, patientsThisMonth: 447, rating: 4.8 },
  { id: "b7", name: "Medikids Dago", brand: "Medikids", city: "Bandung", address: "Jl. Ir. H. Juanda (Dago) No. 45, Bandung", phone: "0812-1000-0107", chairs: 3, status: "Open", monthlyRevenue: 274_000_000, patientsThisMonth: 331, rating: 4.6 },
  { id: "b8", name: "Medikids Surabaya", brand: "Medikids", city: "Surabaya", address: "Jl. Raya Darmo No. 30, Surabaya", phone: "0812-1000-0108", chairs: 4, status: "Open", monthlyRevenue: 301_000_000, patientsThisMonth: 362, rating: 4.7 },
  { id: "b9", name: "Medikids Semarang", brand: "Medikids", city: "Semarang", address: "Jl. Pandanaran No. 21, Semarang", phone: "0812-1000-0109", chairs: 3, status: "Open", monthlyRevenue: 228_000_000, patientsThisMonth: 279, rating: 4.6 },
  { id: "b10", name: "Medikids Makassar", brand: "Medikids", city: "Makassar", address: "Jl. Boulevard Panakkukang, Makassar", phone: "0812-1000-0110", chairs: 3, status: "Renovation", monthlyRevenue: 118_000_000, patientsThisMonth: 142, rating: 4.5 },
];

export const specialties = [
  "Dokter Gigi Umum",
  "Sp. Kedokteran Gigi Anak",
  "Sp. Orthodonsia",
  "Sp. Konservasi Gigi",
  "Sp. Bedah Mulut",
  "Sp. Periodonsia",
  "Sp. Prostodonsia",
  "Dokter Umum",
] as const;

export type Specialty = (typeof specialties)[number];

export type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: Specialty;
  branchId: string;
  days: string[];
  hours: string;
  rating: number;
  reviews: number;
  patientsThisMonth: number;
  experience: number;
  status: "Active" | "On Leave" | "Inactive";
  phone: string;
  str: string;
};

export const doctors: Doctor[] = [
  { id: "d1", name: "drg. Anindya Putri", title: "Sp.KGA", specialty: "Sp. Kedokteran Gigi Anak", branchId: "b3", days: ["Mon", "Wed", "Fri", "Sat"], hours: "09:00 – 17:00", rating: 4.9, reviews: 312, patientsThisMonth: 142, experience: 9, status: "Active", phone: "0811-2200-001", str: "STR-3171-0001" },
  { id: "d2", name: "drg. Bima Prasetyo", title: "Sp.Ort", specialty: "Sp. Orthodonsia", branchId: "b1", days: ["Tue", "Thu", "Sat"], hours: "10:00 – 19:00", rating: 4.8, reviews: 268, patientsThisMonth: 118, experience: 12, status: "Active", phone: "0811-2200-002", str: "STR-3171-0002" },
  { id: "d3", name: "drg. Clara Wijaya", title: "", specialty: "Dokter Gigi Umum", branchId: "b2", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], hours: "08:00 – 16:00", rating: 4.7, reviews: 194, patientsThisMonth: 165, experience: 5, status: "Active", phone: "0811-2200-003", str: "STR-3171-0003" },
  { id: "d4", name: "drg. Dimas Hakim", title: "Sp.BM", specialty: "Sp. Bedah Mulut", branchId: "b4", days: ["Wed", "Sat"], hours: "13:00 – 20:00", rating: 4.9, reviews: 156, patientsThisMonth: 64, experience: 14, status: "Active", phone: "0811-2200-004", str: "STR-3171-0004" },
  { id: "d5", name: "drg. Elisa Ramadhani", title: "Sp.KG", specialty: "Sp. Konservasi Gigi", branchId: "b6", days: ["Mon", "Thu", "Sun"], hours: "09:00 – 15:00", rating: 4.8, reviews: 141, patientsThisMonth: 77, experience: 8, status: "On Leave", phone: "0811-2200-005", str: "STR-3674-0005" },
  { id: "d6", name: "drg. Fajar Nugroho", title: "Sp.Perio", specialty: "Sp. Periodonsia", branchId: "b5", days: ["Tue", "Fri"], hours: "14:00 – 20:00", rating: 4.6, reviews: 88, patientsThisMonth: 49, experience: 10, status: "Active", phone: "0811-2200-006", str: "STR-3275-0006" },
  { id: "d7", name: "drg. Gita Lestari", title: "Sp.Pros", specialty: "Sp. Prostodonsia", branchId: "b1", days: ["Mon", "Wed"], hours: "10:00 – 18:00", rating: 4.7, reviews: 102, patientsThisMonth: 58, experience: 11, status: "Active", phone: "0811-2200-007", str: "STR-3171-0007" },
  { id: "d8", name: "drg. Hana Safitri", title: "", specialty: "Dokter Gigi Umum", branchId: "b7", days: ["Tue", "Wed", "Thu", "Sat"], hours: "09:00 – 17:00", rating: 4.6, reviews: 120, patientsThisMonth: 133, experience: 4, status: "Active", phone: "0811-2200-008", str: "STR-3273-0008" },
  { id: "d9", name: "drg. Irfan Maulana", title: "Sp.Ort", specialty: "Sp. Orthodonsia", branchId: "b8", days: ["Mon", "Fri", "Sat"], hours: "11:00 – 19:00", rating: 4.8, reviews: 176, patientsThisMonth: 96, experience: 13, status: "Active", phone: "0811-2200-009", str: "STR-3578-0009" },
  { id: "d10", name: "drg. Jessica Tanoto", title: "Sp.KGA", specialty: "Sp. Kedokteran Gigi Anak", branchId: "b4", days: ["Tue", "Thu", "Sun"], hours: "09:00 – 16:00", rating: 4.9, reviews: 228, patientsThisMonth: 121, experience: 7, status: "Active", phone: "0811-2200-010", str: "STR-3171-0010" },
  { id: "d11", name: "dr. Kevin Santoso", title: "", specialty: "Dokter Umum", branchId: "b3", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], hours: "08:00 – 14:00", rating: 4.5, reviews: 64, patientsThisMonth: 88, experience: 6, status: "Active", phone: "0811-2200-011", str: "STR-3171-0011" },
  { id: "d12", name: "drg. Laras Anggraini", title: "", specialty: "Dokter Gigi Umum", branchId: "b9", days: ["Mon", "Wed", "Fri"], hours: "13:00 – 20:00", rating: 4.4, reviews: 51, patientsThisMonth: 72, experience: 3, status: "Inactive", phone: "0811-2200-012", str: "STR-3374-0012" },
];

export type ServiceCategory = "Gigi Anak" | "Gigi Dewasa" | "Vaksinasi" | "Tumbuh Kembang";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  priceFrom: number;
  priceTo?: number;
  duration: number;
  active: boolean;
  promo?: number;
};

export const services: Service[] = [
  { id: "s1", name: "My First Dental Visit", category: "Gigi Anak", priceFrom: 150_000, duration: 30, active: true, promo: 20 },
  { id: "s2", name: "Cabut Gigi Susu Anak", category: "Gigi Anak", priceFrom: 200_000, priceTo: 350_000, duration: 30, active: true },
  { id: "s3", name: "Penambalan Gigi Susu Anak", category: "Gigi Anak", priceFrom: 250_000, priceTo: 450_000, duration: 45, active: true },
  { id: "s4", name: "Dental Sealant", category: "Gigi Anak", priceFrom: 200_000, duration: 30, active: true },
  { id: "s5", name: "Topikal Aplikasi Fluoride", category: "Gigi Anak", priceFrom: 250_000, duration: 20, active: true },
  { id: "s6", name: "Space Maintainer", category: "Gigi Anak", priceFrom: 1_200_000, priceTo: 2_000_000, duration: 60, active: true },
  { id: "s7", name: "My-O Therapy with Myobraces", category: "Gigi Anak", priceFrom: 8_500_000, duration: 60, active: true },
  { id: "s8", name: "Scaling Gigi", category: "Gigi Dewasa", priceFrom: 350_000, priceTo: 600_000, duration: 45, active: true },
  { id: "s9", name: "Behel Gigi", category: "Gigi Dewasa", priceFrom: 6_500_000, priceTo: 15_000_000, duration: 90, active: true, promo: 15 },
  { id: "s10", name: "Bleaching Gigi", category: "Gigi Dewasa", priceFrom: 2_500_000, duration: 90, active: true },
  { id: "s11", name: "Penambalan Gigi Permanen", category: "Gigi Dewasa", priceFrom: 350_000, priceTo: 800_000, duration: 45, active: true },
  { id: "s12", name: "Perawatan Saluran Akar", category: "Gigi Dewasa", priceFrom: 1_500_000, priceTo: 3_500_000, duration: 60, active: true },
  { id: "s13", name: "Operasi Cabut Gigi Geraham Bungsu", category: "Gigi Dewasa", priceFrom: 2_500_000, priceTo: 4_500_000, duration: 90, active: true, promo: 10 },
  { id: "s14", name: "Cabut Gigi", category: "Gigi Dewasa", priceFrom: 300_000, priceTo: 600_000, duration: 30, active: true },
  { id: "s15", name: "Rontgen Gigi (Panoramic)", category: "Gigi Dewasa", priceFrom: 250_000, duration: 15, active: true },
  { id: "s16", name: "Veneer Gigi", category: "Gigi Dewasa", priceFrom: 3_000_000, priceTo: 6_000_000, duration: 120, active: true },
  { id: "s17", name: "Implan Gigi", category: "Gigi Dewasa", priceFrom: 15_000_000, priceTo: 25_000_000, duration: 120, active: true, promo: 10 },
  { id: "s18", name: "Gigi Palsu Lepasan", category: "Gigi Dewasa", priceFrom: 1_500_000, priceTo: 5_000_000, duration: 60, active: true },
  { id: "s19", name: "Bridge Gigi", category: "Gigi Dewasa", priceFrom: 4_500_000, duration: 90, active: false },
  { id: "s20", name: "Vaksin Flu", category: "Vaksinasi", priceFrom: 275_000, duration: 15, active: true },
  { id: "s21", name: "Vaksin PCV", category: "Vaksinasi", priceFrom: 950_000, duration: 15, active: true },
  { id: "s22", name: "Vaksin HPV", category: "Vaksinasi", priceFrom: 1_250_000, duration: 15, active: true },
  { id: "s23", name: "Vaksin MMR", category: "Vaksinasi", priceFrom: 420_000, duration: 15, active: true },
  { id: "s24", name: "Vaksin Varicella", category: "Vaksinasi", priceFrom: 650_000, duration: 15, active: true },
  { id: "s25", name: "Skrining Tumbuh Kembang Anak", category: "Tumbuh Kembang", priceFrom: 450_000, duration: 60, active: true },
];

export type ToothStatus = "healthy" | "caries" | "filled" | "missing" | "crown" | "rct";

export type Patient = {
  id: string;
  mrn: string;
  name: string;
  gender: "L" | "P";
  dob: string;
  phone: string;
  email: string;
  branchId: string;
  insurance: string;
  lastVisit: string;
  visits: number;
  totalSpent: number;
  status: "Active" | "Inactive";
  allergies?: string;
  teeth: Partial<Record<number, ToothStatus>>;
  history: { date: string; service: string; doctorId: string; note: string; cost: number }[];
};

export const patients: Patient[] = [
  {
    id: "p1", mrn: "MHDC-24-00187", name: "Rafa Aditya", gender: "L", dob: "2019-03-14", phone: "0813-5521-0187", email: "ortu.rafa@mail.com",
    branchId: "b3", insurance: "Admedika", lastVisit: "2026-10-18", visits: 7, totalSpent: 2_850_000, status: "Active",
    teeth: { 54: "filled", 64: "caries", 75: "rct", 85: "filled" },
    history: [
      { date: "2026-10-18", service: "Penambalan Gigi Susu Anak", doctorId: "d1", note: "Tambal GIC gigi 54", cost: 350_000 },
      { date: "2026-07-02", service: "Topikal Aplikasi Fluoride", doctorId: "d1", note: "Kontrol 3 bulan", cost: 250_000 },
      { date: "2026-03-11", service: "Pulpotomi", doctorId: "d1", note: "Gigi 75", cost: 900_000 },
    ],
  },
  {
    id: "p2", mrn: "MHDC-23-01422", name: "Siti Nurhaliza", gender: "P", dob: "1994-08-22", phone: "0812-7712-1422", email: "siti.nur@mail.com",
    branchId: "b1", insurance: "BNI Life", lastVisit: "2026-10-19", visits: 14, totalSpent: 12_400_000, status: "Active", allergies: "Penicillin",
    teeth: { 16: "rct", 26: "crown", 36: "filled", 46: "caries", 48: "missing", 38: "missing" },
    history: [
      { date: "2026-10-19", service: "Kontrol Behel", doctorId: "d2", note: "Ganti karet, aktivasi kawat", cost: 350_000 },
      { date: "2026-09-14", service: "Kontrol Behel", doctorId: "d2", note: "Rutin", cost: 350_000 },
      { date: "2026-05-02", service: "Operasi Cabut Gigi Geraham Bungsu", doctorId: "d4", note: "Odontektomi 38 & 48", cost: 6_800_000 },
    ],
  },
  {
    id: "p3", mrn: "MHDC-25-00311", name: "Budi Santoso", gender: "L", dob: "1981-01-05", phone: "0811-9087-0311", email: "budi.s@mail.com",
    branchId: "b2", insurance: "Inhealth", lastVisit: "2026-10-12", visits: 5, totalSpent: 18_900_000, status: "Active",
    teeth: { 36: "missing", 37: "crown", 14: "filled", 24: "filled", 47: "caries" },
    history: [
      { date: "2026-10-12", service: "Implan Gigi", doctorId: "d7", note: "Tahap 1 – pemasangan fixture gigi 36", cost: 16_500_000 },
      { date: "2026-08-20", service: "Rontgen Gigi (Panoramic)", doctorId: "d3", note: "Evaluasi tulang rahang", cost: 250_000 },
    ],
  },
  {
    id: "p4", mrn: "MHDC-24-00902", name: "Aisyah Maharani", gender: "P", dob: "2016-11-30", phone: "0857-2210-0902", email: "ortu.aisyah@mail.com",
    branchId: "b4", insurance: "Umum", lastVisit: "2026-10-20", visits: 9, totalSpent: 9_650_000, status: "Active",
    teeth: { 55: "missing", 65: "missing", 16: "healthy", 26: "healthy" },
    history: [
      { date: "2026-10-20", service: "My-O Therapy with Myobraces", doctorId: "d10", note: "Kontrol bulan ke-4", cost: 0 },
      { date: "2026-06-15", service: "My-O Therapy with Myobraces", doctorId: "d10", note: "Insersi alat", cost: 8_500_000 },
    ],
  },
  {
    id: "p5", mrn: "MHDC-22-02210", name: "Dewi Kartika", gender: "P", dob: "1989-05-17", phone: "0821-3398-2210", email: "dewi.k@mail.com",
    branchId: "b6", insurance: "Lippo Insurance", lastVisit: "2026-09-28", visits: 11, totalSpent: 7_300_000, status: "Active",
    teeth: { 11: "crown", 21: "crown", 12: "filled", 22: "filled" },
    history: [
      { date: "2026-09-28", service: "Bleaching Gigi", doctorId: "d5", note: "In-office bleaching", cost: 2_500_000 },
      { date: "2026-04-10", service: "Scaling Gigi", doctorId: "d5", note: "Rutin 6 bulan", cost: 450_000 },
    ],
  },
  {
    id: "p6", mrn: "MHDC-25-01005", name: "Galih Pratama", gender: "L", dob: "1999-12-02", phone: "0896-4410-1005", email: "galih.p@mail.com",
    branchId: "b5", insurance: "Umum", lastVisit: "2026-10-15", visits: 3, totalSpent: 1_150_000, status: "Active",
    teeth: { 17: "caries", 27: "caries", 46: "filled" },
    history: [{ date: "2026-10-15", service: "Scaling Gigi", doctorId: "d6", note: "Gingivitis ringan", cost: 450_000 }],
  },
  {
    id: "p7", mrn: "MHDC-21-00078", name: "Hendra Gunawan", gender: "L", dob: "1965-07-09", phone: "0812-1180-0078", email: "hendra.g@mail.com",
    branchId: "b2", insurance: "Medika Plaza", lastVisit: "2026-06-03", visits: 22, totalSpent: 24_600_000, status: "Inactive",
    teeth: { 18: "missing", 28: "missing", 38: "missing", 48: "missing", 35: "missing", 36: "missing", 46: "crown", 47: "crown" },
    history: [{ date: "2026-06-03", service: "Gigi Palsu Lepasan", doctorId: "d7", note: "Kontrol adaptasi", cost: 0 }],
  },
  {
    id: "p8", mrn: "MHDC-25-01377", name: "Nayla Zahra", gender: "P", dob: "2021-02-19", phone: "0813-8800-1377", email: "ortu.nayla@mail.com",
    branchId: "b7", insurance: "Garda Medika", lastVisit: "2026-10-17", visits: 2, totalSpent: 400_000, status: "Active",
    teeth: { 51: "caries", 61: "caries" },
    history: [{ date: "2026-10-17", service: "My First Dental Visit", doctorId: "d8", note: "Edukasi sikat gigi, karies 51 & 61", cost: 150_000 }],
  },
  {
    id: "p9", mrn: "MHDC-24-00650", name: "Yusuf Hidayat", gender: "L", dob: "2003-04-25", phone: "0819-2260-0650", email: "yusuf.h@mail.com",
    branchId: "b8", insurance: "Umum", lastVisit: "2026-10-16", visits: 6, totalSpent: 8_200_000, status: "Active",
    teeth: { 14: "missing", 24: "missing" },
    history: [{ date: "2026-10-16", service: "Behel Gigi", doctorId: "d9", note: "Pemasangan bracket metal", cost: 7_500_000 }],
  },
  {
    id: "p10", mrn: "MHDC-23-01890", name: "Putri Ayu Lestari", gender: "P", dob: "1997-09-11", phone: "0815-6620-1890", email: "putri.ayu@mail.com",
    branchId: "b9", insurance: "YKKBI", lastVisit: "2026-10-08", visits: 4, totalSpent: 3_100_000, status: "Active",
    teeth: { 26: "rct", 36: "filled" },
    history: [{ date: "2026-10-08", service: "Perawatan Saluran Akar", doctorId: "d12", note: "Kunjungan 2/3 gigi 26", cost: 1_800_000 }],
  },
];

export type AppointmentStatus = "Confirmed" | "Checked In" | "In Treatment" | "Completed" | "Cancelled" | "No Show" | "Pending";

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  branchId: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  channel: "WhatsApp" | "Website" | "Walk-in" | "Call Center";
};

export const appointments: Appointment[] = [
  { id: "a1", patientId: "p4", doctorId: "d10", branchId: "b4", service: "My-O Therapy with Myobraces", date: "2026-10-20", time: "09:00", status: "Completed", channel: "WhatsApp" },
  { id: "a2", patientId: "p1", doctorId: "d1", branchId: "b3", service: "Topikal Aplikasi Fluoride", date: "2026-10-20", time: "09:30", status: "Completed", channel: "Website" },
  { id: "a3", patientId: "p3", doctorId: "d3", branchId: "b2", service: "Scaling Gigi", date: "2026-10-20", time: "10:00", status: "In Treatment", channel: "Call Center" },
  { id: "a4", patientId: "p2", doctorId: "d2", branchId: "b1", service: "Kontrol Behel", date: "2026-10-20", time: "11:00", status: "Checked In", channel: "WhatsApp" },
  { id: "a5", patientId: "p6", doctorId: "d6", branchId: "b5", service: "Penambalan Gigi Permanen", date: "2026-10-20", time: "14:00", status: "Confirmed", channel: "Website" },
  { id: "a6", patientId: "p8", doctorId: "d8", branchId: "b7", service: "Penambalan Gigi Susu Anak", date: "2026-10-20", time: "15:30", status: "Confirmed", channel: "WhatsApp" },
  { id: "a7", patientId: "p9", doctorId: "d9", branchId: "b8", service: "Kontrol Behel", date: "2026-10-20", time: "16:00", status: "Pending", channel: "Website" },
  { id: "a8", patientId: "p5", doctorId: "d5", branchId: "b6", service: "Veneer Gigi", date: "2026-10-20", time: "17:00", status: "Cancelled", channel: "Call Center" },
  { id: "a9", patientId: "p10", doctorId: "d12", branchId: "b9", service: "Perawatan Saluran Akar", date: "2026-10-21", time: "13:00", status: "Confirmed", channel: "WhatsApp" },
  { id: "a10", patientId: "p7", doctorId: "d7", branchId: "b2", service: "Gigi Palsu Lepasan", date: "2026-10-21", time: "10:00", status: "Pending", channel: "Call Center" },
  { id: "a11", patientId: "p2", doctorId: "d4", branchId: "b4", service: "Operasi Cabut Gigi Geraham Bungsu", date: "2026-10-22", time: "13:00", status: "Confirmed", channel: "Website" },
  { id: "a12", patientId: "p3", doctorId: "d7", branchId: "b1", service: "Implan Gigi", date: "2026-10-23", time: "11:00", status: "Confirmed", channel: "WhatsApp" },
  { id: "a13", patientId: "p6", doctorId: "d3", branchId: "b2", service: "Scaling Gigi", date: "2026-10-19", time: "09:00", status: "No Show", channel: "Website" },
];

export type ApprovalType = "Treatment Plan" | "Discount Request" | "Doctor Leave" | "Schedule Change" | "Refund" | "Insurance Claim" | "New Doctor";

export type Approval = {
  id: string;
  code: string;
  type: ApprovalType;
  title: string;
  description: string;
  requestedBy: string;
  branchId: string;
  amount?: number;
  date: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Approved" | "Rejected";
  note?: string;
};

export const approvals: Approval[] = [
  { id: "ap1", code: "APV-2610-041", type: "Treatment Plan", title: "Implan gigi 36 – Budi Santoso", description: "Rencana perawatan implan 2 tahap termasuk bone graft. Estimasi 3 kunjungan.", requestedBy: "drg. Gita Lestari", branchId: "b1", amount: 21_500_000, date: "2026-10-20", priority: "High", status: "Pending" },
  { id: "ap2", code: "APV-2610-040", type: "Discount Request", title: "Diskon karyawan BNI – Behel Gigi", description: "Pengajuan diskon korporat 15% untuk pasien pemegang kartu karyawan BNI.", requestedBy: "Front Office Wisma BNI 46", branchId: "b2", amount: 1_275_000, date: "2026-10-20", priority: "Medium", status: "Pending" },
  { id: "ap3", code: "APV-2610-039", type: "Doctor Leave", title: "Cuti drg. Elisa Ramadhani", description: "Cuti seminar PDGI 24–27 Okt 2026. Pasien dialihkan ke drg. Clara Wijaya.", requestedBy: "drg. Elisa Ramadhani", branchId: "b6", date: "2026-10-19", priority: "Medium", status: "Pending" },
  { id: "ap4", code: "APV-2610-038", type: "Insurance Claim", title: "Klaim Admedika – Rafa Aditya", description: "Klaim penambalan gigi susu & fluoride, plafon tersedia.", requestedBy: "Kasir Medikids Kemang", branchId: "b3", amount: 600_000, date: "2026-10-19", priority: "Low", status: "Pending" },
  { id: "ap5", code: "APV-2610-037", type: "Refund", title: "Refund DP Veneer – Dewi Kartika", description: "Pasien membatalkan perawatan veneer karena pindah domisili.", requestedBy: "Kasir Medikids BSD", branchId: "b6", amount: 1_500_000, date: "2026-10-18", priority: "High", status: "Pending" },
  { id: "ap6", code: "APV-2610-036", type: "Schedule Change", title: "Tambah jadwal Minggu – drg. Irfan", description: "Permintaan menambah praktik hari Minggu 10:00–15:00 karena antrean orthodonti penuh.", requestedBy: "Branch Manager Surabaya", branchId: "b8", date: "2026-10-18", priority: "Low", status: "Pending" },
  { id: "ap7", code: "APV-2610-035", type: "New Doctor", title: "Onboarding drg. Maya Kusuma, Sp.KGA", description: "Dokter spesialis anak baru untuk Medikids Dago. Dokumen STR & SIP lengkap.", requestedBy: "HR Pusat", branchId: "b7", date: "2026-10-17", priority: "Medium", status: "Pending" },
  { id: "ap8", code: "APV-2610-030", type: "Treatment Plan", title: "Odontektomi 38 & 48 – Siti Nurhaliza", description: "Operasi pengangkatan gigi bungsu impaksi bilateral.", requestedBy: "drg. Dimas Hakim", branchId: "b4", amount: 6_800_000, date: "2026-10-14", priority: "High", status: "Approved", note: "Disetujui, jadwalkan 22 Okt." },
  { id: "ap9", code: "APV-2610-028", type: "Discount Request", title: "Diskon 30% Bleaching", description: "Pengajuan diskon di luar periode promo.", requestedBy: "Front Office Kalibata", branchId: "b1", amount: 750_000, date: "2026-10-12", priority: "Low", status: "Rejected", note: "Melebihi batas diskon cabang (maks 15%)." },
  { id: "ap10", code: "APV-2610-025", type: "Insurance Claim", title: "Klaim Inhealth – Budi Santoso", description: "Klaim rontgen panoramic.", requestedBy: "Kasir Wisma BNI 46", branchId: "b2", amount: 250_000, date: "2026-10-10", priority: "Low", status: "Approved" },
];

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: "Google" | "Website" | "Instagram" | "WhatsApp";
  branchId: string;
  doctorId?: string;
  date: string;
  status: "Pending" | "Published" | "Hidden";
  reply?: string;
};

export const reviews: Review[] = [
  { id: "r1", author: "Sacha Alicya", rating: 5, text: "Lega banget abis scaling. Enteng luar biasa, bener-bener pengalaman terbaik perawatan gigi di Medikids. Harganya terjangkau, staff & dokternya juga bantu supaya gak nervous.", source: "Instagram", branchId: "b3", doctorId: "d1", date: "2026-10-19", status: "Published", reply: "Terima kasih Kak Sacha! Sampai jumpa di kontrol berikutnya 😊" },
  { id: "r2", author: "Dyah Agustina", rating: 5, text: "Fasilitas klinik Medikids sangat lengkap, terdapat playroom dan mini library sehingga anak-anak bisa bermain dengan nyaman.", source: "Google", branchId: "b4", doctorId: "d10", date: "2026-10-18", status: "Published" },
  { id: "r3", author: "Chacha Chairunisa", rating: 5, text: "Staffnya ramah-ramah, kalau mendekati tanggal treatment pasti dikonfirmasi lagi bisa datang atau tidak. Pelayanannya cepat dan hemat.", source: "Google", branchId: "b1", doctorId: "d2", date: "2026-10-18", status: "Pending" },
  { id: "r4", author: "Feby Marcelia", rating: 5, text: "Perawatan di MHDC sangat nyaman, ada ruang tunggu yang cozy dan playground untuk anak-anak. Dokternya kids friendly.", source: "Website", branchId: "b6", date: "2026-10-17", status: "Pending" },
  { id: "r5", author: "Rizky Ramadhan", rating: 3, text: "Dokternya bagus, tapi waktu tunggu cukup lama padahal sudah reservasi. Semoga bisa lebih tepat waktu.", source: "Google", branchId: "b5", doctorId: "d6", date: "2026-10-16", status: "Pending" },
  { id: "r6", author: "Anonim", rating: 1, text: "Parkir susah dan admin lama balas WA.", source: "WhatsApp", branchId: "b9", date: "2026-10-15", status: "Pending" },
  { id: "r7", author: "Lina Marlina", rating: 4, text: "Pasang behel di sini hasilnya rapi, kontrol rutin juga gampang dijadwalkan.", source: "Google", branchId: "b8", doctorId: "d9", date: "2026-10-12", status: "Published" },
  { id: "r8", author: "spam_account_99", rating: 1, text: "Promo murah klik link ini!!!", source: "Website", branchId: "b2", date: "2026-10-11", status: "Hidden" },
  { id: "r9", author: "Andreas Wibowo", rating: 5, text: "Operasi gigi bungsu dengan drg. Dimas sangat smooth, nyaris tidak sakit setelahnya.", source: "Google", branchId: "b4", doctorId: "d4", date: "2026-10-09", status: "Published" },
];

export const revenueTrend = [
  { month: "Nov", revenue: 2_740_000_000, patients: 3120 },
  { month: "Dec", revenue: 2_980_000_000, patients: 3305 },
  { month: "Jan", revenue: 2_610_000_000, patients: 2990 },
  { month: "Feb", revenue: 2_790_000_000, patients: 3150 },
  { month: "Mar", revenue: 3_050_000_000, patients: 3410 },
  { month: "Apr", revenue: 2_870_000_000, patients: 3260 },
  { month: "May", revenue: 3_190_000_000, patients: 3520 },
  { month: "Jun", revenue: 3_420_000_000, patients: 3780 },
  { month: "Jul", revenue: 3_610_000_000, patients: 3940 },
  { month: "Aug", revenue: 3_380_000_000, patients: 3700 },
  { month: "Sep", revenue: 3_520_000_000, patients: 3860 },
  { month: "Oct", revenue: 3_710_000_000, patients: 3978 },
];

export const serviceMix = [
  { name: "Gigi Anak", value: 38 },
  { name: "Orthodonti", value: 22 },
  { name: "Gigi Dewasa", value: 26 },
  { name: "Vaksinasi", value: 9 },
  { name: "Tumbuh Kembang", value: 5 },
];

export const insurers = ["Umum", "Admedika", "Inhealth", "BNI Life", "BRI Life", "Lippo Insurance", "Medika Plaza", "Garda Medika", "YKKBI", "OJK"];

export const doctorById = (id?: string) => doctors.find((d) => d.id === id);
export const patientById = (id?: string) => patients.find((p) => p.id === id);
export const branchById = (id?: string) => branches.find((b) => b.id === id);
