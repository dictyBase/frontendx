import { useState, useEffect } from "react"
import { makeStyles, Container } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  Option,
  some,
  none,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
  match as Omatch,
} from "fp-ts/Option"
import { formatDistance } from "date-fns"
import {
  ActionBar,
  PendingChanges,
  WaitingChanges,
  ProgressSaved,
  ExitEditingButton,
} from "@dictybase/ui-common"
import { match, P } from "ts-pattern"
import { Editor } from "@dictybase/editor"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { UpdateButton } from "../../common/components/UpdateButton"
import { timeSince } from "../../common/utils/timeSince"
import { truncateEmail } from "../../common/utils/truncateEmail"
import { useAutoSave } from "../../common/hooks/useAutoSave"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

type EditActionBarProperties = {
  contentId: string
  contentSlug: string
  editedBy: string
  updatedAt: string
}

const EditActionBar = ({
  contentId,
  contentSlug,
  editedBy,
  updatedAt,
}: EditActionBarProperties) => {
  const autosaveStates = useAutoSave({
    contentId,
  })

  return (
    <ActionBar
      descriptionElement={
        <>
          <strong>
            <PersonIcon /> {editedBy}
          </strong>{" "}
          updated {formatDistance(new Date(updatedAt), new Date())} ago
        </>
      }>
      {match(autosaveStates)
        .with(
          {
            data: { updateContent: { content: P.string } },
          },
          () => <ProgressSaved />,
        )
        .with({ waiting: true }, () => <WaitingChanges />)
        .with({ loading: true }, () => <PendingChanges />)
        .with({ error: P.not(undefined) }, () => <>error</>)
        .otherwise(() => (
          <></>
        ))}
      <UpdateButton contentId={contentId} canSave={false} />
      <ExitEditingButton />
    </ActionBar>
  )
}

type EditViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditView = ({ data }: EditViewProperties) => {
  const classes = useStyles()
  const { id, updated_at, updated_by, content, slug } = data
  const editedBy = truncateEmail(updated_by.email)
  return (
    <Container className={classes.container}>
      <Editor
        content={{ storageKey: undefined, editorState: content }}
        editable
        toolbar={
          <EditActionBar
            contentId={id}
            contentSlug={slug}
            updatedAt={updated_at}
            editedBy={editedBy}
          />
        }
      />
    </Container>
  )
}

export { EditView }
