import SearchForm from "@/components/SearchForm";
import { CONSTRUCTION_BY_SLUG_QUERY, PROJECT_DETAILS_BY_QUERY, PROJECTS_BY_CONSTRUCTION_ID_QUERY, } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import SimpleCard, { SimpleCardType } from "@/components/SimpleCard";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProjectDetailList from "@/components/ProjectDetailList";

export default async function Construction({ searchParams }: Readonly<{
  searchParams: Promise<{ query?: string }>
}>) {

  const query = (await searchParams).query;

  const post = await client.fetch(CONSTRUCTION_BY_SLUG_QUERY, { 'slug': 'thi-cong' });

  if (!post) return notFound();

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_CONSTRUCTION_ID_QUERY, params: { id: post._id } });

  if (!searchForProjects) return notFound();

  return (
    <>
      <MarkupSchema path="thi-cong" />

      <section className={"pink_container md:!min-h-[28rem] !flex !mt-0 !md:my-0 !pb-4 !pt-16 "}>
        <h1 className={"heading"}>
          Hạng Mục Thi Công 
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Công Trình Mà Bạn Quan Tâm.
        </p>

        <SearchForm query={query} path="du-an" search="hạng mục thi công" />
      </section>

      <>
        { (
          searchForProjects.map((post: SimpleCardType) => (
            <ProjectDetailList key={post?._id} post={post} className="!p-0 !md:mt-10" />
          ))
        )}
      </>
      <SanityLive />
    </>
  );
}


export const metadata: Metadata = {
  title: "NEO Music - Gia Hòa - Q9",
  description: "NEO MUSIC 🚩 Trường kiểu mẫu về đào tạo nền, ✅ Cam kết ra bài sau 3 buổi học, ✅ Lớp học riêng biệt cho các bộ môn, ✅ Người lớn có không gian riêng, ✅ Học thử & tập đàn miễn phí",
  keywords: ["Đào Tạo", "Dạy Nhạc", "Nhạc Cụ"],
  openGraph: {
    title: "Đào Tạo, Âm Nhạc | NEO MUSIC",
    description: "NEO MUSIC 🚩 Trường kiểu mẫu về đào tạo nền, ✅ Cam kết ra bài sau 3 buổi học, ✅ Lớp học riêng biệt cho các bộ môn, ✅ Người lớn có không gian riêng, ✅ Học thử & tập đàn miễn phí.",
    url: "https://neo-music.vercel.app/",
    images: [
      {
        url: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "noi-that",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@twitterhandle",
    title: "Đào Tạo, Âm Nhạc | NEO MUSIC",
    description: "NEO MUSIC 🚩 Trường kiểu mẫu về đào tạo nền, ✅ Cam kết ra bài sau 3 buổi học, ✅ Lớp học riêng biệt cho các bộ môn, ✅ Người lớn có không gian riêng, ✅ Học thử & tập đàn miễn phí.",
    images: [
      {
        url: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "noi-that",
      },
    ],
  },
};