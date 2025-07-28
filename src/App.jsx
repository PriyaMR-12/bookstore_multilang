import { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import BookList from "./BookList";
import './i18n';
import { FaBars } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';


function App() {
const { t, i18n } = useTranslation();


  const [lang, setLang] = useState(i18n.language);
 const [cartMessage, setCartMessage] = useState('');
const [showModal, setShowModal] = useState(false);
const [modalBookTitle, setModalBookTitle] = useState('');
const [modalBookAuthor, setModalBookAuthor] = useState('');
const [modalBookPhoto, setModalBookPhoto] = useState(null);
const [editIdx, setEditIdx] = useState(null);
const [cart, setCart] = useState([]);
const [books, setBooks] = useState([]);
  const toggleMenu = () => setMenuOpen(!menuOpen);
const translatedBooks = t("books", { returnObjects: true }) || [];
const [storeBooks, setStoreBooks] = useState(translatedBooks);
const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-lang', lang);
  }, [lang]);

const handleLanguageChange = (e) => {
  const lang = e.target.value;
  setLang(lang);
  i18n.changeLanguage(lang);
};



useEffect(() => {
  setStoreBooks(t("books", { returnObjects: true }) || []);
}, [lang, t]);

const LanguageDropdown = (
  <select
    id="lang-select"
    onChange={handleLanguageChange}
    value={lang}
    className="p-2 rounded bg-blue-900 text-white border-none md:w-auto w-full"
  >
    <option value="en">🇺🇸 English</option>
    <option value="es">🇪🇸 Español</option>
    <option value="hi">🇮🇳 हिन्दी</option>
    <option value="kn">🇮🇳 ಕನ್ನಡ</option>
    <option value="de">🇩🇪 Deutsch</option>
    <option value="fr">🇫🇷 Français</option>
    <option value="te">🇮🇳 తెలుగు</option>
    <option value="ta">🇮🇳 தமிழ்</option>
  </select>
);


  // For demo: show current date and a sample number
  const now = new Date();
  const sampleNumber = 1234567.89;
  const formattedDate = new Intl.DateTimeFormat(lang, { dateStyle: 'full', timeStyle: 'short' }).format(now);
  const formattedNumber = new Intl.NumberFormat(lang).format(sampleNumber);

  // Top heading logic
  const [page, setPage] = useState(window.location.hash.replace('#', '') || 'main');
  let topHeading = null;
  if (page === 'cart') {
    topHeading = <h1 style={{ margin: 0, marginTop: '24px', marginBottom: '0', textAlign: 'center', fontSize: '2.2rem', fontWeight: 700 }}>{t('cart') || 'Cart'}</h1>;
  } else if (page === 'main' || !page) {
    topHeading = <p style={{ margin: 0, marginTop: '24px', marginBottom: '0', textAlign: 'center', fontSize: '2.2rem', fontWeight: 700 }}>{t('welcome')}</p>;
  }

  const handleAddBook = () => {
    setShowModal(true);
    setModalBookTitle("");
    setModalBookAuthor("");
    setModalBookPhoto(null);
    setEditIdx(null);
  };

  const handleModalSave = () => {
    if (modalBookTitle.trim() && modalBookAuthor.trim()) {
      const book = { title: modalBookTitle.trim(), author: modalBookAuthor.trim(), photo: modalBookPhoto };
      if (editIdx !== null) {
        setStoreBooks(storeBooks.map((b, idx) => idx === editIdx ? book : b));
      } else {
        setStoreBooks([...storeBooks, book]);
      }
      setShowModal(false);
      setModalBookTitle("");
      setModalBookAuthor("");
      setModalBookPhoto(null);
      setEditIdx(null);
    }
  };

