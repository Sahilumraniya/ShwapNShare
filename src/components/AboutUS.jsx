import { LampContainer } from "./ui/vortex";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="w-full">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-50 to-slate-200 py-4 bg-clip-text text-center text-2xl sm:text-4xl font-medium tracking-tight text-transparent"
        >
          About Us <br />
          Online TradeHub is an online exchange platform that brings together users looking to trade various items. From shoes to books, and even electronics, we’re here to promote sustainable consumption and community engagement. Our goal is to create a sharing economy where everyone can benefit.
        </motion.h1>
      </LampContainer>
    </div>

  );
}

export default About;
