import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

interface SerchPageProps {
  searchParams: {
    term?: string;
  };
}

const SearchPage = ({ searchParams }: SerchPageProps) => {
  if (!searchParams.term) {
    redirect("/");
  }
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
