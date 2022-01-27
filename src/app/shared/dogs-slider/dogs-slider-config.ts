export interface DogsSliderConfig {
  showAll: boolean;
  dogs: Dog[]
}

export interface Dog {
  avatar?: Blob;
  dogName: string;
  dogProfileId: number;
}
