import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CommonDataTable from '../Common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultImage from '../../../assets/images/download.jpg';
import { faEdit, faTrash, faInfo, faAdd, faSpinner } from '@fortawesome/free-solid-svg-icons'; // Changed faAdd to faPlus
import { Link } from 'react-router-dom';
import Users from '../Users/Users';

const Business = () => {
    const [loading, setLoading] = useState(true);
    const [businessData, setBusinessData] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddBusinessForm, setShowAddBusinessForm] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteBusinessId, setDeleteBusinessId] = useState(null);
    const [villages, setVillages] = useState([]);
    const [userdata, setUserdata] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchBusinessData();
        fetchVillages();
        fetchCategories();
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate])

    const fetchBusinessData = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.post('https://expodersfour-001-site1.ltempurl.com/api/Business/GetAll', {
                page_number: null,
                page_size: null,
                is_admin_approve: null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBusinessData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Business data:', error);
        }
    };

    const fetchVillages = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetVillage');
            setVillages(response.data.data);
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetBusinessCategory');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        axios.get('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/GetUsers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserdata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);


    useEffect(() => {
        // Fetch countries
        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCountries')
            .then(response => {
                setCountries(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch states based on the selected country
        if (formData.lookup_country_id) {
            axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetState?country_id=${formData.lookup_country_id}`)
                .then(response => {
                    setStates(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching states:', error);
                });
        }
    }, [formData.lookup_country_id]);

    useEffect(() => {
        // Fetch cities based on the selected state
        if (formData.lookup_state_id) {
            axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCities?state_id=${formData.lookup_state_id}`)
                .then(response => {
                    setCities(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                });
        }
    }, [formData.lookup_state_id]);

    const refreshBusinessList = () => {
        fetchBusinessData();
    };

    const handleAddClick = () => {
        resetFormData();
        setShowAddBusinessForm(true);
    };

    const handleEditClick = (business) => {
        setSelectedBusiness(business);
        setFormData({ ...business }); // Set form data to selected business data
        setShowEditForm(true);
    };

    const handleDeleteClick = (businessId) => {
        setDeleteBusinessId(businessId);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            await deleteBusiness(deleteBusinessId);
            setBusinessData(businessData.filter(item => item.id !== deleteBusinessId));
            setShowDeleteConfirmation(false);
            setSuccessMessage('Business deleted successfully');
        } catch (error) {
            console.error('Error deleting Business:', error);
        }
    };

    const deleteBusiness = async (businessId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/Business/Delete?id=${businessId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    const resetFormData = () => {
        setFormData({
            concern_name: '',
            business_name: '',
            business_details: '',
            lookup_business_category_id: '',
            address: '',
            lookup_city_id: '',
            lookup_country_id: '',
            lookup_state_id: '',
            zipcode: '',
            contact_number_1: '',
            contact_number_2: '',
            website: '',
            email: '',
            facebook_link: '',
            instagram_link: '',
            is_active: true,
            is_admin_approve: false,
            user_id: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const formDataCopy = new FormData();
            for (const key in formData) {
                formDataCopy.append(key, formData[key]);
            }
            const response = await axios.post('https://expodersfour-001-site1.ltempurl.com/api/Business/Add', formDataCopy, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Business added successfully:', response.data.data);
            refreshBusinessList();
            setSuccessMessage('Business added successfully');
            setShowAddBusinessForm(false);
        } catch (error) {
            console.error('Error adding Business:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            const formDataCopy = new FormData();
            for (const key in formData) {
                formDataCopy.append(key, formData[key]);
            }
            const response = await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/Business/Update?id=${selectedBusiness.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Business updated successfully:', response.data.data);
            refreshBusinessList();
            setSuccessMessage('Business updated successfully');
            setShowEditForm(false);
        } catch (error) {
            console.error('Error updating Business:', error);
        }
    };

    function useApprovalState(initialValue) {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState(initialValue !== null ? initialValue.toString() : ''); // Convert to string to match option values

        const handleDropdownChange = async (event) => {
            const newValue = event.target.value;
            setSelectedValue(newValue);
            setIsOpen(false);

            try {
                const token = localStorage.getItem('adminToken');
                const requestData = {
                    business_id: event.currentTarget.dataset.businessId, // Use data attribute to pass businessId
                    is_admin_approve: newValue === 'true'
                };
                const response = await fetch('https://expodersfour-001-site1.ltempurl.com/api/Business/VerifyBusiness', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) {
                    throw new Error(`Error approving business: ${response.statusText}`);
                } else {
                    console.log('Business approved successfully.');
                    // if (newValue === 'false') {
                    //     window.location.reload();
                    // }
                }
            } catch (error) {
                console.error('Network error:', error.message);
            }
        };

        return {
            isOpen,
            selectedValue,
            setIsOpen,
            handleDropdownChange
        };
    }

    const ApproveColumn = ({ item }) => {
        const { isOpen, selectedValue, setIsOpen, handleDropdownChange } = useApprovalState(item.is_admin_approve);

        return (
            <div className="d-flex justify-content-center">
                {isOpen ? (
                    <select
                        className="form-select"
                        value={selectedValue}
                        onChange={handleDropdownChange}
                        onBlur={() => setIsOpen(false)}
                        data-business-id={item.id} // Set data attribute with businessId
                    >
                        <option value="">Select Approval</option>
                        <option value={'true'}>Approved</option>
                        <option value={'false'}>Disapproved</option>
                    </select>
                ) : (
                    <span
                        className={`badge rounded-pill ${selectedValue !== '' ? (selectedValue === 'true' ? 'bg-success' : 'bg-danger') : 'bg-secondary'}`}
                        onClick={() => setIsOpen(true)}
                    >
                        {selectedValue !== '' ? (selectedValue === 'true' ? 'Approved' : 'Disapproved') : 'Pending'}
                    </span>
                )}
            </div>
        );
    };


    const columns = [
        {
            title: 'Name',
            data: 'business_name',
            render: (item) => {
                const handleImageError = (event) => {
                    event.target.onerror = null; // Prevent infinite loop in case the default image also fails to load
                    event.target.src = defaultImage;
                };

                return (
                    <>
                        <div>
                            <img
                                src={`https://expodersfour-001-site1.ltempurl.com/GetImage/${item.business_image_1}`}
                                onError={handleImageError}
                                style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }}
                            />
                            {item.business_name}
                        </div>
                    </>
                );
            }
        },
        {
            title: 'Address',
            render: (item) => item.address ? `${item.address}, ${item.city_name}, ${item.state_name}, ${item.country_name}` : '-'
        },
        {
            title: 'Contact Number',
            render: (item) => item.contact_number_1 ? item.contact_number_1 : '-'
        },
        {
            title: 'Email',
            render: (item) => item.email ? item.email : '-'
        },
        {
            title: 'Status',
            render: (item) => (
                <div className="d-flex justify-content-center">
                    <span className={`badge rounded-pill ${item.is_active ? 'bg-info' : 'bg-danger'}`}>
                        {item.is_active !== null ? (item.is_active ? 'Active' : 'Inactive') : '-'}
                    </span>
                </div>
            )
        },
        {
            title: 'Approve',
            render: (item) => <ApproveColumn item={item} />
        },
        {
            title: 'Actions',
            render: (item) => (
                <div className="d-flex">
                    {/* <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleAddClick()} title="AddNews">
                        <FontAwesomeIcon icon={faAdd} />
                    </button> */}
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleEditClick(item)} title="Update">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleDeleteClick(item.id)} title="Delete">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link to={`/Business/Details/${item.id}`} className="btn" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} title="Info">
                        <FontAwesomeIcon icon={faInfo} />
                    </Link>
                </div>
            )
        }
    ];

    const dummyRenderRow = (rowData, rowIndex) => {
        return (
            <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                        {column.data === 'is_active' ? (
                            <div className="d-flex justify-content-center">
                                <span className={`badge rounded-pill ${rowData.is_active ? 'bg-info' : 'bg-danger'}`}>
                                    {rowData.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        ) : (
                            // For other columns
                            column.render ? column.render(rowData) : rowData[column.data]
                        )}
                    </td>
                ))}
            </tr>
        );
    };

    const refreshBusinessdata = async () => {
        try {
            // Perform actions to refresh user data
            console.log('Refreshing business data...');
            // You can call fetchUserData or any other function to refresh user data
            await fetchBusinessData();
        } catch (error) {
            console.error('Error refreshing user data:', error);
        }
    }

    return (
        <div className="container">
            <h2>Business</h2>
            <div className="position-relative">
                <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add Business</button>
                {successMessage && (
                    <div className="alert alert-dark d-flex justify-content-between align-items-center" role="alert">
                        <span>{successMessage}</span>
                        <button type="button" className="btn-close" onClick={() => setSuccessMessage('')} style={{ color: 'black' }}></button>
                    </div>
                )}
                {loading ? (
                    <div style={{
                        position: 'fixed',
                        top: '52%',
                        left: '57%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em' }} />
                    </div>
                ) : (
                    <CommonDataTable
                        data={businessData}
                        columns={columns}
                        className="table-bordered"
                        entitiesPerPageOptions={[5, 10, 25, 50, 100]}
                        defaultEntitiesPerPage={10}
                        renderRow={dummyRenderRow}
                    />
                )}
                {showAddBusinessForm && (
                    <AddForm
                        categories={categories}
                        cities={cities} // Pass cities prop
                        states={states} // Pass states prop
                        countries={countries} // Pass countries prop
                        userdata={userdata}
                        formData={formData}
                        setFormData={setFormData} // Pass setFormData prop
                        refreshBusinessList={refreshBusinessList}
                        onSubmit={handleSubmit}
                        setSuccessMessage={setSuccessMessage} // Pass setSuccessMessage prop
                        onClose={() => setShowAddBusinessForm(false)}
                    />
                )}
                {showEditForm && selectedBusiness && (
                    <UpdateForm
                        categories={categories}
                        cities={cities} // Pass cities prop
                        states={states} // Pass states prop
                        countries={countries} // Pass countries prop
                        userdata={userdata}
                        formData={formData}
                        setFormData={setFormData}
                        refreshBusinessList={refreshBusinessList}
                        setSuccessMessage={setSuccessMessage} // Pass setSuccessMessage prop
                        onSubmit={handleUpdate}
                        onClose={() => setShowEditForm(false)}
                    />
                )}
                {showDeleteConfirmation && deleteBusinessId && (
                    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this  {businessData.find(b => b.id === deleteBusinessId).business_name}?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmation}>Delete</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AddForm = ({ categories, cities, states, countries, formData, setFormData, onSubmit, onClose, userdata, }) => {

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // If the input type is checkbox, update the checked state directly
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        }
        else if (name === 'lookup_country_id') {
            // If country is changed
            if (value === '') {
                // If country is unselected, clear state and city
                setFormData({ ...formData, [name]: value, lookup_state_id: '', lookup_city_id: '' });
            } else {
                // If country is selected, update the form data with the selected country
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === 'lookup_state_id') {
            // If state is changed
            if (value === '') {
                // If state is unselected, clear city
                setFormData({ ...formData, [name]: value, lookup_city_id: '' });
            } else {
                // If state is selected, update the form data with the selected state
                setFormData({ ...formData, [name]: value });
            }
        }
        else {
            // For other input types, update the value as usual
            setFormData({ ...formData, [name]: value });
        }
    };


    return (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Business</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input type="file" className="form-control" name="image" value={formData.image} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_name">Business Name</label>
                                <input type="text" className="form-control" id="business_name" name="business_name" value={formData.business_name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_name">Concern Name</label>
                                <input type="text" className="form-control" id="business_name" name="concern_name" value={formData.concern_name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_details">Business Details</label>
                                <textarea className="form-control" id="business_details" name="business_details" value={formData.business_details} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_business_category_id">Category</label>
                                <select className="form-control" id="lookup_business_category_id" name="lookup_business_category_id" value={formData.lookup_business_category_id} onChange={handleInputChange}>
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_country_id">Country</label>
                                <select className="form-control" id="lookup_country_id" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange}>
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_state_id">State</label>
                                <select className="form-control" id="lookup_state_id" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange}>
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_city_id">City</label>
                                <select className="form-control" id="lookup_city_id" name="lookup_city_id" value={formData.lookup_city_id} onChange={handleInputChange}>
                                    <option value="">Select City</option>
                                    {cities && cities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipcode">Zipcode</label>
                                <input type="text" className="form-control" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact_number_1">Contact Number 1</label>
                                <input type="text" className="form-control" id="contact_number_1" name="contact_number_1" value={formData.contact_number_1} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact_number_2">Contact Number 2</label>
                                <input type="text" className="form-control" id="contact_number_2" name="contact_number_2" value={formData.contact_number_2} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="website">Website</label>
                                <input type="text" className="form-control" id="website" name="website" value={formData.website} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="facebook_link">Facebook Link</label>
                                <input type="text" className="form-control" id="facebook_link" name="facebook_link" value={formData.facebook_link} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="instagram_link">Instagram Link</label>
                                <input type="text" className="form-control" id="instagram_link" name="instagram_link" value={formData.instagram_link} onChange={handleInputChange} />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                                <label className="form-check-label" htmlFor="is_active">Active</label>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="is_admin_approve" name="is_admin_approve" checked={formData.is_admin_approve} onChange={handleInputChange} />
                                <label className="form-check-label" htmlFor="is_admin_approve">Admin Approve</label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_id">User</label>
                                <select className="form-control" id="user_id" name="user_id" value={formData.user_id} onChange={handleInputChange}>
                                    <option value="">Select User</option>
                                    {userdata && userdata.map((u) => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpdateForm = ({ categories, cities, states, countries, formData, setFormData, onSubmit, onClose, userdata }) => {
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // If the input type is checkbox, update the checked state directly
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        }
        else if (name === 'lookup_country_id') {
            // If country is changed
            if (value === '') {
                // If country is unselected, clear state and city
                setFormData({ ...formData, [name]: value, lookup_state_id: '', lookup_city_id: '' });
            } else {
                // If country is selected, update the form data with the selected country
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === 'lookup_state_id') {
            // If state is changed
            if (value === '') {
                // If state is unselected, clear city
                setFormData({ ...formData, [name]: value, lookup_city_id: '' });
            } else {
                // If state is selected, update the form data with the selected state
                setFormData({ ...formData, [name]: value });
            }
        }
        else {
            // For other input types, update the value as usual
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Business</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input type="file" className="form-control" name="image" value={formData.image} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_name">Business Name</label>
                                <input type="text" className="form-control" id="business_name" name="business_name" value={formData.business_name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_name">Concern Name</label>
                                <input type="text" className="form-control" id="business_name" name="concern_name" value={formData.concern_name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_details">Business Details</label>
                                <textarea className="form-control" id="business_details" name="business_details" value={formData.business_details} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_business_category_id">Category</label>
                                <select className="form-control" id="lookup_business_category_id" name="lookup_business_category_id" value={formData.lookup_business_category_id} onChange={handleInputChange}>
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_country_id">Country</label>
                                <select className="form-control" id="lookup_country_id" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange}>
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_state_id">State</label>
                                <select className="form-control" id="lookup_state_id" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange}>
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lookup_city_id">City</label>
                                <select className="form-control" id="lookup_city_id" name="lookup_city_id" value={formData.lookup_city_id} onChange={handleInputChange}>
                                    <option value="">Select City</option>
                                    {cities && cities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipcode">Zipcode</label>
                                <input type="text" className="form-control" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact_number_1">Contact Number 1</label>
                                <input type="text" className="form-control" id="contact_number_1" name="contact_number_1" value={formData.contact_number_1} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact_number_2">Contact Number 2</label>
                                <input type="text" className="form-control" id="contact_number_2" name="contact_number_2" value={formData.contact_number_2} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="website">Website</label>
                                <input type="text" className="form-control" id="website" name="website" value={formData.website} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="facebook_link">Facebook Link</label>
                                <input type="text" className="form-control" id="facebook_link" name="facebook_link" value={formData.facebook_link} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="instagram_link">Instagram Link</label>
                                <input type="text" className="form-control" id="instagram_link" name="instagram_link" value={formData.instagram_link} onChange={handleInputChange} />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                                <label className="form-check-label" htmlFor="is_active">Active</label>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="is_admin_approve" name="is_admin_approve" checked={formData.is_admin_approve} onChange={handleInputChange} />
                                <label className="form-check-label" htmlFor="is_admin_approve">Admin Approve</label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_id">User</label>
                                <select className="form-control" id="user_id" name="user_id" value={formData.user_id} onChange={handleInputChange}>
                                    <option value="">Select User</option>
                                    {userdata && userdata.map((u) => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Business;
