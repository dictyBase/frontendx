[Reference](https://v5.mui.com/material-ui/migration/migration-v4)
[Relevant Issue](https://github.com/mui/material-ui/issues/12109)

It seems that I can gradually upgrade to MUI package by package, with different versions of MUI in the same react tree. However, I don't know how theming will work. 

## Phase 1: @material-ui -> @mui

Applications
  - [] dicty-frontpage
      - [] @dictybase/auth
        - [] @dictybase/footer
        - [] @dictybase/header
          - [] @dictybase/dicty-image
        - [] @dictybase/navbar
        - [] @dictybase/ui-common
      - [] @dictybase/editor
        - [] @dictybase/editor-toolbar
          - [] @dictybase/image-plugin
            - [] @dictybase/flex-layout-plugin
            - [] @dictybase/resizable-image
        - [] @dictybase/table-action-plugin
        - [] @dictybase/width-table-plugin
      - [] @dictybase/ui-frontpage
  - [] stock-center
  - [] genomepage
  - [] publication

1. Select an application
2. Determine which of its packages use material-ui
3. Apply migration changes to package one by one 
4. Apply migration changes to the application
5. Test

## Phase 2: JSS -> Emotion
