"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/time-piccer";
import { useTranslation } from "react-i18next";

interface TimePickerDemoProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerDemoProps) {
    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const { t } = useTranslation()
    return (
        <div className="flex items-end gap-2">
            <div className="grid gap-1 text-center">
                <Label htmlFor="hours" className="text-[12px]">
                    {t('hours')}
                </Label>
                <TimePickerInput
                    picker="hours"
                    date={date}
                    setDate={setDate}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                />
            </div>
            <div className="grid gap-1 text-center">
                <Label htmlFor="minutes" className="text-xs">
                    {t('minutes')}
                </Label>
                <TimePickerInput
                    picker="minutes"
                    date={date}
                    setDate={setDate}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                />
            </div>
        </div>
    );
}