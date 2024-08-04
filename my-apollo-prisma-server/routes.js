const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core');
const fetch = require('cross-fetch');
const authMiddleware = require('./authMiddleware');

const router = express.Router();

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.HASURA_GRAPHQL_URL,
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Hasura mutation for user registration
  const mutation = gql`
    mutation RegisterUser($username: String!, $password: String!) {
      insert_users(objects: { username: $username, password: $hashedPassword }) {
        returning {
          id
          username
        }
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation,
      variables: { username, password: hashedPassword },
    });
    res.json(result.data.insert_users.returning[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Hasura query to get user
  const query = gql`
    query GetUser($username: String!) {
      users(where: { username: { _eq: $username } }) {
        id
        username
        password
      }
    }
  `;

  try {
    const result = await client.query({
      query,
      variables: { username },
    });

    const user = result.data.users[0];

    if (!user) {
      return res.status(400).send('Invalid username or password.');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send('Invalid username or password.');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/deposit', authMiddleware, async (req, res) => {
  const { amount } = req.body;

  // Hasura mutation for deposit
  const mutation = gql`
    mutation Deposit($userId: Int!, $amount: numeric!) {
      update_users(where: { id: { _eq: $userId } }, _inc: { balance: $amount }) {
        returning {
          id
          balance
        }
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation,
      variables: { userId: req.user.id, amount },
    });
    res.json(result.data.update_users.returning[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/withdraw', authMiddleware, async (req, res) => {
  const { amount } = req.body;

  // Hasura mutation for withdrawal
  const mutation = gql`
    mutation Withdraw($userId: Int!, $amount: numeric!) {
      update_users(where: { id: { _eq: $userId } }, _inc: { balance:$amount }) {
        returning {
          id
          balance
        }
      }
    }
  `;

  try {
    const result = await client.mutate({
      mutation,
      variables: { userId: req.user.id, amount },
    });
    res.json(result.data.update_users.returning[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
