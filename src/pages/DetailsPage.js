import React from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/DetailsPage.module.css';

function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const filteredItems = useSelector((state) => state.filteredItems);
  const item = filteredItems[parseInt(id, 10)];

  const goBack = () => {
    navigate('/')
  };

  if (!item) {
    return <div>Item not found</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h2>{item.name}</h2>
        <p>Country: {item.country}</p>
        <p>State/Province: {item['state-province'] || 'N/A'}</p>
        <p>Domains: {item.domains.join(', ')}</p>
        <p>Web Pages:</p>
        <div className={styles.link}>
          {item.web_pages.map((page, index) => (
            <a key={index} href={page} target="_blank" rel="noopener noreferrer">
              {page}
            </a>
          ))}
        </div>

      </div>

      <button onClick={goBack} className={styles.backButton}>
          Back
        </button>
    </div>
  );
}

export default DetailsPage;
