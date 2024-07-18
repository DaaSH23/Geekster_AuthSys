'use client';

import React from "react"
import Image from "next/image"
import Logob from "../assests/Logo.svg";
import Pic1 from "../assests/-n4dsaRKHmXmT39RBcL71709919749726.webp"
import Pic2 from "../assests/5VHk9XNVWMeSyp0OrFpS1701151519403.webp"
import Pic3 from "../assests/9BPNmuBZvyVcQQNALJkE1705046244209.webp"
import Pic4 from "../assests/0cSZqze1tW-6N0v26c991696489315128.webp"
import Pic5 from "../assests/t_ISpyk0ybiGMDzhYFCy1696312803712.webp"
import Pic6 from "../assests/BtPPYjDTHl1g9AeEfSjW1694602011806.webp"
import Icon1 from "../assests/yellow-line.svg"
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import picBanner from "../assests/IntroductiontoFullStackWebDevelopment.webp"
import "../Dashboard/dashboard.css";

export default function Dashboard() {

    // for state management
    const { logout, isAuthenticated } = useAuth();
    // for navigation
    const router = useRouter();

    // testing
    //console.log("Dashboard : ",isAuthenticated);


    // handling logout
    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/Logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            })

            //changes the state and redirects to root/login
            if (response.ok) {
                logout();
                router.push('/');
            } else {
                // Handle non-OK responses
                console.error('Logout failed:', await response.text());
            }
        } catch (error) {
            console.error('Logout error:', error);
        }

    }

    return (
        <div className="flex  min-h-[100dvh] w-full flex-col bg-muted/40  bg-BBgg">
            <div className="flex flex-col">

                {/* Header part */}
                <header className="sticky  bg-Dbalck top-0 z-30 flex h-20 items-center gap-4 border-b bg-background py-4 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <a href="#">
                        <Image src={Logob} alt="Logo" width={120} height={120} />
                    </a>
                    <div className="flex-grow"></div>
                    <div className="flex items-end ml-4">
                        <a href="https://www.geekster.in/">
                            Explore
                        </a>
                    </div>
                    <div className=" hidden sm:flex ml-4">
                        <label htmlFor="email" className="sr-only">
                            Search....
                        </label>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            autoComplete="search"
                            required
                            placeholder="Search...."
                            className="w-full rounded-md   px-3 py-2 shadow-sm sm:text-sm bg-BBgg"
                        />
                    </div>
                    <div className="flex items-end ml-4">
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Heading and Sub-Headings */}
                <div className="flex mt-6 mb-6 lg:mt-16 px-16">
                    <div className="SubMarker mr-4"></div>
                    <div>
                        <div className="SubHead text-xl lg:text-3xl font-bold">Previous Masterclasses </div>
                        <div className="SubHead text-sm lg:text-base font-normal">Learn anything fast and easy! Enroll in our masterclass and master a new skill in only two hours. </div>
                    </div>
                </div>

                {/* Created the array of the assests for better handling  */}
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:mt-6 md:mt-4">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-10">
                        {[
                            { src: Pic1, title: "Learn to make a dashboard like Swiggy using Google Sheets", link: "https://www.geekster.in/masterclass/learn-to-make-a-dashboard-like-swiggy-using-google-sheets/" },
                            { src: Pic2, title: "Learn Array in Data Structures", link: "https://www.geekster.in/masterclass/introduction-to-nodejs-learn-to-build-apis/" },
                            { src: Pic3, title: "Introduction to Node.Js: Learn to Build APIs", link: "https://www.geekster.in/masterclass/learn-array-in-data-structures/" },
                            { src: Pic4, title: "Prompt Engineering Using ChatGPT", link: "https://www.geekster.in/masterclass/prompt-engineering-using-chatgpt/" },
                            { src: Pic5, title: "Build An Instagram Bot Using NodeJs", link: "https://www.geekster.in/masterclass/build-an-instagram-bot-using-nodejs/" },
                            { src: Pic6, title: "Linkedin and Resume Makeover: The Ultimate Guide", link: "https://www.geekster.in/masterclass/linkedin-and-resume-makeover-the-ultimate-guide-/" },
                        ].map((item, index) => (
                            <div key={index} className="sm:col-span-1 lg:col-span-1 xl:col-span-1 group cursor-pointer">
                                <a href={item.link} className="relative block overflow-hidden rounded-xl">
                                    <Image
                                        src={item.src}
                                        alt={`Image ${index + 1}`}
                                        width={450}
                                        height={150}
                                        className="rounded-xl transition-transform duration-300 group-hover:scale-105 object-fill"
                                    />
                                    <div className="absolute inset-0 bg-LGreen opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex items-center">
                                            <div className="text-white text-lg font-bold">Learn More</div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-6 h-6 ml-2 text-white"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                                <div className="mt-2">
                                    <div className="text-xl font-bold">{item.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Mid-Heading of the page */}
                <div className="text-center px-4 my-4 lg:mt-24 bg-CardBB py-24">
                    <div className="text-xl font-bold lg:font-extrabold lg:text-5xl lg:px-36">Explore Our Courses and Achieve Your Goals. <span className="text-LGreen">Learn from the Expert</span></div>
                </div>
                
                {/* End-Part */}
                <div className="container mx-auto px-4 py-8 lg:px-24 lg:my-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 lg:ml-10 text-center lg:text-left">
                            <div className="font-bold lg:flex">
                                <div>
                                    <span className="text-LGreen text-5xl">India&apos;s 1st</span>
                                    <div className="mt-2 flex justify-center lg:justify-start w-full">
                                        <Image src={Icon1} alt="Logo" width={240} height={150} className="rounded-xl" />
                                    </div>
                                </div>

                                <span className="block text-white text-2xl lg:ml-10 mt-5 lg:mt-0">
                                    AI Powered Data Science
                                    <br />
                                    & Gen-AI Course
                                </span>
                            </div>
                            <div className="h-1 w-20 bg-yellow-500"></div>
                            <p className="text-gray-400 text-sm md:text-base">
                                Future-Proof Your Career with AI-powered Data Science and Lead in
                                an AI-dominant tech industry
                            </p>
                        </div>

                        <div className="relative aspect-w-16 aspect-h-9 mb-4">
                            <a href="">
                                <Image
                                    src={picBanner}
                                    alt="Banner"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Footer div */}
                <footer className="bg-gray-900 text-white py-4 px-6 sm:px-10 mt-auto bg-Dbalck">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex space-x-4">
                            <a href="https://www.geekster.in/" className="hover:text-gray-400">
                                Powered by <span className="text-LGreen">Geekster</span>
                            </a>
                            <span className="sm:inline-block hidden">|</span>
                            <a href="https://daash23.github.io/abhishekO-portfolio/" className="hover:text-gray-400">
                                Abhishek Oraon
                            </a>
                        </div>
                        <div className="">
                            <p>&copy; 2024 <span className="text-LGreen">Geekster</span>. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
