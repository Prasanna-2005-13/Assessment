// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    author: ''
  });

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(response => {
        setArticles(response.data);
      }).catch(err => console.log(err));
  }, []);

  
  const handleInputChange = (e) => {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value
    });
  };

  
  const addArticle = () => {
    axios.post('http://localhost:5000/api/articles', newArticle)
      .then(response => {
        setArticles([...articles, response.data]);
        setNewArticle({ title: '', content: '', author: '' }); // Reset form
      }).catch(err => console.log(err));
  };

  
  const deleteArticle = (id) => {
    axios.delete(`http://localhost:5000/api/articles/${id}`)
      .then(() => {
        setArticles(articles.filter(article => article._id !== id));
      }).catch(err => console.log(err));
  };

  return (
    <div>
      <h1>News Media Platform</h1>

      {/* Add Article Form */}
      <div>
        <h2>Add New Article</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newArticle.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newArticle.author}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newArticle.content}
          onChange={handleInputChange}
        />
        <button onClick={addArticle}>Add Article</button>
      </div>

      {/* Articles List */}
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p><strong>{article.author}</strong></p>
            <button onClick={() => deleteArticle(article._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
