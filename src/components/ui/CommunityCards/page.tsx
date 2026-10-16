import { getDictionary } from "@/lib/internalization";
import { FeatureCard } from "../FeatureCard/page";

interface CommunityCardsDict {
  card1: { title: string; description: string; buttonText: string };
  card2: { title: string; description: string; buttonText: string };
  card3: { title: string; description: string; buttonText: string };
}

interface CommunityCardsProps {
  dict: CommunityCardsDict;
}

export default function CommunitCards({ dict }: CommunityCardsProps) {
  const COMMUNITY_DATA = [
    {
      id: 'brands',
      title: dict.card1.title,
      description: dict.card1.description,
      buttonText: dict.card1.buttonText,
      buttonHref: '/membership/brands',
      imageSrc: '/images/microscopio.webp',
    },
    {
      id: 'professionals',
      title: dict.card2.title,
      description: dict.card2.description,
      buttonText: dict.card2.buttonText,
      buttonHref: '/membership/professionals',
      imageSrc: '/images/community_2.png',
    },
    {
      id: 'individuals',
      title: dict.card3.title,
      description: dict.card3.description,
      buttonText: dict.card3.buttonText,
      buttonHref: '/membership/individuals',
      imageSrc: '/images/skincare.webp',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 my-20  ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMMUNITY_DATA.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              buttonHref={item.buttonHref}
              imageSrc={item.imageSrc}
              size='x2'
              bgColor="medium"
              titleColor="sixth"
            />
          ))}
        </div>
      </div>
    </section>
  );
}