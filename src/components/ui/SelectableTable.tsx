"use client";

import { useState } from "react";

export interface TableRow {
  name: string;
  role: string;
  status: string;
  label: string;
}

interface Props {
  data: TableRow[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export function SelectableTable({ data, onEdit, onDelete }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const allSelected = selected.length === data.length;
  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <div className="overflow-x-auto">
      {selected.length > 0 && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-base-content/60">{selected.length} selected</span>
          <button
            className="btn btn-xs btn-error btn-outline"
            onClick={() => setSelected([])}
          >
            Deselect all
          </button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={allSelected}
                onChange={() => setSelected(allSelected ? [] : data.map((_, i) => i))}
              />
            </th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`hover cursor-pointer ${selected.includes(i) ? "bg-primary/5" : ""}`}
              onClick={() => toggle(i)}
            >
              <td>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={selected.includes(i)}
                  onChange={() => toggle(i)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="font-medium">{row.name}</td>
              <td className="text-base-content/60">{row.role}</td>
              <td>
                <span className={`badge badge-${row.status} badge-sm`}>{row.label}</span>
              </td>
              <td onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-1">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => onEdit?.(i)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => onDelete?.(i)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
