window.POKEMAP_CONFIG = {
  apiBase: "https://api.example.com",
  reportApiBase: "https://fieldresearch-api.arcaniaxbrennian.workers.dev",
  turnstileSiteKey: "",
  geofence: { enabled: true, latitude: 51.198, longitude: 4.46257, radiusKm: 15 },
  // Testing only. Requires Niantic to allow this website's origin through CORS.
  nianticFrontendFallback: true,
  nianticGraphqlUrl: "https://niantic-social-api.nianticlabs.com/graphql",
  nianticRealityChannelId: "da83476a-c4da-4312-a610-a4f2fc2c37f0",
  scrapedDuckResearchUrl: "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.min.json"
};
