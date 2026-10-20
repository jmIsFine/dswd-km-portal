import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { SectionId } from '@/types/program';

export interface ScrollSpyState {
  readonly activeSection: Readonly<Ref<SectionId>>;
  readonly isScrolled: Readonly<Ref<boolean>>;
  readonly scrollProgress: Readonly<Ref<number>>;
  readonly scrollToSection: (sectionId: SectionId) => void;
}

export function useScrollSpy(sectionIds: ReadonlyArray<SectionId>): ScrollSpyState {
  const activeSection = ref<SectionId>('home');
  const isScrolled = ref<boolean>(false);
  const scrollProgress = ref<number>(0);

  const handleScroll = (): void => {
    const scrollTop = window.scrollY;
    isScrolled.value = scrollTop > 28;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = docHeight > 0 ? Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100) : 0;

    const triggerOffset = window.innerHeight * 0.28;
    for (let i = sectionIds.length - 1; i >= 0; i -= 1) {
      const id = sectionIds[i];
      if (!id) continue;
      const element = document.getElementById(id);
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          activeSection.value = id;
          break;
        }
      }
    }
  };

  const scrollToSection = (sectionId: SectionId): void => {
    activeSection.value = sectionId;
    const element = document.getElementById(sectionId);
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  onMounted((): void => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  });

  onUnmounted((): void => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    activeSection,
    isScrolled,
    scrollProgress,
    scrollToSection,
  };
}
