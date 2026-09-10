const APP_KEY = "pa-dev-data-v1";
const CHALLENGE_RESEARCH_VERSION = 2;
const DB_NAME = "pa-dev-images";
const DB_STORE = "images";
const REQUESTED_MANAGE_MODE = new URLSearchParams(location.search).get("manage") === "1";
const REQUESTED_PASSWORD_RESET = new URLSearchParams(location.search).get("reset") === "1" || location.hash.includes("type=recovery");
const SUPABASE_URL = "https://poijccexkyppwlutpwsf.supabase.co";
const SUPABASE_KEY = "sb_publishable_CUamprk3CTpeh6sVIFunxw_wYo2JPNi";
const STORAGE_BUCKET = "evidence-images";
const OWNER_UID = "cb4c3097-4f02-4ae2-afcc-ada88bed8ea4";
const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
let MANAGE_MODE = false;

const defaults = {
  challengeResearchVersion: CHALLENGE_RESEARCH_VERSION,
  year: "2569",
  round: 1,
  roundPeriods: {
    1: { start: "2025-10-01", end: "2026-03-31" },
    2: { start: "2026-04-01", end: "2026-09-30" }
  },
  roundVisibility: { 1: true, 2: false },
  fields: {
    title: "ครูผู้สร้างการเรียนรู้",
    intro: "ครูคอมพิวเตอร์ผู้จัดการเรียนรู้ผ่านการลงมือปฏิบัติจริง มุ่งพัฒนาทักษะการเขียนโปรแกรม วงจรอิเล็กทรอนิกส์ และการใช้ AI อย่างมีวิจารณญาณ",
    name: "นายปฏิภาณ ใจซื่อ",
    role: "ครู",
    roleLong: "ตำแหน่ง ครู · กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี",
    school: "โรงเรียนปายวิทยาคาร",
    subject: "วิทยาการคำนวณ",
    affiliation: "สพม.แม่ฮ่องสอน",
    salary: "21,790 บาท",
    academicRank: "—",
    hours: "20 ชั่วโมง",
    qualification: "ครุศาสตรบัณฑิต สาขาวิชาคอมพิวเตอร์ศึกษา",
    university: "มหาวิทยาลัยราชภัฏเชียงใหม่",
    appointmentDate: "9 พฤศจิกายน 2566",
    teachingLevels: "มัธยมศึกษาปีที่ 1, 3, 5 และ 6",
    supportHours: "กรอกจำนวนชั่วโมง/สัปดาห์",
    schoolDevelopmentHours: "กรอกจำนวนชั่วโมง/สัปดาห์",
    policyHours: "กรอกจำนวนชั่วโมง/สัปดาห์"
  },
  rounds: {
    1: {
      challengeTitle: "การพัฒนาทักษะการต่อวงจรและเขียนโปรแกรม โดยใช้บทเรียนออนไลน์ร่วมกับ AI เป็นผู้ช่วย",
      challengeProblem: "ผู้เรียนมีความแตกต่างด้านพื้นฐานการต่อวงจรและการเขียนโปรแกรม ทำให้บางคนไม่กล้าทดลอง แก้ข้อผิดพลาดด้วยตนเองได้ช้า และต้องรอคำแนะนำจากครู",
      challengeMethod: "จัดการเรียนรู้บน Chromebook ผ่านเว็บแอปบทเรียนที่ครูสร้าง ให้ผู้เรียนศึกษาบทเรียน ฝึกต่อวงจร เขียนและทดสอบโปรแกรม พร้อมเรียนรู้วิธีตั้งคำถามและใช้ AI เป็นผู้ช่วยอธิบายแนวคิด วิเคราะห์ข้อผิดพลาด และเสนอแนวทางปรับปรุง โดยผู้เรียนต้องตรวจสอบคำตอบก่อนนำไปใช้และส่งชิ้นงานผ่านระบบ",
      challengeResult: "ผู้เรียนสามารถต่อวงจรและเขียนโปรแกรมตามโจทย์ได้ด้วยตนเองมากขึ้น ใช้ AI อย่างมีวิจารณญาณ อธิบายเหตุผลของโค้ดและวงจรได้ และส่งหลักฐานการเรียนรู้ครบตามขั้นตอน",
      challengeQuantitative: "กำหนดจำนวนนักเรียนหรือร้อยละของผู้เรียนที่ผ่านเกณฑ์ตามเป้าหมาย",
      challengeQualitative: "ผู้เรียนต่อวงจร เขียนโปรแกรม ใช้ AI อย่างมีวิจารณญาณ และอธิบายกระบวนการทำงานของตนเองได้"
    },
    2: {
      challengeTitle: "การสร้างและพัฒนาบทเรียนออนไลน์สำเร็จรูปร่วมกับเกมปลูกผักบนอวกาศ Wokwi Simulator และผู้ช่วย AI เพื่อส่งเสริมพฤติกรรมการเรียนรู้และการส่งงาน รายวิชาไมโครคอนโทรลเลอร์เบื้องต้น ของนักเรียนชั้นมัธยมศึกษาปีที่ 6/2",
      challengeProblem: "นักเรียนชั้นมัธยมศึกษาปีที่ 6/2 จำนวน 37 คน ในรายวิชาไมโครคอนโทรลเลอร์เบื้องต้นประสบปัญหา 3 ด้าน ได้แก่ การเขียนโค้ดมีความซับซ้อนและค้นหาข้อผิดพลาดด้วยตนเองได้ยาก อุปกรณ์ฮาร์ดแวร์จริงมีไม่เพียงพอหรือชำรุด และผู้เรียนขาดแรงจูงใจในการทำงานระหว่างคาบ ส่งผลให้ส่งงานล่าช้าและไม่กระตือรือร้นเท่าที่ควร",
      challengeMethod: "ดำเนินการวิจัยในชั้นเรียนตามวงจร Plan–Develop–Implement–Evaluate โดยพัฒนาบทเรียนออนไลน์ 7 บทเรียน 7 ชิ้นงาน และแผนการจัดการเรียนรู้ 15 แผน รวม 60 ชั่วโมง ใช้ Wokwi Simulator จำลองวงจร ใช้ AI เป็นผู้ช่วยชี้แนะการแก้โค้ด และใช้เกมปลูกผักบนอวกาศพร้อมเพชรรางวัล โบนัสส่งเร็ว และตารางจัดอันดับเพื่อสร้างแรงจูงใจ ผู้เรียนส่งหลักฐานเป็นภาพการสนทนากับ AI ชุดโค้ด และวงจรบน Wokwi แล้วประเมินด้วยรูบริกและแบบสอบถามความพึงพอใจ",
      challengeResult: "บทเรียนออนไลน์ช่วยให้ผู้เรียนฝึกต่อวงจรและเขียนโปรแกรมได้แม้อุปกรณ์จริงไม่เพียงพอ ผู้เรียนตอบสนองต่อการเรียนดีขึ้น ปฏิบัติงานบน Wokwi ซักถาม AI และส่งงานในคาบมากขึ้น โดยครูกำกับให้ใช้ AI เป็นผู้ช่วยชี้แนะและตรวจสอบคำตอบด้วยตนเอง",
      challengeQuantitative: "นักเรียนกลุ่มเป้าหมาย 37 คน เรียนผ่านบทเรียน 7 บทเรียน 7 ชิ้นงาน มีคะแนนเฉลี่ยชิ้นงานรวม 8.74 จาก 10 คะแนน คิดเป็นร้อยละ 87.40 ระดับดีมาก อัตราการส่งงานตรงเวลาแต่ละชิ้นอยู่ระหว่างร้อยละ 67.57–81.08 และความพึงพอใจรวมเฉลี่ย 4.01 จาก 5 คะแนน อยู่ในระดับมาก",
      challengeQualitative: "ผู้เรียนสามารถจำลองและตรวจสอบวงจรบน Wokwi ใช้ AI ช่วยวิเคราะห์ข้อผิดพลาด และทำชิ้นงานได้อย่างเป็นระบบมากขึ้น กลไกเพชรรางวัล โบนัสส่งเร็ว และตารางจัดอันดับช่วยเพิ่มความตื่นตัวและแรงจูงใจในการส่งงานภายในคาบ พร้อมส่งเสริมการใช้ AI อย่างมีวิจารณญาณโดยไม่พึ่งพาคำตอบแทนการคิดด้วยตนเอง"
    }
  },
  schedule: [
    ["จันทร์", "จริยธรรม", "ว23182 ม.3/1 · 2105", "ว23182 ม.3/4 · 2105", "พักกลางวัน", "ว23182 ม.3/3 · 2105", "ว30298 ม.6/2 · 2105", "ว30298 ม.6/2 · 2105", "—", "ส33205 · โฮมรูม", "PLC"],
    ["อังคาร", "ว21205 ม.1/1 · 1103–4", "ว21205 ม.1/1 · 1103–4", "ว23182 ม.3/2 · 2105", "พักกลางวัน", "—", "—", "ว23182 ม.3/6 · 2105", "ว23182 ม.3/5 · 2105", "สวนพฤกษศาสตร์", "PLC"],
    ["พุธ", "ว30298 ม.6/2 · 2105", "ว30298 ม.6/2 · 2105", "—", "พักกลางวัน", "—", "—", "ว30275 ม.5/3 · 2105", "ว30275 ม.5/3 · 2105", "ชุมนุม", "—"],
    ["พฤหัสบดี", "—", "—", "—", "พักกลางวัน", "—", "—", "—", "—", "ยุวกาชาด ม.4", "—"],
    ["ศุกร์", "ว21205 ม.1/1 · 1103–4", "ว21205 ม.1/1 · 1103–4", "—", "พักกลางวัน", "—", "ว23182 ม.3/8 · 2105", "ว23182 ม.3/7 · 2105", "I20201 / I30201 / ส23205", "I20201 / I30201 / ส23205", "—"]
  ],
  hiddenCriterionSeeds: { 1: {}, 2: {} }
};

