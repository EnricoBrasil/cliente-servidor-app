# Aplicação Cliente-Servidor Simples

Este é um exemplo de aplicação cliente-servidor simples em Node.js, onde o cliente envia uma mensagem para o servidor e recebe uma resposta.

## Requisitos

- Node.js instalado (https://nodejs.org/)

## Instruções de Uso

### Cliente (client.js)

1. Abra o terminal na pasta do projeto.

2. Execute o seguinte comando para executar o cliente:

3. Você será solicitado a inserir uma mensagem. Digite a mensagem e pressione Enter.

4. O cliente enviará a mensagem para o servidor e exibirá a resposta recebida.

### Servidor (server.js)

1. Abra um novo terminal na pasta do projeto.

2. Execute o seguinte comando para iniciar o servidor:

3. O servidor estará ouvindo na porta 3000. Certifique-se de que nenhum outro programa esteja usando essa porta.

## Entendendo o Código do Servidor (server.js)

Aqui está uma explicação detalhada para cada parte do código do servidor:

- **Importação do Módulo HTTP:**
Importamos o módulo `http` do Node.js para criar um servidor HTTP.

- **Criação do Servidor:**
Criamos um servidor HTTP usando `http.createServer`. A função de tratamento de solicitações é definida como um argumento dessa função.

- **Verificação do Método e Rota da Solicitação:**
Verificamos se a solicitação é um método POST e se a rota é `/message`. Isso garante que estamos tratando a solicitação correta enviada pelo cliente.

- **Lida com os Dados da Solicitação (Corpo da Mensagem):**
Usamos eventos para lidar com os dados da solicitação (o corpo da mensagem). O evento `data` é acionado para cada "chunk" de dados recebidos, e esses chunks são concatenados para construir o corpo completo da mensagem.

- **Análise do JSON e Envio da Resposta:**
Após todos os dados terem sido recebidos (`end`), o JSON do corpo da mensagem é analisado para obter a mensagem propriamente dita. A resposta é configurada com um status 200 e um cabeçalho JSON, e uma resposta JSON de sucesso é enviada contendo a mensagem recebida.

- **Lida com Outras Rotas (404):**
Se a rota não corresponder à rota `/message`, a resposta é configurada com um status 404 e um corpo de texto plano indicando que a rota não foi encontrada.

- **O Servidor Escuta na Porta 3000:**
Inicia o servidor para escutar na porta 3000. Quando o servidor estiver rodando, a mensagem "Server is running on

#### Entendendo o Código do Cliente (client.js)

Aqui está uma explicação detalhada para cada parte do código do cliente:

```javascript
const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.question('Enter a message: ', (message) => {
const options = {
 hostname: 'localhost',
 port: 3000,
 path: '/message',
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
};

const req = http.request(options, (res) => {
 let body = '';
 res.on('data', (chunk) => {
   body += chunk;
 });
 res.on('end', () => {
   const response = JSON.parse(body);
   console.log(response.message);
 });
});

req.on('error', (error) => {
 console.error(error);
});

req.write(JSON.stringify({ message }));
req.end();

rl.close();
});
```
- **Importação dos Módulos HTTP e Readline:**
Importamos os módulos http (para fazer solicitações HTTP) e readline (para interagir com o usuário na linha de comando) do Node.js.

- **Criação da Interface de Entrada:**
Criamos uma interface de entrada usando readline.createInterface. Isso permite que leiamos e escrevamos dados na linha de comando.

- **Solicitação da Mensagem ao Usuário:**
Usamos rl.question para solicitar ao usuário que insira uma mensagem. A função de retorno de chamada (message) é executada quando o usuário insere a mensagem.

- **Configuração das Opções da Solicitação HTTP:**
Definimos as opções para a solicitação HTTP. Indicamos o endereço do servidor (localhost e porta 3000), o caminho da rota (/message), o método POST e o cabeçalho indicando que estamos enviando dados JSON.

- **Criação da Solicitação HTTP:**
Criamos a solicitação HTTP usando http.request. A função de retorno de chamada (res) é executada quando uma resposta é recebida do servidor.

- **Lida com os Dados da Resposta do Servidor:**
Usando eventos, lidamos com os dados da resposta do servidor. À medida que os "chunks" de dados são recebidos, eles são concatenados para construir o corpo completo da resposta.

- **Análise do JSON da Resposta e Exibição:**
Após todos os dados terem sido recebidos (end), analisamos o JSON da resposta do servidor para obter a mensagem recebida. Em seguida, exibimos essa mensagem no console.

- **Lida com Erros na Solicitação:**
Lidamos com possíveis erros na solicitação usando o evento error. Se ocorrer um erro durante a solicitação, uma mensagem de erro será exibida no console.

- **Envio dos Dados JSON e Encerramento da Solicitação:**
Escrevemos os dados JSON da mensagem na solicitação usando req.write, em seguida, encerramos a solicitação com req.end(). Também fechamos a interface de entrada com rl.close().