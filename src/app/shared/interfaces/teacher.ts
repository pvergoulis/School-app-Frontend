export interface Teacher {
    firstname: string;
  lastname: string;
  vat: string;
  city: string;
  age: number;
  cv: string;
  phone?: number;
  email?: string;
  subjects?: Subject[];
}

export interface Subject {
  subjectName: string;
}
