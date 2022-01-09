import fs from "fs"
import path from "path"
import matter from "gray-matter"
import moment from "moment"
import { IArticle } from "types"

const PATH_OF_ARTICLES = "./_data/articles"

class ArticleImporter {
  articleList: IArticle[]
  constructor() {
    this.init()
    this.articleList = []
  }

  init() {
    const fileList = fs.readdirSync(PATH_OF_ARTICLES)

    const articleListImport: IArticle[] = fileList
      .map((fileName) => {
        try {
          const slug = fileName.replace(".md", "")

          const filePath = path.join(PATH_OF_ARTICLES, fileName)
          const raw = fs.readFileSync(filePath, "utf-8")
          const { data: headRaw, content } = matter(raw)

          const head = {
            title: headRaw.title || "",
            tags: headRaw.tags.split(" ") || [],
            createdAt: headRaw.createdAt || "0",
            changedAt: headRaw.lastEdited || "0",
          } as IArticle["head"]

          return { slug, head, content } as IArticle
        } catch (e) {
          console.log(e)
        }
      })
      .filter((article) => article !== null)

    this.articleList = articleListImport.sort((a, b) => {
      return moment(a.head.changedAt).unix() - moment(b.head.changedAt).unix()
    })
  }
  getAll(): IArticle[] {
    return this.articleList
  }

  get(slug: string): IArticle | null {
    return this.articleList.find((article) => article.slug === slug)
  }
}

const Article = new ArticleImporter()
export default Article
