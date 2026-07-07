import Button from './Button';
import Modal from './Modal';

interface ConfirmDialogProps {
  confirmLabel?: string;
  description: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}

export default function ConfirmDialog({
  confirmLabel = 'Xóa',
  description,
  loading = false,
  onClose,
  onConfirm,
  open,
  title,
}: ConfirmDialogProps) {
  return (
    <Modal onClose={onClose} open={open} title={title}>
      <div className="space-y-5">
        <p className="leading-7 text-text-muted">{description}</p>
        <div className="flex justify-end gap-3">
          <Button disabled={loading} onClick={onClose} type="button" variant="secondary">
            Hủy
          </Button>
          <Button disabled={loading} onClick={onConfirm} type="button" variant="danger">
            {loading ? 'Đang xóa...' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
