'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: {
  name: string;
  surname: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  privacyConsent: boolean;
}) {
  if (!formData.privacyConsent) {
    throw new Error("Il consenso alla privacy è obbligatorio.");
  }

  try {
    const newMessage = await db.contactMessage.create({
      data: {
        name: formData.name,
        surname: formData.surname,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        privacyConsent: formData.privacyConsent,
      },
    });

    return { success: true, messageId: newMessage.id };
  } catch (error) {
    console.error("Errore salvataggio messaggio:", error);
    return { success: false, error: "Errore durante l'invio del messaggio." };
  }
}

export async function getUnreadMessagesCount() {
  try {
    const count = await db.contactMessage.count({
      where: { isRead: false },
    });
    return count;
  } catch (error) {
    console.error("Errore conteggio messaggi non letti:", error);
    return 0;
  }
}

export async function markMessageAsRead(messageId: string) {
  try {
    await db.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    // Ricarica i dati del layout e della pagina admin per aggiornare il badge e la lista
    revalidatePath('/dashboard/messages');
    revalidatePath('/dashboard'); // Aggiorna anche il layout contenente la navbar

    return { success: true };
  } catch (error) {
    console.error("Errore nell'aggiornamento dello stato del messaggio:", error);
    return { success: false };
  }
}