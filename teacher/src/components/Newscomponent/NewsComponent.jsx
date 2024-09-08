import React, { useState, useEffect } from 'react';
import './NewsComponent.css'; // Import the CSS file

const NewsComponent = () => {
  const API_KEY = "1900c619ed0040f1a8c44cf8dade86db";
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('education');
  const [query, setQuery] = useState('india');

  const getData = async (category, query) => {
    const url = query 
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
      : `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const jsondata = await response.json();
    setNews(jsondata.articles);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    getData(newCategory, query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData(category, query);
  };

  return (
    <div className="news-container">
      <h1>Latest News</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search news..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      <div className="category-buttons">
        <button onClick={() => handleCategoryChange('education')}>Education</button>
        <button onClick={() => handleCategoryChange('sports')}>Sports</button>
        <button onClick={() => handleCategoryChange('general')}>General Affairs</button>
      </div>
      <div className="news-cards">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <img src={article.urlToImage} alt={article.title} />
            <div className="news-content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
