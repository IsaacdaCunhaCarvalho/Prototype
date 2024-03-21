// **************************************************************************
//  FATEC - ZONA SUL - Desenvolvimento de Software Multiplataformas
//  DISCIPLINA: Tecnicas de Programação 2
//  AUTOR: Isaac C.Carvalho        -         DATA: 21/03/24
//  DESCRIÇÂO: Desenvolvimento do software de exemplo do 
//  padrão GoF do grupo criacional - Prototype em JavaScript/Python
//  a fim de comparação e entendimento de sua utilização
//  Desenvolvimento de uma simulação com o GoF Protorype no qual o 
//  usuario pode selecionar um cardapio da pizzas (4 Opções) que contem nome 
//  e preço. Desta forma o pedido deve ser feito em nome de alguma pessoa 
//  no qual é atribuido o valor e o sabor na apresentação.
// **************************************************************************


class Pizza {
    constructor(sabor, preco) {
        this.sabor = sabor;
        this.preco = preco;
    }
}

class Pedido {

    constructor(pessoa) {
        this.pessoa = pessoa;
        this.pizzas = [];
    }

    // Adiciona pizzas ao vetor do pedido
    adicionarPedido(id, pizza) {
        this.pizzas[id] = pizza;
    }

    // Método para calcular o preço total do pedido
    calcularTotal() {
        let total = 0;
        this.pizzas.forEach(pizza => {
            total += pizza.preco;
        });
        return total;
    }

    // Método para apresentar todos os itens do pedido e calcula o total do pedido
    apresentarPedido() {
        console.log(`Pedido para ${this.pessoa}:`);
        this.pizzas.forEach(pizza => {
            console.log(`${pizza.sabor} - R$ ${pizza.preco.toFixed(2)}`);
        });
        console.log(`Total: R$ ${this.calcularTotal().toFixed(2)}`);
        console.log("\n")
    }

    // Método para clonar o objeto pedido
    clone() {
        const clone = new Pedido(this.pessoa);
        this.pizzas.forEach(pizza => {
            clone.adicionarPedido(this.pizzas.indexOf(pizza), pizza);
        });
        return clone;
    }
}

class PedidoManager {
    constructor() {
        this.pedidos = [];
    }

    // Método para adicionar os pedidos ao gerenciador de pedidos
    adicionarManager(id, pedido) {
        this.pedidos[id] = pedido;
    }

    // Solicitar uma pizza pelo id e retorna a copia dela:
    getPedidoById(id) {
        const pedidoOriginal = this.pedidos[id];
        if (pedidoOriginal) {
            return pedidoOriginal.clone();
        } else {
            return null;
        }
    }

    // Método para apresentar o pedido feito através do ID
    apresentarManager(id) {
        const pedido = this.getPedidoById(id);
        if (pedido) {
            pedido.apresentarPedido();
        } else {
            console.log("Pedido não encontrado.");
        }
    }
}

class Cardapio {
    constructor() {
        this.pizzas = [];
    }

    // Método para adicionar a pizza ao cardapio
    adicionarPizza(id, sabor, preco) {
        const pizza = new Pizza(sabor, preco);
        this.pizzas[id] = pizza;
    }

    // Método para apresentar cardapio
    mostrarCardapio() {
        console.log("Bem-vindo à Pizzaria!");
        console.log("Cardápio:");
        this.pizzas.forEach((pizza, index) => {
            console.log(`${index}. ${pizza.sabor} - R$ ${pizza.preco.toFixed(2)}`);
        });
        console.log("\n")
    }

    // Método selecionar uma pizza do cardapio
    selecionarPizza(index) {
        if (index >= 0 && index < this.pizzas.length) {
            return this.pizzas[index];
        } else {
            console.log("Opção inválida!");
            return null;
        }
    }
}

// Exemplo de uso:

// Adicionando pizzas ao cardapio
const cardapio = new Cardapio();
cardapio.adicionarPizza(1, "Margherita", 30.00);
cardapio.adicionarPizza(2, "Calabresa", 35.00);
cardapio.adicionarPizza(3, "Quatro Queijos", 40.00);
cardapio.adicionarPizza(4, "Frango com Catupiry", 38.00);

// Apresentando cardapio
cardapio.mostrarCardapio();

const pessoa = "João";

// Selecionando as pizzas e adicionando ao pedido
const pedido = new Pedido(pessoa);
pedido.adicionarPedido(1, cardapio.selecionarPizza(1)); // Selecionando a primeira pizza do cardápio
pedido.adicionarPedido(2, cardapio.selecionarPizza(3)); // Selecionando a terceira pizza do cardápio

// Selecionando pedido ao gerenciador
const pedidoManager = new PedidoManager();
pedidoManager.adicionarManager(1, pedido);

// Apresentando pedido
pedidoManager.apresentarManager(1);

// Alterando os items do pedido
const pedidoClone = pedidoManager.getPedidoById(1);
if (pedidoClone) {
    pedidoClone.pizzas[1].sabor = "Mussarela";
    pedidoClone.pizzas[1].preco = 55;
}

// Apresentando pedido alterado
console.log('Pedido alterado:');
pedidoClone.apresentarPedido();
