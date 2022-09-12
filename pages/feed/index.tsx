import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Content } from "src/layouts/content";
import { Card } from "antd";

function Feed() {
  return (
    <Card bordered={false} style={{ height: "100%" }}>
      123
    </Card>
  );
}

Feed.getLayout = (page) => <Content>{page}</Content>;
export default Feed;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
