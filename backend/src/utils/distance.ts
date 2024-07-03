import { MapLocation } from '../models/map-location';

const MIN_DISTANCE: number = 0.1; // 100 meters

export function withinDistance(loc1?: MapLocation, loc2?: MapLocation): boolean {

    if (!loc1 || !loc2) return false;

    return getDistance(loc1, loc2) <= MIN_DISTANCE;
}

function getDistance(loc1: MapLocation, loc2: MapLocation): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const earthRadiusKm = 6371;

    const dLat = toRadians(loc2.latitude - loc1.latitude);
    const dLng = toRadians(loc2.longitude - loc1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(loc1.latitude)) * Math.cos(toRadians(loc2.longitude)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
}