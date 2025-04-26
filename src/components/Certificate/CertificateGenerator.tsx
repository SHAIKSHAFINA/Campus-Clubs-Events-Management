
import { useState } from "react";
import { Certificate } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Award, Download, Eye, Share2 } from "lucide-react";
import { format } from "date-fns";
import { mockClubs } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";

interface CertificateGeneratorProps {
  certificate: Certificate;
}

const CertificateGenerator = ({ certificate }: CertificateGeneratorProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  
  const club = mockClubs.find(c => c.id === certificate.clubId);
  
  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      
      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been downloaded successfully.",
      });
    }, 1500);
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy a link
    toast({
      title: "Certificate Shared",
      description: "A link to your certificate has been copied to clipboard.",
    });
  };
  
  const getTemplateStyle = (template: string) => {
    switch (template) {
      case "participation":
        return "border-blue-300 bg-blue-50";
      case "achievement":
        return "border-purple-300 bg-purple-50";
      case "leadership":
        return "border-green-300 bg-green-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };
  
  const getTemplateLabel = (template: string) => {
    switch (template) {
      case "participation":
        return "Participation Certificate";
      case "achievement":
        return "Achievement Certificate";
      case "leadership":
        return "Leadership Certificate";
      default:
        return "Certificate";
    }
  };

  return (
    <Card className={`border-2 ${getTemplateStyle(certificate.template)}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{certificate.title}</CardTitle>
            <CardDescription>
              Issued on {format(new Date(certificate.dateIssued), "MMMM d, yyyy")}
            </CardDescription>
          </div>
          <Award className="h-6 w-6 text-campus-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div>
            <span className="text-muted-foreground">Organization:</span>{" "}
            <span className="font-medium">{club?.name || "University Club"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Type:</span>{" "}
            <span className="font-medium">{getTemplateLabel(certificate.template)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Signed by:</span>{" "}
            <span className="font-medium">{certificate.signature}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Certificate Preview</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <div className="border-8 border-double border-gray-200 p-6 bg-white">
                <div className="text-center space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-800">CERTIFICATE OF {certificate.template.toUpperCase()}</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent my-4"></div>
                  </div>
                  
                  <div>
                    <p className="text-lg">This certifies that</p>
                    <p className="text-xl font-bold mt-2">John Smith</p>
                    <p className="text-lg mt-4">{certificate.title}</p>
                  </div>
                  
                  <div className="pt-6">
                    <p className="text-sm text-gray-600">Issued on {format(new Date(certificate.dateIssued), "MMMM d, yyyy")}</p>
                    <div className="mt-4 flex justify-center">
                      <div className="text-center border-t border-gray-300 pt-2 px-8">
                        <p className="font-bold">{certificate.signature}</p>
                        <p className="text-xs text-gray-500">Program Director</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button onClick={handleDownload} disabled={isDownloading}>
            <Download className="h-4 w-4 mr-2" /> 
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CertificateGenerator;
