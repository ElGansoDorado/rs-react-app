import { Form, Modal } from '@/features/form';
import Main from '@/features/list/main';
import { useShowForm } from '@/shared/store';
import { Header, Footer } from '@/shared/ui';

function App() {
  const isShowOne = useShowForm((state) => state.formOne);

  return (
    <>
      <Header />

      <Modal isShow={isShowOne}>
        <Form />
      </Modal>

      <Main />

      <Footer />
    </>
  );
}

export default App;
