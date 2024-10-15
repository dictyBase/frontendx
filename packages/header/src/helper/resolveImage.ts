import { match, P } from "ts-pattern"

/**
 * Resolves differences between image imports by Vite's image loader and Nextjs's image loader.
 */
const resolveImage = (image: string | { src: string }): string => {
  return match(image)
    // Vite
    .with(P.select(P.string), (pngUrl) => pngUrl)
    // Nextjs
    .with({ src: P.select(P.string) }, (webpUrl) => webpUrl)
    .exhaustive()
}

export { resolveImage }
