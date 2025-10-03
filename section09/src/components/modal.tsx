"use client";
import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);
  // Modal 컴포넌트가 화면에 마운트 된 순간
  // Modal이 화면에 보여지도록 + 스크롤 위치가 최상단이 되도록 설정

  return createPortal(
    <dialog
      onClose={() => {
        // 모달이 꺼지면 (ESC) 뒤로가기 발생
        router.back();
      }}
      onClick={(e) => {
        // 모달의 배경이 클릭되면 뒤로가기 발생
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}

// createPortal을 통해서 브라우저에서 아이디가 'modal-root'인 DOM요소 아래에 고정적으로 dialog 태그가 렌더링 된다
