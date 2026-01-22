// ============================================
// IMPULSA LAB - APP NAVIGATOR
// ============================================

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LeadGateScreen, DiagnosticWizardScreen, ResultsScreen } from '../screens';
import { RootStackParamList } from './types';
import { useDiagnosticStore } from '../store/diagnosticStore';
import { loadDiagnosticProgress } from '../services/storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Loading Screen
const LoadingScreen: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-primary-600">
    <ActivityIndicator size="large" color="white" />
    <Text className="text-white mt-4 text-lg">Cargando...</Text>
  </View>
);

export const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('LeadGate');

  const setLeadData = useDiagnosticStore(state => state.setLeadData);
  const clearAnswers = useDiagnosticStore(state => state.clearAnswers);
  const addAnswer = useDiagnosticStore(state => state.addAnswer);
  const setCurrentQuestionIndex = useDiagnosticStore(state => state.setCurrentQuestionIndex);
  const setResult = useDiagnosticStore(state => state.setResult);
  const setHydrated = useDiagnosticStore(state => state.setHydrated);

  // Hydrate store from AsyncStorage
  useEffect(() => {
    const hydrateStore = async () => {
      try {
        const progress = await loadDiagnosticProgress();

        // If we have a completed result, go to Results
        if (progress.result) {
          if (progress.leadData) setLeadData(progress.leadData);
          setResult(progress.result);
          setInitialRoute('Results');
        }
        // If we have partial progress, continue from where we left
        else if (progress.leadData && progress.answers.length > 0) {
          setLeadData(progress.leadData);
          clearAnswers();
          progress.answers.forEach(answer => addAnswer(answer));
          setCurrentQuestionIndex(progress.currentIndex);
          setInitialRoute('DiagnosticWizard');
        }
        // If we just have lead data, go to wizard
        else if (progress.leadData) {
          setLeadData(progress.leadData);
          setInitialRoute('DiagnosticWizard');
        }

        setHydrated(true);
      } catch (error) {
        console.error('Error hydrating store:', error);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateStore();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#f9fafb' },
        }}
      >
        <Stack.Screen
          name="LeadGate"
          component={LeadGateScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="DiagnosticWizard"
          component={DiagnosticWizardScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            animation: 'fade_from_bottom',
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
