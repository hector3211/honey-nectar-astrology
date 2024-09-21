import { House, SquareUser } from "lucide-react";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-br from-zinc-900 to-zinc-700 to-[70%] flex justify-between p-2">
      <div className="flex items-center space-x-1">
        <img width={30} src={"/honey_logo.png"} alt="honey-astrology-logo" />
        <h3 className="font-bold text-xl bg-gradient-to-br from-secondary via-primary to-accent text-transparent bg-clip-text">
          Honey Nectar Astrology
        </h3>
      </div>
      <div className="flex items-center space-x-3">
        <a href="#">
          <Button
            variant={"link"}
            className="text-white flex items-center space-x-2"
          >
            <House className="size-4" />
            <p>Home</p>
          </Button>
        </a>
        <a href="#">
          <Button
            variant={"link"}
            className="text-white flex justify-center items-center space-x-1"
          >
            <SquareUser className="size-4" />
            <p>contact</p>
          </Button>
        </a>
        <a href="#">
          <Button
            variant={"link"}
            className="text-white flex items-center space-x-2"
          >
            <SquareUser className="size-4" />
            <p>contact</p>
          </Button>
        </a>
      </div>
    </nav>
  );
}
