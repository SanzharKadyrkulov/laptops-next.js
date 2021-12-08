import Router from "next/router";
import { MainLayout } from "../../components/MainLayout";

export default function About({ title }: MyAbout) {
  return (
    <>
      <MainLayout title={"About Page"}>
        <h1>{title}</h1>
        <button onClick={() => Router.push("/")}>Go back to home</button>
      </MainLayout>
    </>
  );
}
interface MyAbout {
  title: string;
}
About.getInitialProps = async () => {
  const response = await fetch(`${process.env.API_URL}/about`);
  const { title }: MyAbout = await response.json();

  return {
    title,
  };
};
