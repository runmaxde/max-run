# How to upload a file with nextjs

``` javascript
// pages/api/upload.ts

import nextConnect from 'next-connect'
import multer from 'multer'

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
        destination: './public/uploads',
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        },
    }),
})

// param of upload array: name of the multipart field holding the file
apiRoute.use(upload.array('file'))

apiRoute.post((req, res) => {
    res.status(200).json({ data: 'success' })
})

export default apiRoute

export const config = {
    api: {
        // Disallow body parsing, consume as stream
        bodyParser: false,
    },
}
```
