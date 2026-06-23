import { motion } from "framer-motion";
import Link from "next/link";
import { RiGithubLine, RiMailLine, RiPhoneLine } from "react-icons/ri";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";

import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full">
      {/* text */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Transforming Ideas <br /> Into{" "}
            <span className="text-accent">Digital Reality</span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            Senior software engineer with 10+ years building secure, scalable
            SaaS platforms across healthcare, fintech, and e-commerce.
            Specializing in AI-powered systems, event-driven microservices, and
            cloud-native architecture on AWS, GCP, and Azure.
          </motion.p>

          {/* btn */}
          <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectsBtn />
          </motion.div>

          {/* contact */}
          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 sm:gap-x-8 mt-8 xl:mt-12"
          >
            <Link
              href="tel:+16507610640"
              title="Call"
              className="flex items-center gap-x-2 hover:text-accent transition-all duration-300"
            >
              <RiPhoneLine className="text-xl text-accent" aria-hidden />
              <span>1 650 761 0640</span>
            </Link>
            <Link
              href="mailto:jeffreymilam1031@gmail.com"
              title="Email"
              className="flex items-center gap-x-2 hover:text-accent transition-all duration-300"
            >
              <RiMailLine className="text-xl text-accent" aria-hidden />
              <span>jeffreymilam1031@gmail.com</span>
            </Link>
            <Link
              href="https://github.com/crazycoder0066"
              title="GitHub"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-x-2 hover:text-accent transition-all duration-300"
            >
              <RiGithubLine className="text-xl text-accent" aria-hidden />
              <span>crazycoder0066</span>
            </Link>
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className="w-[1280px] h-full absolute right-0 bottom-0 pointer-events-none">
        {/* bg img */}
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />

        {/* particles */}
        <ParticlesContainer />
      </div>
    </div>
  );
};

export default Home;
