import { Typography, Button } from "@material-ui/core"
import { UserWithRoles } from "auth"
import { useNavigate } from "react-router-dom"

type InformationProperties = {
  user: UserWithRoles
}

const Information = ({ user }: InformationProperties) => {
  const navigate = useNavigate()
  return (
    <>
      <Typography variant="h2" gutterBottom>
        {user?.name}
      </Typography>
      <Typography variant="h3" gutterBottom>
        {user?.email}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {user?.phone_number}
      </Typography>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => navigate("/user/edit", { state: user })}>
        Edit
      </Button>
    </>
  )
}

export { Information }
