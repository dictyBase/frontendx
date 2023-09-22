import { useLogto } from "@logto/react"
import { headerStyles } from "@dictybase/header"
import { IconButton, SvgIcon, Typography } from "@material-ui/core"

type LogoutButtonProperties = { url: string }

const LogoutButton = ({ url }: LogoutButtonProperties) => {
  const { signOut } = useLogto()
  return (
    <>
      <Typography variant="subtitle2">Logout</Typography>
      <IconButton
        className={headerStyles().linksButton}
        onClick={() => signOut(url)}>
        <SvgIcon className={headerStyles().linksIcon}>
          <path d="M22 12L18 8V11H10V13H18V16M20 18A10 10 0 1 1 20 6H17.27A8 8 0 1 0 17.27 18Z" />
        </SvgIcon>
      </IconButton>
    </>
  )
}

export { LogoutButton }
