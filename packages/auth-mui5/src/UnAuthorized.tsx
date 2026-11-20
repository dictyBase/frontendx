import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ErrorIcon from "@mui/icons-material/Error"

const textStyle = {
  paddingTop: 2,
  paddingBottom: 2,
}

/**
 * UnAuthorized is the display component when there is an error.
 */
const UnAuthorized = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    textAlign="center">
    <Box
      sx={{
        backgroundColor: "#eff8fb",
        paddingTop: 6,
        paddingBottom: 6,
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 1,
      }}>
      <img
        src="https://storage.dictybase.dev/editor/assets/2024-06-10/bd362d90-6a23-44a3-a5b4-fbaaaa5117bd"
        alt="Sad Dicty -- HTTP Error"
      />
      <Typography sx={textStyle} variant="h1">
        <ErrorIcon /> Unauthorized
      </Typography>
      <Typography variant="body1" sx={textStyle}>
        You are not authorized to access this page
      </Typography>
      <Button
        sx={(theme) => ({
          marginTop: 2,
          "&:hover": {
            color: theme.palette.getContrastText(theme.palette.primary.main),
          },
        })}
        href="/"
        size="medium"
        variant="contained"
        color="primary">
        Back to DSC Homepage
      </Button>
    </Box>
  </Box>
)

export { UnAuthorized }
