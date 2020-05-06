module.exports = {
    port: 8333,
    devmode: true,
    cors: {
        origin: ['http://localhost:8080']
    },
    database: {
        host: 'localhost',
        user: 'root',
        database: 'storage',
        password: '',
        waitForConnections: true,
        connectionLimit: 100,
    }
};
