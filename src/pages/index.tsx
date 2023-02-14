import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Variants, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import { StepHeader } from '@/components/StepHeader';
import { StepOne } from '@/components/StepOne';
import { StepTwo } from '@/components/StepTwo';

import { useStepsItems } from '@/hooks/useStepsItems';
// types and const
import { TApplicationCourse, TApplicationStep, Course, Step } from '@/types';
import { TUserContext } from '@/types/context';
import { UserContext, initialState } from '@/context/userContext';
import { StepThree } from '../components/StepThree';
import { Spin } from 'antd';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();
  const [step, setStep] = useState<TApplicationStep>(Step.COMMON);
  const [course, setCourse] = useState<TApplicationCourse>(Course.CORE);
  const [percent, setPercent] = useState<number>(0);
  const [applicationId, setApplicationId] = useState<number | null>(null);
  // 기본정보, 글작성 내용 다포함
  const [userInfo, setUserInfo] = useState<TUserContext>(initialState);
  // 현재 step에 따라 item 변경
  const stepItems = useStepsItems(step);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    let param = '';
    switch (step) {
      case Step.COMMON:
        param = '1';
        break;
      case Step.DETAIL:
        param = '2';
        break;
      case Step.COMPLETE:
        param = '3';
        break;
      default:
        param = '';
    }
    router.push(`?step=${param}`, undefined, { shallow: true });
  }, [step]);

  const variants: Variants = {
    visible: { opacity: 1, display: 'block' },
    hidden: {
      opacity: 0,
      x: 150,
      display: 'none',
    },
  };

  return (
    <UserContext.Provider value={userInfo}>
      <div className='max-w-[500px] mx-auto'>
        <Head>
          <title>아이펠 캠퍼스 지원하기</title>
          <link
            rel='icon'
            href='https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F418a6e63-1ded-4bd3-b8b3-26b630e166f2%2Ffont-test.png?table=block&id=e894b287-478a-4230-b227-65e166dac91e&spaceId=21c417be-3bfb-4ba0-9ca3-958d8f8971d0&width=250&userId=61979bba-1baa-4c70-93ff-7d1021b2bc4a&cache=v2'
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta
            name='image'
            content='https://d3ngm0g3l5whsc.cloudfront.net/assets/img/campus-og-thumb.png'
          />
          <meta
            name='description'
            content='지금 아이펠 캠퍼스에 지원하시고 국내 최고의 AI 교육을 만나세요!'
          />
          <meta
            name='keywords'
            content={
              '국비교육, 내일배움카드, 고용노동부, 코딩, 코딩공부, 코딩교육, 코딩테스트, 컴퓨터, 데이터분석, 부트캠프, 코딩부트캠프, 개발자, 취업, ai그림, 자율주행, 스터디, 해커톤, 사이드 프로젝트, 온라인코딩, AI교육, 머신러닝, 딥러닝, 파이토치, 싸이킷런, 케라스, 판다스, 넘파이, NLP, YOLO, 파이썬독학, 프로그래밍, 온라인 교육, 온라인강의, 기업교육, HRD, HRD교육, 온라인교육플랫폼, 온라인학습, 직장인온라인교육, 온라인직무교육, 교육플랫폼, 교육콘텐츠, 스마트학습, 기업온라인교육, 임직원교육, 디지털교육, 직무교육, HR교육, 직장인교육, 회사교육, 회사복지, 직원교육프로그램, 사내교육, 외부교육, 온라인강의플랫폼, 신입직원교육, 직무역량교육, 교육프로그램, 데이터사이언스, 코딩이란, AI'
            }
          />
          {/* Open Graphic */}
          <meta property='og:title' content='아이펠 캠퍼스 지원하기' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://apply.aiffel.io' />
          <meta
            property='og:image'
            content='https://d3ngm0g3l5whsc.cloudfront.net/assets/img/campus-og-thumb.png'
          />
          <meta
            property='og:description'
            content='지금 아이펠 캠퍼스에 지원하시고 국내 최고의 AI 교육을 만나세요!'
          />

          <meta
            property='og:site_name'
            content='아이펠(AIFFEL) 캠퍼스 수강신청 페이지'
          />
        </Head>
        {/* step information  */}
        {/* 현재 step에 맞추어서 Steps component와 관련 정보를 render*/}
        {/* states required: current step, selected course*/}

        {!domLoaded ? (
          <div className={'h-screen flex flex-col justify-center'}>
            <Spin tip='AIFFEL 지원서를 불러오고있습니다...😀' size='large'>
              <div className='content' />
            </Spin>
          </div>
        ) : (
          <>
            <StepHeader
              step={step}
              course={course}
              antdStepsItems={stepItems}
              percent={percent}
            />
            <div className={'p-4'} />
            <div
              className={'border-solid border-b-gray-300 border-0 border-b-2'}
            />
            <div className={'p-4'} />
            {/* 현재 step에 맞는 form render*/}
            {/* states required: current step */}
            {/* states need to be lifted : selected course */}
            <motion.div
              variants={variants}
              transition={{ duration: 0.35 }}
              animate={step === Step.COMMON ? 'visible' : 'hidden'}>
              <StepOne
                step={step}
                setStep={setStep}
                setPercent={setPercent}
                setUserInfo={setUserInfo}
                setApplicationId={setApplicationId}
              />
            </motion.div>

            <motion.div
              variants={variants}
              transition={{ duration: 0.35 }}
              animate={step === Step.DETAIL ? 'visible' : 'hidden'}>
              <StepTwo
                userInfo={userInfo}
                step={step}
                setStep={setStep}
                setPercent={setPercent}
                setUserInfo={setUserInfo}
                applicationId={applicationId}
              />
            </motion.div>

            <motion.div
              variants={variants}
              transition={{ duration: 0.35 }}
              animate={step === Step.COMPLETE ? 'visible' : 'hidden'}>
              <StepThree step={step} setStep={setStep} />
            </motion.div>
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default Home;
