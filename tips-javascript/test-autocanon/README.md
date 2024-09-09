```
autocannon http://localhost:3000 -c 100 -d 10
```

run at least 3 times

pm2 start server.js -i 4
4 cluster instances