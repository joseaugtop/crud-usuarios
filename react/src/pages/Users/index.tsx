import { useState } from "react"
import Modal from "../../components/Modal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FaUserGear } from "react-icons/fa6"
import { FaTrash } from "react-icons/fa"
import Input from "../../components/Input/index.tsx"
import Button from "../../components/Button/index.tsx"
import { deleteUser, fetchUsers, updateUser } from "../../services/usersApi.ts"
import { BallPulse } from 'react-loading-indicators'
function Users() {
  //   const users = [
  //     {
  //       id: "kaodowaldaç2-0203",
  //       name: "joao",
  //       email: "joao@email.com",
  //       age: "19",
  //       favoriteFood: "maçã do amor",
  //     },
  //     {
  //       id: "qekple21-0233",
  //       name: "aline",
  //       email: "aline@email.com",
  //       age: "28",
  //       favoriteFood: "moranog do amor",
  //     },
  //   ]

  const [showModal, setShowModal] = useState(false) //-> Mostra o modal de edição
  const [selectedUser, setSelectedUser] = useState<any>() //-> Cria um estado de usuário selecionado
  const [formData, setFormData] = useState<any>() //-> Dados do formulário de edição
  const queryClient = useQueryClient()

  // BUSCAR USUÁRIOS

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  //DELETAR USUÁRIO
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  //EDITAR USUÁRIO
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  //Editar Usuário
  async function updateUsers() {
    //Verificando se tem algo vazio no formulário de edição
    if (!formData ||Object.values(formData).some((value: any) => String(value).trim() === ""))  {
      alert("por favor, preencha todos os campos")
      return
    }
    //DADOS PARA ENVIAR, converte age para string pois formData pega os dados dos Inputs e tudo que vem de Input é string
    const dataToSend = {
      ...formData, //SPREAD SYNTAX -> vai pegar tudo que vem do objeto formData e adicionar para dataToSend
      age: Number(formData.age), //-> vai substituir o conteudo de age do objeto pois ele já existe
    }
    if (!Number.isInteger(dataToSend.age)) {
      //se dataToSend.age for diferente de um numero inteiro
      alert("Insira um numero inteiro para idade")
      return
    }
    updateMutation.mutate({ id: selectedUser.id, data: dataToSend })
    setShowModal(false)
  }

  function userModal(user: any) {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      favoriteFood: user.favoriteFood,
    })
    setShowModal(true)
  }

  function handleChange(element: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = element.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }
  if (isLoading) return <BallPulse color="#ffffff" size={30} />
  if (isError) return <p>Erro ao carregar usuários</p>
  return (
    <>
    <ThreeDot color="#ffffff" size="medium" text="" textColor="" />
      {users.map((user: any) => (
        <div className="flex justify-center">
          <div className="flex flex-col m-5 bg-stone-50 box-content  p-7 rounded-md font-montserrat w-[350px]">
            <div key={user.id}>
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>Idade:</strong> {user.age}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Comida favorita:</strong> {user.favoriteFood}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => userModal(user)}
                className="cursor-pointer">
                <FaUserGear size={30} />
              </button>
              <button
                onClick={() => deleteMutation.mutate(user.id)}
                className="cursor-pointer">
                <FaTrash size={26} />
              </button>
            </div>
          </div>
          <Modal
            isVisible={showModal}
            onClose={() => {
              setShowModal(false)
            }}>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-5 flex justify-center">
                {`Editar ${selectedUser?.name || "Usuário"}`}
              </h3>
              <div id="inputs" className="flex flex-col items-center">
                <div>
                  <div>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Digite o nome do usuário"
                      value={formData?.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Digite o email do usuário"
                      className="justify-center"
                      value={formData?.email || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="age"
                      name="age"
                      className="justify-center"
                      placeholder="Digite a idade do usuário"
                      value={formData?.age || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      id="favoriteFood"
                      name="favoriteFood"
                      className="justify-center"
                      placeholder="Digite a comida favorita"
                      value={formData?.favoriteFood || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center pt-5">
                <div>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                </div>
                <div>
                  <Button onClick={updateUsers}>Salvar</Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      ))}
    </>
  )
}
export default Users
