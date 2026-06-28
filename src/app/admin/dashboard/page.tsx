"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Cake, MessageSquare, BookOpen,
  LogOut, Plus, Pencil, Trash2, X, Save, Check,
  Star, TrendingUp, Users, ShoppingBag, ChevronDown,
  ExternalLink, AlertTriangle
} from "lucide-react";
import {
  getCakes, saveCakes, getTestimonials, saveTestimonials,
  getBlogPosts, saveBlogPosts, toSlug,
  type Cake as CakeType, type Testimonial, type BlogPost
} from "@/lib/adminStore";

// ─── Navigation ───────────────────────────────────────────────────────────────
type Tab = "overview" | "cakes" | "testimonials" | "blog";

const navItems: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview",     label: "Overview",     icon: LayoutDashboard },
  { id: "cakes",        label: "Cakes",        icon: Cake },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "blog",         label: "Blog Posts",   icon: BookOpen },
];

// ─── Empty templates ───────────────────────────────────────────────────────────
const emptyCake = (): CakeType => ({
  id: Date.now().toString(),
  name: "", slug: "", category: "Birthday", price: 1000,
  description: "", image: "", tags: [], flavors: [], sizes: ["1kg"],
});

const emptyTestimonial = (): Testimonial => ({
  id: Date.now().toString(),
  name: "", rating: 5, review: "", cake: "", date: new Date().toISOString().split("T")[0],
});

