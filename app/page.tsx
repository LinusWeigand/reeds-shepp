import { ArrowRight, Github, Package, Code, Route, Zap, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import HeroBackground from "@/components/hero-background"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Route className="h-6 w-6" />
              <span className="inline-block font-bold">reeds-shepp</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#documentation"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Documentation
              </Link>
              <Link
                href="#about"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="https://github.com/linusweigand" target="_blank" rel="noreferrer">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link href="https://crates.io/crates/reeds-shepp" target="_blank" rel="noreferrer">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
                  <Package className="h-5 w-5" />
                  <span className="sr-only">crates.io</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative overflow-hidden">
          <HeroBackground />
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative z-10">
            <Badge className="px-3.5 py-1.5" variant="secondary">
              v1.0.0 Now Available
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Reeds-Shepp Path Planner</h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A high-performance Rust implementation of the Reeds-Shepp path planning algorithm for non-holonomic
              vehicles with car-like kinematics.
            </p>
            <div className="space-x-4">
              <Button asChild className="px-8 bg-black hover:bg-black/90 text-white">
                <Link href="#get-started">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://github.com/linusweigand/reeds-shepp" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Optimal Path Planning</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              See Reeds-Shepp path planning in action
            </p>
          </div>

          <div className="mx-auto mt-8 grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-1">
            <div className="relative overflow-hidden rounded-lg border">
              <video className="w-full aspect-video" autoPlay muted loop playsInline>
                <source src={`${basePath}/demo.mp4`} type="video/mp4" />

                Your browser does not support the video tag.
              </video>
              <div className="p-6 border-t">
                <h3 className="text-xl font-medium">Reeds-Shepp Path Planning Demo</h3>
                <p className="text-muted-foreground mt-3">
                  This video demonstrates the Reeds-Shepp path planning algorithm in action, showing how it efficiently
                  computes optimal paths for vehicles with car-like kinematics.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Features</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              A comprehensive toolkit for planning optimal paths with car-like kinematics
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Optimal Path Finding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Efficiently computes the shortest path between any two poses (position and orientation).
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Complete Path Set</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Implements all 12 Reeds-Shepp path types with forward/backward motion and left/right steering.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">High Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Written in Rust for maximum efficiency, safety, and reliability.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Robotics Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Perfect for autonomous vehicles, mobile robots, and motion planning applications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Well Documented</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Comprehensive documentation with examples and usage patterns.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Zero Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Lightweight implementation with no external dependencies.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="get-started" className="container py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Get Started</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Start using Reeds-Shepp path planning in your project in minutes
            </p>
          </div>

          <div className="mx-auto mt-8 grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-1">
            <Tabs defaultValue="cargo" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cargo">Cargo.toml</TabsTrigger>
                <TabsTrigger value="example">Example Usage</TabsTrigger>
              </TabsList>
              <TabsContent value="cargo" className="rounded-md border p-4">
                <pre className="text-sm">
                  <code>{`[dependencies]
reeds_shepp = "1.0.0"`}</code>
                </pre>
              </TabsContent>
              <TabsContent value="example" className="rounded-md border p-4">
                <pre className="text-sm">
                  <code>{`use reeds_shepp::{Pose, get_optimal_path};

fn main() {
    let start = Pose { x: 0.0, y: 0.0, theta_degree: 0.0 };
    let end = Pose { x: 5.0, y: 5.0, theta_degree: 90.0 };
    
    // Find the optimal path
    let path = get_optimal_path(start, end);
    
    if let Some(path) = path {
        println!("Found path with {} segments", path.len());
        for (i, element) in path.iter().enumerate() {
            println!("Segment {}: param={}, steering={:?}, gear={:?}", 
                     i, element.param, element.steering, element.gear);
        }
    } else {
        println!("No path found");
    }
}`}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="documentation" className="container py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Documentation</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Comprehensive guides and API documentation
            </p>
          </div>

          <div className="mx-auto mt-8 grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Complete API documentation with examples</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://docs.rs/reeds-shepp" target="_blank" rel="noreferrer">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Docs
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
                <CardDescription>Sample code and usage patterns</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href="https://github.com/linusweigand/reeds-shepp-rust/tree/main/examples"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    View Examples
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tutorials</CardTitle>
                <CardDescription>Step-by-step guides for common use cases</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://github.com/linusweigand/reeds-shepp-rust/wiki" target="_blank" rel="noreferrer">
                    <Zap className="mr-2 h-4 w-4" />
                    View Tutorials
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section id="about" className="container py-8 md:py-12 lg:py-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">About the Author</h2>
          </div>

          <div className="mx-auto mt-8 grid justify-center gap-4 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-1">
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:shrink-0 flex justify-center md:justify-start pt-6 md:pt-0">
                  <img
                    className="h-48 w-48 rounded-full object-cover md:h-full md:w-48 md:rounded-none"
                    src="/linus_weigand.avif"
                    alt="Linus Weigand"
                  />
                </div>
                <div className="p-8">
                  <div className="text-xl font-semibold tracking-wide">Linus Weigand</div>
                  <p className="mt-2 text-slate-500">
                    22-year-old Master's student in Computer Science at Technical University of Munich (TUM). Passionate
                    about programming, machine learning, and autonomous driving.
                  </p>
                  <p className="mt-4 text-slate-500">
                    I created this Reeds-Shepp path planning library to provide a high-performance implementation for
                    robotics and autonomous vehicle applications. My goal is to contribute to the open-source community
                    with well-designed, efficient, and reliable software components.
                  </p>
                  <div className="mt-6">
                    <Button asChild variant="outline" size="sm">
                      <Link href="https://github.com/linusweigand" target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with ❤️ by Linus Weigand. The source code is available on{" "}
            <Link
              href="https://github.com/linusweigand/reeds-shepp"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
            © {new Date().getFullYear()} Linus Weigand. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
