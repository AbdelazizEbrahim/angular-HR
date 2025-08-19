export interface Company {
  id: number;
  name: string;
  address: string;
  website: string;
  phone: string;
  foundedYear: number;
  revenue?: number;
  employeeCount: number;
  industry: string;
  description?: string;
}