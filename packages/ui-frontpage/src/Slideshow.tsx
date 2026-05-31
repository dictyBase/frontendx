import { Carousel } from "react-responsive-carousel"
import { Box } from "@mui/material"
import lifeCycle from "./assets/carousel/dicty-life-cycle.jpg"
import lifeCycleWebp from "./assets/carousel/dicty-life-cycle.webp"
import lifeCycleAvif from "./assets/carousel/dicty-life-cycle.avif"
import slug from "./assets/carousel/dicty-slug.jpg"
import slugWebp from "./assets/carousel/dicty-slug.webp"
import slugAvif from "./assets/carousel/dicty-slug.avif"
import tubulin from "./assets/carousel/dicty-tubulin-centrosom.png"
import tubulinWebp from "./assets/carousel/dicty-tubulin-centrosom.webp"
import tubulinAvif from "./assets/carousel/dicty-tubulin-centrosom.avif"
import "react-responsive-carousel/lib/styles/carousel.min.css"

// Intrinsic dimensions of each encoded asset. Setting these to the file's
// natural size keeps the width/height attributes matching the real aspect
// ratio (clears the incorrect-aspect-ratio warning) while CSS stretches the
// image to fill the carousel box.
const imageData = [
  {
    src: lifeCycle,
    webpSrc: lifeCycleWebp,
    avifSrc: lifeCycleAvif,
    width: 600,
    height: 434,
    title: "Dicty Life Cycle",
    description: `Courtesy of M.J. Grimson & R.L. Blanton, Biological Sciences
            Electron Microscopy Laboratory, Texas Tech University`,
  },
  {
    src: slug,
    webpSrc: slugWebp,
    avifSrc: slugAvif,
    width: 660,
    height: 434,
    title: "D. discoideum slug",
    description:
      "Courtesy Dirk Dormann, MRC London Institute of Medical Sciences",
  },
  {
    src: tubulin,
    webpSrc: tubulinWebp,
    avifSrc: tubulinAvif,
    width: 568,
    height: 434,
    title:
      "Triple stained and fixed Dictyostelium cells: alpha-tubulin (green), centrosome (red, appears yellow due to colocalization with tubulin), nuclei (blue)",
    description: "Courtesy of Ralph Gräf, Potsdam University",
  },
]

/**
 * Image slideshow carousel with curated dicty photos.
 *
 * The first slide is the page's LCP element, so it is loaded eagerly with a
 * high fetch priority while the remaining slides are lazy-loaded. Each image
 * is served as AVIF/WebP with a JPEG/PNG fallback to cut transfer size.
 */

const Slideshow = () => (
  <Box>
    <Carousel
      showStatus={false}
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop>
      {imageData.map((img, index) => (
        <Box
          key={img.src}
          sx={{
            height: "440px",
            "@media (max-width: 768px)": {
              height: "250px",
            },
          }}>
          <picture>
            <source srcSet={img.avifSrc} type="image/avif" />
            <source srcSet={img.webpSrc} type="image/webp" />
            <img
              src={img.src}
              alt={img.title}
              width={img.width}
              height={img.height}
              loading={index === 0 ? "eager" : "lazy"}
              // fetchpriority is a valid HTML attribute not yet in React's types
              {...{ fetchpriority: index === 0 ? "high" : "low" }}
              style={{
                height: "100%",
                width: "100%",
                maxHeight: "100%",
              }}
            />
          </picture>
          <p
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              marginLeft: "-45%",
              width: "90%",
              borderRadius: "10px",
              background: "rgba(51, 51, 51, 0.8)",
              color: "#fff",
              padding: "10px",
              fontSize: "12px",
              textAlign: "left",
            }}
            className="carousel-legend">
            <strong>{img.title}</strong> <br />
            {img.description}
          </p>
        </Box>
      ))}
    </Carousel>
    <style>{`
      @media (max-width: 768px) {
        .carousel-legend {
          display: none;
        }
      }
    `}</style>
  </Box>
)

export { Slideshow }
