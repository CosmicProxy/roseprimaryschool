
import React from 'react';

const Navbar = ({ onSearch, onFilter, activeCategory }) => {
  const categories = ['All', 'Action', 'Puzzle', 'Arcade', 'Sports', 'Strategy'];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b-2 border-cyan-500/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <i className="fas fa-satellite-dish text-cyan-500 text-2xl animate-pulse"></i>
          </div>
          <span className="text-xl font-black font-orbitron tracking-tighter text-white italic">
            ISAAC<span className="text-cyan-500">GAMES</span>
          </span>
        </div>

        <div className="flex flex-1 w-full max-w-lg mx-4 relative group">
          <input
            type="text"
            placeholder="SCAN_FOR_GAMES..."
            className="w-full bg-slate-900/50 border border-cyan-900/50 rounded-sm px-12 py-2 text-xs focus:outline-none focus:border-cyan-500 transition-all text-cyan-100 placeholder-slate-700 font-mono"
            onChange={(e) => onSearch(e.target.value)}
          />
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-cyan-900 group-focus-within:text-cyan-500 transition-colors"></i>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-cyan-900 font-mono">SEARCH_V1</div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilter(cat)}
              className={`px-4 py-1 rounded-sm text-[10px] font-bold font-orbitron tracking-widest uppercase transition-all border ${
                activeCategory === cat 
                ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
                : 'bg-transparent border-slate-800 text-slate-500 hover:border-cyan-900 hover:text-cyan-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
