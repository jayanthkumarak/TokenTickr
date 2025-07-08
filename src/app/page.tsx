import { Header } from "@/components/header";
import { ComparisonLayout } from "@/components/comparison-layout";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ComparisonLayout />
      </main>
    </div>
  );
}
