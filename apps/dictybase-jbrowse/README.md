## Development 

### Quickstart

This guide will instruct you on how to run the application for local development with a minimal configuration.

1. Install dependencies
```
yarn --ignore-engines
```

2. Put a .fa file into `./public.`
```
      dictybase-jbrowse
       public
          example.fa
```
3. Generate Fasta Index (.fai) file
```
yarn workspace @dictybase/jbrowse faidx ./public/example.fa
```

```
      dictybase-jbrowse
       public
          example.fa
          example.fai
```

4. Serve Static Files
```
yarn workspace @dictybase/jbrowse static-server
```

5. Generate config.json
```
yarn workspace @dictybase/jbrowse add-assembly ttp://localhost:8080/example.fa
```
This creates a `config.json` at the root of `dictybase-jbrowse`.

6. Run Application
```
yarn workspace @dictybase/jbrowse dev
```

### Workflow for Config Update
1. Generate any required index files (.fai, gff3.gz.tbi).
2. Upload them to `storage.dictybase.dev` with a command line tool.
3. Create new branch and push to `origin`
4. Add assembly/tracks to local `config.json` file.
5. Commit changes to repo.
6. Push + Merge changes.
7. Redeploy.

### Preparing FASTA files
[reference](https://jbrowse.org/jb2/docs/quickstart_web/#adding-a-genome-assembly-in-fasta-format)

#### Required Tools
[samtools](https://www.htslib.org/)

#### Indexing
```
samtools faidx genome.fa
```
#### Add to Config

Example for adding assembly track from URL

```
jbrowse add-assembly genome.fa https://example.net/data/canonical_core.fa
```

Will append tracks to an existing config or create a new one: 
```
{
  "assemblies": [
    {
      "name": "canonical_core",
      "sequence": {
        "type": "ReferenceSequenceTrack",
        "trackId": "canonical_core-ReferenceSequenceTrack",
        "adapter": {
          "type": "IndexedFastaAdapter",
          "fastaLocation": {
            "uri": "https://example.net/data/canonical_core.fa",
            "locationType": "UriLocation"
          },
          "faiLocation": {
            "uri": "https://example.net/data/canonical_core.fa.fai",
            "locationType": "UriLocation"
          }
        }
      }
    }
  ],
  "configuration": {},
  "connections": [],
  "defaultSession": {
    "name": "New Session"
  },
  "tracks": []
}
```

### Preparing GFF3 Files
[tabix](https://www.htslib.org/doc/tabix.html)

### Upgrading `@jbrowse/cli`

### Known Issues
- Dependency resolution error, cannot resolve `@mui/system` in local development unless `@dictybase/jbrowse` is pruned/isolated.
- Error: problem decompressing block: incorrect gzip header check
    -> in development, the vite server cannot be used to serve static assets because:
        1. Vite uses [Content-Type: '' + Content-Encoding: gzip](https://github.com/vitejs/vite/issues/12266) causing browser to decompress file automatically.
        2. Jbrowse's `Gff3TabixAdapter` expects a compressed gzip, tries to decompress.
        -> **SOLUTION**: Use static server to serve assets

