// client/src/types/cell.d.ts
export interface Cell {
  value: number | null;
  calculate: boolean;
  id: string;
  row: number;
  column: number;
  block: number;
  matrix: string;
  unchangebale: boolean;
  hinted: boolean;
}
