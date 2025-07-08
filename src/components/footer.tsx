export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://openrouter.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:no-underline"
            >
              OpenRouter
            </a>
          </p>
          <p className="text-xs">
            Real-time model data and pricing
          </p>
        </div>
      </div>
    </footer>
  );
} 