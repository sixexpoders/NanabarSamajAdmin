import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import defaultImage from '../../../assets/images/besnu.png';

const BesnuInfo = () => {
    const { id } = useParams();
    const [besnu, setBesnu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const getBesnuById = async (besnuId) => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(
                    `https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetBesnuById?id=${besnuId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setBesnu(response.data.data);
                setLoading(false);
                // Fetch image after getting besnu data
                fetchImage(response.data.data.image);
            } catch (error) {
                console.error('Error fetching besnu by ID:', error);
                setLoading(false);
            }
        };

        if (id) {
            getBesnuById(id);
        }
    }, [id]);

    const fetchImage = async (imageName) => {
        try {
            const response = await axios.get(`https://expodersfour-001-site1.ltempurl.com/GetImage/${imageName}`, { responseType: 'blob' });
            const reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    // Utility function to render field value or "NA" if value is null
    const renderField = (label, value) => {
        return (
            <div>
                <label className="form-label fw-bold">{label}:</label>
                <div style={{ marginBottom: '10px' }}>{loading ? 'Loading...' : (value ? value : 'NA')}</div>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="bg-secondary-soft px-4 py-5 rounded">
                <div className="row g-3">
                    {/* Header */}
                    {/* <div className="col-md-12">
                        <h4 className="mb-4 mt-0 fw-bold text-center">Besnu Information</h4>
                        <hr className="mb-4" />
                    </div> */}
                    {/* Left Column */}
                    <div className="col-md-3">
                        <div className="d-flex align-items-center mb-3">
                            {loading ? (
                                'Loading...'
                            ) : (
                                <>
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="Besnu"
                                            className="me-3 rounded-circle"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <img
                                            src={defaultImage}
                                            alt="Default"
                                            className="me-3 rounded-circle"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div>{loading ? 'Loading...' : (besnu ? besnu.name : 'Data not found')}</div>
                                </>
                            )}
                        </div>
                        {renderField('Age', besnu?.age)}
                    </div>
                    {/* Middle Columns */}
                    <div className="col-md-3">
                        {renderField('Death Date', besnu?.death_date ? new Date(besnu.death_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        }) : null)}
                        {renderField('Besnu Date', besnu?.besnu_date ? new Date(besnu.besnu_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        }) : null)}
                    </div>
                    {/* Right Columns */}
                    <div className="col-md-3">
                        {renderField('Address', besnu?.address)}
                        {renderField('Relative Name', besnu?.relative_name)}
                        {renderField('Village', besnu?.village_name)}
                    </div>
                    <div className="col-md-3">
                        {renderField('Start Time', besnu?.start_time)}
                        {renderField('End Time', besnu?.end_time)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BesnuInfo;
