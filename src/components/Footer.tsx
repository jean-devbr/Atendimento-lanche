import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl">🍔</span>
              <h3 className="text-2xl font-bold text-primary-500 ml-2">LancheExpress</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Lanches artesanais feitos com ingredientes frescos e muito amor. 
              Sabor autêntico que você pode sentir em cada mordida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone size={16} className="text-primary-500 mr-3" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="text-primary-500 mr-3" />
                <span className="text-gray-300">contato@lancheexpress.com</span>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="text-primary-500 mr-3 mt-1" />
                <span className="text-gray-300">
                  Rua dos Sabores, 123<br />
                  Centro - São Paulo, SP
                </span>
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Funcionamento</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock size={16} className="text-primary-500 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Segunda a Sexta</p>
                  <p className="text-white font-medium">18:00 - 23:00</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="text-primary-500 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Sábado e Domingo</p>
                  <p className="text-white font-medium">18:00 - 00:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 LancheExpress. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}