// app/page.tsx
import Navbar from '@/components/Navbar/Navbar';
import Jumbotron from '@/components/Jumbotron/Jumbotron';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Jumbotron />

      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Features Overview</h2>
        <p className="text-gray-600">
          This section lives below the full-height Swiper Jumbotron hero.
        </p>
      </section>
    </main>
  );
}