import React from "react";
import classnames from "classnames";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import withBaseUrl from "@docusaurus/withBaseUrl";
import Link from "@docusaurus/Link";

import Layout from "@theme/Layout";
import styles from "./styles.module.css";

function Hero() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <header className={classnames("hero", styles.hero)}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${withBaseUrl("img/smpte.svg")})` }}
      />
      <div className="container">
        <img src={withBaseUrl("img/logo.svg")} alt="logo" />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <Link
          to={withBaseUrl("docs/quickstart")}
          className="button button--outline button--primary button--lg"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

function Feature({ title, children, color = "white" }) {
  return (
    <div className="col">
      <h2 className="text--center" style={{ color }}>
        {title}
      </h2>
      <p className="text--justify">{children}</p>
    </div>
  );
}

function Body() {
  return (
    <main className="container padding-horiz--md margin-vert--xl">
      <div className="row">
        <Feature title="Convenient" color="#00ABAA">
          The Channel class provides a promise-fluent API for creating async
          iterators. You can reuse the same constructor to convert event
          emitters, streams, websockets, or other callback-based data sources
          into objects which can be read using <code>async/await</code> and{" "}
          <code>for await…of</code> statements.
        </Feature>
        <Feature title="Safe" color="#BA00AC">
          Channels prevent common mistakes people make when rolling async
          iterators by hand. By executing lazily, dealing with backpressure, and
          propagating errors in a predictable manner, channels ensure that event
          listeners are cleaned up and that bottlenecks and deadlocks are
          discovered quickly.
        </Feature>
        <Feature title="Powerful" color="#00B100">
          You can use channels to implement architectural patterns like
          cancelable timers, semaphores, and generic pubsub classes. The Channel
          class also provides static methods like <code>Channel.race</code> and{" "}
          <code>Channel.merge</code> which allow you to use async iterators for
          reactive programming purposes.
        </Feature>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Body />
    </Layout>
  );
}
