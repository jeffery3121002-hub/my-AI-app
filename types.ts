
export interface PlantInfo {
  id?: string;
  name: string;
  scientificName: string;
  description: string;
  trivia: string;
  careGuide: {
    light: string;
    water: string;
    temperature: string;
  };
  difficulty: number;
  tags: string[];
  imageUrl?: string;
  timestamp?: number;
}

export enum AppRoute {
  HOME = 'home',
  IDENTIFY = 'identify',
  DETAIL = 'detail',
  ENCYCLOPEDIA = 'encyclopedia',
  PROFILE = 'profile',
  HISTORY = 'history'
}
