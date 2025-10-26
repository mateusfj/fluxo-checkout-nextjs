🎯 Desafio Frontend — Fluxo de Checkout
Este projeto é uma submissão ao Desafio Frontend proposto, implementando um fluxo de e-commerce 100% mockado. A aplicação foi construída com foco em uma arquitetura moderna, performance e boas práticas de desenvolvimento, demonstrando uma clara separação de responsabilidades no gerenciamento de estado.

A stack principal inclui Next.js (App Router), TypeScript, Zustand para estado de cliente, React Query para operações assíncronas, React Hook Form + Zod para formulários, e Shadcn UI / Tailwind CSS para a interface.

## ✨ Features e Requisitos Implementados

O projeto cumpre todos os requisitos mínimos obrigatórios do desafio:

1. Autenticação (Mock)
   Banco de Dados Mockado: O useAuthStore (Zustand) é utilizado para persistir um array de usuários "cadastrados", simulando um banco de dados.

Gerenciamento de Sessão Híbrido:

Cliente (UI): O useAuthStore (Zustand) armazena os dados do usuário logado, disponibilizando-os instantaneamente para a UI.

Servidor (Middleware): Um cookie (HttpOnly) é criado no login para persistir a sessão de forma segura. O Middleware do Next.js (middleware.ts) valida este cookie para proteger as rotas autenticadas.

Bloqueio de Rotas: O middleware redireciona usuários não autenticados para /.

2. Seleção de Produtos
   Catálogo: Os produtos são carregados de um array mocado, envolvido por um hook useQuery (React Query) para simular uma requisição de API assíncrona, gerenciando os estados de loading e error.

Gerenciamento de Carrinho: O carrinho é inteiramente gerenciado pelo useCartStore (Zustand). Todas as ações (adicionar, remover, atualizar quantidade) são otimistas e refletem na UI instantaneamente.

3. Fluxo de Pagamento (Multi-etapas)
   Formulário Multi-etapas: O estado complexo do formulário de checkout é gerenciado pelo FormProvider do React Hook Form, permitindo um estado compartilhado entre componentes sem necessidade de passar props.

Validação: Todos os dados do formulário são validados em tempo real e na submissão usando Zod.

Simulação de Pagamento Avançada: O fluxo diverge com base no método de pagamento escolhido:

Cartão de Crédito: Redireciona diretamente para a página de resultado (/result). A simulação de "processamento" ocorre, com 50% de chance de paid (pago) ou failed (falhado).

Boleto e Pix: Redireciona para uma página de pagamento específica (ex: /payment/[method]?orderId=""), exibindo o QR Code ou código de barras. Esta página simula dois cenários:

Expiração: Um setTimeout simula o tempo limite; se o usuário não "pagar", o status muda para expired.

Confirmação: Ao clicar em "Confirmar Pagamento", uma nova simulação de "processamento" é iniciada, com 50% de chance de paid ou failed.

4. Estados e Feedbacks (Pós-Checkout)
   paid (Pago): O useCartStore é limpo (clearCart()) e uma tela de sucesso é exibida.

failed (Recusado): O usuário vê uma tela de falha com a opção de "Tentar Novamente", que o leva de volta ao checkout.

expired (Expirado): O usuário vê uma tela de pedido expirado, também com a opção de "Tentar Novamente".

🧠 Decisões de Arquitetura
A arquitetura foi escolhida para demonstrar as melhores práticas de desenvolvimento frontend moderno.

1. Separação de Estado: Zustand vs. React Query
   A decisão mais importante foi a separação clara entre Estado de Cliente e Estado de Servidor:

React Query (TanStack Query) É usado para gerenciar todo estado assíncrono (Server State). Mesmo com dados mocados, as chamadas (buscar produtos, submeter pedido) são encapsuladas em useQuery e useMutation. Isso nos dá, gratuitamente, o gerenciamento de isLoading, isError, isSuccess, refetching e caching.

Zustand É usado exclusivamente para o Estado de Cliente (Client State) global.

useAuthStore: Atua como nosso "banco de dados" de usuários mockado e, simultaneamente, como o provedor de sessão para a UI.

useCartStore: Gerencia o carrinho de forma 100% otimista. A UI é atualizada instantaneamente, proporcionando uma UX veloz, sem esperas de rede para adicionar/remover itens.

2. Autenticação com Middleware e Cookies
   Em vez de depender apenas do localStorage, o uso de um Cookie para a sessão, validado pelo Middleware do Next.js, simula uma arquitetura de produção real. Isso protege as rotas no edge (servidor) antes mesmo de o cliente renderizar, sendo mais seguro e performático.

3. Performance e Boas Práticas
   O projeto foi desenvolvido com foco em performance e manutenibilidade:

Memoização: O uso de React.memo e useCallback foi aplicado estrategicamente em componentes que poderiam sofrer re-renderizações desnecessárias.

Renderização Híbrida: A aplicação utiliza o melhor do Next.js:

Acessibilidade: Foi mantida a atenção à semântica do HTML, rótulos de formulário (aria-label, htmlFor) e navegação por teclado, facilitada pelo uso do Shadcn UI.

🛠️ Stack Utilizada
Framework: Next.js 15+ (App Router)

Linguagem: TypeScript

Estilização: Tailwind CSS

Componentes UI: Shadcn UI

Estado de Servidor: React Query (TanStack Query) v5

Estado de Cliente: Zustand

Formulários: React Hook Form

Validação: Zod

Ícones: Lucide React

🚀 Como Executar o Projeto
Este projeto não requer um terminal de backend separado. Todos os mocks estão contidos na aplicação.

Clone o repositório:

Instale as dependências:

Inicie o servidor de desenvolvimento:

Acesse a aplicação: Abra seu navegador e acesse .
