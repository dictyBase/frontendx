import { useLogto } from "@logto/react"
import { headerStyles } from "@dictybase/header"
import { IconButton } from "@material-ui/core"
import { ExitToApp as Login } from "@material-ui/icons"

type LoginButtonProperties = { url: string }

const LoginButton = ({ url }: LoginButtonProperties) => {
  const { signIn } = useLogto()
  return (
    <IconButton
      className={headerStyles().linksButton}
      onClick={() => signIn(url)}>
      <Login className={headerStyles().linksIcon} />
    </IconButton>
  )
}

export { LoginButton }
