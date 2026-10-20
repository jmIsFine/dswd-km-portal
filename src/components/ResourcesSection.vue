<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  FolderDown,
  FileText,
  Download,
  Check,
  ExternalLink,
} from 'lucide-vue-next';
import type {
  ResourceDocument,
  ResourceCategory,
  ResourceFileType,
} from '@/types/program';

const props = defineProps<{
  readonly resources: ReadonlyArray<ResourceDocument>;
}>();

const categories: ReadonlyArray<ResourceCategory> = [
  'All',
  'Guidelines',
  'Template',
  'Workshop Kit',
  'Presentation',
];

const selectedCategory = ref<ResourceCategory>('All');
const downloadedIds = ref<ReadonlyArray<number>>([]);
const downloadingId = ref<number | null>(null);

const filteredResources = computed<ReadonlyArray<ResourceDocument>>(() => {
  if (selectedCategory.value === 'All') {
    return props.resources;
  }
  return props.resources.filter((doc) => doc.category === selectedCategory.value);
});

const triggerDownload = (doc: ResourceDocument): void => {
  if (doc.fileType === 'PORTAL') {
    window.open(doc.downloadUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  downloadingId.value = doc.id;
  window.setTimeout((): void => {
    downloadingId.value = null;
    if (!downloadedIds.value.includes(doc.id)) {
      downloadedIds.value = [...downloadedIds.value, doc.id];
    }
  }, 650);
};

const getFileBadgeClass = (fileType: ResourceFileType): string => {
  switch (fileType) {
    case 'PDF':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    case 'XLSX':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'PPTX':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'DOCX':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'PORTAL':
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
  }
};
</script>

<template>
  <section id="resources" class="py-12 md:py-16 border-t border-slate-900 bg-slate-950/60">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <FolderDown class="h-4 w-4" />
            <span>Embedded Files &amp; Activity Kits</span>
          </div>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            RESOURCES &amp; EMBEDDED FILES
          </h2>
          <p class="mt-1 text-sm text-slate-400 max-w-2xl">
            Download official concept notes, regional baseline worksheets, slide deck templates, and workshop toolkits directly from the SWIDB repository.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200"
            :class="
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'border border-white/10 bg-slate-900 text-slate-300 hover:border-white/25 hover:text-white'
            "
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- BrewedOps Spotlight Border Cards + Download State -->
      <TransitionGroup
        name="flip-list"
        tag="div"
        class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="doc in filteredResources"
          :key="doc.id"
          class="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-amber-950/20"
        >
          <div>
            <div class="flex items-center justify-between gap-2">
              <span class="rounded bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-300">
                {{ doc.code }}
              </span>
              <span
                class="rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider"
                :class="getFileBadgeClass(doc.fileType)"
              >
                {{ doc.fileType }} • {{ doc.fileSize }}
              </span>
            </div>

            <div class="mt-4 flex items-start gap-3">
              <div class="mt-0.5 rounded-xl bg-blue-500/10 border border-blue-500/20 p-2.5 text-blue-400">
                <FileText class="h-5 w-5" />
              </div>
              <div>
                <span class="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                  {{ doc.category }}
                </span>
                <h3 class="mt-0.5 text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {{ doc.title }}
                </h3>
              </div>
            </div>

            <p class="mt-3 text-xs text-slate-300 leading-relaxed">
              {{ doc.description }}
            </p>
          </div>

          <div class="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
            <span class="text-[11px] text-slate-400">
              Updated {{ doc.updatedAt }}
            </span>

            <!-- BrewedOps Loading to Success Button -->
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all"
              :class="
                downloadedIds.includes(doc.id)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm shadow-blue-600/30'
              "
              @click="triggerDownload(doc)"
            >
              <template v-if="downloadingId === doc.id">
                <span class="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Preparing...</span>
              </template>
              <template v-else-if="downloadedIds.includes(doc.id)">
                <Check class="h-3.5 w-3.5" />
                <span>Downloaded</span>
              </template>
              <template v-else-if="doc.fileType === 'PORTAL'">
                <span>Open Sandbox</span>
                <ExternalLink class="h-3.5 w-3.5" />
              </template>
              <template v-else>
                <Download class="h-3.5 w-3.5" />
                <span>Download File</span>
              </template>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>
