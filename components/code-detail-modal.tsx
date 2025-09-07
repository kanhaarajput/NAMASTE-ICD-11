"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ExternalLink, BookOpen, Stethoscope, Leaf } from "lucide-react"
import type { CodeMapping } from "@/lib/code-systems"

interface CodeDetailModalProps {
  isOpen: boolean
  onClose: () => void
  codeMapping: CodeMapping | null
}

export function CodeDetailModal({ isOpen, onClose, codeMapping }: CodeDetailModalProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  if (!codeMapping) return null

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(label)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "severe":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{codeMapping.disease}</DialogTitle>
          <DialogDescription className="text-base">{codeMapping.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {codeMapping.category}
            </Badge>
            {codeMapping.severity && (
              <Badge className={getSeverityColor(codeMapping.severity)}>
                {codeMapping.severity.charAt(0).toUpperCase() + codeMapping.severity.slice(1)} Severity
              </Badge>
            )}
          </div>

          <Tabs defaultValue="codes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="codes">Code Systems</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
              <TabsTrigger value="synonyms">Synonyms</TabsTrigger>
            </TabsList>

            <TabsContent value="codes" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-primary" />
                      NAMASTE Code
                    </CardTitle>
                    <CardDescription>AYUSH Traditional Medicine</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <code className="text-lg font-mono bg-primary/10 px-3 py-1 rounded">
                        {codeMapping.namasteCode}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(codeMapping.namasteCode, "NAMASTE")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    {copiedCode === "NAMASTE" && <p className="text-xs text-green-600 mt-2">Copied to clipboard!</p>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2 text-secondary" />
                      ICD-11 Code
                    </CardTitle>
                    <CardDescription>WHO International Classification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <code className="text-lg font-mono bg-secondary/10 px-3 py-1 rounded">
                        {codeMapping.icd11Code}
                      </code>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(codeMapping.icd11Code, "ICD11")}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    {copiedCode === "ICD11" && <p className="text-xs text-green-600 mt-2">Copied to clipboard!</p>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-accent-foreground" />
                      WHO Code
                    </CardTitle>
                    <CardDescription>WHO Standard Terminology</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <code className="text-lg font-mono bg-accent/10 px-3 py-1 rounded">{codeMapping.whoCode}</code>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(codeMapping.whoCode, "WHO")}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    {copiedCode === "WHO" && <p className="text-xs text-green-600 mt-2">Copied to clipboard!</p>}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="treatments" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {codeMapping.ayushTreatments && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-primary" />
                        AYUSH Treatments
                      </CardTitle>
                      <CardDescription>Traditional medicine approaches</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {codeMapping.ayushTreatments.map((treatment, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-sm">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {codeMapping.modernTreatments && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Stethoscope className="w-5 h-5 mr-2 text-secondary" />
                        Modern Treatments
                      </CardTitle>
                      <CardDescription>Contemporary medical approaches</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {codeMapping.modernTreatments.map((treatment, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-sm">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="references" className="space-y-4">
              {codeMapping.crossReferences && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cross References</CardTitle>
                    <CardDescription>Related codes in other classification systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {codeMapping.crossReferences.icd10 && (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">ICD-10</p>
                          <code className="text-sm text-muted-foreground">{codeMapping.crossReferences.icd10}</code>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {codeMapping.crossReferences.snomed && (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">SNOMED CT</p>
                          <code className="text-sm text-muted-foreground">{codeMapping.crossReferences.snomed}</code>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {codeMapping.crossReferences.loinc && (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">LOINC</p>
                          <code className="text-sm text-muted-foreground">{codeMapping.crossReferences.loinc}</code>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="synonyms" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alternative Names</CardTitle>
                  <CardDescription>Other terms used to describe this condition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {codeMapping.synonyms.map((synonym, index) => (
                      <Badge key={index} variant="outline" className="bg-muted">
                        {synonym}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
