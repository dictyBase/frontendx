import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { makeStyles } from 'tss-react/mui';
import { blue, grey } from "@mui/material/colors"

type HomeStylesProperties = {
  /** Background color for panel */
  panelBackground?: string
}

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const useStyles = makeStyles()((theme) => ({
  panel: {
    backgroundColor: ({ panelBackground }: HomeStylesProperties) =>
      panelBackground === "blue" ? blue[50] : grey[100],
    border: "1px",
    borderStyle: "solid",
    borderColor: ({ panelBackground }: HomeStylesProperties) =>
      panelBackground === "blue" ? blue[50] : grey[100],
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: "10px",
  },
  sopLink: {
    color: theme.palette.error.dark,
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
  header: {
    paddingBottom: "0px !important",
    "& h1": {
      fontSize: "48px",
      marginTop: "0px",
      marginBottom: "25px",
      borderBottom: "1px solid #eee",
    },
  },
  list: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    listStyle: "none",
  },
  intro: {
    paddingTop: "0px !important",
    paddingBottom: "12px !important",
  },
  column: {
    paddingTop: theme.spacing(1),
  },
  iconButton: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  icon: {
    fontSize: pipe(
      theme.typography.h2.fontSize,
      OfromNullable,
      OgetOrElse(
        () => "24px" as NonNullable<typeof theme.typography.h2.fontSize>,
      ),
    ),
  },
}));

export { useStyles }
