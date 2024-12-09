import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/assets/honey-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const shouldScroll = scrollTop > 50;

      if (shouldScroll !== hasScrolled) {
        setHasScrolled(shouldScroll);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  const navItems = [
    { name: "Home", href: "/", icon: "/bee-icon-tansparent.png" },
    { name: "About", href: "#about" },
    { name: "Offerings", href: "#packages" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`
        fixed top-0 z-50 w-full p-2 border-b transition-all duration-300
        ${
          hasScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center flex-shrink-0 space-x-2">
              <img
                width={40}
                src={Logo.src}
                alt="Honey Nectar Astrology Logo"
                className="object-contain"
              />
              <h3 className="font-bold text-xl md:text-2xl bg-gradient-to-br from-primary to-secondary text-transparent bg-clip-text">
                Honey Nectar Astrology
              </h3>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    relative flex items-center space-x-2 
                    text-zinc-900 hover:underline hover:underline-offset-4 
                    px-3 py-2 text-sm font-medium
                    ${item.name === "Home" ? "top-3.5" : ""}
                  `}
                >
                  {item.icon && (
                    <img
                      width={40}
                      src={item.icon}
                      alt={`${item.name} icon`}
                      className="object-contain"
                    />
                  )}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <a
                      href={item.href}
                      className="w-full font-medium flex items-center space-x-2"
                    >
                      {item.icon && (
                        <img
                          width={24}
                          src={item.icon}
                          alt={`${item.name} icon`}
                          className="mr-2 object-contain"
                        />
                      )}
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
