import type { CountriesData } from '@/shared/model/country';
import { useSort } from './use-sort';
import { useConfig } from '@/shared/store/use-config';

type Props = {
  countryCO2Data: CountriesData;
  selectedCountry: string;
  setSelectedCountry: (str: string) => void;
};

function TableCountry({
  countryCO2Data,
  selectedCountry,
  setSelectedCountry,
}: Props) {
  const { sortedCountryNames, handleSort, getSortIndicator } =
    useSort(countryCO2Data);
  const year = useConfig((state) => state.year);

  return (
    <table className="table">
      <caption className="table__title">Country list</caption>
      <thead className="table__head">
        <tr>
          <th onClick={() => handleSort('name')}>
            Name {getSortIndicator('name')}
          </th>
          <th onClick={() => handleSort('iso')}>
            ISO {getSortIndicator('iso')}
          </th>
          <th onClick={() => handleSort('population')}>
            Population {getSortIndicator('population')}
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {sortedCountryNames.map((item) => {
          const country = countryCO2Data[item];
          const latestData = country.data.find((item) => item.year === year);

          return (
            <tr
              className={`table__button ${item === selectedCountry ? 'table__active' : ''}`}
              onClick={() => setSelectedCountry(item)}
              key={item}
            >
              <td>{item}</td>
              <td>{country.iso_code || 'N/A'}</td>
              <td>{latestData?.population?.toLocaleString() || 'N/A'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableCountry;
