/**
 * Helper function to handle GO qualifiers formatting
 */
const qualifierFormatter = (string_: string) => {
  // remove pipe after NOT
  const converted = string_.replace("NOT|", "NOT ")

  if (converted.slice(0, 3) === "NOT") {
    return (
      <>
        <strong>NOT </strong>
        <em>{converted.slice(4)}</em>
      </>
    )
  }
  return <em>{converted}</em>
}

export { qualifierFormatter }
