
export interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  phone: string;
  website: string;
  courses: string[];
  createdAt: number;
}

export interface AppStats {
  total: number;
  checked: number;
  percent: number;
}
