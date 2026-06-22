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
  return (
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
      className="h-[240px] sm:h-[340px]"
    >
      {serviceData.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
            {/* icon */}
            <div className="text-4xl text-accent mb-4">
              <item.Icon aria-hidden />
            </div>

            {/* title & description */}
            <div className="mb-8">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="max-w-[350px] leading-normal">{item.description}</p>
            </div>

            {/* arrow */}
            <div className="text-3xl">
              <RxArrowTopRight
                className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
                aria-hidden
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
