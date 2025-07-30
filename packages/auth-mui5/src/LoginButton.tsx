import { useLogto } from "@logto/react"
import { IconButton, SvgIcon, Typography } from "@mui/material"
import makeStyles from '@mui/styles/makeStyles';

const useLinksStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    color: "hsl(210, 100%, 25%)",
  },
  icon: { fontSize: "2.2rem" },
})

type LoginButtonProperties = { url: string }

/**
 * Renders a login button component.
 */
const LoginButton = ({ url }: LoginButtonProperties) => {
  const { signIn } = useLogto()
  const classes = useLinksStyles()
  return (
    (<IconButton className={classes.button} onClick={() => signIn(url)} size="large">
      <Typography variant="subtitle2">Login</Typography>
      <SvgIcon className={classes.icon}>
        <path d="M14 12L10 8V11H2V13H10V16M22 12A10 10 0 0 1 2.46 15H4.59A8 8 0 1 0 4.59 9H2.46A10 10 0 0 1 22 12Z" />
      </SvgIcon>
    </IconButton>)
  );
}

export { LoginButton }
