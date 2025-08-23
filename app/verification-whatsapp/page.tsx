'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithCustomToken } from 'firebase/auth';

export default function PhoneVerification() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [debugCode, setDebugCode] = useState('');

  useEffect(() => {
    const savedData = sessionStorage.getItem('verifiedEmailData');
    if (!savedData) {
      router.push('/signup');
      return;
    }
    setUserData(JSON.parse(savedData));
  }, [router]);

  const sendCode = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('/api/verification/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStep('code');
        setSuccess('Code sent! Check your SMS messages.');
        // Para testing - QUITAR EN PRODUCCIÓN
        if (data.debugCode) {
          setDebugCode(data.debugCode);
          console.log('Debug code:', data.debugCode);
        }
      } else {
        setError(data.error || 'Error sending code');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndCreateAccount = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Por ahora aceptamos cualquier código de 6 dígitos para testing
      // En producción, verificar contra la base de datos
      if (code.length !== 6) {
        setError('Please enter a 6-digit code');
        setLoading(false);
        return;
      }
      
      // Crear cuenta con todas las verificaciones
      const response = await fetch('/api/auth/create-verified-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          phone,
          phoneVerified: true,
          emailVerified: true
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.customToken) {
        setSuccess('Account created successfully! Logging you in...');
        
        await signInWithCustomToken(auth, data.customToken);
        sessionStorage.clear();
        
        setTimeout(() => {
          const redirectPath = data.user?.role === 'admin' ? '/admin' : '/dashboard';
          router.push(redirectPath);
        }, 1500);
      } else {
        setError(data.error || 'Error creating account');
      }
      
    } catch (err) {
      console.error('Error:', err);
      setError('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Phone Verification
          </h2>
          <p className="mt-2 text-gray-600">
            Final step: Verify your phone number
          </p>
        </div>

        {userData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              ✅ Email verified: <strong>{userData.email}</strong>
            </p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            📱 We'll send you an SMS with a verification code
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        {/* Solo para testing - QUITAR EN PRODUCCIÓN */}
        {debugCode && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              Debug code: <strong className="font-mono">{debugCode}</strong>
            </p>
          </div>
        )}

        {step === 'phone' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Include country code (e.g., +1 for USA)
              </p>
            </div>
            <button
              onClick={sendCode}
              disabled={loading || !phone || phone.length < 10}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </div>
        )}

        {step === 'code' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Verification Code
              </label>
              <input
                type="text"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full px-4 py-4 text-center text-2xl font-mono tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to {phone}
              </p>
            </div>
            
            <button
              onClick={verifyAndCreateAccount}
              disabled={loading || code.length !== 6}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Verify & Create Account'
              )}
            </button>
            
            <button
              onClick={() => {
                setStep('phone');
                setCode('');
                setError('');
                setSuccess('');
              }}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
            >
              ← Use a different number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
