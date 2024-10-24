import { Select } from '@/components/ui/select'

type Props = {
  onPageSizeChange: (newPageSize: number) => void
  pageSize: number
}

export const PageSizeSelect = ({ onPageSizeChange, pageSize }: Props) => {
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

  // return <Select onValueChange={onValueChange} options={options} small value={`${pageSize}`} />
  return <div></div>
}
