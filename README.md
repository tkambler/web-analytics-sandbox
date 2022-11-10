# Web Analytics Sandbox

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

## Related Resources

- [GrowthBook](https://www.growthbook.io/)
