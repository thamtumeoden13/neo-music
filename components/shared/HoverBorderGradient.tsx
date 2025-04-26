"use client";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function HoverButtonBorderGradient() {
  return (
    <div className="flex justify-center m-40 text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="flex items-center space-x-2 text-black bg-white dark:bg-black dark:text-white"
      >
        <AceternityLogo />
        <span>Aceternity UI</span>
      </HoverBorderGradient>
    </div>
  );
}

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3 text-black dark:text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
