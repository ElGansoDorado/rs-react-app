import { Suspense, useState } from 'react';
import { useLoading } from './use-loading';

function Table() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');
  const { data, loading } = useLoading();

  if (!data) {
    return (
      <main className="container">
        <p>Loading: {loading}%</p>
      </main>
    );
  }

  const countryNames = Object.keys(data);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main className="container">
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

        <div className="table__container">
          <table className="table">
            <caption className="table__title">Country list</caption>,
            <thead className="table__head">
              <tr>
                <th>Name</th>
                <th>ico</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {countryNames.map((item) => {
                return (
                  <tr key={item}>
                    <td onClick={() => setSelectedCountry(item)}>{item}</td>
                    <td>{data[item].iso_code || 'N/A'}</td>
                    <td>
                      {data[item].data[data[item].data.length - 1].population ||
                        'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <table className="table">
            <caption className="table__title">{selectedCountry}</caption>,
            <thead className="table__head">
              <tr>
                <th>Year</th>
                <th>Population</th>
                <th>CO2</th>
                <th>co2 per capita</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {data[selectedCountry]?.data.map((_, index, array) => {
                const yearData = array[array.length - 1 - index];
                return (
                  <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{yearData.population?.toLocaleString() || 'N/A'}</td>
                    <td>{yearData.co2?.toLocaleString() || 'N/A'}</td>
                    <td>
                      {yearData.cement_co2_per_capita?.toLocaleString() ||
                        'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </Suspense>
  );
}

export default Table;
