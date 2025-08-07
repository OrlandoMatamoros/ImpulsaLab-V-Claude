import { create } from 'zustand';

export interface ClientInfo {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  employees?: string;
  revenue?: string;
  [key: string]: any;
}

export interface DiagnosticResults {
  finance: number;
  operations: number;
  marketing: number;
  overall: number;
  date: string;
  recommendations?: any[];
}

interface DiagnosticStore {
  // Client Info
  clientInfo: ClientInfo;
  setClientInfo: (info: ClientInfo) => void;
  
  // Diagnostic Results
  diagnosticResults: DiagnosticResults | null;
  setDiagnosticResults: (results: DiagnosticResults) => void;
  
  // Scores
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  setScores: (scores: { finance?: number; operations?: number; marketing?: number }) => void;
  
  // Clear all data
  clearDiagnostic: () => void;
}

export const useDiagnosticStore = create<DiagnosticStore>((set) => ({
  // Initial state
  clientInfo: {},
  diagnosticResults: null,
  scores: {
    finance: 50,
    operations: 50,
    marketing: 50,
  },
  
  // Actions
  setClientInfo: (info) => set({ clientInfo: info }),
  
  setDiagnosticResults: (results) => set({ diagnosticResults: results }),
  
  setScores: (newScores) => 
    set((state) => ({
      scores: { ...state.scores, ...newScores }
    })),
  
  clearDiagnostic: () => 
    set({
      clientInfo: {},
      diagnosticResults: null,
      scores: {
        finance: 50,
        operations: 50,
        marketing: 50,
      }
    }),
}));