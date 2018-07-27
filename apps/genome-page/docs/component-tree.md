## Component Tree

**Main app layout:**

src/index.js -> src/app/layout/App

**GO tab:**

`<GeneOntologyMaster />` (generates main tabs, panels)

->`<GeneOntologyTabContainer />` (generates nested GO tabs)

--> `<AllGO />` (dispatches action to get QuickGO data)
