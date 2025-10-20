<template>
    <div class="container position-relative">
        <!-- Botão flutuante do carrinho -->
        <button class="btn btn-warning position-fixed"
            style="top: 90px; right: 30px; z-index: 1050; border-radius: 50%; width: 56px; height: 56px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
            @click="abrirCarrinho" title="Abrir carrinho">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="carrinho.length"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ carrinho.length }}
            </span>
        </button>

        <!-- Lista de produtos -->
        <ListaProdutos @produto-adicionado="handleProdutoAdicionado" @visualizar-produto="handleVisualizarProduto" />

        <!-- Avaliação -->
        <AvaliacaoProduto v-if="produtoSelecionado" :produto="produtoSelecionado"
            @avaliacao-adicionada="handleAvaliacaoAdicionada" @fechar="produtoSelecionado = null" />

        <!-- Carrinh lateral -->
        <transition name="slide-cart">
            <div v-if="carrinhoAberto" class="cart-slider bg-white shadow position-fixed"
                style="top:0; right:0; height:100vh; width:350px; z-index:1100;">
                <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 class="mb-0">
                        <i class="fas fa-shopping-cart me-2"></i>Carrinho
                    </h5>
                    <button class="btn btn-sm btn-outline-secondary" @click="fecharCarrinho" title="Fechar">
                        &times;
                    </button>
                </div>

                <div class="p-3" style="overflow-y: auto; height: calc(100vh - 150px);">
                    <div v-if="carrinho.length === 0" class="text-center text-muted py-5">
                        <i class="fas fa-box-open fa-3x mb-3"></i>
                        <p>Seu carrinho está vazio</p>
                    </div>

                    <div v-else>
                        <div v-for="(item, index) in carrinho" :key="item.id" class="border-bottom pb-3 mb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-1">{{ item.nome }}</h6>
                                    <small class="text-muted">
                                        R$ {{ item.preco.toFixed(2) }}
                                    </small>
                                </div>

                                <button class="btn btn-sm btn-danger" @click="removerItem(index)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>

                            <div class="d-flex align-items-center gap-2 mt-2">
                                <button class="btn btn-sm btn-outline-secondary" @click="diminuirQtd(item)">
                                    -
                                </button>
                                <span>{{ item.quantidade }}</span>
                                <button class="btn btn-sm btn-outline-secondary" @click="aumentarQtd(item)">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-3 border-top">
                    <div class="d-flex justify-content-between mb-2">
                        <strong>Total:</strong>
                        <strong>R$ {{ totalCarrinho.toFixed(2) }}</strong>
                    </div>
                    <button class="btn btn-success w-100" :disabled="!carrinho.length">
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </transition>
    </div>

    <!-- CONTEÚDO DA AVALIAÇÃO -->
    <div class="container">
        <AvaliacaoProduto />
    </div>
</template>

<script>
import ListaProdutos from './ListaProdutos.vue'
import AvaliacaoProduto from './AvaliacaoProduto.vue'

export default {
    name: 'Ecommerce',
    components: {
        ListaProdutos,
        AvaliacaoProduto
    },
    data() {
        return {
            produtoSelecionado: null,
            carrinhoAberto: false,
            carrinho: []
        }
    },
    computed: {
        totalCarrinho() {
            return this.carrinho.reduce(
                (total, item) => total + item.preco * item.quantidade,
                0
            )
        }
    },
    methods: {
        abrirCarrinho() {
            this.carrinhoAberto = true
        },
        fecharCarrinho() {
            this.carrinhoAberto = false
        },
        handleProdutoAdicionado(produto) {
            const existente = this.carrinho.find(p => p.id === produto.id)
            if (existente) {
                existente.quantidade++
            } else {
                this.carrinho.push({ ...produto, quantidade: 1 })
            }
        },
        removerItem(index) {
            this.carrinho.splice(index, 1)
        },
        aumentarQtd(item) {
            item.quantidade++
        },
        diminuirQtd(item) {
            if (item.quantidade > 1) {
                item.quantidade--
            }
        },
        handleVisualizarProduto(produto) {
            this.produtoSelecionado = produto
        },
        handleAvaliacaoAdicionada(avaliacao) {
            console.log('Nova avaliação:', avaliacao)
        }
    }
}
</script>

<style>

    .cart-slider {
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
    }

    .slide-cart-enter-active,
    .slide-cart-leave-active {
        transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
    }

    .slide-cart-enter-from,
    .slide-cart-leave-to {
        transform: translateX(100%);
    }

    .slide-cart-enter-to,
    .slide-cart-leave-from {
        transform: translateX(0);
    }

    body {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .btn-warning .badge {
        font-size: 0.7rem;
        top: 6px;
        right: 6px;
    }
</style>
