// src/config/navigation.ts

export interface NavItem {
  id: number;
  label: string;
  description: string;
  image?: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { 
    id: 0,
    label: 'Home', 
    description: 'Welcome to the Swiss Natural Skincare Association', 
    image: '/images/banners/home.jpg', 
    href: '/' 
  },
  { 
    id: 1,
    label: 'Quality Mark', 
    description: 'Quality Mark Quality Mark Quality Mark', 
    image: '/images/banners/qualityMark.avif', 
    href: '/qualityMark' 
  },
  { 
    id: 2,
    label: 'Start-up Incubator', 
    description: 'Start-up Incubator Start-up Incubator Start-up Incubator', 
    image: '/images/banners/startupIncubator.webp', 
    href: '/startupIncubator' 
  },
  { 
    id: 3,
    label: 'Events', 
    description: 'Conferences, webinars, and upcoming workshops', 
    image: '/images/banners/events.jpg', 
    href: '/events' 
  },
  { 
    id: 4,
    label: 'Members', 
    description: 'All members of our team', 
    image: '/images/banners/members.avif', 
    href: '/members' 
  },
  // { 
  //   label: 'News', 
  //   description: 'Latest research, articles, and industry announcements', 
  //   image: '/images/banners/doctor-holding-pen.webp', 
  //   href: '/news' 
  // },
  { 
    id: 5,
    label: 'Membership', 
    description: 'Join our professional network and gain exclusive access', 
    image: '/images/banners/membership.jpg', 
    href: '/membership' 
  },
  { 
    id: 6,
    label: 'About & More', 
    description: 'Our mission, history, and organizational structure', 
    image: '/images/banners/about.webp', 
    href: '/about' 
  },
  { 
    id: 7,
    label: 'Contacts', 
    description: 'Get in touch with our team', 
    image: '/images/banners/contacts.jpg', 
    href: '/contacts' 
  },
];