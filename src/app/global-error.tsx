'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
                    <Card className="w-full max-w-md border-orange-200 dark:border-orange-900 shadow-lg">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <CardTitle className="text-xl font-bold">
                                Critical System Error
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-6">
                            <p className="text-sm text-muted-foreground">
                                A critical error occurred in the application shell. We apologize for the inconvenience.
                            </p>

                            <div className="flex gap-4 justify-center">
                                <Button
                                    onClick={() => reset()}
                                    variant="default"
                                >
                                    Reload Application
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </body>
        </html>
    );
}
