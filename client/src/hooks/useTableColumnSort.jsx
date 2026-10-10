import { useMemo, useState } from "react";

function useTableColumnSort(data = [], accessors = {}) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) {
      return data;
    }

    const accessor = accessors[sortConfig.key];

    return [...data].sort((a, b) => {
      const aValue = accessor ? accessor(a) : a?.[sortConfig.key];
      const bValue = accessor ? accessor(b) : b?.[sortConfig.key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [data, accessors, sortConfig]);

  return {
    sortedData,
    sortConfig,
    handleSort,
  };
}

export default useTableColumnSort;
