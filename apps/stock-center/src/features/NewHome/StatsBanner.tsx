import { useEffect, useState } from "react"
import { pipe } from "fp-ts/function"
import {
  tryCatch as TEtryCatch,
  filterOrElse as TEfilterOrElse,
  flatMap as TEflatMap,
} from "fp-ts/TaskEither"
import type { TaskEither } from "fp-ts/TaskEither"
import { match as Ematch } from "fp-ts/Either"
import { match, P } from "ts-pattern"
import { Box, Skeleton, Stack, Typography } from "@mui/material"

type ApiCounts = {
  strains: { total: string }
  plasmids: { total: string }
}

type StatItem = {
  value: string
  label: string
}

type State =
  | { _tag: "loading" }
  | { _tag: "error" }
  | { _tag: "data"; counts: ApiCounts }

const FALLBACK_STATS: Array<StatItem> = [
  { value: "28,576", label: "Strains" },
  { value: "1,265", label: "Plasmids" },
  { value: "24/7", label: "Online Ordering" },
]

const API_URL = import.meta.env.VITE_STOCKS_COUNTS_URL

const formatNumber = (n: string) => Number.parseInt(n, 10).toLocaleString()

const buildStats = (counts: ApiCounts): Array<StatItem> => [
  { value: formatNumber(counts.strains.total), label: "Strains" },
  { value: formatNumber(counts.plasmids.total), label: "Plasmids" },
  { value: "24/7", label: "Online Ordering" },
]

const parseJson = (response: Response): Promise<ApiCounts> => response.json()

const getCountFetcher = (): TaskEither<Error, ApiCounts> =>
  pipe(
    TEtryCatch(
      () => fetch(API_URL),
      () => new Error("Network error"),
    ),
    TEfilterOrElse(
      (response) => response.ok,
      (response) => new Error(`HTTP ${response.status}`),
    ),
    TEflatMap((response) =>
      TEtryCatch(
        () => parseJson(response),
        () => new Error("Failed to parse JSON"),
      ),
    ),
  )

const StatSkeleton = () => (
  <Stack alignItems="center" spacing={0.5}>
    <Skeleton variant="text" width={80} height={48} />
    <Skeleton variant="text" width={60} height={20} />
  </Stack>
)

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

const StatsBanner = () => {
  const [state, setState] = useState<State>({ _tag: "loading" })

  useEffect(() => {
    const run = async () => {
      const countFetcher = getCountFetcher()
      const results = await countFetcher()
      pipe(
        results,
        Ematch<Error, ApiCounts, void>(
          () => setState({ _tag: "error" }),
          (counts) => setState({ _tag: "data", counts }),
        ),
      )
    }
    run()
  }, [])

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.light,
        borderTop: `solid 1px ${theme.palette.secondary.main}`,
        borderBottom: `solid 1px ${theme.palette.secondary.main}`,
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
        {match(state)
          .with({ _tag: "loading" }, () =>
            [0, 1, 2].map((index) => <StatSkeleton key={index} />),
          )
          .with({ _tag: "error" }, () =>
            FALLBACK_STATS.map(({ value, label }) => (
              <Stat key={label} value={value} label={label} />
            )),
          )
          .with({ _tag: "data", counts: P.select() }, (counts) =>
            buildStats(counts).map(({ value, label }) => (
              <Stat key={label} value={value} label={label} />
            )),
          )
          .exhaustive()}
      </Stack>
    </Box>
  )
}

export { StatsBanner }
