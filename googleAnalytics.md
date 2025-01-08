## google analytics -- should we use a package / write our own class/component?

```mermaid
flowchart TD

A[Will we need to collect custom measurements?]
B[gtag.js supports automatic collection of page views]
C[gtag.js measures page_views on browser history change if enabled on GA dashboard]
C2[just use a hook that loads gtag.js]
D0[Write an interface]
D[What do packages like react-ga4 provide?]
E[injects gtag.js script]
F[This is trivial to do by appending script tag to document]
G[Provides methods to send page views, custom events]
H["ReactGA internally calls gtag() in its methods. These methods just provide a defined API"]
J[argument validation]
K[type definitions]

A -->|no| B
B --- C
C --> C2
A -->|yes| D0
D0 --> D
D --> E
E --> F
D --> G
G --> H
D --> J
D --> K

click B "https://support.google.com/analytics/answer/9234069?sjid=13764265460356742502-NC"
click C "https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history"
click I "https://developers.google.com/tag-platform/gtagjs/reference"
```

If we end up collecting custom measurements, it might be worth writing a class / component that provides an interface to use gtag().
It sounds conceptually easy enough. It's also something that can probably be deferred to when it becomes necessary.

If we just need to track page views, then the hook described below should be enough.

a useGoogleAnalytics hook that

1. checks for production environment (might not be necessary, there are ways to filter developer traffic https://support.google.com/analytics/answer/13296761?sjid=879247116944398152-NC but haven't looked into that closely yet)
2. loads the gtag.js script, so we don't need to edit our HTML directly
3. tracks bfcache restores
