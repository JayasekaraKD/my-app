// components/SortableField.tsx
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Field } from "../types";
import { Trash2, Edit2 } from "lucide-react";

interface SortableFieldProps {
    field: Field;
    fields: Field[];
    setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

export function SortableField({ field, fields, setFields }: SortableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(field.name);

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

    const Icon = field.icon;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group p-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-3 flex items-center
        ${isDragging ? 'border-lime-300 shadow-md' : 'hover:border-gray-300'}
        transition-all duration-200`}
            {...attributes}
            {...listeners}
        >
            <div className="flex items-center space-x-3 flex-1">
                <Icon className="w-5 h-5 text-gray-500 group-hover:text-lime-500 transition-colors" />
                <div className="flex-1">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedName}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            className="w-full px-2 py-1 border-b-2 border-lime-500 focus:outline-none text-gray-700"
                            autoFocus
                        />
                    ) : (
                        <span className="text-gray-700 font-medium">{field.name}</span>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }}
                    className="p-1 text-gray-400 hover:text-lime-500 rounded transition-colors"
                >
                    <Edit2 size={14} />
                </button>
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