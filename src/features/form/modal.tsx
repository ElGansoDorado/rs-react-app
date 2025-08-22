import classes from './form.module.css';
import { createPortal } from 'react-dom';
import { Form } from '.';

type Props = {
  isShow: boolean;
};

function Modal({ isShow }: Props) {
  const portal = document.getElementById('portal');

  if (!portal) {
    return null;
  }

  return createPortal(
    <dialog open={isShow} className={classes.container}>
      <h2>Registration form</h2>

      <Form />
    </dialog>,
    portal
  );
}

export default Modal;
