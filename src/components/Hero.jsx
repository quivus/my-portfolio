import { useState, useEffect } from "react";
import profileImg from "../assets/images/profile.jpg";
import imeLogo from "../assets/images/ImeLogo.png";
import csoImage from "../assets/images/CSO.png";
import clinicImage from "../assets/images/Clinic.png";
import gratiImage from "../assets/images/Grati.png";
import idFrontImage from "../assets/images/ID_FRONT.png";
import idBackImage from "../assets/images/ID_BACK.png";
import csoVideo from "../assets/videos/CSOFinance.mp4";
import gratitudeVideo from "../assets/videos/gratitudevideo.mp4";

const truncateText = (text, limit) => {
  if (text.length <= limit) return { short: text, rest: "" };
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  const short = cut.slice(0, lastSpace > 0 ? lastSpace : limit).trim();
  return { short: `${short}`, rest: text.slice(short.length).trim() };
};

const renderHighlighted = (text, terms = []) => {
  if (!text) return null;
  if (!terms.length) return text;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-slate-900 dark:text-white">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const GithubIcon = ({ className = "h-4 w-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1 .07 1.522 1.03 1.522 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PlayIcon = ({ className = "h-5 w-5" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const WebsiteIcon = ({ className = "h-3.5 w-3.5" }) => (
  <svg
    className={`${className} fill-none stroke-current`}
    viewBox="0 0 24 24"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9z" />
  </svg>
);

const DownloadIcon = ({ className = "h-3.5 w-3.5" }) => (
  <svg
    className={`${className} fill-none stroke-current`}
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M4 19h16" />
  </svg>
);

const ExpandIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={`${className} fill-none stroke-current`}
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 3H4v5" />
    <path d="M15 3h5v5" />
    <path d="M4 3l6 6" />
    <path d="M20 3l-6 6" />
    <path d="M9 21H4v-5" />
    <path d="M15 21h5v-5" />
    <path d="M4 21l6-6" />
    <path d="M20 21l-6-6" />
  </svg>
);

const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg
    className={`${className} fill-none stroke-current`}
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6l-12 12" />
  </svg>
);

function Hero() {
  const [activeService, setActiveService] = useState(null);
  const [expandedIds, setExpandedIds] = useState({});
  const [playingId, setPlayingId] = useState(null);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  const toggleDesc = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePlay = (id) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const openFullscreen = (work) => {
    setFullscreenMedia({ src: work.video, title: work.title });
  };

  const closeFullscreen = () => setFullscreenMedia(null);

  useEffect(() => {
    if (!fullscreenMedia) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeFullscreen();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullscreenMedia]);

  const handles = [
    {
      name: "GitHub",
      url: "https://github.com/quivus",
      label: "quivus",
      brandClass:
        "hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.0.069-.608 1 .07 1.522 1.03 1.522 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: "Gmail",
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=v.rajiemae.v@gmail.com&su=&body=&bcc=",
      label: "v.rajiemae.v@gmail.com",
      brandClass: "hover:border-red-500 hover:text-red-500 hover:bg-red-500/5",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com/imee.zii",
      label: "Ayumi",
      brandClass:
        "hover:border-[#1877F4] hover:text-[#1877F4] hover:bg-[#1877F4]/5",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Line",
      url: "https://line.me/ti/p/QDPEWhefnT",
      label: "imee.zii",
      brandClass:
        "hover:border-[#06C755] hover:text-[#06C755] hover:bg-[#06C755]/5",
      icon: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.058.59.12.301.079.771.038 1.077l-.164 1.033c-.05.305-.239 1.193 1.026.65 1.266-.544 6.837-4.027 9.324-6.899 1.832-1.93 1.682-4.148 1.682-6.159z" />
        </svg>
      ),
    },
  ];

  const works = [
    {
      id: "01",
      title: "CSO Finance",
      description:
        "The Computer Studies Organization (CSO) Finance application is a personal project for the CSO at ACLC Mandaue. It is esigned for financial transparency and accountability, the system provides secure tools for officers to manage organizational funds. Key features include role-based access, a real-time dashboard, automated budget allocation, and strict expense tracking. Operating as an offline-first application with local data persistence, it allows users to prevent overdrafts and export detailed financial summaries.",
      highlights: [
        "Computer Studies Organization (CSO) Finance",
        "personal project",
        "financial transparency and accountability",
        "role-based access, a real-time dashboard, automated budget allocation, and strict expense tracking.",
        "offline-first application",
      ],
      tech: ["Flutter", "Dart"],
      image: csoImage,
      video: csoVideo,
      apkUrl:
        "https://drive.google.com/file/d/1KkeuRCZE9R4xRzZnnEu_jYGX4XQ0B7YY/view?usp=drive_link",
      codeUrl: "https://github.com/quivus/cso-finance",
    },
    {
      id: "02",
      title: "Patient Tracker System",
      description:
        "A 3rd-year capstone project for the school clinic at ACLC Mandaue. This multi-platform tool streamlines clinic operations by managing patient intake, medical records, and medicine inventory. By connecting web, mobile, and hardware, it ensures health data is captured quickly and provides a valid, digital form of medical documentation. The system helps students and nurses communicate effectively, keeping records organized while allowing staff to monitor clinic status, manage schedules, and respond to urgent health requests in real-time.",
      highlights: [
        "3rd-year capstone project",
        "ACLC Mandaue",
        "multi-platform tool",
        "patient intake,",
        "medical records,",
        "and medicine inventory",
        "web, mobile, and hardware",
        "valid, digital form of medical documentation",
      ],
      tech: [
        "C#",
        ".NET 8",
        "ASP.NET Core Web API",
        "Dapper",
        "SQL Server",
        "Vue 3",
        "Vite",
        "Pinia",
        "Vue Router",
        "Tailwind CSS",
        "Dart",
        "Flutter",
        "C++",
        "ESP32",
        "IoT",
      ],
      image: clinicImage,
      video: null,
      apkUrl: null,
      codeUrl: "https://github.com/orgs/PatientsRecordandHistory/repositories",
    },
    {
      id: "03",
      title: "Gratitude Capsule",
      description:
        "It is a cross-platform application designed for writing personal notes, sealing them with a timer, and revealing them at a specific future date. It features synchronized cross-device access, allowing users to manage capsules across multiple devices under a single account. The system delivers an aesthetic, calming experience through real-time synchronization, live countdowns, and smooth unlock animations.",
      highlights: [
        "cross-platform application",
        "sealing them with a timer",
        "synchronized cross-device access",
        "real-time synchronization",
        "live countdowns",
        "smooth unlock animations",
      ],
      tech: ["Flutter", "React", "Firebase", "Figma"],
      image: gratiImage,
      video: gratitudeVideo,
      websiteUrl: "",
      apkUrl: "",
      codeUrl: "https://github.com/quivus/gratitude-capsule.git",
    },
  ];

  const services = [
    {
      id: "s1",
      title: "WEB DEVELOPMENT",
      desc: "Building responsive, user-friendly web applications using clean, component-based code and modern frontend frameworks.",
      tech: ["TypeScript", "React", "Next.js", "Vue.js", "Tailwind"],
    },
    {
      id: "s2",
      title: "MOBILE DEVELOPMENT",
      desc: "Developing cross-platform mobile applications with smooth user interfaces and consistent performance across devices.",
      tech: ["Flutter", "Dart"],
    },
    {
      id: "s3",
      title: "UI/UX DESIGN & PROTOTYPING",
      desc: "Designing functional layouts, interactive prototypes, and visual assets to turn concepts into clear user experiences.",
      tech: ["Figma", "Canva", "Prototyping", "Design Systems"],
    },
  ];

  return (
    <div className="w-full font-sans select-none bg-white text-slate-900 transition-colors duration-500 dark:bg-neutral-950 dark:text-neutral-100">
      <section
        id="home"
        className="relative border-b border-slate-200/60 dark:border-neutral-900/60"
      >
        <div className="absoluteleft-6 -z-10 font-serif text-[7rem] font-black tracking-tighter opacity-[0.02] text-slate-900 dark:text-white md:text-[14rem]"></div>

        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-12 pt-16 pb-20 md:flex-row md:pt-28 md:pb-32">
          <div className="w-full md:w-5/12 space-y-6 text-center md:text-left order-2 md:order-1 flex-none">
            <div className="space-y-4">
              <span className="block font-mono text-xs font-semibold tracking-widest text-slate-400 uppercase dark:text-neutral-500">
                Hi, I'm
              </span>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Rajiemae Villa
              </h1>

              <h2 className="font-serif text-xl font-light tracking-[0.2em] uppercase text-slate-800 dark:text-neutral-200 md:text-2xl">
                Frontend Developer
              </h2>
              <p className="text-xs leading-relaxed font-sans text-slate-700 dark:text-neutral-500 max-w-sm mx-auto md:mx-0">
                I approach web and mobile development with a focus on original
                layouts and precise code execution. I work to ensure distinctive
                design ideas and custom concepts are built exactly as intended
                without cutting corners.{" "}
              </p>
            </div>

            <div className="pt-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="/VILLA_RESUME2026.pdf"
                download="VILLA_RESUME2026.pdf"
                className="group relative inline-block overflow-hidden rounded-full border border-red-600/30 px-8 py-3.5 text-[12px] font-bold tracking-[0.2em] text-slate-600 dark:text-neutral-200 dark:border-red-500/20"
              >
                <span className="absolute inset-0 translate-y-full bg-red-600 transition-transform duration-300 ease-out group-hover:translate-y-0 dark:bg-red-500"></span>
                <span className="relative transition-colors duration-300 group-hover:text-white">
                  DOWNLOAD CV
                </span>
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center order-1 md:order-2 w-full px-4">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full p-3 sm:h-72 sm:w-72 md:h-80 md:w-80">
              <div className="absolute inset-0 rounded-full border-2 border-red-600 dark:border-red-500"></div>
              <img
                src={profileImg}
                alt="Portrait Portfolio Header"
                className="h-full w-full rounded-full object-cover grayscale contrast-110 transition-all duration-700 hover:grayscale-0"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 justify-center items-center order-3 flex-none">
            {handles.map((media) => (
              <a
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noreferrer"
                aria-label={media.name}
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 ${media.brandClass} dark:border-neutral-900 dark:text-neutral-600 hover:scale-105 shadow-xs bg-white dark:bg-neutral-900`}
              >
                {media.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="border-b border-slate-200/60 dark:border-neutral-900/60"
      >
        <div className=" mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="border-b border-slate-100 pb-4 dark:border-neutral-900/40">
            <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-neutral-500">
              PROGRAMMING
            </h2>
          </div>

          <div className="mt-1 grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
            {works.map((work) => {
              const isExpanded = !!expandedIds[work.id];
              const isPlaying = playingId === work.id;
              const { short, rest } = truncateText(work.description, 95);
              const visibleTech = isExpanded
                ? work.tech
                : work.tech.slice(0, 3);
              const hiddenTechCount = work.tech.length - visibleTech.length;

              return (
                <div
                  key={work.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => work.video && togglePlay(work.id)}
                      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden bg-slate-50 dark:bg-neutral-900 ${
                        work.video ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      {isPlaying && work.video ? (
                        <video
                          src={work.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={work.image}
                          alt={work.title}
                          className="h-1/2 w-auto max-w-[45%] object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                        />
                      )}

                      {work.video && !isPlaying && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 pl-0.5 text-red-600 shadow-lg">
                            <PlayIcon />
                          </span>
                        </span>
                      )}

                      {!work.video && (
                        <span className="absolute bottom-3 right-3 rounded-md bg-slate-900/70 px-2 py-1 font-mono text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur-sm dark:bg-black/60">
                          Due to the system's size and ongoing development, a
                          video preview is unavailable.
                        </span>
                      )}
                    </button>

                    {work.video && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openFullscreen(work);
                        }}
                        className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[9px] font-bold tracking-wide text-white uppercase backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-black/80"
                      >
                        <ExpandIcon className="h-3 w-3" />
                        View Full Size
                      </button>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h3 className="font-serif text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      {work.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
                      {renderHighlighted(short, work.highlights)}
                      {isExpanded && rest ? (
                        <> {renderHighlighted(rest, work.highlights)}</>
                      ) : null}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {visibleTech.map((techItem) => (
                        <span
                          key={techItem}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-200/60 bg-red-50 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-wide text-red-700 shadow-2xs dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-500"></span>
                          {techItem}
                        </span>
                      ))}
                      {!isExpanded && hiddenTechCount > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleDesc(work.id)}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-wide text-slate-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                        >
                          +{hiddenTechCount} more
                        </button>
                      )}
                    </div>

                    {(rest || hiddenTechCount > 0) && (
                      <button
                        type="button"
                        onClick={() => toggleDesc(work.id)}
                        className="w-fit font-mono text-[10px] font-bold tracking-widest text-red-600 uppercase transition-colors hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                      >
                        {isExpanded ? "View Less <" : "View All >"}
                      </button>
                    )}

                    <div
                      className={`mt-auto flex flex-wrap justify-content items-center gap-2 pt-2 ${
                        !work.apkUrl && !work.websiteUrl ? "justify-center" : ""
                      }`}
                    >
                      {work.websiteUrl && (
                        <a
                          href={work.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 font-mono text-[10px] font-bold tracking-[0.2em] text-white uppercase shadow-xs transition-all duration-300 hover:scale-[1.03] hover:bg-blue-700"
                        >
                          <WebsiteIcon className="h-3.5 w-3.5" />
                          Visit Website
                        </a>
                      )}
                      {work.apkUrl && (
                        <a
                          href={work.apkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-fit items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 font-mono text-[10px] font-bold tracking-[0.2em] text-white uppercase shadow-xs transition-all duration-300 hover:scale-[1.03] hover:bg-green-700"
                        >
                          <DownloadIcon className="h-3.5 w-3.5" />
                          Download APK
                        </a>
                      )}
                      <a
                        href={work.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-mono text-[10px] font-bold tracking-[0.2em] text-slate-700 uppercase shadow-xs transition-all duration-300 hover:scale-[1.03] hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/60 dark:border-neutral-900/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="border-b border-slate-100 pb-4 dark:border-neutral-900/40">
            <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-neutral-500">
              CANVA / GRAPHICS
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex flex-1 items-center justify-center bg-slate-50/80 p-6 dark:bg-neutral-950/60">
                <img
                  src={imeLogo}
                  alt="Ime Logo"
                  className="h-36 w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex items-center p-6">
                <h3 className="font-serif text-sm font-semibold tracking-tight text-slate-900 dark:text-white sm:text-base">
                  OFFICIAL IME LOGO
                </h3>
              </div>
            </div>

            <div className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex flex-1 items-center justify-center bg-slate-50/80 p-6 dark:bg-neutral-950/60">
                <div className="grid w-full gap-4 md:grid-cols-2">
                  <img
                    src={idFrontImage}
                    alt="Official CSO Officers ID Front"
                    className="h-40 w-full rounded-xl object-contain"
                  />
                  <img
                    src={idBackImage}
                    alt="Official CSO Officers ID Back"
                    className="h-40 w-full rounded-xl object-contain"
                  />
                </div>
              </div>
              <div className="flex items-center p-6">
                <h3 className="font-serif text-sm font-semibold tracking-tight text-slate-900 dark:text-white sm:text-base">
                  OFFICIAL CSO OFFICERS ID 2025-2026
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="border-b border-slate-200/60 dark:border-neutral-900/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid gap-10 md:grid-cols-5 relative">
          <div className="md:col-span-2 space-y-4 md:sticky md:top-24 h-fit">
            <h2 className="font-serif text-3xl font-light tracking-tight text-slate-900 dark:text-white md:text-4xl leading-tight">
              Services & Expertise
            </h2>
            <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-neutral-500 max-w-xs">
              A look at how I build web and mobile projects, from initial design
              concepts through to final code.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            {services.map((srv) => {
              const isOpen = activeService === srv.id;
              return (
                <div
                  key={srv.id}
                  className="border-b border-slate-100 dark:border-neutral-900/40 pb-2 last:border-none"
                >
                  <button
                    onClick={() => setActiveService(isOpen ? null : srv.id)}
                    className="w-full group py-5 text-left flex items-start justify-between gap-4 transition-colors focus:outline-none"
                  >
                    <div className="space-y-2">
                      <h3 className="font-mono text-xs font-bold tracking-wider text-slate-800 dark:text-neutral-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs font-normal leading-relaxed text-slate-600 dark:text-neutral-500 max-w-xl">
                        {srv.desc}
                      </p>
                    </div>

                    <div className="relative flex h-6 w-6 shrink-0 items-center justify-center mt-0.5">
                      <svg
                        className={`h-5 w-5 fill-none stroke-current transition-all duration-500 ease-out ${
                          isOpen
                            ? "text-red-500 scale-110"
                            : "text-slate-300 dark:text-neutral-700 group-hover:text-slate-500"
                        }`}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                      >
                        <path
                          d="M12 21C12 21 9 15 12 9C15 15 12 21 12 21Z"
                          className={`transition-all duration-500 ${isOpen ? "fill-red-500/20" : ""}`}
                        />
                        <path
                          d="M12 21C12 21 5 16 9 11C11.5 14 12 21 12 21Z"
                          className={`origin-bottom transition-transform duration-500 ${isOpen ? "-rotate-12 -translate-x-px" : ""}`}
                        />
                        <path
                          d="M12 21C12 21 19 16 15 11C12.5 14 12 21 12 21Z"
                          className={`origin-bottom transition-transform duration-500 ${isOpen ? "rotate-12 translate-x-px" : ""}`}
                        />
                        <path
                          d="M6 21H18"
                          strokeDasharray={`${isOpen ? "0 0" : "2 2"}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-40 opacity-100 mt-1 mb-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 dark:border-neutral-900/40 dark:bg-neutral-900/10">
                      <div className="flex flex-wrap gap-2">
                        {srv.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-red-200/40 bg-red-50/50 px-3 py-1 font-mono text-[10px] font-medium tracking-tight text-red-600 dark:border-red-950/30 dark:bg-red-950/10 dark:text-red-400 shadow-2xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="w-full bg-slate-50/50 dark:bg-neutral-900/10"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-12 dark:border-neutral-900/40">
            <div className="space-y-3">
              <h2 className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-neutral-500">
                GET IN TOUCH
              </h2>
              <h3 className="font-serif text-3xl font-light tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Ime Listens. Ime Builds.
              </h3>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {handles.map((media) => (
              <a
                key={media.name}
                href={media.url}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center gap-4 rounded-2xl border border-slate-200/80 p-4 transition-all duration-300 bg-white dark:bg-neutral-950 dark:border-neutral-900/80 hover:scale-[1.02] hover:shadow-xs ${media.brandClass}`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-transparent group-hover:text-inherit transition-colors dark:bg-neutral-900 dark:text-neutral-500">
                  {media.icon}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="block font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase dark:text-neutral-500">
                    {media.name}
                  </span>
                  <span className="block text-xs font-medium text-slate-700 dark:text-neutral-300 truncate group-hover:text-inherit">
                    {media.label}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 font-bold text-[10px] text-slate-500 dark:text-neutral-600">
            <span>DIRECT CONTACT FOR PROJECT DISCUSSIONS</span>
            <span className="tracking-widest">BUILT WITH REACT & TAILWIND</span>
          </div>
        </div>
      </section>

      {fullscreenMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeFullscreen}
        >
          <button
            type="button"
            onClick={closeFullscreen}
            aria-label="Close"
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon />
          </button>

          <div
            className="flex w-full max-w-5xl flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={fullscreenMedia.src}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[85vh] w-full rounded-lg bg-black object-contain shadow-2xl"
            />
            <span className="font-mono text-[10px] font-bold tracking-widest text-white/70 uppercase">
              {fullscreenMedia.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
