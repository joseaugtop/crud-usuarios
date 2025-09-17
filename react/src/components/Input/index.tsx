function Input(props: any) {
  return (
    <input
      {...props}
      className={`m- w-50, bg-stone-200 m-1.5 p-3.5 rounded-3xl ${props.className}`}
    />
  )
}

export default Input
