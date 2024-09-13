import type { Meta, StoryObj } from '@storybook/react'

import { Table, TableBody, TableBodyCell, TableHead, TableHeadCell, TableRow } from './'

const meta = {
  argTypes: {},
  component: Table,
  tags: ['autodocs'],
  title: 'Components/ui/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableDefault: Story = {
  args: {},
  render: () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Date of Payment</TableHeadCell>
            <TableHeadCell>End date of subscription</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Subscription Type</TableHeadCell>
            <TableHeadCell>My payments</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableBodyCell>12.12.2022</TableBodyCell>
            <TableBodyCell>12.12.2022</TableBodyCell>
            <TableBodyCell>$10</TableBodyCell>
            <TableBodyCell>1 day</TableBodyCell>
            <TableBodyCell>Stripe</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>12.12.2022</TableBodyCell>
            <TableBodyCell>12.12.2022</TableBodyCell>
            <TableBodyCell>$50</TableBodyCell>
            <TableBodyCell>7 days</TableBodyCell>
            <TableBodyCell>PayPal</TableBodyCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  },
}
