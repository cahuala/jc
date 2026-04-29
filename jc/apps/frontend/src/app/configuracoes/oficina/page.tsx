/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import { useOficina } from '@/hooks/useOficina';

export default function DadosOficinaPage() {
  const [isLoading, setIsLoading] = useState(false);
const { oficina, saveOficina } = useOficina();
  const [formData, setFormData] = useState(oficina);

  useEffect(() => {
    setFormData(oficina);
  }, [oficina]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    saveOficina(formData as any);
    alert('Dados da oficina atualizados com sucesso!'); 
    setIsLoading(false);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Dados da Oficina</h2>
          <p className="text-muted mb-0">Configurações gerais da empresa</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <Panel className="mb-4">
              <PanelHeader>Informações da Empresa</PanelHeader>
              <PanelBody>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label fw-bold">Nome da Empresa *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">NIF *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nif"
                      value={formData.nif}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Endereço *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Bairro</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Cidade *</label>
                    <select
                      className="form-select"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Luanda">Luanda</option>
                      <option value="Benguela">Benguela</option>
                      <option value="Huambo">Huambo</option>
                      <option value="Lobito">Lobito</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Província *</label>
                    <select
                      className="form-select"
                      name="provincia"
                      value={formData.provincia}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Luanda">Luanda</option>
                      <option value="Benguela">Benguela</option>
                      <option value="Huambo">Huambo</option>
                      <option value="Bié">Bié</option>
                    </select>
                  </div>
                </div>
              </PanelBody>
            </Panel>

            <Panel className="mb-4">
              <PanelHeader>Contactos</PanelHeader>
              <PanelBody>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Telefone *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelHeader>Funcionamento</PanelHeader>
              <PanelBody>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Horário</label>
                    <input
                      type="text"
                      className="form-control"
                      name="horarioFuncionamento"
                      value={formData.horarioFuncionamento}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Dias de Funcionamento</label>
                    <input
                      type="text"
                      className="form-control"
                      name="diasFuncionamento"
                      value={formData.diasFuncionamento}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Regime IVA</label>
                    <select
                      className="form-select"
                      name="regimeIVA"
                      value={formData.regimeIVA}
                      onChange={handleInputChange}
                    >
                      <option value="Regime Geral">Regime Geral</option>
                      <option value="Regime Simplificado">Regime Simplificado</option>
                      <option value="Isento">Isento</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Número do Alvará</label>
                    <input
                      type="text"
                      className="form-control"
                      name="numeroAlvara"
                      value={formData.numeroAlvara}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Data de Constituição</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dataConstituicao"
                      value={formData.dataConstituicao}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </PanelBody>
            </Panel>
          </div>

          <div className="col-md-4">
            <Panel>
              <PanelHeader>Preview dos Dados</PanelHeader>
              <PanelBody>
                <div className="text-center mb-3">
                  <div className="bg-primary text-white p-3 rounded">
                    <i className="fa fa-building fa-2x"></i>
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Empresa:</strong><br/>
                  <span className="text-primary">{formData.nomeEmpresa}</span>
                </div>
                <div className="mb-2">
                  <strong>NIF:</strong><br/>
                  <span>{formData.nif}</span>
                </div>
                <div className="mb-2">
                  <strong>Endereço:</strong><br/>
                  <span>{formData.endereco}, {formData.bairro}</span><br/>
                  <span>{formData.cidade}, {formData.provincia}</span>
                </div>
                <div className="mb-2">
                  <strong>Contactos:</strong><br/>
                  <span>{formData.telefone}</span><br/>
                  <span>{formData.email}</span>
                </div>
                <div className="mb-2">
                  <strong>Funcionamento:</strong><br/>
                  <span>{formData.horarioFuncionamento}</span><br/>
                  <span>{formData.diasFuncionamento}</span>
                </div>
              </PanelBody>
            </Panel>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Salvando...
              </>
            ) : (
              <>
                <i className="fa fa-save me-2"></i>
                Salvar Configurações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}