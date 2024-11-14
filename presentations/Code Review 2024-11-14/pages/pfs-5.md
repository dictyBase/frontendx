---
zoom: 0.9
---
````md magic-move
```ts
const final = []
for (let index = 0; index < unformattedTextElements.length; index += 1) {
  final.push(unformattedTextElements[index] as DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>)
  if (formattedTextElements[index]) final.push(formattedTextElements[index] as DOMElement<DOMAttributes<Element>, Element>)
}
return final
```
```ts
const interleave = (unformattedTextElements, formattedTextElements) => {
  const final = []
  for (let index = 0; index < unformattedTextElements.length; index += 1) {
    final.push(unformattedTextElements[index] as DetailedReactHTMLElement<HTMLAttributes<HTMLElement>, HTMLElement>)
    if (formattedTextElements[index]) final.push(formattedTextElements[index] as DOMElement<DOMAttributes<Element>, Element>)
  }
  return final
}
```
```ts
const interleave = (leading: any[], trailing: any[]) => {
  const final = []
  for (let index = 0; index < leading.length; index += 1) {
    final.push(leading[index])
    if (trailing[index]) final.push(trailing[index])
  }
  return final
}
```
```ts
const interleave = (leading: readonly any[], trailing: readonly any[]) => {
  const totalLength = leading.length + trailing.length
  let cursorL = 0
  let cursorT = 0
  return AmakeBy(totalLength, (index) =>
    match(index)
      .when(isEven, () => {
        if (leading[cursorL]) {
          const next = leading[cursorL]
          cursorL += 1
          return next
        }
        const next = trailing[cursorT]
        cursorT += 1
        return next
      })
      .when(isOdd, () => {
        if (trailing[cursorT]) {
          const next = trailing[cursorT]
          cursorT += 1
          return next
        }
        const next = leading[cursorL]
        cursorL += 1
        return next
      })
      .otherwise(() => undefined),
  )
}
```
```ts
const parseFormattedStringToDomElements = (
  s: string,
): DOMElement<DOMAttributes<Element>, Element>[] => {
  ...
  return pipe(
    interleave(unformattedTextElements, formattedTextElements),
    Amap(OfromNullable),
    Acompact,
  )
}
```
````
