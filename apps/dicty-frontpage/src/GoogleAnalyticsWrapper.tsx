import { FunctionComponent } from "react"
import { Outlet } from "react-router-dom"
import { useGoogleAnalytics } from "./common/hooks/useGoogleAnalytics"

const GoogleAnalyticsWrapper: FunctionComponent = () => {
    useGoogleAnalytics()
    return <Outlet />
}

export { GoogleAnalyticsWrapper }
