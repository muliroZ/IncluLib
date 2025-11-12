import AButton from "./components/AButton.vue";
// Outros imports dos componentes podem ser adicionados aqui

// Exporta os componentes individualmente
export { AButton };

// Exporta um objeto padrão para facilitar a instalação como plugin
export default {
    install(app: any) {
        // Registra os componentes globalmente
        app.component("AButton", AButton);
    }
};