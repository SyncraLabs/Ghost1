
import Dropzone from '../components/ui/Dropzone';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden text-foreground selection:bg-syncra-primary/30">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-syncra-primary rounded-full blur-[180px] opacity-15 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-syncra-light rounded-full blur-[150px] opacity-15 pointer-events-none animate-pulse delay-1000"></div>

      <div className="z-10 text-center mb-16 max-w-3xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass-panel text-xs font-mono tracking-widest text-syncra-light uppercase border-syncra-light/20">
          Secure Metadata Removal
        </div>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Syncra
          <span className="text-syncra-primary">.</span>
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
          The professional standard for <span className="text-white font-medium">untraceable</span> content credentials.
          <br className="hidden md:block" /> Protect your creative workflow without compromise.
        </p>
      </div>

      <div className="w-full max-w-2xl z-20 glass-panel rounded-[2rem] min-h-[400px] flex items-center justify-center shadow-2xl overflow-hidden relative border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        <Dropzone />
      </div>

      <footer className="mt-24 text-neutral-600 text-xs font-mono tracking-wide uppercase opacity-60 hover:opacity-100 transition-opacity">
        <p>© 2026 Syncra Systems • Built via B.L.A.S.T. Protocol</p>
      </footer>
    </main>
  );
}
