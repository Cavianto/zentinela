"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { uploadReport } from "@/lib/reports-actions"
import { FileUp, Users } from "lucide-react"

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
}

export default function AdminReportsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([
    { id: "user_123", email: "user@example.com", firstName: "John", lastName: "Doe" },
    { id: "user_456", email: "jane@example.com", firstName: "Jane", lastName: "Smith" },
    { id: "user_789", email: "bob@example.com", firstName: "Bob", lastName: "Johnson" },
  ])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [reportType, setReportType] = useState<"basic" | "professional" | "enterprise">("basic")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Check if user is a super admin
  useEffect(() => {
    if (user && user.role !== "superadmin") {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      })
      router.push("/dashboard")
    }
  }, [user, router, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile || !selectedUserId || !title || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a file.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await uploadReport(user?.id || "", selectedUserId, {
        title,
        description,
        planType: reportType,
        file: selectedFile,
      })

      toast({
        title: "Report uploaded",
        description: "The report has been successfully uploaded for the user.",
      })

      // Reset form
      setSelectedFile(null)
      setTitle("")
      setDescription("")
      setSelectedUserId("")

      // Reset file input
      const fileInput = document.getElementById("report-file") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to upload report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || user.role !== "superadmin") {
    return null
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Upload reports for users</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Report</CardTitle>
            <CardDescription>Create and assign a new report to a user</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user">Select User</Label>
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select
                  value={reportType}
                  onValueChange={(value) => setReportType(value as "basic" | "professional" | "enterprise")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Digital Footprint Scan</SelectItem>
                    <SelectItem value="professional">Cyber Risk & Background OSINT Report</SelectItem>
                    <SelectItem value="enterprise">Executive Due Diligence OSINT Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter report title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a brief description of the report"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-file">Upload PDF Report</Label>
                <Input id="report-file" type="file" accept=".pdf" onChange={handleFileChange} required />
                <p className="text-xs text-muted-foreground mt-1">
                  Only PDF files are accepted. Maximum file size: 10MB
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload Report"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Guide</CardTitle>
              <CardDescription>How to upload reports for users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">1. Select a User</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose the user who should receive this report from the dropdown menu.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <FileUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">2. Upload the Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill in the report details and upload the PDF file. Make sure the file is properly formatted and
                    contains all necessary information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Types</CardTitle>
              <CardDescription>Overview of different report types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Basic Digital Footprint Scan</h3>
                <p className="text-sm text-muted-foreground">
                  A quick review of a candidate's public online presence. Turnaround: 2-3 business days.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Cyber Risk & Background OSINT Report</h3>
                <p className="text-sm text-muted-foreground">
                  A comprehensive view of online identity and cybersecurity posture. Turnaround: 4-5 business days.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Executive Due Diligence OSINT Report</h3>
                <p className="text-sm text-muted-foreground">
                  In-depth due diligence for strategic or sensitive hires. Turnaround: 5-7 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
