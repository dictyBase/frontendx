# @dictyBase/footer

footer Component library for dictyBase.

<p align="center">
    <img src="resources/footer-preview.png" />
    <small><i>dictyBase footer component with default data</i></small>
</p>

## Component architecture

```mermaid
graph TD
    A{Footer} --> B[FooterContainer]
    B --> B1[FooterHead]
    B --> B2[FooterLinks]
    B --> B3[FooterSponsors]
    B2 --> C[FooterLink]
```
