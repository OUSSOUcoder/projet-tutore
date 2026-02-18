import React, { useState } from 'react';
import { Shield, Lock, Database, Scale, Terminal, ChevronRight, ChevronLeft, Eye, EyeOff, Code, AlertTriangle, TrendingUp, Users, Server, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// ========================================
// COMPOSANTS UTILITAIRES
// ========================================

const TableauExpandable = ({ titre, children, icone: Icone }) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <div className="mb-6">
      <button
        onClick={() => setVisible(!visible)}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 p-4 rounded-xl flex items-center justify-between transition-all duration-300 shadow-lg hover:shadow-xl group"
      >
        <div className="flex items-center gap-3">
          <Icone className="w-6 h-6 text-white" />
          <span className="text-xl font-bold text-white">{titre}</span>
        </div>
        {visible ? 
          <EyeOff className="w-5 h-5 text-white group-hover:scale-110 transition-transform" /> : 
          <Eye className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        }
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          visible ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
          {children}
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ app, score, couleur, emoji }) => {
  const scoreWidth = `${score}%`;
  
  return (
    <div className="group hover:scale-105 transition-all duration-300">
      <div className={`bg-gradient-to-br ${couleur} p-6 rounded-2xl border-2 border-white/20 shadow-xl`}>
        <div className="text-center mb-4">
          <div className="text-5xl mb-3 animate-bounce">{emoji}</div>
          <h3 className="text-3xl font-black text-white mb-2">{app}</h3>
        </div>
        
        <div className="relative h-8 bg-black/30 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
            style={{ width: scoreWidth }}
          >
            <span className="text-white font-bold text-lg">{score}%</span>
          </div>
        </div>
        
        <p className="text-center text-white/80 text-sm font-medium">Score Global de Sécurité</p>
      </div>
    </div>
  );
};

// ========================================
// SLIDES
// ========================================

const PageDeGarde = () => (
  <div className="text-center py-12 animate-fadeIn">
    <div className="mb-10">
      <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
        <Shield className="w-20 h-20 text-white" />
      </div>
    </div>
    
    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 leading-tight animate-slideDown">
      Analyse Comparative de Sécurité
      <br/>
      des Applications de Messagerie
    </h1>
    
    <div className="inline-flex gap-4 mb-12 animate-slideUp">
      <span className="px-6 py-3 bg-cyan-500/20 border-2 border-cyan-400 rounded-full text-2xl font-bold text-cyan-300">Signal</span>
      <span className="px-6 py-3 bg-blue-500/20 border-2 border-blue-400 rounded-full text-2xl font-bold text-blue-300">Telegram</span>
      <span className="px-6 py-3 bg-purple-500/20 border-2 border-purple-400 rounded-full text-2xl font-bold text-purple-300">WhatsApp</span>
    </div>
    
    <div className="mt-16 grid grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-cyan-600/30 to-blue-600/30 p-6 rounded-2xl border border-cyan-400/30 backdrop-blur-sm animate-slideRight">
        <p className="text-cyan-300 font-bold uppercase text-xs mb-2 tracking-wider">Présenté par</p>
        <p className="text-2xl font-black text-white">DIYE Ousmane</p>
        <p className="text-lg text-gray-300 mt-1">N00847720221</p>
        <p className="text-sm text-gray-400 mt-2">Licence 3 Informatique</p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 p-6 rounded-2xl border border-purple-400/30 backdrop-blur-sm animate-slideLeft">
        <p className="text-purple-300 font-bold uppercase text-xs mb-2 tracking-wider">Encadreur</p>
        <p className="text-2xl font-black text-white">M. ILLY Poulmanogo</p>
        <p className="text-lg text-gray-300 mt-1">UNZ - UFR ST</p>
        <p className="text-sm text-gray-400 mt-2">Avril 2026</p>
      </div>
    </div>
  </div>
);

