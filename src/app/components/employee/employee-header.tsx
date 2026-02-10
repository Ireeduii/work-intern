"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Calendar } from "lucide-react";

interface EmployeeHeaderProps {
  name: string;
  role: string;
  team: string;
  email: string;
  location: string;
  joinDate: string;
  avatarUrl?: string;
}

export function EmployeeHeader({
  name,
  role,
  team,
  email,
  location,
  joinDate,
  avatarUrl,
}: EmployeeHeaderProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-border">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-lg font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {name}
          </h1>
          <p className="text-base text-muted-foreground">{role}</p>
          <Badge variant="secondary" className="mt-2 font-medium">
            {team}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground sm:flex-col sm:items-end sm:gap-2">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Joined {joinDate}</span>
        </div>
      </div>
    </div>
  );
}
