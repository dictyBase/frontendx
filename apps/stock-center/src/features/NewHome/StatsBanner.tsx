import { Box, Stack, Typography } from "@mui/material"

type StatItem = {
  value: string
  label: string
}

const STATS: Array<StatItem> = [
  { value: "12,000+", label: "Strains" },
  { value: "3,500+", label: "Plasmids" },
  { value: "500+", label: "Bacterial Strains" },
]

const Stat = ({ value, label }: StatItem) => (
  <Stack alignItems="center" spacing={0.5}>
    <Typography
      variant="h2"
      sx={(theme) => ({
        fontWeight: 800,
        fontSize: { xs: "1.75rem", sm: "2.25rem" },
        lineHeight: 1,
        color: theme.palette.primary.contrastText,
      })}>
      {value}
    </Typography>
    <Typography
      variant="overline"
      sx={{
        fontWeight: 700,
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        lineHeight: 1,
      }}>
      {label}
    </Typography>
  </Stack>
)

const StatsBanner = () => (
  <Box
    sx={(theme) => ({
      backgroundColor: theme.palette.tertiary.light,
      borderTop: `solid 1px ${theme.palette.tertiary.main}`,
      borderBottom: `solid 1px ${theme.palette.tertiary.main}`,
      width: "100%",
      px: { xs: 3, md: 8 },
      py: 2.5,
      mt: 3,
    })}>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      gap={15}>
      {STATS.map(({ value, label }) => (
        <Stat key={label} value={value} label={label} />
      ))}
    </Stack>
  </Box>
)

export { StatsBanner }