const Problematique = () => (
  <div className="space-y-8 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-8">
      Contexte & Problématique
    </h2>
    
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 p-6 rounded-xl border-2 border-red-500/50 animate-slideUp" style={{animationDelay: '0.1s'}}>
        <Users className="w-12 h-12 text-red-400 mb-3" />
        <p className="text-4xl font-black text-white mb-2">4Mds+</p>
        <p className="text-lg text-gray-300">Utilisateurs de messageries</p>
      </div>
      
      <div className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 p-6 rounded-xl border-2 border-orange-500/50 animate-slideUp" style={{animationDelay: '0.2s'}}>
        <AlertTriangle className="w-12 h-12 text-orange-400 mb-3" />
        <p className="text-xl font-bold text-white mb-2">Risques</p>
        <p className="text-sm text-gray-300">Interception, écoutes, accès non autorisés</p>
      </div>
      
      <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 p-6 rounded-xl border-2 border-cyan-500/50 animate-slideUp" style={{animationDelay: '0.3s'}}>
        <TrendingUp className="w-12 h-12 text-cyan-400 mb-3" />
        <p className="text-xl font-bold text-white mb-2">Enjeux</p>
        <p className="text-sm text-gray-300">Sécurité et confidentialité croissants</p>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-2xl border-2 border-purple-500/50 animate-slideUp" style={{animationDelay: '0.4s'}}>
      <h3 className="text-2xl font-black text-purple-300 mb-4 flex items-center gap-3">
        <AlertCircle className="w-8 h-8" />
        Question de Recherche
      </h3>
      <p className="text-xl text-white leading-relaxed">
        Comment comparer <span className="font-bold text-cyan-400">objectivement</span> Signal, Telegram et WhatsApp en termes de <span className="font-bold text-green-400">sécurité</span> et de <span className="font-bold text-blue-400">confidentialité</span> sur les plans <span className="font-bold text-purple-400">technique</span> et <span className="font-bold text-pink-400">politique</span> ?
      </p>
    </div>
    
    <div className="bg-slate-800/50 p-6 rounded-xl border border-cyan-500/30 animate-slideUp" style={{animationDelay: '0.5s'}}>
      <h3 className="text-xl font-bold text-cyan-300 mb-4">Objectifs de l'Analyse</h3>
      <div className="grid grid-cols-3 gap-4 text-base text-gray-300">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
          <span>Analyser les protocoles cryptographiques</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
          <span>Comparer les politiques de métadonnées</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
          <span>Évaluer l'impact des modèles économiques</span>
        </div>
      </div>
    </div>
  </div>
);

const Generalites = () => (
  <div className="space-y-8 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-6 flex items-center gap-4">
      <Shield className="w-12 h-12 text-green-400"/>
      Fondamentaux de Sécurité
    </h2>
    
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 p-6 rounded-2xl border-2 border-blue-500/50 animate-slideRight" style={{animationDelay: '0.1s'}}>
        <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-black text-blue-300 mb-3">Confidentialité</h3>
        <p className="text-lg text-gray-300">Seul le destinataire légitime accède aux données</p>
      </div>
      
      <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 p-6 rounded-2xl border-2 border-green-500/50 animate-slideUp" style={{animationDelay: '0.2s'}}>
        <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-black text-green-300 mb-3">Intégrité</h3>
        <p className="text-lg text-gray-300">Les données restent inaltérées pendant le transfert</p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 p-6 rounded-2xl border-2 border-purple-500/50 animate-slideLeft" style={{animationDelay: '0.3s'}}>
        <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
          <Server className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-black text-purple-300 mb-3">Disponibilité</h3>
        <p className="text-lg text-gray-300">Le service reste accessible malgré les attaques</p>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-cyan-500/30 animate-slideUp" style={{animationDelay: '0.4s'}}>
      <h3 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-3">
        <Code className="w-7 h-7" />
        Concepts Clés de Cryptographie
      </h3>
      <div className="grid grid-cols-2 gap-4 text-base text-gray-300">
        <div>
          <span className="font-bold text-white">E2EE (End-to-End Encryption) :</span> Chiffrement de bout en bout empêchant l'accès aux intermédiaires
        </div>
        <div>
          <span className="font-bold text-white">PFS (Perfect Forward Secrecy) :</span> Clés de session uniques protégeant les communications passées
        </div>
        <div>
          <span className="font-bold text-white">Protocoles :</span> Signal Protocol, MTProto, algorithmes de chiffrement
        </div>
        <div>
          <span className="font-bold text-white">Métadonnées :</span> Informations sur qui, quand, où et comment communique
        </div>
      </div>
    </div>
  </div>
);

