import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './style.css'


createApp(App)
    .use(router) 
    .mount('#app');

console.log('🚀 Aplicação Vue iniciada - Aula 1!')
console.log('📚 Curso Frontend Vue.js consumindo API Flask')