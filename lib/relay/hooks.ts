import { useMemo } from "react";
import {
  PreloadFetchPolicy,
  PreloadedQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from "react-relay";
import {
  Environment,
  GraphQLResponse,
  GraphQLTaggedNode,
  OperationType,
  RequestParameters,
  VariablesOf,
} from "relay-runtime";
import { getCacheByEnvironment } from "./environment";

export interface SerializablePreloadedQuery<TQuery extends OperationType> {
  params: RequestParameters;
  variables: VariablesOf<TQuery>;
  response: GraphQLResponse | null;
}

export function useSerializablePreloadedQuery<TQuery extends OperationType>(
  queryRef: SerializablePreloadedQuery<TQuery>,
  fetchPolicy: PreloadFetchPolicy = "store-or-network"
): PreloadedQuery<TQuery> {
  const environment = useRelayEnvironment();
  useMemo(() => {
    writeToCache(queryRef, environment);
  }, [environment, queryRef]);

  return {
    environment,
    fetchKey: queryRef.params.id ?? queryRef.params.cacheID,
    fetchPolicy,
    isDisposed: false,
    name: queryRef.params.name,
    kind: "PreloadedQuery",
    variables: queryRef.variables,
    dispose: () => {
      return;
    },
  };
}

export function usePageQuery<TQuery extends OperationType>(
  gql: GraphQLTaggedNode,
  ref: SerializablePreloadedQuery<TQuery>,
  fetchPolicy: PreloadFetchPolicy = "store-or-network"
) {
  const preloadedQuery = useSerializablePreloadedQuery(ref, fetchPolicy);
  return usePreloadedQuery(gql, preloadedQuery);
}

function writeToCache<TQuery extends OperationType>(
  ref: SerializablePreloadedQuery<TQuery>,
  environment: Environment
) {
  const cache = getCacheByEnvironment(environment);
  if (cache && ref.response != null) {
    cache.set(ref.params.id ?? ref.params.cacheID, ref.variables, ref.response);
  }
}
