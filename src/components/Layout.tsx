/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from 'react';
import { Breadcrumb, Layout as AntdLayout, Menu, theme } from 'antd';
import Image from 'next/image';
import clsx from 'clsx';

const { Header, Content, Footer } = AntdLayout;

export const S3_BUCKET_URL =
  'https://aiffel-front-prod-asset.s3.ap-northeast-2.amazonaws.com';
const NEW_LOGO_URL =
  'https://modulabs.co.kr/wp-content/uploads/2022/11/logo-signature-4x.png';
export const AIFFEL_LOGO_URL = `${S3_BUCKET_URL}/img/logo/aiffel_logo.png`;

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <AntdLayout className={clsx('min-h-[100vh]')}>
      {/* <div className={clsx('js-container', 'container')}></div> */}
      {/* <Header
        style={{ backgroundColor: '#e9c46a' }} // doesn't work with tailwind
        className={'z-10 top-0 sticky opacity-90'}
      >
        <img src={AIFFEL_LOGO_URL} alt='aiffel logo' width={100} />
      </Header> */}
      {process.env.NODE_ENV !== 'production' && (
        <div className='w-full p-4 bg-black'>
          <div className='text-white text-center'>
            <p className='mb-2'>
              <strong>⚠️ 개발 및 검증 ⚠️ </strong> 환경입니다.
            </p>
            <p>
              <span>현재 API 주소: </span>
              <code>{process.env.BASE_URL}</code>
            </p>
          </div>
        </div>
      )}

      <Content className='p-8 my-0 w-full'>{children}</Content>
      <Footer className={'text-center'}>
        모두의연구소 ©2023 All rights reserved
      </Footer>
    </AntdLayout>
  );
};

export default Layout;
