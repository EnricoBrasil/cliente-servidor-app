const http = require('http');

// Cria um servidor HTTP
const server = http.createServer((req, res) => {
    // Verifica se a solicitação é POST e na rota '/message'
    if (req.method === 'POST' && req.url === '/message') {
        let body = '';
        // Lida com os dados da solicitação (corpo da mensagem)
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            // Analisa o JSON para obter a mensagem
            const message = JSON.parse(body).message;
            // Configura a resposta com status 200 e cabeçalho JSON
            res.writeHead(200, { 'Content-Type': 'application/json' });
            // Envia uma resposta JSON de sucesso contendo a mensagem recebida
            res.end(JSON.stringify({ success: true, message: `Server received message: ${message}` }));
        });
    } else {
        // Configura uma resposta 404 se a rota não corresponder
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// O servidor escuta na porta 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});