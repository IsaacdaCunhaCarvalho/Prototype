# **************************************************************************
#  FATEC - ZONA SUL - Desenvolvimento de Software Multiplataformas
#  DISCIPLINA: Tecnicas de Programação 2
#  AUTOR: Isaac C.Carvalho        -         DATA: 21/03/24
#  DESCRIÇÂO: Desenvolvimento do software de exemplo do 
#  padrão GoF do grupo criacional - Prototype em JavaScript/Python
#  a fim de comparação e entendimento de sua utilização
#  Desenvolvimento de uma simulação com o GoF Protorype no qual o 
#  usuario pode selecionar um cardapio da pizzas (4 Opções) que contem nome 
#  e preço. Desta forma o pedido deve ser feito em nome de alguma pessoa 
#  no qual é atribuido o valor e o sabor na apresentação.
# **************************************************************************

class Pizza:
    def __init__(self, sabor, preco):
        self.sabor = sabor
        self.preco = preco


class Pedido:
    def __init__(self, pessoa):
        self.pessoa = pessoa
        self.pizzas = {}

    def adicionar_pedido(self, id, pizza):
        self.pizzas[id] = pizza

    def calcular_total(self):
        total = 0
        for _, pizza in self.pizzas.items():
            total += pizza.preco
        return total

    def apresentar_pedido(self):
        print(f'Pedido para {self.pessoa}:')
        for id, pizza in self.pizzas.items(): 
            print(f'{pizza.sabor} - R$ {pizza.preco:.2f}')
        print(f'Total: R$ {self.calcular_total():.2f}\n')

    def clone(self):
        clone = Pedido(self.pessoa)
        for id, pizza in self.pizzas.items(): 
            clone.adicionar_pedido(id, pizza)
        return clone


class PedidoManager:
    def __init__(self):
        self.pedidos = {}

    def adicionar_manager(self, id, pedido):
        self.pedidos[id] = pedido 

    def get_pedido_by_id(self, id):
        for pid, pedido in self.pedidos.items():  
            if pid == id:
                return pedido.clone()
        return None

    def apresentar_manager(self, id):
        pedido = self.get_pedido_by_id(id)
        if pedido:
            pedido.apresentar_pedido()
        else:
            print("Pedido não encontrado.")


class Cardapio:
    def __init__(self):
        self.pizzas = []

    def adicionar_pizza(self, id, sabor, preco):
        pizza = Pizza(sabor, preco)
        self.pizzas.append((id, pizza))

    def mostrar_cardapio(self):
        print("Bem-vindo à Pizzaria!")
        print("Cardápio:")
        for id, pizza in self.pizzas:
            print(f'{id}. {pizza.sabor} - R$ {pizza.preco:.2f}')
        print()

    def selecionar_pizza(self, index):
        for id, pizza in self.pizzas:
            if id == index:
                return pizza
        print("Opção inválida!")
        return None

# Exemplo de uso:

# Adicionando pizzas ao cardapio
cardapio = Cardapio()
cardapio.adicionar_pizza(1, "Margherita", 30.00)
cardapio.adicionar_pizza(2, "Calabresa", 35.00)
cardapio.adicionar_pizza(3, "Quatro Queijos", 40.00)
cardapio.adicionar_pizza(4, "Frango com Catupiry", 38.00)

# Apresentando cardapio
cardapio.mostrar_cardapio()

pessoa = "João"

# Selecionando as pizzas e adicionando ao pedido
pedido = Pedido(pessoa)
pedido.adicionar_pedido(1, cardapio.selecionar_pizza(1))  # Selecionando a primeira pizza do cardápio
pedido.adicionar_pedido(2, cardapio.selecionar_pizza(3))  # Selecionando a terceira pizza do cardápio

# Selecionando pedido ao gerenciador
pedido_manager = PedidoManager()
pedido_manager.adicionar_manager(1, pedido)

# Apresentando pedido
pedido_manager.apresentar_manager(1)

# Alterando os items do pedido
pedido_clone = pedido_manager.get_pedido_by_id(1)
if pedido_clone:
    pedido_clone.pizzas[1].sabor = "Mussarela"
    pedido_clone.pizzas[1].preco = 55

# Apresentando pedido alterado
print('Pedido alterado:')
pedido_clone.apresentar_pedido()
