
import { Link } from 'react-router-dom';
import { DollarSign, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProgramFeesProps = {
  fee: string;
  institutionalDiscount: string;
  bundleDiscount?: boolean;
}

export const ProgramFees = ({ fee, institutionalDiscount, bundleDiscount = true }: ProgramFeesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fees & Discounts</CardTitle>
        <CardDescription>Investment information and available discounts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <DollarSign size={18} className="text-blue-600" />
            Program Fee
          </h3>
          <p className="text-xl font-bold">{fee}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
            <Building size={18} className="text-blue-600" />
            Institutional Discount
          </h3>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-green-800">{institutionalDiscount}</p>
          </div>
        </div>
        
        {bundleDiscount && (
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <DollarSign size={18} className="text-blue-600" />
              Bundle Discount
            </h3>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-blue-800">Get a <strong>30% discount</strong> when you register for 3 or more programs.</p>
            </div>
          </div>
        )}
        
        <div className="pt-4">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 w-full md:w-auto"
          >
            Register for This Program
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
