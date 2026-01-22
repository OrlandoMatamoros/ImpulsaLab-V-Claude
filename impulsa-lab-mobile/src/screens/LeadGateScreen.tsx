// ============================================
// IMPULSA LAB - LEAD GATE SCREEN (Screen 1)
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { useDiagnosticStore } from '../store/diagnosticStore';
import { INDUSTRY_OPTIONS } from '../constants/industry-benchmarks';
import { EMPLOYEE_COUNT_OPTIONS } from '../constants/company-size';
import { LeadData, Industry } from '../types';
import { saveLeadDataLocally } from '../services/storage';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LeadGate'>;

// Custom Picker Component
const CustomPicker: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}> = ({ label, options, selectedValue, onValueChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 rounded-xl p-4 flex-row justify-between items-center"
      >
        <Text className={selectedValue ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption?.label || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#6b7280"
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="bg-white border border-gray-300 rounded-xl mt-2 max-h-48 overflow-hidden">
          <ScrollView nestedScrollEnabled>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
                className={`p-4 border-b border-gray-100 ${
                  option.value === selectedValue ? 'bg-primary-50' : ''
                }`}
              >
                <Text
                  className={
                    option.value === selectedValue
                      ? 'text-primary-600 font-medium'
                      : 'text-gray-700'
                  }
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export const LeadGateScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const setLeadData = useDiagnosticStore(state => state.setLeadData);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '' as Industry | '',
    employeeCount: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'El nombre de la empresa es requerido';
    }

    if (!formData.industry) {
      newErrors.industry = 'Selecciona una industria';
    }

    if (!formData.employeeCount) {
      newErrors.employeeCount = 'Selecciona el número de empleados';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'El código postal es requerido';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Código postal inválido (5 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const leadData: LeadData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || undefined,
        companyName: formData.companyName.trim(),
        industry: formData.industry as Industry,
        employeeCount: parseInt(formData.employeeCount, 10),
        zipCode: formData.zipCode.trim(),
      };

      // Save to store
      setLeadData(leadData);

      // Save locally for persistence
      await saveLeadDataLocally(leadData);

      // Navigate to diagnostic wizard
      navigation.navigate('DiagnosticWizard');
    } catch (error) {
      console.error('Error submitting lead:', error);
      Alert.alert('Error', 'Hubo un problema al guardar tus datos. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Input field component
  const InputField: React.FC<{
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
    autoCapitalize?: 'none' | 'sentences' | 'words';
    error?: string;
    icon: keyof typeof Ionicons.glyphMap;
  }> = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    error,
    icon,
  }) => (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4">
        <Ionicons name={icon} size={20} color="#9ca3af" />
        <TextInput
          className="flex-1 py-4 px-3 text-gray-900"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-primary-600 px-6 pt-16 pb-10 rounded-b-3xl">
          <View className="items-center mb-4">
            <View className="bg-white/20 rounded-full p-4 mb-4">
              <Ionicons name="analytics" size={40} color="white" />
            </View>
            <Text className="text-white text-2xl font-bold text-center">
              Diagnóstico Empresarial 3D
            </Text>
            <Text className="text-white/80 text-center mt-2">
              Evalúa tu negocio en 3 dimensiones clave
            </Text>
          </View>

          {/* Dimension badges */}
          <View className="flex-row justify-center space-x-2 mt-4">
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text className="text-white text-xs">💰 Finanzas</Text>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text className="text-white text-xs">⚙️ Operaciones</Text>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text className="text-white text-xs">📣 Marketing</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View className="px-6 pt-8">
          <Text className="text-gray-900 text-xl font-bold mb-2">
            Comencemos con tu información
          </Text>
          <Text className="text-gray-500 mb-6">
            Estos datos nos ayudarán a personalizar tu diagnóstico
          </Text>

          <InputField
            label="Nombre completo"
            value={formData.name}
            onChangeText={text => setFormData({ ...formData, name: text })}
            placeholder="Juan Pérez"
            autoCapitalize="words"
            error={errors.name}
            icon="person-outline"
          />

          <InputField
            label="Email"
            value={formData.email}
            onChangeText={text => setFormData({ ...formData, email: text })}
            placeholder="juan@empresa.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            icon="mail-outline"
          />

          <InputField
            label="Teléfono (opcional)"
            value={formData.phone}
            onChangeText={text => setFormData({ ...formData, phone: text })}
            placeholder="+52 55 1234 5678"
            keyboardType="phone-pad"
            icon="call-outline"
          />

          <InputField
            label="Nombre de la empresa"
            value={formData.companyName}
            onChangeText={text => setFormData({ ...formData, companyName: text })}
            placeholder="Mi Empresa S.A."
            autoCapitalize="words"
            error={errors.companyName}
            icon="business-outline"
          />

          <CustomPicker
            label="Industria"
            options={INDUSTRY_OPTIONS}
            selectedValue={formData.industry}
            onValueChange={value => setFormData({ ...formData, industry: value as Industry })}
            placeholder="Selecciona tu industria"
          />
          {errors.industry && (
            <Text className="text-red-500 text-sm -mt-3 mb-4">{errors.industry}</Text>
          )}

          <CustomPicker
            label="Número de empleados"
            options={EMPLOYEE_COUNT_OPTIONS}
            selectedValue={formData.employeeCount}
            onValueChange={value => setFormData({ ...formData, employeeCount: value })}
            placeholder="Selecciona el rango"
          />
          {errors.employeeCount && (
            <Text className="text-red-500 text-sm -mt-3 mb-4">{errors.employeeCount}</Text>
          )}

          <InputField
            label="Código Postal"
            value={formData.zipCode}
            onChangeText={text => setFormData({ ...formData, zipCode: text })}
            placeholder="12345"
            keyboardType="numeric"
            error={errors.zipCode}
            icon="location-outline"
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            className={`mt-6 rounded-xl py-4 flex-row justify-center items-center ${
              isLoading ? 'bg-primary-400' : 'bg-primary-600'
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">
                  Comenzar Diagnóstico
                </Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>

          {/* Privacy note */}
          <Text className="text-gray-400 text-xs text-center mt-4">
            🔒 Tus datos están seguros y no serán compartidos con terceros
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LeadGateScreen;
