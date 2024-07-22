import { motion } from "framer-motion";
import React from "react";

export default function GoldenYellowBlob() {
  return (
    <motion.img
      className="h-[20rem] w-[20rem] cursor-grab active:cursor-grabbing absolute"
      drag
      dragConstraints={{
        left: 0,
        top: 0,
        right: window.innerWidth - 300,
        bottom: window.innerHeight - 400,
      }}
      dragElastic={1}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
      whileDrag={{
        scale: 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      src="./blobs/shape_blob.png"
      alt="blob"
    />
  );
}
