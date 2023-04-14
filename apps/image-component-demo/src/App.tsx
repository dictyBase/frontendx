import { useState } from "react"
import {
  TextField,
  Container,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Toolbar,
} from "@material-ui/core"
import { Image } from "@dictybase/dicty-image"
import AvifImage from "./assets/unsplash.avif"
import WebPImage from "./assets/unsplash.webp"
import RegularImage from "./assets/unsplash.jpg"

const DEFAULT_IMAGE = 674
const HEIGHT = "100%"
const WIDTH = "100%"
const DURATION = 3000
const EASING = "cubic-bezier(0.7, 0, 0.6, 1)"
const FIT = "fill"

const Demo = () => {
  const [, setCurrentPhoto] = useState(DEFAULT_IMAGE)
  const [showPhoto, setShowPhoto] = useState(true)
  const [height, setHeight] = useState(HEIGHT)
  const [width, setWidth] = useState(WIDTH)
  const [duration, setDuration] = useState(DURATION)
  const [easing, setEasing] = useState(EASING)
  const [fit, setFit] = useState(FIT)
  const [mobileOpen, setMobileOpen] = useState(false)

  const getNewPhoto = () => {
    if (mobileOpen) setMobileOpen(false)
    const newPhoto = Math.floor(Math.random() * 1051)
    setShowPhoto(false)
    setCurrentPhoto(newPhoto)
    setTimeout(() => {
      setShowPhoto(true)
    }, 100)
  }

  const refreshPhoto = () => {
    if (mobileOpen) setMobileOpen(false)
    setShowPhoto(false)
    setTimeout(() => {
      setShowPhoto(true)
    }, 100)
  }

  const resetDefaults = () => {
    setHeight(HEIGHT)
    setWidth(WIDTH)
    setDuration(DURATION)
    setEasing(EASING)
    setFit(FIT)
  }

  return (
    <Container style={{ width: "90vw", height: "80vh" }}>
      <Toolbar style={{ gap: "8px" }}>
        <TextField
          size="small"
          label="height"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
        <TextField
          size="small"
          label="width"
          value={width}
          onChange={(event) => setWidth(event.target.value)}
        />
        <TextField
          size="small"
          label="duration (ms)"
          value={duration}
          onChange={(event) =>
            setDuration(Number.parseInt(event.target.value, 10) || 0)
          }
        />
        <FormControl>
          <InputLabel htmlFor="fit-select">fit</InputLabel>
          <Select
            id="fit-select"
            value={fit}
            onChange={(event) => setFit(event.target.value as string)}>
            <MenuItem value="fill">fill</MenuItem>
            <MenuItem value="contain">contain</MenuItem>
            <MenuItem value="cover">cover</MenuItem>
            <MenuItem value="none">none</MenuItem>
            <MenuItem value="scale-down">scale-down</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="easing-select">easing</InputLabel>
          <Select
            id="easing-select"
            value={easing}
            onChange={(event) => setEasing(event.target.value as string)}>
            <MenuItem value="cubic-bezier(0.7, 0, 0.6, 1)">
              cubic-bezier
            </MenuItem>
            <MenuItem value="ease">ease</MenuItem>
            <MenuItem value="ease-in">ease-in</MenuItem>
            <MenuItem value="ease-out">ease-out</MenuItem>
            <MenuItem value="ease-in-out">ease-in-out</MenuItem>
            <MenuItem value="linear">linear</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={getNewPhoto}> New </Button>
        <Button onClick={refreshPhoto}> Refresh </Button>
        <Button onClick={resetDefaults}> Reset </Button>
      </Toolbar>
      {showPhoto ? (
        <Image
          src={RegularImage}
          webpSrc={WebPImage}
          avifSrc={AvifImage}
          width={width}
          height={height}
          duration={duration}
          easing={easing}
          fit={fit}
        />
      ) : undefined}
    </Container>
  )
}

export default Demo
