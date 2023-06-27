/**
 * Helper function that identifies if an ID is for a strain or plasmid
 */
const strainOrPlasmid = (id: string) =>
  id.slice(0, 3) === "DBS" ? "strains" : "plasmids"

export default strainOrPlasmid
