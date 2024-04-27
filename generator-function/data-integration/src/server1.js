import { createServer } from 'http';

const PORT = 3000;
async function handler(req, res) {
    res.end('Hello World');
}


createServer(handler).listen(PORT).on('listening', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})