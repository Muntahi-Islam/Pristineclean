import Link from "next/link";
import { SERVICES, NAV_ITEMS } from "@/lib/constants";
import { getPublicSettings } from "@/actions/site";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

export async function Footer() {
  const settings = await getPublicSettings();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: settings.instagram, label: "Instagram" },
    { href: settings.facebook, label: "Facebook" },
    { href: settings.linkedin, label: "LinkedIn" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-navy-900 text-warm-50">
      <div className="container-main section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold">
              <span className="font-serif text-2xl font-semibold">Tori&apos;s</span>
              <span className="text-navy-300"> Cleaning</span>
            </Link>
            <p className="text-sm leading-relaxed text-warm-300">
              Professional cleaning services for residential and commercial spaces in the Houston, TX area. Reliable, thorough, and tailored to your needs.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-warm-400 transition-colors hover:text-navy-300" aria-label={s.label}>
                    <ExternalLink size={20} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-warm-400 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-warm-300 transition-colors hover:text-navy-300">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-warm-400 mb-6">Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-warm-300 transition-colors hover:text-navy-300">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-warm-400 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-navy-300" />
                <a href={`tel:${settings.phone}`} className="text-sm text-warm-300 transition-colors hover:text-navy-300">{settings.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-navy-300" />
                <a href={`mailto:${settings.supportEmail}`} className="text-sm text-warm-300 transition-colors hover:text-navy-300">{settings.supportEmail}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-navy-300" />
                <span className="text-sm text-warm-300">{settings.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-navy-300" />
                <span className="text-sm text-warm-300">{settings.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-500">
          <p>&copy; {currentYear} {settings.companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-navy-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-navy-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
