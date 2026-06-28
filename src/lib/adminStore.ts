import defaultCakes from "@/data/cakes.json";
import defaultTestimonials from "@/data/testimonials.json";
import defaultBlog from "@/data/blog.json";

// Types
export interface Cake {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
  flavors: string[];
  sizes: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  cake: string;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
}

// LocalStorage Keys
const CAKES_KEY = "admin_cakes";
const TESTIMONIALS_KEY = "admin_testimonials";
const BLOG_KEY = "admin_blog";

// Helpers
function load<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Cakes
export function getCakes(): Cake[] {
  return load<Cake>(CAKES_KEY, defaultCakes as Cake[]);
}

export function saveCakes(cakes: Cake[]): void {
  save(CAKES_KEY, cakes);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  return load<Testimonial>(TESTIMONIALS_KEY, defaultTestimonials as Testimonial[]);
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  save(TESTIMONIALS_KEY, testimonials);
}

// Blog
export function getBlogPosts(): BlogPost[] {
  return load<BlogPost>(BLOG_KEY, defaultBlog as BlogPost[]);
}

export function saveBlogPosts(posts: BlogPost[]): void {
  save(BLOG_KEY, posts);
}

// Slug generator
export function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
