import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight, BsX } from "react-icons/bs";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const workItems = [
  {
    title: "Enterprise AI Workflow Platform",
    path: "/thumb1.png",
    link: "https://alio.ai",
    category: "AI Engineering",
    description:
      "A no-code platform that lets enterprise teams compose LLM-powered automation workflows. Includes a visual builder, RAG over private knowledge bases, and human-in-the-loop approvals, serving thousands of daily runs.",
    tech: ["Next.js", "LangChain", "OpenAI", "PostgreSQL", "Redis"],
  },
  {
    title: "Multimodal Chat Interface",
    path: "/thumb2.jpg",
    link: "http://example.com",
    category: "AI Engineering",
    description:
      "A streaming chat product supporting text, image, and document inputs with real-time token rendering, conversation branching, and tool-calling. Built for low-latency responses at scale.",
    tech: ["React", "WebSockets", "Anthropic", "Node.js"],
  },
  {
    title: "ML Media Metadata Pipeline",
    path: "/thumb3.jpg",
    link: "http://example.com",
    category: "Data Engineering",
    description:
      "An automated pipeline that enriches large media libraries with ML-generated metadata — scene detection, transcription, and tagging — and exposes it through a searchable catalog.",
    tech: ["Python", "Airflow", "PyTorch", "AWS S3"],
  },
  {
    title: "Real-time Analytics Dashboard",
    path: "/thumb4.jpg",
    link: "http://example.com",
    category: "Frontend Engineering",
    description:
      "A high-density analytics dashboard streaming live metrics with sub-second updates, custom D3 visualizations, and configurable widgets backed by a columnar event store.",
    tech: ["React", "D3.js", "ClickHouse", "Kafka"],
  },
  {
    title: "Snowflake Microsite",
    path: "/thumb4.jpg",
    link: "http://example.com",
    category: "Creative Development",
    description:
      "An interactive marketing microsite featuring a 3D particle snow effect, scroll-driven animations, and a perfect Lighthouse score across performance and accessibility.",
    tech: ["Next.js", "Three.js", "Framer Motion"],
  },
  {
    title: "Cloud Infrastructure Modernization",
    path: "/thumb1.jpg",
    link: "http://example.com",
    category: "Cloud & DevOps",
    description:
      "Migrated a monolith to containerized microservices on Kubernetes with fully codified infrastructure, blue-green deploys, and CI/CD, cutting release time from days to minutes.",
    tech: ["Terraform", "AWS", "Kubernetes", "GitHub Actions"],
  },
  {
    title: "B2B SaaS Platform",
    path: "/thumb2.jpg",
    link: "http://example.com",
    category: "Full-stack",
    description:
      "A multi-tenant SaaS platform with role-based access, usage-based billing, and an admin analytics suite, designed for horizontal scaling from day one.",
    tech: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "Healthcare Data API",
    path: "/thumb3.jpg",
    link: "http://example.com",
    category: "Backend Engineering",
    description:
      "A HIPAA-conscious API layer exposing FHIR-compliant healthcare records over gRPC and REST, with audit logging, fine-grained authorization, and end-to-end encryption.",
    tech: ["Go", "gRPC", "FHIR", "GCP"],
  },
];

// number of items per slide (matches the 2x1 grid)
const ITEMS_PER_PAGE = 2;

// chunk the flat list into pages so the Swiper pagination is generated dynamically
const workSlides = Array.from(
  { length: Math.ceil(workItems.length / ITEMS_PER_PAGE) },
  (_, page) =>
    workItems.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
);

// a single prev/next navigation button placed beside the slider
const NavButton = ({ onClick, disabled, label, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-xl bg-white/10 backdrop-blur-sm hover:bg-accent disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
  >
    {children}
  </button>
);

// detailed project dialog, rendered in a portal so it overlays the whole viewport
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

      {/* panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1b1c2a] border border-white/10 shadow-2xl"
      >
        {/* close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full text-2xl bg-black/40 hover:bg-accent transition-all duration-300"
        >
          <BsX aria-hidden />
        </button>

        {/* body */}
        <div className="p-6 sm:p-8 pr-16">
          <div className="text-accent text-sm uppercase tracking-[0.2em] mb-2">
            {project.category}
          </div>
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <p className="text-white/70 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs uppercase tracking-wider bg-white/10 rounded-full px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>

          {/* live link */}
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-x-2 rounded-full bg-accent hover:bg-accent/80 px-6 py-3 text-sm uppercase tracking-[0.1em] transition-all duration-300"
          >
            Visit live project
            <BsArrowUpRight aria-hidden />
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

const WorkSlider = () => {
  const [swiper, setSwiper] = useState(null);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: false });
  const [selected, setSelected] = useState(null);

  const syncEdges = (sw) =>
    setEdges({ isBeginning: sw.isBeginning, isEnd: sw.isEnd });

  return (
    <div className="flex items-center gap-x-2 sm:gap-x-4">
      <NavButton
        onClick={() => swiper?.slidePrev()}
        disabled={!swiper || edges.isBeginning}
        label="Previous projects"
      >
        <BsArrowLeft aria-hidden />
      </NavButton>

      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSwiper={(sw) => {
          setSwiper(sw);
          syncEdges(sw);
        }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
        className="flex-1 min-w-0 h-[280px] sm:h-[480px]"
      >
        {workSlides.map((images, i) => (
          <SwiperSlide key={i}>
            <div className="grid grid-cols-2 grid-rows-1 gap-4 h-full content-center">
              {images.map((image, imageI) => (
                <button
                  type="button"
                  onClick={() => setSelected(image)}
                  aria-label={`View details for ${image.title}`}
                  className="relative rounded-lg overflow-hidden flex items-center justify-center group text-left"
                  key={imageI}
                >
                  <div className="flex items-center justify-center relative overflow-hidden group">
                    {/* image */}
                    <Image
                      src={image.path}
                      alt={image.title}
                      width={500}
                      height={300}
                    />

                    {/* overlay gradient */}
                    <div
                      className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700"
                      aria-hidden
                    />

                    {/* label */}
                    <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300">
                      <div className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]">
                        {/* label part 1 */}
                        <div className="delay-100">VIEW</div>
                        {/* label part 2 */}
                        <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                          DETAILS
                        </div>
                        {/* icon */}
                        <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                          <BsArrowRight aria-hidden />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <NavButton
        onClick={() => swiper?.slideNext()}
        disabled={!swiper || edges.isEnd}
        label="Next projects"
      >
        <BsArrowRight aria-hidden />
      </NavButton>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkSlider;
