"use client"

import { useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  ArrowRight,
  Search,
  Database,
  FileText,
  Shield,
  Sparkles,
  BookOpen,
  Heart,
  Stethoscope,
  Brain,
  Activity,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Hero section animation
      gsap.fromTo(".hero-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })

      // Feature cards animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Floating leaf animations
      gsap.to(".floating-leaf", {
        y: -15,
        rotation: 8,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      })

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    loadGSAP()
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background leaf-pattern-bg relative overflow-hidden">
        {/* Floating leaves */}
        <div className="absolute top-20 left-10 floating-leaf">
          <Leaf className="w-12 h-12 text-primary/20" />
        </div>
        <div className="absolute top-40 right-16 floating-leaf">
          <Leaf className="w-8 h-8 text-secondary/30" />
        </div>
        <div className="absolute bottom-32 left-1/4 floating-leaf">
          <Leaf className="w-10 h-10 text-primary/15" />
        </div>
        <div className="absolute bottom-20 right-1/3 floating-leaf">
          <Leaf className="w-6 h-6 text-secondary/25" />
        </div>

        {/* Header */}
        <header className="border-b border-border nature-glass-effect sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center animate-organic-pulse leaf-shadow">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-xl nature-text-gradient">NAMASTE + ICD-11</h1>
                  <p className="text-sm text-muted-foreground">Integration Portal</p>
                </div>
              </div>
              <Button onClick={() => router.push("/dashboard")} className="organic-button text-primary-foreground">
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Hero Section */}
          <section className="hero-content text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Smart India Hackathon Project
              </Badge>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 nature-text-gradient leading-tight">
                Bridging Traditional & Modern Medicine
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Welcome to the NAMASTE + ICD-11 Integration Portal - a revolutionary healthcare interoperability system
                that seamlessly connects AYUSH traditional medicine practices with modern medical coding standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => router.push("/dashboard")}
                  className="organic-button text-primary-foreground h-12 px-8"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Start Searching Diseases
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="organic-hover border-primary/30 hover:border-primary h-12 px-8 bg-transparent"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="nature-glass-effect border-primary/20 leaf-shadow">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="font-serif text-3xl nature-text-gradient mb-4">About Our Mission</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Empowering healthcare professionals with seamless integration between traditional AYUSH practices
                    and modern medical coding systems for comprehensive patient care.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold nature-text-gradient">Traditional Medicine</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy) represents India's rich heritage of
                        traditional medicine systems. Our portal integrates NAMASTE codes to preserve and standardize
                        this ancient wisdom for modern healthcare applications.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-secondary" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold nature-text-gradient">Modern Standards</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        ICD-11 and WHO terminologies provide the global standard for medical classification. Our system
                        creates seamless bridges between traditional practices and international healthcare standards
                        for comprehensive patient records.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-primary/20" />

                  <div className="text-center">
                    <h3 className="font-serif text-2xl font-semibold nature-text-gradient mb-4">
                      The Integration Challenge
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                      Healthcare professionals often struggle to document traditional treatments within modern EMR
                      systems. Our portal solves this by providing intelligent code mapping, automated report
                      processing, and seamless integration with existing healthcare infrastructure.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section mb-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold nature-text-gradient mb-4">
                Powerful Features for Healthcare Professionals
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools designed to streamline your workflow and enhance patient care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="feature-card nature-glass-effect border-primary/20 leaf-shadow organic-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif nature-text-gradient">Intelligent Disease Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Advanced search capabilities across NAMASTE, ICD-11, and WHO terminologies with cross-referencing
                    and treatment recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="feature-card nature-glass-effect border-primary/20 leaf-shadow organic-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="font-serif nature-text-gradient">AI-Powered Report Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Upload medical reports for automatic code extraction and analysis using advanced AI algorithms
                    trained on medical terminology.
                  </p>
                </CardContent>
              </Card>

              <Card className="feature-card nature-glass-effect border-primary/20 leaf-shadow organic-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="font-serif nature-text-gradient">Secure Data Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Save records locally or integrate with ABHA for secure, standardized healthcare data management and
                    interoperability.
                  </p>
                </CardContent>
              </Card>

              <Card className="feature-card nature-glass-effect border-primary/20 leaf-shadow organic-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif nature-text-gradient">Treatment Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get comprehensive treatment options from both traditional AYUSH practices and modern medicine for
                    holistic patient care.
                  </p>
                </CardContent>
              </Card>

              <Card className="feature-card nature-glass-effect border-primary/20 leaf-shadow organic-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="font-serif nature-text-gradient">Compliance & Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Full compliance with healthcare data protection standards and international medical coding
                    guidelines for professional use.
                  </p>
                </CardContent>
              </Card>

              <Card className="feature-card nature-glass-effect border-primary/20 leaf-shadow organic-hover">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="font-serif nature-text-gradient">Real-time Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Seamless integration with existing EMR systems and healthcare workflows for efficient patient data
                    management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section mb-16">
            <Card className="nature-glass-effect border-primary/20 leaf-shadow">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-3xl nature-text-gradient mb-4">
                  Empowering Healthcare Professionals
                </CardTitle>
                <CardDescription className="text-lg">
                  Trusted by healthcare professionals across traditional and modern medicine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="stat-item text-center">
                    <div className="text-3xl font-bold nature-text-gradient mb-2">95,420+</div>
                    <div className="text-sm text-muted-foreground">Disease Codes</div>
                  </div>
                  <div className="stat-item text-center">
                    <div className="text-3xl font-bold nature-text-gradient mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Code Systems</div>
                  </div>
                  <div className="stat-item text-center">
                    <div className="text-3xl font-bold nature-text-gradient mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Compliance</div>
                  </div>
                  <div className="stat-item text-center">
                    <div className="text-3xl font-bold nature-text-gradient mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Availability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="nature-glass-effect border-primary/20 leaf-shadow">
              <CardContent className="py-12">
                <h2 className="font-serif text-3xl font-bold nature-text-gradient mb-4">
                  Ready to Transform Your Healthcare Practice?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join the revolution in healthcare interoperability. Start using our comprehensive disease search and
                  code mapping system today.
                </p>
                <Button
                  size="lg"
                  onClick={() => router.push("/dashboard")}
                  className="organic-button text-primary-foreground h-14 px-12 text-lg"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </AuthGuard>
  )
}
