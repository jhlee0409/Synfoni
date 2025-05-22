"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample user profile data
const userProfile = {
  name: "Your Name",
  username: "yourname",
  title: "Full Stack Developer",
  bio: "Passionate developer focused on React, TypeScript, and Node.js. Learning and sharing my journey.",
  tags: ["react", "typescript", "node.js"],
  avatar: "/placeholder.svg?height=100&width=100",
}

/**
 * Renders a user interface for configuring and previewing public sharing settings for a user profile.
 *
 * Allows users to control profile visibility, select log sharing levels, edit profile information, choose which log types to share, and adjust additional privacy and display settings. Provides a live preview of how the public profile will appear to others.
 *
 * @returns The React component for managing and previewing public sharing preferences.
 *
 * @remark The "Save Settings" action only logs the current settings and displays a confirmation alert; it does not persist changes.
 */
export function PublicSharingSettings() {
 const [privacyLevel, setPrivacyLevel] = useState("balanced")
  const [publicProfile, setPublicProfile] = useState(true)
  const [sharingLevel, setSharingLevel] = useState("selective")
  const [profileData, setProfileData] = useState(userProfile)
  const [selectedLogTypes, setSelectedLogTypes] = useState(["technical", "learning"])
  const [showStats, setShowStats] = useState(true)
  const [showStreak, setShowStreak] = useState(true)
  const [allowComments, setAllowComments] = useState(true)

  const handleSaveSettings = () => {
    // Here you would save the settings to your database
    console.log({
      publicProfile,
      sharingLevel,
      profileData,
      selectedLogTypes,
      showStats,
      showStreak,
      allowComments,
    })
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Public Sharing Settings</CardTitle>
          <CardDescription>Control what information is visible to the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public-profile">Public Profile</Label>
              <p className="text-sm text-muted-foreground">Enable to make your profile visible to other developers</p>
            </div>
            <Switch id="public-profile" checked={publicProfile} onCheckedChange={setPublicProfile} />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Sharing Level</Label>
            <RadioGroup value={sharingLevel} onValueChange={setSharingLevel}>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="all" id="all" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="all" className="font-medium">
                    Share All Logs
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Make all your development logs publicly visible (not recommended)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="selective" id="selective" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="selective" className="font-medium">
                    Selective Sharing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Choose which logs to make public by marking them individually
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="none" id="none" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="none" className="font-medium">
                    Private Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Keep your profile public but don't share any logs (view only)
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Profile Information</Label>
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Log Types to Share</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      Select which types of logs you want to share publicly. This only applies when using Selective
                      Sharing.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="technical"
                  checked={selectedLogTypes.includes("technical")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLogTypes([...selectedLogTypes, "technical"])
                    } else {
                      setSelectedLogTypes(selectedLogTypes.filter((type) => type !== "technical"))
                    }
                  }}
                />
                <Label htmlFor="technical" className="text-sm font-normal">
                  Technical Logs (code snippets, solutions)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="learning"
                  checked={selectedLogTypes.includes("learning")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLogTypes([...selectedLogTypes, "learning"])
                    } else {
                      setSelectedLogTypes(selectedLogTypes.filter((type) => type !== "learning"))
                    }
                  }}
                />
                <Label htmlFor="learning" className="text-sm font-normal">
                  Learning Logs (tutorials, courses)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="project"
                  checked={selectedLogTypes.includes("project")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLogTypes([...selectedLogTypes, "project"])
                    } else {
                      setSelectedLogTypes(selectedLogTypes.filter((type) => type !== "project"))
                    }
                  }}
                />
                <Label htmlFor="project" className="text-sm font-normal">
                  Project Logs (progress updates, milestones)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reflection"
                  checked={selectedLogTypes.includes("reflection")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLogTypes([...selectedLogTypes, "reflection"])
                    } else {
                      setSelectedLogTypes(selectedLogTypes.filter((type) => type !== "reflection"))
                    }
                  }}
                />
                <Label htmlFor="reflection" className="text-sm font-normal">
                  Reflections (challenges, insights)
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Additional Settings</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-stats" className="text-sm font-normal">
                  Show Activity Statistics
                </Label>
                <Switch id="show-stats" checked={showStats} onCheckedChange={setShowStats} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-streak" className="text-sm font-normal">
                  Display Streak Information
                </Label>
                <Switch id="show-streak" checked={showStreak} onCheckedChange={setShowStreak} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-comments" className="text-sm font-normal">
                  Allow Comments on Public Logs
                </Label>
                <Switch id="allow-comments" checked={allowComments} onCheckedChange={setAllowComments} />
              </div>
            </div>
          </div>

          <Separator />

  <div className="space-y-3">
    <Label>Privacy Level</Label>
    <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
      <SelectTrigger>
        <SelectValue placeholder="Select privacy level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="minimal">Minimal (Share as little as possible)</SelectItem>
        <SelectItem value="balanced">Balanced (Recommended)</SelectItem>
        <SelectItem value="open">Open (Share more details)</SelectItem>
      </SelectContent>
    </Select>
    <p className="text-xs text-muted-foreground">
      This setting controls the granularity of information shared in your public profile and logs.
    </p>
  </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Preview</CardTitle>
          <CardDescription>How others will see your profile in the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <img
                  src={profileData.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="absolute -right-1 -top-1 rounded-full bg-primary p-1">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>

            <div className="w-full space-y-3 text-center sm:text-left">
              <div>
                <h3 className="text-lg font-bold">{profileData.name}</h3>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <Badge variant="outline">@{profileData.username}</Badge>
                  <Badge variant="secondary">{profileData.title}</Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{profileData.bio}</p>

              <div className="flex flex-wrap justify-center gap-1 sm:justify-start">
                {profileData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {showStats && (
                <div className="flex justify-center gap-4 rounded-md border p-2 sm:justify-start">
                  <div className="text-center">
                    <div className="text-sm font-medium">187</div>
                    <div className="text-xs text-muted-foreground">Entries</div>
                  </div>
                  {showStreak && (
                    <div className="text-center">
                      <div className="text-sm font-medium">28</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-sm font-medium">5.2</div>
                    <div className="text-xs text-muted-foreground">Weekly Avg</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
