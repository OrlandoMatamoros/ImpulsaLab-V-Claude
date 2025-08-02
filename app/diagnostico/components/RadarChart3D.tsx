'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChart3DProps {
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  companyName?: string;
}

export function RadarChart3D({ scores, companyName = 'Tu Empresa' }: RadarChart3DProps) {
  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    layout: {
      padding: 20
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 1
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          circular: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 11,
            weight: 'bold' as const
          },
          color: '#ffffff',
          backdropColor: 'transparent'
        },
        pointLabels: {
          font: {
            size: 13,
            weight: 'bold' as const
          },
          color: '#ffffff',
          padding: 15
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + context.raw + '/100';
          }
        }
      }
    }
  };

  const data = {
    labels: [
      'FINANZAS',
      'OPERACIONES',
      'MARKETING'
    ],
    datasets: [
      {
        label: companyName,
        data: [scores.finance, scores.operations, scores.marketing],
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderColor: '#ffffff',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: ['#3b82f6', '#10b981', '#a855f7'],
        pointHoverBackgroundColor: ['#3b82f6', '#10b981', '#a855f7'],
        pointHoverBorderColor: '#ffffff',
        pointRadius: 10,
        pointHoverRadius: 12,
        pointBorderWidth: 3
      },
      // Zona de Expansión (70+)
      {
        label: 'Expansión',
        data: [70, 70, 70],
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0
      },
      // Zona de Supervivencia (40)
      {
        label: 'Supervivencia',
        data: [40, 40, 40],
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg">
      {/* Gradiente de fondo con los colores de la imagen */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #a855f7 50%, #ec4899 75%, #ef4444 100%)'
        }}
      />
      
      {/* Overlay sutil para mejorar contraste */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Efecto de brillo */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)'
        }}
      />
      
      {/* Gráfico */}
      <div className="relative z-10 w-full h-full">
        <Radar options={options} data={data} />
      </div>
    </div>
  );
}