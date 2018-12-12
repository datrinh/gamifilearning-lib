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
  customerId: string;
}

export interface Answer {
  featureId: number;
  answers: {
    [key: string]: boolean;
  };
}

/** Single data object */
export interface DataObject {
  id: string;
  text: string;
  position: {
    x: number;
    y: number;
  };
  isLabeled: boolean;
  selectionScore: number;
  // ! Breaking with glyphboards currently irritating naming convention
  /** Numeric Value of a feature */
  featureValues: { [key: string]: number };
  /** Human readable representation of feature */
  featureRepresentations: { [key: string]: string };
}

/** Data set returned from backend */
export interface DataSet {
  dataObjects: DataObject[];
  questions: Question[];
  datasetId: string;
  metricss: {
    [key: string]: number;
  };
}

// This if the case if we send after each answer
/** (Single) labeled answer to be sent to backend */
export interface LabelOutput {
  dataObjectId: string;
  dataSetId: string; // redundant?
  userId: string;
  questionId: string;
  customerId: string;
  /** Options might change in the future */
  answer: 'yes' | 'no' | 'maybe';
  // labelCandidates: LabelCandidate[];
}

// export interface LabelCandidate {
//   customerId: string;
//   answer: string;
//   questionId: string;
// }