const criteria = [
  ["1.1", "การสร้างและหรือพัฒนาหลักสูตร", "จัดทำรายวิชาและหน่วยการเรียนรู้ให้สอดคล้องกับมาตรฐานการเรียนรู้ ตัวชี้วัดหรือผลการเรียนรู้ และบริบทของผู้เรียน", ["images/1_1.png", "images/1_2.png", "images/work_1.png", "images/work_2.png"]],
  ["1.2", "การออกแบบการจัดการเรียนรู้", "ออกแบบการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญ เพื่อพัฒนาความรู้ ทักษะ คุณลักษณะและสมรรถนะตามหลักสูตร", ["images/1_3_1.jpg", "images/1_3_2.jpg", "images/1_3_3.jpg", "images/1_3_4.jpg"]],
  ["1.3", "การจัดกิจกรรมการเรียนรู้", "อำนวยความสะดวกและส่งเสริมให้ผู้เรียนพัฒนาเต็มตามศักยภาพ เรียนรู้และทำงานร่วมกัน", ["images/1_4_1.png", "images/1_4_2.png", "images/1_4_3.png", "images/inno_2.jpg"]],
  ["1.4", "การสร้างและหรือพัฒนาสื่อ นวัตกรรม เทคโนโลยี และแหล่งเรียนรู้", "สร้างหรือพัฒนาสื่อ นวัตกรรม เทคโนโลยี และแหล่งเรียนรู้ให้สอดคล้องกับกิจกรรมและความแตกต่างของผู้เรียน", ["images/1_5_1.png", "images/1_5_2.png", "images/1_5_3.png", "images/research_cover.png"]],
  ["1.5", "การวัดและประเมินผลการจัดการเรียนรู้", "วัดและประเมินผลด้วยวิธีการที่หลากหลาย เหมาะสม และสอดคล้องกับมาตรฐานการเรียนรู้", ["images/1_6_1.jpg", "images/1_6_2.jpg", "images/1_6_6.jpg", "images/1_6_cover.jpg"]],
  ["1.6", "การศึกษา วิเคราะห์ และสังเคราะห์ เพื่อแก้ปัญหาหรือพัฒนาการเรียนรู้", "นำผลการศึกษา วิเคราะห์ และสังเคราะห์มาใช้แก้ปัญหาหรือพัฒนาการจัดการเรียนรู้ที่ส่งผลต่อคุณภาพผู้เรียน", []],
  ["1.7", "การจัดบรรยากาศที่ส่งเสริมและพัฒนาผู้เรียน", "จัดบรรยากาศและสภาพแวดล้อมที่ส่งเสริมกระบวนการคิด ทักษะชีวิต ทักษะการทำงาน และการเรียนรู้ร่วมกัน", []],
  ["1.8", "การอบรมและพัฒนาคุณลักษณะที่ดีของผู้เรียน", "อบรมบ่มนิสัยและส่งเสริมให้ผู้เรียนมีคุณธรรม จริยธรรม คุณลักษณะอันพึงประสงค์ และค่านิยมที่ดีงาม", []],
  ["2.1", "การจัดทำข้อมูลสารสนเทศของผู้เรียนและรายวิชา", "จัดทำข้อมูลสารสนเทศให้เป็นปัจจุบัน เพื่อใช้ส่งเสริม สนับสนุน และพัฒนาคุณภาพผู้เรียน", ["images/2_1_1.png", "images/2_1_2.png", "images/chat_1.png", "images/chat_2.png"]],
  ["2.2", "การดำเนินการตามระบบดูแลช่วยเหลือผู้เรียน", "ใช้ข้อมูลรายบุคคล ประสานความร่วมมือ และดำเนินการช่วยเหลือผู้เรียนอย่างเป็นระบบ", ["images/2_2_1.png", "images/2_2_2.png", "images/2_3_1.png", "images/2_3_2.jpg"]],
  ["2.3", "การปฏิบัติงานวิชาการและงานอื่น ๆ ของสถานศึกษา", "ร่วมปฏิบัติงานทางวิชาการและงานอื่นของสถานศึกษา เพื่อยกระดับคุณภาพการจัดการศึกษาของสถานศึกษา", []],
  ["2.4", "การประสานความร่วมมือกับผู้ปกครอง ภาคีเครือข่าย และหรือสถานประกอบการ", "ประสานความร่วมมือเพื่อร่วมกันพัฒนาและช่วยเหลือผู้เรียนอย่างต่อเนื่อง", []],
  ["3.1", "การพัฒนาตนเองอย่างเป็นระบบและต่อเนื่อง", "พัฒนาตนเองตามแผนอย่างเป็นระบบและต่อเนื่อง เพื่อเพิ่มความรู้ ความสามารถ ทักษะ และสมรรถนะทางวิชาชีพ", ["images/3_1_1.jpg", "images/3_1_2.jpg", "images/cert_1.jpg", "images/cert_2.jpg"]],
  ["3.2", "การมีส่วนร่วมในการแลกเปลี่ยนเรียนรู้ทางวิชาชีพ", "แลกเปลี่ยนเรียนรู้ทางวิชาชีพเพื่อแก้ปัญหาและพัฒนาการจัดการเรียนรู้ร่วมกับผู้อื่น", ["images/plc_1.jpg", "images/plc_2.jpg", "images/plc_3.jpg", "images/plc_4.jpg"]],
  ["3.3", "การนำความรู้และทักษะจากการพัฒนาตนเองและวิชาชีพมาใช้", "นำความรู้ ความสามารถ และทักษะมาใช้พัฒนาการจัดการเรียนรู้ คุณภาพผู้เรียน และนวัตกรรมการจัดการเรียนรู้", []]
];

const seedEvidence = [];

