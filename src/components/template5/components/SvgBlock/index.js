// This is SvgBlock component, It will render svgs like in the services section.

import styled from "styled-components";

const RightBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  position: relative;

  @media only Screen and (max-width: 48em) {
    display: none;
  }
`;
const SvgBlock = ({ svg }) => {
  const SvgIcon = require(`../../../../../public/img/template5/${svg}`).default;
  return (
    <RightBlock>
      {/* <img src="/img/template5/arrow-up.svg" alt="svg" /> */}
    </RightBlock>
  );
};

export default SvgBlock;
