import type { CountriesData } from '@/shared/types/country';
import { useConfig } from '@/shared/store/use-config';
import { useMemo } from 'react';

type Props = {
  countryCO2Data: CountriesData;
  selectedCountry: string;
};

function TableData({ countryCO2Data, selectedCountry }: Props) {
  const configList = useConfig((state) => state.config);

  const configFlags = useMemo(
    () => ({
      hasGdp: configList.includes('gdp'),
      hasCumulativeLucCo2: configList.includes('cumulative_luc_co2'),
      hasGhgExcludingLucf: configList.includes('ghg_excluding_lucf_per_capita'),
      hasGhgPerCapita: configList.includes('ghg_per_capita'),
      hasCementCo: configList.includes('cement_co'),
    }),
    [configList]
  );

  return (
    <table className="table">
      <caption className="table__title">{selectedCountry} table</caption>,
      <thead className="table__head">
        <tr>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>co2 per capita</th>
          {configFlags.hasGdp && <th>gdp</th>}
          {configFlags.hasCumulativeLucCo2 && <td>cumulative luc co2</td>}
          {configFlags.hasGhgExcludingLucf && (
            <td>ghg excluding lucf per capita</td>
          )}
          {configFlags.hasGhgPerCapita && <td>ghg per capita</td>}
          {configFlags.hasCementCo && <th>cement co2</th>}
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
              {configFlags.hasGdp && (
                <td>{yearData.gdp?.toLocaleString() || 'N/A'}</td>
              )}

              {configFlags.hasCumulativeLucCo2 && (
                <td>
                  {yearData.cumulative_luc_co2?.toLocaleString() || 'N/A'}
                </td>
              )}
              {configFlags.hasGhgExcludingLucf && (
                <td>
                  {yearData.ghg_excluding_lucf_per_capita?.toLocaleString() ||
                    'N/A'}
                </td>
              )}
              {configFlags.hasGhgPerCapita && (
                <td>{yearData.ghg_per_capita?.toLocaleString() || 'N/A'}</td>
              )}

              {configFlags.hasCementCo && (
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
