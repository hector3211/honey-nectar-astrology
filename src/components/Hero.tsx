import { SendIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="body-font">
      <div className="container mx-auto flex px-5 py-5 items-center justify-center flex-col">
        <img width={350} src={"/honey_logo.png"} alt="honey-hero" />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font text-5xl mb-4 font-semibold text-transparent bg-gradient-to-br from-secondary via-primary to-accent  bg-clip-text py-3">
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
            <Button
              size={"lg"}
              className="bg-secondary hover:bg-secondary hover:bg-opacity-95 w-56 text-xl flex items-center space-x-3"
            >
              <SendIcon className="size-5" />
              <p className="tracking-wide">Contact</p>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
