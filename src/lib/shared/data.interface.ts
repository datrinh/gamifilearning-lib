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
  timestamp: string;
  featureId: string; // is 1 to 1 with questionId?
  userId: string;
  customerId: string;
  questionId: string;
  answer: string;
}

/** Single data object */
export interface DataObject {
  objectId: string;
  // TODO: Glyphboard handles this in separate positions file
  position: {
    x: number;
    y: number;
  };
  selectionScore: number;
  // ! Breaking with glyphboards currently irritating naming convention
  /** Numeric Value of a feature */
  featureValues: { [key: string]: number };
  /** Human readable representation of feature */
  featureRepresentations: { [key: string]: string };
}

export interface ObjectToLabel {
  versionId: string;
  questionIds: string[];
  toBeLabeledFeatures: string[];
  isLabeledBy: string[];
  shownFeatures: string[];
  dataObject: DataObject;
}

export interface FeaturesQuestionMapping {
  questionId: string;
  possibleAnswers: string[];
}

export interface LabeledData {
  objectId: number;
  labellingFinished: boolean;
  answers: Answer[];
}

/** Data set returned from backend */
export interface DataSet {
  dataObjects: DataObject[];
  datasetId: string;
  metrics: [
    {
      versionId: string;
      metrics: {
        [key: string]: number;
      };
    }
  ];
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
}
