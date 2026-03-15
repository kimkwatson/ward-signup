const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'WardSignup API',
        description: 'API for ward signup sheets, slots, and claims'
    },
    host: 'ward-signup.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFile = ['./server.js'];

swaggerAutogen(outputFile, endpointsFile, doc);