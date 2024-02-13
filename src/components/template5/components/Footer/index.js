// This is footer component

import styled from "styled-components";
// import Twitter from "../../../../../public/img/template5/twitter-square-brands.svg";
// import Instagram from "../../../../../public/img/template5/instagram-square-brands.svg";
// import Gmail from "../../../../../public/img/template5/envelope-open-solid.svg";

const FOOTER = styled.footer`
  padding: 1.2rem calc(2.5rem + 2.5vw);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only Screen and (max-width: 48em) {
    flex-direction: column;
    align-items: center;
    div {
      &:first-child {
        margin-bottom: 1rem;
      }
    }
  }
`;

const LeftText = styled.div``;
const RightText = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1.5rem;
    filter: invert(100%);
    margin-left: 1rem;
    transition: all 0.2s ease-in-out;
  }
  img:hover {
    transform: scale(1.5);
    filter: invert(50%) sepia(100%) saturate(300%) hue-rotate(216deg)
      brightness(100%) contrast(97%);
  }
`;
const Footer = () => {
  return (
    <FOOTER>
      <LeftText>
        &copy; {new Date().getFullYear()}. Built and Design by{" "}
        <a href="#home"> Byduo.</a>
      </LeftText>
      <RightText>
        Reach out to me via
        <img
          src="/img/template5/template5/twitter-square-brands.svg"
          alt="twitter"
        />
        <img src="/img/template5/instagram-square-brands.svg" alt="Instagram" />
        <img src="/img/template5/envelope-open-solid.svg" alt="Gmail" />
      </RightText>
    </FOOTER>
  );
};

export default Footer;
