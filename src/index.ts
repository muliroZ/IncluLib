import './styles/tokens.css'
import './styles/index.css'
import './styles/theme-light.css'
import './styles/theme-dark.css'
import * as components from "./components";

// Outros imports dos componentes podem ser adicionados aqui

// Exporta os componentes individualmente
export * from './components';
export * from './theme';

// Exporta um objeto padrão para facilitar a instalação como plugin
export default {
    install(app: any) {
        for (const componentKey in components) {
            const component = (components as any)[componentKey];

            if (!component) continue;

            if (typeof component.install === 'function') {
                app.use(component);
                continue;
            }
            
            if (component?.name) {
                app.component(component.name, component);
            }
        }
    }
};