export type Agent = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  tone: string;
  goodFor: string[];
  does: string;
  used: string;
  gets: string;
  cta: string;
};

export const agents: Agent[] = [
  {
    id: "assistant",
    name: "Assistant",
    blurb: "Jamoaning savol, eslatma va hujjat yordamchisi",
    image: "/images/agent-assistant.png",
    tone: "#e8f1ff",
    goodFor: ["Savol-javob", "Eslatma", "Hujjat", "Xulosa"],
    does: "Hujjat, qaror va kim nima qilishini biladi. Savolga javob beradi, ishni to‘g‘ri agentga yo‘naltiradi.",
    used: "Har bir workspace Assistant bilan boshlanadi: umumiy kanal, chat va takroriy ishlar.",
    gets: "Jamoa savol-javobi, uchrashuv xulosasi, eslatma va hujjat yordami.",
    cta: "Assistant agentini ochish",
  },
  {
    id: "hr",
    name: "Rekruting",
    blurb: "Nomzod, suhbat va HR follow-upni tartibda ushlab turadi",
    image: "/images/agent-hr.png",
    tone: "#f3e8de",
    goodFor: ["Nomzod", "Suhbat", "Vakansiya", "HR"],
    does: "Rezyume, vakansiya va suhbatlarni yig‘ib, qisqa xulosa va keyingi qadamni yozadi.",
    used: "Vakansiya, nomzod qaydlari, kalendar va pochtani ulang.",
    gets: "Nomzod xulosasi, xat, suhbat tayyorgarligi va yollash eslatmalari.",
    cta: "Rekruting agentini ochish",
  },
  {
    id: "moliya",
    name: "Moliya",
    blurb: "Hisobot, byudjet va pul oqimini tiniq qiladi",
    image: "/images/agent-moliya.png",
    tone: "#d7e6ff",
    goodFor: ["Byudjet", "Hisobot", "Kassa", "Prognoz"],
    does: "Moliyaviy hujjatlar, to‘lovlar va hisobotlarni yig‘ib, rahbariyatga tushunarli xulosa beradi.",
    used: "Bank, Excel, 1C yoki buxgalteriya tizimini ulang. U kechasi ham raqamlarni tartibga soladi.",
    gets: "Kunlik kassa, oylik P&L, to‘lov eslatmalari va byudjet ogohlantirishlari.",
    cta: "Moliya agentini ochish",
  },
  {
    id: "marketing",
    name: "Marketing",
    blurb: "G‘oya va tadqiqotni nashrga tayyor kontentga aylantiradi",
    image: "/images/agent-marketing.png",
    tone: "#e4ddff",
    goodFor: ["Kampaniya", "Kontent", "SMM", "Brif"],
    does: "Brend ovozi, tadqiqot va kalendarni bir joyga yig‘ib, post, email va kampaniya chizmasini yozadi.",
    used: "Docs, kalendar, brend qaydlari va marketing kanallarini ulang.",
    gets: "Kontent-kalendar, post matnlari, kampaniya briefi va qayta ishlangan materiallar.",
    cta: "Marketing agentini ochish",
  },
  {
    id: "sotuv",
    name: "Sotuv",
    blurb: "Lidni tekshiradi va keyingi follow-upni yozadi",
    image: "/images/agent-sotuv.png",
    tone: "#d4f0ff",
    goodFor: ["Lidlar", "CRM", "Xat", "Kuzatuv"],
    does: "Mijozni o‘rganadi, hisobni qisqacha yozadi va keyingi xatni tayyorlab qo‘yadi.",
    used: "CRM, pochta, savdo hujjatlari va target-ro'yxatni ulang.",
    gets: "Lid tadqiqoti, account xulosasi, xat qoralamasi va eslatmalar.",
    cta: "Sotuv agentini ochish",
  },
  {
    id: "boshqaruv",
    name: "Boshqaruv",
    blurb: "Jamoa, reja va kun tartibini bir joyda ushlab turadi",
    image: "/images/agent-boshqaruv.png",
    tone: "#e8eef7",
    goodFor: ["Reja", "Uchrashuv", "Pochta", "Nazorat"],
    does: "Kalendar, vazifa va qarorlarni kuzatib, rahbarga ertalabki brifing beradi.",
    used: "Pochta, kalendar, hujjatlar va jamoa kanallarini ulang.",
    gets: "Kunlik brif, uchrashuv qaydlari, vazifa ro‘yxati va eslatmalar.",
    cta: "Boshqaruv agentini ochish",
  },
  {
    id: "yurist",
    name: "Yurist",
    blurb: "Shartnoma, risk va compliance ni tekshiradi",
    image: "/images/agent-yurist.png",
    tone: "#dde4f2",
    goodFor: ["Shartnoma", "Risk", "Muvofiqlik", "Qoida"],
    does: "Hujjatlarni o‘qiydi, xavfli bandlarni belgilaydi va yuristga qisqa xulosa beradi.",
    used: "Shartnoma papkasi, qoidalar va ichki siyosatni ulang.",
    gets: "Risk xulosasi, redline izohlar, checklist va eslatmalar.",
    cta: "Yurist agentini ochish",
  },
  {
    id: "analist",
    name: "Analist",
    blurb: "Qidiruv va raqamlarni aniq xulosaga aylantiradi",
    image: "/images/agent-analist.png",
    tone: "#d5f3ea",
    goodFor: ["Qidiruv", "Tahlil", "Brief", "Trend"],
    does: "Sayt, hujjat va ma’lumotlarni o‘qib, bozor yoki ichki savolga aniq javob yig‘adi.",
    used: "Manba, dashboard va tadqiqot maqsadini bering.",
    gets: "Tadqiqot briefi, raqobatchi xulosasi, trend va tavsiya.",
    cta: "Analist agentini ochish",
  },
];

