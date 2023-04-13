import {
  QueryResponseCache,
  Network,
  Environment,
  Store,
  RecordSource,
  RequestParameters,
  Variables,
} from "relay-runtime";

function createQueryCache() {
  return new QueryResponseCache({ size: 10, ttl: 5000 });
}

function createNetwork(responseCache: QueryResponseCache) {
  function fetchQuery(operation: RequestParameters, variables: Variables) {
    return fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: operation.text,
        variables: variables,
      }),
    }).then((response) => {
      return response.json();
    });
  }

  return Network.create((operation, variables) => {
    const queryID = operation.id ?? operation.cacheID;
    const fromQueryCache = responseCache.get(queryID, variables);
    if (fromQueryCache) {
      return fromQueryCache;
    }

    return fetchQuery(operation, variables);
  });
}

const responseCacheByEnvironment = new WeakMap<
  Environment,
  QueryResponseCache
>();

export function getCacheByEnvironment(environment: Environment) {
  return responseCacheByEnvironment.get(environment);
}

export function createEnvironment() {
  const cache = createQueryCache();
  const network = createNetwork(cache);
  const store = new Store(new RecordSource());
  const environment = new Environment({
    network,
    store,
    isServer: typeof window === "undefined",
  });
  responseCacheByEnvironment.set(environment, cache);
  return environment;
}
