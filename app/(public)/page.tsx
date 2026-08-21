import { db } from "@/lib/db";
import Jumbotron from "@/src/components/layout/Jumbotron/Jumbotron";
import { FeatureCard } from "@/src/components/ui/FeatureCard/page";
import FeaturedEventsSection from "@/src/components/ui/FeaturedEventsSection/page";
import { MembershipBanner } from "@/src/components/ui/MembershipBanner/page";
import PillarsGridSection from "@/src/components/ui/PillarsGridSection/page";
import { QuickLink, QuickLinksList } from "@/src/components/ui/QuickLinksList/page";
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
}

const quickLinks: QuickLink[] = [
  { label: 'Research', href: '/research' },
  { label: 'Guidelines & Standards', href: '/guidelines' },
  { label: 'Dermatology Referral Guidelines', href: '/dermatology' },
  { label: 'News & Media', href: '/news' },
  { label: 'Events', href: '/events' },
];

export default async function Home() {
    const featuredEvents = await db.event.findMany({
      where: {
        isFeatured: true,
      },
      take: 3, // Optional: Limit to top 3 featured events
      orderBy: {
        createdAt: 'desc',
      },
    });

    return (
        <>
        <Jumbotron />
        
              {/* Main Feature Cards Section */}
              <section className="max-w-7xl mx-auto py-16 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Card 1: Logo & Text Header */}
                  <FeatureCard
                    title="Title title"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966..."
                    buttonText="Find out more"
                    buttonHref="/about"
                    customHeader={
                      <div className="flex items-center gap-4 w-full">
                        <div className="relative w-28 h-28 shrink-0">
                          <Image
                            src="/images/image_logo_1_edited.png"
                            alt="Swiss Natural Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="font-bold text-lg text-[#445238] leading-tight">
                          Swiss Natural <br /> Skincare Association
                        </div>
                      </div>
                    }
                  />
        
                  {/* Card 2: Image Banner Header */}
                  <FeatureCard
                    title="Title title"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966..."
                    buttonText="Find out more"
                    buttonHref="/services"
                    imageSrc="/images/consulenza.webp"
                  />
        
                  {/* Column 3: Quick Links List */}
                  <QuickLinksList title="See More" links={quickLinks} />
        
                  </div>
              </section>
        
              <section>
              {/* Section 2: Membership Callout Banner */}
                <div className="w-full my-12">
                  <MembershipBanner
                    title="Become a Member of the SNSA"
                    buttonText="Find out more"
                    buttonHref="/membership"
                    imageSrc="/images/community_3.jpg"
                  />
                </div>
              </section>

              <section>
                {/* Section 3: Featured Events List */}
                <FeaturedEventsSection events={featuredEvents} />
              </section>

              <section className="mb-50">
                {/* Section 4: Pillars Grid */}
                <PillarsGridSection />
              </section>
            </>
    )
}