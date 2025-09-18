import api from "./api"

//GET
export const fetchUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const res = await api.get("/users")
  return res.data
}

//POST
export const createUser = async (data: any) => {
  const res = await api.post("/users", data)
  return res.data
}

//UPDATE

export const updateUser = async (id: string, data: any) => {
  const res = await api.put(`/users/${id}`, data)
  return res.data
}

//DELETE
export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`)
  return res.data
}
