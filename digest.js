const http = require('http');
const crypto = require('crypto');

const username = 'user';
const password = 'password';
const realm = 'Digest Authentication';

const server = http.createServer((req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.setHeader('WWW-Authenticate', `Digest realm="${realm}",qop="auth",nonce="${Date.now()}",opaque="${crypto.createHash('md5').digest('hex')}"`);
    res.writeHead(401);
    return res.end('Authorization is needed');
  }

  const authContent = authHeader.replace(/^Digest\s/, '');
  const authParams = new Map(authContent.split(',').map(i => i.split('=').map(j => j.replace(/"/g, '').trim())));

  const ha1 = crypto.createHash('md5').update([username, authParams.get('realm'), password].join(':')).digest('hex');
  const ha2 = crypto.createHash('md5').update([req.method, authParams.get('uri')].join(':')).digest('hex');
  const response = crypto.createHash('md5').update([ha1, authParams.get('nonce'), authParams.get('nc'), authParams.get('cnonce'), authParams.get('qop'), ha2].join(':')).digest('hex');

  if (response === authParams.get('response')) {
    res.writeHead(200);
    res.end('Authorized!');
  } else {
    res.writeHead(401);
    res.end('Not Authorized!');
  }
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});