const criteriaGroups = {
  1: {
    title: "ด้านการจัดการเรียนรู้",
    description: "การพัฒนาหลักสูตร การออกแบบและจัดกิจกรรม สื่อ การวัดผล การแก้ปัญหา บรรยากาศ และคุณลักษณะของผู้เรียน",
    count: "8 ตัวชี้วัด"
  },
  2: {
    title: "ด้านการส่งเสริมและสนับสนุนการจัดการเรียนรู้",
    description: "ข้อมูลสารสนเทศ ระบบดูแลช่วยเหลือ งานวิชาการ และความร่วมมือกับผู้ปกครองหรือเครือข่าย",
    count: "4 ตัวชี้วัด"
  },
  3: {
    title: "ด้านการพัฒนาตนเองและวิชาชีพ",
    description: "การพัฒนาตนเอง การแลกเปลี่ยนเรียนรู้ และการนำความรู้มาพัฒนาผู้เรียนหรือนวัตกรรม",
    count: "3 ตัวชี้วัด"
  }
};

let state = loadState();
let editMode = false;
let evidence = [...seedEvidence];
let activeFilter = "all";
let lightboxItems = [];
let lightboxIndex = 0;
let carouselIndex = 0;
let carouselPointerStart = null;
let activeCriteriaGroup = "all";
let saveTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(APP_KEY));
    const merged = saved ? {
      ...structuredClone(defaults),
      ...saved,
      fields: { ...defaults.fields, ...(saved.fields || {}) },
      rounds: { 1: { ...defaults.rounds[1], ...(saved.rounds?.[1] || {}) }, 2: { ...defaults.rounds[2], ...(saved.rounds?.[2] || {}) } },
      roundPeriods: { 1: { ...defaults.roundPeriods[1], ...(saved.roundPeriods?.[1] || {}) }, 2: { ...defaults.roundPeriods[2], ...(saved.roundPeriods?.[2] || {}) } },
      roundVisibility: { ...defaults.roundVisibility, ...(saved.roundVisibility || {}) }
    } : structuredClone(defaults);
    const oldTitles = [
      "พัฒนาทักษะการคิดเชิงคำนวณ ด้วยการเรียนรู้แบบ Project-based Learning",
      "ต่อยอดห้องเรียนเขียนโปรแกรมสู่การสร้างนวัตกรรมเพื่อชุมชน"
    ];
    [1, 2].forEach(round => {
      if (oldTitles.includes(merged.rounds[round].challengeTitle)) {
        merged.rounds[round] = { ...defaults.rounds[round] };
      }
    });
    if (saved && (Number(saved.challengeResearchVersion) || 0) < CHALLENGE_RESEARCH_VERSION) {
      merged.rounds[2] = structuredClone(defaults.rounds[2]);
      merged.challengeResearchVersion = CHALLENGE_RESEARCH_VERSION;
    }
    if (merged.fields.salary === "21,100 บาท") merged.fields.salary = defaults.fields.salary;
    if (merged.fields.hours === "18 ชั่วโมง") merged.fields.hours = defaults.fields.hours;
    if (merged.fields.intro === "รายงานผลการพัฒนางานตามข้อตกลง เพื่อยกระดับการเรียนรู้วิทยาการคำนวณผ่านการลงมือสร้างจริง") merged.fields.intro = defaults.fields.intro;
    if (merged.year === "2568") merged.year = defaults.year;
    if (!Array.isArray(merged.schedule) || merged.schedule.some(row => row.length < 11) || merged.schedule.some(row => row.some(cell => String(cell).includes("ว31103")))) {
      merged.schedule = structuredClone(defaults.schedule);
    }
    return merged;
  } catch { return structuredClone(defaults); }
}

function saveState() {
  const status = document.querySelector("#saveStatus");
  status.classList.add("saving");
  status.lastChild.textContent = "กำลังบันทึก";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    localStorage.setItem(APP_KEY, JSON.stringify(state));
    if (MANAGE_MODE && supabaseClient) {
      const { error } = await supabaseClient.from("pa_settings").upsert({ id: "portfolio", data: state, updated_at: new Date().toISOString() });
      if (error) {
        console.error(error);
        status.lastChild.textContent = "บันทึกออนไลน์ไม่สำเร็จ";
        return;
      }
    }
    status.classList.remove("saving");
    status.lastChild.textContent = "บันทึกแล้ว";
  }, 280);
}

async function loadRemoteState() {
  if (!supabaseClient) return;
  const { data, error } = await supabaseClient.from("pa_settings").select("data").eq("id", "portfolio").maybeSingle();
  if (error) return;
  if (!data?.data) {
    if (MANAGE_MODE) await supabaseClient.from("pa_settings").upsert({ id: "portfolio", data: state, updated_at: new Date().toISOString() });
    return;
  }
  localStorage.setItem(APP_KEY, JSON.stringify(data.data));
  state = loadState();
  if (MANAGE_MODE) await supabaseClient.from("pa_settings").upsert({ id: "portfolio", data: state, updated_at: new Date().toISOString() });
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(DB_STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getUploadedEvidence() {
  if (!supabaseClient) return [];
  const files = [];
  async function walk(prefix = "") {
    const { data, error } = await supabaseClient.storage.from(STORAGE_BUCKET).list(prefix, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" }
    });
    if (error) throw error;
    for (const entry of data || []) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id) files.push({ ...entry, path });
      else await walk(path);
    }
  }
  await walk();
  return files.filter(file => !file.path.startsWith("profile/")).map(file => {
    const parts = file.path.split("/");
    const round = Number(parts[0]) || 1;
    const group = decodeURIComponent(parts[1] || "teaching");
    const filename = parts.at(-1);
    const divider = filename.indexOf("--");
    const id = divider > 0 ? filename.slice(0, divider) : file.id;
    const encodedTitle = divider > 0 ? filename.slice(divider + 2).replace(/\.[^.]+$/, "") : filename.replace(/\.[^.]+$/, "");
    const { data: publicData } = supabaseClient.storage.from(STORAGE_BUCKET).getPublicUrl(file.path);
    return {
      id,
      title: decodeURIComponent(encodedTitle),
      category: /^\d+\./.test(group) ? (group.startsWith("1.") ? "teaching" : group.startsWith("2.") ? "support" : "development") : group,
      criterion: /^\d+\./.test(group) ? group : undefined,
      round,
      src: publicData.publicUrl,
      storagePath: file.path,
      createdAt: new Date(file.created_at || 0).getTime()
    };
  });
}

async function putEvidence(item) {
  if (!supabaseClient || !MANAGE_MODE) throw new Error("กรุณาเข้าสู่ระบบก่อนอัปโหลด");
  const group = encodeURIComponent(item.criterion || item.category || "teaching");
  const extension = item._file?.name.split(".").pop()?.toLowerCase() || item.storagePath?.split(".").pop() || "jpg";
  const safeTitle = encodeURIComponent(item.title.trim() || "หลักฐาน");
  const nextPath = `${item.round}/${group}/${item.id}--${safeTitle}.${extension}`;

  if (item._file) {
    const { error } = await supabaseClient.storage.from(STORAGE_BUCKET).upload(nextPath, item._file, {
      cacheControl: "3600",
      contentType: item._file.type,
      upsert: false
    });
    if (error) throw error;
  } else if (item.storagePath && item.storagePath !== nextPath) {
    const { error } = await supabaseClient.storage.from(STORAGE_BUCKET).move(item.storagePath, nextPath);
    if (error) throw error;
  }

  const { data } = supabaseClient.storage.from(STORAGE_BUCKET).getPublicUrl(nextPath);
  item.storagePath = nextPath;
  item.src = data.publicUrl;
  delete item._file;
}

async function deleteEvidence(id) {
  const item = evidence.find(entry => entry.id === id);
  if (!item?.storagePath) return;
  const { error } = await supabaseClient.storage.from(STORAGE_BUCKET).remove([item.storagePath]);
  if (error) throw error;
}

async function getPublicProfile() {
  if (!supabaseClient) return null;
  const { data, error } = await supabaseClient.storage.from(STORAGE_BUCKET).list("profile", {
    limit: 1,
    sortBy: { column: "created_at", order: "desc" }
  });
  if (error || !data?.[0]) return null;
  return supabaseClient.storage.from(STORAGE_BUCKET).getPublicUrl(`profile/${data[0].name}`).data.publicUrl;
}

function formatThaiDate(isoDate) {
  if (!isoDate) return "ยังไม่กำหนดวันที่";
  return new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", year: "numeric" })
    .format(new Date(`${isoDate}T00:00:00`));
}

