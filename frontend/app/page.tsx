import Dropzone from '../components/ui/Dropzone';
import { Shield, Zap, EyeOff } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden text-foreground selection:bg-syncra-primary/30">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-syncra-primary rounded-full blur-[180px] opacity-15 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-syncra-light rounded-full blur-[150px] opacity-10 pointer-events-none animate-pulse-slow delay-1000"></div>

      <div className="z-10 text-center mb-16 max-w-3xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass-panel text-xs font-mono tracking-widest text-syncra-light uppercase border-syncra-light/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          Cero Metadatos • Cero Rastro
        </div>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 drop-shadow-2xl relative scanline-effect">
          Ghost
          <span className="text-syncra-primary animate-pulse">.</span>
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
          La capa invisible de privacidad para tu contenido.
          <br className="hidden md:block" /> Elimina datos sensibles y marcas de agua de IA antes de publicar.
        </p>
      </div>

      <div className="w-full max-w-2xl z-20 glass-panel rounded-[2rem] min-h-[400px] flex items-center justify-center shadow-2xl overflow-hidden relative border border-white/10 group hover:border-syncra-primary/30 transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-syncra-primary/5 to-transparent pointer-events-none opacity-50" />
        <Dropzone />
      </div>

      {/* Features Section */}
      <div className="mt-24 w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-syncra-primary/20 transition-colors group">
          <div className="w-12 h-12 rounded-full bg-syncra-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <EyeOff className="text-syncra-light" size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Invisible para la IA</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Elimina marcas de agua invisibles y metadatos C2PA que rastrean tu contenido. Tu trabajo, tus reglas.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-syncra-primary/20 transition-colors group">
          <div className="w-12 h-12 rounded-full bg-syncra-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Shield className="text-syncra-light" size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Privacidad Total</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Procesamiento seguro. Tus imágenes se limpian y se olvidan. Cero registros, cero rastreo.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-syncra-primary/20 transition-colors group">
          <div className="w-12 h-12 rounded-full bg-syncra-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Zap className="text-syncra-light" size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Limpieza Instantánea</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Elimina credenciales de LinkedIn y metadatos de Adobe en milisegundos. Listo para compartir de nuevo.
          </p>
        </div>
      </div>

      {/* How it Works / SEO Text */}
      <div className="mt-20 max-w-3xl text-center z-10 px-4">
        <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
          ¿Cómo eliminar la marca de agua de IA?
        </h2>
        <div className="space-y-6 text-neutral-400 font-light text-base md:text-lg">
          <p>
            Las imágenes generadas por IA y las fotos de LinkedIn a menudo contienen <strong className="text-neutral-200 font-normal">credenciales de contenido</strong> ocultas.
            Ghost es la herramienta definitiva para <strong className="text-neutral-200 font-normal">eliminar metadatos C2PA</strong> y asegurar que tu contenido sea verdaderamente tuyo.
          </p>
          <p>
            Ya sea para proteger tu privacidad o para limpiar imágenes para su uso profesional, nuestro algoritmo avanzado borra cualquier rastro digital,
            dejando una imagen limpia y sin marcas de agua.
          </p>
        </div>
      </div>

      <footer className="mt-24 text-neutral-600 text-xs font-mono tracking-wide uppercase opacity-60 hover:opacity-100 transition-opacity flex gap-4">
        <span>© 2026 Ghost Systems</span>
        <span className="text-neutral-800">•</span>
        <span>Privacidad Primero</span>
      </footer>
    </main>
  );
}
