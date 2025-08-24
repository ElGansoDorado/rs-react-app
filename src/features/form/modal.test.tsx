import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modal } from '.';

vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode) => (
    <div data-testid="portal-container">{children}</div>
  ),
}));

const mockPortalElement = document.createElement('div');
mockPortalElement.id = 'portal';

describe('Modal Component', () => {
  let dialogSpy: {
    showModal: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
  };
  const mockClose = vi.fn();
  const mockChildren = <div data-testid="modal-content">Modal Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();

    if (!document.getElementById('portal')) {
      document.body.appendChild(mockPortalElement);
    }

    dialogSpy = {
      showModal: vi.fn(),
      close: vi.fn(),
    };

    HTMLDialogElement.prototype.showModal = dialogSpy.showModal;
    HTMLDialogElement.prototype.close = dialogSpy.close;
  });

  afterEach(() => {
    if (document.getElementById('portal')) {
      document.body.removeChild(mockPortalElement);
    }
  });

  it('renders a modal window via portal when isShow=true', () => {
    render(
      <Modal isShow={true} close={mockClose}>
        {mockChildren}
      </Modal>
    );

    expect(screen.getByText('Registration form')).toBeInTheDocument();
  });

  it('returns null if the portal element is not found', () => {
    document.body.removeChild(mockPortalElement);

    const { container } = render(
      <Modal isShow={true} close={mockClose}>
        {mockChildren}
      </Modal>
    );

    expect(container.firstChild).toBeNull();
    document.body.appendChild(mockPortalElement);
  });
});

describe('Modal Component - HTMLDialogElement API', () => {
  const mockClose = vi.fn();
  const mockChildren = <div>Modal Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();

    if (!document.getElementById('portal')) {
      document.body.appendChild(mockPortalElement);
    }
  });

  afterEach(() => {
    if (document.getElementById('portal')) {
      document.body.removeChild(mockPortalElement);
    }
  });

  it('uses showModal() API when opened', () => {
    const showModalMock = vi.fn();
    const closeMock = vi.fn();
    const originalShowModal = HTMLDialogElement.prototype.showModal;
    const originalClose = HTMLDialogElement.prototype.close;

    HTMLDialogElement.prototype.showModal = showModalMock;
    HTMLDialogElement.prototype.close = closeMock;

    const { unmount } = render(
      <Modal isShow={true} close={mockClose}>
        {mockChildren}
      </Modal>
    );

    expect(showModalMock).toHaveBeenCalledTimes(1);

    unmount();
    HTMLDialogElement.prototype.showModal = originalShowModal;
    HTMLDialogElement.prototype.close = originalClose;
  });

  it('uses close() API when closing', () => {
    const showModalMock = vi.fn();
    const closeMock = vi.fn();

    const originalShowModal = HTMLDialogElement.prototype.showModal;
    const originalClose = HTMLDialogElement.prototype.close;

    HTMLDialogElement.prototype.showModal = showModalMock;
    HTMLDialogElement.prototype.close = closeMock;

    const { rerender, unmount } = render(
      <Modal isShow={true} close={mockClose}>
        {mockChildren}
      </Modal>
    );

    rerender(
      <Modal isShow={false} close={mockClose}>
        {mockChildren}
      </Modal>
    );

    expect(closeMock).toHaveBeenCalledTimes(1);

    unmount();
    HTMLDialogElement.prototype.showModal = originalShowModal;
    HTMLDialogElement.prototype.close = originalClose;
  });
});
