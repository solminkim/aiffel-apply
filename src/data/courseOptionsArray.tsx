import { Course } from '@/types';

/**!SECTION
 * @description Ant Design의 Select의 options을 정의한다.
 */
export const courseOptionsArray = [
  {
    value: Course.CORE,
    label: (
      <div>
        <span className={'text-sm'}>AI가 처음이시라면</span>{' '}
        <span className={'font-bold'}>코어 과정</span>
      </div>
    ),
  },
  {
    value: Course.RESEARCH,
    label: (
      <div>
        <span className={'text-sm'}>AI를 깊게 연구하고 싶다면</span>{' '}
        <span className={'font-bold'}>리서치 과정</span>
      </div>
    ),
  },
];
