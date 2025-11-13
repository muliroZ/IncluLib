import './styles/index.css'
import * as components from "./components";
// Outros imports dos componentes podem ser adicionados aqui

// Exporta os componentes individualmente
export * from './components';

// Exporta um objeto padrão para facilitar a instalação como plugin
export default {
    install(app: any) {
        for (const componentKey in components) {
            const component = (components as any)[componentKey];
            if (component?.name) {
                app.component(component.name, component);
            }
        }
    }
};