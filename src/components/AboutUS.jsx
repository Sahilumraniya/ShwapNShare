import { TextGenerateEffect } from "./ui/text-generate-effect";
import { LampContainer } from "./ui/vortex";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="w-full h-fit">
      <motion.h1
        initial={{ opacity: 0.5, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.3,
          ease: "easeIn",
        }}
        _dragY={200}
        className="bg-gradient-to-br from-slate-50 to-slate-200 py-4 bg-clip-text text-center text-2xl sm:text-4xl font-medium tracking-tight text-transparent"
      >
        About Us
      </motion.h1>
      <TextGenerateEffect className="mx-5 md:mx-32 md:mb-20 text-center flex justify-center items-center" words="Online TradeHub is an online exchange platform that brings together users looking to trade various items. From shoes to books, and even electronics, we’re here to promote sustainable consumption and community engagement. Our goal is to create a sharing economy where everyone can benefit." />
    </div>

  );
}

export default About;
