interface MyButtonProps {
  type?: 'primary'
}

export function MyButton({ type }: MyButtonProps) {
  return <button className="my-button">my button: type {type}</button>
}
