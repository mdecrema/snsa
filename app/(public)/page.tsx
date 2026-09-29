import { db } from "@/lib/db";
import { getDictionary } from "@/lib/internalization";
import Jumbotron from "@/src/components/layout/Jumbotron/Jumbotron";
import CommunityCards from "@/src/components/ui/CommunityCards/page";
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
  { label: 'Developing Natural Cosmetics', href: '/dermatology' },
  { label: 'News & Media', href: '/news' },
  { label: 'Events', href: '/events' },
];

export default async function Home() {
    const [dict, featuredEvents] = await await Promise.all([
      getDictionary(),
      db.event.findMany({
      where: {
        isFeatured: true,
      },
      take: 3, // Optional: Limit to top 3 featured events
      orderBy: {
        createdAt: 'desc',
      },
      })
    ]);

    return (
        <>
        <Jumbotron />

            {/* Le 3 Card per Brands, Professionals, Individuals */}
            <CommunityCards dict={dict.home.community_cards} />
        
              {/* Main Feature Cards Section */}
              <section className="max-w-7xl mx-auto py-16 px-6 my-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Card 1: Logo & Text Header */}
                  <FeatureCard
                    title={dict.home.cards.card1.title}
                    subtitle=""
                    description={dict.home.cards.card1.description}
                    buttonVisible={true}
                    buttonFullWidth={true}
                    buttonText={dict.home.cards.card1.buttonText}
                    buttonHref="/qualityMark"
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
                    title={dict.home.cards.card2.title}
                    description={dict.home.cards.card2.description}
                    buttonVisible={true}
                    buttonFullWidth={true}
                    buttonText={dict.home.cards.card2.buttonText}
                    buttonHref="/services"
                    imageSrc="/images/consulenza.webp"
                  />
        
                  {/* Column 3: Quick Links List */}
                  <QuickLinksList title="See More" links={quickLinks} />
        
                  </div>
              </section>
        
              <section className="my-20">
              {/* Section 2: Membership Callout Banner */}
                <div className="w-full my-12">
                  <MembershipBanner
                    title={dict.home.membershipBanner.title}
                    buttonText={dict.home.membershipBanner.buttonText}
                    buttonHref="/membership"
                    imageSrc="/images/community_3.jpg"
                  />
                </div>
              </section>

              <section className="my-20">
                {/* Section 3: Featured Events List */}
                <FeaturedEventsSection 
                  events={featuredEvents}
                  labels={dict.home.featuredEventsSection}
                />
              </section>

              <section className="my-20">
                {/* Section 4: Pillars Grid */}
                <PillarsGridSection dict={dict.home.pillarsGridSection} />
              </section>
            </>
    )
}