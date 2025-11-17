import { useState, useEffect } from 'react';

export const usePagination = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction(page);
      if (response.data) {
        setData(page === 1 ? response.data : [...data, ...response.data]);
        setCurrentPage(response.current_page || page);
        setTotalPages(response.last_page || 1);
        setHasMore(response.current_page < response.last_page);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchData(currentPage + 1);
    }
  };

  const refresh = () => {
    setData([]);
    setCurrentPage(1);
    fetchData(1);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    refresh,
    setData,
  };
};

