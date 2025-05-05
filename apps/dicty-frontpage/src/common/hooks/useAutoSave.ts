import { useState, useEffect, useRef } from "react"
import { EditorState } from "lexical"
import { ApolloError } from "@apollo/client"
import { pipe } from "fp-ts/function"
import { Option, none, some, map as Omap } from "fp-ts/Option"
import { UpdateContentMutation } from "dicty-graphql-schema"
import { useAuthorizedUpdateContentWithStates } from "./useAuthorizedUpdateContentWithStates"

/**
 * Properties for the useAutoSave hook
 * @property contentId - The ID of the content being edited
 */
type useAutoSaveProperties = {
  contentId: string
}

/**
 * Hook that provides automatic saving functionality for the Lexical editor
 *
 * This hook registers a listener for editor changes and automatically saves content
 * after a brief delay (debounce). It handles saving content after edits, cleaning up
 * pending save operations, and provides state indicators for UI feedback.
 *
 * @param contentId - The ID of the content being edited
 * @returns Object containing state information about the save operation
 */
const useAutoSave = ({
  contentId,
}: useAutoSaveProperties): [
  (editorState: EditorState) => void,
  {
    waiting: boolean
    loading: boolean
    error: ApolloError | undefined
    data: UpdateContentMutation | null | undefined
  },
] => {
  // State to indicate content has changed and is waiting to be saved
  const [waiting, setWaiting] = useState(false)

  // Get the authorized update function and its associated state
  const [authorizedUpdateContent, { loading, error, data, reset }] =
    useAuthorizedUpdateContentWithStates(contentId)

  // Reference to the debounce timeout - wrapped in Option for fp-ts safety
  const timeoutIdReference = useRef<Option<NodeJS.Timeout>>(none)

  const handleChange = (editorState: EditorState) => {
    // Convert editor states to JSON strings for comparison
    const editorContent = JSON.stringify(editorState.toJSON())

    // Set waiting state to true to show pending changes in UI
    setWaiting(true)

    // Clear any existing timeout to implement debouncing
    // This prevents rapid-fire saves when typing quickly
    pipe(timeoutIdReference.current, Omap(clearTimeout))

    // Reset any previous mutation state
    reset()

    // Set a new timeout to save after 1 second of inactivity
    const timeoutId = setTimeout(async () => {
      // Update UI state before saving
      setWaiting(false)

      // Save the content using the authorized update function
      await authorizedUpdateContent(editorContent)
    }, 1000)

    // Store the timeout ID for potential cancellation
    timeoutIdReference.current = some(timeoutId)
  }

  // Additional cleanup effect to clear any pending timeouts on unmount
  useEffect(
    () => () => {
      pipe(timeoutIdReference.current, Omap(clearTimeout))
    },
    [],
  )

  // Return states that can be used for UI feedback
  return [
    handleChange,
    {
      waiting, // Content has changed and is waiting to be saved
      loading, // Save operation is in progress
      error, // Error occurred during save
      data, // Result data from successful save
    },
  ]
}

export { useAutoSave }
