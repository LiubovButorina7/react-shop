function Footer() {
  return (
    <footer className="page-footer light-blue lighten-2">
      <div className="footer-copyright">
        <div className="container">
          Portfolio Project by Liubov Butorina © {new Date().getFullYear()}{" "}
          Copyright
          <span className="right">
            <a
              href="https://github.com/LiubovButorina7/react-shop"
              title="Go to Github.com"
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
