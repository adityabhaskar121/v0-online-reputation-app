import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-primary">RepTrack</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container space-y-6 py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              Monitor and Manage Your Online Reputation
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Track and improve how your brand is perceived across Google Reviews, Instagram, X, and Reddit with our
              all-in-one reputation management solution.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
              Comprehensive Reputation Management
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Monitor all your social platforms in one place and take control of your online presence.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Multi-Platform Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Track mentions across Google Reviews, Instagram, X, and Reddit from a single dashboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Keyword Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor specific keywords related to your brand across social platforms.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Sentiment Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand the sentiment behind mentions and reviews of your brand.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Notification Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant notifications for new mentions or reviews that need your attention.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Response Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Respond to reviews and mentions directly from our platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize your reputation trends and identify areas for improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
              Trusted by Businesses
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              See what our customers have to say about our reputation management platform.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border p-6">
              <p className="mb-4 italic text-muted-foreground">
                "RepTrack has transformed how we manage our online presence. We've seen a 30% increase in positive
                reviews since we started using it."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <p className="mb-4 italic text-muted-foreground">
                "The ability to track mentions across multiple platforms in one place has saved us countless hours of
                manual monitoring."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">CEO, Retail Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the plan that's right for your business.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-bold">Starter</h3>
              <p className="mb-4 text-3xl font-bold">
                $49<span className="text-base font-normal">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Monitor 2 platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>10 keywords</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
            <div className="rounded-lg border border-primary p-6">
              <div className="mb-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Popular</div>
              <h3 className="mb-2 text-xl font-bold">Professional</h3>
              <p className="mb-4 text-3xl font-bold">
                $99<span className="text-base font-normal">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Monitor all platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>50 keywords</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Response suggestions</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-bold">Enterprise</h3>
              <p className="mb-4 text-3xl font-bold">
                $249<span className="text-base font-normal">/month</span>
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Monitor all platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Unlimited keywords</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Custom analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>API access</span>
                </li>
              </ul>
              <Button className="w-full">Contact Sales</Button>
            </div>
          </div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto max-w-[58rem] rounded-lg bg-primary/10 px-8 py-12 text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold leading-[1.1] sm:text-3xl">
              Ready to take control of your online reputation?
            </h2>
            <p className="mb-6 leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of businesses that trust RepTrack for their reputation management needs.
            </p>
            <Link href="/signup">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 RepTrack. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
