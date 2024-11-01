/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";
import {
    Workflow,
    LayoutDashboard,
    UsersRound,
    Settings,
    ChevronRight,
    Edit
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";

type Props = {};

export default function SideNavbar({ }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24 bg-white">
            {!mobileWidth && (
                <div className="absolute right-[-20px] top-7 z-50">
                    <Button
                        onClick={toggleSidebar}
                        variant="secondary"
                        className="rounded-full p-2 shadow-sm hover:shadow-md transition-shadow bg-white"
                    >
                        <ChevronRight className={`transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} />
                    </Button>
                </div>
            )}
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: "Dashboard",
                        href: "/",
                        icon: LayoutDashboard,
                        variant: "default"
                    },
                    {
                        title: "Workflows",
                        href: "/workflows",
                        icon: Workflow,
                        variant: "ghost"
                    },
                    {
                        title: "Builder",
                        href: "/builder",
                        icon: Edit,
                        variant: "ghost",
                    },
                    {
                        title: "Settings",
                        href: "/settings",
                        icon: Settings,
                        variant: "ghost"
                    },
                ]}
            />
        </div>
    );
}