const ComparaisonTechnique = () => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 flex items-center gap-4">
      <Database className="w-12 h-12 text-cyan-400"/>
      Comparaison Technique
    </h2>
    
    <div className="grid grid-cols-3 gap-6 mb-6">
      <ScoreCard app="Signal" score={97} couleur="from-blue-600/30 to-cyan-600/30" emoji="🔵" />
      <ScoreCard app="Telegram" score={44} couleur="from-green-600/30 to-emerald-600/30" emoji="🟢" />
      <ScoreCard app="WhatsApp" score={39} couleur="from-orange-600/30 to-yellow-600/30" emoji="🟠" />
    </div>
    
    <TableauExpandable titre="Tableau Comparatif Complet - Protocoles & Chiffrement" icone={Lock}>
      <div className="overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b-2 border-cyan-500/50">
              <th className="text-left py-3 px-4 text-cyan-300 font-bold">Critère</th>
              <th className="text-center py-3 px-4 text-blue-300 font-bold">Signal</th>
              <th className="text-center py-3 px-4 text-green-300 font-bold">Telegram</th>
              <th className="text-center py-3 px-4 text-orange-300 font-bold">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Protocole</td>
              <td className="py-3 px-4 text-center">Signal Protocol</td>
              <td className="py-3 px-4 text-center">MTProto</td>
              <td className="py-3 px-4 text-center">Signal Protocol</td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">E2EE par défaut</td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">PFS (Perfect Forward Secrecy)</td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><AlertCircle className="w-6 h-6 text-yellow-400 mx-auto" title="Partielle" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Open Source</td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" title="Complet" /></td>
              <td className="py-3 px-4 text-center"><AlertCircle className="w-6 h-6 text-yellow-400 mx-auto" title="Partiel (client seulement)" /></td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Sauvegarde</td>
              <td className="py-3 px-4 text-center text-green-400">Locale chiffrée</td>
              <td className="py-3 px-4 text-center text-red-400">Cloud automatique</td>
              <td className="py-3 px-4 text-center text-orange-400">Cloud (risque)</td>
            </tr>
            <tr className="hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Niveau métadonnées</td>
              <td className="py-3 px-4 text-center text-green-400">Minimales</td>
              <td className="py-3 px-4 text-center text-red-400">Élevées</td>
              <td className="py-3 px-4 text-center text-red-400">Élevées</td>
            </tr>
          </tbody>
        </table>
      </div>
    </TableauExpandable>
    
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div className="bg-blue-600/20 p-4 rounded-xl border border-blue-500/50">
        <p className="font-bold text-blue-300 mb-2">✓ Signal</p>
        <p className="text-gray-300">Confidentialité maximale, minimisation métadonnées</p>
      </div>
      <div className="bg-orange-600/20 p-4 rounded-xl border border-orange-500/50">
        <p className="font-bold text-orange-300 mb-2">△ WhatsApp</p>
        <p className="text-gray-300">Bon chiffrement, collecte massive (Meta)</p>
      </div>
      <div className="bg-red-600/20 p-4 rounded-xl border border-red-500/50">
        <p className="font-bold text-red-300 mb-2">✗ Telegram</p>
        <p className="text-gray-300">E2EE uniquement en "Secret Chats"</p>
      </div>
    </div>
  </div>
);

