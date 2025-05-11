"use client";

// ** IMPORTANT NOTE **
// md:768px is a breakpoint
// for the header to switch from desktop to mobile view

import React, { useState } from "react";
import LoginButton from "./LoginButton";
import VerticalDivider from "../shared/VerticalDivider";
import InstagramLinkIcon from "../shared/InstagramLinkIcon";
import UserInfo from "./UserInfo";
import MobileMenuButton from "./MobileMenuButton";
import {
  HoveredLink,
  Menu,
  MenuItem,
  MobileMenu,
  MobileMenuItem,
} from "../../components/ui/aceternity/navbar-menu";
import menu from "../../config/NavigationMenu";

// sub-ui components
import WebTitle from "./WebTitle";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Header({ session }) {
  const headerContentWidth = "max-w-screen-2xl px-4 md:px-24 lg:px-32";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [active, setActive] = useState(null);

  const pathname = usePathname();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/pocha")) {
    return null;
  }

  return (
    <div
      className={`mx-auto ${headerContentWidth}
        relative inset-x-0 w-full z-50 
        flex justify-between items-center 
        py-3 md:py-4
      `}
    >
      {/* LEFT SIDE */}
      <div
        className={` 
        flex flex-col md:flex-row 
        items-start md:items-center
        md:gap-8 
       `}
      >
        {/* Web Name home link */}
        <WebTitle />
        {/* Navigation Menu */}
        {/* !!! in mobile menu, this menu should go down and become hidden */}
        <div className="hidden md:flex">
          <Menu setActive={setActive}>
            {menu?.map((item, index) => (
              <MenuItem
                key={item.href}
                setActive={setActive}
                active={active}
                item={item.name}
              >
                <div className="flex flex-col space-y-4 text-sm">
                  {item.dropdowns.map((dropdown) => (
                    <HoveredLink key={dropdown.href} href={dropdown.href}>
                      {dropdown.name}
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className="flex md:hidden">
          <MobileMenu
            active={active}
            setActive={setActive}
            isMobileMenuOpen={isMobileMenuOpen}
          >
            {menu?.map((item, index) => (
              <MobileMenuItem
                key={item.href}
                setActive={setActive}
                active={active}
                item={item.name}
              >
                <div className="flex flex-col space-y-4 text-sm">
                  {item.dropdowns.map((dropdown) => (
                    <HoveredLink key={dropdown.href} href={dropdown.href}>
                      {dropdown.name}
                    </HoveredLink>
                  ))}
                </div>
              </MobileMenuItem>
            ))}
          </MobileMenu>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="hidden md:flex
       justify-center items-center gap-3 lg:gap-4"
      >
        <InstagramLinkIcon />
        <div className="hidden lg:block">
          <VerticalDivider />
        </div>

        {session && (
          <div className="ml-0 lg:ml-3 flex items-center">
            <UserInfo
              email={session.user.email}
              image={session.user.image}
              name={session.user.name}
            />
          </div>
        )}
        <div className="block ml-2 lg:ml-3">
          <LoginButton session={session} />
        </div>
      </div>

      <div
        className="absolute right-0 top-0
      mt-6 mr-4
      flex items-center md:hidden"
      >
        <MobileMenuButton
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>
      {isMobileMenuOpen && (
        <motion.div
          className="absolute top-0 mt-16
        right-0 mr-4
        flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Add exit animation
          transition={{ duration: 0.3 }}
        >
          {session && (
            <UserInfo
              email={session?.user.email}
              image={session?.user.image}
              name={session?.user.name}
            />
          )}

          <LoginButton session={session} size="sm" />
        </motion.div>
      )}
    </div>
  );
}
