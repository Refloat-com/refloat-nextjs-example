import { User } from "refloat-nextjs-integration/app/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "refloat-nextjs-integration/app/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "refloat-nextjs-integration/app/components/ui/avatar"

interface UserSelectorProps {
  testCustomers: User[]
  activeTestCustomer: User
  onCustomerChange: (userId: string) => void
}

export function UserSelector({ testCustomers, activeTestCustomer, onCustomerChange }: UserSelectorProps) {
  return (
    <Select value={activeTestCustomer.id} onValueChange={onCustomerChange}>
      <SelectTrigger className="w-[200px]">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={activeTestCustomer.imgSrc} />
            <AvatarFallback>{activeTestCustomer.name[0]}</AvatarFallback>
          </Avatar>
          <span className="truncate">{activeTestCustomer.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-sm font-medium text-muted-foreground">Customers</SelectLabel>
          {testCustomers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={customer.imgSrc} />
                  <AvatarFallback>{customer.name[0]}</AvatarFallback>
                </Avatar>
                <span className="truncate">{customer.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
