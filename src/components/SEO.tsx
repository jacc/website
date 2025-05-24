import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, ogImage }) => (
  <Head>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    {ogImage && <meta property="og:image" content={ogImage} />}
    <meta property="og:title" content={title} />
    {description && <meta property="og:description" content={description} />}
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    {description && <meta name="twitter:description" content={description} />}
    {ogImage && <meta name="twitter:image" content={ogImage} />}
  </Head>
);

export default SEO;
