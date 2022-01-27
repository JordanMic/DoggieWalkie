export interface Voivodeship {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface Town {
  id: number;
  name: string;
  districtName: string;
  voivodeshipName: string;
}
