import { Pencil, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  deleteLabel?: string;
  editLabel?: string;
  onDelete: () => void;
  onEdit: () => void;
}

export default function ActionButtons({
  deleteLabel = 'Delete',
  editLabel = 'Edit',
  onDelete,
  onEdit,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="inline-flex h-9 w-9 items-center justify-center rounded border border-surface-line text-text-muted transition hover:border-accent-mint hover:text-accent-mint"
        onClick={onEdit}
        title={editLabel}
        type="button"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        className="inline-flex h-9 w-9 items-center justify-center rounded border border-surface-line text-text-muted transition hover:border-danger-soft hover:text-danger-soft"
        onClick={onDelete}
        title={deleteLabel}
        type="button"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
