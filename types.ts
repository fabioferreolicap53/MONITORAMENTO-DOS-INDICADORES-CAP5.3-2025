export interface UnitData {
  id: number;
  name: string;
  isPinned: boolean;
  values: (number | null)[]; // Array of 12 numbers representing percentage (0-100) for Jan-Dec, null for NA
}

export interface Month {
  name: string;
  short: string;
}

export enum PerformanceLevel {
  LOW = 'LOW',     // < 50%
  MEDIUM = 'MEDIUM', // 50-80%
  HIGH = 'HIGH',    // > 80%
}

export interface Indicator {
  id: string;
  number: string;
  label: string;
  periodicidade: string;
  meta: string;
  fonte: string;
  criterio: string;
  data: UnitData[];
}