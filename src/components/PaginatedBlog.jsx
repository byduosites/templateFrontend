import Link from "next/link";
import Date from '@library/date';

const PaginationPage = ({ items }) => {
    return (
      <>
        {items.map((item, index) => (
        <div className="col-xl-4" key={`post-${index}`}>
            <Link href={`/blog/${item.id}`} className="mil-card-1 mil-icon-2-trigger mil-accent-trigger mil-appearance mil-mb-30">
                <div className="mil-cover">
                    <div className="mil-image-frame">
                        <img src={item.image} alt={item.title} />
                    </div>
                </div>
                <div className="mil-overlay">
                    <div className="mil-description">
                        <div className="mil-post-info mil-mb-15">
                            {item.category.map((cat, cat_i) => (
                            <span key={`post-${index}-category-${cat_i}`} className="mil-accent mil-link">{cat}</span>
                            ))}
                            <span className="mil-dot-divider mil-link mil-accent">&#x2022;</span>
                            <span className="mil-link mil-softened-30"><Date dateString={item.date} /></span>
                        </div>
                        <h5>{item.title}</h5>
                    </div>
                </div>
            </Link>
        </div>
        ))}
      </>
    );
  };
  export default PaginationPage;
  