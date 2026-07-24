import { FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"
import Fade from "@mui/material/Fade"

const ReadonlyContentList: FunctionComponent<{
  contentList: Array<string>
}> = ({ contentList }) => (
  <>
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      spacing={1}
      rowGap={1}>
      {pipe(
        contentList,
        Amap((s) => (
          <Fade key={s} in timeout={300}>
            <Chip label={s} />
          </Fade>
        )),
      )}
    </Stack>
  </>
)

export { ReadonlyContentList }
