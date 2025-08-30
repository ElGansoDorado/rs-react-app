import type { CountriesData } from '@/shared/model/country';
import { useConfig } from '@/shared/store/use-config';

type Props = {
  countryCO2Data: CountriesData;
  selectedCountry: string;
};

function TableData({ countryCO2Data, selectedCountry }: Props) {
  const configList = useConfig((state) => state.config);

  return (
    <table className="table">
      <caption className="table__title">{selectedCountry} table</caption>,
      <thead className="table__head">
        <tr>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>co2 per capita</th>
          {configList.includes('gdp') && <th>gdp</th>}
          {configList.includes('cumulative_luc_co2') && (
            <td>cumulative luc co2</td>
          )}
          {configList.includes('ghg_excluding_lucf_per_capita') && (
            <td>ghg excluding lucf per capita</td>
          )}
          {configList.includes('ghg_per_capita') && <td>ghg per capita</td>}
          {configList.includes('cement_co') && <th>cement co2</th>}
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
              {configList.includes('gdp') && (
                <td>{yearData.gdp?.toLocaleString() || 'N/A'}</td>
              )}

              {configList.includes('cumulative_luc_co2') && (
                <td>
                  {yearData.cumulative_luc_co2?.toLocaleString() || 'N/A'}
                </td>
              )}
              {configList.includes('ghg_excluding_lucf_per_capita') && (
                <td>
                  {yearData.ghg_excluding_lucf_per_capita?.toLocaleString() ||
                    'N/A'}
                </td>
              )}
              {configList.includes('ghg_per_capita') && (
                <td>{yearData.ghg_per_capita?.toLocaleString() || 'N/A'}</td>
              )}

              {configList.includes('cement_co') && (
                <td>{yearData.cement_co2?.toLocaleString() || 'N/A'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableData;
