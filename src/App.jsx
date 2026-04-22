import { useEffect, useMemo, useState } from 'react'
import {
  Lock,
  MessageCircle,
  Plus,
  ShoppingCart,
  Trash2,
  UserRoundPlus,
  WalletCards,
} from 'lucide-react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const categories = [
  'Natural Detergents & Soaps',
  'Cleaning Cloths',
  'Skin Cleansing Products',
  'Perfumes & Bags',
]

const egyptGovernorates = [
  'Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Red Sea', 'Beheira', 'Fayoum', 'Gharbia',
  'Ismailia', 'Menofia', 'Minya', 'Qalyubia', 'New Valley', 'Suez', 'Aswan', 'Assiut',
  'Beni Suef', 'Port Said', 'Damietta', 'Sharkia', 'South Sinai', 'Kafr El Sheikh', 'Matrouh',
  'Luxor', 'Qena', 'North Sinai', 'Sohag',
]

const sliderImages = ['/images/slide-1.png', '/images/slide-2.png', '/images/slide-3.png']

const defaultProducts = [
  { id: crypto.randomUUID(), name: 'Lavender Natural Soap', category: categories[0], price: 95, description: 'Handmade soap with olive oil and lavender.', image: '/images/p1.png' },
  { id: crypto.randomUUID(), name: 'Eco Lemon Dish Soap', category: categories[0], price: 120, description: 'Powerful natural dish cleaner with fresh lemon scent.', image: '/images/p2.png' },
  { id: crypto.randomUUID(), name: 'Microfiber Duo Cloth', category: categories[1], price: 180, description: 'Soft, high-absorption cloths for daily cleaning.', image: '/images/p3.png' },
  { id: crypto.randomUUID(), name: 'Bamboo Kitchen Cloth', category: categories[1], price: 140, description: 'Reusable cloth made from durable bamboo fibers.', image: '/images/p4.png' },
  { id: crypto.randomUUID(), name: 'Rose Face Cleanser', category: categories[2], price: 210, description: 'Gentle cleanser for bright and hydrated skin.', image: '/images/p5.png' },
  { id: crypto.randomUUID(), name: 'Herbal Clay Mask', category: categories[2], price: 230, description: 'Deep cleansing mask with green clay and herbs.', image: '/images/p6.png' },
  { id: crypto.randomUUID(), name: 'Floral Breeze Perfume', category: categories[3], price: 320, description: 'Long-lasting perfume with elegant floral notes.', image: '/images/p7.png' },
  { id: crypto.randomUUID(), name: 'Canvas Shopping Bag', category: categories[3], price: 195, description: 'Stylish eco bag for everyday use.', image: '/images/p8.png' },
]

const getLocal = (k, f) => {
  const value = localStorage.getItem(k)
  return value ? JSON.parse(value) : f
}

function App() {
  const [products, setProducts] = useState(() => getLocal('passant_products', defaultProducts))
  const [cart, setCart] = useState(() => getLocal('passant_cart', []))
  const [orders, setOrders] = useState(() => getLocal('passant_orders', []))
  const [teamForms, setTeamForms] = useState(() => getLocal('passant_team_forms', []))
  const [admin, setAdmin] = useState(() => sessionStorage.getItem('passant_admin') === '1')

  useEffect(() => localStorage.setItem('passant_products', JSON.stringify(products)), [products])
  useEffect(() => localStorage.setItem('passant_cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('passant_orders', JSON.stringify(orders)), [orders])
  useEffect(() => localStorage.setItem('passant_team_forms', JSON.stringify(teamForms)), [teamForms])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    products,
    setProducts,
    cart,
    setCart,
    orders,
    setOrders,
    teamForms,
    setTeamForms,
    admin,
    setAdmin,
    totalItems,
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-[#f7fbf5] text-[#1d3b21]">
      <Layout totalItems={totalItems}>
        <Routes>
          <Route path="/" element={<HomePage state={value} />} />
          <Route path="/join-team" element={<JoinTeamPage state={value} />} />
          <Route path="/cart" element={<CartPage state={value} />} />
          <Route path="/checkout" element={<CheckoutPage state={value} />} />
          <Route path="/admin-cp" element={<AdminCP state={value} />} />
        </Routes>
      </Layout>
    </div>
  )
}

function Layout({ children, totalItems }) {
  const location = useLocation()
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-green-100 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-green-800">Passant Ecoway</Link>
          <nav className="flex items-center gap-4 text-sm font-semibold text-green-700">
            <Link to="/">Home</Link>
            <Link to="/join-team">Join Team</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && <span className="absolute -right-3 -top-2 rounded-full bg-red-500 px-1.5 text-xs text-white">{totalItems}</span>}
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-5">{children}</main>
      {location.pathname !== '/admin-cp' && <FloatingWhatsapp />}
    </>
  )
}

