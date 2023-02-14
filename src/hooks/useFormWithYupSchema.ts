import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ApplicationCourseArray } from '@/types';

/**!SECTION
 * @description react-hook-form의 validator로 사용되는 yup의 schema 정의
 */
export const schema = yup.object({
  name: yup
    .string()
    .max(6, '이름은 6글자를 초과할 수 없습니다.')
    .matches(/^[가-힣a-zA-Z]+$/, '이름은 한글과 영문만 입력할 수 있습니다.')
    .required('이름은 필수입력 항목입니다.'),
  email: yup
    .string()
    .email('이메일 양식을 확인해주세요.')
    .required('이메일은 필수입력 항목입니다.'),
  phone_number: yup
    .string()
    .matches(/^\d{3}-\d{4}-\d{4}$/, '휴대폰 번호를 확인해주세요.')
    .required('휴대폰 번호는 필수입력 항목입니다.'),
  date_of_birth: yup
    .string()
    .matches(
      /(?:19\d{2}|20[01][0-9]|2020)-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])/,
      '올바른 생년월일을 입력해주세요.',
    )
    .required('생년월일은 필수입력 항목입니다.'),
  has_nb_card: yup.boolean(),
  // .required('내일배움카드 소지여부는 필수입력 항목입니다.'),
  platform: yup.string(),
  course: yup
    .string()
    .required('코스는 필수입력 항목입니다.')
    .oneOf(ApplicationCourseArray, '과정을 선택해주세요.'),
  term1: yup
    .boolean()
    .oneOf([true], '개인정보 수집 및 이용에 동의해주세요.')
    .required('개인정보 수집 및 이용에 동의해주세요.'),
  term2: yup
    .boolean()
    .oneOf([true], '개인정보 제3자 제공에 동의해주세요.')
    .required('개인정보 제3자 제공에 동의해주세요.'),
  term3: yup.boolean().required(),
});

export type TUserInfoForm = yup.InferType<typeof schema>;
export type TRequiredUserInfoForm = Exclude<keyof TUserInfoForm, 'term3'>;
export type TRequiredUserInfoFormKeys = TRequiredUserInfoForm[];

export const useFormWithYupSchema = () => {
  return useForm<TUserInfoForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      date_of_birth: '',
      has_nb_card: false,
      platform: '',
      course: '과정을 선택하세요.',
      term1: false,
      term2: false,
      term3: false,
    },
  });
};
