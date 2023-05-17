# Test

Teste prático automatizado da API Go Rest.

## Pre-requirements

É necessário ter Node.js e npm instalados para executar este projeto.

> Usei as versões `v16.15.1` e `8.13.2` de Node.js e npm, respectivamente. Sugiro que você use as versões iguais ou posteriores.

## Installation

Execute `npm install` (ou `npm i` para a versão curta) para instalar as dependências de desenvolvimento.
> Ah, também é necessário instalar o faker `npm install faker` para que seja gerado dados de usuários aleatórios usados nos testes de forma contínua a cada execução.

## Tests

> **Note:** Antes de executar os testes, faça uma cópia do arquivo `cypress.env.example.json` como `cypress.env.json`, que no mundo real, você atualizaria com uma credencial válida (token), na qual é necessario realizar cadastro no site da Go Rest https://gorest.co.in/ para gerar seu prórpio token de acesso aos recursos da API.

> **Comandos Personalizados**
Além dos comandos Cypress padrão, este projeto também inclui alguns comandos customizados:

cy.getUser() - Retorna a lista de todos os usuários da API.

cy.postCreate() - Cria um novo usuário na API com dados gerados aleatoriamente pelo faker.

cy.postCreateExisting() - Tenta criar um novo usuário na API com um e-mail que já existe, retornando uma mensagem de erro informando que o e-mail já foi utilizado.

cy.deleteUser() - Exclui o primeiro usuário da lista de usuários da API.

cy.updateUserPut() - Atualiza todos os campos do primeiro usuário da lista de usuários da API com dados gerados aleatoriamente pelo faker.

cy.updateUserPatch() - Atualiza apenas o e-mail do primeiro usuário da lista de usuários da API com um e-mail gerado aleatoriamente pelo faker.

> O arquivo `cypress.env.json` está incluído em [`.gitignore`](./.gitignore) e você está seguro de que informações confidenciais não serão controladas

Execute `npm test` (ou `npm t` para a versão curta) para executar o teste no modo headless.

Ou execute `npm run cy:open` para abrir o Cypress no modo interativo.

Se preferir, no canto inferior esquerdo você pode clicar em cy:open para abrir e realizar os testes.

## Dev

Este projeto foi criado por 💚 Emerson Martins.