import { memo, useCallback } from 'react';

type Props = {
  name: string;
  iso: string;
  population: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
};

const TableRow = memo(
  ({ name, iso, population, isSelected, onSelect }: Props) => {
    const handleClick = useCallback(() => onSelect(name), [onSelect, name]);

    return (
      <tr
        className={`table__button ${isSelected ? 'table__active' : ''}`}
        onClick={handleClick}
      >
        <td>{name}</td>
        <td>{iso}</td>
        <td>{population}</td>
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

export default TableRow;
