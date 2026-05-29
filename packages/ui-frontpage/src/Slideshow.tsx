import { Carousel } from "react-responsive-carousel"
import { Box } from "@mui/material"
import "react-responsive-carousel/lib/styles/carousel.min.css"

// The carousel images live in the consuming app's public/ directory (rather
// than being imported and hashed) so the first slide has a stable URL that can
// be preloaded from index.html — it is the page's LCP element. The only app
// that renders this component is dicty-frontpage, which hosts these files at
// /carousel/*. Keep these paths in sync with that public directory.
const CAROUSEL_BASE = "/carousel"

// Intrinsic dimensions of each encoded asset. Setting these to the file's
// natural size keeps the width/height attributes matching the real aspect
// ratio (clears the incorrect-aspect-ratio warning) while CSS stretches the
// image to fill the carousel box.
const imageData = [
  {
    src: `${CAROUSEL_BASE}/dicty-life-cycle.jpg`,
    webpSrc: `${CAROUSEL_BASE}/dicty-life-cycle.webp`,
    avifSrc: `${CAROUSEL_BASE}/dicty-life-cycle.avif`,
    width: 600,
    height: 434,
    title: "Dicty Life Cycle",
    description: `Courtesy of M.J. Grimson & R.L. Blanton, Biological Sciences
            Electron Microscopy Laboratory, Texas Tech University`,
  },
  {
    src: `${CAROUSEL_BASE}/dicty-slug.jpg`,
    webpSrc: `${CAROUSEL_BASE}/dicty-slug.webp`,
    avifSrc: `${CAROUSEL_BASE}/dicty-slug.avif`,
    width: 660,
    height: 434,
    title: "D. discoideum slug",
    description:
      "Courtesy Dirk Dormann, MRC London Institute of Medical Sciences",
  },
  {
    src: `${CAROUSEL_BASE}/dicty-tubulin-centrosom.png`,
    webpSrc: `${CAROUSEL_BASE}/dicty-tubulin-centrosom.webp`,
    avifSrc: `${CAROUSEL_BASE}/dicty-tubulin-centrosom.avif`,
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
