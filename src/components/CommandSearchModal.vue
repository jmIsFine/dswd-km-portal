<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Search, X, ArrowRight } from 'lucide-vue-next';
import type { ProgramPortalPayload, SectionId } from '@/types/program';

const props = defineProps<{
  readonly isOpen: boolean;
  readonly portalData: ProgramPortalPayload;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'navigate', sectionId: SectionId): void;
}>();

interface SearchResultItem {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly subtitle: string;
  readonly sectionId: SectionId;
}

const query = ref<string>('');

watch(
  () => props.isOpen,
  (open: boolean): void => {
    if (open) {
      query.value = '';
    }
  }
);

const results = computed<ReadonlyArray<SearchResultItem>>(() => {
  const q = query.value.trim().toLowerCase();
  const items: SearchResultItem[] = [];

  for (const adv of props.portalData.advisories) {
    if (
      q.length === 0 ||
      adv.title.toLowerCase().includes(q) ||
      adv.referenceCode.toLowerCase().includes(q)
    ) {
      items.push({
        id: `adv-${adv.id}`,
        category: 'Advisory',
        title: adv.title,
        subtitle: `${adv.referenceCode} • ${adv.publishedAt}`,
        sectionId: 'advisory',
      });
    }
  }

  for (const group of props.portalData.groupings) {
    const memberMatch = group.members.find(
      (m) =>
        m.fullName.toLowerCase().includes(q) ||
        m.fieldOffice.toLowerCase().includes(q)
    );
    if (
      q.length === 0 ||
      group.groupName.toLowerCase().includes(q) ||
      Boolean(memberMatch)
    ) {
      items.push({
        id: `grp-${group.id}`,
        category: 'Groupings',
        title: group.groupName,
        subtitle: memberMatch
          ? `Includes ${memberMatch.fullName} (${memberMatch.fieldOffice})`
          : `${group.breakoutRoom} • Facilitator: ${group.facilitator}`,
        sectionId: 'groupings',
      });
    }
  }

  for (const res of props.portalData.resources) {
    if (
      q.length === 0 ||
      res.title.toLowerCase().includes(q) ||
      res.code.toLowerCase().includes(q)
    ) {
      items.push({
        id: `res-${res.id}`,
        category: 'Embedded File',
        title: res.title,
        subtitle: `${res.code} • ${res.fileType} (${res.fileSize})`,
        sectionId: 'resources',
      });
    }
  }

  return items.slice(0, 8);
});

const selectItem = (sectionId: SectionId): void => {
  emit('close');
  emit('navigate', sectionId);
};
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 p-4 pt-24 backdrop-blur-md"
    @click.self="emit('close')"
  >
    <div
      class="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl"
    >
      <div class="flex items-center border-b border-slate-800 px-4 py-3.5">
        <Search class="h-5 w-5 text-blue-400 mr-3" />
        <input
          v-model="query"
          type="text"
          autofocus
          placeholder="Search advisories, delegates, field offices, or embedded files..."
          class="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
        />
        <button
          type="button"
          class="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          @click="emit('close')"
        >
          <X class="h-4 w-4" />
        </button>
      </div>

      <div class="max-h-96 overflow-y-auto p-3 divide-y divide-slate-800/60">
        <button
          v-for="item in results"
          :key="item.id"
          type="button"
          class="group flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-slate-800/80"
          @click="selectItem(item.sectionId)"
        >
          <div>
            <span class="rounded bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300">
              {{ item.category }}
            </span>
            <p class="mt-1 text-sm font-semibold text-white group-hover:text-blue-300">
              {{ item.title }}
            </p>
            <p class="text-xs text-slate-400">
              {{ item.subtitle }}
            </p>
          </div>
          <ArrowRight class="h-4 w-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
        </button>

        <div v-if="results.length === 0" class="py-10 text-center text-xs text-slate-400">
          No matching entries found for "{{ query }}".
        </div>
      </div>
    </div>
  </div>
</template>
