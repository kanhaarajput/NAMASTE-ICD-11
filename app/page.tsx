"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Database, Users, FileText, Sparkles, Heart, Leaf } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Hero section animations
      gsap.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" },
      )

      // Floating leaf animations
      gsap.to(".floating-leaf", {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })

      // Cards animation on scroll
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".feature-cards-container",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // About section cards
      gsap.fromTo(
        ".about-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about-cards-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    loadGSAP()
  }, [])

  return (
    <div className="min-h-screen bg-background leaf-pattern-bg">
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
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="#about"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                About
              </Link>
              <Link
                href="#features"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                Features
              </Link>
              <Link
                href="/login"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section ref={heroRef} className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 nature-gradient-bg opacity-10"></div>
        {/* Floating leaf decorations */}
        <div className="absolute top-20 left-10 floating-leaf">
          <Leaf className="w-8 h-8 text-primary/30" />
        </div>
        <div className="absolute top-40 right-20 floating-leaf">
          <Leaf className="w-6 h-6 text-secondary/40" />
        </div>
        <div className="absolute bottom-20 left-1/4 floating-leaf">
          <Leaf className="w-10 h-10 text-primary/20" />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge
            variant="outline"
            className="mb-6 text-sm font-medium organic-hover bg-primary text-primary-foreground border-primary leaf-shadow"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Smart India Hackathon Project
          </Badge>
          <h1 className="hero-title font-serif font-bold text-4xl md:text-6xl text-foreground mb-6 text-balance">
            API Integration of <span className="nature-text-gradient">NAMASTE</span> and{" "}
            <span className="nature-text-gradient">ICD-11 (TM2)</span> into EMR Systems
          </h1>
          <p className="hero-subtitle text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            This portal demonstrates integration of AYUSH NAMASTE codes and WHO ICD-11 TM2 standards into EMR systems,
            aligned with India's EHR standards for traditional and modern medicine harmony.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="organic-button text-lg px-8 text-primary-foreground shadow-lg">
              <Link href="/login">
                Get Started - Login <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent organic-hover border-primary/30 hover:border-primary leaf-shadow"
            >
              <Heart className="mr-2 w-5 h-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
              About the <span className="nature-text-gradient">Project</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              The project enables interoperability between traditional medicine (AYUSH NAMASTE Codes) and modern medical
              systems (ICD-11 TM2). Users can search diseases, retrieve standard codes, upload reports, and save data
              locally or with ABHA-linked authentication.
            </p>
          </div>

          <div className="about-cards-container grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="about-card text-center organic-hover border-primary/20 nature-glass-effect leaf-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 leaf-shadow animate-leaf-float">
                  <Database className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="font-serif nature-text-gradient">NAMASTE Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Integration with AYUSH NAMASTE coding system for traditional medicine practices and herbal treatments
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="about-card text-center organic-hover border-secondary/20 nature-glass-effect leaf-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mx-auto mb-4 leaf-shadow animate-leaf-float">
                  <Shield className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="font-serif nature-text-gradient">ICD-11 TM2</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  WHO ICD-11 Traditional Medicine Module 2 for standardized medical coding and global compatibility
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="about-card text-center organic-hover border-primary/20 nature-glass-effect leaf-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 leaf-shadow animate-leaf-float">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="font-serif nature-text-gradient">EMR Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Seamless integration with Electronic Medical Record systems following EHR standards for holistic care
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="about-card text-center organic-hover border-secondary/20 nature-glass-effect leaf-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mx-auto mb-4 leaf-shadow animate-leaf-float">
                  <FileText className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle className="font-serif nature-text-gradient">ABHA Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  Optional ABHA-linked authentication for secure data storage and comprehensive health records
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" ref={featuresRef} className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-8">
            Key <span className="nature-text-gradient">Features</span>
          </h2>
          <div className="feature-cards-container grid md:grid-cols-3 gap-8">
            <div className="feature-card space-y-4 organic-hover p-6 rounded-xl nature-glass-effect border border-primary/20 leaf-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto leaf-shadow animate-organic-pulse">
                <Database className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-xl nature-text-gradient">Disease Search</h3>
              <p className="text-muted-foreground leading-relaxed">
                Search diseases by name and retrieve corresponding NAMASTE and ICD-11 codes with treatment
                recommendations
              </p>
            </div>
            <div className="feature-card space-y-4 organic-hover p-6 rounded-xl nature-glass-effect border border-secondary/20 leaf-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto leaf-shadow animate-organic-pulse">
                <FileText className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-xl nature-text-gradient">Report Upload</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload medical reports and automatically extract relevant coding information with AI assistance
              </p>
            </div>
            <div className="feature-card space-y-4 organic-hover p-6 rounded-xl nature-glass-effect border border-primary/20 leaf-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto leaf-shadow animate-organic-pulse">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-xl nature-text-gradient">Secure Storage</h3>
              <p className="text-muted-foreground leading-relaxed">
                Save data locally or securely with ABHA-linked authentication for comprehensive health management
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-gradient-to-br from-muted/40 to-muted/60 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center leaf-shadow animate-leaf-float">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-lg nature-text-gradient">NAMASTE + ICD-11 Portal</span>
          </div>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Smart India Hackathon Project - Healthcare Interoperability Solution
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enabling seamless integration between traditional and modern medical systems through nature-inspired
            technology
          </p>
        </div>
      </footer>
    </div>
  )
}
