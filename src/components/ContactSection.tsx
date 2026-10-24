import React, { useState } from 'react';
import { Mail, Copy, Check, Send, CheckCircle2 } from 'lucide-react';
import { Language, InquiryFormData } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  lang: Language;
  prefilledStyle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  prefilledStyle,
}) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    hotelName: '',
    email: '',
    website: '',
    packageType: prefilledStyle ? 'custom' : 'standard',
    message: prefilledStyle
      ? lang === 'pl'
        ? `Dzień dobry, interesuje mnie realizacja w stylu: "${prefilledStyle}". Chcielibyśmy porozmawiać o terminach dla naszego obiektu.`
        : `Hello, we are interested in a video production in the style of: "${prefilledStyle}". We would like to discuss available dates for our property.`
      : '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.contact.emailValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate real request submission cleanly
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      hotelName: '',
      email: '',
      website: '',
      packageType: 'standard',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct info & email */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-medium tracking-widest uppercase text-[#c6a87c] mb-3">
                {t.contact.kicker}
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-5">
                {t.contact.title}
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-8">
                {t.contact.subtitle}
              </p>

              {/* Direct Email Card */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 mb-6">
                <span className="text-xs text-zinc-400 block mb-1">
                  {t.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${t.contact.emailValue}`}
                  className="text-lg sm:text-xl font-medium text-[#e4d5b7] hover:underline underline-offset-4 font-mono break-all"
                >
                  {t.contact.emailValue}
                </a>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{t.contact.copiedEmail}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{t.contact.copyEmail}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${t.contact.emailValue}?subject=Zapytanie%20o%20wideo%20UGC%20dla%20hotelu`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#c6a87c]" />
                    <span>{t.contact.openMailApp}</span>
                  </a>
                </div>
              </div>

              {/* Editorial availability reminder */}
              <div className="text-xs text-zinc-400 leading-relaxed">
                <span>{t.footer.availability}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              {submitted ? (
                <div className="py-12 px-4 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-normal text-white mb-2">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light max-w-md mb-6 leading-relaxed">
                    {t.contact.form.successDesc}
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
                  >
                    {t.contact.form.anotherMessage}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={lang === 'pl' ? 'np. Anna Kowalska' : 'e.g. Sarah Jenkins'}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c6a87c] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        {t.contact.form.hotelName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.hotelName}
                        onChange={(e) =>
                          setFormData({ ...formData, hotelName: e.target.value })
                        }
                        placeholder={
                          lang === 'pl'
                            ? 'np. Grand Boutique Hotel'
                            : 'e.g. Azure Bay Resort'
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c6a87c] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="kontakt@hotel.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c6a87c] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        {t.contact.form.website}
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        placeholder="hotel.com lub @instagram"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c6a87c] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      {t.contact.form.package}
                    </label>
                    <select
                      value={formData.packageType}
                      onChange={(e) =>
                        setFormData({ ...formData, packageType: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-[#c6a87c] transition-colors"
                    >
                      <option value="starter">{t.contact.form.packages.starter}</option>
                      <option value="standard">{t.contact.form.packages.standard}</option>
                      <option value="seasonal">{t.contact.form.packages.seasonal}</option>
                      <option value="custom">{t.contact.form.packages.custom}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        lang === 'pl'
                          ? 'Opisz swoje oczekiwania, preferowany termin nagrań lub napisz, który styl wideo najbardziej przypadł Ci do gustu...'
                          : 'Tell me about your property, desired filming dates, or specific video styles you are interested in...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c6a87c] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-lg bg-[#e4d5b7] hover:bg-[#ebdcc0] text-zinc-950 font-semibold text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.form.sending}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.form.submit}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
