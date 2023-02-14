import {
  TApplicationStep,
  Step,
  Course,
  ApplicationApplyPathArray,
  TApplicationApplyPathArray,
  ApplicationPlatformArray,
} from '@/types';
import { Button, Form, Input, InputRef, Modal, Select } from 'antd';
import clsx from 'clsx';
import { createRef, useEffect, useRef, useState } from 'react';
import { TUserContext } from '@/types/context';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { errorModal, warningModal } from '@/components/Modal';
import Head from 'next/head';
import { apis } from '../../http';
import { platformOptionsArray } from '@/data/platformOptionsArray';
import { InputGroup, Label } from '../StepOne/StepOne';

function convertApplyPathToText(type: string, value?: string) {
  if (type === '기타' || type === '추천') {
    return `${type}: ${value}`;
  } else {
    return type;
  }
}

interface StageTwoProps {
  step: TApplicationStep;
  setStep: React.Dispatch<React.SetStateAction<TApplicationStep>>;
  setPercent: React.Dispatch<React.SetStateAction<number>>;
  userInfo: TUserContext;
  setUserInfo: React.Dispatch<React.SetStateAction<TUserContext>>;
  applicationId: number | null;
  className?: string;
}
const StepTwo: React.FC<StageTwoProps> = ({
  step,
  setStep,
  setPercent,
  userInfo,
  setUserInfo,
  applicationId,
  className,
}) => {
  const [userAcknowledged, setUserAcknowledged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [textAreaVal, setTextAreaVal] = useState('');
  const [textAreaValIsMax, setTextAreaValIsMax] = useState(false);

  const [applyPath, setApplyPath] = useState('');
  const [applyPathEtc, setApplyPathEtc] = useState('');
  const [etcRecommender, setETCRecommender] = useState('');

  const inputRef = createRef<TextAreaRef>();
  const majorRef = createRef<InputRef>();
  const portfolioRef = createRef<InputRef>();

  useEffect(() => {
    // Stage 2에 있는 경우만, 적을 때 마다, percent를 업데이트한다.
    if (step === Step.DETAIL) {
      setPercent(0);
      // 모달이 이미 열린 적인 없다면,
      if (!userAcknowledged) {
        // 6개월 수업하는 내용 동의 받기
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      }
      // 모달이 이미 열렸 적이 있다면,
      else {
        setIsOpen(false);
      }
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const onChangeApplyPath = (value: string) => {
    setETCRecommender('');
    setApplyPath(value);
  };

  const onSubmit = async (values: any) => {
    // 1차 지원이 정상적으로 이루어지지 않은 경우
    if (!applicationId) {
      warningModal({ content: '지원자 정보를 다시 입력해주세요.' });
      return;
    }

    console.log('values', majorRef.current?.input?.value);

    if (majorRef.current?.input?.value.length === 0) {
      warningModal({
        title: '지원자님과의 면접을 위해 꼭 필요한 내용입니다.',
        content: '전공을 입력해주세요.',
        centered: true,
        okText: '확인',
      });
      return;
    }

    // 지원동기와 목표가 비어있는 경우
    if (
      !inputRef.current?.resizableTextArea?.textArea.value ||
      inputRef.current?.resizableTextArea?.textArea.value === ''
    ) {
      warningModal({
        title: '지원자님과의 면접을 위해 꼭 필요한 내용입니다.',
        content: '지원동기와 목표는 빈 내용으로 제출할 수 없습니다.',
        centered: true,
        okText: '확인',
      });
      return;
    }
    if (inputRef.current?.resizableTextArea?.textArea.value.length < 20) {
      warningModal({
        title: '지원자님과의 면접을 위해 꼭 필요한 내용입니다.',
        content: '지원동기와 목표는 20자 이상 작성해주세요.',
        centered: true,
        okText: '확인',
      });
      return;
    }

    console.log(portfolioRef);
    // 포트폴리오가 null이 아니면서(RESEARCH),
    // 포트폴리오가 비어있지 않고,
    // 포트폴리오가 URL 형식이 아닌 경우
    // 에만 validation

    if (
      portfolioRef.current?.input?.value.length !== undefined &&
      portfolioRef.current?.input?.value.length > 500
    ) {
      warningModal({
        content: '포트폴리오 링크는 500자를 넘을 수 없습니다.',
      });
      return;
    }
    if (
      portfolioRef.current !== null &&
      portfolioRef.current?.input?.value !== '' &&
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
        portfolioRef.current?.input?.value!,
      ) === false
    ) {
      warningModal({
        content: '포트폴리오 링크는 URL 형식이어야 합니다.',
      });
      return;
    }

    if (applyPath === '추천' && etcRecommender === '') {
      warningModal({
        title: '지원자님과의 면접을 위해 꼭 필요한 내용입니다.',
        content: '추천인 이름을 입력해주세요',
        centered: true,
        okText: '확인',
      });
      return;
    }

    if (applyPath === '') {
      warningModal({
        title: '지원자님과의 면접을 위해 꼭 필요한 내용입니다.',
        content: '지원 경로를 선택해주세요.',
        centered: true,
        okText: '확인',
      });
      return;
    }

    await apis.putUser({
      application_id: applicationId,
      major: majorRef.current?.input?.value ?? '',
      introduction: inputRef.current?.resizableTextArea?.textArea.value ?? '',
      portfolio_link: portfolioRef.current?.input?.value ?? '',
      support_path: convertApplyPathToText(applyPath, etcRecommender),
    });

    setStep(Step.COMPLETE);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (textAreaVal.length >= 2000) {
      inputRef.current?.blur();
      warningModal({
        title: '2000자까지 입력하신 분은 처음이세요!',
        content: (
          <div>
            <p>여기까지 입력하시고 우리에게 인터뷰 문서를 송부해주세요.</p>
            <p>아이펠 캠퍼스팀에서 번개같이 빠르게 연락 드리겠습니다.</p>
          </div>
        ),
        centered: true,
        okText: '확인',
      });

      return;
    }
  }, [textAreaVal]);

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <Form className={clsx(className)} onFinish={onSubmit}>
        <div className={'text-[1rem] font-bold'}>
          전공을 알려주세요.<span className={'text-red-500'}>*</span>
        </div>

        <div className={'p-1'} />

        <Input ref={majorRef} placeholder={'경영학과'} />

        <div className={'p-4'} />

        <div className={clsx('text-[1rem] flex flex-col')}>
          <span className={'font-bold'}>
            아래 세 가지 사항을 포함하여 자신을 알려주세요.{' '}
            <span className={'text-red-500'}>*</span>
          </span>
          <span>
            1) AI 분야의 관심{'  '}2) 협업 경험{'  '}3) 수강동기와 목표
          </span>
        </div>

        <div className={'p-1'} />

        <Input.TextArea
          className={'h-[300px] px-[21px] py-[14px] !leading-5'}
          minLength={20}
          maxLength={2000}
          style={{ resize: 'none' }}
          autoSize={{ minRows: 10, maxRows: 10 }}
          ref={inputRef}
          placeholder={
            '1) OOO 계기로 AI에 관심을 갖게 되었어요.\n2) OOO 주제로 협업을 한 경험이 있어요. 어떤 역할을 수행했고, 어떻게 문제를 해결했어요.\n3) 아이펠의 OOO에 매력을 느껴서 지원하게 되었어요. OOO을 목표로 하고있어요.'
          }
          value={textAreaVal}
          onChange={(e) => setTextAreaVal(e.target.value)}
        />

        <div>
          <p className={'text-right text-gray-400'}>
            <span
              className={
                textAreaVal.length > 500 ? 'text-red-500 font-bold' : ''
              }>
              {textAreaVal.length}
            </span>{' '}
            / 500
          </p>
        </div>

        <div className={'p-1'} />

        {userInfo.user.course === Course.RESEARCH && (
          <>
            <div className={'text-[1rem] font-bold'}>
              포트폴리오 링크 <span>(선택)</span>
            </div>
            <div className={'p-1'} />
            <Input
              ref={portfolioRef}
              placeholder={'https://github.com/username'}
            />
            <div className={'p-4'} />
          </>
        )}

        <InputGroup>
          <Label htmlFor='applyPath'>
            지원경로 <span className={'text-red-500'}>*</span>
          </Label>
          <Select
            options={platformOptionsArray}
            className={'w-full'}
            placeholder='지원경로를 선택해주세요.'
            onChange={onChangeApplyPath}></Select>
          {applyPath === '추천' && (
            <Input
              className={'w-full'}
              placeholder={'추천인 이름을 입력해주세요. 최대 20자'}
              maxLength={20}
              onChange={(e) => setETCRecommender(e.target.value)}
            />
          )}
          {applyPath === '기타' && (
            <Input
              className={'w-full'}
              placeholder={'기타 경로를 입력해주세요. 최대 20자'}
              maxLength={20}
              onChange={(e) => setETCRecommender(e.target.value)}
            />
          )}
        </InputGroup>

        <div className={'p-4'} />

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
          }}>
          <Button
            className={'grow'}
            onClick={() => {
              setStep(Step.COMMON);
              window.scrollTo(0, 0);
            }}>
            뒤로
          </Button>
          <Button className={'grow-[3]'} type='primary' htmlType='submit'>
            지원하기
          </Button>
        </div>

        <Modal
          closable={false}
          centered
          title={`🎉 ${
            userInfo.user.course === Course.CORE
              ? '코어(Core)'
              : '리서치(Research)'
          } 과정을 선택하셨습니다!`}
          open={isOpen}
          footer={[
            <Button
              key='submit'
              type='primary'
              onClick={() => {
                setIsOpen(false);
                setUserAcknowledged(true);
              }}>
              네 참여할게요!
            </Button>,
          ]}>
          <div
            className={
              'text-[1rem] border-2 border-solid border-gray-300 p-4 leading-normal flex flex-col rounded-lg text-center'
            }>
            <span>
              🧑🏻‍💻 본 과정은 <span className='font-bold'>6개월</span> 동안
            </span>
            <span>
              <span className={'text-[#f7585c] font-bold'}>
                매일 아침 10시부터 오후 6시 30분까지
              </span>
            </span>
            <span>
              <span className={'font-bold'}>온라인 학습 공간에 참여</span>
              하셔야 해요.
            </span>
          </div>
        </Modal>
      </Form>
    </>
  );
};

export default StepTwo;
