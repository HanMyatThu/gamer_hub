import { Suspense } from "react";

import { Results, ResultsSkeleton } from "./_components/results";

const Home = () => {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
};

export default Home;
