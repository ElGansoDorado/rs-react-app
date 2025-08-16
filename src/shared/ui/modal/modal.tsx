'use client';
import { useBag } from '@/shared/hooks/use-bag';
import classes from './modal.module.css';

type Props = {
  children: React.ReactNode;
};

function Modal({ children }: Props) {
  const length = useBag((state) => state.list.length);
  return (
    <dialog open={length > 0} className={classes.modal}>
      {children}
    </dialog>
  );
}

export default Modal;
