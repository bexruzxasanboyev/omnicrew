export const agentVisuals = [
  { id: "assistant", image: "/images/agent-assistant.png", tone: "#e8f1ff" },
  { id: "hr", image: "/images/agent-hr.png", tone: "#f3e8de" },
  { id: "moliya", image: "/images/agent-moliya.png", tone: "#d7e6ff" },
  { id: "marketing", image: "/images/agent-marketing.png", tone: "#e4ddff" },
  { id: "sotuv", image: "/images/agent-sotuv.png", tone: "#d4f0ff" },
  { id: "boshqaruv", image: "/images/agent-boshqaruv.png", tone: "#e8eef7" },
  { id: "yurist", image: "/images/agent-yurist.png", tone: "#dde4f2" },
  { id: "analist", image: "/images/agent-analist.png", tone: "#d5f3ea" },
] as const;

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
      { who: "Sotuv", body: "3 ta issiq lidni tekshirdim. Keyingi xatlar CRM da turibdi." },
      { who: "Laylo", body: "Ikkinchisini qisqaroq qil." },
    ],
  },
  {
    title: "Moliya agenti",
    channel: "#finance",
    messages: [
      { who: "Moliya", body: "Kecha 12 ta to'lov keldi. 2 tasi kechikkan. Hisobotni yubordim." },
      { who: "Samir", body: "Kechikkan ikkalasini menga ber." },
    ],
  },
  {
    title: "Yurist agenti",
    channel: "#legal",
    messages: [
      { who: "Yurist", body: "Yangi NDA da 4 ta xavfli band bor. Qisqa xulosa hujjatda." },
      { who: "Mina", body: "14:00 dan keyin ko'raman." },
    ],
  },
];

export const employeeValues = ["1-5", "6-20", "21-50", "51-200", "200+"] as const;
