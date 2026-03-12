# TODO - Correções Estoque

## Tarefas:
- [x] 1. ProdutoTable - Mostrar visualmente se é subcategoria
- [x] 2. InventarioModal - Adicionar imagem do produto
- [x] 3. InventarioModal - Obter utilizador do token
- [x] 4. MovimentarEstoqueModal - Obter utilizador do token

## Implementação:
1. ProdutoTable: Usar `produto.categoriaPath` para detectar subcategorias (contém " > ")
2. InventarioModal: Adicionar imagem do produto e obter utilizador do localStorage
3. MovimentarEstoqueModal: Obter utilizador do localStorage

## Alterações Realizadas:

### ProdutoTable.tsx:
- Adicionada verificação de subcategoria usando `produto.categoriaPath.includes(' > ')`
- Subcategorias são mostradas com badge roxo e ícone de subcategoria
- Exibe o caminho completo da categoria (ex: "Elétricos > Baterias")

### InventarioModal.tsx:
- Adicionada imagem do produto (com placeholder quando não existe)
- Utilizador é extraído automaticamente do localStorage (`flxmotor_user`)
- Campo de utilizador agora é somente leitura (readOnly)
- Adicionada mensagem informativa sobre a extração automática

### MovimentarEstoqueModal.tsx:
- Utilizador é extraído automaticamente do localStorage (`flxmotor_user`)
- Campo de responsável agora é somente leitura (readOnly)
- Adicionada mensagem informativa sobre a extração automática

