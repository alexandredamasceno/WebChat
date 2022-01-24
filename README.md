# Boas vindas ao repositório do projeto WebChat!

## Instruções iniciais
1. Clone o repositório
  * `git clone https://github.com/alexandredamasceno/WebChat`.
2. Entre na pasta do repositório que você acabou de clonar:
  * `cd WebChat`.
3. Instale as dependências
  * `npm install`.
4. Antes de rodar o projeto, certifique-se de:
 - ter instalado o mongoDB na sua máquina;
 - ter criado um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
    - DB_URL (quando iniciar o mongoDB pelo terminal você tem acesso a essa url)
    - DB_NAME (o nome do banco de dados)
    - PORT (a porta onde irá rodar a aplicação. É opcional, já que estabeleci uma porta padrão)
5. Para rodar o projeto:
 * `npm start`

# Habilidades

- Conseguir desenvolver um server socket usando o socket.io;

- Emitir eventos personalizados usando o socket.io;

- Usar o pacote `socket.io` do Node.js para criar aplicações que trafeguem mensagens através de sockets;

- Utilizar Template Engine(.ejs) combinando javascript e html;

- Arquitetura MVC.

---

## Do que se trata o projeto

Foi desenvolvida uma aplicação `Node.js` de _chat_online, usando `socket.io` para emitir eventos e atualizar estado no servidor e cliente. O MVC será usado para renderizar as mensagens do histórico e usuários online, com ambos vindo direto do servidor. O usuário será capaz de:

 - Usar um front-end para enviar mensagens a clientes conectados;
 - Visualizar o histórico de mensagens da conversa;
 - Visualizar os usuários online no momento;
 - Alterar o nome de usuário no chat em tempo real.

## Linter (Análise Estática)

Para garantir a qualidade do código, usei o [ESLint](https://eslint.org/) para fazer a análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `WebChat/package.json`

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Variáveis de ambiente

Haverá um arquivo no caminho: `WebChat/models/connection.js` que fará a conexão com o Banco de Dados. Neste arquivo, na linha 9, haverá o seguinte comando:

`.connect(process.env.DB_URL, {`

e na linha 13:

`.then((conn) => conn.db(process.env.DB_NAME))`

**Você irá precisar configurar as variáveis globais do MongoDB.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

## Conexão com o banco:
As variáveis de ambiente receberão os seguintes valores

```
DB_URL=mongodb://localhost:27017/webchat/    // conexão local com o seu MongoDB
DB_NAME=webchat                             // nome do database
```

## Testes

Para executar os testes localmente, você pode rodar o comando `npm test`.

Caso prefira testar um requisito por vez pode executar o teste da seguinte forma: `npm test tests/req1` (nesse caso testa apenas o requisito 1)

⚠️ Antes de executar os testes requisitos, principalmente do requisito 4, feche o seu navegador, pois ele pode afetar a execução dos testes.

### ⚠️ Atenção: Esse é um projeto de avaliação da Trybe - instituição onde estou estudando. Todo o código desse projeto é meu, incluindo estrutura de pastas, exceto o código de implementação dos testes, esses foram feitos pelos instrutores da Trybe para testar as minhas implementações.

