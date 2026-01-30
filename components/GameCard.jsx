
import React from 'react';

const GameCard = ({ game, onPlay }) => {
  return (
    <div 
      className="group relative bg-[#0f172a] rounded-sm overflow-hidden border border-cyan-900/30 transition-all duration-500 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] cursor-pointer glitch-hover"
      onClick={() => onPlay(game)}
    >
      {/* Visual Glitch Accents */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-500/10 group-hover:bg-cyan-500/40 transition-colors"></div>
      
      <div className="relative h-44 overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500/10 backdrop-blur-[1px]">
          <span className="bg-black text-cyan-500 border border-cyan-500 px-5 py-2 font-black font-orbitron text-[10px] tracking-[0.2em] uppercase">
            Initialize_Link
          </span>
        </div>
      </div>
      
      <div className="p-4 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-bold text-white font-orbitron group-hover:neon-text-cyan transition-colors uppercase tracking-tight">{game.title}</h3>
          <span className="text-[8px] bg-cyan-900/20 text-cyan-500 border border-cyan-900/30 px-1.5 py-0.5 font-mono uppercase">{game.category}</span>
        </div>
        <p className="text-slate-500 text-[10px] line-clamp-2 font-mono leading-relaxed group-hover:text-slate-400 transition-colors italic">
          {game.description}
        </p>
        
        <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[8px] text-slate-700 font-mono">
           <span>UID: {game.id.toUpperCase()}</span>
           <span className="text-cyan-900 italic">READY_FOR_EXECUTION</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
