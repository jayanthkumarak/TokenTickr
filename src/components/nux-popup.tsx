"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function NUXPopup() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Check if the user has seen the NUX before
        const hasSeenNux = localStorage.getItem("tokentickr-nux-seen");
        if (!hasSeenNux) {
            // Small delay to ensure smooth entrance animation after initial load
            const timer = setTimeout(() => {
                setOpen(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem("tokentickr-nux-seen", "true");
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
            <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-md border-border/50 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                        Welcome to TokenTickr
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground pt-2 leading-relaxed">
                        The most advanced LLM comparison engine. Analyze pricing, performance, and context windows across hundreds of models to optimize your AI infrastructure costs.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 sm:justify-center">
                    <Button onClick={handleClose} size="lg" className="w-full sm:w-auto font-semibold">
                        Start Comparing
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
