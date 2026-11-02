# frontendx
The [monorepo](https://turbo.build/repo/docs/handbook/what-is-a-monorepo) of dictycr/dictybase frontend applications and packages.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Production Deployment](#production-deployment)

# Prerequisites

- [Node.js](https://nodejs.org/) >= 18.0.0
- [Yarn](https://classic.yarnpkg.com/) 1.22.x

# Installation

```bash
git clone https://github.com/dictyBase/frontendx.git
cd frontendx
yarn install --ignore-engines
```

# Production Deployment

Pushes to `develop` build with `apps/*/.env.development` and deploy to the `experiments` cluster through `.github/workflows/ci.yml`.

Pushing a semantic version tag runs `.github/workflows/tag-build.yaml`, which builds all four applications (`frontpage`, `stockcenter`, `publication`, and `genomepage`) with `--mode=production` (`apps/*/.env.production`) and deploys them to the `dcr-kube1` production cluster.

Install [nsv](https://github.com/purpleclay/nsv) ([installation guide](https://purpleclay.github.io/nsv/install/)) to compute the next semantic version from conventional commits, then fast-forward `main` from `develop` and push the tag:

```bash
git checkout develop
git pull origin develop
git checkout main
git merge --ff-only develop
git push origin main

tag=$(nsv next)
git tag "$tag"
git push origin "$tag"
```