const ImpactMetadonnees = () => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 flex items-center gap-4">
      <Eye className="w-12 h-12 text-purple-400"/>
      Impact des Métadonnées
    </h2>
    
    <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 p-6 rounded-2xl border-2 border-red-500/50 mb-6">
      <div className="flex items-start gap-4">
        <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0" />
        <div>
          <h3 className="text-2xl font-black text-red-300 mb-3">Qu'est-ce qu'une métadonnée ?</h3>
          <p className="text-lg text-gray-300 mb-4">
            Informations <span className="font-bold text-white">autour</span> du message : qui communique avec qui, quand, depuis où, et à quelle fréquence
          </p>
          <div className="bg-black/30 p-4 rounded-xl border-l-4 border-red-500">
            <p className="text-xl font-bold text-red-200 italic">
              "We kill people based on metadata"
            </p>
            <p className="text-sm text-gray-400 mt-2">— Michael Hayden (ex-directeur NSA/CIA)</p>
          </div>
        </div>
      </div>
    </div>
    
    <TableauExpandable titre="Tableau Comparatif - Types de Métadonnées Collectées" icone={Database}>
      <div className="overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b-2 border-purple-500/50">
              <th className="text-left py-3 px-4 text-purple-300 font-bold">Type de Métadonnée</th>
              <th className="text-center py-3 px-4 text-blue-300 font-bold">Signal</th>
              <th className="text-center py-3 px-4 text-green-300 font-bold">Telegram</th>
              <th className="text-center py-3 px-4 text-orange-300 font-bold">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Liste de contacts stockée</td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Horodatage des messages</td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Adresse IP utilisateur</td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Informations appareil</td>
              <td className="py-3 px-4 text-center text-green-400">Minimales</td>
              <td className="py-3 px-4 text-center text-red-400">Détaillées</td>
              <td className="py-3 px-4 text-center text-red-400">Détaillées</td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Durée des appels</td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Fréquence des messages</td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
            <tr className="hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Partage avec tiers</td>
              <td className="py-3 px-4 text-center text-green-400 font-bold">NON</td>
              <td className="py-3 px-4 text-center text-orange-400">Non (déclaré)</td>
              <td className="py-3 px-4 text-center text-red-400 font-bold">OUI (Meta)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 bg-red-900/30 p-4 rounded-lg border border-red-500/50">
        <p className="text-lg text-red-200 font-bold">⚠️ Constat Important</p>
        <p className="text-base text-gray-300 mt-2">
          Le chiffrement du <span className="font-bold text-white">contenu</span> ne suffit pas. Les métadonnées révèlent déjà beaucoup sur votre identité, vos habitudes et vos relations.
        </p>
      </div>
    </TableauExpandable>
  </div>
);

const ModeleEconomique = () => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-6 flex items-center gap-4">
      <TrendingUp className="w-12 h-12 text-green-400"/>
      Modèles Économiques
    </h2>
    
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 p-6 rounded-2xl border-2 border-blue-500/50 animate-slideUp" style={{animationDelay: '0.1s'}}>
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">🔵</div>
          <h3 className="text-2xl font-black text-blue-300">Signal</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <p className="text-sm font-bold text-blue-200">Type</p>
            <p className="text-lg text-white">Fondation à but non lucratif</p>
          </div>
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <p className="text-sm font-bold text-blue-200">Financement</p>
            <p className="text-lg text-white">Dons uniquement</p>
          </div>
          <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/50">
            <p className="text-sm font-bold text-green-200">Monétisation</p>
            <p className="text-lg text-green-300 font-bold">0 publicité</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 p-6 rounded-2xl border-2 border-green-500/50 animate-slideUp" style={{animationDelay: '0.2s'}}>
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">🟢</div>
          <h3 className="text-2xl font-black text-green-300">Telegram</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <p className="text-sm font-bold text-green-200">Type</p>
            <p className="text-lg text-white">Entreprise privée</p>
          </div>
          <div className="bg-green-500/20 p-3 rounded-lg">
            <p className="text-sm font-bold text-green-200">Financement</p>
            <p className="text-lg text-white">Fondateur + investisseurs</p>
          </div>
          <div className="bg-orange-500/20 p-3 rounded-lg border border-orange-500/50">
            <p className="text-sm font-bold text-orange-200">Monétisation</p>
            <p className="text-lg text-orange-300 font-bold">Freemium</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 p-6 rounded-2xl border-2 border-orange-500/50 animate-slideUp" style={{animationDelay: '0.3s'}}>
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">🟠</div>
          <h3 className="text-2xl font-black text-orange-300">WhatsApp</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-orange-500/20 p-3 rounded-lg">
            <p className="text-sm font-bold text-orange-200">Type</p>
            <p className="text-lg text-white">Filiale Meta (Facebook)</p>
          </div>
          <div className="bg-orange-500/20 p-3 rounded-lg">
            <p className="text-sm font-bold text-orange-200">Financement</p>
            <p className="text-lg text-white">Meta Platforms</p>
          </div>
          <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/50">
            <p className="text-sm font-bold text-red-200">Monétisation</p>
            <p className="text-lg text-red-300 font-bold">Publicité ciblée</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-2xl border-2 border-purple-500/50">
      <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
        <AlertCircle className="w-7 h-7" />
        Impact sur la Vie Privée
      </h3>
      <div className="grid grid-cols-2 gap-6 text-base text-gray-300">
        <div>
          <p className="font-bold text-green-400 mb-2">✓ Modèle à but non lucratif (Signal)</p>
          <p>Pas d'incitation à collecter des données personnelles. Alignement total avec les intérêts des utilisateurs.</p>
        </div>
        <div>
          <p className="font-bold text-red-400 mb-2">✗ Modèle publicitaire (WhatsApp)</p>
          <p>Incitation forte à collecter un maximum de métadonnées pour ciblage publicitaire et partage avec l'écosystème Meta.</p>
        </div>
      </div>
    </div>
  </div>
);

