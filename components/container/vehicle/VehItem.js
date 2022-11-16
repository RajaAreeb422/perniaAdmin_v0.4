
import Head from 'next/head'

import DashboardPage from './DashboardPage';
export default function CatItem({data}) {
  return (
    <div>
      {console.log("helooooooo")}
          {console.log(data)}
              <Head>
              <title>Web Development News</title>
              <meta name='keywords' content="web development programming"></meta>
              </Head>
              <DashboardPage />
             
    </div>
  )
}
// export const getServerSideProps=async()=>{
//   const res=await fetch('http://localhost:4000/categories')
//   var a=JSON.stringify(res.data)
//   console.log("a "+a)
//   const articles= await res.json();
//   console.log("IN Cat Item")
//   console.log(articles.map(n=>n.parent))
//   console.log("respone se "+articles)
//   return{
//     props:{
//         articles

//     }
// }
// }
