import React, { useState } from 'react';
import Layouts from '@/src/layouts/Layouts';
import EditPainelPage from '@/src/layouts/EditPainelPage';
import dynamic from 'next/dynamic';

import Link from 'next/link';

import HeroOneSection from '@components/sections/HeroOne';
import AboutSection from '@components/sections/About';
import ServicesSection from '@components/sections/Services';
import TeamSection from '@components/sections/Team';
import AboutTwoSection from '@components/sections/AboutTwo';
import PricingSection from '@/src/components/sections/Pricing';
import Faq from '@/src/components/sections/Faq';
import { isPast } from 'date-fns';

const TestimonialSlider = dynamic(
  () => import('@components/sliders/Testimonial'),
  { ssr: false }
);

export default function (props) {
  const [showModal, setShowModal] = useState(true);

  return !props.data ? (
    <></>
  ) : props.isExpired ? (
    <>
      <Layouts noFooter noHeader noButtons>
        {/* 404 */}
        <div className=" mil-404-frame mil-appearance !bg-zinc-800">
          <div className="text-center px-[30px] -mt-[50px] flex flex-col items-center">
            <h1 className="mil-404 !text-5xl" data-text="expirado">
              expirado
            </h1>
            <p className="!text-lg my-4 text-white font-medium ">
              Infelizmente seu site expirou.
              <br />
              Mas é possível recuperá-lo! <strong>Acesse o link abaixo</strong>
            </p>
          </div>

          <Link
            href="/planos"
            className="mil-text-center mt-[8px] mil-button mil-button-lg rounded-full !bg-blue-500 mil-scale-down-trigger mil-buttons-space"
          >
            <span>Recuperar site</span>
          </Link>
        </div>
        {/* 404 end */}
      </Layouts>
    </>
  ) : (
    <>
      {props.isEditPainel ? (
        <>
          <EditPainelPage
            slug={props.data.slug}
            pageId={props.pageId}
            published={props.published}
            ExpiresIn={!props.published ? props.expiresIn : null}
            isExpired={!props.published ? props.isExpired : false}
            token={props.token}
            data={{ ...props.data.website_data }}
          />
        </>
      ) : (
        <>
          <Layouts
            headerData={props.data.parsedHeader}
            footerData={props.data.parsedFooter}
            showModalBefore={props.showModalBefore}
            theme={props.data.theme}
            published={props.published}
            // showButtons={}
            initialPhone={props.initialPhone}
            noLinks
            isLead={props.isLead}
            painelUrl={props.painelUrl}
            ExpiresIn={!props.published ? props.expiresIn : null}
            isExpired={!props.published ? props.isExpired : false}
            noButtons={!props.showButtons ?? true}
            transparent
          >
            <HeroOneSection Data={props.data.parsedHero} />
            <AboutSection Data={props.data.parsedAbout} />
            {props.data.parsedExtraAreas.map((area, index) => {
              switch (area.type) {
                case 'topics':
                  return <ServicesSection Data={area} />;
                case 'image-text':
                  return <AboutTwoSection Data={area} />;
              }
            })}
            <AboutTwoSection Data={props.data.parsedAboutTwo} />
            {/* <TeamSection /> */}
            {props.data.parsedPricing.show && (
              <PricingSection Data={props.data.parsedPricing} />
            )}
            {/* <VideoSection /> */}
            <TestimonialSlider Data={props.data.parsedTestimonials} />
            <Faq Data={props.data.parsedFaq} />
            {/* <LatestPostsSection posts={props.posts} /> */}
            {/* <SubscribeSection /> */}
          </Layouts>
        </>
      )}
    </>
  );
}

