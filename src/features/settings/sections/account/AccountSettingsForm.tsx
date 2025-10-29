import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { ChangePasswordForm } from "./components/ChangePasswordForm";

export const AccountSettingsForm = () => {
  // Change email state
  const [currentEmail] = useState("user@example.com");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailPassword, setEmailPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [retypeEmail, setRetypeEmail] = useState("");

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) {
      return `${localPart[0]}***@${domain}`;
    }
    return `${localPart.slice(0, 2)}***@${domain}`;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail !== retypeEmail) {
      alert("Emails do not match!");
      return;
    }
    console.log("Change email:", {
      emailPassword,
      newEmail,
    });
    // TODO: Implement email change logic
    setEmailDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <ChangePasswordForm />

      {/* Change Email Section */}
      <div className="space-y-6 pt-6 border-t">
        <div>
          <h3 className="text-lg font-semibold mb-4">Email Address</h3>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Current Email</p>
              <p className="font-medium">{maskEmail(currentEmail)}</p>
            </div>
            <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Pencil className="size-4 mr-2" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleEmailSubmit}>
                  <DialogHeader>
                    <DialogTitle>Change Email Address</DialogTitle>
                    <DialogDescription>
                      Enter your password and new email address to update your
                      account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-password">Current Password</Label>
                      <PasswordInput
                        id="email-password"
                        value={emailPassword}
                        onChange={(e) => setEmailPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-email">New Email</Label>
                      <Input
                        id="new-email"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter new email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retype-email">Retype New Email</Label>
                      <Input
                        id="retype-email"
                        type="email"
                        value={retypeEmail}
                        onChange={(e) => setRetypeEmail(e.target.value)}
                        placeholder="Retype new email"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEmailDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Update Email</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
