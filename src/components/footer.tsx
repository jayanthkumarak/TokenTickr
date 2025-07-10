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
          <p className="text-xs">
            Built by <a href="http://jayanthkumar.com/" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:no-underline">Jayanth Kumar</a> with <a href="https://www.anthropic.com/claude/sonnet" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:no-underline">Claude Sonnet 4</a> in <a href="https://cursor.com/en" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:no-underline">Cursor</a>. We love AI! 💜
          </p>
        </div>
      </div>
    </footer>
  );
} 