import { NextRequest, NextResponse } from "next/server";

interface AIChatRequest {
  message: string;
  lang?: "id" | "en";
}

const TRACKING_REGEX = /([A-Z]{2,3}\d{8,14})/g;
const PHONE_REGEX = /(?:nomor|telepon|telp|phone|hp|no\.?\s*)?[\s:]+(\+?[\d\s\-]{6,15})/gi;
const SIMPLE_PHONE_REGEX = /\b(\d{5,15})\b/g;

function extractTrackingNumbers(text: string): string[] {
  return [...(text.match(TRACKING_REGEX) ?? [])];
}

function extractPhoneNumbers(text: string): string[] {
  const phones: string[] = [];
  const phoneRe = new RegExp(PHONE_REGEX.source, PHONE_REGEX.flags);
  let m: RegExpExecArray | null;
  while ((m = phoneRe.exec(text)) !== null) {
    if (m[1]) phones.push(m[1].trim().replace(/\s+/g, ""));
  }
  if (phones.length === 0) {
    const simpleRe = new RegExp(SIMPLE_PHONE_REGEX.source, SIMPLE_PHONE_REGEX.flags);
    while ((m = simpleRe.exec(text)) !== null) {
      if (m[1] && m[1].length >= 5 && m[1].length <= 15) phones.push(m[1]);
    }
  }
  const unique: string[] = [];
  phones.forEach((p) => { if (!unique.includes(p)) unique.push(p); });
  return unique;
}