const emptyBlogPost = (): BlogPost => ({
  slug: "", title: "", description: "", date: new Date().toISOString().split("T")[0],
  author: "Anah Cakes", readTime: "3 min read", content: "",
});

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [cakes, setCakes]               = useState<CakeType[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts]       = useState<BlogPost[]>([]);
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [toast, setToast]               = useState<string | null>(null);

  // Load from store on mount
  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") { router.replace("/admin"); return; }
    setCakes(getCakes());
    setTestimonials(getTestimonials());
    setBlogPosts(getBlogPosts());
  }, [router]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    router.replace("/admin");
  };

  // Cake CRUD
  const updateCakes = (updated: CakeType[]) => { setCakes(updated); saveCakes(updated); showToast("Cakes saved!"); };
  // Testimonial CRUD
  const updateTestimonials = (updated: Testimonial[]) => { setTestimonials(updated); saveTestimonials(updated); showToast("Testimonials saved!"); };
  // Blog CRUD
  const updateBlog = (updated: BlogPost[]) => { setBlogPosts(updated); saveBlogPosts(updated); showToast("Blog posts saved!"); };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 text-gray-100">

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-800 gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
            <Cake className="w-4 h-4 text-amber-400" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-serif text-sm font-bold text-amber-400 leading-none">Anah Cakes</p>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Admin</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-gray-600 hover:text-gray-300 transition-colors">
            <ChevronDown className={`w-4 h-4 transition-transform ${sidebarOpen ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === item.id
                    ? "bg-amber-500/15 text-amber-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-800 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>View Site</span>}
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6 justify-between shrink-0">
          <h2 className="font-serif text-xl font-bold text-white capitalize">
            {navItems.find((n) => n.id === tab)?.label}
          </h2>
          <div className="flex items-center gap-2 text-xs font-sans text-gray-500">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live Site Active
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {tab === "overview"     && <OverviewTab cakes={cakes} testimonials={testimonials} blogPosts={blogPosts} />}
          {tab === "cakes"        && <CakesTab cakes={cakes} onUpdate={updateCakes} />}
          {tab === "testimonials" && <TestimonialsTab testimonials={testimonials} onUpdate={updateTestimonials} />}
          {tab === "blog"         && <BlogTab posts={blogPosts} onUpdate={updateBlog} />}
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-emerald-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-xl text-sm font-semibold font-sans z-50"
          >
            <Check className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Overview Tab ──────────────────────────────────────────────────────────────
function OverviewTab({ cakes, testimonials, blogPosts }: { cakes: CakeType[]; testimonials: Testimonial[]; blogPosts: BlogPost[] }) {
  const stats = [
    { label: "Total Cakes", value: cakes.length, icon: ShoppingBag, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Testimonials", value: testimonials.length, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Blog Posts", value: blogPosts.length, icon: TrendingUp, color: "text-sky-400", bg: "bg-sky-500/10" },
    { label: "Avg. Rating", value: testimonials.length ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1) : "N/A", icon: Star, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-500 font-sans">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex gap-4 items-start">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-amber-300">Admin Content Mode</p>
          <p className="text-xs text-amber-400/70 leading-relaxed">
            Changes made here are saved locally in your browser&apos;s storage. To publish changes permanently to the live site, copy the updated JSON data and replace the files in <code className="bg-amber-500/10 px-1 rounded">src/data/</code>, then redeploy to Vercel.
          </p>
        </div>
      </div>

      {/* Recent Cakes Preview */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Recent Cakes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cakes.slice(0, 3).map((cake) => (
            <div key={cake.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              {cake.image && (
                <div className="relative h-36">
                  <Image src={cake.image} alt={cake.name} fill className="object-cover" sizes="300px" />
                </div>
              )}
              <div className="p-4">
                <p className="font-serif text-sm font-bold text-white">{cake.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">₹{cake.price} · {cake.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Cakes Tab ─────────────────────────────────────────────────────────────────
function CakesTab({ cakes, onUpdate }: { cakes: CakeType[]; onUpdate: (c: CakeType[]) => void }) {
  const [editing, setEditing] = useState<CakeType | null>(null);

  const openNew = () => setEditing(emptyCake());
  const openEdit = (c: CakeType) => setEditing({ ...c });

  const handleDelete = (id: string) => {
    if (confirm("Delete this cake?")) onUpdate(cakes.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (!editing) return;
    const slug = toSlug(editing.name);
    const updated = editing.id && cakes.find((c) => c.id === editing.id)
      ? cakes.map((c) => c.id === editing.id ? { ...editing, slug } : c)
      : [...cakes, { ...editing, id: Date.now().toString(), slug }];
    onUpdate(updated);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400 font-sans">{cakes.length} cakes in catalog</p>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
          <Plus className="w-3.5 h-3.5" /> Add Cake
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Image</th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Name</th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Category</th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Price</th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Tags</th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {cakes.map((cake) => (
              <tr key={cake.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-5 py-3">
                  {cake.image ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-700">
                      <Image src={cake.image} alt={cake.name} fill className="object-cover" sizes="48px" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                      <Cake className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-white">{cake.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">/catalog/{cake.slug}</p>
                </td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-md text-xs font-semibold">{cake.category}</span>
                </td>
                <td className="px-5 py-3 text-white font-bold">₹{cake.price}</td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {cake.tags.slice(0, 2).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded text-[10px]">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(cake)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(cake.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <Modal title={editing.id && cakes.find((c) => c.id === editing.id) ? "Edit Cake" : "New Cake"} onClose={() => setEditing(null)} onSave={handleSave}>
            <CakeForm data={editing} onChange={setEditing} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function CakeForm({ data, onChange }: { data: CakeType; onChange: (c: CakeType) => void }) {
  const set = (field: keyof CakeType, value: unknown) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-4">
      <FormRow label="Cake Name">
        <input className={inputCls} value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Golden Grace Wedding Cake" />
      </FormRow>
      <div className="grid grid-cols-2 gap-4">
        <FormRow label="Category">
          <select className={inputCls} value={data.category} onChange={(e) => set("category", e.target.value)}>
            {["Birthday", "Wedding", "Anniversary", "Cupcakes", "Theme"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </FormRow>
        <FormRow label="Base Price (₹)">
          <input type="number" className={inputCls} value={data.price} onChange={(e) => set("price", Number(e.target.value))} />
        </FormRow>
      </div>
      <FormRow label="Image URL">
        <input className={inputCls} value={data.image} onChange={(e) => set("image", e.target.value)} placeholder="https://... or /cake_wedding.jpg" />
      </FormRow>
      <FormRow label="Description">
        <textarea rows={3} className={inputCls} value={data.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the cake..." />
      </FormRow>
      <FormRow label="Tags (comma separated)">
        <input className={inputCls} value={data.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} placeholder="Best Seller, Eggless Option" />
      </FormRow>
      <FormRow label="Flavors (comma separated)">
        <input className={inputCls} value={data.flavors.join(", ")} onChange={(e) => set("flavors", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} placeholder="Chocolate, Vanilla, Red Velvet" />
      </FormRow>
      <FormRow label="Sizes (comma separated)">
        <input className={inputCls} value={data.sizes.join(", ")} onChange={(e) => set("sizes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} placeholder="1kg, 1.5kg, 2kg" />
      </FormRow>
    </div>
  );
}

// ─── Testimonials Tab ──────────────────────────────────────────────────────────
function TestimonialsTab({ testimonials, onUpdate }: { testimonials: Testimonial[]; onUpdate: (t: Testimonial[]) => void }) {
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Delete this testimonial?")) onUpdate(testimonials.filter((t) => t.id !== id));
  };

  const handleSave = () => {
    if (!editing) return;
    const updated = testimonials.find((t) => t.id === editing.id)
      ? testimonials.map((t) => t.id === editing.id ? editing : t)
      : [...testimonials, { ...editing, id: Date.now().toString() }];
    onUpdate(updated);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400 font-sans">{testimonials.length} reviews</p>
        <button onClick={() => setEditing(emptyTestimonial())} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
          <Plus className="w-3.5 h-3.5" /> Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t.cake}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing({ ...t })} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-700"}`} />
              ))}
            </div>
            <p className="text-sm text-gray-400 italic leading-relaxed line-clamp-3">&quot;{t.review}&quot;</p>
            <p className="text-[10px] text-gray-600">{t.date}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={testimonials.find((t) => t.id === editing.id) ? "Edit Review" : "New Review"} onClose={() => setEditing(null)} onSave={handleSave}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormRow label="Customer Name">
                  <input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                </FormRow>
                <FormRow label="Rating (1–5)">
                  <input type="number" min={1} max={5} className={inputCls} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} />
                </FormRow>
              </div>
              <FormRow label="Cake Ordered">
                <input className={inputCls} value={editing.cake} onChange={(e) => setEditing({ ...editing, cake: e.target.value })} />
              </FormRow>
              <FormRow label="Review Text">
                <textarea rows={4} className={inputCls} value={editing.review} onChange={(e) => setEditing({ ...editing, review: e.target.value })} />
              </FormRow>
              <FormRow label="Date">
                <input type="date" className={inputCls} value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
              </FormRow>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Blog Tab ──────────────────────────────────────────────────────────────────
