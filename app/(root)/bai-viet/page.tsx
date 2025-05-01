import SearchForm from "@/components/SearchForm";
import { PROJECT_DETAILS_BY_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import MarkupSchema from "@/components/shared/MarkupSchema";
import { Metadata } from "next/types";
import SimpleCard, { SimpleCardType } from "@/components/SimpleCard";
import { notFound } from "next/navigation";

export default async function Home({ searchParams }: {
  readonly searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  const { data: searchForProjects } = await sanityFetch({ query: PROJECT_DETAILS_BY_QUERY, params });

  console.log('searchForProjects', searchForProjects)
  if (!searchForProjects) return notFound();

  return (
    <>
      <MarkupSchema path={`bai-viet`} />

      <section className={"pink_container"}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>

        <p className={"sub-heading !max-w-3xl"}>
          Hãy Chọn Dự Án Mà Bạn Quan Tâm.
        </p>
        <SearchForm query={query} path="bai-viet" search="Dự Án"/>
      </section>
      <section className={"section_container justify-items-center"}>
        <p className={"text-30-semibold"}>
          {query ? `Tìm kiếm cho "${query}"` : 'Tất cả dự án'}
        </p>
        <ul className={"mt-7 card_grid"}>
          {searchForProjects?.length > 0 ? (
            searchForProjects.map((post: SimpleCardType) => (
              <SimpleCard key={post?._id} post={post} path="bai-viet" className='xs:w-full justify-items-center' />
            ))
          ) : (
            <p className={"no-result"}>
              Không tìm thấy dự án phù hợp
            </p>
          )}
        </ul>
      </section>
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