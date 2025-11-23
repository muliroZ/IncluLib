import { createApp } from 'vue'

// importa a sua lib pelo alias funcionando
import IncluLib from '../src/index'

// importa estilos globais da lib
import '../src/styles/tokens.css'
import '../src/styles/index.css'
import '../src/styles/theme-light.css'
import '../src/styles/theme-dark.css'
import App from './App.vue'

const app = createApp(App)
app.use(IncluLib)

async function initAxe() {
    try {
        const {default: VueAxe} = await import('vue-axe')
        app.use(VueAxe)
        console.log('Vue Axe carregado com sucesso!')
    } catch (e) {
        console.warn('Vue Axe não foi carregado. Verifique se o axe está instalado: npm i -D vue-axe')
        console.error(e)
    }
}

initAxe().then(() => {
    app.mount('#app')
})
