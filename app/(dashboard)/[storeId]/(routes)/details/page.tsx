import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { DetailsColumn } from "./components/columns"
import { DetailsClient } from "./components/client";

const DetailsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const details = await prismadb.details.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedDetails: DetailsColumn[] = details.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DetailsClient data={formattedDetails} />
      </div>
    </div>
  );
};

export default DetailsPage;
