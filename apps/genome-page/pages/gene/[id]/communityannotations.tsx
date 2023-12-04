import { useRouter } from "next/router"
import { useState, useEffect, useMemo } from "react"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import { pipe } from "fp-ts/lib/function"
import { cloneGithubWiki } from "../../../common/hooks/useGithubWiki"
import { toOutput, WikiContentEither } from "../../../common/hooks/WikiDisplay"
import FS from "@isomorphic-git/lightning-fs"

export default function Gene() {
  const router = useRouter()

  // markdown file that will be retrieved from the wiki
  const geneFile = `${router.query.id}.md`
  //react state that contains the markdown content
  const [content, setContent] = useState<WikiContentEither>(
    E.right({ loading: true }),
  )

  // two functions to set the state in case of success or error
  const errSet = (err: string) => setContent(E.left(err))
  const contentSet = (cont: string) =>
    setContent(E.right({ markdown: cont, loading: false }))

  // returns a promise that resolves to returing the markdown content
  const wikiFn = useMemo(() => {
    return cloneGithubWiki({
      dir: "/wiki",
      file: geneFile,
      browserFS: new FS("github-wiki"),
      url: "https://github.com/dictybase-playground/ontomania.wiki.git",
    })
  }, [geneFile])

  // resolves the promise, returns the content or the error
  useEffect(() => {
    const prog = async (fn: TE.TaskEither<string, string>) =>
      pipe(await fn(), E.fold(errSet, contentSet))
    prog(wikiFn)
  }, [wikiFn])

  // renders the content or error
  return pipe(content, toOutput)
}

// this piece of line is needed to stop nextjs from doing prerendering optimization
// which is not needed in this case
Gene.getInitialProps = () => ({ foo: "bar" })
