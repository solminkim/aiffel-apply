import { Button } from 'antd';
import ReactPlayer from 'react-player/youtube';
import { Step, TApplicationStep } from '@/types';
import { Typography } from 'antd';
import { useEffect } from 'react';
import { confirmModal, successModal, warningModal } from '../Modal';

const { Title, Text } = Typography;
interface StepThreeProps {
  step: TApplicationStep;
  setStep: React.Dispatch<React.SetStateAction<TApplicationStep>>;
  className?: string;
}

const StepThree: React.FC<StepThreeProps> = ({ step, setStep, className }) => {
  // useEffect(() => {
  //   if (step === Step.COMPLETE) {
  //     window.confettiful = new Confettiful(
  //       document.querySelector('.js-container')
  //     );
  //   } else {
  //     window.confettiful = undefined;
  //   }
  // }, [step]);

  useEffect(() => {
    if (step === Step.COMPLETE) {
      setTimeout(() => {
        confirmModal({
          title: '내일배움카드가 반드시 필요한 과정입니다.',
          content: '링크를 클릭하시면 내일배움카드 신청 페이지로 이동합니다.',
          centered: true,
          okText: '신청하러 갈께요!',
          cancelText: '카드를 가지고 있어요!',
          onOk: () => {
            window.open('https://www.hrd.go.kr', '_blank');
          },
          onCancel: () => {},
        });
      }, 1000);
    }
  }, [step]);

  return (
    <section>
      <iframe
        width={'100%'}
        style={{ aspectRatio: '16/9' }}
        src='https://www.youtube.com/embed/dRLFfDvZ9qI'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>

      <div className={'p-1'} />

      <div className={'flex items-end gap-1 justify-center'}>
        <div className={'text-[1.25rem] font-bold'}>
          현대모비스 자율주행랩 연구원
        </div>
        <div className={'text-[1.125rem]'}>
          이 혁<span className={'text-[1rem]'}>님</span>{' '}
          <span className={'text-[0.875rem]'}>(아이펠 강남 2기)</span>
        </div>
      </div>
      <div className={'p-4'} />
      <div className={'flex flex-col gap-4'}>
        <Button
          size='large'
          style={{
            backgroundColor: '#f4a261',
            color: 'white',
          }}
          htmlType='submit'
          className={'w-full'}
          loading={false}
          onClick={() => window.open('https://www.hrd.go.kr', '_blank')}
        >
          내일배움카드 신청하러 가기
        </Button>

        <Button
          style={{
            backgroundColor: '#2A9D8F',
            color: 'white',
          }}
          size='large'
          htmlType='submit'
          className={'w-full'}
          loading={false}
          onClick={() => {
            window.open('https://aiffel.io', '_blank');
          }}
        >
          AIFFEL.IO 둘러보기
        </Button>
        {/*
        <Button
          type='primary'
          size='large'
          htmlType='submit'
          className={'w-full'}
          loading={false}
          onClick={() => setStep(Step.DETAIL)}
        >
          테스트용 이전단계로
        </Button> */}
      </div>
    </section>
  );
};

export default StepThree;
