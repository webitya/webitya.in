"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/image";

// Lazy load the Drawer component
const Drawer = lazy(() => import("@mui/material/Drawer"));

// JSON Data for links and logos
const data = {
  menuLinks: [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Projects", href: "/products" },
    { text: "New Launches", href: "/new-launches" },
    { text: "Contact", href: "/contact" }
  ],
  socialLinks: [
    { platform: "Facebook", href: "https://facebook.com" },
    { platform: "Twitter", href: "https://twitter.com" },
    { platform: "Instagram", href: "https://instagram.com" }
  ],
  logo: {
    src: "/logos/logo.svg",
    alt: "Logo",
    width: 120,
    height: 20
  },
  mobileLogo: {
    src: "/logos/logo.svg",
    alt: "Logo",
    width: 180,
    height: 50
  }
};

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Toggle the drawer state
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Handle sticky navbar on scroll
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop > 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`menu-social bg-white shadow-md px-3 py-1 flex justify-between items-center ${
        isSticky ? "fixed top-0 left-0 w-full z-10 transition-all duration-300" : ""
      }`}
    >
      {/* Logo */}
      <div className="logo">
        <Link href={data.logo.src}>
          <Image
            src={data.logo.src}
            alt={data.logo.alt}
            width={data.logo.width}
            height={data.logo.height}
            loading="lazy" // Lazy loading for images
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex menu">
        <ul className="flex space-x-8 text-lg font-semibold">
          {data.menuLinks.map((link, index) => (
            <li key={index} className="relative">
              <Link
                href={link.href}
                className="transition duration-300 hover:text-amber-800"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Social Icons */}
      <div className="hidden md:flex social space-x-4">
        {data.socialLinks.map((social, index) => (
          <a key={index} href={social.href} target="_blank" rel="noreferrer">
            {social.platform === "Facebook" && (
              <FacebookIcon className="text-xl hover:text-amber-800" />
            )}
            {social.platform === "Twitter" && (
              <TwitterIcon className="text-xl hover:text-amber-800" />
            )}
            {social.platform === "Instagram" && (
              <InstagramIcon className="text-xl hover:text-amber-800" />
            )}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon className="text-2xl" />
        </IconButton>
      </div>

      {/* Drawer for Mobile Menu */}
      <Suspense fallback={<div>Loading...</div>}>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            style: {
              padding: "1rem 0",
              maxHeight: "100vh",
              backgroundColor: "#fafafa"
            }
          }}
        >
          {/* Close Icon */}
          <div className="flex justify-end pr-4">
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon className="text-2xl" />
            </IconButton>
          </div>

          {/* Logo in Drawer */}
          <div className="flex justify-center items-center mb-4">
            <Image
              src={data.mobileLogo.src}
              alt={data.mobileLogo.alt}
              width={data.mobileLogo.width}
              height={data.mobileLogo.height}
              loading="lazy"
            />
          </div>

          <List>
            {data.menuLinks.map((link, index) => (
              <ListItem
                key={index}
                component="a"
                href={link.href}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>

          <div className="social-icons flex space-x-6 mt-8 justify-start px-4">
            {data.socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noreferrer">
                {social.platform === "Facebook" && (
                  <FacebookIcon className="text-2xl text-black" />
                )}
                {social.platform === "Twitter" && (
                  <TwitterIcon className="text-2xl text-black" />
                )}
                {social.platform === "Instagram" && (
                  <InstagramIcon className="text-2xl text-black" />
                )}
              </a>
            ))}
          </div>
        </Drawer>
      </Suspense>
    </div>
  );
};

export default Navbar;
