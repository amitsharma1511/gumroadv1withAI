import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/utils/supabase/actions";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Type check already done at file upload form
  const files = formData.getAll("files") as File[];

  // Thats it, you have your files
  console.log(files);

  const fileToStorage = files[0];

  const data = await uploadFile(fileToStorage);
  // console.log("IMAGE UPLOAD DATA", data);

  return NextResponse.json({
    message: "Files Created",
    uploaded_file_url: `https://msuffhbsifsszabcswwj.supabase.co/storage/v1/object/public/gumroad/${data.path}`,
  });
}
