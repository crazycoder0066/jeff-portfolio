import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RxCrop, RxPencil2, RxDesktop, RxReader, RxRocket, RxMagicWand, RxCube, RxStack, RxLink2 } from "react-icons/rx";
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
    Icon: RxMagicWand,
    title: "Agentic AI Development",
    description:
      "Autonomous agents and multi-agent systems with tool use, planning, and memory. Built with LangGraph, the Model Context Protocol (MCP), and function calling for real-world workflows.",
  },
  {
    Icon: RxCube,
    title: "ML Model Development",
    description:
      "End-to-end machine learning, from data ingestion and feature engineering to model training, evaluation, deployment, and monitoring. Built with PyTorch, TensorFlow, scikit-learn, and MLflow.",
  },
  {
    Icon: RxStack,
    title: "Data Engineering",
    description:
      "Robust ETL/ELT pipelines, batch and streaming data processing, and data warehousing. Built with Airflow, Spark, dbt, Kafka, and Snowflake for reliable, scalable data platforms.",
  },
  {
    Icon: RxDesktop,
    title: "Backend Development",
    description:
      "Scalable REST and GraphQL APIs with event-driven microservices, message queues, and gRPC for high-throughput, distributed systems.",
  },
  {
    Icon: RxLink2,
    title: "API Integration",
    description:
      "Third-party integrations across CRMs, payments, shipping, and messaging — HubSpot, Zoho, Salesforce, UPS, Braintree, and Twilio. Webhooks, OAuth, and resilient sync with retries and rate-limit handling.",
  },
  {
    Icon: RxCrop,
    title: "Frontend Engineering",
    description:
      "Responsive, performant, and accessible UIs with modern component-based frameworks. Real-time dashboards and rich data visualization.",
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

  return (
    <div className="flex items-center gap-x-2 sm:gap-x-4">
      <NavButton
        onClick={() => swiper?.slidePrev()}
        disabled={!swiper}
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
        rewind
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        freeMode
        onSwiper={setSwiper}
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
            <div>
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-[350px] leading-normal">{item.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>

      <NavButton
        onClick={() => swiper?.slideNext()}
        disabled={!swiper}
        label="Next services"
      >
        <BsArrowRight aria-hidden />
      </NavButton>
    </div>
  );
};

export default ServiceSlider;
