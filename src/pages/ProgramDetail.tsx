
import { useParams } from "react-router-dom";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgramHero } from '@/components/program/ProgramHero';
import { ProgramOverview } from '@/components/program/ProgramOverview';
import { ProgramOutcomes } from '@/components/program/ProgramOutcomes';
import { ProgramWhyTake } from '@/components/program/ProgramWhyTake';
import { ProgramFees } from '@/components/program/ProgramFees';
import { ProgramNotFound } from '@/components/program/ProgramNotFound';
import { useEffect } from "react";

// Import program data
import { programsData } from '@/data/programs';

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = slug ? programsData[slug as keyof typeof programsData] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!program) {
    return <ProgramNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ProgramHero 
        title={program.title}
        description={program.description}
        duration={program.duration}
        mode={program.mode}
        fee={program.fee}
        image={program.image}
      />
      
      {/* Program Details */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 bg-gray-100 p-1 flex w-full overflow-x-auto snap-x scrollbar-none">
                <TabsTrigger value="overview" className="flex-1 min-w-[120px]">Overview</TabsTrigger>
                <TabsTrigger value="outcomes" className="flex-1 min-w-[120px]">Learning Outcomes</TabsTrigger>
                <TabsTrigger value="why" className="flex-1 min-w-[120px]">Why Take This</TabsTrigger>
                <TabsTrigger value="fee" className="flex-1 min-w-[120px]">Fees & Discounts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0">
                <ProgramOverview 
                  duration={program.duration}
                  mode={program.mode}
                  description={program.description}
                />
              </TabsContent>
              
              <TabsContent value="outcomes" className="mt-0">
                <ProgramOutcomes outcomes={program.outcomes} />
              </TabsContent>
              
              <TabsContent value="why" className="mt-0">
                <ProgramWhyTake whyTake={program.whyTake} />
              </TabsContent>
              
              <TabsContent value="fee" className="mt-0">
                <ProgramFees 
                  fee={program.fee}
                  institutionalDiscount={program.institutionalDiscount}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProgramDetail;
