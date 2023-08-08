"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, DetailsColumn } from "./columns";

interface DetailsClientProps {
  data: DetailsColumn[];
}

export const DetailsClient: React.FC<DetailsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Details (${data.length})`} description="Manage details for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/details/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Details" />
      <Separator />
      <ApiList entityName="details" entityIdName="detailsId" />
    </>
  );
};
