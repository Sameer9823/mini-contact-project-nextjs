"use server";

import { connectToDatabase } from "@/lib/db";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";

export async function contactAction(formData: FormData) {
  try {
    await connectToDatabase();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return {
        success: false,
        message: "All fields are required",
        error: "All fields are required",
      };
    }
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });
    await newContact.save();
    return {
      success: true,
      message: "Your message has been sent successfully",
      contactId: newContact._id.toString(),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      error: error,
    };
  }
}


export async function getAllContacts() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return contacts.map((contact) => ({
        ...contact,
        _id: contact._id.toString(),
        createdAt: contact.createdAt.toISOString(),
        updatedAt: contact.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateContactStatus(
  contactId: string,
  status: "new" | "in-progress" | "resolved"
) {
  await connectToDatabase();

  await Contact.findByIdAndUpdate(contactId, { status });

  // Revalidate the contact list page
  revalidatePath("/contact"); // adjust path if needed

  return { success: true };
}
