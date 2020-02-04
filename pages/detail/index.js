import withRopoBasic from '../../components/with-repo-basic'

const Detail = ({test}) => {
return <span>detail {test}</span>
}

Detail.getInitialProps = async () => {
  return {
    test: 123
  }
}

export default withRopoBasic(Detail, 'index')

// import Link from 'next/link'
// import { withRouter } from 'next/router'

// import { request } from '../../lib/api'
// import Repo from '../../components/Repo'

// function makeQuery(queryObject) {
//   const query = Object.entries(queryObject).reduce((result, entry) => {
//     result.push(entry.join('='))
//     return result
//   },[]).join('&')

//   return `?${query}`
// }

// const Detail = ({ repobasic, router }) => {
//   console.log("TCL: Detail -> repobasic", repobasic)
//   const query = makeQuery(router.query)
//   return (
//     <div className="root">
//       <div className="repo-basic">
//         <Repo repo={repobasic} />
//         <div className="tabs">
//           <Link href={`/detail${query}`}>
//             <a className="tab index">Readme</a>
//           </Link>
//           <Link href={`/detail/issues${query}`}>
//             <a className="tab issues">Issues</a>
//           </Link>
//         </div>
//       </div>
//       <div>Readme</div>
//       <style jsx>{`
//         .root {
//           padding-top: 20px;
//         }  
//         .repo-basic {
//           padding: 20px;
//           border: 1px solid #eee;
//           margin-bottom: 20px;
//           border-radius: 5px;
//         }
//         .tab + .tab {
//           margin-left: 20px;
//         }
//       `}</style>
//     </div>
//   )
// }

// Detail.getInitialProps = async ({ ctx }) => {
//   // return new Promise(resolve => {
//   //   setTimeout(() => {
//   //     resolve({})
//   //   }, 1000)
//   // })

//   const { owner, name } = ctx.query

//   const repoBasic = await request(
//     {
//       url: `/repos/${owner}/${name}`
//     },
//     ctx.req,
//     ctx.res
//   )

//   return {
//     repobasic: repoBasic.data || {}
//   }
// }

// export default withRouter(Detail)
