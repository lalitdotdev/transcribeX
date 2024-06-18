import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const links = [
        {
            id: 3,
            href: 'https://forms.gle',
            label: 'Submit feedback',
        },
        {
            id: 4,
            href: 'https://ko-fi.com',
            label: 'Support this project',
        },
        {
            id: 5,
            href: '/legal',
            label: 'Legal',
        },
    ];

    return (
        <footer className="w-full px-6 sm:px-[5%]   ">
            <div className="pb-16">
                <span className="sr-only">UNVIEL</span>
            </div>
            <div className="flex flex-col gap-y-12 gap-x-2 md:flex-row items-start justify-between pt-10 pb-10">
                <div className="gap-y-4 b-8 flex flex-col text-sm">
                    <div className="flex w-56 gap-x-1 xl:w-96">
                        <span className="w-fit flex-nowrap whitespace-nowrap">Developed & Curated by </span>
                        <Link
                            className="font-bold relative overflow-y-hidden w-full group h-fit"
                            target="_blank"
                            href="https://litsharmadev.tech/"
                        >
                            <span className="flex group-hover:-translate-y-5 group-hover:opacity-0 transition-all ease-in-out-circ duration-500">
                                Lalit
                            </span>
                            <span className="absolute inset-0 group-hover:translate-y-0 translate-y-5 xl:translate-y-8 transition-all ease-in-out-circ duration-500 underline flex-nowrap whitespace-nowrap">
                                Lalit Sharma :)
                            </span>
                        </Link>
                    </div>
                </div>
                <ul className="grid-cols-1 text-sm sm:grid-cols-2 lg:grid-cols-3 grid xl:grid-cols-3 gap-x-8 gap-y-3">
                    {links.map((link) => (
                        <li key={link.id} className="flex w-fit group text-sm xl:text-h7 2xl:text-h6">
                            <Link
                                className="group"
                                href={link.href}
                                target={link.id === 2 || link.id === 4 ? "_blank" : "_self"}
                                rel={link.id === 2 || link.id === 4 ? "noopener noreferrer" : ""}
                            >
                                {link.label}
                            </Link>
                            <span className="relative overflow-hidden h-fit w-fit">
                                <ArrowUpRight
                                    className="group-hover:-translate-y-5 group-hover:translate-x-5 duration-500 transition-transform ease-in-out-circ fill-light-gray"
                                    color="gray"
                                    size={16}
                                />
                                <ArrowUpRight
                                    className="absolute top-0 group-hover:translate-x-0 duration-500 group-hover:translate-y-0 transition-all ease-in-out-circ translate-y-5 -translate-x-5 fill-light-gray"
                                    color="gray"
                                    size={16}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
