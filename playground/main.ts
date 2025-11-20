import { createApp } from 'vue'

// importa a sua lib pelo alias funcionando
import IncluLib from '@lib'

// importa estilos globais da lib
import '@lib/styles/tokens.css'
import '@lib/styles/index.css'
import '@lib/styles/theme-light.css'
import '@lib/styles/theme-dark.css'

import App from './App.vue'

const app = createApp(App)
app.use(IncluLib)
app.mount('#app')
