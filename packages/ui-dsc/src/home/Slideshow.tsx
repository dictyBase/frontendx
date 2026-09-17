import { Carousel } from "react-responsive-carousel"
import { makeStyles } from "tss-react/mui"
import { Image } from "@dictybase/dicty-image-mui5"

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

const slideshowImages = [
  {
    src: ctr9 as string,
    avif: ctr9_avif as string,
    webp: ctr9_webp as string,
    alt: "ctr9-mutant-DG1071",
  },
  {
    src: gbqA as string,
    avif: gbqA_avif as string,
    webp: gbqA_webp as string,
    alt: "gbqA-mutant-DG1120",
  },
  {
    src: ggtA as string,
    avif: ggtA_avif as string,
    webp: ggtA_webp as string,
    alt: "ggtA-mutant-DG1109",
  },
  {
    src: tipB as string,
    avif: tipB_avif as string,
    webp: tipB_webp as string,
    alt: "tipB-mutant-DG1036",
  },
]

const useStyles = makeStyles()({
  container: {
    marginBottom: "24px",
    borderRadius: "8px",
    overflow: "hidden",
  },
})

const genSlide = (source: string, avif: string, webp: string, alt: string) => (
  <Image src={source} alt={alt} webpSrc={webp} avifSrc={avif} />
)

/**
 * Slideshow is an image slideshow carousel with curated dicty photos.
 */

const Slideshow = () => {
  const { classes } = useStyles()

  return (
    <Carousel
      className={classes.container}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop>
      {slideshowImages.map(({ src, avif, webp, alt }) => (
        <div key={alt}>{genSlide(src, avif, webp, alt)}</div>
      ))}
    </Carousel>
  )
}

export { Slideshow, slideshowImages }
