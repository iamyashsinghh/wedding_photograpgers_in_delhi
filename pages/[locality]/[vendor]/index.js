import VendorDetailsPage from "@/components/vendor/vendordetailspage/VendorDetailsPage";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page({ response }) {
  const router = useRouter();
 
    // const jsonLdData = {
    //   "@context": "https://schema.org",
    //   "@type": "BreadcrumbList",
    //   "itemListElement": [
    //     {
    //       "@type": "ListItem",
    //       "position": 1,
    //       "item": { "@id": "https://bestmakeupartistindelhi.in", "name": "Wedding Banquets" }
    //     },
    //     {
    //       "@type": "ListItem",
    //       "position": 2,
    //       "item": {
    //         "@id": `https://bestmakeupartistindelhi.in/${response.city.slug}`,
    //         "name": response.city.name
    //       }
    //     },
    //     {
    //       "@type": "ListItem",
    //       "position": 3,
    //       "item": { "name": response.data.vendor.brand_name }
    //     }
    //   ]
    // };
    return (
      <>
        <Head>
          <title>{response.data.vendor.meta_title}</title>
          <meta name="description" content={response.data.vendor.meta_description} />
          <meta name="keywords" content={response.data.vendor.meta_keywords} />
          <meta
            name="og:image"
            content={
              response.data.vendor && response.data.vendor.images
                ? `${process.env.MEDIA_PREFIX}/${response.data.vendor.images.split(',')[0]}`
                : 'https://bestmakeupartistindelhi.com/twitter-img.png'
            }
          />
          <meta property="og:title" content={response.data.vendor.meta_title} />
          <meta property="og:description" content={response.data.vendor.meta_description} />
          <meta property="og:url" content={`https://bestmakeupartistindelhi.com${router.asPath}`} />
          {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
          /> */}
        </Head>
        <VendorDetailsPage response={response} />
      </>
    )
}

export async function getServerSideProps({ query, req, res }) {
  try {
    const { vendor: slug, locality:locality } = query;
    const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_details/${slug}`;
    let response = await fetch(url);
    response = await response.json();

    // 

    if (!response || !response.success || !response.data.vendor.get_locality.slug || !response.data) {
      return { notFound: true };
    }

    if (response.data.vendor.get_locality.slug !== locality) {
      return {
        redirect: {
          permanent: true,
          destination: `/${response.data.vendor.get_locality.slug}/${slug}`,
        },
      };
    }
  
    if(response.is_redirect == 1){
      return {
        redirect: {
          permanent: true,
          destination: `/${response.redirect_url}`,
        },
      };
    }

    return { props: { response } };
  } catch (error) {
    return { notFound: true };
  }
}
