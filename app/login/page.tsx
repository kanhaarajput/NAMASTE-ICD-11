"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      // Animate the login card entrance
      gsap.fromTo(
        ".login-card",
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
      )

      // Animate the header elements
      gsap.fromTo(
        ".login-header",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" },
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

      // Form elements animation
      gsap.fromTo(
        ".form-element",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        },
      )
    }

    loadGSAP()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate authentication
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (formData.userId && formData.password) {
        // Store user session (in real app, this would be handled by proper auth)
        localStorage.setItem("user", JSON.stringify({ userId: formData.userId }))
        router.push("/about")
      } else {
        setError("Please enter both User ID and Password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background leaf-pattern-bg flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="w-full max-w-md relative z-10">
        <div className="login-header mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 mb-6 organic-hover"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-organic-pulse leaf-shadow">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="font-serif font-bold text-xl nature-text-gradient">NAMASTE + ICD-11</h1>
              <p className="text-sm text-muted-foreground">Integration Portal</p>
            </div>
          </div>
        </div>

        <Card ref={cardRef} className="login-card nature-glass-effect leaf-shadow border-primary/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-primary mr-2" />
              <CardTitle className="font-serif text-2xl nature-text-gradient">Healthcare Professional Login</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Access the NAMASTE and ICD-11 integration system for traditional and modern medicine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="form-element border-destructive/20 bg-destructive/5">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="form-element space-y-2">
                <Label htmlFor="userId" className="text-foreground font-medium">
                  User ID
                </Label>
                <Input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder="Enter your User ID"
                  value={formData.userId}
                  onChange={handleInputChange}
                  required
                  className="h-11 border-primary/20 focus:border-primary focus:ring-primary/30 transition-all duration-300"
                />
              </div>

              <div className="form-element space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-11 pr-10 border-primary/20 focus:border-primary focus:ring-primary/30 transition-all duration-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-primary/10 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="form-element w-full h-11 organic-button text-primary-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Leaf className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </form>

            <div className="form-element mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors duration-300"
                >
                  Register here
                </Link>
              </p>
            </div>

            <div className="form-element mt-4 pt-4 border-t border-primary/20">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                This system is for authorized healthcare professionals only.
                <br />
                By logging in, you agree to comply with healthcare data protection standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
