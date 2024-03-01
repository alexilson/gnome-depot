const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');

// const { authMiddleware } = require ('/utils/auth')
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas')
const server = new ApolloServer({
    typeDefs, resolvers
});

const app = express();
const PORT= process.env.PORT || 3001;

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        // context: authMiddleware
    }))

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', ()=> {
        app.listen(PORT, () => {
            console.log(`Gnome Depot API server running on port ${PORT}!!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        })
    })
}

startApolloServer();