const handleAddToCart = (book) => {
  if (!cart.find((item) => item.title === book.title)) {
    setCart([...cart, book]);
    setCartMessage(`${book.title} ${t("added_to_cart")}`);
  }
  setTimeout(() => setCartMessage(""), 2000);
};



  const handleRemoveFromCart = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  const handleBuyBook = (idx) => {
    // Simulate buying the book
    alert(`${t('boughtBook') || 'You bought'}: ${cart[idx].title}`);
    setCart(cart.filter((_, i) => i !== idx));
  };

  // Determine current page from hash
  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash.replace('#', '') || 'main');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Set navbar color based only on page (no language-based color)
  let navbarColor = '#181c25'; // default dark
   if (page === 'cart') navbarColor = '#f76b1c'; // orange for cart
  // Cart page
  const CartPage = () => (
    <>
      <a
        href="#main"
        className="nav-link"
        style={{ marginBottom: '24px', display: 'inline-block', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'underline', color: '#3498db', cursor: 'pointer' }}
        onClick={e => {
          e.preventDefault();
          window.location.hash = '';
        }}
      >
       ← {t('back') || 'Back'}
      </a>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.length === 0 ? <li style={{ background: 'none', boxShadow: 'none', border: 'none', color: '#fff', fontWeight: 500, fontSize: '1.1rem', padding: 0, margin: 0 }}>{t('noBooks') || 'No books in cart.'}</li> : null}
        {cart.map((book, idx) => (
          <li key={idx} style={{ background: '#fff', borderRadius: '14px', boxShadow: '0 4px 16px rgba(30,40,90,0.18)', border: '2px solid #f76b1c', padding: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            {book.photo ? <img src={book.photo} alt={book.title} style={{ width: '80px', height: '80px', objectFit: 'cover', background: 'none', border: 'none', borderRadius: '10px', marginRight: '16px' }} /> : <div style={{ width: '80px', height: '80px', background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b26a00', fontWeight: 600, borderRadius: '10px', marginRight: '16px' }}>{t('noPhoto') || 'No Photo'}</div>}
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', textAlign: 'left', display: 'block' }}>{book.title}</span>
              <span style={{ fontWeight: 500, fontSize: '1rem', color: '#555', textAlign: 'left', display: 'block' }}>{book.author}</span>
            </div>
            <button onClick={() => handleBuyBook(idx)} style={{ padding: '6px 14px', fontSize: '1rem', borderRadius: '6px', background: '#27ae60', color: '#fff', fontWeight: 600 }}>{t('buyBook') || 'Buy'}</button>
            <button onClick={() => handleRemoveFromCart(idx)} style={{ padding: '6px 14px', fontSize: '1rem', borderRadius: '6px', background: '#e74c3c', color: '#fff', fontWeight: 600 }}>{t('removeFromCart') || 'Remove'}</button>
          </li>
        ))}
      </ul>
      <div style={{ position: 'fixed', right: 24, bottom: 12, textAlign: 'right', background: 'none', boxShadow: 'none', border: 'none', zIndex: 10 }} className="floating-footer">
        <strong>{t('language')}:</strong> {lang.toUpperCase()}<br/>
        <strong>Date:</strong> {formattedDate}<br/>
        <strong>Number:</strong> {formattedNumber}
      </div>
    </>
  

  );

  return (
    <div>
      {topHeading}
<nav
  className="px-4 py-3 sticky top-0 z-50 text-white bg-black"
  style={{ background: navbarColor }}
>
  <div className="flex items-center justify-between">
    {/* Logo */}
    <h1 className="text-2xl font-bold text-black-200">BookStore</h1>
    <h3 onClick={'./'}>Back </h3>
    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center space-x-6">
      {/* Cart */}
      <span
        onClick={() => setPage("cart")}
        className="p-2 rounded bg-blue-900 text-black cursor-pointer"
      >
        🛒 {t('cart')} ({cart.length})
      </span>

      {/* Language Dropdown */}
      {LanguageDropdown}
    </div>


  </div>

 
</nav>



         
  {page === "cart" ? (
  <div className="p-4 max-w-screen-sm mx-auto">


    {cart.length === 0 ? (
      <p className="text-center text-black-500">{t('noItems')}</p>
    ) : (
      <ul className="space-y-4">
        {cart.map((book, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-md p-4 shadow-sm bg-white text-black"
          >
            <div>
              <p className="font-semibold">{book.name}</p>
              {book.author && <p className="text-sm text-gray-600">{book.author}</p>}
            </div>

            <button
              onClick={() => removeFromCart(index)}
              className="mt-2 sm:mt-0 sm:ml-4 px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
            >
              {t('remove')}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
) : (
    <BookList
    books={storeBooks}
    setBooks={setStoreBooks}
    onAddToCart={handleAddToCart}
    cartMessage={cartMessage}
    onAddBook={handleAddBook}
  />
)}


   <div
  className="fixed bottom-2 right-2 text-xs sm:text-sm md:text-base bg-white/90 text-black px-3 py-2 rounded-md shadow-lg z-10"
>

              <strong>{t('language')}:</strong> {lang.toUpperCase()}<br/>
              <strong>Date:</strong> {formattedDate}<br/>
              <strong>Number:</strong> {formattedNumber}
            </div>
    </div>

  

  );
}
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0c4a6e',
    color: 'white',
    padding: '10px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  langSwitcher: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  langLabel: {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'white',
  },
  langDropdown: {
    padding: '5px',
    borderRadius: '4px',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  navLink: {
    color: 'white',     
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  hamburger: {
    display: 'none',
    cursor: 'pointer',
  },
  navLinks: {
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#0c4a6e',
    padding: '10px',
    borderRadius: '8px',
  },
  dropdown: {
    padding: '5px',
    borderRadius: '4px',
  },
  cartButton: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App