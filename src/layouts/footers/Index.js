import FooterLayoutDefault from "./LayoutDefault";
import FooterLayoutTwo from "./LayoutTwo";

const Footer = ({ layout, bg, instagram, extraClass, Data }) => {
  switch (layout) {
    case 1:
      return (
        <FooterLayoutDefault
          Data={Data}
          bg={bg}
          instagram={instagram}
          extraClass={extraClass}
        />
      );
    case 2:
      return <FooterLayoutTwo Data={Data} extraClass={extraClass} />;
    default:
      return (
        <FooterLayoutDefault
          Data={Data}
          bg={bg}
          instagram={instagram}
          extraClass={extraClass}
        />
      );
  }
};
export default Footer;
