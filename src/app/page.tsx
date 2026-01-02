import { Header } from "@/components/header";
import { ComparisonLayout } from "@/components/comparison-layout";
import { Footer } from "@/components/footer";
import { NUXPopup } from "@/components/nux-popup";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <ComparisonLayout />
      </main>
      <Footer />
      <NUXPopup />
    </div>
  );
}
