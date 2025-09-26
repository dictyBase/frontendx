import { Typography, Button, Paper } from "@mui/material"
import { UserWithRoles } from "@dictybase/auth-mui5"
import { useNavigate } from "react-router-dom"

type InformationProperties = {
  user: UserWithRoles
}

const Information = ({ user }: InformationProperties) => {
  const navigate = useNavigate()
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
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
    </Paper>
  )
}

export { Information }
