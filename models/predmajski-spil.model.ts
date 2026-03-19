export interface PredmajskiSpilGroup {
  name: string;
  description: string;
  imageUrl: string;
}

export interface PredmajskiSpilStageStep {
  title: string;
  description: string;
}

export interface PredmajskiSpil {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  eventDate: string;
  eventLocation: string;
  eventTime: string;
  eventDescription: string;
  groups: PredmajskiSpilGroup[];
  steps: PredmajskiSpilStageStep[];
}