export const faqs = [
  {
    q: "OmniCrew agentlari nima?",
    a: "Jamoangiz uchun haqiqiy ish qiladigan AI hamkasblar. Kun-tun o‘z kompyuterida ishlaydi, 3 000+ vositaga ulanadi.",
  },
  {
    q: "Qanday ishni qila oladi?",
    a: "Moliya hisoboti, marketing, sotuv, rekruting, assistant, shartnoma tekshiruvi, qidiruv va boshqaruv brifi. Bilmasa, birga skill yaratasiz.",
  },
  {
    q: "Qaysi vositalar ulanadi?",
    a: "Slack, Google Workspace, Calendar, pochta, CRM va boshqalar. Jamoangiz ishlatadigan vosita bo'lsa, odatda ulanishi bor.",
  },
  {
    q: "Nega OmniCrew?",
    a: "Ochiq agentlar kuchli, lekin jamoa uchun sozlash va xavfsizlik kerak. OmniCrew shu ishni bulutda, tayyor holda beradi.",
  },
  {
    q: "Jamoa bilan ulashish qanday?",
    a: "Har bir agent avval shaxsiy. Keyin odam, kanal yoki butun jamoa bilan ulashasiz. Skill va ulanishlarni ham ixtiyoriy ulashasiz.",
  },
  {
    q: "Agent uchun alohida kompyuter kerakmi?",
    a: "Yo'q. Har bir OmniCrew agenti butunlay bulutda ishlaydi. O'rnatish yo'q.",
  },
  {
    q: "Ma'lumot qanday himoyalanadi?",
    a: "Har bir agent alohida muhitda ishlaydi. Faqat siz ulagan narsaga kira oladi. Ruxsat bermaguncha ma’lumot jamoadoshga o‘tmaydi.",
  },
];

export const apps = [
  { name: "Slack", src: "/icons/slack.svg" },
  { name: "Microsoft Teams", src: "/icons/microsoft-teams.svg" },
  { name: "Google", src: "/icons/google.svg" },
  { name: "Notion", src: "/icons/notion.svg" },
  { name: "Salesforce", src: "/icons/salesforce.svg" },
  { name: "Asana", src: "/icons/asana.svg" },
  { name: "Telegram", src: "/icons/telegram.svg" },
  { name: "Zoom", src: "/icons/zoom.svg" },
  { name: "LinkedIn", src: "/icons/linkedin.svg" },
  { name: "Linear", src: "/icons/linear.svg" },
  { name: "GitHub", src: "/icons/github.svg" },
  { name: "Gmail", src: "/icons/gmail.svg" },
];

export const chats = [
  {
    title: "Sotuv agenti",
    channel: "#sales",
    messages: [
      {
        who: "Sotuv",
        body: "3 ta issiq lidni tekshirdim. Keyingi xatlar CRM da turibdi.",
      },
      {
        who: "Laylo",
        body: "Ikkinchisini qisqaroq qil.",
      },
    ],
  },
  {
    title: "Moliya agenti",
    channel: "#finance",
    messages: [
      {
        who: "Moliya",
        body: "Kecha 12 ta to'lov keldi. 2 tasi kechikkan. Hisobotni yubordim.",
      },
      {
        who: "Samir",
        body: "Kechikkan ikkalasini menga ber.",
      },
    ],
  },
  {
    title: "Yurist agenti",
    channel: "#legal",
    messages: [
      {
        who: "Yurist",
        body: "Yangi NDA da 4 ta xavfli band bor. Qisqa xulosa hujjatda.",
      },
      {
        who: "Mina",
        body: "14:00 dan keyin ko'raman.",
      },
    ],
  },
];
