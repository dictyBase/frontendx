## Development 

### Known Issues
- Dependency resolution error, cannot resolve `@mui/system` in local development unless `@dictybase/jbrowse` is pruned/isolated.
- Error: problem decompressing block: incorrect gzip header check
    -> in development, the vite server cannot be used to serve static assets because:
        1. Vite uses [Content-Type: '' + Content-Encoding: gzip](https://github.com/vitejs/vite/issues/12266) causing browser to decompress file automatically.
        2. Jbrowse's `Gff3TabixAdapter` expects a compressed gzip, tries to decompress.
        -> **SOLUTION**: Use static server to serve assets

