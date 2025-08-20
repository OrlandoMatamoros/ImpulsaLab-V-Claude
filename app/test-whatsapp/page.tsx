'use client';

import { useState } from 'react';

export default function TestWhatsApp() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/verification/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Código enviado');
        setStep(2);
      } else {
        setMessage('❌ Error: ' + (data.error || 'No se pudo enviar'));
      }
    } catch (error) {
      setMessage('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Test WhatsApp</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <p className="text-sm">
            <strong>Antes de empezar:</strong> Envía <code className="bg-gray-100 px-2 py-1 rounded">join circus-hot</code> a +14155238886 por WhatsApp
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="+52 1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button 
              onClick={sendCode}
              disabled={loading || !phone}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-2 border rounded-lg text-center text-2xl"
            />
            <button 
              disabled={code.length !== 6}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Verificar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
