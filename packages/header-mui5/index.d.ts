/// <reference types="vite/client" />

declare module "*.png" {
  const image: string | { src: string }
  export = image
}
declare module "*.webp" {
  const image: string | { src: string }
  export = image
}
declare module "*.jpg"
declare module "*.avif"
