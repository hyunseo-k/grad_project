const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// const { useWindowDimensions } = require('react-native-web');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
const bcrypt = require('bcrypt');
let fetch;

import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch;
});

const app = express();
const port = 8000;
var ui;
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PW_FOR_DB',
  database: 'nice',
  // insecureAuth: true,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

function getUserById(id, callback) {
  console.log(`Fetching user with id ${id}`);
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          callback(err);
      } else {
          console.log(`Fetched user: ${JSON.stringify(results)}`);
          callback(null, results[0]);
      }
  });
}

function getUserByUserId(id, callback) {
  console.log(`Fetching user with user_id ${id}`);
  db.query('SELECT * FROM users WHERE user_id = ?', [id], (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          callback(err);
      } else {
          console.log(`Fetched user: ${JSON.stringify(results)}`);
          callback(null, results[0]);
      }
  });
}

function executeDatabaseQuery(query, params) {
  return new Promise((resolve, reject) => {
    console.log(`Executing query: ${query}`);
    console.log(`With parameters: ${JSON.stringify(params)}`);
    db.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Query results: ${JSON.stringify(results)}`);
        resolve(results);
      }
    });
  });
}

app.post('/Register', async (req, res) => {
  try {
    const { id, pw, nickname } = req.body;

    const hashedPassword = await bcrypt.hash(pw, 10);

    const sql = 'INSERT INTO users (id, password, nickname) VALUES (?, ?, ?)';
    db.query(sql, [id, hashedPassword, nickname], (err, result) => {
      if (err) {
        console.error("can't use Register system", err);
        return res.status(500).json({ isSuccess: false });
      }

      res.json({ result: { memberId: id }, isSuccess: true });
    });
  } catch (error) {
    console.error("can't use Register system", error);
    res.status(500).json({ isSuccess: false });
  }
});

app.post('/login', (req, res) => {
  const { id, pw } = req.body;
  getUserById(id, async (err, user) => {
      if (err) {
          console.error("can't use login system", err);
          return res.status(500).json({ isSuccess: false });
      }
      if (!user) {
          return res.status(400).json({ isSuccess: false });
      }
      const isPasswordCorrect = await bcrypt.compare(pw, user.password);
      if (!isPasswordCorrect) {
          return res.status(400).json({ isSuccess: false });
      }
      res.json({ result: { memberId: user.user_id }, isSuccess: true });
  });
});

app.get('/member/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const [rows, fields] = await db.promise().query('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (rows.length > 0) {
      res.json({ result: { id: rows[0].id, nickname: rows[0].nickname, introduce: rows[0].introduce, preference: rows[0].preference, life_pattern: rows[0].life_pattern, cleanliness: rows[0].cleanliness, smoking: rows[0].smoking, inextrovert: rows[0].inextrovert } });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log("can't use user info system", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch('/member-edit/:userId', (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  getUserByUserId(userId, async (err, user) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let updateQuery = 'UPDATE users SET ? WHERE user_id = ?';
    try {
      await db.promise().query(updateQuery, [data, userId]);
      const [updatedUser] = await db.promise().query('SELECT * FROM Users WHERE user_id = ?', [userId]);
      res.json(updatedUser[0]);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });
});

app.post('/offer/:senderId/:receiverId', async (req, res) => {
  const senderId = req.params.senderId;
  const receiverId = req.params.receiverId;

  try {
    const sql = 'INSERT INTO Offers (sender_id, receiver_id, granted, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
    await db.promise().query(sql, [senderId, receiverId, false]);
    res.json({ isSuccess: true, message: 'Offer sent successfully' });
  } catch (error) {
    console.error('Error sending offer:', error);
    res.json({ isSuccess: false, message: 'Internal server error' });
  }
});

app.post('/member/search', async (req, res) => {
  const { life_pattern, cleanliness, smoking, inextrovert } = req.body;

  let query = 'SELECT * FROM Users';
  let params = [];

  let conditions = [];

  if (life_pattern) {
    conditions.push('life_pattern = ?');
    params.push(life_pattern);
  }
  if (cleanliness) {
    conditions.push('cleanliness = ?');
    params.push(cleanliness);
  }
  if (smoking) {
    conditions.push('smoking = ?');
    params.push(smoking);
  }
  if (inextrovert) {
    conditions.push('inextrovert = ?');
    params.push(inextrovert);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  try {
    const users = await executeDatabaseQuery(query, params);

    if (users.length > 0) {
      const studentDtoList = users.map(user => ({ ...user, memberId: user.user_id }));
      res.json({ isSuccess: true, result: { studentDtoList } });
    } else {
      res.json({ isSuccess: false, message: 'No matching students found' });
    }
  } catch (error) {
    console.log("can't use RecommendedStudents system", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/incoming/:userId', async (req, res) => {
  const userId = req.params.userId;

  const incomingOffers = await db.promise().query('SELECT * FROM Offers WHERE receiver_id = ? AND granted = false', [userId]);
  res.json({ isSuccess: true, data: incomingOffers });
});

app.get('/outgoing/:userId', async (req, res) => {
  const userId = req.params.userId;

  const outgoingOffers = await db.promise().query('SELECT * FROM Offers WHERE sender_id = ? AND granted = false', [userId]);
  res.json({ isSuccess: true, data: outgoingOffers });
});

app.get('/matched/:userId', async (req, res) => {
  const userId = req.params.userId;

  const matchedOffers = await db.promise().query('SELECT * FROM Offers WHERE (sender_id = ? OR receiver_id = ?) AND granted = true', [userId, userId]);
  res.json({ isSuccess: true, data: matchedOffers });
});

app.put('/offer-accept/:offerId', async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const [rows] = await db.promise().query('UPDATE Offers SET granted = 1 WHERE offer_id = ?', [offerId]);
    if (rows.affectedRows > 0) {
      res.json({ isSuccess: true });
    } else {
      res.json({ isSuccess: false, message: 'Failed to accept the offer' });
    }
  } catch (error) {
    console.error('An error occurred while accepting the offer:', error);
    res.status(500).json({ isSuccess: false, message: 'An error occurred while accepting the offer' });
  }
});


app.get('/offer/:offerId', async (req, res) => {
  const { offerId } = req.params;

  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM offers WHERE offer_id = ?', [offerId]);
    res.json({
      isSuccess: true,
      result: rows[0],
    });
  } catch (error) {
    console.error('An error occurred while fetching the offer details:', error);
    res.json({
      isSuccess: false,
      message: 'An error occurred while fetching the offer details',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

