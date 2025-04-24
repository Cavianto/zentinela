"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Shield, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"
import { checkout } from "@/lib/stripe-actions"

export default function PlansPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$29",
      description: "Essential security for small businesses",
      features: ["Basic threat protection", "Email security", "24/7 support"],
    },
    {
      id: "professional",
      name: "Professional",
      price: "$79",
      description: "Advanced security for growing businesses",
      features: ["Advanced threat protection", "Data encryption", "Vulnerability scanning", "Priority support"],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$199",
      description: "Complete security for large organizations",
      features: [
        "Complete security suite",
        "Advanced data protection",
        "Custom security policies",
        "Dedicated security team",
        "24/7 premium support",
      ],
    },
  ]

  async function handleCheckout(planId: string) {
    setIsLoading(planId)

    try {
      const url = await checkout(planId)
      window.location.href = url
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to process checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
        <p className="text-muted-foreground">Choose the right security plan for your needs</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-primary" : ""}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {plan.name}
              </CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleCheckout(plan.id)}
                disabled={isLoading === plan.id}
                variant={user?.plan === plan.id ? "outline" : "default"}
              >
                {isLoading === plan.id ? "Processing..." : user?.plan === plan.id ? "Current Plan" : "Subscribe"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.plan ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">{plans.find((p) => p.id === user.plan)?.name || "Unknown"} Plan</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your subscription renews on {new Date().toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              You are currently on the free plan. Upgrade to access premium features.
            </p>
          )}
        </CardContent>
        {user?.plan && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              Manage Subscription
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
