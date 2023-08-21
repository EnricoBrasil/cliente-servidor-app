const http = require('http');
const readline = require('readline');

// Cria uma interface para entrada de usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Pergunta ao usuário por uma mensagem
rl.question('Enter a message: ', (message) => {
    // Configurações para a solicitação HTTP
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/message',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Cria a solicitação HTTP
    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            // Analisa a resposta JSON e exibe a mensagem
            const response = JSON.parse(body);
            console.log(response.message);
        });
    });

    // Lida com erros na solicitação
    req.on('error', (error) => {
        console.error(error);
    });

    // Envia a mensagem como JSON na solicitação
    req.write(JSON.stringify({ message }));
    req.end();

    // Fecha a interface de entrada
    rl.close();
});