const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: 3000,
        dbURL: 'mongodb+srv://nikeca1991:nikeca1991@freephotos.clxlwry.mongodb.net/?retryWrites=true&w=majority',
        origin: ['http://localhost:5555', 'http://localhost:4200', "https://sozopolistudios.web.app" , 'http://localhost:5173']
    },
    production: {
        port: 3000,
        dbURL: 'mongodb+srv://nikeca1991:nikeca1991@freephotos.clxlwry.mongodb.net/?retryWrites=true&w=majority',
        origin: ["https://sozopolistudios.web.app",'http://localhost:4200', 'http://localhost:5173']
    }
};

module.exports = config[env];
