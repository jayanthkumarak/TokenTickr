'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-red-200 dark:border-red-900 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-sm text-muted-foreground">
            <p>We encountered an unexpected error while processing your request.</p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-3 bg-muted rounded text-xs font-mono text-left overflow-auto max-h-32">
                {error.message}
              </div>
            )}
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="outline"
            >
              Go Home
            </Button>
            <Button 
              onClick={() => reset()} 
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
