import { useState } from "react";
import { Card } from "@/components/ui/card";
import ScannerForm from "@/components/Scanner/ScannerForm";
import ScanResults from "@/components/Scanner/ScanResults";
import { runScan, type ScanConfig } from "@/lib/scannerUtils";
import { Shield } from "lucide-react";
import type { Vulnerability } from "@/lib/vulnerabilityChecks";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

  const handleScan = async (config: ScanConfig) => {
    console.log('Starting new scan');
    setIsScanning(true);
    setVulnerabilities([]);
    
    const results = await runScan(config);
    setVulnerabilities(results);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-8 w-8 text-scanner-success mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">API Vulnerability Scanner</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Scan Configuration</h2>
            <ScannerForm onScan={handleScan} isScanning={isScanning} />
          </Card>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Scan Results</h2>
            <ScanResults
              vulnerabilities={vulnerabilities}
              isScanning={isScanning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;