function HomePage({ state }) {
  const [idx, setIdx] = useState(0)
  const { products, cart, setCart } = state

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % sliderImages.length), 3200)
    return () => clearInterval(t)
  }, [])

  const byCategory = useMemo(() => categories.map((cat) => ({
    category: cat,
    products: products.filter((p) => p.category === cat),
  })), [products])

  const addToCart = (product) => {
    const inCart = cart.find((item) => item.id === product.id)
    if (inCart) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      return
    }
    setCart([...cart, { ...product, quantity: 1 }])
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-green-100 p-2 shadow-sm">
        <img src={sliderImages[idx]} alt="Passant Ecoway banner" className="h-64 w-full rounded-2xl object-cover md:h-80" />
      </section>
      {byCategory.map((section) => (
        <section key={section.category} className="space-y-4">
          <h2 className="text-2xl font-black text-green-800">{section.category}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {section.products.map((product) => (
              <article key={product.id} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-green-100">
                <img src={product.image} alt={product.name} className="h-48 w-full rounded-xl object-cover" />
                <h3 className="mt-3 text-xl font-bold">{product.name}</h3>
                <p className="text-sm text-green-900/70">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-green-700">{product.price} EGP</span>
                  <button onClick={() => addToCart(product)} className="rounded-xl bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-800">Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <Link
        to="/join-team"
        className="group flex items-center justify-center gap-3 rounded-2xl bg-green-700 px-6 py-4 text-xl font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <UserRoundPlus className="h-6 w-6 transition group-hover:scale-110" />
        Join the Team
      </Link>
    </div>
  )
}

function JoinTeamPage({ state }) {
  const { setTeamForms } = state
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', phone: '', age: '', governorate: '', skills: '' })
  const submit = (e) => {
    e.preventDefault()
    setTeamForms((prev) => [...prev, { ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() }])
    navigate('/')
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-xl space-y-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-green-100">
      <h1 className="text-3xl font-black text-green-800">Join Passant Team</h1>
      <Input label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
      <Input label="Phone Number (Active WhatsApp)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
      <Input label="Age" value={form.age} onChange={(v) => setForm({ ...form, age: v })} required />
      <Input label="Governorate" value={form.governorate} onChange={(v) => setForm({ ...form, governorate: v })} required />
      <label className="block">
        <span className="mb-1 block font-semibold">Tell us about your strengths and skills</span>
        <textarea required value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="h-28 w-full rounded-xl border border-green-200 px-3 py-2 outline-none focus:border-green-500" />
      </label>
      <button className="w-full rounded-xl bg-green-700 py-3 font-bold text-white">Submit Registration</button>
    </form>
  )
}

function CartPage({ state }) {
  const { cart, setCart } = state
  const navigate = useNavigate()
  const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const updateQty = (id, delta) => {
    setCart(cart
      .map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
      .filter((item) => item.quantity > 0))
  }
  const remove = (id) => setCart(cart.filter((item) => item.id !== id))

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-black text-green-800">Shopping Cart</h1>
      {cart.length === 0 ? <p className="rounded-xl bg-white p-4">Your cart is empty.</p> : cart.map((item) => (
        <article key={item.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-green-100">
          <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
          <div className="flex-1">
            <h3 className="font-bold">{item.name}</h3>
            <p className="font-extrabold text-green-700">{item.price} EGP</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => updateQty(item.id, -1)} className="rounded-lg border px-2">-</button>
            <span className="w-7 text-center">{item.quantity}</span>
            <button onClick={() => updateQty(item.id, 1)} className="rounded-lg border px-2">+</button>
          </div>
          <button onClick={() => remove(item.id)} className="text-red-500"><Trash2 className="h-5 w-5" /></button>
        </article>
      ))}
      <div className="flex items-center justify-between rounded-2xl bg-white p-4 text-xl font-extrabold">
        <span>Total</span>
        <span>{sum} EGP</span>
      </div>
      <button disabled={cart.length === 0} onClick={() => navigate('/checkout')} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 py-3 font-bold text-white disabled:opacity-50">
        <WalletCards className="h-5 w-5" />
        Complete Order
      </button>
    </section>
  )
}

function CheckoutPage({ state }) {
  const { cart, setCart, orders, setOrders } = state
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', mobile: '', altMobile: '', governorate: '', address: '', notes: '' })
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const order = { id: crypto.randomUUID(), form, items: cart, total: cart.reduce((s, i) => s + i.price * i.quantity, 0), createdAt: new Date().toISOString() }
    setOrders([...orders, order])

    const scriptUrl = localStorage.getItem('passant_google_sheet_url')
    if (scriptUrl) {
      setSending(true)
      try {
        await fetch(scriptUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify(order), headers: { 'Content-Type': 'application/json' } })
      } catch {
        // The order is always stored locally even if sheets integration fails.
      } finally {
        setSending(false)
      }
    }
    setCart([])
    navigate('/')
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl space-y-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-green-100">
      <h1 className="text-3xl font-black text-green-800">Checkout</h1>
      <Input label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
      <Input label="Mobile Number" required value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} />
      <Input label="Alternative Mobile Number" value={form.altMobile} onChange={(v) => setForm({ ...form, altMobile: v })} />
      <label className="block">
        <span className="mb-1 block font-semibold">Governorate</span>
        <select required value={form.governorate} onChange={(e) => setForm({ ...form, governorate: e.target.value })} className="w-full rounded-xl border border-green-200 px-3 py-2 outline-none focus:border-green-500">
          <option value="">Select governorate</option>
          {egyptGovernorates.map((gov) => <option key={gov} value={gov}>{gov}</option>)}
        </select>
      </label>
      <Input label="Address Details" required value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
      <label className="block">
        <span className="mb-1 block font-semibold">Notes</span>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="h-24 w-full rounded-xl border border-green-200 px-3 py-2 outline-none focus:border-green-500" />
      </label>
      <button disabled={sending || cart.length === 0} className="w-full rounded-xl bg-green-700 py-3 font-bold text-white disabled:opacity-50">
        {sending ? 'Saving...' : 'Place Order'}
      </button>
    </form>
  )
}

