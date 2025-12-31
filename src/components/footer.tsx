export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-3">
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <span>Data:</span>
          <a
            href="https://openrouter.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            OpenRouter
          </a>
          <span>·</span>
          <span>Benchmarks:</span>
          <a
            href="https://artificialanalysis.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            ArtificialAnalysis.ai
          </a>
          <span className="mx-2">|</span>
          <span>Built by</span>
          <a
            href="http://jayanthkumar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            Jayanth Kumar
          </a>
        </div>
      </div>
    </footer>
  );
} 