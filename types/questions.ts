export interface Question {
  id: string;
  text: string;
  helpText?: string;
  type: 'slider' | 'multiple-choice' | 'matrix' | 'yes-no-partial';
  weight: number;
  category: 'critical' | 'important' | 'complementary';
  maturityLevel: 'basic' | 'intermediate' | 'advanced';
  options?: QuestionOption[];
  matrixOptions?: MatrixOption[];
  sliderConfig?: SliderConfig;
}

export interface QuestionOption {
  value: string;
  label: string;
  score: number;
  followUp?: string;
}

export interface MatrixOption {
  id: string;
  label: string;
  score: number;
}

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  labels: { value: number; label: string; score: number }[];
}

export interface Response {
  id?: string;
  diagnosticId?: string;
  questionId: string;
  axis: string;
  score: number;
  rawValue: any;
  weight: number;
  question?: Question;
}