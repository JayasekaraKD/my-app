/** @format */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    Plus,
    ArrowRight,
    ArrowUp,
    MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";

interface Task {
    id: string;
    title: string;
    status: "Operational" | "Active" | "Inactive";
    priority: "High" | "Medium";
}

const tasks: Task[] = [
    {
        id: "TASK-8782",
        title: "You can't compress the program without quantifying the open-source SS...",
        status: "Operational",
        priority: "Medium",
    },
    {
        id: "TASK-7878",
        title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        status: "Active",
        priority: "Medium",
    },
    {
        id: "TASK-7839",
        title: "We need to bypass the neural TCP card!",
        status: "Inactive",
        priority: "High",
    },
    {
        id: "TASK-5562",
        title: "The SAS interface is down, bypass the open-source pixel so we can back...",
        status: "Operational",
        priority: "Medium",
    },
    {
        id: "TASK-8686",
        title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
        status: "Active",
        priority: "Medium",
    },
    {
        id: "TASK-1280",
        title: "Use the digital TLS panel, then you can transmit the haptic system!",
        status: "Active",
        priority: "High",
    },
    {
        id: "TASK-1138",
        title: "Generating the driver won't do anything, we need to quantify the 1080p S...",
        status: "Inactive",
        priority: "Medium",
    }
];

const getStatusColor = (status: Task["status"]) => {
    switch (status) {
        case "Operational":
            return "bg-blue-100 text-blue-800";
        case "Active":
            return "bg-green-100 text-green-800";
        case "Inactive":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export default function WorkflowsPage() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Workflows" />

            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
                <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Task</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-[120px]">Status</TableHead>
                            <TableHead className="w-[120px]">Priority</TableHead>
                            <TableHead className="w-[60px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.id}</TableCell>
                                <TableCell className="max-w-[400px] truncate">{task.title}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="secondary"
                                        className={cn("font-normal", getStatusColor(task.status))}
                                    >
                                        {task.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        {task.priority === "High" ? (
                                            <ArrowUp className="h-4 w-4" />
                                        ) : (
                                            <ArrowRight className="h-4 w-4" />
                                        )}
                                        {task.priority}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    0 of 100 row(s) selected.
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Rows per page</span>
                        <Select defaultValue="10">
                            <SelectTrigger className="w-16 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        Page 1 of 10
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="w-8 h-8">
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="w-8 h-8">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="w-8 h-8">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="w-8 h-8">
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}