import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  keywords?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  ogImage,
  canonicalUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  keywords,
}) => {
  const siteUrl = "https://jack.bio";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullOgImage = ogImage
    ? `${siteUrl}${ogImage}`
    : `${siteUrl}/images/og-default.png`;

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Basic Meta */}
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Jack LaFond" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Article specific meta */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      {type === "article" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              description: description,
              image: fullOgImage,
              datePublished: publishedTime,
              dateModified: modifiedTime,
              author: {
                "@type": "Person",
                name: "Jack LaFond",
                url: siteUrl,
              },
              publisher: {
                "@type": "Organization",
                name: "Jack LaFond",
                url: siteUrl,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": fullCanonicalUrl,
              },
            }),
          }}
        />
      )}
    </Head>
  );
};

export default SEO;
