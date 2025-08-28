import { Suspense, useState } from 'react';
import { useLoading } from './use-loading';

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

  const countryNames = Object.keys(countryCO2Data);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main className="container">
        <div className="table__grid">
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
                  <tr
                    className={`table__button ${item === selectedCountry ? 'table__active' : ''}`}
                    onClick={() => setSelectedCountry(item)}
                    key={item}
                  >
                    <td>{item}</td>
                    <td>{countryCO2Data[item].iso_code || 'N/A'}</td>
                    <td>
                      {countryCO2Data[item].data[
                        countryCO2Data[item].data.length - 1
                      ].population || 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

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
