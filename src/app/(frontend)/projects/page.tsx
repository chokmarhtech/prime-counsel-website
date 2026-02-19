
import { getPayload } from "@/lib/getPayload";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "./ProjectsGrid";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const payload = await getPayload();

  const projectsData = await payload.find({
    collection: "projects",
    sort: "-year",
  });

  const projects = projectsData.docs.map((project) => ({
    ...project,
    client: project.client ?? null,
    location: project.location ?? null,
    year: project.year ?? null,
  }));

  return (
    <div className="min-h-screen">
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-charcoal">
          <div className="container-luxury">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-construction-red" />
                <span className="text-warm-concrete text-sm tracking-[0.2em] uppercase font-medium">
                  Our Portfolio
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-pure-white leading-tight mb-6">
                Featured Projects
              </h1>
              <p className="text-warm-concrete text-lg md:text-xl max-w-2xl leading-relaxed">
                Explore our portfolio of completed projects across Nigeria —
                each one a testament to our commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Projects Grid */}
        <section className="py-section bg-background">
          <div className="container-luxury">
            <ProjectsGrid projects={projects} />

            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                Interested in seeing more of our work or discussing your
                project?
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
