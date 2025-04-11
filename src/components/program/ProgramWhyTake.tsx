
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProgramWhyTakeProps = {
  whyTake: string;
}

export const ProgramWhyTake = ({ whyTake }: ProgramWhyTakeProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Why You Should Take This Program</CardTitle>
        <CardDescription>The benefits and unique value of this training</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-gray-800 italic">{whyTake}</p>
        </div>
      </CardContent>
    </Card>
  );
};
