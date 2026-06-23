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
    title: "Sight Machine Manufacturing Analytics",
    path: "/sight-machine.jpg",
    link: "https://sightmachine.com",
    category: "Agentic AI Full-stack Development",
    description:
      "A manufacturing analytics platform that ingests high-volume plant and machine data into a unified data model, surfacing real-time production insights, anomaly detection, and OEE dashboards that help factories reduce downtime and improve yield. Built agentic AI workflows — LLM-powered agents with tool use and retrieval over the factory data model — that let operators query plant performance in natural language and autonomously surface root-cause analysis.",
    tech: ["Agentic AI", "LLM Agents", "RAG", "Real-time", "Machine Learning", "Time-series DB"],
  },
  {
    title: "Alio Remote Patient Monitoring Platform",
    path: "/alio.png",
    link: "https://alio.ai",
    category: "Healthcare AI Full-stack Development",
    description:
      "A remote patient monitoring platform for chronic disease management — continuously tracking kidney disease, heart failure, and dialysis patients through non-invasive vitals and lab markers like potassium, hemoglobin, and heart rate. Built to FDA and SFDA standards to surface early warning signs to care teams.",
    tech: ["HIPAA", "FHIR", "FDA"],
  },
  {
    title: "Soapbox Supply Chain Platform",
    path: "/soapbox.jpg",
    link: "https://onsoapbox.com",
    category: "SaaS Full-stack Development",
    description:
      "An all-in-one supply chain platform that unifies order management, real-time inventory tracking, and shipping automation in a single system. Integrates with Shopify, Amazon, NetSuite, and major carriers — replacing fragmented tooling and scaling to over a million orders.",
    tech: ["Shopify", "Amazon", "NetSuite", "REST APIs"],
  },
  {
    title: "Surefront Product Collaboration Platform",
    path: "/surefront.jpg",
    link: "https://surefront.com",
    category: "SaaS Full-stack Development",
    description:
      "A unified platform for retail and wholesale teams combining product lifecycle management (PLM), product information management (PIM), and a quote-to-order CRM. Centralizes catalogs, tech packs, line sheets, and vendor communication to replace scattered spreadsheets and disconnected tools.",
    tech: ["PLM", "PIM", "CRM", "CPQ"],
  },
  {
    title: "VIVED Learning Interactive 3D Platform",
    path: "/vived-learning.jpg",
    link: "https://vivedlearning.com",
    category: "Immersive EdTech Development",
    description:
      "An interactive 3D learning platform for K-12 STEM education with 1,000+ explorable and dissectible models across anatomy, chemistry, science, and the trades. Supports AR/VR and ZSpace displays and lets schools author their own activities — trusted by 3,000+ institutions and millions of students.",
    tech: ["WebGL", "AR/VR", "3D Models", "ZSpace"],
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
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex items-center gap-x-2 sm:gap-x-4">
      <NavButton
        onClick={() => swiper?.slidePrev()}
        disabled={!swiper}
        label="Previous projects"
      >
        <BsArrowLeft aria-hidden />
      </NavButton>

      <Swiper
        spaceBetween={10}
        rewind
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSwiper={setSwiper}
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
        disabled={!swiper}
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
