<script setup lang="ts">
import {
  MapPin,
  Mail,
  Phone,
  Navigation,
  ShieldAlert,
  CheckCircle,
  ExternalLink,
} from 'lucide-vue-next';
import type { VenueDetails, SectionId } from '@/types/program';

const props = defineProps<{
  readonly venue: VenueDetails;
}>();

const emit = defineEmits<{
  (e: 'navigate', sectionId: SectionId): void;
}>();
</script>

<template>
  <section id="venue" class="py-12 md:py-16 border-t border-slate-900 bg-slate-950">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-10">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
          <MapPin class="h-4 w-4" />
          <span>Official Venue &amp; Gate Access</span>
        </div>
        <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          VENUE LOCATION &amp; DELEGATE LOGISTICS
        </h2>
        <p class="mt-1 text-sm text-slate-400 max-w-2xl">
          Hosted at the DSWD Academy inside the SWADCAP Compound, Taguig City. Review gate security protocols and travel landmarks below.
        </p>
      </div>

      <!-- Venue Bento Grid -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <!-- Left: Address & Protocols -->
        <div class="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-1 text-xs font-bold text-blue-300">
              <span>{{ props.venue.name }}</span>
            </div>

            <h3 class="mt-4 text-xl sm:text-2xl font-extrabold text-white">
              {{ props.venue.building }}
            </h3>
            <p class="mt-1 text-sm font-medium text-slate-300">
              {{ props.venue.addressLine }}, {{ props.venue.city }}
            </p>
            <p class="mt-1 font-mono text-xs text-amber-400">
              {{ props.venue.coordinatesLabel }}
            </p>

            <!-- Contact Pills -->
            <div class="mt-6 flex flex-wrap gap-3">
              <a
                :href="`mailto:${props.venue.email}`"
                class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-blue-400/50 hover:text-blue-300"
              >
                <Mail class="h-4 w-4 text-blue-400" />
                <span>{{ props.venue.email }}</span>
              </a>
              <div
                class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-slate-200"
              >
                <Phone class="h-4 w-4 text-emerald-400" />
                <span>{{ props.venue.hotlines.join(' | ') }}</span>
              </div>
            </div>

            <!-- Check-in & Gate Notes -->
            <div class="mt-7 border-t border-slate-800 pt-5">
              <h4 class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <ShieldAlert class="h-4 w-4" />
                On-Site Security &amp; Registration Protocols
              </h4>
              <ul class="mt-3 space-y-2.5">
                <li
                  v-for="(note, idx) in props.venue.checkInNotes"
                  :key="idx"
                  class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                >
                  <CheckCircle class="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{{ note }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right: Interactive Route & Landmarks Card -->
        <div class="lg:col-span-5 rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-400">
                Directions &amp; Nearby Landmarks
              </span>
              <Navigation class="h-4 w-4 text-blue-400" />
            </div>

            <!-- Visual Map Representation -->
            <div class="mt-4 relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div class="absolute inset-0 bg-[radial-gradient(#3b82f633_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
              <div class="relative z-10 flex flex-col items-center text-center py-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 animate-pulse-soft">
                  <MapPin class="h-6 w-6" />
                </div>
                <p class="mt-3 text-sm font-bold text-white">
                  SWADCAP Bldg., PONUSWA Compound
                </p>
                <p class="text-xs text-slate-400">
                  Don Chino Roces Ext., Brgy. Fort Bonifacio, Taguig City
                </p>
                <a
                  href="https://maps.google.com/?q=SWADCAP+Building+Taguig+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-500 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink class="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div class="mt-6">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Access Routes:
              </p>
              <ul class="space-y-2 text-xs text-slate-300">
                <li
                  v-for="(landmark, index) in props.venue.landmarks"
                  :key="index"
                  class="rounded-lg border border-slate-800/80 bg-slate-900/70 px-3.5 py-2.5"
                >
                  {{ landmark }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Official GOV.PH / DSWD Institutional Footer -->
  <footer class="border-t border-slate-800 bg-slate-950 py-12 text-xs text-slate-400">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div class="md:col-span-6 space-y-3">
          <div class="flex items-center gap-2.5">
            <span class="rounded bg-blue-700 px-2 py-0.5 text-xs font-extrabold text-white">
              DSWD
            </span>
            <span class="font-bold text-white text-sm">
              Department of Social Welfare and Development
            </span>
          </div>
          <p class="text-slate-400 max-w-md leading-relaxed">
            Social Welfare Institutional Development Bureau (SWIDB) — DSWD Academy.<br />
            {{ props.venue.building }}, {{ props.venue.addressLine }}, {{ props.venue.city }}.
          </p>
          <p class="text-slate-300 font-medium">
            Email: <a :href="`mailto:${props.venue.email}`" class="text-blue-400 hover:underline">{{ props.venue.email }}</a>
            &nbsp;|&nbsp;
            Tel: {{ props.venue.hotlines.join(' / ') }}
          </p>
        </div>

        <div class="md:col-span-3 space-y-2">
          <h4 class="font-bold uppercase tracking-wider text-white">Site Sections</h4>
          <ul class="space-y-1.5">
            <li><button type="button" class="hover:text-white" @click="emit('navigate', 'home')">Home</button></li>
            <li><button type="button" class="hover:text-white" @click="emit('navigate', 'advisory')">Advisory</button></li>
            <li><button type="button" class="hover:text-white" @click="emit('navigate', 'groupings')">Groupings</button></li>
            <li><button type="button" class="hover:text-white" @click="emit('navigate', 'schedule')">Schedule</button></li>
            <li><button type="button" class="hover:text-white" @click="emit('navigate', 'resources')">Embedded Files</button></li>
          </ul>
        </div>

        <div class="md:col-span-3 space-y-2">
          <h4 class="font-bold uppercase tracking-wider text-white">Republic of the Philippines</h4>
          <p class="leading-relaxed text-slate-400">
            All content is in the public domain unless otherwise stated. Compliant with Philippine Web Publishing Standards (PWPS).
          </p>
        </div>
      </div>

      <div class="mt-10 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 DSWD - Social Welfare Institutional Development Bureau (SWIDB).</p>
        <p class="text-slate-500">
          Built with Vue 3 (&lt;script setup lang="ts"&gt;) • Strict TypeScript • Laravel API Ready
        </p>
      </div>
    </div>
  </footer>
</template>