function formatPeriod(round) {
  const period = state.roundPeriods?.[round];
  if (!period?.start || !period?.end) return "ยังไม่กำหนดช่วงเวลา";
  return `${formatThaiDate(period.start)} – ${formatThaiDate(period.end)}`;
}

function applyState() {
  document.querySelector("#yearInput").value = state.year;
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = state.year);
  const publishedRounds = [1, 2].filter(round => state.roundVisibility[round]);
  document.body.classList.toggle("single-published-round", publishedRounds.length === 1);
  document.querySelectorAll(".round-btn").forEach(btn => {
    const round = Number(btn.dataset.round);
    btn.hidden = !MANAGE_MODE && !state.roundVisibility[round];
    btn.classList.toggle("active", round === state.round);
    btn.setAttribute("aria-pressed", String(round === state.round));
  });
  document.querySelector("#roundPublishedInput").checked = Boolean(state.roundVisibility[state.round]);
  document.querySelectorAll("[data-round-label]").forEach(el => el.textContent = `รอบที่ ${state.round}`);
  document.querySelectorAll("[data-period-label]").forEach(el => el.textContent = formatPeriod(state.round));
  document.querySelectorAll("[data-period-round]").forEach(el => el.textContent = formatPeriod(Number(el.dataset.periodRound)));
  document.querySelector("#roundStartInput").value = state.roundPeriods[state.round].start;
  document.querySelector("#roundEndInput").value = state.roundPeriods[state.round].end;
  document.querySelectorAll(".timeline-item").forEach((el, i) => el.classList.toggle("active", i + 1 === state.round));
  const track = document.querySelector(".timeline-track i");
  if (track) track.style.transform = state.round === 2 ? "translateX(100%) translateY(-1px)" : "translateY(-1px)";

  document.querySelectorAll(".editable[data-field]").forEach(el => {
    const field = el.dataset.field;
    const value = el.classList.contains("round-editable") ? state.rounds[state.round][field] : state.fields[field];
    if (document.activeElement !== el && (value !== undefined || el.hasAttribute("data-empty-text"))) el.textContent = value ?? "";
  });
  renderSchedule();
  renderCriteria();
  renderGallery();
}

function renderSchedule() {
  document.querySelector("#scheduleBody").innerHTML = state.schedule.map((row, rowIndex) =>
    `<tr>${row.map((cell, colIndex) => `<td class="subject-cell${cell === "พักกลางวัน" ? " is-break" : cell === "—" ? " is-empty" : ""}" data-row="${rowIndex}" data-col="${colIndex}" ${editMode ? 'contenteditable="true"' : ""}>${escapeHTML(cell)}</td>`).join("")}</tr>`
  ).join("");
}

function renderCriteria() {
  document.querySelector("#criteriaList").innerHTML = criteria.map(([number, title, copy, defaultImgs], criterionIndex) => {
    const groupNumber = Number(number.split(".")[0]);
    const previousGroup = criterionIndex > 0 ? Number(criteria[criterionIndex - 1][0].split(".")[0]) : null;
    const group = criteriaGroups[groupNumber];
    const groupHeader = groupNumber !== previousGroup ? `
      <header class="criteria-group" data-criteria-group="${groupNumber}">
        <div><span>ด้านที่ ${groupNumber}</span><h3>${group.title}</h3></div>
        <p>${group.description}</p>
        <strong>${group.count}</strong>
      </header>` : "";
    const hidden = state.hiddenCriterionSeeds?.[state.round]?.[number] || [];
    const seedItems = state.round === 1
      ? defaultImgs.map((src, index) => ({ id: `criterion-seed-${number}-${index}`, src, title: `${title} ภาพที่ ${index + 1}`, seed: true, seedIndex: index }))
        .filter(item => !hidden.includes(item.seedIndex))
      : [];
    const uploaded = evidence
      .filter(item => item.round === state.round && item.criterion === number)
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    const imgs = [...seedItems, ...uploaded];
    const main = imgs[0];
    const evidenceStatus = imgs.length ? `มีหลักฐาน ${imgs.length} รายการ` : "รอเพิ่มหลักฐาน";
    const expanded = number.endsWith(".1") ? "expanded" : "";
    return `${groupHeader}
    <article class="criterion ${expanded}" data-criteria-group="${groupNumber}" data-criterion-number="${number}">
      <span class="criterion-number">${number}</span>
      <button class="criterion-toggle" type="button" aria-expanded="${expanded ? "true" : "false"}" aria-controls="criterion-body-${number.replace(".", "-")}">
        <span>${number}</span>
        <div><strong>${title}</strong><small class="${imgs.length ? "has-evidence" : ""}">${evidenceStatus}</small></div>
        <i aria-hidden="true">⌄</i>
      </button>
      <div class="criterion-body" id="criterion-body-${number.replace(".", "-")}">
        <div class="criterion-head">
          <h3>${title}</h3>
          <div class="criterion-copy">
            <p>${copy}</p>
            <small>หลักฐานรอบที่ ${state.round} · ${imgs.length} รายการ</small>
            <div class="criterion-tools edit-only">
              <label class="btn primary criterion-upload" for="upload-${number.replace(".", "-")}">＋ เพิ่มภาพในหัวข้อ ${number}</label>
              <input id="upload-${number.replace(".", "-")}" type="file" accept="image/*" multiple hidden data-criterion-upload="${number}">
              <span>เลือกได้หลายภาพ</span>
            </div>
          </div>
        </div>
        <div class="criterion-visuals" data-criterion-gallery>
          ${main ? `
            <button class="zoom-frame" type="button" data-zoom-frame aria-label="เปิดหลักฐานหัวข้อ ${number} แบบเต็มจอ"><img src="${main.src}" alt="${escapeHTML(main.title)}" loading="lazy" decoding="async" data-criterion-main><span class="zoom-hint">เปิดเต็มจอ ↗</span></button>
            <div class="evidence-caption"><strong data-evidence-caption>${escapeHTML(main.title)}</strong><span data-evidence-counter aria-live="polite">1 / ${imgs.length}</span></div>
            <div class="criterion-thumbs">${imgs.map((item, i) => `
              <div class="criterion-thumb-wrap">
                <button class="criterion-thumb ${i === 0 ? "active" : ""}" type="button" data-thumb-src="${item.src}" data-thumb-title="${escapeHTML(item.title)}" data-thumb-index="${i}" aria-label="ดู${title} ภาพที่ ${i + 1}" aria-pressed="${i === 0 ? "true" : "false"}"><img src="${item.src}" alt="" loading="lazy" decoding="async"></button>
                <div class="criterion-image-tools">
                  ${item.seed ? "" : `<button type="button" data-criterion-rename="${item.id}" aria-label="เปลี่ยนชื่อภาพ">✎</button>`}
                  <button type="button" data-criterion-remove="${item.id}" data-criterion-number="${number}" data-seed-index="${item.seed ? item.seedIndex : ""}" aria-label="ลบภาพ">×</button>
                </div>
              </div>`).join("")}
            </div>` : `
            <div class="criterion-empty"><div><span>{ }</span><strong>ยังไม่มีภาพในหัวข้อ ${number}</strong><small>กด “แก้ไขแฟ้ม” แล้วเพิ่มภาพหลักฐานของรอบนี้</small></div></div>`}
        </div>
      </div>
    </article>`;
  }).join("");
  applyCriteriaFilter();
}

