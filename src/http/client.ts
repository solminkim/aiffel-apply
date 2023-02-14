import axios from 'axios';
import { TUserInfoForm } from '../hooks/useFormWithYupSchema';

const client = axios.create({
  baseURL: process.env.BASE_URL,
});

export const apis = {
  postUser: (form: TUserInfoForm) => {
    // form 처리
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone_number', form.phone_number.replaceAll('-', ''));
    formData.append('birth', form.date_of_birth);
    formData.append('course', form.course);
    formData.append('nb_card_yn', !!form.has_nb_card ? 'True' : 'False');
    formData.append('term_agreement_yn', 'True');
    formData.append('mkt_agreement_yn', !!form.term3 ? 'True' : 'False');

    return client.post<{ application_id: number }>(
      '/apply/applications',
      formData,
    );
  },
  putUser: (props: TPutFormUser) => {
    const formData = new FormData();
    Object.entries(props).map(([key, value]) => {
      formData.append(key, value.toString());
    });
    return client.put('/apply/applications', formData);
  },
};

export type TPutFormUser = {
  application_id: number;
  introduction: string;
  major: string;
  portfolio_link: string;
  support_path?: string;
};
