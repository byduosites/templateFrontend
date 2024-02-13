import { useState } from 'react';

import Layouts from '../layouts/Layouts';

import { getSortedProjectsData } from '@library/projects';

import 'photoswipe/dist/photoswipe.css';
import 'react-modal-video/css/modal-video.css';

import { Gallery, Item } from 'react-photoswipe-gallery';
import ModalVideo from 'react-modal-video';

import Link from 'next/link';

const Portfolio = props => {
  const rows = [];
  const projectsGrid = [];

  for (var i = 0; i < props.projects.length; i += 5) {
    rows.push(props.projects.slice(i, 5 + i));
  }

  rows.forEach(row => {
    let row_rows = [];
    row_rows.push(row.slice(0, 1));
    row_rows.push(row.slice(1, 5));

    projectsGrid.push(row_rows);
  });

  const [isOpen, setOpen] = useState(false);

  const [modalURL, setModalURL] = useState(false);

  const openSingleModalVideo = e => {
    setModalURL(e.target.getAttribute('data-href'));
    setOpen(true);
  };

  return (
    <Layouts>
      <div className="mil-spacer-100 mil-spacer-dark" />

      {/* portfolio */}
      <div className="mil-portfolio-fw mil-appearance">
        <Gallery>
          {projectsGrid.map((row, row_i) => (
            <div
              className={
                row_i % 2 == 0 ? 'row m-0' : 'row m-0 flex-row-reverse'
              }
              key={`portfolio-row-${row_i}`}
            >
              {row.map((col, col_i) => (
                <div
                  className="col-lg-6 p-0"
                  key={`portfolio-row-${row_i}-col-${col_i}`}
                >
                  <div className="row m-0">
                    {col.map((item, key) => (
                      <div
                        className={
                          col_i == 0 ? 'col-lg-12 p-0' : 'col-lg-6 p-0'
                        }
                        key={`portfolio-row-${row_i}-col-${col_i}-item-${key}`}
                      >
                        <div className="mil-portfolio-item">
                          <div className="mil-cover mil-square mil-scale-down-trigger mil-accent-trigger">
                            <div className="mil-image-frame">
                              {item.type != 'video' && (
                                <img src={item.image} alt={item.title} />
                              )}
                              {item.type == 'video' && (
                                <video
                                  className="mil-video-background"
                                  data-value="1.2"
                                  autoPlay="autoplay"
                                  loop="loop"
                                  muted="true"
                                  playsInline="true"
                                  onContextMenu={e => e.preventDefault()}
                                  preload="auto"
                                >
                                  <source src={item.image} />
                                </video>
                              )}
                            </div>
                          </div>
                          <Link
                            href={`portfolio/${item.id}`}
                            className="mil-item-description mil-icon-2-trigger mil-accent-trigger"
                          >
                            <div className="mil-text-bg mil-mb-5">
                              <h5 className="mil-light">{item.title}</h5>
                            </div>
                            <br />
                            <div className="mil-text-bg">
                              <p className="mil-link mil-accent">
                                {item.category}
                              </p>
                            </div>
                          </Link>

                          {item.type != 'video' && (
                            <Item
                              original={item.image}
                              thumbnail={item.image}
                              width={item.imageWidth}
                              height={item.imageHeight}
                            >
                              {({ ref, open }) => (
                                <a
                                  data-fancybox="gallery"
                                  ref={ref}
                                  onClick={open}
                                  data-no-swup
                                  className="mil-zoom-icon mil-hidden-trigger"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <img src="/img/icons/zoom.svg" alt="zoom" />
                                </a>
                              )}
                            </Item>
                          )}
                          {item.type == 'video' && (
                            <>
                              <a
                                data-fancybox="gallery"
                                data-href={item.image}
                                onClick={openSingleModalVideo}
                                data-no-swup
                                className="mil-zoom-icon mil-hidden-trigger"
                                style={{ cursor: 'pointer' }}
                              >
                                <img src="/img/icons/zoom.svg" alt="zoom" />
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Gallery>
      </div>
      {/* portfolio end */}

      <ModalVideo
        channel="custom"
        autoplay
        isOpen={isOpen}
        url={modalURL}
        onClose={() => setOpen(false)}
      />
    </Layouts>
  );
};
export default Portfolio;

export async function getStaticProps() {
  const allProjects = getSortedProjectsData();

  return {
    props: {
      projects: allProjects,
    },
  };
}