export const getServerSideProps = async context => {
  console.log('context', context.query);
  const slug = context?.query?.slug;
  const fromWp = context?.query.from_wp ?? false;
  const isEdit = context?.query.edit ?? false;
  const fromPainel = context?.query.from_painel ?? false;
  let pageId = context?.query.id ?? '';
  const token = context?.query.token ?? '';

  const isEditPainel = Boolean(fromWp) ?? false;

  try {
    if (slug && slug !== 'favicon.ico') {
      let res = {};

      if (fromWp && token) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pages/${slug}?token=${token}`
        );
        pageId = slug;
      } else {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get-page/${slug}?token=${token}`
        );
      }

      // let old =

      let result = await res.json();
      console.log('res--------------------->', result);
      console.log(
        'process.enve.NEXT_PUBLIC0_API_URL--------------------->',
        process.env.NEXT_PUBLIC_API_URL
      );
      // let result = { website_data: old, slug: 'designer-pro' };

      function parseExtraAreas(old) {
        const resultTopics = old.middle_areas.map((area, areaIndex) =>
          area.type === 'topics'
            ? {
                type: area.type,
                index: areaIndex,
                bg_image: area.bg_image,
                items: area.topic_items.map((topic, index) => ({
                  num: String('0' + (index + 1)),
                  title: topic.title,
                  icon: 'img/icons/1.svg',

                  text: topic.content,
                  link: '/services/website-content',
                })),
              }
            : {
                type: area.type,
                subtitle: '',
                index: areaIndex,
                align: areaIndex === 0 ? 'right' : area.align,
                title: area.title,
                description: area.content,
                image: {
                  url: area.image,
                  alt: area.title,
                },
                numbers: [],
                cta: old.cta,
              }
        );

        function orderItems(array) {
          // Separar os tipos em dois arrays diferentes
          const topics = array.filter(item => item.type === 'topics');
          const imageTexts = array.filter(item => item.type === 'image-text');

          // Novo array para o resultado
          const resultado = [];

          // Variáveis para acompanhar os índices
          let i = 0,
            j = 0;

          // Enquanto houver itens em ambos os arrays
          while (i < topics.length && j < imageTexts.length) {
            resultado.push(imageTexts[j++]);
            resultado.push(topics[i++]);
          }

          // Adicionar os itens restantes de cada tipo

          while (j < imageTexts.length) {
            resultado.push(imageTexts[j++]);
          }
          while (i < topics.length) {
            resultado.push(topics[i++]);
          }

          return resultado;
        }

        return orderItems(resultTopics);
      }

      function parseServices(old) {
        return {
          bg_image:
            'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?cs=srgb&dl=pexels-kindel-media-7688336.jpg&fm=jpg&w=1920&h=1440',
          items: old.topics.map((topic, index) => ({
            num: String('0' + (index + 1)),
            title: topic.title,
            icon: 'img/icons/1.svg',
            text: topic.content,
            link: '/services/website-content',
          })),
        };
      }

      // function parseFooter(old2) {
      //   return {
      //     instagram: old.networks.instagram,
      //   };
      // }

      function parsePricing(old) {
        return {
          subtitle: 'Valores',
          show: old.pricing.show ? true : false,
          title: old.pricing.headline,
          description: old.pricing.content,
          button: {
            label: old.cta.label,
            link: old.cta.url,
          },
          items: [
            {
              name: old.pricing.price_item,
              subname: '',
              price: old.pricing.price_value_big,
              price_after: old.pricing.price_value_small,
              price_label: old.pricing.price_frequency_label,
              list: old.pricing.plan_items.map(i => ({
                active: 1,
                value: i,
              })),
              button: {
                label: old.cta.label,
                link: old.cta.url,
              },
            },
          ],
        };
      }

      function parseFaq(old) {
        return {
          cta: old.cta,
          title: 'Perguntas Frequentes',
          phone: old.networks.whatsapp,
          description: 'Tire suas dúvidas aqui',
          faq_items: old.faq.map(faqItem => ({
            label: faqItem.question,
            value: faqItem.value ? faqItem.value : 'Resposta',
          })),
        };
      }

      function parseAboutTwo(old) {
        return {
          subtitle: 'O que fazemos?',
          title: old.what_we_do.title,
          description: old.what_we_do.content,
          image: {
            url: old.what_we_do.image,
            alt: old.what_we_do.title,
          },
          numbers: old.what_we_do.social_proof.map(i => ({
            label: i.alt,
            value: i.qtd,
          })),
        };
      }

      function parseHero(old) {
        return {
          bg_image: old.bg_image,
          subtitle: old.subtitle,
          title: {
            before: old.headline,
            accent: '',
            after: '',
          },
          description: old.sub_hero,
          cta: old.cta,
          image: old.main_image,
          partners: [],
        };
      }

      function parseAbout(old) {
        return {
          subtitle: 'Sobre nós',
          title: 'Nossa história',
          description: old.history.content,
          button1: {
            label: old.cta.label,
            link: old.cta.url,
          },
          button2: {
            label: 'View portfolio',
            link: 'portfolio',
          },
          image: {
            front: old.history.image_1,
            back: old.history.image_2,
            alt: 'image',
            badgeText: 'Sobre nós - Sobre nós - Sobre nós - ',
          },
        };
      }

      function parseTestimonials(old) {
        return {
          subtitle: 'Comentários',
          title: 'O que falam sobre nós',
          button: {
            label: 'View all',
            link: '#.',
          },
          items: old.testimonials.map(i => ({
            name: i.name !== '' ? i.name : 'Paulo',
            image: i.profile ?? 'img/team/1.png',
            role: i.label !== '' ? i.label : 'Gestor na empresa X',
            text:
              i.content !== ''
                ? i.content
                : `Minha experiência com ${old.name} foi excepcional desde o início. A equipe demonstrou um profissionalismo e dedicação notáveis, garantindo que todas as minhas necessidades fossem atendidas com eficiência e cuidado. Fiquei particularmente impressionado(a) com a atenção aos detalhes e a disposição em ir além para garantir a satisfação do cliente.`,
          })),
        };
      }

      function parseFooter(old) {
        return {
          headline: '',
          name: old.name,
          slug: result.slug,
          logo: old.logo ?? null,
          email: old.networks.email ?? '',
          phone: old.networks.whatsapp,
          footerLabel: `© 2023 ${old.name}`,
          networks: [
            {
              icon: 'fab fa-instagram',
              title: 'Instagram',
              link: old.networks.instagram ?? '',
            },
            {
              icon: 'fab fa-youtube',
              title: 'Youtube',
              link: old.networks.youtube ?? '',
            },
            {
              icon: 'fab fa-linkedin',
              title: 'Linkedin',
              link: old.networks.linkedin ?? '',
            },
            {
              icon: 'fab fa-facebook',
              title: 'Facebook',
              link: old.networks.facebook ?? '',
            },
          ],
        };
      }

      const targetTimeExpire = new Date(
        new Date(result.createdAt).getTime() + 1000 * 60 * result.expires_in
      ).getTime();

      return {
        props: {
          isEditPainel,
          pageId,
          expiresIn: !result.published
            ? isEditPainel
              ? targetTimeExpire
              : fromPainel
              ? targetTimeExpire
              : null
            : null,
          token,
          isExpired: !result.published ? isPast(targetTimeExpire) : false,
          painelUrl: result.adminUrl ? result.adminUrl : null,
          showModalBefore: true,
          isLead: result.isLead ?? false,
          initialPhone: result.initial_phone ?? null,
          showButtons: isEdit ? result.auth ?? false : false,
          published: result.published,
          data: {
            ...result,
            show_buttons: true,
            parsedPricing: parsePricing(result.website_data),
            parsedTestimonials: parseTestimonials(result.website_data),
            parsedAboutTwo: parseAboutTwo(result.website_data),
            parsedExtraAreas: parseExtraAreas(result.website_data),
            parsedHero: parseHero(result.website_data),
            parsedFooter: parseFooter(result.website_data),
            parsedHeader: parseFooter(result.website_data),
            parsedFaq: parseFaq(result.website_data),
            parsedAbout: parseAbout(result.website_data),
            theme: result.website_data.template,
          },
        },
      };
    } else {
      return {
        props: {
          isEditPainel: false,
          pageId: null,
          token: null,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {
        isEditPainel: false,
        painelUrl: null,
        pageId: null,
        token: null,
        data: {},
      },
    };
  }
};
