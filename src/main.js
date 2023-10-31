import { isVue3, Vue, createApp } from 'vue-demi'
import App from './App.vue'
import { VueEditor } from './components/Editor/index.js'

console.log('[isVue3]:', isVue3)
console.log('[Vue]:', Vue)

if (isVue3) {
    const app = createApp(App)
    app.use(VueEditor)
    app.mount('#app')
} else {
    Vue.config.productionTip = false;
    new Vue({
        render: h => h(App)
    }).$mount("#app");
}

