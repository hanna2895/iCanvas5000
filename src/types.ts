export interface Voter {
  addedBy: string;
  name: string;
  notes: string;
  dateCanvassed: { nanoseconds: number; seconds: number };
  email: string;
}
