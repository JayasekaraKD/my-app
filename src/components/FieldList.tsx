// components/FieldList.tsx
import React from "react";
import { DraggableField } from "./DraggableField";
import { Field } from "../types";
import {
    Edit,
    MessageSquare,
    Calendar,
    User,
    AlertTriangle,
    Pin,
} from "lucide-react";

const fields: Field[] = [
    { id: "title", name: "Title", icon: Edit },
    { id: "description", name: "Description", icon: MessageSquare },
    { id: "dueDate", name: "Due Date", icon: Calendar },
    { id: "assignee", name: "Assignee", icon: User },
    { id: "priority", name: "Priority", icon: AlertTriangle },
    { id: "status", name: "Status", icon: Pin },
];

export function FieldList() {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Fields</h2>
            <div className="grid grid-cols-2 gap-4">
                {fields.map((field) => (
                    <DraggableField key={field.id} field={field} />
                ))}
            </div>
        </div>
    );
}