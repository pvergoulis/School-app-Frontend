export interface Student {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  age?: number;
  subjects?: Subject[];
}

export interface Subject {
  subjectName?: string;
  grade?: string;
}