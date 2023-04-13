import { Inter } from "next/font/google";

import {
  RelayPageProps,
  getInitialRelayProps,
  usePageQuery,
} from "@/lib/relay";
import { graphql } from "relay-runtime";
import homeQuery, {
  pagesHomeQuery,
} from "@/__generated__/pagesHomeQuery.graphql";
import Link from "next/link";
import { StarIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

type Props = RelayPageProps<pagesHomeQuery>;

export default function Home(props: Props) {
  const query = usePageQuery(
    graphql`
      query pagesHomeQuery {
        viewer {
          id
          repositories(last: 5) @required(action: LOG) {
            edges @required(action: LOG) {
              node @required(action: LOG) {
                id
                nameWithOwner @required(action: LOG)
                description
                stargazerCount
              }
            }
          }
        }
      }
    `,
    props.query
  );

  return (
    <div className="rounded-md shadow-md p-10 bg-white m-10">
      <h1 className="text-3xl font-bold text-black">Repositories</h1>

      <div className="flex flex-col">
        {query.viewer?.repositories.edges.map(
          (edge) =>
            edge && (
              <div className="flex flex-row p-5 border-b-2" key={edge.node.id}>
                <div className="">
                  <Link href={"/" + edge.node.nameWithOwner}>
                    <h2 className="text-xl font-bold text-black">
                      {edge.node.nameWithOwner}
                    </h2>
                  </Link>
                  <p className="text-gray-500">{edge.node.description}</p>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center">
                  <div className="flex flex-row items-center">
                    <p className="mr-2">{edge.node.stargazerCount}</p>
                    <StarIcon height={20} width={20} />
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

Home.getInitialProps = getInitialRelayProps(homeQuery, {});
