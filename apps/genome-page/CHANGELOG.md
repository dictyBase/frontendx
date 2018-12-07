# [3.2.0](https://github.com/dictyBase/Genomepage/compare/3.1.0...3.2.0) (2018-12-07)

### Bug Fixes

- all converted links go to correct dictybase address ([f6d8350](https://github.com/dictyBase/Genomepage/commit/f6d8350)), closes [#66](https://github.com/dictyBase/Genomepage/issues/66)
- combine data if more than one uniprot id ([f94f25e](https://github.com/dictyBase/Genomepage/commit/f94f25e))
- display at proper width on smaller screens ([b8c0f00](https://github.com/dictyBase/Genomepage/commit/b8c0f00))
- fix action console warning and flow issues ([80e133c](https://github.com/dictyBase/Genomepage/commit/80e133c))
- make go tab indicator more noticeable ([0217aa7](https://github.com/dictyBase/Genomepage/commit/0217aa7)), closes [#69](https://github.com/dictyBase/Genomepage/issues/69)
- provide correct URLs for uniprot and GO name conversions ([7c03c88](https://github.com/dictyBase/Genomepage/commit/7c03c88)), closes [#66](https://github.com/dictyBase/Genomepage/issues/66)
- provide error display on network issues ([d9b688e](https://github.com/dictyBase/Genomepage/commit/d9b688e))
- provide flattened array data from fetch goa response ([c12242e](https://github.com/dictyBase/Genomepage/commit/c12242e))

### Features

- set default go tab sorting by descending date ([0d07fdd](https://github.com/dictyBase/Genomepage/commit/0d07fdd)), closes [#71](https://github.com/dictyBase/Genomepage/issues/71)
- swap evidence and with columns ([daf011e](https://github.com/dictyBase/Genomepage/commit/daf011e)), closes [#70](https://github.com/dictyBase/Genomepage/issues/70)

# [3.1.0](https://github.com/dictyBase/Genomepage/compare/3.0.0...3.1.0) (2018-10-24)

### Bug Fixes

- add key to mapped array ([8d67e1e](https://github.com/dictyBase/Genomepage/commit/8d67e1e))
- fix URL path for gene page links ([ed44b3b](https://github.com/dictyBase/Genomepage/commit/ed44b3b))
- update converted uniprot IDs to go to local gene page ([557bc4a](https://github.com/dictyBase/Genomepage/commit/557bc4a)), closes [#57](https://github.com/dictyBase/Genomepage/issues/57)
- use basename to set proper URLs to gene pages ([e31d89f](https://github.com/dictyBase/Genomepage/commit/e31d89f))

### Features

- add routes using regex to check if path is ID or gene name ([c0f4bfd](https://github.com/dictyBase/Genomepage/commit/c0f4bfd)), closes [#52](https://github.com/dictyBase/Genomepage/issues/52)

# [3.0.0](https://github.com/dictyBase/Genomepage/compare/2.0.0...3.0.0) (2018-10-19)

### Features

- add With data conversions ([ceb2ce1](https://github.com/dictyBase/Genomepage/commit/ceb2ce1))
- update color scheme of summary and GO tabs ([06c2a95](https://github.com/dictyBase/Genomepage/commit/06c2a95))

### BREAKING CHANGES

- the With data is returned from the API with a different data structure; the front
  end code has been updated to reflect this
