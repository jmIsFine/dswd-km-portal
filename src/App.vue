<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import GovHeader from '@/components/GovHeader.vue';
import HeroSection from '@/components/HeroSection.vue';
import AdvisorySection from '@/components/AdvisorySection.vue';
import GroupingsSection from '@/components/GroupingsSection.vue';
import ScheduleSection from '@/components/ScheduleSection.vue';
import TeamSection from '@/components/TeamSection.vue';
import ResourcesSection from '@/components/ResourcesSection.vue';
import VenueFooterSection from '@/components/VenueFooterSection.vue';
import CommandSearchModal from '@/components/CommandSearchModal.vue';
import { NAVIGATION_ITEMS } from '@/data/dswdProgramData';
import { useScrollSpy } from '@/composables/useScrollSpy';
import { useProgramPortal } from '@/services/programApiService';
import type { SectionId } from '@/types/program';

const sectionOrder: ReadonlyArray<SectionId> = [
  'home',
  'advisory',
  'groupings',
  'schedule',
  'team',
  'resources',
  'venue',
];

const { activeSection, isScrolled, scrollProgress, scrollToSection } =
  useScrollSpy(sectionOrder);

const { portalData } = useProgramPortal();
const isSearchModalOpen = ref<boolean>(false);

const handleGlobalKeydown = (event: KeyboardEvent): void => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    isSearchModalOpen.value = !isSearchModalOpen.value;
  } else if (event.key === 'Escape' && isSearchModalOpen.value) {
    isSearchModalOpen.value = false;
  }
};

onMounted((): void => {
  window.addEventListener('keydown', handleGlobalKeydown);
});

onUnmounted((): void => {
  window.removeEventListener('keydown', handleGlobalKeydown);
});
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
    <GovHeader
      :nav-items="NAVIGATION_ITEMS"
      :active-section="activeSection"
      :is-scrolled="isScrolled"
      :scroll-progress="scrollProgress"
      :agency-acronym="portalData.agencyAcronym"
      @navigate="scrollToSection"
      @open-search="isSearchModalOpen = true"
    />

    <main>
      <HeroSection
        :bureau-name="portalData.bureauName"
        :program-title="portalData.programTitle"
        :program-subtitle="portalData.programSubtitle"
        :event-dates-label="portalData.eventDatesLabel"
        :event-iso-start="portalData.eventIsoStart"
        :stats="portalData.heroStats"
        :quick-links="portalData.quickLinks"
        @navigate="scrollToSection"
      />

      <AdvisorySection :advisories="portalData.advisories" />

      <GroupingsSection :groupings="portalData.groupings" />

      <ScheduleSection :schedule-days="portalData.scheduleDays" />

      <TeamSection :team-members="portalData.teamMembers" />

      <ResourcesSection :resources="portalData.resources" />

      <VenueFooterSection
        :venue="portalData.venue"
        @navigate="scrollToSection"
      />
    </main>

    <CommandSearchModal
      :is-open="isSearchModalOpen"
      :portal-data="portalData"
      @close="isSearchModalOpen = false"
      @navigate="scrollToSection"
    />
  </div>
</template>
