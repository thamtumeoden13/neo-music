import SearchForm from "@/components/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import ProjectDetailList from "@/components/ProjectDetailList";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import { PROJECTS_BY_QUERY } from "@/sanity/lib/queries";
import { SimpleCardType } from "@/components/SimpleCard";
import { notFound } from "next/navigation";

async function Page({ searchParams }: Readonly<{
  searchParams: Promise<{ query?: string }>
}>) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  console.log(`params -> ${JSON.stringify(params)}`);

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_QUERY, params });

  if (!searchForProjects) return notFound();

  return (
    <>
      <MarkupSchema path={`du-an`} />

      <section className={"pink_container"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Dự Án Mà Bạn Quan Tâm.
        </p>
        <SearchForm query={query} path="du-an" search="Dự Án" />
      </section>

      {searchForProjects?.length > 0 ? (
        searchForProjects.map((post: SimpleCardType) => (
          <ProjectDetailList key={post?._id} post={post} />
        ))
      ) : (
        <section className={"section_container"}>
          <p className={"no-result"}>
            Không tìm thấy dự án
          </p>
        </section>
      )}

      <SanityLive />
    </>
  );
}

export default Page

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