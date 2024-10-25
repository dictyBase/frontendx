import { useState } from "react"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { MonoidAny } from "fp-ts/boolean"
import {
  TextField,
  Container,
  Paper,
  Grid,
  FormControl,
  makeStyles,
} from "@material-ui/core"
import { yupResolver } from "@hookform/resolvers/yup"
import { object, string } from "yup"
import { useForm, FormProvider } from "react-hook-form"
import { SectionSelect } from "./SectionSelect"

const useStyles = makeStyles({
  root: {
    padding: "0.5rem",
  },
  grid: {
    alignContent: "baseline",
  },
})

const validationSchema = object().shape({
  section: string().required(),
  name: string().required(),
  subname: string(),
})

const CreateContentForm = () => {
  const { root } = useStyles()
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: { section: "", name: "", subname: "" },
  })
  const sectionValue = methods.watch("section")
  const nameValue = methods.watch("name")
  const subnameDisabled = MonoidAny.concat(
    SisEmpty(sectionValue),
    SisEmpty(nameValue),
  )
  return (
    <FormProvider {...methods}>
      <Container>
        <Paper className={root}>
          <Grid container spacing={2}>
            <Grid item>
              <SectionSelect />
            </Grid>
            <Grid item>
              <TextField
                {...methods.register("name")}
                label="Name"
                name="name"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                {...methods.register("subname")}
                label="Subname"
                name="subname"
                variant="outlined"
                disabled={subnameDisabled}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </FormProvider>
  )
}

export { CreateContentForm }
