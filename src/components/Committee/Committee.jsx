import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Navbar from "../navbar";
import Banner from "./Banner";
import CommitteeHome from "./CommitteeHome";
import Team from './Team';
import Footer from '../footer';

// const solutions = [
//   {
//     name: 'Analytics',
//     description: 'Get a better understanding of participation in your events.',
//     href: '#',
//     icon: ChartBarIcon,
//   },
//   {
//     name: 'Engagement',
//     description: 'Speak directly to the past participants.',
//     href: '#',
//     icon: CursorArrowRaysIcon,
//   },
//   { name: 'Data', description: "Student's data is safe and secure here.", href: '#', icon: ShieldCheckIcon },
//   {
//     name: 'Planning',
//     description: 'Build strategic plans for your next event',
//     href: '#',
//     icon: ArrowPathIcon,
//   },
// ]
// const callsToAction = [
//   { name: 'Watch Demo', href: '#', icon: PlayIcon },
//   { name: 'Contact Sales', href: '#', icon: PhoneIcon },
// ]
// const resources = [
//   {
//     name: 'Help Center',
//     description: 'Get all of your questions answered in our forums or contact support.',
//     href: '#',
//     icon: LifebuoyIcon,
//   },
//   {
//     name: 'Guides',
//     description: 'Learn how to maximize our platform to get the most out of it.',
//     href: '#',
//     icon: BookmarkSquareIcon,
//   },
//   {
//     name: 'Events',
//     description: 'See what meet-ups and other events we might be planning near you.',
//     href: '#',
//     icon: CalendarIcon,
//   },
//   { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
// ]
// const recentPosts = [
//   { id: 1, name: 'Boost your conversion rate', href: '#' },
//   { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
//   { id: 3, name: 'Improve your customer experience', href: '#' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function CommitteeDashboard() {
  return (
    <>
      <Navbar />
      <Banner />
      <CommitteeHome />
      <Team />
      <Footer />
    </>
  );
}
