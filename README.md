# DATOVA — World Data Intelligence (functional MVP)

Next.js 15 + React 19 + TypeScript. Public-source-only foundation.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Working features
- Thai responsive dashboard and country selector with 10 selectable country points on a **schematic**, not geodetically accurate, map.
- Live fetch from USGS earthquake feed; timestamps and upstream failure handling; 5-minute refresh.
- Open-Meteo current weather by selected country's reference coordinate; timestamps and error states.
- Topic navigation, earthquake search, public-source directory, camera source directory.
- No invented live stock prices, AI prediction probabilities, CCTV streams, or investment metrics.

## Next steps before production
1. Replace schematic map with MapLibre GL + licensed country boundary GeoJSON; geocoded city drilldown.
2. Integrate vetted public CCTV streams with explicit embed/rebroadcast licenses; verify live health and attribution. Currently links only, no actual streams.
3. Add official flood levels, rainfall radar, news, trade and market APIs **only after** licensing/terms review; markets may need paid redistributable data.
4. Implement ingest workers, storage, source registry, rate limiting, logs, deduplication, stale-feed detection and monitoring.
5. Add Supabase authentication and database schema if watchlists and alerts are needed.
6. Implement backtested forecasting with model versioning and calibrated uncertainty; do not present model guesses as probabilities.
7. Add automated tests, accessibility audit, production secrets and deployment.

## Attribution
USGS: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
Open-Meteo: https://open-meteo.com/ (check current commercial licensing and attribution requirements before monetizing)

The dashboard is a **development MVP**, not a deployed production service or a complete live global intelligence platform.
