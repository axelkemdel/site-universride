import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-zinc-950">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-35 filter saturate-50"
        style={{ backgroundImage: `url('/assets/bangui-monument-pixel.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/70" />
      <Card className="w-full max-w-lg mx-4 shadow-2xl border border-white/10 bg-zinc-900/90 text-zinc-100 backdrop-blur-xl relative z-10">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">404</h1>

          <h2 className="text-xl font-semibold text-red-500 mb-4">
            Page non trouvée / Page Not Found
          </h2>

          <p className="text-zinc-300 mb-8 leading-relaxed text-sm">
            Désolé, la page que vous recherchez n’existe pas ou a été déplacée.
            <br />
            Sorry, the page you are looking for does not exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-900/30 font-bold"
            >
              <Home className="w-4 h-4 mr-2" />
              Retour à l’accueil / Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
