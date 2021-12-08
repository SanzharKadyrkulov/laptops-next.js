import Link from "next/link";

export default function A({ href, text }) {
  return (
    <>
      <Link href={href}>
        <a>{text}</a>
      </Link>
      <style jsx>
        {`
          a {
            color: #fff;
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
}
