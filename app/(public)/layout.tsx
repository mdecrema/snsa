// app/(public)/layout.tsx
import Navbar from '@/src/components/layout/Navbar/Navbar';
import Footer from '@/src/components/layout/Footer/page';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col font-cabinet-grotesk"> 
     {/* font-cormorant-regular */}
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}