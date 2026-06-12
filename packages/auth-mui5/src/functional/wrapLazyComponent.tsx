import { lazy, LazyExoticComponent, FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { match } from "ts-pattern"
import { Task, map as Tmap } from "fp-ts/Task"
import { PageComponentData } from "./routeManager"
import { ACCESS } from "../const"
import { LazyProtected } from "../LazyProtected"
import { LazyPrivate } from "../LazyPrivate"

const wrapLazyComponent = (
  value: Task<PageComponentData>,
): LazyExoticComponent<FunctionComponent> =>
  pipe(
    value,
    Tmap(({ default: Component, access, roles }) =>
      match(access)
        .with(ACCESS.public, () => Component)
        .with(ACCESS.protected, () => () => (
          <LazyProtected>
            <Component />
          </LazyProtected>
        ))
        .with(ACCESS.private, () => () => (
          <LazyPrivate roles={roles || []}>
            <Component />
          </LazyPrivate>
        ))
        .exhaustive(),
    ),
    Tmap((component) => ({ default: component })),
    lazy,
  )

export { wrapLazyComponent }
