"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { heebo } from "../../../utils/fonts/textFonts";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MobileMenuItem = ({ setActive, active, item, children }) => {
  const mobileMenuItemVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 2, ease: "easeOut" }, // Adjust ease for smooth opening
    },
    closed: {
      opacity: 0,
      height: 0, // Adjust height for upward shift
      transition: { duration: 0.3, ease: "easeIn" }, // Adjust ease for faster closing
    },
  };

  return (
    <div
      onClick={() => setActive(active === item ? null : item)}
      className={`relative
      mt-4 md:mt-0
    `}
    >
      {/* motion.p: base menu item text */}
      <motion.p
        className="cursor-pointer hover:opacity-[0.9] 
        hover:text-michigan-maize
        text-sm md:text-base"
      >
        {item}
      </motion.p>

      {/* motion.div: dropdown menu items list */}
      {/* `active` handles whether user hovers in the base menu to open the dropdown */}
      {active !== null &&
        //  this is where dropdown menu items are rendered
        //    if current base menu is selected,
        // show dropdown with transition
        active === item && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", duration: 0.5 },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              // layout // layout ensures smooth animation
              className="w-max h-full py-4 pl-5"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
    </div>
  );
};

export const MobileMenu = ({
  active,
  setActive,
  isMobileMenuOpen,
  children,
}) => {
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }, // Adjust ease for smooth opening
    },
    closed: {
      opacity: 0,
      height: 0, // Adjust height for upward shift
      transition: { duration: 0.3, ease: "easeIn" }, // Adjust ease for faster closing
    },
  };

  return (
    <motion.nav
      className={`
        flex 
        items-start 
        flex-col md:flex-row
        relative border border-transparent
        shadow-input 
        space-x-0 md:space-x-10
        space-y-4 md:space-y-0
        ${isMobileMenuOpen ? "" : "h-0 overflow-y-hidden"}
      `}
      variants={menuVariants}
      animate={isMobileMenuOpen ? "open" : "closed"}
    >
      {children}
    </motion.nav>
  );
};

// DESKTOP MENU --------------------------------------------

export const Menu = ({ setActive, isMobileMenuOpen, children }) => {
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }, // Adjust ease for smooth opening
    },
    closed: {
      opacity: 0,
      height: 0, // Adjust height for upward shift
      transition: { duration: 0.3, ease: "easeIn" }, // Adjust ease for faster closing
    },
  };

  return (
    <motion.nav
      onMouseLeave={() => setActive(null)}
      className={`
        md:mt-0
        flex 
        items-start 
        flex-col md:flex-row
        relative border border-transparent
        shadow-input 
        space-x-0 md:space-x-8
        space-y-4 md:space-y-0
        
      `}
      // variants={menuVariants}
      // animate={isMobileMenuOpen ? "closed" : "open"}
    >
      {children}
    </motion.nav>
  );
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className={`relative
      mt-2 md:mt-0
    `}
    >
      {/* motion.p: base menu item text */}
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] 
        hover:text-michigan-maize
        text-sm md:text-base"
      >
        {item}
      </motion.p>

      {/* motion.div: dropdown menu items list */}
      {/* `active` handles whether user hovers in the base menu to open the dropdown */}
      {active !== null && (
        <motion.div
          className={`hidden md:flex`}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={transition}
        >
          {/* if current base menu is selected,
          show dropdown with transition */}
          {active === item && (
            <div className="absolute pt-[calc(2.4rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="
                bg-michigan-blue/90 backdrop-blur-sm rounded-2xl overflow-hidden 
                border border-michigan-maize shadow-inner"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// --------------------------------------------

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link {...rest} className="hover:text-michigan-maize ">
      {children}
    </Link>
  );
};
