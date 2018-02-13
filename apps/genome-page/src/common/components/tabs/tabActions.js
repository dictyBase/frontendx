// @flow
import { TAB_SELECTED } from './tabConstants'

export function selectTab(tabName: string) {
    return {
        type: TAB_SELECTED,
        payload: { tabName }
    }
}
