interface TextInputProps<T> {
  onChange?: (value: T) => void
  name?: string
  placeholder?: string
  value?: T
  min?: T extends number ? number : never
  max?: T extends number ? number : never
}

const TextInput = <T extends number | string = string>({
  onChange,
  name,
  placeholder,
  value,
  min,
  max
}: TextInputProps<T>) => {
  const number = typeof value === 'number'
  const type = number ? 'number' : 'text'
  return (
    <input
      value={value}
      type={type}
      name={name}
      id={name}
      min={min}
      max={max}
      placeholder={placeholder}
      onChange={(e) =>
        onChange && onChange((number ? +e.target.value : e.target.value) as T)
      }
      className="border text-gray-800 text-sm focus:outline-none focus:shadow-md block w-full p-2.5 rounded"
    />
  )
}

export default TextInput
