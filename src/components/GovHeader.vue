<script setup lang="ts">
import { ref } from 'vue';
import { Menu, X, Search, ShieldCheck, Sparkles } from 'lucide-vue-next';
import type { NavItem, SectionId } from '@/types/program';

const props = defineProps<{
  readonly navItems: ReadonlyArray<NavItem>;
  readonly activeSection: SectionId;
  readonly isScrolled: boolean;
  readonly scrollProgress: number;
  readonly agencyAcronym: string;
}>();

const emit = defineEmits<{
  (e: 'navigate', sectionId: SectionId): void;
  (e: 'openSearch'): void;
}>();

const hoveredItem = ref<SectionId | null>(null);
const mobileMenuOpen = ref<boolean>(false);

const handleNavClick = (sectionId: SectionId): void => {
  mobileMenuOpen.value = false;
  emit('navigate', sectionId);
};
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      props.isScrolled
        ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-blue-950/20'
        : 'bg-gradient-to-b from-slate-950/90 to-transparent'
    "
  >
    <!-- Official Republic of the Philippines GovPH Top Bar -->
    <div class="border-b border-white/10 bg-slate-950/95 px-4 py-1.5 text-[11px] text-slate-300">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <div class="flex items-center gap-2">
          <ShieldCheck class="h-3.5 w-3.5 text-amber-400" />
          <span class="font-semibold tracking-wider text-white uppercase">GOV.PH</span>
          <span class="hidden sm:inline text-slate-400">|</span>
          <span class="hidden sm:inline text-slate-300">
            Official Activity Portal • Department of Social Welfare and Development (SWIDB)
          </span>
        </div>
        <div class="flex items-center gap-3 text-[11px]">
          <span class="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            2026 Retooling Live Hub
          </span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
      <!-- Brand Identity -->
      <button
        type="button"
        class="group flex items-center gap-3 text-left focus:outline-none"
        @click="handleNavClick('home')"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 font-extrabold text-white shadow-lg shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105"
        >
          KM
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="rounded bg-blue-500/20 border border-blue-400/30 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-blue-300 uppercase">
              {{ props.agencyAcronym }} 2026
            </span>
            <span class="hidden md:inline-flex items-center gap-1 text-[10px] text-amber-300/90 font-medium">
              <Sparkles class="h-3 w-3" /> SWIDB
            </span>
          </div>
          <p class="text-sm font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
            National KM Learning &amp; Innovation
          </p>
        </div>
      </button>

      <!-- BrewedOps Sliding Pill Desktop Navigation -->
      <nav
        aria-label="Primary Navigation"
        class="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/80 p-1.5 backdrop-blur-md"
        @mouseleave="hoveredItem = null"
      >
        <button
          v-for="item in props.navItems"
          :key="item.id"
          type="button"
          class="relative rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          :class="
            props.activeSection === item.id
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
              : hoveredItem === item.id
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:text-white'
          "
          @mouseenter="hoveredItem = item.id"
          @click="handleNavClick(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- Search Site Action (Matching Google Site Search + BrewedOps Command Bar trigger) -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/90 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-blue-400/50 hover:bg-slate-800 hover:text-white"
          @click="emit('openSearch')"
        >
          <Search class="h-3.5 w-3.5 text-blue-400" />
          <span class="hidden sm:inline">Search site...</span>
          <kbd class="hidden md:inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
            Ctrl K
          </kbd>
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          type="button"
          class="inline-flex lg:hidden items-center justify-center rounded-lg border border-white/10 bg-slate-900 p-2 text-slate-200 hover:bg-slate-800"
          aria-label="Toggle Menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-xl"
    >
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="item in props.navItems"
          :key="item.id"
          type="button"
          class="rounded-xl px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider transition-all"
          :class="
            props.activeSection === item.id
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          "
          @click="handleNavClick(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <!-- BrewedOps Scroll Progress Bar -->
    <div class="relative h-[2px] w-full bg-slate-900/40 overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 transition-all duration-150 ease-out"
        :style="{ width: `${props.scrollProgress}%` }"
      />
    </div>
  </header>
</template>
