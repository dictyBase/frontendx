
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "BasePublication": [
      "Publication",
      "PublicationWithGene"
    ],
    "Stock": [
      "Plasmid",
      "Strain"
    ]
  }
};
      export default result;
    