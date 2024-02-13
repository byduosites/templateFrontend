import { PER_PAGE } from '../pages/blog/page/[page]';
import PaginatedBlog from '@components/PaginatedBlog';
import Pagination from '@components/Pagination';

import PageBanner from '@components/PageBanner';
import Layouts from '../layouts/Layouts';

import { getPaginatedPostsData } from '../lib/posts';

export const Content = {
  subtitle: 'Newsletter',
  title: 'News from the life <br />of our agency.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum fuga ratione cum maxime ullam id voluptatibus commodi dolorem at, aut, odio, amet quod molestias possimus. Sunt repudiandae ipsam, consectetur repellendus.',
};

const Blog = ({ posts, totalPosts, currentPage }) => {
  return (
    <Layouts>
      <PageBanner pageImage={'img/content/11.jpg'} pageTitle={'Blog'} />

      <div className="mil-spacer" />

      {/* blog */}
      <div className="mil-blog-section">
        <div className="container mil-content-frame mil-appearance mil-p-120-90">
          <div className="row justify-content-between mil-mb-120">
            <div className="col-xl-5">
              <h3 className="mil-link mil-appearance mil-accent mil-mb-30">
                {Content.subtitle}
              </h3>
              <h3
                className="mil-mb-30 mil-appearance"
                dangerouslySetInnerHTML={{ __html: Content.title }}
              />
            </div>
            <div className="col-xl-6">
              <p className="mil-appearance mil-mt-55-adapt mil-mb-30">
                {Content.description}
              </p>

              <div className="mil-deco mil-appearance"></div>
            </div>
          </div>
          <div className="row">
            <PaginatedBlog items={posts} />
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={totalPosts}
          perPage={PER_PAGE}
          renderPageLink={page => `/blog/page/${page}`}
        />
      </div>
      {/* blog end */}
    </Layouts>
  );
};
export default Blog;

export async function getStaticProps() {
  const { posts, total } = getPaginatedPostsData(PER_PAGE, 1);

  return {
    props: {
      posts,
      totalPosts: total,
      currentPage: 1,
    },
  };
}
