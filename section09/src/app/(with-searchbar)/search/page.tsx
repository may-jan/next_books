import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" } // 한 번 검색이 된 페이지라면 빠르게 렌더링 할 수 있도록 캐싱
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// search 페이지를 위한 메타 데이터
// generateMetadata : 현재 페이지의 메타 데이터를 동적으로 생성하는 역할, Page가 전달받는 매개변수를 그대로 전달받을 수 있다
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `${q} : 한입북스 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q}의 검색 결과입니다`,
      images: ["/thumnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  // Suspense
  // key : 해당값이 변경될때마다 다시 로딩하도록 설정
  // fallback : 로딩 상태일때 대체할 UI
  return (
    <Suspense key={q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
