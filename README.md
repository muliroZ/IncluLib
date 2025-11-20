# IncluLib - Biblioteca de Componentes Vue 3 + TypeScript + Vite

Uma **Biblioteca de Componentes** moderna e reutilizável construída com Vue 3, TypeScript e Vite. IncluLib fornece componentes acessíveis, bem-documentados e prontos para produção.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Características](#características)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação & Setup](#instalação--setup)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Scripts Disponíveis](#scripts-disponíveis)
7. [Desenvolvendo Componentes](#desenvolvendo-componentes)
8. [Componentes Disponíveis](#componentes-disponíveis)
9. [TypeScript & Tipagem](#typescript--tipagem)
10. [Storybook & Documentação](#storybook--documentação)
11. [Testes](#testes)
12. [Build & Publicação](#build--publicação)
13. [Boas Práticas](#boas-práticas)
14. [Contribuindo](#contribuindo)
15. [Recursos](#recursos)

## 🎯 Visão Geral

**IncluLib** é uma biblioteca de componentes Vue 3 profissional que fornece:

- 🎨 Componentes reutilizáveis e customizáveis
- ♿ Componentes acessíveis (WCAG 2.1)
- 📦 Totalmente tipada com TypeScript
- 🚀 Build otimizada com Vite
- 📚 Documentação completa
- 🧪 Testes unitários inclusos
- 🎭 Storybook integrado

### Casos de Uso

- ✅ Integrar em aplicações Vue 3 existentes
- ✅ Usar como base para design system
- ✅ Compartilhar componentes entre projetos
- ✅ Aprender padrões modernos de Vue

## ✨ Características Principais

- **Componentes Isolados**: Cada componente é independente e pode ser usado separadamente
- **Type-Safe**: Tipagem TypeScript completa com interfaces bem definidas
- **Acessibilidade**: Suporte nativo a acessibilidade (WCAG 2.1)
- **Zero Dependencies**: Sem dependências externas (exceto Vue 3)
- **Temas Customizáveis**: Suporte a CSS variables para personalização
- **HMR**: Hot Module Replacement instantâneo durante desenvolvimento
- **Tree-shakeable**: Importe apenas os componentes que precisa

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js**: v16.0.0 ou superior ([Download](https://nodejs.org/))
- **npm**: v8.0.0 ou superior
- **git**: Para controle de versão ([Download](https://git-scm.com/))

Verifique as versões:

```bash
node --version
npm --version
git --version
```

## 🚀 Instalação & Setup

### Para Desenvolvimento

```bash
# Clonar repositório
git clone <seu-repositorio>
cd IncluLib

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Para Usar Como Dependência

```bash
# Instalação via npm (quando publicada)
npm install inclulib

# Instalação via yarn
yarn add inclulib

# Instalação via pnpm
pnpm add inclulib
```

Uso na aplicação:

```typescript
// main.ts
import { createApp } from 'vue'
import IncluLib from 'inclulib'
import 'inclulib/style.css'
import App from './App.vue'

createApp(App)
  .use(IncluLib)
  .mount('#app')
```

Ou importar componentes específicos:

```vue
<script setup lang="ts">
import { Button, Card, Input } from 'inclulib'
</script>

<template>
  <Button>Clique aqui</Button>
  <Card>Conteúdo do card</Card>
</template>
```

## 📁 Estrutura do Projeto

```
IncluLib/
├── src/
│   ├── components/              # Componentes da biblioteca
│   │   ├── index.ts
│   │   ├── AButton.vue
│   │   ├── ACheckbox.vue
│   │   ├── AInput.vue
│   │   └── ...outros componentes
│   ├── styles/                  # Estilos globais e variáveis CSS
│   │   ├── index.css
│   │   ├── theme-dark.css
│   │   ├── theme-light.css
│   │   └── tokens.css
│   ├── theme/                  # Importação e lógica dos temas
│   │   ├── index.ts
│   │   └── provider.vue
│   ├── index.ts                 # Ponto de entrada da biblioteca
│   └── vite-env.d.ts            # Tipos Vite
├── dist/                        # Build da biblioteca (gerado)
├── node_modules/                # Dependências (gerado)
├── package.json                 # Configuração do projeto
├── package-lock.json
├── tsconfig.json                # Configuração TypeScript
├── vite.config.ts               # Configuração Vite
├── vitest.config.ts             # Configuração Vitest (se usado)
└── README.md                    # Este arquivo
```

### Estrutura de um Componente

Cada componente segue um padrão consistente:

```
src/components/Button/
├── Button.vue               # Implementação do componente
├── Button.test.ts          # Testes unitários
├── Button.stories.ts       # Histórias Storybook
├── types.ts                # Tipos específicos do componente
├── composables.ts          # Lógica reutilizável do componente
└── index.ts                # Exportação pública
```

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev
```
Inicia o servidor de desenvolvimento com HMR. Acesse http://localhost:5173 para visualizar e testar componentes.

### Build da Biblioteca

```bash
npm run build
```
Cria a build otimizada para produção em `dist/`. Inclui:
- Componentes compilados em múltiplos formatos (ESM, UMD, etc.)
- Arquivos de tipo TypeScript (.d.ts)
- CSS otimizado
- Tree-shaking automático

### Preview de Produção

```bash
npm run preview
```
Visualiza localmente a build de produção.

## 💻 Desenvolvendo Componentes

### Criar um Novo Componente

**1. Implementar componente (MeuComponente.vue)**

```vue
<!-- src/components/MeuComponente.vue -->
<template>
  <div class="meu-componente" :class="variantes">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { MeuComponenteProps } from './types'

withDefaults(defineProps<MeuComponenteProps>(), {
  tamanho: 'md',
  variante: 'primary'
})

defineEmits<{
  clique: []
}>()
</script>

<style scoped>
.meu-componente {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  cursor: pointer;
  transition: all 0.2s ease;
}

.meu-componente:hover {
  border-color: var(--color-primary);
}
</style>
```

**2. Exportar (index.ts)**

```typescript
// src/components/index.ts
export { default as MeuComponente } from './MeuComponente.vue'
export type { MeuComponenteProps } from './types'
```

**3. Adicionar à exportação principal**

```typescript
// src/index.ts
export { MeuComponente } from './components/MeuComponente'
export type { MeuComponenteProps } from './components/MeuComponente/types'
```

## 📦 Componentes Disponíveis

- **Button**: Botão customizável
- **Input**: Campo de entrada de texto
- **Checkbox**: Caixa de seleção
- **Modal**: Caixa de diálogo
- **Tabs**: Abas de navegação
- **Dropdown**: Lista suspensa

## 🔷 TypeScript & Tipagem

### Sistema de Tipos

Todos os componentes são totalmente tipados:

```typescript
// Importar tipos de componentes
import type { ButtonProps, CardProps } from 'inclulib'

// Usar com type safety
const props: ButtonProps = {
  tamanho: 'lg',
  variante: 'primary',
  desabilitado: false
}
```

### Interfaces Genéricas

```typescript
// src/types/index.ts
export interface ComponentProps {
  class?: string
  style?: Record<string, any>
  disabled?: boolean
}

export type Tamanho = 'sm' | 'md' | 'lg' | 'xl'
export type Variante = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
```

### Configuração TypeScript

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationDir": "./dist",
    "types": ["vite/client", "vitest/globals"]
  }
}
```

## 📦 Build & Publicação

### Build da Biblioteca

```bash
npm run build
```

Gera arquivos em `dist/`:

```
dist/
├── inclulib.es.js          # ESM
├── inclulib.umd.js         # UMD
├── index.css               # CSS compilado
```

### Publicar no npm

```bash
# Verificar versão
npm version patch | minor | major

# Publicar
npm publish

# Com tag
npm publish --tag beta
```

### package.json para Publicação

```json
{
  "name": "inclulib",
  "version": "1.0.0",
  "description": "Biblioteca de componentes Vue 3",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./style.css": "./dist/style.css"
  },
  "files": ["dist"],
  "keywords": ["vue", "vue3", "components", "ui-library"],
  "author": "Seu Nome",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/seu-usuario/inclulib"
  }
}
```

## ✨ Boas Práticas

### 1. Acessibilidade (A11y)

```vue
<template>
  <!-- Usar atributos ARIA -->
  <button
    :aria-label="label"
    :aria-disabled="disabled"
    :aria-expanded="isOpen"
  >
    <!-- ... -->
  </button>
</template>
```

### 2. Customização via CSS Variables

```vue
<style scoped>
.botao {
  padding: var(--button-padding, 0.5rem 1rem);
  background: var(--button-bg, #42b983);
  color: var(--button-text, white);
  border: none;
  border-radius: var(--border-radius, 4px);
}
</style>
```

### 3. Slot Nomeados para Flexibilidade

```vue
<template>
  <div class="card">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

### 4. Composables para Lógica Reutilizável

```typescript
// src/composables/useClickOutside.ts
import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(element: Ref<HTMLElement | null>, callback: () => void) {
  const handleClick = (event: MouseEvent) => {
    if (element.value && !element.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('click', handleClick))
  onUnmounted(() => document.removeEventListener('click', handleClick))
}
```

### 5. Props com Defaults

```vue
<script setup lang="ts">
interface Props {
  tamanho?: 'sm' | 'md' | 'lg'
  variante?: 'primary' | 'secondary'
  desabilitado?: boolean
}

withDefaults(defineProps<Props>(), {
  tamanho: 'md',
  variante: 'primary',
  desabilitado: false
})
</script>
```

### 6. Emits Tipados

```vue
<script setup lang="ts">
const emit = defineEmits<{
  clique: [id: number]
  atualizar: [valor: string]
  fechar: []
}>()
</script>
```

## 👥 Contribuindo

### Setup de Desenvolvimento

```bash
git clone <repositorio>
npm install
npm run dev
```

### Fluxo de Contribuição

1. Crie uma branch (`git checkout -b feature/novo-componente`)
2. Desenvolva e teste seu componente
3. Adicione documentação e stories
4. Execute `npm run test` e `npm run lint`
5. Commit (`git commit -m 'Add novo componente'`)
6. Push (`git push origin feature/novo-componente`)
7. Abra um Pull Request

Veja `docs/CONTRIBUTING.md` para diretrizes completas.

## 📚 Recursos

### Documentação Oficial

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/)
- [Vite Documentation](https://vitejs.dev/)
- [Storybook Guide](https://storybook.js.org/docs/vue/get-started)
- [Vitest Documentation](https://vitest.dev/)

### Padrões & Boas Práticas

- [Vue Style Guide](https://vuejs.org/style-guide/)
- [WCAG 2.1 Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Component API Design](https://component-api-guidelines.netlify.app/)

### Ferramentas

- **VS Code**: Editor recomendado
- **Volar**: Extensão Vue 3 para VS Code
- **Vue DevTools**: Debug extension

## 📄 Licença

MIT License - veja `LICENSE` para detalhes.

## 📧 Contato & Suporte

- Issues: https://github.com/seu-usuario/inclulib/issues
- Discussões: https://github.com/seu-usuario/inclulib/discussions
- Email: contato@inclulib.dev

---

**Versão**: 1.0.0 | **Última atualização**: 2024
