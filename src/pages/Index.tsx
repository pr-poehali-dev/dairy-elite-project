import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b3039413-5683-47f1-adab-7a1e8f2891cb/files/22d6ef62-b7db-4571-a40a-fb472f3de75e.jpg";
const PRODUCT_IMAGE = "https://cdn.poehali.dev/projects/b3039413-5683-47f1-adab-7a1e8f2891cb/files/7d97260b-275f-4963-9d66-2589b739596a.jpg";

const products = [
  {
    name: "Цельное молоко",
    desc: "Пастеризованное молоко с зелёных пастбищ, богатое натуральными витаминами",
    weight: "1 л",
    tag: "Хит продаж",
  },
  {
    name: "Фермерский творог",
    desc: "Нежный творог без добавок — только молоко и любовь к делу",
    weight: "400 г",
    tag: "Натуральный",
  },
  {
    name: "Сливочное масло",
    desc: "Масло ручного производства из сливок высшего сорта",
    weight: "200 г",
    tag: "Премиум",
  },
  {
    name: "Кефир живой",
    desc: "Живые кисломолочные культуры для здоровья всей семьи",
    weight: "500 мл",
    tag: "Для здоровья",
  },
];

const values = [
  { icon: "Leaf", title: "Экологичность", text: "Без антибиотиков, гормонов и химических добавок — только природная чистота" },
  { icon: "Droplets", title: "Чистая вода", text: "Наши животные пьют воду из горных источников, что отражается на качестве продуктов" },
  { icon: "Heart", title: "Забота о природе", text: "Мы сохраняем биоразнообразие пастбищ и минимизируем углеродный след" },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px bg-gradient-to-r from-transparent to-gold-400 w-16" />
      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
      <div className="h-px bg-gradient-to-l from-transparent to-gold-400 w-16" />
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef as React.RefObject<Element>);
  const productsInView = useInView(productsRef as React.RefObject<Element>);
  const contactInView = useInView(contactRef as React.RefObject<Element>);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О компании" },
    { id: "products", label: "Продукция" },
    { id: "contact", label: "Контакты" },
  ];

  return (
    <div className="bg-[#0d110e] text-cream font-montserrat overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(13,17,14,0.95) 0%, transparent 100%)" }}>
        <div className="font-cormorant text-xl text-gold-300 tracking-widest uppercase">
          Луга Целинного
        </div>
        <ul className="hidden md:flex gap-8">
          {navLinks.map(l => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className={`font-montserrat text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${activeSection === l.id ? "text-gold-400" : "text-[#faf7f0]/60 hover:text-gold-300"}`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-gold-400" onClick={() => setMenuOpen(v => !v)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0d110e]/98 flex flex-col items-center justify-center gap-8">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="font-cormorant text-3xl text-gold-300 tracking-widest uppercase">
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Луга Целинного" className="w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, #0d110e 0%, rgba(13,17,14,0.5) 50%, rgba(13,17,14,0.2) 100%)"
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 w-full">
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold-400 mb-6 opacity-0 animate-fade-up">
            Природа · Чистота · Качество
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-[1.05] text-[#faf7f0] mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}>
            Луга<br />
            <em className="text-gold-300 not-italic">Целинного</em>
          </h1>
          <div className="flex items-center gap-4 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="h-px bg-gold-500 w-12" />
            <p className="font-montserrat text-sm text-[#faf7f0]/70 tracking-wider max-w-xs">
              Премиум молочные продукты с экологически чистых лугов Курганской области
            </p>
          </div>
          <button
            onClick={() => scrollTo("products")}
            className="opacity-0 animate-fade-up border border-gold-500 text-gold-300 font-montserrat text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-gold-500/10 transition-all duration-500"
            style={{ animationDelay: "0.4s" }}
          >
            Наша продукция
          </button>
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gold-400 animate-pulse" />
          <span className="font-montserrat text-[10px] tracking-widest uppercase text-gold-400 rotate-90 origin-center mt-4">Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef} className="py-32 px-8">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold-400 mb-5">О компании</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#faf7f0] leading-tight mb-8">
                Рождено<br />
                <em className="text-gold-300 not-italic">природой</em>
              </h2>
              <GoldDivider />
              <p className="font-montserrat text-sm text-[#faf7f0]/65 leading-relaxed mb-6">
                Более 20 лет мы выращиваем животных на экологически чистых лугах Курганской области. Чистый воздух, родниковая вода и сочная трава зауральских степей — основа исключительного вкуса наших продуктов.
              </p>
              <p className="font-montserrat text-sm text-[#faf7f0]/65 leading-relaxed">
                Каждый продукт проходит строгий контроль качества. Мы верим, что подлинное богатство — это здоровье, которое дарит нетронутая природа.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border border-gold-700/30" />
              <img src={PRODUCT_IMAGE} alt="Продукция" className="w-full object-cover relative z-10 grayscale-[20%]" style={{ aspectRatio: "4/3" }} />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0d110e] to-transparent z-20" />
              <div className="absolute -bottom-6 -right-6 z-30 bg-[#131a14] border border-gold-700/40 px-8 py-5">
                <p className="font-cormorant text-4xl text-gold-300">20+</p>
                <p className="font-montserrat text-[10px] tracking-widest uppercase text-[#faf7f0]/50 mt-1">лет на рынке</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24">
            {values.map((v, i) => (
              <div key={i} className="border-t border-gold-700/30 pt-8">
                <div className="w-10 h-10 flex items-center justify-center border border-gold-600/40 mb-5">
                  <Icon name={v.icon} size={18} className="text-gold-400" />
                </div>
                <h3 className="font-cormorant text-2xl text-[#faf7f0] mb-3">{v.title}</h3>
                <p className="font-montserrat text-xs text-[#faf7f0]/55 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" ref={productsRef} className="py-32 px-8 bg-[#0a0e0b]">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${productsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">Ассортимент</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#faf7f0]">
              Наша <em className="text-gold-300 not-italic">продукция</em>
            </h2>
            <GoldDivider />
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-gold-700/20">
            {products.map((p, i) => (
              <div key={i} className="bg-[#0a0e0b] p-10 group hover:bg-[#0f1510] transition-colors duration-500">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-montserrat text-[10px] tracking-[0.25em] uppercase text-gold-500 border border-gold-700/40 px-3 py-1">
                    {p.tag}
                  </span>
                  <span className="font-cormorant text-3xl text-gold-600/40 group-hover:text-gold-500/60 transition-colors">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-cormorant text-3xl text-[#faf7f0] mb-3 group-hover:text-gold-200 transition-colors">{p.name}</h3>
                <p className="font-montserrat text-xs text-[#faf7f0]/55 leading-relaxed mb-6">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-montserrat text-xs text-[#faf7f0]/40">{p.weight}</span>
                  <div className="flex items-center gap-2 text-gold-500 group-hover:text-gold-300 transition-colors">
                    <span className="font-montserrat text-[10px] tracking-widest uppercase">Подробнее</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef} className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #c8941a 0%, transparent 60%)" }} />

        <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-montserrat text-xs tracking-[0.35em] uppercase text-gold-400 mb-4">Связаться с нами</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-[#faf7f0] mb-4">
            Будем рады <em className="text-gold-300 not-italic">сотрудничеству</em>
          </h2>
          <GoldDivider />
          <p className="font-montserrat text-sm text-[#faf7f0]/60 mb-16 max-w-md mx-auto">
            Оставьте заявку на поставку или задайте любой вопрос — ответим в течение одного рабочего дня
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: "Phone", label: "Телефон", val: "+7 (800) 000-00-00" },
              { icon: "Mail", label: "Email", val: "info@zelenye.ru" },
              { icon: "MapPin", label: "Адрес", val: "Краснодарский край, ст. Зеленогорская" },
            ].map((c, i) => (
              <div key={i} className="border border-gold-700/25 p-8 hover:border-gold-600/50 transition-colors duration-300">
                <Icon name={c.icon} size={20} className="text-gold-400 mx-auto mb-4" />
                <p className="font-montserrat text-[10px] tracking-widest uppercase text-[#faf7f0]/40 mb-2">{c.label}</p>
                <p className="font-montserrat text-sm text-[#faf7f0]/80">{c.val}</p>
              </div>
            ))}
          </div>

          <div className="border border-gold-700/25 p-10 text-left">
            <h3 className="font-cormorant text-3xl text-gold-300 mb-8">Отправить сообщение</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="font-montserrat text-[10px] tracking-widest uppercase text-[#faf7f0]/40 mb-2 block">Ваше имя</label>
                <input type="text" placeholder="Иван Петров"
                  className="w-full bg-transparent border border-gold-700/30 px-4 py-3 font-montserrat text-sm text-[#faf7f0] placeholder-[#faf7f0]/25 focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
              <div>
                <label className="font-montserrat text-[10px] tracking-widest uppercase text-[#faf7f0]/40 mb-2 block">Телефон / Email</label>
                <input type="text" placeholder="+7 или email@example.com"
                  className="w-full bg-transparent border border-gold-700/30 px-4 py-3 font-montserrat text-sm text-[#faf7f0] placeholder-[#faf7f0]/25 focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
            </div>
            <div className="mb-8">
              <label className="font-montserrat text-[10px] tracking-widest uppercase text-[#faf7f0]/40 mb-2 block">Сообщение</label>
              <textarea rows={4} placeholder="Расскажите о ваших потребностях..."
                className="w-full bg-transparent border border-gold-700/30 px-4 py-3 font-montserrat text-sm text-[#faf7f0] placeholder-[#faf7f0]/25 focus:outline-none focus:border-gold-500 transition-colors resize-none" />
            </div>
            <button className="w-full md:w-auto border border-gold-500 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 font-montserrat text-xs tracking-[0.25em] uppercase px-12 py-4 transition-all duration-500">
              Отправить заявку
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-700/20 py-10 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cormorant text-lg text-gold-500 tracking-widest uppercase">Луга Целинного</p>
          <p className="font-montserrat text-[10px] tracking-wider text-[#faf7f0]/30 uppercase">
            © 2024 · Все права защищены
          </p>
          <div className="flex gap-6">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="font-montserrat text-[10px] tracking-widest uppercase text-[#faf7f0]/30 hover:text-gold-400 transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}