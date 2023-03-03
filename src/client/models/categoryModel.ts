export interface ICategory {
  image: string | undefined;
  id: string;
  title: string;
  last_updated: string;
  games: Array<IGame>;
}

export interface IGame {
  id: number;
  title?: string;
  provider?: string;
  release_date?: string | Date;
  image?: string;
  launch_url?: string;
  launch_base_url?: string;
  in_maintenance?: boolean;
}
