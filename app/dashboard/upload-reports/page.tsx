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
import { getAllUsers, type User } from "@/lib/user-actions"
import { FileUp, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function UploadReportsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [reportType, setReportType] = useState<"basic" | "professional" | "enterprise">("basic")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)

  // Check if user is an admin
  useEffect(() => {
    if (user && !["admin", "superadmin"].includes(user.role || "")) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      })
      router.push("/dashboard")
    }
  }, [user, router, toast])

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true)
        const fetchedUsers = await getAllUsers()
        // Filter out admin users, only show regular users
        const regularUsers = fetchedUsers.filter((u) => u.role !== "admin" && u.role !== "superadmin")
        setUsers(regularUsers)
        setFilteredUsers(regularUsers)
      } catch (error) {
        console.error("Failed to fetch users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user && ["admin", "superadmin"].includes(user.role || "")) {
      fetchUsers()
    }
  }, [user, toast])

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(query) ||
          u.lastName?.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query),
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId)
    setShowUploadForm(true)

    // Find the user to pre-populate the title
    const selectedUser = users.find((u) => u.id === userId)
    if (selectedUser) {
      setTitle(
        `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report for ${selectedUser.firstName} ${selectedUser.lastName}`,
      )
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
      setShowUploadForm(false)
      setSelectedUserId(null)

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

  if (!user || !["admin", "superadmin"].includes(user.role || "")) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Reports</h2>
        <p className="text-muted-foreground">Upload and manage reports for users</p>
      </div>

      {showUploadForm && selectedUserId ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload Report</CardTitle>
            <CardDescription>
              Upload a report for {users.find((u) => u.id === selectedUserId)?.firstName}{" "}
              {users.find((u) => u.id === selectedUserId)?.lastName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select
                  value={reportType}
                  onValueChange={(value) => {
                    setReportType(value as "basic" | "professional" | "enterprise")
                    // Update title when report type changes
                    const selectedUser = users.find((u) => u.id === selectedUserId)
                    if (selectedUser) {
                      const reportTypeName = value.charAt(0).toUpperCase() + value.slice(1)
                      setTitle(`${reportTypeName} Report for ${selectedUser.firstName} ${selectedUser.lastName}`)
                    }
                  }}
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

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowUploadForm(false)
                    setSelectedUserId(null)
                    setSelectedFile(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload Report"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Select a user to upload a report for</CardDescription>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Plan Tier</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id.substring(0, 8)}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>
                          {user.plan ? `${user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan` : "No Plan"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handleSelectUser(user.id)}>
                            <FileUp className="mr-2 h-4 w-4" />
                            Upload
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileUp className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No users found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? "Try a different search term" : "There are no users to display"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
