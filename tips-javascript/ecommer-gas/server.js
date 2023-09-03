const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
})

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
})

process.on('SIGINT', () => {
    console.log('SIGINT exit app');
    process.exit();
})