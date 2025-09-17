import { useRef } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import "./style.css"
import api from "../../services/api"
function Home() {
  const inputName = useRef<HTMLInputElement>(null)
  const inputAge = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputFavoriteFood = useRef<HTMLInputElement>(null)

  //CREATE
  async function postUsers() {
    console.log(inputName.current?.value)
    try {
      if (
        !inputName.current?.value.trim() ||
        !inputAge.current?.value.trim() ||
        !inputEmail.current?.value.trim() ||
        !inputFavoriteFood.current?.value.trim()
      ) {
        alert("Por favor, preencha todos os campos!")
        return
      }
      await api.post("/users", {
        name: inputName.current?.value,
        age: Number(inputAge.current?.value),
        email: inputEmail.current?.value,
        favoriteFood: inputFavoriteFood.current?.value,
      })
      alert("Usuario cadastrado com sucesso")
      const inputs = [inputName, inputAge, inputEmail, inputFavoriteFood]
      inputs.forEach((element) => {
        if (element.current) element.current.value = ""
      })
    } catch (err: any) {
      console.error(err)
      return err
    }
  }

  return (
    <>
      <div className="flex-grow flex items-center justify-center pt-3 overflow-hidden">
        <div className="flex flex-col items-center m-5 bg-stone-50 box-content md:box-border p-7 rounded-md font-montserrat">
          <form>
            <h1 className="font-[600] flex flex-col items-center m-1 text-2xl">
              CADASTRO DE USUÁRIOS
            </h1>
            <div id="inputs" className="flex flex-col items-center">
              <div>
                <div>
                  <Input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Digite o nome do usuário"
                    ref={inputName}
                  />
                </div>
                <div>
                  <Input
                    ref={inputEmail}
                    type="text"
                    id="femail"
                    name="femail"
                    placeholder="Digite o email do usuário"
                    className="justify-center"
                  />
                </div>
                <div>
                  <Input
                    ref={inputAge}
                    type="text"
                    id="fage"
                    name="fage"
                    className="justify-center"
                    placeholder="Digite a idade do usuário"
                  />
                </div>
                <div>
                  <Input
                    ref={inputFavoriteFood}
                    type="text"
                    id="favoriteFood"
                    name="favoriteFood"
                    className="justify-center"
                    placeholder="Digite a comida favorita"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={postUsers}
                  type="button"
                  className="font-[600] m-2 justify-center">
                  CADASTRAR USUÁRIO
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Home
