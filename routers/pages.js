const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const text = 'Homepage page';
  res.json(text);
});

router.get('/about', (req, res) => {
  const text = 'About page';
  res.json(text);
});

router.get('/contacts', (req, res) => {
  const text = 'Contacts page';
  res.json(text);
});

module.exports = router;
