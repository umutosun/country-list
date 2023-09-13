import { useQuery, gql } from "@apollo/client";
import { List } from "../../components";
import { columns } from "./column";
import { useState } from "react";

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
  const [filtering, setFiltering] = useState("");
  return (
    <div>
      {data && (
        <>
          <input
            type="text"
            value={filtering}
            placeholder="Search countries..."
            onChange={(e) => setFiltering(e.target.value)}
            className="border-solid w-72 border-2 border-customColors-gray500 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-customColors-blue500 ml-4 mt-2 mb-1"
          />
          <List data={data.countries} columns={columns} filtering={filtering} />
        </>
      )}
    </div>
  );
};

export default Home;
