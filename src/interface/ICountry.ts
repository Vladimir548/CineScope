export type CountryResponse = Country[];

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}
