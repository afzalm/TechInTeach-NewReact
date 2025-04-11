
import { Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProgramOutcomesProps = {
  outcomes: string[];
}

export const ProgramOutcomes = ({ outcomes }: ProgramOutcomesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expected Learning Outcomes</CardTitle>
        <CardDescription>What you'll be able to do after completing this program</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Award size={18} className="text-blue-600" />
              Upon completion, you will be able to:
            </h3>
            <ul className="space-y-3">
              {outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
