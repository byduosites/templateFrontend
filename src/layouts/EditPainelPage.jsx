import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Textarea } from '@components/ui/textarea';

import { Label } from '@components/ui/label';
import { Badge } from '@components/ui/badge';
import { ScrollArea } from '@components/ui/scroll-area';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { Switch } from '@components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Loader2 } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';

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

import {
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaRocket,
  FaLightbulb,
  FaExchangeAlt,
  FaPencilAlt,
  FaCheck,
} from 'react-icons/fa';

import {
  formatDistance,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatRelative,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { FaClock } from 'react-icons/fa';

import { IoFlashSharp } from 'react-icons/io5';

import api from '../lib/api';
import Link from 'next/link';
import Head from 'next/head';
import Layouts from './Layouts';

const ImageUplaodButton = ({
  imagePreview,
  oldImage,
  imageFile,
  setImagePreview,
  setImageFile,
  data,
  term,
  onChangeFile,
  handleFromLibrary,
  id,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [searching, setSearching] = useState(false);

  const [currentPreview, setCurrentPreview] = useState(oldImage);

  const [currentPage, setCurrentPage] = useState(1);

  const [results, setResults] = useState([]);

  const [noSearchResults, setNoSearchResults] = useState(false);
  const [noMoreResults, setNoMoreResults] = useState(false);

  async function handleSearchImage(e) {
    e.preventDefault();
    try {
      const responseResult = await getImagesByPage(currentPage);

      if (responseResult) {
        if (responseResult.photos.length === 0) {
          setNoSearchResults(true);
          // setNoMoreResults(true)
        } else {
          setNoSearchResults(false);
          setNoMoreResults(false);
          setResults(responseResult.photos);
        }
      }
      // setResults();
    } catch (err) {
      console.log(err);
    }
  }

  async function getImagesByPage(page) {
    try {
      setSearching(true);
      const response = await api.get(
        `/images-search?search=${searchTerm}&page=${page}&limit=10`
      );

      setSearching(false);

      console.log(response.data);
      return response.data;
    } catch (err) {
      setSearching(false);
      console.log(err);
    }
  }

  return (
    <>
      {imagePreview ? (
        <div className="h-[120px] my-4 ">
          <img alt="logo" className="h-full  rounded-md" src={imagePreview} />
        </div>
      ) : (
        currentPreview && (
          <div className="h-[120px] my-4 ">
            <img
              alt="logo"
              className="h-full  rounded-md"
              src={currentPreview}
            />
          </div>
        )
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="block mt-2 cursor-pointer">
            {/* <Label className="text-base " htmlFor="file"> */}
            Selecionar Imagem
            {/* </Label> */}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="dark">
          <ScrollArea className={`dark max-h-[500px] w-full`}>
            <div className="grid w-full ">
              <div className="space-y-2">
                <h4 className="font-medium text-white text-xl leading-none">
                  Selecionar Imagem
                </h4>

                <p className="text-base text-muted-foreground">
                  Escolha uma imagem da biblioteca ou envie uma própria
                </p>
              </div>

              <Tabs
                defaultValue="upload"
                orientation="vertical"
                className="w-full mt-4 focus-visible:outline-none !outline-none !border-none focus-visible:border-none"
              >
                <TabsList
                  id="tab-list"
                  className="flex flex-col mb-3 lg:block !h-auto lg:h-auto"
                >
                  <TabsTrigger className="w-1/2 inline-flex" value="upload">
                    Enviar da galeria
                  </TabsTrigger>
                  <TabsTrigger className="w-1/2 inline-flex" value="pexels">
                    Imagens com I.A.
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pexels">
                  <Label
                    className="text-base text-zinc-300"
                    htmlFor="pexels-search"
                  >
                    Pesquisar
                  </Label>
                  <form onSubmit={handleSearchImage}>
                    <Input
                      className="mt-2 text-base text-white focus:!ring-transparent !ring-0 !outline-none focus-within:!outline-none focus:!outline-none "
                      value={searchTerm}
                      required
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Ex.: Barbearia"
                      id="pexels-search"
                    />

                    <Button
                      type="submit"
                      disabled={searching}
                      className="inline-block mt-4 w-full text-sm cursor-pointer  hover:!bg-blue-500 text-white !bg-blue-600"
                    >
                      {searching ? (
                        <>
                          {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                          Buscando...
                        </>
                      ) : (
                        <>Buscar</>
                      )}
                    </Button>
                  </form>

                  <div className="result  ">
                    {searching && (
                      <Loader2 className="mx-auto mt-4 text-center h-6 w-6 animate-spin" />
                    )}

                    {noSearchResults ? (
                      <>
                        <p className="text-sm mt-4 text-zinc-400">
                          Nenhum resultado encontrado, altere sua busca e tente
                          novamente
                        </p>
                      </>
                    ) : (
                      <>
                        <>
                          {results.map(image => {
                            return (
                              <AlertDialogCancel asChild>
                                <div
                                  style={{
                                    backgroundImage: `url(${image.src.medium})`,
                                  }}
                                  onClick={() => {
                                    // alert();

                                    handleFromLibrary(image.src.large);

                                    // setImageFile(null);
                                    // setImagePreview(image.src.large);
                                    // data[term] = image.src.large;
                                    // setCurrentPreview(image.src.large);
                                  }}
                                  className={`w-full cursor-pointer h-[150px] bg-no-repeat bg-cover  rounded-md mt-4  `}
                                >
                                  <div className="control w-full h-full hover:!opacity-1 opacity-0 ">
                                    Selecionar
                                  </div>
                                </div>
                              </AlertDialogCancel>
                            );
                          })}

                          {noMoreResults ? <></> : <></>}
                        </>
                      </>
                    )}
                  </div>
                  <AlertDialogCancel asChild>
                    <Button
                      type="submit"
                      className="inline-block mt-3 w-full text-sm cursor-pointer hover:!text-black hover:!bg-slate-300 text-black !bg-slate-100"
                    >
                      Pronto
                    </Button>
                  </AlertDialogCancel>
                </TabsContent>
                <TabsContent value="upload">
                  <Label className="text-base text-zinc-300">
                    
                    {imageFile ? (<>Imagem selecionada: <strong className='text-white'>{imageFile.name}</strong></>) : "Enviar imagem"}
                  </Label>

                  <Button asChild className="block mt-2 cursor-pointer">
                    <Label className="text-base !pl-4" htmlFor={id}>
                      {imageFile ? (<>
                        <FaExchangeAlt className='inline-block mr-2' />
                        Trocar
                      </>
                        ) : "Selecionar Imagem"}
                    </Label>
                  </Button>
                  <Input
                    type="file"
                    className="mt-2 text-base hidden"
                    placeholder="Ex.: Ebook X"
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        onChangeFile(e.target.files[0]);

                        // console.log(e.target.files[0]);
                        // setImageFile(e.target.files[0]);
                        // setImagePreview(
                        //   URL.createObjectURL(e.target.files[0])
                        // );
                      }
                    }}
                    id={id}
                  />
                  <AlertDialogCancel asChild>
                    <Button
                      type="submit"
                      className="inline-block mt-3 w-full text-sm cursor-pointer hover:!bg-blue-500 text-white !bg-blue-600"
                    >
                      Pronto
                    </Button>
                  </AlertDialogCancel>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>

      {/* <Popover open modal={false}>
        <PopoverTrigger asChild>
        
        </PopoverTrigger>
        <PopoverContent className="dark !overflow-y-scroll mt-3">
         
        </PopoverContent>
      </Popover> */}

      <small className="text-base font-medium block mt-2">
        {imageFile ? imageFile.name : 'Selecione um arquivo'}
      </small>
    </>
  );
};

const EditPainelPage = ({
  data,
  slug: initialSlug,
  pageId,
  token,
  ExpiresIn,
  published,
}) => {
  const [savedSlug, setSavedSlug] = useState(initialSlug);
  const [slug, setSlug] = useState(savedSlug);
  const [name, setName] = useState(data.name);
  const [headline, setHeadline] = useState(data.headline);
  const [subhero, setSubHero] = useState(data.sub_hero);

  const [history, setHistory] = useState(data.history);
  const [cta, setCta] = useState(data.cta);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [bgImage, setBgImage] = useState(null);
  const [bgImagePreview, setBgImagePreview] = useState(data.bg_image);

  const [networks, setNetworks] = useState(data.networks);

  const [showInstagram, setShowInstagram] = useState(
    networks.instagram ? true : false
  );
  const [showYoutube, setShowYoutube] = useState(
    networks.youtube ? true : false
  );
  const [showFacebook, setShowFacebook] = useState(
    networks.facebook ? true : false
  );
  const [showLinkedin, setShowLinkedin] = useState(
    networks.linkedin ? true : false
  );
  const [showWhatsapp, setShowWhatsapp] = useState(
    networks.whatsapp ? true : false
  );
  const [showEmail, setShowEmail] = useState(networks.email ? true : false);

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(data.main_image);

  const [aboutFile1, setAboutFile1] = useState(null);
  const [aboutImagePreview1, setAboutImagePreview1] = useState(
    data.history.image_1
  );

  const [aboutFile2, setAboutFile2] = useState(null);
  const [aboutImagePreview2, setAboutImagePreview2] = useState(
    data.history.image_2
  );

  const [template, setSelectedTemplate] = useState(data.template);

  const [middleAreas, setMiddleAreas] = useState(data.middle_areas);

  const [pricing, setPricing] = useState(data.pricing);

  const [whatWeDo, setWhatWeDo] = useState(data.what_we_do);

  const [testimonials, setTestimonials] = useState(data.testimonials);

  const [faq, setFaq] = useState(data.faq);

  const [loading, setLoading] = useState(false);

  const [enableUpdate, setEnableUpdate] = useState(true);

  const [allowedSlug, setAllowedSlug] = useState(true);

  const [timer, setTimer] = useState(null);

  const [slugLoading, setSlugLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState('info');

  const [tabsOrder] = useState([
    ...['info', 'headline', 'history'],
    ...middleAreas.map((area, index) => `extra-${index + 1}`),
    ...['what_we_do', 'pricing', 'testimonials', 'faq'],
  ]);

  async function isSlugAllowed() {
    try {
      if (slug !== savedSlug) {
        setSlugLoading(true);
        setEnableUpdate(false);
        const res = await api.get(`/check-slug/${slug}`);

        if (res.data) {
          const allowed = res.data.allowed;
          console.log('allowed', allowed);

          if (allowed) {
            setAllowedSlug(true);
            setEnableUpdate(true);
          } else {
            setAllowedSlug(false);
            setEnableUpdate(false);
          }

          setSlugLoading(false);

          return allowed;
        } else {
          return false;
        }
      } else {
        setAllowedSlug(true);
        setEnableUpdate(true);
        setSlugLoading(false);
      }
    } catch (err) {
      console.log(err);
      setAllowedSlug(false);
      setSlugLoading(false);
      return false;
    }
  }

  const tabListRef = useRef(null);

  const handleScrollTo = ref => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [iframeKey, setIframeKey] = useState(0)


  useEffect(() => {
    // Limpar o timeout anterior
    if (timer) {
      clearTimeout(timer);
    }

    // Definir um novo timeout
    const newTimer = setTimeout(async () => {
      await isSlugAllowed();
    }, 2000); // 2000 milissegundos = 2 segundos

    setTimer(newTimer);

    // Limpeza do useEffect
    return () => {
      if (newTimer) {
        clearTimeout(newTimer);
      }
    };
  }, [slug]); // Dependência: username

  async function handleUpdate() {
    try {
      setLoading(true);

      let payload = {
        ...data,
      };

      payload.name = name;
      payload.template = template;

      payload.headline = headline;
      payload.sub_hero = subhero;

      payload.cta = cta;
      payload.slug = slug;

      payload.pricing = pricing;

      payload.history = history;
      payload.testimonials = testimonials;
      payload.faq = faq;
      payload.networks = networks;

      if (!showEmail) {
        delete payload.networks.email;
      }
      // if (!showWhatsapp) {
      //   delete payload.networks.whatsapp;
      // }
      if (!showInstagram) {
        delete payload.networks.instagram;
      }
      if (!showFacebook) {
        delete payload.networks.facebook;
      }
      if (!showYoutube) {
        delete payload.networks.youtube;
      }
      if (!showLinkedin) {
        delete payload.networks.linkedin;
      }

      // parse all files

      if (bgImage) {
        payload.bg_image = await uploadImage(bgImage);
      }
      if (mainImage) {
        payload.main_image = await uploadImage(mainImage);
      }

      if (logoFile) {
        payload.logo = await uploadImage(logoFile);
      }

      if (aboutFile1) {
        payload.history.image_1 = await uploadImage(aboutFile1);
      }

      if (aboutFile2) {
        payload.history.image_2 = await uploadImage(aboutFile2);
      }

      payload.middle_areas = [...middleAreas];

      for (let i = 0; i < payload.middle_areas.length; i++) {
        let currentSection = payload.middle_areas[i];

        if (currentSection.bgImageFile) {
          currentSection.bg_image = await uploadImage(
            currentSection.bgImageFile
          );
        }

        if (currentSection.imageFile) {
          currentSection.image = await uploadImage(currentSection.imageFile);
        }

        delete currentSection?.imagePreview;
        delete currentSection?.bgImagePreview;
      }

      payload.what_we_do = { ...whatWeDo };
      delete payload.what_we_do.imagePreview;

      if (payload.what_we_do.imageFile) {
        payload.what_we_do.image = await uploadImage(
          payload.what_we_do.imageFile
        );
      }

      payload.testimonials = [...testimonials];

      for (let i = 0; i < payload.testimonials.length; i++) {
        let currentSection = payload.testimonials[i];

        if (currentSection.imageFile) {
          currentSection.profile = await uploadImage(currentSection.imageFile);
        }

        delete currentSection?.imagePreview;
      }

      async function uploadImage(fileItem) {
        if (fileItem) {
          // make upload
          const formData = new FormData();

          // Adiciona os arquivos ao objeto FormData

          formData.append('file', fileItem);

          // Adiciona o tipo ao objeto FormData
          try {
            const res = await api.post(`/pages/${pageId}/upload`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            // console.log(res.data);
            const newImageUlr = res.data[0].url;
            return newImageUlr;
          } catch (err) {
            console.log(err);
          }
        }
      }

      // upload images

      console.log(payload);

      const res = await api.put(`/pages/edit/${pageId}`, {
        token: token,
        slug: savedSlug,
        data: {
          slug: slug,
          ...payload,
        },
      });

      if (res.data.changedSlug && res.data.newSlug) {
        setSavedSlug(res.data.newSlug);
        // setSlug(res.data.newSlug);
      }

      // get image links
      // upload in backend
      setIframeKey(old => old +1)
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  // tab-list
  const NextAreaButton = () => {
    return (
      <>
        <div className="flex flex-wrap justify-start sm:justify-end gap-4  mt-[50px] ">
          <Button
            asChild
            style={{
              display:
                tabsOrder.indexOf(currentTab) === 0 ? 'none' : 'flex',
            }}
            onClick={() => {
              const currentIndex = tabsOrder.indexOf(currentTab);

              const newIndex = currentIndex - 1;
              const newTab = tabsOrder[newIndex];

              setCurrentTab(newTab);

              handleScrollTo(tabListRef);
            }}
            className="inline-block cursor-pointer  hover:!bg-slate-700 text-white !bg-slate-600"
          >
            <Label className=" " htmlFor="main_image">
              Seção Anterior
            </Label>
          </Button>
          <Button
            asChild
            style={{
              display:
                tabsOrder.indexOf(currentTab) + 1 === tabsOrder.length
                  ? 'none'
                  : 'flex',
            }}
            onClick={() => {
              const currentIndex = tabsOrder.indexOf(currentTab);

              const newIndex = currentIndex + 1;
              const newTab = tabsOrder[newIndex];

              setCurrentTab(newTab);

              handleScrollTo(tabListRef);
            }}
            className="inline-block  cursor-pointer  hover:!bg-blue-500 text-white !bg-blue-600"
          >
            <Label className="flex " htmlFor="main_image">
              Próxima Seção
            </Label>
          </Button>
          <Button
            asChild
            disabled={!enableUpdate || loading}
            onClick={handleUpdate}
            className="inline-block cursor-pointer  "
          >
            <Label
              className={`flex text-white ${
                !published
                  ? 'hover:bg-orange-700 !bg-orange-600'
                  : 'hover:!bg-green-700 !bg-green-600'
              }`}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar alterações
            </Label>
          </Button>
        </div>
      </>
    );
  };

  const [iframeHeight, setIframeHeight] = useState(0)


  const iframeRef = useRef()

  useEffect(() => {
    if(window) {
      setIframeHeight(window.innerHeight)
    }
  },[])

  return (
    <>
      {ExpiresIn && (
        <div className="banner fixed flex items-center font-semibold text-center justify-center text-white text-base f  h-[40px] bg-red-500 w-full z-50">
          <p className="text-center">
            <Link
              href="/planos"
              className="underline md:no-underline decoration-white "
            >
              <FaClock className="mr-2 inline-block" />
              Seu site expirará em{' '}
              {formatDistanceToNowStrict(new Date(ExpiresIn), {
                locale: ptBR,
              })}
              .&nbsp;
              <span className="decoration hidden md:inline-block decoration-white underline">
                Mantenha-o no ar.
              </span>
            </Link>
          </p>
        </div>
      )}
      <Layouts theme="theme-painel" noFooter noButtons noHeader>

              
      <div className="fixed bottom-0 right-0 z-50 sm:hidden flex text-right items-end justify-end p-[30px] flex-wrap gap-3 mt-2 ">
             
      <div
                      // href={'/planos'}
                      // target="_blank"
                      disabled={!enableUpdate || loading}
                    onClick={handleUpdate}
                      className="cursor-pointer transition-colors text-center hover:transition-all hover:bottom-6 hover:!bg-green-500 hover:text-white pop-up-regenerate text-white h-[50px] justify-center flex items-center shadow-green-800 shadow-2xl  rounded-full  p-4   !bg-green-500"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                        
                        ) :
                        
                        <FaCheck />
                      }
                      {/* <RiRobot2Fill className="" /> */}

                      <span className="ml-3  font-bold">Salvar</span>
                    </div>
                  {/* {!loading && (
                    <Button asChild>
                      <Link
                        target="_blank"
                        href={`/${String(savedSlug)}`}
                        className="flex hover:bg-blue-700 text-white !bg-blue-600"
                      >
                        
                        Ver site final <FaExternalLinkAlt className="ml-3" />
                      </Link>
                    </Button>
                  )}

                  {!loading && (
                    <Button asChild>
                      <Link
                        target="_blank"
                        href={`/${String(
                          savedSlug
                        )}?from_painel=true&edit=true&token=${String(token)}`}
                        className="flex hover:bg-blue-700 text-white !bg-blue-600"
                      >
                        
                        Ver rascunho <FaExternalLinkAlt className="ml-3" />
                      </Link>
                    </Button>
                  )} */}
{/* 
                  <Button
                    disabled={!enableUpdate || loading}
                    onClick={() => {}}
                    className="hidden hover:bg-cyan-700 text-white !bg-cyan-600"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Recarregar Imagens
                  </Button>

                  <Button
                    disabled={!enableUpdate || loading}
                    onClick={handleUpdate}
                    className={`flex text-white ${
                      !published
                        ? 'hover:bg-orange-700 !bg-orange-600'
                        : 'hover:bg-green-700 !bg-green-600'
                    }`}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Salvar alterações
                  </Button> */}
{/* 
                  {!published && (
                    <Button
                      disabled={!enableUpdate || loading}
                      // onClick={}
                      asChild
                    >
                      <Link
                        className="flex hover:bg-green-700 text-white !bg-green-600"
                        href="/planos"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <IoFlashSharp className="mr-2 h-4 w-4" />
                        )}
                        Publicar
                      </Link>
                    </Button>
                  )}
                   */}
                </div>

        <Head>
          <title>{data?.name ?? 'no-name'} - Painel de edição</title>
        </Head>
        <div className='flex justify-between'>
          
        <ScrollArea
          className={`bg-zinc-900 ${
            ExpiresIn && 'pt-[30px]'
          }  dark h-[100vh] w-full`}
        >
          <div className="container pt-[40px] lg:pt-[80px]">
            <div className="flex flex-col lg:flex-row items-start mb-4 justify-between w-full">
              <div>
                <Badge className="mb-3">ByDuo Sites Inteligentes</Badge>

                <h2 className="text-3xl font-bold  tracking-tight">
                  Painel de edição:{' '}
                  <span className="text-blue-500">{name}</span>
                </h2>
              </div>
              <div className="flex flex-col lg:mt-0 my-4 items-start lg:items-end w-100% lg:w-auto text-left lg:text-right mr-auto lg:mr-0">
                <span className="text-zinc-200 text-right">
                  <strong className="font-extrabold">Bem-vindo</strong>
                </span>

                <div className="flex flex-wrap gap-3 mt-2 items-center">
                  {!loading && (
                    <Button asChild>
                      <Link
                        target="_blank"
                        href={`/${String(savedSlug)}`}
                        className="flex hover:bg-blue-700 text-white !bg-blue-600"
                      >
                        {/* {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                        Ver site final <FaExternalLinkAlt className="ml-3" />
                      </Link>
                    </Button>
                  )}

                  {!loading && (
                    <Button asChild>
                      <Link
                        target="_blank"
                        href={`/${String(
                          savedSlug
                        )}?from_painel=true&edit=true&token=${String(token)}`}
                        className="flex hover:bg-blue-700 text-white !bg-blue-600"
                      >
                        {/* {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
                        Ver rascunho <FaExternalLinkAlt className="ml-3" />
                      </Link>
                    </Button>
                  )}

                  <Button
                    disabled={!enableUpdate || loading}
                    onClick={() => {}}
                    className="hidden hover:bg-cyan-700 text-white !bg-cyan-600"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Recarregar Imagens
                  </Button>

                  <Button
                    disabled={!enableUpdate || loading}
                    onClick={handleUpdate}
                    className={`flex text-white ${
                      !published
                        ? 'hover:bg-orange-700 !bg-orange-600'
                        : 'hover:bg-green-700 !bg-green-600'
                    }`}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Salvar alterações
                  </Button>

                  {!published && (
                    <Button
                      disabled={!enableUpdate || loading}
                      // onClick={}
                      asChild
                    >
                      <Link
                        className="flex hover:bg-green-700 text-white !bg-green-600"
                        href="/planos"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <IoFlashSharp className="mr-2 h-4 w-4" />
                        )}
                        Publicar
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Tabs
              defaultValue={currentTab}
              value={currentTab}
              onValueChange={e => setCurrentTab(e)}
              orientation="vertical"
              className="w-full lg:w-[80%] pb-[200px] focus-visible:outline-none !outline-none !border-none focus-visible:border-none"
            >
              <TabsList
                id="tab-list"
                ref={tabListRef}
                className="flex flex-col w-full lg:block !h-auto lg:h-auto"
              >
                <TabsTrigger className="w-full lg:w-auto" value="info">
                  Dados principais
                </TabsTrigger>
                <TabsTrigger className="w-full lg:w-auto" value="headline">
                  Topo
                </TabsTrigger>
                <TabsTrigger className="w-full lg:w-auto" value="history">
                  Seção Sobre Nós
                </TabsTrigger>
                {middleAreas.map((area, index) => (
                  <TabsTrigger
                    className="w-full lg:w-auto"
                    value={`extra-${index + 1}`}
                  >
                    Area {index + 1}:{' '}
                    {area.type == 'topics' ? 'Tópicos' : 'Texto + Imagem'}
                  </TabsTrigger>
                ))}
                <TabsTrigger className="w-full lg:w-auto" value="what_we_do">
                  O que fazemos
                </TabsTrigger>
                <TabsTrigger className="w-full lg:w-auto" value="pricing">
                  Preços
                </TabsTrigger>
                <TabsTrigger className="w-full lg:w-auto" value="testimonials">
                  Depoimentos
                </TabsTrigger>
                <TabsTrigger className="w-full lg:w-auto" value="faq">
                  FAQ
                </TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="mt-[50px]">
                  <h2 className="text-2xl font-normal mb-3 tracking-tight">
                    Opções
                  </h2>

                  <div className="mt-4">
                    <div className="flex justify-between items-center">
                      <Label
                        className="text-base  text-zinc-300"
                        htmlFor="about"
                      >
                        Link:
                      </Label>
                      {slugLoading ? (
                        <div className="flex items-center text-yellow-500">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <small>Verificando</small>
                        </div>
                      ) : allowedSlug ? (
                        <div className="flex items-center text-green-500">
                          <FaCheckCircle className="mr-2  h-4 w-4" />
                          <small>Disponível</small>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <FaTimesCircle className="mr-2  h-4 w-4" />
                          <small>Não disponível</small>
                        </div>
                      )}
                    </div>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: Ebook X"
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                      id="about"
                    />
                    <small
                      className="text-base font-medium block mt-2"
                      htmlFor="about"
                      style={{
                        overflowWrap: "anywhere"
                      }}
                    >
                      https://sites.byduo.com.br/<strong>{slug}</strong>
                    </small>
                  </div>
                </div>

                <div className="mt-5 ">
                  <h2 className="text-2xl font-medium mb-3 tracking-tight">
                    Estilo
                  </h2>
                  <div>
                    <Label className="text-base text-zinc-300" htmlFor="name">
                      Tema:
                    </Label>
                    <RadioGroup
                      // defaultValue={template}
                      value={template}
                      onValueChange={v => setSelectedTemplate(v)}
                      className="mt-2 text-zinc-200 "
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="theme-default"
                          id="theme-default"
                        />
                        <Label htmlFor="theme-default">Tema Padrão</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="theme-b" id="theme-b" />
                        <Label htmlFor="theme-b">Tema Verde + Laranja</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="theme-a" id="theme-a" />
                        <Label htmlFor="theme-a">Tema Azul 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="theme-blue" id="theme-blue" />
                        <Label htmlFor="theme-blue">Tema Azul 2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="theme-black" id="theme-black" />
                        <Label htmlFor="theme-black">Tema Preto</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="theme-black-red"
                          id="theme-black-red"
                        />
                        <Label htmlFor="theme-black-red">
                          Tema Preto + Vermelho
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className='sm:hidden w-full  h-[700px] my-5 bg-red '>
                        <iframe scrolling="no" key={iframeKey} ref={iframeRef}  src={`/${String(savedSlug)}`} className='overflow-y-hidden bg-zinc-700 border-2 border-white !rounded-[20px] w-full ' height={700}></iframe>
                      </div>

                  <div className="mt-4">
                    <Label className="text-base text-zinc-300" htmlFor="name">
                      Nome do negócio/produto:
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ex.: Ebook X"
                      id="name"
                    />
                  </div>

                  <div className="mt-4">
                    <Label className="text-base text-zinc-300 ">Logo:</Label>

                    <ImageUplaodButton
                      imageFile={logoFile}
                      oldImage={data?.logo}
                      imagePreview={logoPreview}
                      id="logo-file"
                      onChangeFile={file => {
                        setLogoFile(file);
                        setLogoPreview(URL.createObjectURL(file));
                      }}
                      handleFromLibrary={url => {
                        setLogoFile(null);
                        setLogoPreview(url);
                        data.logo = url;
                      }}
                    />

                    {/* {logoPreview ? (
                      <div className="h-[120px] my-4 ">
                        <img
                          alt="logo"
                          className="h-full  rounded-md"
                          src={logoPreview}
                        />
                      </div>
                    ) : (
                       && (
                        <div className="h-[120px] my-4 ">
                          <img
                            alt="logo"
                            className="h-full  rounded-md"
                            src={data?.logo}
                          />
                        </div>
                      )
                    )}
                    <Button asChild className="block mt-2 cursor-pointer">
                      <Label className="text-base " htmlFor="file">
                        Selecionar arquivo (.png)
                      </Label>
                    </Button>
                    <Input
                      type="file"
                      className="mt-2 text-base hidden"
                      placeholder="Ex.: Ebook X"
                      accept="image/png"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          console.log(e.target.files[0]);
                          setLogoFile(e.target.files[0]);
                          setLogoPreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      id="file"
                    />
                    <small className="text-base font-medium block mt-2">
                      {logoFile ? logoFile.name : 'Selecione um arquivo'}
                    </small> */}
                  </div>

                  <div className="mt-[50px]">
                    <h2 className="text-2xl font-normal mb-3 tracking-tight">
                      Destino da página (CTA)
                    </h2>
                    <div>
                      <Label
                        className="text-base text-zinc-300"
                        htmlFor="cta-label"
                      >
                        Texto no botão
                      </Label>
                      <Input
                        className="mt-2 text-base"
                        value={cta.label}
                        onChange={e =>
                          setCta(old => ({ ...old, label: e.target.value }))
                        }
                        placeholder="Ex.: Entre em contato"
                        id="cta-label"
                      />
                    </div>
                    <div className="mt-4">
                      <Label
                        className="text-base text-zinc-300"
                        htmlFor="cta-link"
                      >
                        Link de destino
                      </Label>
                      <Input
                        className="mt-2 text-base"
                        value={cta.url}
                        onChange={e =>
                          setCta(old => ({ ...old, url: e.target.value }))
                        }
                        placeholder="Ex.: Link de pagamento do produto"
                        id="cta-link"
                      />
                    </div>
                  </div>

                  <div className="mt-[50px]">
                    <h2 className="text-2xl font-normal mb-3 tracking-tight">
                      Contato
                    </h2>
                    <div>
                      <div className="flex flex-wrap flex-col sm:flex-row gap-y-3 mb-4 sm:!mb-0 justify-between">
                        <Label
                          className="text-base text-zinc-300"
                          htmlFor="net-insta"
                        >
                          Instagram (link para o perfil)
                        </Label>
                        <div className="flex items-center">
                          <Switch
                            checked={showInstagram}
                            onCheckedChange={e => setShowInstagram(e)}
                            id="active-insta"
                          />
                          <Label htmlFor="active-insta" className="ml-4">
                            Exibir
                          </Label>
                        </div>
                      </div>
                      <Input
                        className="mt-2 text-base"
                        disabled={!showInstagram}
                        value={networks.instagram}
                        onChange={e =>
                          setNetworks(old => ({
                            ...old,
                            instagram: e.target.value,
                          }))
                        }
                        placeholder="Ex.: https://instagram.com..."
                        id="net-insta"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap flex-col sm:flex-row gap-y-3 mb-4 sm:!mb-0 justify-between">
                        <Label
                          className="text-base text-zinc-300"
                          htmlFor="net-yt"
                        >
                          Youtube (link para o canal)
                        </Label>
                        <div className="flex items-center">
                          <Switch
                            checked={showYoutube}
                            onCheckedChange={e => setShowYoutube(e)}
                            id="active-yt"
                          />
                          <Label htmlFor="active-yt" className="ml-4">
                            Exibir
                          </Label>
                        </div>
                      </div>

                      <Input
                        className="mt-2 text-base"
                        disabled={!showYoutube}
                        value={networks.youtube}
                        onChange={e =>
                          setNetworks(old => ({
                            ...old,
                            youtube: e.target.value,
                          }))
                        }
                        placeholder="Ex.: https://youtube.com..."
                        id="net-yt"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap flex-col sm:flex-row gap-y-3 mb-4 sm:!mb-0 justify-between">
                        <Label
                          className="text-base text-zinc-300"
                          htmlFor="net-fb"
                        >
                          Facebook (link para o perfil)
                        </Label>
                        <div className="flex items-center">
                          <Switch
                            checked={showFacebook}
                            onCheckedChange={e => setShowFacebook(e)}
                            id="active-fb"
                          />
                          <Label htmlFor="active-fb" className="ml-4">
                            Exibir
                          </Label>
                        </div>
                      </div>

                      <Input
                        className="mt-2 text-base"
                        value={networks.facebook}
                        disabled={!showFacebook}
                        onChange={e =>
                          setNetworks(old => ({
                            ...old,
                            facebook: e.target.value,
                          }))
                        }
                        placeholder="Ex.: https://facebook.com..."
                        id="net-fb"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap flex-col sm:flex-row gap-y-3 mb-4 sm:!mb-0 justify-between">
                        <Label
                          className="text-base text-zinc-300"
                          htmlFor="net-link"
                        >
                          Linkedin (link para o perfil)
                        </Label>
                        <div className="flex items-center">
                          <Switch
                            checked={showLinkedin}
                            onCheckedChange={e => setShowLinkedin(e)}
                            id="active-lk"
                          />
                          <Label htmlFor="active-lk" className="ml-4">
                            Exibir
                          </Label>
                        </div>
                      </div>

                      <Input
                        className="mt-2 text-base"
                        value={networks.linkedin}
                        disabled={!showLinkedin}
                        onChange={e =>
                          setNetworks(old => ({
                            ...old,
                            linkedin: e.target.value,
                          }))
                        }
                        placeholder="Ex.: https://linkedin.com..."
                        id="net-link"
                      />
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap flex-col sm:flex-row gap-y-3 mb-4 sm:!mb-0 justify-between">
                        <Label
                          className="text-base text-zinc-300"
                          htmlFor="net-email"
                        >
                          Email
                        </Label>
                        <div className="flex items-center">
                          <Switch
                            checked={showEmail}
                            onCheckedChange={e => setShowEmail(e)}
                            id="active-email"
                          />
                          <Label htmlFor="active-email" className="ml-4">
                            Exibir
                          </Label>
                        </div>
                      </div>

                      <Input
                        className="mt-2 text-base"
                        disabled={!showEmail}
                        value={networks.email}
                        onChange={e =>
                          setNetworks(old => ({
                            ...old,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Ex.: contato-da-loja@gmail.com"
                        id="net-email"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex  justify-between">
                        <Label
                          className="text-base text-zinc-300"
                          htmlFor="net-wpp"
                        >
                          Whatsapp (apenas o número)
                        </Label>
                        <div className="flex items-center">
                          {/* <Switch
                            checked={showWhatsapp}
                            onCheckedChange={e => setShowWhatsapp(e)}
                            id="active-wpp"
                          />
                          <Label htmlFor="active-wpp" className="ml-4">
                            Exibir
                          </Label> */}
                        </div>
                      </div>

                      <Input
                        className="mt-2 text-base"
                        // disabled={!showWhatsapp}
                        value={networks.whatsapp}
                        onChange={e =>
                          setNetworks(old => ({
                            ...old,
                            whatsapp: e.target.value,
                          }))
                        }
                        placeholder="Ex.: 551199999999"
                        id="net-wpp"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="headline">
                <div className="mt-5 ">
                  <h2 className="text-2xl font-medium mb-3 tracking-tight">
                    Topo
                  </h2>

                  <div>
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="headline"
                    >
                      Headline:
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Texto principal do seu site"
                      value={headline}
                      onChange={e => setHeadline(e.target.value)}
                      id="headline"
                    />
                  </div>

                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="subhero"
                    >
                      Headline secundária
                    </Label>

                    <Input
                      placeholder="O ebook fala sobre..."
                      className="mt-2 text-base "
                      value={subhero}
                      onChange={e => setSubHero(e.target.value)}
                      id="subhero"
                    />
                  </div>

                  <div className="mt-4">
                    <Label className="text-base text-zinc-300 ">
                      Imagem Principal:
                    </Label>

                    <ImageUplaodButton
                      imageFile={mainImage}
                      oldImage={data?.main_image}
                      imagePreview={mainImagePreview}
                      id="main_image"
                      onChangeFile={file => {
                        setMainImage(file);
                        setMainImagePreview(URL.createObjectURL(file));
                      }}
                      handleFromLibrary={url => {
                        setMainImage(null);
                        setMainImagePreview(url);

                        data.main_image = url;
                      }}
                    />

                    {/* {mainImagePreview && (
                      <div className="h-[120px] my-4 ">
                        <img
                          alt="logo"
                          className="h-full  rounded-md"
                          src={mainImagePreview}
                        />
                      </div>
                    )}
                    <Button asChild className="block mt-2 cursor-pointer">
                      <Label className="text-base " htmlFor="main_image">
                        Selecionar imagem
                      </Label>
                    </Button>
                    <Input
                      type="file"
                      className="mt-2 text-base hidden"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                         
                        }
                      }}
                      id="main_image"
                    />
                    <small className="text-base font-medium block mt-2">
                      {mainImage ? mainImage.name : 'Selecione um arquivo'}
                    </small> */}
                  </div>
                  <div className="mt-4">
                    <Label className="text-base text-zinc-300 ">
                      Imagem De Fundo:
                    </Label>

                    <ImageUplaodButton
                      imageFile={bgImage}
                      oldImage={data?.bg_image}
                      imagePreview={bgImagePreview}
                      id="bg_image"
                      onChangeFile={file => {
                        setBgImage(file);
                        setBgImagePreview(URL.createObjectURL(file));
                      }}
                      handleFromLibrary={url => {
                        setBgImage(null);
                        setBgImagePreview(url);

                        data.bg_image = url;
                      }}
                    />

                    {/* {bgImagePreview && (
                      <div className="h-[120px] my-4 ">
                        <img
                          alt="logo"
                          className="h-full  rounded-md"
                          src={bgImagePreview}
                        />
                      </div>
                    )}
                    <Button asChild className="block mt-2 cursor-pointer">
                      <Label className="text-base " htmlFor="bg_image">
                        Selecionar imagem
                      </Label>
                    </Button>
                    <Input
                      type="file"
                      className="mt-2 text-base hidden"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          console.log(e.target.files[0]);
                          setBgImage(e.target.files[0]);
                          setBgImagePreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      id="bg_image"
                    />
                    <small className="text-base font-medium block mt-2">
                      {bgImage ? bgImage.name : 'Selecione um arquivo'}
                    </small> */}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history">
                <div className="mt-5 ">
                  <h2 className="text-2xl font-medium mb-3 tracking-tight">
                    Sobre nós
                  </h2>

                  <div>
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="about-title"
                    >
                      Título:
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: Ebook X"
                      value={history.title}
                      onChange={e =>
                        setHistory(old => ({ ...old, title: e.target.value }))
                      }
                      id="about-title"
                    />
                  </div>

                  <div className="mt-4">
                    <Label className="text-base  text-zinc-300" htmlFor="about">
                      Conteúdo
                    </Label>

                    <Textarea
                      placeholder="O ebook fala sobre..."
                      className="mt-2 text-base !resize-y min-h-[300px]"
                      value={history.content}
                      onChange={e =>
                        setHistory(old => ({ ...old, content: e.target.value }))
                      }
                      id="about"
                    />
                  </div>

                  <div className="mt-4">
                    <Label className="text-base text-zinc-300 ">
                      Imagem 1:
                    </Label>

                    <ImageUplaodButton
                      imageFile={aboutFile1}
                      oldImage={data?.history?.image_1}
                      imagePreview={aboutImagePreview1}
                      id="history_image_1"
                      onChangeFile={file => {
                        setAboutFile1(file);
                        setAboutImagePreview1(URL.createObjectURL(file));
                      }}
                      handleFromLibrary={url => {
                        setAboutFile1(null);
                        setAboutImagePreview1(url);

                        data.history.image_1 = url;
                      }}
                    />

                    {/* {aboutImagePreview1 && (
                      <div className="h-[120px] my-4 ">
                        <img
                          alt="logo"
                          className="h-full  rounded-md"
                          src={aboutImagePreview1}
                        />
                      </div>
                    )}
                    <Button asChild className="block mt-2 cursor-pointer">
                      <Label className="text-base " htmlFor="history_image_1">
                        Selecionar imagem
                      </Label>
                    </Button>
                    <Input
                      type="file"
                      className="mt-2 text-base hidden"
                      placeholder="Ex.: Ebook X"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          console.log(e.target.files[0]);
                          setAboutFile1(e.target.files[0]);
                          setAboutImagePreview1(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      id="history_image_1"
                    />
                    <small className="text-base font-medium block mt-2">
                      {aboutFile1 ? aboutFile1.name : 'Selecione um arquivo'}
                    </small> */}
                  </div>
                  <div className="mt-4">
                    <Label className="text-base text-zinc-300 ">
                      Imagem 2:
                    </Label>

                    <ImageUplaodButton
                      imageFile={aboutFile2}
                      oldImage={data?.history?.image_2}
                      imagePreview={aboutImagePreview2}
                      id="history_image_2"
                      onChangeFile={file => {
                        setAboutFile2(file);
                        setAboutImagePreview2(URL.createObjectURL(file));
                      }}
                      handleFromLibrary={url => {
                        setAboutFile2(null);
                        setAboutImagePreview2(url);

                        data.history.image_2 = url;
                      }}
                    />

                    {/* {aboutImagePreview2 && (
                      <div className="h-[120px] my-4 ">
                        <img
                          alt="logo"
                          className="h-full  rounded-md"
                          src={aboutImagePreview2}
                        />
                      </div>
                    )}
                    <Button asChild className="block mt-2 cursor-pointer">
                      <Label className="text-base " htmlFor="history_image_2">
                        Selecionar imagem
                      </Label>
                    </Button>
                    <Input
                      type="file"
                      className="mt-2 text-base hidden"
                      placeholder="Ex.: Ebook X"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          console.log(e.target.files[0]);
                          setAboutFile2(e.target.files[0]);
                          setAboutImagePreview2(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                      id="history_image_2"
                    />
                    <small className="text-base font-medium block mt-2">
                      {aboutFile2 ? aboutFile2.name : 'Selecione um arquivo'}
                    </small> */}
                  </div>
                </div>
              </TabsContent>
              {middleAreas.map((area, index) => {
                if (area.type === 'topics') {
                  return (
                    <>
                      <TabsContent value={`extra-${index + 1}`}>
                        <div className="mt-5 ">
                          <h2 className="text-2xl font-medium mb-3 tracking-tight">
                            Tópicos
                          </h2>

                          <div className="">
                            <Label className="text-base text-zinc-300 ">
                              Imagem de fundo:
                            </Label>

                            <ImageUplaodButton
                              imageFile={logoFile}
                              oldImage={area.bg_image}
                              imagePreview={logoPreview}
                              onChangeFile={file => {
                                setMiddleAreas(old => {
                                  const selected = old[index];

                                  let past = [...old];
                                  selected.bgImageFile = file;
                                  selected.bgImagePreview =
                                    URL.createObjectURL(file);
                                  past[index] = selected;

                                  return past;
                                });
                              }}
                              handleFromLibrary={url => {
                                setMiddleAreas(old => {
                                  const selected = old[index];

                                  let past = [...old];
                                  selected.bg_image = url;
                                  selected.bgImageFile = null;
                                  selected.bgImagePreview = url;
                                  past[index] = selected;

                                  return past;
                                });
                              }}
                              id={`bg-extra-${index + 1}`}
                            />

                            {/* {area.bgImagePreview ? (
                              <div className="h-[120px] my-4 ">
                                <img
                                  alt="logo"
                                  className="h-full  rounded-md"
                                  src={area.bgImagePreview}
                                />
                              </div>
                            ) : (
                              area.bg_image && (
                                <div className="h-[120px] mt-3 mb-4 ">
                                  <img
                                    alt="logo"
                                    className="h-full  rounded-md"
                                    src={area.bg_image}
                                  />
                                </div>
                              )
                            )}
                            <Button
                              asChild
                              className="block mt-2 cursor-pointer"
                            >
                              <Label
                                className="text-base "
                                htmlFor={`bg-extra-${index + 1}`}
                              >
                                Selecionar imagem
                              </Label>
                            </Button>
                            <Input
                              type="file"
                              className="mt-2 text-base hidden"
                              placeholder="Ex.: Ebook X"
                              accept="image/*"
                              onChange={e => {}}
                            />
                            <small className="text-base font-medium block mt-2">
                              {area.bgImageFile
                                ? area.bgImageFile.name
                                : 'Selecione um arquivo'}
                            </small> */}
                          </div>

                          <div className=" block mt-5">
                            {area.topic_items.map((topic, topicIndex) => (
                              <>
                                <div className="">
                                  <h2 className="text-xl text-blue-500 font-normal mb-3 tracking-tight">
                                    • Tópico #{topicIndex + 1}
                                  </h2>
                                  <Label
                                    className="text-base  text-zinc-300"
                                    // htmlFor="about-title"
                                  >
                                    Título:
                                  </Label>
                                  <Input
                                    className="mt-2 text-base"
                                    placeholder="Ex.: Ebook X"
                                    value={area.topic_items[topicIndex].title}
                                    onChange={e =>
                                      setMiddleAreas(old => {
                                        const selected = old[index];

                                        let past = [...old];

                                        selected.topic_items[topicIndex].title =
                                          e.target.value;

                                        // selected.title = e.target.value;

                                        past[index] = selected;

                                        return past;
                                      })
                                    }
                                    // id="about-title"
                                  />
                                </div>

                                <div className="mt-4">
                                  <Label
                                    className="text-base  text-zinc-300"
                                    // htmlFor="about"
                                  >
                                    Conteúdo
                                  </Label>

                                  <Textarea
                                    placeholder="O ebook fala sobre..."
                                    className="mt-2 text-base !resize-y min-h-[150px]"
                                    value={area.topic_items[topicIndex].content}
                                    onChange={e =>
                                      setMiddleAreas(old => {
                                        const selected = old[index];

                                        let past = [...old];

                                        selected.topic_items[
                                          topicIndex
                                        ].content = e.target.value;

                                        // selected.title = e.target.value;

                                        past[index] = selected;

                                        return past;
                                      })
                                    }
                                    // id="about"
                                  />
                                </div>
                                <hr className="my-8 !text-zinc-200 !bg-zinc-200" />
                              </>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </>
                  );
                } else if (area.type == 'image-text') {
                  return (
                    <>
                      <TabsContent value={`extra-${index + 1}`}>
                        <div className="mt-5 ">
                          <h2 className="text-2xl font-medium mb-3 tracking-tight">
                            Texto + Imagem
                          </h2>

                          <div className="">
                            <Label className="text-base text-zinc-300 ">
                              Imagem:
                            </Label>

                            <ImageUplaodButton
                              imageFile={area.imageFile}
                              oldImage={area.image}
                              imagePreview={area.imagePreview}
                              onChangeFile={file => {
                                setMiddleAreas(old => {
                                  const selected = old[index];

                                  let past = [...old];
                                  selected.imageFile = file;
                                  selected.imagePreview =
                                    URL.createObjectURL(file);
                                  past[index] = selected;

                                  return past;
                                });
                              }}
                              handleFromLibrary={url => {
                                setMiddleAreas(old => {
                                  const selected = old[index];

                                  let past = [...old];
                                  selected.imageFile = null;
                                  selected.imagePreview = url;
                                  selected.image = url;
                                  past[index] = selected;

                                  return past;
                                });
                              }}
                              id={`main-img-extra-${index + 1}`}
                            />

                            {/* {area.imagePreview ? (
                              <div className="h-[120px] my-4 ">
                                <img
                                  alt="logo"
                                  className="h-full  rounded-md"
                                  src={area.imagePreview}
                                />
                              </div>
                            ) : (
                              area.image && (
                                <div className="h-[120px] mt-3 mb-4 ">
                                  <img
                                    alt="logo"
                                    className="h-full  rounded-md"
                                    src={area.image}
                                  />
                                </div>
                              )
                            )}
                            <Button
                              asChild
                              className="block mt-2 cursor-pointer"
                            >
                              <Label
                                className="text-base "
                                htmlFor={`main-img-extra-${index + 1}`}
                              >
                                Selecionar imagem
                              </Label>
                            </Button>
                            <Input
                              type="file"
                              className="mt-2 text-base hidden"
                              placeholder="Ex.: Ebook X"
                              accept="image/*"
                              onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                  console.log(e.target.files[0]);

                                  setMiddleAreas(old => {
                                    const selected = old[index];

                                    let past = [...old];
                                    selected.imageFile = e.target.files[0];
                                    selected.imagePreview = URL.createObjectURL(
                                      e.target.files[0]
                                    );
                                    past[index] = selected;

                                    return past;
                                  });
                                }
                              }}
                              id={`main-img-extra-${index + 1}`}
                            />
                            <small className="text-base font-medium block mt-2">
                              {area.imageFile
                                ? area.imageFile.name
                                : 'Selecione um arquivo'}
                            </small> */}
                          </div>

                          <div className="mt-4">
                            <Label
                              className="text-base  text-zinc-300"
                              // htmlFor="about-title"
                            >
                              Título:
                            </Label>
                            <Input
                              className="mt-2 text-base"
                              placeholder="Ex.: Ebook X"
                              value={area.title}
                              onChange={e =>
                                setMiddleAreas(old => {
                                  const selected = old[index];

                                  let past = [...old];

                                  selected.title = e.target.value;

                                  // selected.title = e.target.value;

                                  past[index] = selected;

                                  return past;
                                })
                              }
                              // id="about-title"
                            />
                          </div>

                          <div className="mt-4">
                            <Label
                              className="text-base  text-zinc-300"
                              // htmlFor="about"
                            >
                              Conteúdo
                            </Label>

                            <Textarea
                              placeholder="O ebook fala sobre..."
                              className="mt-2 text-base !resize-y min-h-[300px]"
                              value={area.content}
                              onChange={e =>
                                setMiddleAreas(old => {
                                  const selected = old[index];

                                  let past = [...old];
                                  selected.content = e.target.value;

                                  past[index] = selected;

                                  return past;
                                })
                              }
                              // id="about"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </>
                  );
                }
              })}
              <TabsContent value="what_we_do">
                <div className="mt-5 ">
                  <h2 className="text-2xl font-medium mb-3 tracking-tight">
                    O que fazemos
                  </h2>

                  <div className="">
                    <Label className="text-base text-zinc-300 ">Imagem:</Label>

                    <ImageUplaodButton
                      imageFile={whatWeDo.imageFile}
                      oldImage={whatWeDo.image}
                      imagePreview={whatWeDo.imagePreview}
                      id="wwd_image"
                      onChangeFile={file => {
                        setWhatWeDo(old => ({
                          ...old,
                          imagePreview: URL.createObjectURL(file),
                          imageFile: file,
                        }));

                        // setAboutFile2(file);
                        // setAboutImagePreview2(URL.createObjectURL(file));
                      }}
                      handleFromLibrary={url => {
                        setWhatWeDo(old => ({
                          ...old,
                          imagePreview: url,
                          image: url,
                          imageFile: null,
                        }));
                      }}
                    />

                    {/* {whatWeDo.imagePreview ? (
                      <div className="h-[120px] mt-3 mb-4 ">
                        <img
                          alt="logo"
                          className="h-full  rounded-md"
                          src={whatWeDo.imagePreview}
                        />
                      </div>
                    ) : (
                      whatWeDo.image && (
                        <div className="h-[120px] mt-3 mb-4 ">
                          <img
                            alt="logo"
                            className="h-full  rounded-md"
                            src={whatWeDo.image}
                          />
                        </div>
                      )
                    )}
                    <Button asChild className="block mt-2 cursor-pointer">
                      <Label className="text-base " htmlFor="wwd_image">
                        Selecionar imagem
                      </Label>
                    </Button>
                    <Input
                      type="file"
                      className="mt-2 text-base hidden"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          console.log(e.target.files[0]);

                          setWhatWeDo(old => ({
                            ...old,
                            imagePreview: URL.createObjectURL(
                              e.target.files[0]
                            ),
                            imageFile: e.target.files[0],
                          }));
                        }
                      }}
                      id="wwd_image"
                    />
                    <small className="text-base font-medium block mt-2">
                      {whatWeDo.imageFile
                        ? whatWeDo.imageFile.name
                        : 'Selecione um arquivo'}
                    </small> */}
                  </div>

                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="wwd-title"
                    >
                      Título:
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: Ebook X"
                      value={whatWeDo?.title}
                      onChange={e =>
                        setWhatWeDo(old => ({ ...old, title: e.target.value }))
                      }
                      id="wwd-title"
                    />
                  </div>

                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="wwd-content"
                    >
                      Conteúdo
                    </Label>

                    <Textarea
                      placeholder="O ebook fala sobre..."
                      className="mt-2 text-base !resize-y min-h-[300px]"
                      value={whatWeDo?.content}
                      onChange={e =>
                        setWhatWeDo(old => ({
                          ...old,
                          content: e.target.value,
                        }))
                      }
                      id="wwd-content"
                    />
                  </div>

                  <div className=" block mt-5">
                    {whatWeDo.social_proof.map((proof, proofIndex) => (
                      <>
                        <div className="">
                          <h2 className="text-xl text-blue-500 font-normal mb-3 tracking-tight">
                            • Prova Social {proofIndex + 1}
                          </h2>
                          <Label
                            className="text-base  text-zinc-300"
                            // htmlFor="about-title"
                          >
                            Título:
                          </Label>
                          <Input
                            className="mt-2 text-base"
                            placeholder="Ex.: Ebook X"
                            value={whatWeDo.social_proof[proofIndex].alt}
                            onChange={e =>
                              setWhatWeDo(old => {
                                let selected = { ...old };

                                // let past = [...old];

                                selected.social_proof[proofIndex].alt =
                                  e.target.value;

                                // selected.title = e.target.value;

                                // past[index] = selected;

                                return selected;
                              })
                            }
                            // id="about-title"
                          />
                        </div>
                        <div className="mt-4">
                          <Label
                            className="text-base  text-zinc-300"
                            // htmlFor="about-title"
                          >
                            Quantidade:
                          </Label>
                          <Input
                            className="mt-2 text-base"
                            placeholder="Ex.: Ebook X"
                            value={whatWeDo.social_proof[proofIndex].qtd}
                            onChange={e =>
                              setWhatWeDo(old => {
                                let selected = { ...old };

                                // let past = [...old];

                                selected.social_proof[proofIndex].qtd =
                                  e.target.value;

                                // selected.title = e.target.value;

                                // past[index] = selected;

                                return selected;
                              })
                            }
                            // id="about-title"
                          />
                        </div>

                        <hr className="my-8 !text-zinc-200 !bg-zinc-200" />
                      </>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pricing">
                <div className="mt-5 ">
                  <div className="flex flex-wrap mb-4 sm:!mb-0  justify-between">
                    <h2 className="text-2xl font-medium mb-3 tracking-tight">
                      Preços
                    </h2>
                    <div className="flex items-center">
                      <Switch
                        checked={pricing.show}
                        onCheckedChange={e =>
                          setPricing(old => ({ ...old, show: e }))
                        }
                        id="active-pricing"
                      />
                      <Label htmlFor="active-pricing" className="ml-4">
                        Exibir seção
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="pricing-title"
                    >
                      Título:
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: Ebook X"
                      value={pricing.headline}
                      onChange={e =>
                        setPricing(old => ({
                          ...old,
                          headline: e.target.value,
                        }))
                      }
                      id="pricing-title"
                    />
                  </div>

                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="pricing-content"
                    >
                      Conteúdo
                    </Label>

                    <Textarea
                      placeholder="O ebook fala sobre..."
                      className="mt-2 text-base !resize-y min-h-[200px]"
                      value={pricing.content}
                      onChange={e =>
                        setPricing(old => ({ ...old, content: e.target.value }))
                      }
                      id="pricing-content"
                    />
                  </div>

                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="pricing-item"
                    >
                      Título do plano/produto:
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: Ebook X"
                      value={pricing.price_item}
                      onChange={e =>
                        setPricing(old => ({
                          ...old,
                          price_item: e.target.value,
                        }))
                      }
                      id="pricing-item"
                    />
                  </div>

                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="pricing-value"
                    >
                      Valor
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: R$ 34"
                      value={pricing.price_value_big}
                      onChange={e =>
                        setPricing(old => ({
                          ...old,
                          price_value_big: e.target.value,
                        }))
                      }
                      id="pricing-value"
                    />
                  </div>
                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="pricing-value-2"
                    >
                      Texto ao lado do valor (ex.: ",00" ou "/mês")
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: R$ 34"
                      value={pricing.price_value_small}
                      onChange={e =>
                        setPricing(old => ({
                          ...old,
                          price_value_small: e.target.value,
                        }))
                      }
                      id="pricing-value-2"
                    />
                  </div>
                  <div className="mt-4">
                    <Label
                      className="text-base  text-zinc-300"
                      htmlFor="pricing-frequency"
                    >
                      Frequência do pagamento
                    </Label>
                    <Input
                      className="mt-2 text-base"
                      placeholder="Ex.: Pagamento único"
                      value={pricing.price_frequency_label}
                      onChange={e =>
                        setPricing(old => ({
                          ...old,
                          price_frequency_label: e.target.value,
                        }))
                      }
                      id="pricing-frequency"
                    />
                  </div>
                  <div className="mt-4">
                    <div className=" flex flex-wrap items-start  mb-3 justify-between">
                      <h2 className="text-xl text-blue-500 font-normal tracking-tight">
                        Contidos no pagamento/plano:
                      </h2>

                      <Button
                        onClick={() => {
                          setPricing(old => {
                            let past = { ...old };

                            past.plan_items.push('');

                            return past;
                          });
                        }}
                        className="inline-block mt-2 hover:bg-blue-600 bg-blue-500 text-white"
                      >
                        Adicionar
                      </Button>
                    </div>
                    {pricing.plan_items.map((price, priceIndex) => (
                      <div className="item mb-2 flex items-center gap-x-2">
                        •
                        <Input
                          className=" text-base"
                          placeholder="Ex.: Pagamento único"
                          value={pricing.plan_items[priceIndex]}
                          onChange={e =>
                            setPricing(old => {
                              let past = { ...old };

                              past.plan_items[priceIndex] = e.target.value;

                              return past;
                            })
                          }
                        />
                        <div
                          onClick={() => {
                            setPricing(old => {
                              let past = { ...old };

                              let itensPast = [...past.plan_items];

                              itensPast.splice(priceIndex, 1);

                              past.plan_items = [...itensPast];

                              return past;
                            });
                          }}
                          className="cursor-pointer circle w-[30px] min-w-[30px]  flex items-center justify-center bg-red-500 text-white h-[30px] rounded-full"
                        >
                          <FaTimes />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="testimonials">
                <div className="mt-5 ">
                  <h2 className="text-2xl font-medium mb-3 tracking-tight">
                    Depoimentos
                  </h2>

                  {testimonials.map((item, itemIndex) => (
                    <>
                      <div className="">
                        <div className="flex items-start justify-between">
                          <h2 className="text-xl text-blue-500 font-normal mb-3 tracking-tight">
                            • Depoimento #{itemIndex + 1}
                          </h2>
                          <div
                            onClick={() => {
                              setTestimonials(old => {
                                let past = [...old];

                                // let itensPast = [...past.plan_items];

                                past.splice(itemIndex, 1);

                                // past.plan_items = [...itensPast];

                                return past;
                              });
                            }}
                            className="cursor-pointer circle w-[30px] flex items-center justify-center bg-red-500 text-white h-[30px] rounded-full"
                          >
                            <FaTimes />
                          </div>
                        </div>

                        <div className="">
                          <Label className="text-base text-zinc-300 ">
                            Imagem de perfil:
                          </Label>

                          {testimonials[itemIndex].imagePreview ? (
                            <div className="h-[120px] mt-3 mb-4 ">
                              <img
                                alt="logo"
                                className="h-full  rounded-md"
                                src={testimonials[itemIndex].imagePreview}
                              />
                            </div>
                          ) : (
                            testimonials[itemIndex].profile && (
                              <div className="h-[120px] mt-3 mb-4 ">
                                <img
                                  alt="logo"
                                  className="h-full  rounded-md"
                                  src={testimonials[itemIndex].profile}
                                />
                              </div>
                            )
                          )}
                          <Button asChild className="block mt-2 cursor-pointer">
                            <Label
                              className="text-base "
                              htmlFor={`test-${itemIndex}-image`}
                            >
                              Selecionar imagem
                            </Label>
                          </Button>
                          <Input
                            type="file"
                            className="mt-2 text-base hidden"
                            accept="image/*"
                            onChange={e => {
                              if (e.target.files && e.target.files[0]) {
                                console.log(e.target.files[0]);

                                setTestimonials(old => {
                                  let past = [...old];

                                  past[itemIndex].imageFile = e.target.files[0];
                                  past[itemIndex].imagePreview =
                                    URL.createObjectURL(e.target.files[0]);

                                  return past;
                                });
                              }
                            }}
                            id={`test-${itemIndex}-image`}
                          />
                          <small className="text-base font-medium block mt-2">
                            {testimonials[itemIndex].imageFile
                              ? testimonials[itemIndex].imageFile.name
                              : 'Selecione um arquivo'}
                          </small>
                        </div>

                        <div className="mt-4">
                          <Label
                            className="text-base   text-zinc-300"
                            htmlFor={`depoimentos-${itemIndex}-title`}
                          >
                            Nome:
                          </Label>
                          <Input
                            className="mt-2 text-base"
                            placeholder="Nome"
                            value={testimonials[itemIndex].name}
                            onChange={e =>
                              setTestimonials(old => {
                                let past = [...old];

                                past[itemIndex].name = e.target.value;

                                return past;
                              })
                            }
                            id={`depoimentos-${itemIndex}-title`}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label
                          className="text-base  text-zinc-300"
                          htmlFor={`depoimentos-${itemIndex}-content`}
                        >
                          Conteúdo do depoimento
                        </Label>

                        <Textarea
                          placeholder="Depoimento"
                          className="mt-2 text-base !resize-y min-h-[100px]"
                          value={testimonials[itemIndex].content}
                          onChange={e =>
                            setTestimonials(old => {
                              let past = [...old];

                              past[itemIndex].content = e.target.value;

                              return past;
                            })
                          }
                          id={`depoimentos-${itemIndex}-content`}
                        />
                      </div>

                      <div className="mt-4">
                        <Label
                          className="text-base  text-zinc-300"
                          htmlFor={`depoimentos-${itemIndex}-label`}
                        >
                          Texto secundário:
                        </Label>
                        <Input
                          className="mt-2 text-base"
                          placeholder="Nome"
                          value={testimonials[itemIndex].label}
                          onChange={e =>
                            setTestimonials(old => {
                              let past = [...old];

                              past[itemIndex].label = e.target.value;

                              return past;
                            })
                          }
                          id={`depoimentos-${itemIndex}-label`}
                        />
                      </div>

                      <hr className="my-6" />
                    </>
                  ))}

                  <Button
                    onClick={() => {
                      setTestimonials(old => {
                        let past = [...old];

                        past.push({
                          content: '',
                          name: '',
                          profileFile: null,
                          imagePreview: null,
                          label: '',
                        });

                        return past;
                      });
                    }}
                    className="inline-block mt-2 hover:bg-blue-600 bg-blue-500 text-white"
                  >
                    Adicionar
                  </Button>
                </div>
              </TabsContent>
              <TabsContent
                className="focus-visible:!outline-none ring-transparent !ring-offset-0 !ring-0 !outline-none !border-none focus-visible:!border-none"
                value="faq"
              >
                <div className="mt-5 ">
                  <h2 className="text-2xl font-medium mb-3 tracking-tight">
                    Perguntas Frequentes
                  </h2>

                  {faq.map((item, itemIndex) => (
                    <>
                      <div className="">
                        <div className="flex items-start justify-between">
                          <h2 className="text-xl text-blue-500 font-normal mb-3 tracking-tight">
                            • Pergunta #{itemIndex + 1}
                          </h2>
                          <div
                            onClick={() => {
                              setFaq(old => {
                                let past = [...old];

                                // let itensPast = [...past.plan_items];

                                past.splice(itemIndex, 1);

                                // past.plan_items = [...itensPast];

                                return past;
                              });
                            }}
                            className="cursor-pointer circle w-[30px] flex items-center justify-center bg-red-500 text-white h-[30px] rounded-full"
                          >
                            <FaTimes />
                          </div>
                        </div>
                        <Label
                          className="text-base  text-zinc-300"
                          htmlFor={`faq-${itemIndex}-title`}
                        >
                          Título:
                        </Label>
                        <Input
                          className="mt-2 text-base"
                          placeholder="Pergunta"
                          value={faq[itemIndex].question}
                          onChange={e =>
                            setFaq(old => {
                              let past = [...old];

                              past[itemIndex].question = e.target.value;

                              return past;
                            })
                          }
                          id={`faq-${itemIndex}-title`}
                        />
                      </div>

                      <div className="mt-4">
                        <Label
                          className="text-base  text-zinc-300"
                          htmlFor={`faq-${itemIndex}-content`}
                        >
                          Conteúdo
                        </Label>

                        <Textarea
                          placeholder="Responda da pergunta"
                          className="mt-2 text-base !resize-y min-h-[100px]"
                          value={faq[itemIndex].value}
                          onChange={e =>
                            setFaq(old => {
                              let past = [...old];

                              past[itemIndex].value = e.target.value;

                              return past;
                            })
                          }
                          id={`faq-${itemIndex}-content`}
                        />
                      </div>
                      <hr className="my-6" />
                    </>
                  ))}

                  <Button
                    onClick={() => {
                      setFaq(old => {
                        let past = [...old];

                        past.push({
                          question: '',
                          value: '',
                        });

                        return past;
                      });
                    }}
                    className="inline-block mt-2 hover:bg-blue-600 bg-blue-500 text-white"
                  >
                    Adicionar
                  </Button>
                </div>
              </TabsContent>

              <NextAreaButton />
            </Tabs>
          </div>
        </ScrollArea>

                      <div className='w-[0px] md:w-[480px] h-full bg-red border-l-2 bg-zinc-700 border-l-zinc-700'>
                        <iframe key={iframeKey} ref={iframeRef}  src={`/${String(savedSlug)}`} className='bg-zinc-700 w-full' height={iframeHeight ? iframeHeight : 0}></iframe>
                      </div>

        </div>

      </Layouts>
    </>
  );
};

export default EditPainelPage;
