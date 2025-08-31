import type { CountriesData, YearData } from '@/shared/types/country';
import { useConfig } from '@/shared/store/use-config';
import { useMemo, memo } from 'react';

type Props = {
  countryCO2Data: CountriesData;
  selectedCountry: string;
};

interface ConfigFlags {
  hasGdp: boolean;
  hasCumulativeLucCo2: boolean;
  hasGhgExcludingLucf: boolean;
  hasGhgPerCapita: boolean;
  hasCementCo: boolean;
}

const StaticColumns = memo(({ yearData }: { yearData: YearData }) => (
  <>
    <td>{yearData.year}</td>
    <td>{yearData.population?.toLocaleString() || 'N/A'}</td>
    <td>{yearData.co2?.toLocaleString() || 'N/A'}</td>
    <td>{yearData.cement_co2_per_capita?.toLocaleString() || 'N/A'}</td>
  </>
));
StaticColumns.displayName = 'StaticColumns';

const DynamicColumns = memo(
  ({
    yearData,
    configFlags,
  }: {
    yearData: YearData;
    configFlags: ConfigFlags;
  }) => (
    <>
      {configFlags.hasGdp && <td>{yearData.gdp?.toLocaleString() || 'N/A'}</td>}
      {configFlags.hasCumulativeLucCo2 && (
        <td>{yearData.cumulative_luc_co2?.toLocaleString() || 'N/A'}</td>
      )}
      {configFlags.hasGhgExcludingLucf && (
        <td>
          {yearData.ghg_excluding_lucf_per_capita?.toLocaleString() || 'N/A'}
        </td>
      )}
      {configFlags.hasGhgPerCapita && (
        <td>{yearData.ghg_per_capita?.toLocaleString() || 'N/A'}</td>
      )}
      {configFlags.hasCementCo && (
        <td>{yearData.cement_co2?.toLocaleString() || 'N/A'}</td>
      )}
    </>
  )
);
DynamicColumns.displayName = 'DynamicColumns';

const TableHeader = memo(({ configFlags }: { configFlags: ConfigFlags }) => (
  <thead className="table__head">
    <tr>
      <th>Year</th>
      <th>Population</th>
      <th>CO2</th>
      <th>co2 per capita</th>
      {configFlags.hasGdp && <th>gdp</th>}
      {configFlags.hasCumulativeLucCo2 && <th>cumulative luc co2</th>}
      {configFlags.hasGhgExcludingLucf && (
        <th>ghg excluding lucf per capita</th>
      )}
      {configFlags.hasGhgPerCapita && <th>ghg per capita</th>}
      {configFlags.hasCementCo && <th>cement co2</th>}
    </tr>
  </thead>
));
TableHeader.displayName = 'TableHeader';

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

  const countryData = countryCO2Data[selectedCountry]?.data;

  if (!countryData) {
    return <div>No data available for {selectedCountry}</div>;
  }

  return (
    <table className="table">
      <caption className="table__title">{selectedCountry} table</caption>
      <TableHeader configFlags={configFlags} />
      <tbody className="table__body">
        {countryData.map((_, index, array) => {
          const yearData = array[array.length - 1 - index];
          return (
            <tr key={yearData.year}>
              <StaticColumns yearData={yearData} />
              <DynamicColumns yearData={yearData} configFlags={configFlags} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default memo(TableData);
