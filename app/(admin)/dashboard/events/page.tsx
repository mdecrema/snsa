import { db } from "@/lib/db";
import EventsManager from "@/src/features/admin/events/components/EventsManager";

export const revalidate = 0; // Disable caching for admin dashboard

export default async function EventsPage() {
  const events = await db.event.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <EventsManager initialEvents={events} />;
}