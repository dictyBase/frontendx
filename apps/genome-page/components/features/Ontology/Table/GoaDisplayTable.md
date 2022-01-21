```jsx
import mockGraphQLData from "common/mocks/mockGraphQLData"
const data = mockGraphQLData.data.gene.goas
const molecular = data.filter((item) => item.type === "molecular_function")

;<GoaDisplayTable data={molecular} />
```
