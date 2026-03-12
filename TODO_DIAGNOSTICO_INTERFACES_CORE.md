# TODO - Utilização das Interfaces do Core no Diagnóstico

## Objetivo
Corrigir os componentes do diagnóstico para utilizarem as interfaces exportadas pelo core (@fixmotor/core) em vez de definições locais duplicadas.

## Ficheiros Editados

### 1. DiagnosticoBasicForm.tsx
- [x] Remover interfaces locais (Problema, Imagem, DiagnosticoFormData)
- [x] Manter import do @fixmotor/core (já tem)

### 2. DiagnosticoProblemsForm.tsx
- [x] Remover interfaces locais (Problema, Imagem, DiagnosticoFormData)
- [x] Importar DiagnosticoFormData e ProblemaFormData do @fixmotor/core

### 3. DiagnosticoImagesForm.tsx
- [x] Remover interfaces locais (Problema, Imagem, DiagnosticoFormData)
- [x] Importar DiagnosticoFormData do @fixmotor/core
- [x] Melhorar gestão de imagens: usar blob URLs para previews locais
- [x] Suporte para carregar imagens existentes do backend

### 4. DiagnosticoSymptomsForm.tsx
- [x] Remover interfaces locais (Problema, Imagem, DiagnosticoFormData)
- [x] Importar DiagnosticoFormData do @fixmotor/core

### 5. DiagnosticoPreview.tsx
- [x] Remover interfaces locais (Problema, Imagem, DiagnosticoFormData)
- [x] Importar DiagnosticoFormData do @fixmotor/core

### 6. DiagnosticoModal.tsx
- [x] Remover interfaces locais (Problema, Imagem, DiagnosticoFormData)
- [x] Importar DiagnosticoFormData, ProblemaFormData, StatusDiagnosticoForm, PrioridadeDiagnosticoForm do @fixmotor/core
- [x] Atualizar useState novoProblema para usar ProblemaFormData
- [x] Atualizar conversores para usar tipos corretos

### 7. diagnostico.controller.ts (Backend)
- [x] Corrigir import fs (usar import em vez de require)

## Interfaces Disponíveis no Core (siv-platform/packages/core/src/diagnostico/index.ts)
- DiagnosticoFormData
- ProblemaFormData
- ImagemFormData
- StatusDiagnosticoForm
- PrioridadeDiagnosticoForm

## Estado: CONCLUÍDO ✅

