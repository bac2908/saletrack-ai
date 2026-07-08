import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  rowKey: (row: T) => string;
}

export default function DataTable<T,>({ columns, data, emptyMessage = 'Chưa có dữ liệu', rowKey }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-surface-line bg-surface-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-surface-line">
          <thead className="bg-surface-card-high">
            <tr>
              {columns.map((column) => (
                <th
                  className="px-4 py-3 text-left text-xs font-semibold uppercase text-text-muted"
                  key={column.key}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-line">
            {data.length > 0 ? (
              data.map((row) => (
                <tr className="hover:bg-surface-card-high" key={rowKey(row)}>
                  {columns.map((column) => (
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-text-strong" key={column.key}>
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-sm text-text-muted" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
