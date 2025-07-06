import React from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function Footer() {
  const { footerConfig } = useOrder();

  if (!footerConfig.enabled) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">{footerConfig.companyName}</h3>
            <p className="text-gray-300 mb-4">{footerConfig.description}</p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-300">
              {footerConfig.address && (
                <p className="flex items-start gap-2">
                  <span>📍</span>
                  <span>{footerConfig.address}</span>
                </p>
              )}
              {footerConfig.phone && (
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>{footerConfig.phone}</span>
                </p>
              )}
              {footerConfig.email && (
                <p className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>{footerConfig.email}</span>
                </p>
              )}
              {footerConfig.hours && (
                <p className="flex items-start gap-2">
                  <span>🕒</span>
                  <span>{footerConfig.hours}</span>
                </p>
              )}
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="space-y-3">
              {footerConfig.whatsapp && (
                <a
                  href={`https://wa.me/${footerConfig.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <MessageCircle size={16} className="text-white" />
                  </div>
                  <span>{footerConfig.whatsapp}</span>
                </a>
              )}
              {footerConfig.instagram && (
                <a
                  href={`https://instagram.com/${footerConfig.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Instagram size={16} className="text-white" />
                  </div>
                  <span>{footerConfig.instagram}</span>
                </a>
              )}
              {footerConfig.facebook && (
                <a
                  href={`https://facebook.com/${footerConfig.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Facebook size={16} className="text-white" />
                  </div>
                  <span>{footerConfig.facebook}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 {footerConfig.companyName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}