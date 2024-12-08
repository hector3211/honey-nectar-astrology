import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/assets/honey-hero.png";

export default function Navbar() {
  const [open, setOpen] = useState<true | false>(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Offerings", href: "#packages" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="z-50 p-2 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center flex-shrink-0">
              <img width={40} src={Logo.src} alt={"nav logo"} className="" />
              <h3 className="font-bold text-xl md:text-2xl  bg-gradient-to-br from-primary to-secondary  text-transparent bg-clip-text">
                Honey Nectar Astrology
              </h3>
            </a>
          </div>
          <div className="inset-x-0 z-50 hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <>
                  {item.name == "Home" && (
                    <a
                      key={item.name}
                      href={item.href}
                      className="relative top-3.5 flex items-center space-x-2 text-zinc-900 hover:underline hover:underline-offset-4 px-3 py-2 text-sm font-medium"
                    >
                      <img
                        width={"40"}
                        src={"/bee-icon-tansparent.png"}
                        alt="bee-icon"
                      />
                      <p>{item.name}</p>
                    </a>
                  )}

                  {item.name != "Home" && (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-zinc-900 hover:underline hover:underline-offset-4 px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </a>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="inset-x-0 z-50 md:hidden">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <a href={item.href} className="w-full font-medium">
                      {item.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
