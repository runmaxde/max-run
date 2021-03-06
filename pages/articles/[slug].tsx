import { getArticleBySlug, getArticleList } from "@/lib/markdown"
import { getRelativeDate } from "@/lib/date"
import { P, H1, H2, H3, Table, TheCodeBlock, MdLink, MdLi } from "@/comp/UI"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Meta from "@/comp/Meta"

export function getStaticPaths() {
  const paths = getArticleList().map((article) => {
    return "/articles/" + article.slug
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug

  const article = getArticleBySlug(slug)
  const mdx = await serialize(article.matterContent, {
    scope: article.matterData,
  })
  return {
    props: { article, mdx },
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
    <>
      <Meta pageTitle={article.title} />
      <h1 className="my-40 text-4xl font-black text-center">{article.title}</h1>
      <div className="flex justify-between mb-12 text-xs text-gray-400 select-none">
        <span>Max / {getRelativeDate(article.createdAt)}</span>
        <span>{article.clickCount} views</span>
      </div>
      <div className="mt-40">
        <MDXRemote {...mdx} components={components} />
      </div>
    </>
  )
}
