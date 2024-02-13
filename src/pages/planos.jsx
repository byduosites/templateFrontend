import Data from '@data/sections/pricing-plans.json';

import Layouts from '../layouts/Layouts';
import Head from 'next/head';
import Link from 'next/link';

import { Badge } from '@components/ui/badge';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { FaStar } from 'react-icons/fa';

const PlansPage = () => {
  return (
    <>
      <Layouts theme="theme-blue" noFooter noButtons noHeader>
        <Head>
          <title>Planos - ByDuo Construtor de Sites Inteligentes</title>
        </Head>
        <div className="">
          <div className="mil-gray-bg mil-p-120-90">
            <div className="container">
              <img
                src="/logo-byduo1.png"
                className="block mb-3 w-auto h-[100px] -ml-[20px]"
                alt="ByDuo"
              />
              <div className="row justify-content-between mil-mb-90">
                <div className="col-xl-5">
                  <h3 className="mil-link mil-appearance mil-accent mil-mb-30">
                    {Data.subtitle}
                  </h3>
                  <h3 className="mil-mb-30 mil-appearance">{Data.title}</h3>
                </div>
                <div className="col-xl-6">
                  <p className="mil-appearance mil-mt-55-adapt mil-mb-30">
                    {Data.description}
                  </p>

                  <div className="mil-appearance hidden">
                    <Link href={Data.button.link} className="mil-link-hover">
                      {Data.button.label}
                    </Link>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="basic" className="w-full mx-auto text-center">
                <TabsList
                  className="inline-flex flex-row w-auto flex-wrap
                 mb-[30px] lg:mb-[90px] !px-2 !py-2 h-auto gap-2 md:gap-0 bg-transparent md:bg-white rounded-lg md:rounded-full"
                >
                  <TabsTrigger
                    value="basic"
                    className="rounded-full disabled:bg-white/50 !text-white !bg-blue-500 min-w-[100px] !text-base"
                  >
                    Padrão
                  </TabsTrigger>
                  <TabsTrigger
                    disabled
                    className="rounded-full disabled:bg-white/50 !opacity-75 min-w-[100px] !text-base"
                    value="pro"
                  >
                    Pro <Badge className="ml-3">Em breve</Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    className="rounded-full disabled:bg-white/50 !opacity-75 min-w-[100px] !text-base"
                    value="enterprise"
                    disabled
                  >
                    Agência <Badge className="ml-3">Em breve</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="row space-y-8 md:space-y-0">
                    {Data.items.basic.map((item, key) => (
                      <div
                        className="col-lg-4 flex flex-col"
                        key={`pricing-item-${key}`}
                      >
                        {/* price card */}
                        {key === 1 && (
                          <Badge className="absolute !transform !z-50 !-translate-y-[10px] lg:!-translate-y-[60px] items-center justify-center font-medium px-4 bg-blue-900 text-base  !self-center !ml-auto  !mr-auto !text-center">
                            {key === 1 && (
                              <FaStar className="inline-block mr-2 leading-normal" />
                            )}
                            Recomendado
                          </Badge>
                        )}
                        <div
                          className={`mil-price-card z-40 ${
                            key === 1
                              ? '!transform lg:!-translate-y-[50px] !bg-blue-500 !text-white '
                              : ''
                          } flex flex-col justify-center md:block rounded-xl text-center mil-appearance md:!min-h-[700px] mil-mb-30 relative`}
                        >
                          <h5
                            className={`mil-mb-15 ${
                              key === 1 ? '!text-white' : ''
                            }`}
                          >
                            {item.name}
                          </h5>
                          <p
                            className={`mil-h6 mil-bold mil-mb-30 ${
                              key === 1 ? '!text-white' : ''
                            } `}
                          >
                            {item.subname}
                          </p>

                          <div
                            className={`mil-price-number mil-mb-10 ${
                              key === 1 ? '!text-white' : ''
                            }`}
                          >
                            {item.price}
                            <span
                              className={` ${
                                key === 1 ? '!text-blue-900' : ''
                              }`}
                            >
                              {item.price_after}
                            </span>
                          </div>
                          <p
                            className={`mil-h6 mil-bold mil-mb-30 ${
                              key === 1 ? '!text-white' : ''
                            }`}
                          >
                            {item.price_label}
                          </p>

                          <div
                            className={`mil-divider mil-mb-30 ${
                              key === 1 ? '!border-white' : ''
                            }`}
                          ></div>

                          <ul className="mil-mb-30">
                            {item.list.map((element, key2) => (
                              <li
                                className={
                                  element.active != 1 ? 'mil-empty' : ''
                                }
                                key={`pricing-item-${key}-list-${key2}`}
                              >
                                {element.active == 1 && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`${
                                      key === 1 ? '!fill-white' : ''
                                    }`}
                                  >
                                    <path d="M11.707,15.707C11.512,15.902,11.256,16,11,16s-0.512-0.098-0.707-0.293l-4-4c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0L11,13.586l8.35-8.35C17.523,3.251,14.911,2,12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10 c0-1.885-0.531-3.642-1.438-5.148L11.707,15.707z" />
                                  </svg>
                                )}
                                {element.active != 1 && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M11.707,15.707C11.512,15.902,11.256,16,11,16s-0.512-0.098-0.707-0.293l-4-4c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0L11,13.586l8.35-8.35C17.523,3.251,14.911,2,12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10 c0-1.885-0.531-3.642-1.438-5.148L11.707,15.707z" />
                                  </svg>
                                )}
                                <span className="text-left">
                                  {element.value}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={item.button.link}
                            className={`mil-button  rounded-xl mil-button-lg mil-scale-down-trigger mil-buttons-space ${
                              key === 1 ? '!bg-white !text-blue-500' : ''
                            }`}
                          >
                            <span>{item.button.label}</span>
                          </Link>
                        </div>
                        {/* price card end */}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </Layouts>
    </>
  );
};

export default PlansPage;
