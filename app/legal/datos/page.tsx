'use client';

import Link from 'next/link';
import { 
  FaShieldAlt, 
  FaLock, 
  FaUserShield, 
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileContract,
  FaUserCog,
  FaDatabase,
  FaGlobe,
  FaArrowRight,
  FaClock,
  FaBalanceScale
} from 'react-icons/fa';
import { useState } from 'react';

export default function ProteccionDatos() {
  const [activeSection, setActiveSection] = useState('politica');

  const sections = [
    { id: 'politica', label: 'Privacy Policy', icon: FaFileContract },
    { id: 'derechos', label: 'Your GDPR Rights', icon: FaUserShield },
    { id: 'procedimientos', label: 'Procedures', icon: FaUserCog },
    { id: 'contacto', label: 'DPO Contact', icon: FaEnvelope }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/legal" className="text-gray-500 hover:text-gray-700 transition-colors">
              Legal
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Data Protection</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <FaShieldAlt className="text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Data Protection and Privacy
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              Your privacy is our priority. Learn how we protect your data
              and what your rights are under GDPR and local regulations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <FaClock className="inline mr-2" />
                Last updated: July 2025
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <FaBalanceScale className="inline mr-2" />
                GDPR Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white border-b z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeSection === id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="text-lg" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Privacy Policy */}
            {activeSection === 'politica' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Privacy Policy
                  </h2>

                  <div className="space-y-6 text-gray-700">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaDatabase className="text-blue-600" />
                        1. Information We Collect
                      </h3>
                      <p className="mb-3">
                        At Impulsa Lab, we collect only the information necessary to
                        provide you with our consulting and digital transformation services:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Contact Information:</strong> Name, email, phone number, company address</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Business Information:</strong> Information about your business, industry, size, needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Usage Data:</strong> Interactions with our platform and AI tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Financial Data:</strong> Information necessary to process payments (processed by PayPal)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaLock className="text-blue-600" />
                        2. How We Use Your Information
                      </h3>
                      <p className="mb-3">
                        We use your data exclusively to:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Perform the 3D Diagnosis of your business</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Customize AI solutions for your company</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Communicate with you about our services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Improve our tools and methodologies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Comply with legal and tax obligations</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaGlobe className="text-blue-600" />
                        3. Information Sharing
                      </h3>
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                        <p className="font-semibold mb-2">
                          <FaExclamationTriangle className="inline text-blue-600 mr-2" />
                          We never sell your data
                        </p>
                        <p>
                          Your information is confidential. We only share it with:
                        </p>
                        <ul className="mt-2 space-y-1 ml-4">
                          <li>• Essential service providers (hosting, payment processing)</li>
                          <li>• Authorities when required by law</li>
                          <li>• Third parties with your explicit consent</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" />
                        4. Data Security
                      </h3>
                      <p>
                        We implement industry-leading technical and organizational security measures:
                      </p>
                      <ul className="mt-3 space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>SSL/TLS encryption on all transmissions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Encrypted storage on secure servers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Restricted access to authorized personnel only</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Periodic security audits</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaPhone className="text-blue-600" />
                        5. Mobile Data Use & SMS Compliance
                      </h3>
                      <p>
                        We do not share mobile contact information with third parties or affiliates for marketing or promotional purposes. Information may be shared with subcontractors in support services (e.g., customer service). All other categories exclude text-messaging originator opt-in data and consent. This information will not be shared with any third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GDPR Rights */}
            {activeSection === 'derechos' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Your Rights under GDPR
                  </h2>

                  <p className="text-lg text-gray-700 mb-8">
                    As a data subject, you have fundamental rights over your personal information.
                    At Impulsa Lab, we respect and facilitate the exercise of all your rights:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaUserShield className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Right of Access</h3>
                          <p className="text-gray-700">
                            You can request a copy of all personal data we have about you.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaUserCog className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Right to Rectification</h3>
                          <p className="text-gray-700">
                            You have the right to correct inaccurate data or complete incomplete data.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaDatabase className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Right to Erasure</h3>
                          <p className="text-gray-700">
                            You can request that we delete your personal data under certain circumstances.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaLock className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Right to Restriction</h3>
                          <p className="text-gray-700">
                            You can limit how we process your data in specific situations.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaGlobe className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Right to Data Portability</h3>
                          <p className="text-gray-700">
                            You can receive your data in a structured format and transfer it to another service.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaExclamationTriangle className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Right to Object</h3>
                          <p className="text-gray-700">
                            You can object to the processing of your data for direct marketing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <FaBalanceScale className="text-yellow-600" />
                      Response Time
                    </h3>
                    <p className="text-gray-700">
                      We respond to all GDPR rights requests within <strong>30 calendar days</strong>.
                      In complex cases, we may extend this period up to 60 additional days, promptly notifying
                      you about the extension and its reasons.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Procedures */}
            {activeSection === 'procedimientos' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Request Procedures
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                        How to Exercise Your Rights
                      </h3>
                      <p className="text-gray-700 mb-6">
                        We have simplified the process so you can exercise your rights easily and securely:
                      </p>

                      <div className="space-y-4">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              1
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Identify Your Request</h4>
                              <p className="text-gray-700">
                                Determine which right you wish to exercise: access, rectification, erasure,
                                restriction, portability, or objection.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              2
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Prepare Your Request</h4>
                              <p className="text-gray-700 mb-3">
                                Include the following information:
                              </p>
                              <ul className="space-y-1 ml-4 text-gray-600">
                                <li>• Your full name and contact details</li>
                                <li>• Clear description of the right you wish to exercise</li>
                                <li>• Any additional relevant information</li>
                                <li>• Copy of your identification (for verification)</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              3
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Submit Your Request</h4>
                              <p className="text-gray-700 mb-3">
                                You can send us your request through any of these channels:
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FaEnvelope className="text-blue-600" />
                                  <span>Email: privacidad@tuimpulsalab.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaPhone className="text-blue-600" />
                                  <span>Phone: +1 929 500 1850</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              4
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Confirmation and Processing</h4>
                              <p className="text-gray-700">
                                You will receive a confirmation of receipt within 48 hours. We will process your
                                request and respond within the legal deadline of 30 days.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaFileContract className="text-blue-600" />
                        Forms and Templates
                      </h3>
                      <p className="text-gray-700 mb-4">
                        To facilitate your request, you can download our pre-designed templates:
                      </p>
                      <div className="space-y-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          Data Access Request Template
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          Deletion Request Template
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          Data Portability Request Template
                        </button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaExclamationTriangle className="text-yellow-600" />
                        Important
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          • We do not charge any fee for processing GDPR rights requests
                        </li>
                        <li>
                          • We may request additional information to verify your identity
                        </li>
                        <li>
                          • In case of excessive or unfounded requests, we reserve the right
                          to charge an administrative fee or reject the request
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DPO Contact */}
            {activeSection === 'contacto' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Data Protection Officer (DPO)
                  </h2>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200 mb-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-full mb-4">
                        <FaUserShield className="text-4xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Orlando Matamoros</h3>
                      <p className="text-gray-600">Data Protection Officer</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <FaEnvelope className="text-blue-600 text-xl" />
                          <span className="font-semibold">Direct Email</span>
                        </div>
                        <a href="mailto:privacidad@tuimpulsalab.com" className="text-blue-600 hover:text-blue-800">
                          privacidad@tuimpulsalab.com
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <FaPhone className="text-blue-600 text-xl" />
                          <span className="font-semibold">Phone</span>
                        </div>
                        <a href="tel:+19295001850" className="text-blue-600 hover:text-blue-800">
                          +1 929 500 1850
                        </a>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaGlobe className="text-blue-600 text-xl" />
                        <span className="font-semibold">Mailing Address</span>
                      </div>
                      <address className="not-italic text-gray-700">
                        Impulsa Lab LLC<br />
                        Attn: Data Protection Officer<br />
                        Brooklyn, NY<br />
                        United States
                      </address>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">When to Contact the DPO?</h3>
                      <p className="text-gray-700 mb-4">
                        You can contact our Data Protection Officer to:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Exercise any of your data protection rights</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Report a security breach or privacy incident</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Ask questions about our privacy practices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Request clarifications about this policy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>File a complaint about the handling of your data</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Monday to Friday</p>
                          <p className="text-gray-600">9:00 AM - 6:00 PM EST</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Email Response</p>
                          <p className="text-gray-600">Within 48 business hours</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-2">Privacy Commitment</h3>
                      <p className="text-gray-700">
                        Our DPO is committed to protecting your privacy and ensuring that
                        your data is handled in accordance with best practices and applicable
                        regulations. All communications with the DPO are confidential and
                        will be treated with the utmost seriousness.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Supervisory Authorities */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Supervisory Authorities
                  </h3>
                  <p className="text-gray-700 mb-6">
                    If you are not satisfied with our response, you have the right to file
                    a complaint with the data protection authorities:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">United States</h4>
                      <p className="text-gray-700 mb-2">Federal Trade Commission (FTC)</p>
                      <a href="https://www.ftc.gov" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                        www.ftc.gov
                        <FaArrowRight />
                      </a>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">European Union</h4>
                      <p className="text-gray-700 mb-2">European Data Protection Board</p>
                      <a href="https://edpb.europa.eu" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                        edpb.europa.eu
                        <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            We're here to help you understand and exercise your rights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacidad@tuimpulsalab.com"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <FaEnvelope />
              Contact DPO
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              General Contact
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}