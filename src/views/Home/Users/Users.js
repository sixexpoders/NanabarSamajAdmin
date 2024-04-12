import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonDataTable from '../Common/DataTable'; // Assuming CommonDataTable is in the same directory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';
import defaultImage from '../../../assets/images/profile.png';
import { Link } from 'react-router-dom';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


const UpdateForm = ({ user, onClose }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    id: user.id || '',
    name: user.username || '',
    surname: user.surname || '',
    father_name: user.father_name || '',
    mother_name: user.mother_name || '',
    mobile_number: user.mobile_number || '',
    email: user.email || '',
    gender: user.gender || '',
    address: user.address || '',
    lookup_city_id: user.lookup_city_id || '',
    lookup_state_id: user.lookup_state_id || '',
    lookup_country_id: user.lookup_country_id || '',
    pincode: user.pincode || '',
    lookup_sakh_id: user.lookup_sakh_id || '',
    password: user.password, // Never store passwords in state
    is_terms: user.is_terms || false,
    image: user.image || '',
    dob: user.dob || '',
    lookup_career_id: user.lookup_career_id || '',
    lookup_education_type_id: user.lookup_education_type_id || '',
    lookup_education_sub_type_id: user.lookup_education_sub_type_id || '',
    lookup_marital_id: user.lookup_marital_id || '', // Set the valid ID here
    religion: user.religion || '',
    mother_tongue: user.mother_tongue || '',
    community: user.community || '',
    diet_preferences: user.diet_preferences || '',
    annual_income: user.annual_income || '',
    collage_name: user.collage_name || '',
    hobbies: user.hobbies || '',
    is_active: user.is_active || true,
    is_admin_approve: user.is_admin_approve,
    is_karobari_member: user.is_karobari_member || false,
    is_verify: user.is_verify || true,
    updated_by_id: user.updated_by_id || '', // Assuming this field is available
    updated_on: user.updated_on || '', // Assuming this field is available
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [maritales, setMaritales] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state for success message visibility



  useEffect(() => {
    // Fetch countries
    axios.get('http://nanabarsamaj-001-site1.htempurl.com/api/Lookup/GetCountries')
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
      axios.get(`http://nanabarsamaj-001-site1.htempurl.com/api/Lookup/GetState?country_id=${formData.lookup_country_id}`)
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
      axios.get(`http://nanabarsamaj-001-site1.htempurl.com/api/Lookup/GetMaritalTypes`)
        .then(response => {
          setMaritales(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching marital types:', error);
        });
    }
  }, [formData.lookup_state_id]);

  useEffect(() => {
    // Fetch cities based on the selected state
    if (formData.lookup_state_id) {
      axios.get(`http://nanabarsamaj-001-site1.htempurl.com/api/Lookup/GetCities?state_id=${formData.lookup_state_id}`)
        .then(response => {
          setCities(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [formData.lookup_state_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lookup_country_id') {
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
    } else {
      // Otherwise, update the form data as usual
      setFormData({ ...formData, [name]: value });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const formDataCopy = { ...formData };

      formDataCopy.password = formData.password;
      formDataCopy.gender = formData.gender;
      formDataCopy.is_admin_approve = formData.is_admin_approve;
      const response = await axios.put('http://nanabarsamaj-001-site1.htempurl.com/api/User/Update', formDataCopy, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowSuccessMessage(true); // Show success message
      console.log('User updated successfully:', response.data);
      setFormData(response.data.data);
      onClose();

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {showSuccessMessage && ( // Show success message if showSuccessMessage is true
              <div className="alert alert-success" role="alert">
                User updated successfully
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">User name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Surname</label>
                <input type="text" className="form-control" name="surname" value={formData.surname} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Father's Name</label>
                <input type="text" className="form-control" name="father_name" value={formData.father_name} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Mother's Name</label>
                <input type="text" className="form-control" name="mother_name" value={formData.mother_name} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input type="text" className="form-control" name="mobile_number" value={formData.mobile_number} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Marital</label>
                <select className="form-control" name="lookup_marital_id" value={formData.lookup_marital_id} onChange={handleInputChange}>
                  <option value="">Select marital</option>
                  {maritales.map(marital => (
                    <option key={marital.id} value={marital.id}>{marital.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Country</label>
                <select className="form-control" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange}>
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">State</label>
                <select className="form-control" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange}>
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <select className="form-control" name="lookup_city_id" value={formData.lookup_city_id} onChange={handleInputChange}>
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Is Admin Approve</label>
                <select className="form-control" name="is_admin_approve" value={formData.is_admin_approve} onChange={handleInputChange}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
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

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const [userDetailsVisible, setUserDetailsVisible] = useState({}); // State to manage visibility of user details
  const [userInfo, setUserInfo] = useState(null); // State to manage user info
  const [memberData, setMemberData] = useState(null); // Add this line to define memberData state


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://nanabarsamaj-001-site1.htempurl.com/api/admin/Lookup/GetUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const adminEmail = localStorage.getItem('adminEmail');
        const filteredUserData = response.data.data.filter(user => user.email !== adminEmail);

        setUserData(filteredUserData); // Set filtered user data to the state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const columns = [
    {
      title: '', data: 'toggle', render: (item) => (
        <button className="btn btn-link" onClick={() => handleRowExpand(item.id)}>
          <FontAwesomeIcon icon={expandedRows.includes(item.id) ? faAngleUp : faAngleDown} />
        </button>
      )
    },
    {
      title: 'Image', data: 'image', render: (item) => (
        <img src={item.image ? `http://nanabarsamaj-001-site1.htempurl.com/GetImage/${item.image}` : defaultImage} alt="User" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
      )
    },
    {
      title: 'Name',
      data: 'username',
      render: (item) => (
        <>
          {item.username} {item.father_name && `${item.father_name}`} {item.surname}
        </>
      )
    },
    { title: 'Mobile Number', data: 'mobile_number' },
    { title: 'Email', data: 'email' },
    { title: 'Gender', data: 'gender' },
    {
      title: 'Address', data: 'address', render: (item) => (
        <>
          {item.address && `${item.address}, `}
          {item.city_name && `${item.city_name}, `}
          {item.state_name && `${item.state_name}, `}
          {item.country_name && item.country_name}
        </>
      )
    },
    { title: 'IsActive', data: 'is_active', render: (item) => item.is_active !== null ? item.is_active.toString() : 'N/A' },
    { title: 'IsVerify', data: 'is_verify', render: (item) => item.is_verify !== null ? item.is_verify.toString() : 'N/A' },
    { title: 'IsAdminApprove', data: 'is_admin_approve', render: (item) => item.is_admin_approve !== null ? item.is_admin_approve.toString() : 'N/A' },
    {
      title: 'Actions', data: 'actions', render: (item) => (
        <div className="d-flex">
          <button className="btn btn-primary me-2" style={{ height: '40px', width: '40px' }} onClick={() => handleEditClick(item)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger me-2" style={{ height: '40px', width: '40px' }} onClick={() => handleDeleteClick(item.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <Link to={`/Home/Info/${item.id}`} className="btn btn-info" style={{ height: '40px', width: '40px' }} >
            <FontAwesomeIcon icon={faInfo} />
          </Link>
        </div>
      )
    }
  ];

  const getUserById = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`http://nanabarsamaj-001-site1.htempurl.com/api/User/GetById?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  };



  const handleEditClick = async (user) => {
    try {
      setSelectedUser(user);
      setShowEditForm(true);
    } catch (error) {
      console.error('Error handling edit click:', error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      const userData = await getUserById(userId); // Fetch user data
      setUserInfo(userData); // Set user info
      setDeleteUserId(userId); // Set delete user ID
      setShowDeleteConfirmation(true); // Show delete confirmation modal
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteUser(deleteUserId);
      setUserData(userData.filter(user => user.id !== deleteUserId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://nanabarsamaj-001-site1.htempurl.com/api/User/Delete?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };


  const handleRowExpand = async (userId) => {
    try {
      if (expandedRows.includes(userId)) {
        // If the user row is already expanded, hide member data
        setExpandedRows(expandedRows.filter(id => id !== userId));
      } else {
        // If the user row is collapsed, fetch and display member data
        const token = localStorage.getItem('adminToken');
        const memberResponse = await axios.post("http://nanabarsamaj-001-site1.htempurl.com/api/Member/GetAll", {
          user_id: userId,
          page_number: null,
          page_size: null,
          age: null,
          education: null,
          occupation: null,
          gender: null,
          you_live_abroad: null,
          marital: null,
          height: null,
          weight: null,
          interested_matrimonial: null,
          lookup_village_id: null,
          lookup_pragatimandal_id: null,
          is_admin_approve: null
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Update memberData state with fetched member data and log the updated state
        setMemberData(memberResponse.data.data);
        console.log("Member data:", memberResponse.data.data);

        // Expand the user row and update expandedRows state
        setExpandedRows([...expandedRows, userId]);
      }
    } catch (error) {
      console.error('Error handling row expand:', error);
    }
  };





  return (
    <div className="container-lg">
      <h2>User Management</h2>
      {loading ? (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          textAlign: 'center'
        }}>
          <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em' }} />
        </div>
      ) : (
        <CommonDataTable
          data={userData}
          columns={columns}
          className="table-bordered"
          render={() => (
            <table className="table">
              <thead>
                <tr>
                  {columns.map((column, columnIndex) => (
                    <th key={columnIndex}>{column.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      {columns.map((column, columnIndex) => (
                        <td key={columnIndex}>
                          {column.data === 'toggle' ? (
                            <button className="btn btn-secondary" onClick={() => handleRowExpand(user.id)}>
                              {expandedRows.includes(user.id) ? 'Hide Details' : 'Show Details'}
                            </button>
                          ) : (
                            column.render ? column.render(user) : user[column.data]
                          )}
                        </td>
                      ))}
                    </tr>
                    {expandedRows.includes(user.id) && memberData[user.id] ? (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Relation Type</th>
                            <th>Name</th>
                            {/* Add other headers as per your requirement */}
                          </tr>
                        </thead>
                        <tbody>
                          {memberData[user.id].map((member, index) => (
                            <tr key={index}>
                              <td>{member.relation_type}</td>
                              <td>{member.name}</td>
                              {/* Add other cells with member details as per your requirement */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No member data available for this user.</p>
                    )}

                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        />
      )}
      {showEditForm && selectedUser && (
        <UpdateForm
          user={selectedUser}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showDeleteConfirmation && userInfo && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: showDeleteConfirmation ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete user: <strong>{userInfo.username}</strong>?</p>
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
  );
};

export default Users;
