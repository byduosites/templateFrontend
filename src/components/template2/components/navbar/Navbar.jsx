import React,{useState} from 'react';
import { RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import styles from './navbar.module.css';
// import logo from '../../assets/assets/logo.svg';

const Menu = () =>(
  <>
  <p><a href='#home' >HOME</a></p>
  <p><a href='#whpt3' >What is GPT3</a></p>
  <p><a href='#possibility' >Open AI</a></p>
  <p><a href='#features' >Case Studies</a></p>
  <p><a href='#blog' >Library</a></p>
  </>
)

const Navbar = () => {
  const[toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className={styles.gpt3__navbar}>
      <div className={styles.gpt3__navbar_links}>
        <div className="text-4xl font-bold">ByDuo.</div>
        <div className={styles.gpt3__navbar_links_container}>
          <Menu />
        </div>
      </div>
      <div className={styles.gpt3__navbar_sign}>
        <p className={styles.gpt3__navbar_sign.p}>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      <div className={styles.gpt3__navbar_menu}>
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className={styles.gpt3__navbar_menu_container.scale_up_center}>
            <div className={styles.gpt3__navbar_menu_conatiner_links}>
              <Menu />
              <div className={styles.gpt3__navbar_menu_container_links_sign}>
                <p className={styles.gpt3__navbar_menu_container_links_sign.p}>
                  Sign in
                </p>
                <button type="button">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar
