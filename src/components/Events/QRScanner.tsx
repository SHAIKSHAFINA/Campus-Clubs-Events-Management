
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Scan, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [verified, setVerified] = useState(false);
  const { toast } = useToast();

  const startScan = () => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanning(false);
      setVerified(true);
      
      toast({
        title: "Attendance Marked!",
        description: "You have successfully checked in to this event.",
        duration: 3000
      });
    }, 2000);
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpValue.length >= 4) {
      setVerified(true);
      toast({
        title: "Attendance Marked!",
        description: "You have successfully checked in to this event.",
        duration: 3000
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP code.",
        variant: "destructive",
      });
    }
  };

  const resetState = () => {
    setVerified(false);
    setOtpValue("");
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-campus-primary" />
          Attendance Check-In
        </CardTitle>
        <CardDescription>
          Mark your attendance by scanning the QR code or entering the OTP
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {verified ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-16 w-16 rounded-full bg-campus-success/20 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-campus-success" />
            </div>
            <h3 className="text-xl font-semibold text-center">Attendance Confirmed!</h3>
            <p className="text-muted-foreground text-center mt-2">
              You've earned points for this event. Keep participating to earn more!
            </p>
          </div>
        ) : (
          <Tabs defaultValue="qr" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qr">QR Code</TabsTrigger>
              <TabsTrigger value="otp">OTP Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="qr" className="space-y-4">
              <div className="h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center p-6 bg-muted/50">
                {scanning ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-pulse mb-4">
                      <Scan className="h-12 w-12 text-campus-primary" />
                    </div>
                    <p className="text-muted-foreground">Scanning...</p>
                  </div>
                ) : (
                  <>
                    <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-center text-sm text-muted-foreground">
                      Ready to scan the event QR code
                    </p>
                  </>
                )}
              </div>
              
              <Button
                onClick={startScan}
                disabled={scanning}
                className="w-full bg-campus-primary hover:bg-campus-primary/90"
              >
                {scanning ? "Scanning..." : "Scan QR Code"}
              </Button>
            </TabsContent>
            
            <TabsContent value="otp" className="space-y-4">
              <form onSubmit={verifyOtp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP Code</Label>
                    <Input
                      id="otp"
                      placeholder="Enter the 4-digit code"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      The OTP code is shown by the event organizer
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-campus-primary hover:bg-campus-primary/90"
                  >
                    Verify OTP
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      {verified && (
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={resetState} 
            className="w-full"
          >
            Mark Another Attendance
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default QRScanner;
