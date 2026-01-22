// ============================================
// IMPULSA LAB - DIAGNOSTIC WIZARD SCREEN (Screen 2)
// ============================================

import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { useDiagnosticStore } from '../store/diagnosticStore';
import { ALL_QUESTIONS } from '../constants/questions';
import { Question, Answer } from '../types';
import {
  calculateDiagnosticResult,
  getDimensionLabel,
  calculateProgress,
} from '../utils/scoring-engine';
import {
  saveDiagnosticProgress,
  saveResultLocally,
} from '../services/storage';
import { saveCompleteDiagnostic } from '../services/firebase';
import { RootStackParamList } from '../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DiagnosticWizard'>;

// Progress Bar Component
const AnimatedProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: progress,
      useNativeDriver: false,
      tension: 40,
      friction: 8,
    }).start();
  }, [progress, animatedWidth]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <Animated.View
        className="h-full bg-primary-500 rounded-full"
        style={{ width: widthInterpolated }}
      />
    </View>
  );
};

// Dimension Badge Component
const DimensionBadge: React.FC<{ dimension: string; isActive: boolean }> = ({
  dimension,
  isActive,
}) => {
  const getIcon = () => {
    switch (dimension) {
      case 'finance':
        return '💰';
      case 'operations':
        return '⚙️';
      case 'marketing':
        return '📣';
      default:
        return '📊';
    }
  };

  return (
    <View
      className={`px-3 py-1 rounded-full flex-row items-center ${
        isActive ? 'bg-primary-100' : 'bg-gray-100'
      }`}
    >
      <Text className="mr-1">{getIcon()}</Text>
      <Text
        className={`text-sm font-medium ${
          isActive ? 'text-primary-700' : 'text-gray-500'
        }`}
      >
        {getDimensionLabel(dimension as 'finance' | 'operations' | 'marketing')}
      </Text>
    </View>
  );
};

// Question Card Component
const QuestionCard: React.FC<{
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string, points: number) => void;
  animatedValue: Animated.Value;
}> = ({ question, selectedOptionId, onSelectOption, animatedValue }) => {
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_WIDTH, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <Animated.View
      className="flex-1 px-6"
      style={{
        transform: [{ translateX }],
        opacity,
      }}
    >
      {/* Question Text */}
      <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <Text className="text-gray-900 text-xl font-semibold leading-7">
          {question.text}
        </Text>
        {question.category === 'CRITICAL' && (
          <View className="flex-row items-center mt-3">
            <Ionicons name="alert-circle" size={16} color="#f59e0b" />
            <Text className="text-amber-600 text-xs ml-1 font-medium">
              Pregunta clave para tu diagnóstico
            </Text>
          </View>
        )}
      </View>

      {/* Options */}
      <View className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => onSelectOption(option.id, option.points)}
              className={`p-4 rounded-xl border-2 flex-row items-center ${
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
              activeOpacity={0.7}
            >
              {/* Radio indicator */}
              <View
                className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                  isSelected ? 'border-primary-500' : 'border-gray-300'
                }`}
              >
                {isSelected && (
                  <View className="w-3 h-3 rounded-full bg-primary-500" />
                )}
              </View>

              {/* Option text */}
              <Text
                className={`flex-1 ${
                  isSelected ? 'text-primary-700 font-medium' : 'text-gray-700'
                }`}
              >
                {option.label}
              </Text>

              {/* Selection checkmark */}
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

