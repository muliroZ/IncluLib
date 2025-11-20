# IncluLib

Biblioteca de componentes Vue focada em acessibilidade (a11y).  
Fornece componentes reutilizáveis para acelerar a construção de interfaces inclusivas com Vue 3.

Versão: v1.0.0

---

**Sumário**
- [Descrição](#descrição)
- [Recursos principais](#recursos-principais)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Desenvolvimento & playground](#desenvolvimento--playground)
- [Build / Publicação](#build--publicação)
- [Uso (ESM / UMD / CDN)](#uso)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Componentes](#componentes)
- [Design Tokens](#design-tokens)
- [Como contribuir](#como-contribuir)
- [Boas práticas de acessibilidade](#boas-práticas-de-acessibilidade-a11y)
- [Licença](#licença)

---

Descrição
=========
IncluLib é uma coleção modular de componentes UI escritos em TypeScript para Vue 3, projetada para facilitar a construção de interfaces acessíveis. O objetivo é prover componentes com padrões de acessibilidade já aplicados (atributos ARIA, comportamento por teclado, foco gerenciado etc.) para que equipes possam entregar experiências inclusivas com menos esforço.

Recursos principais
===================
- Componentes Vue compatíveis com Vue 3 (peer dependency: vue ^3.5.0)
- Build pronta para publicação (ESM + UMD)
- Suporte TypeScript (construção com vue-tsc)
- Playground local com Vite para testar componentes
- Foco em práticas de acessibilidade

Requisitos
==========
- Node.js (recomenda-se versão LTS atual)
- npm ou yarn
- Vue 3 (compatibilidade declarada como peerDependency)

Instalação
==========
Para utilizar a biblioteca já publicada (quando disponível) ou instalar localmente:

- Se publicada no registro npm:
```bash
npm install inclulib
# ou
yarn add inclulib
```

- Para trabalhar localmente com o repositório:
```bash
git clone https://github.com/muliroZ/IncluLib.git
cd IncluLib
npm install
```

Desenvolvimento & playground
============================
O projeto usa Vite e possui um modo "playground" para desenvolver e testar visualmente os componentes.

Scripts importantes (definidos em package.json):
- npm run dev
  - Executa Vite em modo de desenvolvimento com a variável de ambiente PLAYGROUND=true (cross-env PLAYGROUND=true vite). Isso serve o playground localmente.
- npm run build
  - Executa checagem de tipos com vue-tsc e depois constrói os bundles com Vite (vue-tsc -b && vite build).
- npm run preview
  - Pré-visualiza o build estático gerado pelo Vite.

Exemplo para rodar o playground:
```bash
npm install
npm run dev
# abra http://localhost:5173 (ou a porta indicada) e teste os componentes no playground
```

Build / Publicação
==================
O processo de build gera bundles em "dist" conforme package.json:
- main (CommonJS/UMD): dist/inclulib.umd.js
- module (ESM): dist/inclulib.es.js

Recomendações antes de publicar:
1. Rodar checagem de tipos e build:
```bash
npm run build
```
2. Verificar / atualizar o campo "types" no package.json para apontar para as declarações de tipo geradas (ex.: "types": "dist/types/index.d.ts") caso você gere tipos.
3. Verificar bundle final em `dist/` e testar importações em projetos consumidores.
4. Atualizar versão em package.json e publicar com `npm publish` (com as credenciais/configuração apropriadas).

package.json — pontos relevantes
- name: inclulib
- description: Biblioteca de componentes Vue para acessibilidade
- version: 1.0.0
- main: dist/inclulib.umd.js
- module: dist/inclulib.es.js
- files: ["dist"]
- scripts: dev, build, preview
- dependencies: vue ^3.5.24
- peerDependencies: vue ^3.5.0
- devDependencies: vite, typescript, vue-tsc, @vitejs/plugin-vue, etc.
- sideEffects: ["**/*.css"]
- exports: import -> ./dist/inclulib.es.js, require -> ./dist/inclulib.umd.js

Uso
===
Importação em projetos modernos (ESM, bundlers):
```js
// Import específico 
import { MeuComponente } from 'inclulib';

// ou importar o bundle principal
import 'inclulib';
```

Uso via script (UMD):
- Depois de gerar o build, sirva o arquivo UMD `dist/inclulib.umd.js` e inclua em uma página:
```html
<script src="/path/to/inclulib.umd.js"></script>
<!-- Dependendo do UMD build pode expor um global; verifique o bundle para o nome do global -->
```
Observação: verifique o bundle gerado para confirmar o nome do global exposto pelo UMD (caso precise usar via tag <script>).

Estrutura do repositório
========================
(Pasta/arquivos principais observados)
- src/                 -> código-fonte dos componentes (Vue + TypeScript)
- playground/          -> app de demonstração para desenvolvimento
- dist/                -> saída do build (gerada)
- package.json         -> configuração do pacote (scripts, dependências, exports)
- vite.config.ts       -> configuração do Vite (build/dev server)
- tsconfig.json        -> configuração TypeScript
- tsconfig.app.json    -> configuração TS específica para app/playground
- tsconfig.node.json   -> configuração TS para ambiente Node (scripts/tools)
- .vscode/             -> configurações do editor (opcional)
- .gitignore

Componentes
===========
---

## Componentes Interativos

| Componente | Descrição Principal | Acessibilidade (ARIA / Teclado) | Implementação |
| :--- | :--- | :--- | :--- |
| **AButton** | Botão primário e secundário. | Suporte a `:aria-disabled` e `:aria-busy` para estados de carregamento e desabilitado. | `AButton.vue` |
| **AInput** | Campo de texto com rótulo. | Rótulo (`<label>`) associado via `id`, uso de `:aria-describedby` para erros e descrições. | `AInput.vue` |
| **ACheckbox** | Caixa de seleção. | Uso de `role="checkbox"`, suporte ao estado `indeterminate`, estilização de foco (`:focus-visible`). | `ACheckbox.vue` |
| **AModal** | Diálogo flutuante de alto impacto. | `role="dialog"`, atributo `aria-label`, tratamento de **Focus Trap** e fechamento via tecla `Escape`. | `AModal.vue` |
| **ADropdown** | Menu de seleção customizável. | `aria-haspopup="listbox"`, `role="listbox" / role="option"`, navegação via teclado. | `ADropdown.vue` |
| **ATabs** | Navegação por abas. | `role="tablist"`, `role="tab"`, navegação por `ArrowLeft`/`ArrowRight`. | `ATabs.vue` |

Design Tokens
=============

Estes tokens representam as decisões visuais do design system, garantindo consistência e escalabilidade em toda a aplicação. Eles estão definidos no arquivo `tokens.css` e são utilizados nos temas (`theme-light.css` e `theme-dark.css`).

---

### 🌈 Cores

| Variável | Valor (Hex) | Descrição |
| :--- | :--- | :--- |
| **Marca Principal** | | |
| `--color-brand-primary-500` | `#3b82f6` | Cor principal da marca (nível 500) |
| `--color-brand-primary-600` | `#2563eb` | Cor principal da marca (nível 600) |
| **Marca Secundária** | | |
| `--color-brand-secondary-500` | `#8B5CF6` | Cor secundária da marca (nível 500) |
| **Feedback** | | |
| `--color-feedback-success-500` | `#10b981` | Cor para mensagens de sucesso |
| `--color-feedback-warning-500` | `#f59e0b` | Cor para mensagens de aviso/alerta |
| `--color-feedback-error-500` | `#ef4444` | Cor para mensagens de erro/perigo |
| **Neutras** | | |
| `--color-neutral-100` | `#f1f5f9` | Tom neutro claro |
| `--color-neutral-300` | `#cbd5e1` | Tom neutro para bordas leves |
| `--color-neutral-500` | `#64748b` | Tom neutro para texto secundário/sutil |
| `--color-neutral-800` | `#1e293b` | Tom neutro escuro |
| `--color-neutral-900` | `#0f172a` | Tom neutro mais escuro (fundo em dark mode) |
| **Gerais** | | |
| `--black` | `#000` | Preto puro |
| `--white` | `#fff` | Branco puro |

---

### 💡 Temas (Modos Claro e Escuro)

Os temas definem o uso das cores neutras e da marca em diferentes contextos visuais.

#### Modo Claro (`[data-theme="light"]`)

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| `--color-bg` | `var(--white)` | Fundo principal |
| `--color-bg-soft` | `var(--color-neutral-100)` | Fundo suave/secundário |
| `--color-text-primary` | `var(--color-neutral-900)` | Cor primária do texto |
| `--color-text-secondary` | `var(--color-neutral-500)` | Cor secundária do texto |
| `--color-border` | `var(--color-neutral-300)` | Cor padrão da borda |
| `--color-primary` | `var(--color-brand-primary-600)` | Cor principal de elementos interativos/botões |
| `--color-primary-text` | `var(--white)` | Cor do texto em elementos primários |
| `--color-primary-hover` | `var(--color-brand-primary-500)` | Cor primária ao passar o mouse (hover) |
| `--color-text-subtle` | `var(--color-neutral-500)` | Cor do texto sutil |

#### Modo Escuro (`[data-theme="dark"]`)

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| `--color-bg` | `var(--color-neutral-900)` | Fundo principal |
| `--color-bg-soft` | `var(--color-neutral-800)` | Fundo suave/secundário |
| `--color-text-primary` | `var(--color-neutral-100)` | Cor primária do texto |
| `--color-text-secondary` | `var(--color-neutral-300)` | Cor secundária do texto |
| `--color-border` | `var(--color-neutral-500)` | Cor padrão da borda |
| `--color-primary` | `var(--color-brand-primary-500)` | Cor principal de elementos interativos/botões |
| `--color-primary-text` | `var(--white)` | Cor do texto em elementos primários |
| `--color-primary-hover` | `var(--color-brand-primary-600)` | Cor primária ao passar o mouse (hover) |
| `--color-text-subtle` | `var(--color-neutral-500)` | Cor do texto sutil |

---

### 🔠 Tipografia

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| `--font-family` | `'Inter', sans-serif` | Família de fontes padrão |
| `--font-heading-1` | `3rem` | Tamanho da fonte para `h1` |
| `--font-heading-2` | `2.25rem` | Tamanho da fonte para `h2` |
| `--font-heading-3` | `1.875rem` | Tamanho da fonte para `h3` |
| `--font-body-large` | `1.125rem` | Tamanho da fonte para corpo de texto grande |
| `--font-body-regular` | `1rem` | Tamanho da fonte padrão para o corpo de texto |
| `--font-caption` | `0.875rem` | Tamanho da fonte para legendas/notas pequenas |

---

### 📏 Espaçamento

Os tokens de espaçamento seguem uma escala incremental.

| Variável | Valor (px) | Descrição |
| :--- | :--- | :--- |
| `--spacing-xs` | `4px` | Extra pequeno |
| `--spacing-sm` | `8px` | Pequeno |
| `--spacing-md` | `16px` | Médio (padrão) |
| `--spacing-lg` | `24px` | Grande |
| `--spacing-xl` | `32px` | Extra grande |
| `--spacing-xxl` | `48px` | Extra, extra grande |

---

### 🖼️ Bordas e Sombras

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| **Raio da Borda** | | |
| `--border-radius-sm` | `4px` | Raio de borda pequeno |
| `--border-radius-md` | `8px` | Raio de borda médio |
| `--border-radius-lg` | `16px` | Raio de borda grande |
| `--border-radius-full` | `9999px` | Borda completamente arredondada (pílula) |
| **Sombra** | | |
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Sombra pequena |
| `--shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` | Sombra média |
| `--shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | Sombra grande |
| `--shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1)` | Sombra extra grande |

---

### ⚙️ Gerais

| Variável | Valor | Descrição |
| :--- | :--- | :--- |
| `--transition` | `0.3s ease` | Duração e função de transição padrão |
| `--focus-ring` | `0 0 0 3px rgba(37, 99, 235, 0.4)` | Estilo do anel de foco (acessibilidade) |

## ⚙️ Diretrizes de Design Inclusivo

O Design System se baseia em tokens que garantem a conformidade visual.

* **Contraste (WCAG 1.4.3):** A paleta de cores é definida para garantir uma razão de contraste mínima de 4.5:1 para texto normal (e 7:1 para texto principal).
* **Tipografia:** Tamanho mínimo de fonte de **16px** e altura de linha (line height) entre **1.4 e 1.6** para maior conforto visual e legibilidade.
* **Foco Visível:** Todos os elementos interativos possuem um anel de foco (focus outline) de alta visibilidade (`var(--focus-ring)`), essencial para usuários de teclado.

Como contribuir
===============
Contribuições são bem-vindas! Siga estas orientações para facilitar a revisão:

1. Abra uma issue antes de implementar grandes mudanças para discutir a proposta.
2. Faça um fork do repositório e crie uma branch com nome descritivo:
   - feature/nome-da-feature
   - fix/descricao-do-bug
3. Garanta que seu código:
   - Está em TypeScript com checagem habilitada
   - Mantém ou melhora a acessibilidade dos componentes
   - Inclui ou atualiza exemplos no playground quando aplicável
4. Atualize (ou adicione) documentação se o comportamento público mudar.
5. Abra um Pull Request descrevendo:
   - O que você implementou
   - Por que é necessário
   - Como testar localmente
6. Escreva commits pequenos e atômicos com mensagens descritivas.

Boas práticas de acessibilidade (a11y)
=====================================
Algumas diretrizes que a biblioteca segue ou que devem ser observadas ao criar novos componentes:
- Fornecer labels e relações ARIA claras (aria-label, aria-labelledby, aria-describedby).
- Garantir navegação por teclado (tabindex, handling de teclas).
- Gerenciar ordem de foco e foco visível.
- Usar roles apropriados para elementos não semânticos.
- Testar com leitores de tela e com navegação apenas por teclado.
- Evitar dependência exclusiva de cor; fornecer contraste suficiente.

Sugestões de testes a realizar ao adicionar componentes
- Teste de navegação por teclado (tab, shift+tab, enter, esc, arrow keys se aplicável).
- Testes com leitores de tela (NVDA, VoiceOver).
- Verificar estados (focado, desabilitado, erro) e suas mensagens acessíveis.

Roadmap
=================
- [ ] Criar mais componentes focados em formulários acessíveis
- [ ] Publicar na registry npm com bundle otimizado
- [ ] Adicionar testes automatizados e CI
- [ ] Gerar e publicar declarações de tipo (d.ts) no dist

Dúvidas / Suporte
=================
Abra uma issue no repositório com:
- título claro
- descrição do problema/feature
- passos para reproduzir (se for bug)
- contexto do ambiente (Node, npm, browser, versão do Vue)

Licença
=======
MIT — consulte o arquivo LICENSE.

Agradecimentos
==============
Obrigado por usar / contribuir com IncluLib. Contribuições que melhorem a acessibilidade e a experiência do usuário são especialmente bem-vindas.
