
import Navigation from "@/components/Navigation";
import { Award, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CertificateGenerator from "@/components/Certificate/CertificateGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser, getUserCertificates } from "@/utils/mockData";

const CertificatesPage = () => {
  const user = getCurrentUser();
  const certificates = getUserCertificates(user.id);
  
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Certificates</h1>
            <p className="text-muted-foreground">
              View and share your achievements
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-campus-primary hover:bg-campus-primary/90">
              <Download className="mr-2 h-4 w-4" /> Download All
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="earned" className="space-y-8">
          <TabsList>
            <TabsTrigger value="earned">Earned Certificates</TabsTrigger>
            <TabsTrigger value="transcript">Co-curricular Transcript</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earned" className="space-y-6">
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map(certificate => (
                  <CertificateGenerator key={certificate.id} certificate={certificate} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No certificates yet</h3>
                <p className="text-muted-foreground mt-2">
                  Participate in events and achieve milestones to earn certificates
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="/events">Browse Events</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="transcript">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 text-campus-primary mr-2" />
                  Co-curricular Transcript
                </CardTitle>
                <CardDescription>
                  A comprehensive record of all your club activities and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Transcript Not Available</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    The co-curricular transcript will be generated once you
                    have participated in more club events and earned achievements.
                  </p>
                  <div className="flex justify-center mt-6">
                    <Button variant="outline" className="mr-4" disabled>
                      Preview
                    </Button>
                    <Button disabled>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CertificatesPage;
