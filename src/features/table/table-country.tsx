import type { CountriesData } from '@/shared/model/country';

type Props = {
  countryCO2Data: CountriesData;
  selectedCountry: string;
  setSelectedCountry: (str: string) => void;
};

function TableCountry({
  countryCO2Data,
  selectedCountry,
  setSelectedCountry,
}: Props) {
  const countryNames = Object.keys(countryCO2Data);

  return (
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
                {countryCO2Data[item].data[countryCO2Data[item].data.length - 1]
                  .population || 'N/A'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableCountry;
