import { StepProps, Steps } from 'antd';

import { TApplicationCourse, TApplicationStep, Step } from '@/types';
import { motion } from 'framer-motion';

interface StepHeaderProps {
  step: TApplicationStep;
  course: TApplicationCourse;
  antdStepsItems: StepProps[];
  percent: number;
}
const StepHeader: React.FC<StepHeaderProps> = ({
  step,
  course,
  antdStepsItems,
  percent,
}) => {
  const variants = {
    visible: { opacity: 1, display: 'flex' },
    hidden: { opacity: 0, display: 'none' },
  };

  return (
    <section className={'flex flex-col gap-8'}>
      <div>
        <Steps
          size='small'
          percent={percent}
          items={antdStepsItems}
          responsive={false}
          labelPlacement={'vertical'}
        />
      </div>
      <div className={'flex flex-col items-center gap-4'}>
        {/* step badges */}
        <motion.div
          className={'rounded-full bg-[#1677ff] text-white px-4 py-2'}
          variants={variants}
          transition={{ duration: 1 }}
          animate={step === Step.COMMON ? 'visible' : 'hidden'}
        >
          STEP 1
        </motion.div>

        <motion.div
          className={'rounded-full bg-[#1677ff] text-white px-4 py-2'}
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.DETAIL ? 'visible' : 'hidden'}
        >
          STEP 2
        </motion.div>

        <motion.div
          className={'rounded-full bg-[#1677ff] text-white px-4 py-2'}
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.COMPLETE ? 'visible' : 'hidden'}
        >
          COMPLETE
        </motion.div>

        {/* step title */}
        <motion.div
          className={'text-[1.5rem] font-bold flex flex-col text-center gap-1'}
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.COMMON ? 'visible' : 'hidden'}
        >
          지원자님에 대해 알려주세요.
        </motion.div>

        <motion.div
          className={'text-[1.5rem] font-bold flex flex-col text-center gap-1'}
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.DETAIL ? 'visible' : 'hidden'}
        >
          <span>아이펠을 통해 AI 인재로 성장할</span>
          <span>자신을 알려주세요.</span>
        </motion.div>

        <motion.div
          className={'text-[1.5rem] font-bold flex flex-col text-center gap-1'}
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.COMPLETE ? 'visible' : 'hidden'}
        >
          <span>지원이 완료되었습니다!</span>
          <span>작성하시느라 수고 많으셨습니다.</span>
        </motion.div>

        {/* step subtitle */}
        <motion.div
          className={
            'flex flex-col text-[1rem] text-gray-500 font-normal text-center'
          }
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.COMMON ? 'visible' : 'hidden'}
        >
          <span>입력해주신 정보는 아이펠 캠퍼스 입학을</span>
          <span>위해 꼭 필요한 내용입니다.</span>
        </motion.div>

        <motion.div
          className={
            'flex flex-col text-[1rem] text-gray-500 font-normal text-center gap-1'
          }
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.DETAIL ? 'visible' : 'hidden'}
        >
          <span>인터뷰 여부를 결정하기 위한 소중한 정보입니다.</span>
          <span>아래 질문에 자세히 적어주세요.</span>
        </motion.div>

        <motion.div
          className={
            'flex flex-col text-[1rem] text-gray-500 font-normal text-center gap-1'
          }
          variants={variants}
          transition={{ duration: 0.8 }}
          animate={step === Step.COMPLETE ? 'visible' : 'hidden'}
        >
          <span>3일 이내에 온라인 인터뷰 일정을 안내드립니다.</span>
          <span>꼭 참여하셔서 국내 최고의 AI 교육을 만나보세요.</span>
        </motion.div>
      </div>
    </section>
  );
};

export default StepHeader;
