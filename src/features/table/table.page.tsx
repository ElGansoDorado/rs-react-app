import { Profiler, Suspense, useState } from 'react';
import { useLoading } from './use-loading';
import { TableCountry, TableData } from '.';
import { onRender } from '@/shared/utils/profilerMetrics';

function Table() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const { countryCO2Data, loading } = useLoading();

  if (!countryCO2Data) {
    return <p>Loading: {loading}%</p>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="table__grid">
        <Profiler id="country" onRender={onRender}>
          <TableCountry
            {...{ countryCO2Data, selectedCountry, setSelectedCountry }}
          />
        </Profiler>

        <Profiler id="data" onRender={onRender}>
          {selectedCountry ? (
            <TableData {...{ countryCO2Data, selectedCountry }} />
          ) : (
            <p>select a country to display its co2 data</p>
          )}
        </Profiler>
      </div>
    </Suspense>
  );
}

export default Table;
