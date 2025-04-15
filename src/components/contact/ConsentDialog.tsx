
import React from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface ConsentDialogProps {
  showConsentDialog: boolean;
  setShowConsentDialog: (show: boolean) => void;
  consentAccepted: boolean;
  setConsentAccepted: (accepted: boolean) => void;
  onAccept: () => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = ({
  showConsentDialog,
  setShowConsentDialog,
  consentAccepted,
  setConsentAccepted,
  onAccept
}) => {
  console.log("Dialog render state:", { showConsentDialog, consentAccepted });
  
  const handleAccept = () => {
    console.log("Accept button clicked, consent state:", consentAccepted);
    if (consentAccepted) {
      onAccept();
    }
  };
  
  return (
    <AlertDialog 
      open={showConsentDialog} 
      onOpenChange={(open) => {
        console.log("Dialog open state changing to:", open);
        setShowConsentDialog(open);
      }}
    >
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Consent Required</AlertDialogTitle>
          <AlertDialogDescription>
            Please review and confirm your consent before submitting the form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="flex items-start space-x-3 space-y-0 rounded-md p-4 border mt-4">
          <Checkbox 
            id="consent-checkbox" 
            checked={consentAccepted} 
            onCheckedChange={(checked) => {
              console.log("Checkbox changed to:", checked);
              setConsentAccepted(checked as boolean);
            }}
          />
          <div className="space-y-1 leading-none">
            <label htmlFor="consent-checkbox" className="text-sm font-normal cursor-pointer">
              By clicking "submit", I consent to join the email list and receive SMS from Survival 401k, with access to latest offers and services. Message and data rates may apply. Message frequency varies. More details on this are in our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>. Text "HELP" for help or contact us at (833) 224-5517. Text "STOP" to cancel.
            </label>
          </div>
        </div>
        
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={() => {
            console.log("Cancel button clicked");
            setShowConsentDialog(false);
          }}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleAccept} 
            disabled={!consentAccepted}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConsentDialog;