// Main Component
export const DiagnosticWizardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Store state
  const leadData = useDiagnosticStore(state => state.leadData);
  const answers = useDiagnosticStore(state => state.answers);
  const currentIndex = useDiagnosticStore(state => state.currentQuestionIndex);
  const addAnswer = useDiagnosticStore(state => state.addAnswer);
  const setCurrentQuestionIndex = useDiagnosticStore(state => state.setCurrentQuestionIndex);
  const setResult = useDiagnosticStore(state => state.setResult);
  const isLoading = useDiagnosticStore(state => state.isLoading);
  const setIsLoading = useDiagnosticStore(state => state.setIsLoading);

  // Animation refs
  const cardAnimation = useRef(new Animated.Value(1)).current;

  // Current question
  const currentQuestion = ALL_QUESTIONS[currentIndex];
  const totalQuestions = ALL_QUESTIONS.length;
  const progress = calculateProgress(currentIndex + 1, totalQuestions);

  // Get selected option for current question
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  const selectedOptionId = currentAnswer?.optionId || null;

  // Handle back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (currentIndex > 0) {
        handlePrevious();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [currentIndex]);

  // Auto-save progress
  useEffect(() => {
    if (leadData) {
      saveDiagnosticProgress(leadData, answers, currentIndex);
    }
  }, [answers, currentIndex, leadData]);

  // Animate card entrance
  const animateCardIn = useCallback(() => {
    cardAnimation.setValue(0);
    Animated.spring(cardAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, [cardAnimation]);

  useEffect(() => {
    animateCardIn();
  }, [currentIndex, animateCardIn]);

  // Handle option selection
  const handleSelectOption = (optionId: string, points: number) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      optionId,
      points,
    };
    addAnswer(answer);
  };

  // Handle next question
  const handleNext = async () => {
    if (!selectedOptionId) {
      Alert.alert('Selección requerida', 'Por favor selecciona una opción para continuar.');
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentIndex + 1);
    } else {
      // Complete diagnostic
      await completeDiagnostic();
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentQuestionIndex(currentIndex - 1);
    }
  };

  // Complete diagnostic and calculate results
  const completeDiagnostic = async () => {
    if (!leadData) {
      Alert.alert('Error', 'No se encontraron los datos del lead.');
      return;
    }

    setIsLoading(true);

    try {
      // Calculate results
      const result = calculateDiagnosticResult(leadData, answers);

      // Save to Firebase
      try {
        await saveCompleteDiagnostic(leadData, result);
      } catch (firebaseError) {
        console.warn('Firebase save failed, continuing with local storage:', firebaseError);
      }

      // Save locally
      await saveResultLocally(result);

      // Update store
      setResult(result);

      // Navigate to results
      navigation.replace('Results');
    } catch (error) {
      console.error('Error completing diagnostic:', error);
      Alert.alert('Error', 'Hubo un problema al procesar tu diagnóstico. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Exit confirmation
  const handleExit = () => {
    Alert.alert(
      'Salir del diagnóstico',
      'Tu progreso se guardará automáticamente. ¿Deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!currentQuestion) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text>Cargando preguntas...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-14 pb-4 border-b border-gray-100">
        {/* Top bar */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={handleExit} className="p-2 -ml-2">
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>

          <DimensionBadge dimension={currentQuestion.dimension} isActive />

          <Text className="text-gray-500 font-medium">
            {currentIndex + 1} / {totalQuestions}
          </Text>
        </View>

        {/* Progress bar */}
        <AnimatedProgressBar progress={progress} />

        {/* Progress text */}
        <Text className="text-center text-gray-400 text-xs mt-2">
          {progress}% completado
        </Text>
      </View>

      {/* Question Card */}
      <View className="flex-1 py-6">
        <QuestionCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelectOption}
          animatedValue={cardAnimation}
        />
      </View>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <View className="flex-row space-x-3">
          {/* Previous Button */}
          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={handlePrevious}
              className="flex-1 py-4 rounded-xl border border-gray-300 flex-row justify-center items-center"
            >
              <Ionicons name="arrow-back" size={20} color="#6b7280" />
              <Text className="text-gray-600 font-semibold ml-2">Anterior</Text>
            </TouchableOpacity>
          )}

          {/* Next/Finish Button */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={isLoading}
            className={`${currentIndex > 0 ? 'flex-1' : 'w-full'} py-4 rounded-xl flex-row justify-center items-center ${
              selectedOptionId
                ? 'bg-primary-600'
                : 'bg-gray-300'
            }`}
          >
            {isLoading ? (
              <Text className="text-white font-semibold">Procesando...</Text>
            ) : currentIndex === totalQuestions - 1 ? (
              <>
                <Text className="text-white font-semibold mr-2">Ver Resultados</Text>
                <Ionicons name="analytics" size={20} color="white" />
              </>
            ) : (
              <>
                <Text className="text-white font-semibold mr-2">Siguiente</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DiagnosticWizardScreen;