const EnjeuxPolitiques = () => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-6 flex items-center gap-4">
      <Scale className="w-12 h-12 text-red-400"/>
      Enjeux Politiques & Juridiques
    </h2>
    
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 p-6 rounded-2xl border-2 border-blue-500/50">
        <h3 className="text-2xl font-black text-blue-300 mb-4 flex items-center gap-2">
          <Shield className="w-7 h-7" />
          RGPD (Europe)
        </h3>
        <ul className="space-y-3 text-base text-gray-300">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <span><span className="font-bold text-white">Minimisation des données :</span> Collecte uniquement des données nécessaires</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <span><span className="font-bold text-white">Droit à l'oubli :</span> Possibilité de supprimer ses données</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <span><span className="font-bold text-white">Portabilité garantie :</span> Export et transfert des données</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <span><span className="font-bold text-white">Consentement explicite :</span> Autorisation claire requise</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-gradient-to-br from-red-600/30 to-orange-600/30 p-6 rounded-2xl border-2 border-red-500/50">
        <h3 className="text-2xl font-black text-red-300 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-7 h-7" />
          Débat Backdoors
        </h3>
        <div className="space-y-4">
          <div className="bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
            <p className="text-lg font-bold text-orange-300 mb-2">Position Gouvernements</p>
            <p className="text-sm text-gray-300">"Lawful access" nécessaire pour enquêtes et sécurité nationale</p>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-lg font-bold text-blue-300 mb-2">Position Experts Sécurité</p>
            <p className="text-sm text-gray-300">Impossibilité de créer une backdoor "sûre" - compromet tout le système</p>
          </div>
        </div>
      </div>
    </div>
    
    <TableauExpandable titre="Conformité Réglementaire par Application" icone={Scale}>
      <div className="overflow-x-auto">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b-2 border-red-500/50">
              <th className="text-left py-3 px-4 text-red-300 font-bold">Aspect Juridique</th>
              <th className="text-center py-3 px-4 text-blue-300 font-bold">Signal</th>
              <th className="text-center py-3 px-4 text-green-300 font-bold">Telegram</th>
              <th className="text-center py-3 px-4 text-orange-300 font-bold">WhatsApp</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Conformité RGPD</td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><AlertCircle className="w-6 h-6 text-yellow-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><AlertCircle className="w-6 h-6 text-yellow-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Transparence politique données</td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><AlertCircle className="w-6 h-6 text-yellow-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Résistance aux backdoors</td>
              <td className="py-3 px-4 text-center text-green-400 font-bold">Forte</td>
              <td className="py-3 px-4 text-center text-yellow-400">Moyenne</td>
              <td className="py-3 px-4 text-center text-red-400">Faible</td>
            </tr>
            <tr className="hover:bg-slate-700/30 transition-colors">
              <td className="py-3 px-4 font-semibold">Audits indépendants</td>
              <td className="py-3 px-4 text-center"><CheckCircle className="w-6 h-6 text-green-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
              <td className="py-3 px-4 text-center"><XCircle className="w-6 h-6 text-red-400 mx-auto" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </TableauExpandable>
  </div>
);

