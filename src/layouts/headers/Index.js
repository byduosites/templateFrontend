import HeaderLayoutDefault from './LayoutDefault';

const Header = ({
  layout,
  transparent,
  invert,
  noLinks,
  extraClass,
  ExpiresIn,
  Data,
}) => {
  switch (layout) {
    case 1:
      return;

    case 2:
      return;

    default:
      return (
        <HeaderLayoutDefault
          transparent={transparent}
          invert={invert}
          ExpiresIn={ExpiresIn}
          Data={Data}
          noLinks={noLinks}
          extarClass={extraClass}
        />
      );
  }
};
export default Header;
