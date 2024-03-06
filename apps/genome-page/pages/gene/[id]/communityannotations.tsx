import { useRouter } from "next/router"
import { useState, useEffect, useMemo } from "react"
import { right, left, fold } from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import { pipe } from "fp-ts/lib/function"
import FS from "@isomorphic-git/lightning-fs"
import { cloneGithubWiki } from "../../../common/hooks/useGithubWiki"
import { toOutput, WikiContentEither } from "../../../common/hooks/WikiDisplay"

// eslint-disable-next-line import/no-default-export
export default function Gene() {
  const router = useRouter()

  // markdown file that will be retrieved from the wiki
  const geneFile = `${router.query.id}.md`
  // react state that contains the markdown content
  const [content, setContent] = useState<WikiContentEither>(
    right({ loading: true }),
  )

  // two functions to set the state in case of success or error
  const errorSet = (error: string) => setContent(left(error))
  const contentSet = (cont: string) =>
    setContent(right({ markdown: cont, loading: false }))

  // returns a promise that resolves to returing the markdown content
  const wikiFunction = useMemo(
    () =>
      cloneGithubWiki({
        dir: "/wiki",
        file: geneFile,
        browserFS: new FS("github-wiki"),
        url: "https://github.com/dictybase-playground/ontomania.wiki.git",
      }),
    [geneFile],
  )

  // resolves the promise, returns the content or the error
  useEffect(() => {
    const prog = async (function_: TE.TaskEither<string, string>) =>
      pipe(await function_(), fold(errorSet, contentSet))
    prog(wikiFunction)
  }, [wikiFunction])

  // renders the content or error
  return pipe(content, toOutput)
}

// this piece of line is needed to stop nextjs from doing prerendering optimization
// which is not needed in this case
Gene.getInitialProps = () => ({ foo: "bar" })
