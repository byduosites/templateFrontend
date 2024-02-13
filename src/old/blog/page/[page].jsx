import PaginatedBlog from '@components/PaginatedBlog';
import Pagination from '@components/Pagination';

import PageBanner from '@components/PageBanner';
import Layouts from '@/src/layouts/Layouts';

import { getPaginatedPostsData } from '@library/posts';

export const PER_PAGE = 9;

import { Content } from '../../../old/blog';

const Blog = ({ posts, currentPage, totalPosts }) => {
  return (
    <Layouts>
      <PageBanner pageImage={'/img/content/11.jpg'} pageTitle={'Blog'} />

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

export async function getStaticPaths() {
  return {
    paths: Array.from({ length: 5 }).map((_, i) => `/blog/page/${i + 2}`),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const page = Number(params?.page) || 1;
  const { posts, total } = getPaginatedPostsData(PER_PAGE, page);

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  if (page === 1) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }

  return {
    props: {
      posts,
      totalPosts: total,
      currentPage: page,
    },
    revalidate: 60 * 60 * 24, // <--- ISR cache: once a day
  };
}
