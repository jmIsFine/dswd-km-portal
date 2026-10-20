<script setup lang="ts">
import { ref } from 'vue';
import { BellRing, ChevronDown, CheckCircle2, AlertTriangle, Info } from 'lucide-vue-next';
import type { AdvisoryItem, AdvisoryPriority } from '@/types/program';

const props = defineProps<{
  readonly advisories: ReadonlyArray<AdvisoryItem>;
}>();

const expandedIds = ref<ReadonlyArray<number>>([1]);

const isExpanded = (id: number): boolean => expandedIds.value.includes(id);

const toggleAdvisory = (id: number): void => {
  if (expandedIds.value.includes(id)) {
    expandedIds.value = expandedIds.value.filter((item) => item !== id);
  } else {
    expandedIds.value = [...expandedIds.value, id];
  }
};

const getPriorityBadgeClass = (priority: AdvisoryPriority): string => {
  switch (priority) {
    case 'urgent':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/40';
    case 'high':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
    case 'normal':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/40';
  }
};

const getPriorityLabel = (priority: AdvisoryPriority): string => {
  switch (priority) {
    case 'urgent':
      return 'Urgent Action Required';
    case 'high':
      return 'Important Advisory';
    case 'normal':
      return 'General Notice';
  }
};
</script>

<template>
  <section id="advisory" class="py-12 md:py-16 border-t border-slate-900 bg-slate-950/60">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <BellRing class="h-4 w-4 animate-bounce" />
            <span>Official Program Advisories</span>
          </div>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            ADVISORY &amp; ADMINISTRATIVE BULLETINS
          </h2>
          <p class="mt-1 text-sm text-slate-400 max-w-2xl">
            Official memoranda, pre-work instructions, and administrative announcements issued by the DSWD Social Welfare Institutional Development Bureau (SWIDB).
          </p>
        </div>

        <div class="text-xs text-slate-400">
          Click any bulletin card to expand full compliance instructions.
        </div>
      </div>

      <!-- BrewedOps Bento Focus & Expand to Detail Cards -->
      <div class="grid grid-cols-1 gap-4">
        <article
          v-for="item in props.advisories"
          :key="item.id"
          class="group rounded-2xl border transition-all duration-300"
          :class="
            isExpanded(item.id)
              ? 'border-blue-500/50 bg-slate-900/90 shadow-xl shadow-blue-950/30'
              : 'border-white/10 bg-slate-900/50 hover:border-white/25 hover:bg-slate-900/75'
          "
        >
          <button
            type="button"
            class="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left"
            @click="toggleAdvisory(item.id)"
          >
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2.5">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                  :class="getPriorityBadgeClass(item.priority)"
                >
                  <AlertTriangle v-if="item.priority === 'urgent'" class="h-3 w-3" />
                  <Info v-else class="h-3 w-3" />
                  {{ getPriorityLabel(item.priority) }}
                </span>

                <span class="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                  {{ item.referenceCode }}
                </span>

                <span class="text-xs text-slate-400">
                  Issued {{ item.publishedAt }} • {{ item.issuedBy }}
                </span>
              </div>

              <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {{ item.title }}
              </h3>

              <p class="text-sm text-slate-300 leading-relaxed">
                {{ item.summary }}
              </p>
            </div>

            <div
              class="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-800/80 text-slate-300 transition-transform duration-300"
              :class="isExpanded(item.id) ? 'rotate-180 bg-blue-600 text-white border-blue-500' : ''"
            >
              <ChevronDown class="h-4 w-4" />
            </div>
          </button>

          <!-- Expandable Checklist Content -->
          <div
            v-if="isExpanded(item.id)"
            class="border-t border-slate-800/80 bg-slate-950/60 px-5 py-4 sm:px-6 rounded-b-2xl"
          >
            <p class="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
              Key Compliance &amp; Action Items:
            </p>
            <ul class="space-y-2">
              <li
                v-for="(detail, idx) in item.details"
                :key="idx"
                class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
              >
                <CheckCircle2 class="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
