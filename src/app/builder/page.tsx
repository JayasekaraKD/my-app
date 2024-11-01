"use client";

import React, { useState } from "react";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { FieldList } from "@/components/FieldList";
import { TaskTemplateBuilder } from "@/components/TaskTemplateBuilder";
import { NewAppWindow } from "@/components/NewAppWindow";
import { Field } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function BuilderPage() {
    const [fields, setFields] = useState<Field[]>([]);
    const [activeField, setActiveField] = useState<Field | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragStart = (event: any) => {
        const { active } = event;
        if (active.data.current) {
            setActiveField(active.data.current.field);
            document.body.classList.add('is-dragging');
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        setActiveField(null);
        document.body.classList.remove('is-dragging');

        if (!over) return;

        if (over.id === "task-template" && active.data.current?.field) {
            const sourceField = active.data.current.field;
            const newId = `field-${sourceField.id}-${Date.now()}-${Math.random().toString(36).substring(7)}`;

            const newField: Field = {
                ...sourceField,
                id: newId
            };

            setFields(currentFields => [...currentFields, newField]);
        } else if (fields.length > 1) {
            const oldIndex = fields.findIndex(field => field.id === active.id);
            const newIndex = fields.findIndex(field => field.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                setFields(fields => arrayMove(fields, oldIndex, newIndex));
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Task Template Builder</h1>
                <Alert variant="default" className="bg-lime-50 text-lime-800 border-lime-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Drag fields from the right panel to build your task template. You can reorder fields within the template area.
                    </AlertDescription>
                </Alert>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* New App Window */}
                <div className="lg:w-1/3">
                    <NewAppWindow />
                </div>

                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {/* Template Builder */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <TaskTemplateBuilder fields={fields} setFields={setFields} />
                        </div>
                    </div>

                    {/* Available Fields */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
                            <FieldList />
                        </div>
                    </div>

                    <DragOverlay dropAnimation={null}>
                        {activeField ? (
                            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-lime-200 transform scale-105 transition-transform">
                                <activeField.icon className="w-8 h-8 mb-2 text-lime-500" />
                                <div className="text-center font-medium text-gray-700">
                                    {activeField.name}
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}