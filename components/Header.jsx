import React from "react";
import { ModeToggle } from "@/components/ui/theme-btn";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 py-3 sticky top-0 backdrop-blur border-b z-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link href={"/"}>
          <div className="text-lg font-bold">AbhiVerse AI</div>
        </Link>

        {/* navigation links and ModeToggle button */}
        <div className="flex space-x-4 items-center">
          <Button variant="outline" asChild>
            <Link href="/about" target="_blank">About</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
