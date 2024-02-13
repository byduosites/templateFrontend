import Link from 'next/link';
import { useState } from 'react';
import {
  formatDistance,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatRelative,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import appData from '@data/app.json';
import { FaClock } from 'react-icons/fa';

const DefaultHeader = ({
  transparent,
  invert,
  noLinks,
  extraClass,
  Data,
  ExpiresIn,
}) => {
  const [toggle, setToggle] = useState(false);

  const navItems = [];

  appData.header.menu.forEach((item, index) => {
    let s_class1 = '';

    if (item.children != 0) {
      s_class1 = 'mil-has-children';
    }
    let newobj = Object.assign({}, item, { classes: s_class1 });
    navItems.push(newobj);
  });

  return (
    <>
      {ExpiresIn && (
        <div className="banner fixed flex items-center font-semibold text-center justify-center text-white text-base f  h-[40px] bg-red-500 w-full z-50">
          <p className="text-center">
            <Link
              href="/planos"
              className="underline md:no-underline decoration-white "
            >
              <FaClock className="mr-2 inline-block" />
              Seu site expirará em{' '}
              {formatDistanceToNowStrict(new Date(ExpiresIn), {
                locale: ptBR,
              })}
              .&nbsp;
              <span className="decoration hidden md:inline-block decoration-white underline">
                Mantenha-o no ar.
              </span>
            </Link>
          </p>
        </div>
      )}

      <div
        className={`mil-top-panel${transparent ? ' mil-transparent-nav' : ''}${
          !invert ? ' mil-invert-nav' : ''
        } mil-animated  ${ExpiresIn ? 'mt-[40px]' : ''} ${
          extraClass ? extraClass : ''
        }`}
      >
        <div className="container ">
          <Link href="/" legacyBehavior>
            <a className="mil-logo mil-scale-down-trigger mil-accent-trigger">
              {Data?.logo ? (
                <>
                  <div className="h-[40px]">
                    <img src={Data.logo} className="h-full" />
                  </div>
                </>
              ) : (
                <>
                  <div className="mil-h5">
                    {Data?.name}
                    <span className="mil-accent">
                      {appData.header.logo.accent}
                    </span>
                  </div>
                </>
              )}
            </a>
          </Link>

          <div
            className={`mil-mobile-dropdown mil-menu-center ${
              toggle ? 'mil-active' : ''
            }`}
          >
            <div id="swupTopbar" className="mil-top-bar-transition">
              {!noLinks && (
                <nav className="mil-dark-nav">
                  <ul className="mil-inline-list mil-hidden-trigger">
                    {navItems.map((item, key) => (
                      <li
                        className={item.classes}
                        key={`header-menu-item-${key}`}
                      >
                        <Link href={item.link} className="mil-link">
                          {item.label}
                        </Link>
                        {item.children != 0 && (
                          <ul>
                            {item.children.map((subitem, key) => (
                              <li key={`header-submenu-item-${key}`}>
                                <Link href={subitem.link} className="mil-link">
                                  {subitem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            <ul className="mil-social mil-hidden-trigger">
              {Data?.networks.map(
                (item, key) =>
                  item.link && (
                    <li key={`header-social-item-${key}`}>
                      <a href={item.link} title={item.title} target="_blank">
                        <i className={item.icon} />
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* mobile menu button */}
          <div
            className={`mil-menu-btn ${toggle ? 'mil-active' : ''}`}
            onClick={() => setToggle(!toggle)}
          >
            <span />
          </div>
          {/* mobile menu button end */}
        </div>
      </div>
    </>
  );
};
export default DefaultHeader;
