const waitForImageLoad = () =>
  [...document.querySelectorAll("img")].every(
    (img) => img.complete && img.naturalHeight !== 0,
  )

export { waitForImageLoad }
