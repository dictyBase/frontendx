import React from 'react'



export default class NavbarHeader extends React.Component {
    displayName = 'Navigation bar header'

    static propTypes = {
        href: React.PropTypes.string,
        name: React.PropTypes.string,
        headerStyle: React.PropTypes.object,
        brandStyle: React.PropTypes.object
    }

    getStyles = () => {
        return {
            header: {
                marginRight: '-15px',
                marginLeft: '-15px',
                boxSizing: 'border-box',

                '@media (min-width: 768px)': {
                    float: 'left',
                    marginRight: '0px',
                    marginLeft: '0px'
                }
            },
            brand: {
                float: 'left',
                height: '50px',
                padding: '15px',
                lineHeight: '20px',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                boxSizing: 'border-box',

                fontSize: '18px',
                color: '#ffffff',
                fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',

                ':hover': {
                    color: '#ccffcc'
                },

                ':focus': {
                    color: '#ccffcc'
                },

                '@media (min-width: 768px)': {
                    display: 'none'
                }
            },
            navbarToggle: {
                position: 'relative',
                float: 'right',
                padding: '9px 10px',
                marginTop: '8px',
                marginRight: '15px',
                marginBottom: '8px',
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '4px',
                borderColor: '#112968',
                cursor: 'pointer',
                boxSizing: 'border-box',

                ':hover': {
                    backgroundColor: '#112968'
                },

                ':focus': {
                    outline: '0px',
                    backgroundColor: '#112968'
                },
                '@media (min-width: 768px)': {
                    display: 'none'
                }
            },
            srOnly: {
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0px',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                borderWidth: '0px',
                borderStyle: 'none',
                boxSizing: 'border-box'
            },
            iconBar: {
                display: 'block',
                width: '22px',
                height: '2px',
                borderRadius: '1px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box'
            },
            burger: {
                marginTop: '4px'
            },
            pseudoBefore: {
                display: 'table',
                content: '',
                boxSizing: 'border-box'
            },
            pseudoAfter: {
                clear: 'both',
                display: 'table',
                content: '',
                boxSizing: 'border-box'
            }
        }
    }

    renderToggleButton = () => {
        const defStyle = this.getStyles()
        return (
          <button type="button"
            style={ [defStyle.navbarToggle] }
            onClick={ this.props.navbarToggle }>
              <span style={ [defStyle.srOnly] }>Toggle navigation</span>
              <span style={ [defStyle.iconBar] }></span>
              <span style={ [defStyle.iconBar, defStyle.burger] }></span>
              <span style={ [defStyle.iconBar, defStyle.burger] }></span>
          </button>
        )
    }

    render() {
        const defStyle = this.getStyles()
        const {href, name, headerStyle, brandStyle} = this.props
        return (
            <div key="header" style={ [defStyle.header, headerStyle && headerStyle] }>
                <span style={ [defStyle.pseudoBefore] } />
                    { this.renderToggleButton() }
                    <a key="brand"
                        style={ [defStyle.brand, brandStyle && brandStyle] }
                        href={ href }>
                            { name }
                    </a>
                <span style={ [defStyle.pseudoAfter] } />
            </div>
        )
    }
}
