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
      {hiddenTools.map((item) => (
        <ToolItem key={item.head} item={item} />
      ))}
    </>
  )
}

function ToolItem({ item }: { item: IHiddenTool }) {
  return (
    <div>
      <h3>{item.head}</h3>
      <p>{item.text}</p>
      <a href={item.link}>{item.link}</a>
    </div>
  )
}
