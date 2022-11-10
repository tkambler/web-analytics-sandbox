# Web Analytics Sandbox

This repository seeks to provide an easily-deployable sandbox for experimenting with concepts pertaining to feature flags and product analytics. It is geared towards React developers.

## Quick Start

```
npm i && \
    docker-compose up -d && \
    npm run start
```

- Access the GrowthBook UI at: http://localhost:3200/
- Create a new GrowthBook account and sign in.
- Create a new feature flag with key: `foo`
- Note the GrowthBook client-side SDK key and modify `./src/config.ts` accordingly.
- Access the React client UI at: http://localhost:9011/

## To Do

- This repository currently lacks a tool for analyzing product analytics. In other words, a tool similar to Mixpanel. Possible options include: [Matomo](https://matomo.org/) (formerly Piwik), [RudderStack](https://www.rudderstack.com/), and [Snowplow](https://snowplow.io/snowplow-open-source/).

## Related Resources

- [GrowthBook](https://www.growthbook.io/)
