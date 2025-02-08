import React, { useState } from 'react';
import { FileSignature, Upload, Edit, Code, ArrowRight, File } from 'lucide-react';
import { PDFViewer } from './PDFViewer';


function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setShowPDFViewer(true);
    }
  };
console.log({file});

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setShowPDFViewer(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm py-4 px-4 sm:px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileSignature className="h-6 w-6 text-purple-600" />
            <span className="font-bold text-xl">DocuSign</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-2">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
            <a href="#developers" className="text-gray-600 hover:text-purple-600">Developers</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Sign Up Free
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full left-0 bg-white border-b transition-all duration-300 ${isMenuOpen ? 'top-full opacity-100 visible' : 'top-[110%] opacity-0 invisible'}`}>
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-600 hover:text-purple-600">Features</a>
            <a href="#developers" className="block text-gray-600 hover:text-purple-600">Developers</a>
            <a href="#pricing" className="block text-gray-600 hover:text-purple-600">Pricing</a>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Sign Up Free
            </button>
          </div>
        </div>
      </nav>

      {/* Main Hero */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Document Signing <span className="text-yellow-400">for Everyone</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Fast, secure, and legally binding electronic signatures for businesses and individuals
          </p>
          
          {/* Document Upload Area */}
          <div 
            className={`max-w-2xl mx-auto mb-8 sm:mb-12 p-4 sm:p-8 border-2 border-dashed rounded-lg transition-colors ${
              isDragging ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <File className="h-8 w-8 text-purple-600" />
                <div className="text-center sm:text-left">
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  onClick={() => {
                    setFile(null);
                    setShowPDFViewer(false);
                  }}
                  className="text-red-500 text-sm hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg mb-2">Drag and drop your document here</p>
                <p className="text-gray-500 mb-4">or</p>
                <label className="inline-block bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition cursor-pointer text-sm sm:text-base">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileInput}
                  />
                </label>
                <p className="text-xs sm:text-sm text-gray-500 mt-4">
                  Supported format: PDF
                </p>
              </div>
            )}
          </div>

          {/* PDF Viewer Modal */}
          {showPDFViewer && file && (
            <PDFViewer
              file={file}
              onClose={() => setShowPDFViewer(false)}
            />
          )}

          <button className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-purple-700 transition">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-xl sm:text-2xl font-semibold mb-8 sm:mb-12">
            Trusted by businesses and individuals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 opacity-60">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-8 sm:h-12 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">eSigning made simple</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12">
            <FeatureCard
              icon={<Upload className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />}
              title="Drag and drop"
              description="Upload your documents easily and get them signed in minutes"
            />
            <FeatureCard
              icon={<Edit className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />}
              title="Write your details"
              description="Add signatures, text, dates and more with our intuitive editor"
            />
            <FeatureCard
              icon={<FileSignature className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />}
              title="Instant sign"
              description="Sign documents instantly on any device, anywhere, anytime"
            />
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section id="developers" className="bg-gray-900 text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Tailor-made for developers</h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <FeatureItem
                title="RESTful API"
                description="Integrate electronic signatures into your application with our comprehensive API"
              />
              <FeatureItem
                title="SDKs & Libraries"
                description="Use our SDKs for popular programming languages and frameworks"
              />
              <FeatureItem
                title="Webhooks"
                description="Get real-time updates about document status and signature events"
              />
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg overflow-x-auto">
              <Code className="text-purple-400 mb-4" />
              <pre className="text-xs sm:text-sm text-purple-400">
                <code>{`
const docusign = require('docusign-api');

const signature = await docusign.sign({
  document: 'contract.pdf',
  signers: ['john@example.com']
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently asked questions</h2>
          <div className="space-y-4 sm:space-y-6">
            <FaqItem
              question="Is it legally binding?"
              answer="Yes, our electronic signatures are legally binding and compliant with eSignature laws worldwide."
            />
            <FaqItem
              question="How secure is the platform?"
              answer="We use bank-level security with 256-bit encryption to protect your documents and data."
            />
            <FaqItem
              question="Can I sign on mobile?"
              answer="Yes, our platform works seamlessly on all devices including smartphones and tablets."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Get started now</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-purple-700 transition flex items-center justify-center">
              Sign up free <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="border border-purple-600 text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-purple-50 transition">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li className="hover:text-purple-600 cursor-pointer">Features</li>
              <li className="hover:text-purple-600 cursor-pointer">Pricing</li>
              <li className="hover:text-purple-600 cursor-pointer">Security</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li className="hover:text-purple-600 cursor-pointer">About</li>
              <li className="hover:text-purple-600 cursor-pointer">Careers</li>
              <li className="hover:text-purple-600 cursor-pointer">Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li className="hover:text-purple-600 cursor-pointer">Documentation</li>
              <li className="hover:text-purple-600 cursor-pointer">API Reference</li>
              <li className="hover:text-purple-600 cursor-pointer">Support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li className="hover:text-purple-600 cursor-pointer">Privacy</li>
              <li className="hover:text-purple-600 cursor-pointer">Terms</li>
              <li className="hover:text-purple-600 cursor-pointer">Security</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 sm:p-6 rounded-lg border hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-400">{description}</p>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold mb-2">{question}</h3>
      <p className="text-sm sm:text-base text-gray-600">{answer}</p>
    </div>
  );
}

export default Home;