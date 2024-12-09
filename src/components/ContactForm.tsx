import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { useStore } from "@nanostores/react";
import { selectedPackage, setPackage } from "../stateStore";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  // nano state
  const $package = useStore(selectedPackage);
  // console.log("Current Package:", $package);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(""); // Clear previous messages

    try {
      setPackage($package);
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/api/offering", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const data = await response.json();
      if (data.message) {
        setName("");
        setEmail("");
        setMessage("");
        setPackage("");
        setResponseMessage(data.message);
        toast.success(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setResponseMessage("Something went wrong. Please try again.");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full p-3">
      <div>
        <Input
          type="text"
          style={{ display: "none" }} // Hidden input
          tabIndex={-1}
          autoComplete="off"
          name="honeypot"
        />
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message here..."
          required
        />
      </div>
      <div>
        <label
          htmlFor="selectedPackage"
          className="block text-sm font-medium text-gray-700"
        >
          Package
        </label>
        <Select
          value={$package}
          onValueChange={(value) => {
            setPackage(value);
          }}
          name="selectedPackage"
        >
          <SelectTrigger id="selectedPackage">
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="honeycomb-clarity">
              Honeycomb Clarity Session
            </SelectItem>
            <SelectItem value="nectar-of-healing">
              Nectar of Healing: Ancestral & Past Life Unraveling
            </SelectItem>
            <SelectItem value="soul-essence-transformation">
              Soul Essence Transformation
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        disabled={isSubmitting}
        type="submit"
        variant={"secondary"}
        className="w-full lg:h-12"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
