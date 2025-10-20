<template>
  <div id="app">
    <!-- Header da aplicação -->
    <header class="bg-primary text-white py-3 mb-4">
      <div class="container">
        <h1 class="mb-0">
          <i class="fas fa-graduation-cap me-2"></i>
          Frontend Vue.js - Aula 1
        </h1>
        <p class="mb-0 opacity-75">Introdução ao Vue.js</p>

        <!--LINKS-->
          <div class="nav-vertical2">
            <p>Exercicios</p>
            <ul class="links">
              <li><router-link to="/produtos">Avaliação dos Produtos</router-link></li>
              <li><router-link to="/tarefasavancada">Lista de Tarefas Avançada</router-link></li>
            </ul>
          </div>

      </div>
    </header>

    <!-- Conteúdo principal -->
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <!-- Componente principal da aula -->
          <!--<HelloWorld />-->
          <Contador />
          <ListaTarefas />
          <CalculadoraIMC />

          <div class="container">
            <router-view></router-view>
          </div>

        </div>
        
        <div class="col-md-4">
          <!-- Sidebar com informações -->
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="fas fa-info-circle me-2"></i>
                Aula 1 - Conceitos
              </h5>
            </div>
            <div class="card-body">
              <ul class="list-unstyled">
                <li><i class="fas fa-check text-success me-2"></i>Reatividade</li>
                <li><i class="fas fa-check text-success me-2"></i>Data Binding</li>
                <li><i class="fas fa-check text-success me-2"></i>Event Handling</li>
                <li><i class="fas fa-check text-success me-2"></i>Componentes</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-light text-center py-3 mt-5">
      <div class="container">
        <p class="text-muted mb-0">
          Curso Vue.js - Prof. Rodrigo | 
          <a href="https://vuejs.org/" target="_blank" class="text-decoration-none">
            Documentação Vue.js
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Contador from './components/Contador.vue'
import ListaTarefas from './components/ListaTarefas.vue'
import CalculadoraIMC from './components/CalculadoraIMC.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    Contador,
    ListaTarefas,
    CalculadoraIMC
  }
}
</script>

<style>
/* Estilos globais da aplicação */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
}

/**Exercicio */
  .nav-vertical2 {
    margin-top: 1.6rem;
    background: rgba(255, 255, 255, 0.08);
    padding: 0.8rem 1.2rem;
    border-radius: 8px;
    border-left: 3px solid #a3b8ff;
    max-width: 280px;
    min-width: 150px; 
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  .nav-vertical p,
  .nav-vertical2 p {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .nav-vertical ul,
  .nav-vertical2 ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-vertical li,
  .nav-vertical2 li {
    margin-bottom: 0.4rem;
  }

  .nav-vertical a,
  .nav-vertical2 a {
    color: #d6e0ff;
    text-decoration: none;
    transition: 0.3s ease;
  }

  .nav-vertical a:hover,
  .nav-vertical2 a:hover {
    color: #ffffff;
    text-decoration: underline;
  }


/* Animações suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos customizados */
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: none;
}

.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
</style>