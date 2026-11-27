import { useState } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  TaskEither,
  flatMap as TEflatMap,
  of as TEof,
  tapIO,
  match as TEmatch,
} from "fp-ts/TaskEither"
import { of as IOof } from "fp-ts/IO"
import { Option, none, some, match as Omatch } from "fp-ts/Option"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import Grow from "@mui/material/Grow"
import Fade from "@mui/material/Fade"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import CircularProgress from "@mui/material/CircularProgress"
import { UpdateStrainError } from "./useAuthorizedUpdateStrain"
import { StrainEditErrorAlert } from "./StrainEditErrorAlert"
import { formatFormattedString } from "../utils/formatFormattedString"

type DeletableChipProperties = {
  /** Label value represented by the chip */
  label: string
  /** Optional href if the chip should also act as a link */
  href?: string
  /** Handler invoked when deletion is confirmed */
  handleDelete: (value: string) => TaskEither<UpdateStrainError, unknown>
}

/**
 * Chip component with a two-step inline confirmation before deleting an item.
 *
 * @param properties - Chip label, optional href, and delete TaskEither callback.
 * @returns The rendered DeletableChip component.
 */
const DeletableChip = ({
  label,
  href,
  handleDelete,
}: DeletableChipProperties) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Option<UpdateStrainError>>(none)

  const handleDeleteClick = () => {
    setIsConfirming(true)
  }

  const handleConfirm = pipe(
    label,
    TEof,
    tapIO(() => IOof(setIsLoading(true))),
    TEflatMap(handleDelete),
    TEmatch(
      (errorValue) => {
        setError(some(errorValue))
        setIsLoading(false)
        setIsConfirming(false)
      },
      () => {
        setIsConfirming(false)
        setIsLoading(false)
      },
    ),
  )

  const handleCancel = () => {
    setIsConfirming(false)
  }

  const handleCloseSnackbar = () => {
    setError(none)
  }

  const containerMinWidth = pipe(
    isConfirming,
    Bmatch<string | number>(
      () => "auto",
      () => 140,
    ),
  )

  const chipPosition = pipe(
    isConfirming,
    Bmatch(
      () => "relative" as const,
      () => "absolute" as const,
    ),
  )

  const chipPointerEvents = pipe(
    isConfirming,
    Bmatch(
      () => "auto" as const,
      () => "none" as const,
    ),
  )

  const confirmPosition = pipe(
    isConfirming,
    Bmatch(
      () => "absolute" as const,
      () => "relative" as const,
    ),
  )

  const confirmPointerEvents = pipe(
    isConfirming,
    Bmatch(
      () => "none" as const,
      () => "auto" as const,
    ),
  )

  const confirmIcon = pipe(
    isLoading,
    Bmatch(
      () => <CheckIcon sx={{ fontSize: 16 }} />,
      () => (
        <CircularProgress
          size={16}
          sx={{ color: (theme) => theme.palette.error.contrastText }}
        />
      ),
    ),
  )

  const formattedLabel = formatFormattedString(label)
  const chipLabel = pipe(
    Boolean(href),
    Bmatch(
      () => formattedLabel,
      () => (
        <a
          href={href}
          style={{ color: "inherit", textDecoration: "none" }}
          title={`View ${label}`}>
          {formattedLabel}
        </a>
      ),
    ),
  )

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          height: 32,
          minWidth: containerMinWidth,
          transition: "min-width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
        <Fade in={!isConfirming} timeout={200}>
          <Box
            sx={{
              position: chipPosition,
              pointerEvents: chipPointerEvents,
            }}>
            <Grow in timeout={300}>
              <Chip
                label={chipLabel}
                onDelete={handleDeleteClick}
                sx={{ bgcolor: "white" }}
              />
            </Grow>
          </Box>
        </Fade>
        <Fade in={isConfirming} timeout={200}>
          <Box
            sx={{
              position: confirmPosition,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              pointerEvents: confirmPointerEvents,
            }}>
            <Box
              sx={{
                fontSize: "0.8125rem",
                color: "text.secondary",
                whiteSpace: "nowrap",
              }}>
              {`Delete ${label}?`}
            </Box>
            <IconButton
              size="small"
              onClick={handleConfirm}
              sx={{
                width: 28,
                height: 28,
                bgcolor: "error.main",
                color: "white",
                "&:hover": {
                  bgcolor: "error.dark",
                },
              }}
              aria-label="Confirm delete">
              {confirmIcon}
            </IconButton>
            <IconButton
              size="small"
              onClick={handleCancel}
              sx={{
                width: 28,
                height: 28,
                bgcolor: "action.selected",
                color: "text.primary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
              aria-label="Cancel delete">
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Fade>
      </Box>
      {pipe(
        error,
        Omatch(
          () => <></>,
          ({ message }) => (
            <StrainEditErrorAlert
              open
              message={message}
              handleClose={handleCloseSnackbar}
            />
          ),
        ),
      )}
    </>
  )
}

export { DeletableChip, type DeletableChipProperties }
