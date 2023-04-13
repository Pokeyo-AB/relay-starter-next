/**
 * @generated SignedSource<<f1378e5b4846937f72dc776fe4f15626>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest, Query } from 'relay-runtime';
export type pagesHomeQuery$variables = {};
export type pagesHomeQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly repositories: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly description: string | null;
          readonly id: string;
          readonly nameWithOwner: string;
          readonly stargazerCount: number;
        };
      } | null>;
    };
  } | null;
};
export type pagesHomeQuery = {
  response: pagesHomeQuery$data;
  variables: pagesHomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 5
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stargazerCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pagesHomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": (v1/*: any*/),
              "concreteType": "RepositoryConnection",
              "kind": "LinkedField",
              "name": "repositories",
              "plural": false,
              "selections": [
                {
                  "kind": "RequiredField",
                  "field": {
                    "alias": null,
                    "args": null,
                    "concreteType": "RepositoryEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "RequiredField",
                        "field": {
                          "alias": null,
                          "args": null,
                          "concreteType": "Repository",
                          "kind": "LinkedField",
                          "name": "node",
                          "plural": false,
                          "selections": [
                            (v0/*: any*/),
                            {
                              "kind": "RequiredField",
                              "field": (v2/*: any*/),
                              "action": "LOG",
                              "path": "viewer.repositories.edges.node.nameWithOwner"
                            },
                            (v3/*: any*/),
                            (v4/*: any*/)
                          ],
                          "storageKey": null
                        },
                        "action": "LOG",
                        "path": "viewer.repositories.edges.node"
                      }
                    ],
                    "storageKey": null
                  },
                  "action": "LOG",
                  "path": "viewer.repositories.edges"
                }
              ],
              "storageKey": "repositories(last:5)"
            },
            "action": "LOG",
            "path": "viewer.repositories"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagesHomeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RepositoryEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Repository",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "repositories(last:5)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "43e572ae6a3a9163976719bcac47d474",
    "id": null,
    "metadata": {},
    "name": "pagesHomeQuery",
    "operationKind": "query",
    "text": "query pagesHomeQuery {\n  viewer {\n    id\n    repositories(last: 5) {\n      edges {\n        node {\n          id\n          nameWithOwner\n          description\n          stargazerCount\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0642b5dd40f135e4305d56e06a2d4edd";

export default node;
