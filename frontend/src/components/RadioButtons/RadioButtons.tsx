// import RadioButtons from '@/components/RadioButtons/RadioButtons'

// =========================< IMPORTS: REACT >=================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: CSS >===================================
import './RadioButtons.scss'


type RadioButtonsProps = {
  name: string
  options: string[]
  selected?: string
  onChange: (value: string) => void
  buttonsType?: 1 | 2
}


export default function RadioButtons({ name, options, selected, onChange, buttonsType = 1 }: RadioButtonsProps) {
  return (
    <div className={`RadioButtons type-${buttonsType}`}>
      {buttonsType === 1 && options.map((option, index) => {
        const id = `${name}-type1-${index}`
        return (
          <label htmlFor={id} className='l-radio' key={option}>
            <input
              type='radio'
              id={id}
              name={name}
              checked={selected === option}
              onChange={() => onChange(option)}
              tabIndex={index + 1}
            />
            <span>{option}</span>
          </label>
        )
      })}

      {buttonsType === 2 && (
        <div className='button-radio-group'>
          {options.map((option, index) => {
            const id = `${name}-type2-${index}`
            return (
              <input
                key={option}
                type='radio'
                id={id}
                name={name}
                value={option}
                {...({ label: option } as any)} // Label added this way to bypass type errors. (works as intended anyways)
                checked={selected === option}
                onChange={() => onChange(option)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
