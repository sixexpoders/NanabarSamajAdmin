import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Newsinfo = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNewsById = async (newsId) => {
      try {
        const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/api/lookup/GetNewsById?id=${newsId}`);
        setNews(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news by ID:', error);
        setLoading(false);
      }
    };

    if (id) {
      getNewsById(id);
    }
  }, [id]);

  const newsInfoStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const labelStyle = {
    fontWeight: 'bold'
  };

  return (
    <div className="container">
      <h2 className="my-4" style={{ textAlign: 'center' }}>News Information</h2>
      <div style={newsInfoStyle}>
        <div className="mb-3">
          <label style={labelStyle}>Title:</label>
          <div>{loading ? 'Loading...' : (news ? news.title : 'News not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Description:</label>
          <div>{loading ? 'Loading...' : (news ? news.description : 'News not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Date & Time:</label>
          <div>{loading ? 'Loading...' : (news ? news.dateTime : 'News not found')}</div>
        </div>
        <div className="mb-3">
          <label style={labelStyle}>Village:</label>
          <div>{loading ? 'Loading...' : (news ? news.village : 'News not found')}</div>
        </div>
        <div className="mb-3">
          <Link to="/Home/News" className="btn btn-primary">Back To News Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Newsinfo;
