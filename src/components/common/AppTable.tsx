"use client"
import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { APP_ROUTES } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T, index?: number) => React.ReactNode);
  className?: string;
}

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pagination?: boolean;
  itemsPerPage?: number;
  className?: string;
}

const AppTable = <T extends Record<string, any>>({
  columns,
  data,
  pagination = false,
  itemsPerPage = 10,
  className = '',
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderCellContent = (column: Column<T>, item: T, index: number) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item, index);
    }
    return item[column.accessor];
  };

  const handleRowClick = (item: T) => {
    if(item?.address) {
      navigate(`${APP_ROUTES.WALLET_TRACKER}/${item?.address}`)
    }
  }

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftOffset = Math.floor(maxVisiblePages / 2);
      const rightOffset = Math.ceil(maxVisiblePages / 2) - 1;

      let startPage = currentPage - leftOffset;
      let endPage = currentPage + rightOffset;

      if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxVisiblePages + 1;
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="text-base sm:text-lg px-2">
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page as number)}
          className={`h-8 w-8 sm:h-10 sm:w-10 rounded-md flex items-center justify-center text-base sm:text-lg ${
            currentPage === page
              ? 'bg-[#9c46eb]'
              : 'hover:bg-[#2a2a2a]'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <>
      <div className={`relative overflow-x-auto rounded-[20px] border border-[#9C46EB] ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] md:min-w-[1400px]">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                {columns.map((column, index) => (
                  <th
                    key={`header-${index}`}
                    className={`text-left py-4 sm:py-5 px-4 sm:px-6 text-base sm:text-lg ${column.className || ''}`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={`item-${index}`}
                  className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/30 !cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`cell-${colIndex}-${index}`}
                      className={`py-1 sm:py-5 px-1 sm:px-6 text-sm sm:text-lg ${column.className || ''}`}
                    >
                      {renderCellContent(column, item, startIndex + index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 sm:p-1.5 rounded-md hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-1.5 rounded-md hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default AppTable;