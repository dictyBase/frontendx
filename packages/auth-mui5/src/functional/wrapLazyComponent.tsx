import { lazy, LazyExoticComponent, FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { match, P } from "ts-pattern"
import { Task, map as Tmap } from "fp-ts/Task"
import { PageComponentData } from "./routeManager"
import { ACCESS } from "../const"
import { LazyProtected } from "../LazyProtected"
import { LazyPrivate } from "../LazyPrivate"
import { UnAuthorized } from "../UnAuthorized"

const wrapLazyComponent = (
  value: Task<PageComponentData>,
): LazyExoticComponent<FunctionComponent> =>
  pipe(
    value,
    Tmap(({ default: Component, access, roles }) =>
      match({ access, roles })
        .with({ access: ACCESS.public }, () => Component)
        .with({ access: ACCESS.protected }, () => () => (
          <LazyProtected>
            <Component />
          </LazyProtected>
        ))
        .with(
          { acess: ACCESS.private, roles: P.select(P.array(P.string)) },
          (r) => () => (
            <LazyPrivate roles={r}>
              <Component />
            </LazyPrivate>
          ),
        )
        .otherwise(() => UnAuthorized),
    ),
    Tmap((component) => ({ default: component })),
    lazy,
  )

export { wrapLazyComponent }
