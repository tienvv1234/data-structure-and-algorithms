// curl "localhost:3000/products?name=laptop"
import { createServer } from 'node:http';
import { parse } from 'node:url';
import { randomUUID } from 'node:crypto';

const PORT = 3000;
async function handler(req, res) {
    if (req.method === 'GET' && req.url.includes('products')) {
        console.log('requesting products data')
        const { query: { name } } = parse(req.url, true);
        const item = {
            id: randomUUID(),
            name: name || 'Product'
        }
        res.end(JSON.stringify(item));
        return;
    }
    res.end('Hello World');
}

createServer(handler).listen(PORT).on('listening', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})