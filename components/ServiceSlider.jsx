import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

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

const serviceData = [
  {
    Icon: RxRocket,
    title: "AI Engineering",
    description:
      "LLM-powered agents, RAG pipelines, multimodal chat, and ML systems built with OpenAI, Anthropic, LangChain, and Python.",
  },
  {
    Icon: RxDesktop,
    title: "Backend Development",
    description:
      "Scalable REST and GraphQL APIs in Node.js, Python, and Go. Event-driven microservices with Kafka, RabbitMQ, and gRPC.",
  },
  {
    Icon: RxCrop,
    title: "Frontend Engineering",
    description:
      "Responsive, performant UIs with React, Next.js, and TypeScript. Real-time dashboards and data visualization with D3.js.",
  },
  {
    Icon: RxPencil2,
    title: "Cloud & DevOps",
    description:
      "Infrastructure on AWS, GCP, and Azure. Containerized deployments with Docker and Kubernetes, CI/CD via GitHub Actions.",
  },
  {
    Icon: RxReader,
    title: "System Architecture",
    description:
      "Domain-driven microservices, event-driven design, multi-tenant data modeling, and cloud-native SaaS platform architecture.",
  },
];

const ServiceSlider = () => {
  const [swiper, setSwiper] = useState(null);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: false });

  const syncEdges = (sw) =>
    setEdges({ isBeginning: sw.isBeginning, isEnd: sw.isEnd });

  return (
    <div className="flex items-center gap-x-2 sm:gap-x-4">
      <NavButton
        onClick={() => swiper?.slidePrev()}
        disabled={!swiper || edges.isBeginning}
        label="Previous services"
      >
        <BsArrowLeft aria-hidden />
      </NavButton>

      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        freeMode
        onSwiper={(sw) => {
          setSwiper(sw);
          syncEdges(sw);
        }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
        className="flex-1 min-w-0 h-[280px] sm:h-[420px]"
      >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(65,47,123,0.15)] h-full rounded-lg px-6 py-6 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
            {/* icon */}
            <div className="text-4xl text-accent mb-4">
              <item.Icon aria-hidden />
            </div>

            {/* title & description */}
            <div className="mb-4">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-[350px] leading-normal">{item.description}</p>
            </div>

            {/* arrow */}
            <div className="text-3xl mt-auto">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>

      <NavButton
        onClick={() => swiper?.slideNext()}
        disabled={!swiper || edges.isEnd}
        label="Next services"
      >
        <BsArrowRight aria-hidden />
      </NavButton>
    </div>
  );
};

export default ServiceSlider;
