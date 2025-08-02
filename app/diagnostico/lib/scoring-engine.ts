import { Response } from '@/types/questions';

export interface AxisScores {
  finance: number;
  operations: number;
  marketing: number;
}

export interface DetailedScore {
  axis: string;
  score: number;
  subscores: {
    category: string;
    score: number;
    weight: number;
  }[];
  strengths: string[];
  weaknesses: string[];
  maturityStage: 'Supervivencia' | 'Crecimiento' | 'Expansión';
}

export class ScoringEngine {
  calculateAxisScore(responses: Response[]): number {
    if (responses.length === 0) return 0;

    const weightedSum = responses.reduce((sum, response) => 
      sum + (response.score * response.weight), 0
    );
    
    const totalWeight = responses.reduce((sum, response) => 
      sum + response.weight, 0
    );
    
    return Math.round(weightedSum / totalWeight);
  }

  getMaturityStage(score: number): 'Supervivencia' | 'Crecimiento' | 'Expansión' {
    if (score < 40) return 'Supervivencia';
    if (score < 70) return 'Crecimiento';
    return 'Expansión';
  }

  calculateOverallScore(
    axisScores: AxisScores,
    weights = { finance: 0.4, operations: 0.3, marketing: 0.3 }
  ): number {
    const weightedSum = 
      axisScores.finance * weights.finance +
      axisScores.operations * weights.operations +
      axisScores.marketing * weights.marketing;
    
    return Math.round(weightedSum);
  }

  generateDetailedAnalysis(
    axis: string,
    responses: Response[],
    score: number
  ): DetailedScore {
    return {
      axis,
      score,
      subscores: [],
      strengths: [],
      weaknesses: [],
      maturityStage: this.getMaturityStage(score)
    };
  }
}