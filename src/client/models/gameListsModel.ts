export interface GamesDataModel {
  data: [
    {
      id: string;
      title: string;
      lastUpdated?: string | null;
      games: {
        id: number;
        title: string;
        releaseDate?: Date;
        image: string;
        launchUrl?: string;
        launch_base_url?: string;
        in_maintenance?: boolean;
      }[];
    }
  ];
}

export interface SingleGameModel {
  id: number;
  title: string;
  releaseDate?: Date;
  image: string;
  launchUrl?: string;
  launch_base_url?: string;
  in_maintenance?: boolean;
}
