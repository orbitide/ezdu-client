"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Trophy, Globe, Briefcase, Zap } from "lucide-react"

const courseLinks = [
  { href: "/catalog?level=ssc",      icon: BookOpen,      label: "SSC কোর্স" },
  { href: "/catalog?level=hsc",      icon: GraduationCap, label: "HSC কোর্স" },
  { href: "/catalog?level=olympiad", icon: Trophy,        label: "অলিম্পিয়াড" },
  { href: "/catalog?level=ielts",    icon: Globe,         label: "IELTS প্রস্তুতি" },
  { href: "/catalog?level=job",      icon: Briefcase,     label: "জব প্রস্তুতি" },
  { href: "/catalog?level=skills",   icon: Zap,           label: "দক্ষতা উন্নয়ন" },
]

const companyLinks = [
  { href: "/about",    label: "সম্পর্কে" },
  { href: "/contact",  label: "যোগাযোগ" },
  { href: "/blog",     label: "ব্লগ" },
  { href: "/careers",  label: "ক্যারিয়ার" },
]

const studentLinks = [
  { href: "/login",    label: "লগইন" },
  { href: "/register", label: "রেজিস্ট্রেশন" },
  { href: "/faq",      label: "সাহায্য / FAQ" },
  { href: "/subscribe", label: "মূল্য তালিকা" },
]

const SocialFacebook = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const SocialYoutube = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" className="opacity-0 group-hover:opacity-20" />
  </svg>
)
const SocialInstagram = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const socialLinks = [
  { href: "https://facebook.com",  Icon: SocialFacebook,  label: "Facebook" },
  { href: "https://youtube.com",   Icon: SocialYoutube,   label: "YouTube" },
  { href: "https://instagram.com", Icon: SocialInstagram, label: "Instagram" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="border-t border-white/8"
      style={{ background: "#010609" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-white w-fit">
              <img src="/logo.svg" alt="Ezdu" className="h-8 w-8 rounded-xl" />
              <span className="text-lg tracking-tight">Ezdu</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
              বাংলাদেশের শিক্ষার্থীদের জন্য সেরা অনলাইন শিক্ষা প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/6 text-white/50 hover:bg-white/12 hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Courses column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">কোর্সসমূহ</h3>
            <ul className="flex flex-col gap-2.5">
              {courseLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">কোম্পানি</h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Students column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">শিক্ষার্থী</h3>
            <ul className="flex flex-col gap-2.5">
              {studentLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">© ২০২৫ Ezdu। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">গোপনীয়তা নীতি</Link>
            <Link href="/terms"   className="text-xs text-white/30 hover:text-white/60 transition-colors">ব্যবহারের শর্ত</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
