import { Select } from '@/components/ui/select'

type Props = {
  pageSize: number
  onPageSizeChange: (newPageSize: number) => void
}

export const PageSizeSelect = ({ pageSize, onPageSizeChange }: Props) => {
  const options = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '30', value: '30' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
  ]

  const onValueChange = (value: string) => {
    onPageSizeChange(+value)
  }

  return <Select options={options} value={`${pageSize}`} onValueChange={onValueChange} />
}
