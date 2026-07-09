import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const posts: Record<string, {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  readingTime: number;
  createdAt: Date;
}> = {
  "spring-cleaning-tips": {
    title: "Essential Spring Cleaning Tips for a Fresh Home",
    excerpt: "Transform your living space with our comprehensive spring cleaning guide.",
    content: `
Spring is the perfect time to refresh your living space and shake off the winter dust. At PristineClean, we believe that a thorough spring cleaning sets the tone for the months ahead.

## Start with a Plan

Before diving in, create a room-by-room checklist. This prevents overwhelm and ensures nothing gets missed. Break your home into zones and tackle one at a time.

## Declutter First

Cleaning around clutter is inefficient. Take time to sort, donate, and organize before you start scrubbing. A minimalist space is easier to clean and maintain.

## Go Top to Bottom

Dust settles downward. Start with ceiling fans and light fixtures, then work your way down to baseboards and floors. This prevents re-dusting lower surfaces.

## Don't Forget the Details

Baseboards, window tracks, behind appliances, and inside cabinets are often neglected in regular cleaning. Spring cleaning is the perfect opportunity to address these areas.

## Professional Help

For a truly transformative clean, consider professional services. Our team at PristineClean specializes in deep spring cleaning that reaches every corner of your home.

Contact us today to schedule your spring cleaning and experience the PristineClean difference.
    `,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
    category: "Tips",
    author: "PristineClean Team",
    readingTime: 5,
    createdAt: new Date("2026-06-15"),
  },
  "eco-friendly-cleaning": {
    title: "The Benefits of Eco-Friendly Cleaning Products",
    excerpt: "Discover why green cleaning is better for your health and the environment.",
    content: `
The shift toward eco-friendly cleaning is more than a trend — it's a smarter way to live. Here's why making the switch benefits everyone.

## Healthier Indoor Air

Conventional cleaning products release volatile organic compounds (VOCs) that can linger in your air for hours. Eco-friendly alternatives use natural ingredients that won't compromise your indoor air quality.

## Safe for Children and Pets

Your family's safety matters. Green cleaning products are free from harsh chemicals, making them safe to use around children and pets who are more vulnerable to toxic exposure.

## Environmental Impact

Every drop of conventional cleaner eventually makes its way into our water systems. Eco-friendly products biodegrade naturally and have a significantly lower environmental footprint.

## Effective Cleaning

Modern eco-friendly products are just as effective as their chemical counterparts. When combined with proper technique and professional equipment, the results are outstanding.

At PristineClean, we've committed to using eco-friendly products across all our services. Your space stays clean, and the planet stays healthy.
    `,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
    category: "Eco",
    author: "Sarah Mitchell",
    readingTime: 4,
    createdAt: new Date("2026-05-28"),
  },
  "office-cleaning-guide": {
    title: "How to Maintain a Pristine Office Environment",
    excerpt: "Create a productive workspace with these professional cleaning strategies.",
    content: `
A clean office isn't just about appearances — it directly impacts productivity, employee health, and client impressions.

## The Impact on Productivity

Studies show that employees in clean, organized workspaces are up to 15% more productive. Clutter and dirt create subconscious stress that affects focus.

## Health and Wellness

Offices are breeding grounds for germs. Regular professional cleaning reduces sick days by eliminating bacteria and viruses from high-touch surfaces like door handles, keyboards, and break rooms.

## Professional Image

Your office environment speaks volumes about your company. A pristine workspace conveys attention to detail, professionalism, and care for your team and clients.

## Recommended Schedule

Daily: Trash removal, surface wiping, restroom sanitation
Weekly: Vacuuming, mopping, dusting
Monthly: Deep cleaning, carpet care, window cleaning

## Partner with Professionals

At PristineClean, we offer customized commercial cleaning plans that work around your business hours. Let us handle the cleaning so you can focus on what matters most.
    `,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    category: "Commercial",
    author: "James Chen",
    readingTime: 6,
    createdAt: new Date("2026-05-10"),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) notFound();

  return (
    <article className="section-padding bg-warm-50">
      <div className="container-main max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-navy-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="aspect-[16/9] overflow-hidden mb-10">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
          />
        </div>

        <div className="flex items-center gap-4 text-sm text-navy-500 mb-4">
          <span className="font-medium text-blue-600 uppercase tracking-wider">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readingTime} min read
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-navy-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="text-navy-700 leading-relaxed space-y-4 prose prose-navy max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-semibold text-navy-900 mt-8 mb-4">
                {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-lg font-semibold text-navy-900 mt-6 mb-3">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.trim() === "") return null;
            return (
              <p key={i} className="text-navy-700 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t-2 border-navy-100">
          <p className="text-sm text-navy-500 mb-2">Written by</p>
          <p className="font-semibold text-navy-900">{post.author}</p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/quote-booking">
            <Button variant="primary" size="lg">
              Get Your Free Quote
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
