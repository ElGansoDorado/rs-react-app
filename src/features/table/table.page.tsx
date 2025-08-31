import { Profiler, Suspense, useState } from 'react';
import { useLoading } from './use-loading';
import { TableCountry, TableData } from '.';
import { onRender } from '@/shared/utils/profilerMetrics';

function Table() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const { countryCO2Data, loading } = useLoading();

  return (
    <div className="table__grid">
      <Profiler id="country" onRender={onRender}>
        <Suspense fallback={<p>Loading: {loading}%</p>}>
          <TableCountry
            {...{ countryCO2Data, selectedCountry, setSelectedCountry }}
          />
        </Suspense>
      </Profiler>

      <Profiler id="data" onRender={onRender}>
        {countryCO2Data && selectedCountry ? (
          <TableData {...{ countryCO2Data, selectedCountry }} />
        ) : (
          <p>select a country to display its co2 data</p>
        )}
      </Profiler>
    </div>
  );
}

export default Table;
