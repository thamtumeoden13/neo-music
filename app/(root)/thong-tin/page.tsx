import React from 'react'
import Contact from "@/components/Contact";
import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { CONSTRUCTION_BY_SLUG_QUERY, PROJECTS_BY_CONSTRUCTION_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import MarkupSchema from '@/components/shared/MarkupSchema';
import { SimpleCardType } from '@/components/SimpleCard';
import ProjectDetailList from '@/components/ProjectDetailList';

export const experimental_ppr = true;

export default async function InfoPage({ searchParams }: Readonly<{
  searchParams: Promise<{ query?: string }>
}>) {

  const query = (await searchParams).query;

  const post = await client.fetch(CONSTRUCTION_BY_SLUG_QUERY, { 'slug': 'thong-tin' });

  if (!post) return notFound();

  const { data: searchForProjects } = await sanityFetch({ query: PROJECTS_BY_CONSTRUCTION_ID_QUERY, params: { id: post._id } });

  if (!searchForProjects) return notFound();

  return (
    <>
      <MarkupSchema path="thong-tin" />

      <section className={"pink_container md:!min-h-[18rem] !flex !mt-0 !md:my-0 !pb-4 !pt-16 "}>
        <h1 className={"heading"}>
          Kết Nối Với Chúng Tôi
        </h1>
      </section>

      <>
        {searchForProjects?.length > 0 && (
          searchForProjects.map((post: SimpleCardType) => (
            <ProjectDetailList key={post?._id} post={post} className="!px-0" />
          ))
        )}
      </>
      <section className={"pink_container !bg-white"}>
        <section className={"section_container mt-16  w-full md:w-[44rem]"}>
          <div className="mt-10">
            <Contact />
          </div>
        </section>
      </section>
    </>
  )
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