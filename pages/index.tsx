import fetcher from "../src/fetcher";
import useSWR from "swr";
import { Reading } from "@prisma/client";
import { ApiResponse } from "./api/types";

type Props = {
  initialData: ApiResponse<{ readings: Reading[] }>;
};

const HomePage: React.FC<Props> = ({ initialData }) => {
  console.log(initialData);
  const { data, error } = useSWR<ApiResponse<{ readings: Reading[] }>>(
    "/api/readings",
    fetcher,
    {
      initialData,
    }
  );
  if (error) {
    return <div>failed to load.</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }
  const readings = data?.data?.readings;
  return (
    <div>
      {!readings && <div>No readings available!</div>}
      {readings && (
        <ul>
          {readings.map((x) => (
            <li key={x.id}>
              {x.value} recorded on {new Date(x.createdAt).toDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const readings = await fetcher(`${process.env.URL_BASENAME}/api/readings`);
  return { props: { readings } };
};
