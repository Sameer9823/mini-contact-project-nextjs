import ContactForm from "@/components/contact-form";
import { connectToDatabase } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  
  return (
    <>
      <main className="min-h-screen py-12 px-4 gradient-to-b from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to the Contact Us Page
            </h1>
            <p className="text-lg">
              Contact us for any inquiries or feedback.
            </p>
          </div>
          <ContactForm/>
        </div>
      </main>
    </>
  );
}
