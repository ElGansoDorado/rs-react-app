import type { CountriesData } from '@/shared/types/country';
import { useSort } from './use-sort';
import { useConfig } from '@/shared/store/use-config';
import { useCallback, useMemo } from 'react';
import TableRow from './table-row';

type Props = {
  countryCO2Data: CountriesData | null;
  selectedCountry: string;
  setSelectedCountry: (str: string) => void;
};

function TableCountry({
  countryCO2Data,
  selectedCountry,
  setSelectedCountry,
}: Props) {
  if (!countryCO2Data) {
    throw new Promise(() => {});
  }

  const { sortedCountryNames, handleSort, getSortIndicator } =
    useSort(countryCO2Data);
  const year = useConfig((state) => state.year);

  const handleSortName = useCallback(() => handleSort('name'), [handleSort]);
  const handleSortIso = useCallback(() => handleSort('iso'), [handleSort]);
  const handleSortPopulation = useCallback(
    () => handleSort('population'),
    [handleSort]
  );

  const handleCountrySelect = useCallback(
    (countryName: string) => {
      setSelectedCountry(countryName);
    },
    [setSelectedCountry]
  );

  const tableRows = useMemo(() => {
    return sortedCountryNames.map((name) => {
      const country = countryCO2Data[name];
      const currentPopulation =
        country.data
          .find((item) => item.year === year)
          ?.population?.toLocaleString() || 'N/A';
      return {
        name,
        iso: country.iso_code || 'N/A',
        currentPopulation,
        isSelected: name === selectedCountry,
      };
    });
  }, [sortedCountryNames, countryCO2Data, year, selectedCountry]);

  return (
    <table className="table">
      <caption className="table__title">Country list</caption>
      <thead className="table__head">
        <tr>
          <th onClick={handleSortName}>Name {getSortIndicator('name')}</th>
          <th onClick={handleSortIso}>ISO {getSortIndicator('iso')}</th>
          <th onClick={handleSortPopulation}>
            Population {getSortIndicator('population')}
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {tableRows.map(({ name, iso, currentPopulation, isSelected }) => (
          <TableRow
            key={name}
            name={name}
            iso={iso}
            population={currentPopulation}
            isSelected={isSelected}
            onSelect={handleCountrySelect}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TableCountry;
