
import React, { useState, useEffect, useMemo } from 'react';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import GameCard from './components/GameCard.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('isaac_auth');
    if (auth === 'true') setIsAuthenticated(true);

    fetch('./games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load games database:", err);
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isaac_auth', 'true');
  };

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || game.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter, games]);

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      <Navbar 
        onSearch={setSearchTerm} 
        onFilter={setCategoryFilter} 
        activeCategory={categoryFilter}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {selectedGame ? (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-cyan-900/50 pb-4">
              <button 
                onClick={() => setSelectedGame(null)}
                className="text-cyan-500 hover:text-white flex items-center gap-2 transition-all font-orbitron text-xs tracking-widest"
              >
                <i className="fas fa-code-branch rotate-180"></i> DISCONNECT_NODE
              </button>
              <h2 className="text-xl font-black font-orbitron neon-text-cyan uppercase italic">
                {selectedGame.title} // CORE_RUNNING
              </h2>
              <div className="flex gap-3">
                 <div className="w-2 h-2 bg-cyan-500 animate-pulse rounded-full"></div>
                 <div className="w-2 h-2 bg-pink-500 animate-pulse rounded-full delay-75"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 aspect-video bg-black rounded-sm border border-cyan-500/30 shadow-[0_0_30px_rgba(0,243,255,0.1)] relative group">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 -mt-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 -mb-1 -mr-1"></div>
                <iframe 
                  src={selectedGame.embedUrl} 
                  className="w-full h-full border-0"
                  title={selectedGame.title}
                  allowFullScreen
                ></iframe>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#0f172a] p-5 border-l-4 border-pink-500 shadow-xl">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2 neon-text-pink font-orbitron uppercase">
                    <i className="fas fa-microchip"></i> SYSTEM_LOGS
                  </h3>
                  <div className="space-y-3 font-mono text-[10px] text-slate-400">
                    <p className="flex justify-between border-b border-slate-800 pb-1">
                      <span>STATUS:</span> <span className="text-green-500">OPERATIONAL</span>
                    </p>
                    <p className="flex justify-between border-b border-slate-800 pb-1">
                      <span>LATENCY:</span> <span className="text-cyan-500">12ms</span>
                    </p>
                    <p className="flex justify-between border-b border-slate-800 pb-1">
                      <span>ENCRYPTION:</span> <span className="text-yellow-500">AES-256</span>
                    </p>
                    <div className="mt-4 p-2 bg-black/40 border border-slate-800 italic">
                      "Neural link established. Game data streaming via proxy tunnel. Enjoy the simulation."
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f172a] p-5 border-l-4 border-cyan-500 shadow-xl">
                  <h4 className="font-bold text-cyan-500 mb-3 text-xs font-orbitron uppercase tracking-widest">Input Protocols</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-slate-500 italic">DIR_INPUT:</span>
                      <span className="bg-slate-900 border border-cyan-900 px-2 py-0.5 rounded text-cyan-300">KEYS_ARROW</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-slate-500 italic">ACT_PRIMARY:</span>
                      <span className="bg-slate-900 border border-cyan-900 px-2 py-0.5 rounded text-cyan-300">KEY_SPACE</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-slate-500 italic">SYS_PAUSE:</span>
                      <span className="bg-slate-900 border border-cyan-900 px-2 py-0.5 rounded text-cyan-300">KEY_P</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <section className="mb-12 relative overflow-hidden rounded-sm border border-cyan-500/20 bg-black/60 p-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] bg-cyan-900/50 text-cyan-400 px-2 py-1 uppercase tracking-widest font-bold">Protocol_V.4.2</span>
                    <span className="text-[10px] text-slate-600 font-mono">LOCATION: DARK_WEB_NODE_09</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black font-orbitron mb-6 leading-tight italic neon-text-cyan">
                  ISAAC<span className="text-white">GAMES</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed font-mono max-w-xl">
                  Bypassing local restrictions. Accessing unblocked game clusters. Your digital footprint has been masked. High performance gaming enabled.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                       const random = games[Math.floor(Math.random() * games.length)];
                       if(random) handlePlayGame(random);
                    }}
                    className="cyber-btn bg-cyan-600 hover:bg-cyan-500 text-black px-8 py-3 font-black font-orbitron uppercase text-sm"
                  >
                    Quick_Start
                  </button>
                  <button className="cyber-btn bg-transparent border border-cyan-500 text-cyan-500 px-8 py-3 font-black font-orbitron uppercase text-sm hover:bg-cyan-500/10">
                    Browse_Encrypted
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                 <i className="fas fa-terminal text-[25rem] -rotate-12 translate-x-20"></i>
              </div>
            </section>

            <div className="flex items-center justify-between mb-8 border-b border-cyan-900/30 pb-2">
              <h2 className="text-lg font-bold font-orbitron neon-text-cyan uppercase flex items-center gap-3">
                <i className="fas fa-stream"></i> {categoryFilter === 'All' ? 'AVAIL_MODULES' : `CAT: ${categoryFilter}`}
              </h2>
              <span className="text-slate-600 font-mono text-[10px]">TOTAL_RESOURCES: [{filteredGames.length}]</span>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 font-orbitron text-cyan-500 animate-pulse">DECRYPTING_DATABASE...</p>
                </div>
            ) : filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onPlay={setSelectedGame}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-black/40 border border-dashed border-slate-800">
                <i className="fas fa-radiation-alt text-6xl text-pink-900/30 mb-4 animate-pulse"></i>
                <h3 className="text-xl font-bold font-orbitron text-slate-700 uppercase">Search_Failure: 404</h3>
                <p className="text-slate-800 font-mono text-xs mt-2">No matching game clusters found in this sector.</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-black border-t-4 border-cyan-900/50 py-12 px-6 mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <i className="fas fa-microchip text-pink-500 text-xl"></i>
              <span className="font-black font-orbitron tracking-widest text-white italic">ISAAC<span className="text-cyan-500">GAMES</span></span>
            </div>
            <p className="text-slate-600 text-[10px] font-mono text-center md:text-left max-w-sm">
              NEURAL_INTERFACE_READY // SECURE_SOCKET_LAYER_ACTIVE // PROJECT_ISAAC_STABLE_V4
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-orbitron text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-cyan-400 transition-colors">Net_Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">DMCA_Void</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Proxy_Request</a>
          </div>
          <div className="flex gap-5">
            <a href="#" className="w-10 h-10 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-cyan-500 hover:text-cyan-500 transition-all bg-black">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="w-10 h-10 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-pink-500 hover:text-pink-500 transition-all bg-black">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
