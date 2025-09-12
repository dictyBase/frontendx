import ReactDOM from "react-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Helmet } from "react-helmet"
import { AppProviders } from "./components/layout/AppProviders"
import { App } from "./components/layout/App"
import Home from "./pages/index"
import PublicationPageWrapper from "./pages/[id]/index"
import Callback from "./pages/callback"

const PublicationApp = () => (
  <AppProviders>
    <CssBaseline />
    <Helmet>
      <link rel="shortcut icon" href="/publication/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <link rel="manifest" href="/publication/manifest.json" />
      <title>dictyBase Literature</title>
    </Helmet>
    <App>
      <BrowserRouter basename="/publication">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/:id" element={<PublicationPageWrapper />} />
        </Routes>
      </BrowserRouter>
    </App>
  </AppProviders>
)

ReactDOM.render(<PublicationApp />, document.querySelector("#root"))

