import Link from 'next/link'
import { withRouter } from 'next/router'

import { request } from '../lib/api'
import Repo from './/Repo'

function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='))
      return result
    }, [])
    .join('&')

  return `?${query}`
}

export default (Comp, type = 'index') => {
  const withDetail = ({ repobasic, router, ...rest }) => {
    console.log('TCL: Detail -> repobasic', repobasic)
    const query = makeQuery(router.query)
    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repobasic} />
          <div className="tabs">
            {type === 'index' ? (
              <span className="tab index">Readme</span>
            ) : (
              <Link href={`/detail${query}`}>
                <a className="tab index">Readme</a>
              </Link>
            )}
            {type === 'issues' ? (
              <span className="tab issues">Issues</span>
            ) : (
              <Link href={`/detail/issues${query}`}>
                <a className="tab issues">Issues</a>
              </Link>
            )}
          </div>
        </div>
        <div>
          <Comp {...rest} />
        </div>
        <style jsx>{`
          .root {
            padding-top: 20px;
          }
          .repo-basic {
            padding: 20px;
            border: 1px solid #eee;
            margin-bottom: 20px;
            border-radius: 5px;
          }
          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
      </div>
    )
  }

  withDetail.getInitialProps = async context => {
    const { ctx } = context
    const { owner, name } = ctx.query

    const repoBasic = await request(
      {
        url: `/repos/${owner}/${name}`
      },
      ctx.req,
      ctx.res
    )

    let pageData = {}
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context)
      // console.log('TCL: pageData', pageData)
    }

    return {
      repobasic: repoBasic.data,
      ...pageData
    }
  }
  return withRouter(withDetail)
}
