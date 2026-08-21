import { db } from "@/lib/db";
import EventsClientDirectory from "@/src/features/events/components/EventsClientDirectory";

export const revalidate = 0; // Disable caching for admin dashboard

export default async function AdminEventsPage() {
  const events = await db.event.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <EventsClientDirectory initialEvents={events} />;
}