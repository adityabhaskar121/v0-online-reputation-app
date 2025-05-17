"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  Instagram,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Star,
  Twitter,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

type UserData = {
  userId: string
  name: string
  email: string
}

export default function DashboardPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isAddingPlatform, setIsAddingPlatform] = useState(false)
  const [platforms, setPlatforms] = useState<
    {
      id: string
      name: string
      icon: React.ReactNode
      links?: string[]
      keywords?: string[]
      selected: boolean
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)

  const [newLink, setNewLink] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  useEffect(() => {
    // Get user data from token
    const getCookieValue = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift()
      return null
    }

    const token = getCookieValue("auth_token")
    if (token) {
      try {
        const decoded = jwtDecode<UserData>(token)
        setUserData(decoded)
      } catch (error) {
        console.error("Failed to decode token:", error)
      }
    }
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) throw new Error("Logout failed")

      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch("/api/user/platforms")
        if (response.ok) {
          const data = await response.json()
          if (data.platforms && data.platforms.length > 0) {
            setPlatforms(data.platforms)
          } else {
            // Set default platforms if none exist
            setPlatforms([
              {
                id: "google",
                name: "Google Reviews",
                icon: <Star className="h-4 w-4" />,
                links: [],
                selected: false,
              },
              {
                id: "instagram",
                name: "Instagram",
                icon: <Instagram className="h-4 w-4" />,
                links: [],
                selected: false,
              },
              {
                id: "twitter",
                name: "X",
                icon: <Twitter className="h-4 w-4" />,
                links: [],
                selected: false,
              },
              {
                id: "reddit",
                name: "Reddit",
                icon: <MessageSquare className="h-4 w-4" />,
                links: [],
                keywords: [],
                selected: false,
              },
            ])
          }
        }
      } catch (error) {
        console.error("Error fetching platforms:", error)
        toast({
          title: "Error",
          description: "Failed to load your platforms. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlatforms()
  }, [toast])

  const handlePlatformSelect = (id: string) => {
    setPlatforms(
      platforms.map((platform) => (platform.id === id ? { ...platform, selected: !platform.selected } : platform)),
    )
  }

  const handleAddLink = () => {
    if (!newLink.trim() || !selectedPlatform) return

    setPlatforms(
      platforms.map((platform) =>
        platform.id === selectedPlatform
          ? { ...platform, links: [...(platform.links || []), newLink.trim()] }
          : platform,
      ),
    )

    setNewLink("")

    toast({
      title: "Link added",
      description: `Added link to ${platforms.find((p) => p.id === selectedPlatform)?.name}`,
    })
  }

  const handleAddKeyword = () => {
    if (!newKeyword.trim() || !selectedPlatform || selectedPlatform !== "reddit") return

    setPlatforms(
      platforms.map((platform) =>
        platform.id === selectedPlatform
          ? { ...platform, keywords: [...(platform.keywords || []), newKeyword.trim()] }
          : platform,
      ),
    )

    setNewKeyword("")

    toast({
      title: "Keyword added",
      description: "Added keyword to Reddit tracking",
    })
  }

  const handleSaveConfiguration = async () => {
    try {
      const response = await fetch("/api/user/platforms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platforms }),
      })

      if (!response.ok) throw new Error("Failed to save configuration")

      toast({
        title: "Configuration saved",
        description: "Your platform settings have been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving platforms:", error)
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                    <span className="text-primary">RepTrack</span>
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/mentions" className="flex items-center gap-2 text-muted-foreground">
                    Mentions
                  </Link>
                  <Link href="/dashboard/analytics" className="flex items-center gap-2 text-muted-foreground">
                    Analytics
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 text-muted-foreground">
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              <span className="text-primary">RepTrack</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link
                href="/dashboard/mentions"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                Mentions
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                Analytics
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline-flex">{userData?.name || "User"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage your online reputation across multiple platforms.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-full pl-8 md:w-[200px] lg:w-[300px]" />
              </div>
            </div>
          </div>
          <Tabs defaultValue="platforms" className="mt-6">
            <TabsList>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="recent">Recent Mentions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="platforms" className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">Manage Platforms</h2>
                    <Dialog open={isAddingPlatform} onOpenChange={setIsAddingPlatform}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Platform
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Platform</DialogTitle>
                          <DialogDescription>
                            Select the platforms you want to monitor for your brand.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {platforms.map((platform) => (
                            <div key={platform.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={platform.id}
                                checked={platform.selected}
                                onCheckedChange={() => handlePlatformSelect(platform.id)}
                              />
                              <Label htmlFor={platform.id} className="flex items-center gap-2">
                                {platform.icon}
                                {platform.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() => {
                              setIsAddingPlatform(false)
                              toast({
                                title: "Platforms updated",
                                description: "Your platform selection has been updated.",
                              })
                            }}
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {platforms
                      .filter((p) => p.selected)
                      .map((platform) => (
                        <div key={platform.id} className="rounded-lg border p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {platform.icon}
                              <h3 className="font-semibold">{platform.name}</h3>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedPlatform(platform.id)}>
                              Configure
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {platform.id === "reddit" && (
                              <>
                                <div>
                                  <p className="text-sm font-medium">Keywords ({platform.keywords?.length || 0})</p>
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {platform.keywords?.map((keyword, i) => (
                                      <div key={i} className="rounded-full bg-muted px-2 py-1 text-xs">
                                        {keyword}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                            <div>
                              <p className="text-sm font-medium">Links ({platform.links?.length || 0})</p>
                              <div className="mt-1 space-y-1">
                                {platform.links?.map((link, i) => (
                                  <p key={i} className="truncate text-xs text-muted-foreground">
                                    {link}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {platforms.filter((p) => p.selected).length === 0 && (
                      <div className="col-span-full rounded-lg border border-dashed p-8 text-center">
                        <h3 className="font-semibold">No platforms selected</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Click the "Add Platform" button to select platforms to monitor.
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedPlatform && (
                    <Dialog open={!!selectedPlatform} onOpenChange={(open) => !open && setSelectedPlatform(null)}>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Configure {platforms.find((p) => p.id === selectedPlatform)?.name}</DialogTitle>
                          <DialogDescription>Add links and keywords to monitor for this platform.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="links">Add Link</Label>
                            <div className="flex gap-2">
                              <Input
                                id="links"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder={
                                  selectedPlatform === "google"
                                    ? "Google Business Profile URL"
                                    : selectedPlatform === "instagram"
                                      ? "Instagram profile URL"
                                      : selectedPlatform === "twitter"
                                        ? "X profile URL"
                                        : "Subreddit or post URL"
                                }
                              />
                              <Button onClick={handleAddLink}>Add</Button>
                            </div>
                            <div className="mt-2 max-h-[100px] overflow-y-auto space-y-1">
                              {platforms
                                .find((p) => p.id === selectedPlatform)
                                ?.links?.map((link, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between rounded-md bg-muted px-3 py-1 text-sm"
                                  >
                                    <span className="truncate">{link}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => {
                                        setPlatforms(
                                          platforms.map((platform) =>
                                            platform.id === selectedPlatform
                                              ? {
                                                  ...platform,
                                                  links: platform.links?.filter((_, index) => index !== i),
                                                }
                                              : platform,
                                          ),
                                        )
                                      }}
                                    >
                                      <span className="sr-only">Remove</span>×
                                    </Button>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {selectedPlatform === "reddit" && (
                            <div className="grid gap-2">
                              <Label htmlFor="keywords">Add Keyword</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="keywords"
                                  value={newKeyword}
                                  onChange={(e) => setNewKeyword(e.target.value)}
                                  placeholder="Brand name or keyword"
                                />
                                <Button onClick={handleAddKeyword}>Add</Button>
                              </div>
                              <div className="mt-2 max-h-[100px] overflow-y-auto space-y-1">
                                {platforms
                                  .find((p) => p.id === selectedPlatform)
                                  ?.keywords?.map((keyword, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between rounded-md bg-muted px-3 py-1 text-sm"
                                    >
                                      <span>{keyword}</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => {
                                          setPlatforms(
                                            platforms.map((platform) =>
                                              platform.id === selectedPlatform
                                                ? {
                                                    ...platform,
                                                    keywords: platform.keywords?.filter((_, index) => index !== i),
                                                  }
                                                : platform,
                                            ),
                                          )
                                        }}
                                      >
                                        <span className="sr-only">Remove</span>×
                                      </Button>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button onClick={() => setSelectedPlatform(null)}>Done</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  <div className="flex justify-end">
                    <Button onClick={handleSaveConfiguration}>Save Configuration</Button>
                  </div>
                </>
              )}
            </TabsContent>
            <TabsContent value="recent" className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Mentions</h2>
              <div className="rounded-lg border">
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">Configure your platforms to start tracking mentions.</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <h2 className="text-xl font-semibold">Analytics</h2>
              <div className="rounded-lg border">
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Analytics will be available once you have configured your platforms.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
