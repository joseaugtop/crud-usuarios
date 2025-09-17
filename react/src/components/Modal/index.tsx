import { HandleClose } from "../../utils/HandleClose"

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 bg-black/1 backdrop-blur-[1px] flex justify-center items-center"
      id="wrapper"
      onClick={() => HandleClose(event, onClose)}>
      <div className="w-[350px] flex flex-col">
        <div {...children} className="bg-white p-2 rounded">
          {children}
        </div>
      </div>
    </div>
  )
}
export default Modal
