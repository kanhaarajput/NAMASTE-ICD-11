"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { CodeDetailModal } from "@/components/code-detail-modal"
import { FileUpload } from "@/components/file-upload"
import { SaveManager } from "@/components/save-manager"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Search, Upload, Database, FileText, User, LogOut, Settings, BookOpen, Eye, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { CodeSystemService, type CodeMapping, codeSystemInfo } from "@/lib/code-systems"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCodeSystem, setSelectedCodeSystem] = useState("")
  const [searchResults, setSearchResults] = useState<CodeMapping[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedResults, setSelectedResults] = useState<string[]>([])
  const [selectedCodeMapping, setSelectedCodeMapping] = useState<CodeMapping | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Header animation
      gsap.fromTo(".dashboard-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

      // Main content animation
      gsap.fromTo(
        ".main-content",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.2, ease: "power3.out" },
      )

      // Sidebar animation
      gsap.fromTo(
        ".sidebar-content",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.4, ease: "power3.out" },
      )

      // Floating leaf animations
      gsap.to(".floating-leaf", {
        y: -12,
        rotation: 6,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.7,
      })

      // Search results animation
      gsap.fromTo(
        ".search-result-item",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".search-results-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    loadGSAP()
  }, [])

  useEffect(() => {
    if (searchResults.length > 0) {
      const loadGSAP = async () => {
        const { gsap } = await import("gsap")
        gsap.fromTo(
          ".search-result-item",
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          },
        )
      }
      loadGSAP()
    }
  }, [searchResults])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const results = CodeSystemService.searchDiseases(searchQuery, selectedCodeSystem)
    setSearchResults(results)
    setIsSearching(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleResultSelect = (resultId: string) => {
    setSelectedResults((prev) => (prev.includes(resultId) ? prev.filter((id) => id !== resultId) : [...prev, resultId]))
  }

  const handleViewDetails = (codeMapping: CodeMapping) => {
    setSelectedCodeMapping(codeMapping)
    setIsDetailModalOpen(true)
  }

  const handleFilesProcessed = (files: any[]) => {
    setUploadedFiles(files)
  }

  const getSelectedCodeMappings = (): CodeMapping[] => {
    return searchResults.filter((result) => selectedResults.includes(result.id))
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background leaf-pattern-bg relative overflow-hidden">
        <div className="absolute top-32 left-16 floating-leaf">
          <Leaf className="w-8 h-8 text-primary/20" />
        </div>
        <div className="absolute top-64 right-20 floating-leaf">
          <Leaf className="w-6 h-6 text-secondary/25" />
        </div>
        <div className="absolute bottom-40 left-1/4 floating-leaf">
          <Leaf className="w-10 h-10 text-primary/15" />
        </div>
        <div className="absolute bottom-20 right-1/3 floating-leaf">
          <Leaf className="w-7 h-7 text-secondary/20" />
        </div>

        <header className="dashboard-header border-b border-border nature-glass-effect sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-[#e8f5e9] rounded-lg flex items-center justify-center animate-organic-pulse leaf-shadow overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-xl nature-text-gradient">NAMASTE + ICD-11</h1>
                  <p className="text-sm text-muted-foreground">Healthcare Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="organic-hover">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="organic-hover">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="organic-hover border-primary/30 hover:border-primary bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="main-content lg:col-span-2 space-y-6">
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-2 nature-glass-effect border border-primary/20">
                  <TabsTrigger
                    value="search"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Disease Search
                  </TabsTrigger>
                  <TabsTrigger
                    value="upload"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Report Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="search" className="space-y-6">
                  <Card className="nature-glass-effect border-primary/20 leaf-shadow">
                    <CardHeader>
                      <CardTitle className="font-serif flex items-center nature-text-gradient">
                        <Search className="w-5 h-5 mr-2 text-primary" />
                        Disease Code Search
                      </CardTitle>
                      <CardDescription>
                        Search for diseases and retrieve corresponding NAMASTE, ICD-11, and WHO standard codes for
                        traditional and modern medicine
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Label htmlFor="search" className="text-foreground font-medium">
                            Disease Name
                          </Label>
                          <Input
                            id="search"
                            placeholder="Search by disease name (e.g., diabetes, hypertension)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            className="h-11 border-primary/20 focus:border-primary focus:ring-primary/30"
                          />
                        </div>
                        <div className="w-64">
                          <Label htmlFor="codeSystem" className="text-foreground font-medium">
                            Code System Filter
                          </Label>
                          <Select value={selectedCodeSystem} onValueChange={setSelectedCodeSystem}>
                            <SelectTrigger className="h-11 border-primary/20 focus:border-primary focus:ring-primary/30">
                              <SelectValue placeholder="Select Code System" />
                            </SelectTrigger>
                            <SelectContent className="nature-glass-effect border-primary/20">
                              <SelectItem value="all">All Systems</SelectItem>
                              <SelectItem value="namaste">NAMASTE Code</SelectItem>
                              <SelectItem value="icd11">ICD-11 TM2</SelectItem>
                              <SelectItem value="who">WHO Standard Terminologies</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="organic-button w-full h-11 text-primary-foreground"
                      >
                        {isSearching ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Search Diseases
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {searchResults.length > 0 && (
                    <Card className="search-results-container nature-glass-effect border-primary/20 leaf-shadow">
                      <CardHeader>
                        <CardTitle className="font-serif nature-text-gradient">Search Results</CardTitle>
                        <CardDescription>
                          Found {searchResults.length} matching diseases with traditional and modern medicine codes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {searchResults.map((result) => (
                            <div
                              key={result.id}
                              className={`search-result-item p-4 border rounded-lg transition-all duration-300 organic-hover ${
                                selectedResults.includes(result.id)
                                  ? "border-primary bg-primary/10 leaf-shadow"
                                  : "border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-serif font-semibold text-lg nature-text-gradient">
                                      {result.disease}
                                    </h3>
                                    {result.severity && (
                                      <Badge
                                        variant="outline"
                                        className={
                                          result.severity === "mild"
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : result.severity === "moderate"
                                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                              : "bg-red-100 text-red-800 border-red-200"
                                        }
                                      >
                                        {result.severity}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground text-sm mb-3">{result.description}</p>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                                      NAMASTE: {result.namasteCode}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="bg-secondary/10 text-secondary border-secondary/30"
                                    >
                                      ICD-11: {result.icd11Code}
                                    </Badge>
                                    <Badge
                                      variant="outline"
                                      className="bg-accent/10 text-accent-foreground border-accent/30"
                                    >
                                      WHO: {result.whoCode}
                                    </Badge>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewDetails(result)}
                                      className="organic-hover border-primary/30 hover:border-primary"
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View Details
                                    </Button>
                                    <Button
                                      variant={selectedResults.includes(result.id) ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => handleResultSelect(result.id)}
                                      className={
                                        selectedResults.includes(result.id)
                                          ? "organic-button"
                                          : "organic-hover border-primary/30 hover:border-primary"
                                      }
                                    >
                                      {selectedResults.includes(result.id) ? "Selected" : "Select"}
                                    </Button>
                                  </div>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="ml-4 bg-secondary/20 text-secondary border-secondary/30"
                                >
                                  {result.category}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="upload" className="space-y-6">
                  <Card className="nature-glass-effect border-primary/20 leaf-shadow">
                    <CardHeader>
                      <CardTitle className="font-serif flex items-center nature-text-gradient">
                        <Upload className="w-5 h-5 mr-2 text-primary" />
                        Medical Report Upload
                      </CardTitle>
                      <CardDescription>
                        Upload medical reports for automatic code extraction using AI-powered analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUpload onFilesProcessed={handleFilesProcessed} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="sidebar-content space-y-6">
              {/* Save Manager */}
              <SaveManager selectedCodes={getSelectedCodeMappings()} uploadedFiles={uploadedFiles} />

              <Card className="nature-glass-effect border-primary/20 leaf-shadow">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center nature-text-gradient">
                    <Database className="w-5 h-5 mr-2 text-primary" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(codeSystemInfo).map(([key, info]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-foreground">{info.system.toUpperCase()}</span>
                        <p className="text-xs text-muted-foreground">v{info.version}</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  ))}
                  <Separator className="bg-primary/20" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Searches Today</span>
                    <span className="text-sm font-medium text-primary">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database Records</span>
                    <span className="text-sm font-medium text-primary">95,420</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="nature-glass-effect border-primary/20 leaf-shadow">
                <CardHeader>
                  <CardTitle className="font-serif flex items-center nature-text-gradient">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start organic-hover" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    NAMASTE Documentation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start organic-hover" size="sm">
                    <Database className="w-4 h-4 mr-2" />
                    ICD-11 Reference
                  </Button>
                  <Button variant="ghost" className="w-full justify-start organic-hover" size="sm">
                    <img src="/logo.png" alt="Logo" className="w-4 h-4 mr-2 object-contain" />
                    WHO Guidelines
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <CodeDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          codeMapping={selectedCodeMapping}
        />
      </div>
    </AuthGuard>
  )
}
