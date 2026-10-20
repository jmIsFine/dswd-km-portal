export type SectionId =
  | 'home'
  | 'advisory'
  | 'groupings'
  | 'schedule'
  | 'team'
  | 'resources'
  | 'venue';

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

export type AdvisoryPriority = 'urgent' | 'high' | 'normal';

export interface AdvisoryItem {
  readonly id: number;
  readonly referenceCode: string;
  readonly title: string;
  readonly summary: string;
  readonly details: ReadonlyArray<string>;
  readonly issuedBy: string;
  readonly publishedAt: string;
  readonly priority: AdvisoryPriority;
}

export type ClusterRegion = 'All' | 'Luzon' | 'Visayas' | 'Mindanao' | 'Central Office';

export interface GroupParticipant {
  readonly id: number;
  readonly fullName: string;
  readonly designation: string;
  readonly fieldOffice: string;
}

export interface ParticipantGroup {
  readonly id: number;
  readonly groupCode: string;
  readonly groupName: string;
  readonly cluster: Exclude<ClusterRegion, 'All'>;
  readonly breakoutRoom: string;
  readonly facilitator: string;
  readonly members: ReadonlyArray<GroupParticipant>;
}

export type ActivityTrack = 'Plenary' | 'Breakout Workshop' | 'Innovation Lab' | 'Networking';

export interface ScheduleActivity {
  readonly id: number;
  readonly timeRange: string;
  readonly title: string;
  readonly description: string;
  readonly speaker: string;
  readonly speakerRole: string;
  readonly venueHall: string;
  readonly track: ActivityTrack;
}

export interface ScheduleDay {
  readonly id: string;
  readonly dayNumber: number;
  readonly dateLabel: string;
  readonly theme: string;
  readonly activities: ReadonlyArray<ScheduleActivity>;
}

export interface TeamMember {
  readonly id: number;
  readonly fullName: string;
  readonly roleTitle: string;
  readonly bureauDivision: string;
  readonly responsibility: string;
  readonly email: string;
  readonly initials: string;
  readonly accentColor: string;
}

export type ResourceCategory = 'All' | 'Guidelines' | 'Presentation' | 'Workshop Kit' | 'Template';
export type ResourceFileType = 'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'PORTAL';

export interface ResourceDocument {
  readonly id: number;
  readonly code: string;
  readonly title: string;
  readonly description: string;
  readonly category: Exclude<ResourceCategory, 'All'>;
  readonly fileType: ResourceFileType;
  readonly fileSize: string;
  readonly updatedAt: string;
  readonly downloadUrl: string;
}

export interface QuickLinkItem {
  readonly id: number;
  readonly label: string;
  readonly subtitle: string;
  readonly href: string;
  readonly badge: string;
}

export interface VenueDetails {
  readonly name: string;
  readonly building: string;
  readonly addressLine: string;
  readonly city: string;
  readonly email: string;
  readonly hotlines: ReadonlyArray<string>;
  readonly coordinatesLabel: string;
  readonly landmarks: ReadonlyArray<string>;
  readonly checkInNotes: ReadonlyArray<string>;
}

export interface ProgramPortalPayload {
  readonly agencyName: string;
  readonly agencyAcronym: string;
  readonly bureauName: string;
  readonly programTitle: string;
  readonly programSubtitle: string;
  readonly eventDatesLabel: string;
  readonly eventIsoStart: string;
  readonly heroStats: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
    readonly suffix: string;
  }>;
  readonly advisories: ReadonlyArray<AdvisoryItem>;
  readonly groupings: ReadonlyArray<ParticipantGroup>;
  readonly scheduleDays: ReadonlyArray<ScheduleDay>;
  readonly teamMembers: ReadonlyArray<TeamMember>;
  readonly resources: ReadonlyArray<ResourceDocument>;
  readonly quickLinks: ReadonlyArray<QuickLinkItem>;
  readonly venue: VenueDetails;
}
