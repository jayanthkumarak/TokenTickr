export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
          <p className="text-center">
            Powered by{" "}
            <a
              href="https://openrouter.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:no-underline"
            >
              OpenRouter
            </a>
            {" · "}
            Intelligence data by{" "}
            <a
              href="https://artificialanalysis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:no-underline"
            >
              ArtificialAnalysis.ai
            </a>
          </p>
          <p className="text-xs">
            Real-time model data, pricing, and benchmark scores
          </p>
          <p className="text-xs">
            Built by <a href="http://jayanthkumar.com/" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:no-underline">Jayanth Kumar</a> with <span className="font-medium">Antigravity</span>. We love AI! 💜
          </p>
        </div>
      </div>
    </footer>
  );
} 