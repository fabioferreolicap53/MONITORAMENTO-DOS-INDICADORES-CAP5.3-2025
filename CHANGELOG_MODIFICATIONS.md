# Documentação de Alterações - Fevereiro 2026

Este documento resume as modificações realizadas no projeto para atender às solicitações de atualização de título, padronização de cores e ordenação da sidebar.

## 1. Atualização de Título
O título do indicador principal foi atualizado de:
`PERCENTUAL DE CRIANÇAS COM ATÉ 6 MESES EM ALEITAMENTO MATERNO EXCLUSIVO`
Para:
`1.3 - PERCENTUAL DE CRIANÇAS COM ATÉ 6 MESES EM ALEITAMENTO MATERNO EXCLUSIVO`

**Arquivos modificados:**
- `constants.ts`: Atualizado o rótulo (label) no objeto do indicador.
- `components/Sidebar.tsx`: Atualizado o rótulo no array de itens do menu.
- `index.html`: Atualizada a tag `<title>` para refletir a nova numeração.

## 2. Substituição de Cores (Azul para RGB 28, 46, 74)
Toda a paleta de cores azuis do projeto foi substituída pelo novo padrão corporativo `#1C2E4A` (RGB 28, 46, 74).

**Processo de substituição:**
- **Centralização via Tailwind:** Em vez de alterar cada componente individualmente, a configuração do Tailwind no `index.html` foi atualizada.
- **Mapeamento de Tons:** Foi criada uma escala completa de azuis (`blue-50` a `blue-900`) baseada na nova cor primária para manter a hierarquia visual e o contraste.
- **Variáveis Globais:** As cores `primary` e `primary-light` foram redefinidas para `#1C2E4A` e `#2A456E`, respectivamente.
- **Verificação:** Todos os componentes (`Sidebar`, `HighlightCard`, `RankingList`, `Heatmap`, `Header`) que utilizavam classes de cores azuis ou `primary` agora herdam automaticamente os novos valores.

**Arquivos modificados:**
- `index.html`: Configuração do `tailwind.config` atualizada com a nova paleta.

## 3. Algoritmo de Ordenação da Sidebar
Implementado um novo sistema de ordenação para os itens da navegação lateral.

**Funcionalidades:**
- **Extração Numérica:** O algoritmo extrai os números que precedem o caractere "-" nos títulos (ex: "1.3", "3.10").
- **Ordenação Natural:** Itens são ordenados numericamente (ex: 1.7 vem antes de 1.12).
- **Tratamento de Erros:** Itens sem numeração ou com formatos inesperados (ex: "MODAL") são automaticamente posicionados ao final da lista, mantendo a ordem alfabética entre si.
- **Persistência:** A ordenação é aplicada em tempo de renderização, garantindo consistência em cada recarregamento.

**Testes Unitários:**
- Foram criados testes automatizados utilizando `Vitest` em `utils/sorting.test.ts` cobrindo cenários de:
  - Extração de números simples e decimais.
  - Ordenação de listas mistas.
  - Posicionamento de itens sem numeração.
  - Tratamento de múltiplos formatos de títulos.

**Arquivos modificados/criados:**
- `utils/sorting.ts`: Lógica de ordenação (Criado).
- `utils/sorting.test.ts`: Testes unitários (Criado).
- `components/Sidebar.tsx`: Integração da lógica de ordenação no menu.
- `package.json`: Adicionada dependência `vitest` para validação.

---
*Desenvolvido em 02/02/2026*
