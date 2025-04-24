"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Security</h2>
        <p className="text-muted-foreground">Monitor and manage your security settings and status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Overview
          </CardTitle>
          <CardDescription>Your current security status and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Overall Security Score</div>
                <div className="text-sm font-medium">92%</div>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Strengths</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Strong Password</p>
                      <p className="text-sm text-muted-foreground">Your password meets security requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Regular Logins</p>
                      <p className="text-sm text-muted-foreground">You regularly monitor your account</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Up-to-date Contact Info</p>
                      <p className="text-sm text-muted-foreground">Your contact information is current</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Weaknesses</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication Disabled</p>
                      <p className="text-sm text-muted-foreground">Enable 2FA for additional security</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Password Age</p>
                      <p className="text-sm text-muted-foreground">Your password is 3 months old</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Recent Security Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Successful login</p>
                  <p className="text-xs text-muted-foreground">Today, 10:32 AM • IP: 192.168.1.1</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="rounded-full bg-amber-500/10 p-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Failed login attempt</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 8:15 PM • IP: 203.0.113.1</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Password changed</p>
                  <p className="text-xs text-muted-foreground">3 months ago • IP: 192.168.1.1</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Use a password manager</h3>
                <p className="text-sm text-muted-foreground">
                  Password managers help you create and store strong, unique passwords for all your accounts.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Enable two-factor authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by requiring a second form of verification.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Be cautious of phishing attempts</h3>
                <p className="text-sm text-muted-foreground">
                  Always verify the sender's email address and don't click on suspicious links.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