function BlogTab({ posts, onUpdate }: { posts: BlogPost[]; onUpdate: (p: BlogPost[]) => void }) {
  const [editing, setEditing] = useState<BlogPost | null>(null);

  const handleDelete = (slug: string) => {
    if (confirm("Delete this post?")) onUpdate(posts.filter((p) => p.slug !== slug));
  };

  const handleSave = () => {
    if (!editing) return;
    const slug = toSlug(editing.title);
    const updated = posts.find((p) => p.slug === editing.slug)
      ? posts.map((p) => p.slug === editing.slug ? { ...editing, slug } : p)
      : [...posts, { ...editing, slug }];
    onUpdate(updated);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400 font-sans">{posts.length} posts</p>
        <button onClick={() => setEditing(emptyBlogPost())} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
          <Plus className="w-3.5 h-3.5" /> New Post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.slug} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{post.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">/blog/{post.slug} · {post.date} · {post.readTime}</p>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">{post.description}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => setEditing({ ...post })} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(post.slug)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={posts.find((p) => p.slug === editing.slug) ? "Edit Post" : "New Post"} onClose={() => setEditing(null)} onSave={handleSave}>
            <div className="space-y-4">
              <FormRow label="Title">
                <input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </FormRow>
              <div className="grid grid-cols-2 gap-4">
                <FormRow label="Date">
                  <input type="date" className={inputCls} value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
                </FormRow>
                <FormRow label="Read Time">
                  <input className={inputCls} value={editing.readTime} onChange={(e) => setEditing({ ...editing, readTime: e.target.value })} placeholder="5 min read" />
                </FormRow>
              </div>
              <FormRow label="Meta Description">
                <textarea rows={2} className={inputCls} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </FormRow>
              <FormRow label="Content (markdown-style)">
                <textarea rows={8} className={`${inputCls} font-mono text-xs`} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} placeholder="### Heading&#10;&#10;Your paragraph here..." />
              </FormRow>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Shared UI Components ──────────────────────────────────────────────────────
const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-500";

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold font-sans">{label}</label>
      {children}
    </div>
  );
}

function Modal({ title, children, onClose, onSave }: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
          <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-all">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {/* Modal Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-800 shrink-0">
          <button onClick={onClose} className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 transition-all">
            Cancel
          </button>
          <button onClick={onSave} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-gray-950 transition-all">
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
