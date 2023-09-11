import { useQuery, gql } from "@apollo/client";
import { List } from "../../components";
import { columns } from "./column";

const GET_COUNTRIES = gql`
  query {
    countries {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;
const Home = () => {
  const { data } = useQuery(GET_COUNTRIES);

  return <div>{data && <List data={data.countries} columns={columns} />}</div>;
};

export default Home;
