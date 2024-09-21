import { UserIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="text-gray-600 body-font bg-gradient-to-br from-secondary via-primary to-accent">
      <div className="container mx-auto flex px-5 py-5 items-center justify-center flex-col">
        <img width={350} src={"/honey_logo.png"} alt="honey-hero" />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Microdosing synth tattooed vexillologist
          </h1>
          <p className="mb-8 leading-relaxed">
            Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
            tousled. Chambray dreamcatcher trust fund, kitsch vice godard
            disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh.
            Pour-over meditation PBR&amp;B pickled ennui celiac mlkshk freegan
            photo booth af fingerstache pitchfork.
          </p>
          <div className="flex justify-center space-x-3">
            <Button className="inline-flex text-white bg-secondary border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg space-x-1">
              <UserIcon className="size-5" />
              <p>About</p>
            </Button>
            <Button
              variant={"secondary"}
              className="inline-flex text-white bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
