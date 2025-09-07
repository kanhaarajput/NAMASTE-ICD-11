"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Save, Download, Shield, Database, FileText, Calendar } from "lucide-react"
import type { CodeMapping } from "@/lib/code-systems"

interface SavedRecord {
  id: string
  name: string
  date: string
  codes: CodeMapping[]
  source: "search" | "upload"
  saveLocation: "local" | "abha"
  notes?: string
}

interface SaveManagerProps {
  selectedCodes: CodeMapping[]
  uploadedFiles?: any[]
}

export function SaveManager({ selectedCodes, uploadedFiles = [] }: SaveManagerProps) {
  const [saveOption, setSaveOption] = useState("")
  const [recordName, setRecordName] = useState("")
  const [notes, setNotes] = useState("")
  const [savedRecords, setSavedRecords] = useState<SavedRecord[]>([])
  const [isABHAConnected, setIsABHAConnected] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("namaste-saved-records")
      if (stored) {
        const parsedRecords = JSON.parse(stored)
        setSavedRecords(parsedRecords)
      } else {
        const sampleRecords: SavedRecord[] = [
          {
            id: "sample-1",
            name: "Sample Patient Assessment",
            date: "2024-01-15",
            codes: selectedCodes.slice(0, 2),
            source: "search",
            saveLocation: "local",
            notes: "Sample record for demonstration",
          },
        ]
        setSavedRecords(sampleRecords)
        localStorage.setItem("namaste-saved-records", JSON.stringify(sampleRecords))
      }
    } catch (error) {
      console.error("Error loading saved records:", error)
      setSavedRecords([])
    }

    const abhaStatus = localStorage.getItem("namaste-abha-connected")
    setIsABHAConnected(abhaStatus === "true")
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      if (selectedCodes.length === 0 && uploadedFiles.length === 0) {
        throw new Error("No data to save. Please select codes or upload files first.")
      }

      if (!saveOption) {
        throw new Error("Please select a save location")
      }

      if (!recordName.trim()) {
        throw new Error("Please enter a record name")
      }

      if (saveOption === "abha" && !isABHAConnected) {
        throw new Error("ABHA authentication required. Please connect your ABHA account first.")
      }

      const newRecord: SavedRecord = {
        id: `record-${Date.now()}`,
        name: recordName.trim(),
        date: new Date().toISOString().split("T")[0],
        codes: [...selectedCodes],
        source: uploadedFiles.length > 0 ? "upload" : "search",
        saveLocation: saveOption as "local" | "abha",
        notes: notes.trim() || undefined,
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (saveOption === "local") {
        const updatedRecords = [newRecord, ...savedRecords]
        localStorage.setItem("namaste-saved-records", JSON.stringify(updatedRecords))
        setSavedRecords(updatedRecords)
      } else if (saveOption === "abha") {
        const abhaResponse = await mockABHASave(newRecord)
        if (abhaResponse.success) {
          const updatedRecords = [newRecord, ...savedRecords]
          localStorage.setItem("namaste-saved-records", JSON.stringify(updatedRecords))
          setSavedRecords(updatedRecords)
        } else {
          throw new Error(abhaResponse.error || "Failed to save to ABHA")
        }
      }

      setRecordName("")
      setNotes("")
      setSaveOption("")

      alert(`Successfully saved "${newRecord.name}" ${saveOption === "local" ? "locally" : "to ABHA"}!`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setSaveError(errorMessage)
      console.error("Save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const mockABHASave = async (record: SavedRecord): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const success = Math.random() > 0.1

    if (success) {
      return { success: true }
    } else {
      return { success: false, error: "ABHA service temporarily unavailable. Please try again." }
    }
  }

  const connectABHA = async () => {
    try {
      setIsSaving(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const authSuccess = Math.random() > 0.2

      if (authSuccess) {
        setIsABHAConnected(true)
        localStorage.setItem("namaste-abha-connected", "true")
        alert("ABHA account connected successfully!")
      } else {
        throw new Error("ABHA authentication failed. Please check your credentials.")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "ABHA connection failed"
      setSaveError(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = async (format: "pdf" | "json" | "csv") => {
    if (selectedCodes.length === 0) {
      alert("No data to export. Please select codes first.")
      return
    }

    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        totalCodes: selectedCodes.length,
        codes: selectedCodes.map((code) => ({
          code: code.code,
          system: code.system,
          description: code.description,
          category: code.category,
        })),
        format,
      }

      if (format === "json") {
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `namaste-codes-${Date.now()}.json`
        link.click()
        URL.revokeObjectURL(url)
      } else if (format === "csv") {
        const csvHeader = "Code,System,Description,Category\n"
        const csvData = selectedCodes
          .map((code) => `"${code.code}","${code.system}","${code.description}","${code.category}"`)
          .join("\n")
        const csvContent = csvHeader + csvData
        const dataBlob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `namaste-codes-${Date.now()}.csv`
        link.click()
        URL.revokeObjectURL(url)
      } else {
        alert(`PDF export functionality would be implemented with a PDF library like jsPDF`)
      }

      alert(`Successfully exported ${selectedCodes.length} codes as ${format.toUpperCase()}!`)
    } catch (error) {
      console.error("Export error:", error)
      alert("Export failed. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      {saveError && (
        <Alert variant="destructive">
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Save className="w-5 h-5 mr-2 text-primary" />
            Save Medical Records
          </CardTitle>
          <CardDescription>Save your selected codes and uploaded reports for future reference</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recordName">Record Name *</Label>
            <Input
              id="recordName"
              placeholder="e.g., Patient Assessment - John Doe"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="saveLocation">Save Location *</Label>
            <Select value={saveOption} onValueChange={setSaveOption}>
              <SelectTrigger>
                <SelectValue placeholder="Choose save location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">
                  <div className="flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    Save Locally
                  </div>
                </SelectItem>
                <SelectItem value="abha">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Save to ABHA
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {saveOption === "abha" && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>ABHA integration for secure health data storage</span>
                {!isABHAConnected && (
                  <Button variant="outline" size="sm" onClick={connectABHA} disabled={isSaving}>
                    {isSaving ? "Connecting..." : "Connect ABHA"}
                  </Button>
                )}
                {isABHAConnected && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium mb-2">Data Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Selected Codes:</span>
                <span className="ml-2 font-medium">{selectedCodes.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Uploaded Files:</span>
                <span className="ml-2 font-medium">{uploadedFiles.length}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={(selectedCodes.length === 0 && uploadedFiles.length === 0) || isSaving}
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Record"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <Download className="w-5 h-5 mr-2 text-primary" />
            Export Options
          </CardTitle>
          <CardDescription>Export your data in various formats</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => handleExport("pdf")}
            disabled={selectedCodes.length === 0}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export as PDF Report
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => handleExport("csv")}
            disabled={selectedCodes.length === 0}
          >
            <Database className="w-4 h-4 mr-2" />
            Export as CSV
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => handleExport("json")}
            disabled={selectedCodes.length === 0}
          >
            <FileText className="w-4 h-4 mr-2" />
            Export as JSON
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            Recent Records
          </CardTitle>
          <CardDescription>Your recently saved medical records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{record.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {record.date}
                      </span>
                      <span className="flex items-center">
                        <Database className="w-3 h-3 mr-1" />
                        {record.codes.length} codes
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {record.source}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      record.saveLocation === "abha" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {record.saveLocation.toUpperCase()}
                  </Badge>
                </div>
                {record.notes && <p className="text-sm text-muted-foreground mt-2">{record.notes}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
