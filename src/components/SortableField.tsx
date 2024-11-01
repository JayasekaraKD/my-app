// components/SortableField.tsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Field } from "../types";
import { Trash2, Edit2, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SortableFieldProps {
    field: Field;
    fields: Field[];
    setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

const priorities = [
    { value: "high", label: "High Priority", color: "text-red-500" },
    { value: "medium", label: "Medium Priority", color: "text-yellow-500" },
    { value: "low", label: "Low Priority", color: "text-green-500" },
];

export function SortableField({ field, fields, setFields }: SortableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(field.name);
    const [date, setDate] = useState<Date>();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    };

    const handleNameBlur = () => {
        if (editedName.trim()) {
            setFields(
                fields.map((f) => (f.id === field.id ? { ...f, name: editedName } : f))
            );
        }
        setIsEditing(false);
    };

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        if (newDate) {
            setFields(
                fields.map((f) =>
                    f.id === field.id
                        ? { ...f, value: format(newDate, "yyyy-MM-dd") }
                        : f
                )
            );
        }
    };

    const handlePrioritySelect = (value: string) => {
        setFields(
            fields.map((f) => (f.id === field.id ? { ...f, value: value } : f))
        );
    };

    const Icon = field.icon;

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-700';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700';
            case 'low':
                return 'bg-green-100 text-green-700';
            default:
                return '';
        }
    };

    const renderEditor = () => {
        if (field.id.includes("dueDate")) {
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            );
        }

        if (field.id.includes("priority")) {
            return (
                <div className="relative">
                    <Select onValueChange={handlePrioritySelect} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority">
                                {field.value && (
                                    <span className={cn("px-2 py-1 rounded text-sm", getPriorityColor(field.value))}>
                                        {field.value.charAt(0).toUpperCase() + field.value.slice(1)} Priority
                                    </span>
                                )}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent
                            className="w-[200px] absolute"
                            position="popper"
                            sideOffset={5}
                        >
                            <SelectGroup>
                                {priorities.map((priority) => (
                                    <SelectItem
                                        key={priority.value}
                                        value={priority.value}
                                        className={cn(
                                            "cursor-pointer my-1 rounded transition-colors",
                                            getPriorityColor(priority.value)
                                        )}
                                    >
                                        {priority.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            );
        }

        if (isEditing) {
            return (
                <input
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    className="w-full px-2 py-1 border-b-2 border-lime-500 focus:outline-none text-gray-700"
                    autoFocus
                />
            );
        }

        return (
            <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">{field.name}</span>
                {field.value && !field.id.includes("priority") && (
                    <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">
                        {field.value}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group p-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-3 flex items-center
        ${isDragging ? "border-lime-300 shadow-md" : "hover:border-gray-300"}
        transition-all duration-200`}
            {...attributes}
            {...listeners}
        >
            <div className="flex items-center space-x-3 flex-1">
                <Icon className="w-5 h-5 text-gray-500 group-hover:text-lime-500 transition-colors" />
                <div className="flex-1">{renderEditor()}</div>
            </div>

            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {!field.id.includes("dueDate") && !field.id.includes("priority") && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(true);
                        }}
                        className="p-1 text-gray-400 hover:text-lime-500 rounded transition-colors"
                    >
                        <Edit2 size={14} />
                    </button>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setFields(fields.filter((f) => f.id !== field.id));
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}