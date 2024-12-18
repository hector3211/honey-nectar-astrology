import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import FirstPackage from "@/assets/first-package.jpg";
import SecondPackage from "@/assets/second-package.jpg";
import ThirdPackage from "@/assets/third-package.jpg";
import GeminiCard from "@/assets/gemini-card.svg";
import { setPackage } from "../stateStore";

export default function Offerings() {
  function handleClick(value: string) {
    setPackage(value);
    window.location.href = "#contact";
    // const element = document.getElementById("contact");
    // element?.scrollIntoView({ behavior: "instant", block: "start" });
  }
  return (
    <section id="packages" className="relative my-20 body-font text-zinc-600">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80 -left-[500px]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary via-accent to-purple-800 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="relative container px-5 py-5 sm:py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-5xl text-2xl font-bold title-font mb-2 text-zinc-900">
              Offerings✨
            </h1>
            <div className="h-1 w-20 bg-accent rounded"></div>
          </div>
          <img
            width={250}
            src={"/gold-cloud.svg"}
            alt={"star"}
            className="absolute top-[99%] left-[0%] md:left-[12%] md:-top-[3%] lg:left-[0%] lg:-top-[5%] z-20"
          />
          <img
            width={450}
            src={GeminiCard.src}
            alt={"star"}
            className="absolute w-[250px] md:w-[450px] -top-[3%] right-[5%] md:right-[12%] md:-top-[3%] lg:right-[0%] lg:-top-[5%] rotate-12 zwindow.pageYOffset-20"
          />
        </div>
        <div className="flex flex-col space-y-8 items-center lg:flex-row lg:space-x-5 lg:space-y-0">
          {[
            {
              key: "honeycomb-clarity",
              title: "Honeycomb Clarity Session",
              description: `Like a bee gathering nectar, this session uncovers the essence of
your soul’s path. Through an in-depth exploration of your birth
chart, I’ll reveal the patterns that influence your life purpose and
current challenges. Perfect for gaining clarity and direction, this
session offers you the sweet insight needed to realign with your
authentic self and move forward with confidence.`,
              src: FirstPackage.src,
              alt: "content",
              dataPackage: "honeycomb-clarity",
            },
            {
              key: "nectar-of-healing",
              title: "Nectar of Healing: Ancestral & Past Life Unraveling",
              description: `This package delves into the honeyed layers of your soul’s history,
addressing the unresolved issues from past lives and familial
traumas that have carried into this one. Using your natal chart,
I’ll help you unravel these deep-rooted patterns and find the
healing needed to release karmic cycles and embrace inner freedom.
Emerge renewed, having tasted the nectar of emotional healing and
empowerment.`,
              src: SecondPackage.src,
              alt: "content",
              dataPackage: "nectar-of-healing",
            },
            {
              key: "soul-essence-transformation",
              title: "Soul Essence Transformation",
              description: `This immersive journey is designed to connect you with the essence
of your soul’s nectar—your purest potential. We’ll analyze your
progressed chart to understand how past life energies and current
planetary influences are shaping your evolution. By addressing
imprints and limitations, this package guides you toward releasing
what no longer serves you, allowing you to flow naturally into your
soul’s evolution and fully bloom.`,
              src: ThirdPackage.src,
              alt: "third-package image",
              dataPackage: "soul-essence-transformation",
            },
          ].map((pkg) => (
            <Card key={pkg.key}>
              <CardHeader>
                <CardTitle>{pkg.title}</CardTitle>
              </CardHeader>
              <CardContent className="container h-[30rem]">
                <img
                  width={200}
                  className={`h-56 rounded w-full ${pkg.title === "Honeycomb Clarity Session" ? "object-center" : "object-bottom"} object-cover`}
                  src={pkg.src}
                  alt={pkg.alt}
                />
                <span className="leading-relaxed text-base text-justify">
                  {pkg.description}
                </span>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleClick(pkg.key)}
                  className="bg-accent hover:bg-accent/80"
                >
                  <Sparkles />
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
