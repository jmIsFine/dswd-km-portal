<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  Calendar,
  MapPin,
  ArrowRight,
  FolderOpen,
  Users,
  Sparkles,
  ExternalLink,
} from 'lucide-vue-next';
import type { QuickLinkItem, SectionId } from '@/types/program';

const props = defineProps<{
  readonly bureauName: string;
  readonly programTitle: string;
  readonly programSubtitle: string;
  readonly eventDatesLabel: string;
  readonly eventIsoStart: string;
  readonly stats: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
    readonly suffix: string;
  }>;
  readonly quickLinks: ReadonlyArray<QuickLinkItem>;
}>();

const emit = defineEmits<{
  (e: 'navigate', sectionId: SectionId): void;
}>();

interface CountdownClock {
  readonly days: string;
  readonly hours: string;
  readonly minutes: string;
  readonly seconds: string;
}

const countdown = ref<CountdownClock>({
  days: '28',
  hours: '16',
  minutes: '15',
  seconds: '00',
});

let timerHandle: number | null = null;

const updateCountdown = (): void => {
  const targetTime = new Date(props.eventIsoStart).getTime();
  const now = Date.now();
  const diff = Math.max(targetTime - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
};

onMounted((): void => {
  updateCountdown();
  timerHandle = window.setInterval(updateCountdown, 1000);
});

onUnmounted((): void => {
  if (timerHandle !== null) {
    window.clearInterval(timerHandle);
  }
});
</script>

<template>
  <section
    id="home"
    class="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16"
  >
    <!-- BrewedOps Gradient Mesh Drift + Blueprint Grid Backdrop -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-700/30 via-indigo-600/20 to-amber-500/15 blur-3xl"
      />
      <div
        class="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-red-600/15 blur-3xl"
      />
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b2e_1px,transparent_1px),linear-gradient(to_bottom,#1e293b2e_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_70%,transparent_100%)]"
      />
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 w-full">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        <!-- Left Column: Headline & CTAs -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Floating UI Chip -->
          <div
            class="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-sm backdrop-blur-md"
          >
            <Sparkles class="h-3.5 w-3.5 text-amber-400" />
            <span>{{ props.bureauName }}</span>
          </div>

          <!-- Split Headline Reveal with Shimmering Highlight -->
          <h1
            class="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] lg:leading-[1.12]"
          >
            2026 National
            <span
              class="bg-gradient-to-r from-blue-400 via-amber-300 to-blue-400 bg-[length:200%_auto] animate-shine bg-clip-text text-transparent"
            >
              Knowledge Management
            </span>
            Learning &amp; Innovation Program Retooling Activity
          </h1>

          <p class="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {{ props.programSubtitle }}
          </p>

          <!-- Meta Badges -->
          <div class="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium text-slate-200">
            <div class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2">
              <Calendar class="h-4 w-4 text-amber-400" />
              <span>{{ props.eventDatesLabel }}</span>
            </div>
            <div class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2">
              <MapPin class="h-4 w-4 text-red-400" />
              <span>DSWD Academy, SWADCAP Bldg., Taguig City</span>
            </div>
          </div>

          <!-- BrewedOps Button Shine Sweep & Magnetic-style CTAs -->
          <div class="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              class="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/50 active:translate-y-0"
              @click="emit('navigate', 'schedule')"
            >
              <span>View Program Schedule</span>
              <ArrowRight class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-blue-400/50 hover:bg-slate-800 hover:text-white"
              @click="emit('navigate', 'groupings')"
            >
              <Users class="h-4 w-4 text-blue-400" />
              <span>Find Your Grouping</span>
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-amber-400/50 hover:bg-slate-800 hover:text-white"
              @click="emit('navigate', 'resources')"
            >
              <FolderOpen class="h-4 w-4 text-amber-400" />
              <span>Embedded Files</span>
            </button>
          </div>
        </div>

        <!-- Right Column: BrewedOps Flip Countdown + Quick Links Card Stack -->
        <div class="lg:col-span-5 space-y-5">
          <!-- Live Countdown Glass Card -->
          <div
            class="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/75 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-widest text-blue-400">
                  Activity Kick-Off Countdown
                </span>
                <h2 class="text-sm font-semibold text-white mt-0.5">
                  Plenary Hall Doors Open In
                </h2>
              </div>
              <span
                class="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-semibold text-emerald-300"
              >
                Registration Active
              </span>
            </div>

            <div class="mt-5 grid grid-cols-4 gap-3 text-center">
              <div class="rounded-xl border border-white/10 bg-slate-950/90 p-3 shadow-inner">
                <div class="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {{ countdown.days }}
                </div>
                <div class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Days
                </div>
              </div>
              <div class="rounded-xl border border-white/10 bg-slate-950/90 p-3 shadow-inner">
                <div class="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400">
                  {{ countdown.hours }}
                </div>
                <div class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Hours
                </div>
              </div>
              <div class="rounded-xl border border-white/10 bg-slate-950/90 p-3 shadow-inner">
                <div class="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                  {{ countdown.minutes }}
                </div>
                <div class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Mins
                </div>
              </div>
              <div class="rounded-xl border border-white/10 bg-slate-950/90 p-3 shadow-inner">
                <div class="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400">
                  {{ countdown.seconds }}
                </div>
                <div class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Secs
                </div>
              </div>
            </div>

            <!-- Quick Links Hub (Direct match to DSWD Site QUICK LINKS) -->
            <div class="mt-6">
              <div class="mb-2.5 flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Quick Links &amp; Embedded Portals
                </span>
                <span class="text-[11px] text-slate-400">DSWD Academy</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  v-for="link in props.quickLinks"
                  :key="link.id"
                  :href="link.href"
                  :target="link.href.startsWith('http') ? '_blank' : undefined"
                  rel="noopener noreferrer"
                  class="group flex flex-col justify-between rounded-xl border border-white/10 bg-slate-950/70 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-slate-900"
                >
                  <div class="flex items-center justify-between">
                    <span
                      class="rounded bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-blue-300"
                    >
                      {{ link.badge }}
                    </span>
                    <ExternalLink
                      class="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-blue-400"
                    />
                  </div>
                  <div class="mt-2">
                    <p class="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      {{ link.label }}
                    </p>
                    <p class="text-[11px] text-slate-400 line-clamp-1">
                      {{ link.subtitle }}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stats Bar -->
      <div
        class="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md sm:grid-cols-4"
      >
        <div
          v-for="stat in props.stats"
          :key="stat.label"
          class="border-l-2 border-blue-500/60 pl-4"
        >
          <div class="text-2xl sm:text-3xl font-extrabold text-white">
            {{ stat.value }}<span class="text-amber-400">{{ stat.suffix }}</span>
          </div>
          <div class="mt-0.5 text-xs font-medium text-slate-400">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
