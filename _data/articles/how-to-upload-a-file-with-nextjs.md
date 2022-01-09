---
title: How to upload a file with nextjs
tags: nextjs
summary:
---

### Upload to the servers filesystem

```javascript
// pages/api/upload.ts

import nextConnect from "next-connect"
import multer from "multer"

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something Happened! ${error.message}`,
    })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  }),
})

// param of upload array: name of the multipart field holding the file
apiRoute.use(upload.array("file"))

apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" })
})

export default apiRoute

export const config = {
  api: {
    // Disallow body parsing, consume as stream
    bodyParser: false,
  },
}
```

### Upload to Dropbox (via Appfolder)

```javascript
import nextConnect from "next-connect"
import multerDbx from "multer-dropbox"
import multer from "multer"
import { Dropbox } from "dropbox"
import fetch from "isomorphic-fetch"

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({
      error: `Sorry something Happened! ${error.message}`,
    })
  },

  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
})

const storage = multerDbx(dbx, {
  path: function (req, file, cb) {
    cb(null, "/" + file.originalname)
  },
})

const upload = multer({ storage })

// param of upload.array: name of the multipart field holding the file
apiRoute.use(upload.array("file"))

apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
```
