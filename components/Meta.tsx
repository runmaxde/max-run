import Head from "next/head";

export default function Meta({ pageTitle }) {
  const defaultTitle = "max";
  const customTitle = pageTitle ? `${pageTitle} | max` : defaultTitle;

  return (
    <>
      <Head>
        <title>{customTitle}</title>
      </Head>
    </>
  );
}
