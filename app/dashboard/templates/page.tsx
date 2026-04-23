"use client";

import { useState, useTransition } from "react";
import { saveTemplateSelection } from "@/app/actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimalist Mono",
    description: "Un diseño limpio, tipográfico y directo al grano. Ideal para ingenieros backend.",
    color: "bg-zinc-900"
  },
  {
    id: "terminal",
    name: "Terminal Hacker",
    description: "Estilo línea de comandos con fuentes monoespaciadas verdes. Para los más geeks.",
    color: "bg-green-950"
  }
];

export default function TemplatesPage() {
  const [selected, setSelected] = useState("minimal");
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await saveTemplateSelection(selected);
        alert("Template updated successfully!");
      } catch (error) {
        alert("Error saving template.");
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-sans">Theme Gallery</h1>
          <p className="text-muted-foreground text-sm mt-1">Choose how the world sees your code.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isPending}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors rounded-md disabled:opacity-50"
        >
          {isPending ? "Applying..." : "Apply Template"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {TEMPLATES.map((tpl) => (
          <div 
            key={tpl.id}
            onClick={() => setSelected(tpl.id)}
            className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 overflow-hidden ${
              selected === tpl.id ? "border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]" : "border-border hover:border-muted-foreground/50"
            }`}
          >
            {selected === tpl.id && (
              <div className="absolute top-4 right-4 z-10 text-primary bg-background rounded-full">
                <CheckCircleIcon />
              </div>
            )}
            
            {/* Representación visual de la plantilla */}
            <div className={`h-48 w-full ${tpl.color} p-4 flex flex-col justify-between`}>
               <div className="w-1/3 h-4 bg-white/20 rounded mb-2"></div>
               <div className="space-y-2">
                 <div className="w-3/4 h-8 bg-white/20 rounded"></div>
                 <div className="w-1/2 h-4 bg-white/10 rounded"></div>
               </div>
               <div className="flex gap-2 mt-auto">
                 <div className="w-20 h-24 bg-white/10 rounded border border-white/5"></div>
                 <div className="w-20 h-24 bg-white/10 rounded border border-white/5"></div>
               </div>
            </div>

            <div className="p-5 bg-card">
              <h3 className="font-bold text-lg">{tpl.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{tpl.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}