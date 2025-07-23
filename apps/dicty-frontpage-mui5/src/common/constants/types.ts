enum ErrorType {
  MISSING_CONTENT_ID,
  ACCESS_TOKEN_ERROR,
  USER_INFO_ERROR,
  CREATE_FAILURE,
  FETCH_FAILURE,
  UPDATE_FAILURE,
  DELETE_FAILURE,
}

type ContentError = {
  errorType: ErrorType
  message: string
}

const missingContentIdError = {
  errorType: ErrorType.MISSING_CONTENT_ID,
  message: "Content ID missing",
}

const userInfoError = {
  errorType: ErrorType.USER_INFO_ERROR,
  message: "Could not get user info",
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const createFailureError = {
  errorType: ErrorType.CREATE_FAILURE,
  message: "Could not create content",
}

const fetchContentError = {
  errorType: ErrorType.FETCH_FAILURE,
  message: "Could not fetch content",
}

const updateFailureError = {
  errorType: ErrorType.UPDATE_FAILURE,
  message: "Could not update content",
}

const deleteFailureError = {
  errorType: ErrorType.DELETE_FAILURE,
  message: "Could not delete content",
}

export {
  type ContentError,
  missingContentIdError,
  userInfoError,
  accessTokenError,
  createFailureError,
  updateFailureError,
  fetchContentError,
  deleteFailureError,
}
