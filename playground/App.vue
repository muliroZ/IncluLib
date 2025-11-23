<template>
  <div class="container">
    <div class="header">
      <h1>🎨 IncluLib Playground</h1>
      <p>Testando todos os componentes da biblioteca</p>
      <AButton @click="toggleThemeHandler" style="margin-top: 15px">
        {{ isDarkTheme ? '☀️ Tema Claro' : '🌙 Tema Escuro' }}
      </AButton>
    </div>

    <div class="test-grid">
      <!-- Card: Input -->
      <div class="card">
        <h2>📝 AInput</h2>
        <p>Campo de entrada de texto com label</p>
        <div class="demo-content">
          <AInput 
            v-model="inputValue"
            label="Nome completo" 
            placeholder="Digite seu nome..." 
          />
          <p v-if="inputValue" style="color: #666; font-size: 0.85rem;">
            Valor: <strong>{{ inputValue }}</strong>
          </p>
        </div>
      </div>

      <!-- Card: Checkbox -->
      <div class="card">
        <h2>☑️ ACheckbox</h2>
        <p>Caixa de seleção com múltiplas opções</p>
        <div class="demo-content">
          <ACheckbox v-model="aceito">Aceito os termos de serviço</ACheckbox>
          <ACheckbox v-model="notificacoes">Receber notificações</ACheckbox>
          <ACheckbox v-model="newsletter">Inscrever na newsletter</ACheckbox>
          <p v-if="aceito || notificacoes || newsletter" style="color: #666; font-size: 0.85rem;">
            Selecionado: {{ [aceito ? 'Termos' : '', notificacoes ? 'Notificações' : '', newsletter ? 'Newsletter' : ''].filter(Boolean).join(', ') }}
          </p>
        </div>
      </div>

      <!-- Card: Button -->
      <div class="card">
        <h2>🔘 AButton</h2>
        <p>Botões com diferentes ações</p>
        <div class="demo-content">
          <AButton @click="incrementar">
            Clique aqui ({{ contador }})
          </AButton>
          <AButton @click="enviarMensagem">Enviar Mensagem</AButton>
          <p v-if="mensagem" style="color: #666; font-size: 0.85rem;">
            {{ mensagem }}
          </p>
        </div>
      </div>

      <!-- Card: Dropdown -->
      <div class="card">
        <h2>📋 ADropdown</h2>
        <p>Seleção em lista suspensa</p>
        <div class="demo-content">
          <ADropdown 
            v-model="categoriaSelecionada"
            label="Selecione uma categoria"
            :options="categoriasOptions"
          />
          <p v-if="categoriaSelecionada" style="color: #666; font-size: 0.85rem;">
            Selecionado: <strong>{{ categoriaSelecionada }}</strong>
          </p>
        </div>
      </div>

      <!-- Card: Tabs -->
      <div class="card">
        <h2>📑 ATabs</h2>
        <p>Abas para organizar conteúdo</p>
        <div class="demo-content">
          <ATabs v-model="abaAtiva" :tabs="abas">
            <template #default>
              <div v-if="abaAtiva === 'tab-home'" style="padding: 15px;">
                <p>Bem-vindo à aba inicial! Esta é uma área de teste para o componente ATabs.</p>
              </div>
              <div v-if="abaAtiva === 'tab-settings'" style="padding: 15px;">
                <p>Aqui ficam as configurações do seu perfil.</p>
              </div>
              <div v-if="abaAtiva === 'tab-about'" style="padding: 15px;">
                <p>IncluLib é uma biblioteca de componentes Vue 3 acessível e reutilizável.</p>
              </div>
            </template>
          </ATabs>
          <p style="color: #666; font-size: 0.85rem; margin-top: 10px;">
            Aba ativa: <strong>{{ abaAtiva }}</strong>
          </p>
        </div>
      </div>

      <!-- Card: Modal -->
      <div class="card">
        <h2>🔲 AModal</h2>
        <p>Modal para apresentar conteúdo em primeiro plano</p>
        <div class="demo-content">
          <AButton @click="abrirModal">Abrir Modal</AButton>
          <AModal v-model="modalAberto" title="Título da Modal">
            <p>Este é o conteúdo da modal. Você pode fechar clicando no botão abaixo ou fora da modal.</p>
            <template #footer>
              <AButton @click="fecharModal">Fechar</AButton>
            </template>
          </AModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toggleTheme, getTheme, setTheme } from '../src/theme/index'
import AButton from '../src/components/AButton.vue'
import ACheckbox from '../src/components/ACheckbox.vue'
import AInput from '../src/components/AInput.vue'
import ADropdown from '../src/components/ADropdown.vue'
import AModal from '../src/components/AModal.vue'
import ATabs from '../src/components/ATabs.vue'

// Estados
const inputValue = ref('')
const aceito = ref(false)
const notificacoes = ref(false)
const newsletter = ref(false)
const contador = ref(0)
const mensagem = ref('')
const categoriaSelecionada = ref('')
const modalAberto = ref(false)
const abaAtiva = ref('tab-home')
const isDarkTheme = ref(getTheme() === 'dark')

// Dados
const categoriasOptions = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'design', label: 'Design' },
  { id: 'devops', label: 'DevOps' },
  { id: 'database', label: 'Banco de Dados' }
]

const abas = [
  { id: 'tab-home', label: 'Home' },
  { id: 'tab-settings', label: 'Configurações' },
  { id: 'tab-about', label: 'Sobre' }
]

// Métodos
const toggleThemeHandler = () => {
  toggleTheme()
  isDarkTheme.value = getTheme() === 'dark'
}

const incrementar = () => {
  contador.value++
}

const enviarMensagem = () => {
  mensagem.value = '✅ Mensagem enviada com sucesso!'
  setTimeout(() => {
    mensagem.value = ''
  }, 3000)
}

const abrirModal = () => {
  modalAberto.value = true
}

const fecharModal = () => {
  modalAberto.value = false
}
</script>