const Methodologie = () => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-6 flex items-center gap-4">
      <Terminal className="w-12 h-12 text-yellow-400"/>
      Méthodologie & Simulations
    </h2>
    
    <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-6 rounded-2xl border-2 border-yellow-500/50">
      <h3 className="text-2xl font-black text-yellow-300 mb-6">
        Environnement de Simulation Hybride
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Technologies Utilisées
          </h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">•</span>
              <span><span className="font-bold text-white">React.js + Tailwind CSS</span> pour l'interface</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">•</span>
              <span><span className="font-bold text-white">Simulations interactives</span> en temps réel</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">•</span>
              <span><span className="font-bold text-white">HTML5 standalone</span> pour portabilité</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">•</span>
              <span><span className="font-bold text-white">Lucide Icons</span> pour icônes</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Démonstrations Disponibles
          </h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-orange-400">•</span>
              <span>Processus de <span className="font-bold text-white">chiffrement E2EE</span></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-400">•</span>
              <span>Attaque <span className="font-bold text-white">Man-in-the-Middle</span></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-400">•</span>
              <span>Rôle de <span className="font-bold text-white">HTTPS et E2EE</span> sur réseau</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-orange-400">•</span>
              <span>Mécanisme <span className="font-bold text-white">Perfect Forward Secrecy</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-slate-800/50 p-4 rounded-xl border border-cyan-500/30">
        <h4 className="font-bold text-cyan-300 mb-2 text-lg">Analyse Cryptographique</h4>
        <p className="text-sm text-gray-300">Comparaison des protocoles Signal, MTProto et implémentations</p>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-xl border border-purple-500/30">
        <h4 className="font-bold text-purple-300 mb-2 text-lg">Évaluation Métadonnées</h4>
        <p className="text-sm text-gray-300">Mesure des informations collectées par chaque application</p>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-xl border border-pink-500/30">
        <h4 className="font-bold text-pink-300 mb-2 text-lg">Impact Modèles Économiques</h4>
        <p className="text-sm text-gray-300">Analyse de l'influence sur la vie privée des utilisateurs</p>
      </div>
    </div>
  </div>
);

const Recommandations = () => (
  <div className="space-y-6 animate-fadeIn">
    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-6 flex items-center gap-4">
      <CheckCircle className="w-12 h-12 text-green-400"/>
      Recommandations & Conclusion
    </h2>
    
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 p-6 rounded-2xl border-2 border-blue-500/50 hover:scale-105 transition-transform">
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">🔵</div>
          <h3 className="text-2xl font-black text-blue-300 mb-2">Signal</h3>
          <div className="text-3xl font-black text-green-400">Recommandé</div>
        </div>
        <div className="bg-blue-900/30 p-4 rounded-lg">
          <p className="text-base text-gray-300">
            <span className="font-bold text-white">Pour :</span> Communications sensibles, militants, journalistes, professionnels de santé
          </p>
        </div>
        <div className="mt-3 space-y-2 text-sm text-gray-300">
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Confidentialité maximale
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Métadonnées minimales
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Open source auditée
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-orange-600/30 to-yellow-600/30 p-6 rounded-2xl border-2 border-orange-500/50 hover:scale-105 transition-transform">
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">🟠</div>
          <h3 className="text-2xl font-black text-orange-300 mb-2">WhatsApp</h3>
          <div className="text-3xl font-black text-yellow-400">Avec prudence</div>
        </div>
        <div className="bg-orange-900/30 p-4 rounded-lg">
          <p className="text-base text-gray-300">
            <span className="font-bold text-white">Pour :</span> Usage familial et grand public non sensible
          </p>
        </div>
        <div className="mt-3 space-y-2 text-sm text-gray-300">
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            E2EE activé par défaut
          </p>
          <p className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Collecte métadonnées élevée
          </p>
          <p className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Partage données avec Meta
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 p-6 rounded-2xl border-2 border-green-500/50 hover:scale-105 transition-transform">
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">🟢</div>
          <h3 className="text-2xl font-black text-green-300 mb-2">Telegram</h3>
          <div className="text-3xl font-black text-orange-400">Situations limitées</div>
        </div>
        <div className="bg-green-900/30 p-4 rounded-lg">
          <p className="text-base text-gray-300">
            <span className="font-bold text-white">Pour :</span> Grands groupes et fonctionnalités riches
          </p>
        </div>
        <div className="mt-3 space-y-2 text-sm text-gray-300">
          <p className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Fonctionnalités étendues
          </p>
          <p className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            E2EE en Secret Chats uniquement
          </p>
          <p className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Serveurs accèdent aux messages
          </p>
        </div>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-2xl border-2 border-purple-500/50">
      <h3 className="text-2xl font-black text-purple-300 mb-4 flex items-center gap-3">
        <Shield className="w-8 h-8" />
        Conclusion Générale
      </h3>
      <div className="grid grid-cols-2 gap-6 text-base text-gray-300">
        <div>
          <p className="font-bold text-white mb-2">Le choix dépend de :</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">→</span>
              <span>Sensibilité des informations échangées</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">→</span>
              <span>Niveau de confiance dans l'opérateur</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">→</span>
              <span>Modèle de menace personnel</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-white mb-2">Points clés à retenir :</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">→</span>
              <span>E2EE ne protège que le contenu, pas les métadonnées</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">→</span>
              <span>Le modèle économique influence directement la vie privée</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">→</span>
              <span>L'open source permet les audits indépendants</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="text-center mt-8">
      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
        Merci pour votre attention !
      </p>
      <p className="text-lg text-gray-400 mt-2">Questions & Discussion</p>
    </div>
  </div>
);

