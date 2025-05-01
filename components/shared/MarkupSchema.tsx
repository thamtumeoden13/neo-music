import Head from "next/head";

export default function MarkupSchema({ path, post, }: { path: string, post?: any, }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post?.title || "Đào Tạo, Âm Nhạc Bình Dương | NEO MUSIC",
    "image": [
      post?.image || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      post?.thumbnail || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    "author": {
      "@type": "Person",
      "name": "Vũ Văn Vinh"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NEO Music - Gia Hòa - Q9",
      "logo": {
        "@type": "ImageObject",
        "url": post?.thumbnail || "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      }
    },
    "datePublished": "2024-12-01",
    "dateModified": "2024-12-08",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://neo-music.vercel.app/${path}`
    },
    "articleBody": post?.subtitle || "Đào Tạo, Âm Nhạc Bình Dương | NEO MUSIC",
    "description": post?.description || "NEO MUSIC 🚩 Trường kiểu mẫu về đào tạo nền, ✅ Cam kết ra bài sau 3 buổi học, ✅ Lớp học riêng biệt cho các bộ môn, ✅ Người lớn có không gian riêng, ✅ Học thử & tập đàn miễn phí"
  }

  return (
    <Head>
      <title>{post?.title || "Đào Tạo, Âm Nhạc Bình Dương | NEO MUSIC"}</title>
      <meta name="description" content={post?.description || "NEO MUSIC 🚩 Trường kiểu mẫu về đào tạo nền, ✅ Cam kết ra bài sau 3 buổi học, ✅ Lớp học riêng biệt cho các bộ môn, ✅ Người lớn có không gian riêng, ✅ Học thử & tập đàn miễn phí."} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </Head>
  );
}
