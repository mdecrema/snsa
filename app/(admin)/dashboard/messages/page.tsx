import { db } from "@/lib/db";
import ContactMessageManager from "@/src/features/admin/contacts/components/ContactMessageManager";

export default async function Page() {
  // Recupera i messaggi dal database ordinati per data sul server
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Passa i dati iniziali al componente client
  return <ContactMessageManager initialMessages={messages} />;
}