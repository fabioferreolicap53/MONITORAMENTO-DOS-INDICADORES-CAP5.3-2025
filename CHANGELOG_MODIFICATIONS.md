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

## 4. Criação do Indicador 4.3 e Duplicação da Página MODAL
Atendendo à solicitação de expansão do monitoramento, foi criada uma nova página para o indicador 4.3.

**Ações realizadas:**
- **Duplicação da Estrutura:** A página "MODAL" foi utilizada como base para a criação do indicador `indicator-4.3`.
- **Atualização de Metadados:**
  - **Título:** `4.3 - PROPORÇÃO DE GESTANTES COM ATENDIMENTO ODONTOLÓGICO REALIZADO NOS ÚLTIMOS 12 MESES`.
  - **Periodicidade:** Atualizada para `QUADRIMESTRAL`.
  - **Meta 2025:** `60,00%`.
  - **Fonte:** `SISAB`.
  - **Critério de Avaliação:** `Média aritmética simples dos resultados do 3º quadrimestre (Setembro a Dezembro de 2025)`.
- **Gestão de Dados:**
  - Criado o conjunto de dados `DATA_4_3` em `constants.ts` com os valores extraídos da tabela fornecida.
  - Implementado tratamento para células `NA` (not available), garantindo que sejam desconsideradas nos cálculos de média de performance.
- **Sincronização de Componentes:**
  - O gráfico de **Ranking de Desempenho 2025** foi configurado para refletir a periodicidade quadrimestral (set-dez).
  - O card **Líder do Território** e a seção **Seguradores de Performance** foram sincronizados para exibir as 3 unidades com melhor média no 3º quadrimestre.

**Arquivos modificados:**
- `constants.ts`: Adicionado `DATA_4_3` e entrada em `INDICATORS`.
- `components/Sidebar.tsx`: Adicionado item `indicator-4.3` ao menu.
- `views/MonitoringView.tsx`: Ajustada lógica de cálculo para suportar periodicidade `QUADRIMESTRAL`.
- `components/HighlightCard.tsx`: Ajustada lógica de exibição e métricas para suporte a `QUADRIMESTRAL`.

## 5. Criação e Atualização do Indicador 4.5
Atendendo à nova solicitação, foi criada uma página para o indicador 4.5 baseada na estrutura "MODAL" e atualizada com dados específicos.

**Ações realizadas:**
- **Duplicação da Estrutura:** A página "MODAL" serviu como base para o `indicator-4.5`.
- **Atualização de Metadados:**
  - **Título:** `4.5 - PROPORÇÃO DE PACIENTES TABAGISTAS QUE PASSARAM POR ATENDIMENTO ODONTOLÓGICO INDIVIDUAL, GRUPO OU ATIVIDADE COLETIVA NOS ÚLTIMOS 12 MESES`.
  - **Periodicidade:** `MENSAL`.
  - **Meta 2025:** `70,00%`.
  - **Fonte:** `(PEP) UAP / Plataforma SUBPAV`.
  - **Critério de Avaliação:** `Média aritmética simples dos resultados mensais acumulados no ano de 2025 (Janeiro a Dezembro de 2025)`.
- **Gestão de Dados:**
  - Criado o conjunto de dados `DATA_4_5` em `constants.ts` com os valores extraídos da tabela fornecida.
  - Implementado tratamento para células desconsideradas nos cálculos de média de performance (null handling).
- **Sincronização de Componentes:**
  - O gráfico de **Ranking de Desempenho 2025** e o card **Líder do Território** foram sincronizados para refletir a média mensal acumulada de 2025.

**Arquivos modificados:**
- `constants.ts`: Adicionado `DATA_4_5` e entrada configurada em `INDICATORS`.
- `components/Sidebar.tsx`: Adicionado item `indicator-4.5` ao menu lateral.
- `views/MonitoringView.tsx`: Verificada compatibilidade da lógica de cálculo para periodicidade `MENSAL`.
- `components/HighlightCard.tsx`: Verificada compatibilidade da exibição de métricas para suporte a `MENSAL`.

## 6. Criação e Atualização do Indicador 4.6
Atendendo à nova solicitação, foi criada uma página para o indicador 4.6 baseada na estrutura "MODAL" e atualizada com dados específicos.

**Ações realizadas:**
- **Atualização de Metadados:**
  - **Título:** `4.6 - PERCENTUAL DE PACIENTES COM TB AVALIADOS PELA EQUIPE DE SAÚDE BUCAL NA ALTA POR CURA`.
  - **Periodicidade:** `MENSAL`.
  - **Meta 2025:** `80,00%`.
  - **Fonte:** `PEP`.
  - **Critério de Avaliação:** `Média aritmética simples dos resultados mensais acumulados no ano de 2025 (Janeiro a Dezembro de 2025).`.
- **Gestão de Dados:**
  - Criado o conjunto de dados `DATA_4_6` em `constants.ts` com os valores extraídos da imagem fornecida.
  - Implementado tratamento para células `NA` da imagem, convertendo-as para `null` para que sejam desconsideradas nos cálculos de média de performance.
- **Sincronização de Componentes:**
  - O gráfico de **Ranking de Desempenho 2025** e o card **Líder do Território** foram sincronizados para refletir a média mensal acumulada de 2025, garantindo que o card mostre exatamente as 3 primeiras unidades do ranking.

**Arquivos modificados:**
- `constants.ts`: Adicionado `DATA_4_6`, entrada configurada em `INDICATORS` e remoção de duplicata de `DATA_3_10` que causava erro de compilação.
- `components/Sidebar.tsx`: Adicionado item `indicator-4.6` ao menu lateral.

## 7. Criação e Atualização do Indicador 6.2
Atendendo à solicitação, foi criada uma nova página para o indicador 6.2 baseada na estrutura "MODAL" e atualizada com dados específicos.

**Ações realizadas:**
- **Atualização de Metadados:**
  - **Título:** `6.2 - PROPORÇÃO DE IDOSOS CADASTRADOS COM REGISTRO DE AVALIAÇÃO MULTIDIMENSIONAL`.
  - **Periodicidade:** `MENSAL`.
  - **Meta 2025:** `50%`.
  - **Fonte:** `PEP`.
  - **Critério de Avaliação:** `Média aritmética simples dos resultados mensais acumulados no ano de 2025 (Janeiro a Dezembro de 2025).`.
- **Gestão de Dados:**
  - Criado o conjunto de dados `DATA_6_2` em `constants.ts` com os valores extraídos da imagem fornecida.
  - Implementado tratamento para células desconsideradas nos cálculos de média de performance (null handling).
- **Sincronização de Componentes:**
  - O gráfico de **Ranking de Desempenho 2025** e o card **Líder do Território** foram sincronizados para refletir a média mensal acumulada de 2025, garantindo que o card mostre exatamente as 3 primeiras unidades do ranking.

**Arquivos modificados:**
- `constants.ts`: Adicionado `DATA_6_2` e entrada configurada em `INDICATORS`.
- `components/Sidebar.tsx`: Adicionado item `indicator-6.2` ao menu lateral.

---
*Desenvolvido em 02/02/2026*
