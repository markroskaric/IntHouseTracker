import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col">
            <hr />
            <main className="flex-grow overflow-auto">{children}</main>
        </div>
    );
}
