import { graphql } from "relay-runtime";
import {
  RelayPageProps,
  getInitialRelayProps,
  usePageQuery,
} from "@/lib/relay";
import repositoryQuery, {
  RepositoryQuery,
} from "@/__generated__/RepositoryQuery.graphql";

type Props = RelayPageProps<RepositoryQuery>;

export default function RepositoryPage(props: Props) {
  const query = usePageQuery(
    graphql`
      query RepositoryQuery($name: String!, $owner: String!) {
        repository(name: $name, owner: $owner) {
          name
          description
        }
      }
    `,
    props.query
  );
  return (
    <div>
      <h1 className="text-2xl">{query.repository?.name}</h1>
      <h2 className="text-1xl">{query.repository?.description}</h2>
    </div>
  );
}

RepositoryPage.getInitialProps = getInitialRelayProps(
  repositoryQuery,
  (context) => ({
    name: context.query.repository,
    owner: context.query.username,
  })
);
