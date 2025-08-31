import type {
  CountriesData,
  SortConfig,
  SortField,
} from '@/shared/types/country';
import { useConfig } from '@/shared/store/use-config';
import { useMemo, useState } from 'react';

export const useSort = (countryCO2Data: CountriesData) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: 'asc',
  });
  const search = useConfig((state) => state.search);

  const sortedCountryNames = useMemo(() => {
    const names = Object.keys(countryCO2Data).filter((name) =>
      name.includes(search)
    );

    if (!sortConfig.field) return names;

    return [...names].sort((a, b) => {
      const countryA = countryCO2Data[a];
      const countryB = countryCO2Data[b];

      let comparison = 0;

      switch (sortConfig.field) {
        case 'name':
          comparison = a.localeCompare(b);
          break;

        case 'iso':
          comparison = (countryA.iso_code || 'N/A').localeCompare(
            countryB.iso_code || 'N/A'
          );
          break;

        case 'population':
          comparison = -(
            (countryA.data[countryA.data.length - 1]?.population ?? 0) -
            (countryB.data[countryB.data.length - 1]?.population ?? 0)
          );
          break;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [countryCO2Data, sortConfig, search]);

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }

      return {
        field,
        direction: 'asc',
      };
    });
  };

  const getSortIndicator = (field: SortField) => {
    if (sortConfig.field !== field) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return { sortedCountryNames, handleSort, getSortIndicator };
};
