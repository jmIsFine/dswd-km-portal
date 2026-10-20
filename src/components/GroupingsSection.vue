<script setup lang="ts">
import { ref, computed } from 'vue';
import { Users, Search, MapPin, UserCheck, Filter } from 'lucide-vue-next';
import type { ParticipantGroup, ClusterRegion } from '@/types/program';

const props = defineProps<{
  readonly groupings: ReadonlyArray<ParticipantGroup>;
}>();

const clusters: ReadonlyArray<ClusterRegion> = [
  'All',
  'Luzon',
  'Visayas',
  'Mindanao',
  'Central Office',
];

const selectedCluster = ref<ClusterRegion>('All');
const searchQuery = ref<string>('');

const filteredGroups = computed<ReadonlyArray<ParticipantGroup>>(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return props.groupings.filter((group) => {
    const matchesCluster =
      selectedCluster.value === 'All' || group.cluster === selectedCluster.value;

    if (!matchesCluster) return false;
    if (query.length === 0) return true;

    const matchesGroupMeta =
      group.groupName.toLowerCase().includes(query) ||
      group.groupCode.toLowerCase().includes(query) ||
      group.facilitator.toLowerCase().includes(query) ||
      group.breakoutRoom.toLowerCase().includes(query);

    const matchesMember = group.members.some(
      (member) =>
        member.fullName.toLowerCase().includes(query) ||
        member.fieldOffice.toLowerCase().includes(query) ||
        member.designation.toLowerCase().includes(query)
    );

    return matchesGroupMeta || matchesMember;
  });
});

const getClusterBadgeColor = (cluster: Exclude<ClusterRegion, 'All'>): string => {
  switch (cluster) {
    case 'Luzon':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'Visayas':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'Mindanao':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    case 'Central Office':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  }
};
</script>

<template>
  <section id="groupings" class="py-12 md:py-16 border-t border-slate-900 bg-slate-950">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Users class="h-4 w-4" />
            <span>Cluster &amp; Breakout Assignments</span>
          </div>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            PARTICIPANT GROUPINGS
          </h2>
          <p class="mt-1 text-sm text-slate-400 max-w-2xl">
            Search your name, Field Office (e.g., FO NCR, FO VII, FO XI), or filter by island cluster to locate your assigned Workshop Breakout Room and Facilitator.
          </p>
        </div>

        <!-- Search Input + Cluster Filter Pills -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="relative min-w-[260px]">
            <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search delegate or Field Office..."
              class="w-full rounded-xl border border-white/15 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- BrewedOps Segmented Filter Bar -->
      <div class="mb-8 flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 mr-2">
          <Filter class="h-3.5 w-3.5 text-blue-400" /> Filter Cluster:
        </span>
        <button
          v-for="cluster in clusters"
          :key="cluster"
          type="button"
          class="rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200"
          :class="
            selectedCluster === cluster
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'border border-white/10 bg-slate-900 text-slate-300 hover:border-white/25 hover:text-white'
          "
          @click="selectedCluster = cluster"
        >
          {{ cluster }}
        </button>
      </div>

      <!-- BrewedOps Flip Layout Animated Grid -->
      <TransitionGroup
        name="flip-list"
        tag="div"
        class="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <div
          v-for="group in filteredGroups"
          :key="group.id"
          class="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-blue-950/30"
        >
          <div>
            <!-- Top Meta Row -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div class="flex items-center gap-2">
                <span class="rounded bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-blue-300">
                  {{ group.groupCode }}
                </span>
                <span
                  class="rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                  :class="getClusterBadgeColor(group.cluster)"
                >
                  {{ group.cluster }}
                </span>
              </div>
              <div class="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300">
                <MapPin class="h-3.5 w-3.5" />
                <span>{{ group.breakoutRoom }}</span>
              </div>
            </div>

            <!-- Group Title & Facilitator -->
            <div class="mt-4">
              <h3 class="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {{ group.groupName }}
              </h3>
              <p class="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-400">
                <UserCheck class="h-3.5 w-3.5 text-emerald-400" />
                <span>Facilitator: <strong class="text-slate-200">{{ group.facilitator }}</strong></span>
              </p>
            </div>

            <!-- Members Table -->
            <div class="mt-5 overflow-hidden rounded-xl border border-slate-800/90 bg-slate-950/70">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/70">
                    <th class="py-2.5 px-3.5">Participant Name</th>
                    <th class="py-2.5 px-3.5">Field Office / Bureau</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-xs">
                  <tr
                    v-for="member in group.members"
                    :key="member.id"
                    class="transition-colors hover:bg-blue-950/20"
                  >
                    <td class="py-2.5 px-3.5">
                      <div class="font-semibold text-slate-100">{{ member.fullName }}</div>
                      <div class="text-[11px] text-slate-400">{{ member.designation }}</div>
                    </td>
                    <td class="py-2.5 px-3.5 font-medium text-blue-300">
                      {{ member.fieldOffice }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div
        v-if="filteredGroups.length === 0"
        class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center"
      >
        <p class="text-sm font-semibold text-slate-300">
          No participant groupings matched "{{ searchQuery }}" in {{ selectedCluster }}.
        </p>
        <button
          type="button"
          class="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
          @click="
            searchQuery = '';
            selectedCluster = 'All';
          "
        >
          Reset Filters
        </button>
      </div>
    </div>
  </section>
</template>
