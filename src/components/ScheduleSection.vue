<script setup lang="ts">
import { ref, computed } from 'vue';
import { CalendarDays, Clock, MapPin, Mic, Layers } from 'lucide-vue-next';
import type { ScheduleDay, ActivityTrack } from '@/types/program';

const props = defineProps<{
  readonly scheduleDays: ReadonlyArray<ScheduleDay>;
}>();

const selectedDayId = ref<string>(props.scheduleDays[0]?.id ?? 'day-1');

const activeDay = computed<ScheduleDay | undefined>(() =>
  props.scheduleDays.find((day) => day.id === selectedDayId.value) ?? props.scheduleDays[0]
);

const getTrackBadgeClass = (track: ActivityTrack): string => {
  switch (track) {
    case 'Plenary':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'Breakout Workshop':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'Innovation Lab':
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    case 'Networking':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  }
};
</script>

<template>
  <section id="schedule" class="py-12 md:py-16 border-t border-slate-900 bg-slate-950/70">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <!-- Header & Day Switcher -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <CalendarDays class="h-4 w-4" />
            <span>Program Matrix &amp; Session Flow</span>
          </div>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            OFFICIAL ACTIVITY SCHEDULE
          </h2>
          <p class="mt-1 text-sm text-slate-400 max-w-2xl">
            Three-day intensive retooling curriculum combining executive plenary keynotes, regional knowledge mapping workshops, and innovation pitches.
          </p>
        </div>

        <!-- BrewedOps Segmented Section Switch -->
        <div class="inline-flex rounded-2xl border border-white/10 bg-slate-900 p-1.5">
          <button
            v-for="day in props.scheduleDays"
            :key="day.id"
            type="button"
            class="rounded-xl px-4 py-2.5 text-left transition-all duration-200"
            :class="
              selectedDayId === day.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            "
            @click="selectedDayId = day.id"
          >
            <div class="text-xs font-extrabold uppercase tracking-wider">
              Day {{ day.dayNumber }}
            </div>
            <div class="text-[11px] opacity-85">
              {{ day.dateLabel }}
            </div>
          </button>
        </div>
      </div>

      <!-- Active Day Banner -->
      <div
        v-if="activeDay"
        class="mb-8 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-slate-900/90 p-5 sm:p-6"
      >
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-blue-400">
              Day {{ activeDay.dayNumber }} Theme • {{ activeDay.dateLabel }}
            </span>
            <h3 class="mt-1 text-lg sm:text-xl font-bold text-white">
              {{ activeDay.theme }}
            </h3>
          </div>
          <span class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-medium text-slate-300">
            <Layers class="h-3.5 w-3.5 text-amber-400" />
            {{ activeDay.activities.length }} Scheduled Sessions
          </span>
        </div>
      </div>

      <!-- BrewedOps Timeline with Growing Spine -->
      <div v-if="activeDay" class="relative pl-6 sm:pl-8 before:absolute before:top-3 before:bottom-3 before:left-2.5 sm:before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-amber-400 before:to-slate-800">
        <div class="space-y-6">
          <div
            v-for="session in activeDay.activities"
            :key="session.id"
            class="group relative rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 transition-all duration-300 hover:border-blue-400/40 hover:bg-slate-900"
          >
            <!-- Timeline Node Dot -->
            <span
              class="absolute -left-[25px] sm:-left-[29px] top-7 h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-950 transition-transform duration-200 group-hover:scale-125 group-hover:bg-amber-400"
            />

            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
              <div class="inline-flex items-center gap-2 text-xs font-bold text-amber-300 font-mono">
                <Clock class="h-4 w-4 text-amber-400" />
                <span>{{ session.timeRange }}</span>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                  :class="getTrackBadgeClass(session.track)"
                >
                  {{ session.track }}
                </span>
                <span class="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                  <MapPin class="h-3.5 w-3.5 text-rose-400" />
                  {{ session.venueHall }}
                </span>
              </div>
            </div>

            <div class="mt-4">
              <h4 class="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {{ session.title }}
              </h4>
              <p class="mt-1.5 text-sm text-slate-300 leading-relaxed">
                {{ session.description }}
              </p>
            </div>

            <div class="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Mic class="h-3.5 w-3.5 text-blue-400" />
              <span>
                Resource Person / Lead:
                <strong class="text-slate-200">{{ session.speaker }}</strong>
                <span class="text-slate-500"> — {{ session.speakerRole }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
