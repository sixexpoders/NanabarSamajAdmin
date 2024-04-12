import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const filter = {
        is_Karobari_Member: true,
        // Other filter parameters can be added here
      };

      const queryString = Object.keys(filter)
        .map(key => key + '=' + filter[key])
        .join('&');

      const apiUrl = 'http://nanabarsamaj-001-site1.htempurl.com/api/User/GetAll';
      const response = await fetch(apiUrl + '?' + queryString);

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Surname</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Address</th>
              {/* Add more table headers for additional fields */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.father_name}</td>
                <td>{user.surname}</td>
                <td>{user.mobile_number}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                {/* Add more table cells for additional fields */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
