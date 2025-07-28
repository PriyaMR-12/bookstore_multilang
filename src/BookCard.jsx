// src/components/BookCard.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function BookCard({ book }) {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t(book.title)}</h3>
      <p>{t(book.author)}</p>
      <img src={book.photo} alt={t(book.title)} style={{ width: "150px" }} />
    </div>
  );
}
