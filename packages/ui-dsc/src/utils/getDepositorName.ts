type Depositor = {
  /** First name of depositor */
  firstName?: string
  /** Last name of depositor */
  lastName?: string
}

/**
 * getDepositorName returns a string based on depositor data.
 */
const getDepositorName = (depositor: Depositor) => {
  const { firstName, lastName } = depositor

  return firstName && lastName ? `${firstName} ${lastName}` : ""
}

export { getDepositorName }
