// @flow

/**
 * Helper function to remove underscores from GO data (qualifiers, extensions)
 */

const removeUnderscores = (str: string) => str.replace(/_/g, " ")

export default removeUnderscores
