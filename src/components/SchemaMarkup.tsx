import React from "react";

interface LocalBusinessSchemaProps {
  type: "localBusiness";
}

interface ProductSchemaProps {
  type: "product";
  name: string;
  image: string;
  description: string;
  price: number;
  slug: string;
}

interface FaqSchemaProps {
  type: "faq";
  faqs: { question: string; answer: string }[];
}

interface BreadcrumbsSchemaProps {
  type: "breadcrumbs";
  items: { name: string; url: string }[];
}

type SchemaProps =
  | LocalBusinessSchemaProps
  | ProductSchemaProps
  | FaqSchemaProps
  | BreadcrumbsSchemaProps;

export default function SchemaMarkup(props: SchemaProps) {
  let schemaData: Record<string, unknown> = {};

  if (props.type === "localBusiness") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Bakery",
      "name": "Anah Cakes",
      "image": [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        "https://images.unsplash.com/photo-1535141192574-5d4897c13636"
      ],
      "@id": "https://www.anahcakes.com/#bakery",
      "url": "https://www.anahcakes.com",
      "telephone": "+919876543210",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "124, RS Puram Main Road",
        "addressLocality": "Coimbatore",
        "postalCode": "641002",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 11.0125,
        "longitude": 76.9535
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "22:00"
      },
      "sameAs": [
        "https://www.instagram.com/anahcakes",
        "https://www.facebook.com/anahcakes"
      ]
    };
  } else if (props.type === "product") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": props.name,
      "image": props.image.startsWith("http") ? props.image : `https://www.anahcakes.com${props.image}`,
      "description": props.description,
      "brand": {
        "@type": "Brand",
        "name": "Anah Cakes"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://www.anahcakes.com/catalog/${props.slug}`,
        "priceCurrency": "INR",
        "price": props.price,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };
  } else if (props.type === "faq") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": props.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  } else if (props.type === "breadcrumbs") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": props.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith("http") ? item.url : `https://www.anahcakes.com${item.url}`
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