function AdminCP({ state }) {
  const { admin, setAdmin, products, setProducts, orders, teamForms } = state
  const [pass, setPass] = useState('')
  const [entry, setEntry] = useState({ name: '', category: categories[0], price: '', description: '', image: '/images/p1.png' })
  const [sheetUrl, setSheetUrl] = useState(() => localStorage.getItem('passant_google_sheet_url') ?? '')

  if (!admin) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-5 shadow-sm ring-1 ring-green-100">
        <h1 className="mb-3 text-3xl font-black text-green-800">Admin Control Panel</h1>
        <p className="mb-3 text-sm text-green-800/80">Enter password to continue.</p>
        <Input label="Password" type="password" value={pass} onChange={setPass} />
        <button
          onClick={() => {
            if (pass === '9607330') {
              sessionStorage.setItem('passant_admin', '1')
              setAdmin(true)
            }
          }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3 font-bold text-white"
        >
          <Lock className="h-4 w-4" /> Login
        </button>
      </div>
    )
  }

  const saveProduct = (e) => {
    e.preventDefault()
    setProducts((prev) => [...prev, { ...entry, id: crypto.randomUUID(), price: Number(entry.price) || 0 }])
    setEntry({ name: '', category: categories[0], price: '', description: '', image: '/images/p1.png' })
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-green-100 p-4">
        <h1 className="text-3xl font-black text-green-800">Admin Dashboard</h1>
        <p className="text-sm">Products: {products.length} | Orders: {orders.length} | Team forms: {teamForms.length}</p>
      </div>
      <form onSubmit={saveProduct} className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-green-100">
        <h2 className="text-2xl font-black text-green-800">Add Product</h2>
        <Input label="Product Name" required value={entry.name} onChange={(v) => setEntry({ ...entry, name: v })} />
        <label className="block">
          <span className="mb-1 block font-semibold">Category</span>
          <select value={entry.category} onChange={(e) => setEntry({ ...entry, category: e.target.value })} className="w-full rounded-xl border border-green-200 px-3 py-2">
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </label>
        <Input label="Price" required value={entry.price} onChange={(v) => setEntry({ ...entry, price: v })} />
        <Input label="Image URL" value={entry.image} onChange={(v) => setEntry({ ...entry, image: v })} />
        <label className="block">
          <span className="mb-1 block font-semibold">Description</span>
          <textarea required value={entry.description} onChange={(e) => setEntry({ ...entry, description: e.target.value })} className="h-20 w-full rounded-xl border border-green-200 px-3 py-2" />
        </label>
        <button className="flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 font-bold text-white"><Plus className="h-4 w-4" /> Add Product</button>
      </form>
      <section className="space-y-2 rounded-2xl bg-white p-4 ring-1 ring-green-100">
        <h2 className="text-2xl font-black text-green-800">Manage Products</h2>
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-xl border border-green-100 px-3 py-2">
            <div><p className="font-bold">{p.name}</p><p className="text-sm text-green-800/70">{p.category} | {p.price} EGP</p></div>
            <button onClick={() => setProducts(products.filter((x) => x.id !== p.id))} className="text-red-500"><Trash2 className="h-5 w-5" /></button>
          </div>
        ))}
      </section>
      <section className="rounded-2xl bg-white p-4 ring-1 ring-green-100">
        <h2 className="mb-2 text-2xl font-black text-green-800">Google Sheets Webhook</h2>
        <Input label="Apps Script URL" value={sheetUrl} onChange={setSheetUrl} />
        <button onClick={() => localStorage.setItem('passant_google_sheet_url', sheetUrl)} className="rounded-xl bg-green-700 px-4 py-2 font-bold text-white">Save URL</button>
      </section>
      <button onClick={() => { sessionStorage.removeItem('passant_admin'); setAdmin(false) }} className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white">Logout</button>
    </div>
  )
}

function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/201157563840"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 rounded-full bg-[#25D366] p-4 text-white shadow-xl transition hover:scale-105"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}

function Input({ label, value, onChange, type = 'text', required = false }) {
  return (
    <label className="block">
      <span className="mb-1 block font-semibold">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-green-200 px-3 py-2 outline-none focus:border-green-500"
      />
    </label>
  )
}

export default App
