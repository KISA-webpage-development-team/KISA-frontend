import React from "react";
import BurgerMenuIcon from "../ui/BurgerMenuIcon";
import CancelIcon from "../ui/CancelIcon";
import { motion } from "framer-motion";

export default function MobileMenuButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const handleClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const iconVariants = {
    open: {
      opacity: 1,
      rotate: -90,
      scale: 1,
    },
    closed: {
      rotate: 0, // Adjust angle for burger icon orientation
      scale: 1, // Adjust scale for smaller burger icon size (optional)
    },
  };

  return (
    <motion.button
      onClick={handleClick}
      className="z-20 focus:outline-none focus:bg-transparent flex items-center justify-center"
      layout
      whileHover={{ scale: 1 }} // Add a slight hover scale animation
    >
      <motion.div
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={iconVariants}
        transition={{ duration: 0.35 }} // Set transition duration for smoothness
      >
        {isMobileMenuOpen ? <CancelIcon /> : <BurgerMenuIcon />}
      </motion.div>
    </motion.button>
  );
}
