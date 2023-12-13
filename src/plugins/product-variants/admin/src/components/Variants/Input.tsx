import React from 'react'
import { useIntl } from 'react-intl'

const Input = React.forwardRef((props: any, ref: any) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props // these are just some of the props passed by the content-manager

  const { formatMessage } = useIntl()

  const handleChange = (e: any) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    })
  }

  return (
    <label>
      {formatMessage(intlLabel)}
      <input
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
      />
    </label>
  )
})

export default Input
