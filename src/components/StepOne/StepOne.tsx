import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Checkbox, Input, Select, Space } from 'antd';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';
// form
import {
  TRequiredUserInfoFormKeys,
  TUserInfoForm,
  useFormWithYupSchema,
} from '@/hooks/useFormWithYupSchema';
//types
import { TApplicationStep, Step } from '@/types/form';
import { TUserContext } from '@/types/context';
//data
import { courseOptionsArray } from '@/data/courseOptionsArray';
// style
import styled from '@emotion/styled';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { confirmModal, errorModal } from '../Modal';
import { NextPage } from 'next';
import { apis } from '../../http';
import { LayoutGroup, Variants, motion } from 'framer-motion';
import {
  MarketingTerms,
  PersonalTerms,
  ThirdPartyTerms,
} from '../TermsAndConditions';

interface StageOneProps {
  step: TApplicationStep;
  setStep: React.Dispatch<React.SetStateAction<TApplicationStep>>;
  setPercent: React.Dispatch<React.SetStateAction<number>>;
  setUserInfo: React.Dispatch<React.SetStateAction<TUserContext>>;
  setApplicationId: React.Dispatch<React.SetStateAction<number | null>>;
  className?: string;
}

const StepOne: NextPage<StageOneProps> = ({
  step,
  setStep,
  setPercent,
  setUserInfo,
  setApplicationId,
  className,
}) => {
  const [openFirstTerm, setOpenFirstTerm] = useState(false);
  const [openSecondTerm, setOpenSecondTerm] = useState(false);
  const [openThirdTerm, setOpenThirdTerm] = useState(false);

  const terms = {
    term1: {
      id: 'term1',
      title: '개인정보 수집 및 이용동의 (필수)*',
      toggle() {
        console.log('first');
        setOpenFirstTerm(!openFirstTerm);
      },
      isOpen: openFirstTerm,
    },
    term2: {
      id: 'term2',
      title: '제3자이용정보제공 동의 (필수)*',
      toggle() {
        console.log('secodn');
        setOpenSecondTerm(!openSecondTerm);
      },
      isOpen: openSecondTerm,
    },
    term3: {
      id: 'term3',
      title: '마케팅 수신 동의 (선택)',
      toggle() {
        console.log('third');
        setOpenThirdTerm(!openThirdTerm);
      },
      isOpen: openThirdTerm,
    },
  };
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isDirty },
  } = useFormWithYupSchema();

  const setAllTerms = (val: boolean) => {
    setValue('term1', val);
    setValue('term2', val);
    setValue('term3', val);
  };

  // const isAllTermsChecked: boolean =
  //   !!getValues('term1') &&
  //   !!getValues('term2') &&
  //   !!getValues('term3');

  const watchAllTerms = [watch('term1'), watch('term2'), watch('term3')];

  const isAllTermsChecked: boolean = useMemo(() => {
    const allTermsChecked =
      !!getValues('term1') && !!getValues('term2') && !!getValues('term3');
    return allTermsChecked;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...watchAllTerms]);

  useEffect(() => {
    if (step !== Step.COMMON) return;
    if (!isDirty) {
      setPercent(0);
      return;
    }
    const validItems = watch(requiredInputFields).filter(
      (v) => (typeof v === 'string' && v.length > 0) || v === true,
    );
    console.log(validItems.length);
    // calculate percentpage of progress
    setPercent((validItems.length / 7) * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    watch(requiredInputFields),
  ]);

  /** form submission handler  */
  const onSubmit = (data: TUserInfoForm) => {
    async function callback() {
      // context state set
      setUserInfo((prev) => {
        console.log({ ...prev, user: data });
        return { ...prev, user: data };
      });

      console.log({ data });
      try {
        const response = await apis.postUser(data);
        setApplicationId(response.data.application_id);
      } catch (error: any) {
        errorModal({
          title: '올바르지 않은 입력값이 존재합니다.',
          content: '입력값을 다시 확인해주세요.',
        });
        return;
      }
      setStep(Step.DETAIL);
    }
    // create modal
    confirmModal({
      title: '내일배움카드를 소지하고 계신가요?',
      content: (
        <div>
          <p>본 과정 수강을 위해선 반드시 내일배움카드가 필요합니다.</p>
          <p>현재 카드가 없어도 선지원 후발급 가능합니다!</p>
        </div>
      ),
      onOk: () => {
        setValue('has_nb_card', true);
        callback();
        // 다음 스탭 설정
      },
      onCancel: () => {
        setValue('has_nb_card', false);
        callback();
      },
      okText: '카드있음',
      cancelText: '카드 발급 예정',
      centered: true,
    });
    // set user info in context

    // 맨 위로 스크롤
    window.scrollTo(0, 0);
  };

  const openTerm = (term: string) => {
    console.log('click');
    setOpenFirstTerm(!openFirstTerm);
  };

  // 다음 번에는 react-hook-form 사용하지 않고, antd form 사용해보기
  return (
    <form
      noValidate
      className={clsx('flex flex-col gap-4 my-form', className)}
      onSubmit={handleSubmit(onSubmit)}>
      {/* 이름 */}
      <InputGroup>
        <Label htmlFor='name'>이름</Label>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <MyInput
              id='name'
              size='large'
              placeholder='홍길동'
              {...field}
              autoFocus={true}
              maxLength={6}
            />
          )}
        />
        {errors.name?.message && (
          <ErrorParagraph>{errors.name?.message}</ErrorParagraph>
        )}
      </InputGroup>

      {/* 이메일 */}
      <InputGroup>
        <Label htmlFor='email'>이메일</Label>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <MyInput
              id='email'
              type='email'
              size='large'
              placeholder='example@email.com'
              {...field}
            />
          )}
        />
        {errors.email?.message && (
          <ErrorParagraph>{errors.email.message}</ErrorParagraph>
        )}
      </InputGroup>

      {/* 연락처 */}
      <InputGroup>
        <Label htmlFor='phone_number'>연락처</Label>
        <Controller
          name='phone_number'
          control={control}
          render={({ field }) => (
            <MyInput
              id='phone_number'
              size='large'
              placeholder='010-1234-5678'
              type='tel'
              {...field}
              onChange={(e: any) => {
                const { value } = e.target;

                if (/^[0-9\-]*$/.test(value) === false || value.length === 14) {
                  return;
                }

                console.log(
                  value.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'),
                );
                // #1. 숫자 쓰다가 4자리 된 경우 => - 붙여서 5자리 만듬
                if (/^(\d{3})(\d{1})$/.test(value)) {
                  setValue(
                    'phone_number',
                    value.replace(/^(\d{3})(\d{1})$/, '$1-$2'),
                  );
                  return;
                }

                // #2. #1에서 - 달고 뒤에 숫자 달아서 5자 만들었는데, 한 글자 지워서 4자리 된 경우 (010-) => - 제거
                if (/^(\d{3})-$/.test(value)) {
                  setValue('phone_number', value.replace(/^(\d{3})-$/, '$1'));
                  return;
                }

                // #3. 숫자 지우다가 5자리 된 경우 (위 경우에서 한 자를 더 입력하면 6자가 되기 때문에 가능)
                if (/^(\d{3})-(\d{1})$/.test(value)) {
                  setValue(
                    'phone_number',
                    value.replace(/^(\d{3})-(\d{1})$/, '$1$2'),
                  );
                  return;
                }
                // #4. 010-51 에서 1 지워서 0105 되었는데 거기서 숫자 1개 추가로 넣는 경우.
                if (/^(\d{3})(\d{2})$/.test(value)) {
                  setValue(
                    'phone_number',
                    value.replace(/^(\d{3})(\d{2})$/, '$1-$2'),
                  );
                  return;
                }
                // #5. 숫자 쓰다가 9자리 된 경우
                if (/^(\d{3})-(\d{4})(\d{1})$/.test(value)) {
                  setValue(
                    'phone_number',
                    value.replace(/^(\d{3})-(\d{4})(\d{1})$/, '$1-$2-$3'),
                  );
                  return;
                }
                // #6. #7에서 - 달고 뒤에 숫자 달아서 11자 만들었는데, 한 글자 지워서 10자리 된 경우 (010-1234-) => - 제거
                if (/^(\d{3})-(\d{4})-$/.test(value)) {
                  setValue(
                    'phone_number',
                    value.replace(/^(\d{3})-(\d{4})-$/, '$1-$2'),
                  );
                  return;
                }

                // #7. 숫자 지우다가 10자리 된 경우 (위 경우에서 한 자를 더 입력하면 11자가 되기 때문에 가능)
                if (/^(\d{3})-(\d{4})-(\d{1})$/.test(value)) {
                  setValue(
                    'phone_number',
                    value.replace(/^(\d{3})-(\d{4})-(\d{1})$/, '$1-$2$3'),
                  );
                  return;
                }
                // #8. 숫자 지우다가 010-123412 처럼 되는 경우
                if (/^(\d{3})-(\d{4})(\d{2})$/.test(value)) {
                  setValue(
                    'phone_number',
                    value.replace(/^(\d{3})-(\d{4})(\d{2})$/, '$1-$2-$3'),
                  );
                  return;
                }

                setValue(
                  'phone_number',
                  value.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'),
                );

                //                 const regexTelOneDigitLess = new RegExp(/^\d{3}-\d{4}-\d{3}$/);
                //                 const regexFullNumber = new RegExp(/^[0-9\b]{11}$/);
                //                 const regexTenDigits = new RegExp(/^[0-9\b]{0,10}$/);
                //
                //                 // 전체 전화번호에서 한 자리만 지워졌을 경우 숫자로 전부 변환
                //                 if (regexTelOneDigitLess.test(value)) {
                //                   setValue('phone_number', value.replaceAll('-', ''));
                //                 }
                //                 // 전화번호 0 - 10자리까지
                //                 if (regexTenDigits.test(value)) {
                //                   // tel에 그대로 번호 등록
                //                   setValue('phone_number', value);
                //                 }
                //                 // 11자리인 경우
                //                 else if (regexFullNumber.test(value)) {
                //                   // 010-1234-1234 형태로 display
                //                   const dashed = value.replace(
                //                     /(?=[0-9]{11})(\d{3})(\d{4})(\d{4})$/,
                //                     '$1-$2-$3'
                //                   );
                //                   setValue('phone_number', dashed);
                //                   clearErrors('phone_number');
                //                 } else {
                //                   return;
                //                 }
              }}
            />
          )}
        />
        {errors.phone_number?.message && (
          <ErrorParagraph>{errors.phone_number.message}</ErrorParagraph>
        )}
      </InputGroup>

      {/* 생년월일 */}
      <InputGroup>
        <Label htmlFor='date_of_birth'>생년월일</Label>
        <Controller
          name='date_of_birth'
          control={control}
          render={({ field }) => (
            <MyInput
              id='date_of_birth'
              size='large'
              placeholder='YYYY-MM-DD'
              type='tel'
              pattern='[0-9\-]*'
              {...field}
              onChange={(e: any) => {
                console.log(e.target.value);
                const { value } = e.target;
                const fullPattern = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
                const regexOneDigitLess = new RegExp(/^\d{4}-\d{2}-\d{1}$/);
                const regexFull = new RegExp(/^[0-9\b]{8}$/);
                const regexSevenDigits = new RegExp(/^[0-9\b]{0,7}$/);

                // 전체 생년월일에서 한 자리만 지워졌을 경우 숫자로 전부 변환
                if (regexOneDigitLess.test(value)) {
                  setValue('date_of_birth', value.replaceAll('-', ''));
                }
                // 생년월일 7자리까지
                if (regexSevenDigits.test(value)) {
                  // tel에 그대로 번호 등록
                  setValue('date_of_birth', value);
                }
                // 8자리인 경우
                else if (regexFull.test(value)) {
                  // YYYY-MM-DD 형태로 display
                  const dashed = value.replace(
                    /(?=[0-9]{8})(\d{4})(\d{2})(\d{2})$/,
                    '$1-$2-$3',
                  );
                  setValue('date_of_birth', dashed);
                  clearErrors('date_of_birth');
                } else {
                  // 11자리 이상일 경우: 더 이상 입력 받지 않음
                  return;
                }
              }}
            />
          )}
        />
        {errors.date_of_birth?.message && (
          <ErrorParagraph>{errors.date_of_birth.message}</ErrorParagraph>
        )}
      </InputGroup>

      {/* 신청 과정 */}
      <InputGroup>
        <Label htmlFor='course'>신청과정</Label>
        <Controller
          name='course'
          control={control}
          render={({ field }) => {
            return (
              <Select
                id='course'
                size='large'
                defaultValue={'선택해주세요.'}
                options={courseOptionsArray}
                {...field}
              />
            );
          }}
        />
        {errors.course?.message && (
          <ErrorParagraph>{errors.course.message}</ErrorParagraph>
        )}
      </InputGroup>

      {/* 약관 */}
      <Space
        direction='vertical'
        className={'border border-gray-300 border-solid p-4 rounded-xl'}>
        <MyCheckbox
          onClick={() => {
            if (
              !!getValues('term1') &&
              !!getValues('term2') &&
              !!getValues('term3')
            ) {
              setAllTerms(false);
            } else {
              setAllTerms(true);
              clearErrors(['term1', 'term2', 'term3']);
            }
          }}
          checked={isAllTermsChecked}>
          약관 전체동의
        </MyCheckbox>

        <div className={'border-solid border-b-[1px] border-gray-300 p-1'} />

        {Object.entries(terms).map(([key, value], index) => {
          const { id, title, toggle, isOpen } = value;
          return (
            <Controller
              key={index}
              name={key as any}
              control={control}
              render={({ field }) => (
                <>
                  <div className={'flex justify-between items-center'}>
                    <MyCheckbox {...field} checked={field.value}>
                      {value.title}
                    </MyCheckbox>
                    <div onClick={toggle}>
                      {isOpen ? (
                        <DownOutlined className={'text-gray-400'} />
                      ) : (
                        <RightOutlined className={'text-gray-400'} />
                      )}
                    </div>
                  </div>
                  <div className={'p-1'} />
                  <LayoutGroup>
                    <motion.div
                      variants={variants}
                      transition={{
                        duration: 0.3,
                        ease: 'easeIn',
                      }}
                      animate={id === 'term1' && isOpen ? 'visible' : 'hidden'}>
                      <PersonalTerms />
                    </motion.div>

                    <motion.div
                      variants={variants}
                      transition={{ duration: 0.3, ease: 'easeIn' }}
                      animate={id === 'term2' && isOpen ? 'visible' : 'hidden'}>
                      <ThirdPartyTerms />
                    </motion.div>

                    <motion.div
                      variants={variants}
                      transition={{ duration: 0.3, ease: 'easeIn' }}
                      animate={id === 'term3' && isOpen ? 'visible' : 'hidden'}>
                      <MarketingTerms />
                    </motion.div>
                  </LayoutGroup>
                </>
              )}
            />
          );
        })}
        {(errors.term1?.message || errors.term2?.message) && (
          <ErrorParagraph>필수 동의사항에 체크해주세요.</ErrorParagraph>
        )}
      </Space>

      <Button type='primary' size='large' htmlType='submit' loading={false}>
        동의하고 다음 단계로
      </Button>
    </form>
  );
};

export default StepOne;

export const InputGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => (
  <div className={clsx(props.className, 'flex flex-col gap-1')}>
    {props.children}
  </div>
);

export const Label: React.FC<
  React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
> = (props) => (
  <label {...props} className={clsx(props.className, 'font-bold')}>
    {props.children}
  </label>
);

const ErrorParagraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (
  props,
) => (
  <p {...props} className={clsx(props.className, 'p-0 m-0 text-[#f7585c]')}>
    {props.children}
  </p>
);

const MyCheckbox = styled(Checkbox)`
  // label
  &,
  &:hover {
    & > span:after {
      border: none;
    }
  }

  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &:after {
      top: 50%;
      left: 30%;
    }
  }
`;

// number input without up and down button
const MyInput = styled(Input)`
  & {
    -moz-appearance: textfield;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const requiredInputFields: TRequiredUserInfoFormKeys = [
  'name',
  'email',
  'phone_number',
  'course',
  'date_of_birth',
  'platform',
  'has_nb_card',
  'term1',
  'term2',
];

const variants: Variants = {
  visible: { opacity: 1, height: 'auto', visibility: 'visible' },
  hidden: { opacity: 0, height: 0, visibility: 'hidden' },
};
