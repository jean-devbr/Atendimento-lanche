import React, { useState } from 'react';
import { Save, Edit, Eye, EyeOff, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function FooterManagement() {
  const { footerConfig, updateFooterConfig } = useOrder();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(footerConfig);

  const handleSave = () => {
    updateFooterConfig(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(footerConfig);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Footer</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-primary flex items-center gap-2"
        >
          <Edit size={20} />
          {isEditing ? 'Cancelar' : 'Editar Footer'}
        </button>
      </div>

      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Configurações */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Configurações</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                    disabled={!isEditing}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Exibir footer</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da empresa
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="LancheExpress"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  rows={3}
                  placeholder="Lanches artesanais feitos com amor..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="Rua das Flores, 123 - Centro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="contato@lancheexpress.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário de funcionamento
                </label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="Seg-Dom: 18h às 23h"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="@lancheexpress"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                  disabled={!isEditing}
                  className="input-field"
                  placeholder="LancheExpress"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6">
                <button onClick={handleCancel} className="btn-secondary flex-1">
                  Cancelar
                </button>
                <button onClick={handleSave} className="btn-primary flex-1">
                  <Save size={16} className="mr-2" />
                  Salvar
                </button>
              </div>
            )}
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              {formData.enabled ? (
                <div className="bg-gray-800 text-white p-6 rounded">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3">{formData.companyName}</h4>
                      <p className="text-gray-300 text-sm">{formData.description}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-3">Contato</h5>
                      <div className="space-y-2 text-sm text-gray-300">
                        {formData.address && <p>{formData.address}</p>}
                        {formData.phone && <p>{formData.phone}</p>}
                        {formData.email && <p>{formData.email}</p>}
                        {formData.hours && <p>{formData.hours}</p>}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-3">Redes Sociais</h5>
                      <div className="space-y-2 text-sm text-gray-300">
                        {formData.whatsapp && (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                              <MessageCircle size={10} className="text-white" />
                            </div>
                            <span>{formData.whatsapp}</span>
                          </div>
                        )}
                        {formData.instagram && (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                              <Instagram size={10} className="text-white" />
                            </div>
                            <span>{formData.instagram}</span>
                          </div>
                        )}
                        {formData.facebook && (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                              <Facebook size={10} className="text-white" />
                            </div>
                            <span>{formData.facebook}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
                    © 2024 {formData.companyName}. Todos os direitos reservados.
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <EyeOff size={48} className="mx-auto mb-2" />
                  <p>Footer desabilitado</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}