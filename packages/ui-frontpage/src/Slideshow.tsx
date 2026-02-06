import { Carousel } from "react-responsive-carousel"
import { Box } from "@mui/material"
import lifeCycle from "./assets/carousel/dicty-life-cycle.jpg"
import slug from "./assets/carousel/dicty-slug.jpg"
import tubulin from "./assets/carousel/dicty-tubulin-centrosom.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const imageData = [
  {
    src: lifeCycle,
    title: "Dicty Life Cycle",
    description: `Courtesy of M.J. Grimson & R.L. Blanton, Biological Sciences
            Electron Microscopy Laboratory, Texas Tech University`,
  },
  {
    src: slug,
    title: "D. discoideum slug",
    description:
      "Courtesy Dirk Dormann, MRC London Institute of Medical Sciences",
  },
  {
    src: tubulin,
    title:
      "Triple stained and fixed Dictyostelium cells: alpha-tubulin (green), centrosome (red, appears yellow due to colocalization with tubulin), nuclei (blue)",
    description: "Courtesy of Ralph Gräf, Potsdam University",
  },
]

/**
 * Image slideshow carousel with curated dicty photos
 */

const Slideshow = () => (
  <Box>
    <Carousel
      showStatus={false}
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop>
      {imageData.map((img) => (
        <Box
          key={img.src}
          sx={{
            height: "440px",
            "@media (max-width: 768px)": {
              height: "250px",
            },
          }}>
          <img
            src={img.src}
            alt={img.title}
            style={{
              height: "100%",
              width: "100%",
              maxHeight: "100%",
            }}
          />
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
