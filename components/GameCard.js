
import React from 'react';

const h = React.createElement;

export default function GameCard({ game, onPlay }) {
  return h('div', {
    className: "cyber-card group cursor-pointer overflow-hidden glitch",
    onClick: () => onPlay(game)
  }, [
    h('div', { className: "relative h-44 overflow-hidden" }, [
      h('img', {
        src: game.thumbnail,
        alt: game.title,
        className: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
      }),
      h('div', { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" }),
      h('div', { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500/10 backdrop-blur-[2px]" }, [
        h('span', { className: "bg-black text-cyan-500 border border-cyan-500 px-6 py-2 font-black font-orbitron text-[10px] tracking-widest uppercase italic" }, "Connect_Node")
      ])
    ]),
    h('div', { className: "p-4 relative" }, [
      h('div', { className: "flex justify-between items-start mb-2" }, [
        h('h3', { className: "text-sm font-bold text-white font-orbitron group-hover:neon-text-cyan transition-colors uppercase italic" }, game.title),
        h('span', { className: "text-[8px] bg-cyan-900/20 text-cyan-500 border border-cyan-900/30 px-1.5 py-0.5 font-mono uppercase tracking-tighter" }, game.category)
      ]),
      h('p', { className: "text-slate-500 text-[10px] line-clamp-2 font-mono italic leading-relaxed" }, game.description),
      h('div', { className: "mt-4 pt-3 border-t border-slate-800 flex justify-between text-[8px] text-slate-700 font-mono" }, [
        h('span', null, `LINK: ${game.id.toUpperCase()}`),
        h('span', null, "SEC_LVL: 04")
      ])
    ])
  ]);
}
