import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'My Brand Project Backend',
        version: '1.0.0',
        description: 'API documentation for My Brand Backend apis',
        },
        servers: [
        {
            url: 'http://localhost:4000',
        }
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
