"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
    const ms = Math.max(0, target - Date.now());
    const s = Math.floor(ms / 1000);
    return {
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        minutes: Math.floor((s % 3600) / 60),
        seconds: s % 60,
    };
}

export function Countdown({ target }: { target: string }) {
    const targetMs = new Date(target).getTime();
    const [time, setTime] = useState(() => diff(targetMs));

    useEffect(() => {
        const id = setInterval(() => setTime(diff(targetMs)), 1000);
        return () => clearInterval(id);
    }, [targetMs]);

    const cells: [string, number][] = [
        ["Days", time.days],
        ["Hours", time.hours],
        ["Minutes", time.minutes],
        ["Seconds", time.seconds],
    ];

    return (
        <div className="flex gap-4 font-mono tabular-nums">
            {cells.map(([label, value]) => (
                <div
                    key={label}
                    className="flex flex-col items-center min-w-12"
                >
                    <span className="text-2xl">
                        {value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}
