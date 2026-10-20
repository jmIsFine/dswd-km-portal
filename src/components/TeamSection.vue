<script setup lang="ts">
import { Award, Mail, Building2 } from 'lucide-vue-next';
import type { TeamMember } from '@/types/program';

const props = defineProps<{
  readonly teamMembers: ReadonlyArray<TeamMember>;
}>();
</script>

<template>
  <section id="team" class="py-12 md:py-16 border-t border-slate-900 bg-slate-950">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
          <Award class="h-4 w-4" />
          <span>SWIDB &amp; DSWD Academy Secretariat</span>
        </div>
        <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          THE TEAM &amp; PROGRAM CONVENERS
        </h2>
        <p class="mt-1 text-sm text-slate-400 max-w-2xl">
          Meet the core technical team from the Social Welfare Institutional Development Bureau (SWIDB) and DSWD Academy spearheading the 2026 KM Retooling Activity.
        </p>
      </div>

      <!-- BrewedOps Team Card Reveal Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="member in props.teamMembers"
          :key="member.id"
          class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-950/40"
        >
          <!-- Subtle Top Gradient Bar -->
          <div
            class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r"
            :class="member.accentColor"
          />

          <div>
            <!-- Avatar Initials Badge -->
            <div class="flex items-center justify-between">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-extrabold text-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                :class="member.accentColor"
              >
                {{ member.initials }}
              </div>
              <span class="rounded-full border border-white/10 bg-slate-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                SWIDB Core
              </span>
            </div>

            <div class="mt-5">
              <h3 class="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {{ member.fullName }}
              </h3>
              <p class="mt-0.5 text-xs font-semibold text-amber-300">
                {{ member.roleTitle }}
              </p>
              <div class="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                <Building2 class="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span>{{ member.bureauDivision }}</span>
              </div>
            </div>

            <p class="mt-4 text-xs text-slate-300 leading-relaxed">
              {{ member.responsibility }}
            </p>
          </div>

          <div class="mt-6 border-t border-slate-800/80 pt-3.5">
            <a
              :href="`mailto:${member.email}`"
              class="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-blue-300 transition-colors"
            >
              <Mail class="h-3.5 w-3.5 text-blue-400" />
              <span>{{ member.email }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
