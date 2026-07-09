"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";

const DEFAULT_SETTINGS: Record<string, string> = {
  companyName: "PristineClean",
  companyTagline: "Premium Cleaning Services",
  supportEmail: "hello@pristineclean.com",
  phone: "(555) 123-4567",
  address: "123 Luxury Lane, Suite 100, Beverly Hills, CA 90210",
  hours: "Mon - Sat: 7:00 AM - 8:00 PM",
  metaTitle: "PristineClean | Premium Cleaning Services",
  metaDescription: "Experience premium cleaning services for residential and commercial spaces.",
  facebook: "https://facebook.com/pristineclean",
  instagram: "https://instagram.com/pristineclean",
  twitter: "https://twitter.com/pristineclean",
  linkedin: "https://linkedin.com/company/pristineclean",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { getSiteSettings } = await import("@/actions/admin-crud");
        const data = await getSiteSettings();
        if (Object.keys(data).length > 0) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      } catch { /* use defaults */ }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const { bulkUpdateSiteSettings } = await import("@/actions/admin-crud");
      await bulkUpdateSiteSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  function set(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-900">Settings</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-emerald-600 font-medium animate-in fade-in">Saved!</span>}
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
            <Save size={16} className="mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="bg-white border-2 border-navy-100 p-6 space-y-8">
        {/* Company Info */}
        <section>
          <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 inline-block" />
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Company Name" value={settings.companyName} onChange={(v) => set("companyName", v)} />
            <Field label="Tagline" value={settings.companyTagline} onChange={(v) => set("companyTagline", v)} />
            <Field label="Support Email" type="email" value={settings.supportEmail} onChange={(v) => set("supportEmail", v)} />
            <Field label="Phone" value={settings.phone} onChange={(v) => set("phone", v)} />
            <Field label="Address" className="md:col-span-2" value={settings.address} onChange={(v) => set("address", v)} />
            <Field label="Business Hours" value={settings.hours} onChange={(v) => set("hours", v)} />
          </div>
        </section>

        <hr className="border-navy-100" />

        {/* SEO */}
        <section>
          <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 inline-block" />
            SEO Defaults
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Default Meta Title" className="md:col-span-2" value={settings.metaTitle} onChange={(v) => set("metaTitle", v)} />
            <Field label="Default Meta Description" className="md:col-span-2" textarea value={settings.metaDescription} onChange={(v) => set("metaDescription", v)} />
          </div>
        </section>

        <hr className="border-navy-100" />

        {/* Social Media */}
        <section>
          <h2 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 inline-block" />
            Social Media Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Facebook" value={settings.facebook} onChange={(v) => set("facebook", v)} />
            <Field label="Instagram" value={settings.instagram} onChange={(v) => set("instagram", v)} />
            <Field label="Twitter / X" value={settings.twitter} onChange={(v) => set("twitter", v)} />
            <Field label="LinkedIn" value={settings.linkedin} onChange={(v) => set("linkedin", v)} />
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", textarea = false, className = "" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean; className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-navy-900/80 block mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          className="w-full border-2 border-navy-200 bg-white px-4 py-3 text-navy-900 focus:border-blue-600 focus:outline-none resize-y"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="flex h-12 w-full border-2 border-navy-200 bg-white px-4 text-navy-900 focus:border-blue-600 focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
