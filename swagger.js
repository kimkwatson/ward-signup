const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'WardSignup API',
        description: 'API for ward signup sheets, slots, and claims'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFile = ['./server.js'];

swaggerAutogen(outputFile, endpointsFile, doc);