function applyCriteriaFilter(moveToResults = false) {
  document.querySelectorAll("#criteriaList [data-criteria-group]").forEach(element => {
    element.hidden = activeCriteriaGroup !== "all" && element.dataset.criteriaGroup !== activeCriteriaGroup;
  });
  document.querySelectorAll("[data-criteria-filter]").forEach(button => {
    const active = button.dataset.criteriaFilter === activeCriteriaGroup;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const visibleCount = activeCriteriaGroup === "all" ? 15 : criteria.filter(item => item[0].startsWith(`${activeCriteriaGroup}.`)).length;
  const status = document.querySelector("#criteriaMobileStatus");
  if (status) status.textContent = `${activeCriteriaGroup === "all" ? "ครบทั้ง 3 ด้าน" : `ด้านที่ ${activeCriteriaGroup}`} · ${visibleCount} หัวข้อ · เปลี่ยนด้านได้จากเมนูด้านซ้าย`;
  if (moveToResults) {
    requestAnimationFrame(() => {
      const firstGroup = document.querySelector("#criteriaList .criteria-group:not([hidden])");
      if (!firstGroup) return;
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      firstGroup.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      const heading = firstGroup.querySelector("h3");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    });
  }
}

function categoryLabel(category) {
  return ({ teaching: "การจัดการเรียนรู้", support: "ส่งเสริมและสนับสนุน", development: "พัฒนาตนเอง", challenge: "ประเด็นท้าทาย", participation: "องค์ประกอบที่ 2", ethics: "องค์ประกอบที่ 3" })[category] || "หลักฐาน";
}

function renderGallery() {
  const current = evidence.filter(item => item.round === state.round && (activeFilter === "all" || item.category === activeFilter));
  const gallery = document.querySelector("#gallery");
  gallery.innerHTML = current.map(item => `
    <article class="gallery-item" data-id="${item.id}">
      <img src="${item.src}" alt="${escapeHTML(item.title)}" loading="lazy" decoding="async" data-gallery-image>
      <div class="gallery-controls">
        <button type="button" data-rename="${item.id}" aria-label="เปลี่ยนชื่อ">✎</button>
        ${item.seed ? "" : `<button type="button" data-delete="${item.id}" aria-label="ลบภาพ">×</button>`}
      </div>
      <div class="gallery-caption"><strong>${escapeHTML(item.title)}</strong><span>${categoryLabel(item.category)} · รอบ ${item.round}</span></div>
    </article>`).join("");
  document.querySelector("#galleryCount").textContent = `${current.length} รายการ`;
  document.querySelector("#emptyState").hidden = current.length > 0;
  const roundTotal = evidence.filter(item => item.round === state.round).length;
  document.querySelector("#evidenceCount").textContent = `${roundTotal} รายการ`;
  renderCarousel();
  renderChallengePreview();
  renderComponentEvidence();
}

function renderComponentEvidence() {
  for (const category of ["participation", "ethics"]) {
    const items = evidence.filter(item => item.round === state.round && item.category === category);
    document.querySelector(`[data-component-count="${category}"]`).textContent = `${items.length} ภาพ · รอบที่ ${state.round}`;
    document.querySelector(`[data-component-gallery="${category}"]`).innerHTML = items.length
      ? items.map((item, index) => `<figure class="component-photo"><button type="button" data-component-image="${escapeHTML(item.id)}" aria-label="เปิดหลักฐาน${categoryLabel(category)} ภาพที่ ${index + 1} แบบเต็มจอ"><img src="${escapeHTML(item.src)}" alt="หลักฐาน${categoryLabel(category)} ภาพที่ ${index + 1}" loading="lazy" decoding="async"></button><button class="manager-only text-btn" type="button" data-delete="${escapeHTML(item.id)}" aria-label="ลบหลักฐานภาพที่ ${index + 1}">ลบภาพ</button></figure>`).join("")
      : `<p class="component-empty">ยังไม่มีหลักฐานประกอบในรอบที่ ${state.round}</p>`;
  }
}

document.addEventListener("change", async event => {
  const input = event.target.closest("[data-component-upload]");
  if (!MANAGE_MODE || !input) return;
  const category = input.dataset.componentUpload;
  if (!["participation", "ethics"].includes(category)) return;
  const round = state.round;
  const files = [...input.files].filter(file => file.type.startsWith("image/"));
  if (!files.length) { input.value = ""; return toast("กรุณาเลือกไฟล์ภาพ"); }
  input.disabled = true;
  let added = 0;
  toast(`กำลังเพิ่มหลักฐาน${categoryLabel(category)}...`);
  try {
    for (const file of files) {
      const item = { id: crypto.randomUUID(), title: file.name.replace(/\.[^.]+$/, ""), category, round, _file: file, createdAt: Date.now() };
      try { await putEvidence(item); evidence.push(item); added++; }
      catch (error) { console.error(error); }
    }
    renderGallery();
    toast(`เพิ่มหลักฐานรอบที่ ${round} สำเร็จ ${added}/${files.length} ภาพ${added < files.length ? " · กรุณาลองอัปโหลดภาพที่ไม่สำเร็จอีกครั้ง" : ""}`);
  } finally { input.disabled = false; input.value = ""; }
});

document.addEventListener("click", event => {
  const button = event.target.closest("[data-component-image]");
  if (!button) return;
  const item = evidence.find(entry => entry.id === button.dataset.componentImage);
  if (!item) return;
  const items = evidence.filter(entry => entry.round === state.round && entry.category === item.category);
  openLightbox(items, items.findIndex(entry => entry.id === item.id));
});

function renderCarousel() {
  const items = evidence.filter(item => item.round === state.round).slice(0, 6);
  carouselIndex = Math.min(carouselIndex, Math.max(0, items.length - 1));
  document.querySelector("#carouselTrack").innerHTML = items.map((item, index) => `
    <figure class="carousel-slide ${index === carouselIndex ? "active" : ""}" data-carousel-index="${index}">
      <img src="${item.src}" alt="${escapeHTML(item.title)}" loading="lazy" decoding="async" ${index > 0 ? 'fetchpriority="low"' : ""}>
      <figcaption><strong>${escapeHTML(item.title)}</strong><span>${categoryLabel(item.category)} · รอบ ${item.round}</span></figcaption>
    </figure>`).join("");
  document.querySelector("#carouselDots").innerHTML = items.map((_, index) => `<button class="${index === carouselIndex ? "active" : ""}" type="button" data-carousel-dot="${index}" aria-label="ไปภาพที่ ${index + 1}" ${index === carouselIndex ? 'aria-current="true"' : ""}></button>`).join("");
  positionCarousel();
}

function positionCarousel() {
  const track = document.querySelector("#carouselTrack");
  const slides = [...track.children];
  const active = slides[carouselIndex];
  if (!active) return;
  const viewport = document.querySelector("#carouselViewport");
  const offset = active.offsetLeft - Math.max(0, (viewport.clientWidth - active.clientWidth) / 2);
  track.style.transform = `translateX(${-offset}px)`;
  slides.forEach((slide, index) => slide.classList.toggle("active", index === carouselIndex));
  document.querySelectorAll("[data-carousel-dot]").forEach((dot, index) => {
    const active = index === carouselIndex;
    dot.classList.toggle("active", active);
    if (active) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function moveCarousel(direction) {
  const count = document.querySelector("#carouselTrack").children.length;
  if (!count) return;
  carouselIndex = (carouselIndex + direction + count) % count;
  positionCarousel();
}

function renderChallengePreview() {
  const items = evidence
    .filter(item => item.round === state.round && item.category === "challenge")
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  document.querySelector("#challengePreview").innerHTML = items.length
    ? items.map((item, index) => `<button class="story-photo story-photo-${(index % 6) + 1}" type="button" data-preview-id="${item.id}" aria-label="เปิดภาพประกอบลำดับที่ ${index + 1} แบบเต็มจอ"><img src="${item.src}" alt="ภาพประกอบประเด็นท้าทายลำดับที่ ${index + 1}" loading="lazy" decoding="async"><span>${String(index + 1).padStart(2, "0")}</span></button>`).join("")
    : `<div class="challenge-preview-empty">ยังไม่มีภาพประกอบในรอบที่ ${state.round}</div>`;
}

function escapeHTML(text = "") {
  return String(text).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function setEditMode(value) {
  if (!MANAGE_MODE) return;
  editMode = value;
  document.body.classList.toggle("edit-mode", editMode);
  document.querySelector("#editLabel").textContent = editMode ? "เสร็จสิ้น" : "แก้ไขแฟ้ม";
  document.querySelectorAll(".editable").forEach(el => el.contentEditable = editMode ? "true" : "false");
  renderSchedule();
  toast(editMode ? "เปิดโหมดแก้ไขแล้ว — คลิกข้อความที่ต้องการเปลี่ยน" : "บันทึกการแก้ไขเรียบร้อย");
}

function navigate(sectionId, moveFocus = true) {
  document.querySelectorAll(".page-section").forEach(section => section.classList.toggle("active", section.id === sectionId));
  document.querySelectorAll(".nav-link").forEach(link => {
    const active = link.dataset.section === sectionId;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const section = document.querySelector(`#${sectionId}`);
  document.querySelector("#crumb").textContent = section?.dataset.title || "ภาพรวม";
  document.title = `${section?.dataset.title || "ภาพรวม"} | PA.DEV`;
  history.replaceState(null, "", `#${sectionId}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.classList.remove("menu-open");
  document.querySelector("#menuBtn").setAttribute("aria-expanded", "false");
  if (moveFocus) {
    const heading = section?.querySelector("h1, h2");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }
}

function toast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove("show"), 2600);
}

function applyAccessMode() {
  document.body.classList.toggle("viewer-mode", !MANAGE_MODE);
  document.body.classList.toggle("manager-mode", MANAGE_MODE);
  document.querySelector("#yearInput").readOnly = !MANAGE_MODE;
  document.querySelector("#modeNote").textContent = MANAGE_MODE
    ? "โหมดจัดการออนไลน์ · ภาพหลักฐานบันทึกบน Supabase"
    : "สำหรับคณะกรรมการ · อ่านอย่างเดียว";
}

async function openManagerLogin() {
  if (!supabaseClient) return toast("ไม่สามารถเชื่อมต่อระบบเข้าสู่ระบบได้");
  const { data } = await supabaseClient.auth.getSession();
  const user = data.session?.user;
  if (user?.id === OWNER_UID) {
    MANAGE_MODE = true;
    applyAccessMode();
    return;
  }
  document.querySelector("#loginDialog").showModal();
}

async function handleFiles(files) {
  const valid = [...files].filter(file => file.type.startsWith("image/"));
  if (!valid.length) return toast("กรุณาเลือกไฟล์ภาพ");
  toast(`กำลังเพิ่ม ${valid.length} ภาพ...`);
  for (const file of valid) {
    const item = {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.[^.]+$/, ""),
      category: "teaching",
      round: state.round,
      _file: file,
      createdAt: Date.now()
    };
    try {
      await putEvidence(item);
      evidence.unshift(item);
    } catch (error) {
      console.error(error);
      toast(`อัปโหลด ${file.name} ไม่สำเร็จ: ${error.message}`);
    }
  }
  renderGallery();
  toast(`เพิ่มภาพหลักฐานแล้ว ${valid.length} ภาพ`);
}

async function handleCriterionFiles(files, criterion) {
  const valid = [...files].filter(file => file.type.startsWith("image/"));
  if (!valid.length) return toast("กรุณาเลือกไฟล์ภาพ");
  toast(`กำลังเพิ่มภาพในหัวข้อ ${criterion}...`);
  const category = criterion.startsWith("1.") ? "teaching" : criterion.startsWith("2.") ? "support" : "development";
  for (const file of valid) {
    const item = {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.[^.]+$/, ""),
      category,
      criterion,
      round: state.round,
      _file: file,
      createdAt: Date.now() + Math.random()
    };
    try {
      await putEvidence(item);
      evidence.push(item);
    } catch (error) {
      console.error(error);
      toast(`อัปโหลด ${file.name} ไม่สำเร็จ: ${error.message}`);
    }
  }
  renderCriteria();
  renderGallery();
  toast(`เพิ่ม ${valid.length} ภาพในหัวข้อ ${criterion} แล้ว`);
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function openLightbox(items, index) {
  lightboxItems = items;
  lightboxIndex = index;
  updateLightbox();
  document.querySelector("#lightbox").showModal();
}

function updateLightbox() {
  const item = lightboxItems[lightboxIndex];
  if (!item) return;
  document.querySelector("#lightboxImg").src = item.src;
  document.querySelector("#lightboxImg").alt = item.category === "challenge" ? "ภาพประกอบประเด็นท้าทายแบบเต็มจอ" : item.title;
  document.querySelector("#lightboxTitle").textContent = item.category === "challenge" ? "" : item.title;
  document.querySelector("#lightboxMeta").textContent = `${lightboxIndex + 1} / ${lightboxItems.length} · ${item.category ? `${categoryLabel(item.category)} · รอบ ${item.round}` : "หลักฐานประกอบ"}`;
}

function moveLightbox(direction) {
  lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
  updateLightbox();
}

document.addEventListener("click", async event => {
  const nav = event.target.closest(".nav-link");
  if (nav) { event.preventDefault(); navigate(nav.dataset.section); }
  const jump = event.target.closest(".jump-btn");
  if (jump) navigate(jump.dataset.target);
  const round = event.target.closest(".round-btn");
  if (round) { state.round = Number(round.dataset.round); saveState(); applyState(); }
  if (event.target.closest("#editBtn") && MANAGE_MODE) setEditMode(!editMode);
  if (event.target.closest("#menuBtn")) {
    const opened = document.body.classList.toggle("menu-open");
    document.querySelector("#menuBtn").setAttribute("aria-expanded", String(opened));
  }
  if (event.target.closest("#exportBtn") && MANAGE_MODE) document.querySelector("#backupDialog").showModal();
  const criterionToggle = event.target.closest(".criterion-toggle");
  if (criterionToggle) {
    const criterion = criterionToggle.closest(".criterion");
    const expanded = criterion.classList.toggle("expanded");
    criterionToggle.setAttribute("aria-expanded", String(expanded));
  }
  const criteriaFilter = event.target.closest("[data-criteria-filter]");
  if (criteriaFilter) {
    activeCriteriaGroup = criteriaFilter.dataset.criteriaFilter;
    document.body.classList.remove("menu-open");
    document.querySelector("#menuBtn").setAttribute("aria-expanded", "false");
    applyCriteriaFilter(true);
    if (matchMedia("(max-width: 820px)").matches) {
      const heading = document.querySelector("#criteriaList .criteria-group:not([hidden]) h3");
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    }
  }

  const galleryImage = event.target.closest("[data-gallery-image]");
  if (galleryImage) {
    const current = evidence.filter(item => item.round === state.round && (activeFilter === "all" || item.category === activeFilter));
    const id = galleryImage.closest(".gallery-item").dataset.id;
    openLightbox(current, current.findIndex(item => item.id === id));
  }
  const preview = event.target.closest("[data-preview-id]");
  if (preview) {
    const items = evidence.filter(item => item.round === state.round && item.category === "challenge");
    openLightbox(items, Math.max(0, items.findIndex(item => item.id === preview.dataset.previewId)));
  }
  const staticImage = event.target.closest("[data-static-lightbox]");
  if (staticImage) openLightbox([{ src: staticImage.src, title: staticImage.alt }], 0);
  const thumb = event.target.closest("[data-thumb-src]");
  if (thumb) {
    const gallery = thumb.closest("[data-criterion-gallery]");
    const main = gallery.querySelector("[data-criterion-main]");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) main.animate([{ opacity: .45 }, { opacity: 1 }], { duration: 200, easing: "ease-out" });
    main.src = thumb.dataset.thumbSrc;
    main.alt = thumb.dataset.thumbTitle;
    main.dataset.activeIndex = thumb.dataset.thumbIndex;
    gallery.querySelector("[data-evidence-caption]").textContent = thumb.dataset.thumbTitle;
    gallery.querySelector("[data-evidence-counter]").textContent = `${Number(thumb.dataset.thumbIndex) + 1} / ${gallery.querySelectorAll('[data-thumb-src]').length}`;
    gallery.querySelectorAll(".criterion-thumb").forEach(button => {
      const active = button === thumb;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }
  const criterionMain = event.target.closest("[data-zoom-frame]")?.querySelector("[data-criterion-main]");
  if (criterionMain) {
    const gallery = criterionMain.closest("[data-criterion-gallery]");
    const items = [...gallery.querySelectorAll("[data-thumb-src]")].map((button, index) => ({ src: button.dataset.thumbSrc, title: button.dataset.thumbTitle || `${criterionMain.alt.replace(" ภาพหลัก", "")} · ภาพที่ ${index + 1}` }));
    openLightbox(items, Number(criterionMain.dataset.activeIndex || 0));
  }
  const criterionRemove = event.target.closest("[data-criterion-remove]");
  if (MANAGE_MODE && criterionRemove && confirm("นำภาพนี้ออกจากหัวข้อนี้หรือไม่?")) {
    const id = criterionRemove.dataset.criterionRemove;
    const seedIndex = criterionRemove.dataset.seedIndex;
    const number = criterionRemove.dataset.criterionNumber;
    if (seedIndex !== "") {
      state.hiddenCriterionSeeds ||= { 1: {}, 2: {} };
      state.hiddenCriterionSeeds[state.round] ||= {};
      state.hiddenCriterionSeeds[state.round][number] ||= [];
      state.hiddenCriterionSeeds[state.round][number].push(Number(seedIndex));
      saveState();
    } else {
      await deleteEvidence(id);
      evidence = evidence.filter(item => item.id !== id);
    }
    renderCriteria();
    renderGallery();
    toast(`นำภาพออกจากหัวข้อ ${number} แล้ว`);
  }
  const criterionRename = event.target.closest("[data-criterion-rename]");
  if (MANAGE_MODE && criterionRename) {
    const item = evidence.find(entry => entry.id === criterionRename.dataset.criterionRename);
    const next = prompt("ชื่อหรือคำอธิบายภาพ", item?.title || "");
    if (item && next?.trim()) {
      item.title = next.trim();
      await putEvidence(item);
      renderCriteria();
      renderGallery();
      toast("บันทึกชื่อภาพแล้ว");
    }
  }
  const carouselSlide = event.target.closest("[data-carousel-index]");
  if (carouselSlide) {
    carouselIndex = Number(carouselSlide.dataset.carouselIndex);
    positionCarousel();
    const items = evidence.filter(item => item.round === state.round).slice(0, 6);
    openLightbox(items, carouselIndex);
  }
  const carouselDot = event.target.closest("[data-carousel-dot]");
  if (carouselDot) { carouselIndex = Number(carouselDot.dataset.carouselDot); positionCarousel(); }

  const deleteBtn = event.target.closest("[data-delete]");
  if (MANAGE_MODE && deleteBtn && confirm("ลบภาพหลักฐานนี้หรือไม่?")) {
    await deleteEvidence(deleteBtn.dataset.delete);
    evidence = evidence.filter(item => item.id !== deleteBtn.dataset.delete);
    renderGallery();
    toast("ลบภาพแล้ว");
  }
  const renameBtn = event.target.closest("[data-rename]");
  if (MANAGE_MODE && renameBtn) {
    const item = evidence.find(entry => entry.id === renameBtn.dataset.rename);
    const next = prompt("ชื่อภาพหลักฐาน", item.title);
    if (next?.trim()) {
      item.title = next.trim();
      if (!item.seed) await putEvidence(item);
      renderGallery();
    }
  }
  const filter = event.target.closest(".filter-btn");
  if (filter) {
    activeFilter = filter.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      const active = btn === filter;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    renderGallery();
  }
});

document.addEventListener("input", event => {
  const editable = event.target.closest(".editable[data-field]");
  if (editable && editMode) {
    const field = editable.dataset.field;
    if (editable.classList.contains("round-editable")) state.rounds[state.round][field] = editable.textContent.trim();
    else state.fields[field] = editable.textContent.trim();
    document.querySelectorAll(`.editable[data-field="${field}"]`).forEach(el => { if (el !== editable && !el.classList.contains("round-editable")) el.textContent = state.fields[field]; });
    saveState();
  }
  const cell = event.target.closest(".subject-cell");
  if (cell && editMode) {
    state.schedule[Number(cell.dataset.row)][Number(cell.dataset.col)] = cell.textContent.trim();
    saveState();
  }
});

document.querySelector("#yearInput").addEventListener("input", event => {
  if (!MANAGE_MODE) return;
  state.year = event.target.value.replace(/\D/g, "").slice(0, 4);
  event.target.value = state.year;
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = state.year);
  saveState();
});

document.querySelector("#roundStartInput").addEventListener("change", event => {
  if (!MANAGE_MODE) return;
  state.roundPeriods[state.round].start = event.target.value;
  saveState();
  applyState();
  toast(`บันทึกวันเริ่มต้นรอบที่ ${state.round} แล้ว`);
});

document.querySelector("#roundEndInput").addEventListener("change", event => {
  if (!MANAGE_MODE) return;
  const period = state.roundPeriods[state.round];
  if (event.target.value && period.start && event.target.value < period.start) {
    event.target.value = period.end;
    return toast("วันสิ้นสุดต้องอยู่หลังวันเริ่มต้น");
  }
  period.end = event.target.value;
  saveState();
  applyState();
  toast(`บันทึกวันสิ้นสุดรอบที่ ${state.round} แล้ว`);
});

document.querySelector("#roundPublishedInput").addEventListener("change", event => {
  if (!MANAGE_MODE) return;
  const otherRound = state.round === 1 ? 2 : 1;
  if (!event.target.checked && !state.roundVisibility[otherRound]) {
    event.target.checked = true;
    return toast("ต้องเปิดเผยแพร่อย่างน้อย 1 รอบ");
  }
  state.roundVisibility[state.round] = event.target.checked;
  saveState();
  applyState();
  toast(event.target.checked ? `เปิดเผยแพร่รอบที่ ${state.round} แล้ว` : `ซ่อนรอบที่ ${state.round} จากกรรมการแล้ว`);
});

document.querySelector("#evidenceUpload").addEventListener("change", event => {
  if (MANAGE_MODE) handleFiles(event.target.files);
  event.target.value = "";
});
document.querySelector("#challengeEvidenceFile").addEventListener("change", async event => {
  if (!MANAGE_MODE) return;
  const files = [...event.target.files].filter(file => file.type.startsWith("image/"));
  if (!files.length) return toast("กรุณาเลือกไฟล์ภาพ");
  toast(`กำลังเพิ่มภาพประกอบ ${files.length} ภาพ...`);
  for (const file of files) {
    const item = { id: crypto.randomUUID(), title: file.name.replace(/\.[^.]+$/, ""), category: "challenge", round: state.round, _file: file, createdAt: Date.now() };
    try {
      await putEvidence(item);
      evidence.push(item);
    } catch (error) {
      console.error(error);
      toast(`อัปโหลด ${file.name} ไม่สำเร็จ: ${error.message}`);
    }
  }
  event.target.value = "";
  renderGallery();
  toast(`เพิ่มภาพประกอบในรอบที่ ${state.round} แล้ว`);
});
document.querySelector("#criteriaList").addEventListener("change", event => {
  if (!MANAGE_MODE) return;
  const input = event.target.closest("[data-criterion-upload]");
  if (!input) return;
  handleCriterionFiles(input.files, input.dataset.criterionUpload);
  input.value = "";
});
document.querySelector("#profileUpload").addEventListener("change", async event => {
  if (!MANAGE_MODE) return;
  const file = event.target.files[0];
  if (!file) return;
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `profile/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabaseClient.storage.from(STORAGE_BUCKET).upload(path, file, { contentType: file.type });
  if (error) return toast(`เปลี่ยนภาพไม่สำเร็จ: ${error.message}`);
  const src = supabaseClient.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
  document.querySelector("#profilePhoto").src = src;
  toast("เปลี่ยนภาพประจำตัวบนระบบออนไลน์แล้ว");
});

const dropZone = document.querySelector("#dropZone");
["dragenter", "dragover"].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.add("dragover"); }));
["dragleave", "drop"].forEach(type => dropZone.addEventListener(type, event => { event.preventDefault(); dropZone.classList.remove("dragover"); }));
dropZone.addEventListener("drop", event => { if (MANAGE_MODE) handleFiles(event.dataTransfer.files); });
dropZone.addEventListener("click", () => { if (MANAGE_MODE) document.querySelector("#evidenceUpload").click(); });

document.querySelector("#lightboxClose").addEventListener("click", () => document.querySelector("#lightbox").close());
document.querySelector("#lightboxPrev").addEventListener("click", () => moveLightbox(-1));
document.querySelector("#lightboxNext").addEventListener("click", () => moveLightbox(1));
document.querySelector("#carouselPrev").addEventListener("click", () => moveCarousel(-1));
document.querySelector("#carouselNext").addEventListener("click", () => moveCarousel(1));
document.querySelector("#carouselViewport").addEventListener("pointerdown", event => { carouselPointerStart = event.clientX; });
document.querySelector("#carouselViewport").addEventListener("pointerup", event => {
  if (carouselPointerStart === null) return;
  const distance = event.clientX - carouselPointerStart;
  carouselPointerStart = null;
  if (Math.abs(distance) > 45) moveCarousel(distance > 0 ? -1 : 1);
});
window.addEventListener("resize", positionCarousel);
document.addEventListener("pointermove", event => {
  const frame = event.target.closest("[data-zoom-frame]");
  if (!frame || matchMedia("(pointer: coarse)").matches) return;
  const rect = frame.getBoundingClientRect();
  frame.style.setProperty("--zoom-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
  frame.style.setProperty("--zoom-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
});
document.querySelector("#lightbox").addEventListener("click", event => { if (event.target === event.currentTarget) event.currentTarget.close(); });

document.querySelector("#loginForm").addEventListener("submit", async event => {
  event.preventDefault();
  const submit = document.querySelector("#loginSubmit");
  const errorBox = document.querySelector("#loginError");
  submit.disabled = true;
  submit.textContent = "กำลังตรวจสอบ...";
  errorBox.hidden = true;
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: document.querySelector("#loginEmail").value.trim(),
    password: document.querySelector("#loginPassword").value
  });
  if (error || data.user?.id !== OWNER_UID) {
    if (data.user && data.user.id !== OWNER_UID) await supabaseClient.auth.signOut();
    errorBox.textContent = error ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" : "บัญชีนี้ไม่มีสิทธิ์จัดการแฟ้ม";
    errorBox.hidden = false;
    submit.disabled = false;
    submit.textContent = "เข้าสู่ระบบ";
    return;
  }
  MANAGE_MODE = true;
  applyAccessMode();
  applyState();
  document.querySelector("#loginPassword").value = "";
  document.querySelector("#loginDialog").close();
  submit.disabled = false;
  submit.textContent = "เข้าสู่ระบบ";
  toast("เข้าสู่โหมดจัดการแล้ว");
});

document.querySelector("#loginClose").addEventListener("click", () => {
  document.querySelector("#loginDialog").close();
  history.replaceState(null, "", `${location.pathname}${location.hash}`);
});

document.querySelector("#resetPasswordForm").addEventListener("submit", async event => {
  event.preventDefault();
  const password = document.querySelector("#newPassword").value;
  const confirmation = document.querySelector("#confirmPassword").value;
  const errorBox = document.querySelector("#resetPasswordError");
  const submit = document.querySelector("#resetPasswordSubmit");
  errorBox.hidden = true;
  if (password !== confirmation) {
    errorBox.textContent = "รหัสผ่านทั้งสองช่องไม่ตรงกัน";
    errorBox.hidden = false;
    return;
  }
  submit.disabled = true;
  submit.textContent = "กำลังบันทึก...";
  const { error } = await supabaseClient.auth.updateUser({ password });
  if (error) {
    errorBox.textContent = `ตั้งรหัสผ่านไม่สำเร็จ: ${error.message}`;
    errorBox.hidden = false;
    submit.disabled = false;
    submit.textContent = "บันทึกรหัสผ่านใหม่";
    return;
  }
  document.querySelector("#resetPasswordDialog").close();
  MANAGE_MODE = true;
  applyAccessMode();
  history.replaceState(null, "", `${location.pathname}?manage=1`);
  toast("ตั้งรหัสผ่านใหม่สำเร็จและเข้าสู่ระบบแล้ว");
});

supabaseClient?.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") {
    document.querySelector("#loginDialog").close();
    document.querySelector("#resetPasswordDialog").showModal();
  }
});

document.querySelector("#logoutBtn").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  MANAGE_MODE = false;
  setEditMode(false);
  applyAccessMode();
  if (!state.roundVisibility[state.round]) state.round = state.roundVisibility[1] ? 1 : 2;
  applyState();
  history.replaceState(null, "", `${location.pathname}${location.hash}`);
  toast("ออกจากระบบแล้ว");
});

