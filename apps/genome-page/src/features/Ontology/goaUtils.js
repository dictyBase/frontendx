export const normalizeGoa = goaResp => {
  if (goaResp.numberOfHits == 0) {
    return { data: [] }
  }
  return {
    data: goaResp.results.map(r => {
      return {
        type: r.goAspect,
        id: r.goId,
        attributes: {
          date: r.date,
          evidence_code: r.goEvidence,
          goterm: r.goName,
          qualifier: r.qualifier,
          publication: r.reference,
          with: r.withFrom,
          extensions: r.extensions,
          assigned_by: r.assignedBy,
        },
      }
    }),
  }
}
