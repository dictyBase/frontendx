import styled, { injectGlobal } from 'styled-components'

injectGlobal([`
    html {
        height: 100%;
    }
    body {
        margin: auto;
        height: 100%;
    }
`])

export const Root = styled.div`
    height: 100vh;
`

export const ReactVirtualizedTable = styled.div`
    .ReactVirtualized__Table__headerRow {
        background-color: #e5efff;
    }

    .ReactVirtualized__Table__Grid {
            margin: 0px auto;
        }
`
export const Wrapper = styled.div`
    text-align: center;
`