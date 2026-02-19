import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Key, CheckCircle, XCircle, Zap, Play, RefreshCw, Globe } from 'lucide-react';

const BruteForceDemo = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [bruteForceProgress, setBruteForceProgress] = useState(0);
  const [currentKeySize, setCurrentKeySize] = useState(0);
  const [bruteForceAttempts, setBruteForceAttempts] = useState(0);
  const [bruteForceResults, setBruteForceResults] = useState([]);
  const [bruteForcePhase, setBruteForcePhase] = useState("");
  const [attemptedKeys, setAttemptedKeys] = useState([]);

  const generateRandomKeyDisplay = (bits) => {
    const bytes = bits / 8;
    const randomBytes = [];
    for (let i = 0; i < bytes; i++) {
      randomBytes.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
    }
    return randomBytes.join('');
  };

  useEffect(() => {
    if (isSimulating) {
      const keySizes = [64, 128, 192, 256];
      let currentIndex = 0;

      const testKey = (keySize, index) => {
        setCurrentKeySize(keySize);
        setBruteForceProgress(0);
        setBruteForceAttempts(0);
        setAttemptedKeys([]);
        setBruteForcePhase(`Test clé ${keySize}-bit en cours...`);
        setSimulationStep(index);

        const keysPerStep = keySize === 64 ? 5 : keySize === 128 ? 4 : keySize === 192 ? 3 : 2;

        const progressInterval = setInterval(() => {
          setBruteForceProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + (keySize === 256 ? 0.5 : 10);
          });
          
          setBruteForceAttempts(prev => prev + Math.floor(Math.random() * 10000 * (keySize / 64)));
          
          const newKeys = [];
          for (let k = 0; k < keysPerStep; k++) {
            newKeys.push({
              id: Date.now() + Math.random(),
              key: generateRandomKeyDisplay(keySize),
              bits: keySize
            });
          }
          setAttemptedKeys(prev => [...newKeys, ...prev].slice(0, 12));
        }, 500);

        setTimeout(() => {
          clearInterval(progressInterval);
          
          const result = {
            keySize,
            success: keySize < 256,
            time: keySize === 64 ? '2.3 heures' : 
                  keySize === 128 ? '15.7 jours' : 
                  keySize === 192 ? '3.2 années' : 
                  'Impossible (10⁵¹ années)',
            message: keySize < 256 ? `✅ CLÉ ${keySize}-BIT CASSÉE!` : `❌ CLÉ ${keySize}-BIT INCASSABLE`
          };
          
          setBruteForceResults(prev => [...prev, result]);
          
          currentIndex++;
          if (currentIndex < keySizes.length) {
            setTimeout(() => testKey(keySizes[currentIndex], currentIndex), 1000);
          } else {
            setBruteForcePhase('Analyse terminée');
            setSimulationStep(4);
          }
        }, 10000);
      };

      testKey(keySizes[0], 0);
    }
  }, [isSimulating]);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    setBruteForceProgress(0);
    setBruteForceResults([]);
    setBruteForceAttempts(0);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
    setBruteForceProgress(0);
    setBruteForceResults([]);
    setBruteForceAttempts(0);
    setAttemptedKeys([]);
  };

  const steps = [
    { title: '64-bit', desc: 'Faible' },
    { title: '128-bit', desc: 'Moyen' },
    { title: '192-bit', desc: 'Fort' },
    { title: '256-bit', desc: 'Maximum' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-yellow-900 to-orange-900 p-4 md:p-8 text-white relative overflow-hidden">
      <style>{`
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(1deg); }
          50% { transform: translate(0, -20px) rotate(0deg); }
          75% { transform: translate(-10px, -10px) rotate(-1deg); }
        }

        @keyframes noise {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }

        .gradient-mesh {
          background: 
            radial-gradient(circle at 20% 50%, rgba(234, 179, 8, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%);
        }

        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E");
          animation: noise 1s infinite;
          mix-blend-mode: overlay;
        }

        .float-diagonal { animation: float-diagonal 8s ease-in-out infinite; }

        .diagonal-grid {
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(59, 130, 246, 0.03) 20px, rgba(59, 130, 246, 0.03) 40px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(139, 92, 246, 0.03) 20px, rgba(139, 92, 246, 0.03) 40px);
        }

        .gradient-text {
          background: linear-gradient(135deg, #eab308 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #eab308 0%, #f59e0b 100%); border-radius: 3px; }
        
        @keyframes slide-in-key {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .key-attempt {
          animation: slide-in-key 0.3s ease-out;
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 noise-bg" />
        <div className="absolute inset-0 diagonal-grid opacity-30" />
        
        <div className="absolute w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px] -top-48 -left-48 float-diagonal" />
        <div className="absolute w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] top-1/2 right-0 float-diagonal" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-8 py-4 rounded-2xl border border-yellow-500/20 backdrop-blur-xl">
            <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
              <Terminal className="w-10 h-10 text-yellow-400" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-black gradient-text uppercase tracking-tighter">
                Force Brute
              </h1>
              <p className="text-yellow-400 text-sm uppercase tracking-[0.3em] font-bold mt-1">
                Attaque Multi-Clés
              </p>
            </div>
          </div>
        </div>

        {/* 🆕 Contexte Académique */}
        <div className="bg-orange-900/30 border-2 border-orange-500/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇧🇫</span>
            <div className="flex-1">
              <h2 className="text-orange-400 font-bold text-sm mb-1">
                Contexte Académique - Licence 3 Informatique
              </h2>
              <p className="text-sm text-gray-300">
                Démonstration des attaques par force brute sur différentes tailles de clés. 
                Cette simulation illustre pourquoi AES-256 est le standard recommandé 
                par le <strong>RGPD</strong> et l'<strong>Acte CEDEAO A/SA.1/01/10</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Control */}
        <div className="flex justify-center gap-4">
          {!isSimulating && (
            <button
              onClick={startSimulation}
              className="px-8 py-4 rounded-2xl font-black text-sm transition-all uppercase tracking-wider bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:scale-105 shadow-xl shadow-yellow-500/20 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Lancer la Simulation
            </button>
          )}
          {isSimulating && (
            <button
              onClick={resetSimulation}
              className="px-8 py-4 rounded-2xl font-black text-sm bg-slate-700 text-white hover:bg-slate-600 transition-all flex items-center gap-2 uppercase tracking-wider hover:scale-105"
            >
              <RefreshCw className="w-4 h-4" />
              Réinitialiser
            </button>
          )}
        </div>

        {/* Simulation Panel */}
        {isSimulating && (
          <div className="space-y-6">
            <div className="bg-black/40 p-8 rounded-2xl backdrop-blur-sm border border-yellow-500/20 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-bg" />
              
              {/* Current Phase */}
              <div className="mb-6 bg-yellow-950/30 p-4 rounded-xl border border-yellow-500/30">
                <p className="text-yellow-300 font-bold text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 animate-pulse" />
                  {bruteForcePhase}
                </p>
              </div>

              {/* Results Grid */}
              <div className="space-y-4">
                {bruteForceResults.map((result, idx) => (
                  <div 
                    key={idx}
                    className={`p-6 rounded-xl border-2 ${
                      result.success 
                        ? 'bg-red-950/40 border-red-500' 
                        : 'bg-green-950/40 border-green-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {result.success ? (
                          <XCircle className="w-8 h-8 text-red-400" />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        )}
                        <div>
                          <h3 className={`font-black text-lg ${result.success ? 'text-red-400' : 'text-green-400'}`}>
                            {result.message}
                          </h3>
                          <p className="text-slate-400 text-sm">Temps nécessaire: {result.time}</p>
                        </div>
                      </div>
                      <Key className={`w-12 h-12 ${result.success ? 'text-red-500' : 'text-green-500'} opacity-20`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Attempts Visualization */}
              {currentKeySize > 0 && attemptedKeys.length > 0 && (
                <div className="mt-6 bg-slate-950/50 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-white font-black text-xs mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    CLÉS TENTÉES (SIMULATION VISUELLE)
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {attemptedKeys.map((attempt) => (
                      <div 
                        key={attempt.id} 
                        className="key-attempt bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-700 font-mono text-xs text-yellow-300"
                      >
                        {attempt.key}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {currentKeySize > 0 && simulationStep < 4 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-yellow-400 font-black text-xs uppercase tracking-[0.2em]">
                      TEST EN COURS: CLÉ {currentKeySize}-BIT
                    </h4>
                    <span className="text-xs text-yellow-300 font-mono">
                      {bruteForceProgress.toFixed(2)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-300"
                      style={{ width: `${Math.min(bruteForceProgress, 100)}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-slate-400 font-mono">
                    Tentatives: {bruteForceAttempts.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Final Comparison */}
            {simulationStep >= 4 && (
              <div className="mt-6 bg-slate-950/50 p-6 rounded-xl border border-slate-700">
                <h4 className="text-white font-black text-sm mb-4">COMPARAISON FINALE</h4>
                <div className="grid grid-cols-4 gap-4">
                  {[64, 128, 192, 256].map((size) => {
                    const result = bruteForceResults.find(r => r.keySize === size);
                    return (
                      <div key={size} className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center border-2 ${
                          result?.success 
                            ? 'bg-red-500/20 border-red-500' 
                            : 'bg-green-500/20 border-green-500'
                        }`}>
                          {result?.success ? (
                            <XCircle className="w-8 h-8 text-red-400" />
                          ) : (
                            <CheckCircle className="w-8 h-8 text-green-400" />
                          )}
                        </div>
                        <p className={`text-xs font-bold ${
                          result?.success ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {size}-bit
                        </p>
                        <p className="text-[10px] text-slate-500">{result?.time}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Steps */}
            <div className="grid grid-cols-4 gap-3">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                    simulationStep >= idx 
                      ? 'bg-yellow-500/10 border-yellow-500' 
                      : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    simulationStep >= idx ? 'bg-yellow-500 text-white' : 'bg-slate-700 text-slate-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <h5 className="font-bold text-xs text-white mb-1">{step.title}</h5>
                  <p className="text-[10px] text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Info Panels */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-950/60 to-red-900/40 p-6 rounded-2xl border-l-4 border-red-500 backdrop-blur-xl">
                <h4 className="text-red-400 font-black uppercase text-xs tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Danger
                </h4>
                <p className="text-red-200 text-sm leading-relaxed">
                  Les clés 64-bit et 128-bit peuvent être cassées avec des ressources suffisantes. 
                  Seules les clés 256-bit offrent une protection à long terme.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6 rounded-2xl border-l-4 border-green-500 backdrop-blur-xl">
                <h4 className="text-green-400 font-black uppercase text-xs tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Solution
                </h4>
                <p className="text-green-200 text-sm leading-relaxed">
                  AES-256 (2²⁵⁶ combinaisons) est le standard recommandé. 
                  Signal, WhatsApp et Telegram (Secret Chats) utilisent AES-256.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 🆕 Footer avec références */}
        <footer className="mt-12 bg-slate-900/50 border-t-2 border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="text-slate-400 font-bold mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Chapitre 2 - Rapport
              </h4>
              <p className="text-slate-300">Protocoles cryptographiques : AES, RSA, ECDH</p>
            </div>
            <div>
              <h4 className="text-slate-400 font-bold mb-2">🔒 Standards</h4>
              <p className="text-slate-300">NIST recommande AES-256 pour top-secret</p>
            </div>
            <div>
              <h4 className="text-slate-400 font-bold mb-2">⚖️ Réglementation</h4>
              <p className="text-slate-300">RGPD Art. 32 : Chiffrement approprié obligatoire</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BruteForceDemo;