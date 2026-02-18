import React, { useState } from 'react';
import { 
  Shield, Lock, Eye, Activity, AlertTriangle, FileText, 
  CheckCircle, XCircle, AlertCircle, Download, ArrowRight, 
  TrendingUp, Users, Server, Database 
} from 'lucide-react';

const SecureChatComparator = () => {
  const [activeTab, setActiveTab] = useState('accueil');
  const [selectedApp, setSelectedApp] = useState('signal');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [attackSimulation, setAttackSimulation] = useState(null);

  const simulateSignalProtocol = () => {
    setSimulationRunning(true);
    setMessages([]);
    
    const steps = [
      { step: 1, action: "Génération de la paire de clés (Identity Key)", detail: "Clé X25519 permanente pour l'identité", time: 100 },
      { step: 2, action: "Génération des clés éphémères (Ephemeral Keys)", detail: "Clés temporaires pour cette session uniquement", time: 200 },
      { step: 3, action: "X3DH: Triple échange Diffie-Hellman", detail: "3 échanges DH pour sécurité renforcée", time: 300 },
      { step: 4, action: "Dérivation de la clé racine (Root Key)", detail: "KDF (Key Derivation Function) appliquée", time: 400 },
      { step: 5, action: "Double Ratchet: Création clé de chaîne", detail: "Renouvellement constant des clés", time: 500 },
      { step: 6, action: "Chiffrement du message avec AES-256", detail: "Chiffrement symétrique du contenu", time: 600 },
      { step: 7, action: "✓ Message chiffré E2EE envoyé", detail: "Perfect Forward Secrecy garantie", time: 700 }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, step]);
        if (index === steps.length - 1) setSimulationRunning(false);
      }, step.time);
    });
  };

  const generateMetadata = (app) => {
    const baseMetadata = [
      { type: "Horodatage", signal: "Minimisé", telegram: "Collecté complet", whatsapp: "Collecté + analysé" },
      { type: "Adresse IP", signal: "Non stockée", telegram: "Stockée serveurs", whatsapp: "Stockée + partagée" },
      { type: "Contacts", signal: "Hachés (SGX)", telegram: "Stockés cloud plaintext", whatsapp: "Partagés avec Meta" },
      { type: "Graphe social", signal: "Non construit", telegram: "Complet (serveurs)", whatsapp: "Complet + Meta Graph" },
      { type: "Durée appels", signal: "Non stockée", telegram: "Stockée indéfiniment", whatsapp: "Stockée + analysée" },
      { type: "Fréquence messages", signal: "Non analysée", telegram: "Analysée pour stats", whatsapp: "Analysée + Meta Ads" },
      { type: "Localisation GPS", signal: "Non collectée", telegram: "Si partagée", whatsapp: "Collectée + Meta" },
      { type: "Device Info", signal: "Minimale", telegram: "Complète", whatsapp: "Complète + fingerprint" },
      { type: "Groupes/Channels", signal: "Chiffrés", telegram: "Métadonnées visibles", whatsapp: "Métadonnées + Meta" },
      { type: "Patterns comportement", signal: "Non tracés", telegram: "Partiellement", whatsapp: "Tracés + ML Meta" }
    ];
    setMetadata(baseMetadata);
  };

  const simulateAttack = (attackType) => {
    const attacks = {
      mitm: {
        name: "Man-in-the-Middle (MitM)",
        description: "Interception des communications via Wi-Fi public compromis ou IMSI catcher",
        signal: { success: false, reason: "E2EE + authentification cryptographique (Safety Numbers)", details: "L'attaquant voit uniquement du trafic chiffré impossible à déchiffrer" },
        telegram: { success: true, reason: "Messages normaux (non-Secret Chats) interceptables", details: "Chiffrement client-serveur uniquement, serveur peut lire" },
        whatsapp: { success: false, reason: "E2EE Signal Protocol protège le contenu", details: "Mais métadonnées (qui, quand, durée) toujours exposées" }
      },
      metadata: {
        name: "Analyse de Métadonnées",
        description: "Construction du graphe social et patterns de communication",
        signal: { success: false, reason: "Sealed Sender + minimisation stricte", details: "Impossible de construire graphe social complet" },
        telegram: { success: true, reason: "Métadonnées complètes stockées serveurs", details: "Graphe social, fréquences, horaires tous accessibles" },
        whatsapp: { success: true, reason: "Métadonnées partagées avec Meta pour publicité", details: "Graphe social détaillé + corrélation Facebook/Instagram" }
      },
      pegasus: {
        name: "Logiciel Espion (Pegasus/FinFisher)",
        description: "Compromission complète du terminal mobile (zero-click exploit)",
        signal: { success: true, reason: "E2EE contourné au niveau terminal", details: "Aucun E2EE ne protège contre compromission de l'appareil" },
        telegram: { success: true, reason: "Accès complet messages + clés", details: "Cloud sync permet aussi accès via serveurs compromis" },
        whatsapp: { success: true, reason: "Keylogging, screenshots, accès caméra/micro", details: "Backup non-E2EE = vulnérabilité additionnelle" }
      },
      server: {
        name: "Compromission Serveurs",
        description: "Attaquant obtient accès aux serveurs de l'application",
        signal: { success: false, reason: "Messages E2EE jamais déchiffrés serveur", details: "Serveur ne voit que metadata minimales" },
        telegram: { success: true, reason: "Messages normaux stockés déchiffrés", details: "Secret Chats protégés mais 99% messages vulnérables" },
        whatsapp: { success: false, reason: "E2EE empêche lecture serveur", details: "Mais métadonnées complètes accessibles" }
      }
    };
    setAttackSimulation(attacks[attackType]);
  };

  const apps = {
    signal: { name: "Signal", icon: "🔵", e2ee: "100%", protocol: "Signal Protocol", metadata: "Minimales", openSource: "Total", modele: "Non-profit", users: "40M" },
    telegram: { name: "Telegram", icon: "✈️", e2ee: "Optionnel", protocol: "MTProto 2.0", metadata: "Extensives", openSource: "Client uniquement", modele: "Freemium", users: "900M" },
    whatsapp: { name: "WhatsApp", icon: "💬", e2ee: "100%", protocol: "Signal Protocol", metadata: "Extensives + Meta", openSource: "Fermé", modele: "Meta", users: "2B+" }
  };

  const comparaisonData = [
    { critere: "E2EE par défaut", signal: "✓ Oui (100%)", telegram: "✗ Non (optionnel)", whatsapp: "✓ Oui (100%)", best: "signal" },
    { critere: "Protocole", signal: "Signal (gold standard)", telegram: "MTProto 2.0 (propriétaire)", whatsapp: "Signal (sous licence)", best: "signal" },
    { critere: "Open Source", signal: "✓ Total", telegram: "~ Client uniquement", whatsapp: "✗ Fermé", best: "signal" },
    { critere: "Métadonnées", signal: "✓ Minimales", telegram: "✗ Extensives", whatsapp: "✗ Extensives + Meta", best: "signal" },
    { critere: "Modèle économique", signal: "✓ Non-profit", telegram: "~ Freemium", whatsapp: "✗ Monétisation Meta", best: "signal" },
    { critere: "Partage données", signal: "✓ Aucun", telegram: "~ Flou", whatsapp: "✗ Avec Meta", best: "signal" },
    { critere: "Audits sécurité", signal: "✓ Multiples", telegram: "~ Limités", whatsapp: "✗ Impossible", best: "signal" },
    { critere: "Forward Secrecy", signal: "✓ Perfect", telegram: "~ Secret Chats", whatsapp: "✓ Oui", best: "signal" },
    { critere: "Multi-device", signal: "✓ Oui", telegram: "✓ Natif", whatsapp: "~ Limité", best: "telegram" },
    { critere: "Backup", signal: "✓ E2EE", telegram: "✗ Non-E2EE", whatsapp: "✗ Non-E2EE", best: "signal" },
    { critere: "Résistance censure", signal: "~ Moyenne", telegram: "✓ Excellente", whatsapp: "~ Moyenne", best: "telegram" },
    { critere: "Utilisateurs", signal: "40M", telegram: "900M", whatsapp: "2B+", best: "whatsapp" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">SecureChat Comparator</h1>
                <p className="text-sm text-gray-400">Analyse Comparative - Signal vs Telegram vs WhatsApp</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">DIYE Ousmane</p>
              <p className="text-gray-400">N00847720221</p>
              <p className="text-xs text-blue-300 mt-1">Décembre 2024</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'accueil', label: 'Accueil', icon: Shield, type: 'tab' },
              { id: 'protocole', label: 'Protocole Signal', icon: Lock, type: 'tab' },
              { id: 'metadata', label: 'Métadonnées', icon: Eye, type: 'tab' },
              { id: 'comparaison', label: 'Comparaison', icon: Activity, type: 'tab' },
              { id: 'menaces', label: 'Menaces', icon: AlertTriangle, type: 'tab' },
              { id: 'simulation', label: 'Simulation 3D', icon: Activity, type: 'link', href: '/simulation/simulation.html' }
            ].map(tab => {
              const Icon = tab.icon;
              
              if (tab.type === 'link') {
                return (
                  <a
                    key={tab.id}
                    href={tab.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </a>
                );
              }
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 border-b-2 border-blue-400 text-blue-300'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'accueil' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Bienvenue dans SecureChat Comparator
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
                Démonstration interactive des protocoles de sécurité et politiques de confidentialité 
                des principales applications de messagerie
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  4+ milliards d'utilisateurs
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Enjeux critiques de sécurité
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(apps).map(([key, app]) => (
                <div 
                  key={key} 
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all hover:scale-105 cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">{app.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{app.name}</h3>
                    <p className="text-xs text-gray-500">{app.users} utilisateurs</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">E2EE:</span>
                      <span className={`font-semibold ${app.e2ee === '100%' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {app.e2ee}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Protocole:</span>
                      <span className="text-xs text-gray-300">{app.protocol}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Métadonnées:</span>
                      <span className={`font-semibold ${
                        app.metadata === 'Minimales' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {app.metadata}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Open Source:</span>
                      <span className={`font-semibold ${
                        app.openSource === 'Total' ? 'text-green-400' : 
                        app.openSource === 'Fermé' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {app.openSource}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Modèle:</span>
                      <span className="text-xs text-gray-300">{app.modele}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Objectifs de cette Démonstration
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                {[
                  "Simuler le fonctionnement réel du protocole Signal (X3DH + Double Ratchet)",
                  "Visualiser la collecte et l'impact des métadonnées sur la vie privée",
                  "Comparer objectivement les forces et faiblesses de chaque application",
                  "Démontrer concrètement les vulnérabilités face aux différentes menaces"
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 font-bold">{i + 1}</span>
                    </div>
                    <div><strong className="text-white">{obj.split(' ')[0]}</strong> {obj.substring(obj.indexOf(' ') + 1)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-blue-300">📅 Événements Marquants</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex gap-3"><span className="text-red-400 font-bold">2013</span><span>Révélations Snowden sur la surveillance NSA</span></li>
                  <li className="flex gap-3"><span className="text-red-400 font-bold">2018</span><span>Scandale Cambridge Analytica (Facebook)</span></li>
                  <li className="flex gap-3"><span className="text-red-400 font-bold">2021</span><span>Modifications WhatsApp-Meta / Exodus vers Signal</span></li>
                  <li className="flex gap-3"><span className="text-red-400 font-bold">2021+</span><span>Révélations Pegasus (NSO Group)</span></li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🎓 Méthodologie</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    "Analyse documentaire: Whitepapers officiels, audits sécurité",
                    "Revue académique: Publications peer-reviewed",
                    "Évaluation technique: Protocoles cryptographiques",
                    "Analyse critique: Politiques et modèles économiques"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                      <span><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protocole' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <Lock className="w-10 h-10 text-blue-400" />
                Simulateur du Protocole Signal
              </h2>
              
              <div className="mb-8 space-y-4">
                <p className="text-gray-300 text-lg">
                  Cette simulation démontre les étapes du <strong className="text-blue-300">protocole Signal</strong> (X3DH + Double Ratchet) 
                  utilisé par Signal et WhatsApp pour garantir le <strong className="text-green-300">chiffrement de bout en bout (E2EE)</strong>.
                </p>
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6">
                  <h4 className="font-bold text-blue-200 mb-3">📘 Rappel Théorique:</h4>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• <strong>X3DH:</strong> Extended Triple Diffie-Hellman - Établissement de session asynchrone</li>
                    <li>• <strong>Double Ratchet:</strong> Renouvellement constant des clés (forward & future secrecy)</li>
                    <li>• <strong>Perfect Forward Secrecy:</strong> Compromission future n'affecte pas le passé</li>
                    <li>• <strong>Future Secrecy:</strong> Capacité d'auto-guérison après compromission</li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                  <p className="text-sm text-green-200">
                    <strong>✓ Validation:</strong> Le protocole Signal est considéré comme le <strong>"gold standard"</strong> de la cryptographie 
                    moderne. Recommandé par Edward Snowden, Bruce Schneier, EFF, et ACLU.
                  </p>
                </div>
              </div>

              <button
                onClick={simulateSignalProtocol}
                disabled={simulationRunning}
                className={`w-full py-6 px-8 rounded-xl font-bold text-xl transition-all shadow-2xl ${
                  simulationRunning
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 transform hover:scale-[1.02]'
                }`}
              >
                {simulationRunning ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Simulation en cours...
                  </span>
                ) : (
                  '🚀 Lancer la Simulation du Protocole'
                )}
              </button>

              {messages.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl font-bold mb-6 text-blue-300 flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Étapes d'Exécution du Protocole:
                  </h3>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-black/40 to-blue-900/20 border border-blue-400/30 rounded-xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                          {msg.step}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-lg mb-2">{msg.action}</p>
                          <p className="text-sm text-gray-400">{msg.detail}</p>
                        </div>
                        {msg.step === 7 && <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {messages.length === 7 && (
                <div className="mt-6 bg-green-500/10 border border-green-400/30 rounded-xl p-6">
                  <h4 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Message Chiffré avec Succès
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                    {[
                      "Le message est maintenant protégé par E2EE",
                      "Seuls l'émetteur et le destinataire peuvent le lire",
                      "Chaque message utilise une clé unique (Double Ratchet)",
                      "Perfect Forward Secrecy: compromission future sans impact"
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-yellow-300 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Comparaison avec MTProto (Telegram)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6">
                  <h4 className="font-bold text-blue-300 mb-4 text-xl">Signal Protocol ✓</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {[
                      "E2EE activé par défaut (100% des messages)",
                      "Protocole éprouvé et audité par des experts indépendants",
                      "Perfect Forward Secrecy garanti",
                      "Open source complet (client + serveur)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-6">
                  <h4 className="font-bold text-yellow-300 mb-4 text-xl">MTProto ⚠️</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {[
                      "E2EE optionnel uniquement (Secret Chats)",
                      "Protocole propriétaire \"maison\" (critiqué)",
                      "PFS non activé par défaut",
                      "Code serveur fermé (non auditable)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metadata' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <Eye className="w-10 h-10 text-purple-400" />
                Analyse des Métadonnées Collectées
              </h2>

              <div className="mb-8 bg-red-500/10 border border-red-400/30 rounded-lg p-6">
                <h3 className="font-bold text-red-200 mb-3 text-lg">⚠️ Citation Importante:</h3>
                <p className="text-2xl italic text-gray-200 mb-3">
                  "Nous tuons des gens sur la base de métadonnées"
                </p>
                <p className="text-sm text-gray-400">— Michael Hayden, ex-directeur NSA/CIA</p>
                <p className="text-sm text-red-200 mt-4">
                  Cette citation illustre l'importance critique des métadonnées dans la surveillance de masse.
                  Même avec E2EE parfait, les métadonnées révèlent énormément d'informations.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(apps).map(([key, app]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedApp(key);
                      generateMetadata(key);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedApp === key 
                        ? 'border-blue-400 bg-blue-500/20 scale-105' 
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="text-4xl mb-3">{app.icon}</div>
                    <div className="font-bold text-lg">{app.name}</div>
                    <div className="text-xs text-gray-400 mt-1">Cliquez pour analyser</div>
                  </button>
                ))}
              </div>

              {metadata.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-purple-300 mb-4">
                    Métadonnées Collectées - Tableau Comparatif:
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-white/10 rounded-lg">
                      <thead className="bg-white/5">
                        <tr className="border-b-2 border-white/20">
                          <th className="text-left p-4 font-bold text-base">Type de Données</th>
                          <th className="text-left p-4 font-bold text-base text-blue-300">Signal</th>
                          <th className="text-left p-4 font-bold text-base text-sky-300">Telegram</th>
                          <th className="text-left p-4 font-bold text-base text-green-300">WhatsApp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metadata.map((row, idx) => (
                          <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <td className="p-4 font-medium">{row.type}</td>
                            <td className={`p-4 ${
                              row.signal.includes('Non') || row.signal.includes('Minimisé') || row.signal.includes('Hachés')
                                ? 'text-green-400 font-semibold'
                                : 'text-red-400'
                            }`}>
                              {row.signal}
                            </td>
                            <td className={`p-4 ${
                              row.telegram.includes('Stocké') || row.telegram.includes('Complet') || row.telegram.includes('Analysée')
                                ? 'text-red-400 font-semibold'
                                : 'text-green-400'
                            }`}>
                              {row.telegram}
                            </td>
                            <td className={`p-4 ${
                              row.whatsapp.includes('Meta') || row.whatsapp.includes('Partagés')
                                ? 'text-red-400 font-semibold'
                                : row.whatsapp.includes('Stocké')
                                ? 'text-yellow-400'
                                : 'text-green-400'
                            }`}>
                              {row.whatsapp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 bg-purple-500/10 border border-purple-400/30 rounded-xl p-6">
                    <h4 className="font-bold text-purple-300 mb-4 text-xl">
                      📊 Impact sur la Vie Privée:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      {[
                        { icon: Database, title: "Graphe social:", text: "Révèle votre réseau complet de contacts et relations" },
                        { icon: Activity, title: "Patterns temporels:", text: "Habitudes de vie, heures de sommeil, fuseaux horaires" },
                        { icon: Server, title: "Localisation:", text: "Déplacements et positions géographiques" },
                        { icon: TrendingUp, title: "Analyse comportementale:", text: "Modèles de communication et prédictions" }
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="flex items-start gap-3">
                            <Icon className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                            <div><strong>{item.title}</strong> {item.text}</div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-red-300 font-semibold mt-6 text-base p-4 bg-red-500/10 rounded-lg border border-red-400/30">
                      ⚠️ ATTENTION: Même avec E2EE parfait, les métadonnées révèlent énormément d'informations sensibles !
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'comparaison' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <Activity className="w-10 h-10 text-cyan-400" />
                Tableau Comparatif Complet
              </h2>

              <p className="text-gray-300 mb-8 text-lg">
                Comparaison détaillée sur 12 critères de sécurité, confidentialité et fonctionnalités.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/10 rounded-lg">
                  <thead className="bg-white/5">
                    <tr className="border-b-2 border-white/20">
                      <th className="text-left p-4 font-bold text-base">Critère</th>
                      <th className="text-left p-4 font-bold text-base text-blue-300">Signal</th>
                      <th className="text-left p-4 font-bold text-base text-sky-300">Telegram</th>
                      <th className="text-left p-4 font-bold text-base text-green-300">WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparaisonData.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium">{row.critere}</td>
                        <td className={`p-4 ${row.best === 'signal' ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                          {row.signal}
                        </td>
                        <td className={`p-4 ${row.best === 'telegram' ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                          {row.telegram}
                        </td>
                        <td className={`p-4 ${row.best === 'whatsapp' ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                          {row.whatsapp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6">
                  <h3 className="font-bold text-green-300 text-xl mb-3 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Excellent
                  </h3>
                  <p className="text-sm text-gray-300">Protection maximale de la vie privée et sécurité optimale</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-6">
                  <h3 className="font-bold text-yellow-300 text-xl mb-3 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    Moyen/Limité
                  </h3>
                  <p className="text-sm text-gray-300">Protection partielle ou avec réserves importantes</p>
                </div>
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-6">
                  <h3 className="font-bold text-red-300 text-xl mb-3 flex items-center gap-2">
                    <XCircle className="w-6 h-6" />
                    Insuffisant
                  </h3>
                  <p className="text-sm text-gray-300">Protection faible ou absente, risques significatifs</p>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">🎯 Recommandations par Profil d'Utilisateur</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/30 rounded-xl p-6 border border-blue-400/20">
                    <h4 className="font-bold text-blue-300 mb-3 text-lg">👤 Haut Risque</h4>
                    <p className="text-sm text-gray-400 mb-4">Journalistes, activistes, dissidents, avocats</p>
                    <div className="text-4xl mb-3">🔵</div>
                    <p className="font-bold text-green-300 text-lg">SIGNAL OBLIGATOIRE</p>
                    <p className="text-xs text-gray-400 mt-3">
                      Minimisation métadonnées maximale + Registration Lock + Messages éphémères
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-6 border border-sky-400/20">
                    <h4 className="font-bold text-sky-300 mb-3 text-lg">👥 Grand Public</h4>
                    <p className="text-sm text-gray-400 mb-4">Usage quotidien, famille, amis</p>
                    <div className="text-4xl mb-3">🔵 / ✈️ / 💬</div>
                    <p className="font-bold text-yellow-300 text-lg">CHOIX MULTIPLE</p>
                    <p className="text-xs text-gray-400 mt-3">
                      Selon priorité: confidentialité (Signal) ou fonctionnalités (Telegram)
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-6 border border-green-400/20">
                    <h4 className="font-bold text-green-300 mb-3 text-lg">🏢 Entreprises</h4>
                    <p className="text-sm text-gray-400 mb-4">Communications professionnelles</p>
                    <div className="text-4xl mb-3">🔵</div>
                    <p className="font-bold text-blue-300 text-lg">SIGNAL BUSINESS</p>
                    <p className="text-xs text-gray-400 mt-3">
                      Conformité RGPD + Audits réguliers + Formation utilisateurs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menaces' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-10 h-10 text-red-400" />
                Simulateur de Menaces et Attaques
              </h2>

              <p className="text-gray-300 mb-8 text-lg">
                Sélectionnez un type d'attaque pour voir comment chaque application réagit face aux menaces réelles.
                Cette démonstration illustre les limites de chaque solution de sécurité.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { type: 'mitm', icon: '🎯', title: 'Man-in-the-Middle', desc: 'Interception réseau' },
                  { type: 'metadata', icon: '👁️', title: 'Métadonnées', desc: 'Analyse graphe social' },
                  { type: 'pegasus', icon: '🦠', title: 'Pegasus', desc: 'Spyware terminal' },
                  { type: 'server', icon: '🖥️', title: 'Serveurs', desc: 'Compromission' }
                ].map(attack => (
                  <button
                    key={attack.type}
                    onClick={() => simulateAttack(attack.type)}
                    className="bg-red-500/10 border border-red-400/30 rounded-xl p-6 hover:bg-red-500/20 transition-all transform hover:scale-105"
                  >
                    <div className="text-4xl mb-3">{attack.icon}</div>
                    <h3 className="font-bold text-red-300 mb-2 text-lg">{attack.title}</h3>
                    <p className="text-xs text-gray-400">{attack.desc}</p>
                  </button>
                ))}
              </div>

              {attackSimulation && (
                <div className="bg-black/30 border border-white/10 rounded-xl p-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-3">{attackSimulation.name}</h3>
                    <p className="text-gray-400 text-lg">{attackSimulation.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {Object.entries(apps).map(([key, app]) => {
                      const result = attackSimulation[key];
                      return (
                        <div 
                          key={key} 
                          className={`rounded-xl p-6 border-2 ${
                            result.success 
                              ? 'bg-red-500/10 border-red-400/50' 
                              : 'bg-green-500/10 border-green-400/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-4xl">{app.icon}</span>
                              <span className="font-bold text-xl">{app.name}</span>
                            </div>
                            {result.success ? 
                              <XCircle className="w-8 h-8 text-red-400" /> : 
                              <CheckCircle className="w-8 h-8 text-green-400" />
                            }
                          </div>
                          
                          <div className="mb-4">
                            <p className={`text-lg font-bold mb-2 ${
                              result.success ? 'text-red-300' : 'text-green-300'
                            }`}>
                              {result.success ? '⚠️ VULNÉRABLE' : '✓ PROTÉGÉ'}
                            </p>
                            <p className="text-sm text-gray-300 mb-3">
                              <strong>Raison:</strong> {result.reason}
                            </p>
                            <p className="text-xs text-gray-400">
                              {result.details}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 bg-blue-500/10 border border-blue-400/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-blue-200 mb-2 text-lg">Note Importante:</h4>
                        <p className="text-sm text-blue-100">
                          Aucune protection n'est absolue. La sécurité est une <strong>défense en profondeur</strong> 
                          combinant technologie (E2EE), bonnes pratiques (OpSec), et vigilance humaine. 
                          Même Signal ne peut pas protéger contre toutes les attaques, notamment la compromission 
                          physique de l'appareil.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Ce que E2EE protège:
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Contenu des messages</li>
                        <li>• Pièces jointes et médias</li>
                        <li>• Communications vocales/vidéo</li>
                        <li>• Interception réseau (MitM)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold text-red-300 mb-3 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Ce que E2EE ne protège PAS:
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Métadonnées (qui, quand, combien)</li>
                        <li>• Compromission de l'appareil</li>
                        <li>• Screenshots et keyloggers</li>
                        <li>• Ingénierie sociale</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {!attackSimulation && (
                <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-6">
                  <h3 className="font-bold text-orange-300 mb-3 text-xl flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    À propos de Pegasus
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Pegasus est un logiciel espion développé par NSO Group (Israël) capable d'infecter 
                    les smartphones iOS et Android via des exploits "zero-click" (sans interaction utilisateur). 
                    Il contourne complètement E2EE en capturant les données avant chiffrement.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-orange-300">Cibles connues:</strong>
                      <ul className="text-gray-400 mt-2 space-y-1">
                        <li>• Journalistes (Jamal Khashoggi)</li>
                        <li>• Activistes des droits humains</li>
                        <li>• Chefs d'État et diplomates</li>
                        <li>• 50,000+ numéros identifiés</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-orange-300">Capacités:</strong>
                      <ul className="text-gray-400 mt-2 space-y-1">
                        <li>• Accès caméra et microphone</li>
                        <li>• Lecture de tous les messages</li>
                        <li>• Géolocalisation en temps réel</li>
                        <li>• Extraction historique complet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300">
                🛡️ Stratégie de Défense en Profondeur
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Niveau 1: Contenu', color: 'blue', items: ['E2EE activé', 'Perfect Forward Secrecy', 'Authentification mutuelle'] },
                  { title: 'Niveau 2: Métadonnées', color: 'purple', items: ['Minimisation stricte', 'Sealed Sender', 'Pas de graphe social'] },
                  { title: 'Niveau 3: Terminal', color: 'green', items: ['Chiffrement disque', 'Mises à jour régulières', 'Vigilance malware'] }
                ].map((level, i) => (
                  <div key={i} className={`bg-${level.color}-500/10 border border-${level.color}-400/30 rounded-lg p-6`}>
                    <h4 className={`font-bold text-${level.color}-300 mb-3`}>{level.title}</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      {level.items.map((item, j) => <li key={j}>• {item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-black/30 border-t border-white/10 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-blue-300">
              <Shield className="w-6 h-6" />
              <span className="font-bold text-xl">SecureChat Comparator</span>
            </div>
            
            <div className="text-gray-400 text-sm space-y-2">
              <p>Projet de Soutenance - Analyse Comparative de Sécurité</p>
              <p className="font-semibold text-white">DIYE Ousmane (N00847720221)</p>
              <p>Encadreur: ILLY Poulmanogo</p>
              <p>Décembre 2024</p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-blue-300 font-semibold text-lg italic">
                "La vie privée est un droit, pas un privilège"
              </p>
            </div>

            <div className="text-xs text-gray-500 pt-4">
              <p>Technologies: React + Tailwind CSS + Lucide Icons</p>
              <p>Basé sur le mémoire: "Analyse Comparative - Signal vs Telegram vs WhatsApp"</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SecureChatComparator;