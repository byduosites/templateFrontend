import Layouts from '@/src/layouts/Layouts';

import 'photoswipe/dist/photoswipe.css';

import { Gallery, Item } from 'react-photoswipe-gallery';

import { getAllPostsIds, getPostData, getRelatedPosts } from '@library/posts';
import Date from '@library/date';

import PageBanner from '@components/PageBanner';
import RelatedPostsSection from '@components/sections/RelatedPosts';
import SubscribeSection from '@components/sections/Subscribe';

const PostsDetail = props => {
  const postData = props.data;

  return (
    <Layouts>
      <PageBanner pageImage={postData.image} pageTitle={postData.title} />

      <div className="container mil-mb-120">
        <Gallery>
          <div className="row justify-content-center">
            <div className="col-lg-12 col-xl-9 mil-content-frame mil-appearance mil-p-120-0">
              <h3 className="mil-text-center single-post-title mil-appearance mil-mb-60">
                {postData.title}
              </h3>

              {/* post info */}
              <div className="mil-post-info mil-appearance mil-center mil-mb-30">
                <div className="mil-author">
                  <img
                    src={postData.author.avatar}
                    alt={postData.author.name}
                  />
                  <span className="mil-dark mil-link">
                    {postData.author.name}
                  </span>
                </div>
                <span className="mil-dot-divider mil-link mil-accent">
                  &#x2022;
                </span>
                {postData.category.map((cat, cat_i) => (
                  <span
                    key={`category-${cat_i}`}
                    className="mil-accent mil-link"
                  >
                    {cat}
                  </span>
                ))}
                <span className="mil-dot-divider mil-link mil-accent">
                  &#x2022;
                </span>
                <span className="mil-link mil-softened-30">
                  <Date dateString={postData.date} />
                </span>
              </div>
              {/* post info end */}

              <Item
                original={postData.image}
                thumbnail={postData.image}
                width={postData.imageWidth}
                height={postData.imageHeight}
              >
                {({ ref, open }) => (
                  <a
                    data-fancybox="gallery"
                    ref={ref}
                    onClick={open}
                    data-no-swup
                    className="mil-appearance mil-just-image mil-image-hori mil-icon-3-trigger mil-mb-120"
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={postData.image}
                      alt={postData.title}
                      className="mil-scale-img"
                      data-value-1="1"
                      data-value-2="1.1"
                    />
                  </a>
                )}
              </Item>
            </div>

            <div
              className="col-lg-10 col-xl-6 single-post-text"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />

            {typeof postData.gallery != 'undefined' && (
              <>
                {postData.gallery.enabled == 1 && (
                  <div className="row justify-content-center mil-p-120-0">
                    <div className="col-lg-12 col-xl-9">
                      <div className="row">
                        {postData.gallery.items.map((item, key) => (
                          <div
                            className={
                              postData.gallery.cols == 3
                                ? 'col-lg-4'
                                : 'col-lg-6'
                            }
                            key={`gallery-item-${key}`}
                          >
                            <Item
                              original={item.image}
                              thumbnail={item.image}
                              width={item.width}
                              height={item.height}
                            >
                              {({ ref, open }) => (
                                <a
                                  data-fancybox="gallery"
                                  data-no-swup
                                  ref={ref}
                                  onClick={open}
                                  className={
                                    postData.gallery.style == 'vertical'
                                      ? 'mil-appearance mil-just-image mil-image-vert mil-icon-3-trigger mil-accent-trigger mil-mb-30'
                                      : 'mil-appearance mil-just-image mil-image-hori mil-icon-3-trigger mil-accent-trigger mil-mb-30'
                                  }
                                  style={{ cursor: 'pointer' }}
                                >
                                  <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="mil-scale-img"
                                    data-value-1="1"
                                    data-value-2="1.1"
                                  />
                                </a>
                              )}
                            </Item>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {typeof postData.youtube != 'undefined' && (
              <>
                {postData.youtube.enabled == 1 && (
                  <div className="row justify-content-center mil-p-120-0">
                    <div className="col-lg-12 col-xl-9">
                      <iframe
                        className="mil-youtube-video mil-appearance"
                        src={`https://www.youtube.com/embed/${postData.youtube.id}?controls=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {typeof postData.additional != 'undefined' && (
              <>
                {postData.additional.enabled == 1 && (
                  <div className="row justify-content-center single-post-text mil-p-90-0">
                    <div
                      className="col-lg-10 col-xl-6"
                      dangerouslySetInnerHTML={{
                        __html: postData.additional.content,
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </Gallery>
      </div>

      <RelatedPostsSection items={props.related} />

      <SubscribeSection bgColorClass={'mil-gray-bg'} />
    </Layouts>
  );
};
export default PostsDetail;

export async function getStaticPaths() {
  const paths = getAllPostsIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const relatedPosts = await getRelatedPosts(params.id);

  return {
    props: {
      data: postData,
      related: relatedPosts,
    },
  };
}
