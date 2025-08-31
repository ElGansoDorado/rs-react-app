import { useRef } from 'react';
import classes from './modal.module.css';
import { useConfig } from '@/shared/store/use-config';

type Props = {
  onClose: () => void;
};

function Modal({ onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const updateSettings = useConfig((state) => state.setConfig);
  const settings = useConfig((state) => state.config);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div onClick={handleOverlayClick} className={classes.menu}>
      <div ref={modalRef}>
        <label onClick={() => updateSettings('gdp')}>
          <input
            name="gdp"
            value="gdp"
            type="checkbox"
            defaultChecked={settings.includes('gdp')}
          />
          gdp
        </label>
        <label onClick={() => updateSettings('cumulative_luc_co2')}>
          <input
            defaultChecked={settings.includes('cumulative_luc_co2')}
            name="cumulative_luc_co2"
            value="cumulative_luc_co2"
            type="checkbox"
          />
          cumulative luc co2
        </label>
        <label onClick={() => updateSettings('ghg_excluding_lucf_per_capita')}>
          <input
            defaultChecked={settings.includes('ghg_excluding_lucf_per_capita')}
            name="ghg_excluding_lucf_per_capita"
            value="ghg_excluding_lucf_per_capita"
            type="checkbox"
          />
          ghg excluding lucf per capita
        </label>
        <label onClick={() => updateSettings('ghg_per_capita')}>
          <input
            defaultChecked={settings.includes('ghg_per_capita')}
            name="ghg_per_capita"
            value="ghg_per_capita"
            type="checkbox"
          />
          ghg per capita
        </label>
        <label onClick={() => updateSettings('cement_co')}>
          <input
            name="cement_co"
            value="cement_co"
            type="checkbox"
            defaultChecked={settings.includes('cement_co')}
          />
          cement co
        </label>
      </div>
    </div>
  );
}

export default Modal;
