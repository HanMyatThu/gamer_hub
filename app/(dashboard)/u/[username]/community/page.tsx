import { format } from "date-fns";

import { getAllBlockedUsers } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

interface CommunityPageProps {
  params: {
    username: string;
  };
}

const CommunityPage = async () => {
  const blockedUsers = await getAllBlockedUsers();

  const formattedData = blockedUsers.map((blocked) => ({
    ...blocked,
    userId: blocked.blocked.id,
    imageUrl: blocked.blocked.imageUrl,
    username: blocked.blocked.username,
    createdAt: format(new Date(blocked.blocked.createdAt), "dd/MM/yyyy"),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default CommunityPage;
