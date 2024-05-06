export const fetchData = async () => {
    try {
      const response = await fetch('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      localStorage.setItem('items', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      const cachedData = localStorage.getItem('items');
      if (cachedData) {
        return JSON.parse(cachedData);
      } else {
        throw new Error('No cached data available');
      }
    }
  };
  