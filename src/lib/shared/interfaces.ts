export interface JsonFeature {
  id: number;
  'default-context': string;
  features: Features;
  values: { [key: string]: string };
}

export interface Features {
  '1': { [key: string]: number };
}

export interface Question {
  id: string;
  label: string;
}

export interface Answer {
  id: number;
  answers: {
    [key: string]: boolean;
  };
}
