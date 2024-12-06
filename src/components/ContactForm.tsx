import { useEffect, useState, type FormEvent } from "react";
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

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}

// Utility function to set cookie
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(""); // Clear previous messages

    try {
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
        setSelectedPackage("");
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

  useEffect(() => {
    const packageFromCookie = getCookie("selectedPackage");
    if (packageFromCookie) {
      setSelectedPackage(packageFromCookie);
    }
  }, []);

  useEffect(() => {
    const packageFromCookie = getCookie("selectedPackage");
    if (packageFromCookie !== selectedPackage) {
      setCookie("selectedPackage", selectedPackage);
      return;
    }
  }, [selectedPackage, setSelectedPackage]);

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
          value={selectedPackage}
          onValueChange={setSelectedPackage}
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
        type="submit"
        className="w-full lg:text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
