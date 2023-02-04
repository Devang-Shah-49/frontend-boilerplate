import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import { Tab } from '@headlessui/react'
import CreateEventForm from './CreateEventForm';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function CreateEvent() {
  return (
    <div>
        <Navbar />
        <Tab.Group>
        <Tab.List className="flex items-center justify-center w-1/2 rounded-xl bg-bdazzledblue mt-4 lg:mx-96 p-1">
            <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow text-bdazzledblue'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Event Registration</Tab>
            <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow text-bdazzledblue'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Request Permission</Tab>
            <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-3.5 text-md font-medium leading-5 text-indigo-600',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow text-bdazzledblue'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Check Available Venue</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
              <CreateEventForm/>
        </Tab.Panel>
          <Tab.Panel >Request Permission</Tab.Panel>
          <Tab.Panel>Check Available Status</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
        
        <Footer />
    </div>
  )
}
