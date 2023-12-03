const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: 3000,
        dbURL: 'mongodb+srv://Nikeca1991:Zer0Mancer321%21%40%21@cluster0.f8lwx2u.mongodb.net/',
        origin: ['http://localhost:5555', 'http://localhost:4200', "https://sozopolistudios.web.app" , 'http://localhost:5173']
    },
    production: {
        port: 3000,
        dbURL: 'mongodb+srv://Nikeca1991:Zer0Mancer321%21%40%21@cluster0.f8lwx2u.mongodb.net/',
        origin: ["https://sozopolistudios.web.app",'http://localhost:4200', 'http://localhost:5173']
    }
};

module.exports = config[env];
