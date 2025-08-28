import { Suspense, useState } from 'react';
import { useLoading } from './use-loading';
import { TableCountry, TableData } from '.';

function Table() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');
  const { countryCO2Data, loading } = useLoading();

  if (!countryCO2Data) {
    return (
      <main className="container">
        <p>Loading: {loading}%</p>
      </main>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main className="container">
        <div className="table__grid">
          <TableCountry
            {...{ countryCO2Data, selectedCountry, setSelectedCountry }}
          />

          <TableData {...{ countryCO2Data, selectedCountry }} />
        </div>
      </main>
    </Suspense>
  );
}

export default Table;
