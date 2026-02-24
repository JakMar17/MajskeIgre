<template>
    <div v-if="mapUrl" class="concert__map__wrapper">
        <div class="container">
            <iframe :src="mapUrl" width="100%" :height="props.height ?? 220" style="border: 0; border-radius: 1rem;" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade" title="Lokacija dogodka" />
        </div>
    </div>
</template>

<script lang="ts" setup>
type ConcertGeoPoint = {
    type: string;
    coordinates: [number, number];
};

function parseGeoLocation(geoLocation?: string): ConcertGeoPoint | null {
    if (!geoLocation) return null;

    try {
        const parsed = JSON.parse(geoLocation) as ConcertGeoPoint;
        const [longitude, latitude] = parsed.coordinates ?? [];

        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
}

const props = defineProps<{ geoLocation?: string, height?: number }>();

const coordinates = computed(() => parseGeoLocation(props.geoLocation)?.coordinates);

const mapUrl = computed(() => {

    if (!coordinates.value) { return null; }


    const zoom = 17;
    const delta = 0.0012;
    const [longitude, latitude] = coordinates.value ?? [0, 0];
    const left = longitude - delta;
    const right = longitude + delta;
    const top = latitude + delta;
    const bottom = latitude - delta;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitude}%2C${longitude}&zoom=${zoom}`;
});

</script>