import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CommonDataTable from '../Common/DataTable'; // Import the CommonDataTable component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfo, faAdd,faSpinner } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../../assets/images/besnu.png';
import { Link } from 'react-router-dom';

const Besnu = () => {
    const [BesnuData, setBesnuData] = useState([]);
    const [loading, setloading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddBesnuForm, setShowAddBesnuForm] = useState(false);
    const [selectedBesnu, setSelectedBesnu] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteBesnuId, setDeleteBesnuId] = useState(null);
    const [villages, setVillages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchBesnuData = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetBesnu');
            const modifiedData = response.data.data.map(item => ({
                ...item,
                id: item.id
            }));
            setBesnuData(modifiedData);
            setloading(false);
        } catch (error) {
            console.error('Error fetching Besnu data:', error);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate])

    useEffect(() => {
        fetchBesnuData();
        fetchVillages();
    }, []);

    const fetchVillages = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetVillage');
            const villagesData = response.data.data;
            setVillages(villagesData);
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };

    const refreshBesnuList = () => {
        fetchBesnuData();
    };

    const handleAddClick = () => {
        setShowAddBesnuForm(true);
    };

    const handleEditClick = (BesnuItem) => {
        setSelectedBesnu(BesnuItem);
        setShowEditForm(true);
    };

    const handleDeleteClick = (BesnuItemId) => {
        setDeleteBesnuId(BesnuItemId);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            await deleteBesnu(deleteBesnuId);
            setBesnuData(BesnuData.filter(item => item.id !== deleteBesnuId));
            setShowDeleteConfirmation(false);
            setSuccessMessage('Besnu deleted successfully');
        } catch (error) {
            console.error('Error deleting Besnu:', error);
        }
    };

    const deleteBesnu = async (BesnuId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/DeleteBesnu?id=${BesnuId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error deleting Besnu:', error);
            throw error;
        }
    };

    const columns = [
        {
            title: 'Name',
            data: 'username',
            render: (item) => {
              const handleImageError = (event) => {
                event.target.onerror = null; // Prevent infinite loop in case the default image also fails to load
                event.target.src = defaultImage;
              };
      
              return (
                <>
                  <div>
                    <img
                      src={`https://expodersfour-001-site1.ltempurl.com/GetImage/${item.image}`}
                      onError={handleImageError}
                      style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }}
                    />
                    {item.name}
                  </div>
                </>
              );
            }
          },     
        { title: 'Village', data: 'village_name' },
        {
            title: 'Death Date',
            data: 'death_date',
            render: (rowData) => (
                <div>{rowData.death_date && new Date(rowData.death_date).toLocaleDateString()}</div>
            )
        },
        {
            title: 'Besnu Date',
            data: 'besnu_date',
            render: (rowData) => (
                <div>{rowData.besnu_date && new Date(rowData.besnu_date).toLocaleDateString()}</div>
            )
        },
        { title: 'Address', data: 'address' },
        { title: 'Start Time', data: 'start_time' },
        { title: 'End Time', data: 'end_time' },
        { title: 'Relative Name', data: 'relative_name' },
        {
            title: 'Status',
            data: 'is_active',
            render: (rowData) => (
                <div className="d-flex justify-content-center">
                    <span className={`badge rounded-pill ${rowData.is_active ? 'bg-info' : 'bg-danger'}`}>
                        {rowData.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
            )
        },
        {
            title: 'Actions',
            render: (item) => (
                <div className="d-flex">
                   
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleEditClick(item)} title="Update">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleDeleteClick(item.id)} title="Delete">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link to={`/Besnu/Details/${item.id}`} className="btn" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} title="Info">
                        <FontAwesomeIcon icon={faInfo} />
                    </Link>
                </div>
            )
        }
    ];

        const AddForm = ({ onClose, refreshBesnuData, villages }) => {
            const [formData, setFormData] = useState({
                name: '',
                lookup_village_id: '', // Change to lookup_village_id
                death_date: '',
                besnu_date: '',
                address: '',
                start_time: '',
                end_time: '',
                relative_name: '',
                village: 'sllsl', // Remove this field as it's not used by the server
                image: null,
                age: '',
                is_active: true
            });
        
            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
            };
        
            const handleImageChange = (e) => {
                const file = e.target.files[0];
                setFormData({ ...formData, image: file });
            };
        
            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    const formDataCopy = new FormData();
                    for (const key in formData) {
                        formDataCopy.append(key, formData[key]);
                    }
        
                    const token = localStorage.getItem('adminToken');
                    const response = await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/AddBesnu', formDataCopy, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('Besnu added successfully:', response.data.data);
                    refreshBesnuData();
                    setSuccessMessage('Besnu added successfully');
                    onClose();
                } catch (error) {
                    console.error('Error adding Besnu:', error);
                }
            };
        
            return (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Besnu</h5>
                                <button type="button" className="btn-close" onClick={onClose}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Village</label>
                                        <select className="form-control" name="lookup_village_id" value={formData.lookup_village_id} onChange={handleInputChange} required>
                                            <option value="">Select Village</option>
                                            {villages.map((village) => (
                                                <option key={village.id} value={village.id}>{village.name}</option> // Use village.id instead of village.name
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Death Date</label>
                                        <input type="date" className="form-control" name="death_date" value={formData.death_date} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Besnu Date</label>
                                        <input type="date" className="form-control" name="besnu_date" value={formData.besnu_date} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Start Time</label>
                                        <input type="time" className="form-control" name="start_time" value={formData.start_time} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">End Time</label>
                                        <input type="time" className="form-control" name="end_time" value={formData.end_time} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Relative Name</label>
                                        <input type="text" className="form-control" name="relative_name" value={formData.relative_name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Age</label>
                                        <input type="number" className="form-control" name="age" value={formData.age} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        <input type="file" className="form-control" name="image" onChange={handleImageChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
    

    const UpdateForm = ({ BesnuId, BesnuItem, onClose, villages }) => {
        const [formData, setFormData] = useState({
            id: BesnuItem.id || '',
            name: BesnuItem.name || '',
            village: BesnuItem.village || '',
            death_date: BesnuItem.death_date || '',
            besnu_date: BesnuItem.besnu_date || '',
            address: BesnuItem.address || '',
            start_time: BesnuItem.start_time || '',
            end_time: BesnuItem.end_time || '',
            relative_name: BesnuItem.relative_name || '',
            image: BesnuItem.image || '',
            age: BesnuItem.age || '',
            is_active: BesnuItem.is_active || true
        });


        const handleImageChange = (e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                debugger
                const token = localStorage.getItem('adminToken');
                const response = await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/UpdateBesnu?id=${BesnuId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Besnu updated successfully:', response.data.data);
                refreshBesnuList();
                setSuccessMessage('Besnu updated successfully');
                onClose(); // Pass the updated Besnu item to the onClose callback
            } catch (error) {
                console.error('Error updating Besnu:', error);
            }
        };

        return (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Besnu</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Village</label>
                                    <select className="form-control" name="lookup_village_id" value={formData.lookup_village_id} onChange={handleInputChange} required>
                                        <option value="">Select Village</option>
                                        {villages.map((village) => (
                                            <option key={village.id} value={village.id}>{village.name}</option> // Use village.id instead of village.name
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Death Date</label>
                                    <input type="date" className="form-control" name="death_date" value={formData.death_date} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Besnu Date</label>
                                    <input type="date" className="form-control" name="besnu_date" value={formData.besnu_date} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Start Time</label>
                                    <input type="time" className="form-control" name="start_time" value={formData.start_time} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">End Time</label>
                                    <input type="time" className="form-control" name="end_time" value={formData.end_time} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Relative Name</label>
                                    <input type="text" className="form-control" name="relative_name" value={formData.relative_name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input type="number" className="form-control" name="age" value={formData.age} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" name="image" onChange={handleImageChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    const dummyRenderRow = (rowData, rowIndex) => {
        return (
            <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                        {/* For status field */}
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
    
      


    return (
        <div className="container">
            <h2>Besnu</h2>
            <div className="position-relative">
            <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add Besnu</button>
            {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
        </div>
      )}
       {loading ? (
                    <div style={{
                        position: 'fixed',
                        top: '52%',
                        left: '57%',
                        left: '57%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em' }} />
                    </div>
                ) : (
                  <CommonDataTable
                data={BesnuData}
                columns={columns}
                className="table-bordered"
                entitiesPerPageOptions={[5, 10, 25, 50, 100]}
                defaultEntitiesPerPage={10}
                renderRow={dummyRenderRow} // Provide the dummy renderRow function
                />
                )}
            {showAddBesnuForm && (
                <AddForm
                    refreshBesnuData={refreshBesnuList}
                    onClose={() => setShowAddBesnuForm(false)}
                    villages={villages}
                />
            )}
            {showEditForm && selectedBesnu && (
                <UpdateForm
                    BesnuId={selectedBesnu.id}
                    BesnuItem={selectedBesnu}
                    onClose={() => setShowEditForm(false)}
                    villages={villages}
                />
            )}
            {showDeleteConfirmation && deleteBesnuId && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this  {BesnuData.find(b => b.id === deleteBesnuId).name}?</p>
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

export default Besnu;