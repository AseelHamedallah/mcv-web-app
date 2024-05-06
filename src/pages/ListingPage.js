import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredItems } from '../reducers/filteredItemsSlice';
import { fetchData } from '../services/api';
import styles from './ListingPage.module.css';

function ListingPage() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [originalItems, setOriginalItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 10; 
  useEffect(() => {
    fetchData()
      .then((data) => {
        dispatch(setFilteredItems(data));
        setOriginalItems(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [dispatch]);

  const filteredItems = useSelector((state) => state.filteredItems);

  const handleDelete = (id) => {
    const updatedItems = filteredItems.filter((item) => item.id !== id);

    const itemElement = document.getElementById(`item-${id}`);
    if (itemElement) {
      itemElement.style.transition = 'transform 0.5s ease';
      itemElement.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        itemElement.style.display = 'none';
        dispatch(setFilteredItems(updatedItems));
        const updatedVisibleItems = document.querySelectorAll('.item');
        updatedVisibleItems.forEach((item, index) => {
          item.style.transition = 'transform 0.5s ease';
          item.style.transform = `translateY(-${20 * index}px)`;
        });
      }, 500);
    }
  };


  const handleSort = () => {
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    dispatch(setFilteredItems(sortedItems));
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query === '') {
      dispatch(setFilteredItems(originalItems));

    } else {
      const searchValues = filteredItems?.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
      dispatch(setFilteredItems(searchValues));
    }
  };

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visibleItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className={styles.container}>
      <h1>Listing Page</h1>

      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
          {searchTerm && (
            <span
              className={styles.clearIcon}
              onClick={() => {
                setSearchTerm('');
                dispatch(setFilteredItems(originalItems));
                setCurrentPage(1);
              }}
            >
              X
            </span>
          )}
        </div>
        <button onClick={handleSort} className={styles.sortButton}>
          Sort Alphabetically {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
      </div>

      {visibleItems.length === 0 ? (
        <div className={styles.noResults}>No results found</div>
      ) : (
        <div className={styles.itemsContainer} id={'itemsContainer'}>
          {visibleItems.map((item, index) => {
            const itemIndex = (currentPage - 1) * pageSize + index;
            return (
              <div key={itemIndex} id={`item-${itemIndex}`} className={styles.item}>
                <Link
                  to={{ pathname: `/details/${itemIndex}`, state: { filteredItems } }}
                  onClick={() => console.log('Item data:', item)}
                  className={styles.itemLink}
                >
                  {item.name}
                </Link>
                <button
                  onClick={() => handleDelete(itemIndex)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            );
          })}

        </div>
      )}

      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <span className={styles.pageNumber}>{currentPage}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );

}


export default ListingPage;
