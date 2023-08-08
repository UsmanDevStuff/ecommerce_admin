import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { detailsId: string } }
) {
  try {
    if (!params.detailsId) {
      return new NextResponse("Details id is required", { status: 400 });
    }

    const details = await prismadb.details.findUnique({
      where: {
        id: params.detailsId
      }
    });
  
    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { detailsId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.detailsId) {
      return new NextResponse("Details id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const details = await prismadb.details.delete({
      where: {
        id: params.detailsId
      }
    });
  
    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { detailsId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }


    if (!params.detailsId) {
      return new NextResponse("Details id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const details = await prismadb.details.update({
      where: {
        id: params.detailsId
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(details);
  } catch (error) {
    console.log('[DETAILS_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
