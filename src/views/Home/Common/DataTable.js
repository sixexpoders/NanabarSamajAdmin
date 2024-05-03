import React, { useState } from 'react';

const CommonDataTable = ({ data, columns, className, entitiesPerPageOptions, defaultEntitiesPerPage, renderRow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [entitiesPerPage, setEntitiesPerPage] = useState(defaultEntitiesPerPage);

  // Function to handle sorting
  const handleSort = (column) => {
    setSortedColumn(column);
    setSortDirection((prevDirection) => {
      const newDirection = column === sortedColumn ? (prevDirection === 'asc' ? 'desc' : 'asc') : 'asc';
      return newDirection;
    });
  };

  // Function to handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Function to handle search
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Function to handle changing entities per page
  const handleEntitiesPerPageChange = (value) => {
    setEntitiesPerPage(value);
    setCurrentPage(1); // Reset to first page when changing entities per page
  };

  // Filter and sort data based on search query and sorting criteria
  let filteredData = data.filter((item) => {
    return Object.values(item).some((value) =>
      value && value.toString().toLowerCase().includes(searchQuery)
    );
  });

  if (sortedColumn) {
    filteredData.sort((a, b) => {
      const aValue = a[sortedColumn] ? a[sortedColumn].toString().toLowerCase() : '';
      const bValue = b[sortedColumn] ? b[sortedColumn].toString().toLowerCase() : '';
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }

  // Calculate pagination
  const totalEntities = filteredData.length;
  const totalPages = Math.ceil(totalEntities / entitiesPerPage);
  const startIndex = (currentPage - 1) * entitiesPerPage;
  const endIndex = Math.min(startIndex + entitiesPerPage, totalEntities);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="table-container" style={{ position: 'relative' }}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group" style={{ width: '15%' }}>
            <select
              id="entitiesPerPageSelect"
              value={entitiesPerPage}
              onChange={(e) => handleEntitiesPerPageChange(parseInt(e.target.value))}
              className="form-select"
            >
              {entitiesPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="form-group" style={{ width: '40%', justifyContent: 'flex-end' }}>
            <input
              id="searchInput"
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive" style={{ marginTop: '10px' }}>
        {paginatedData.length === 0 ? (
          <div className="text-center" style={{ marginTop: '150px' }}>
            No data found
          </div>
        ) : (
          <table className={`table ${className}`}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} style={{ cursor: 'pointer' }} onClick={() => handleSort(column.data)}>
                    {column.title}
                    {sortedColumn === column.data && (
                      <i className={`bi bi-arrow-${sortDirection === 'asc' ? 'down' : 'up'}`} style={{ marginLeft: '5px' }}></i>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  {renderRow(item)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="row">
        <div className="col-md-6">
          {totalEntities > 0 && (
            <span>{`Showing ${startIndex + 1} to ${endIndex} of ${totalEntities} entries`}</span>
          )}
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {[...Array(totalPages).keys()].map((page) => (
                <li key={page} className={`page-item ${page + 1 === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePagination(page + 1)}>
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

CommonDataTable.defaultProps = {
  entitiesPerPageOptions: [5, 10, 25, 50, 100], // Default options for entities per page dropdown
  defaultEntitiesPerPage: 5, // Default number of entities per page
};

export default CommonDataTable;
