
import { Clock, Laptop, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProgramOverviewProps = {
  duration: string;
  mode: string[];
  description: string;
}

export const ProgramOverview = ({ duration, mode, description }: ProgramOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Overview</CardTitle>
        <CardDescription>Everything you need to know about this program</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Clock size={18} className="text-blue-600" />
            Duration
          </h3>
          <p>{duration}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Laptop size={18} className="text-blue-600" />
            Training Modes
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-1">
            {mode.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <BookOpen size={18} className="text-blue-600" />
            Program Description
          </h3>
          <p>{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
