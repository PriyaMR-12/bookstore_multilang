// BookList.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import harrypotter from "./assets/harrypotter.png";
import percyjackson from "./assets/percyjackson.png";
import inheritance from "./assets/inheritance.png";
import powerless from "./assets/powerless.png";
import twisted from "./assets/twisted.png";
import youcanwin from "./assets/youcanwin.png";
import richdad from "./assets/richdad.png";
import psychologyOfMoney from "./assets/bigmagic.png";
import theoryofeverything from "./assets/theoryofeverything.png";
import ikigai from "./assets/ikigai.png";

const books = [
  { key: "harryPotter", image: harrypotter },
  { key: "percyJackson", image: percyjackson },
  { key: "inheritanceGames", image: inheritance },
  { key: "powerless", image: powerless },
  { key: "twisted", image: twisted },
  { key: "youCanWin", image: youcanwin },
  { key: "richDadPoorDad", image: richdad },
  { key: "psychologyOfMoney", image: psychologyOfMoney },
  { key: "theoryOfEverything", image: theoryofeverything },
  { key: "ikigai", image: ikigai }
];

const BookList = ({ onAddToCart }) => {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {books.map((book, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "10px",
            width: "180px",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src={book.image}
            alt={t(`books.${book.key}.title`)}
            style={{ width: "120px", height: "160px", objectFit: "cover", marginBottom: "10px" }}
          />
           <h3>{t(`books.${book.key}.title`)}</h3>
<p>{t(`books.${book.key}.author`)}</p>
          <button onClick={() => onAddToCart({ title: t(`books.${book.key}.title`), author: t(`books.${book.key}.author`), photo: book.image })}>
            {t("addToCart")}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
