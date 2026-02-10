"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your platform preferences and configuration
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Organization</CardTitle>
          <CardDescription>Update your organization details</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input id="org-name" defaultValue="Acme Corp" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="org-domain">Domain</Label>
            <Input id="org-domain" defaultValue="acme.com" />
          </div>
          <Button className="self-start">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>Configure how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Skill gap alerts
              </p>
              <p className="text-xs text-muted-foreground">
                Get notified when critical skill gaps are detected
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Team match updates
              </p>
              <p className="text-xs text-muted-foreground">
                Receive updates when new team recommendations are available
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Weekly reports
              </p>
              <p className="text-xs text-muted-foreground">
                Receive a weekly summary of skill analytics
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data Management</CardTitle>
          <CardDescription>
            Import and export your organization data
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Export employee data
              </p>
              <p className="text-xs text-muted-foreground">
                Download as CSV with all skill records
              </p>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Import skill data
              </p>
              <p className="text-xs text-muted-foreground">
                Upload a CSV file with employee skills
              </p>
            </div>
            <Button variant="outline" size="sm">
              Import
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
