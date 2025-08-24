import { Form, FormRef, Modal } from '@/features/form';
import Main from '@/features/list/main';
import { useShowForm } from '@/shared/store';
import { Header, Footer } from '@/shared/ui';

function App() {
  const isShowOne = useShowForm((state) => state.formOne);
  const closeOne = useShowForm((state) => state.closeFormOne);

  const isShowTwo = useShowForm((state) => state.formTwo);
  const closeTwo = useShowForm((state) => state.closeFormTwo);

  return (
    <>
      <Header />

      <Modal isShow={isShowOne} close={closeOne}>
        <Form />
      </Modal>

      <Modal isShow={isShowTwo} close={closeTwo}>
        <FormRef />
      </Modal>

      <Main />

      <Footer />
    </>
  );
}

export default App;
