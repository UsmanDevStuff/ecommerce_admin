import prismadb from "@/lib/prismadb";

import { DetailsForm } from "./components/details-form";

const DetailsPage = async ({
  params
}: {
  params: { detailsId: string }
}) => {
  const details = await prismadb.details.findUnique({
    where: {
      id: params.detailsId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DetailsForm initialData={details} />
      </div>
    </div>
  );
}

export default DetailsPage;
