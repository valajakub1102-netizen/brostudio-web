/* ============================================================
   BROSTUDIO – seznam filmů a seriálů
   Nový projekt přidáš zkopírováním bloku níže. Objeví se sám
   na hlavní stránce i v kategoriích.
   Každé tlačítko = jedna položka v seznamu videos. src: null = zašedlé tlačítko.
   Hodnota videa může být:
     "yt:ID_VIDEA"        – přehraje se z YouTube (ID je za v= nebo za youtu.be/)
     "media/složka/x.mp4"  – přehraje se přímo z tvého serveru
   ============================================================ */
window.BRO_ITEMS = [
  {
    id: "do-temnoty",
    title: "Do Temnoty",
    category: "horror",
    type: "Film",
    poster: "pictures/dotemnoty.jpg",
    description: "Krátký příběh o klucích, které začne něco sledovat. Jejich obyčejný den se postupně mění v hororové sci-fi, ze kterého už není jednoduché uniknout.",
    cast: "Hrají: Jakub Vála, Teodor Skála",
    videos: [
      { label: "Teaser",    src: "yt:ErKXDF-y--Y" },
      { label: "Trailer 1", src: "yt:U_-BOGzZ_Qo" },
      { label: "Trailer 2", src: "yt:R8BC5kYHG40" },
      { label: "Film",      src: "yt:Ei5sxgv8Fvg" }   /* až bude venku: "yt:ID_VIDEA" */
    ]
  },
  {
    id: "zitneprezivat",
    title: "Žít ne přežívat",
    category: "drama",
    type: "Film",
    poster: "pictures/zitneprezivat.jpg",
    description: "Příběh o klukovi procházící životem a zjišťující rozdíl mezi žitím a přežíváním",
    cast: "Hrají: ",
    videos: [
      { label: "Teaser",    src: null },
      { label: "Trailer", src: null },
      { label: "Film", src: null }
    ]
  }
];

window.BRO_CATEGORIES = [
  { id: "horror", title: "Horrory" },
  { id: "drama", title: "Drama" },
  { id: "scifi",  title: "Sci-fi" }
];
