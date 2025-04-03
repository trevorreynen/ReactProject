// import { ModalField, UniversalFormModalProps } from '@/types/UniversalFormModalTypes'

export type ModalField = {
  type?: 'header-main' | 'header-secondary' | 'row/section-header' | 'text-input' | 'text' | 'dropdown' | 'radio-section' | 'checkbox'
  key?: string
  label?: string
  placeholder?: string
  options?: string[]
  defaultValue?: boolean
  required?: boolean
}


export type UniversalFormModalProps = {
  open: boolean
  fields: ModalField[][]
  initialData?: {}
  onClose: () => void
  modalHeader?: string
  submitLabel?: string
  onSubmit: (formData: Record<string, any>) => void
  onDelete?: () => void
}

