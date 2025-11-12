"use client"

import * as React from "react"
import { ToggleGroup } from "@/components/ui/toggle-group"

interface ReusableToggleGroupProps {
    value: string[]
    onValueChange: (value: string[]) => void
    children: React.ReactNode
    className?: string
}

export const ReusableToggleGroup: React.FC<ReusableToggleGroupProps> = ({
    value,
    onValueChange,
    children,
    className
}) => {
    return (
        <ToggleGroup
            type="multiple"
            value={value}
            onValueChange={onValueChange}
            className={className}
        >
            {children}
        </ToggleGroup>
    )
}
