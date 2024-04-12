import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonDataTable from '../Common/DataTable'; // Import the CommonDataTable component

const News = () => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axios.get('http://nanabarsamaj-001-site1.htempurl.com/api/Lookup/GetNews');
                setNewsData(response.data.data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNewsData();
    }, []);

    const columns = [
        { 
            title: 'Image', 
            render: (rowData) => (
                <img 
                    src={`http://nanabarsamaj-001-site1.htempurl.com/GetImage/${rowData.image}`} 
                    alt={rowData.title} 
                    style={{ maxWidth: '100px' }} 
                />
            ) 
        },
        { title: 'Title', data: 'title' },
        { title: 'Description', data: 'description' },
        { title: 'Village', data: 'village' },
        { title: 'Date & Time', data: 'dateTime', render: (dateTime) => new Date(dateTime).toLocaleString() }
    ];

    return (
        <div className="container">
            <h2>News</h2>
            {/* Render the CommonDataTable component */}
            <CommonDataTable 
                data={newsData} 
                columns={columns} 
                className="table-bordered" 
                entitiesPerPageOptions={[5, 10, 25, 50, 100]} // Add entitiesPerPageOptions
                defaultEntitiesPerPage={10} // Add defaultEntitiesPerPage
            />
        </div>
    );
};

export default News;
