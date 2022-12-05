# Web Analytics Sandbox

This project provides an easily-deployable sandbox for experimenting with concepts pertaining to feature flags, A/B tests, and product analytics. It allows you to quickly get up and running with the following open-source tools:

- [GrowthBook](https://www.growthbook.io/) - A feature flag & A/B testing platform
- [Jitsu](https://jitsu.com/) - A data / event ingestion engine (an alternative to [Segment](https://segment.com/))
- [Umami](https://umami.is/) - A simple alternative to Google Analytics

It also includes a simple [React](https://reactjs.org/) application with which you can interact with these tools.

## Quick Start

```
npm i && \
    docker-compose up -d && \
    npm run start
```

## GrowthBook

Access the GrowthBook UI at [this URL](http://localhost:3200/). Create a new account and sign in. Note the client-side SDK key and modify `./src/config.ts` accordingly.

## Umami

Access the Umami UI at [this URL](http://localhost:3000). Create a new account and sign in.

### Querying Event Data

```
SELECT
	e.event_uuid, e.event_name, e.created_at, ed.event_data,
	ed.event_data ->> 'id' AS user_id, ed.event_data ->> 'anonymousID' AS anonymous_id
FROM
	event AS e
INNER JOIN event_data AS ed ON ed.event_id = e.event_id
```

#### Querying for a Specific Event

```
SELECT
	e.event_uuid, e.event_name, e.created_at, ed.event_data,
	ed.event_data ->> 'id' AS user_id, ed.event_data ->> 'anonymousID' AS anonymous_id
FROM
	event AS e
INNER JOIN event_data AS ed ON ed.event_id = e.event_id
WHERE
	e.event_name = 'button_clicked'
```

## React App

Access the React application at [this URL](http://localhost:9011). There is no supporting back-end server. All API endpoints pertaining to session management are mocked out [here](./src/components/Setup/msw.ts) with [MSW](https://mswjs.io/).

## Related Resources

- [GrowthBook Chrome Developer Tools Extension](https://chrome.google.com/webstore/detail/growthbook-devtools/opemhndcehfgipokneipaafbglcecjia)
