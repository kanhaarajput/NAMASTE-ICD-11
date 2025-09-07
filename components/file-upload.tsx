"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"

interface UploadedFile {
  id: string
  file: File
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  extractedCodes?: {
    namasteCode: string
    icd11Code: string
    whoCode: string
    confidence: number
  }[]
  error?: string
}

interface FileUploadProps {
  onFilesProcessed: (files: UploadedFile[]) => void
}

export function FileUpload({ onFilesProcessed }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const processFile = async (file: File): Promise<UploadedFile> => {
    const fileId = Math.random().toString(36).substr(2, 9)

    const uploadedFile: UploadedFile = {
      id: fileId,
      file,
      status: "uploading",
      progress: 0,
    }

    // Simulate file upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      uploadedFile.progress = progress
      setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...uploadedFile } : f)))
    }

    uploadedFile.status = "processing"
    setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...uploadedFile } : f)))

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock extracted codes based on file name or content
    const mockExtractedCodes = [
      {
        namasteCode: "NAM-DM-002",
        icd11Code: "5A11.0",
        whoCode: "WHO-DM-T2",
        confidence: 0.92,
      },
      {
        namasteCode: "NAM-HTN-001",
        icd11Code: "BA00",
        whoCode: "WHO-HTN-ESS",
        confidence: 0.87,
      },
    ]

    uploadedFile.status = "completed"
    uploadedFile.extractedCodes = mockExtractedCodes

    return uploadedFile
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        status: "uploading" as const,
        progress: 0,
      }))

      setUploadedFiles((prev) => [...prev, ...newFiles])

      // Process each file
      const processedFiles = await Promise.all(acceptedFiles.map((file) => processFile(file)))

      setUploadedFiles((prev) => {
        const updated = prev.map((f) => {
          const processed = processedFiles.find((p) => p.file.name === f.file.name)
          return processed || f
        })
        onFilesProcessed(updated.filter((f) => f.status === "completed"))
        return updated
      })
    },
    [onFilesProcessed],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-blue-600" />
    }
  }

  const getStatusColor = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        {isDragActive ? (
          <p className="text-primary font-medium">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-foreground font-medium mb-2">Drag and drop medical reports here, or click to browse</p>
            <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOC, DOCX, TXT files (max 10MB each)</p>
            <Button variant="outline" className="bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Uploaded Reports</CardTitle>
            <CardDescription>
              {uploadedFiles.filter((f) => f.status === "completed").length} of {uploadedFiles.length} files processed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(file.status)}
                    <div>
                      <p className="font-medium text-sm">{file.file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(file.status)}>
                      {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {(file.status === "uploading" || file.status === "processing") && (
                  <div className="space-y-2">
                    <Progress value={file.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {file.status === "uploading" ? "Uploading..." : "Processing with AI..."}
                    </p>
                  </div>
                )}

                {file.status === "completed" && file.extractedCodes && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-green-700">
                      Extracted {file.extractedCodes.length} medical codes:
                    </p>
                    <div className="space-y-2">
                      {file.extractedCodes.map((code, index) => (
                        <div key={index} className="bg-muted rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                NAMASTE: {code.namasteCode}
                              </Badge>
                              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                                ICD-11: {code.icd11Code}
                              </Badge>
                              <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
                                WHO: {code.whoCode}
                              </Badge>
                            </div>
                            <Badge variant="secondary">{Math.round(code.confidence * 100)}% confidence</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {file.status === "error" && file.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{file.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
