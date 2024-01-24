const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")
const { log } = require("console")


/*
---
postId: 
title: "Hello World :waving:"
slug: "hello-world"
summary: 'Notes on the state of the CSS ecosystem and tooling.'
published: true
publishedAt: ''
updatedAt: ''
---

# Hello World
*/

// #######  Config ###############################################################
const PATH_DIR_POSTS = "./data"
const defaultMetaKeys = {
  "postId": "",
  "slug": "",
  "aliasList": [],
  "title": "",
  "summary": "",
  "published": "",
  "updatedAt": "",
  "createdAt": "",
}

// #######  Functions ############################################################
function getPostPath(filename) {
  //no filename then return base path
  if (!filename) return PATH_DIR_POSTS
  return path.join(PATH_DIR_POSTS, filename)
}

function loglog({ lvl, msg }) {
  if (!lvl) lvl = 0

  if (lvl === 0) {
    console.log()
    console.log("################################################################")
    console.log(msg)
  }

  if (lvl === 1) {
    console.log();
    console.log(msg)
    console.log("----------------------------------------------------------------")
  }

  if (lvl === 2) {
    console.log(`    -> ${msg}`)
  }
}

// #######  Main ################################################################
loglog({ lvl: 0, msg: "1. Get all files in the specified directory" })
const inDirFilenameList = fs.readdirSync(getPostPath())

loglog({ lvl: 0, msg: "2. Filter out only mdx files" })
const mdxFilenameList = inDirFilenameList.filter((file) => path.extname(file) === ".mdx")

loglog({ lvl: 0, msg: "3. Get the content of each file" })
const fileConentList = mdxFilenameList.map((filename) => {
  const postPath = getPostPath(filename)
  return { data: fs.readFileSync(postPath, "utf8"), identifyer: postPath }
})

loglog({ lvl: 0, msg: "4. Do something with each file" })
loglog({ lvl: 1, msg: `4.1 Split the file into meta and content` })
const postMetaList1 = fileConentList.map(({ data, identifyer }) => {
  loglog({ lvl: 2, msg: identifyer })
  const [, split] = data.split("---")
  if (!split) throw new Error("No meta data found, need to have start and end marked with ---")
  return { data: split, identifyer }
})


loglog({ lvl: 1, msg: "4.2 Parse the meta data" })
const postMetaList2 = postMetaList1.map(({ data, identifyer }) => {
  loglog({ lvl: 2, msg: identifyer })
  return { data: yaml.load(data), identifyer }
})

loglog({ lvl: 1, msg: "4.3 Check if all meta keys are present and fill in default values (if needed)" })
const postMetaList3 = postMetaList2.map(({ data, identifyer }) => {
  loglog({ lvl: 2, msg: identifyer })
  const meta = { ...defaultMetaKeys, ...data }
  return { data: meta, identifyer }
})


loglog({ lvl: 1, msg: "4.4 Calculate postId if needed" })
const postMetaList4 = postMetaList3.map(({ data, identifyer }) => {
  if (!data.postId) {
    loglog({ lvl: 2, msg: "[RUN]...." + identifyer })
    // get all postIds and calc the next one
    const postIdList = postMetaList3.map(({ data }) => data.postId ? data.postId * 1 : 0)
    const nextPostId = Math.max(...postIdList) + 1

    // format the next postId to tempalte: 001
    const nextPostIdString = nextPostId.toString().padStart(3, "0")

    // set the postId
    data.postId = nextPostIdString
    return { data, identifyer }
  }

  loglog({ lvl: 2, msg: "[SKIP]..." + identifyer })
  return { data, identifyer }
})

console.log()
console.log();
console.log(yaml.dump(postMetaList3));

/*
// ============================================================================
loglog({ lvl: 0, msg: "5. Convert to yaml" })
const yamlString = yaml.dump(postMetaList)

loglog({ lvl: 0, msg: "6. Write to file" })
fs.writeFileSync(getPostPath("map.yml"), yamlString, "utf8")
*/