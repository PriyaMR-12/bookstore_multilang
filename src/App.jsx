import { useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import BookList from "./BookList";
import './i18n';

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

const translatedBooks = t("books", { returnObjects: true }) || [];
const [storeBooks, setStoreBooks] = useState(translatedBooks);

  useEffect(() => {
    document.body.setAttribute('data-lang', lang);
  }, [lang]);

 // [{ title, author, photo }]
const handleLanguageChange = (e) => {
  const lang = e.target.value;
  setLang(lang); // ✅ FIXED
  i18n.changeLanguage(lang);
};


useEffect(() => {
  setStoreBooks(t("books", { returnObjects: true }) || []);
}, [lang, t]);



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
      <div style={{ position: 'fixed', right: 24, bottom: 12, textAlign: 'right', background: 'none', boxShadow: 'none', border: 'none', zIndex: 10 }}>
        <strong>{t('language')}:</strong> {lang.toUpperCase()}<br/>
        <strong>Date:</strong> {formattedDate}<br/>
        <strong>Number:</strong> {formattedNumber}
      </div>
    </>
  

  );

  return (
    <div>
      {topHeading}
      <nav className="navbar" style={{ background: navbarColor }}>
        <div
          className="navbar-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => { window.location.hash = ''; }}
        >
          {t('title')}
        </div>
        <div className="navbar-links">


         <a
            href="#cart"
            className="nav-link"
            onClick={e => {
              e.preventDefault();
              window.location.hash = 'cart';
            }}
          >{t('cart') || 'Cart'}</a>
          <div className="lang-switcher-ui" style={{ marginTop: 0 }}>
            <label htmlFor="lang-select" className="lang-label">
              🌐 {t('language')}:
            </label>
            <select
              id="lang-select"
              value={lang}
              onChange={e => {
                setLang(e.target.value);
                i18n.changeLanguage(e.target.value);
              }}
              className="lang-dropdown"
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
          </div>
        </div>
      </nav>
         
        {page === 'cart' ? <CartPage />
        : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              {storeBooks.length === 0 ? <li style={{ background: 'none', boxShadow: 'none', border: 'none', color: '#888', fontWeight: 500, fontSize: '1.1rem', padding: 0, margin: 0 }}>{t('noBooks') || 'No books available.'}</li> : null}
                     <BookList books={storeBooks} onAddToCart={handleAddToCart} />    
            </ul>
            {showModal && (
              <div className="modal-bg">
                <div className="modal">
                  <h2 style={{ color: '#f76b1c', marginBottom: 16 }}>{editIdx !== null ? t('editBook') : t('addBook')}</h2>
                  <input
                    type="text"
                    value={modalBookTitle}
                    onChange={e => setModalBookTitle(e.target.value)}
                    placeholder={t('addBook')}
                  />
                  <input
                    type="text"
                    value={modalBookAuthor}
                    onChange={e => setModalBookAuthor(e.target.value)}
                    placeholder={t('author') || 'Author'}
                    style={{ margin: '12px 0' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ margin: '12px 0' }}
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setModalBookPhoto(ev.target.result);
                        reader.readAsDataURL(file);
                      } else {
                        setModalBookPhoto(null);
                      }
                    }}
                  />
                  {modalBookPhoto && <img src={modalBookPhoto} alt="preview" style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px', background: 'none', border: 'none' }} />}
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button onClick={handleModalSave}>{t('editBook')}</button>
                    <button onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </div>
              </div>
            )}
            <div style={{ position: 'fixed', right: 24, bottom: 12, textAlign: 'right', background: 'none', boxShadow: 'none', border: 'none', zIndex: 10 }}>
              <strong>{t('language')}:</strong> {lang.toUpperCase()}<br/>
              <strong>Date:</strong> {formattedDate}<br/>
              <strong>Number:</strong> {formattedNumber}
            </div>
          </>

        )}

        


    </div>

  

  );
}

export default App