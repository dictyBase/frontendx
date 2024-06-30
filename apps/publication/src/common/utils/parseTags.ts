const exampleText =
  "Switch-2 determines Mg<sup>2+</sup>ADP-release kinetics and fine-tunes the duty ratio of <i>Dictyostelium</i> class-1 myosins."

// What if I used separate regexp for each tag type
const tagRegExp = /[\s\w-]+|<(\w+)>(.+?)<\/\w+>/g

console.log(exampleText)
console.log([...exampleText.matchAll(tagRegExp)])
