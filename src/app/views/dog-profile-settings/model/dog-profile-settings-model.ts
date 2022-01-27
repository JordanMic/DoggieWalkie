export interface DogProfileSettingsModel{
  avatar: Blob;
  baseUser_id: number;
  breedOfDog: string;
  castration: boolean;
  chipped: boolean;
  dateOfBirth: string;
  description: string;
  disposition: string;
  dogName: string;
  gender: GenderEnum;
  id: number;
  size: string;
  town_id: number;
  vitality: string;
}

export enum GenderEnum {
  Male = 'Piesek',
  Female = 'Suczka'
}

// @ts-ignore
export let GenderDictionary = new Map<GenderEnum, string>([
  [GenderEnum.Female, 'Suczka'],
  [GenderEnum.Male, 'Piesek'],
]);

// @ts-ignore
export let CastrationDictionary = new Map<boolean, string>([
  [true, 'Tak'],
  [false, 'Nie'],
]);
