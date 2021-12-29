import Meta from "@/comp/Meta"
import type { IHiddenTool } from "types"
import yaml from "js-yaml"
import fs from "fs"

export function getStaticProps() {
  const asRaw = fs.readFileSync("./_data/hidden-tools.yaml", "utf8")
  const asJson: IHiddenTool[] = yaml.load(asRaw)

  return {
    props: { hiddenTools: asJson },
  }
}

export default function HiddenTools({
  hiddenTools,
}: {
  hiddenTools: IHiddenTool[]
}) {
  return (
    <>
      <Meta pageTitle="Hidden-Tools" />
      <h1 className="mt-10 text-5xl font-black">Hidden-Tools</h1>
      {hiddenTools.map((item: IHiddenTool) => (
        <div key={item.head} className="my-10">
          <h3 className="text-2xl font-bold">{item.head}</h3>
          <p className="my-1">{item.text}</p>
          <a href={item.link} className="text-blue-600">
            {item.link}
          </a>
        </div>
      ))}
    </>
  )
}
