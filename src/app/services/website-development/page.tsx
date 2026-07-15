import React from 'react';
import { WebsiteDevelopmentServicesPage } from '@/components/WebsiteDevelopmentServicesPage';
import { buildMetadata, generateJsonLdSchema } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Website Development Services | Website Development Company",
  description: "Get premium website development services from VClick Digitally. We design and build fast, responsive, SEO-ready business, corporate, and ecommerce websites on WordPress & Shopify.",
  path: "/services/website-development",
});

export default function ServicesWebsiteDevelopmentPage() {
  const serviceSchema = generateJsonLdSchema("Service", {
    name: "Website Development Services",
    description: "Fast, responsive, SEO-ready business, corporate, and ecommerce website design and development services. Built entirely in-house with standard-compliant layouts.",
    areaServed: ["IN", "US", "SG", "SA"],
    offers: {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "Negotiable"
    }
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vclickdigitally.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://vclickdigitally.com/services/website-development"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Website Development Services",
        "item": "https://vclickdigitally.com/services/website-development"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does website development take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard business website typically takes 3 to 6 weeks from discovery to launch, while complex custom platforms or extensive e-commerce stores can take 6 to 10 weeks. The exact duration depends on the scope of page custom layouts, content readiness, and custom integrations."
        }
      },
      {
        "@type": "Question",
        "name": "Can you redesign my existing website without affecting my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We offer complete website redesign services that modernize your brand's digital presence, improve user experience, optimize speed, and preserve your existing search engine optimization rankings through meticulous page redirection and link structuring."
        }
      },
      {
        "@type": "Question",
        "name": "Will my website be mobile friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Every website we design and build is 100% responsive. This means it adapts automatically to render beautifully on mobile phones, tablets, laptops, and wide-screen desktops, ensuring a premium experience on every device."
        }
      },
      {
        "@type": "Question",
        "name": "Will my website be SEO ready from day one?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Search engine optimization is integrated directly into our development cycle. We construct your website with semantic HTML markup, fast-loading scripts, structured JSON-LD schema, search console configuration, and proper tag layouts to rank from day one."
        }
      },
      {
        "@type": "Question",
        "name": "Do you build ecommerce websites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We specialize in building secure, scalable e-commerce storefronts on platforms like Shopify and WooCommerce. We handle product database configurations, custom cart drawers, localized payment gateways, and checkout flow optimizations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I update the website content myself?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We configure user-friendly Content Management Systems (CMS) like WordPress and Shopify, and customize the admin interface so you can easily edit copy, update images, post blog articles, or add products without needing a developer."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide ongoing website maintenance and support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We provide ongoing support and maintenance packages. This includes daily backups, security monitoring, database tuning, core platform updates, and content adjustments to keep your digital asset secure and running at peak performance."
        }
      },
      {
        "@type": "Question",
        "name": "Which platform is best for my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The ideal platform depends on your business goals. WordPress is perfect for content-rich sites, Shopify is best for direct-to-consumer e-commerce, and custom coded websites are ideal for unique, highly interactive layouts. We help you choose during discovery."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WebsiteDevelopmentServicesPage />
    </>
  );
}
