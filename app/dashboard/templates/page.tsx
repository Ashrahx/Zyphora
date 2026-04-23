import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function TemplatesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1200px]">
      {/* Encabezado y Filtros */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold font-sans mb-2">Template Engine</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Select a structural foundation for your portfolio. Templates define
            the layout hierarchy, while the design system enforces your selected
            theme configuration globally.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-muted text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground transition-colors rounded-md">
            <FilterListOutlinedIcon fontSize="small" /> Filter
          </button>

          {/* Selector de Categorías Estilo Toggle */}
          <div className="flex items-center border border-border rounded-md overflow-hidden bg-card text-xs font-mono">
            <button className="px-4 py-2 bg-primary/10 text-primary border-r border-border font-bold">
              All
            </button>
            <button className="px-4 py-2 text-muted-foreground hover:bg-muted border-r border-border transition-colors">
              Minimal
            </button>
            <button className="px-4 py-2 text-muted-foreground hover:bg-muted transition-colors">
              Brutal
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TEMPLATE PRINCIPAL DESTACADO (Ocupa 2 columnas en pantallas grandes) */}
        <div className="lg:col-span-2 border border-border bg-card rounded-lg overflow-hidden group cursor-pointer">
          {/* Wireframe Visual (Simulando la vista previa del template) */}
          <div className="h-[280px] bg-[#0a0e14] border-b border-border p-8 relative overflow-hidden flex items-center justify-center">
            {/* Decoración de fondo estilo circuito/grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(#262a31 1px, transparent 1px), linear-gradient(90deg, #262a31 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            {/* Esqueleto del UI del Template */}
            <div className="w-full max-w-lg border border-border/50 bg-background/50 backdrop-blur-sm rounded-md p-4 space-y-4 relative z-10 shadow-2xl">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 bg-primary/20 border border-primary/50 rounded-sm"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-border rounded-sm"></div>
                  <div className="h-2 w-full bg-border/50 rounded-sm"></div>
                  <div className="h-2 w-5/6 bg-border/50 rounded-sm"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-20 bg-card border border-border rounded-sm"></div>
                <div className="h-20 bg-card border border-border rounded-sm"></div>
                <div className="h-20 bg-card border border-border rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold font-sans">Terminal Horizon</h2>
              <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-mono">
                v2.4.0
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg">
              High-density, developer-first layout inspired by IDE environments.
              Optimized for repository grids and raw metrics.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#f78166]"></div>
                <div className="w-3 h-3 rounded-full bg-[#e3b341]"></div>
                <div className="w-3 h-3 rounded-full bg-[#3178c6]"></div>
              </div>
              <button className="px-4 py-2 border border-border bg-background hover:bg-muted text-xs font-bold font-mono text-foreground transition-colors rounded-md group-hover:border-primary/50">
                Preview Layout
              </button>
            </div>
          </div>
        </div>

        {/* TEMPLATE SECUNDARIO 1 */}
        <div className="border border-border bg-card rounded-lg overflow-hidden flex flex-col group cursor-pointer">
          <div className="h-[200px] bg-background border-b border-border p-6 flex flex-col items-center justify-center">
            {/* Esqueleto Minimalista */}
            <div className="w-full max-w-[200px] space-y-4">
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="w-8 h-8 rounded-full bg-muted"></div>
                <div className="h-3 w-24 bg-muted rounded-sm"></div>
              </div>
              <div className="h-16 bg-card border border-border rounded-sm w-full"></div>
              <div className="h-2 w-3/4 bg-border mx-auto rounded-sm"></div>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-mono font-bold text-base mb-2">
                Clean Slate
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-3">
                Ultra-minimalist canvas focusing entirely on typography and
                white space. Zero distractions.
              </p>
            </div>
            <div className="flex justify-between items-end mt-6 pt-4 border-t border-border/50">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Minimal
              </span>
              <button className="w-8 h-8 flex items-center justify-center bg-background border border-border rounded-md text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* TEMPLATE SECUNDARIO 2 */}
        <div className="border border-border bg-card rounded-lg overflow-hidden flex flex-col group cursor-pointer">
          <div className="h-[200px] bg-background border-b border-border p-6 flex flex-col items-center justify-center">
            {/* Esqueleto Documento */}
            <div className="w-full max-w-[200px] border border-border bg-card p-3 space-y-3">
              <div className="h-2 w-1/2 bg-muted rounded-sm"></div>
              <div className="h-1.5 w-full bg-border rounded-sm"></div>
              <div className="h-1.5 w-5/6 bg-border rounded-sm"></div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="col-span-1 h-10 bg-muted rounded-sm"></div>
                <div className="col-span-2 h-10 bg-muted rounded-sm"></div>
              </div>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-mono font-bold text-base mb-2">
                Document Structure
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-3">
                A traditional, linear layout modeled after academic and
                engineering CVs. High information density.
              </p>
            </div>
            <div className="flex justify-between items-end mt-6 pt-4 border-t border-border/50">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Formal
              </span>
              <button className="w-8 h-8 flex items-center justify-center bg-background border border-border rounded-md text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* TEMPLATE SECUNDARIO 3 */}
        <div className="border border-border bg-card rounded-lg overflow-hidden flex flex-col group cursor-pointer">
          <div className="h-[200px] bg-background border-b border-border p-6 flex items-center justify-center">
            {/* Esqueleto Masonry */}
            <div className="w-full max-w-[200px] grid grid-cols-2 gap-2">
              <div className="h-24 bg-card border border-border rounded-sm"></div>
              <div className="space-y-2">
                <div className="h-10 bg-card border border-border rounded-sm"></div>
                <div className="h-12 bg-card border border-border rounded-sm"></div>
              </div>
              <div className="col-span-2 h-8 bg-muted rounded-sm"></div>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-mono font-bold text-base mb-2">
                Masonry Stack
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-3">
                Asymmetric grid designed for mixed-media portfolios. Excellent
                for frontend and visual outputs.
              </p>
            </div>
            <div className="flex justify-between items-end mt-6 pt-4 border-t border-border/50">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Visual
              </span>
              <button className="w-8 h-8 flex items-center justify-center bg-background border border-border rounded-md text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
