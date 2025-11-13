import AButton from "./AButton.vue";
import AInput from "./AInput.vue";
import ACheckbox from "./ACheckbox.vue";
import AModal from "./AModal.vue";
import ATabs from "./ATabs.vue";
import ADropdown from "./ADropdown.vue";

export {
    AButton,
    AInput,
    ACheckbox,
    AModal,
    ATabs,
    ADropdown
}

export default {
    install(app: any) {
        app.component("AButton", AButton);
        app.component("AInput", AInput);
        app.component("ACheckbox", ACheckbox);
        app.component("AModal", AModal);
        app.component("ATabs", ATabs);
        app.component("ADropdown", ADropdown);
    }
}