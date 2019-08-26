// styling
declare module "ProtVista/style/main.css" {
  declare module.exports: any
}
declare module "font-awesome/css/font-awesome.min.css" {
  declare module.exports: any
}
// images
declare module "images/sad-dicty.png" {
  declare module.exports: any
}

class process {
  static env: {
    REACT_APP_AUTH_SERVER: string,
    REACT_APP_FUNC_SERVER: string,
    REACT_APP_BASENAME: string,
    REACT_APP_NAVBAR_JSON: string,
    REACT_APP_FOOTER_JSON: string,
  }
}
