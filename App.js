
import React, { useState, useEffect, useMemo } from 'react';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import GameCard from './components/GameCard.js';

const h = React.createElement;

export default function App() {
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
        console.error("Critical error: Database inaccessible", err);
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

  if (!isAuthenticated) return h(Login, { onLogin: handleLogin });

  const renderGameView = () => {
    if (!selectedGame) return null;
    return h('div', { className: "flex flex-col gap-6" }, [
      h('div', { className: "flex items-center justify-between border-b border-cyan-900/50 pb-4" }, [
        h('button', {
          onClick: () => setSelectedGame(null),
          className: "text-cyan-500 hover:text-white flex items-center gap-2 transition-all font-orbitron text-xs tracking-widest"
        }, [h('i', { className: "fas fa-arrow-left" }), " RETURN_TO_BASE"]),
        h('h2', { className: "text-xl font-black font-orbitron neon-text-cyan italic uppercase" }, `${selectedGame.title} // ACTIVE_NODE`),
        h('div', { className: "flex gap-2" }, [
          h('div', { className: "w-2 h-2 bg-cyan-500 animate-pulse" }),
          h('div', { className: "w-2 h-2 bg-pink-500 animate-pulse delay-100" })
        ])
      ]),
      h('div', { className: "grid grid-cols-1 lg:grid-cols-4 gap-6" }, [
        h('div', { className: "lg:col-span-3 aspect-video bg-black border border-cyan-500/30 relative shadow-[0_0_30px_rgba(0,243,255,0.1)]" }, [
          h('iframe', {
            src: selectedGame.embedUrl,
            className: "w-full h-full border-0",
            title: selectedGame.title,
            allowFullScreen: true
          })
        ]),
        h('div', { className: "lg:col-span-1 space-y-6 font-mono text-xs" }, [
          h('div', { className: "bg-slate-900/80 p-5 border border-pink-500/30 shadow-lg" }, [
            h('h3', { className: "text-pink-500 font-bold mb-4 uppercase flex items-center gap-2" }, [
              h('i', { className: "fas fa-terminal" }), " Terminal_Info"
            ]),
            h('div', { className: "space-y-2 text-slate-400" }, [
              h('p', null, [h('span', { className: "text-slate-600" }, "ID: "), selectedGame.id.toUpperCase()]),
              h('p', null, [h('span', { className: "text-slate-600" }, "CAT: "), selectedGame.category.toUpperCase()]),
              h('p', { className: "border-t border-slate-800 pt-2 italic text-slate-300" }, selectedGame.description)
            ])
          ]),
          h('div', { className: "bg-slate-900/80 p-5 border border-cyan-500/30 shadow-lg" }, [
            h('h4', { className: "text-cyan-500 font-bold mb-3 uppercase" }, "Input_Protocols"),
            h('ul', { className: "space-y-2 text-slate-500" }, [
              h('li', null, "[W,A,S,D] - Movement"),
              h('li', null, "[SPACE] - Action_01"),
              h('li', null, "[ENTER] - Submit"),
              h('li', null, "[ESC] - Break_Link")
            ])
          ])
        ])
      ])
    ]);
  };

  const renderLibraryView = () => {
    return h('div', null, [
      h('section', { className: "mb-12 relative overflow-hidden bg-black/40 border border-cyan-500/20 p-8 md:p-12" }, [
        h('div', { className: "relative z-10" }, [
          h('h1', { className: "text-5xl md:text-7xl font-black font-orbitron mb-4 italic neon-text-cyan" }, [
            "ISAAC", h('span', { className: "text-white" }, "GAMES")
          ]),
          h('p', { className: "text-slate-400 font-mono text-sm max-w-xl mb-8 leading-relaxed" }, 
            "NEURAL_LINK ESTABLISHED // ACCESSING UNBLOCKED_DATA_CLUSTER_09. Digital footprint masking active. Latency: 4ms. Enjoy the simulation."
          ),
          h('div', { className: "flex gap-4" }, [
            h('button', {
              onClick: () => {
                const random = games[Math.floor(Math.random() * games.length)];
                if(random) setSelectedGame(random);
              },
              className: "bg-cyan-600 hover:bg-cyan-500 text-black px-8 py-3 font-black font-orbitron uppercase text-sm skew-x-[-10deg] transition-all"
            }, "Random_Link")
          ])
        ]),
        h('div', { className: "absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none select-none text-[20rem]" }, [
          h('i', { className: "fas fa-code" })
        ])
      ]),
      h('div', { className: "flex items-center justify-between mb-8 border-b border-cyan-900/30 pb-2" }, [
        h('h2', { className: "text-lg font-bold font-orbitron neon-text-cyan uppercase" }, "Available_Modules"),
        h('span', { className: "text-slate-600 font-mono text-[10px]" }, `RESOURCES: ${filteredGames.length}`)
      ]),
      loading ? h('div', { className: "flex justify-center py-20 text-cyan-500 animate-pulse font-orbitron uppercase tracking-widest" }, "Decrypting_Data...") :
      filteredGames.length > 0 ? h('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" }, 
        filteredGames.map(game => h(GameCard, { key: game.id, game, onPlay: setSelectedGame }))
      ) : h('div', { className: "text-center py-20 bg-slate-900/30 border border-dashed border-slate-800" }, [
        h('p', { className: "text-slate-600 font-mono italic" }, "No matching nodes found in the current cluster.")
      ])
    ]);
  };

  return h('div', { className: "min-h-screen flex flex-col" }, [
    h(Navbar, { onSearch: setSearchTerm, onFilter: setCategoryFilter, activeCategory: categoryFilter }),
    h('main', { className: "flex-1 max-w-7xl mx-auto w-full p-6" }, selectedGame ? renderGameView() : renderLibraryView()),
    h('footer', { className: "bg-black border-t border-cyan-900/50 py-10 mt-20 px-6" }, [
      h('div', { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8" }, [
        h('div', { className: "flex flex-col items-center md:items-start" }, [
          h('span', { className: "font-black font-orbitron tracking-tighter text-white italic text-lg" }, [
            "ISAAC", h('span', { className: "text-cyan-500" }, "GAMES")
          ]),
          h('p', { className: "text-slate-600 font-mono text-[10px] mt-2 uppercase" }, "Secure_Proxy_V4.0 // User: Guest_01")
        ]),
        h('div', { className: "flex gap-6 text-[10px] font-orbitron text-slate-500 uppercase tracking-widest" }, [
          h('a', { href: "#", className: "hover:text-cyan-400 transition-colors" }, "Nodes"),
          h('a', { href: "#", className: "hover:text-cyan-400 transition-colors" }, "Privacy"),
          h('a', { href: "#", className: "hover:text-cyan-400 transition-colors" }, "Source")
        ])
      ])
    ])
  ]);
}
