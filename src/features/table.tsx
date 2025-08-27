import { Suspense, useState } from 'react';
import { useLoading } from './use-loading';

function Table() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');
  const { data, loading } = useLoading();

  if (!data) {
    return <p>Loading: {loading}%</p>;
  }

  const countryNames = Object.keys(data);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countryNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <table>
          <caption>Country list</caption>,
          <thead>
            <tr>
              <th>Year</th>
              <th>Population</th>
              <th>GDP</th>
              <th>CO2</th>
            </tr>
          </thead>
          <tbody>
            {data[selectedCountry]?.data.map((yearData) => (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>{yearData.population?.toLocaleString() || 'N/A'}</td>
                <td>{yearData.gdp?.toLocaleString() || 'N/A'}</td>
                <td>{yearData.co2?.toLocaleString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
}

export default Table;
