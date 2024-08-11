import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <p>Only Authenticated Person should see this.</p>
      <UserButton />
    </div>
  );
};

export default Home;
