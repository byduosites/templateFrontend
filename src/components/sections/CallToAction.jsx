import Data from "@data/sections/call-to-action.json";
import Link from "next/link";

const CallToActionSection = ( { bg } ) => {
  return (
    <div className={`${bg != "gray" ? "mil-accent-bg": "mil-gray-bg"}`}>
        <div className="container mil-p-60-30">
            <div className="row align-items-center">
                <div className="col-lg-9 mil-mb-30">
                    <h4 className="mil-buttons-space">{Data.title}</h4>
                </div>
                <div className="col-lg-3 mil-mb-30">
                    <Link href={Data.button.link} className="mil-float-right mil-button mil-button-lg mil-button-dark mil-scale-down-trigger mil-accent-trigger">
                        <span>{Data.button.label}</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CallToActionSection;