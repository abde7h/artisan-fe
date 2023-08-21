"use client"

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { CategoryInterface } from '@/lib/types';

type Props = {
    title: string,
    state: string,
    categories: Array<CategoryInterface>,
    setState: (value: string) => void;
}

const CustomMenu = ({ title, state, categories, setState }: Props) => (
    <div className="flex items-center justify-start flex-col w-full gap-7 relative">
        <label htmlFor={title} className="w-full text-[#3d3d4e]">{title}</label>
        <Menu as="div" className="self-start relative">
            <div>
                <Menu.Button className="flex justify-center items-center gap-4 w-full rounded-md bg-indigo-300 p-4 text-base outline-none capitalize">
                    {state || 'Category'}
                    <Image
                        src="/arrow-down.svg"
                        width={10}
                        height={5}
                        alt="arrow down"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="flex items-center justify-start flex-col absolute left-0 mt-2 xs:min-w-[300px] w-fit max-h-64 origin-top-right rounded-xl bg-white border border-[#EBEAEA] shadow-[0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)] overflow-y-auto">
                    {categories.map((category) => (
                        <Menu.Item key={category.category_id}>
                            <button
                                type="button"
                                value={category.category_id}
                                className="flex-col absolute left-0 mt-2 xs:min-w-[300px] w-fit max-h-64 origin-top-right rounded-xl bg-white border border-[#EBEAEA] shadow-[0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)] overflow-y-auto"
                                onClick={(e) => setState(e.currentTarget.value)}
                            >
                                {category.name}
                            </button>
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    </div>
);

export default CustomMenu;