<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/**
 * Laravel API Controller matching src/types/program.ts (ProgramPortalPayload)
 * Route: GET /api/v1/programs/{slug}
 */
final class ProgramPortalController extends Controller
{
    public function show(string $slug): JsonResponse
    {
        // In production, load via Eloquent with eager loading:
        // $program = ProgramActivity::with(['advisories', 'groups.members', 'scheduleDays.activities', 'teamMembers', 'resources'])->where('slug', $slug)->firstOrFail();

        return response()->json([
            'data' => [
                'agencyName' => 'Department of Social Welfare and Development',
                'agencyAcronym' => 'DSWD',
                'bureauName' => 'Social Welfare Institutional Development Bureau (SWIDB)',
                'programTitle' => '2026 National Knowledge Management Learning and Innovation Program Retooling Activity',
                'programSubtitle' => 'Strengthening institutional memory, evidence-based social protection delivery, and digital KM ecosystems across all DSWD Field Offices and Bureaus.',
                'eventDatesLabel' => 'November 18–20, 2026 • Taguig City, Metro Manila',
                'eventIsoStart' => '2026-11-18T08:00:00+08:00',
                'heroStats' => [
                    ['label' => 'Field Offices & Bureaus', 'value' => '17', 'suffix' => '+'],
                    ['label' => 'KM Focal Delegates', 'value' => '140', 'suffix' => ''],
                    ['label' => 'Innovation Labs', 'value' => '6', 'suffix' => ' Tracks'],
                    ['label' => 'Knowledge Products', 'value' => '45', 'suffix' => '+'],
                ],
                'advisories' => [],
                'groupings' => [],
                'scheduleDays' => [],
                'teamMembers' => [],
                'resources' => [],
                'quickLinks' => [],
                'venue' => [
                    'name' => 'DSWD Academy',
                    'building' => 'SWADCAP Building, PONUSWA Compound',
                    'addressLine' => 'Don Chino Roces Ave. Extension, Brgy. Fort Bonifacio',
                    'city' => 'Taguig City, Metro Manila, Philippines',
                    'email' => 'swidb@dswd.gov.ph',
                    'hotlines' => ['(02) 8 843 6370', '(02) 8 843 6191'],
                    'coordinatesLabel' => '14.5312° N, 121.0234° E • Fort Bonifacio Gate Access',
                    'landmarks' => [],
                    'checkInNotes' => [],
                ],
            ],
            'meta' => [
                'slug' => $slug,
                'version' => '2026.1.0',
                'generatedAt' => now()->toIso8601String(),
            ],
        ]);
    }
}
