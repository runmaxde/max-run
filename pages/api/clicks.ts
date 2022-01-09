import { NextApiRequest as NReq, NextApiResponse as NRes } from "next"
import prisma from "@/lib/prisma"

function handleRead(pathname) {
  return prisma.pageViews.findUnique({
    where: {
      pathname: pathname,
    },
  })
}

async function handleUpdate(pathname) {
  return await prisma.pageViews.upsert({
    where: {
      pathname: pathname,
    },
    update: {
      count: { increment: 1 },
    },
    create: {
      pathname: pathname,
      count: 1,
    },
  })
}

export default async function handler(req: NReq, res: NRes) {
  const { pathname } = req.body.params

  if (!pathname) {
    res.status(400).json({ error: "pathname is required" })
    return
  }

  if (req.method === "POST") {
    const result = await handleUpdate(pathname)
    res.status(200).json({ ...result })
    return
  }

  if (req.method === "GET") {
    const result = await handleRead(pathname)
    res.status(200).json({ ...result })
    return
  }
}
