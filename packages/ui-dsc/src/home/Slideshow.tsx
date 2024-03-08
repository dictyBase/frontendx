import { Carousel } from "react-responsive-carousel"
import { makeStyles } from "@material-ui/core/styles"
import { Image } from "@dictybase/dicty-image"

import ctr9 from "../assets/slideshow-images/ctr9-mutant-DG1071.png"
import gbqA from "../assets/slideshow-images/gbqA-mutant-DG1120.png"
import ggtA from "../assets/slideshow-images/ggtA-mutant-DG1109.png"
import tipB from "../assets/slideshow-images/tipB-mutant-DG1036.png"

import ctr9_avif from "../assets/slideshow-images/ctr9-mutant-DG1071.avif"
import gbqA_avif from "../assets/slideshow-images/gbqA-mutant-DG1120.avif"
import ggtA_avif from "../assets/slideshow-images/ggtA-mutant-DG1109.avif"
import tipB_avif from "../assets/slideshow-images/tipB-mutant-DG1036.avif"

import ctr9_webp from "../assets/slideshow-images/ctr9-mutant-DG1071.webp"
import gbqA_webp from "../assets/slideshow-images/gbqA-mutant-DG1120.webp"
import ggtA_webp from "../assets/slideshow-images/ggtA-mutant-DG1109.webp"
import tipB_webp from "../assets/slideshow-images/tipB-mutant-DG1036.webp"

import "react-responsive-carousel/lib/styles/carousel.min.css"

const useStyles = makeStyles({
  container: {
    marginBottom: "24px",
  },
})

const genSlide = (source: string, avif: string, webp: string, alt: string) => (
  <Image src={source} alt={alt} webpSrc={webp} avifSrc={avif} />
)

/**
 * Slideshow is an image slideshow carousel with curated dicty photos.
 */

const Slideshow = () => {
  const classes = useStyles()

  return (
    <Carousel
      className={classes.container}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop>
      <div>{genSlide(ctr9, ctr9_avif, ctr9_webp, "ctr9-mutant-DG1071")}</div>
      <div>{genSlide(gbqA, gbqA_avif, gbqA_webp, "gbqA-mutant-DG1120")}</div>
      <div>{genSlide(ggtA, ggtA_avif, ggtA_webp, "ggtA-mutant-DG1109")}</div>
      <div>{genSlide(tipB, tipB_avif, tipB_webp, "tipB-mutant-DG1036")}</div>
    </Carousel>
  )
}

export { Slideshow }
