
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'camvc123') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-md w-full space-y-8 bg-black/60 backdrop-blur-xl p-10 rounded-sm border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative">
        <div className="absolute top-0 right-0 p-2 text-[10px] text-cyan-900 font-mono">ENCRYPTION: ACTIVE</div>
        
        <div className="text-center relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-cyan-500/20 text-6xl font-black font-orbitron pointer-events-none">SECURE</div>
          <h1 className="text-3xl font-black font-orbitron text-white mb-2 tracking-tighter italic">
            ISAAC<span className="text-cyan-500">GAMES</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Awaiting Identity Verification</p>
        </div>
        
        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          <div className="relative group">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 shadow-[0_0_10px_cyan]"></div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full px-6 py-4 bg-slate-900/50 border ${error ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-cyan-900/50'} text-white placeholder-slate-700 focus:outline-none focus:border-cyan-500 transition-all font-mono text-sm`}
              placeholder="ENTER_ACCESS_CODE"
            />
            {error && <p className="text-red-500 text-[10px] mt-2 font-mono uppercase text-center animate-pulse">Critical Error: Invalid Credential</p>}
          </div>

          <button
            type="submit"
            className="w-full cyber-btn py-4 px-4 text-sm font-black text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none transition-all font-orbitron uppercase tracking-[0.2em]"
          >
            Authenticate_User
          </button>
        </form>

        <div className="mt-12 flex justify-between items-center text-[8px] font-mono text-slate-700">
          <span>HOST: DARK_NET_PROX</span>
          <span>S_KEY: 0x882A...FF12</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
