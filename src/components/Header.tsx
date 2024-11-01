import React from 'react';
import { cn } from "@/lib/utils";

const Header = ({
    title = "Project Management",

}) => {
    return (
        <div className="w-full">
            {/* Top Navigation */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border rounded-lg hover:bg-gray-50">
                            {title}
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex items-center gap-4">
                        <a href="#" className="text-sm font-medium text-gray-900">Connections</a>
                        <a href="#" className="text-sm font-medium text-gray-500">Calendar</a>
                        <a href="#" className="text-sm font-medium text-gray-500">Tasks</a>
                    </nav>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Header;