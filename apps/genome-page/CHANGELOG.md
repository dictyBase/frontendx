# [3.1.0](https://github.com/dictyBase/Genomepage/compare/3.0.0...3.1.0) (2018-10-24)


### Bug Fixes

* add key to mapped array ([8d67e1e](https://github.com/dictyBase/Genomepage/commit/8d67e1e))
* fix URL path for gene page links ([ed44b3b](https://github.com/dictyBase/Genomepage/commit/ed44b3b))
* update converted uniprot IDs to go to local gene page ([557bc4a](https://github.com/dictyBase/Genomepage/commit/557bc4a)), closes [#57](https://github.com/dictyBase/Genomepage/issues/57)
* use basename to set proper URLs to gene pages ([e31d89f](https://github.com/dictyBase/Genomepage/commit/e31d89f))


### Features

* add routes using regex to check if path is ID or gene name ([c0f4bfd](https://github.com/dictyBase/Genomepage/commit/c0f4bfd)), closes [#52](https://github.com/dictyBase/Genomepage/issues/52)

# [3.0.0](https://github.com/dictyBase/Genomepage/compare/2.0.0...3.0.0) (2018-10-19)


### Features

* add With data conversions ([ceb2ce1](https://github.com/dictyBase/Genomepage/commit/ceb2ce1))
* update color scheme of summary and GO tabs ([06c2a95](https://github.com/dictyBase/Genomepage/commit/06c2a95))


### BREAKING CHANGES

* the With data is returned from the API with a different data structure; the front
end code has been updated to reflect this
