import "../../assets/css/components/Attribution.css";

function Attribution({ variant = "default" }) {
  return (
    <section
      className={`attribution-section attribution-section--${variant}`}
      aria-label="Project and asset attribution"
    >
      <div className="attribution-inner">
        <span className="attribution-label">ATTRIBUTION</span>
        <p className="attribution-copy mb-0">
          Background image is{" "}
          <a href="www.magnific.com" target="_blank" rel="noreferrer">
            Designed by Magnific
          </a>
        </p>
      </div>
    </section>
  );
}

export default Attribution;