function generateTrackingResponse(trackingNumber: string, phoneNumber: string | undefined, lang: string): string {
  const carriers: Record<string, { name: string; city: string; eta: string }> = {
    POS: { name: "POS Indonesia", city: "Bandung", eta: "29 Mei 2026" },
    JNE: { name: "JNE Express", city: "Jakarta", eta: "28 Mei 2026" },
    JNT: { name: "J&T Express", city: "Bogor", eta: "28 Mei 2026" },
    SIC: { name: "SiCepat", city: "Depok", eta: "29 Mei 2026" },
  };
  const carrier = carriers[trackingNumber.slice(0, 3).toUpperCase()] ?? { name: "Kurir", city: "Tujuan", eta: "30 Mei 2026" };
  const isEn = lang === "en";

  let r = `> 🔍 **${isEn ? "Processing your request..." : "Memproses permintaan Anda..."}**\n`;
  r += `> ✅ ${isEn ? "Extracting entities:" : "Mengekstrak entitas:"}\n`;
  r += `>    📦 ${isEn ? "Tracking No" : "Nomor Resi"}  : \`${trackingNumber}\`\n`;
  if (phoneNumber) r += `>    📞 ${isEn ? "Phone Number" : "Nomor Telepon"}: \`${phoneNumber}\`\n`;
  r += `\n> 🌐 ${isEn ? `Contacting ${carrier.name} service...` : `Menghubungi layanan ${carrier.name}...`}\n`;
  r += `> ✅ ${isEn ? "Tracking data found:" : "Data resi ditemukan:"}\n\n`;

  r += `**${isEn ? "Tracking Status" : "Status Resi"} \`${trackingNumber}\`:**\n`;
  r += `- 🚚 **${isEn ? "Status" : "Status"}:** ${isEn ? `In Transit → ${carrier.city}` : `Dalam Perjalanan → ${carrier.city}`}\n`;
  r += `- 📅 **${isEn ? "ETA" : "Estimasi Tiba"}:** ${carrier.eta}\n`;
  r += `- 🏭 **${isEn ? "Carrier" : "Layanan"}:** ${carrier.name}\n\n`;

  if (phoneNumber) {
    r += `> 📞 ${isEn ? `Contacting \`${phoneNumber}\`...` : `Menghubungi nomor \`${phoneNumber}\`...`}\n`;
    r += `> ✅ ${isEn ? "Automated call scheduled:" : "Panggilan otomatis dijadwalkan:"}\n\n`;
    r += `**${isEn ? "Customer Notification" : "Notifikasi Pelanggan"} \`${phoneNumber}\`:**\n`;
    r += `- 📱 ${isEn ? "Status: Call scheduled in **10 minutes**" : "Status: Panggilan dijadwalkan **10 menit** ke depan"}\n`;
    r += `- 💬 ${isEn ? `Message: *"Your package ${trackingNumber} is on the way, ETA ${carrier.eta}"*` : `Pesan: *"Paket ${trackingNumber} Anda sedang dalam perjalanan, estimasi tiba ${carrier.eta}"*`}\n\n`;
  }

  r += `---\n**${isEn ? "Task Summary" : "Ringkasan Tugas"} ✅**\n`;
  r += `1. 📦 ${isEn ? `Tracking **\`${trackingNumber}\`** is in transit to ${carrier.city} via ${carrier.name}, ETA: ${carrier.eta}.` : `Resi **\`${trackingNumber}\`** sedang dalam pengiriman ke ${carrier.city} via ${carrier.name}, ETA: ${carrier.eta}.`}\n`;
  if (phoneNumber) r += `2. 📞 ${isEn ? `Number **\`${phoneNumber}\`** has been scheduled for automated contact.` : `Nomor **\`${phoneNumber}\`** telah dijadwalkan untuk dihubungi.`}\n`;
  return r;
}

function generateGeneralResponse(message: string, lang: string): string {
  const msgLower = message.toLowerCase();
  const isEn = lang === "en";

  if (msgLower.includes("siapa") || msgLower.includes("who") || msgLower.includes("alaric")) {
    return isEn
      ? `**Alaric Rasendriya Aniko** is an adaptive Fullstack Developer currently pursuing an **Bachelor of Computer in Information Systems** at Telkom University (GPA 3.61/4.00).\n\nHe has professional experience as:\n- 💼 Full-stack Developer Intern at PT Meta Mata Indonesia\n- 🎓 Teaching Assistant at Telkom University\n\nHe is proficient in React.js, Next.js, Laravel, React Native, and AWS — with 5 published research papers in IEEE Scopus and Sinta 2 journals.\n\nWhat would you like to know more about?`
      : `**Alaric Rasendriya Aniko** adalah Fullstack Developer adaptif yang saat ini menempuh **S1 Sistem Informasi** di Telkom University (IPK 3.61/4.00).\n\nPengalaman profesional:\n- 💼 Full-stack Developer Intern di PT Meta Mata Indonesia\n- 🎓 Asisten Dosen di Telkom University\n\nKeahlian: React.js, Next.js, Laravel, React Native, AWS — dengan 5 publikasi ilmiah di IEEE Scopus dan Sinta 2.\n\nAda yang ingin Anda ketahui lebih lanjut?`;
  }

  if (msgLower.includes("skill") || msgLower.includes("teknologi") || msgLower.includes("tech") || msgLower.includes("keahlian")) {
    return isEn
      ? `**Alaric's Tech Stack:**\n\n🖥️ **Frontend:** React.js, Next.js, React Native, PWA, Tailwind CSS\n⚙️ **Backend:** Laravel 10, Express.js, Node.js, RESTful API\n☁️ **Cloud:** AWS (EC2, Lambda, API Gateway, CloudWatch)\n🤖 **AI/Tools:** Claude Code, IBM Granite, Git/GitHub\n🗄️ **Database:** MySQL\n\nWant to know which project used a specific stack?`
      : `**Tech Stack Alaric:**\n\n🖥️ **Frontend:** React.js, Next.js, React Native, PWA, Tailwind CSS\n⚙️ **Backend:** Laravel 10, Express.js, Node.js, RESTful API\n☁️ **Cloud:** AWS (EC2, Lambda, API Gateway, CloudWatch)\n🤖 **AI/Tools:** Claude Code, IBM Granite, Git/GitHub\n🗄️ **Database:** MySQL\n\nMau tahu detail proyek mana yang menggunakan stack tertentu?`;
  }

  if (msgLower.includes("flowbeat")) {
    return isEn
      ? `**FlowBeat** is a real-time IoT health monitoring system for elderly patients.\n\n- 🫀 Measures **BPM & SpO2** via MAX30102 sensor + ESP32 + BLE\n- 📱 **React Native** mobile app for caregivers\n- ⚙️ **Express.js** backend on AWS EC2\n- 📊 SUS Score: **82.5/100** (Grade B — Excellent)\n- 📄 Published in **JNTETI Journal (Sinta 2)**\n\nClick **"View Architecture"** on the FlowBeat card for the full technical breakdown!`
      : `**FlowBeat** adalah sistem monitoring kesehatan IoT real-time untuk pasien lansia.\n\n- 🫀 Mengukur **BPM & SpO2** via sensor MAX30102 + ESP32 + BLE\n- 📱 Aplikasi mobile **React Native** untuk tenaga kesehatan\n- ⚙️ Backend **Express.js** di AWS EC2\n- 📊 SUS Score: **82.5/100** (Grade B — Excellent)\n- 📄 Dipublikasikan di **Jurnal JNTETI (Sinta 2)**\n\nKlik **"Lihat Arsitektur"** di kartu FlowBeat untuk breakdown teknis lengkap!`;
  }

  if (msgLower.includes("project") || msgLower.includes("proyek") || msgLower.includes("portfolio")) {
    return isEn
      ? `**Alaric's Featured Projects:**\n\n1. 🫀 **FlowBeat** — IoT health monitoring (BPM & SpO2). Stack: React Native + Express.js + AWS. SUS: 82.5/100.\n\n2. ☕ **Seteguk Kopi** — E-commerce + PWA. Stack: Laravel 10 + Tailwind CSS. Lighthouse PWA: 92/100.\n\n3. 🏥 **Covid-19 Dashboard** — Inpatient monitoring. Stack: React.js + REST API. Published IEEE Scopus.\n\nClick **"View Architecture"** on each card for detailed technical docs!`
      : `**Proyek Unggulan Alaric:**\n\n1. 🫀 **FlowBeat** — IoT health monitoring (BPM & SpO2). Stack: React Native + Express.js + AWS. SUS: 82.5/100.\n\n2. ☕ **Seteguk Kopi** — E-commerce + PWA. Stack: Laravel 10 + Tailwind CSS. Lighthouse PWA: 92/100.\n\n3. 🏥 **Dashboard Covid-19** — Monitoring pasien rawat inap. Stack: React.js + REST API. IEEE Scopus.\n\nKlik **"Lihat Arsitektur"** di setiap kartu untuk detail teknis lengkap!`;
  }

  return isEn
    ? `Hello! I'm the AI assistant for **Alaric Rasendriya Aniko's** portfolio — powered by IBM Granite simulation.\n\nI can help you:\n- 👤 Learn about Alaric's profile and experience\n- 🛠️ Explore his tech stack and skills\n- 📁 Get project architecture details\n- 📚 View academic publications\n- \n\nWhat would you like to know?`
    : `Halo! Saya asisten AI portofolio **Alaric Rasendriya Aniko** — disimulasikan dengan IBM Granite.\n\nSaya bisa membantu:\n- 👤 Mengenal profil dan pengalaman Alaric\n- 🛠️ Eksplorasi tech stack dan keahlian\n- 📁 Detail arsitektur proyek\n- 📚 Informasi publikasi ilmiah\n- \n\nApa yang ingin Anda ketahui?`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AIChatRequest;
    const { message, lang = "id" } = body;
    if (!message?.trim()) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const trackingNumbers = extractTrackingNumbers(message);
    const phoneNumbers = extractPhoneNumbers(message);
    const hasTrackingIntent = trackingNumbers.length > 0 || /(?:cek|check|status|resi|tracking|lacak)/i.test(message);

    const responseText =
      hasTrackingIntent && trackingNumbers.length > 0
        ? generateTrackingResponse(trackingNumbers[0], phoneNumbers[0], lang)
        : generateGeneralResponse(message, lang);

    return NextResponse.json({
      success: true,
      message: responseText,
      metadata: { model: "IBM-Granite-3.3-8B-Instruct (simulated)", extractedEntities: { trackingNumbers, phoneNumbers } },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
