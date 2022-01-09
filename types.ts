export interface IHiddenTool {
  head: string
  text: string
  link: string
}

export interface IArticle {
  slug: string
  head: {
    title: string
    tags: string[]
    createdAt: string
    changedAt: string
  }
  content: string
}
