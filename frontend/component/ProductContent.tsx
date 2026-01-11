import React from "react"

interface ProductContentProps {
    children: React.ReactNode
}
export default function ProductContent ({children}:ProductContentProps) {
    return (
        <div className="flex flex-col w-full items-center p-2 gap-4 mt-8">
            {children}
        </div>
    )
}