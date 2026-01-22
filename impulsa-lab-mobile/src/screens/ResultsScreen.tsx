// ============================================
// IMPULSA LAB - RESULTS DASHBOARD SCREEN (Screen 3)
// ============================================

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Polygon, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { useDiagnosticStore } from '../store/diagnosticStore';
import {
  getMaturityLevelInfo,
  getDimensionLabel,
  getPercentileInfo,
} from '../utils/scoring-engine';
import { getIndustryLabel } from '../constants/industry-benchmarks';
import { getCompanySizeByEmployees } from '../constants/company-size';
import { RootStackParamList } from '../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;

// Radar Chart Component
const RadarChart: React.FC<{
  scores: { finance: number; operations: number; marketing: number };
  industryScores: { finance: number; operations: number; marketing: number };
}> = ({ scores, industryScores }) => {
  const size = SCREEN_WIDTH - 80;
  const center = size / 2;
  const maxRadius = size / 2 - 40;

  // Animation
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  // Convert scores to polygon points
  const getPolygonPoints = (scoreObj: typeof scores, scale = 1) => {
    const dimensions = ['finance', 'operations', 'marketing'] as const;
    const angleStep = (Math.PI * 2) / 3;
    const startAngle = -Math.PI / 2; // Start from top

    return dimensions
      .map((dim, i) => {
        const score = scoreObj[dim] * scale;
        const radius = (score / 100) * maxRadius;
        const angle = startAngle + i * angleStep;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Grid lines
  const gridLevels = [20, 40, 60, 80, 100];
  const dimensions = ['Finanzas', 'Operaciones', 'Marketing'];
  const angleStep = (Math.PI * 2) / 3;
  const startAngle = -Math.PI / 2;

  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Svg width={size} height={size}>
        {/* Grid circles */}
        {gridLevels.map(level => (
          <Circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const x2 = center + maxRadius * Math.cos(angle);
          const y2 = center + maxRadius * Math.sin(angle);
          return (
            <Line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="#d1d5db"
              strokeWidth={1}
            />
          );
        })}

        {/* Industry average polygon */}
        <Polygon
          points={getPolygonPoints(industryScores)}
          fill="rgba(249, 115, 22, 0.15)"
          stroke="#f97316"
          strokeWidth={2}
          strokeDasharray="5,5"
        />

        {/* User score polygon */}
        <Polygon
          points={getPolygonPoints(scores)}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="#3b82f6"
          strokeWidth={3}
        />

        {/* Score dots */}
        {Object.entries(scores).map(([key, score], i) => {
          const angle = startAngle + i * angleStep;
          const radius = (score / 100) * maxRadius;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <G key={key}>
              <Circle cx={x} cy={y} r={6} fill="#3b82f6" />
              <Circle cx={x} cy={y} r={3} fill="white" />
            </G>
          );
        })}

        {/* Labels */}
        {dimensions.map((label, i) => {
          const angle = startAngle + i * angleStep;
          const labelRadius = maxRadius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          const score = Object.values(scores)[i];

          return (
            <G key={label}>
              <SvgText
                x={x}
                y={y - 8}
                textAnchor="middle"
                fill="#374151"
                fontSize={12}
                fontWeight="bold"
              >
                {label}
              </SvgText>
              <SvgText
                x={x}
                y={y + 8}
                textAnchor="middle"
                fill="#3b82f6"
                fontSize={14}
                fontWeight="bold"
              >
                {score}
              </SvgText>
            </G>
          );
        })}
      </Svg>

      {/* Legend */}
      <View className="flex-row justify-center space-x-6 mt-4">
        <View className="flex-row items-center">
          <View className="w-4 h-4 rounded bg-blue-500 mr-2" />
          <Text className="text-gray-600 text-sm">Tu puntaje</Text>
        </View>
        <View className="flex-row items-center">
          <View
            className="w-4 h-4 rounded mr-2"
            style={{
              backgroundColor: 'rgba(249, 115, 22, 0.3)',
              borderWidth: 1,
              borderColor: '#f97316',
              borderStyle: 'dashed',
            }}
          />
          <Text className="text-gray-600 text-sm">Promedio industria</Text>
        </View>
      </View>
    </View>
  );
};

// Score Card Component
const ScoreCard: React.FC<{
  dimension: 'finance' | 'operations' | 'marketing';
  userScore: number;
  industryAverage: number;
  percentile: string;
}> = ({ dimension, userScore, industryAverage, percentile }) => {
  const percentileInfo = getPercentileInfo(percentile);
  const difference = userScore - industryAverage;

  const getIcon = () => {
    switch (dimension) {
      case 'finance':
        return 'wallet-outline';
      case 'operations':
        return 'cog-outline';
      case 'marketing':
        return 'megaphone-outline';
    }
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="bg-gray-100 rounded-full p-2 mr-3">
            <Ionicons name={getIcon()} size={20} color="#6b7280" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-500 text-sm">{getDimensionLabel(dimension)}</Text>
            <Text className="text-gray-900 text-2xl font-bold">{userScore}</Text>
          </View>
        </View>

        <View className="items-end">
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: `${percentileInfo.color}20` }}
          >
            <Text style={{ color: percentileInfo.color }} className="text-xs font-medium">
              {percentileInfo.label}
            </Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Ionicons
              name={difference >= 0 ? 'arrow-up' : 'arrow-down'}
              size={14}
              color={difference >= 0 ? '#22c55e' : '#ef4444'}
            />
            <Text
              className={`text-sm ml-1 ${difference >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {Math.abs(difference)} vs industria
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Main Component
export const ResultsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const result = useDiagnosticStore(state => state.result);
  const resetDiagnostic = useDiagnosticStore(state => state.resetDiagnostic);

  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  if (!result) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-500">No hay resultados disponibles</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LeadGate')}
          className="mt-4 bg-primary-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Iniciar diagnóstico</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { scores, maturityLevel, industryComparison, leadData } = result;
  const maturityInfo = getMaturityLevelInfo(maturityLevel);
  const companySizeConfig = getCompanySizeByEmployees(leadData.employeeCount);

  // Industry average scores for radar
  const industryAverages = {
    finance: industryComparison.finance.industryAverage,
    operations: industryComparison.operations.industryAverage,
    marketing: industryComparison.marketing.industryAverage,
  };

  // Generate PDF
  const generatePDF = async () => {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { color: #1e40af; font-size: 24px; }
            .score-box { background: #f3f4f6; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .overall-score { font-size: 48px; color: #3b82f6; font-weight: bold; text-align: center; }
            .dimension { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .maturity { padding: 15px; border-radius: 10px; margin: 20px 0; }
            .recommendations { margin-top: 30px; }
            .recommendation-item { padding: 10px; margin: 5px 0; background: #fef3c7; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Diagnóstico Empresarial 3D</h1>
            <p>Impulsa Lab</p>
          </div>

          <h2>Empresa: ${leadData.companyName}</h2>
          <p>Industria: ${getIndustryLabel(leadData.industry)}</p>
          <p>Tamaño: ${companySizeConfig.label}</p>

          <div class="score-box">
            <p style="text-align: center;">Puntaje General</p>
            <div class="overall-score">${scores.overall}</div>
            <p style="text-align: center; color: ${maturityInfo.color};">
              Nivel: ${maturityInfo.label}
            </p>
          </div>

          <h3>Puntajes por Dimensión</h3>
          <div class="dimension">
            <span>💰 Finanzas</span>
            <strong>${scores.finance}</strong>
          </div>
          <div class="dimension">
            <span>⚙️ Operaciones</span>
            <strong>${scores.operations}</strong>
          </div>
          <div class="dimension">
            <span>📣 Marketing</span>
            <strong>${scores.marketing}</strong>
          </div>

          <div class="recommendations">
            <h3>Recomendaciones para ${companySizeConfig.label}</h3>
            ${companySizeConfig.recommendations.map(rec => `
              <div class="recommendation-item">✓ ${rec}</div>
            `).join('')}
          </div>

          <p style="margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px;">
            Generado el ${new Date().toLocaleDateString('es-MX')}
          </p>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Diagnóstico Impulsa Lab',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('PDF Generado', 'El archivo se ha guardado correctamente.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };

  // Share results
  const shareResults = async () => {
    try {
      await Share.share({
        message: `🎯 Mi Diagnóstico Empresarial 3D - Impulsa Lab\n\n📊 Puntaje General: ${scores.overall}/100\n💰 Finanzas: ${scores.finance}\n⚙️ Operaciones: ${scores.operations}\n📣 Marketing: ${scores.marketing}\n\n🏆 Nivel: ${maturityInfo.label}\n\n¡Descubre el tuyo en Impulsa Lab!`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Start new diagnostic
  const handleNewDiagnostic = () => {
    Alert.alert(
      'Nuevo diagnóstico',
      '¿Deseas iniciar un nuevo diagnóstico? Se borrarán los resultados actuales.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar nuevo',
          onPress: () => {
            resetDiagnostic();
            navigation.replace('LeadGate');
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Header */}
        <View className="bg-primary-600 px-6 pt-16 pb-8 rounded-b-3xl">
          <Text className="text-white/80 text-center">Diagnóstico completado</Text>
          <Text className="text-white text-2xl font-bold text-center mt-1">
            {leadData.companyName}
          </Text>

          {/* Overall Score */}
          <View className="bg-white/20 rounded-2xl p-6 mt-6 items-center">
            <Text className="text-white/80 text-sm mb-2">Puntaje General</Text>
            <Text className="text-white text-6xl font-bold">{scores.overall}</Text>
            <View className="flex-row items-center mt-3">
              <View
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: maturityInfo.color }}
              />
              <Text className="text-white font-medium">{maturityInfo.label}</Text>
            </View>
            <Text className="text-white/70 text-sm text-center mt-2">
              {maturityInfo.description}
            </Text>
          </View>
        </View>

        {/* Radar Chart */}
        <View className="px-6 mt-6">
          <Text className="text-gray-900 text-lg font-bold mb-2">
            Tu perfil vs. Industria
          </Text>
          <Text className="text-gray-500 text-sm mb-4">
            Comparado con {getIndustryLabel(leadData.industry)}
          </Text>

          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <RadarChart scores={scores} industryScores={industryAverages} />
          </View>
        </View>

        {/* Dimension Scores */}
        <View className="px-6 mt-6">
          <Text className="text-gray-900 text-lg font-bold mb-4">
            Detalle por dimensión
          </Text>

          <ScoreCard
            dimension="finance"
            userScore={scores.finance}
            industryAverage={industryComparison.finance.industryAverage}
            percentile={industryComparison.finance.percentile}
          />
          <ScoreCard
            dimension="operations"
            userScore={scores.operations}
            industryAverage={industryComparison.operations.industryAverage}
            percentile={industryComparison.operations.percentile}
          />
          <ScoreCard
            dimension="marketing"
            userScore={scores.marketing}
            industryAverage={industryComparison.marketing.industryAverage}
            percentile={industryComparison.marketing.percentile}
          />
        </View>

        {/* Recommendations */}
        <View className="px-6 mt-6">
          <Text className="text-gray-900 text-lg font-bold mb-4">
            Recomendaciones para ti
          </Text>

          <View className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            {companySizeConfig.recommendations.map((rec, index) => (
              <View key={index} className="flex-row items-start mb-3 last:mb-0">
                <View className="bg-amber-400 rounded-full w-6 h-6 items-center justify-center mr-3 mt-0.5">
                  <Text className="text-white text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="flex-1 text-gray-700">{rec}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 mt-8 mb-10">
          <TouchableOpacity
            onPress={generatePDF}
            className="bg-primary-600 py-4 rounded-xl flex-row justify-center items-center mb-3"
          >
            <Ionicons name="document-text-outline" size={20} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Descargar Plan PDF
            </Text>
          </TouchableOpacity>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={shareResults}
              className="flex-1 bg-white border border-gray-300 py-4 rounded-xl flex-row justify-center items-center"
            >
              <Ionicons name="share-social-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 font-semibold ml-2">Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNewDiagnostic}
              className="flex-1 bg-white border border-gray-300 py-4 rounded-xl flex-row justify-center items-center"
            >
              <Ionicons name="refresh-outline" size={20} color="#6b7280" />
              <Text className="text-gray-700 font-semibold ml-2">Nuevo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default ResultsScreen;
