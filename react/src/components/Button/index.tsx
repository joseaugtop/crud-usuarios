function Button(props: any) {
  return (
    <button
      {...props}
      type="button"
      className={`text-white bg-indigo-800 hover:bg-indigo-900
        font-medium rounded-lg text-xl px-5 py-2.5 ${props.className}`}>
      {props.children}
    </button>
  )
}
export default Button
