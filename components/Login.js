
import React, { useState } from 'react';

const h = React.createElement;

export default function Login({ onLogin }) {
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

  return h('div', { className: "min-h-screen flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden" }, [
    h('div', { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent opacity-50" }),
    h('div', { className: "max-w-md w-full cyber-card p-10 shadow-2xl relative z-10 overflow-hidden" }, [
      h('div', { className: "absolute top-0 right-0 p-2 text-[8px] text-cyan-900 font-mono" }, "ENCRYPTED_AUTH"),
      h('div', { className: "text-center relative mb-10" }, [
        h('h1', { className: "text-3xl font-black font-orbitron text-white italic tracking-tighter" }, [
          "ISAAC", h('span', { className: "text-cyan-500" }, "GAMES")
        ]),
        h('p', { className: "text-slate-500 font-mono text-[9px] uppercase tracking-[0.2em] mt-2" }, "Neural Identity Verification")
      ]),
      h('form', { className: "space-y-6", onSubmit: handleSubmit }, [
        h('div', { className: "relative" }, [
          h('div', { className: "absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 shadow-[0_0_8px_cyan]" }),
          h('input', {
            type: "password",
            required: true,
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: `block w-full px-6 py-4 bg-slate-900/50 border ${error ? 'border-red-500' : 'border-cyan-900/30'} text-white placeholder-slate-700 focus:outline-none focus:border-cyan-500 transition-all font-mono text-sm uppercase`,
            placeholder: "Enter_Access_Key"
          }),
          error && h('p', { className: "text-red-500 text-[9px] mt-2 font-mono uppercase text-center animate-pulse" }, "Auth_Error: Key_Mismatch")
        ]),
        h('button', {
          type: "submit",
          className: "w-full bg-cyan-600 hover:bg-cyan-500 text-black py-4 font-black font-orbitron uppercase text-sm tracking-widest skew-x-[-10deg] transition-all"
        }, "Authenticate")
      ]),
      h('div', { className: "mt-12 flex justify-between text-[8px] font-mono text-slate-700 uppercase" }, [
        h('span', null, "S_KEY: 0x82...F1"),
        h('span', null, "Status: Protected")
      ])
    ])
  ]);
}
