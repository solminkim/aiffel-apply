import { useMemo } from 'react';
import { StepProps } from 'antd';

import { Step, TApplicationStep } from '@/types';

export const useStepsItems: (step: TApplicationStep) => StepProps[] = (
  step
) => {
  return useMemo(() => {
    return [
      {
        status: step === Step.COMMON ? 'process' : 'finish',
        title: '기본정보',
      },
      {
        status:
          step === Step.COMMON
            ? 'wait'
            : step === Step.DETAIL
            ? 'process'
            : 'finish',
        title: '상세정보',
      },
      {
        status: step === Step.COMPLETE ? 'finish' : 'wait',
        title: '완료',
      },
    ];
  }, [step]);
};
