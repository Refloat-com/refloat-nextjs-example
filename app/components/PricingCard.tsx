import { Check } from "lucide-react"

import { Plan } from "refloat-nextjs-integration/app/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "refloat-nextjs-integration/app/components/ui/card"
import { Button } from "refloat-nextjs-integration/app/components/ui/button"
import { Badge } from "refloat-nextjs-integration/app/components/ui/badge"
import { cn } from "refloat-nextjs-integration/app/utils/utils"

interface PricingCardProps {
  plan: Plan
  isActive: boolean
  onCancel: () => void
}

export function PricingCard({ plan, isActive, onCancel }: PricingCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all hover:shadow-lg",
      isActive ? "border-2 border-blue-600 dark:border-blue-400" : "border-[1px] border-gray-200"
    )}>
      {isActive && (
        <div className="absolute top-4 right-4">
          <Badge variant="default" className="bg-blue-600 hover:bg-blue-600">
            Current Plan
          </Badge>
        </div>
      )}

      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="flex items-baseline justify-center space-x-1 text-blue-700 dark:text-blue-200">
          <span className="text-4xl font-bold  tracking-tight">${plan.price.int}</span>
          <span className="text-2xl  font-semibold">.{plan.price.float}</span>
          <span className="ml-1  text-muted-foreground">/month</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 text-sm">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="flex items-center">
              <Check className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-muted-foreground">
                {`Premium ${plan.name} feature ${i}`}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        {isActive ? (
          <Button
            variant="destructive"
            className="w-full font-semibold text-md"
            size="lg"
            onClick={onCancel}
          >
            Cancel Plan
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full text-muted-foreground pt-2 text-sm bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            disabled
          >
            Not Available
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
