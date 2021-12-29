import Link from "next/link";
import { getArticleList } from "@/lib/markdown";
import { getRelativeDate } from "@/lib/date";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Meta from "@/comp/Meta";

export function getStaticProps() {
  return {
    props: { articleList: getArticleList() },
  };
}

export default function ArticlesHome({
  articleList,
}: {
  articleList: Array<{
    slug: "String";
    title: "String";
    summary: "String";
    createdAt: "String";
    clickCount: "Number";
  }>;
}) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Meta pageTitle="Articles" />
      <h1 className="mt-10 text-5xl font-black">Articles</h1>

      <div className="mt-10">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 pl-6 border border-gray-400 rounded-md focus:border-white focus:outline-none bg-dark"
        />
      </div>
      {articleList
        .filter((article) => {
          const fullContent = `${article.title} ${article.summary}`;
          return fullContent.toLowerCase().includes(search.toLowerCase());
        })
        .map((article) => {
          return <ArticleCard key={article.slug} article={article} />;
        })}
    </>
  );
}

function ArticleCard({
  article,
}: {
  article: {
    slug: "String";
    title: "String";
    summary: "String";
    createdAt: "String";
    clickCount: "Number";
  };
}) {
  const { pathname } = useRouter();

  return (
    <>
      <Link href={pathname + "/" + article.slug}>
        <a className="block w-full py-2 my-6">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{getRelativeDate(article.createdAt)}</span>
            <span>{article.clickCount} views</span>
          </div>
          <h3 className="text-2xl font-bold">{article.title}</h3>
          <p className="font-light text-gray-400">{article.summary}</p>
        </a>
      </Link>
    </>
  );
}
