import classes from './form.module.css';
import { createPortal } from 'react-dom';
import { Form } from '.';
import { useShowForm } from '@/shared/store';
import { useEffect, useRef } from 'react';

function Modal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const portal = document.getElementById('portal');

  const isShow = useShowForm((state) => state.formOne);
  const close = useShowForm((state) => state.closeFormOne);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      close();
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
      className={classes.container}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex-row">
        <h2>Registration form</h2>
        <button onClick={close}>close</button>
      </div>

      <Form />
    </dialog>,
    portal
  );
}

export default Modal;
