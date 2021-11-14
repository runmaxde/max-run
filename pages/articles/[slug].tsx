import { getArticleBySlug, getArticleList } from "@/lib/markdown"
import { getRelativeDate } from "@/lib/date"
import { P, H1, H2, H3, Table, TheCodeBlock, MdLink, MdLi } from "@/comp/UI"
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

export function getStaticPaths() {
  const paths = getArticleList().map(article => {
    return "/articles/" + article.slug
  })

  return {
    paths: paths,
    fallback: false
  }
}


export async function getStaticProps(context) {
  const slug = context.params.slug

  const article = getArticleBySlug(slug)
  const mdx = await serialize(article.matterContent, { scope: article.matterData })
  return {
    props: { article, mdx }
  }
}


export default function ArticleItem({ article, mdx }) {
  const components = {
    p: (props) => <P {...props} />,
    h1: (props) => <H1 {...props} />,
    h2: (props) => <H2 {...props} />,
    h3: (props) => <H3 {...props} />,
    table: (props) => <Table {...props} />,
    code: (props) => <TheCodeBlock {...props} />,
    a: (props) => <MdLink {...props} />,
    li: (props) => <MdLi {...props} />,
    BigSpacer: () => <div className="mt-32" />,
  }

  return (
    <div className="max-w-xl p-3 m-auto">
      <h1 className="mt-10 text-4xl font-black">{article.title}</h1>
      <div className="flex justify-between mt-4 mb-12 text-xs text-gray-400 select-none">
        <span>Max / {getRelativeDate(article.createdAt)}</span>
        <span>{article.clickCount} views</span>
      </div>
      <MDXRemote {...mdx} components={components} />
    </div>
  )
}