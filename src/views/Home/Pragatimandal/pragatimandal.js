import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CommonDataTable from '../Common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfo, faPlus,faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Pragatimandal = () => {
  const [PragatimandalData, setPragatimandalData] = useState([]);
  const [loading, setloading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddPragatimandalForm, setShowAddPragatimandalForm] = useState(false);
  const [selectedPragatimandal, setSelectedPragatimandal] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePragatimandalId, setDeletePragatimandalId] = useState(null);
  const [Positions, setPositions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPragatimandalData = async () => {
    try {
      setloading(true);
      const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetPragatimandals');
      const modifiedData = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        lookup_position_id: item.lookup_position_id,
        is_active: item.is_active
      }));
      setPragatimandalData(modifiedData);
      setloading(false);
    } catch (error) {
      console.error('Error fetching Pragatimandal data:', error);
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
    fetchPragatimandalData();
    fetchPositions(); // Fetch positions data on component mount
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetPositions');
      const data = response.data.data;
      setPositions(data);
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };

  const refreshPragatimandalList = () => {
    fetchPragatimandalData();
  };

  const handleAddClick = () => {
    setShowAddPragatimandalForm(true);
  };

  const handleEditClick = (PragatimandalItem) => {
    setSelectedPragatimandal(PragatimandalItem);
    setShowEditForm(true);
  };

  const handleDeleteClick = (PragatimandalItemId) => {
    setDeletePragatimandalId(PragatimandalItemId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deletePragatimandal(deletePragatimandalId);
      setPragatimandalData(PragatimandalData.filter(item => item.id !== deletePragatimandalId));
      setShowDeleteConfirmation(false);
      setSuccessMessage('Pragatimandal deleted successfully');
    } catch (error) {
      console.error('Error deleting Pragatimandal:', error);
    }
  };

  const deletePragatimandal = async (PragatimandalId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/DeletePragatimandal?id=${PragatimandalId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting Pragatimandal:', error);
      throw error;
    }
  };

  const columns = [
    { title: 'Name', data: 'name' },
    {
      title: 'Position',
      render: (rowData) => {
        const position = Positions.find(position => position.id === rowData.lookup_position_id);
        return position ? position.name : '-';
      }
    },
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
        </div>
      )
    }
  ];

  const AddForm = ({ onClose, refreshPragatimandalData }) => {
    const [formData, setFormData] = useState({
      name: '',
      lookup_position_id: '',
      is_active: true
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/AddPragatimandal', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        refreshPragatimandalData();
        setSuccessMessage('Pragatimandal added successfully');
        onClose();
      } catch (error) {
        console.error('Error adding Pragatimandal:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Pragatimandal</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <select className="form-control" name="lookup_position_id" value={formData.lookup_position_id} onChange={handleInputChange} required>
                    <option value="">Select Position</option>
                    {Positions.map((position) => (
                      <option key={position.id} value={position.id}>{position.name}</option>
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

  const UpdateForm = ({ PragatimandalId, PragatimandalItem, onClose }) => {
    const [formData, setFormData] = useState({
      id: PragatimandalId,
      name: PragatimandalItem.name || '',
      lookup_position_id: PragatimandalItem.lookup_position_id || '',
      is_active: PragatimandalItem.is_active || true
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleupdate = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/UpdatePragatimandal?id=${PragatimandalId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        refreshPragatimandalList();
        setSuccessMessage('Pragatimandal updated successfully');
        onClose();
      } catch (error) {
        console.error('Error updating Pragatimandal:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Pragatimandal</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleupdate}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <select className="form-control" name="lookup_position_id" value={formData.lookup_position_id} onChange={handleInputChange} required>
                    <option value="">Select Position</option>
                    {Positions.map((position) => (
                      <option key={position.id} value={position.id}>{position.name}</option>
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


  const dummyRenderRow = (rowData, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {columns.map((column, columnIndex) => (
          <td key={columnIndex}>
            {column.render ? column.render(rowData) : rowData[column.data]}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="container">
      <h2>Pragatimandal</h2>
      <div className="position-relative">
            <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add Pragatimandal</button>
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
          data={PragatimandalData}
          columns={columns}
          className="table-bordered"
          entitiesPerPageOptions={[5, 10, 25, 50, 100]}
          defaultEntitiesPerPage={10}
          renderRow={dummyRenderRow}
        />
      )}
      {showAddPragatimandalForm && (
        <AddForm
          onClose={() => setShowAddPragatimandalForm(false)}
          refreshPragatimandalData={refreshPragatimandalList}
        />
      )}
      {showEditForm && selectedPragatimandal && (
        <UpdateForm
          PragatimandalId={selectedPragatimandal.id}
          PragatimandalItem={selectedPragatimandal}
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showDeleteConfirmation && deletePragatimandalId && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this  {PragatimandalData.find(P => P.id === deletePragatimandalId).name}?</p>
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

export default Pragatimandal;
