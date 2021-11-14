import matter from 'gray-matter'
import fs from "fs"
import moment from 'moment';

const PATH_OF_ARTICLES = "./_articles"

class TranslateMarkdown {
  slug: string;
  createdAt: any;

  fileHeader: { [key: string]: any; };
  fileContent: string;

  constructor(folderPath: string, fileName: string) {
    const filePath = `${folderPath}/${fileName}`;

    this.createdAt = (fs.statSync(filePath).mtime);
    this.slug = fileName.replace(".md", "");

    const matterObj = matter(fs.readFileSync(filePath, 'utf8'));
    this.fileHeader = matterObj.data;
    this.fileContent = matterObj.content;
  }

  _fetchClickCount() {
    return 0;
  }

  toJson() {
    return {
      slug: this.slug,
      title: this.fileHeader.title || this.slug,
      content: this.fileContent || null,
      summary: this.fileHeader.summary || null,
      createdAt: moment(this.createdAt).toISOString(),
      clickCount: this._fetchClickCount(),

      matterData: this.fileHeader,
      matterContent: this.fileContent
    }
  }
}

export function getArticleList() {
  const articleFileList = fs.readdirSync(PATH_OF_ARTICLES)

  const articleList = articleFileList.map(articleFileName => {
    try {
      const article = new TranslateMarkdown(PATH_OF_ARTICLES, articleFileName)
      return article.toJson()
    } catch (e) { return null }
  })

  const cleanArticleList = articleList.filter(article => article !== null).sort((a, b) => { return moment(b.createdAt) - moment(a.createdAt) })

  // TODO: remove this JSON hack
  return JSON.parse(JSON.stringify(cleanArticleList))
}

export function getArticleBySlug(slug: string) {
  const article = new TranslateMarkdown(PATH_OF_ARTICLES, slug + ".md")
  return article.toJson()

  // TODO: remove this JSON hack
  return JSON.parse(JSON.stringify(article))
}