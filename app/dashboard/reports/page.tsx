"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getUserReports } from "@/lib/reports-actions"
import { format } from "date-fns"

type Report = {
  id: string
  title: string
  description: string
  planType: "basic" | "professional" | "enterprise"
  fileUrl: string
  createdAt: string
  updatedAt: string
}

export default function ReportsPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchReports() {
      if (user) {
        try {
          const userReports = await getUserReports(user.id)
          setReports(userReports)
        } catch (error) {
          console.error("Failed to fetch reports:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchReports()
  }, [user])

  const getPlanBadgeClass = (planType: string) => {
    switch (planType) {
      case "basic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "professional":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "enterprise":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const getPlanTitle = (planType: string) => {
    switch (planType) {
      case "basic":
        return "Basic Digital Footprint Scan"
      case "professional":
        return "Cyber Risk & Background OSINT Report"
      case "enterprise":
        return "Executive Due Diligence OSINT Report"
      default:
        return "Custom Report"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Reports</h2>
        <p className="text-muted-foreground">View and download your security reports based on your plan</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : reports.length > 0 ? (
        <div className="grid gap-6">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {report.title}
                  </CardTitle>
                  <CardDescription>{format(new Date(report.createdAt), "PPP")}</CardDescription>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanBadgeClass(
                    report.planType,
                  )}`}
                >
                  {getPlanTitle(report.planType)}
                </span>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{report.description}</p>
                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" /> Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>{report.title}</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-hidden">
                        <iframe src={`${report.fileUrl}#view=FitH`} className="w-full h-full" title={report.title} />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" className="gap-1" asChild>
                    <a href={report.fileUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" /> Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No reports yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              You don't have any reports yet. Reports will appear here once they are completed and uploaded by our team.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
