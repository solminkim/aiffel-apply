import { TUserInfoForm } from '@/hooks/useFormWithYupSchema';
export type TContent = {
  writing: string;
  portfolio_link: string;
};

export type TUserContext = {
  user: TUserInfoForm;
  content: TContent;
};
