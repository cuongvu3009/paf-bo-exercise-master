export interface SingleGameModel {
  id: number;
  title: string;
  releaseDate?: Date;
  image: string;
  launchUrl?: string;
  launch_base_url?: string;
  in_maintenance?: boolean;
}
