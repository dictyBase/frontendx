# parseFormattedStringToDomElements steps

 1. uses regular expressions to capture the formatted text (with tags) and unformatted text.
 2. The formatted text is parsed recursively to create nested DOM elements.
 3. The unformatted text is wrapped in `<span>` elements.
 4. Finally, the formatted and unformatted elements are **interleaved** to create the final array of DOM elements.
