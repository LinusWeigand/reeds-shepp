import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SyntaxHighlighter from "@/components/syntax-highlighter"

const cargoToml = `[dependencies]
reeds_shepp = "1.0.0"`

const exampleCode = `use reeds_shepp::{Pose, get_optimal_path};

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
}`

export default function GetStartedPage() {
  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Get Started</h1>
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
            <SyntaxHighlighter code={cargoToml} language="toml" />
          </TabsContent>
          <TabsContent value="example" className="rounded-md border p-4">
            <SyntaxHighlighter code={exampleCode} language="rust" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
