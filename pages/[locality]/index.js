import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGlobalContext } from '@/context/MyContext';

import CityVenueHall from '@/components/miscellaneous/footer/CityVenueHall';
import FooterVendors from '@/components/miscellaneous/footer/FooterVendors';
import VendorListPage from '@/components/vendor/vendorlistpage/VendorListPage';
function Venue(props) {
  const { setSelectedCity, localities } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (props.city) {
      setSelectedCity(props.city);
    }
  }, [props.city]);

  // const jsonLdData2 = {
  //   "@context": "https://schema.org",
  //   "@type": "BreadcrumbList",
  //   "itemListElement": [
  //     {
  //       "@type": "ListItem",
  //       "position": 1,
  //       "item": { "@id": "https://weddingphotographersindelhi.com", "name": "Wedding Banquets" }
  //     },
  //     {
  //       "@type": "ListItem",
  //       "position": 2,
  //       "item": {
  //         "@id": `https://weddingphotographersindelhi.com/${props.category}`,
  //         "name": props.category.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
  //       }
  //     },
  //     {
  //       "@type": "ListItem",
  //       "position": 3,
  //       "item": {
  //         "@id": `https://weddingphotographersindelhi.com/${props.city}`,
  //         "name": props.city.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
  //       }
  //     },
  //     {
  //       "@type": "ListItem",
  //       "position": 4,
  //       "item": {
  //         "@id": `https://weddingphotographersindelhi.com/${props.locality}`,
  //         "name": props.locality.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
  //       }
  //     },
  //   ]
  // };

  return (
    <>
      <Head>
        <title>{props.result.meta?.meta_title}</title>
        <meta name="description" content={props.result.meta?.meta_description} />
        <meta name="keywords" content={props.result.meta?.meta_keywords} />
        <link rel="canonical" href={`https://weddingphotographersindelhi.com${router.asPath}`} />
        <meta property="og:title" content={props.result.meta?.meta_title} />
        <meta property="og:description" content={props.result.meta?.meta_description} />
        <meta property="og:image" content={
            props.result && props.result.data && props.result.data.length > 0 && props.result.data[0].images
              ? `${process.env.MEDIA_PREFIX || '/default/prefix'}/${props.result.data[0].images.split(',')[0]}`
              : 'https://weddingphotographersindelhi.com/twitter-img.png'
          } 
        />
        <meta property="og:url" content={`https://weddingphotographersindelhi.com${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.result.meta?.meta_title} />
        <meta name="twitter:description" content={props.result.meta?.meta_description} />
        <meta name="twitter:image" content={
            props.result && props.result.data && props.result.data.length > 0 && props.result.data[0].images
              ? `${process.env.MEDIA_PREFIX || '/default/prefix'}/${props.result.data[0].images.split(',')[0]}`
              : 'https://weddingphotographersindelhi.com/twitter-img.png'
          }
        />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        {/* <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData2) }} /> */}
      </Head>
          <VendorListPage data={{ ...props, localities }} />
          <FooterVendors />
      <CityVenueHall cities={props.result.cities} />
    </>
  );
}

export async function getServerSideProps({ query, req, res }) {
  try {
    const { locality } = query;
    const city = 'delhi';
    const category = 'best-wedding-photographers';
    const { guest, per_plate, per_budget, multi_localities, search_value, makeup_bridal_budget, makeup_occasion, photographer_service, photographer_service_budget, mehndi_package_budget, banquet_decor_package_budget, home_decor_package_budget, band_baja_ghodiwala_budget, photographer_occation, makeup_service, experience, events_completed, days} = query;

    const filterQuery = {
      guest: guest || "",
      per_plate: per_plate || "",
      per_budget: per_budget || "",
      multi_localities: multi_localities || "",
      search_value: search_value || "",
      locality: locality || "",
      makeup_service: makeup_service || "",
      makeup_bridal_budget: makeup_bridal_budget || "",
      makeup_occasion: makeup_occasion || "",
      photographer_service: photographer_service || "",
      photographer_service_budget: photographer_service_budget || "",
      mehndi_package_budget: mehndi_package_budget || "",
      banquet_decor_package_budget: banquet_decor_package_budget || "",
      home_decor_package_budget: home_decor_package_budget || "",
      band_baja_ghodiwala_budget: band_baja_ghodiwala_budget || "",
      photographer_occation: photographer_occation || "",
      experience: experience || "",
      events_completed: events_completed || "",
      days: days || ""
    };
    
    const url = `${process.env.SERVER_DOMAIN}/api/venue_or_vendor_list/${category}/${city}/${locality}?guest=${filterQuery.guest}&per_plate=${filterQuery.per_plate}&per_budget=${filterQuery.per_budget}&multi_localities=${filterQuery.multi_localities}&search_value=${filterQuery.search_value}&locality=${filterQuery.locality}&makeup_service=${filterQuery.makeup_service}&makeup_bridal_budget=${filterQuery.makeup_bridal_budget}&makeup_occasion=${filterQuery.makeup_occasion}&photographer_service=${filterQuery.photographer_service}&photographer_service_budget=${filterQuery.photographer_service_budget}&mehndi_package_budget=${filterQuery.mehndi_package_budget}&banquet_decor_package_budget=${filterQuery.banquet_decor_package_budget}&home_decor_package_budget=${filterQuery.home_decor_package_budget}&band_baja_ghodiwala_budget=${filterQuery.band_baja_ghodiwala_budget}&photographer_occation=${filterQuery.photographer_occation}&experience=${filterQuery.experience}&events_completed=${filterQuery.events_completed}&days=${filterQuery.days}`;
    const getlocalitiesURL = `${process.env.SERVER_DOMAIN}/api/locations/${city}`;

    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    };

    const result = await fetchData(url);
    const localities = await fetchData(getlocalitiesURL);
    const localitiesCheck = Array.isArray(localities.data) ? localities.data : localities.data || [];

    if (locality.toLowerCase() !== 'all') {
      const localityExists = localitiesCheck.some((loc) => loc.slug.toLowerCase() === decodeURIComponent(locality.toLowerCase()));
    
      if (!localityExists) {
        return {
          redirect: {
            destination: `/rohini/${locality}`,
            permanent: false,
          },
        };
      }
    }

    return {
      props: {
        result: result || null,
        city: city || null,
        locality: locality || null,
        category: category || null,
        localities: localities || null,
        filterQuery,
      },
    };
  } catch (error) {
    console.error("Error from listing page:", error);
    return {
      notFound: true,
    };
  }
}

export default Venue;
