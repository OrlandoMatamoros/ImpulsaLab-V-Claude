import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Response } from '@/types/questions';

interface ClientInfo {
  name: string;
  industry: string;
  employeeCount: number;
  annualRevenue?: number;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
}

interface DiagnosticState {
  diagnosticId: string | null;
  currentStep: number;
  isCompleted: boolean;
  clientInfo: ClientInfo;
  responses: Response[];
  preAssessmentScores: any | null;
  scores: any | null;
  aiAnalysis: any | null;
  recommendations: any[] | null;
  
  setDiagnosticId: (id: string) => void;
  setCurrentStep: (step: number) => void;
  setClientInfo: (info: Partial<ClientInfo>) => void;
  addResponse: (response: Response) => void;
  setScores: (scores: any) => void;
  setAIAnalysis: (analysis: any) => void;
  saveProgress: () => Promise<void>;
  reset: () => void;
}

const initialClientInfo: ClientInfo = {
  name: '',
  industry: '',
  employeeCount: 0,
  contactEmail: '',
  contactPhone: '',
  website: ''
};

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set, get) => ({
      diagnosticId: null,
      currentStep: 0,
      isCompleted: false,
      clientInfo: initialClientInfo,
      responses: [],
      preAssessmentScores: null,
      scores: null,
      aiAnalysis: null,
      recommendations: null,

      setDiagnosticId: (id) => set({ diagnosticId: id }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setClientInfo: (info) => set((state) => ({
        clientInfo: { ...state.clientInfo, ...info }
      })),
      addResponse: (response) => set((state) => ({
        responses: [...state.responses, response]
      })),
      setScores: (scores) => set({ scores }),
      setAIAnalysis: (analysis) => set({ aiAnalysis: analysis }),
      
      saveProgress: async () => {
        console.log('Guardando progreso...');
      },
      
      reset: () => set({
        diagnosticId: null,
        currentStep: 0,
        isCompleted: false,
        clientInfo: initialClientInfo,
        responses: [],
        preAssessmentScores: null,
        scores: null,
        aiAnalysis: null,
        recommendations: null
      })
    }),
    {
      name: 'diagnostic-storage'
    }
  )
);