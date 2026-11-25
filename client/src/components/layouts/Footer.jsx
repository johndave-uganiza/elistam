import "../../assets/css/layouts/footer.css";
import { useLocation } from "react-router-dom";
import Attribution from "../common/Attribution";

function Footer() {
  const { pathname } = useLocation();
  const showAttribution = pathname === "/" || pathname === "/login";

  return (
    <div>
      <div className="p-2 px-4 bg-white text-black shadow-lg">
        <div
          className={`footer-content${showAttribution ? " footer-content--attributed" : ""}`}
        >
          {showAttribution && <Attribution variant="footer" />}

          <div className="footer-meta">
            <span>2026</span>
            <span className="footer-dot">•</span>
            <span>eListam</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
