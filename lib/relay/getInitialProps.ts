import {
  ConcreteRequest,
  OperationType,
  VariablesOf,
  createOperationDescriptor,
} from "relay-runtime";
import { SerializablePreloadedQuery } from "./hooks";
import { NextPageContext } from "next";

export type RelayPageProps<TQuery extends OperationType> = {
  query: SerializablePreloadedQuery<TQuery>;
};

export function getInitialRelayProps<TQuery extends OperationType>(
  query: ConcreteRequest,
  variables:
    | VariablesOf<TQuery>
    | ((context: NextPageContext) => VariablesOf<TQuery>)
): (context: NextPageContext) => Promise<RelayPageProps<TQuery>> {
  return async (context) => {
    let vars = variables;
    if (typeof variables === "function") {
      vars = variables(context);
    }
    return {
      query: await loadSerializableQuery(query, vars),
    };
  };
}

export async function loadSerializableQuery<TQuery extends OperationType>(
  request: ConcreteRequest,
  variables: VariablesOf<TQuery>
): Promise<SerializablePreloadedQuery<TQuery>> {
  if (typeof window === "undefined") {
    return {
      params: request.params,
      variables: createOperationDescriptor(request, variables).request
        .variables,
      response: await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${process.env.AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          query: request.params.id ?? request.params.text,
          variables: createOperationDescriptor(request, variables).request
            .variables,
        }),
      }).then((response) => {
        return response.json();
      }),
    };
  }

  const ref = {
    params: request.params,
    variables: createOperationDescriptor(request, variables).request.variables,
    response: null,
  };

  return ref;
}
