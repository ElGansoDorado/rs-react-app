import type { CountriesData } from '@/shared/model/country';

type Props = {
  countryCO2Data: CountriesData;
  selectedCountry: string;
};

function TableData({ countryCO2Data, selectedCountry }: Props) {
  return (
    <table className="table">
      <caption className="table__title">{selectedCountry} table</caption>,
      <thead className="table__head">
        <tr>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>co2 per capita</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {countryCO2Data[selectedCountry]?.data.map((_, index, array) => {
          const yearData = array[array.length - 1 - index];
          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{yearData.population?.toLocaleString() || 'N/A'}</td>
              <td>{yearData.co2?.toLocaleString() || 'N/A'}</td>
              <td>
                {yearData.cement_co2_per_capita?.toLocaleString() || 'N/A'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableData;
