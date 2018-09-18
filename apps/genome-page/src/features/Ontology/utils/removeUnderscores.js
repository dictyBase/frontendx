// @flow

/**
 * Helper function to remove underscores from GO qualifiers
 */

const removeUnderscores = (str: string) => str.replace(/_/g, " ")

export default removeUnderscores
