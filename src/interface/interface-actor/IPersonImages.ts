export interface IPersonImages {
  id: number;
  profiles: Profile[];
}

export interface Profile {
  aspect_ratio: number;
  height: number;
  iso_639_1: any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
