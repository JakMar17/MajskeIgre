export interface InfoPointStep {
  title: string;
  description: string;
  type: "number" | "item";
}

export interface InfoPointSportInfo {
  description: string;
  steps: InfoPointStep[];
  notes: string;
}

export interface InfoPointCultureInfo {
  description: string;
  steps: InfoPointStep[];
  notes: string;
}

export interface InfoPointConcertInfoItem {
  title: string;
  description: string;
}

export interface InfoPointConcertInfo {
  description: string;
  info: InfoPointConcertInfoItem[];
  notes?: string;
}

export interface InfoPoint {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  sportImage: string;
  cultureImage: string;
  concertImage: string;
  sportInfo: InfoPointSportInfo;
  cultureInfo: InfoPointCultureInfo;
  concertInfo: InfoPointConcertInfo;
}
