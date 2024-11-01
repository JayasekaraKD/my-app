// components/DraggableField.tsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Field } from "../types";

interface DraggableFieldProps {
    field: Field;
}

export function DraggableField({ field }: DraggableFieldProps) {
    const uniqueId = React.useId();
    const dragId = `draggable-${field.id}-${uniqueId}`;

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: dragId,
        data: { field }
    });

    const Icon = field.icon;

    return (
        <div
            ref={setNodeRef}
            className={`
        flex flex-col items-center justify-center p-4 bg-white rounded-lg
        border border-gray-200 shadow-sm cursor-grab
        hover:border-lime-200 hover:shadow-md hover:bg-lime-50
        transition-all duration-200
        ${isDragging ? 'opacity-50 border-lime-300 shadow-lg' : 'opacity-100'}
      `}
            {...listeners}
            {...attributes}
        >
            <Icon className="w-8 h-8 mb-2 text-gray-500 group-hover:text-lime-500 transition-colors" />
            <div className="text-center font-medium text-gray-700">{field.name}</div>
        </div>
    );
}