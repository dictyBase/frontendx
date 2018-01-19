import styled, { injectGlobal } from 'styled-components'
import { Tabs, TabItem } from 'rebass'
import { lighten } from 'polished'

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

export const TabContainer = styled(Tabs)`
    border-bottom: 0px;
`

export const Tab = styled(TabItem)`
    background: ${ props => !props.active && props.theme.secondary ? '#A3BAE9' : '#15317e' };
    border-top: 1px solid white;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    margin-right: 3px;
    margin-top: 1px;
    padding: 5px;
    width: 150px;
    color: ${ props => !props.active && props.theme.secondary ? 'black' : 'white' };
    border-color: ${ props => props.active ? 'black' : ''};

    &:hover {
        background: ${ props => !props.active && props.theme.secondary ? lighten(0.1, props.theme.secondary) : '#15317e' };
        color: ${ props => !props.active && props.theme.secondary ? 'black' : 'white' };;
        cursor: pointer;
    }
`
