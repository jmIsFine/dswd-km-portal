import { ref } from 'vue';
import type { Ref } from 'vue';
import { PROGRAM_PORTAL_DATA } from '@/data/dswdProgramData';
import type { ProgramPortalPayload } from '@/types/program';

export interface LaravelApiResponse<TData> {
  readonly data: TData;
  readonly meta: {
    readonly version: string;
    readonly generatedAt: string;
  };
}

export interface UseProgramPortalReturn {
  readonly portalData: Readonly<Ref<ProgramPortalPayload>>;
  readonly isLoading: Readonly<Ref<boolean>>;
  readonly errorMessage: Readonly<Ref<string | null>>;
  readonly refreshFromLaravelApi: (endpointUrl?: string) => Promise<void>;
}

function isProgramPortalPayload(value: unknown): value is ProgramPortalPayload {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.agencyName === 'string' &&
    typeof record.programTitle === 'string' &&
    Array.isArray(record.advisories) &&
    Array.isArray(record.groupings) &&
    Array.isArray(record.scheduleDays)
  );
}

export function useProgramPortal(): UseProgramPortalReturn {
  const portalData = ref<ProgramPortalPayload>(PROGRAM_PORTAL_DATA);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const refreshFromLaravelApi = async (
    endpointUrl = '/api/v1/programs/2026-km-activity'
  ): Promise<void> => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      const response = await fetch(endpointUrl, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch program payload`);
      }

      const rawJson: unknown = await response.json();

      if (
        typeof rawJson === 'object' &&
        rawJson !== null &&
        'data' in rawJson &&
        isProgramPortalPayload((rawJson as { data: unknown }).data)
      ) {
        portalData.value = (rawJson as LaravelApiResponse<ProgramPortalPayload>).data;
      } else if (isProgramPortalPayload(rawJson)) {
        portalData.value = rawJson;
      }
    } catch (err: unknown) {
      errorMessage.value =
        err instanceof Error ? err.message : 'Unable to reach Laravel API; using local snapshot.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    portalData,
    isLoading,
    errorMessage,
    refreshFromLaravelApi,
  };
}
