import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScanConfig } from "@/lib/scannerUtils";

interface ScannerFormProps {
  onScan: (config: ScanConfig) => void;
  isScanning: boolean;
}

const ScannerForm = ({ onScan, isScanning }: ScannerFormProps) => {
  const [endpoint, setEndpoint] = useState("");
  const [checkSql, setCheckSql] = useState(true);
  const [checkXss, setCheckXss] = useState(true);
  const [checkMisconfig, setCheckMisconfig] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan({
      endpoint,
      checkSql,
      checkXss,
      checkMisconfig,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="endpoint">API Endpoint</Label>
        <Input
          id="endpoint"
          type="url"
          placeholder="https://api.example.com/endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Vulnerability Checks</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sql"
              checked={checkSql}
              onCheckedChange={(checked) => setCheckSql(checked as boolean)}
            />
            <Label htmlFor="sql" className="cursor-pointer">
              SQL Injection
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="xss"
              checked={checkXss}
              onCheckedChange={(checked) => setCheckXss(checked as boolean)}
            />
            <Label htmlFor="xss" className="cursor-pointer">
              Cross-Site Scripting (XSS)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="misconfig"
              checked={checkMisconfig}
              onCheckedChange={(checked) => setCheckMisconfig(checked as boolean)}
            />
            <Label htmlFor="misconfig" className="cursor-pointer">
              API Misconfigurations
            </Label>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isScanning || !endpoint}
      >
        {isScanning ? "Scanning..." : "Start Scan"}
      </Button>
    </form>
  );
};

export default ScannerForm;