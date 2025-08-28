import classes from './modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

type Props = {
  isShow: boolean;
  setShow: (b: boolean) => void;
};

function Modal({ isShow, setShow }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const portal = document.getElementById('portal');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShow(false);
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      setShow(false);
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isShow) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isShow]);

  if (!portal) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      className={classes.modal}
    >
      <form className={classes.menu}>
        <div>
          <label>
            <input name="gdp" value="gdp" type="checkbox" />
            gdp
          </label>
          <label>
            <input
              name="cumulative_luc_co2"
              value="cumulative_luc_co2"
              type="checkbox"
            />
            cumulative luc co2
          </label>
          <label>
            <input
              name="ghg_excluding_lucf_per_capita"
              value="ghg_excluding_lucf_per_capita"
              type="checkbox"
            />
            ghg excluding lucf per capita
          </label>
          <label>
            <input
              name="ghg_per_capita"
              value="ghg_per_capita"
              type="checkbox"
            />
            ghg per capita
          </label>
          <label>
            <input name="cement_co" value="cement_co" type="checkbox" />
            cement co
          </label>
        </div>

        <button type="button">save</button>
      </form>
    </dialog>,
    portal
  );
}

export default Modal;
