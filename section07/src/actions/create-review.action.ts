"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    revalidatePath(`/book/${bookId}`);
    // revalidatePath - 넥스트 서버측에서 해당 경로를 자동으로 재생성 해줄 것을 요청
    // *주의* 서버측에서만 호출 가능, 해당 페이지와 관련된 모든 데이터 캐시와 풀라우트 캐시가 무효화 된다
  } catch (err) {
    console.error(err);
    return;
  }
}
