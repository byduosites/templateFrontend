import { useEffect, useState } from 'react';
import { scrollAnimation } from '../common/scrollAnims';
import { countersAnimation } from '../common/counters';
import { navigation } from '../common/navigation';
import { formInputs } from '../common/utilits';

import Footer from './footers/Index';
import Header from './headers/Index';
import Cursor from './cursor/Index';

import axios from 'axios';

import {
  FaArrowRight,
  FaCheck,
  FaExchangeAlt,
  FaPencilAlt,
} from 'react-icons/fa';
import { TiFlash } from 'react-icons/ti';
import { RiRobot2Fill } from 'react-icons/ri';
import { AiOutlineFontSize, AiOutlineCamera } from 'react-icons/ai';
import LoadingPage from '../components/LoadingPage';
import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import api from '../lib/api';
import { useRouter } from 'next/router';

const Layouts = ({
  children,
  header,
  footer,
  noHeader,
  noLinks,
  noFooter,
  painelUrl,
  footerBg,
  footerInst,
  transparent,
  theme,
  invert,
  extraClass,
  ExpiresIn,
  showModalBefore,
  isLead,
  noButtons,
  footerData,
  published,
  initialPhone,
  isExpired,
  headerData,
}) => {
  useEffect(() => {
    scrollAnimation();
    navigation();
    formInputs();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [avaliableThemes] = useState([
    'theme-default',
    'theme-b',
    'theme-a',
    'theme-blue',
    'theme-black',
    'theme-black-red',
  ]);

  const router = useRouter();

  const [themeChangeCount, setThemeChangeCount] = useState(0);

  const [currentTheme, setTheme] = useState(theme);

  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadNiche, setLeadNiche] = useState('');

  async function sendLeadData() {
    try {
      const leadPayload = {
        name: leadName,
        niche: leadNiche,
        email: leadEmail,
        initialPhone,
      };

      //

      console.log(leadPayload);

      await api.post(
        `/webhooks/leads`,

        leadPayload
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // alert('form');

    await sendLeadData();

    await router.push(painelUrl);
  }

  return (
    <div
      id="smooth-wrapper"
      className={`mil-wrapper ${currentTheme ?? 'theme-a'}`}
    >
      <Cursor />

      <Head>
        <title>{headerData?.name ?? 'no-name'}</title>
      </Head>

      {isLoading ? (
        <>
          <div className="flex items-center !overflow-hidden justify-center h-[100vh]">
            <LoadingPage />
          </div>
        </>
      ) : (
        <>
          {!noButtons && (
            <div
              className="
      controls
        fixed
        dark
        right-5 bottom-5
        z-50
        flex 
        flex-col
        items-end
      "
            >
              {/* 
            <div className="z-[50] flex items-center justify-center mb-3 cursor-pointer transition-colors hover:transition-all hover:bottom-6 hover:bg-slate-800 hover:text-white pop-up-regenerate text-slate-900 h-[50px] w-[50px] min-w-[50px]  shadow-slate-800 shadow-2xl rounded-full p-2 bg-zinc-100">
              <AiOutlineFontSize className="text-2xl" />
            </div>
*/}

              <div className="hidden z-[50] flex items-center justify-center mb-3 cursor-pointer transition-colors hover:transition-all hover:bottom-6 hover:bg-slate-800 hover:text-white pop-up-regenerate text-slate-900 h-[50px] w-[50px] min-w-[50px]  shadow-slate-800 shadow-2xl rounded-full p-2 bg-zinc-100">
                <AiOutlineCamera className="text-2xl" />
              </div>

              <div
                onClick={() => {
                  const selected =
                    avaliableThemes[themeChangeCount % avaliableThemes.length];

                  setTheme(selected);
                  setThemeChangeCount(old => old + 1);
                }}
                className="z-[50] mb-3 cursor-pointer transition-colors hover:transition-all hover:bottom-6 hover:bg-slate-800 hover:text-white pop-up-regenerate text-slate-800 h-[50px] w-[50px] min-w-[50px] flex items-center shadow-slate-800 shadow-2xl rounded-full p-2 bg-zinc-100"
              >
                <div className="h-full rounded-full w-full bg-[url('/img/rainbow.jpg')] bg-center bg-cover bg-no-repeat"></div>
              </div>

              {!published && (
                <Link
                  href={'/planos'}
                  target="_blank"
                  className="cursor-pointer mb-[15px] transition-colors hover:transition-all hover:bottom-6 hover:bg-slate-800 hover:text-white pop-up-regenerate text-zinc-100 h-[50px] min-w-[150px] flex items-center shadow-slate-800 shadow-2xl  rounded-full  p-4   bg-blue-500"
                >
                  <FaCheck className="" />

                  <span className="ml-3  font-bold">Publicar</span>
                </Link>
              )}

              {!isLead ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div
                      // href={'/planos'}
                      // target="_blank"
                      className="cursor-pointer transition-colors hover:transition-all hover:bottom-6 hover:bg-slate-800 hover:text-white pop-up-regenerate text-slate-800 h-[50px] min-w-[150px] flex items-center shadow-slate-800 shadow-2xl  rounded-full  p-4   bg-zinc-100"
                    >
                      <FaPencilAlt />
                      {/* <RiRobot2Fill className="" /> */}

                      <span className="ml-3  font-bold">Editar</span>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className=" w-[90%] sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                      <AlertDialogHeader className="">
                        <AlertDialogTitle className="text-xl">
                          💡 Antes de poder editar seu site...
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base mt-2">
                          Vamos precisar que você preencha alguns dados:
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="grid gap-1 sm:gap-1 pt-3 py-3">
                        <div className="flex flex-col items-start sm:grid grid-cols-4 sm:items-center gap-2 sm:gap-4">
                          <Label
                            htmlFor="name"
                            className="text-right text-base text-zinc-600"
                          >
                            Nome:
                          </Label>
                          <Input
                            id="name"
                            value={leadName}
                            required
                            onChange={e => setLeadName(e.target.value)}
                            // defaultValue="Pedro Duarte"
                            placeholder="Ex.: Pedro Paulo"
                            className="col-span-3 placeholder:text-zinc-400 text-base rounded-full bg-zinc-100 !border-b-2  text-zinc-800 font-medium "
                          />
                        </div>
                        <div className="flex mt-2 sm:mt-0 flex-col items-start sm:grid grid-cols-4 sm:items-center gap-2 sm:gap-4">
                          <Label
                            htmlFor="email"
                            className="text-right text-base text-zinc-600"
                          >
                            Email:
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={leadEmail}
                            onChange={e => setLeadEmail(e.target.value)}
                            // defaultValue="Pedro Duarte"
                            placeholder="Ex.: pedro@email.com"
                            className="col-span-3 text-base placeholder:text-zinc-400 rounded-full bg-zinc-100 !border-b-2  text-zinc-800 font-medium "
                          />
                        </div>
                        <div className="flex mt-2 sm:mt-0 flex-col items-start sm:grid grid-cols-4 sm:items-center gap-2 sm:gap-4">
                          <Label
                            htmlFor="niche"
                            className="text-right text-base text-zinc-600"
                          >
                            Ramo:
                          </Label>
                          <Input
                            id="niche"
                            // defaultValue="Pedro Duarte"
                            value={leadNiche}
                            required
                            onChange={e => setLeadNiche(e.target.value)}
                            placeholder="Ex.: Barbearia"
                            className="col-span-3 text-base placeholder:text-zinc-400 rounded-full bg-zinc-100 !border-b-2  text-zinc-800 font-medium "
                          />
                        </div>

                        {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="email"
                          className="text-right text-zinc-600"
                        >
                          Email:
                        </Label>
                        <Input
                          id="email"
                          // defaultValue="Pedro Duarte"
                          placeholder="Ex.: pedro@email.com"
                          className="col-span-3  bg-zinc-100 rounded-full !border-b-2  text-zinc-800 font-medium "
                        />
                      </div> */}
                      </div>
                      <AlertDialogFooter className="!flex !flex-col mt-2 sm:!mt-2">
                        {/* <Button type="submit">Save changes</Button> */}
                        <AlertDialogAction
                          // onClick={() => alert('a')}
                          asChild
                          disabled={
                            !leadName ||
                            !leadEmail ||
                            !leadNiche ||
                            !leadEmail.includes('@')
                          }
                          className="cursor-pointer sm:w-full text-base transition-colors hover:transition-all  hover:bg-blue-600 hover:text-white pop-up-regenerate !mx-0 text-zinc-100 h-[50px] min-w-[150px] justify-center sm:justify-end flex items-center  rounded-full  p-4   bg-blue-500"
                        >
                          <button
                            // href={'/planos'}
                            // target="_blank"
                            type="submit"
                            className=""
                          >
                            {/* <FaPencilAlt /> */}
                            {/* <RiRobot2Fill className="" /> */}

                            <span className="hidden sm:inline-block font-bold">
                              Continuar para edição{' '}
                              <FaArrowRight className="inline-block ml-3 " />{' '}
                            </span>

                            <span className="inline-block text-center sm:hidden font-bold">
                              Continuar
                              <FaArrowRight className="inline-block ml-3 " />{' '}
                            </span>
                          </button>
                        </AlertDialogAction>
                        <AlertDialogCancel className="cursor-pointer  !mx-0 text-base  transition-colors hover:transition-all  hover:bg-zinc-950 hover:text-white pop-up-regenerate text-zinc-100 h-[50px] min-w-[150px] justify-center sm:justify-end flex items-center  rounded-full  p-4   bg-zinc-800">
                          <div
                            // href={'/planos'}
                            // target="_blank"
                            className=""
                          >
                            {/* <FaPencilAlt /> */}
                            {/* <RiRobot2Fill className="" /> */}

                            {/* <span className="hidden sm:inline-block font-bold">
                            Continuar para edição{' '}
                            <FaArrowRight className="inline-block ml-3 " />{' '}
                          </span> */}

                            <span className="inline-block text-center  font-bold">
                              Agora não
                            </span>
                          </div>
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <>
                  <Link
                    // onClick={async () => await router.push()}
                    href={painelUrl}
                    asChild
                  >
                    <div
                      // href={'/planos'}
                      // target="_blank"
                      className="cursor-pointer transition-colors hover:transition-all hover:bottom-6 hover:bg-slate-800 hover:text-white pop-up-regenerate text-slate-800 h-[50px] min-w-[150px] flex items-center shadow-slate-800 shadow-2xl  rounded-full  p-4   bg-zinc-100"
                    >
                      <FaPencilAlt />
                      {/* <RiRobot2Fill className="" /> */}

                      <span className="ml-3  font-bold">Editar</span>
                    </div>
                  </Link>

                  {/* <Link
                  href={'/planos'}
                  target="_blank"
                  className="cursor-pointer transition-colors hover:transition-all hover:bottom-6 hover:bg-slate-800 hover:text-white pop-up-regenerate text-slate-800 h-[50px] min-w-[150px] flex items-center shadow-slate-800 shadow-2xl  rounded-full  p-4   bg-zinc-100"
                >
                  <FaPencilAlt />
                  {/* <RiRobot2Fill className="" /> 

                  <span className="ml-3  font-bold">Editar</span>
                </Link> 
                */}
                </>
              )}
            </div>
          )}

          {!noHeader && (
            <Header
              layout={header}
              transparent={transparent}
              ExpiresIn={ExpiresIn}
              invert={invert}
              Data={headerData}
              noLinks={noLinks}
              extraClass={extraClass}
            />
          )}

          <div id="swupMain" className="mil-main-transition">
            <div id="smooth-content" className="mil-content">
              {children}
            </div>
          </div>

          {!noFooter && (
            <Footer
              Data={footerData}
              layout={footer}
              bg={footerBg}
              instagram={footerInst}
            />
          )}
        </>
      )}
    </div>
  );
};
export default Layouts;
