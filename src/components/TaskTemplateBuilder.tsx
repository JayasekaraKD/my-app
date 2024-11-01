// components/TaskTemplateBuilder.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableField } from "./SortableField";
import { Field } from "../types";

interface TaskTemplateBuilderProps {
    fields: Field[];
    setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

export function TaskTemplateBuilder({ fields, setFields }: TaskTemplateBuilderProps) {
    const { setNodeRef } = useDroppable({
        id: "task-template"
    });

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Task Template</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Drag and drop fields to arrange them in your preferred order
                </p>
            </div>

            <div
                ref={setNodeRef}
                className={`
          flex-1 p-4 min-h-[400px]
          ${fields.length === 0 ? 'flex items-center justify-center' : ''}
        `}
            >
                {fields.length === 0 ? (
                    <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 w-full">
                        <p className="text-gray-500">
                            Drag fields here to start building your template
                        </p>
                    </div>
                ) : (
                    <SortableContext
                        items={fields}
                        strategy={verticalListSortingStrategy}
                    >
                        {fields.map((field) => (
                            <SortableField
                                key={field.id}
                                field={field}
                                fields={fields}
                                setFields={setFields}
                            />
                        ))}
                    </SortableContext>
                )}
            </div>
        </div>
    );
}