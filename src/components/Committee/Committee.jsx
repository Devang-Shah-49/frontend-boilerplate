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
import Team from "./Team";
import Footer from "../footer";
import {Calendar} from "./availability/Calendar";

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
      {/*  */}
      <div className='bg-[url("https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63a493b4e5b10_spit-hackathon-2023.png?d=1920x557")] w-full bg-cover bg-center p-48'>
            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-2 text-4xl font-bold text-center">
                |
                </h1>
                <p className="text-lg text-center text-white">
                </p>
                {/* <div className="mt-4">
                    <button className="px-6 py-2 text-center text-white bg-indigo-600 rounded-md shadow-md">
                        Get started
                    </button>
                </div> */}
            </div>
        </div>
      <CommitteeHome />
      <Team />
      <Footer />
    </>
  );
}
