import { auth } from "@/auth";
import StudentForm from "@/components/StudentForm";
import { clientNoCache } from "@/sanity/lib/client";
import { STUDENT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  if (!session) redirect("/admin");

  const id = (await params).id;

  const student = await clientNoCache.fetch(STUDENT_BY_ID_QUERY, {
    id,
  });

  if (!student) return redirect("/admin/ho-so-hoc-vien");

  return (
    <section className="w-full bg-white rounded-2xl p-7">
      <div className="w-full mx-auto p-6 min-h-screen">
        <Link
          href="/admin/ho-so-hoc-vien"
          className="flex items-center text-gray-700 mb-6 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Quay lại</span>
        </Link>

        <StudentForm student={student} />
      </div>
    </section>
  );
};

export default Page;
