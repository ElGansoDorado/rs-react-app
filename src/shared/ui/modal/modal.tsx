import classes from './modal.module.css';

type Props = {
  show: boolean;
  children: React.ReactNode;
};

function Modal({ show, children }: Props) {
  return (
    <dialog open={show} className={classes.modal}>
      {children}
    </dialog>
  );
}

export default Modal;
