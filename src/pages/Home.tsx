import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LockKey,
  Plus,
  X,
  ShieldCheck,
  UsersThree,
  Wall,
} from "@phosphor-icons/react";
import { Reveal } from "../components/Reveal";
import { AgentCarousel } from "../components/AgentCarousel";
import { apps, chats, faqs } from "../data";


function Media({
  src,
  poster,
  alt,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };
    play();
    const onVis = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      <section className="px-4 pb-6 pt-5 md:pt-6">
        <div className="mx-auto max-w-[1240px] md:relative md:overflow-hidden md:rounded-[28px]">
          <img
            src="/images/hero-crew.jpg"
            alt="Yetuk OmniCrew agentlari yig'ilish stolida ishlayapti"
            className="aspect-[16/9] w-full rounded-[28px] object-cover object-center md:rounded-none"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-tr from-ink/20 via-transparent to-transparent md:block" />
          <div className="mt-4 rounded-[24px] bg-white p-5 shadow-[0_16px_50px_rgba(20,24,32,0.14)] md:absolute md:bottom-8 md:left-8 md:right-auto md:mt-0 md:max-w-xl md:bg-white/96 md:p-8">
            <h1 className="text-3xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
              Jamoangiz uchun
              <br />
              AI ekipaji
            </h1>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted md:text-base">
              O‘zingizga mos AI agentlarni oling. Butun kompaniya uchun xavfsiz.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/get-started"
                className="inline-flex h-11 items-center rounded-full bg-cobalt px-6 text-[15px] font-medium text-white hover:bg-cobalt-deep active:scale-[0.98]"
              >
                Boshlash
              </Link>
              <Link
                to="/book-demo"
                className="inline-flex h-11 items-center rounded-full border border-cobalt px-6 text-[15px] font-medium text-cobalt hover:bg-cobalt/5 active:scale-[0.98]"
              >
                Demo band qilish
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-20">
        <Reveal className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            Mos, birga ishlaydigan
            <br />
            <span className="text-cobalt">AI hamkasblar</span> bilan ishlarni tez va osonlashtiring
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { src: "/icons/badge-secure.svg", label: "Xavfsiz" },
              { src: "/icons/badge-customizable.svg", label: "Moslanadi" },
              { src: "/icons/badge-easy.svg", label: "Oson" },
              { src: "/icons/badge-teams.svg", label: "Jamoa uchun" },
            ].map((item) => (
              <div key={item.label} className="grid justify-items-center gap-3">
                <img
                  src={item.src}
                  alt=""
                  className="h-11 w-11 object-contain md:h-12 md:w-12"
                />
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <img
          src="/images/crew-banner.png?v=2"
          alt="To'rtta OmniCrew agenti oq fonda stol atrofida ishlayapti"
          width={1168}
          height={266}
          className="mx-auto mt-8 block h-auto w-full max-w-[1168px] px-4"
        />
      </section>

      <section className="bg-[#1a2332] py-14 text-white md:py-20">
        <Reveal className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-6xl">
            Bizning{" "}
            <span className="text-sky">agentlarimiz</span>
          </h2>
        </Reveal>
        <AgentCarousel />
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1180px] px-5">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Ishlagan joyingizda ishlaydi
            </h2>
            <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">
              Har bir agentning o‘z kompyuteri bor. Slack, Teams, pochta va 3 000+ dastur bilan ishlaydi.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {apps.map((app) => (
              <img
                key={app.name}
                src={app.src}
                alt={app.name}
                className="h-8 w-8 object-contain"
                title={app.name}
              />
            ))}
            <span className="text-sm text-muted">3,000+</span>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {chats.map((chat) => (
              <article key={chat.channel} className="rounded-[28px] border border-line bg-fog p-5">
                <p className="text-sm font-medium">{chat.title}</p>
                <p className="text-xs text-muted">{chat.channel}</p>
                <div className="mt-4 grid gap-3">
                  {chat.messages.map((msg) => (
                    <div key={msg.body} className="rounded-2xl bg-white p-3">
                      <p className="text-xs font-medium text-cobalt">{msg.who}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink">{msg.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#152033]">
          <img
            src="/images/always-on.jpg?v=2"
            alt="Agent tunda noutbukda ishlayapti, orqasida grafklar va raqamlar"
            className="h-[420px] w-full object-cover object-[center_right] md:h-[520px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#152033] from-0% via-[#152033]/88 via-[38%] to-transparent to-[72%]" />
          <div className="absolute inset-y-0 left-0 z-10 flex max-w-[34rem] items-center p-8 text-white md:p-14">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Doim <span className="text-sky">ishda</span>
              </h2>
              <p className="mt-5 max-w-[32ch] text-lg leading-relaxed text-white/75">
                Siz uchrashuvda, ovqatda yoki uxlayotganingizda ham agentlar ishni davom ettiradi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4fb] px-5 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Ishingiz, <span className="text-cobalt">o‘z uslubingizda</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-lg text-muted">
            Agentlarni kompaniyangiz ishlagandek o‘rgating. Skillni butun jamoa bilan ulashing.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[980px] items-end gap-8 md:grid-cols-3">
          <div className="text-center">
            <img
              src="/images/skills-create.jpg?v=2"
              alt="Agent chatdan skill yaratayapti"
              className="mx-auto aspect-square w-full max-w-[240px] rounded-[28px] object-cover"
            />
            <h3 className="mt-5 text-lg font-semibold">Istalgan skillni yarating</h3>
            <p className="mt-2 text-sm text-muted">
              Jamoa ishini chat orqali skillga aylantiring.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/skills-packs.jpg?v=2"
              alt="Skill packlar javoni"
              className="mx-auto aspect-square w-full max-w-[280px] rounded-[28px] object-cover"
            />
            <h3 className="mt-5 text-lg font-semibold">Tayyor skill paketlarni o‘rnating</h3>
            <p className="mt-2 text-sm text-muted">
              Sinovdan o‘tgan kutubxonadan boshlang. Kerak bo‘lsa, o‘zgartirasiz.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/skills-share.jpg?v=2"
              alt="Skill ulashish illyustratsiyasi"
              className="mx-auto aspect-square w-full max-w-[240px] rounded-[28px] object-cover"
            />
            <h3 className="mt-5 text-lg font-semibold">Skillni oson ulashing</h3>
            <p className="mt-2 text-sm text-muted">
              Bir marta qurasiz — foydani jamoa oladi.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Qattiq <span className="text-cobalt">xavfsizlik</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg text-muted">
            Kalitni odam beradi. Agent saqlaydi. Parollar seyfda turadi, ba’zi amallar odam tasdig‘ini so‘raydi.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mx-auto mt-10 max-w-[720px]">
          <Media
            src="/video/security-key.mp4"
            poster="/images/security-key.jpg"
            alt="Odam kalitni OmniCrew agentiga topshirayapti"
            className="w-full rounded-[28px]"
          />
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[1080px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: UsersThree,
              title: "Admin boshqaruvi",
              body: "Kim agent ochishi, skill o‘rnatishi va dastur ulashi mumkinligini admin belgilaydi.",
            },
            {
              icon: LockKey,
              title: "Maxsus seyf",
              body: "Login va tokenlar alohida seyfda. Muhim amalga odam ruxsati kerak bo‘lishi mumkin.",
            },
            {
              icon: Wall,
              title: "Ma’lumot ajratilgan",
              body: "Har bir agentning o‘z kompyuteri va fayl ombori bor.",
            },
            {
              icon: ShieldCheck,
              title: "SOC 2 Type II",
              body: "Kompaniyamiz SOC 2 Type II sertifikatini olgan.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <item.icon size={28} className="mx-auto text-cobalt" />
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="bg-[#8ec4ea] bg-cover bg-center px-4 py-20 md:px-6"
        style={{ backgroundImage: "url('/images/faq-bg.jpg')" }}
      >
        <div className="mx-auto grid max-w-[760px] gap-4">
          {faqs.map((item, i) => {
            const open = openFaq === i;
            return (
              <article
                key={item.q}
                className="rounded-[22px] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(20,50,80,0.08)] md:px-7"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 text-left"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="text-lg font-semibold tracking-tight text-ink md:text-[1.35rem]">
                    {item.q}
                  </span>
                  <span className="mt-1 grid size-7 shrink-0 place-items-center text-cobalt">
                    {open ? <X size={20} weight="bold" /> : <Plus size={20} weight="bold" />}
                  </span>
                </button>
                {open ? (
                  <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
