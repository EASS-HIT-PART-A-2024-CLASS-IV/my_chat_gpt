// usePagination.js
import {useState, useCallback, useEffect} from 'react';

const usePagination = (totalItems, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const setCurrentPageSafely = useCallback((page) => {
    setCurrentPage((prevPage) => {
      // Ensures the page is within the valid range
      const validatedPage = Math.max(1, Math.min(page, totalPages));
      return validatedPage;
    });
  }, [totalPages]);

    useEffect(() => {
    // Reset to the first page when items per page change
    setCurrentPage(1);
  }, [itemsPerPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPageSafely(currentPage + 1);
  }, [currentPage, setCurrentPageSafely]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPageSafely(currentPage - 1);
  }, [currentPage, setCurrentPageSafely]);

  const isNextPageAvailable = currentPage < totalPages;
  const isPreviousPageAvailable = currentPage > 1;

  // Calculate the slice of items to be displayed.
  // This calculation is moved to the component where items are available.
  const getPaginatedItems = useCallback((items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    isNextPageAvailable,
    isPreviousPageAvailable,
    getPaginatedItems,
  };
};

export default usePagination;
