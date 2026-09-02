"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Toast } from "radix-ui";

// Zod Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/queries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || "Message sent successfully!");
        reset();
      } else {
        Toast(result.message || "Failed to submit enquiry");
      }
    } catch (error) {
      console.error("API Error:", error);
      Toast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name + Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <Label className="text-sm font-medium text-gray-600">Name</Label>
          <Input
            {...register("name")}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/90 focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label className="text-sm font-medium text-gray-600">Phone</Label>
          <Input
            {...register("phone")}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/90 focus:border-transparent"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email + Subject */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <Label className="text-sm font-medium text-gray-600">Email</Label>
          <Input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/90 focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label className="text-sm font-medium text-gray-600">Subject</Label>
          <Input
            {...register("subject")}
            placeholder="Enter subject"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/90 focus:border-transparent"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col space-y-2">
        <Label className="text-sm font-medium text-gray-600">Message</Label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Write your message..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/90 focus:border-transparent resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 rounded-full bg-green-800 text-white font-medium hover:bg-green-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>

      {/* Success Message */}
      {success && <p className="text-primary/90 font-medium">{success}</p>}
    </form>
  );
}
