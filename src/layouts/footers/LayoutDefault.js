import Link from 'next/link';
import appData from '@data/app.json';

const DefaultFooter = ({ bg, instagram, extraClass, Data }) => {
  return (
    <footer id="footer" className="mil-footer-1 mil-light-trigger">
      <div className="mil-image-frame">
        <img
          src={bg ? bg : appData.footer.bg_image}
          alt="img"
          className="mil-scale-img"
          data-value-1="1"
          data-value-2="1.2"
          style={{ filter: 'grayscale(100%)' }}
        />
        <div className="mil-overay"></div>
      </div>
      <div className="container">
        <div className="mil-footer-content mil-p-120-90">
          <div className="row justify-content-between">
            <div className="col-lg-6 col-xl-4 mil-mb-30">
              <h4 className="mil-light mil-mb-30">
                <span dangerouslySetInnerHTML={{ __html: Data.name }} />
                <span className="mil-accent hidden">
                  {appData.footer.logo.accent}
                </span>
              </h4>
              {/* <p className="mil-mb-30">{appData.footer.description}</p> */}
            </div>
            <div className="col-lg-12 col-xl-8">
              <div className="row justify-content-xl-end">
                <div className="col-lg-4 col-xl-3 mil-mb-30 hidden">
                  <h6 className="mil-light mil-mb-30">Menu</h6>
                  {/* menu list */}
                  <ul>
                    {appData.footer.menu.map((item, key) => (
                      <li key={`footer-menu-item-${key}`}>
                        <Link
                          href={item.link}
                          className="mil-link mil-link-hover mil-softened-50 mil-mb-15"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* menu list end */}
                </div>
                <div className="col-lg-4 col-xl-3 mil-mb-30 hidden">
                  <h6 className="mil-light mil-mb-30">Useful links</h6>
                  {/* useful links list */}
                  <ul>
                    {appData.footer.links.map((item, key) => (
                      <li key={`footer-links-item-${key}`}>
                        <a
                          href={item.link}
                          className="mil-link mil-link-hover mil-softened-50 mil-light mil-mb-15"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {/* useful links list end */}
                </div>
                <div className="col-lg-4 col-xl-4 mil-mb-30">
                  <h6 className="mil-light mil-mb-30">Fale Conosco</h6>
                  {/* email */}
                  <a
                    href={`mailto:${Data.email}`}
                    className="mil-link mil-link-hover mil-accent mil-hidden-trigger mil-mb-30"
                  >
                    {Data.email}
                  </a>
                  {/* phone */}
                  <p className="mil-light mil-text-xl mil-bold mil-mb-30">
                    {Data.phone}
                  </p>

                  {/* social */}
                  <ul className="mil-social mil-hidden-trigger mil-left">
                    {Data.networks.map(
                      (item, key) =>
                        item.link && (
                          <li key={`social-item-${key}`}>
                            <a
                              href={item.link}
                              title={item.title}
                              target="_blank"
                              className="mil-light"
                            >
                              <i className={item.icon} />
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                  {/* social end */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {instagram && (
          <div className="mil-footer-instagram mil-mb-120 hidden">
            {/* instagram */}
            <div className="mil-instagram-frame">
              <div className="mil-instagram mil-footer-instagram">
                {appData.footer.instagram.images.map((item, key) => (
                  <div
                    className="mil-instagram-item"
                    key={`instagram-item-${key}`}
                  >
                    <img src={item} alt="instagram" />
                  </div>
                ))}
              </div>
              <div className="mil-button-positions mil-appearance">
                <a
                  href={appData.footer.instagram.button.link}
                  target="_blank"
                  className="mil-button mil-button-lg mil-button-rounded mil-button-accent mil-scale-down-trigger"
                >
                  <span>
                    <i className="fab fa-instagram"></i>{' '}
                    {appData.footer.instagram.button.label}
                  </span>
                </a>
              </div>
            </div>
            {/* instagram end */}
          </div>
        )}
      </div>
      <div className="mil-footer-bottom">
        <div className="container">
          {/* copyright */}
          <p className="mil-text-sm mil-softened-60">{Data.footerLabel}</p>
          <p
            className="mil-text-sm mil-softened-60"
            dangerouslySetInnerHTML={{ __html: appData.footer.dev }}
          />
        </div>
      </div>
    </footer>
  );
};
export default DefaultFooter;
