import { create } from 'zustand'
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ClientInfo {
  companyName: string
  industry: string
  employeeCount: string
  annualRevenue: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

interface AxisScores {
  finance: number
  operations: number
  marketing: number
}

interface DiagnosticStore {
  // Estado existente
  currentStep: number
  clientInfo: ClientInfo
  responses: Record<string, any>
  scores: AxisScores
  analysis: string | null
  
  // Nuevos campos para persistencia
  currentDiagnosticId: string | null
  isSaving: boolean
  
  // Acciones existentes
  setCurrentStep: (step: number) => void
  setClientInfo: (info: Partial<ClientInfo>) => void
  setResponse: (question: string, answer: any) => void
  setScores: (scores: Partial<AxisScores>) => void
  setAnalysis: (analysis: string) => void
  reset: () => void
  
  // Nuevas acciones para persistencia con Firebase
  saveDiagnostic: (userId: string) => Promise<string>
  loadDiagnostic: (diagnosticId: string) => Promise<void>
  updateDiagnostic: (diagnosticId: string, userId: string) => Promise<void>
}

const initialState = {
  currentStep: 0,
  clientInfo: {
    companyName: '',
    industry: '',
    employeeCount: '',
    annualRevenue: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  responses: {},
  scores: {
    finance: 0,
    operations: 0,
    marketing: 0,
  },
  analysis: null,
  currentDiagnosticId: null,
  isSaving: false,
}

export const useDiagnosticStore = create<DiagnosticStore>((set, get) => ({
  ...initialState,
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setClientInfo: (info) => set((state) => ({
    clientInfo: { ...state.clientInfo, ...info }
  })),
  
  setResponse: (question, answer) => set((state) => ({
    responses: { ...state.responses, [question]: answer }
  })),
  
  setScores: (scores) => set((state) => ({
    scores: { ...state.scores, ...scores }
  })),
  
  setAnalysis: (analysis) => set({ analysis }),
  
  reset: () => set(initialState),
  
  // Guardar diagnóstico en Firebase
  saveDiagnostic: async (userId: string) => {
    const state = get()
    set({ isSaving: true })
    
    try {
      // Generar ID único
      const diagnosticId = doc(collection(db, 'diagnostics')).id
      
      const diagnosticData = {
        userId,
        clientInfo: state.clientInfo,
        responses: state.responses,
        scores: state.scores,
        analysis: state.analysis,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      
      // Guardar en Firestore
      await setDoc(doc(db, 'diagnostics', diagnosticId), diagnosticData)
      
      set({ currentDiagnosticId: diagnosticId })
      return diagnosticId
    } catch (error) {
      console.error('Error guardando diagnóstico:', error)
      throw error
    } finally {
      set({ isSaving: false })
    }
  },
  
  // Cargar diagnóstico desde Firebase
  loadDiagnostic: async (diagnosticId: string) => {
    try {
      const docRef = doc(db, 'diagnostics', diagnosticId)
      const docSnap = await getDoc(docRef)
      
      if (!docSnap.exists()) {
        throw new Error('Diagnóstico no encontrado')
      }
      
      const data = docSnap.data()
      
      set({
        clientInfo: data.clientInfo,
        responses: data.responses,
        scores: data.scores,
        analysis: data.analysis,
        currentDiagnosticId: diagnosticId,
        currentStep: 4, // Ir directamente a resultados
      })
    } catch (error) {
      console.error('Error cargando diagnóstico:', error)
      throw error
    }
  },
  
  // Actualizar diagnóstico existente
  updateDiagnostic: async (diagnosticId: string, userId: string) => {
    const state = get()
    set({ isSaving: true })
    
    try {
      await updateDoc(doc(db, 'diagnostics', diagnosticId), {
        clientInfo: state.clientInfo,
        responses: state.responses,
        scores: state.scores,
        analysis: state.analysis,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error('Error actualizando diagnóstico:', error)
      throw error
    } finally {
      set({ isSaving: false })
    }
  },
}))