// ========================================
// COMPOSANT PRINCIPAL
// ========================================

const Presentation = () => {
  const [step, setStep] = useState(0);
  
  const slides = [
    { title: "Page de Garde", component: PageDeGarde, part: "Introduction", color: "cyan" },
    { title: "Problématique", component: Problematique, part: "Chapitre 0", color: "purple" },
    { title: "Fondamentaux", component: Generalites, part: "Chapitre 1", color: "green" },
    { title: "Comparaison Technique", component: ComparaisonTechnique, part: "Chapitre 1", color: "cyan" },
    { title: "Impact Métadonnées", component: ImpactMetadonnees, part: "Chapitre 1", color: "purple" },
    { title: "Modèles Économiques", component: ModeleEconomique, part: "Chapitre 2", color: "green" },
    { title: "Enjeux Politiques", component: EnjeuxPolitiques, part: "Chapitre 2", color: "red" },
    { title: "Méthodologie", component: Methodologie, part: "Chapitre 3", color: "yellow" },
    { title: "Recommandations", component: Recommandations, part: "Conclusion", color: "green" }
  ];
  
  const CurrentSlide = slides[step].component;
  const currentColor = slides[step].color;
  
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    red: 'from-red-500 to-orange-500',
    yellow: 'from-yellow-500 to-orange-500'
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&display=swap');
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from { 
            opacity: 0;
            transform: translateX(-30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideLeft {
          from { 
            opacity: 0;
            transform: translateX(30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-slideRight {
          animation: slideRight 0.8s ease-out;
        }
        
        .animate-slideLeft {
          animation: slideLeft 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center bg-slate-900/90 backdrop-blur-xl p-5 rounded-3xl border border-white/10 mb-6 shadow-2xl">
          <button 
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="p-3 hover:bg-white/10 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="text-center flex-1">
            <p className={`text-xs font-bold bg-gradient-to-r ${colorClasses[currentColor]} bg-clip-text text-transparent uppercase tracking-wider mb-1`}>
              {slides[step].part}
            </p>
            <h3 className="text-2xl font-black text-white">
              {slides[step].title}
            </h3>
            <div className="flex gap-1.5 mt-3 justify-center">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStep(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === step 
                      ? `w-8 bg-gradient-to-r ${colorClasses[currentColor]}` 
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setStep(Math.min(slides.length - 1, step + 1))}
            disabled={step === slides.length - 1}
            className="p-3 hover:bg-white/10 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Contenu */}
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-[40px] p-12 border border-white/5 shadow-2xl min-h-[75vh]">
          <CurrentSlide />
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-base">
            Slide <span className={`font-bold bg-gradient-to-r ${colorClasses[currentColor]} bg-clip-text text-transparent`}>{step + 1}</span> / {slides.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Presentation;