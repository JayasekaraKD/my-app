import React from 'react';

export function NewAppWindow() {
    return (
        <div className="border border-gray-300 rounded-lg bg-white p-4 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">New App</h3>
                <div className="flex gap-1">
                    <button className="text-gray-400 hover:text-gray-600">
                        <MinimizeIcon className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MaximizeIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {/* Route 1 */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Route 1</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MinimizeIcon className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="pl-4 space-y-2">
                        <select className="w-full p-2 border border-gray-200 rounded text-sm">
                            <option>Process</option>
                        </select>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Tasks"
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Tasks"
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Route 2 */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Route 2</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MinimizeIcon className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="pl-4 space-y-2">
                        <select className="w-full p-2 border border-gray-200 rounded text-sm">
                            <option>Process</option>
                        </select>
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Tasks"
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Tasks"
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// MinimizeIcon component
function MinimizeIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

// MaximizeIcon component
function MaximizeIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
    );
}