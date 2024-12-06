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

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log({ name, email, message, selectedPackage });
      setIsSubmitting(false);
      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
      setSelectedPackage("");
    }, 2000);
  };

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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message here..."
          required
        />
      </div>
      <div>
        <label
          htmlFor="package"
          className="block text-sm font-medium text-gray-700"
        >
          Package
        </label>
        <Select value={selectedPackage} onValueChange={setSelectedPackage}>
          <SelectTrigger id="package">
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first">Honeycomb Clarity Session</SelectItem>
            <SelectItem value="second">
              Nectar of Healing: Ancestral & Past Life Unraveling
            </SelectItem>
            <SelectItem value="third">Soul Essence Transformation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
