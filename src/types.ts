export interface Voter {
  name: string;
  notes: string;
  dateCanvassed: { nanoseconds: number; seconds: number };
  email: string;
}
