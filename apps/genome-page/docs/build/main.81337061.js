;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    1049: function(e, t, n) {
      e.exports = {
        description:
          "This is the main App component.\nIt is responsible for the main layout of the entire application.\n",
        displayName: "App",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object representing auth part of state",
            tags: {},
            name: "auth",
          },
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action that fetches both navbar and footer content",
            tags: {},
            name: "fetchNavbarAndFooter",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object representing footer part of state",
            tags: {},
            name: "footer",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object representing navbar part of state",
            tags: {},
            name: "navbar",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1050: function(e, t, n) {
      e.exports = {
        description:
          "If there's an error fetching navbar and/or footer data,\nthis component is rendered with the static link data.\n",
        displayName: "AppErrorFallback",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object representing auth part of state",
            tags: {},
            name: "auth",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1051: function(e, t, n) {
      e.exports = {
        description: "List of routes used with React Router.\n",
        displayName: "Routes",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1052: function(e, t, n) {
      e.exports = {
        description:
          "This is an ErrorBoundary wrapper that catches any JavaScript errors and provides a fallback UI.\n",
        displayName: "ErrorBoundary",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1053: function(e, t, n) {
      e.exports = {
        description:
          "General error handling page. It displays different messages based on HTTP status code.\n",
        displayName: "ErrorPage",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "The general object in the state",
            tags: {},
            name: "general",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "The goa object in the state",
            tags: {},
            name: "goa",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1054: function(e, t, n) {
      e.exports = {
        description: "Basic page header for all gene pages.\n",
        displayName: "PageHeader",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "React Router match object",
            tags: {},
            name: "match",
          },
          {
            required: !0,
            flowType: { name: "string" },
            description: "The gene name",
            tags: {},
            name: "name",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1055: function(e, t, n) {
      e.exports = {
        description:
          'Fallback component for non-existent routes -- "Page Not Ready"/"Under Construction"\n',
        displayName: "PageNotReady",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1056: function(e, t, n) {
      e.exports = {
        description: "Wrapper component for each item inside panel\n",
        displayName: "ItemDisplay",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1057: function(e, t, n) {
      e.exports = {
        description:
          "This represents the left side of the inner panel content.\n",
        displayName: "LeftDisplay",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "any" },
            description: "The content to display on the left",
            tags: {},
            name: "children",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
        ],
        doclets: {},
        tags: {},
        examples: n(1058),
      }
    },
    1058: function(e, t, n) {
      var a = { react: n(0), "./LeftDisplay.js": n(118) },
        r = n(111).default.bind(null, a),
        i = n(112).default.bind(
          null,
          "const React$0 = require('react');\nconst React = React$0['React'] || (React$0.default || React$0);\nconst LeftDisplay$0 = require('./LeftDisplay.js');\nconst LeftDisplay = LeftDisplay$0['LeftDisplay'] || (LeftDisplay$0.default || LeftDisplay$0);",
          r,
        )
      e.exports = [
        {
          type: "code",
          content: "<LeftDisplay>Molecular Function</LeftDisplay>",
          settings: {},
          evalInContext: i,
        },
      ]
    },
    1059: function(e, t, n) {
      e.exports = {
        description:
          "This is a basic panel wrapper that uses Material-UI for the design.\nIt is used for every panel on the gene summary page.\n",
        displayName: "PanelWrapper",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "any" },
            description: "Children passed to component",
            tags: {},
            name: "children",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: { name: "string" },
            description: "The path that View All links to",
            tags: {},
            name: "route",
          },
          {
            required: !0,
            flowType: { name: "string" },
            description: "The title to display for the panel",
            tags: {},
            name: "title",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1060: function(e, t, n) {
      e.exports = {
        description:
          "This represents the right side of the inner panel content.\nIt acts as a wrapper around whatever children it receives.\n",
        displayName: "RightDisplay",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "any" },
            description: "The content to display on the right",
            tags: {},
            name: "children",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
        ],
        doclets: {},
        tags: {},
        examples: n(1061),
      }
    },
    1061: function(e, t, n) {
      var a = { react: n(0), "./RightDisplay.js": n(119) },
        r = n(111).default.bind(null, a),
        i = n(112).default.bind(
          null,
          "const React$0 = require('react');\nconst React = React$0['React'] || (React$0.default || React$0);\nconst RightDisplay$0 = require('./RightDisplay.js');\nconst RightDisplay = RightDisplay$0['RightDisplay'] || (RightDisplay$0.default || RightDisplay$0);",
          r,
        )
      e.exports = [
        {
          type: "code",
          content: "<RightDisplay>nucleic acid binding (IEA)</RightDisplay>",
          settings: {},
          evalInContext: i,
        },
      ]
    },
    1062: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(7),
        o = n(1097),
        c = n(1098),
        s = n(277)
      t.default = Object(i.a)(function(e) {
        return {
          root: { width: "100%" },
          table: { borderBottom: "1px dotted #A3BAE9" },
        }
      })(function(e) {
        var t = e.classes,
          n = e.children
        return r.a.createElement(
          s.a,
          { className: t.root },
          r.a.createElement(
            o.a,
            { className: t.table },
            r.a.createElement(c.a, null, n),
          ),
        )
      })
    },
    1063: function(e, t, n) {
      e.exports = {
        description:
          "This is a basic table wrapper that uses Material-UI for the design.\nIt is used inside every panel on the gene summary page.\n",
        displayName: "TableWrapper",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "any" },
            description: "Children passed to component",
            tags: {},
            name: "children",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1064: function(e, t, n) {
      e.exports = {
        description:
          "This is a basic typography wrapper for consistent Material-UI styling.\n",
        displayName: "TypographyWrapper",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1065: function(e, t, n) {
      e.exports = {
        methods: [],
        doclets: {},
        displayName: "WithDataFetching",
        examples: null,
      }
    },
    1066: function(e, t, n) {
      e.exports = {
        description: "Loading screen during the login process\n",
        displayName: "AuthLoader",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1067: function(e, t, n) {
      e.exports = {
        description:
          "Notification snackbar-style message if user hits some type of error\n",
        displayName: "ErrorNotification",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: { name: "string" },
            description: "The error message to display",
            tags: {},
            name: "error",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1068: function(e, t, n) {
      e.exports = {
        description:
          "Component that displays all of the social login buttons with click handlers for each one\n",
        displayName: "Login",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Auth part of state",
            tags: {},
            name: "auth",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object passed by React-Router",
            tags: {},
            name: "location",
          },
        ],
        doclets: {},
        tags: {},
        examples: n(1069),
      }
    },
    1069: function(e, t, n) {
      var a = { react: n(0), "./Login.js": n(183) },
        r = n(111).default.bind(null, a),
        i = n(112).default.bind(
          null,
          "const React$0 = require('react');\nconst React = React$0['React'] || (React$0.default || React$0);\nconst Login$0 = require('./Login.js');\nconst Login = Login$0['Login'] || (Login$0.default || Login$0);",
          r,
        )
      e.exports = [
        {
          type: "code",
          content:
            'const Provider = require("react-redux").Provider\nconst createStore = require("redux").createStore\nconst reducers = require("../../app/reducers/rootReducer").default\n\nlet store = createStore(reducers)\n;<Provider store={store}>\n  <Login location={{}} />\n</Provider>',
          settings: {},
          evalInContext: i,
        },
      ]
    },
    1070: function(e, t, n) {
      e.exports = {
        description: "Allows the user to logout\n",
        displayName: "Logout",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Logs the user out",
            tags: {},
            name: "logoutUser",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1071: function(e, t, n) {
      e.exports = {
        description: "Callback that transfers the user to the login system\n",
        displayName: "OauthCallback",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "",
            tags: {},
            name: "location",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "",
            tags: {},
            name: "match",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1072: function(e, t, n) {
      e.exports = {
        description: "Sign in handler for the oAuth process\n",
        displayName: "OauthSignHandler",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Function that handles the oAuth login process",
            tags: {},
            name: "oAuthLogin",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1073: function(e, t, n) {
      e.exports = {
        methods: [],
        doclets: {},
        displayName: "LinksData",
        examples: null,
      }
    },
    1074: function(e, t, n) {
      e.exports = {
        description:
          "MainPage provides a list of example gene pages to view when you hit the index route.\n",
        displayName: "MainPage",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1075: function(e, t, n) {
      e.exports = {
        description: "Displays the inside of GO Tab panels\n",
        displayName: "InnerGoPanel",
        methods: [],
        props: [
          {
            required: !0,
            flowType: {
              name: "Array",
              elements: [{ name: "Object" }],
              raw: "Array<Object>",
            },
            description: "Filtered GOA data based on tab",
            tags: {},
            name: "goaData",
          },
        ],
        doclets: {},
        tags: {},
        examples: n(1076),
      }
    },
    1076: function(e, t, n) {
      var a = { react: n(0), "./InnerGoPanel.js": n(94) },
        r = n(111).default.bind(null, a),
        i = n(112).default.bind(
          null,
          "const React$0 = require('react');\nconst React = React$0['React'] || (React$0.default || React$0);\nconst InnerGoPanel$0 = require('./InnerGoPanel.js');\nconst InnerGoPanel = InnerGoPanel$0['InnerGoPanel'] || (InnerGoPanel$0.default || InnerGoPanel$0);",
          r,
        )
      e.exports = [
        {
          type: "code",
          content:
            'const Provider = require("react-redux").Provider\nconst createStore = require("redux").createStore\nconst reducers = require("../../app/reducers/rootReducer").default\nconst data = require("./mockData").data\n\nlet store = createStore(reducers)\n;<Provider store={store}>\n  <InnerGoPanel goaData={data} />\n</Provider>',
          settings: {},
          evalInContext: i,
        },
      ]
    },
    1077: function(e, t, n) {
      e.exports = {
        description:
          "This is the master container component for the Gene Ontology tab.\nIt generates the list of tabs needed to display, and it fetches the GO\ndata from the QuickGO API.\n",
        displayName: "OntologyContainer",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action to change the top level tabs",
            tags: {},
            name: "changeTab",
          },
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action to fetch Summary data",
            tags: {},
            name: "fetchGeneralData",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object for the general slice of state",
            tags: {},
            name: "general",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object for the goa slice of state",
            tags: {},
            name: "goa",
          },
          {
            required: !0,
            flowType: { name: "Boolean" },
            description: "Boolean set to true if route matches ID",
            tags: {},
            name: "identifier",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "React Router object",
            tags: {},
            name: "match",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1078: function(e, t, n) {
      e.exports = {
        description: "Loading screen for GO page\n",
        displayName: "OntologyLoader",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1079: function(e, t, n) {
      e.exports = {
        description:
          "This is the tab container component for the Gene Ontology tab.\nIt generates inner tabs for displaying GO data, but it only shows\na tab if the data exists.\n",
        displayName: "OntologyTabContainer",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action used to change the current GOA tab selection",
            tags: {},
            name: "changeTab",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: 'Object representing the "goa" slice of state',
            tags: {},
            name: "goa",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1080: function(e, t, n) {
      e.exports = {
        description:
          "The display table used inside each panel in the GO tabs.\n",
        displayName: "DisplayTable",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action to change the table order (asc or desc)",
            tags: {},
            name: "changeTableOrder",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "The goa slice of state",
            tags: {},
            name: "goa",
          },
          {
            required: !0,
            flowType: {
              name: "Array",
              elements: [{ name: "Object" }],
              raw: "Array<Object>",
            },
            description: "GOA data fetched from QuickGO API",
            tags: {},
            name: "goaData",
          },
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action to sort the table by column ID",
            tags: {},
            name: "sortTableBy",
          },
        ],
        doclets: {},
        tags: {},
        examples: n(1081),
      }
    },
    1081: function(e, t, n) {
      var a = { react: n(0), "./DisplayTable.js": n(120) },
        r = n(111).default.bind(null, a),
        i = n(112).default.bind(
          null,
          "const React$0 = require('react');\nconst React = React$0['React'] || (React$0.default || React$0);\nconst DisplayTable$0 = require('./DisplayTable.js');\nconst DisplayTable = DisplayTable$0['DisplayTable'] || (DisplayTable$0.default || DisplayTable$0);",
          r,
        )
      e.exports = [
        {
          type: "code",
          content:
            'const Provider = require("react-redux").Provider\nconst createStore = require("redux").createStore\nconst reducers = require("../../../app/reducers/rootReducer").default\nconst data = require("../mockData").data\n\nlet store = createStore(reducers)\n;<Provider store={store}>\n  <DisplayTable goaData={data} />\n</Provider>',
          settings: {},
          evalInContext: i,
        },
      ]
    },
    1082: function(e, t, n) {
      e.exports = {
        description:
          "Enhanced table head component that allows for column sorting.\n",
        displayName: "EnhancedTableHead",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Function for handling sorting",
            tags: {},
            name: "onRequestSort",
          },
          {
            required: !0,
            flowType: { name: "string" },
            description: "The order to sort the column",
            tags: {},
            name: "order",
          },
          {
            required: !0,
            flowType: { name: "string" },
            description: "The item to be ordered by",
            tags: {},
            name: "orderBy",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1083: function(e, t, n) {
      e.exports = {
        description: "This handles the display for the extensions GO data.\n",
        displayName: "ExtensionsDisplay",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: {
              name: "Array",
              elements: [{ name: "Object" }],
              raw: "Array<Object>",
            },
            description: "The extensions data from GO annotations",
            tags: {},
            name: "extensions",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1084: function(e, t, n) {
      e.exports = {
        description: 'This handles the display for the "With" GO data.\n',
        displayName: "WithDisplay",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: {
              name: "Array",
              elements: [{ name: "Object" }],
              raw: "Array<Object>",
            },
            description: "The With data from GO annotations",
            tags: {},
            name: "withData",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1085: function(e, t, n) {
      e.exports = {
        description:
          "Panel to display Gene Ontology Annotations in Gene Summary tab\n",
        displayName: "GoaPanel",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: 'Object representing the "goa" slice of state',
            tags: {},
            name: "panelData",
          },
        ],
        doclets: {},
        tags: {},
        examples: n(1086),
      }
    },
    1086: function(e, t, n) {
      var a = { react: n(0), "./GoaPanel.js": n(64) },
        r = n(111).default.bind(null, a),
        i = n(112).default.bind(
          null,
          "const React$0 = require('react');\nconst React = React$0['React'] || (React$0.default || React$0);\nconst GoaPanel$0 = require('./GoaPanel.js');\nconst GoaPanel = GoaPanel$0['GoaPanel'] || (GoaPanel$0.default || GoaPanel$0);",
          r,
        )
      e.exports = [
        {
          type: "code",
          content:
            'const data = require("./mockData").data\n;<GoaPanel panelData={data} />',
          settings: {},
          evalInContext: i,
        },
      ]
    },
    1087: function(e, t, n) {
      e.exports = {
        description:
          "The content that goes in the right side of the GOA panel on the summary page.\n",
        displayName: "GoaPanelContent",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Material-UI styling",
            tags: {},
            name: "classes",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "The mapped item to display on a line in GoaPanel",
            tags: {},
            name: "item",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1088: function(e, t, n) {
      e.exports = {
        description:
          "This is the master container component for the Gene Summary tab.\nIt generates the list of tabs and panels needed to display and fetches data.\n",
        displayName: "SummaryContainer",
        methods: [],
        props: [
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action to change the top level tabs",
            tags: {},
            name: "changeTab",
          },
          {
            required: !0,
            flowType: { name: "Function" },
            description: "Action to fetch Summary data",
            tags: {},
            name: "fetchGeneralData",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object for the general slice of state",
            tags: {},
            name: "general",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "Object for the goa slice of state",
            tags: {},
            name: "goa",
          },
          {
            required: !0,
            flowType: { name: "Boolean" },
            description: "Boolean set to true if route matches ID",
            tags: {},
            name: "identifier",
          },
          {
            required: !0,
            flowType: { name: "Object" },
            description: "React Router object",
            tags: {},
            name: "match",
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1089: function(e, t, n) {
      e.exports = {
        description: "Loading screen for Summary page\n",
        displayName: "SummaryLoader",
        methods: [],
        doclets: {},
        tags: {},
        examples: null,
      }
    },
    1091: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(80),
        o = n(24),
        c = n(14),
        s = n(7),
        l = n(65),
        u = n(197),
        p = n(139),
        d = n(20),
        m = n.n(d),
        f = n(42),
        h = n(17),
        g = n(198),
        y = n(115),
        b = function(e) {
          return { type: h.c, payload: { isFetching: !1, links: e } }
        },
        j = function(e) {
          return { type: h.a, payload: { error: e } }
        },
        E = function(e) {
          return { type: h.f, payload: { isFetching: !1, links: e } }
        },
        _ = function(e) {
          return { type: h.d, payload: { error: e } }
        },
        S = n(66),
        x = n(140),
        v = n(269),
        O = n(203),
        w = n(126)
      n.d(t, "App", function() {
        return k
      })
      var k = function(e) {
          var t = e.auth,
            n = e.navbar,
            a = e.footer,
            i = e.classes,
            o = y.a
          return (
            a.links && (o = a.links),
            r.a.createElement(
              "div",
              { className: i.body },
              t.isAuthenticated
                ? r.a.createElement(l.b, { items: S.c }, function(e) {
                    return e.map(S.a)
                  })
                : r.a.createElement(l.b, { items: S.b }, function(e) {
                    return e.map(S.a)
                  }),
              r.a.createElement(u.Navbar, { theme: w.b, items: n.links }),
              r.a.createElement(
                "main",
                { className: i.main },
                r.a.createElement(
                  p.default,
                  null,
                  r.a.createElement(x.default, null),
                ),
              ),
              r.a.createElement(l.a, { items: o }),
            )
          )
        },
        T = Object(i.b)(
          c.g,
          Object(o.a)(function(e) {
            return { auth: e.auth, navbar: e.navbar, footer: e.footer }
          }, null),
          Object(s.a)(w.a),
          Object(v.default)(
            function() {
              return (function() {
                var e = Object(f.a)(
                  m.a.mark(function e(t) {
                    var n, a, r
                    return m.a.wrap(
                      function(e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                t({ type: h.e, payload: { isFetching: !0 } }),
                                (e.next = 4),
                                fetch(
                                  "https://raw.githubusercontent.com/dictyBase/migration-data/master/navbar/navbar.json",
                                )
                              )
                            case 4:
                              return (n = e.sent), (e.next = 7), n.json()
                            case 7:
                              if (((a = e.sent), !n.ok)) {
                                e.next = 15
                                break
                              }
                              return (
                                (r = a.data.map(function(e) {
                                  var t = e.attributes.items.map(function(e) {
                                    return { name: e.label, href: e.link }
                                  })
                                  return {
                                    dropdown: !0,
                                    title: e.attributes.display,
                                    items: t,
                                  }
                                })),
                                t(E(r)),
                                (e.next = 13),
                                t(
                                  (function() {
                                    var e = Object(f.a)(
                                      m.a.mark(function e(t) {
                                        var n, a, r
                                        return m.a.wrap(
                                          function(e) {
                                            for (;;)
                                              switch ((e.prev = e.next)) {
                                                case 0:
                                                  return (
                                                    (e.prev = 0),
                                                    t({
                                                      type: h.b,
                                                      payload: {
                                                        isFetching: !0,
                                                      },
                                                    }),
                                                    (e.next = 4),
                                                    fetch(
                                                      "https://raw.githubusercontent.com/dictyBase/migration-data/master/footer/footer.json",
                                                    )
                                                  )
                                                case 4:
                                                  return (
                                                    (n = e.sent),
                                                    (e.next = 7),
                                                    n.json()
                                                  )
                                                case 7:
                                                  if (((a = e.sent), !n.ok)) {
                                                    e.next = 11
                                                    break
                                                  }
                                                  return (
                                                    (r = a.data.map(function(
                                                      e,
                                                    ) {
                                                      var t = e.attributes.items.map(
                                                        function(e) {
                                                          return {
                                                            description:
                                                              e.label,
                                                            link: e.link,
                                                          }
                                                        },
                                                      )
                                                      return [
                                                        {
                                                          header: {
                                                            description:
                                                              e.attributes
                                                                .display,
                                                          },
                                                          items: t,
                                                        },
                                                      ]
                                                    })),
                                                    e.abrupt("return", t(b(r)))
                                                  )
                                                case 11:
                                                  return (
                                                    t(j(n.statusText)),
                                                    e.abrupt("return", y.a)
                                                  )
                                                case 15:
                                                  return (
                                                    (e.prev = 15),
                                                    (e.t0 = e.catch(0)),
                                                    e.abrupt(
                                                      "return",
                                                      t(j(e.t0.toString())),
                                                    )
                                                  )
                                                case 18:
                                                case "end":
                                                  return e.stop()
                                              }
                                          },
                                          e,
                                          null,
                                          [[0, 15]],
                                        )
                                      }),
                                    )
                                    return function(t) {
                                      return e.apply(this, arguments)
                                    }
                                  })(),
                                )
                              )
                            case 13:
                              e.next = 17
                              break
                            case 15:
                              return t(_(n.statusText)), e.abrupt("return", g.a)
                            case 17:
                              e.next = 22
                              break
                            case 19:
                              return (
                                (e.prev = 19),
                                (e.t0 = e.catch(0)),
                                e.abrupt("return", t(_(e.t0.toString())))
                              )
                            case 22:
                            case "end":
                              return e.stop()
                          }
                      },
                      e,
                      null,
                      [[0, 19]],
                    )
                  }),
                )
                return function(t) {
                  return e.apply(this, arguments)
                }
              })()
            },
            "navbar",
            O.default,
            O.default,
          ),
        )
      t.default = T(k)
    },
    115: function(e, t, n) {
      "use strict"
      t.a = [
        [
          {
            header: { description: "Genomes" },
            items: [
              { link: "/", description: "Dictyostelium discoideum" },
              {
                link: "http://genomes.dictybase.org/purpureum",
                description: "Dictyostelium purpureum",
              },
              {
                link: "http://genomes.dictybase.org/fasciculatum",
                description: "Dictyostelium fasciculatum",
              },
              {
                link: "http://genomes.dictybase.org/pallidum",
                description: "Polysphondylium pallium",
              },
            ],
          },
        ],
        [
          {
            header: { description: "Tools" },
            items: [
              {
                description: "Genome Browser",
                link:
                  "http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript",
              },
              { description: "Dashboard", link: "/dictyaccess" },
            ],
          },
        ],
        [
          {
            header: { description: "Explore" },
            items: [
              { link: "/explore/art", description: "Dicty Art" },
              { link: "/explore/gallery", description: "Gallery" },
              { link: "/explore/learn", description: "Learn About Dicty" },
              { link: "/explore/teach", description: "Teaching Protocols" },
              { link: "/explore/links", description: "Useful Links" },
            ],
          },
        ],
        [
          {
            header: { description: "Research" },
            items: [
              { link: "/research/ontology", description: "Anatomy Ontology" },
              { link: "/research/codon", description: "Codon Bias Table" },
              {
                link: "/research/nomenclature",
                description: "Nomenclature Guidelines",
              },
              { link: "/research/phenotyping", description: "Phenotyping" },
              { link: "/research/techniques", description: "Techniques" },
            ],
          },
        ],
        [
          {
            header: { description: "Dicty Stock Center" },
            items: [
              { description: "Stock Center Home", link: "/stockcenter" },
              {
                description: "Order Information",
                link: "/stockcenter/information/order",
              },
              { description: "FAQ", link: "/stockcenter/information/faq" },
            ],
          },
        ],
        [
          {
            header: { description: "Community" },
            items: [
              { description: "Cite Us", link: "/community/citation" },
              {
                description: "Dicty Annual Conferences",
                link: "/community/conference",
              },
              { description: "Dicty Email Forum", link: "/community/listserv" },
              { description: "Dicty Labs", link: "/community/labs" },
              { description: "History", link: "/community/history" },
              { description: "Jobs", link: "/community/jobs" },
              { description: "Upcoming Meetings", link: "/community/meetings" },
            ],
          },
        ],
        [
          {
            header: { description: "Please Cite" },
            items: [
              { description: "dictyBase", link: "" },
              { description: "Dicty Stock Center", link: "/stockcenter" },
            ],
          },
          {
            header: { description: "Supported By" },
            items: [
              { description: "NIH", link: "https://www.nih.gov/" },
              { description: "GMOD", link: "http://gmod.org/wiki/Main_Page" },
              {
                description: "Gene Ontology",
                link: "http://www.geneontology.org/",
              },
            ],
          },
        ],
      ]
    },
    118: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(29),
        r = n(0),
        i = n.n(r),
        o = n(7),
        c = n(18)
      t.default = Object(o.a)(function(e) {
        return {
          leftContainer: Object(a.a)(
            {
              backgroundColor: "#e6f2ff",
              fontSize: "1.1em",
              fontWeight: 400,
              display: "table-cell",
              padding: "4px 56px 4px 24px",
              verticalAlign: "middle",
            },
            e.breakpoints.down("sm"),
            { padding: "2px 8px 2px 8px", minWidth: 95 },
          ),
          innerSpan: { height: "100%", verticalAlign: "middle" },
        }
      })(function(e) {
        var t = e.classes,
          n = e.children
        return i.a.createElement(
          c.a,
          { item: !0, xs: 2, component: "span", className: t.leftContainer },
          i.a.createElement("span", { className: t.innerSpan }, n),
        )
      })
    },
    119: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(7),
        o = n(18)
      t.default = Object(i.a)(function(e) {
        return {
          rightContainer: {
            width: "80%",
            height: "100%",
            display: "table-cell",
            padding: "4px 56px 4px 24px",
            verticalAlign: "middle",
          },
          innerSpan: { height: "100%", fontSize: "0.8125rem", fontWeight: 400 },
        }
      })(function(e) {
        var t = e.classes,
          n = e.children
        return r.a.createElement(
          o.a,
          { item: !0, xs: 10, component: "span", className: t.rightContainer },
          r.a.createElement("span", { className: t.innerSpan }, n),
        )
      })
    },
    120: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(24),
        p = n(7),
        d = n(1097),
        m = n(1098),
        f = n(1096),
        h = n(1095),
        g = n(277),
        y = n(261),
        b = n(262),
        j = n(263),
        E = function(e) {
          var t
          return e.includes("PMID")
            ? ((t = e.slice(5)),
              "https://www.ncbi.nlm.nih.gov/pubmed/".concat(t))
            : e.includes("GO_REF")
            ? ((t = e.slice(7)),
              "https://github.com/geneontology/go-site/blob/master/metadata/gorefs/goref-".concat(
                t,
                ".md",
              ))
            : e.includes("PAINT_REF")
            ? ((t = e.slice(10)),
              "http://www.pantherdb.org/panther/family.do?clsAccession=PTHR".concat(
                t,
              ))
            : e
        },
        _ = function(e) {
          switch (e) {
            case "IMP":
              return "http://dictybase.org/ontology/go/evidence#IMP"
            case "IGI":
              return "http://dictybase.org/ontology/go/evidence#IGI"
            case "IDA":
              return "http://dictybase.org/ontology/go/evidence#IDA"
            case "IBA":
              return "http://dictybase.org/ontology/go/evidence#IBA"
            case "IEA":
              return "http://dictybase.org/ontology/go/evidence#IEA"
            case "IPI":
              return "http://dictybase.org/ontology/go/evidence#IPI"
            default:
              return "http://dictybase.org/ontology/go/evidence"
          }
        },
        S = function(e) {
          switch (e) {
            case "dictyBase":
              return "http://dictybase.org/"
            case "InterPro":
              return "http://www.ebi.ac.uk/interpro/"
            case "GO_Central":
              return "http://www.geneontology.org/page/reference-genome-annotation-project"
            case "UniProt":
              return "https://www.uniprot.org/"
            case "GOC":
              return "http://www.geneontology.org/"
            case "IntAct":
              return "https://www.ebi.ac.uk/intact/"
            default:
              return "#"
          }
        },
        x = n(95),
        v = n(82)
      n.d(t, "DisplayTable", function() {
        return O
      })
      var O = (function(e) {
        function t() {
          var e, n
          Object(a.a)(this, t)
          for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
            c[s] = arguments[s]
          return (
            ((n = Object(i.a)(
              this,
              (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
            )).handleRequestSort = function(e, t) {
              var a = n.props,
                r = a.goa,
                i = a.changeTableOrder,
                o = a.sortTableBy,
                c = t,
                s = "desc"
              r.tableSortBy === t && "desc" === r.tableOrder && (s = "asc"),
                i(s),
                o(c)
            }),
            n
          )
        }
        return (
          Object(c.a)(t, e),
          Object(r.a)(t, [
            {
              key: "render",
              value: function() {
                var e = this.props,
                  t = e.classes,
                  n = e.goaData,
                  a = e.goa,
                  r = n.map(function(e) {
                    return e.attributes
                  })
                return l.a.createElement(
                  g.a,
                  { className: t.root },
                  l.a.createElement(
                    d.a,
                    null,
                    l.a.createElement(
                      "colgroup",
                      null,
                      l.a.createElement("col", { style: { width: "25%" } }),
                      l.a.createElement("col", { style: { width: "20%" } }),
                      l.a.createElement("col", { style: { width: "10%" } }),
                      l.a.createElement("col", { style: { width: "15%" } }),
                      l.a.createElement("col", { style: { width: "10%" } }),
                      l.a.createElement("col", { style: { width: "10%" } }),
                      l.a.createElement("col", { style: { width: "10%" } }),
                    ),
                    l.a.createElement(y.default, {
                      order: a.tableOrder,
                      orderBy: a.tableSortBy,
                      onRequestSort: this.handleRequestSort,
                    }),
                    l.a.createElement(
                      m.a,
                      null,
                      r
                        .sort(
                          (function(e, t) {
                            return "desc" === e
                              ? function(e, n) {
                                  return n[t] < e[t] ? -1 : 1
                                }
                              : function(e, n) {
                                  return e[t] < n[t] ? -1 : 1
                                }
                          })(a.tableOrder, a.tableSortBy),
                        )
                        .map(function(e, n) {
                          return l.a.createElement(
                            h.a,
                            { className: t.row, key: n },
                            l.a.createElement(
                              f.a,
                              { component: "th", scope: "row" },
                              (function(e) {
                                var t = e.replace("NOT|", "NOT ")
                                return "NOT" === t.substring(0, 3)
                                  ? l.a.createElement(
                                      s.Fragment,
                                      null,
                                      l.a.createElement("strong", null, "NOT "),
                                      " ",
                                      l.a.createElement(
                                        "em",
                                        null,
                                        t.substring(4),
                                      ),
                                    )
                                  : l.a.createElement("em", null, t)
                              })(e.qualifier),
                              " ",
                              e.goterm,
                            ),
                            l.a.createElement(
                              f.a,
                              null,
                              l.a.createElement(b.default, {
                                extensions: e.extensions,
                              }),
                            ),
                            l.a.createElement(
                              f.a,
                              null,
                              l.a.createElement(
                                "a",
                                {
                                  className: t.link,
                                  href: _(e.evidence_code),
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                },
                                e.evidence_code,
                              ),
                            ),
                            l.a.createElement(
                              f.a,
                              null,
                              l.a.createElement(j.default, {
                                withData: e.with,
                              }),
                            ),
                            l.a.createElement(
                              f.a,
                              null,
                              l.a.createElement(
                                "a",
                                {
                                  className: t.link,
                                  href: E(e.publication),
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                },
                                e.publication,
                              ),
                            ),
                            l.a.createElement(
                              f.a,
                              null,
                              (function(e) {
                                var t = e.substring(0, 4),
                                  n = e.substring(4, 6),
                                  a = e.substring(6, 8)
                                return ""
                                  .concat(t, "-")
                                  .concat(n, "-")
                                  .concat(a)
                              })(e.date),
                            ),
                            l.a.createElement(
                              f.a,
                              null,
                              l.a.createElement(
                                "a",
                                {
                                  className: t.link,
                                  href: S(e.assigned_by),
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                },
                                e.assigned_by,
                              ),
                            ),
                          )
                        }),
                    ),
                  ),
                )
              },
            },
          ]),
          t
        )
      })(s.Component)
      t.default = Object(u.a)(
        function(e) {
          return { goa: e.goa }
        },
        { changeTableOrder: x.b, sortTableBy: x.d },
      )(Object(p.a)(v.a)(O))
    },
    126: function(e, t, n) {
      "use strict"
      n.d(t, "a", function() {
        return a
      }),
        n.d(t, "b", function() {
          return r
        })
      var a = function(e) {
          return {
            main: { margin: "0 10px 25px 10px" },
            body: {
              margin: "auto",
              height: "100%",
              width: "100%",
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              lineHeight: 1.42857,
              color: "#333",
              backgroundColor: "#fff",
              boxSizing: "content-box",
              WebkitFontSmoothing: "auto",
              MozOsxFontSmoothing: "auto",
            },
          }
        },
        r = { primary: "#004080", secondary: "#0059b3" }
    },
    127: function(e, t, n) {
      "use strict"
      var a = n(20),
        r = n.n(a),
        i = n(42),
        o = n(95),
        c = n(26)
      n.d(t, "b", function() {
        return u
      }),
        n.d(t, "a", function() {
          return p
        })
      var s = function(e) {
          return {
            type: "FETCH_GENERAL_DATA_SUCCESS",
            payload: { isFetching: !1, data: e },
          }
        },
        l = function(e) {
          return {
            type: "FETCH_GENERAL_DATA_FAILURE",
            payload: { isFetching: !1, error: e },
          }
        },
        u = function(e) {
          return (function() {
            var t = Object(i.a)(
              r.a.mark(function t(n, a) {
                var i, u
                return r.a.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (!a().general.data && !a().general.isFetching) {
                            t.next = 2
                            break
                          }
                          return t.abrupt("return", {
                            type: "GENERAL_DATA_NO_REFETCH",
                          })
                        case 2:
                          return (
                            (t.prev = 2),
                            n({
                              type: "FETCH_GENERAL_DATA_REQUEST",
                              payload: { isFetching: !0 },
                            }),
                            (t.next = 6),
                            fetch(e, {
                              headers: { Accept: "application/json" },
                            })
                          )
                        case 6:
                          return (i = t.sent), (t.next = 9), i.json()
                        case 9:
                          if (((u = t.sent), !i.ok || u.status)) {
                            t.next = 16
                            break
                          }
                          return (
                            n(s(u)),
                            (t.next = 14),
                            n(
                              Object(o.c)(
                                u.data.relationships.goa.links.related,
                              ),
                            )
                          )
                        case 14:
                          t.next = 18
                          break
                        case 16:
                          n(l(Object(c.a)(u.status, u.title)))
                        case 18:
                          t.next = 24
                          break
                        case 20:
                          ;(t.prev = 20),
                            (t.t0 = t.catch(2)),
                            n(l(Object(c.a)("Network", t.t0.message)))
                        case 24:
                        case "end":
                          return t.stop()
                      }
                  },
                  t,
                  null,
                  [[2, 20]],
                )
              }),
            )
            return function(e, n) {
              return t.apply(this, arguments)
            }
          })()
        },
        p = function(e) {
          return { type: "CHANGE_MAIN_TAB", payload: { tab: e } }
        }
    },
    139: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(29),
        l = n(0),
        u = n.n(l),
        p = n(18),
        d = n(7),
        m = n(93),
        f = n.n(m),
        h = (function(e) {
          function t() {
            var e, n
            Object(a.a)(this, t)
            for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
              c[s] = arguments[s]
            return (
              ((n = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
              )).state = { error: null, errorInfo: null }),
              n
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentDidCatch",
                value: function(e, t) {
                  this.setState({ error: e, errorInfo: t })
                },
              },
              {
                key: "render",
                value: function() {
                  var e = this.state,
                    t = e.errorInfo,
                    n = e.error,
                    a = this.props,
                    r = a.children,
                    i = a.classes
                  return t
                    ? u.a.createElement(
                        p.a,
                        {
                          className: i.gridContainer,
                          container: !0,
                          justify: "center",
                        },
                        u.a.createElement(
                          p.a,
                          { item: !0, xs: 6, className: i.paper },
                          u.a.createElement(
                            "center",
                            null,
                            u.a.createElement("img", {
                              src: f.a,
                              alt: "Sad Dicty Logo",
                            }),
                            u.a.createElement(
                              "h2",
                              null,
                              "Sorry! There was an error loading this page.",
                            ),
                            u.a.createElement(
                              "p",
                              null,
                              "Something went wrong behind the scenes.",
                            ),
                            u.a.createElement("em", null, n && n.toString()),
                            u.a.createElement(
                              "p",
                              null,
                              "If the problem persists, please email us at",
                              " ",
                              u.a.createElement(
                                "a",
                                { href: "mailto:dictybase@northwestern.edu" },
                                "dictybase@northwestern.edu",
                              ),
                              ".",
                            ),
                          ),
                        ),
                      )
                    : r
                },
              },
            ]),
            t
          )
        })(l.Component)
      t.default = Object(d.a)(function(e) {
        return {
          gridContainer: { marginTop: "33px" },
          paper: Object(s.a)(
            {
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundColor: "#eff8fb",
              borderRadius: "15px",
              marginBottom: "10px",
              maxHeight: "500px",
              overflow: "auto",
            },
            e.breakpoints.down("md"),
            { height: "350px" },
          ),
        }
      })(h)
    },
    140: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(14),
        o = n(258),
        c = n(206),
        s = n(199),
        l = n(183),
        u = n(266),
        p = n(267),
        d = n(268),
        m = n(202)
      t.default = function() {
        return r.a.createElement(
          i.d,
          null,
          r.a.createElement(i.b, {
            exact: !0,
            path: "/",
            component: o.default,
          }),
          r.a.createElement(i.b, { path: "/login", component: l.default }),
          r.a.createElement(i.b, {
            path: "/:provider/callback",
            component: u.default,
          }),
          r.a.createElement(i.b, { path: "/load/auth", component: p.default }),
          r.a.createElement(i.b, { path: "/logout", component: d.default }),
          r.a.createElement(i.b, {
            path: "/:id([A-Z]{3}_G[0-9]{4,})/goannotations",
            render: function() {
              return r.a.createElement(s.default, { identifier: !0 })
            },
          }),
          r.a.createElement(i.b, {
            path: "/:id/goannotations",
            render: function() {
              return r.a.createElement(s.default, { identifier: !1 })
            },
          }),
          r.a.createElement(i.b, { path: "/:id/*", component: m.default }),
          r.a.createElement(i.b, {
            path: "/:id([A-Z]{3}_G[0-9]{4,})",
            render: function() {
              return r.a.createElement(c.default, { identifier: !0 })
            },
          }),
          r.a.createElement(i.b, {
            path: "/:id",
            render: function() {
              return r.a.createElement(c.default, { identifier: !1 })
            },
          }),
          r.a.createElement(i.b, { path: "*", component: m.default }),
        )
      }
    },
    141: function(e, t, n) {
      "use strict"
      n.r(t),
        n.d(t, "ErrorPage", function() {
          return m
        })
      var a = n(0),
        r = n.n(a),
        i = n(24),
        o = n(7),
        c = n(18),
        s = n(212),
        l = n(73),
        u = n.n(l),
        p = n(93),
        d = n.n(p),
        m = function(e) {
          var t,
            n = e.goa,
            a = e.general,
            i = e.classes,
            o = 0
          return (
            a.error && ((o = a.error.status), (t = a.error.title)),
            n.error && ((o = n.error.status), (t = n.error.title)),
            o >= 500
              ? r.a.createElement(
                  c.a,
                  { container: !0, className: i.mainGrid, justify: "center" },
                  r.a.createElement(
                    c.a,
                    { item: !0, xs: 10, md: 8 },
                    r.a.createElement(
                      "div",
                      { className: i.error500 },
                      r.a.createElement(
                        "h2",
                        null,
                        "Sorry! There was a server error.",
                      ),
                      r.a.createElement(
                        "p",
                        null,
                        "If the problem persists, please email us at",
                        " ",
                        r.a.createElement(
                          "a",
                          {
                            className: i.link500,
                            href: "mailto:dictybase@northwestern.edu",
                          },
                          "dictybase@northwestern.edu",
                        ),
                        ".",
                      ),
                      r.a.createElement(
                        "a",
                        { href: "/" },
                        r.a.createElement(
                          s.a,
                          {
                            className: i.backButton,
                            size: "small",
                            variant: "contained",
                            color: "default",
                          },
                          "Back to homepage",
                        ),
                      ),
                    ),
                  ),
                )
              : 404 === o
              ? r.a.createElement(
                  c.a,
                  { container: !0, className: i.mainGrid, justify: "center" },
                  r.a.createElement(
                    c.a,
                    { item: !0, xs: 10, md: 8 },
                    r.a.createElement(
                      "div",
                      { className: i.error400 },
                      r.a.createElement("img", {
                        src: d.a,
                        alt: "Sad Dicty -- Gene Not Found",
                      }),
                      r.a.createElement("h3", null, "Gene Not Found"),
                      r.a.createElement(
                        "div",
                        { className: i.list },
                        r.a.createElement(
                          "ul",
                          null,
                          r.a.createElement(
                            "li",
                            null,
                            "This is probably an invalid ID. Try a different one.",
                          ),
                          r.a.createElement(
                            "li",
                            null,
                            "You might be coming here from an outdated link.",
                          ),
                        ),
                      ),
                      r.a.createElement(
                        "p",
                        null,
                        " ",
                        "If problems persist, email us at",
                        " ",
                        r.a.createElement(
                          "a",
                          {
                            className: i.link,
                            href: "mailto:dictybase@northwestern.edu",
                          },
                          "dictybase@northwestern.edu",
                        ),
                        ".",
                      ),
                      r.a.createElement(
                        "a",
                        { href: "/" },
                        r.a.createElement(
                          s.a,
                          {
                            className: i.backButton,
                            size: "small",
                            variant: "contained",
                            color: "primary",
                          },
                          "Back to homepage",
                        ),
                      ),
                    ),
                  ),
                )
              : r.a.createElement(
                  c.a,
                  { container: !0, className: i.mainGrid, justify: "center" },
                  r.a.createElement(
                    c.a,
                    { item: !0, xs: 10, md: 8 },
                    r.a.createElement(
                      "div",
                      { className: i.error400 },
                      r.a.createElement("img", {
                        src: d.a,
                        alt: "Sad Dicty -- HTTP Error",
                      }),
                      r.a.createElement(
                        "h1",
                        null,
                        r.a.createElement(u.a, { name: "exclamation-circle" }),
                        " ",
                        o,
                        " Error",
                      ),
                      r.a.createElement("h3", null, t),
                      r.a.createElement(
                        "p",
                        null,
                        "If the problem persists, please email us at",
                        " ",
                        r.a.createElement(
                          "a",
                          {
                            className: i.link,
                            href: "mailto:dictybase@northwestern.edu",
                          },
                          "dictybase@northwestern.edu",
                        ),
                        ".",
                      ),
                      r.a.createElement(
                        "a",
                        { href: "/" },
                        r.a.createElement(
                          s.a,
                          {
                            className: i.backButton,
                            size: "small",
                            variant: "contained",
                            color: "primary",
                          },
                          "Back to Homepage",
                        ),
                      ),
                    ),
                  ),
                )
          )
        }
      t.default = Object(i.a)(function(e) {
        return { general: e.general, goa: e.goa }
      })(
        Object(o.a)(function(e) {
          return {
            error400: {
              backgroundColor: "#eff8fb",
              textAlign: "center",
              paddingTop: 30,
              paddingBottom: 30,
              marginBottom: 30,
              borderRadius: 5,
            },
            error500: {
              backgroundColor: "#a63232",
              textAlign: "center",
              paddingTop: 40,
              paddingBottom: 40,
              marginBottom: 30,
              borderRadius: 5,
              color: "#e3e3e3",
            },
            backButton: {
              width: "25%",
              padding: "20px",
              textTransform: "none",
              backgroundColor: "#15317e",
              color: "#e3e3e3",
              "&:hover": { backgroundColor: "#1a3d9e" },
            },
            mainGrid: { marginTop: "40px" },
            paragraph: { padding: "10px" },
            link: { color: "#428bca", textDecoration: "none" },
            link500: { color: "#e0e0e0", textDecoration: "none" },
            list: { margin: "0 auto", display: "table" },
          }
        })(m),
      )
    },
    144: function(e, t, n) {
      "use strict"
      n.r(t),
        (t.default = [
          { type: "regular", id: "DDB_G0272608" },
          { type: "regular", id: "DDB_G0288511" },
          { type: "regular", id: "DDB_G0269114" },
          { type: "regular", id: "DDB_G0286355" },
          { type: "regular", id: "DDB_G0277399" },
          { type: "complex", id: "DDB_G0280531" },
          { type: "complex", id: "DDB_G0276267" },
          { type: "complex", id: "DDB_G0281211" },
          { type: "complex", id: "DDB_G0277589" },
          { type: "name", id: "sadA" },
          { type: "name", id: "piaA" },
          { type: "name", id: "svkA" },
          { type: "name", id: "ripA" },
          { type: "name", id: "far1" },
        ])
    },
    145: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(60),
        o = n(7)
      t.default = Object(o.a)(function(e) {
        return {
          link: {
            textDecoration: "none",
            color: "#4C5E81",
            "&:visited": { color: "#4C5E81" },
            "&:hover": { textDecoration: "underline" },
          },
        }
      })(function(e) {
        var t = e.item,
          n = e.classes
        return r.a.createElement(
          a.Fragment,
          null,
          r.a.createElement(
            "span",
            null,
            t.goterm,
            null !== t.with &&
              (function(e) {
                var t = e
                    .filter(function(e) {
                      return "dictyBase" === e.db
                    })
                    .slice(0, 2),
                  n = e
                    .filter(function(e) {
                      return "UniProtKB" === e.db
                    })
                    .slice(0, 2),
                  a = e
                    .filter(function(e) {
                      return "MGI" === e.db
                    })
                    .slice(0, 2),
                  r = e
                    .filter(function(e) {
                      return "RGD" === e.db
                    })
                    .slice(0, 2),
                  i = e
                    .filter(function(e) {
                      return "SGD" === e.db
                    })
                    .slice(0, 2),
                  o = e
                    .filter(function(e) {
                      return "PomBase" === e.db
                    })
                    .slice(0, 2)
                return Array.isArray(t) && t.length
                  ? t
                  : Array.isArray(n) && n.length
                  ? n
                  : Array.isArray(a) && a.length
                  ? a
                  : Array.isArray(r) && r.length
                  ? r
                  : Array.isArray(i) && i.length
                  ? i
                  : o
              })(t.with).map(function(e, t) {
                return r.a.createElement(
                  a.Fragment,
                  { key: t },
                  r.a.createElement(
                    "span",
                    null,
                    " ",
                    r.a.createElement("em", null, "with"),
                    " ",
                    e.name
                      ? r.a.createElement(
                          "a",
                          {
                            className: n.link,
                            href: Object(i.a)(e.id, e.db, e.name),
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                          e.name,
                        )
                      : r.a.createElement(
                          "a",
                          {
                            className: n.link,
                            href: Object(i.a)(e.id, e.db),
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                          e.db,
                          ":",
                          e.id,
                        ),
                  ),
                )
              }),
            null !== t.extensions &&
              t.extensions.slice(0, 2).map(function(e, t) {
                return r.a.createElement(
                  a.Fragment,
                  { key: t },
                  r.a.createElement(
                    "span",
                    null,
                    " ",
                    r.a.createElement("em", null, e.relation),
                    " ",
                    e.name
                      ? r.a.createElement(
                          "a",
                          {
                            className: n.link,
                            href: Object(i.a)(e.id, e.db, e.name),
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                          e.name,
                        )
                      : r.a.createElement(
                          "a",
                          {
                            className: n.link,
                            href: Object(i.a)(e.id, e.db),
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                          e.db,
                          ":",
                          e.id,
                        ),
                    " ",
                  ),
                )
              }),
            " ",
            "(",
            t.evidence_code,
            ")",
          ),
          r.a.createElement("br", null),
        )
      })
    },
    146: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(7),
        o = n(18)
      t.default = Object(i.a)(function(e) {
        return {
          container: {
            borderBottom: "1px dotted #A3BAE9",
            display: "table",
            height: "48px",
          },
        }
      })(function(e) {
        var t = e.children,
          n = e.classes
        return r.a.createElement(
          o.a,
          { container: !0, className: n.container },
          t,
        )
      })
    },
    147: function(e, t, n) {
      "use strict"
      var a = { clientId: "xxxxxxxxxxxxxxxxxx" },
        r = { clientId: "APP-Y35D1DVLCC4PL0JL" },
        i = function(e) {
          var t = "/gene"
          return "/" === t.charAt(0)
            ? ""
                .concat(window.location.origin)
                .concat(t, "/")
                .concat(e, "/callback")
            : ""
                .concat(window.location.origin, "/")
                .concat(t, "/")
                .concat(e, "/callback")
        },
        o = {
          google: {
            name: "Google",
            url: "/auth/google",
            authorizationEndpoint:
              "https://accounts.google.com/o/oauth2/v2/auth",
            clientId: {
              clientId:
                "697274165688-m06dno4kic0hc92avpj15djd30cvirsb.apps.googleusercontent.com",
            }.clientId,
            redirectUrl: i("google"),
            requiredUrlParams: [["response_type", "code"]],
            scopes: ["email"],
            scopeDelimiter: " ",
            optionalUrlParams: [["state", "google"]],
            popupOptions: { width: 1020, height: 633 },
          },
          linkedin: {
            name: "LinkedIn",
            url: "/auth/linkedin",
            authorizationEndpoint:
              "https://www.linkedin.com/oauth/v2/authorization",
            clientId: a.clientId,
            redirectUrl: i("linkedin"),
            scopes: ["r_emailaddress"],
            scopeDelimiter: " ",
            requiredUrlParams: [
              ["state", "linkedin"],
              ["response_type", "code"],
            ],
            popupOptions: { width: 1028, height: 640 },
          },
          orcid: {
            name: "ORCID",
            url: "/auth/orcid",
            authorizationEndpoint: "https://orcid.org/oauth/authorize",
            clientId: r.clientId,
            redirectUrl: i("orcid"),
            scopes: ["/authenticate"],
            scopeDelimiter: " ",
            requiredUrlParams: [["response_type", "code"]],
            popupOptions: { width: 1028, height: 640 },
          },
        }
      t.a = o
    },
    17: function(e, t, n) {
      "use strict"
      n.d(t, "t", function() {
        return a
      }),
        n.d(t, "u", function() {
          return r
        }),
        n.d(t, "s", function() {
          return i
        }),
        n.d(t, "v", function() {
          return o
        }),
        n.d(t, "q", function() {
          return c
        }),
        n.d(t, "r", function() {
          return s
        }),
        n.d(t, "p", function() {
          return l
        }),
        n.d(t, "n", function() {
          return u
        }),
        n.d(t, "o", function() {
          return p
        }),
        n.d(t, "m", function() {
          return d
        }),
        n.d(t, "h", function() {
          return m
        }),
        n.d(t, "i", function() {
          return f
        }),
        n.d(t, "g", function() {
          return h
        }),
        n.d(t, "k", function() {
          return g
        }),
        n.d(t, "l", function() {
          return y
        }),
        n.d(t, "j", function() {
          return b
        }),
        n.d(t, "e", function() {
          return j
        }),
        n.d(t, "f", function() {
          return E
        }),
        n.d(t, "d", function() {
          return _
        }),
        n.d(t, "b", function() {
          return S
        }),
        n.d(t, "c", function() {
          return x
        }),
        n.d(t, "a", function() {
          return v
        })
      var a = "LOGIN_REQUEST",
        r = "LOGIN_SUCCESS",
        i = "LOGIN_FAILURE",
        o = "LOGOUT_SUCCESS",
        c = "FETCH_USER_REQUEST",
        s = "FETCH_USER_SUCCESS",
        l = "FETCH_USER_FAILURE",
        u = "FETCH_ROLE_REQUEST",
        p = "FETCH_ROLE_SUCCESS",
        d = "FETCH_ROLE_FAILURE",
        m = "FETCH_NON_AUTH_ROLE_REQUEST",
        f = "FETCH_NON_AUTH_ROLE_SUCCESS",
        h = "FETCH_NON_AUTH_ROLE_FAILURE",
        g = "FETCH_PERMISSION_REQUEST",
        y = "FETCH_PERMISSION_SUCCESS",
        b = "FETCH_PERMISSION_FAILURE",
        j = "FETCH_NAVBAR_REQUEST",
        E = "FETCH_NAVBAR_SUCCESS",
        _ = "FETCH_NAVBAR_FAILURE",
        S = "FETCH_FOOTER_REQUEST",
        x = "FETCH_FOOTER_SUCCESS",
        v = "FETCH_FOOTER_FAILURE"
    },
    183: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(24),
        p = n(18),
        d = n(376),
        m = n(265),
        f = n(147),
        h = n(201),
        g = ["orcid", "google", "linkedin"],
        y = {
          overrides: {
            MuiButton: {
              root: {
                borderRadius: 3,
                color: "white",
                width: "80%",
                justifyContent: "start",
                minHeight: "55px",
                marginBottom: "5px",
              },
            },
          },
        },
        b = (function(e) {
          function t() {
            var e, n
            Object(a.a)(this, t)
            for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
              c[s] = arguments[s]
            return (
              ((n = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
              )).handleClick = function(e) {
                var t = f.a[e],
                  n = ""
                    .concat(t.authorizationEndpoint, "?client_id=")
                    .concat(t.clientId)
                ;(n += "&scope=".concat(t.scopes.join(t.scopeDelimiter))),
                  t.requiredUrlParams &&
                    t.requiredUrlParams.forEach(function(e) {
                      n += "&".concat(e[0], "=").concat(e[1])
                    }),
                  t.optionalUrlParams &&
                    t.optionalUrlParams.forEach(function(e) {
                      n += "&".concat(e[0], "=").concat(e[1])
                    }),
                  (n += "&redirect_uri=".concat(t.redirectUrl)),
                  window.open(
                    n,
                    e,
                    "width="
                      .concat(
                        t.popupOptions.width,
                        ",\n                    height=",
                      )
                      .concat(t.popupOptions.height),
                  )
              }),
              n
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.props.auth,
                    t = this.props.location.state,
                    n = (void 0 === t ? {} : t).error
                  return l.a.createElement(
                    p.a,
                    { container: !0, justify: "center" },
                    l.a.createElement(
                      p.a,
                      { item: !0 },
                      l.a.createElement(
                        "center",
                        null,
                        l.a.createElement("h1", null, "Log in"),
                      ),
                      n && l.a.createElement(h.default, { error: n }),
                      e.error &&
                        l.a.createElement(h.default, { error: e.error }),
                      l.a.createElement(
                        p.a,
                        { container: !0, justify: "center" },
                        l.a.createElement(p.a, { item: !0, xs: 2 }),
                        l.a.createElement(
                          p.a,
                          { item: !0, xs: 10, style: { marginBottom: "20px" } },
                          l.a.createElement(d.a, {
                            buttons: g,
                            theme: y,
                            onClick: this.handleClick,
                          }),
                          l.a.createElement(m.default, null),
                        ),
                      ),
                    ),
                  )
                },
              },
            ]),
            t
          )
        })(s.Component)
      t.default = Object(u.a)(function(e) {
        return { auth: e.auth }
      })(b)
    },
    198: function(e, t, n) {
      "use strict"
      t.a = [
        {
          dropdown: !0,
          title: "Genomes",
          items: [
            { name: "Dictyostelium discoideum", href: "/" },
            {
              name: "Dictyostelium purpureum",
              href: "http://genomes.dictybase.org/purpureum",
            },
            {
              name: "Dictyostelium fasciculatum",
              href: "http://genomes.dictybase.org/fasciculatum",
            },
            {
              name: "Polysphondylium pallium",
              href: "http://genomes.dictybase.org/pallidum",
            },
          ],
        },
        {
          dropdown: !0,
          title: "Tools",
          items: [
            {
              name: "Genome Browser",
              href:
                "http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript",
            },
            { name: "Dashboard", href: "/dictyaccess" },
          ],
        },
        {
          dropdown: !0,
          title: "Explore",
          items: [
            { name: "Dicty Art", href: "/explore/art" },
            { name: "Gallery", href: "/explore/gallery" },
            { name: "Learn About Dicty", href: "/explore/learn" },
            { name: "Teaching Protocols", href: "/explore/teach" },
            { name: "Useful Links", href: "/explore/links" },
          ],
        },
        {
          dropdown: !0,
          title: "Research",
          items: [
            { name: "Anatomy Ontology", href: "/research/ontology" },
            { name: "Codon Bias Table", href: "/research/codon" },
            { name: "Nomenclature Guidelines", href: "/research/nomenclature" },
            { name: "Phenotyping", href: "/research/phenotyping" },
            { name: "Techniques", href: "/research/techniques" },
          ],
        },
        {
          dropdown: !0,
          title: "Dicty Stock Center",
          items: [
            { name: "Stock Center Home", href: "/stockcenter" },
            {
              name: "Order Information",
              href: "/stockcenter/information/order",
            },
            { name: "FAQ", href: "/stockcenter/information/faq" },
          ],
        },
        {
          dropdown: !0,
          title: "Community",
          items: [
            { name: "Cite Us", href: "/community/citation" },
            { name: "Dicty Annual Conferences", href: "/community/conference" },
            { name: "Dicty Email Forum", href: "/community/listserv" },
            { name: "Dicty Labs", href: "/community/labs" },
            { name: "History", href: "/community/history" },
            { name: "Jobs", href: "/community/jobs" },
            { name: "Upcoming Meetings", href: "/community/meetings" },
          ],
        },
      ]
    },
    199: function(e, t, n) {
      "use strict"
      n.r(t),
        n.d(t, "OntologyContainer", function() {
          return v
        })
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(116),
        p = n(31),
        d = n(14),
        m = n(24),
        f = n(129),
        h = n(130),
        g = n(43),
        y = n(260),
        b = n(264),
        j = n(141),
        E = n(71),
        _ = n(63),
        S = n(99),
        x = n(127),
        v = (function(e) {
          function t() {
            var e, n
            Object(a.a)(this, t)
            for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
              c[s] = arguments[s]
            return (
              ((n = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
              )).handleChange = function(e, t) {
                ;(0, n.props.changeTab)(t)
              }),
              (n.generateTabs = function(e, t) {
                return e.data
                  ? e.data.attributes.group.map(function(e, n) {
                      return S.a[e]
                        ? l.a.createElement(g.a, {
                            value: e,
                            label: S.a[e],
                            key: n,
                            component: p.a,
                            to: "/".concat(t, "/").concat(e),
                          })
                        : l.a.createElement(
                            "div",
                            null,
                            "Error: data not mapped to tab",
                          )
                    })
                  : l.a.createElement(
                      "div",
                      null,
                      "Sorry! There was an error loading the items",
                    )
              }),
              n
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this.props,
                    t = e.fetchGeneralData,
                    n = e.match
                  t(
                    e.identifier
                      ? ""
                          .concat("https://betafunc.dictybase.local", "/genes/")
                          .concat(n.params.id)
                      : ""
                          .concat(
                            "https://betafunc.dictybase.local",
                            "/genes/name/",
                          )
                          .concat(n.params.id),
                  )
                },
              },
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.match,
                    n = e.general,
                    a = e.goa
                  return n.error || a.error
                    ? l.a.createElement(j.default, null)
                    : n.isFetching || a.isFetching
                    ? l.a.createElement(b.default, null)
                    : l.a.createElement(
                        "div",
                        null,
                        l.a.createElement(
                          u.Helmet,
                          null,
                          l.a.createElement(
                            "title",
                            null,
                            "Gene Ontology Annotations for ",
                            t.params.id,
                            " - dictyBase",
                          ),
                          l.a.createElement("meta", {
                            name: "description",
                            content: "Gene ontology annotations for ".concat(
                              t.params.id,
                              " at dictyBase",
                            ),
                          }),
                        ),
                        n.data &&
                          l.a.createElement(E.default, {
                            name: n.data.data.attributes.geneName,
                          }),
                        l.a.createElement(
                          f.a,
                          { position: "static" },
                          l.a.createElement(
                            h.a,
                            { value: "goa", onChange: this.handleChange },
                            l.a.createElement(g.a, {
                              value: "summary",
                              label: "Gene Summary",
                              component: p.a,
                              to: "/".concat(t.params.id),
                            }),
                            n.data && this.generateTabs(n.data, t.params.id),
                          ),
                        ),
                        l.a.createElement(
                          _.default,
                          null,
                          l.a.createElement(y.default, null),
                        ),
                      )
                },
              },
            ]),
            t
          )
        })(s.Component)
      t.default = Object(d.g)(
        Object(m.a)(
          function(e) {
            return { general: e.general, goa: e.goa }
          },
          { fetchGeneralData: x.b, changeTab: x.a },
        )(v),
      )
    },
    201: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(7),
        o = n(1099)
      t.default = Object(i.a)(function(e) {
        return { message: { backgroundColor: "#cc0000" } }
      })(function(e) {
        var t = e.classes,
          n = e.error
        return r.a.createElement(
          "center",
          null,
          r.a.createElement(o.a, { className: t.message, message: n }),
          r.a.createElement("br", null),
          r.a.createElement("br", null),
        )
      })
    },
    202: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(7),
        o = n(18),
        c = n(212),
        s = n(73),
        l = n.n(s),
        u = n(93),
        p = n.n(u)
      t.default = Object(i.a)(function(e) {
        return {
          container: {
            backgroundColor: "#eff8fb",
            textAlign: "center",
            paddingTop: 30,
            paddingBottom: 30,
            marginBottom: 30,
            borderRadius: 5,
          },
          button: { width: "25%", textTransform: "none" },
          mainGrid: { marginTop: "40px" },
          paragraph: { paddingLeft: "10px", paddingRight: "10px" },
          routerLink: { color: "#428bca", textDecoration: "none" },
        }
      })(function(e) {
        var t = e.classes
        return r.a.createElement(
          o.a,
          { container: !0, className: t.mainGrid, justify: "center" },
          r.a.createElement(
            o.a,
            { item: !0, xs: 10, md: 8 },
            r.a.createElement(
              "div",
              { className: t.container },
              r.a.createElement("img", { src: p.a, alt: "Sad Dicty Logo" }),
              r.a.createElement(
                "h1",
                null,
                r.a.createElement(l.a, { name: "wrench" }),
                " Content Not Ready",
              ),
              r.a.createElement(
                "p",
                { className: t.paragraph },
                "This page is not ready yet.",
              ),
              r.a.createElement(
                "p",
                { className: t.paragraph },
                "We are constantly adding content to our new website so check back soon!",
              ),
              r.a.createElement(
                "a",
                { href: "/", className: t.routerLink },
                r.a.createElement(
                  c.a,
                  {
                    className: t.button,
                    size: "small",
                    variant: "contained",
                    color: "primary",
                  },
                  "Back to homepage",
                ),
              ),
            ),
          ),
        )
      })
    },
    203: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(80),
        o = n(24),
        c = n(14),
        s = n(7),
        l = n(65),
        u = n(197),
        p = n(139),
        d = n(115),
        m = n(198),
        f = n(66),
        h = n(140),
        g = n(126),
        y = Object(i.b)(
          c.g,
          Object(o.a)(function(e) {
            return { auth: e.auth }
          }, null),
          Object(s.a)(g.a),
        )
      t.default = y(function(e) {
        var t = e.auth,
          n = e.classes
        return r.a.createElement(
          "div",
          { className: n.body },
          t.isAuthenticated
            ? r.a.createElement(l.b, { items: f.c }, function(e) {
                return e.map(f.a)
              })
            : r.a.createElement(l.b, { items: f.b }, function(e) {
                return e.map(f.a)
              }),
          r.a.createElement(u.Navbar, { theme: g.b, items: m.a }),
          r.a.createElement(
            "main",
            { className: n.main },
            r.a.createElement(
              p.default,
              null,
              r.a.createElement(h.default, null),
            ),
          ),
          r.a.createElement(l.a, { items: d.a }),
        )
      })
    },
    205: function(e, t, n) {
      "use strict"
      var a,
        r,
        i,
        o = n(20),
        c = n.n(o),
        s = n(42),
        l = n(1128),
        u = n(375),
        p = n.n(u),
        d = n(147)
      "".concat("https://betafunc.dictybase.local").concat("/contents/slug"),
        "".concat("https://betafunc.dictybase.local").concat("/contents"),
        (a = "".concat("https://betafunc.dictybase.local").concat("/users")),
        "".concat("https://betafunc.dictybase.local").concat("/users/email"),
        (r = "".concat("https://betafunc.dictybase.local").concat("/roles")),
        "".concat("https://betafunc.dictybase.local").concat("/permissions"),
        (i = "".concat("https://betatoken.dictybase.local").concat("/tokens"))
      var m = { headers: { "content-type": "application/vnd.api+json" } },
        f = n(26),
        h = n(17)
      n.d(t, "b", function() {
        return k
      }),
        n.d(t, "a", function() {
          return T
        })
      var g = function(e) {
          var t = e.query,
            n = e.provider,
            a = e.url,
            r = p.a.parse(t.replace("?", "")),
            o = "client_id=".concat(d.a[n].clientId, "&redirect_url=").concat(a)
          return (
            (o += "&state=".concat(r.state, "&code=").concat(r.code)),
            {
              config: {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: (o += "&scopes=".concat(d.a[n].scopes[0])),
              },
              endpoint: "".concat(i, "/").concat(n),
            }
          )
        },
        y = function(e) {
          return { type: h.t, payload: { isFetching: !0, provider: e } }
        },
        b = function(e) {
          var t = e.user,
            n = e.token
          return { type: h.u, payload: { isFetching: !1, token: n, user: t } }
        },
        j = function(e) {
          return { type: h.s, payload: { isFetching: !1, error: e } }
        },
        E = function(e) {
          return { type: h.p, payload: { error: e } }
        },
        _ = function(e) {
          return { type: h.o, payload: { isFetching: !1, json: e } }
        },
        S = function(e) {
          return { type: h.m, payload: { error: e } }
        },
        x = function(e) {
          return { type: h.l, payload: { isFetching: !1, permissions: e } }
        },
        v = function(e) {
          return { type: h.j, payload: { error: e } }
        },
        O = function(e) {
          return (function() {
            var t = Object(s.a)(
              c.a.mark(function t(n) {
                var a, i, o
                return c.a.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            n({ type: h.k, payload: { isFetching: !0 } }),
                            (t.next = 4),
                            fetch(
                              "".concat(r, "/").concat(e, "/permissions"),
                              m,
                            )
                          )
                        case 4:
                          if (
                            ((a = t.sent),
                            !(i = a.headers.get("content-type")) ||
                              !i.includes("application/vnd.api+json"))
                          ) {
                            t.next = 13
                            break
                          }
                          return (t.next = 9), a.json()
                        case 9:
                          ;(o = t.sent),
                            a.ok
                              ? n(x(o))
                              : (n(v(Object(f.a)(a.status, o.errors[0].title))),
                                n(Object(l.a)("/error"))),
                            (t.next = 16)
                          break
                        case 13:
                          n(v(Object(f.a)(a.status, a.statusText))),
                            n(Object(l.a)("/error"))
                        case 16:
                          t.next = 23
                          break
                        case 18:
                          ;(t.prev = 18),
                            (t.t0 = t.catch(0)),
                            n(E(Object(f.a)(t.t0.name, t.t0.message))),
                            n(Object(l.a)("/error"))
                        case 23:
                        case "end":
                          return t.stop()
                      }
                  },
                  t,
                  null,
                  [[0, 18]],
                )
              }),
            )
            return function(e) {
              return t.apply(this, arguments)
            }
          })()
        },
        w = function(e) {
          return (function() {
            var t = Object(s.a)(
              c.a.mark(function t(n) {
                var r, i, o
                return c.a.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            n({ type: h.n, payload: { isFetching: !0 } }),
                            (t.next = 4),
                            fetch("".concat(a, "/").concat(e, "/roles"), m)
                          )
                        case 4:
                          if (
                            ((r = t.sent),
                            !(i = r.headers.get("content-type")) ||
                              !i.includes("application/vnd.api+json"))
                          ) {
                            t.next = 21
                            break
                          }
                          return (t.next = 9), r.json()
                        case 9:
                          if (((o = t.sent), !r.ok)) {
                            t.next = 17
                            break
                          }
                          if (!o.data) {
                            t.next = 15
                            break
                          }
                          return n(_(o)), (t.next = 15), n(O(o.data[0].id))
                        case 15:
                          t.next = 19
                          break
                        case 17:
                          n(S(Object(f.a)(r.status, o.errors[0].title)))
                        case 19:
                          t.next = 23
                          break
                        case 21:
                          n(S(Object(f.a)(r.status, r.statusText)))
                        case 23:
                          t.next = 29
                          break
                        case 25:
                          ;(t.prev = 25),
                            (t.t0 = t.catch(0)),
                            n(E(Object(f.a)(t.t0.name, t.t0.message)))
                        case 29:
                        case "end":
                          return t.stop()
                      }
                  },
                  t,
                  null,
                  [[0, 25]],
                )
              }),
            )
            return function(e) {
              return t.apply(this, arguments)
            }
          })()
        },
        k = function(e) {
          var t = e.query,
            n = e.provider,
            a = e.url
          return (function() {
            var e = Object(s.a)(
              c.a.mark(function e(r) {
                var i, o, s, u, p, d
                return c.a.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (i = g({ query: t, provider: n, url: a })),
                            (o = i.config),
                            (s = i.endpoint),
                            (e.prev = 1),
                            r(y(n)),
                            r(Object(l.a)("/load/auth")),
                            (e.next = 6),
                            fetch(s, o)
                          )
                        case 6:
                          if (
                            ((u = e.sent),
                            !(p = u.headers.get("content-type")) ||
                              !p.includes("application/vnd.api+json"))
                          ) {
                            e.next = 22
                            break
                          }
                          if (!u.ok) {
                            e.next = 19
                            break
                          }
                          return (e.next = 12), u.json()
                        case 12:
                          return (
                            (d = e.sent),
                            r(b(d)),
                            (e.next = 16),
                            r(w(d.user.data.id))
                          )
                        case 16:
                          r(Object(l.a)("/")), (e.next = 20)
                          break
                        case 19:
                          401 === u.status
                            ? (r(
                                j(
                                  "You are not an authorized user of dictyBase.\n              Please sign in with proper credentials.",
                                ),
                              ),
                              r(Object(l.a)("/login")))
                            : (r(j(Object(f.a)(u.status, u.statusText))),
                              r(Object(l.a)("/error")))
                        case 20:
                          e.next = 25
                          break
                        case 22:
                          r(j(Object(f.a)(u.status, u.statusText))),
                            r(Object(l.a)("/error"))
                        case 25:
                          e.next = 31
                          break
                        case 27:
                          ;(e.prev = 27),
                            (e.t0 = e.catch(1)),
                            r(j(Object(f.a)(e.t0.name, e.t0.message))),
                            r(Object(l.a)("/error"))
                        case 31:
                        case "end":
                          return e.stop()
                      }
                  },
                  e,
                  null,
                  [[1, 27]],
                )
              }),
            )
            return function(t) {
              return e.apply(this, arguments)
            }
          })()
        },
        T = function() {
          return function(e) {
            e({ type: h.v, payload: { isFetching: !1 } })
          }
        }
    },
    206: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(116),
        p = n(31),
        d = n(14),
        m = n(80),
        f = n(24),
        h = n(129),
        g = n(130),
        y = n(43),
        b = n(18),
        j = n(84),
        E = n(71),
        _ = n(63),
        S = n(141),
        x = n(259),
        v = n(99),
        O = n(64),
        w = {
          general: { title: "General Information", component: O.default },
          genomic: { title: "Genomic Information", component: O.default },
          protein: { title: "Gene Product Information", component: O.default },
          goa: {
            title: "Latest Gene Ontology Annotations",
            component: O.default,
            route: "goannotations",
          },
          dbxrefs: { title: "Links", component: O.default },
          summary: { title: "Summary", component: O.default },
          publication: { title: "Latest References", component: O.default },
        },
        k = n(127)
      n.d(t, "SummaryContainer", function() {
        return T
      })
      var T = (function(e) {
          function t() {
            var e, n
            Object(a.a)(this, t)
            for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
              c[s] = arguments[s]
            return (
              ((n = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
              )).handleChange = function(e, t) {
                ;(0, n.props.changeTab)(t)
              }),
              (n.generateTabs = function(e, t) {
                return e.data.attributes.group.map(function(e, n) {
                  return v.a[e]
                    ? "goa" === e
                      ? l.a.createElement(y.a, {
                          value: e,
                          label: v.a[e],
                          key: n,
                          component: p.a,
                          to: "/".concat(t, "/goannotations"),
                        })
                      : l.a.createElement(y.a, {
                          value: e,
                          label: v.a[e],
                          key: n,
                          component: p.a,
                          to: "/".concat(t, "/").concat(e),
                        })
                    : l.a.createElement(
                        "div",
                        null,
                        "Error: data not mapped to tab",
                      )
                })
              }),
              (n.generatePanels = function(e, t) {
                return e.data.attributes.subgroup.map(function(e, a) {
                  if (!w[e])
                    return l.a.createElement(
                      j.default,
                      { key: a, title: "Error" },
                      "Error: data not mapped to tab",
                    )
                  var r = w[e].title,
                    i = w[e].component,
                    o = w[e].route
                  return l.a.createElement(
                    j.default,
                    { key: a, title: r, route: "/".concat(t, "/").concat(o) },
                    l.a.createElement(i, { panelData: n.props[e] }),
                  )
                })
              }),
              n
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  var e = this.props,
                    t = e.fetchGeneralData,
                    n = e.match
                  t(
                    e.identifier
                      ? ""
                          .concat("https://betafunc.dictybase.local", "/genes/")
                          .concat(n.params.id)
                      : ""
                          .concat(
                            "https://betafunc.dictybase.local",
                            "/genes/name/",
                          )
                          .concat(n.params.id),
                  )
                },
              },
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.match,
                    n = e.general,
                    a = e.goa
                  return n.error || a.error
                    ? l.a.createElement(S.default, null)
                    : n.isFetching || a.isFetching
                    ? l.a.createElement(x.default, null)
                    : l.a.createElement(
                        b.a,
                        { container: !0, justify: "center" },
                        l.a.createElement(
                          u.Helmet,
                          null,
                          l.a.createElement(
                            "title",
                            null,
                            "Gene Information for ",
                            t.params.id,
                            " - dictyBase",
                          ),
                          l.a.createElement("meta", {
                            name: "description",
                            content: "Gene information for ".concat(
                              t.params.id,
                              " at dictyBase",
                            ),
                          }),
                        ),
                        l.a.createElement(
                          b.a,
                          { item: !0, xs: 12 },
                          n.data &&
                            l.a.createElement(E.default, {
                              name: n.data.data.attributes.geneName,
                            }),
                          l.a.createElement(
                            h.a,
                            { position: "static" },
                            l.a.createElement(
                              g.a,
                              {
                                value: n.currentTab,
                                onChange: this.handleChange,
                              },
                              l.a.createElement(y.a, {
                                value: "summary",
                                label: "Gene Summary",
                                component: p.a,
                                to: "/".concat(t.params.id),
                              }),
                              n.data && this.generateTabs(n.data, t.params.id),
                            ),
                          ),
                          l.a.createElement(
                            _.default,
                            null,
                            n.data &&
                              a.data &&
                              this.generatePanels(n.data, t.params.id),
                          ),
                        ),
                      )
                },
              },
            ]),
            t
          )
        })(s.Component),
        C = Object(m.b)(
          d.g,
          Object(f.a)(
            function(e) {
              return { general: e.general, goa: e.goa }
            },
            { fetchGeneralData: k.b, changeTab: k.a },
          ),
        )
      t.default = C(T)
    },
    258: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(31),
        o = n(116),
        c = n(144)
      t.default = function() {
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(
            o.Helmet,
            null,
            r.a.createElement("title", null, "dictyBase Genomes"),
            r.a.createElement("meta", {
              name: "description",
              content: "dictyBase gene page examples",
            }),
          ),
          r.a.createElement(
            "center",
            null,
            r.a.createElement("h1", null, "Genomes"),
            r.a.createElement("div", null, "Example genome pages:"),
            c.default
              .filter(function(e) {
                return "regular" === e.type
              })
              .map(function(e, t) {
                return r.a.createElement(
                  "p",
                  { key: t },
                  r.a.createElement(i.a, { to: "/".concat(e.id) }, e.id),
                )
              }),
            r.a.createElement("div", null, "Complex examples:"),
            c.default
              .filter(function(e) {
                return "complex" === e.type
              })
              .map(function(e, t) {
                return r.a.createElement(
                  "p",
                  { key: t },
                  r.a.createElement(i.a, { to: "/".concat(e.id) }, e.id),
                )
              }),
            r.a.createElement("div", null, "Gene name examples:"),
            c.default
              .filter(function(e) {
                return "name" === e.type
              })
              .map(function(e, t) {
                return r.a.createElement(
                  "p",
                  { key: t },
                  r.a.createElement(i.a, { to: "/".concat(e.id) }, e.id),
                )
              }),
          ),
        )
      }
    },
    259: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(59),
        o = n.n(i),
        c = n(129),
        s = n(130),
        l = n(43),
        u = n(71)
      t.default = function() {
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(u.default, null),
          r.a.createElement(
            c.a,
            { position: "static" },
            r.a.createElement(
              s.a,
              { value: "summary" },
              r.a.createElement(l.a, { label: "Gene Summary" }),
              r.a.createElement(l.a, { label: "Gene Ontology" }),
            ),
          ),
          r.a.createElement(
            i.SkeletonTheme,
            { color: "#d1d1d1" },
            r.a.createElement(o.a, { count: 10 }),
          ),
        )
      }
    },
    26: function(e, t, n) {
      "use strict"
      n.d(t, "a", function() {
        return a
      })
      var a = function(e, t) {
        return { status: e, title: t }
      }
    },
    260: function(e, t, n) {
      "use strict"
      n.r(t),
        n.d(t, "OntologyTabContainer", function() {
          return S
        })
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(24),
        p = n(59),
        d = n.n(p),
        m = n(129),
        f = n(130),
        h = n(43),
        g = n(211),
        y = n(378),
        b = n(63),
        j = n(94),
        E = n(95),
        _ = Object(g.a)({
          overrides: {
            MuiTab: { root: { textTransform: "none" } },
            MuiTabs: {
              root: { backgroundColor: "#e6f2ff", color: "#000" },
              indicator: { backgroundColor: "#858780", height: "3px" },
            },
          },
        }),
        S = (function(e) {
          function t() {
            var e, n
            Object(a.a)(this, t)
            for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
              c[s] = arguments[s]
            return (
              ((n = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
              )).handleChange = function(e, t) {
                ;(0, n.props.changeTab)(t)
              }),
              n
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.props.goa
                  if (e.data) {
                    var t = e.data,
                      n = t.filter(function(e) {
                        return (
                          "IMP" === e.attributes.evidence_code ||
                          "IGI" === e.attributes.evidence_code ||
                          "IDA" === e.attributes.evidence_code ||
                          "IPI" === e.attributes.evidence_code ||
                          "IEP" === e.attributes.evidence_code ||
                          "EXP" === e.attributes.evidence_code
                        )
                      }),
                      a = t.filter(function(e) {
                        return "IEA" !== e.attributes.evidence_code
                      }),
                      r = t.filter(function(e) {
                        return "IEA" === e.attributes.evidence_code
                      })
                    return l.a.createElement(
                      y.a,
                      { theme: _ },
                      l.a.createElement(
                        m.a,
                        { position: "static" },
                        l.a.createElement(
                          f.a,
                          { value: e.currentTab, onChange: this.handleChange },
                          l.a.createElement(h.a, {
                            value: "all",
                            label: "All GO",
                          }),
                          n.length > 0 &&
                            l.a.createElement(h.a, {
                              value: "experimental",
                              label: "Experimental GO",
                            }),
                          a.length > 0 &&
                            l.a.createElement(h.a, {
                              value: "manual",
                              label: "Manual GO",
                            }),
                          r.length > 0 &&
                            l.a.createElement(h.a, {
                              value: "electronic",
                              label: "Electronic GO",
                            }),
                        ),
                      ),
                      "all" === e.currentTab &&
                        l.a.createElement(
                          b.default,
                          null,
                          l.a.createElement(j.default, { goaData: t }),
                        ),
                      "experimental" === e.currentTab &&
                        l.a.createElement(
                          b.default,
                          null,
                          l.a.createElement(j.default, { goaData: n }),
                        ),
                      "manual" === e.currentTab &&
                        l.a.createElement(
                          b.default,
                          null,
                          l.a.createElement(j.default, { goaData: a }),
                        ),
                      "electronic" === e.currentTab &&
                        l.a.createElement(
                          b.default,
                          null,
                          l.a.createElement(j.default, { goaData: r }),
                        ),
                    )
                  }
                  return l.a.createElement(
                    "div",
                    null,
                    l.a.createElement(
                      m.a,
                      { position: "static" },
                      l.a.createElement(f.a, { value: e.currentTab }),
                    ),
                    l.a.createElement(
                      p.SkeletonTheme,
                      { color: "#d1d1d1" },
                      l.a.createElement(d.a, { count: 10 }),
                    ),
                  )
                },
              },
            ]),
            t
          )
        })(s.Component)
      t.default = Object(u.a)(
        function(e) {
          return { goa: e.goa }
        },
        { changeTab: E.a },
      )(S)
    },
    261: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(7),
        p = n(1094),
        d = n(1095),
        m = n(1096),
        f = n(1102),
        h = n(82),
        g = [
          { id: "qualifier", label: "Qualifier + GO Term" },
          { id: "extensions", label: "Extensions" },
          { id: "evidence_code", label: "Evidence" },
          { id: "with", label: "With" },
          { id: "publication", label: "Reference" },
          { id: "date", label: "Date" },
          { id: "assigned_by", label: "Source" },
        ],
        y = (function(e) {
          function t() {
            var e, n
            Object(a.a)(this, t)
            for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
              c[s] = arguments[s]
            return (
              ((n = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
              )).createSortHandler = function(e) {
                return function(t) {
                  n.props.onRequestSort(t, e)
                }
              }),
              n
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.props,
                    n = t.order,
                    a = t.orderBy,
                    r = t.classes
                  return l.a.createElement(
                    p.a,
                    { className: r.head },
                    l.a.createElement(
                      d.a,
                      null,
                      g.map(function(t) {
                        return l.a.createElement(
                          m.a,
                          {
                            key: t.id,
                            className: r.headerCell,
                            sortDirection: a === t.id && n,
                          },
                          l.a.createElement(
                            f.a,
                            {
                              active: a === t.id,
                              direction: n,
                              onClick: e.createSortHandler(t.id),
                            },
                            t.label,
                          ),
                        )
                      }, this),
                    ),
                  )
                },
              },
            ]),
            t
          )
        })(s.Component)
      t.default = Object(u.a)(h.a)(y)
    },
    262: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(7),
        o = n(60),
        c = n(82)
      t.default = Object(i.a)(c.a)(function(e) {
        var t = e.extensions,
          n = e.classes
        return null === t
          ? r.a.createElement(a.Fragment, null)
          : r.a.createElement(
              a.Fragment,
              null,
              t.map(function(e, t) {
                return r.a.createElement(
                  a.Fragment,
                  { key: t },
                  r.a.createElement(
                    "span",
                    null,
                    " ",
                    r.a.createElement("em", null, e.relation),
                    " ",
                    !e.name &&
                      r.a.createElement(
                        "a",
                        {
                          className: n.link,
                          href: Object(o.a)(e.id, e.db),
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                        "(",
                        e.db,
                        ":",
                        e.id,
                        ")",
                      ),
                    e.name &&
                      r.a.createElement(
                        "a",
                        {
                          className: n.link,
                          href: Object(o.a)(e.id, e.db, e.name),
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                        "(",
                        e.name,
                        ")",
                      ),
                  ),
                  r.a.createElement("br", null),
                )
              }),
            )
      })
    },
    263: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(7),
        o = n(60),
        c = n(82)
      t.default = Object(i.a)(c.a)(function(e) {
        var t = e.withData,
          n = e.classes
        return null === t
          ? r.a.createElement(a.Fragment, null)
          : r.a.createElement(
              a.Fragment,
              null,
              t.map(function(e, t) {
                return r.a.createElement(
                  a.Fragment,
                  { key: t },
                  r.a.createElement(
                    "span",
                    null,
                    !e.name &&
                      r.a.createElement(
                        "a",
                        {
                          className: n.link,
                          href: Object(o.a)(e.id, e.db),
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                        e.db,
                        ":",
                        e.id,
                      ),
                    e.name &&
                      r.a.createElement(
                        "a",
                        {
                          className: n.link,
                          href: Object(o.a)(e.id, e.db, e.name),
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                        e.name,
                      ),
                  ),
                  r.a.createElement("br", null),
                )
              }),
            )
      })
    },
    264: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(59),
        o = n.n(i),
        c = n(129),
        s = n(130),
        l = n(43),
        u = n(211),
        p = n(378),
        d = n(71),
        m = Object(u.a)({
          overrides: {
            MuiTab: { root: { textTransform: "none" } },
            MuiTabs: { root: { backgroundColor: "#DFE8F6", color: "#000" } },
          },
        })
      t.default = function() {
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(d.default, null),
          r.a.createElement(
            c.a,
            { position: "static" },
            r.a.createElement(
              s.a,
              { value: "goa" },
              r.a.createElement(l.a, { label: "Gene Summary" }),
              r.a.createElement(l.a, { label: "Gene Ontology" }),
            ),
          ),
          r.a.createElement(
            p.a,
            { theme: m },
            r.a.createElement(
              c.a,
              { position: "static" },
              r.a.createElement(
                s.a,
                { value: "goa" },
                r.a.createElement(l.a, { label: "All GO" }),
                r.a.createElement(l.a, { label: "Experimental GO" }),
                r.a.createElement(l.a, { label: "Manual GO" }),
                r.a.createElement(l.a, { label: "Electronic GO" }),
              ),
            ),
          ),
          r.a.createElement(
            i.SkeletonTheme,
            { color: "#d1d1d1" },
            r.a.createElement(o.a, { count: 5 }),
            r.a.createElement("br", null),
            r.a.createElement("br", null),
            r.a.createElement(o.a, { count: 5 }),
            r.a.createElement("br", null),
            r.a.createElement("br", null),
            r.a.createElement(o.a, { count: 5 }),
          ),
        )
      }
    },
    265: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n(24),
        u = n(205),
        p = (function(e) {
          function t() {
            var e, n
            Object(a.a)(this, t)
            for (var r = arguments.length, c = new Array(r), s = 0; s < r; s++)
              c[s] = arguments[s]
            return (
              ((n = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(c)),
              )).onMessage = function(e) {
                e.preventDefault(),
                  e.stopPropagation(),
                  e.data.provider && n.props.oAuthLogin(e.data)
              }),
              n
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  window.addEventListener("message", this.onMessage, !1)
                },
              },
              {
                key: "componentWillUnmount",
                value: function() {
                  window.removeEventListener("message", this.onMessage)
                },
              },
              {
                key: "render",
                value: function() {
                  return null
                },
              },
            ]),
            t
          )
        })(s.Component)
      t.default = Object(l.a)(null, { oAuthLogin: u.b })(p)
    },
    266: function(e, t, n) {
      "use strict"
      n.r(t),
        n.d(t, "default", function() {
          return d
        })
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(18),
        p = function(e) {
          return "" === e || "/" === e
            ? "".concat(window.location.origin)
            : "/" === e.charAt(0)
            ? "".concat(window.location.origin).concat(e)
            : "".concat(window.location.origin, "/").concat(e)
        },
        d = (function(e) {
          function t() {
            return (
              Object(a.a)(this, t),
              Object(i.a)(this, Object(o.a)(t).apply(this, arguments))
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  window.opener.postMessage(
                    {
                      query: this.props.location.search,
                      provider: this.props.match.params.provider,
                      url: ""
                        .concat(p("/gene"))
                        .concat(this.props.location.pathname),
                    },
                    window.location,
                  ),
                    window.close()
                },
              },
              {
                key: "render",
                value: function() {
                  return l.a.createElement(
                    u.a,
                    { container: !0, justify: "center" },
                    l.a.createElement(
                      u.a,
                      { item: !0, xs: 12 },
                      l.a.createElement(
                        "h1",
                        null,
                        "Transferring to login system ........",
                      ),
                    ),
                  )
                },
              },
            ]),
            t
          )
        })(s.Component)
    },
    267: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(18),
        o = n(1100)
      t.default = function() {
        return r.a.createElement(
          i.a,
          { container: !0, justify: "center" },
          r.a.createElement(
            i.a,
            { item: !0, xs: 12 },
            r.a.createElement(
              "center",
              null,
              r.a.createElement("h1", null, "Logging in..."),
              r.a.createElement("br", null),
              r.a.createElement(o.a, { size: 70 }),
            ),
          ),
        )
      }
    },
    268: function(e, t, n) {
      "use strict"
      n.r(t),
        n.d(t, "Logout", function() {
          return m
        })
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(24),
        l = n(14),
        u = n(0),
        p = n.n(u),
        d = n(205),
        m = (function(e) {
          function t() {
            return (
              Object(a.a)(this, t),
              Object(i.a)(this, Object(o.a)(t).apply(this, arguments))
            )
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: "componentWillMount",
                value: function() {
                  this.props.logoutUser()
                },
              },
              {
                key: "render",
                value: function() {
                  return p.a.createElement(l.a, { to: "/" })
                },
              },
            ]),
            t
          )
        })(u.Component)
      t.default = Object(s.a)(null, { logoutUser: d.a })(m)
    },
    269: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(21),
        r = n(8),
        i = n(22),
        o = n(23),
        c = n(25),
        s = n(0),
        l = n.n(s),
        u = n(24)
      t.default = function(e, t, n, p) {
        return function(d) {
          var m = (function(e) {
            function t() {
              return (
                Object(a.a)(this, t),
                Object(i.a)(this, Object(o.a)(t).apply(this, arguments))
              )
            }
            return (
              Object(c.a)(t, e),
              Object(r.a)(t, [
                {
                  key: "componentDidMount",
                  value: function() {
                    ;(0, this.props.action)()
                  },
                },
                {
                  key: "render",
                  value: function() {
                    var e = this.props,
                      t = e.error,
                      a = e.isFetching
                    return t
                      ? p
                        ? l.a.createElement(p, null)
                        : l.a.createElement(
                            "center",
                            null,
                            l.a.createElement("br", null),
                            l.a.createElement(
                              "p",
                              null,
                              l.a.createElement(
                                "strong",
                                null,
                                "Sorry! There was an error loading the items:",
                              ),
                            ),
                            l.a.createElement(
                              "p",
                              null,
                              l.a.createElement("em", null, t.toString()),
                            ),
                          )
                      : a
                      ? n
                        ? l.a.createElement(n, null)
                        : l.a.createElement(
                            "center",
                            null,
                            l.a.createElement("br", null),
                            "Loading ...",
                          )
                      : l.a.createElement(d, this.props)
                  },
                },
              ]),
              t
            )
          })(s.Component)
          return Object(u.a)(
            function(e) {
              return {
                error: e[t].error,
                isFetching: e[t].isFetching,
                data: e[t].data,
              }
            },
            { action: e },
          )(m)
        }
      }
    },
    389: function(e, t, n) {
      e.exports = n(1090)
    },
    563: function(e, t, n) {
      var a = {
        "./Binary_Property/ASCII.js": 564,
        "./Binary_Property/ASCII_Hex_Digit.js": 565,
        "./Binary_Property/Alphabetic.js": 566,
        "./Binary_Property/Any.js": 567,
        "./Binary_Property/Assigned.js": 568,
        "./Binary_Property/Bidi_Control.js": 569,
        "./Binary_Property/Bidi_Mirrored.js": 570,
        "./Binary_Property/Case_Ignorable.js": 571,
        "./Binary_Property/Cased.js": 572,
        "./Binary_Property/Changes_When_Casefolded.js": 573,
        "./Binary_Property/Changes_When_Casemapped.js": 574,
        "./Binary_Property/Changes_When_Lowercased.js": 575,
        "./Binary_Property/Changes_When_NFKC_Casefolded.js": 576,
        "./Binary_Property/Changes_When_Titlecased.js": 577,
        "./Binary_Property/Changes_When_Uppercased.js": 578,
        "./Binary_Property/Dash.js": 579,
        "./Binary_Property/Default_Ignorable_Code_Point.js": 580,
        "./Binary_Property/Deprecated.js": 581,
        "./Binary_Property/Diacritic.js": 582,
        "./Binary_Property/Emoji.js": 583,
        "./Binary_Property/Emoji_Component.js": 584,
        "./Binary_Property/Emoji_Modifier.js": 585,
        "./Binary_Property/Emoji_Modifier_Base.js": 586,
        "./Binary_Property/Emoji_Presentation.js": 587,
        "./Binary_Property/Extended_Pictographic.js": 588,
        "./Binary_Property/Extender.js": 589,
        "./Binary_Property/Grapheme_Base.js": 590,
        "./Binary_Property/Grapheme_Extend.js": 591,
        "./Binary_Property/Hex_Digit.js": 592,
        "./Binary_Property/IDS_Binary_Operator.js": 593,
        "./Binary_Property/IDS_Trinary_Operator.js": 594,
        "./Binary_Property/ID_Continue.js": 595,
        "./Binary_Property/ID_Start.js": 596,
        "./Binary_Property/Ideographic.js": 597,
        "./Binary_Property/Join_Control.js": 598,
        "./Binary_Property/Logical_Order_Exception.js": 599,
        "./Binary_Property/Lowercase.js": 600,
        "./Binary_Property/Math.js": 601,
        "./Binary_Property/Noncharacter_Code_Point.js": 602,
        "./Binary_Property/Pattern_Syntax.js": 603,
        "./Binary_Property/Pattern_White_Space.js": 604,
        "./Binary_Property/Quotation_Mark.js": 605,
        "./Binary_Property/Radical.js": 606,
        "./Binary_Property/Regional_Indicator.js": 607,
        "./Binary_Property/Sentence_Terminal.js": 608,
        "./Binary_Property/Soft_Dotted.js": 609,
        "./Binary_Property/Terminal_Punctuation.js": 610,
        "./Binary_Property/Unified_Ideograph.js": 611,
        "./Binary_Property/Uppercase.js": 612,
        "./Binary_Property/Variation_Selector.js": 613,
        "./Binary_Property/White_Space.js": 614,
        "./Binary_Property/XID_Continue.js": 615,
        "./Binary_Property/XID_Start.js": 616,
        "./General_Category/Cased_Letter.js": 617,
        "./General_Category/Close_Punctuation.js": 618,
        "./General_Category/Connector_Punctuation.js": 619,
        "./General_Category/Control.js": 620,
        "./General_Category/Currency_Symbol.js": 621,
        "./General_Category/Dash_Punctuation.js": 622,
        "./General_Category/Decimal_Number.js": 623,
        "./General_Category/Enclosing_Mark.js": 624,
        "./General_Category/Final_Punctuation.js": 625,
        "./General_Category/Format.js": 626,
        "./General_Category/Initial_Punctuation.js": 627,
        "./General_Category/Letter.js": 628,
        "./General_Category/Letter_Number.js": 629,
        "./General_Category/Line_Separator.js": 630,
        "./General_Category/Lowercase_Letter.js": 631,
        "./General_Category/Mark.js": 632,
        "./General_Category/Math_Symbol.js": 633,
        "./General_Category/Modifier_Letter.js": 634,
        "./General_Category/Modifier_Symbol.js": 635,
        "./General_Category/Nonspacing_Mark.js": 636,
        "./General_Category/Number.js": 637,
        "./General_Category/Open_Punctuation.js": 638,
        "./General_Category/Other.js": 639,
        "./General_Category/Other_Letter.js": 640,
        "./General_Category/Other_Number.js": 641,
        "./General_Category/Other_Punctuation.js": 642,
        "./General_Category/Other_Symbol.js": 643,
        "./General_Category/Paragraph_Separator.js": 644,
        "./General_Category/Private_Use.js": 645,
        "./General_Category/Punctuation.js": 646,
        "./General_Category/Separator.js": 647,
        "./General_Category/Space_Separator.js": 648,
        "./General_Category/Spacing_Mark.js": 649,
        "./General_Category/Surrogate.js": 650,
        "./General_Category/Symbol.js": 651,
        "./General_Category/Titlecase_Letter.js": 652,
        "./General_Category/Unassigned.js": 653,
        "./General_Category/Uppercase_Letter.js": 654,
        "./Script/Adlam.js": 655,
        "./Script/Ahom.js": 656,
        "./Script/Anatolian_Hieroglyphs.js": 657,
        "./Script/Arabic.js": 658,
        "./Script/Armenian.js": 659,
        "./Script/Avestan.js": 660,
        "./Script/Balinese.js": 661,
        "./Script/Bamum.js": 662,
        "./Script/Bassa_Vah.js": 663,
        "./Script/Batak.js": 664,
        "./Script/Bengali.js": 665,
        "./Script/Bhaiksuki.js": 666,
        "./Script/Bopomofo.js": 667,
        "./Script/Brahmi.js": 668,
        "./Script/Braille.js": 669,
        "./Script/Buginese.js": 670,
        "./Script/Buhid.js": 671,
        "./Script/Canadian_Aboriginal.js": 672,
        "./Script/Carian.js": 673,
        "./Script/Caucasian_Albanian.js": 674,
        "./Script/Chakma.js": 675,
        "./Script/Cham.js": 676,
        "./Script/Cherokee.js": 677,
        "./Script/Common.js": 678,
        "./Script/Coptic.js": 679,
        "./Script/Cuneiform.js": 680,
        "./Script/Cypriot.js": 681,
        "./Script/Cyrillic.js": 682,
        "./Script/Deseret.js": 683,
        "./Script/Devanagari.js": 684,
        "./Script/Dogra.js": 685,
        "./Script/Duployan.js": 686,
        "./Script/Egyptian_Hieroglyphs.js": 687,
        "./Script/Elbasan.js": 688,
        "./Script/Elymaic.js": 689,
        "./Script/Ethiopic.js": 690,
        "./Script/Georgian.js": 691,
        "./Script/Glagolitic.js": 692,
        "./Script/Gothic.js": 693,
        "./Script/Grantha.js": 694,
        "./Script/Greek.js": 695,
        "./Script/Gujarati.js": 696,
        "./Script/Gunjala_Gondi.js": 697,
        "./Script/Gurmukhi.js": 698,
        "./Script/Han.js": 699,
        "./Script/Hangul.js": 700,
        "./Script/Hanifi_Rohingya.js": 701,
        "./Script/Hanunoo.js": 702,
        "./Script/Hatran.js": 703,
        "./Script/Hebrew.js": 704,
        "./Script/Hiragana.js": 705,
        "./Script/Imperial_Aramaic.js": 706,
        "./Script/Inherited.js": 707,
        "./Script/Inscriptional_Pahlavi.js": 708,
        "./Script/Inscriptional_Parthian.js": 709,
        "./Script/Javanese.js": 710,
        "./Script/Kaithi.js": 711,
        "./Script/Kannada.js": 712,
        "./Script/Katakana.js": 713,
        "./Script/Kayah_Li.js": 714,
        "./Script/Kharoshthi.js": 715,
        "./Script/Khmer.js": 716,
        "./Script/Khojki.js": 717,
        "./Script/Khudawadi.js": 718,
        "./Script/Lao.js": 719,
        "./Script/Latin.js": 720,
        "./Script/Lepcha.js": 721,
        "./Script/Limbu.js": 722,
        "./Script/Linear_A.js": 723,
        "./Script/Linear_B.js": 724,
        "./Script/Lisu.js": 725,
        "./Script/Lycian.js": 726,
        "./Script/Lydian.js": 727,
        "./Script/Mahajani.js": 728,
        "./Script/Makasar.js": 729,
        "./Script/Malayalam.js": 730,
        "./Script/Mandaic.js": 731,
        "./Script/Manichaean.js": 732,
        "./Script/Marchen.js": 733,
        "./Script/Masaram_Gondi.js": 734,
        "./Script/Medefaidrin.js": 735,
        "./Script/Meetei_Mayek.js": 736,
        "./Script/Mende_Kikakui.js": 737,
        "./Script/Meroitic_Cursive.js": 738,
        "./Script/Meroitic_Hieroglyphs.js": 739,
        "./Script/Miao.js": 740,
        "./Script/Modi.js": 741,
        "./Script/Mongolian.js": 742,
        "./Script/Mro.js": 743,
        "./Script/Multani.js": 744,
        "./Script/Myanmar.js": 745,
        "./Script/Nabataean.js": 746,
        "./Script/Nandinagari.js": 747,
        "./Script/New_Tai_Lue.js": 748,
        "./Script/Newa.js": 749,
        "./Script/Nko.js": 750,
        "./Script/Nushu.js": 751,
        "./Script/Nyiakeng_Puachue_Hmong.js": 752,
        "./Script/Ogham.js": 753,
        "./Script/Ol_Chiki.js": 754,
        "./Script/Old_Hungarian.js": 755,
        "./Script/Old_Italic.js": 756,
        "./Script/Old_North_Arabian.js": 757,
        "./Script/Old_Permic.js": 758,
        "./Script/Old_Persian.js": 759,
        "./Script/Old_Sogdian.js": 760,
        "./Script/Old_South_Arabian.js": 761,
        "./Script/Old_Turkic.js": 762,
        "./Script/Oriya.js": 763,
        "./Script/Osage.js": 764,
        "./Script/Osmanya.js": 765,
        "./Script/Pahawh_Hmong.js": 766,
        "./Script/Palmyrene.js": 767,
        "./Script/Pau_Cin_Hau.js": 768,
        "./Script/Phags_Pa.js": 769,
        "./Script/Phoenician.js": 770,
        "./Script/Psalter_Pahlavi.js": 771,
        "./Script/Rejang.js": 772,
        "./Script/Runic.js": 773,
        "./Script/Samaritan.js": 774,
        "./Script/Saurashtra.js": 775,
        "./Script/Sharada.js": 776,
        "./Script/Shavian.js": 777,
        "./Script/Siddham.js": 778,
        "./Script/SignWriting.js": 779,
        "./Script/Sinhala.js": 780,
        "./Script/Sogdian.js": 781,
        "./Script/Sora_Sompeng.js": 782,
        "./Script/Soyombo.js": 783,
        "./Script/Sundanese.js": 784,
        "./Script/Syloti_Nagri.js": 785,
        "./Script/Syriac.js": 786,
        "./Script/Tagalog.js": 787,
        "./Script/Tagbanwa.js": 788,
        "./Script/Tai_Le.js": 789,
        "./Script/Tai_Tham.js": 790,
        "./Script/Tai_Viet.js": 791,
        "./Script/Takri.js": 792,
        "./Script/Tamil.js": 793,
        "./Script/Tangut.js": 794,
        "./Script/Telugu.js": 795,
        "./Script/Thaana.js": 796,
        "./Script/Thai.js": 797,
        "./Script/Tibetan.js": 798,
        "./Script/Tifinagh.js": 799,
        "./Script/Tirhuta.js": 800,
        "./Script/Ugaritic.js": 801,
        "./Script/Vai.js": 802,
        "./Script/Wancho.js": 803,
        "./Script/Warang_Citi.js": 804,
        "./Script/Yi.js": 805,
        "./Script/Zanabazar_Square.js": 806,
        "./Script_Extensions/Adlam.js": 807,
        "./Script_Extensions/Ahom.js": 808,
        "./Script_Extensions/Anatolian_Hieroglyphs.js": 809,
        "./Script_Extensions/Arabic.js": 810,
        "./Script_Extensions/Armenian.js": 811,
        "./Script_Extensions/Avestan.js": 812,
        "./Script_Extensions/Balinese.js": 813,
        "./Script_Extensions/Bamum.js": 814,
        "./Script_Extensions/Bassa_Vah.js": 815,
        "./Script_Extensions/Batak.js": 816,
        "./Script_Extensions/Bengali.js": 817,
        "./Script_Extensions/Bhaiksuki.js": 818,
        "./Script_Extensions/Bopomofo.js": 819,
        "./Script_Extensions/Brahmi.js": 820,
        "./Script_Extensions/Braille.js": 821,
        "./Script_Extensions/Buginese.js": 822,
        "./Script_Extensions/Buhid.js": 823,
        "./Script_Extensions/Canadian_Aboriginal.js": 824,
        "./Script_Extensions/Carian.js": 825,
        "./Script_Extensions/Caucasian_Albanian.js": 826,
        "./Script_Extensions/Chakma.js": 827,
        "./Script_Extensions/Cham.js": 828,
        "./Script_Extensions/Cherokee.js": 829,
        "./Script_Extensions/Common.js": 830,
        "./Script_Extensions/Coptic.js": 831,
        "./Script_Extensions/Cuneiform.js": 832,
        "./Script_Extensions/Cypriot.js": 833,
        "./Script_Extensions/Cyrillic.js": 834,
        "./Script_Extensions/Deseret.js": 835,
        "./Script_Extensions/Devanagari.js": 836,
        "./Script_Extensions/Dogra.js": 837,
        "./Script_Extensions/Duployan.js": 838,
        "./Script_Extensions/Egyptian_Hieroglyphs.js": 839,
        "./Script_Extensions/Elbasan.js": 840,
        "./Script_Extensions/Elymaic.js": 841,
        "./Script_Extensions/Ethiopic.js": 842,
        "./Script_Extensions/Georgian.js": 843,
        "./Script_Extensions/Glagolitic.js": 844,
        "./Script_Extensions/Gothic.js": 845,
        "./Script_Extensions/Grantha.js": 846,
        "./Script_Extensions/Greek.js": 847,
        "./Script_Extensions/Gujarati.js": 848,
        "./Script_Extensions/Gunjala_Gondi.js": 849,
        "./Script_Extensions/Gurmukhi.js": 850,
        "./Script_Extensions/Han.js": 851,
        "./Script_Extensions/Hangul.js": 852,
        "./Script_Extensions/Hanifi_Rohingya.js": 853,
        "./Script_Extensions/Hanunoo.js": 854,
        "./Script_Extensions/Hatran.js": 855,
        "./Script_Extensions/Hebrew.js": 856,
        "./Script_Extensions/Hiragana.js": 857,
        "./Script_Extensions/Imperial_Aramaic.js": 858,
        "./Script_Extensions/Inherited.js": 859,
        "./Script_Extensions/Inscriptional_Pahlavi.js": 860,
        "./Script_Extensions/Inscriptional_Parthian.js": 861,
        "./Script_Extensions/Javanese.js": 862,
        "./Script_Extensions/Kaithi.js": 863,
        "./Script_Extensions/Kannada.js": 864,
        "./Script_Extensions/Katakana.js": 865,
        "./Script_Extensions/Kayah_Li.js": 866,
        "./Script_Extensions/Kharoshthi.js": 867,
        "./Script_Extensions/Khmer.js": 868,
        "./Script_Extensions/Khojki.js": 869,
        "./Script_Extensions/Khudawadi.js": 870,
        "./Script_Extensions/Lao.js": 871,
        "./Script_Extensions/Latin.js": 872,
        "./Script_Extensions/Lepcha.js": 873,
        "./Script_Extensions/Limbu.js": 874,
        "./Script_Extensions/Linear_A.js": 875,
        "./Script_Extensions/Linear_B.js": 876,
        "./Script_Extensions/Lisu.js": 877,
        "./Script_Extensions/Lycian.js": 878,
        "./Script_Extensions/Lydian.js": 879,
        "./Script_Extensions/Mahajani.js": 880,
        "./Script_Extensions/Makasar.js": 881,
        "./Script_Extensions/Malayalam.js": 882,
        "./Script_Extensions/Mandaic.js": 883,
        "./Script_Extensions/Manichaean.js": 884,
        "./Script_Extensions/Marchen.js": 885,
        "./Script_Extensions/Masaram_Gondi.js": 886,
        "./Script_Extensions/Medefaidrin.js": 887,
        "./Script_Extensions/Meetei_Mayek.js": 888,
        "./Script_Extensions/Mende_Kikakui.js": 889,
        "./Script_Extensions/Meroitic_Cursive.js": 890,
        "./Script_Extensions/Meroitic_Hieroglyphs.js": 891,
        "./Script_Extensions/Miao.js": 892,
        "./Script_Extensions/Modi.js": 893,
        "./Script_Extensions/Mongolian.js": 894,
        "./Script_Extensions/Mro.js": 895,
        "./Script_Extensions/Multani.js": 896,
        "./Script_Extensions/Myanmar.js": 897,
        "./Script_Extensions/Nabataean.js": 898,
        "./Script_Extensions/Nandinagari.js": 899,
        "./Script_Extensions/New_Tai_Lue.js": 900,
        "./Script_Extensions/Newa.js": 901,
        "./Script_Extensions/Nko.js": 902,
        "./Script_Extensions/Nushu.js": 903,
        "./Script_Extensions/Nyiakeng_Puachue_Hmong.js": 904,
        "./Script_Extensions/Ogham.js": 905,
        "./Script_Extensions/Ol_Chiki.js": 906,
        "./Script_Extensions/Old_Hungarian.js": 907,
        "./Script_Extensions/Old_Italic.js": 908,
        "./Script_Extensions/Old_North_Arabian.js": 909,
        "./Script_Extensions/Old_Permic.js": 910,
        "./Script_Extensions/Old_Persian.js": 911,
        "./Script_Extensions/Old_Sogdian.js": 912,
        "./Script_Extensions/Old_South_Arabian.js": 913,
        "./Script_Extensions/Old_Turkic.js": 914,
        "./Script_Extensions/Oriya.js": 915,
        "./Script_Extensions/Osage.js": 916,
        "./Script_Extensions/Osmanya.js": 917,
        "./Script_Extensions/Pahawh_Hmong.js": 918,
        "./Script_Extensions/Palmyrene.js": 919,
        "./Script_Extensions/Pau_Cin_Hau.js": 920,
        "./Script_Extensions/Phags_Pa.js": 921,
        "./Script_Extensions/Phoenician.js": 922,
        "./Script_Extensions/Psalter_Pahlavi.js": 923,
        "./Script_Extensions/Rejang.js": 924,
        "./Script_Extensions/Runic.js": 925,
        "./Script_Extensions/Samaritan.js": 926,
        "./Script_Extensions/Saurashtra.js": 927,
        "./Script_Extensions/Sharada.js": 928,
        "./Script_Extensions/Shavian.js": 929,
        "./Script_Extensions/Siddham.js": 930,
        "./Script_Extensions/SignWriting.js": 931,
        "./Script_Extensions/Sinhala.js": 932,
        "./Script_Extensions/Sogdian.js": 933,
        "./Script_Extensions/Sora_Sompeng.js": 934,
        "./Script_Extensions/Soyombo.js": 935,
        "./Script_Extensions/Sundanese.js": 936,
        "./Script_Extensions/Syloti_Nagri.js": 937,
        "./Script_Extensions/Syriac.js": 938,
        "./Script_Extensions/Tagalog.js": 939,
        "./Script_Extensions/Tagbanwa.js": 940,
        "./Script_Extensions/Tai_Le.js": 941,
        "./Script_Extensions/Tai_Tham.js": 942,
        "./Script_Extensions/Tai_Viet.js": 943,
        "./Script_Extensions/Takri.js": 944,
        "./Script_Extensions/Tamil.js": 945,
        "./Script_Extensions/Tangut.js": 946,
        "./Script_Extensions/Telugu.js": 947,
        "./Script_Extensions/Thaana.js": 948,
        "./Script_Extensions/Thai.js": 949,
        "./Script_Extensions/Tibetan.js": 950,
        "./Script_Extensions/Tifinagh.js": 951,
        "./Script_Extensions/Tirhuta.js": 952,
        "./Script_Extensions/Ugaritic.js": 953,
        "./Script_Extensions/Vai.js": 954,
        "./Script_Extensions/Wancho.js": 955,
        "./Script_Extensions/Warang_Citi.js": 956,
        "./Script_Extensions/Yi.js": 957,
        "./Script_Extensions/Zanabazar_Square.js": 958,
        "./index.js": 959,
        "./unicode-version.js": 960,
      }
      function r(e) {
        var t = i(e)
        return n(t)
      }
      function i(e) {
        if (!n.o(a, e)) {
          var t = new Error("Cannot find module '" + e + "'")
          throw ((t.code = "MODULE_NOT_FOUND"), t)
        }
        return a[e]
      }
      ;(r.keys = function() {
        return Object.keys(a)
      }),
        (r.resolve = i),
        (e.exports = r),
        (r.id = 563)
    },
    60: function(e, t, n) {
      "use strict"
      t.a = function(e, t, n) {
        if (void 0 === e) return "#"
        if (n)
          return n.includes(" ")
            ? "https://www.ebi.ac.uk/QuickGO/term/GO:".concat(e)
            : n.match(/^([A-Z0-9]*$)/)
            ? "https://www.uniprot.org/uniprot/".concat(e)
            : "https://testdb.dictybase.org/gene/".concat(n)
        switch (t) {
          case "CHEBI":
            return "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:".concat(
              e,
            )
          case "DDB":
          case "dictyBase":
            return "https://testdb.dictybase.org/gene/".concat(e)
          case "FB":
            return "http://flybase.org/reports/".concat(e, ".html")
          case "GO":
            return "https://www.ebi.ac.uk/QuickGO/term/GO:".concat(e)
          case "InterPro":
            return "http://www.ebi.ac.uk/interpro/entry/".concat(e)
          case "MGI":
            return "http://www.informatics.jax.org/marker/".concat(e)
          case "PANTHER":
            return "http://www.pantree.org/node/annotationNode.jsp?id=".concat(
              e,
            )
          case "PomBase":
            return "https://www.pombase.org/spombe/result/".concat(e)
          case "RGD":
            return "https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=".concat(
              e,
            )
          case "SGD":
            return "https://www.yeastgenome.org/locus/".concat(e)
          case "SO":
            return "http://www.sequenceontology.org/browser/current_svn/term/SO:".concat(
              e,
            )
          case "TAIR":
            return "https://www.arabidopsis.org/servlets/TairObject?accession=".concat(
              e,
            )
          case "UniProtKB":
            return "https://www.uniprot.org/uniprot/".concat(e)
          case "UniProtKB-KW":
            return "https://www.uniprot.org/keywords/".concat(e)
          case "UniProtKB-SubCell":
            return "https://www.uniprot.org/locations/".concat(e)
          case "WB":
            return "https://wormbase.org/search/cds/".concat(e)
          case "ZFIN":
            return "https://zfin.org/".concat(e)
          default:
            return "#"
        }
      }
    },
    63: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(276)
      t.default = function(e) {
        var t = e.children
        return r.a.createElement(i.a, { component: "div" }, t)
      }
    },
    64: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(145),
        o = n(146),
        c = n(118),
        s = n(119),
        l = function(e, t) {
          var n = e
              .filter(function(e) {
                return e.type === t
              })
              .map(function(e) {
                return e.attributes
              }),
            a = n
              .filter(function(e) {
                return (
                  "IMP" === e.evidence_code ||
                  "IGI" === e.evidence_code ||
                  "IDA" === e.evidence_code ||
                  "IPI" === e.evidence_code ||
                  "IEP" === e.evidence_code ||
                  "EXP" === e.evidence_code
                )
              })
              .sort(function(e, t) {
                return t.date - e.date
              })
              .slice(0, 5),
            r = n
              .filter(function(e) {
                return "IEA" !== e.evidence_code
              })
              .sort(function(e, t) {
                return t.date - e.date
              })
              .slice(0, 5),
            i = n
              .filter(function(e) {
                return "IEA" === e.evidence_code
              })
              .sort(function(e, t) {
                return t.date - e.date
              })
              .slice(0, 5)
          return Array.isArray(a) && a.length
            ? a
            : Array.isArray(r) && r.length
            ? r
            : i
        }
      t.default = function(e) {
        var t = e.panelData
        return r.a.createElement(
          "div",
          null,
          r.a.createElement(
            o.default,
            null,
            r.a.createElement(c.default, null, "Molecular Function"),
            r.a.createElement(
              s.default,
              null,
              l(t.data, "molecular_function").map(function(e, t) {
                return r.a.createElement(i.default, { key: t, item: e })
              }),
            ),
          ),
          r.a.createElement(
            o.default,
            null,
            r.a.createElement(c.default, null, "Biological Process"),
            r.a.createElement(
              s.default,
              null,
              l(t.data, "biological_process").map(function(e, t) {
                return r.a.createElement(i.default, { key: t, item: e })
              }),
            ),
          ),
          r.a.createElement(
            o.default,
            null,
            r.a.createElement(c.default, null, "Cellular Component"),
            r.a.createElement(
              s.default,
              null,
              l(t.data, "cellular_component").map(function(e, t) {
                return r.a.createElement(i.default, { key: t, item: e })
              }),
            ),
          ),
        )
      }
    },
    66: function(e, t, n) {
      "use strict"
      n.d(t, "b", function() {
        return u
      }),
        n.d(t, "c", function() {
          return p
        }),
        n.d(t, "a", function() {
          return l
        })
      var a = n(65),
        r = n(31),
        i = n(0),
        o = n.n(i),
        c = n(73),
        s = n.n(c),
        l =
          (n(341),
          function(e, t) {
            return e.isRouter
              ? o.a.createElement(
                  r.a,
                  {
                    style: {
                      color: "#15317e",
                      padding: "15px",
                      textDecoration: "none",
                    },
                    key: t,
                    to: e.url,
                  },
                  o.a.createElement(
                    "center",
                    null,
                    o.a.createElement(s.a, { name: e.icon, size: "2x" }),
                    o.a.createElement("br", null),
                    e.text,
                  ),
                )
              : o.a.createElement(
                  a.c,
                  { key: t, href: e.url },
                  o.a.createElement(
                    "center",
                    null,
                    o.a.createElement(s.a, { name: e.icon, size: "2x" }),
                    o.a.createElement("br", null),
                    e.text,
                  ),
                )
          }),
        u = [
          { url: "/cite", icon: "plus", text: "Cite Us" },
          { url: "/downloads", icon: "download", text: "Downloads" },
          { url: "/about", icon: "info-circle", text: "About dictyBase" },
          { url: "/login", icon: "sign-in", text: "Login", isRouter: !0 },
        ],
        p = [
          { url: "/cite", icon: "plus", text: "Cite Us" },
          { url: "/downloads", icon: "download", text: "Downloads" },
          { url: "/about", icon: "info-circle", text: "About dictyBase" },
          { url: "/logout", icon: "sign-out", text: "Logout", isRouter: !0 },
        ]
    },
    71: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(14)
      t.default = Object(i.g)(function(e) {
        var t = e.name,
          n = e.match
        return t
          ? r.a.createElement(
              "h2",
              null,
              r.a.createElement(
                "center",
                null,
                (function(e) {
                  return e.includes("goannotations")
                    ? "Gene Ontology Annotations"
                    : "Gene Information"
                })(n.path),
                " for ",
                t,
              ),
            )
          : r.a.createElement(
              "center",
              null,
              r.a.createElement("br", null),
              " ",
              r.a.createElement("br", null),
            )
      })
    },
    82: function(e, t, n) {
      "use strict"
      t.a = function(e) {
        return {
          root: { width: "100%", overflowX: "auto" },
          row: {
            "&:nth-of-type(even)": {
              backgroundColor: e.palette.background.default,
            },
          },
          link: {
            textDecoration: "none",
            color: "#4C5E81",
            "&:visited": { color: "#4C5E81" },
            "&:hover": { textDecoration: "underline" },
          },
          head: { backgroundColor: "#e6f2ff" },
          headerCell: { color: "#333", fontWeight: "600" },
        }
      }
    },
    84: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(31),
        o = n(7),
        c = n(1101),
        s = n(1103),
        l = n(1093),
        u = n(276),
        p = n(373),
        d = n.n(p)
      t.default = Object(o.a)(function(e) {
        return {
          root: { width: "100%" },
          heading: {
            fontSize: e.typography.pxToRem(15),
            fontWeight: e.typography.fontWeightRegular,
            color: "#fff",
          },
          summary: { backgroundColor: "#004080", marginTop: "0px" },
          icon: { color: "#fff" },
          details: { padding: 0 },
          innerContent: { width: "100%" },
          link: { color: "#e1f5fe", marginLeft: 40, textDecoration: "none" },
        }
      })(function(e) {
        var t = e.classes,
          n = e.title,
          a = e.route,
          o = e.children
        return r.a.createElement(
          "div",
          { className: t.root },
          r.a.createElement(
            c.a,
            { defaultExpanded: !0 },
            r.a.createElement(
              s.a,
              {
                className: t.summary,
                expandIcon: r.a.createElement(d.a, { className: t.icon }),
              },
              r.a.createElement(
                u.a,
                { className: t.heading },
                n,
                a &&
                  r.a.createElement(
                    i.a,
                    { className: t.link, to: a },
                    "View All",
                  ),
              ),
            ),
            r.a.createElement(
              l.a,
              { className: t.details },
              r.a.createElement("div", { className: t.innerContent }, o),
            ),
          ),
        )
      })
    },
    93: function(e, t, n) {
      e.exports = n.p + "static/media/sad-dicty.98bec487.png"
    },
    94: function(e, t, n) {
      "use strict"
      n.r(t)
      var a = n(0),
        r = n.n(a),
        i = n(18),
        o = n(120),
        c = n(84)
      t.default = function(e) {
        var t = e.goaData,
          n = t.filter(function(e) {
            return "molecular_function" === e.type
          }),
          a = t.filter(function(e) {
            return "biological_process" === e.type
          }),
          s = t.filter(function(e) {
            return "cellular_component" === e.type
          })
        return r.a.createElement(
          i.a,
          { container: !0 },
          r.a.createElement(
            i.a,
            { item: !0, sm: 12, md: 12, lg: 12, xl: 12 },
            n.length > 0 &&
              r.a.createElement(
                c.default,
                { title: "Molecular Function" },
                r.a.createElement(o.default, { goaData: n }),
              ),
            a.length > 0 &&
              r.a.createElement(
                c.default,
                { title: "Biological Process" },
                r.a.createElement(o.default, { goaData: a }),
              ),
            s.length > 0 &&
              r.a.createElement(
                c.default,
                { title: "Cellular Composition" },
                r.a.createElement(o.default, { goaData: s }),
              ),
          ),
        )
      }
    },
    95: function(e, t, n) {
      "use strict"
      var a = n(20),
        r = n.n(a),
        i = n(42),
        o = n(26)
      n.d(t, "c", function() {
        return l
      }),
        n.d(t, "a", function() {
          return u
        }),
        n.d(t, "b", function() {
          return p
        }),
        n.d(t, "d", function() {
          return d
        })
      var c = function(e) {
          return {
            type: "FETCH_GOA_FAILURE",
            payload: { isFetching: !1, error: e },
          }
        },
        s = function(e) {
          return {
            type: "FETCH_GOA_SUCCESS",
            payload: { isFetching: !1, data: e },
          }
        },
        l = function(e) {
          return (function() {
            var t = Object(i.a)(
              r.a.mark(function t(n, a) {
                var i, l, u, p
                return r.a.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (!a().goa.data) {
                            t.next = 2
                            break
                          }
                          return t.abrupt("return", { type: "GOA_NO_REFETCH" })
                        case 2:
                          return (
                            (t.prev = 2),
                            n({
                              type: "FETCH_GOA_REQUEST",
                              payload: { isFetching: !0 },
                            }),
                            (t.next = 6),
                            fetch(e, {
                              headers: { Accept: "application/json" },
                            })
                          )
                        case 6:
                          return (i = t.sent), (t.next = 9), i.json()
                        case 9:
                          ;(l = t.sent),
                            i.ok && !l.status
                              ? 2 === l.data.length
                                ? ((u = {
                                    links: l.links,
                                    data: l.data[0].concat(l.data[1]),
                                  }),
                                  n(s(u)))
                                : ((p = {
                                    links: l.links,
                                    data: [].concat.apply([], l.data[0]),
                                  }),
                                  n(s(p)))
                              : n(c(Object(o.a)(l.status, l.title))),
                            (t.next = 17)
                          break
                        case 13:
                          ;(t.prev = 13),
                            (t.t0 = t.catch(2)),
                            n(c(Object(o.a)("Network", t.t0.message)))
                        case 17:
                        case "end":
                          return t.stop()
                      }
                  },
                  t,
                  null,
                  [[2, 13]],
                )
              }),
            )
            return function(e, n) {
              return t.apply(this, arguments)
            }
          })()
        },
        u = function(e) {
          return { type: "CHANGE_GOA_TAB", payload: { tab: e } }
        },
        p = function(e) {
          return { type: "GOA_TABLE_ORDER", payload: { order: e } }
        },
        d = function(e) {
          return { type: "GOA_TABLE_SORT_BY", payload: { column: e } }
        }
    },
    99: function(e, t, n) {
      "use strict"
      n.d(t, "a", function() {
        return a
      })
      var a = {
        protein: "Protein Information",
        goa: "Gene Ontology",
        orthologs: "Orthologs",
        phenotypes: "Phenotypes",
        publications: "Publications",
        blast: "BLAST",
      }
    },
  },
  [[389, 1, 2]],
])
