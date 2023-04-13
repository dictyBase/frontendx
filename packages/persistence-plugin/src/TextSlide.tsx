import { motion } from "framer-motion"

type TextSlideProperties = {
  text: string
}

const TextSlide = ({ text }: TextSlideProperties) => (
  <motion.div
    key={text}
    initial={{ x: 70, opacity: 0 }}
    animate={{ x: 10, opacity: 1 }}
    transition={{ delay: 0.09, duration: 0.6, ease: "easeIn" }}>
    {text}
  </motion.div>
)

export default TextSlide
