import { Vulnerability } from "@/lib/vulnerabilityChecks";
import VulnerabilityCard from "./VulnerabilityCard";

interface ScanResultsProps {
  vulnerabilities: Vulnerability[];
  isScanning: boolean;
}

const ScanResults = ({ vulnerabilities, isScanning }: ScanResultsProps) => {
  if (isScanning) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-100 rounded-lg animate-pulse-slow"
          />
        ))}
      </div>
    );
  }

  if (vulnerabilities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No vulnerabilities found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vulnerabilities.map((vulnerability) => (
        <VulnerabilityCard
          key={vulnerability.id}
          vulnerability={vulnerability}
        />
      ))}
    </div>
  );
};

export default ScanResults;