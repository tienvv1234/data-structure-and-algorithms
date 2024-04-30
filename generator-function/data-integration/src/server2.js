// curl -X POST "localhost:4000/cart" --data '{"id": "123"}
import { createServer } from 'node:http';
import { once } from 'node:events';
const PORT = 4000;
async function handler(req, res) {
    if (req.method === 'POST' && req.url.includes('cart')) {
        const data = await once(req, 'data');
        const item = JSON.parse(data);
        console.log('adding item to cart', item);

        return res.end(`process succeeded for ${item.id}`)
    }
    res.end('Hello World');
}

createServer(handler).listen(PORT).on('listening', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})