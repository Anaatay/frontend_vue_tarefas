<template>
    <div class="cont-container">
        <h2>Lista Tarefa</h2>

        <div class="cont-top">
            <!-- Meu Contador -->
            <div class="valor-contador">
                <strong>{{ contador }}</strong>
            </div>

            <!-- Input das Tarefa -->
            <div class="mb-3">
                <input v-model="tarefa" type="text" class="form-control1" placeholder="Adicione uma tarefa">
            </div>

            <!--Filtros-->
            <div class="fintrom-group d-flex gap-2">
                <select v-model="filtroCategoria" class="form-select">
                    <option value="">Todas as Tarefas</option>
                    <option value="concluido">Concluidas</option>
                    <option value="pendente">Pendentes</option>
                </select>

                <input v-model="pesquisa" type="text" class="form-control" placeholder="Pesquisar a Tarefa...">
            </div>

            <!-- Botão adicionar -->
            <button class="btn btn-successs mt-2" @click="adicionar">
                <i class="fas fa-plus"></i> Adicionar Tarefa
            </button>
        </div>

        <!-- Lista de tarefas -->
        <ul class="list-group mt-3">
            <li v-for="(item, index) in tarefasFiltradas" :key="index"
                class="list-group-item d-flex justify-content-between align-items-center">

                <div class="flex-grow-1 me-3" :style="{ textDecoration: item.concluida ? 'line-through' : 'none' }">
                    <input v-if="item.editando" v-model="item.nome" type="text" class="form-control" />
                    <span v-else>{{ item.nome }}</span>
                </div>

                <div class="btn-group">
                    <!-- Concluir -->
                    <button class="btn btn-sm btn-success me-1" @click="toggleStatus(item)" title="Concluir tarefa">
                        <i class="fa-solid" :class="item.concluida ? 'fa-rotate-left' : 'fa-check'"></i>
                    </button>

                    <!-- Editar ou salvar -->
                    <button class="btn btn-sm btn-primary me-1" @click="editarOuSalvar(item)"
                        title="Editar ou salvar tarefa">
                        <i v-if="!item.editando" class="fa-solid fa-pen-to-square"></i>
                        <i v-else class="fa-solid fa-check"></i>
                    </button>

                    <!-- Remover -->
                    <button class="btn btn-sm btn-danger" @click="remover(index)" title="Remover tarefa">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ItemTarefa',

    data() {
        return {
            filtroCategoria: '',
            pesquisa: '',
            tarefa: '',
            tarefas: []
        }
    },

    computed: {
        contador() {
            return this.tarefas.length;
        },
        tarefasFiltradas() {
            return this.tarefas.filter(tarefa => {
                const filtroCategoriaOk =
                    this.filtroCategoria === '' ||
                    (this.filtroCategoria === 'concluido' && tarefa.concluida) ||
                    (this.filtroCategoria === 'pendente' && !tarefa.concluida);

                const filtroPesquisaOk = tarefa.nome
                    .toLowerCase()
                    .includes(this.pesquisa.toLowerCase());

                return filtroCategoriaOk && filtroPesquisaOk;
            });
        }
    },

    methods: {
        adicionar() {
            if (this.tarefa.trim() === '') {
                alert('Preencha o campo para adicionar uma tarefa');
                return;
            }

            this.tarefas.push({
                nome: this.tarefa,
                editando: false,
                concluida: false
            });

            this.tarefa = ''; // limpa o input
        },

        editarOuSalvar(item) {
            item.editando = !item.editando;
        },

        remover(index) {
            this.tarefas.splice(index, 1);
            alert('Você removeu o item');
        },

        toggleStatus(item) {
            item.concluida = !item.concluida;
        }
    }
}
</script>

<style scoped>
    .cont-container {
        background: linear-gradient(90deg, #1b2b5f 0%, #304b8c 50%, #4969c3 100%);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        max-width: 1200px;
        min-width: 600px;
        margin: 40px auto;
    }

    h2 {
        margin: 0 0 0.8rem 0;
        font-weight: 700;
        color: #c8d4ff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cont-top {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    /* Contador */
    .valor-contador {
        background: rgba(255, 255, 255, 0.15);
        padding: 5px 3px;
        border-radius: 8px;
        font-size: 1.3rem;
        font-weight: 600;
        color: #fff;
        min-width: 50px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    input.form-control {
        border-radius: 12px;
        border: 1px solid #cbd5e1;
        padding: 10px;
        transition: 0.3s;
        width: 20rem;
    }

    input.form-control1{
        margin-top: 20px;
        border-radius: 12px;
        border: 1px solid #cbd5e1;
        padding: 10px;
        transition: 0.3s;
        width: 20rem;
    }

    input.form-control:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }

    button.btn-successs {
        background: #15244f;
        color: #bfc8f8;
        border: none;
        border-radius: 12px;
        padding: 10px 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: fit-content;
    }

    button.btn-successs:hover {
        opacity: 0.9;
        transform: scale(1.02);
    }

    /* Lista de tarefas */
    ul.list-group {
        margin-top: 20px;
        padding: 0;
        list-style: none;
    }

    /* Item da lista */
    .list-group-item {
        background: white;
        border-radius: 12px;
        margin-bottom: 10px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }

    .btn-group i {
        font-size: 16px;

    }

    .btn-primary {
        margin-right: 20px;
    }

    .btn-group button:hover {
        transform: scale(1.1);
    }

    /* Responsividade */
    @media (max-width: 600px) {
        .cont-container {
            margin: 20px;
            padding: 15px;
        }

        h2 {
            font-size: 1.4rem;
        }
    }
</style>