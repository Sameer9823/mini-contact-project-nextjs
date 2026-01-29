"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { contactAction } from "@/actions";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    const result = await contactAction(formData);

    if (result.success) {
      setMessage("Your message has been sent successfully");
      setIsSuccess(true);
      formRef.current?.reset();
    } else {
      setMessage(result.error ?? "Something went wrong");
      setIsSuccess(false);
    }

    setIsSubmitting(false);
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Contact Us</CardTitle>
      </CardHeader>

      <form ref={formRef} action={onSubmit} className="space-y-6 p-4">
        <CardContent className="space-y-4">
          {message && (
            <div
              className={`p-4 rounded ${
                isSuccess
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid gap-1.5">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input id="name" name="name" placeholder="Name" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Message"
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
