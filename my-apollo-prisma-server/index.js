// Import ApolloServer and gql from apollo-server package
const { ApolloServer, gql } = require('apollo-server');

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create an instance of ApolloServer with schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors());

// const HASURA_GRAPHQL_URL = 'http://localhost:8080/v1/graphql';
// const JWT_SECRET = 'your_jwt_secret_key';

// async function hasuraRequest(query, variables) {
//   const response = await axios.post(HASURA_GRAPHQL_URL, {
//     query,
//     variables
//   }, {
//     headers: {
//       'x-hasura-admin-secret': 'your_hasura_admin_secret'
//     }
//   });
//   return response.data;
// }

// // Middleware for JWT authentication
// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization'];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // Register
// app.post('/api/register', async (req, res) => {
//   const { username, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const query = `
//     mutation ($username: String!, $password: String!) {
//       insert_users(objects: {username: $username, password: $password}) {
//         affected_rows
//       }
//     }
//   `;

//   const variables = {
//     username,
//     password: hashedPassword
//   };

//   const data = await hasuraRequest(query, variables);

//   if (data.errors) {
//     return res.status(400).json({ message: 'User registration failed' });
//   }

//   res.json({ message: 'User registered successfully' });
// });

// // Login
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   const query = `
//     query ($username: String!) {
//       users(where: {username: {_eq: $username}}) {
//         id
//         username
//         password
//       }
//     }
//   `;

//   const variables = { username };

//   const data = await hasuraRequest(query, variables);

//   if (data.errors || data.data.users.length === 0) {
//     return res.status(400).json({ message: 'Invalid username or password' });
//   }

//   const user = data.data.users[0];

//   if (!await bcrypt.compare(password, user.password)) {
//     return res.status(400).json({ message: 'Invalid username or password' });
//   }

//   const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);

//   res.json({ token });
// });

// // Deposit
// app.post('/api/deposit', authenticateToken, async (req, res) => {
//   const { amount } = req.body;

//   const query = `
//     mutation ($userId: Int!, $amount: numeric!) {
//       insert_transactions(objects: {user_id: $userId, amount: $amount}) {
//         affected_rows
//       }
//     }
//   `;

//   const variables = {
//     userId: req.user.userId,
//     amount
//   };

//   const data = await hasuraRequest(query, variables);

//   if (data.errors) {
//     return res.status(400).json({ message: 'Deposit failed' });
//   }

//   res.json({ message: 'Deposit successful' });
//   console.log()
// });

// // Withdraw
// app.post('/api/withdraw', authenticateToken, async (req, res) => {
//   const { amount } = req.body;

//   const query = `
//     mutation ($userId: Int!, $amount: numeric!) {
//       insert_transactions(objects: {user_id: $userId, amount: -$amount}) {
//         affected_rows
//       }
//     }
//   `;

//   const variables = {
//     userId: req.user.userId,
//     amount
//   };

//   const data = await hasuraRequest(query, variables);

//   if (data.errors) {
//     return res.status(400).json({ message: 'Withdrawal failed' });
//   }

//   res.json({ message: 'Withdrawal successful' });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

