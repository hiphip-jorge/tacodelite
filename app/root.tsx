import type { LinksFunction, MetaFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import appStyles from "./styles/app.css";
import tailwindStyles from "~/styles/tailwind.css";
import tacoDeliteFavicon from "./assets/td-logo_2021.png";

let acierBatStyleSheetUrl = "https://use.typekit.net/kui8jtg.css";
let secularOneStyleSheetUrl =
  "https://fonts.googleapis.com/css2?family=Secular+One&display=swap";

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: tacoDeliteFavicon },
    { rel: "stylesheet", href: acierBatStyleSheetUrl },
    { rel: "stylesheet", href: secularOneStyleSheetUrl },
    { rel: "stylesheet", href: appStyles },
    { rel: "stylesheet", href: tailwindStyles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Taco Delite | 15th Street",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
