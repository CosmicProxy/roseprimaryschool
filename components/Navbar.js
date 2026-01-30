
import React from 'react';

const h = React.createElement;

export default function Navbar({ onSearch, onFilter, activeCategory }) {
  const categories = ['All', 'Action', 'Puzzle', 'Arcade', 'Sports', 'Strategy'];

  return h('nav', { className: "sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4" }, [
    h('div', { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6" }, [
      h('div', { className: "flex items-center gap-3" }, [
        h('i', { className: "fas fa-satellite-dish text-cyan-500 animate-pulse" }),
        h('span', { className: "text-xl font-black font-orbitron tracking-tighter text-white italic" }, [
          "ISAAC", h('span', { className: "text-cyan-500" }, "GAMES")
        ])
      ]),
      h('div', { className: "flex-1 w-full max-w-lg relative" }, [
        h('input', {
          type: "text",
          placeholder: "SCAN_DATA_CLUSTERS...",
          className: "w-full bg-slate-900/50 border border-cyan-900/30 rounded-none px-12 py-2 text-xs focus:outline-none focus:border-cyan-500 transition-all text-cyan-100 placeholder-slate-700 font-mono",
          onChange: (e) => onSearch(e.target.value)
        }),
        h('i', { className: "fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-cyan-900" })
      ]),
      h('div', { className: "flex gap-2" }, 
        categories.map((cat) => h('button', {
          key: cat,
          onClick: () => onFilter(cat),
          className: `px-3 py-1 text-[10px] font-bold font-orbitron uppercase transition-all border ${
            activeCategory === cat 
            ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_cyan]' 
            : 'bg-transparent border-slate-800 text-slate-500 hover:text-cyan-700'
          }`
        }, cat))
      )
    ])
  ]);
}
