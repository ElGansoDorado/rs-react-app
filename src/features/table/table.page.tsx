import { Suspense, useState } from 'react';
import { useLoading } from './use-loading';
import { TableCountry, TableData } from '.';

function Table() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const { countryCO2Data, loading } = useLoading();

  if (!countryCO2Data) {
    return <p>Loading: {loading}%</p>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="table__grid">
        <TableCountry
          {...{ countryCO2Data, selectedCountry, setSelectedCountry }}
        />

        {selectedCountry ? (
          <TableData {...{ countryCO2Data, selectedCountry }} />
        ) : (
          <p>select a country to display its co2 data</p>
        )}
      </div>
    </Suspense>
  );
}

export default Table;
