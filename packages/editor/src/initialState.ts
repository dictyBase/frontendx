/* eslint-disable unicorn/no-null */
const initialState = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              { 
                detail: 0,
                format: 0,
                mode: "normal",
                style: "font-family: Inter Variable;",
                text: "",
                type: "text",
                version: 1
              }
            ],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "flex-layout",
        version: 1,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

const initialStateString = JSON.stringify(initialState)
export { initialState, initialStateString }
