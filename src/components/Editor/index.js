import Editor from './editor.vue'

const componentName = 'vue-editor'

// vue3
const install = (app, options) => {
    app.component(componentName, Editor)
}

export const VueEditor = {
    install
}

export default Editor