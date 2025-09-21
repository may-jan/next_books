import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

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
