//import UniversalModal from '@/components/Modals/UniversalModal/UniversalModal'

// =========================< IMPORTS: REACT >=================================
import { useState, useRef, useEffect } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { UniversalFormModalProps } from '@/types/UniversalFormModalTypes'

// =========================< IMPORTS: COMPONENTS >============================
import RadioButtons from '@/components/RadioButtons/RadioButtons'

// =========================< IMPORTS: CSS >===================================
import './UniversalFormModal.scss'


export default function UniversalModal({
  open,
  fields,
  initialData = {},
  onClose,
  modalHeader,
  submitLabel='Submit',
  onSubmit,
  onDelete
}: UniversalFormModalProps & { initialData?: Record<string, any>, onDelete?: () => void }) {

  const modalRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')


  useEffect(() => {
    setFormData(initialData)
  }, [initialData])


  useEffect(() => {
    // Initialize default checkbox values
    const initialState: Record<string, any> = {}

    fields.flat().forEach(field => {
      if (field.type === 'checkbox') {
        initialState[field.key ?? ''] = field.defaultValue ?? false
      }
    })

    setFormData(prev => ({ ...initialState, ...prev }))
  }, [fields])


  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      // Reset modal state when it closes
      setFormData({})
      setErrors({})
      setSubmitStatus('idle')
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose])


  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))

    // Remove error for this specific key
    if (errors[key]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[key]
        return updated
      })

      // Also reset submit status
      if (submitStatus === 'error') {
        setSubmitStatus('idle')
      }
    }
  }


  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {}

    fields.flat().forEach(field => {
      if (field.required && field.key && (!formData[field.key] || !formData[field.key].toString().trim())) {
        newErrors[field.key] = true
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus('submitting')
      setTimeout(() => setSubmitStatus('error'), 200)
      return
    }

    setSubmitStatus('submitting')

    setTimeout(() => {
      try {
        onSubmit(formData)
        setSubmitStatus('success')

        setTimeout(() => {
          setSubmitStatus('idle')
          onClose()
        }, 2500)
      } catch (err) {
        console.error(err)
        setSubmitStatus('error')
      }
    }, 1200)
  }

  const firstHeaderSecondaryIndex = fields.findIndex(row =>
    row.some(field => field.type === 'header-secondary')
  )

  if (!open) {
    return null
  }


  return (
    <div className='UniversalFormModal_Overlay'>


      <div className='UniversalFormModal' ref={modalRef}>
        <div className='static-header'>
          <h1>{modalHeader}</h1>
          <div className='modal-close-fixed' onClick={onClose}>
            <div className='icon-close' />
          </div>
        </div>

        <div className='modal-body'>
          {fields.map((row, rowIndex) => (
            <div className='form-row' key={`row-${rowIndex}`}>
              {row.map((field, i) => {
                const isFirstHeaderSecondary = field.type === 'header-secondary' && rowIndex === firstHeaderSecondaryIndex
                // HEADERS
                if (field.type === 'header-main' || field.type === 'header-secondary') {
                  return (
                    <div key={`header-${rowIndex}-${i}`} className={`form-cell full-width form-${field.type} ${isFirstHeaderSecondary ? 'no-top-border' : ''}`}>
                      <div className='modal-title'>{field.label}</div>
                    </div>
                  )
                }

                // ROW SECTION HEADER
                if (field.type === 'row/section-header') {
                  return (
                    <div key={`section-header header-${rowIndex}-${i}`} className='form-cell full-width form-header-row-section'>
                      <div className='modal-title'>{field.label}</div>
                    </div>
                  )
                }

                // FIELD TYPES
                return (
                  <div className='form-cell' key={field.key}>

                    {(() => {
                      switch (field.type) {
                        case 'dropdown':
                          const isOpen = dropdownOpen === field.key

                          return (
                            <div className='form-dropdown'>
                              <div
                                className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
                                onClick={() => setDropdownOpen(isOpen ? null : field.key ?? '')}
                                tabIndex={0}
                                onBlur={(e) => {
                                  if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) {
                                    setDropdownOpen(null)
                                  }
                                }}
                              >
                                <span className='selected-value'>
                                  {field.options?.includes(formData[field.key ?? '']) ? formData[field.key ?? ''] : field.label}
                                </span>

                                <div className='label-right'>
                                  <div className={`arrow ${isOpen ? 'close-it' : 'open-it'}`} />
                                </div>
                              </div>

                              {isOpen && (
                                <div className='dropdown-options' onMouseDown={(e) => e.stopPropagation()}>
                                  {(field.options ?? []).map((opt) => (
                                    <div
                                      key={opt}
                                      className='dropdown-option'
                                      tabIndex={-1}
                                      onMouseDown={(e) => {
                                        e.preventDefault()
                                        handleChange(field.key ?? '', opt)
                                        setDropdownOpen(null)
                                      }}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )

                        case 'radio-section':
                          return (
                            <div className='radio-section'>
                              <label>{field.label}</label>
                              <RadioButtons
                                name={field.key ?? ''}
                                options={field.options ?? []}
                                selected={formData[field.key ?? '']}
                                onChange={(val) => handleChange(field.key ?? '', val)}
                                buttonsType={2}
                              />
                            </div>
                          )

                        case 'checkbox':
                          return (
                            <div className='checkbox-field'>
                              <input
                                type='checkbox'
                                id={field.key}
                                checked={formData[field.key ?? ''] ?? false}
                                onChange={(e) => handleChange(field.key ?? '', e.target.checked)}
                              />
                              <label htmlFor={field.key} className='custom-checkbox-wrapper'>
                                <span className='custom-checkbox' />
                                {field.label}
                              </label>
                            </div>
                          )

                        case 'text-input':
                        case 'text':
                        default:
                          return (
                            <div className={`text-input ${errors[field.key ?? ''] ? 'error' : ''}`}>
                              <input
                                type='text'
                                className={errors[field.key ?? ''] ? 'error' : ''}
                                value={formData[field.key ?? ''] ?? ''}
                                placeholder={field.placeholder ?? field.label}
                                onChange={e => handleChange(field.key ?? '', e.target.value)}
                              />
                              <div className='line'></div>
                            </div>
                          )
                      }
                    })()}

                  </div>
                )

              })}

            </div>
          ))}

        </div>

        <div className='modal-footer'>
          {onDelete && (
            <button
              className='delete-button'
              onClick={() => {
                if (confirm('Are you sure you want to delete this product?')) {
                  onDelete()
                }
              }}
            >Delete</button>
          )}

          <button
            className={`sub-button ${submitStatus} ${submitStatus !== 'idle' ? 'animate' : ''}`}
            onClick={handleSubmit}
            disabled={submitStatus === 'submitting'}
          >
            <span className='text'>{submitLabel}</span>

            {(submitStatus === 'error' || submitStatus === 'success') && (
              <span className='icon'>
                {submitStatus === 'error' ? (
                  <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path stroke='#fefefe' strokeWidth='2' d='M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18' />
                  </svg>
                ) : (
                  <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path stroke='#fefefe' strokeWidth='2' d='M6 12L10.2426 16.2426L18.727 7.75732' />
                  </svg>
                )}
              </span>
            )}
          </button>
        </div>

      </div>


    </div>
  )
}
