import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

console.log(prisma)

app.get("/users", async (req: any, res: any) => {
  try {
    let users: any = []
    if (req.query) {
      users = await prisma.user.findMany({
        where: {
          name: req.query.name,
          email: req.query.email,
          age: req.query.age,
          id: req.query.id,
          favoriteFood: req.query.favoriteFood,
        },
      })
    } else {
      users = await prisma.user.findMany()
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(500).console.error(error).json("Could not get users")
  }
})

app.post("/users", async (req: any, res: any) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        age: Number(req.body.age),
        favoriteFood: req.body.favoriteFood,
        email: req.body.email,
      },
    })
    res.status(201).json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create user" })
  }
})

app.put("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    })
    if (!user) {
      console.log("user not found")
      return res.status(500).json({ error: "user not found" })
    }

    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: Number(req.body.age),
        favoriteFood: req.body.favoriteFood,
      },
    })
    res.status(201).json(req.body)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "could not update user" })
  }
})

app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json({ message: "user deleted sucessfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "it is not possible to delete this user" })
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
