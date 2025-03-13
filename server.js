// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/news-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Article Schema & Model
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

// Routes
// Get all articles
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// Add a new article
app.post('/api/articles', async (req, res) => {
  const { title, content, author } = req.body;
  const newArticle = new Article({ title, content, author });
  await newArticle.save();
  res.status(201).json(newArticle);
});

// Delete an article
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.status(200).send('Article deleted');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
