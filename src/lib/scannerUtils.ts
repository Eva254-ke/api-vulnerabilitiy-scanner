import { toast } from "sonner";
import { checkSQLInjection, checkXSS, checkMisconfigurations, type Vulnerability } from "./vulnerabilityChecks";

export interface ScanConfig {
  endpoint: string;
  checkSql: boolean;
  checkXss: boolean;
  checkMisconfig: boolean;
}

export const runScan = async (config: ScanConfig): Promise<Vulnerability[]> => {
  console.log('Starting scan with config:', config);
  const vulnerabilities: Vulnerability[] = [];
  
  try {
    if (config.checkSql) {
      const sqlVulns = await checkSQLInjection(config.endpoint);
      vulnerabilities.push(...sqlVulns);
    }
    
    if (config.checkXss) {
      const xssVulns = await checkXSS(config.endpoint);
      vulnerabilities.push(...xssVulns);
    }
    
    if (config.checkMisconfig) {
      const misconfigVulns = await checkMisconfigurations(config.endpoint);
      vulnerabilities.push(...misconfigVulns);
    }
    
    console.log('Scan completed, found vulnerabilities:', vulnerabilities.length);
    return vulnerabilities;
  } catch (error) {
    console.error('Scan failed:', error);
    toast.error("Scan failed. Please try again.");
    return [];
  }
};

export const getSeverityColor = (severity: Vulnerability['severity']): string => {
  switch (severity) {
    case 'critical':
      return 'bg-scanner-danger';
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-scanner-warning';
    case 'low':
      return 'bg-scanner-info';
    default:
      return 'bg-gray-500';
  }
};