import Data from "@data/sections/awards.json";

const AwardsSection = () => {
  return (
    <div className="mil-gray-bg mil-p-120-90">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <span className="mil-link mil-softened-60 mil-appearance mil-mb-30">{Data.subtitle}</span>
                    <h3 className="mil-mb-30 mil-appearance">{Data.title}</h3>
                </div>
                <div className="col-lg-6">
                    <p className="mil-appearance mil-mt-55-adapt mil-mb-60">{Data.description}</p>
                    <div className="mil-divider mil-appearance mil-mb-60"></div>
                    <div className="row">
                        {Data.items.map((item, key) => (
                        <div key={`award-item-${key}`} className="col-lg-6 mil-mb-30">
                            <div className="mil-appearance">
                                <div className="mil-flex justify-content-between mil-mb-10">
                                    <h6>{item.title}</h6>
                                    <span className="mil-accent">{item.year}</span>
                                </div>
                                <div className="mil-text-sm mil-mb-15">{item.subtitle}</div>
                                <p className="mil-mb-15">{item.text}</p>
                                <div className="mil-deco"></div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AwardsSection;