document.addEventListener("keydown", event => {
  if (MANAGE_MODE && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "e") { event.preventDefault(); setEditMode(!editMode); }
  if (document.querySelector("#lightbox").open && event.key === "ArrowLeft") moveLightbox(-1);
  if (document.querySelector("#lightbox").open && event.key === "ArrowRight") moveLightbox(1);
  if (event.key === "Escape") document.body.classList.remove("menu-open");
});

document.querySelector("#downloadData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `pa-${state.year}-backup.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  toast("ดาวน์โหลดข้อมูลสำรองแล้ว");
});

document.querySelector("#restoreData").addEventListener("change", async event => {
  try {
    const data = JSON.parse(await event.target.files[0].text());
    state = { ...structuredClone(defaults), ...data, fields: { ...defaults.fields, ...(data.fields || {}) }, rounds: { ...defaults.rounds, ...(data.rounds || {}) } };
    localStorage.setItem(APP_KEY, JSON.stringify(state));
    applyState();
    document.querySelector("#backupDialog").close();
    toast("เรียกคืนข้อมูลเรียบร้อย");
  } catch { toast("ไฟล์ข้อมูลไม่ถูกต้อง"); }
});

function updateClock() {
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat("th-TH", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}

async function init() {
  applyAccessMode();
  if (REQUESTED_PASSWORD_RESET) {
    const { data } = await supabaseClient.auth.getSession();
    if (data.session) document.querySelector("#resetPasswordDialog").showModal();
    else toast("ลิงก์ตั้งรหัสผ่านไม่ถูกต้องหรือหมดอายุ กรุณาขอลิงก์ใหม่");
  }
  if (REQUESTED_MANAGE_MODE) await openManagerLogin();
  await loadRemoteState();
  if (!MANAGE_MODE && !state.roundVisibility[state.round]) {
    state.round = state.roundVisibility[1] ? 1 : 2;
  }
  renderCriteria();
  try {
    evidence = [...(await getUploadedEvidence()), ...seedEvidence];
  } catch { toast("เบราว์เซอร์นี้ไม่รองรับการเก็บภาพถาวร"); }
  renderCriteria();
  const profile = await getPublicProfile();
  if (profile) document.querySelector("#profilePhoto").src = profile;
  applyState();
  updateClock();
  setInterval(updateClock, 30000);
  const initial = location.hash.slice(1);
  navigate(document.getElementById(initial)?.classList.contains("page-section") ? initial : "overview", false);
}

// Pointer-only tilt: no animation loop or motion on touch/reduced-motion devices.
const labCard = document.querySelector(".hero .terminal-card");
const labMotion = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
if (labCard) {
  const resetLabTilt = () => { labCard.style.removeProperty("--lab-rx"); labCard.style.removeProperty("--lab-ry"); };
  labCard.addEventListener("pointermove", event => {
    if (!labMotion.matches || editMode) { resetLabTilt(); return; }
    const rect = labCard.getBoundingClientRect();
    labCard.style.setProperty("--lab-rx", `${(0.5 - (event.clientY - rect.top) / rect.height) * 5}deg`);
    labCard.style.setProperty("--lab-ry", `${((event.clientX - rect.left) / rect.width - 0.5) * 6}deg`);
  });
  labCard.addEventListener("pointerleave", resetLabTilt);
  labMotion.addEventListener("change", resetLabTilt);
}

init();
