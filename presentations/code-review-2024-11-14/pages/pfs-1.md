# parseFormattedStringToDomElements function

- Used to properly render Publication titles
- Parses a string that contains format tags and returns an array of formatted and unformatted DOM elements.

````md magic-move
```js
`Gradients of PI(4,5)P<sub>2</sub> and PI(3,5)P<sub>2</sub> Jointly Participate in Shaping the Back State of <i>Dictyostelium</i> Cells`
```
```js
[
  <span>Gradients of PI(4,5)P</span>,
  <sub>2</sub>,
  <span> and PI(3,5)P</span>,
  <sub>2</sub>,
  <span> Jointly Participate in Shaping the Back State of </span>,
  <i>Dictyostelium</i>,
  <span> Cells</span>
]
```
````

